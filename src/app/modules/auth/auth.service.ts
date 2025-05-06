import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignInDto } from './sign-in/dto/sign-in.dto';
import { SignUpDto } from './sign-up/dto/sign-up.dto';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  catchError,
  finalize,
  of,
  switchMap,
} from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: ReplaySubject<boolean> = new ReplaySubject<boolean>(
    1
  );
  private authenticated$: Observable<boolean> =
    this._authenticated.asObservable();
  private _apiUrl: string = environment.API_URL;

  private _role: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private role$: Observable<string[]> = this._role.asObservable();

  constructor(
    private _httpClientService: HttpClient,
    private _loadingService: LoadingService,
    private _userService: UserService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  headerOption = {
    withCredentials: true,
  };

  getRole(): Observable<string[]> {
    return this.role$;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Auth
  // -----------------------------------------------------------------------------------------------------

  /**
   *
   *  SIGN IN
   *
   */
  signIn(data: SignInDto): Observable<any> {
    return this._httpClientService
      .post<{ data: { sess_id: string } }>(
        `${this._apiUrl}/auth/sign-in`,
        data,
        this.headerOption
      )
      .pipe(
        switchMap((response) => {
          if (response && response.data?.sess_id) {
            localStorage.setItem('SESS_ID', response.data.sess_id);
          }
          return this.loadInfos();
        })
      );
  }

  private assignInfo(userResponse: any) {
    const role = userResponse.data?.role?.name;
    this._role.next([role]);
    this._userService.user = userResponse.data;
    this._authenticated.next(true);
    return of(true);
  }
  private resetInfo() {
    this._authenticated.next(false);
    this._role.next([]);
    this._userService.user = null;
    localStorage.removeItem('SESS_ID');
    return of(false);
  }

  private handleError(error: HttpErrorResponse): Observable<boolean> {
    if (
      error instanceof HttpErrorResponse &&
      (error.status === 403 || error.status === 401)
    ) {
      if (!localStorage.getItem('SESS_ID')) {
        return of(false);
      }
      return this.refreshToken().pipe(
        switchMap((response) => {
          if (response && response.data?.sess_id) {
            localStorage.setItem('SESS_ID', response.data.sess_id);
          }
          return this._httpClientService.get<{ data: any }>(
            `${this._apiUrl}/users/info`,
            this.headerOption
          );
        }),
        switchMap((userResponse) => this.assignInfo(userResponse)),
        catchError(() => {
          return this.signOut();
        })
      );
    } else {
      return of(false);
    }
  }

  loadInfos(): Observable<boolean> {
    if (this._authenticated.observed) {
      return this.check();
    }
    this._loadingService.show();
    return this._httpClientService
      .get<{ data: any }>(`${this._apiUrl}/users/info`, this.headerOption)
      .pipe(
        switchMap((userResponse) => this.assignInfo(userResponse)),
        catchError((error) => this.handleError(error)),
        finalize(() => {
          setTimeout(() => {
            this._loadingService.hide();
          }, 2000);
        })
      );
  }

  refreshToken(): Observable<any> {
    return this._httpClientService.post(
      `${this._apiUrl}/auth/refresh`,
      { sess_id: localStorage.getItem('SESS_ID') },
      this.headerOption
    );
  }

  /**
   *
   * SIGN UP
   *
   */
  signUp(data: SignUpDto): Observable<any> {
    return this._httpClientService
      .post<{ data: { sess_id: string } }>(
        `${this._apiUrl}/auth/sign-up`,
        data,
        this.headerOption
      )
      .pipe(
        switchMap((response) => {
          if (response && response.data?.sess_id) {
            localStorage.setItem('SESS_ID', response.data.sess_id);
          }
          return this.loadInfos();
        })
      );
  }

  /**
   *
   * SIGN OUT
   *
   */
  signOut(): Observable<any> {
    return this._httpClientService
      .post(`${this._apiUrl}/auth/sign-out`, {}, this.headerOption)
      .pipe(
        switchMap(() => this.resetInfo()),
        catchError(() => this.resetInfo())
      );
  }

  check(): Observable<boolean> {
    return this.authenticated$;
  }
}

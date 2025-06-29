import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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
import { UserService } from './../../core/user/user.service';
import { LoadingService } from './../../core/services/loading.service';
import { ForgotPasswordDto } from './forgot-password/dto/forgot-pwd.dto';
import { reponsesDTO } from 'src/app/core/utils/responses.utils';
import { UserOutputDto } from './interfaces/outputs.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private authenticated$: Observable<boolean> = this._authenticated.asObservable();
  private _apiUrl: string = environment.API_URL;

  private _role: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private role$: Observable<string[]> = this._role.asObservable();

  private readonly _httpClientService = inject(HttpClient);
  private readonly _loadingService = inject(LoadingService);
  private readonly _userService = inject(UserService);

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
  signIn(data: SignInDto): Observable<boolean> {
    return this._httpClientService
      .post<{ data: { sess_id: string } }>(`${this._apiUrl}/auth/sign-in`, data, this.headerOption)
      .pipe(
        switchMap((response) => {
          if (response && response.data?.sess_id) {
            localStorage.setItem('SESS_ID', response.data.sess_id);
          }
          return this.loadInfos();
        }),
      );
  }

  private assignInfo(userResponse: UserOutputDto) {
    // const role = userResponse?.role?.name;
    const role = 'Super Administrator';
    this._role.next([role]);
    this._userService.user = userResponse;
    this._authenticated.next(true);
    return of(true);
  }
  private resetInfo(): Observable<boolean> {
    this._authenticated.next(false);
    this._role.next([]);
    this._userService.user = null;
    localStorage.removeItem('SESS_ID');
    return of(false);
  }

  private handleError(error: HttpErrorResponse): Observable<boolean> {
    if (error instanceof HttpErrorResponse && (error.status === 403 || error.status === 401)) {
      if (!localStorage.getItem('SESS_ID')) {
        return of(false);
      }
      return this.refreshToken().pipe(
        switchMap((response) => {
          if (response && response.data?.sess_id) {
            localStorage.setItem('SESS_ID', response.data.sess_id);
          }
          return this._httpClientService.get<reponsesDTO<UserOutputDto>>(
            `${this._apiUrl}/users/info`,
            this.headerOption,
          );
        }),
        switchMap((userResponse) => this.assignInfo(userResponse!.data!)),
        catchError(() => {
          return this.signOut();
        }),
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
      .get<reponsesDTO<UserOutputDto>>(`${this._apiUrl}/users/info`, this.headerOption)
      .pipe(
        switchMap((userResponse) => this.assignInfo(userResponse!.data!)),
        catchError((error) => this.handleError(error)),
        finalize(() => {
          setTimeout(() => {
            this._loadingService.hide();
          }, 2000);
        }),
      );
  }

  refreshToken(): Observable<reponsesDTO<{ sess_id: string }>> {
    return this._httpClientService.post<reponsesDTO<{ sess_id: string }>>(
      `${this._apiUrl}/auth/refresh`,
      { sess_id: localStorage.getItem('SESS_ID') },
      this.headerOption,
    );
  }

  /**
   *
   * SIGN UP
   *
   */
  signUp(data: SignUpDto): Observable<boolean> {
    return this._httpClientService
      .post<{ data: { sess_id: string } }>(`${this._apiUrl}/auth/sign-up`, data, this.headerOption)
      .pipe(
        switchMap((response) => {
          if (response && response.data?.sess_id) {
            localStorage.setItem('SESS_ID', response.data.sess_id);
          }
          return this.loadInfos();
        }),
      );
  }

  /**
   *
   * SIGN OUT
   *
   */
  signOut(): Observable<boolean> {
    return this._httpClientService
      .post(`${this._apiUrl}/auth/sign-out`, {}, this.headerOption)
      .pipe(
        switchMap(() => this.resetInfo()),
        catchError(() => this.resetInfo()),
      );
  }

  /**
   *
   * SEND VERIFICATION CODE
   *
   */
  sendVerificationCode(email: string): Observable<reponsesDTO<object | null>> {
    return this._httpClientService.post<reponsesDTO<object | null>>(
      `${this._apiUrl}/auth/send-verification-code`,
      { email },
    );
  }

  /**
   *
   * RESET PASSWORD
   *
   */
  resetPassword(data: ForgotPasswordDto): Observable<reponsesDTO<{ sess_id: string }>> {
    return this._httpClientService.post<reponsesDTO<{ sess_id: string }>>(
      `${this._apiUrl}/auth/forgot-password`,
      data,
    );
  }

  check(): Observable<boolean> {
    return this.authenticated$;
  }
}

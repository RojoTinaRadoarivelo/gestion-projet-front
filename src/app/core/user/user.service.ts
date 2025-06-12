import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { User } from './user.types';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);
  private _apiUrl: string = environment.API_URL;

  constructor(private _httpClientService: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User | null) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User | null> {
    return this._user.asObservable();
  }

  /**
   *
   *  Search user by email
   */
  searchUserByEmail(email: string) {
    return this._httpClientService.get<{ data: any }>(
      `${this._apiUrl}/auth/search/user/${email}`
    );
  }
}

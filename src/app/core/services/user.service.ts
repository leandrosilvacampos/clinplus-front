import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userSubject = new BehaviorSubject<IUser | null>(null);

  constructor(private _authService: AuthService) {
    if (this._authService.hasToken()) {
      this._decodeJWT();
    }
  }

  get user() {
    return this._userSubject.asObservable();
  }

  isLogged() {
    return this._authService.hasToken();
  }

  logout() {
    this._authService.deleteToken();
    this._userSubject.next(null);
  }

  saveToken(token: string) {
    this._authService.saveToken(token);
    this._decodeJWT();
  }

  private _decodeJWT() {
    const token = this._authService.getToken();
    const user = jwtDecode(token) as IUser;

    console.log('user:', user);

    this._userSubject.next(user);
  }
}

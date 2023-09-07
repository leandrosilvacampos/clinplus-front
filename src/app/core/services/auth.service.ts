import { Injectable } from '@angular/core';

const KEY = 'accessToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  deleteToken() {
    window.localStorage.removeItem(KEY);
  }

  getToken() {
    return window.localStorage.getItem(KEY) ?? '';
  }

  saveToken(token: string) {
    return window.localStorage.setItem(KEY, token);
  }

  hasToken() {
    return !!this.getToken();
  }
}

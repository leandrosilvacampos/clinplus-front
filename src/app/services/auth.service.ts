import { Injectable } from '@angular/core';
import { BASE_URL } from '../shared/variables';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  constructor(private http: HttpClient, private _userService: UserService) {}

  login(
    email: string,
    password: string
  ): Observable<HttpResponse<{ accessToken: string }>> {
    return this.http
      .post<{ accessToken: string }>(
        `${environment.baseUrl}/users/login`,
        {
          email,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((response) => {
          const token = response.body?.accessToken || '';

          this._userService.saveToken(token);
        })
      );
  }
}

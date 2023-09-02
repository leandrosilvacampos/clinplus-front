import { Injectable } from '@angular/core';
import { BASE_URL } from '../shared/variables';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${environment.baseUrl}/users/login`,
      {
        email,
        password,
      }
    );
  }
}

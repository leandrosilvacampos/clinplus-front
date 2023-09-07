import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAgreement } from '../core/interfaces/agreement';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AgreementsHttpService {
  constructor(private http: HttpClient) {}

  readAgreements(companyId: number): Observable<IAgreement[]> {
    return this.http.get<IAgreement[]>(
      `${environment.baseUrl}/companies/${companyId}/agreements`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAgreement } from '../interfaces/agreement';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AgreementsService {
  constructor(private http: HttpClient) {}

  readAgreements(companyId: number): Observable<IAgreement[]> {
    return this.http.get<IAgreement[]>(
      `${environment.baseUrl}/companies/${companyId}/agreements`
    );
  }
}

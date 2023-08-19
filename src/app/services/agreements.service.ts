import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAgreement } from '../interfaces/agreement';
import { Observable } from 'rxjs';
import { BASE_URL } from '../shared/variables';

@Injectable({
  providedIn: 'root',
})
export class AgreementsService {
  constructor(private http: HttpClient) {}

  readAgreements(companyId: number): Observable<IAgreement[]> {
    return this.http.get<IAgreement[]>(
      `${BASE_URL}/companies/${companyId}/agreements`
    );
  }
}

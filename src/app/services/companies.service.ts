import { Injectable } from '@angular/core';
import { ICompany } from '../interfaces/company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private http: HttpClient) {}

  readCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${environment.baseUrl}/companies`);
  }

  readAvailableCompanyHours(
    id: number,
    date: string,
    timezone: string
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.baseUrl}/companies/${id}/available-hours`,
      { params: { date, timezone } }
    );
  }
}

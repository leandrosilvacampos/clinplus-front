import { Injectable } from '@angular/core';
import { BASE_URL } from '../shared/variables';
import { ICompany } from '../interfaces/company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private http: HttpClient) {}

  readCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${BASE_URL}/companies`);
  }

  readAvailableCompanyHours(id: number, date: Date): Observable<string[]> {
    return this.http.get<string[]>(
      `${BASE_URL}/companies/${id}/available-hours`,
      { params: { date: date.toString() } }
    );
  }
}

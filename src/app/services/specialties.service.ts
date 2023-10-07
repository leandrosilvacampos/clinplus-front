import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpecialty } from '../core/interfaces/specialty';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesHttpService {
  constructor(private http: HttpClient) {}

  readCompanySpecialties(companyId: number): Observable<ISpecialty[]> {
    return this.http.get<ISpecialty[]>(
      `${environment.baseUrl}/companies/${companyId}/available-specialties`
    );
  }
}

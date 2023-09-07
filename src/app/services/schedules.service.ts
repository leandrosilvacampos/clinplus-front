import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateScheduleDTO, IScheduling } from '../core/interfaces/scheduling';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SchedulesHttpService {
  constructor(private http: HttpClient) {}

  createSchedule(
    companyId: number,
    data: ICreateScheduleDTO
  ): Observable<IScheduling> {
    return this.http.post<IScheduling>(
      `${environment.baseUrl}/companies/${companyId}/schedules`,
      data
    );
  }
}

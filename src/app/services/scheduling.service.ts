import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentMethod } from '../interfaces/payment-method';
import { BASE_URL } from '../shared/variables';
import { ICreateScheduleDTO, IScheduling } from '../interfaces/scheduling';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService {
  constructor(private http: HttpClient) {}

  createSchedule(
    companyId: number,
    data: ICreateScheduleDTO
  ): Observable<IScheduling> {
    return this.http.post<IScheduling>(
      `${BASE_URL}/companies/${companyId}/schedules`,
      data
    );
  }
}

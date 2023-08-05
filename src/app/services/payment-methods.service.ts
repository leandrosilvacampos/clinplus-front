import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../shared/variables';
import { IPaymentMethod } from '../interfaces/payment-method';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  constructor(private http: HttpClient) {}

  readPaymentMethods(): Observable<IPaymentMethod[]> {
    return this.http.get<IPaymentMethod[]>(`${BASE_URL}/payment-methods`);
  }
}

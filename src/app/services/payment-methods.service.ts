import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentMethod } from '../interfaces/payment-method';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  constructor(private http: HttpClient) {}

  readPaymentMethods(companyId: number): Observable<IPaymentMethod[]> {
    return this.http.get<IPaymentMethod[]>(
      `${environment.baseUrl}/companies/${companyId}/payment-methods`
    );
  }
}

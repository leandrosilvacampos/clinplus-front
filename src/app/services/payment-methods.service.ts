import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentMethod } from '../core/interfaces/payment-method';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsHttpService {
  constructor(private http: HttpClient) {}

  readPaymentMethods(companyId: number): Observable<IPaymentMethod[]> {
    return this.http.get<IPaymentMethod[]>(
      `${environment.baseUrl}/companies/${companyId}/payment-methods`
    );
  }
}

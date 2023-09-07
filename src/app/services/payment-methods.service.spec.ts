import { TestBed } from '@angular/core/testing';

import { PaymentMethodsHttpService } from './payment-methods.service';

describe('PaymentMethodsHttpService', () => {
  let service: PaymentMethodsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentMethodsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

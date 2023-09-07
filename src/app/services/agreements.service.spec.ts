import { TestBed } from '@angular/core/testing';

import { AgreementsHttpService } from './agreements.service';

describe('AgreementsHttpService', () => {
  let service: AgreementsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgreementsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

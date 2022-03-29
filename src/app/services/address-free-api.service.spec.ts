import { TestBed } from '@angular/core/testing';

import { AddressFreeAPIService } from './address-free-api.service';

describe('AddressFreeAPIService', () => {
  let service: AddressFreeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressFreeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SpecModelService } from './spec-model.service';

describe('SpecModelService', () => {
  let service: SpecModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

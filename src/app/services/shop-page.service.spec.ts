import { TestBed } from '@angular/core/testing';

import { ShopPageService } from './shop-page.service';

describe('ShopPageService', () => {
  let service: ShopPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

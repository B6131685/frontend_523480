import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitToVerifyPaymentComponent } from './wait-to-verify-payment.component';

describe('WaitToVerifyPaymentComponent', () => {
  let component: WaitToVerifyPaymentComponent;
  let fixture: ComponentFixture<WaitToVerifyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitToVerifyPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitToVerifyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOrderComponent } from './verify-order.component';

describe('VerifyOrderComponent', () => {
  let component: VerifyOrderComponent;
  let fixture: ComponentFixture<VerifyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

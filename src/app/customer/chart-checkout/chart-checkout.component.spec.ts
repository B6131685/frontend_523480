import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCheckoutComponent } from './chart-checkout.component';

describe('ChartCheckoutComponent', () => {
  let component: ChartCheckoutComponent;
  let fixture: ComponentFixture<ChartCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDisapproveComponent } from './order-disapprove.component';

describe('OrderDisapproveComponent', () => {
  let component: OrderDisapproveComponent;
  let fixture: ComponentFixture<OrderDisapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDisapproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDisapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

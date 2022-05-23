import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancleOrderComponent } from './cancle-order.component';

describe('CancleOrderComponent', () => {
  let component: CancleOrderComponent;
  let fixture: ComponentFixture<CancleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

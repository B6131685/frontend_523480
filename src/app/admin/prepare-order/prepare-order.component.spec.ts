import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareOrderComponent } from './prepare-order.component';

describe('PrepareOrderComponent', () => {
  let component: PrepareOrderComponent;
  let fixture: ComponentFixture<PrepareOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

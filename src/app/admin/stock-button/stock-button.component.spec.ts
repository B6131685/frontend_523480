import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockButtonComponent } from './stock-button.component';

describe('StockButtonComponent', () => {
  let component: StockButtonComponent;
  let fixture: ComponentFixture<StockButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

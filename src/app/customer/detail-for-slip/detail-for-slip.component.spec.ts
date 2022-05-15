import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailForSlipComponent } from './detail-for-slip.component';

describe('DetailForSlipComponent', () => {
  let component: DetailForSlipComponent;
  let fixture: ComponentFixture<DetailForSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailForSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailForSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

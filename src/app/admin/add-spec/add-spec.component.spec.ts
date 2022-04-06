import { ComponentFixture, TestBed } from '@angular/core/testing';


import { AddSpecComponent } from './add-spec.component';

describe('AddSpecComponent', () => {
  let component: AddSpecComponent;
  let fixture: ComponentFixture<AddSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

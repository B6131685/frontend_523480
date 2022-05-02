import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowProductComponent } from './dialog-show-product.component';

describe('DialogShowProductComponent', () => {
  let component: DialogShowProductComponent;
  let fixture: ComponentFixture<DialogShowProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

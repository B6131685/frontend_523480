import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelProductsComponent } from './model-products.component';

describe('ModelProductsComponent', () => {
  let component: ModelProductsComponent;
  let fixture: ComponentFixture<ModelProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

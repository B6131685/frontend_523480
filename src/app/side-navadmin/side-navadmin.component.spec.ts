import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavadminComponent } from './side-navadmin.component';

describe('SideNavadminComponent', () => {
  let component: SideNavadminComponent;
  let fixture: ComponentFixture<SideNavadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

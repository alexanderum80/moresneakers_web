import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsBreadcrumbComponent } from './ms-breadcrumb.component';

describe('MsBreadcrumbComponent', () => {
  let component: MsBreadcrumbComponent;
  let fixture: ComponentFixture<MsBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsBreadcrumbComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

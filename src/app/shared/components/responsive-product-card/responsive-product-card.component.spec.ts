import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveProductCardComponent } from './responsive-product-card.component';

describe('ResponsiveProductCardComponent', () => {
  let component: ResponsiveProductCardComponent;
  let fixture: ComponentFixture<ResponsiveProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsiveProductCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

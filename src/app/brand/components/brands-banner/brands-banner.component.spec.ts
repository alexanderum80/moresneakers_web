import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsBannerComponent } from './brands-banner.component';

describe('BrandsBannerComponent', () => {
  let component: BrandsBannerComponent;
  let fixture: ComponentFixture<BrandsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandsBannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

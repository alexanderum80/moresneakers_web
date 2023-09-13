import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsBannerComponent } from './shops-banner.component';

describe('ShopsBannerComponent', () => {
  let component: ShopsBannerComponent;
  let fixture: ComponentFixture<ShopsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopsBannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

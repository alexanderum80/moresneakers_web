import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListVerticalSliderComponent } from './products-list-vertical-slider.component';

describe('ReleasesListVerticalSliderComponent', () => {
  let component: ProductsListVerticalSliderComponent;
  let fixture: ComponentFixture<ProductsListVerticalSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListVerticalSliderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListVerticalSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

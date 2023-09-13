import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountOfferItemComponent } from './discount-offer-item.component';

describe('DiscountOfferItemComponent', () => {
  let component: DiscountOfferItemComponent;
  let fixture: ComponentFixture<DiscountOfferItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountOfferItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountOfferItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

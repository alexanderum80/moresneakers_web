import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonOfferItemComponent } from './skeleton-offer-item.component';

describe('SkeletonOfferItemComponent', () => {
  let component: SkeletonOfferItemComponent;
  let fixture: ComponentFixture<SkeletonOfferItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonOfferItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonOfferItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

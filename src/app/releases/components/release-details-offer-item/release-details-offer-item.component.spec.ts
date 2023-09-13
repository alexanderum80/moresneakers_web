import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDetailsOfferItemComponent } from './release-details-offer-item.component';

describe('ReleaseDetailsOfferItemComponent', () => {
  let component: ReleaseDetailsOfferItemComponent;
  let fixture: ComponentFixture<ReleaseDetailsOfferItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseDetailsOfferItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseDetailsOfferItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

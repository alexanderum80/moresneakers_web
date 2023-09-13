import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersGroupByDateComponent } from './offers-group-by-date.component';

describe('OffersGroupByDateComponent', () => {
  let component: OffersGroupByDateComponent;
  let fixture: ComponentFixture<OffersGroupByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersGroupByDateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersGroupByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

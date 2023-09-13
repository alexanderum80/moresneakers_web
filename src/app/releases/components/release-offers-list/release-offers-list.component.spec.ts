import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseOffersListComponent } from './release-offers-list.component';

describe('ReleaseOffersListComponent', () => {
  let component: ReleaseOffersListComponent;
  let fixture: ComponentFixture<ReleaseOffersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseOffersListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

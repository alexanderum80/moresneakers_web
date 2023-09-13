import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersGroupComponent } from './offers-group.component';

describe('OffersGroupComponent', () => {
  let component: OffersGroupComponent;
  let fixture: ComponentFixture<OffersGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

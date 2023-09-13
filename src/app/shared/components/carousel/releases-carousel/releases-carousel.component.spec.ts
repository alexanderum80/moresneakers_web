import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesCarouselComponent } from './releases-carousel.component';

describe('ReleasesCarouselComponent', () => {
  let component: ReleasesCarouselComponent;
  let fixture: ComponentFixture<ReleasesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleasesCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

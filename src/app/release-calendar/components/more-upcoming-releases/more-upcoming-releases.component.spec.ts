import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreUpcomingReleasesComponent } from './more-upcoming-releases.component';

describe('MoreUpcomingReleasesComponent', () => {
  let component: MoreUpcomingReleasesComponent;
  let fixture: ComponentFixture<MoreUpcomingReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoreUpcomingReleasesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreUpcomingReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

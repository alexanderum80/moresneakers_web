import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseCalendarScheduledListComponent } from './release-calendar-scheduled-list.component';

describe('ReleaseCalendarScheduledListComponent', () => {
  let component: ReleaseCalendarScheduledListComponent;
  let fixture: ComponentFixture<ReleaseCalendarScheduledListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseCalendarScheduledListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseCalendarScheduledListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

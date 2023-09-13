import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseCalendarPageComponent } from './release-calendar-page.component';

describe('ReleaseCalendarPageComponent', () => {
  let component: ReleaseCalendarPageComponent;
  let fixture: ComponentFixture<ReleaseCalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseCalendarPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseCalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

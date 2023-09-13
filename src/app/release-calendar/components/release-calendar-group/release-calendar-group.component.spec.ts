import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseCalendarGroupComponent } from './release-calendar-group.component';

describe('ReleaseCalendarGroupComponent', () => {
  let component: ReleaseCalendarGroupComponent;
  let fixture: ComponentFixture<ReleaseCalendarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseCalendarGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseCalendarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

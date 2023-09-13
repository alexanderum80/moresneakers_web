import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseCalendarInlineListComponent } from './release-calendar-inline-list.component';

describe('ReleaseCalendarInlineListComponent', () => {
  let component: ReleaseCalendarInlineListComponent;
  let fixture: ComponentFixture<ReleaseCalendarInlineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseCalendarInlineListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseCalendarInlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

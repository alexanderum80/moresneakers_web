import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesItemDetailsComponent } from './releases-item-details.component';

describe('ReleasesItemDetailsComponent', () => {
  let component: ReleasesItemDetailsComponent;
  let fixture: ComponentFixture<ReleasesItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleasesItemDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

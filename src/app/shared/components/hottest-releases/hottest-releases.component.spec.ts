import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HottestReleasesComponent } from './hottest-releases.component';

describe('HottestReleasesComponent', () => {
  let component: HottestReleasesComponent;
  let fixture: ComponentFixture<HottestReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HottestReleasesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HottestReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

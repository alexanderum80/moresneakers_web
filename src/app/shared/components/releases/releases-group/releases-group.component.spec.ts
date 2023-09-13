import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesGroupComponent } from './releases-group.component';

describe('ReleasesGroupComponent', () => {
  let component: ReleasesGroupComponent;
  let fixture: ComponentFixture<ReleasesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleasesGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

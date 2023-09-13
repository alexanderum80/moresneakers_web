import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandReleasesComponent } from './brand-releases.component';

describe('BrandReleasesComponent', () => {
  let component: BrandReleasesComponent;
  let fixture: ComponentFixture<BrandReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandReleasesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleFiltersHeaderComponent } from './style-filters-header.component';

describe('StyleFiltersHeaderComponent', () => {
  let component: StyleFiltersHeaderComponent;
  let fixture: ComponentFixture<StyleFiltersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StyleFiltersHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleFiltersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

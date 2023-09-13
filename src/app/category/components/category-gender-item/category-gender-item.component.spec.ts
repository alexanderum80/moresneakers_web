import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGenderItemComponent } from './category-gender-item.component';

describe('CategoryGenderItemComponent', () => {
  let component: CategoryGenderItemComponent;
  let fixture: ComponentFixture<CategoryGenderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryGenderItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGenderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

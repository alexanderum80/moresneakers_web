import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSkeletonItemComponent } from './blog-skeleton-item.component';

describe('BlogSkeletonItemComponent', () => {
  let component: BlogSkeletonItemComponent;
  let fixture: ComponentFixture<BlogSkeletonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogSkeletonItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSkeletonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

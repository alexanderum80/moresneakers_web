import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylePageHeaderComponent } from './style-page-header.component';

describe('StylePageHeaderComponent', () => {
  let component: StylePageHeaderComponent;
  let fixture: ComponentFixture<StylePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylePageHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

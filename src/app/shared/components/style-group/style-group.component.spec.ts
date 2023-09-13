import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleGroupComponent } from './style-group.component';

describe('StyleGroupComponent', () => {
  let component: StyleGroupComponent;
  let fixture: ComponentFixture<StyleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StyleGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

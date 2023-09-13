import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleMainGroupComponent } from './style-main-group.component';

describe('StyleGroupComponent', () => {
  let component: StyleMainGroupComponent;
  let fixture: ComponentFixture<StyleMainGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StyleMainGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleMainGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

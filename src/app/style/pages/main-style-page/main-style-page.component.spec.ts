import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStylePageComponent } from './main-style-page.component';

describe('MainStylePageComponent', () => {
  let component: MainStylePageComponent;
  let fixture: ComponentFixture<MainStylePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainStylePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainStylePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

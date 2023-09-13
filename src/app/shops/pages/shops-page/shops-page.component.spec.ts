import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsPageComponent } from './shops-page.component';

describe('ShopsPageComponent', () => {
  let component: ShopsPageComponent;
  let fixture: ComponentFixture<ShopsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

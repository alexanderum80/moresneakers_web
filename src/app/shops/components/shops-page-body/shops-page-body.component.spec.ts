import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsPageBodyComponent } from './shops-page-body.component';

describe('ShopsPageBodyComponent', () => {
  let component: ShopsPageBodyComponent;
  let fixture: ComponentFixture<ShopsPageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopsPageBodyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsPageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

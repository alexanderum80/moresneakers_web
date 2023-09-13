import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsPageBodyComponent } from './deals-page-body.component';

describe('BrandsPageBodyComponent', () => {
  let component: DealsPageBodyComponent;
  let fixture: ComponentFixture<DealsPageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealsPageBodyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsPageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

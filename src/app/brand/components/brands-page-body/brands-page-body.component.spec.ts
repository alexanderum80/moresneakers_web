import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsPageBodyComponent } from './brands-page-body.component';

describe('BrandsPageBodyComponent', () => {
  let component: BrandsPageBodyComponent;
  let fixture: ComponentFixture<BrandsPageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandsPageBodyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsPageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

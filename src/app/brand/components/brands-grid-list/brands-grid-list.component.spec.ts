import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsGridListComponent } from './brands-grid-list.component';

describe('BrandsGridListComponent', () => {
  let component: BrandsGridListComponent;
  let fixture: ComponentFixture<BrandsGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandsGridListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

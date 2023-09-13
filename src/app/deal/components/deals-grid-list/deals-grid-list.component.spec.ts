import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsGridListComponent } from './deals-grid-list.component';

describe('BrandsGridListComponent', () => {
  let component: DealsGridListComponent;
  let fixture: ComponentFixture<DealsGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealsGridListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

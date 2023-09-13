import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsGridListComponent } from './shops-grid-list.component';

describe('ShopsGridListComponent', () => {
  let component: ShopsGridListComponent;
  let fixture: ComponentFixture<ShopsGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopsGridListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

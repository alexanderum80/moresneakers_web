import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoresneakersComponent } from './moresneakers.component';

describe('MoresneakersComponent', () => {
  let component: MoresneakersComponent;
  let fixture: ComponentFixture<MoresneakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoresneakersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoresneakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadGroupComponent } from '../head-group/head-group.component';

describe('HeadGroupComponent', () => {
  let component: HeadGroupComponent;
  let fixture: ComponentFixture<HeadGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

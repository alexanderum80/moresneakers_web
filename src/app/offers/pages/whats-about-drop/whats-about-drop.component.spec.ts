import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsAboutDropComponent } from './whats-about-drop.component';

describe('WhatsAboutDropComponent', () => {
  let component: WhatsAboutDropComponent;
  let fixture: ComponentFixture<WhatsAboutDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatsAboutDropComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsAboutDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

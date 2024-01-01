import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderChecklistDetailsComponent } from './preloader-checklist-details.component';

describe('PreloaderChecklistDetailsComponent', () => {
  let component: PreloaderChecklistDetailsComponent;
  let fixture: ComponentFixture<PreloaderChecklistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderChecklistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderChecklistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

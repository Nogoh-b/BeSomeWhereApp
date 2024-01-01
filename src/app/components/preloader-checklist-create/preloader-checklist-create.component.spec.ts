import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderChecklistCreateComponent } from './preloader-checklist-create.component';

describe('PreloaderChecklistCreateComponent', () => {
  let component: PreloaderChecklistCreateComponent;
  let fixture: ComponentFixture<PreloaderChecklistCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderChecklistCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderChecklistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

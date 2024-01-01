import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderChecklistListComponent } from './preloader-checklist-list.component';

describe('PreloaderChecklistListComponent', () => {
  let component: PreloaderChecklistListComponent;
  let fixture: ComponentFixture<PreloaderChecklistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderChecklistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderChecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderHomeComponent } from './preloader-home.component';

describe('PreloaderHomeComponent', () => {
  let component: PreloaderHomeComponent;
  let fixture: ComponentFixture<PreloaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

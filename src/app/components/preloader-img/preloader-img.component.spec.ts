import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderImgComponent } from './preloader-img.component';

describe('PreloaderImgComponent', () => {
  let component: PreloaderImgComponent;
  let fixture: ComponentFixture<PreloaderImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloaderImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

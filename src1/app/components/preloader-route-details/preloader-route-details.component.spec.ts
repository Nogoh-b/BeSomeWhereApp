import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderRouteDetailsComponent } from './preloader-route-details.component';

describe('PreloaderRouteDetailsComponent', () => {
  let component: PreloaderRouteDetailsComponent;
  let fixture: ComponentFixture<PreloaderRouteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderRouteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderRouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

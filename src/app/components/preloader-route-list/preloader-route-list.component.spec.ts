import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderRouteListComponent } from './preloader-route-list.component';

describe('PreloaderRouteListComponent', () => {
  let component: PreloaderRouteListComponent;
  let fixture: ComponentFixture<PreloaderRouteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderRouteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderRouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

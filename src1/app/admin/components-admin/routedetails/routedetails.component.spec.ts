import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutedetailsComponent } from './routedetails.component';

describe('RoutedetailsComponent', () => {
  let component: RoutedetailsComponent;
  let fixture: ComponentFixture<RoutedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

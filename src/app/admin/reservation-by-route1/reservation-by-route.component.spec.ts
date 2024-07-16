import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationByRouteComponent } from './reservation-by-route.component';

describe('ReservationByRouteComponent', () => {
  let component: ReservationByRouteComponent;
  let fixture: ComponentFixture<ReservationByRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationByRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationByRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

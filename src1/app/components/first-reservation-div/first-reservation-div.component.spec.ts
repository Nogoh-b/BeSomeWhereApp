import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstReservationDivComponent } from './first-reservation-div.component';

describe('FirstReservationDivComponent', () => {
  let component: FirstReservationDivComponent;
  let fixture: ComponentFixture<FirstReservationDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstReservationDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstReservationDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

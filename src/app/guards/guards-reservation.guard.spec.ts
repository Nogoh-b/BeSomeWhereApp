import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardsReservationGuard } from './guards-reservation.guard';

describe('guardsReservationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardsReservationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

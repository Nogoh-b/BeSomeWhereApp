import { TestBed } from '@angular/core/testing';

import { FirstOpenGuard } from './first-open.guard';

describe('FirstOpenGuard', () => {
  let guard: FirstOpenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstOpenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

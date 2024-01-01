import { TestBed } from '@angular/core/testing';

import { DriveBaseService } from './drive-base.service';

describe('DriveBaseService', () => {
  let service: DriveBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriveBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

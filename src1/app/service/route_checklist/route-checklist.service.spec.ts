import { TestBed } from '@angular/core/testing';

import { RouteChecklistService } from './route-checklist.service';

describe('RouteChecklistService', () => {
  let service: RouteChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

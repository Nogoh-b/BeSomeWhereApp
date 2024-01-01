import { TestBed } from '@angular/core/testing';

import { FileChecklistService } from './file-checklist.service';

describe('FileChecklistService', () => {
  let service: FileChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

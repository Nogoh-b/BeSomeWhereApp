import { TestBed } from '@angular/core/testing';

import { ItemChecklistService } from './item-checklist.service';

describe('ItemChecklistService', () => {
  let service: ItemChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

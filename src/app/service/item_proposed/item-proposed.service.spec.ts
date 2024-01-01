import { TestBed } from '@angular/core/testing';

import { ItemProposedService } from './item-proposed.service';

describe('ItemProposedService', () => {
  let service: ItemProposedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemProposedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

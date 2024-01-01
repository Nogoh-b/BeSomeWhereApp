import { TestBed } from '@angular/core/testing';

import { ItemChecklistCategoryService } from './item-checklist-category.service';

describe('ItemChecklistCategoryService', () => {
  let service: ItemChecklistCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemChecklistCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ConfServiceAdmin } from './conf.service';

describe('ConfServiceAdmin', () => {
  let service: ConfServiceAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfServiceAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

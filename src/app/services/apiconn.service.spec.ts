import { TestBed } from '@angular/core/testing';

import { ApiconnService } from './apiconn.service';

describe('ApiconnService', () => {
  let service: ApiconnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiconnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

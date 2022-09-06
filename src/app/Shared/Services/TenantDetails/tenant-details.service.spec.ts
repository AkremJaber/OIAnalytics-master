import { TestBed } from '@angular/core/testing';

import { TenantDetailsService } from './tenant-details.service';

describe('TenantDetailsService', () => {
  let service: TenantDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

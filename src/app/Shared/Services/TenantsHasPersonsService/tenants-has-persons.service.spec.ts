import { TestBed } from '@angular/core/testing';

import { TenantsHasPersonsService } from './tenants-has-persons.service';

describe('TenantsHasPersonsService', () => {
  let service: TenantsHasPersonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantsHasPersonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

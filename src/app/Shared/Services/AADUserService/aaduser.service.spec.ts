import { TestBed } from '@angular/core/testing';

import { AaduserService } from './aaduser.service';

describe('AaduserService', () => {
  let service: AaduserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AaduserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GroupUsersService } from './group-users.service';

describe('GroupUsersService', () => {
  let service: GroupUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

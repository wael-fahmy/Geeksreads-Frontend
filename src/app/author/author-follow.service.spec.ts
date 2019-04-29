import { TestBed } from '@angular/core/testing';

import { AuthorFollowService } from './author-follow.service';

describe('AuthorFollowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorFollowService = TestBed.get(AuthorFollowService);
    expect(service).toBeTruthy();
  });
});

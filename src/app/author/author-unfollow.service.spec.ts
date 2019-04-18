import { TestBed } from '@angular/core/testing';

import { AuthorUnfollowService } from './author-unfollow.service';

describe('AuthorUnfollowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorUnfollowService = TestBed.get(AuthorUnfollowService);
    expect(service).toBeTruthy();
  });
});

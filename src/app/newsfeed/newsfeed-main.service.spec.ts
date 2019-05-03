import { TestBed } from '@angular/core/testing';
import { PostsServices } from './newsfeed-main.service';

describe('AuthorFollowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostsServices = TestBed.get(PostsServices);
    expect(service).toBeTruthy();
  });
});

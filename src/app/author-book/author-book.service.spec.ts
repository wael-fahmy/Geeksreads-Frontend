import { TestBed } from '@angular/core/testing';

import { AuthorBookService } from './author-book.service';

describe('AuthorBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorBookService = TestBed.get(AuthorBookService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GenreRowService } from './genre-row.service';

describe('GenreRowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenreRowService = TestBed.get(GenreRowService);
    expect(service).toBeTruthy();
  });
});

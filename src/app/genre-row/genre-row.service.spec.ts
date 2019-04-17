import { TestBed } from '@angular/core/testing';

import { RowServices } from './genre-row.service';

describe('GenreRowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RowServices = TestBed.get(RowServices);
    expect(service).toBeTruthy();
  });
});

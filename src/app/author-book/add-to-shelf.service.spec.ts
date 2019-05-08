import { TestBed } from '@angular/core/testing';

import { AddToShelfService } from './add-to-shelf.service';

describe('AddToShelfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddToShelfService = TestBed.get(AddToShelfService);
    expect(service).toBeTruthy();
  });
});

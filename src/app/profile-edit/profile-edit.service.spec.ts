import { TestBed } from '@angular/core/testing';

import { ProfileEditService } from './profile-edit.service';

describe('ProfileEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileEditService = TestBed.get(ProfileEditService);
    expect(service).toBeTruthy();
  });
});

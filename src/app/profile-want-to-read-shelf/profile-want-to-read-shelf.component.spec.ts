import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWantToReadShelfComponent } from './profile-want-to-read-shelf.component';

describe('ProfileWantToReadShelfComponent', () => {
  let component: ProfileWantToReadShelfComponent;
  let fixture: ComponentFixture<ProfileWantToReadShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWantToReadShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWantToReadShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

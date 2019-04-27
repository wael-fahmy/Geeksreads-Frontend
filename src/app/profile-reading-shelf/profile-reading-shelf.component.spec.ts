import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReadingShelfComponent } from './profile-reading-shelf.component';

describe('ProfileReadingShelfComponent', () => {
  let component: ProfileReadingShelfComponent;
  let fixture: ComponentFixture<ProfileReadingShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReadingShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReadingShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

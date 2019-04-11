import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReadShelfComponent } from './profile-read-shelf.component';

describe('MyBooksReadComponent', () => {
  let component: ProfileReadShelfComponent;
  let fixture: ComponentFixture<ProfileReadShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReadShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReadShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

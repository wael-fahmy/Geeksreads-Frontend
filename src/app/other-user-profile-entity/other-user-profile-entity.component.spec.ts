import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserProfileEntityComponent } from './other-user-profile-entity.component';

describe('OtherUserProfileEntityComponent', () => {
  let component: OtherUserProfileEntityComponent;
  let fixture: ComponentFixture<OtherUserProfileEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUserProfileEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserProfileEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

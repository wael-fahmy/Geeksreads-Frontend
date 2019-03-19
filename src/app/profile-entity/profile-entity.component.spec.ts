import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEntityComponent } from './profile-entity.component';

describe('ProfileEntityComponent', () => {
  let component: ProfileEntityComponent;
  let fixture: ComponentFixture<ProfileEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

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

  it('button should contain Edit Profile',() => {
    let button=fixture.debugElement.nativeElement.querySelector('button').textContent
    expect(button).toContain('Edit Profile')
   });

   it('User Name should be Mohamed',() => {
    fixture.whenStable().then(() => {
    expect(component.User_info.User_Name).toBe('Mohamed')
    })  
  });
 
});

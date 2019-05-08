import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEntityComponent } from './profile-entity.component';
import { MatButtonModule } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';


describe('ProfileEntityComponent', () => {
  let component: ProfileEntityComponent;
  let fixture: ComponentFixture<ProfileEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEntityComponent],
      imports: [MatButtonModule, MaterialModule, HttpClientModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ProfileEntityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('button should contain Edit Profile', async(() => {
    const button = fixture.debugElement.nativeElement.querySelector('button').textContent;
    expect(button).toContain('Edit Profile');
  }));


  it('User Name should be Signed in user name', async(() => {
    fixture.whenStable().then(() => {
      expect(component.userInfo.UserName).toBe('Mohamed Ashraf');
    });
  }));

  it('User Email should be signed in user email', async(() => {
    fixture.whenStable().then(() => {
      expect(component.userInfo.UserEmail).toBe('samersosta@gmail.com');
    });
  }));

});

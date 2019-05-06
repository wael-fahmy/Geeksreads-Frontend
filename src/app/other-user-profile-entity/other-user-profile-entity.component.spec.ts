import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserProfileEntityComponent } from './other-user-profile-entity.component';
import { MatButtonModule } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router' ;
import {RouterTestingModule} from '@angular/router/testing';
describe('OtherUserProfileEntityComponent', () => {
  let component: OtherUserProfileEntityComponent;
  let fixture: ComponentFixture<OtherUserProfileEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUserProfileEntityComponent ],
      imports:[MatButtonModule,MaterialModule,HttpClientModule,RouterModule,ActivatedRoute,RouterTestingModule]
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

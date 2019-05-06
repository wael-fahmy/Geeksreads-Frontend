import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWantToReadShelfComponent } from './profile-want-to-read-shelf.component';
import { MatMenuModule, MatDividerModule, MatListModule } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
describe('ProfileWantToReadShelfComponent', () => {
  let component: ProfileWantToReadShelfComponent;
  let fixture: ComponentFixture<ProfileWantToReadShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWantToReadShelfComponent ],
      imports:[MatMenuModule, MatDividerModule, MatListModule,MaterialModule,HttpClientModule,RouterModule]
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

it('list of books should be 2', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfWantToReadBooks.length).toBe(1);
    });
  });

  it('list of books reading should contain culpa', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfWantToReadBooks.indexOf).toContain('culpa');
    });
  });
  it('list of books reading should contain voluptate', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfWantToReadBooks.indexOf).toContain('voluptate');
    });
  });
  it('voluptate book rate should be 5', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfWantToReadBooks.indexOf).toContain('5.0');
    });
  });
  it('culpa book rate should be 3', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfWantToReadBooks.indexOf).toContain('3.0');
    });
  });
  it('culpa book author should be Jeannine Romero', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfWantToReadBooks.indexOf).toContain('Jeannine Romero');
    });
  });
  it('voluptate book author should be Wolf Dorsey', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfWantToReadBooks.indexOf).toContain('Wolf Dorsey');
    });
  });

});



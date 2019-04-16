import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReadShelfComponent } from './profile-read-shelf.component';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileReadShelfComponent', () => {
  let component: ProfileReadShelfComponent;
  let fixture: ComponentFixture<ProfileReadShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReadShelfComponent ],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
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

  it('list of books should be 2', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.length).toBe(2);
    });
  });

  it('list of books read should contain Harry Potter', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.indexOf).toContain('Harry Potter');
    });
  });
  it('list of books read should contain Game of thrones', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.indexOf).toContain('Game of thrones');
    });
  });

});

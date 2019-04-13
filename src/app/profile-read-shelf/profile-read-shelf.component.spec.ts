import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReadShelfComponent } from './profile-read-shelf.component';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';

describe('MyBooksReadComponent', () => {
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
      expect(component.List_of_books_read.length).toBe(2);
    });
  });
  it('list of books should contain lord of the rings', () => {
    fixture.whenStable().then(() => {
      expect(component.List_of_books_read.lastIndexOf).toContain('Lord of the Rings');
    });
  });
  it('list of books should contain Harry Potter', () => {
    fixture.whenStable().then(() => {
      expect(component.List_of_books_read.lastIndexOf).toContain('Harry Potter');
    });
  });
  it('list of books should contain Game of thrones', () => {
    fixture.whenStable().then(() => {
      expect(component.List_of_books_read.lastIndexOf).toContain('Game of thrones');
    });
  });

});

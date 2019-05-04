import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReadingShelfComponent } from './profile-reading-shelf.component';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
describe('ProfileReadingShelfComponent', () => {
  let component: ProfileReadingShelfComponent;
  let fixture: ComponentFixture<ProfileReadingShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReadingShelfComponent ],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
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
  it('list of books should be 2', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksReading.length).toBe(1);
    });
  });

  it('list of books reading should contain culpa', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksReading.indexOf).toContain('culpa');
    });
  });
  it('list of books reading should contain voluptate', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksReading.indexOf).toContain('voluptate');
    });
  });
  it('voluptate book rate should be 5', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksReading.indexOf).toContain('5.0');
    });
  });
  it('culpa book rate should be 3', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksReading.indexOf).toContain('3.0');
    });
  });
  it('culpa book author should be Jeannine Romero', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksReading.indexOf).toContain('Jeannine Romero');
    });
  });
  it('voluptate book author should be Wolf Dorsey', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksReading.indexOf).toContain('Wolf Dorsey');
    });
  });

});


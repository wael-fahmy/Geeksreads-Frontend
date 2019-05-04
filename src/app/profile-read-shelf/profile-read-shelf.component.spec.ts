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
      expect(component.listOfBooksRead.length).toBe(1);
    });
  });

  it('list of books read should contain consequat book', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.indexOf).toContain('consequat');
    });
  });
  it('list of books read should contain copidatat', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.indexOf).toContain('copidatat');
    });
  });
  it('copidatat book rate should be 4', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.indexOf).toContain('4.0');
    });
  });
  it('consequat book rate should be 2', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.indexOf).toContain('2.0');
    });
  });
  it('consequat book author should be Deena Craig', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.indexOf).toContain('Deena Craig');
    });
  });
  it('copidatat book author should be Danielle Hayden', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooksRead.indexOf).toContain('Danielle Hayden');
    });
  });

});

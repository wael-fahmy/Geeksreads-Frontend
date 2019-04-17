import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BookAuthorComponent } from './book-author.component';

describe('BookAuthorComponent', () => {
  let component: BookAuthorComponent;
  let fixture: ComponentFixture<BookAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookAuthorComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(BookAuthorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('list of books should be 3', () => {
    fixture.whenStable().then(() => {
      expect(component.author_details.length).toBe(3);
    });
  });
  it('list of authors should contain Meguru Ueno', () => {
    fixture.whenStable().then(() => {
      expect(component.author_details[0].author_name).toContain('Meguru Ueno');
    });
  });
  it('list of authors should contain Yana Toboso', () => {
    fixture.whenStable().then(() => {
      expect(component.author_details[1].author_name).toContain('Yana Toboso');
    });
  });
  it('list of authors should contain Loyd', () => {
    fixture.whenStable().then(() => {
      expect(component.author_details[2].author_name).toContain('Loyd');
    });
  });

  it('list of authors should contain author with id = 211', () => {
    fixture.whenStable().then(() => {
      expect(component.authorid[0]).toContain('211');
    });
  });
  it('list of authors should contain author with id = 343', () => {
    fixture.whenStable().then(() => {
      expect(component.authorid[1]).toContain('343');
    });
  });
  it('list of authors should contain author with id = 12', () => {
    fixture.whenStable().then(() => {
      expect(component.authorid[2]).toContain('12');
    });
  });
  it('list of authors should contain author with followers = 20,334', () => {
    fixture.whenStable().then(() => {
      expect(component.authorfollowers[0]).toContain('20,334');
    });
  });
  it('list of authors should contain author with followers = 13,223', () => {
    fixture.whenStable().then(() => {
      expect(component.authorfollowers[1]).toContain('13,223');
    });
  });
  it('list of authors should contain author with followers = 113,435', () => {
    fixture.whenStable().then(() => {
      expect(component.authorfollowers[2]).toContain('113,435');
    });
  });
});

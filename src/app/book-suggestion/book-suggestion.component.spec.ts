import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BookSuggestionComponent } from './book-suggestion.component';

describe('BookSuggestionComponent', () => {
  let component: BookSuggestionComponent;
  let fixture: ComponentFixture<BookSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookSuggestionComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(BookSuggestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('list of books should be 10', () => {
    fixture.whenStable().then(() => {
      expect(component.suggestedauthorbook_details.length).toBe(10);
    });
  });
  it('list of books should contain Pandora Hearts', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[9]).toContain('Pandora Hearts');
    });
  });
  it('list of books should contain Meguru Ueno', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[0]).toContain('OverLord');
    });
  });
  it('list of books should contain Goblin Slayer', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[5]).toContain('Goblin Slayer');
    });
  });

  it('list of books should contain book with id = 5656', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[3]).toContain('5656');
    });
  });
  it('list of books should contain book with id = 545', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[7]).toContain('545');
    });
  });
  it('list of books should contain book with id = 2313', () => {
    fixture.whenStable().then(() => {
      expect(component.authorid[1]).toContain('2313');
    });
  });
});

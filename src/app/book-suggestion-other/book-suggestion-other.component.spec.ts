import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BookSuggestionOtherComponent } from './book-suggestion-other.component';

describe('BookSuggestionOtherComponent', () => {
  let component: BookSuggestionOtherComponent;
  let fixture: ComponentFixture<BookSuggestionOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookSuggestionOtherComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(BookSuggestionOtherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSuggestionOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('list of books should be 10', () => {
    fixture.whenStable().then(() => {
      expect(component.suggestedbook_details.length).toBe(10);
    });
  });
  it('list of books should contain One Punch Man', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[9]).toContain('One Punch Man');
    });
  });
  it('list of books should contain Blame', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[0]).toContain('Blame');
    });
  });
  it('list of books should contain Kami', () => {
    fixture.whenStable().then(() => {
      expect(component.bookauthor[5]).toContain('Kami');
    });
  });

  it('list of books should contain book with id = 775', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[3]).toContain('775');
    });
  });
  it('list of books should contain book with id = 563', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[7]).toContain('563');
    });
  });
  it('list of books should contain book with id = 34', () => {
    fixture.whenStable().then(() => {
      expect(component.authorid[1]).toContain('34');
    });
  });
});

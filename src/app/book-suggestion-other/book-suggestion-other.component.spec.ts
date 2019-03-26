import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSuggestionOtherComponent } from './book-suggestion-other.component';

describe('BookSuggestionOtherComponent', () => {
  let component: BookSuggestionOtherComponent;
  let fixture: ComponentFixture<BookSuggestionOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookSuggestionOtherComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSuggestionOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

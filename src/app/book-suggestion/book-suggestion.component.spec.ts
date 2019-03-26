import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSuggestionComponent } from './book-suggestion.component';

describe('BookSuggestionComponent', () => {
  let component: BookSuggestionComponent;
  let fixture: ComponentFixture<BookSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookSuggestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

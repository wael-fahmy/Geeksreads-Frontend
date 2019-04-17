import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCommentGuestComponent } from './book-comment-guest.component';

describe('BookCommentGuestComponent', () => {
  let component: BookCommentGuestComponent;
  let fixture: ComponentFixture<BookCommentGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCommentGuestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCommentGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

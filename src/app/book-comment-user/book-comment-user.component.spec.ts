import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCommentUserComponent } from './book-comment-user.component';

describe('BookCommentUserComponent', () => {
  let component: BookCommentUserComponent;
  let fixture: ComponentFixture<BookCommentUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCommentUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCommentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

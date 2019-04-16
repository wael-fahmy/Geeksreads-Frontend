import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedCommentPostComponent } from './newsfeed-comment-post.component';

describe('NewsfeedCommentPostComponent', () => {
  let component: NewsfeedCommentPostComponent;
  let fixture: ComponentFixture<NewsfeedCommentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedCommentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedCommentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

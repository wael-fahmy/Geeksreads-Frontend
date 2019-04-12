import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsCommentsComponent } from './reviews-comments.component';

describe('ReviewsCommentsComponent', () => {
  let component: ReviewsCommentsComponent;
  let fixture: ComponentFixture<ReviewsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

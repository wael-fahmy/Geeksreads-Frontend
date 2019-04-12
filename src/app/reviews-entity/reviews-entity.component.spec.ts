import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsEntityComponent } from './reviews-entity.component';

describe('ReviewsEntityComponent', () => {
  let component: ReviewsEntityComponent;
  let fixture: ComponentFixture<ReviewsEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

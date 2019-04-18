import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReviewsEntityComponent } from './reviews-entity.component';
import { MatMenuModule, MatDividerModule, MatListModule } from '@angular/material';

describe('ReviewsEntityComponent', () => {
  let component: ReviewsEntityComponent;
  let fixture: ComponentFixture<ReviewsEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsEntityComponent ],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ReviewsEntityComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('list of reviews should be 1', () => {
    fixture.whenStable().then(() => {
      expect(component.review_details.length).toBe(1);
    });
  });
  it('list of reviews should contain Kuroshitsuji Black Bulter', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[0]).toContain('Kuroshitsuji Black Bulter');
    });
  });
  it('list of reviews should contain Meguru Ueno', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewername[0]).toContain('Meguru Ueno');
    });
  });
  it('list of reviews should contain Yuno Mashiro', () => {
    fixture.whenStable().then(() => {
      expect(component.bookauthor[0]).toContain('Yuno Mashiro');
    });
  });

  it('list of reviews should contain book with id = 1233', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[0]).toContain('1233');
    });
  });
  it('list of reviews should contain reviewer with id = 3424', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewerid[0]).toContain('3424');
    });
  });
  it('list of reviews should contain book with comments = 50', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewercomments[0]).toContain('50');
    });
  });
});

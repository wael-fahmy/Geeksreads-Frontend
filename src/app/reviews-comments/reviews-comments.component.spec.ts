import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReviewsCommentsComponent } from './reviews-comments.component';
import { MatMenuModule, MatDividerModule, MatListModule } from '@angular/material';

describe('ReviewsCommentsComponent', () => {
  let component: ReviewsCommentsComponent;
  let fixture: ComponentFixture<ReviewsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsCommentsComponent ],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ReviewsCommentsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('list of comments should be 6', () => {
    fixture.whenStable().then(() => {
      expect(component.comment_details.length).toBe(6);
    });
  });
  it('list of comments should contain Kuroshitsuji Bandie', () => {
    fixture.whenStable().then(() => {
      expect(component.username[2]).toContain('Bandie');
    });
  });
  it('list of comments should contain https://i.redd.it/78xux2ti42c11.png', () => {
    fixture.whenStable().then(() => {
      expect(component.userimage[3]).toContain('https://i.redd.it/78xux2ti42c11.png');
    });
  });
  it('list of comments should contain 5 years ago', () => {
    fixture.whenStable().then(() => {
      expect(component.userdate[4]).toContain('5 years ago');
    });
  });

  it('list of comments should contain user with id = 4242', () => {
    fixture.whenStable().then(() => {
      expect(component.userid[5]).toContain('4242');
    });
  });
  it('list of comments should contain user with id = 12564', () => {
    fixture.whenStable().then(() => {
      expect(component.userid[1]).toContain('12564');
    });
  });
  it('list of comments should contain user with id = 5342', () => {
    fixture.whenStable().then(() => {
      expect(component.userid[2]).toContain('5342');
    });
  });
});

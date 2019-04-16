import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BookCommentUserComponent } from './book-comment-user.component';

describe('BookCommentUserComponent', () => {
  let component: BookCommentUserComponent;
  let fixture: ComponentFixture<BookCommentUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCommentUserComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(BookCommentUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCommentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('list of reviews should be 6', () => {
    fixture.whenStable().then(() => {
      expect(component.review_information.length).toBe(6);
    });
  });
  it('list of reviews should contain Cloud', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewername[3]).toContain('Cloud');
    });
  });
  it('list of reviews should contain Meguru Ueno', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewername[0]).toContain('Meguru Ueno');
    });
  });
  it('list of reviews should contain Sharl', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewername[5]).toContain('Sharl');
    });
  });

  it('list of reviews should contain reviews with id = 454', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewerid[4]).toContain('454');
    });
  });
  it('list of reviews should contain reviews with id = 3241', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewerid[2]).toContain('3241');
    });
  });
  it('list of reviews should contain reviews with id = 13', () => {
    fixture.whenStable().then(() => {
      expect(component.reviewerid[1]).toContain('13');
    });
  });
});

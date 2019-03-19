import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAuthorComponent } from './book-author.component';

describe('BookAuthorComponent', () => {
  let component: BookAuthorComponent;
  let fixture: ComponentFixture<BookAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

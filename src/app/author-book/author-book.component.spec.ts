import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBookComponent } from './author-book.component';

describe('AuthorBookComponent', () => {
  let component: AuthorBookComponent;
  let fixture: ComponentFixture<AuthorBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

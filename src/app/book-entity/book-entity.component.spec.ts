import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEntityComponent } from './book-entity.component';

describe('BookEntityComponent', () => {
  let component: BookEntityComponent;
  let fixture: ComponentFixture<BookEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

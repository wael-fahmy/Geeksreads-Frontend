import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BookEntityComponent } from './book-entity.component';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';

describe('BookEntityComponent', () => {
  let component: BookEntityComponent;
  let fixture: ComponentFixture<BookEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookEntityComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(BookEntityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',  async(() => {
    expect(component).toBeTruthy();
  }));
  it('list of books should be 3', () => {
    fixture.whenStable().then(() => {
      expect(component.book_details.length).toBe(3);
    });
  });
  it('list of books should contain Black Butler', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[1]).toContain('Black Butler');
    });
  });
  it('list of books should contain Hajimete no Gal', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[0]).toContain('Hajimete no Gal');
    });
  });
  it('list of books should contain Gal Gohan', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[2]).toContain('Gal Gohan');
    });
  });
  it('list of books should contain book with id = 4324', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[0]).toContain('4324');
    });
  });
  it('list of books should contain book with id = 2123', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[1]).toContain('2123');
    });
  });
  it('list of books should contain book with id = 213', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[2]).toContain('213');
    });
  });
});

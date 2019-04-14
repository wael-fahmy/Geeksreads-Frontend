import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatDividerModule, MatListModule, MatAccordion, MatExpansionPanel,
  MatExpansionPanelHeader, MatExpansionPanelTitle, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailsComponent } from './book-details.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule, MatAccordion,
        MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(BookDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('list of books should be 3', () => {
    fixture.whenStable().then(() => {
      expect(component.book_information.length).toBe(3);
    });
  });
  it('list of books should contain 黒執事', () => {
    fixture.whenStable().then(() => {
      expect(component.booktitle[0]).toContain('黒執事');
    });
  });
  it('list of books should contain Yami, Jun', () => {
    fixture.whenStable().then(() => {
      expect(component.bookchara[1]).toContain('Yami, Jun');
    });
  });
  it('list of books should contain id = 12', () => {
    fixture.whenStable().then(() => {
      expect(component.bookid[2]).toContain('12');
    });
  });
  it('list of books should contain English', () => {
    fixture.whenStable().then(() => {
      expect(component.booklang[0]).toContain('English');
    });
  });
  it('list of books should contain Published', () => {
    fixture.whenStable().then(() => {
      expect(component.bookpublished[1]).toContain('Published October 14th 2014 by Lake Union Publishing');
    });
  });
  it('list of books should contain ASIN = DAB0F0TM1Y', () => {
    fixture.whenStable().then(() => {
      expect(component.bookASIN[2]).toContain('DAB0F0TM1Y');
    });
  });
});

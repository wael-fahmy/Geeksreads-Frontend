import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileBookEntityComponent } from './profile-book-entity.component';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';


describe('ProfileBookEntityComponent', () => {
  let component: ProfileBookEntityComponent;
  let fixture: ComponentFixture<ProfileBookEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBookEntityComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule, MaterialModule, HttpClientModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ProfileBookEntityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBookEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
  it('list of books should be 3', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooks.length).toBe(3);
    });
  });
  it('list of books should contain lord of the rings', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooks.indexOf).toContain('Lord of the Rings');
    });
  });
  it('list of books should contain Harry Potter', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooks.indexOf).toContain('Harry Potter');
    });
  });
  it('list of books should contain Game of thrones', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooks.indexOf).toContain('Game of thrones');
    });
  });

  it('list of books should contain book with id = 11', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooks.lastIndexOf).toContain('11');
    });
  });
  it('list of books should contain book with id = 12', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooks.lastIndexOf).toContain('12');
    });
  });
  it('list of books should contain book with id = 13', () => {
    fixture.whenStable().then(() => {
      expect(component.listOfBooks.lastIndexOf).toContain('13');
    });
  });
});

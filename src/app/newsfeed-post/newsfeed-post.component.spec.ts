import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatDividerModule, MatListModule, } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';

import { NewsfeedPostComponent } from './newsfeed-post.component';

describe('NewsfeedPostComponent', () => {
  let component: NewsfeedPostComponent;
  let fixture: ComponentFixture<NewsfeedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsfeedPostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button should contain want to read', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button').textContent;
    expect(button).toContain('Want to read');
  });
  it('checks that the username is mohamed ', () => {
    fixture.whenStable().then(() => {
      expect(component.userName).toContain('Mohamed');
    });
  });
  it('checks that the username is mohamed ', () => {
      fixture.whenStable().then(() => {
        expect(component.userName).toContain('Mohamed');
      });
    });
  it('checks that the bookname is A Tale of Two Cities ', () => {
        fixture.whenStable().then(() => {
          expect(component.bookname).toContain('A Tale of Two Cities');
        });
    });
  });

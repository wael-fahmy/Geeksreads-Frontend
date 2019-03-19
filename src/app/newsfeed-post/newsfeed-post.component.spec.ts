import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedPostComponent } from './newsfeed-post.component';

describe('NewsfeedPostComponent', () => {
  let component: NewsfeedPostComponent;
  let fixture: ComponentFixture<NewsfeedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedPostComponent ]
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
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreRowComponent } from './genre-row.component';

describe('GenreRowComponent', () => {
  let component: GenreRowComponent;
  let fixture: ComponentFixture<GenreRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenreRowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

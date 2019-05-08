import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatDividerModule, MatListModule, MatButtonModule } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './author.component';
import { AuthorBookComponent } from '../author-book/author-book.component';


describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule,
        MatButtonModule, MaterialModule,
        HttpClientModule, AuthorBookComponent]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AuthorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Name should contain Name', async(() => {
    const a = fixture.debugElement.nativeElement.querySelector('h1').textContent;
    expect(a).toContain('Name');
  }));

  it('Follow Author button', async(() => {
    const a = fixture.debugElement.nativeElement.querySelector('#author-follow').textContent;
    expect(a).toContain('Follow');
  }));

  it('Unfollow Author button', async(() => {
    const a = fixture.debugElement.nativeElement.querySelector('#author-unfollow').textContent;
    expect(a).toContain('Unfollow');
  }));
});

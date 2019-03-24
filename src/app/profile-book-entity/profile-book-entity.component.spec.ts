import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileBookEntityComponent } from './profile-book-entity.component';
import {MatMenuModule, MatDividerModule,MatListModule,} from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';


describe('ProfileBookEntityComponent', () => {
  let component: ProfileBookEntityComponent;
  let fixture: ComponentFixture<ProfileBookEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBookEntityComponent ],
      imports :[MatMenuModule, MatDividerModule,MatListModule,MaterialModule,HttpClientModule]
    })
    .compileComponents().then(()=>
    {
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

  it('Pre should contain Book Cover',async(() => {
    let Pre=fixture.debugElement.nativeElement.querySelector('Pre').textContent
    expect(Pre).toContain('Book Cover')
   }));
   it('button should contain Read',async(() => {
    let button=fixture.debugElement.nativeElement.querySelector('button').textContent
    expect(button).toContain('Read')
   }));
   it('button should contain want to Read',async(() => {
    let button=fixture.debugElement.nativeElement.querySelector('button').textContent
    expect(button).toContain('want to read')
   }));

   it('list of books should be 3',() => {
    fixture.whenStable().then(() => {
    expect(component.List_of_books.length).toBe(3)
    })  
  });
 
});

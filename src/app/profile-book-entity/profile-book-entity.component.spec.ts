import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBookEntityComponent } from './profile-book-entity.component';

describe('ProfileBookEntityComponent', () => {
  let component: ProfileBookEntityComponent;
  let fixture: ComponentFixture<ProfileBookEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBookEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBookEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mat-card tag should contain Rating',() => {
   let mat=fixture.debugElement.nativeElement.querySelector('mat-card').textContent
   expect(mat).toContain('Rating')
  });
  

  /*it('User Name should be Mohamed',() => {
    fixture.whenStable().then(() => {
    expect(component.User_info.User_Name).toBe('Mohamed')
    })  
  });*/
});

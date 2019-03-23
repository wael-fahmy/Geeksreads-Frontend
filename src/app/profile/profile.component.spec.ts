import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('a should contain read',() => {
    let a=fixture.debugElement.nativeElement.querySelector('a').textContent
    expect(a).toContain('read')
   });

   it('a should contain to read',() => {
    let a=fixture.debugElement.nativeElement.querySelector('a').textContent
    expect(a).toContain('to read')
   });
});

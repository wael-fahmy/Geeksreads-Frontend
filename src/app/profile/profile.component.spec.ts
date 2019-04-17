import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { MatMenuModule, MatDividerModule, MatListModule, MatButtonModule } from '@angular/material';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileEntityComponent } from '../profile-entity/profile-entity.component';
import { ProfileBookEntityComponent } from '../profile-book-entity/profile-book-entity.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [MatMenuModule, MatDividerModule, MatListModule,
        MatButtonModule, MaterialModule,
        HttpClientModule, ProfileBookEntityComponent, ProfileEntityComponent]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('a should contain read', async(() => {
    const a = fixture.debugElement.nativeElement.querySelector('a').textContent;
    expect(a).toContain('read');
  }));

  it('a should contain to read', () => {
    const a = fixture.debugElement.nativeElement.querySelector('a').textContent;
    expect(a).toContain('to read');
  });
});

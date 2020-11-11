import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePgComponent } from './profile-pg.component';

describe('ProfilePgComponent', () => {
  let component: ProfilePgComponent;
  let fixture: ComponentFixture<ProfilePgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

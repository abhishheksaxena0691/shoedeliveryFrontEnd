import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPgComponent } from './login-pg.component';

describe('LoginPgComponent', () => {
  let component: LoginPgComponent;
  let fixture: ComponentFixture<LoginPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

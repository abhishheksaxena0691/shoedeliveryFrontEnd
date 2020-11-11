import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegOTPComponent } from './reg-otp.component';

describe('RegOTPComponent', () => {
  let component: RegOTPComponent;
  let fixture: ComponentFixture<RegOTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegOTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

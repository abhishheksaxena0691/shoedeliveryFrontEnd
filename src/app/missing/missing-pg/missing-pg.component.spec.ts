import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPgComponent } from './missing-pg.component';

describe('MissingPgComponent', () => {
  let component: MissingPgComponent;
  let fixture: ComponentFixture<MissingPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

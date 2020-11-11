import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPgComponent } from './return-pg.component';

describe('ReturnPgComponent', () => {
  let component: ReturnPgComponent;
  let fixture: ComponentFixture<ReturnPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

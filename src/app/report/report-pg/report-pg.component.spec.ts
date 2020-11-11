import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPgComponent } from './report-pg.component';

describe('ReportPgComponent', () => {
  let component: ReportPgComponent;
  let fixture: ComponentFixture<ReportPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

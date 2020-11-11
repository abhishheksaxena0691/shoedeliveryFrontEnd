import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePgComponent } from './quote-pg.component';

describe('QuotePgComponent', () => {
  let component: QuotePgComponent;
  let fixture: ComponentFixture<QuotePgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotePgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

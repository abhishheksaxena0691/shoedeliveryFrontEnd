import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDashboadComponent } from './dealer-dashboad-component';

describe('DealerDashboadComponentComponent', () => {
  let component: DealerDashboadComponent;
  let fixture: ComponentFixture<DealerDashboadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerDashboadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

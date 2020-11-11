import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDeliveryPgComponent } from './dealer-delivery-pg.component';

describe('DeliveryPgComponent', () => {
  let component: DealerDeliveryPgComponent;
  let fixture: ComponentFixture<DealerDeliveryPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerDeliveryPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerDeliveryPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

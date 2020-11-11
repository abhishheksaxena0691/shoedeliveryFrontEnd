import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPgComponent } from './delivery-pg.component';

describe('DeliveryPgComponent', () => {
  let component: DeliveryPgComponent;
  let fixture: ComponentFixture<DeliveryPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

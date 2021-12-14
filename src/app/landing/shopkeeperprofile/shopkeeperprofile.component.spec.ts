import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeeperprofileComponent } from './shopkeeperprofile.component';

describe('ShopkeeperprofileComponent', () => {
  let component: ShopkeeperprofileComponent;
  let fixture: ComponentFixture<ShopkeeperprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopkeeperprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopkeeperprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

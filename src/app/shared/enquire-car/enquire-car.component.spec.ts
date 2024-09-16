import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquireCarComponent } from './enquire-car.component';

describe('EnquireCarComponent', () => {
  let component: EnquireCarComponent;
  let fixture: ComponentFixture<EnquireCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnquireCarComponent]
    });
    fixture = TestBed.createComponent(EnquireCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

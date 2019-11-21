import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveComponent } from './reserve.component';

describe('ReserveComponent', () => {
  let component: ReserveComponent;
  let fixture: ComponentFixture<ReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

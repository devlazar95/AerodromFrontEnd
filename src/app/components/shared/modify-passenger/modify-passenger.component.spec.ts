import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPassengerComponent } from './modify-passenger.component';

describe('ModifyPassengerComponent', () => {
  let component: ModifyPassengerComponent;
  let fixture: ComponentFixture<ModifyPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

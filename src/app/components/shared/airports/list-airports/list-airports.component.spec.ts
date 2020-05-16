import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAirportsComponent } from './list-airports.component';

describe('ListAirportsComponent', () => {
  let component: ListAirportsComponent;
  let fixture: ComponentFixture<ListAirportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAirportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

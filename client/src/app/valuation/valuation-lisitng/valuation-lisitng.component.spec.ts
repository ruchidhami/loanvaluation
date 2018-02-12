import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationLisitngComponent } from './valuation-lisitng.component';

describe('ValuationLisitngComponent', () => {
  let component: ValuationLisitngComponent;
  let fixture: ComponentFixture<ValuationLisitngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationLisitngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationLisitngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

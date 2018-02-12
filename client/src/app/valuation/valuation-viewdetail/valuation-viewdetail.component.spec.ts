import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationViewdetailComponent } from './valuation-viewdetail.component';

describe('ValuationViewdetailComponent', () => {
  let component: ValuationViewdetailComponent;
  let fixture: ComponentFixture<ValuationViewdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationViewdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationViewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

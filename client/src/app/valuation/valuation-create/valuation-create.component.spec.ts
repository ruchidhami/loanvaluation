import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationCreateComponent } from './valuation-create.component';

describe('ValuationCreateComponent', () => {
  let component: ValuationCreateComponent;
  let fixture: ComponentFixture<ValuationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

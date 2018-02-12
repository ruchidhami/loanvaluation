import { Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { ValuationLisitngComponent } from './valuation/valuation-lisitng/valuation-lisitng.component';
import { ValuationCreateComponent } from './valuation/valuation-create/valuation-create.component';
import { ValuationSummaryComponent } from './valuation/valuation-summary/valuation-summary.component';
import { ValuationViewdetailComponent } from './valuation/valuation-viewdetail/valuation-viewdetail.component';


export const routingComponents = [
  LoginComponent,
  ValuationLisitngComponent,
  ValuationCreateComponent,
  ValuationSummaryComponent,
  ValuationViewdetailComponent,
]

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'valuations', pathMatch: 'full', component: ValuationLisitngComponent },
  { path: 'valuations/create', pathMatch: 'full', component: ValuationCreateComponent },
  { path: 'valuations/:id/summary', pathMatch: 'full', component: ValuationSummaryComponent },
  { path: 'valuations/:id/detail', pathMatch: 'full', component: ValuationViewdetailComponent },
];

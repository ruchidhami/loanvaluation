import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataTableModule,SharedModule,GMapModule, DialogModule, GrowlModule,Message} from 'primeng/primeng';
import {NgxPaginationModule} from 'ngx-pagination';


import 'hammerjs';
import {
  MatFormFieldModule,
  MatSidenavModule,
  MatRadioModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatCardModule,
  MatTabsModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSliderModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

/**
 * Routes
 */
import { appRoutes } from './app-routing.module';

/**
 * Routing Components
 */
import { routingComponents } from './app-routing.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { LocationPickerComponent } from './shared/location-picker/location-picker.component';
import { ValuationDocsComponent } from './valuation/valuation-lisitng/valuation-lisitng.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    SidenavComponent,
    LoaderComponent,
    ConfirmationDialogComponent,
    LocationPickerComponent,
    ValuationDocsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatSliderModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    GMapModule,
    DialogModule,
    GrowlModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [ MatDatepickerModule],
  entryComponents: [
    ConfirmationDialogComponent,
    ValuationDocsComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

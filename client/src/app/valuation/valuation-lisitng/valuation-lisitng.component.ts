import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { Router } from "@angular/router";

import { ValuationService } from '../valuation.service';

@Component({
  selector: 'app-valuation-lisitng',
  templateUrl: './valuation-lisitng.component.html',
  styleUrls: ['./valuation-lisitng.component.css'],
  providers: [ValuationService]
})
export class ValuationLisitngComponent implements OnInit {

  constructor(private valuationService: ValuationService, private router: Router, public dialog: MatDialog) {

  }

  valuations = [];
  loader: boolean;
  docs: string;
  value: string;

  count;
  currentPage: number = 1;
  pageno: number = 1;

  @ViewChild('sidenav') sideNav: any;
   toggleNav: any;

  ngOnInit() {
    this.listValuation();

    this.toggleNav = () => {
      this.sideNav.toggle();
    };
  }


  pageChanged(event: any) {
    this.pageno = event;
    this.currentPage = event;
    this.listValuation();
  }

  listValuation() {
    this.loader = true;
    this.valuationService.listValuation({ limit: 10, pageno: this.pageno })
      .subscribe(valuations => {
        this.valuations = valuations.data;
        this.count = valuations.total;
        this.loader = false;
      });
  }

  searchFunction() {
    this.loader = true;
    this.valuationService.listValuation({
      q: this.value
    })
      .subscribe(valuation => {
        this.valuations = valuation.data;
        this.loader = false;
      });
  }

  viewSummary(id) {
    this.router.navigate(['valuations/' + id + '/summary']);
  }

  viewDetailSummary(id) {
    this.router.navigate(['valuations/' + id + '/detail']);
  }

  addDocuments(id): void {
    let dialogRef = this.dialog.open(ValuationDocsComponent, {
      // width: '250px',
      data: { docs: this.docs }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.docs = result;
      console.log(this.docs);
    });
  }
}


@Component({
  selector: 'valutaion-docs.component',
  templateUrl: 'valuation-docs.component.html',
})
export class ValuationDocsComponent {

  constructor(public dialogRef: MatDialogRef<ValuationDocsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


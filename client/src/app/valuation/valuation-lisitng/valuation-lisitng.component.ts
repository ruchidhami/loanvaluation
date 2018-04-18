import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { Router } from "@angular/router";

import { ValuationService } from '../valuation.service';

@Component({
  selector: 'app-valuation-lisitng',
  templateUrl: './valuation-lisitng.component.html',
  styleUrls: ['./valuation-lisitng.component.css'],
  providers: [ValuationService]
})
export class ValuationLisitngComponent implements OnInit {

  constructor(private valuationService: ValuationService,
              private router: Router,
              public dialog: MatDialog) {

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
        this.loader = false;
        this.valuations = valuations.data;
        this.count = valuations.total;

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

  addDocuments(valuationObject): void {
    let dialogRef = this.dialog.open(ValuationDocsComponent, {
      // width: '250px',
      data: {
        detail: valuationObject,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.docs = result;
    });
  }
}


@Component({
  selector: 'valutaion-docs.component',
  templateUrl: 'valuation-docs.component.html',
  providers: [ValuationService]
})
export class ValuationDocsComponent implements OnInit {

  constructor(private valuationService: ValuationService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ValuationDocsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.getPopUpList();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadedList = [];

  getPopUpList() {
    debugger;
    this.uploadedList = [{
      displayName: 'Lalpurja Copy',
      key: "lalpurja",
      status: this.data.detail.images.lalpurja.status
    }, {
      displayName: 'Citizenship of client',
      key: "citizenshipClient",
      status: this.data.detail.images.citizenshipClient.status
    }, {
      displayName: 'Citizenship of owner',
      key: "citizenshipOwner",
      status: this.data.detail.images.citizenshipOwner.status
    }, {
      displayName: 'Charkilla Original',
      key: "charkillaOrg",
      status: this.data.detail.images.charkillaOrg.status
    }, {
      displayName: 'Blue Print',
      key: "bluePrint",
      status: this.data.detail.images.bluePrint.status
    }, {
      displayName: 'Trace',
      key: "trace",
      status: this.data.detail.images.trace.status
    }, {
      displayName: 'Tiro Rasid',
      key: "tiroRasid",
      status: this.data.detail.images.tiroRasid.status
    }, {
      displayName: 'Gharbato Siffarish',
      key: "gharBatoSifarish",
      status: this.data.detail.images.gharBatoSifarish.status
    }];

    if (this.data.detail.clients[0].clientOrganization) {
      this.uploadedList.push({
        displayName: 'Company documents',
        key: "companyDoc",
        status: this.data.detail.images.companyDoc.status
      }, {
        displayName: 'Registration doc',
        key: "registrationDoc",
        status: this.data.detail.images.registrationDoc.status
      }, {
        displayName: 'Pan/Vat doc',
        key: "panDoc",
        status: this.data.detail.images.panDoc.status
      }, {
        displayName: 'Tax clearance certificate',
        key: "taxClearCertificate",
        status: this.data.detail.images.taxClearCertificate.status
      })
    }

    if (this.data.detail.typeOfProperty === 'lnb') {
      this.uploadedList.push({
        displayName: 'Building Drawing',
        key: "approvedBuildingDrawing",
        status: this.data.detail.images.approvedBuildingDrawing.status
      }, {
        displayName: 'Construction Approval Certificate',
        key: "constructionApprovalCertificate",
        status: this.data.detail.images.constructionApprovalCertificate.status
      }, {
        displayName: 'Construction Completion Certificate',
        key: "constructionCompletionCertificate",
        status: this.data.detail.images.constructionCompletionCertificate.status
      }, {
        displayName: 'Tax payment receipt',
        key: "buildingTaxPaymentReceipt",
        status: this.data.detail.images.buildingTaxPaymentReceipt.status
      });
    }
  }

  uploadFile(evt, key) {
    const files = evt.target.files;
    if (files.length > 0) {
      let file;
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        file = files[i];
        formData.append('image', file, file.name);
      }
      this.valuationService.imageUpload(formData, { id: this.data.detail.id, name: key })
        .subscribe(() => {
          this.dialogRef.close();
          this.snackBar.open('Uploaded Successfully!', '', {
            duration: 3000,
          });
        });
    }
  }

}


import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ValuationService } from '../valuation.service';
import { ConverterService } from '../converter.service';
import { CalculationService } from '../calculation.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { Coordinate } from '../cordinates';


@Component({
  selector: 'app-valuation-summary',
  templateUrl: './valuation-summary.component.html',
  styleUrls: ['./valuation-summary.component.css'],
  providers: [ValuationService, ConverterService, CalculationService]
})
export class ValuationSummaryComponent implements OnInit {
  valuationId: string;
  loader: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private valuationService: ValuationService,
              private converterService: ConverterService,
              private calculationService: CalculationService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  coordinates?: Coordinate[];
  @ViewChild('sidenav') sideNav: any;
  toggleNav: any;

  ngOnInit() {
    this.valuationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchValuation();
    this.toggleNav = () => {
      this.sideNav.toggle();
    };
  }

  detail = {
    owner: [],
    client: [],
    propertyType: {
      typeOfProperty: '',
      statusOfReport: ''
    },
    property: {
      plotNo: '',
      location: {
        wardNo: '',
        vdc: '',
        district: ''
      },
      triangulation: {
        totalLandAreaPerLalPurja: {
          total: ''
        },
        totalArea: '',
        parameterBoundaries: {
          east: '',
          west: '',
          north: '',
          south: ''
        }
      },
      propertyValuation: {
        marketRate: '',
        governmentRate: '',
        marketPercentage: '',
        governmentPercentage: ''
      },
      otherInfo: {
        coordinates: []
      }
    },
    buildingTypeInformation: {
      buildingInfo: {
        buildingAge: '',
        perDrawingArea: ''
      },
      buildingValuation: {},
      valueOfBuilding: [],
      costInfo: {
        costOfWorker: '',
        sanitaryCharges: '',
        totalCost: ''
      }
    }
  };

  areaInformation = [];
  valueOfProperty = [];
  totalfloorAreaOfBuilding = [];

  fetchValuation() {
    this.loader = true;
    this.valuationService.fetchValuation(this.valuationId)
      .subscribe(response => {
        this.loader = false;
        this.detail = response;
        this.coordinates = this.detail.property.otherInfo.coordinates;
        const asPerLalPurjaRAPD = this.detail.property.triangulation.totalLandAreaPerLalPurja;
        const totalAreaTriangulation = this.detail.property.triangulation.totalArea;
        const asPerMeasurementRAPD = this.converterService.convertSqMeterAreaIntoRAPD(this.detail.property.triangulation.totalArea);
        this.areaInformation = this.calculationService.areaInfo(asPerLalPurjaRAPD, asPerMeasurementRAPD, totalAreaTriangulation);

        if (this.detail.propertyType.typeOfProperty === 'lnb') {
          this.valueOfProperty = [
            {
              "particulars": "Land",
              "marketValue": this.getMarketAmount(),
              "bankValue": this.getBankValueAmount()
            },
            {
              "particulars": "Building",
              "marketValue": this.netTotal(),
              "bankValue": this.netTotal()
            },
            {
              "particulars": "Total Amount",
              "marketValue": this.getMarketAmount() + this.netTotal(),
              "bankValue": this.getBankValueAmount() + this.netTotal()

            }
          ];

          var perDrawingArea = this.detail.buildingTypeInformation.buildingInfo.perDrawingArea;
          return this.totalfloorAreaOfBuilding = [{
            "particulars": "As Per Drawing",
            "area": perDrawingArea
          }, {
            "particulars": "As Per Construction",
            "area": this.totalFloorArea()
          }, {
            "particulars": "Area Considered",
            "area": +perDrawingArea < this.totalFloorArea() ? perDrawingArea : this.totalFloorArea()
          }]
        } else {
          this.valueOfProperty = [
            {
              "particulars": "Land",
              "marketValue": this.getMarketAmount(),
              "bankValue": this.getBankValueAmount()
            }
          ];
        }
      });
  }

  confirmDeleteValuation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.valuationService.deleteValaution(this.valuationId)
          .subscribe(() => {
            this.snackBar.open('Deleted Successfully!', '', {
              duration: 3000,
            });
            this.router.navigate(['valuations']);
          }, err => {
            this.snackBar.open('Failed to delete, try-again!', '', {
              duration: 3000,
            });
          });
      }
    });
  }

  printValuation() {
    window.print();
  }

  goBack() {
    window.history.back();
  }

  navigateToEdit() {
    this.router.navigate(['valuations/create', { valuationId: this.valuationId, action: 'edit' }]);
  }

  getAnnaFromSqMeter() {
    const totalAreaAsPerMeasurementInSqMeter = parseInt(this.detail.property.triangulation.totalArea);
    const totalAreaAsPerLaalpurjaInSqMeter = parseInt(this.detail.property.triangulation.totalLandAreaPerLalPurja.total);
    const areaInSqMeter = totalAreaAsPerMeasurementInSqMeter >
    totalAreaAsPerLaalpurjaInSqMeter ? totalAreaAsPerMeasurementInSqMeter : totalAreaAsPerLaalpurjaInSqMeter;
    return this.converterService.sqmeterToAnna(areaInSqMeter);
  }

  totalGovAnnaInNumber = 0;
  totalMarAnnaInNumber = 0;

  getGovernmentAmount() {
    const totalAnna = this.getAnnaFromSqMeter();
    this.totalGovAnnaInNumber = totalAnna * parseInt(this.detail.property.propertyValuation.governmentRate);
    return this.totalGovAnnaInNumber;
  }

  getNumberInWords(input) {
    return this.calculationService.inWords(input);
  }


  getMarketAmount() {
    const totalAnna = this.getAnnaFromSqMeter();
    this.totalMarAnnaInNumber = totalAnna * parseInt(this.detail.property.propertyValuation.marketRate);
    return this.totalMarAnnaInNumber;
  }

  getBankValueAmount() {
    const marketAmount = this.getMarketAmount();
    const governmentAmount = this.getGovernmentAmount();
    const marketPercentToBeconsidered = parseInt(this.detail.property.propertyValuation.marketPercentage);
    const governmentPercentToBeConsidered = parseInt(this.detail.property.propertyValuation.governmentPercentage);
    const marketValue = (marketPercentToBeconsidered / 100) * marketAmount;
    const governmentValue = (governmentPercentToBeConsidered / 100) * governmentAmount;
    return (+marketValue) + (+governmentValue);
  }

  getAverageRatePerAnna() {
    const govRate = parseInt(this.detail.property.propertyValuation.governmentRate);
    const mRate = parseInt(this.detail.property.propertyValuation.marketRate);
    const govValue = (parseInt(this.detail.property.propertyValuation.governmentPercentage) / 100) * govRate;
    const mValue = (parseInt(this.detail.property.propertyValuation.marketPercentage) / 100) * mRate;
    return govValue + mValue;
  }

  totalDepreciation() {
    const buildingAge = +this.detail.buildingTypeInformation.buildingInfo.buildingAge;
    return this.calculationService.totalDepreciation(buildingAge)
  }

  tenPercent() {
    const total = this.totalAmount();
    return this.calculationService.tenPercent(total);
  }

  netTotal() {
    return this.tenPercent() + this.totalAmount();
  }

  totalDepreciationAmount() {
    return (this.totalDepreciation() / 100) * this.netTotal()
  }

  totalAmount() {
    return this.calculationService.totalAmount(this.detail.buildingTypeInformation.valueOfBuilding);
  }

  netValueOfBuildingAfterDepreciation() {
    return this.netTotal() - this.totalDepreciationAmount()
  }


  totalFloorArea() {
    return this.calculationService.totalFloorArea(this.detail.buildingTypeInformation.valueOfBuilding);
  }

  averageRateOfFloorAfterDedcution() {
    return this.netValueOfBuildingAfterDepreciation() / this.totalFloorArea()
  }

  totalBankValue() {
    return this.netTotal() + this.getBankValueAmount();
  }

}

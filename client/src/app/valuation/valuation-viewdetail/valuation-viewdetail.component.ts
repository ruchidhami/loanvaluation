import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ValuationService } from '../valuation.service';
import { ConverterService } from '../converter.service';
import { CalculationService } from '../calculation.service';

@Component({
  selector: 'app-valuation-viewdetail',
  templateUrl: './valuation-viewdetail.component.html',
  styleUrls: ['./valuation-viewdetail.component.css'],
  providers: [ValuationService, ConverterService, CalculationService]
})
export class ValuationViewdetailComponent implements OnInit {

  valuationId: string;
  loader: boolean;

  constructor(public dialog: MatDialog,
              private valuationService: ValuationService,
              private activatedRoute: ActivatedRoute,
              private converterService: ConverterService,
              private calculationService: CalculationService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  @ViewChild('sidenav') sideNav: any;
  toggleNav: any;

  ngOnInit() {
    this.valuationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchValuation();

    this.toggleNav = () => {
      this.sideNav.toggle();
    };
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

  detail = {
    owner: [],
    client: [],
    property: {
      plotNo: 0,
      location: {
        wardNo: 0,
        vdc: '',
        district: '',
        typeOfLocation: '',
        nearestMarket: '',
        distanceFromHighway: '',
        highTensionLine: '',
        shapeOfLand: ''
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
      description: {
        typeOfOwnership: '',
        shapeOfLand: '',
        levelOfLand: '',
        topographyOfLand: '',
        natureOfSoil: '',
        accessOfLand: '',
        constructionOnLand: '',
        sewerFacility: true,
        waterFacility: true,
        electricitySupply: true,
        nature: ''
      },
      legalAspectsOfProperty: {
        ownershipOfLand:  '',
        ownershipComment:  '',
        registrationDate:  '',
        normalValue:  '',
        plotIndicatedValue:  true,
        clearlyMarkedValue:  true,
        freeAccessValue: true,
        partNotifiedValue: true,
        revenue: {
          paidValue: true,
          paymentDate: '',
          comments: ''
        },
        normalSale: {
          value: true,
          comment: ''
        },
        tallyInMap: {
          value: true,
          comment: ''
        },
        areaOfLand: {
          value: true,
          comment: ''
        },
        boundaryParameters: {
          value: true,
          paymentReceipt: '',
          comment: ''
        },
        boundary: {
          value: true,
          comment: ''
        }
      },
      remarks: [],
      importances: [],
      otherInfo: {
        preparedBy: '',
        reportDate: '',
        bankName: '',
        bankAddress: ''
      }
    },
    propertyType: {
      typeOfProperty: '',
      statusOfReport: ''
    },
    buildingTypeInformation: {
      buildingInfo: {
        buildingAge: '',
        typeOfOwnerShip: '',
        purposeOfBuilding: '',
        typeOfStructure: '',
        thicknessOfSlab: '',
        thicknessOfWall: '',
        heightOfEachFloor: '',
        typeOfFoundation: '',
        buildingExpectedLife: '',
        sewerFacilityOnBuilding: '',
        waterFacilityOnBuilding: '',
        electricityFacilityOnBuilding: ''
      },
      buildingValuation: {
        noOfFloors: ''
      },
      valueOfBuilding: [],
      costInfo: {
        costOfWorker: '',
        sanitaryCharges: '',
        totalCost: ''
      }
    }
  };

  areaInformation = [];
  buildingInformation = [];

  buildingInfo() {
    this.buildingInformation = [{
      field: "Type of Ownership",
      value: this.detail.buildingTypeInformation.buildingInfo.typeOfOwnerShip
    }, {
      field: "Purpose of the Building",
      value: this.detail.buildingTypeInformation.buildingInfo.purposeOfBuilding
    }, {
      field: "Number of floor of the Building Constructed",
      value: this.detail.buildingTypeInformation.buildingValuation.noOfFloors
    }, {
      field: "Total Sq ft of Building",
      value: this.totalFloorArea()
    }, {
      field: "Type of the Building's Structure",
      value: this.detail.buildingTypeInformation.buildingInfo.typeOfStructure
    }, {
      field: "Thickness of Slab",
      value: this.detail.buildingTypeInformation.buildingInfo.thicknessOfSlab
    }, {
      field: "Thickness of Wall",
      value: this.detail.buildingTypeInformation.buildingInfo.thicknessOfWall
    }, {
      field: "Height of each Floor of Building",
      value: this.detail.buildingTypeInformation.buildingInfo.heightOfEachFloor
    }, {
      field: "Type of Foundation of Building",
      value: this.detail.buildingTypeInformation.buildingInfo.typeOfFoundation
    }, {
      field: "Age of the Building",
      value: this.detail.buildingTypeInformation.buildingInfo.buildingAge
    }, {
      field: "Expected life of Building",
      value: this.detail.buildingTypeInformation.buildingInfo.buildingExpectedLife
    }, {
      field: "Sewer facility in the building",
      value: this.detail.buildingTypeInformation.buildingInfo.sewerFacilityOnBuilding
    }, {
      field: "Water supply facility in the Building",
      value: this.detail.buildingTypeInformation.buildingInfo.waterFacilityOnBuilding
    }, {
      field: "Electricity Supply in the Building",
      value: this.detail.buildingTypeInformation.buildingInfo.electricityFacilityOnBuilding
    }];
  }

  fetchValuation() {
    this.loader = true;
    this.valuationService.fetchValuation(this.valuationId)
      .subscribe(response => {
        this.loader = false;
        this.detail = response;
        if (this.detail.propertyType.typeOfProperty === 'lnb') {
          this.buildingInfo();
        }
        const asPerLalPurjaRAPD = this.detail.property.triangulation.totalLandAreaPerLalPurja;
        const totalAreaTriangulation = this.detail.property.triangulation.totalArea;
        const asPerMeasurementRAPD = this.converterService.convertSqMeterAreaIntoRAPD(this.detail.property.triangulation.totalArea);
        this.areaInformation = this.calculationService.areaInfo(asPerLalPurjaRAPD, asPerMeasurementRAPD, totalAreaTriangulation);
      });
  }

  getAnnaFromSqMeter() {
    const totalAreaAsPerMeasurementInSqMeter = parseInt(this.detail.property.triangulation.totalArea);
    const totalAreaAsPerLaalpurjaInSqMeter = parseInt(this.detail.property.triangulation.totalLandAreaPerLalPurja.total);
    const areaInSqMeter = totalAreaAsPerMeasurementInSqMeter > totalAreaAsPerLaalpurjaInSqMeter ? totalAreaAsPerMeasurementInSqMeter : totalAreaAsPerLaalpurjaInSqMeter;
    return this.converterService.sqmeterToAnna(areaInSqMeter);
  }

  totalGovAnnaInNumber = 0;
  totalMarAnnaInNumber = 0;

  getGovernmentAmount() {
    var totalAnna = this.getAnnaFromSqMeter();
    this.totalGovAnnaInNumber = totalAnna * parseInt(this.detail.property.propertyValuation.governmentRate);
    return this.totalGovAnnaInNumber;
  }

  getMarketAmount() {
    var totalAnna = this.getAnnaFromSqMeter();
    this.totalMarAnnaInNumber = totalAnna * parseInt(this.detail.property.propertyValuation.marketRate);
    return this.totalMarAnnaInNumber;
  }

  getNumberInWords(input) {
    return this.calculationService.inWords(input);
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
    if (this.detail.buildingTypeInformation.buildingInfo) {
      let buildingAge = +this.detail.buildingTypeInformation.buildingInfo.buildingAge;
      return this.calculationService.totalDepreciation(buildingAge)
    }
  }

  totalDepreciationAmount() {
    return (this.totalDepreciation() / 100) * this.netTotal()
  }

  tenPercent() {
    let total = this.totalAmount();
    return this.calculationService.tenPercent(total);
  }

  totalAmount() {
    return this.calculationService.totalAmount(this.detail.buildingTypeInformation.valueOfBuilding);
  }

  netTotal() {
    return this.tenPercent() + this.totalAmount();
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';

import { ValuationService } from '../valuation.service';
import { ConverterService, NPLandUnit } from '../converter.service';

import { Coordinate } from '../cordinates';

declare var $: any;

@Component({
  selector: 'app-valuation-create',
  templateUrl: './valuation-create.component.html',
  styleUrls: ['./valuation-create.component.css'],
  providers: [ValuationService, ConverterService]
})
export class ValuationCreateComponent implements OnInit {

  constructor(private valuationService: ValuationService,
              private converterService: ConverterService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  totalLandAreaPerLalPurja = [];
  coordinates?: Coordinate[];
  valuationId: string;
  action: string;
  loader: boolean;


  @ViewChild('sidenav') sideNav: any;
  toggleNav: any;

  ngOnInit() {
    $(document).ready(function () {
      $("#date-picker").nepaliDatePicker({
        dateFormat: "%D, %M %d, %y",
        closeOnDateSelect: true
      });
    });

    this.addClient();
    this.addOwner();
    this.addRemarks();
    this.addImportance();

    this.toggleNav = () => {
      this.sideNav.toggle();
    };

    this.property.triangulation.unitOfMeasurement = 'meter';
    this.totalLandAreaPerLalPurja.push({
      ropani: 0,
      anna: 0,
      paisa: 0,
      daam: 0,
      total: 0
    });
    this.valuationId = this.activatedRoute.snapshot.paramMap.get('valuationId');
    this.action = this.activatedRoute.snapshot.paramMap.get('action');
    this.property.triangulation.unitOfMeasurement = 'meter';

    if (this.action === 'edit') {
      this.fetchValuation();
    }

  }

  toggoleShowHide: string = 'none';
  clients = [];
  owners = [];
  propertyType = {
    typeOfProperty: '',
    statusOfReport: ''
  };

  buildingTypeInformation = {
    buildingInfo: {
      typeOfOwnerShip: '',
      purposeOfBuilding: '',
      typeOfStructure: '',
      thicknessOfSlab: '',
      thicknessOfWall: '',
      perDrawingArea: '',
      heightOfEachFloor: '',
      typeOfFoundation: '',
      buildingAge: '',
      buildingExpectedLife: '',
      sewerFacilityOnBuilding: true,
      waterFacilityOnBuilding: true,
      electricityFacilityOnBuilding: true
    },
    buildingValuation: {
      noOfFloors: 0,
      ratePerSqFeetGroundFloor: '',
      ratePerSqFeetOtherFloor: '',
      baseArea: ''
    },
    valueOfBuilding: [],
    costInfo: {
      costOfWorker: '',
      sanitaryCharges: '',
      totalCost: ''
    }
  };

  property = {
    plotNo: '',
    location: {
      wardNo: '',
      vdc: '',
      district: '',
      typeOfLocation: '',
      shapeOfLand: '',
      nearestMarket: '',
      distanceFromHighway: '',
      highTensionLine: ''
    },
    description: {
      typeOfOwnership: '',
      levelOfLand: '',
      topographyOfLand: '',
      natureOfSoil: '',
      accessOfLand: '',
      constructionOnLand: true,
      sewerFacility: true,
      waterFacility: true,
      electricitySupply: true,
      nature: ''
    },
    triangulation: {
      numberOfTriangle: '',
      unitOfMeasurement: '',
      totalLandAreaPerMeasurement: [],
      totalArea: 0,
      totalLandAreaPerLalPurja: {},
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
    legalAspectsOfProperty: {
      ownershipOfLand: '',
      ownershipComment: '',
      revenue: {
        paidValue: true,
        paymentDate: new Date(),
        comments: ''
      },
      normalValue: true,
      registrationDate: new Date(),
      normalSale: {
        value: true,
        comment: ''
      },
      plotIndicatedValue: true,
      clearlyMarkedValue: true,
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
        paymentReceipt: new Date(),
        comment: ''
      },
      freeAccessValue: true,
      partNotifiedValue: true,
      boundary: {
        value: true,
        comment: ''
      }
    },
    remarks: [],
    importances: [],
    otherInfo: {
      bankName: '',
      bankAddress: '',
      preparedBy: '',
      reportDate: new Date(),
      coordinates: []
    }
  };


  addClient() {
    this.clients.push({
      fullName: '',
      clientOrganization: true,
      address: {
        wardNo: '',
        vdc: '',
        district: '',
      },
      contactNumber: '',
      citizenshipInformation: {
        citizenshipNumber: '',
        issuedDate: '',
        issuedOffice: '',
        fatherName: '',
        motherName: '',
        spouse: '',
        fatherInLawName: ''
      }
    })
  }

  removeClient(index) {
    this.clients.splice(index, 1);
  }

  addOwner() {
    this.owners.push({
      fullName: '',
      address: {
        wardNo: '',
        vdc: '',
        district: '',
      },
      contactNumber: '',
      citizenshipInformation: {
        citizenshipNumber: '',
        issuedDate: new Date(),
        issuedOffice: '',
        fatherName: '',
        motherName: '',
        spouse: '',
        fatherInLawName: ''
      }
    })
  }

  removeOwner(index) {
    this.owners.splice(index, 1);
  }

  addRemarks() {
    this.property.remarks.push({
      value: ''
    })
  }

  removeRemarks(index) {
    this.property.remarks.splice(index, 1);
  }

  addImportance() {
    this.property.importances.push({
      value: ''
    })
  }

  removeImportance(index) {
    this.property.importances.splice(index, 1);
  }

  addBuilding() {
    this.toggoleShowHide = 'block';
  }

  removeBuilding() {
    this.toggoleShowHide = 'none';
    this.buildingTypeInformation = {
      buildingInfo: {
        typeOfOwnerShip: '',
        purposeOfBuilding: '',
        typeOfStructure: '',
        thicknessOfSlab: '',
        thicknessOfWall: '',
        perDrawingArea: '',
        heightOfEachFloor: '',
        typeOfFoundation: '',
        buildingAge: '',
        buildingExpectedLife: '',
        sewerFacilityOnBuilding: true,
        waterFacilityOnBuilding: true,
        electricityFacilityOnBuilding: true
      },
      buildingValuation: {
        noOfFloors: 0,
        ratePerSqFeetGroundFloor: '',
        ratePerSqFeetOtherFloor: '',
        baseArea: ''
      },
      valueOfBuilding: [],
      costInfo: {
        costOfWorker: '',
        sanitaryCharges: '',
        totalCost: ''
      }

    };
  }

  addTableRow(number) {
    this.property.triangulation.totalLandAreaPerMeasurement = [];
    for (let i = 0; number > i; i++) {
      this.property.triangulation.totalLandAreaPerMeasurement.push({
        sideA: 0,
        sideB: 0,
        sideC: 0,
        total: 0
      });
    }
  }

  selectedIndex: number;

  selectTab(index: number, isValid: boolean): void {
    if (isValid) {
      this.selectedIndex = index;
    }
  }

  commonFunctionCalculation(value) {
    const sideA = +value.sideA;
    const sideB = +value.sideB;
    const sideC = +value.sideC;
    const totalParameter = (sideA + sideB + sideC) / 2;
    const sideAreaCalculation = +Math.sqrt((totalParameter * (totalParameter - sideA) *
    (totalParameter - sideB) * (totalParameter - sideC))).toFixed(4);
    return sideAreaCalculation;
  }

  areaOfTriangle(value: any, index: any) {
    const area = this.commonFunctionCalculation(value);
    if (area > 0) {
      this.property.triangulation.totalLandAreaPerMeasurement[index].total = area;
    }
    return area;
  }

  totalSum() {
    if (!this.property.triangulation.totalLandAreaPerMeasurement) {
      return 0;
    }
    let totalArea = 0;
    for (const value of  this.property.triangulation.totalLandAreaPerMeasurement) {
      const area = this.commonFunctionCalculation(value);
      totalArea += area;
      totalArea = +totalArea.toFixed(4);
      this.property.triangulation.totalArea = totalArea;
    }
    return totalArea
  }

  totalAreaSum() {
    const sum = this.totalSum();
    return sum + ' Sq. ' + this.property.triangulation.unitOfMeasurement;
  }

  landAreaStringified(unit: NPLandUnit) {
    let rapdCalculation;
    if (this.property.triangulation.unitOfMeasurement == 'meter') {
      rapdCalculation = this.converterService.convertRAPDIntoSqMeter(unit).toFixed(4);
      this.totalLandAreaPerLalPurja[0].total = rapdCalculation.toString() + 'Sq. Meter ';
      this.property.triangulation.totalLandAreaPerLalPurja = this.totalLandAreaPerLalPurja[0];
      return rapdCalculation + 'Sq. Meter ';
    } else {
      rapdCalculation = (this.converterService.convertRAPDIntoSqMeter(unit) * 10.7639).toFixed(4);
      this.totalLandAreaPerLalPurja[0].total = rapdCalculation.toString() + 'Sq. Feet ';
      this.property.triangulation.totalLandAreaPerLalPurja = this.totalLandAreaPerLalPurja[0];
      return rapdCalculation + 'Sq. Feet ';
    }
  }

  formCalculation() {
    if (this.buildingTypeInformation.buildingValuation.noOfFloors > 0) {
      const number = this.buildingTypeInformation.buildingValuation.noOfFloors;
      const int = +number;

      const area = this.buildingTypeInformation.buildingValuation.baseArea;
      const intArea = +area;

      const rateOfGroundFloor = this.buildingTypeInformation.buildingValuation.ratePerSqFeetGroundFloor;
      const intRateOfGroundFloor = +rateOfGroundFloor;

      const rateOfOtherFloor = this.buildingTypeInformation.buildingValuation.ratePerSqFeetOtherFloor;
      const intRateOfOtherFloor = +rateOfOtherFloor;


      const total = intArea * intRateOfGroundFloor;
      const totalOfOtherFloor = intArea * intRateOfOtherFloor;

      this.buildingTypeInformation.valueOfBuilding = [];
      const addNumOfOtherFloor = [];
      let totalSum;
      let totalSumOfOtherFloor;
      for (let i = 0; int > i; i++) {
        if (i == 0) {
          this.buildingTypeInformation.valueOfBuilding.push({
            floorName: 'Ground Floor',
            unit: 'Sqft',
            area: area,
            rate: rateOfGroundFloor,
            total: total
          });
          totalSum = total;
        } else {
          this.buildingTypeInformation.valueOfBuilding.push({
            floorName: 'Floor' + '-' + i,
            unit: 'Sqft',
            area: area,
            rate: rateOfOtherFloor,
            total: totalOfOtherFloor
          });
          addNumOfOtherFloor.push(totalOfOtherFloor);
          totalSumOfOtherFloor = addNumOfOtherFloor.reduce((a, b) => a + b, 0);
        }

        this.buildingTypeInformation.costInfo.costOfWorker = totalSum + totalSumOfOtherFloor;
        this.buildingTypeInformation.costInfo.sanitaryCharges = (+this.buildingTypeInformation.costInfo.costOfWorker * 0.1 ).toString();
        this.buildingTypeInformation.costInfo.totalCost = (+this.buildingTypeInformation.costInfo.costOfWorker + +this.buildingTypeInformation.costInfo.sanitaryCharges).toString();
      }
    } else {
      if (this.propertyType.typeOfProperty === 'lnb') {
        this.snackBar.open('Please enter the floor for the calculation.', '', {
          duration: 3000,
          extraClasses: 'error',
        });
      }
    }
  }

  valueOfBuildingTotal(t, index) {
    const area = +t.area;
    const rate = +t.rate;
    const total = (area * rate);
    this.buildingTypeInformation.valueOfBuilding[index].total = total;
    return total;
  }

  totalAmount(): number {
    let totalAmount = 0;
    for (const f of this.buildingTypeInformation.valueOfBuilding) {
      totalAmount = totalAmount + +(f.area * f.rate);
      this.buildingTypeInformation.costInfo.costOfWorker = totalAmount.toString();
    }
    return totalAmount;
  }

  tenPercent(): number {
    const total = this.totalAmount();
    const totalTenPercent = +(0.1 * total).toFixed(2);
    this.buildingTypeInformation.costInfo.sanitaryCharges = totalTenPercent.toString();
    return totalTenPercent;
  }

  netTotal(): number {
    const netTotal = this.tenPercent() + this.totalAmount();
    this.buildingTypeInformation.costInfo.totalCost = netTotal.toString();
    return netTotal;
  }

  submitValuation() {
    if (this.property.otherInfo.coordinates.length == 2) {
      this.loader = true;
      this.valuationService.createValaution({
        propertyType: this.propertyType, client: this.clients,
        owner: this.owners, property: this.property, buildingTypeInformation: this.buildingTypeInformation
      })
        .subscribe(result => {
          this.router.navigate(['valuations']);
          this.snackBar.open('Created Successfully!', '', {
            duration: 3000,
          });
        }, err => {
          this.loader = false;
          this.snackBar.open('Field is missing.Please re-check.', '', {
            duration: 3000,
            extraClasses: 'error',
          });
        });
    } else {
      this.loader = false;
      this.snackBar.open('Please, pick at least two coordinates data in map.', '', {
        duration: 3000,
        extraClasses: 'error'
      })
    }
  }

  fetchValuation() {
    this.loader = true;
    this.valuationService.fetchValuation(this.valuationId)
      .subscribe(result => {
        this.clients = result.client;
        this.owners = result.owner;
        this.property = result.property;
        this.coordinates = result.property.otherInfo.coordinates;
        this.totalLandAreaPerLalPurja[0].anna = result.property.triangulation.totalLandAreaPerLalPurja.anna;
        this.totalLandAreaPerLalPurja[0].paisa = result.property.triangulation.totalLandAreaPerLalPurja.paisa;
        this.totalLandAreaPerLalPurja[0].ropani = result.property.triangulation.totalLandAreaPerLalPurja.ropani;
        this.totalLandAreaPerLalPurja[0].daam = result.property.triangulation.totalLandAreaPerLalPurja.daam;
        this.totalLandAreaPerLalPurja[0].total = result.property.triangulation.totalLandAreaPerLalPurja.total;
        this.propertyType = result.propertyType;
        if (this.propertyType.typeOfProperty === 'lnb') {
          this.toggoleShowHide = 'block';
          this.buildingTypeInformation = result.buildingTypeInformation;
        }
        this.formCalculation();
        this.loader = false;
      }, err => {
        this.loader = false;
        this.snackBar.open('Could not fetch, Please try again!', '', {
          duration: 3000,
        });
      })
  }

  editValuation() {
    if (this.action === 'edit') {
      if (this.property.otherInfo.coordinates.length == 2) {
        this.loader = true;
        this.valuationService.editValuation(this.valuationId, {
          propertyType: this.propertyType, client: this.clients,
          owner: this.owners, property: this.property, buildingTypeInformation: this.buildingTypeInformation
        })
          .subscribe(result => {
            this.router.navigate(['valuations']);
            this.snackBar.open('Edited Successfully!', '', {
              duration: 3000

            });
          }, err => {
            this.loader = false;
            this.snackBar.open('Failed to edit, Please try again!', '', {
              duration: 3000,
              extraClasses: 'error'
            })
          })
      } else {
        this.loader = false;
        this.snackBar.open('Please, pick at least two coordinates data in map.', '', {
          duration: 3000,
          extraClasses: 'error'
        })
      }
    }
  }

  onMarkerAdd(coordinates: Coordinate[]) {
    this.property.otherInfo.coordinates = coordinates;
  }

}

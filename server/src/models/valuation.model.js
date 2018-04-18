='use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const valuationSchema = new Schema({
  images: {
    lalpurja: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    citizenshipClient: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    citizenshipOwner: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    companyDoc: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    registrationDoc: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    panDoc: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    taxClearCertificate: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    charkillaOrg: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    bluePrint: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    trace: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    tiroRasid: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    gharBatoSifarish: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    approvedBuildingDrawing: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    constructionApprovalCertificate: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    constructionCompletionCertificate: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    },
    buildingTaxPaymentReceipt: {
      status: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
      }
    }
  },
  propertyType: {
    typeOfProperty: {
      type: String,
      required: true
    },
    statusOfReport: {
      type: String,
      required: true
    }
  },
  buildingTypeInformation: {
    buildingInfo: {
      typeOfOwnerShip: {
        type: String
      },
      purposeOfBuilding: {
        type: String
      },
      typeOfStructure: {
        type: String
      },
      thicknessOfSlab: {
        type: String
      },
      thicknessOfWall: {
        type: String
      },
      perDrawingArea: {
        type: String
      },
      heightOfEachFloor: {
        type: String
      },
      typeOfFoundation: {
        type: String
      },
      buildingAge: {
        type: String
      },
      buildingExpectedLife: {
        type: String
      },
      sewerFacilityOnBuilding: {
        type: Boolean
      },
      waterFacilityOnBuilding: {
        type: Boolean
      },
      electricityFacilityOnBuilding: {
        type: Boolean
      }
    },
    buildingValuation: {
      noOfFloors: {
        type: String
      },
      ratePerSqFeetGroundFloor: {
        type: String
      },
      ratePerSqFeetOtherFloor: {
        type: String
      },
      baseArea: {
        type: String
      }
    },
    valueOfBuilding: [{
      floorName: {
        type: String
      },
      unit: {
        type: String
      },
      area: {
        type: String
      },
      rate: {
        type: String
      },
      total: {
        type: String
      }
    }],
    costInfo: {
      costOfWorker: {
        type: String
      },
      sanitaryCharges: {
        type: String
      },
      totalCost: {
        type: String
      }
    }
  },
  client: [{
    fullName: {
      type: String,
      required: true
    },
    clientOrganization: {
      type: Boolean,
      required: true
    },
    address: {
      wardNo: {
        type: String,
        required: true
      },
      vdc: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      }
    },
    contactNumber: {
      type: String,
      required: true
    },
    citizenshipInformation: {
      citizenshipNumber: {
        type: String,
        required: true
      },
      issuedDate: {
        type: String,
        required: true
      },
      issuedOffice: {
        type: String,
        required: true
      },
      fatherName: {
        type: String,
        required: true
      },
      motherName: {
        type: String,
        required: true
      },
      spouse: {
        type: String
      },
      fatherInLawName: {
        type: String
      }
    }
  }],
  owner: [{
    fullName: {
      type: String,
      required: true
    },
    address: {
      wardNo: {
        type: String,
        required: true
      },
      vdc: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      }
    },
    contactNumber: {
      type: String,
      required: true
    },
    citizenshipInformation: {
      citizenshipNumber: {
        type: String,
        required: true
      },
      issuedDate: {
        type: String,
        required: true
      },
      issuedOffice: {
        type: String,
        required: true
      },
      fatherName: {
        type: String,
        required: true
      },
      motherName: {
        type: String,
        required: true
      },
      spouse: {
        type: String
      },
      fatherInLawName: {
        type: String
      }
    },
    documentImages: []
  }],
  property: {
    plotNo: {
      type: String,
      required: true
    },
    location: {
      wardNo: {
        type: String,
        required: true
      },
      vdc: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      },
      typeOfLocation: {
        type: String,
        required: true
      },
      shapeOfLand: {
        type: String,
        required: true
      },
      nearestMarket: {
        type: String,
        required: true
      },
      distanceFromHighway: {
        type: String,
        required: true
      },
      highTensionLine: {
        type: String,
        required: true
      }
    },
    description: {
      typeOfOwnership: {
        type: String,
        required: true
      },
      levelOfLand: {
        type: String,
        required: true
      },
      topographyOfLand: {
        type: String,
        required: true
      },
      natureOfSoil: {
        type: String,
        required: true
      },
      accessOfLand: {
        type: String,
        required: true
      },
      constructionOnLand: {
        type: Boolean,
        required: true
      },
      sewerFacility: {
        type: Boolean,
        required: true
      },
      waterFacility: {
        type: Boolean,
        required: true
      },
      electricitySupply: {
        type: Boolean,
        required: true
      },
      nature: {
        type: String,
        required: true
      }
    },
    triangulation: {
      numberOfTriangle: {
        type: String,
        required: true
      },
      unitOfMeasurement: {
        type: String,
        required: true
      },
      totalLandAreaPerMeasurement: [{
        sideA: {
          type: String,
          required: true
        },
        sideB: {
          type: String,
          required: true
        },
        sideC: {
          type: String,
          required: true
        },
        total: {
          type: String,
          required: true
        }
      }],
      totalArea: {
        type: String,
        required: true
      },
      totalLandAreaPerLalPurja: {
        ropani: {
          type: String,
          required: true
        },
        anna: {
          type: String,
          required: true
        },
        paisa: {
          type: String,
          required: true
        },
        daam: {
          type: String,
          required: true
        },
        total: {
          type: String,
          required: true
        }
      },
      parameterBoundaries: {
        east: {
          type: String,
          required: true
        },
        west: {
          type: String,
          required: true
        },
        north: {
          type: String,
          required: true
        },
        south: {
          type: String,
          required: true
        }
      }
    },
    propertyValuation: {
      marketRate: {
        type: String,
        required: true
      },
      governmentRate: {
        type: String,
        required: true
      },
      marketPercentage: {
        type: String,
        required: true
      },
      governmentPercentage: {
        type: String,
        required: true
      }
    },
    legalAspectsOfProperty: {
      ownershipOfLand: {
        type: String,
        required: true
      },
      ownershipComment: {
        type: String,
        required: true
      },
      revenue: {
        paidValue: {
          type: Boolean,
          required: true
        },
        paymentDate: {
          type: String,
          required: true
        },
        comments: {
          type: String
        }
      },
      normalValue: {
        type: Boolean,
        required: true
      },
      registrationDate: {
        type: String,
        required: true
      },
      normalSale: {
        value: {
          type: Boolean,
          required: true
        },
        comment: {
          type: String
        }
      },
      plotIndicatedValue: {
        type: Boolean,
        required: true
      },
      clearlyMarkedValue: {
        type: Boolean,
        required: true
      },
      tallyInMap: {
        value: {
          type: Boolean,
          required: true
        },
        comment: {
          type: String
        }
      },
      areaOfLand: {
        value: {
          type: Boolean,
          required: true
        },
        comment: {
          type: String
        }
      },
      boundaryParameters: {
        value: {
          type: Boolean,
          required: true
        },
        paymentReceipt: {
          type: String,
          required: true
        },
        comment: {
          type: String
        }
      },
      freeAccessValue: {
        type: Boolean,
        required: true
      },
      partNotifiedValue: {
        type: Boolean,
        required: true
      },
      boundary: {
        value: {
          type: Boolean,
          required: true
        },
        comment: {
          type: String
        }
      }
    },
    remarks: [{
      value: {
        type: String,
        required: true
      }
    }],
    importances: [{
      value: {
        type: String,
        required: true
      }
    }],
    otherInfo: {
      bankName: {
        type: String,
        required: true
      },
      bankAddress: {
        type: String,
        required: true
      },
      preparedBy: {
        type: String,
        required: true
      },
      reportDate: {
        type: String,
        required: true
      },
      coordinates: [{
        title: {
          type: String
        },
        lat: {
          type: Number
        },
        lng: {
          type: Number
        }
      }]
    }
  }
});

const Valuation = mongoose.model('Valuation', valuationSchema);

module.exports = Valuation;

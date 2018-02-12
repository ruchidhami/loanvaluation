"use strict";

const _ = require('underscore');
const Promise = require('bluebird');

const ValuationService = require('../../services/valuation.service');

function createValuation(req, res, next) {
  let params = req.body;
  // params = {
  //   propertyType: {
  //     typeOfProperty:  "land",
  //     statusOfReport: "site visited"
  //   },
  //   client: [{
  //     fullName: "Simran khadka",
  //     clientOrganization: true,
  //     address: {
  //       wardNo: "9",
  //       vdc: "Bangaun,",
  //       district: "Kanchanpur"
  //     },
  //     contactNumber: "9876578678",
  //     citizenshipInformation: {
  //       citizenshipNumber: "3567",
  //       issuedDate: "2011-09-09",
  //       issuedOffice: "Laganghel,Lalitpur",
  //       fatherName: "Binod Khadka",
  //       motherName: "Bimla Khadka"
  //     }
  //   },
  //     {
  //       fullName: "Shreya khadka",
  //       clientOrganization: true,
  //       address: {
  //         wardNo: "9",
  //         vdc: "Bangaun,",
  //         district: "Kanchanpur"
  //       },
  //       contactNumber: "9876578678",
  //       citizenshipInformation: {
  //         citizenshipNumber: "2678",
  //         issuedDate: "2010-09-09",
  //         issuedOffice: "Laganghel,Lalitpur",
  //         fatherName: "Binod Khadka",
  //         motherName: "Bimla Khadka"
  //       }
  //     }],
  //   owner: [{
  //     fullName: "Binod Khadka",
  //     clientOrganization: true,
  //     address: {
  //       wardNo: "05",
  //       vdc: "Bangaun,",
  //       district: "Kanchanpur"
  //     },
  //     contactNumber: "9858767466",
  //     citizenshipInformation: {
  //       citizenshipNumber: "3456",
  //       issuedDate: "2048-09-09",
  //       issuedOffice: "Laganghel,Lalitpur",
  //       fatherName: "Ratan Khadka",
  //       motherName: "Maya Khadka"
  //     }
  //   }],
  //   property: {
  //     plotNo: "1256",
  //     location: {
  //       wardNo: "09",
  //       vdc: "Bangaun",
  //       district: "Kanchanpur",
  //       typeOfLocation: "Single",
  //       shapeOfLand: "Geometric",
  //       nearestMarket: "Bazar",
  //       distanceFromHighway: "9894 m",
  //       highTensionLine: "yes"
  //     },
  //     description: {
  //       typeOfOwnership: "ownership",
  //       levelOfLand: "Slope",
  //       topographyOfLand: "Plain",
  //       natureOfSoil: "Agricultural",
  //       accessOfLand: "yes",
  //       constructionOnLand: "No",
  //       sewerFacility: "Yes",
  //       waterFacility: "Yes",
  //       electricitySupply: "Yes",
  //       nature: "Peaceful"
  //     },
  //     triangulation: {
  //       numberOfTriangle: "2",
  //       unitOfMeasurement: "meter",
  //       totalLandAreaPerMeasurement: [{
  //         sideA: "3",
  //         sideB: "4",
  //         sideC: "3",
  //         total: "4.4721"
  //       },{
  //         sideA: "4",
  //         sideB: "5",
  //         sideC: "5",
  //         total: "13.637"
  //       }],
  //       totalArea:"13.6373",
  //       totalLandAreaPerLalPurja: {
  //         ropani: "0",
  //         anna: "3",
  //         paisa: "3",
  //         daam: "3",
  //         total: "125.2125"
  //       },
  //       parameterBoundaries: {
  //         east: "351",
  //         west: "352",
  //         north: "353",
  //         south: "354"
  //       }
  //     },
  //     propertyValuation: {
  //       marketRate: "1300000",
  //       governmentRate: "100000",
  //       marketPercentage:"66",
  //       governmentPercentage:"34"
  //     },
  //     legalAspectsOfProperty: {
  //       ownershipOfLand: "Single",
  //       ownershipComment: "comment on ownership",
  //       revenue: {
  //         paidValue: "yes",
  //         paymentDate: "2016-10-45",
  //         comments: " no any comments"
  //       },
  //       normalValue: "Normal",
  //       registrationDate: "2015-08-09",
  //       normalSale: {
  //         value: "yes",
  //         comment: "comment helooo hi hi "
  //       },
  //       plotIndicatedValue: "yes",
  //       clearlyMarkedValue: "yes",
  //       tallyInMap: {
  //         value: "yes",
  //         comment: "comment from tally map"
  //       },
  //       areaOfLand: {
  //         value: "Increased",
  //         comment: "ok"
  //       },
  //       boundaryParameters: {
  //         value: "yes",
  //         paymentReceipt: "2015-08-09",
  //         comment: "comment"
  //       },
  //       freeAccessValue: "yes",
  //       partNotifiedValue: "yes",
  //       boundary: {
  //         value: "no",
  //         comment: "not done"
  //       }
  //     },
  //     remarks: [{
  //       value: "This land is so good."
  //     }, {
  //       value: "This land has huge amount of advantange"
  //     }],
  //     importances: [{
  //       value: "This land is in high profile residential area"
  //     }, {
  //       value: "This land is in high profile residential area"
  //     }],
  //     otherInfo: {
  //       bankName: "Rastriya Bank",
  //       bankAddress: "Kanchanpur",
  //       preparedBy: "Sumit Maharjan",
  //       reportDate: "2017-10-09"
  //     }
  //   }
  // };

  ValuationService.create(params)
    .then(createdResponse => {
      res.send({
        data: {
          message: "Created Successfully!",
          valuation: createdResponse
        },
        success: true
      })
    })
    .catch(err => {
      next(err);
    })
}


function updateValuation(req, res, next) {
  let updateParams = req.body;
  // updateParams = {
  //   typeOfProperty: "land",
  //   statusOfReport: "site visited",
  //   client: [{
  //     fullName: "Roshani Dhami",
  //     clientOrganization: true,
  //     address: {
  //       wardNo: "5",
  //       vdc: "kt,",
  //       district: "kanchanpur"
  //     },
  //     contactNumber: "9848747766",
  //     citizenshipInformation: {
  //       citizenshipNumber: "123",
  //       issuedDate: "2017-09-09",
  //       issuedOffice: "2015-09-04",
  //       fatherName: "hem",
  //       motherName: "hema",
  //     }
  //   }],
  //   owner: [{
  //     fullName: "Ruchi",
  //     lastName: "Dhami",
  //     clientOrganization: true,
  //     address: {
  //       wardNo: "5",
  //       vdc: "kt,",
  //       district: "kanchanpur"
  //     },
  //     contactNumber: "9848747766",
  //     citizenshipInformation: {
  //       citizenshipNumber: "123",
  //       issuedDate: "2017-09-09",
  //       issuedOffice: "2015-09-04",
  //       fatherName: "hem",
  //       motherName: "hema",
  //     }
  //   }],
  //   property: {
  //     plotNo: "123",
  //     location: {
  //       wardNo: "08",
  //       vdc: "mnr",
  //       district: "kanchanpur",
  //       typeOfLocation: "mainbato",
  //       shapeOfLand: "square",
  //       nearestMarket: "129",
  //       distanceFromHighway: "456",
  //       highTensionLine: "tyu"
  //     },
  //     description: {
  //       typeOfOwnership: "ownership",
  //       levelOfLand: "high",
  //       topographyOfLand: "topo",
  //       natureOfSoil: "soil nature",
  //       accessOfLand: "land access",
  //       constructionOnLand: "con",
  //       sewerFacility: "sewer faciltiy",
  //       waterFacility: "water",
  //       electricitySupply: "supply",
  //       nature: "nature"
  //     },
  //     triangulation: {
  //       numberOfTriangle: "1",
  //       unitOfMeasurement: "meter",
  //       totalLandAreaPerMeasurement: [{
  //         sideA: "8",
  //         sideB: "7",
  //         sideC: "6",
  //         total: "12"
  //       }],
  //       totalLandAreaPerLalPurja: {
  //         ropani: "123",
  //         anna: "234",
  //         paisa: "8976",
  //         daam: "9876",
  //         total: "98765"
  //       },
  //       parameterBoundaries: {
  //         east: "eastern",
  //         west: "western",
  //         north: "northen",
  //         south: "southern"
  //       }
  //     },
  //     propertyValuation: {
  //       marketRate: "12345678998",
  //       governmentRate: "23456",
  //       percentage: "99"
  //     },
  //     legalAspectsOfProperty: {
  //       ownershipOfLand: "ownership",
  //       ownershipComment: "comment",
  //       revenue: {
  //         paidValue: "no",
  //         paymentDate: "2016-10-45",
  //         comments: "comments"
  //       },
  //       normalValue: "normal value",
  //       registrationDate: "2019-08-09",
  //       normalSale: {
  //         value: "yes",
  //         comment: "comment"
  //       },
  //       plotIndicatedValue: "plot",
  //       clearlyMarkedValue: "clearly",
  //       tallyInMap: {
  //         value: "yes",
  //         comment: "comment"
  //       },
  //       areaOfLand: {
  //         value: "yes",
  //         comment: "comment"
  //       },
  //       boundaryParameters: {
  //         value: "yes",
  //         paymentReceipt: "payment",
  //         comment: "comment"
  //       },
  //       freeAccessValue: "free",
  //       partNotifiedValue: "part",
  //       boundary: {
  //         value: "no",
  //         comment: "comment"
  //       }
  //     },
  //     remarks: [{
  //       value: "remarks 1"
  //     }, {
  //       value: "remarks 2"
  //     }],
  //     importance: [{
  //       value: "importance 1"
  //     }, {
  //       value: "importance 2"
  //     }],
  //     otherInfo: {
  //       bankName: "Everest Bank",
  //       bankAddress: "lalitpur",
  //       preparedBy: "Hero",
  //       reportDate: "2017-09-09"
  //     }
  //   }
  //
  // };
  let valuationId = req.params.id;

  ValuationService.update(valuationId, updateParams)
    .then(() => {
      res.send({
        data: {
          message: "Updated Successfully!"
        },
        success: true
      })
    })
    .catch(err => {
      next(err);
    })
}

function deleteValuation(req, res, next) {
  let valuationId = req.params.id;
  ValuationService.deleteValuation(valuationId)
    .then(() => {
      res.send({
        data: {
          message: "Deleted Successfully!"
        },
        success: true
      })
    })
    .catch(err => {
      next(err);
    })
}

function fetchAll(req, res, next) {
  let query = req.query;
  if (query.q) {
    ValuationService.search(query)
      .then(listValuation => {
        const clientArray = [];
        return Promise.each(listValuation, function (valuation) {
          const client = {};
          client.fullName = valuation.client.fullName;
          client.contactNumber = valuation.client.contactNumber;
          client.typeOfProperty = valuation.propertyType.typeOfProperty;
          client.statusOfReport = valuation.propertyType.statusOfReport;
          client.bankName = valuation.property.otherInfo.bankName;
          client.id = valuation._id;
          clientArray.push(client);
        })
          .then(() => {
            const cli = clientArray.filter((client, index, self) =>
              index === self.findIndex((t) => (
                t.fullName === client.fullName && t.contactNumber === client.contactNumber
              ))
            );
            const clients = [];
            return Promise.each(cli, function (detail) {
              const clientList = {};
              clientList.clients = [{
                fullName: detail.fullName,
                contactNumber: detail.contactNumber
              }];
              clientList.typeOfProperty = detail.typeOfProperty;
              clientList.statusOfReport = detail.statusOfReport;
              clientList.bankName = detail.bankName;
              clientList.id = detail.id;
              clients.push(clientList);
            })
              .then(() => {
                res.send({data: clients, total: 0});
              })

          });
      })
      .catch(err => {
        next(err);
      })
  } else {
    ValuationService.findAll(query)
      .then(listValuation => {
        return ValuationService.countAll()
          .then(count => {
            const clients = [];
            return Promise.each(listValuation, function (valuation) {
              const client = {};
              client.clients = valuation.client;
              client.typeOfProperty = valuation.propertyType.typeOfProperty;
              client.statusOfReport = valuation.propertyType.statusOfReport;
              client.bankName = valuation.property.otherInfo.bankName;
              client.id = valuation._id;
              clients.push(client);
            })
              .then(() => {
                res.send({data: clients, total: count})
              })
          })
      })
      .catch(err => {
        next(err);
      })
  }
}

function fetch(req, res, next) {
  ValuationService.findOne(req.params.id)
    .then(fetchValuation => {
      res.send(fetchValuation)
    })
    .catch(err => {
      next(err);
    })
}

module.exports = {
  createValuation,
  updateValuation,
  deleteValuation,
  fetchAll,
  fetch
};
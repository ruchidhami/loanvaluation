"use strict";

const _ = require('underscore');
const Promise = require('bluebird');
const fs = require('fs');
const S3FS = require('s3fs');

const envConfig = require('../../../config/env');

const ValuationService = require('../../services/valuation.service');

const s3fsImpl = new S3FS('loantestbucket123', {
  accessKeyId: 'AKIAIQLUNAEINOX2N5SQ',
  secretAccessKey: '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'
});

s3fsImpl.create();


function createValuation(req, res, next) {
  let params = req.body;

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
          client.clientOrganization = valuation.client.clientOrganization;
          client.contactNumber = valuation.client.contactNumber;
          client.typeOfProperty = valuation.propertyType.typeOfProperty;
          client.statusOfReport = valuation.propertyType.statusOfReport;
          client.bankName = valuation.property.otherInfo.bankName;
          client.images = valuation.images;
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
                contactNumber: detail.contactNumber,
                clientOrganization: detail.clientOrganization
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
              client.images = valuation.images;
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

function upload(req, res, next) {
  // let imageName = req.query.name;
  // const file = req.files.image;
  // const stream = fs.createReadStream(file.path);
  // s3fsImpl.writeFile(file.originalFilename, stream, {"ContentType": file.type})
  //   .then(function () {
      return ValuationService.findOne(req.params.id)
        .then(valuations => {
          // const valuationImage = valuations.images;
          // valuationImage[imageName] = {
          //   status: true,
          //   url: envConfig.get("AMAZON_URL") + envConfig.get("BUCKET_NAME") + file.originalFilename
          // };
          const valuationImage = {
            lalpurja: {
              status: false,
              url: ""
            },
            citizenshipClient: {
              status: false,
              url: ""
            },
            citizenshipOwner: {
              status: false,
              url: ""
            },
            companyDoc: {
              status: false,
              url: ""
            },
            registrationDoc: {
              status: false,
              url: ""
            },
            panDoc: {
              status: false,
              url: ""
            },
            taxClearCertificate: {
              status: false,
              url: ""
            },
            charkillaOrg: {
              status: false,
              url: ""
            },
            bluePrint: {
              status: false,
              url: ""
            },
            trace: {
              status: false,
              url:""
            },
            tiroRasid: {
              status: false,
              url: ""
            },
            gharBatoSifarish: {
              status: false,
              url: ""
            },
            approvedBuildingDrawing: {
              status: false,
              url: ""
            },
            constructionApprovalCertificate: {
              status: false,
              url: ""
            },
            constructionCompletionCertificate: {
              status: false,
              url: ""
            },
            buildingTaxPaymentReceipt: {
              status: false,
              url: ""
            }
          };
          ValuationService.update(req.params.id, {images: valuationImage})
            .then(() => {
              res.send({
                data: {
                  message: "Image upload successfully"
                },
                success: true
              })
            })
        })
    // })
    .catch(err => {
      next(err)
    })
}

module.exports = {
  createValuation,
  updateValuation,
  deleteValuation,
  fetchAll,
  fetch,
  upload
};
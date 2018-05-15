"use strict";

const Promise = require('bluebird');
const admin = require("firebase-admin");

const serviceAccount = require('../../../config/service-account');
const envConfig = require('../../../config/env');

const ValuationService = require('../../services/valuation.service');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: envConfig.get('FIRE_BASE_BUCKET_NAME')
});

const bucket = admin.storage().bucket();

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

async function fetch(req, res, next) {
  try {
    let fetchValuation = await ValuationService.findOne(req.params.id);
    res.send(fetchValuation)
  } catch (err) {
    next(err);
  }
}

// function fetch(req, res, next) {
//   ValuationService.findOne(req.params.id)
//     .then(fetchValuation => {
//       res.send(fetchValuation)
//     })
//     .catch(err => {
//       next(err);
//     })
// }

function upload(req, res, next) {
  let name = req.file.originalname;
  let file = bucket.file(name);
  let imageName = req.query.name;

  if(imageName){
    file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    }).on('error', function (err) {
    }).on('finish', function () {
      file.makePublic(function (err, apiResponse) {
        return ValuationService.findOne(req.params.id)
          .then(valuations => {
            const valuationImage = valuations.images;
            valuationImage[imageName] = {
              status: true,
              url: `${envConfig.get("FIRE_BASE_URL")}${name}`
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
          .catch(err => {
            next(err)
          })
      })

    }).end(req.file.buffer);
  }else {
    throw new Error('Image must be required.')
  }


}

module.exports = {
  createValuation,
  updateValuation,
  deleteValuation,
  fetchAll,
  fetch,
  upload
};
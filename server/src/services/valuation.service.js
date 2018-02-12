"use strict";

const Valuation = require('../models/valuation.model');

function create(params) {
  return new Promise((resolve, reject) => {
    let valuation = new Valuation(params);
    valuation.save()
      .then(valuationCreated => {
        resolve(valuationCreated);
      })
      .catch(err => {
        reject(err);
      })

  })
}

function update(valuationId, params) {
  return new Promise((resolve, reject) => {
    Valuation.update({
      '_id': valuationId
    }, {
      '$set': params
    })
      .then(updatedValuation => {
        resolve(updatedValuation)
      })
      .catch(err => {
        reject(err);
      })
  })
}

function deleteValuation(valuationId) {
  return new Promise((resolve, reject) => {
    Valuation.findOneAndRemove({"_id": valuationId})
      .then(valuationDeleted => {
        resolve(valuationDeleted)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function findAll(query) {
  return new Promise((resolve, reject) => {
    const perPage = +query.limit;
    const page = Math.max(0, +query.pageno - 1);
    const params = {
      "client.fullName": "",
      "client.contactNumber": "",
      "property.otherInfo.bankName": "",
      "propertyType.typeOfProperty": "",
      "propertyType.statusOfReport": ""
    };

    Valuation.find({}, params)
      .limit(perPage)
      .skip(perPage * page)
      .then(valuationListed => {
        resolve(valuationListed)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 *
 * @returns {*}
 */
function countAll() {
  return Valuation.count();
}

/**
 *
 * @param params
 * @returns {Promise}
 */
function search(params) {
  return new Promise((resolve, reject) => {
    return Valuation.aggregate({
      '$unwind': "$client"
    }, {
      '$unwind': "$owner"
    }, {
      "$match": {
        $or: [{
          'client.fullName': params.q
        }, {
          'client.contactNumber': params.q
        }, {
          'owner.fullName': params.q
        }, {
          'owner.contactNumber': params.q
        }, {
          'propertyType.typeOfProperty': params.q
        }, {
          'property.otherInfo.bankName': params.q
        }]
      }
    })
      .then(listedValuation => {
        resolve(listedValuation);
      })
      .catch(err => {
        reject(err);
      })
  })

}

/**
 *
 * @param id
 * @returns {*}
 */
function findOne(id) {
  return Valuation.findOne({'_id': id})
}


module.exports = {
  create,
  update,
  deleteValuation,
  findAll,
  findOne,
  search,
  countAll
};
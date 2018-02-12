"use strict";

const User = require('../models/user.model');

function create(userParams) {
  return new Promise((resolve, reject) => {
    let user = new User(userParams);
    user.save()
      .then(userCreated => {
        resolve(userCreated);
      })
      .catch(err => {
        reject(err);
      })

  })
}


function list(params) {
  return new Promise((resolve, reject) => {
    User.find(params)
      .then(listedUser => {
        resolve(listedUser)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function findOne(params) {
  return User.findOne(params);
}

module.exports = {
  create,
  list,
  findOne
};
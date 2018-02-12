"use strict";

const Promise = require('bluebird');

const UserService = require('../services/user.service');
const envConfig = require('../../config/env');

function setup() {
  return new Promise((resolve, reject) => {
    UserService.list({role: "admin"})
      .then(listedUser => {
        if (listedUser.length) {
          resolve({
            message: 'User already exists!'
          })
        }
        else {
          const defaultUserParams = {
            firstName: envConfig.get('FIRST_NAME'),
            lastName: envConfig.get('LAST_NAME'),
            username: envConfig.get('USERNAME'),
            email: envConfig.get('EMAIL'),
            password: envConfig.get('PASSWORD'),
            role: envConfig.get('ROLE')
          };
          UserService.create(defaultUserParams)
            .then(superAdminCreated => {
              resolve(superAdminCreated)
            })
            .catch(err => {
              reject(err);
            })
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}

module.exports = {
  setup
};
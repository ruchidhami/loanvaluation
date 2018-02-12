'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    index: true,
    required: true
  },
  lastName: {
    type: String,
    index: true,
    required: true
  },
  username: {
    type: String,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

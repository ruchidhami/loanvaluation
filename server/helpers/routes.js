'use strict';

const directory = require('require-dir');

module.exports = {
  route
};

function route(app) {
  var routes = directory('../src/v1/routes');
  for (var i in routes) app.use('/v1', routes[i]);
}
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const cors = require('cors');
const express = require('express');

const envConfig = require('./config/env');

require('./src/models/db.model')();

const app = express();
app.use(cors());
app.options('*', cors());

const bodyParser = require('body-parser');

var port = process.env.PORT || envConfig.get("PORT");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Include all routes
require('./helpers/routes').route(app);
require('./src/operations/defaultUserSetup').setup();

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
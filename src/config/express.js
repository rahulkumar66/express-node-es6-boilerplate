const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const strategies = require('./passport');
const error = require('../api/middlewares/error');
const logger = require('../config/logger');

/**
* Express instance
* @public
*/
const app = express();

/** 
 * Configure morgan to send the output to our logger's stream instead
 * logging. dev: console | production: file
 */
app.use(morgan(logs, { stream: logger.stream }));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// mount api v1 routes
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;

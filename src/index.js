const logger = require('./config/logger');
const { port, env } = require('./config/vars');
const app = require('./config/express');
const db = require('./config/mongoose');

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
// http://expressjs.com/api.html
const express = require('express');
const application = express();

// https://github.com/expressjs/cors#configuration-options
const cors_config = {
  origin: 'https://hacker-bastl.github.io',
  // optionsSuccessStatus: 200,
};

// https://github.com/expressjs/cors#enabling-cors-pre-flight
const cors_module = require('cors');
application.use('*', cors_module(cors_config));
application.options('*', cors_module(cors_config));

// https://expressjs.com/starter/static-files.html
application.use(express.static(__dirname + '/docs'));
application.use(require('body-parser').json());


// TODO: include locomotiveId and trainNumber for verifications :-)

// determine database type (heroku or local?)
application.use(!!process.env.DATABASE_URL ?
  require('./database/postgres') : require('./database/sqlite3'));
application.listen(process.env.PORT || 80);

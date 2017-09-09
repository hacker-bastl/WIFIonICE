// http://expressjs.com/api.html
const express = require('express');
const application = express();
application.use(express.static(__dirname + '/docs'));
application.use(require('body-parser').json());
// determine database type (heroku or local?)
application.use(!!process.env.DATABASE_URL ?
  require('./database/postgres') : require('./database/sqlite3'));
application.listen(process.env.PORT || 80);

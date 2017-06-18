// https://github.com/expressjs/serve-static#simple
const express = require('express');
const static = require('serve-static');
const application = express();
application.use(static('docs'));
application.listen(process.env.PORT || 80);

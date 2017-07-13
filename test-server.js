// https://github.com/expressjs/serve-static#simple
const express = require('express');
const application = express();
const static = require('serve-static');
application.use(static('docs'));

// http://github.com/hacker-bastl/omboard
const ombord = require('request').defaults({
  baseUrl: 'https://www.ombord.info',
  strictSSL: false,
});

// https://github.com/request/request#requestoptions-callback
application.get('/api/jsonp/*', function(request, response) {
  ombord({
    uri: request.originalUrl,
    callback: function(error, reply, content) {
      if (!!error) response.end(error.stack || error);
      else response.end(content);
    },
  });
});

// http://expressjs.com/en/api.html#app.listen
require('https').createServer({
  ca: require('fs').readFileSync('certificates/macbook.local.ca.crt.pem'),
  cert: require('fs').readFileSync('certificates/macbook.local.crt.pem'),
  key: require('fs').readFileSync('certificates/macbook.local.key.pem'),
}, application).listen(process.env.PORT || 443);

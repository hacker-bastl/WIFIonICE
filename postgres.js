// config for postgres database when running on heroku

var settings = require('url').parse(process.env.DATABASE_URL);
var configuration = {
  database: settings.pathname.split('/').pop(),
  password: settings.auth.split(':').pop(),
  user: settings.auth.split(':').shift(),
  host: settings.hostname,
  port: settings.port,
  ssl: true,
};

// https://www.npmjs.com/package/pg-pool#create

const postgres = require('pg');
var database = new postgres.Pool(configuration);
database.connect(function(error, client, callback) {
  if (!!error) throw error;
  var command = 'CREATE TABLE IF NOT EXISTS omboard ( timestamp BIGINT, latitude DOUBLE PRECISION, longitude DOUBLE PRECISION, locomotiveId BIGINT, trainNumber BIGINT, bwmax TEXT, radioStatus TEXT, wifiStatus TEXT )';
  client.query(command, [], function(error) {
    callback();
    if (!!error) throw error;
    database.end();
  });
});

// https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database

const router = module.exports = require('express').Router();

router.post('/db/:timestamp', function(request, response) {
  request.body.timestamp = request.params.timestamp;
  request.body.timestamp = new Date().getTime(); // TODO: check delta
  var database = new postgres.Pool(configuration);
  database.connect(function(error, client, callback) {
    if (!!error) response.status(503).send(error.message);
    var command = 'INSERT INTO omboard VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )';
    var values = [parseInt(request.params.timestamp), parseFloat(request.body.location.latitude), parseFloat(request.body.location.longitude), parseInt(request.body.locomotiveId), parseInt(request.body.trainNumber), request.body.connection.bwmax, request.body.connection.radioStatus, request.body.connection.wifiStatus, ];
    client.query(command, values, function(error, result) {
      callback();
      if (!!error) response.status(503).send(error.message);
      else response.status(201).send('');
      database.end();
    });
  });
});

// https://www.npmjs.com/package/pg-pool#drop-in-backwards-compatible

router.get('/db/:longitudeMin/:latitudeMin/:longitudeMax/:latitudeMax', function(request, response) {
  var database = new postgres.Pool(configuration);
  database.connect(function(error, client, callback) {
    if (!!error) response.status(503).send(error.message);
    var command = 'SELECT * FROM omboard WHERE latitude > $1 AND latitude < $2 AND longitude > $3 AND longitude < $4';
    var values = [request.params.latitudeMin, request.params.latitudeMax, request.params.longitudeMin, request.params.longitudeMax];
    client.query(command, values, function(error, result) {
      callback();
      if (!!error) response.status(503).send(error.message);
      else response.json(result.rows);
      database.end();
    });
  });
});

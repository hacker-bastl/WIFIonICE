// config for database on local development environment

const sqlite3 = require('sqlite3').verbose();
var database = new sqlite3.Database('./database.sqlite3', function(error) {
  if (!!error) throw error;
  else database.serialize(function() {
    var command = 'CREATE TABLE IF NOT EXISTS omboard ( timestamp INT, latitude REAL, longitude REAL, bwmax TEXT, radioStatus TEXT, wifiStatus TEXT )';
    database.run(command);
    database.close();
  });
});

// https://expressjs.com/en/guide/routing.html

const router = module.exports = require('express').Router();

router.post('/db/:timestamp', function(request, response) {
  request.body.timestamp = new Date().getTime();
  var database = new sqlite3.Database('./database.sqlite3', function(error) {
    if (!!error) response.status(503).send(error.message);
    else database.serialize(function() {
      var command = 'INSERT INTO omboard VALUES ( $timestamp, $latitude, $longitude, $bwmax, $radioStatus, $wifiStatus )';
      var values = [parseInt(request.params.timestamp), parseFloat(request.body.location.latitude), parseFloat(request.body.location.longitude), request.body.connection.bwmax, request.body.connection.radioStatus, request.body.connection.wifiStatus, ];
      database.run(command, values, function(error) {
        if (!!error) response.status(503).send(error.message);
        else response.status(201).send('');
      });
    });
    database.close();
  });
});

// https://github.com/mapbox/node-sqlite3/wiki/API#databaseeachsql-param--callback-complete

router.get('/db/:longitudeMin/:latitudeMin/:longitudeMax/:latitudeMax', function(request, response) {
  var database = new sqlite3.Database('./database.sqlite3', function(error) {
    if (!!error) response.status(503).send(error.message);
    else database.serialize(function() {
      var command = 'SELECT * FROM omboard WHERE latitude > $latitudeMin AND latitude < $latitudeMax AND longitude > $longitudeMin AND longitude < $longitudeMax';
      var values = [String(request.params.latitudeMin), String(request.params.latitudeMax), String(request.params.longitudeMin), String(request.params.longitudeMax)];
      var result = [];
      database.each(command, values, function(error, row) {
        if (!!error) response.status(503).send(error.message);
        else result.push(row);
      }, function() {
        if (!response.finished)
          response.json(result);
      });
    });
    database.close();
  });
});

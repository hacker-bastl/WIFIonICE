// https://github.com/hacker-bastl/omboard

const WIFIonICE = window.WIFIonICE = {
  baseURL: location.host.split(':').shift() != 'localhost' ?
    '//tranquil-lake-70936.herokuapp.com' : '', // TODO !?
  startPosition: /^#\d+\.\d+\/\d+\.\d+$/.test(location.hash) ? [
    location.hash.substring(1).split('/').shift(),
    location.hash.split('/').pop(),
  ] : [50.1068429, 8.6401972],
  requestTimeout: 60 * 1E3,
  requestsPerMinute: 4,
};

// http://leafletjs.com/examples/quick-start/

WIFIonICE.leafletMap = L.map('map', {
  center: WIFIonICE.startPosition,
  minZoom: 8,
  zoom: 9,
});

// http://leafletjs.com/reference-1.2.0.html#tilelayer

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> | ' +
    '<a href="https://github.com/hacker-bastl/omboard#readme">WIFIonICE</a>',
}).addTo(WIFIonICE.leafletMap);

// "old" nodes (removed on update - prevent dublicates)

WIFIonICE.cachedNodes = [];

// http://leafletjs.com/reference-1.2.0.html#circle

WIFIonICE.displayMeasurements = function(measurements) {
  var title = 'ICE {trainNumber}: <b>{radioStatus}</b>';
  WIFIonICE.cachedNodes.forEach(function(outdated) {
    outdated.remove(); // TODO: smells...
  });
  WIFIonICE.cachedNodes = measurements.map(function(entry) {
    var node = L.circle([entry.latitude, entry.longitude], {
      color: {
        'HIGH': '#33cc99',
        'MIDDLE': '#c84e2f',
        'LOW': '#dc2a67',
      }[entry.radioStatus] || '#b7b7c8',
      fillColor: {
        'HIGH': '#8ad3af',
        'MIDDLE': '#f9b29c',
        'LOW': '#e892a2',
      }[entry.radioStatus] || '#bbbbcc',
      fillOpacity: 1,
      radius: 8,
      weight: 2,
    }).addTo(WIFIonICE.leafletMap);
    node.bindTooltip(L.Util.template(title, entry));
    node.addEventListener('click', function() {
      location.hash = '#' + entry.latitude + '/' + entry.longitude;
      console.info(entry);
    });
    return node;
  });
};

// https://developer.mozilla.org/docs/Web/API/XMLHttpRequest

WIFIonICE.loadMeasurements = function() {
  var area = WIFIonICE.leafletMap.getBounds();
  var address = L.Util.template('{address}/db/{swLat}/{swLon}/{neLat}/{neLon}', {
    address: WIFIonICE.baseURL,
    swLat: area._southWest.lat,
    swLon: area._southWest.lng,
    neLat: area._northEast.lat,
    neLon: area._northEast.lng,
  });
  var request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    WIFIonICE.displayMeasurements(JSON.parse(request.responseText));
  });
  request.open('GET', address);
  request.timeout = WIFIonICE.requestTimeout;
  request.send(null);
};

// https://github.com/hacker-bastl/omboard/blob/master/postgres.js

WIFIonICE.storeMeasurement = function(dataset) {
  var address = L.Util.template('{address}/db/{timestamp}', {
    address: WIFIonICE.baseURL,
    timestamp: new Date().getTime(),
  });
  var request = new XMLHttpRequest();
  request.addEventListener('loadend', function() {
    WIFIonICE.leafletMap.setView([dataset.location.latitude, dataset.location.longitude]);
    location.hash = '#' + dataset.location.latitude + '/' + dataset.location.longitude;
    WIFIonICE.displayMeasurements([{
      longitude: dataset.location.longitude,
      latitude: dataset.location.latitude,
      bwmax: dataset.connection.bwmax,
      radioStatus: dataset.connection.radioStatus,
      wifiStatus: dataset.connection.wifiStatus,
    }]);
  });
  request.open('POST', address);
  request.setRequestHeader('Content-Type', 'application/json');
  request.timeout = WIFIonICE.requestTimeout;
  request.send(JSON.stringify(dataset));
};

// https://github.com/hacker-bastl/omboard/blob/v0.9/README.md#hintergrund

WIFIonICE.updateMeasurement = setInterval(function() {
  var address = 'https://skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata';
  var request = new XMLHttpRequest();
  request.addEventListener('loadend', function() {
    if (request.status == 200 && request.responseText != '{}')
      return WIFIonICE.storeMeasurement(JSON.parse(request.responseText));
    else document.title = ' not on #WIFIonICE ? ';
    clearInterval(WIFIonICE.updateMeasurement);
  });
  request.open('GET', address);
  request.timeout = WIFIonICE.requestTimeout;
  request.send(null);
}, parseInt(60 / WIFIonICE.requestsPerMinute) * 1E3);

// delay reaction on user input to throttle backend requests

WIFIonICE.delayInput = setTimeout(WIFIonICE.loadMeasurements, 1E3);

// load entries for current view when map area is changed

['moveend', 'resize', 'zoomend'].forEach(function(event) {
  L.DomEvent.on(WIFIonICE.leafletMap, event, function() {
    clearTimeout(WIFIonICE.delayInput);
    WIFIonICE.delayInput = setTimeout(WIFIonICE.loadMeasurements, 1E3);
  });
});

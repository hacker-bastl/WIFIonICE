// https://github.com/hacker-bastl/omboard

const WIFIonICE = window.WIFIonICE = {
  baseURL: location.host.split(':').shift() != 'localhost' ?
    '//tranquil-lake-70936.herokuapp.com' : '', // TODO !?
  requestTimeout: 60 * 1E3,
  requestsPerMinute: 4,
  delayInput: null,
};

// http://leafletjs.com/examples/quick-start/

WIFIonICE.leafletMap = L.map('map', {
  center: [50.1068429, 8.6401972],
  zoom: 9,
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> | ' +
    '<a href="https://github.com/hacker-bastl/omboard#readme">omboard</a>',
}).addTo(WIFIonICE.leafletMap);

// http://leafletjs.com/reference-1.2.0.html#circle

WIFIonICE.displayMeasurements = function(measurements) {
  measurements.map(function(entry) {
    var node = L.circle([entry.latitude, entry.longitude], {
      color: {
        'HIGH': 'green',
        'MIDDLE': 'yellow',
        'LOW': 'red',
      }[entry.radioStatus || entry.radiostatus] || 'gray', // TODO!!!
      radius: 4,
    }).addTo(WIFIonICE.leafletMap);
    node.title = JSON.stringify(entry, null, 4);
    node.addEventListener('click', function() {
      console.info(entry);
    });
    return node;
  });
};

// https://developer.mozilla.org/docs/Web/API/XMLHttpRequest

WIFIonICE.loadMeasurements = function() {
  var area = WIFIonICE.leafletMap.getBounds();
  var address = L.Util.template('{address}/db/{swLon}/{swLat}/{neLon}/{neLat}', {
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

WIFIonICE.storeMeasurement = function(dataset) {
  var address = L.Util.template('{address}/db/{timestamp}', {
    address: WIFIonICE.baseURL,
    timestamp: new Date().getTime(),
  });
  var request = new XMLHttpRequest();
  request.addEventListener('loadend', function() {
    WIFIonICE.leafletMap.setView([dataset.location.latitude, dataset.location.longitude]); // TODO?
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

WIFIonICE.updateMeasurement = setInterval(function() {
  var address = 'https://skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata';
  var request = new XMLHttpRequest();
  request.addEventListener('loadend', function() {
    if (request.status == 200 && request.responseText != '{}')
      return WIFIonICE.storeMeasurement(JSON.parse(request.responseText));
    else document.title = 'not connected to "WIFIonICE"?';
    clearInterval(WIFIonICE.updateMeasurement);
  });
  request.open('GET', address);
  request.send(null);
}, parseInt(60 / WIFIonICE.requestsPerMinute) * 1E3);

['moveend', 'resize', 'zoomend'].forEach(function(event) {
  L.DomEvent.on(WIFIonICE.leafletMap, event, function() {
    clearTimeout(WIFIonICE.delayInput);
    WIFIonICE.delayInput = setTimeout(WIFIonICE.loadMeasurements, 1E3);
  });
});

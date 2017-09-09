const WIFIonICE = window.WIFIonICE = {
  baseURL: location.host != 'localhost' ?
    '//fierce-castle-41016.herokuapp.com' : '', // TODO !?
  requestTimeout: 60 * 1E3,
  requestsPerMinute: 20,
  delayInput: null,
};

// http://leafletjs.com/examples/quick-start/

WIFIonICE.leafletMap = L.map('map', {
  center: [50.1068429, 8.6401972],
  zoom: 9,
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>',
}).addTo(WIFIonICE.leafletMap);

// http://leafletjs.com/reference-1.2.0.html#circle

WIFIonICE.displayMeasurements = function(measurements) {
  measurements.map(function(entry) {
    var node = L.circle([entry.longitude, entry.latitude], {
      color: 'red', // TODO: css?
      radius: 4,
    }).addTo(WIFIonICE.leafletMap);
    node.addEventListener('click', function(event) {
      WIFIonICE.leafletMap.openTooltip(JSON
        .stringify(entry, null, 4), [entry.longitude, entry.latitude], {
          direction: 'bottom',
        });
    });
    return node;
  });
};

// https://developer.mozilla.org/docs/Web/API/XMLHttpRequest

WIFIonICE.loadMeasurements = function() {
  var area = WIFIonICE.leafletMap.getBounds();
  var address = L.Util.template('{path}/db/{swLat}/{swLon}/{neLat}/{neLon}', {
    path: WIFIonICE.baseURL,
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
  var address = L.Util.template('{path}/db/{timestamp}', {
    timestamp: new Date().getTime(),
    path: WIFIonICE.baseURL,
  });
  var request = new XMLHttpRequest();
  request.addEventListener('loadend', function() {
    WIFIonICE.leafletMap.setView([dataset.location.latitude, dataset.location.longitude], 13);
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
  var request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    if (request.responseText == '{}') {
      console.error('not connected to "WIFIonICE"?');
      clearInterval(WIFIonICE.updateMeasurement);
    } else WIFIonICE.storeMeasurement(JSON.parse(request.responseText));
  });
  request.open('GET', 'https://skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata');
  request.send(null);
}, parseInt(60 / WIFIonICE.requestsPerMinute) * 1E3);

['moveend', 'resize', 'zoomend'].forEach(function(event) {
  L.DomEvent.on(WIFIonICE.leafletMap, event, function() {
    clearTimeout(WIFIonICE.delayInput);
    WIFIonICE.delayInput = setTimeout(WIFIonICE.loadMeasurements, 1E3);
  });
});

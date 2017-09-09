// http://leafletjs.com/examples/quick-start/

const WIFIonICE = window.WIFIonICE = {
  leafletMap: L.map('map', {
    center: [50.1068429, 8.6401972], // DB Vertrieb GmbH
    zoom: 9,
  }),
  updateMap: function() {
    clearTimeout(WIFIonICE.delayInput);
    WIFIonICE.delayInput = setTimeout(WIFIonICE.loadMeasurements, 1E3);
  },
  delayInput: null,
  nodeCache: [],
  baseURL: '', // TODO !?
};

// http://leafletjs.com/reference-1.2.0.html#circle

WIFIonICE.displayMeasurements = function(measurements) {
  WIFIonICE.nodeCache.forEach(function(old) {
    old.remove(); // TODO: necessary?
  });
  measurements.map(function(entry) {
    return L.circle([entry.longitude, entry.latitude], {
      color: 'red', // TODO: css?
      radius: 4,
    }).addTo(WIFIonICE.leafletMap);
  }).forEach(function(node) {
    WIFIonICE.nodeCache.push(node);
  });
};

// https://developer.mozilla.org/docs/Web/API/XMLHttpRequest

WIFIonICE.loadMeasurements = function() {
  var area = WIFIonICE.leafletMap.getBounds();
  var address = L.Util.template('{hostname}/db/{swLat}/{swLon}/{neLat}/{neLon}', {
    hostname: WIFIonICE.baseURL,
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
  request.send(null);
};

WIFIonICE.storeMeasurement = function(dataset) {
  var address = L.Util.template('{hostname}/db/{timestamp}', {
    timestamp: new Date().getTime(),
    hostname: WIFIonICE.baseURL,
  });
  var request = new XMLHttpRequest();
  request.open('POST', address);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(dataset));
};

// http://leafletjs.com/examples/quick-start/

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>',
}).addTo(WIFIonICE.leafletMap);

['moveend', 'resize', 'zoomend'].forEach(function(event) {
  L.DomEvent.on(WIFIonICE.leafletMap, event, WIFIonICE.updateMap);
});

if (false) // TESTING
  WIFIonICE.storeMeasurement({
    location: {
      longitude: 50.1068429,
      latitude: 8.6401972,
    },
    connection: {
      bwmax: 'test',
      radioStatus: 'test',
      wifiStatus: 'test',
    }
  });

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
};

// http://leafletjs.com/reference-1.2.0.html#circle

WIFIonICE.displayMeasurements = function(measurements) {
  WIFIonICE.nodeCache.forEach(function(old) {
    old.remove();
  });
  measurements.map(function(entry) {
    return L.circle([entry.longitude, entry.latitude], {
      color: 'red',
      radius: 4,
    }).addTo(WIFIonICE.leafletMap);
  }).forEach(function(node) {
    WIFIonICE.nodeCache.push(node);
  });
};

// https://developer.mozilla.org/docs/Web/API/XMLHttpRequest

WIFIonICE.loadMeasurements = function() {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    WIFIonICE.displayMeasurements(JSON.parse(request.responseText));
  });
  var area = WIFIonICE.leafletMap.getBounds();
  var southWest = area._southWest.lat + '/' + area._southWest.lng;
  var northEast = area._northEast.lat + '/' + area._northEast.lng;
  request.open('GET', '/db' + '/' + southWest + '/' + northEast);
  request.send(null);
};

WIFIonICE.storeMeasurement = function(dataset) {
  var request = new XMLHttpRequest();
  request.open('POST', '/db/' + new Date().getTime());
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(dataset));
};

// http://leafletjs.com/examples/quick-start/

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(WIFIonICE.leafletMap);

['load', 'moveend', 'resize', 'zoomend', 'zoomlevelschange'].forEach(function(event) {
  L.DomEvent.on(WIFIonICE.leafletMap, event, WIFIonICE.updateMap);
});

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

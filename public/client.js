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
  var address = L.Util.template('/db/{swLat}/{swLon}/{neLat}/{neLon}', {
    swLat: area._southWest.lat,
    swLon: area._southWest.lng,
    neLat: area._northEast.lat,
    neLon: area._northEast.lng,
  });
  request.open('GET', address);
  request.send(null);
};

WIFIonICE.storeMeasurement = function(dataset) {
  var request = new XMLHttpRequest();
  request.open('POST', '/db/' + new Date().getTime());
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(dataset));
};

['moveend', 'resize', 'zoomend'].forEach(function(event) {
  L.DomEvent.on(WIFIonICE.leafletMap, event, WIFIonICE.updateMap);
});

// http://leafletjs.com/examples/quick-start/

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>',
}).addTo(WIFIonICE.leafletMap);

WIFIonICE.statusButton = L.Control.extend({
  checkStatus: function(link) {
    setInterval(function() {
      var request = new XMLHttpRequest();
      request.addEventListener('loadend', function() {
        var online = request.statusText == 'OK';
        link.title = online ? 'online' : 'offline';
        link.textContent = online ? '◉' : '◎';
      });
      request.open('HEAD', 'https://portal.imice.de/api1/rs/status');
      request.send(null);
    }, 30 * 1E3);
  },
  createControls: function() {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.style.backgroundColor = 'white';
    container.style.lineHeight = '26px';
    container.style.fontSize = '26px';
    container.style.width = '30px';
    container.style.height = '30px';
    container.style.textAlign = 'center';
    return container;
  },
  createButton: function() {
    var link = this._statusLink = L.DomUtil.create('a', 'leaflet-bar leaflet-control leaflet-control-custom');
    link.className = 'leaflet-control-zoom-in';
    link.style.cursor = 'pointer';
    link.style.lineHeight = '30px';
    link.style.width = '30px';
    link.title = 'offline';
    link.role = 'button';
    link.textContent = '◎';
    link.href = '#';
    return link;
  },
  onAdd: function(map) {
    var container = this.createControls();
    var link = this.createButton()
    container.appendChild(link);
    this.checkStatus(link);
    return container;
  },
  options: {
    position: 'topright',
  },
});


WIFIonICE.leafletMap.addControl(new WIFIonICE.statusButton());

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

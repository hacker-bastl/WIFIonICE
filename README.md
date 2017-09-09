### Problematik

Wenn ein Kunde [das WLAN im ICE](https://inside.bahn.de/wifionice-wlan-ice-login/) nutzt, werden verschiedene [personenbeziehbaren Daten](https://de.wikipedia.org/wiki/Personenbezogene_Daten) (z.B. MAC-Adresse, Aufenthaltsort des Zuges, Wagenklasse, etc.) über [Schnittstellen](https://de.wikipedia.org/wiki/Programmierschnittstelle) (APIs) zugänglich gemacht.
Da diese Schnittstellen nicht bzw. nur mangelhaft abgesichert wurden, können beliebige (auch nicht dafür authorisierte) Webseiten diese Daten auslesen.

> Unsere Kunden, Mitarbeiter und Geschäftspartner legen zu Recht Wert auf die sparsame Erhebung und den sorgsamen Umgang mit ihren Daten. Deshalb haben wir es uns zur Aufgabe gemacht, eine besondere Verantwortung für diese Daten zu tragen.

- von / siehe "[Datenschutz im DB-Konzern](http://www.deutschebahn.com/de/konzern/datenschutz/vorstellung_datenschutz.html)"

### Zeitlicher Ablauf

Im Herbst 2016 wird die Deutsche Bahn über diese Sicherheitslücke informiert. [1]
Es folgen entsprechende Berichte in den Medien. [2]
Die Bahn versucht die Sicherheitslücke zu schließen. [3]

- [1] 2016/10/12 "[Was das neue Bahn-Wifi über seine Nutzer ausplaudert](http://hannover.ccc.de/~nexus/dbwifi/index.html)" ([Falk](https://twitter.com/Nexus511))
- [2] 2016/10/13 "[Neues WLAN im ICE nimmt Privatsphäre nicht so ernst](https://www.heise.de/security/meldung/Neues-WLAN-im-ICE-nimmt-Privatsphaere-nicht-so-ernst-3348317.html)" ([Heise](https://www.heise.de/security/news/))
- [3] 2016/10/13 "[Gratis-WLAN im ICE: Bahn behebt Sicherheitslücken überraschend schnell](http://t3n.de/news/kostenloses-wlan-ice-deutsche-bahn-fehler-755097/)" ([t3n](http://t3n.de/news/))

Im Sommer 2017 stellt sich heraus, daß die Sicherheitslücke immer noch besteht, bzw. nur unzulänglich behoben wurde.
Der Zugriffs-Schutz ist mangelhaft [4] und die Daten sind ebenso über eine alternative Schittstelle verfügbar. [5]
Die Bahn wird erneut und deutlich informiert. [6] [7]

- [4] 2017/05/10 [der angebliche "Fix" via Referrer](https://twitter.com/jatiki/status/862360786097893376) ([Jan-Tilo](https://twitter.com/jatiki))
- [5] 2017/07/18 [die ungeschützte XML API](https://twitter.com/resciscosilenda/status/887191467629981696) ([Christian](https://twitter.com/resciscosilenda))
- [6] 2017/07/17 "[Chapter 2: Die Bahn, ihr Wifi und die Amateure](http://hannover.ccc.de/~nexus/dbwifi/chapter2.html)" ([Falk](https://twitter.com/Nexus511))
- [7] 2017/07/20 "[Chapter 3: Täglich grüßt das Murmeltier](http://hannover.ccc.de/~nexus/dbwifi/chapter3.html)" ([Falk](https://twitter.com/Nexus511))

Diesbezügliche Medienberichte kommentiert ein Firmensprecher der Bahn wie folgt: [8]

> Man arbeite zusammen mit dem Dienstleister Icomera "mit Hochdruck daran, die Lücke schnellstmöglich zu schließen". Darüber hinaus werde das gesamte System weiterhin auf mögliche Schwachstellen hin untersucht

- [8] 2017/07/17 "[WIFIonICE: CCC warnt vor anhaltendem Sicherheitsproblem beim Bahn-WLAN](https://www.heise.de/newsticker/meldung/WIFIonICE-CCC-warnt-vor-anhaltendem-Sicherheitsproblem-beim-Bahn-WLAN-3773839.html)" ([Heise](https://www.heise.de/security/news/))

### Aktueller Status

Daraufhin werden die beiden ursprünglich beschriebenen Schnittstellen umkonfiguriert und sind nun nicht mehr erreichbar. [8] [9]
Eine dritte Schnittstelle, über welche die erwähnten Daten verfügbar waren, wird [abgesichert](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Response_headers). [10]
Ein Teil der beschriebenen Daten ist immer noch über eine vierte Schnittstelle im [Unterhaltungs-Bereich](https://inside.bahn.de/maxdome-onboard-ice/) des ICE-Portals verfügbar. [11]

- [8] [JSONP API ombord.info](https://www.ombord.info/api/jsonp/position/?callback=console.log) deaktiviert :no_entry_sign:
- [9] [XML API ombord.info](https://www.ombord.info/api/xml/position/) deaktiviert :no_entry_sign:
- [10] [JSONP API imice.de](http://portal.imice.de/api1/rs/status) geschützt :lock:
- [11] [JSON API maxdome-onboard.de](https://skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata) :warning:

[Diese Seite](https://hacker-bastl.github.io/omboard/) ([Code](index.html)) demonstriert einen [CSRF](https://de.wikipedia.org/wiki/Cross-Site-Request-Forgery) Zugriff ("Proof of Concept") auf die "maxdome-onboard.de" API.

### Daten-Felder

[8] [www.ombord.info/api/jsonp/user](https://www.ombord.info/api/jsonp/user/?callback=console.log)

```
({
    "version": ...,
    "ip": ...,
    "mac": ...,
    "online": ...,
    "timeleft": ...,
    "authenticated": ...,
    "userclass": ...,
    "expires": ...,
    "timeused": ...,
    "data_download_used": ...,
    "data_upload_used": ...,
    "data_total_used": ...,
    "data_download_limit": ...,
    "data_upload_limit": ...,
    "data_total_limit": ...,
    "bandwidth_download_limit": ...,
    "bandwidth_upload_limit": ...
});
```

[9] [www.ombord.info/api/xml/position](https://www.ombord.info/api/xml/position/)

```
<position version="1.0">
  <time type="double"> ... </time>
  <age type="integer"> ... </age>
  <latitude type="double"> ... </latitude>
  <longitude type="double"> ... </longitude>
  <altitude type="double"> ... </altitude>
  <speed type="double"> ... </speed>
  <cmg type="double"> ... </cmg>
  <satellites type="integer"> ... </satellites>
  <mode type="integer"> ... </mode>
</position>

```

[10] [imice.de/api1/rs/status](http://portal.imice.de/api1/rs/status)

```
{
  "connection": ...,
  "servicelevel": ...,
  "speed": ...,
  "gpsStatus": ...,
  "latitude": ...,
  "longitude": ...,
  "serverTime": ...,
  "wagonClass": ...
}
```

[11] [maxdome-onboard.de/api/v1/info/trainenvironmentdata](https://skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata)

```
{
    "bahnUserId": ...,
    "location": {
        "longitude": ...,
        "latitude": ...
    },
    "zipId": ...,
    "locomotiveId": ...,
    "trainNumber": ...,
    "ssd": {
        "ssdid": ...,
        "ssddate": ...,
        "ssdcolor": ...
    },
    "connection": {
        "wifiStatus": ...,
        "bwmax": ...,
        "radioStatus": ...
    }
}
```

### Einschätzung

Die geringe technische Komplexität des beschriebenen Themas steht in starkem Gegensatz zu den vermuteten Volumina der Bahn/Icomera/Maxdome Kooperationen - das lässt mich befürchten, die Datenschutzpannen bei der Bahn sind, wie auch die regelmäßigen Verspätungen, "[nicht Pech, sondern Gier](https://www.omnisophie.com/dd288-bahnverspaetungen-sind-nicht-pech-sondern-gier-maerz-2017/)" :disappointed:

### "Umnutzung"

Vielleicht kann man diese Datenschutz-Lücke aber auch "sinnvoll" einsetzen?
Viele Kunden scheinen enttäuscht von der "WLAN-Abdeckung"
(siehe [#WIFIonICE auf Twitter](https://twitter.com/hashtag/WiFioniCE?src=hash))
... wie wäre es mit einer Karte der "WIFIonICE-Verfügbarkeit"? :wink:

- Karte: [public](public) ([leafletjs](http://leafletjs.com/reference.html) / [openstreetmap](https://www.openstreetmap.org/))
- Datenbank: [server.js](server.js) ([nodejs](https://nodejs.org/api/) / [express](http://expressjs.com/api.html))
  - [postgress.js](database/postgress.js) (db [on heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs))
  - [sqlite3.js](database/sqlite3.js) ("offline" db)

Diese App besteht aus einem [Server](application.js) mit [Nodejs](https://nodejs.org/api/) / [Express](http://expressjs.com/api.html) und einem [Client](docs/client.js) mit [Leafletjs](http://leafletjs.com/reference.html) / [OpenStreetMap](https://www.openstreetmap.org/)

Deployment auf [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) (mit [Postgress DB](postgress.js))

```bash
git clone https://github.com/hacker-bastl/omboard.git
cd omboard
heroku login
heroku create
heroku addons:create heroku-postgresql:hobby-dev
git push heroku master
```

Lokaler / "offline" Test (mit [SQLite3 DB](sqlite3.js))

```bash
git clone https://github.com/hacker-bastl/omboard.git
cd omboard
npm install
node server
```

(TODO: switch from postgress / sqlite3 to [openstreetmap API](http://wiki.openstreetmap.org/wiki/API_v0.6)?)

<kbd><img src="https://raw.githubusercontent.com/hacker-bastl/WIFIonICE/master/docs/screenshot-safari.png" width="400" height="400" /></kbd> <kbd><img src="https://raw.githubusercontent.com/hacker-bastl/WIFIonICE/master/docs/screenshot-chrome.png" width="400" height="400" /></kbd>

In 2016 wurden über das [WLAN im ICE](https://inside.bahn.de/wifionice-wlan-ice-login/) verschiedene [personenbeziehbaren Daten](https://de.wikipedia.org/wiki/Personenbezogene_Daten) (z.B. MAC-Adresse, Aufenthaltsort des Zuges, Wagenklasse, etc.) über [Schnittstellen](https://de.wikipedia.org/wiki/Programmierschnittstelle) (APIs) zugänglich gemacht.
Da diese Schnittstellen nicht bzw. nur mangelhaft abgesichert waren, konnten beliebige (auch nicht dafür authorisierte) Webseiten diese Daten auslesen.

> Unsere Kunden, Mitarbeiter und Geschäftspartner legen zu Recht Wert auf die sparsame Erhebung und den sorgsamen Umgang mit ihren Daten. Deshalb haben wir es uns zur Aufgabe gemacht, eine besondere Verantwortung für diese Daten zu tragen.

- von / siehe "[Datenschutz im DB-Konzern](http://www.deutschebahn.com/de/konzern/datenschutz/vorstellung_datenschutz.html)"


Im Herbst 2016 wurde die Deutsche Bahn über diese Sicherheitslücke informiert. [1]
Es folgten entsprechende Berichte in den Medien. [2]
Die Bahn versuchte die Sicherheitslücke zu schließen. [3]

- [1] 2016/10/12 "[Was das neue Bahn-Wifi über seine Nutzer ausplaudert](http://hannover.ccc.de/~nexus/dbwifi/index.html)" ([Falk](https://twitter.com/Nexus511))
- [2] 2016/10/13 "[Neues WLAN im ICE nimmt Privatsphäre nicht so ernst](https://www.heise.de/security/meldung/Neues-WLAN-im-ICE-nimmt-Privatsphaere-nicht-so-ernst-3348317.html)" ([Heise](https://www.heise.de/security/news/))
- [3] 2016/10/13 "[Gratis-WLAN im ICE: Bahn behebt Sicherheitslücken überraschend schnell](http://t3n.de/news/kostenloses-wlan-ice-deutsche-bahn-fehler-755097/)" ([t3n](http://t3n.de/news/))


Im Sommer 2017 stellte sich heraus, daß die Sicherheitslücke immer noch besteht, bzw. nur unzulänglich behoben wurde.
Der Zugriffs-Schutz war mangelhaft [4] und die Daten waren ebenso über eine alternative Schittstelle verfügbar. [5]
Die Bahn wurde erneut und deutlich informiert. [6] [7]

- [4] 2017/05/10 [der angebliche "Fix" via Referrer](https://twitter.com/jatiki/status/862360786097893376) ([Jan-Tilo](https://twitter.com/jatiki))
- [5] 2017/07/18 [die ungeschützte XML API](https://twitter.com/resciscosilenda/status/887191467629981696) ([Christian](https://twitter.com/resciscosilenda))
- [6] 2017/07/17 "[Chapter 2: Die Bahn, ihr Wifi und die Amateure](http://hannover.ccc.de/~nexus/dbwifi/chapter2.html)" ([Falk](https://twitter.com/Nexus511))
- [7] 2017/07/20 "[Chapter 3: Täglich grüßt das Murmeltier](http://hannover.ccc.de/~nexus/dbwifi/chapter3.html)" ([Falk](https://twitter.com/Nexus511))


Diesbezügliche Medienberichte kommentierte ein Firmensprecher der Bahn wie folgt: [8]

> Man arbeite zusammen mit dem Dienstleister Icomera "mit Hochdruck daran, die Lücke schnellstmöglich zu schließen". Darüber hinaus werde das gesamte System weiterhin auf mögliche Schwachstellen hin untersucht

- [8] 2017/07/17 "[WIFIonICE: CCC warnt vor anhaltendem Sicherheitsproblem beim Bahn-WLAN](https://www.heise.de/newsticker/meldung/WIFIonICE-CCC-warnt-vor-anhaltendem-Sicherheitsproblem-beim-Bahn-WLAN-3773839.html)" ([Heise](https://www.heise.de/security/news/))


Ende Juli 2017 wurden die beiden ursprünglich beschriebenen Schnittstellen umkonfiguriert und waren nun nicht mehr erreichbar. [9] [10]
Eine dritte Schnittstelle, über welche die erwähnten Daten verfügbar waren, wurde [abgesichert](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Response_headers). [11]
Ein Teil der beschriebenen Daten war immer noch über eine vierte Schnittstelle im [Unterhaltungs-Bereich](https://inside.bahn.de/maxdome-onboard-ice/) des ICE-Portals verfügbar. [12]
Diese wurde im September [ebenfalls abgesichtert](https://twitter.com/macbastl/status/907329552858435586).
Das ganze ICE Portal wurde [auf HTTPS umgestellt](https://twitter.com/macbastl/status/906957691087675393).

<details>
  <summary> [9] <a href="https://www.ombord.info/api/jsonp/user/?callback=console.log">www.ombord.info/api/jsonp/user</a></summary>

```json
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

</details>

<details>
  <summary> [10] <a href="https://www.ombord.info/api/xml/position/">www.ombord.info/api/xml/position</a></summary>

```xml
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

</details>

<details>
  <summary> [11] <a href="http://portal.imice.de/api1/rs/status">imice.de/api1/rs/status</a></summary>

```json
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

</details>

<details>
  <summary> [12] <a href="https://skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata">maxdome-onboard.de/api/v1/info/trainenvironmentdata</a></summary>

```json
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

</details>

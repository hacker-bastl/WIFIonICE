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

- [8] [JSONP API ombord.info](https://www.ombord.info/api/jsonp/position/?callback=console.log) deaktiviert
- [9] [XML API ombord.info](https://www.ombord.info/api/xml/position/) deaktiviert
- [10] [JSONP API imice.de](http://portal.imice.de/api1/rs/status) geschützt
- [11] [JSON API maxdome-onboard.de](https://skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata) :open_mouth:

Der Code [in diesem Repository](https://github.com/hacker-bastl/omboard) dient [der Demonstration](https://hacker-bastl.github.io/omboard/) ("Proof of Concept") dieser Sicherheitslücke.

### Bewertung

Die geringe technische Komplexität des beschriebenen Themas steht in starkem Gegensatz zu den vermuteten Volumina der Bahn/Icomera/Maxdome Kooperationen - das lässt befürchten, die Datenschutzpannen bei der Bahn sind, wie auch die regelmäßigen Verspätungen, "[nicht Pech, sondern Gier](https://www.omnisophie.com/dd288-bahnverspaetungen-sind-nicht-pech-sondern-gier-maerz-2017/)"...

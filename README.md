<kbd><img src="https://raw.githubusercontent.com/hacker-bastl/omboard/master/docs/screenshot-safari.png" width="400" height="400" /></kbd> <kbd><img src="https://raw.githubusercontent.com/hacker-bastl/omboard/master/docs/screenshot-chrome.png" width="400" height="400" /></kbd>


### Für Bahn-Fahrer...

Viele Bahn-Kunden [sind enttäuscht](https://twitter.com/hashtag/WiFioniCE?src=hash) über das WLAN im ICE ...

- aber ist das "WIFIonICE" wirklich so schlecht? :open_mouth:
- **[hier gibt es die genauen Daten dazu](https://hacker-bastl.github.io/omboard/)** :smile:


### Datenschutzhinweis

Wenn Sie den o.g. Link im ICE über das "WIFIonICE" öffnen, werden folgende Daten von Ihrem Endgerät auf die angezeigte "ICE WLAN Karte" übertragen und gespeichert:
**die Position des Zugs, die Nummern des Zugs und der Lok, ein Zeitstempel, sowie Daten zur Qualität der WLAN und Funknetzverbindung**
(Details siehe [Datenbank](postgres.js))
**Wir freuen uns über jeden, der die "ICE WLAN Karte" aufruft und damit aktuelle Daten beisteuert!**
Sie helfen damit allen Mitfahren, die Informationen zur Qualität des ICE WLANs suchen.


### Für Entwickler...

Die App besteht aus einem [Server](application.js) mit [Nodejs](https://nodejs.org/api/) / [Express](http://expressjs.com/api.html) und einem [Client](docs/client.js) mit [Leafletjs](http://leafletjs.com/reference.html) / [OpenStreetMap](https://www.openstreetmap.org/)

Deployment auf [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) (mit [Postgress DB](postgres.js))

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

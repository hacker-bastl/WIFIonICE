### Für Bahn-Fahrer...

Viele Bahn-Kunden [scheinen enttäuscht](https://twitter.com/hashtag/WiFioniCE?src=hash) über die "WLAN-Qualität" im ICE ...

<kbd><img src="https://raw.githubusercontent.com/hacker-bastl/omboard/master/docs/screenshot-safari.png" width="400" height="400" /></kbd> <kbd><img src="https://raw.githubusercontent.com/hacker-bastl/omboard/master/docs/screenshot-chrome.png" width="400" height="400" /></kbd>

:bullettrain_side: :satellite: Aber ist die Verfügbarkeit des "WIFIonICE" wirklich so schlecht? :question: :open_mouth:

:signal_strength: :mag: [hacker-bastl.github.io/omboard](https://hacker-bastl.github.io/omboard/) hier sammeln wir die Daten dazu :exclamation: :smile:


### Datenschutzhinweis

:warning: Wenn Sie den o.g. Link im ICE über das "WIFIonICE" öffnen, werden Daten von Ihrem Endgerät auf die angezeigte Karte übertragen und gespeichert:
**die Position des Zugs, die Nummern des Zugs und der Lok, sowie Daten zur Qualität der WLAN und Funknetzverbindung**
(Details siehe [Datenbank](postgres.js))
**Wir freuen uns über jeden, der die Karte aufruft und damit aktuelle Daten zur ICE WLAN Karte beisteuert.**
Sie helfen damit allen Mitfahren, die Informationen zur Qualität des ICE WLANs suchen.
Sollten Sie allerdings keine Speicherung dieser Daten wünschen, sollten Sie statt dem o.g. Link lieber nur [einen Screenshot ansehen](https://raw.githubusercontent.com/hacker-bastl/omboard/master/docs/screenshot-safari.png).


### Für Entwickler...

Die App besteht aus einem [Server](application.js) mit [Nodejs](https://nodejs.org/api/) / [Express](http://expressjs.com/api.html) und einem [Client](docs/client.js) mit [Leafletjs](http://leafletjs.com/reference.html) / [OpenStreetMap](https://www.openstreetmap.org/)

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

(TODO: switch from postgress / sqlite3 to [openstreetmap API](http://wiki.openstreetmap.org/wiki/API_v0.6))

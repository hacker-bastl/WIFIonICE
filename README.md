## about

"proof of concept" to show [which data is exposed](https://hacker-bastl.github.io/omboard/) while using "[WiFi on ICE](https://inside.bahn.de/wifionice-wlan-ice-login/)" ...

## status

- :warning: [maxdome-onboard.de JSON API](https://skidbladnir.maxdome-onboard.de/api/v1/info/trainenvironmentdata) still unprotected :open_mouth:
- :white_check_mark: [imice.de JSON API](http://portal.imice.de/api1/rs/status) protected by ```Access-Control-Allow-Origin``` (?)
- :white_check_mark: [ombord.info JSONP API](https://www.ombord.info/api/jsonp/position/?callback=console.log) deactivated (?)
- :white_check_mark: [ombord.info XML API](https://www.ombord.info/api/xml/position/) deactivated (?)

## references

- kudos to [Falk](https://twitter.com/Nexus511) and the [Chaos Computer Club](https://twitter.com/chaosupdates/status/886905108419751936)
  - "[Was das neue Bahn-Wifi über seine Nutzer ausplaudert](http://hannover.ccc.de/~nexus/dbwifi/index.html)" (2016/10/12)
  - "[Chapter 2: Die Bahn, ihr Wifi und die Amateure](http://hannover.ccc.de/~nexus/dbwifi/chapter2.html)" (2017/07/17)
  - "[Chapter 3: Täglich grüßt das Murmeltier](http://hannover.ccc.de/~nexus/dbwifi/chapter3.html)" (2017/07/20)
- thanks to [Christian](https://twitter.com/resciscosilenda) for sharing that [the XML API is not protected](https://twitter.com/resciscosilenda/status/887191467629981696) (2017/07/18)
- thanks to [Jan-Tilo](https://twitter.com/jatiki) for sharing [the Referrer "fix"](https://twitter.com/jatiki/status/862360786097893376) (2017/05/10)
- see also [#WIFIonICE on Twitter](https://twitter.com/search?f=tweets&vertical=default&q=%23WIFIonICE) ...

<!--
- see also [Gunter Dueck](https://twitter.com/wilddueck): "[Bahnverspätungen sind nicht Pech, sondern Gier!](https://www.omnisophie.com/dd288-bahnverspaetungen-sind-nicht-pech-sondern-gier-maerz-2017/)"
-->

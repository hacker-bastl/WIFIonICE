<img src="https://raw.githubusercontent.com/hacker-bastl/WIFIonICE/master/docs/screenshot-safari.png" width="400" height="400" /> <img src="https://raw.githubusercontent.com/hacker-bastl/WIFIonICE/master/docs/screenshot-chrome.png" width="400" height="400" />

In 2016 wurden über das [WLAN im ICE](https://inside.bahn.de/wifionice-wlan-ice-login/) verschiedene [personenbeziehbaren Daten](https://de.wikipedia.org/wiki/Personenbezogene_Daten) (z.B. MAC-Adresse, Aufenthaltsort des Zuges, Wagenklasse, etc.) über [Schnittstellen](https://de.wikipedia.org/wiki/Programmierschnittstelle) (APIs) zugänglich gemacht.
Da diese Schnittstellen nicht bzw. nur mangelhaft abgesichert waren, konnten beliebige (auch nicht dafür authorisierte) Webseiten diese Daten auslesen.

Mit dieser dem Code in diesem Repository konnten die Daten über eine "Client-seitige" Anwendung (d.h. eine nicht-authorisierte Webseite) ausgelesen und kartiert werden (siehe [Version 1](https://github.com/hacker-bastl/WIFIonICE/tree/v1.3#readme))

Im Sommer / Herbst 2017 wurden die o.g. APIs [abgesichert](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Response_headers) (und das ganze ICE Portal wurde [auf HTTPS umgestellt](https://twitter.com/macbastl/status/906957691087675393)) - der Zugriff über eine Webseite funktioniert nun nicht mehr.
Um weiterhin Daten über die Qualität des ICE WLAN erheben zu können, wurde [Version 2](https://github.com/hacker-bastl/WIFIonICE/tree/v2.0#readme) als "Server-seitige" Anwendung erstellt - diese kann z.B. [auf einem Raspberry Pi](https://twitter.com/macbastl/status/960056325492355072) betrieben werden.

Der Code zur automatischen Anmeldung am ICE WLAN [findet sich hier](https://gist.github.com/147718dcc637e150bfa394e7491ff84c).

# De Kronieken van het Vergeten Weekend

Het tv-spel voor ons vriendenweekend in Bouillon (13–15 november 2026): een Guild Hall op de tv, vier Zegels die gevuld moeten worden, Schaduw-events, de Wachterstocht, een finale met puzzels en de Ere van de Wachters.

## Zo draait het

- **De site** staat in `docs/` en wordt gehost via GitHub Pages.
- **Iedere Wachter** logt in op `wachter.html` met zijn eigen account (`<naam>@petjoempa.nl`): eerst het aftellen, na de Eerste Dronk zijn rol, in de finale zijn stuk van de eed. Wie de verrader is, ziet daar ook de knop naar zijn verraderspaneel.
- **De admins** (Rob, Jean, Roland) zien op hun pagina de knop naar de regie. De tv (laptop via HDMI) opent de site met `?tv` en logt één keer in met een admin-account.
- De live koppeling loopt via **Firebase Realtime Database** en **Authentication**. Config in `docs/a/firebase-config.js`, databaseregels in `app/firebase-regels.json`.

Zonder internet kan het ook lokaal: `node app/server.mjs` op de laptop, en telefoons op dezelfde wifi. De persoonlijke links werken dan met het token uit `docs/a/wachters.js` (`wachter.html#<token>`).

## Inhoud

| Map | Wat |
|---|---|
| `docs/` | De site: tv-scherm, regie, Chaos Lord, beeld en geluid (`docs/a`) |
| `docs/a/events.js` | De 27 Schaduw-events |
| `docs/a/spel.js` | Wachterstocht, relieken, finale-puzzels en de eretitels |
| `app/server.mjs` | Lokale server (alternatief voor Firebase) |
| `scripts/` | Hoe beeld, stemmen en muziek gemaakt zijn |
| `print/` | Het regelboek |

## Bronnen

- Geluidseffecten: CC0 (OpenGameArt, Freesound, Kenney).
- Iconen in het regelboek: [game-icons.net](https://game-icons.net) (Lorc, Delapouite), CC BY 3.0.
- Stemmen: Google Gemini TTS; muziek: Google Lyria 2; beeld: Nano Banana Pro, Flux, Seedance, Wan 2.2 (via Replicate).

# De Kronieken van het Vergeten Weekend

Het tv-spel voor ons vriendenweekend in Bouillon (13–15 november 2026): een Guild Hall op de tv, vier Zegels die gevuld moeten worden, Schaduw-events, de Wachterstocht, een finale met puzzels en de Ere van de Wachters.

## Zo draait het

- **De site** staat in `docs/` en wordt gehost via GitHub Pages.
- **De tv** (laptop via HDMI) opent de site met `?tv` achter het adres en logt één keer in met het regie-wachtwoord.
- **De regie** en **de Chaos Lord** hebben elk een eigen pagina en een eigen wachtwoord. De adressen delen de organisatoren onderling.
- **Iedere Wachter** krijgt vooraf een persoonlijke link (`wachter.html#<token>`, te kopiëren in de regie): eerst het aftellen, na de Eerste Dronk zijn rol en in de finale zijn stuk van de eed.
- De live koppeling loopt via **Firebase Realtime Database**. Vul `docs/a/firebase-config.js` met de config uit Firebase.

Zonder internet kan het ook lokaal: `node app/server.mjs` op de laptop, en telefoons op dezelfde wifi.

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

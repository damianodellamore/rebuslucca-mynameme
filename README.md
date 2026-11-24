# ReBus · mynameme.com

Catalogo delle app ReBus per il trasporto locale. ReBusLucca 1.1 è disponibile su App Store e ReBusMilano è in arrivo. Il sito è statico e viene pubblicato con Netlify.

## Avvio locale

Usa Node.js 22 o successivo ed esegui dalla radice del repository:

```sh
npm test
npm run build
npm run preview
```

Apri `http://127.0.0.1:4173`. Dopo una modifica al sito, esegui di nuovo `npm run build` e ricarica l’anteprima.

## Pagine e risorse

- `src/index.html` contiene il catalogo delle città e lo stato di ogni app.
- `src/rebuslucca/index.html` contiene la presentazione di ReBusLucca, le funzioni, le FAQ e il link App Store.
- `src/assistenza/index.html` contiene i contatti e le risposte ai problemi più comuni.
- `src/privacy/index.html` contiene l’informativa per ReBusLucca e il sito.
- `src/fonti/index.html` contiene attribuzioni, copertura e informazioni sui dati di ReBusLucca.
- `src/assets/site.css` contiene gli stili comuni. `src/assets/catalog.css` contiene gli stili del catalogo.

Per aggiungere un’altra città, aggiungi una scheda nella sezione `#app` del catalogo. Se crei una pagina dedicata, aggiungila anche al sitemap e all’elenco delle pagine in `tests/site.test.mjs`. Il link App Store si aggiunge quando il relativo indirizzo pubblico è disponibile.

ReBusLucca scarica via Wi-Fi gli aggiornamenti disponibili per orari e fermate e li applica all’apertura successiva. L’app mostra il periodo di validità degli orari programmati. I dati distribuiti all’app sono gestiti separatamente dal sito.

## Pubblicazione

Modifica i file in `src/`. La build rigenera `dist/` a partire da quei file. Il comando di build di Netlify, definito in `netlify.toml`, è `npm test && npm run build`.

Con Netlify collegato al branch di produzione `main`, il push pubblica il sito dopo una build riuscita. La [guida Netlify e GoDaddy](docs/NETLIFY-GODADDY.md) descrive la configurazione del dominio. Le URL per la scheda Apple sono nella [guida App Store Connect](docs/APPLE-DEVELOPER.md).

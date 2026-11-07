# RebusLucca · mynameme.com

Sito vetrina pronto da aprire in VS Code, inserire in un tuo repository Git e pubblicare con Netlify. Solo HTML, CSS e JavaScript, senza dipendenze applicative.

La cartella contiene il sito web. Il progetto Xcode dell’app è una consegna separata.

## Avvio locale

1. Estrai lo ZIP e apri la cartella `RebusLucca-Sito` in VS Code.
2. Usa Node.js 22 o successivo. Con nvm: `nvm use`.
3. Dal terminale della cartella esegui:

```sh
npm test
npm run build
npm run preview
```

Apri `http://127.0.0.1:4173`. Per fermare l’anteprima: Ctrl+C. Non serve `npm install`: non ci sono pacchetti esterni. Dopo una modifica esegui di nuovo `npm run build` e ricarica la pagina. Aprire direttamente il file HTML con doppio clic non gestisce correttamente i percorsi assoluti e i moduli JavaScript.

## Cosa trovi

- `src/index.html`: presentazione, anteprima illustrativa, funzioni, FAQ e lancio.
- `src/privacy/index.html`: informativa per app e sito.
- `src/assistenza/index.html`: supporto e contatto.
- `src/fonti/index.html`: attribuzioni, validità degli orari e limiti del servizio.
- `src/assets/site.css`: stile responsive, sempre chiaro e con font di sistema.
- `src/assets/site-config.js`: data del lancio e futuro link App Store.
- `src/assets/site.js` e `countdown.js`: comportamento del conto alla rovescia.
- `src/assets/`: icona e favicon derivate dai file originali dell’app.
- `netlify.toml`: build e pubblicazione già configurate.
- `docs/`: collegamento dominio, campi URL Apple, verifiche e fonti.

La build genera `dist/`. Modifica i file in `src/`, non quelli generati. `.gitignore` esclude output e file locali. Lo ZIP non contiene un repository inizializzato: puoi crearlo tu da VS Code.

## Git e Netlify

Puoi usare Source Control di VS Code. In alternativa, crea un repository vuoto sul tuo provider Git e poi esegui:

```sh
git init
git add .
git commit -m "Sito RebusLucca"
git branch -M main
```

Aggiungi il remoto sostituendo `URL_DEL_TUO_REPOSITORY` con l’URL reale:

```sh
git remote add origin URL_DEL_TUO_REPOSITORY
git push -u origin main
```

Su Netlify importa quel repository. Le impostazioni sono: branch `main`, directory di base la radice del repository, comando `npm test && npm run build`, directory pubblicata `dist`. La configurazione è già in `netlify.toml`. Ogni push sul branch di produzione avvia un nuovo deploy.

Segui poi [la guida Netlify + GoDaddy](docs/NETLIFY-GODADDY.md).

## Lancio dell’app

Data impostata: **11 novembre 2026 alle 00:00, ora italiana** (`2026-11-11T00:00:00+01:00`). Il countdown indica il lancio previsto, non un’approvazione di Apple.

Quando l’app sarà effettivamente pubblicata, incolla il link pubblico verificato in `appStoreUrl` dentro `src/assets/site-config.js`, fra apici, al posto di `null`. Poi build, commit e push. Il pulsante App Store diventa visibile; il codice accetta soltanto URL HTTPS del dominio `apps.apple.com` con un ID app.

Senza quel link, scaduto il countdown il sito mostra un messaggio di attesa della pubblicazione: non promette un download inesistente. Aggiorna anche i testi della home, del menu e della descrizione SEO quando il lancio è avvenuto. Se rinvii la data, modifica configurazione, testi, tag `time` e test della data in modo coerente.

## Contenuti e manutenzione

La firma `Made with <3 by Damiano Dell'Amore` è presente in tutte le pagine, inclusa la pagina 404. Nel codice `<3` è scritto `&lt;3` per mostrarlo correttamente.

Il sito non attiva cookie, analytics, moduli, font esterni o mappe live. La mappa nel telefono è un’illustrazione, dichiarata come tale. Per sostituirla con schermate autentiche, usa screenshot dell’app definitiva.

La privacy descrive il codice dell’app esaminata e l’hosting previsto su Netlify; se aggiungi servizi, analytics o raccolta dati, aggiorna l’informativa prima di attivarli. Il contatto pubblicato è `damianodellamore96@gmail.com`. Verifica che riceva regolarmente richieste.

Gli orari inclusi nell’app esaminata coprono **4–24 novembre 2026**. Aggiornare questo sito non aggiorna il database dell’app: occorre mantenere separatamente il progetto iOS e i suoi dati. Non promettere dati in tempo reale.

Per le URL richieste da App Store Connect: [docs/APPLE-DEVELOPER.md](docs/APPLE-DEVELOPER.md).

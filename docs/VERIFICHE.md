# Verifiche della consegna

7 novembre 2026 · sito vetrina RebusLucca

- `npm test`: 10 test superati.
- `npm run build`: riuscita, output statico in `dist/`.
- Countdown verificato prima, durante e dopo la scadenza; valori mai negativi.
- Validazione del link App Store e assenza di un collegamento inventato.
- Collegamenti interni, ancore, ID univoci, metadati, tema chiaro e footer controllati in tutte e cinque le pagine HTML.
- Assenza nel codice del sito di script remoti, archiviazione dei visitatori e localizzazione.
- Favicon confrontata byte per byte con l’asset iOS originale: identica.
- Controllo visivo nel browser desktop e in riquadri responsive da 320, 390 e 768 px. Nelle misure controllate la home non ha scorrimento orizzontale.
- Navigazione “Scopri l’app”, apertura FAQ, privacy e assistenza verificate nel browser. Pagina privacy controllata anche a 320 px.
- Firma del footer verificata nel testo renderizzato: `Made with <3 by Damiano Dell'Amore`.

Sono controlli sul sito e sul suo codice, non test su iPhone/iPad fisici né un collaudo della build iOS. Il pacchetto non esegue deploy, non modifica i DNS e non compila App Store Connect. La verifica pubblica di HTTPS e degli indirizzi Apple si esegue dopo il primo deploy e il collegamento del dominio.

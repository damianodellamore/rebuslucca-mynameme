# URL per App Store Connect

Dopo la pubblicazione del sito su Netlify e l’attivazione HTTPS di `mynameme.com`, questi sono i valori da copiare nei campi della scheda italiana:

| Campo | Valore |
| --- | --- |
| URL marketing | `https://mynameme.com/` |
| URL supporto | `https://mynameme.com/assistenza/` |
| URL informativa sulla privacy | `https://mynameme.com/privacy/` |
| URL scelte sulla privacy, facoltativo | `https://mynameme.com/privacy/#scelte` |

Le URL sono quelle previste dal progetto, non URL già pubblicate da questa consegna. Prima di inserirle, apri ciascuna in una finestra privata: deve funzionare senza login, con HTTPS valido.

Il nome dell’app resta **RebusLucca - Myname.com**. Il dominio del sito è **mynameme.com**, come richiesto; non sono la stessa stringa.

La pagina supporto contiene il contatto email dello sviluppatore. La pagina privacy descrive localizzazione facoltativa, preferiti sul dispositivo, cartografia esterna, hosting e diritti. La pagina fonti chiarisce che gli orari sono programmati e che il progetto è indipendente.

Il questionario “Privacy dell’app” va compilato in base alla build effettivamente inviata e al trattamento dei dati da parte dei fornitori. La presenza di questa pagina non compila quel questionario e non attesta un’approvazione Apple. Verifica anche che il collegamento all’informativa sia accessibile nell’app consegnata.

Gli screenshot di App Store devono mostrare l’app reale. Il telefono disegnato sulla vetrina è un’anteprima illustrativa e non sostituisce gli screenshot richiesti da Apple.

Quando avrai il link pubblico App Store, inseriscilo in `src/assets/site-config.js`. Archive, firma, caricamento e test su dispositivi restano nel progetto Xcode.

Fonti:

- [Apple: App privacy details](https://developer.apple.com/app-store/app-privacy-details/)
- [Apple: App privacy reference](https://developer.apple.com/help/app-store-connect/reference/app-information/app-privacy/)
- [Apple: App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

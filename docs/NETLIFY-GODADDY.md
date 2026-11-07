# Git → Netlify → dominio GoDaddy

Dominio: **mynameme.com**. Il dominio rimane registrato e rinnovato su GoDaddy. Il sito viene distribuito da Netlify.

## 1. Importa il repository

Dopo il primo push, su Netlify scegli l’importazione da un repository esistente. Autorizza il provider Git e seleziona il repository del sito.

| Impostazione | Valore |
| --- | --- |
| Branch di produzione | `main` |
| Directory di base | radice del repository, campo vuoto |
| Build command | `npm test && npm run build` |
| Publish directory | `dist` |
| Versione Node | `22`, già in `netlify.toml` |
| Variabili segrete | nessuna necessaria |

Esegui il primo deploy. Apri l’indirizzo `.netlify.app` assegnato al progetto e controlla home, privacy e assistenza. Se il progetto è privato, rendilo pubblico prima di usare le URL per Apple.

## 2. Mantieni i DNS su GoDaddy

È il percorso più semplice per questo progetto. Aggiungi `mynameme.com` nella gestione domini del progetto Netlify e verifica che sia presente anche `www.mynameme.com`. Imposta `mynameme.com` come dominio principale, coerente con le URL canoniche del sito.

Apri la gestione DNS del dominio su GoDaddy, se i nameserver attivi sono quelli di GoDaddy. Per la configurazione Netlify standard:

| Tipo | Nome / host | Valore |
| --- | --- | --- |
| A | `@` | `75.2.60.5` |
| CNAME | `www` | il nome `.netlify.app` assegnato al TUO progetto |

Il valore CNAME è un nome host, senza `https://` né percorsi. Copialo dalla dashboard: non usare un nome di esempio. Confronta sempre i valori con **Pending DNS verification** di Netlify, che mostra le indicazioni per il tuo progetto.

Sostituisci solo i record in conflitto per `@` e `www`, dopo averli controllati. Conserva MX, TXT, SPF, DKIM, DMARC e gli altri record per posta o servizi esistenti. Se c’è un inoltro GoDaddy per lo stesso dominio, verifica che non interferisca.

Attendi la propagazione e verifica DNS e certificato HTTPS in Netlify. Controlla sia dominio principale sia `www`; il secondo deve rimandare al principale.

## 3. Alternativa: Netlify DNS

Puoi invece affidare la gestione DNS a Netlify mantenendo la registrazione su GoDaddy. Aggiungi il dominio a Netlify DNS e copia prima i record dei servizi esistenti, soprattutto la posta. Poi cambia su GoDaddy i nameserver con quelli esatti assegnati da Netlify.

Non inventare indirizzi dei nameserver e non combinare le due procedure. Con questa alternativa le successive modifiche ai record si fanno su Netlify.

## 4. Aggiornamenti quotidiani

Modifica `src/` in VS Code, esegui test e build, poi commit e push. Netlify pubblica la nuova versione dopo una build riuscita. Leggi il log del deploy se non va a buon fine.

Il primo collegamento del dominio non è incluso nel pacchetto: la procedura parte quando hai il tuo repository e il tuo progetto Netlify.

Fonti ufficiali consultate il 7 novembre 2026:

- [Importazione di progetti](https://docs.netlify.com/manage/projects/add-new-project/)
- [DNS esterni](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/)
- [Collegare un dominio esistente](https://docs.netlify.com/manage/domains/configure-domains/bring-a-domain-to-netlify/)
- [GoDaddy: modificare un CNAME](https://www.godaddy.com/help/edit-a-cname-record-19237)

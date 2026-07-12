# AfterBuy — WIP Transparency Policy

## Principio

La trasparenza è parte del prodotto: rende la demo più credibile per un recruiter e più rispettosa per un potenziale utente. Lo stato non va delegato a disclaimer legali o microcopy invisibile; deve essere leggibile vicino alle feature e alla CTA.

## Vocabolario controllato

| Stato | Quando usarlo | Label | Copy di supporto |
|---|---|---|---|
| Disponibile | Il percorso è navigabile e funziona nella preview | `Available` | `Available in the current product preview.` |
| Dati demo | Il flusso usa seed, reset o comportamento non destinato a dati reali | `Demo data` | `This preview uses example data and no personal documents.` |
| In sviluppo | Il lavoro è previsto nello sprint corrente ma non è accessibile/affidabile | `In progress` | `This part of the core flow is being built and tested.` |
| Pianificato | È oltre il vertical slice corrente | `Planned` | `A possible next improvement, not a release promise.` |
| Fuori scope MVP | Il progetto ha scelto di non realizzarlo ora | `Not in the MVP` | `Deliberately outside the current product scope.` |

Non usare `Coming soon`, `beta` o `almost ready` senza un contenuto verificabile: sono vaghi e aumentano aspettative non gestibili.

## Regole di applicazione

1. Una feature disponibile richiede un percorso cliccabile o una preview reale.
2. Una feature mostrata con screenshot parziale ma non navigabile è `In progress`, non `Available`.
3. Una feature demo richiede sempre la nota sui dati seed e sul fatto che non vengono usati documenti personali reali.
4. Nessun badge di stato deve basarsi soltanto sul colore; testo e semantica devono restare presenti.
5. Il codice della landing deve leggere lo stato da una singola fonte/configurazione per evitare CTA e disclosure incoerenti.

## Microcopy pronta all'uso

### Nota globale

`Product preview · work in progress. AfterBuy is being built as a focused full-stack vertical slice.`

### Accanto a “Open App”

`Explore the current preview with seeded example data.`

### Se la demo è resettabile

`Demo data may be reset. Please do not use personal purchase information.`

### Feature incompleta

`In progress — this part of the core flow is currently being implemented and tested.`

### Feature pianificata

`Planned after the core purchase, deadline and action flow is complete.`

### Feature esclusa dallo scope

`Not in the MVP. AfterBuy does not currently connect to inboxes, merchants or bank accounts.`

### Stato di caricamento della preview

`Loading the product preview…`

### Preview non disponibile

`The product preview is not available right now. The product status below reflects the current build.`

**CTA alternativa:** `Read product status`

## Roadmap: confini comunicativi

La roadmap può nominare soltanto miglioramenti già presenti nel MVP scope come should/could-have o future roadmap: search/filtri, archive/export, reminder concept, upload placeholder, demo reset/deployment. Non deve includere date, percentuali di avanzamento, prezzi o deduzioni su partnership.

## Checklist editoriale pre-pubblicazione

- [ ] Ogni claim “available” ha una prova navigabile o uno screenshot della build corrente.
- [ ] CTA, hero note e sezione availability descrivono lo stesso stato del prodotto.
- [ ] Dati seed e assenza di dati/documenti personali reali sono dichiarati quando rilevanti.
- [ ] Tutte le capacità fuori scope MVP restano nella sezione roadmap o “Not in the MVP”.
- [ ] Nessuna promessa assoluta, metrica inventata, data di rilascio o testimonianza fittizia.

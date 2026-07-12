# AfterBuy — UX States & Microcopy

**Version:** 1.0  
**Method:** Impeccable (UX Writing + Product Design)  
**Status:** Final Definition  

---

## 1. Visione della Voce (Tone of Voice)

La microcopy di AfterBuy segue il principio **"Utilitarian Premium"**. 

- **Pratico:** Non usa giri di parole. Va dritto al punto.
- **Calmo:** Non induce panico, anche quando segnala un'urgenza. Trasforma l'ansia in azione.
- **Orientato all'Azione:** Ogni messaggio deve suggerire o portare a una risoluzione.
- **Affidabile:** Usa un linguaggio preciso, quasi tecnico ma accessibile, per comunicare stabilità.

**Regola d'oro:** Sostituire "C'è un problema" con "Cosa è successo e come risolviamo".

---

## 2. Empty States (Stati Vuoti)

Gli stati vuoti di AfterBuy non sono "mancanze", ma **stati di risoluzione** o **inviti all'azione**.

| Schermata | Scenario | Titolo | Descrizione | CTA Primaria |
| :--- | :--- | :--- | :--- | :--- |
| **Dashboard** | Nessun acquisto | **Inizia a proteggere i tuoi acquisti** | Nessun acquisto registrato. Aggiungi il tuo primo prodotto per tracciare resi, rimborsi e garanzie. | `+ Aggiungi acquisto` |
| **Dashboard** | Nessuna azione urgente | **Tutto sotto controllo** | Non ci sono scadenze imminenti o azioni richieste. I tuoi acquisti sono al sicuro. | `Vai agli acquisti` |
| **Purchase List** | Nessun risultato filtri | **Nessun risultato trovato** | Nessun acquisto corrisponde ai filtri selezionati. Prova a cambiare negozio, categoria o stato. | `Cancella filtri` |
| **Purchase List** | Lista completamente vuota | **Il tuo archivio è vuoto** | Non hai ancora salvato acquisti. Inizia a tracciare i tuoi prodotti per non perdere i tuoi diritti di reso. | `+ Aggiungi acquisto` |
| **Purchase Detail** | Documenti mancanti | **Nessun documento salvato** | Non sono state associate ricevute, fatture o manuali a questo acquisto. | `Aggiungi riferimento` |
| **Purchase Detail** | Timeline vuota | **Nessun evento registrato** | La cronologia dell'acquisto è vuota. Gli aggiornamenti appariranno qui man mano che l'acquisto evolve. | — |
| **Actions Needed** | Nessuna azione | **Zero pendenze** | Non ci sono azioni urgenti in questo momento. Goditi i tuoi acquisti. | `Torna al Dashboard` |

---

## 3. Loading States (Stati di Caricamento)

Per evitare il layout shift, AfterBuy usa skeleton. La microcopy di accompagnamento (se presente) deve essere rassicurante.

- **Dashboard:** `LoadingState` (Skeleton summary + card). *Label di sistema:* "Aggiornamento dashboard..."
- **Purchase List:** `LoadingState` (Skeleton rows/cards). *Label di sistema:* "Recupero archivio acquisti..."
- **Purchase Detail:** `LoadingState` (Skeleton header + panels). *Label di sistema:* "Caricamento dettagli prodotto..."
- **Form Submit:** Pulsante `disabled` con spinner. *Microcopy:* "Salvataggio in corso..." o "Aggiornamento..."

---

## 4. Error States (Stati di Errore)

Nessun "Something went wrong". L'errore deve spiegare il contesto e offrire una via d'uscita.

| Contesto | Titolo/Messaggio | Azione di Recupero |
| :--- | :--- | :--- |
| **Dashboard Load** | **Non riusciamo a caricare il dashboard.** <br>Potrebbe esserci un problema di connessione. Riprova tra un istante. | `Riprova` |
| **Purchase List Load** | **Impossibile recuperare la lista acquisti.** <br>I tuoi dati sono al sicuro, ma non riusciamo a visualizzarli ora. | `Riprova` |
| **Purchase Detail Load** | **Acquisto non trovato.** <br>L'acquisto richiesto non è più disponibile o l'indirizzo è errato. | `Torna agli acquisti` |
| **Form Submit Error** | **Non riusciamo a salvare l'acquisto.** <br>I dati inseriti sono stati preservati. Verifica la connessione e riprova. | `Riprova` |
| **Status Update Error** | **Aggiornamento non riuscito.** <br>Non è stato possibile cambiare lo stato. Riprova tra un momento. | `Riprova` (inline) |
| **Invalid Filter URL** | **Filtri non validi.** <br>Alcuni parametri di ricerca non erano corretti e sono stati reimpostati ai valori predefiniti. | (Auto-resolution) |

---

## 5. Validation Messages (Messaggi di Validazione)

Messaggi brevi, posizionati inline sotto il campo, che spiegano esattamente cosa correggere.

- **Campi Obbligatori:** `Inserisci [Nome Campo]` (es. "Inserisci il nome del prodotto").
- **Prezzo:** `Il prezzo deve essere un numero positivo`.
- **Data Acquisto:** `La data non può essere nel futuro`.
- **URL (Sito/Assistenza/Ricevuta):** `Inserisci un URL valido (es. https://...)`.
- **Giorni Reso / Mesi Garanzia:** `Inserisci un numero intero maggiore o uguale a zero`.
- **Form General Error:** `Alcuni campi richiedono attenzione prima di poter salvare.`

---

## 6. Microcopy per CTA (Call to Action)

Le CTA sono dirette e utilizzano verbi d'azione.

| Tipo | Etichetta | Contesto |
| :--- | :--- | :--- |
| **Primaria** | `Salva acquisto` | Submit form creazione |
| **Primaria** | `Aggiorna acquisto` | Submit form edit |
| **Primaria** | `+ Aggiungi acquisto` | Dashboard / List |
| **Secondaria** | `Annulla` | Uscita da form senza salvare |
| **Secondaria** | `Cancella filtri` | Reset filtri in Purchase List |
| **Secondaria** | `Modifica` | Passaggio da Detail a Edit |
| **Ghost/Link** | `Vedi tutte le azioni` | Dashboard $\rightarrow$ Actions Needed |
| **Ghost/Link** | `Dettaglio →` | Action Card $\rightarrow$ Purchase Detail |
| **Ghost/Link** | `Riprova` | Error states |

---

## 7. Microcopy per Azioni Urgenti e Deadline

Il linguaggio qui deve bilanciare l'urgenza con la calma.

### 7.1 Ragioni dell'Azione (Action Reasons)
- **Overdue (Rosso):** 
  - `Reso scaduto`
  - `Rimborso in ritardo`
  - `Garanzia scaduta`
- **Due Soon (Ambra):** 
  - `Reso in scadenza`
  - `Garanzia in scadenza`
  - `Azione richiesta entro breve`
- **Upcoming (Blu):** 
  - `Ricevuta mancante`
  - `Monitoraggio consigliato`

### 7.2 Label delle Deadline
- **Relativa (entro 7gg):** `Scade tra [X] giorni`
- **Assoluta (oltre 7gg):** `Scade il [Data]`
- **Scaduta:** `Scaduto il [Data]`
- **Rimanente (mesi):** `[X] mesi rimanenti`
- **Rimborso Pending:** `In attesa da [X] giorni`

---

## 7bis. Post-Resolution Feedback

Dopo il completamento di un'azione (es. reso segnato come "restituito", rimborso segnato come "ricevuto"), l'utente riceve un feedback immediato.

### 7bis.1 Toast Messages (compare dopo quick action)

| Dominio | Azione | Messaggio Toast |
|---------|--------|-----------------|
| Return | Segnato come restituito | **Reso registrato.** Passaggio successivo: monitora il rimborso. |
| Refund | Segnato come ricevuto | **Rimborso registrato.** Questo acquisto è ora completo. |
| Receipt | Ricevuta aggiunta | **Ricevuta salvata.** L'acquisto è ora documentato. |

### 7bis.2 Animazione

- La card dell'azione completata esce con fade + slide verso l'alto (300ms)
- Le card successive si riposizionano senza scatto (transizione `transform 300ms`)
- Il summary strip si aggiorna (conteggio azioni decrementato)

### 7bis.3 Quick Action Labels

| Dominio | Urgency | Label Quick Action |
|---------|---------|--------------------|
| Return | `overdue` / `due_soon` | `Segna come restituito` |
| Refund | `overdue` / `due_soon` / `upcoming` | `Segna rimborso ricevuto` |
| Receipt | `upcoming` | `Aggiungi ricevuta` |
| Warranty | `due_soon` | (nessuna quick action — naviga a detail) |

---

## 8. Mobile UX Rules

Per garantire l'efficacia su dispositivi mobile (utente con prodotto in mano):

1. **Touch Target:** Ogni elemento interattivo (bottone, chip, riga di tabella) deve avere un'area di tap minima di `44x44px`.
2. **Sticky Actions:** Nei form lunghi, il pulsante `Salva acquisto` deve essere sticky in fondo allo schermo.
3. **Pattern Tabella $\rightarrow$ Card:** Nessun scroll orizzontale. Le tabelle desktop diventano stack di card verticali.
4. **Filter Chips:** I filtri attivi devono essere mostrati come chip in un contenitore a scroll orizzontale.
5. **Input Mode:** Utilizzare `inputmode="numeric"` per prezzo, giorni e mesi per forzare la tastiera numerica.
6. **Above the Fold:** L'azione più urgente del dashboard deve essere visibile senza scroll.

---

## 9. Accessibility Notes (WCAG 2.1 AA)

- **No Color-Only:** L'urgenza non è mai comunicata solo the colore. Si usa sempre: `Colore + Testo (Badge) + Posizione (Gerarchia)`.
- **Screen Readers:** 
  - Ogni input ha un `<label>` esplicito.
  - I badge di urgenza usano `aria-label="Urgenza: [livello]. [testo]"` (es. "Urgenza: Scaduto. Reso scaduto il 12 luglio").
  - Gli errori di form sono annunciati tramite `role="alert"` o `aria-live="polite"`.
- **Focus State:** Ogni elemento interattivo ha un ring di focus visibile (`2px solid --signal-blue`).
- **Contrast:** Tutti i testi sui signal colors (con opacità 10%) sono verificati per avere un contrasto $\ge$ 4.5:1.

---

## 10. Cosa evitare (Anti-patterns)

- ❌ **Linguaggio Allarmista:** Evitare "ATTENZIONE!", "PERICOLO!", "ERRORE GRAVE!". Usare "Azione richiesta" o "Scadenza superata".
- ❌ **Testi Generici:** Ev evitare "Qualcosa è andato storto" o "Errore di sistema". Specificare sempre dove e cosa è fallito.
- ❌ **Empty States "Tristi":** Evitare icone di faccine tristi o messaggi come "Non hai ancora nulla". Usare "Tutto sotto controllo" o "Inizia a proteggere".
- ❌ **Over-explanation:** Evitare paragrafi di spiegazione. Se l'utente clicca "Dettaglio", troverà le informazioni. La microcopy deve essere un trigger, non un manuale.
- ❌ **Tasti Ambigui:** Evitare "OK" o "Invia". Usare "Salva acquisto", "Aggiorna stato", "Riprova".

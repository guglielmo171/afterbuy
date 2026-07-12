# AfterBuy — Impeccable Design Review

**Review date:** 2026-07-12  
**Reviewer:** Impeccable Design Reviewer  
**Sources:** `design-brief.md`, `screen-specs.md`, `design-system.md`, `ux-states.md`, `mvp-scope_UPDATED.md`, `frontend.md`  
**Verdict:** Promossa con correzioni. La direzione è solida, il rischio genericità è contenuto. Tutti i 7 problemi identificati sono stati corretti nei documenti di design (2026-07-12).

---

## 1. Punti forti

1. **Product anchors solidi e coerenti.**
   Le 8 anchor definite in screen-specs §Product Anchors sono referenziate consistentemente in ogni documento. "Time to Action ≤ 3 secondi" e "Priority of Action" governano davvero le decisioni di layout, non sono slogan vuoti.

2. **"Utilitarian Premium" è un posizionamento difendibile.**
   Il design brief §8 traccia una distinzione netta tra "Generic SaaS Dashboard" e "Consumer Utility". Il confronto tabellare (Mindset, Primary Action, Goal, User Flow, Feeling) è il tipo di chiarezza che manca al 90% dei progetti portfolio.

3. **Anti-patterns espliciti.**
   Il design system §7 elenca 8 anti-pattern con esempi concreti (`❌` / `✅`). Questo è il materiale più utile per un coding agent: non solo cosa fare, ma cosa NON fare.

4. **"Rewarding Emptiness" come principio.**
   Trattare lo stato vuoto come "risolto" invece che "mancante" è un tratto distintivo. La microcopy è già scritta per ogni scenario (ux-states.md §2).

5. **Specifiche mobile dedicate, non derivate.**
   Ogni schermata ha una sezione mobile progettata ex-novo (§7, §8), non un paragrafo di "adattamenti". Touch target 44px, FAB positioning, above-the-fold urgency sono tutti prescritti.

6. **Stati parziali e edge case coperti.**
   "Partial data" (una query fallisce, l'altra no), "Missing related records" (returnCase null), "Invalid filter URL" sono stati che la maggior parte dei progetti ignora fino alla prima issue in produzione.

7. **Microcopy pronta all'uso.**
   Non ci sono placeholder tipo "TODO: scrivere messaggio". Ogni empty state, error state, validation message e CTA ha il testo definitivo in italiano.

8. **Design system orientato all'implementazione.**
   Le specifiche dei componenti (§4) includono Props TypeScript, varianti, stati, comportamento accessibilità, e una matrice di utilizzo cross-schermata (§9). Un coding agent può implementare direttamente da queste spec.

9. **"Notes for the Coding Agent" (§10) dimostra maturità.**
   Implementation order, "start small", principi shared UI, color config Tailwind. Chi ha scritto queste note sa cosa significa dare specifiche a un agente.

---

## 2. Punti deboli

1. **Il Summary Strip rischia di essere un KPI dashboard mascherato.**
   5 counter (acquisti, azioni, rimborsi, garanzie, ricevute) in una strip orizzontale è il pattern principe dei dashboard SaaS. Il design brief dice "evitare widget-itis" ma 5 numeri in fila sono esattamente quello. Su mobile (3+2 split) il problema si aggrava: a 320px, 3 counter in prima riga sono ~106px ciascuno con label, molto stretti.

2. **Nessuna "quick action" sulle urgent action card nel dashboard.**
   L'utente vede "Reso scaduto — Nike Air Max" ma l'unica azione possibile è tappare per andare al dettaglio. Il flusso Dashboard → Detail → Dropdown status → Aggiorna è 3 tap per un'azione che potrebbe essere 1. Nella vista Actions Needed, le quick action sono etichettate "(opzionale, se implementato)". Per un prodotto che si posiziona su "Time to Action", questo è un controsenso.

3. **Il componente `ActionCard` è duplicato concettualmente.**
   `UrgentActionCard` (dashboard) e `ActionNeededCard` (actions-needed) condividono struttura, dati e comportamento ma sono componenti separati in feature directory diverse. La spec dice "La ActionCard deve essere lo stesso componente" (screen-specs §6.10) ma l'inventario li elenca come due componenti distinti. Da consolidare in uno shared feature component o, ancora meglio, gestire con una prop `variant: 'compact' | 'extended'`.

4. **Manca una strategia per il "dopo la risoluzione".**
   Cosa vede l'utente dopo aver segnato un reso come "restituito"? La card scompare dal dashboard (corretto), ma non c'è feedback di completamento. Nessuna micro-animazione, nessun messaggio di conferma, nessun "Hai completato 3 azioni questa settimana". Il principio "Status as Progress" (§9.3 del brief) promette una sensazione di "win", ma l'implementazione attuale è solo un cambio di badge.

5. **Sticky search bar: "Da testare".**
   Screen-specs §8.9: "Search bar: sticky in alto? Da testare." Questa indecisione su un elemento primario dell'interfaccia mobile è un rischio. Su mobile, una search bar sticky + filtri espansi + chip attivi possono consumare 120px+ di viewport prima che l'utente veda una card.

6. **Nessuna specifica per il layout a 320px.**
   Tutti i riferimenti mobile usano 390px (iPhone 14). Il minimo reale è 320px (iPhone SE, dispositivi Android entry-level). I 5 counter del summary strip a 320px rischiano di essere illeggibili.

7. **Troppi componenti feature per l'MVP.**
   L'inventario elenca 25+ feature component. Il design system §10.2 dice "start small", ma un coding agent che riceve questa lista potrebbe implementarli tutti in batch. Diverse sezioni del Purchase Detail (`PurchaseReturnSection`, `PurchaseRefundSection`, `PurchaseWarrantySection`) possono partire come un unico `PurchaseLifecycleSection` con parametro `domain`.

8. **Manca una specifica per il focus trapping nei form.**
   L'accessibilità dei form è coperta (label, errori, aria), ma non c'è menzione del focus management dopo submit fallito. Se il server restituisce errori di validazione, il focus dovrebbe spostarsi al primo campo in errore.

9. **Il mapper delle action reason non è specificato.**
   `ActionReason` è un componente elencato ma la logica di generazione della stringa human-readable (da `urgency` + `domain` + `deadline` a "Reso entro 3 giorni") non è documentata da nessuna parte. Il design system dice che l'urgency è server-side, ma la mappatura a stringa italiana è un buco.

---

## 3. Problemi da correggere prima dell'implementazione

> **Stato: RISOLTI (2026-07-12).** Tutti i problemi P1–P7 sono stati applicati ai documenti `screen-specs.md`, `design-system.md` e `ux-states.md`. Le sezioni seguenti restano come traccia delle decisioni prese.

### P1 — Consolidare `UrgentActionCard` e `ActionNeededCard` in un unico componente ✅

**Risolto.** `ActionCard` è ora in `features/shared/components/ActionCard.tsx` con prop `variant: 'compact' | 'extended'`. Rimosso `UrgencyBadge` (consolidato in `DeadlineBadge`). Aggiornati: screen-specs §1.5, §6.5, §7.5, inventory; design-system §3.2, §4.14, §6.1.

### P2 — Aggiungere almeno una quick action alle urgent action card ✅

**Risolto.** `ActionCardProps.quickAction` aggiunto con mappatura `urgency × domain → label`. Quick action opera con optimistic UI, fade+slide 300ms, toast di conferma. Aggiornati: screen-specs §1.3.B, §1.6, §6.3, ASCII art; design-system §4.14; ux-states §7bis.

### P3 — Ridurre i counter del Summary Strip da 5 a 3 per MVP ✅

**Risolto.** Summary strip mostra 3 contatori: acquisti attivi, azioni urgenti, rimborsi in attesa. Garanzie e ricevute sono coperte dalle card. Aggiornati: screen-specs §1.3.A, §1.4, §1.7, §1.8, §1.9, §7.3.A, §7.4; design-system §3.2, §4.12.

### P4 — Fissare la decisione sulla search bar sticky mobile ✅

**Risolto.** Search bar mobile: **non sticky**. Scorre con il contenuto. Icona 🔍 nell'header per accesso rapido. Aggiornati: screen-specs §8.4, §8.9, §8.11; design-system §5.

### P5 — Specificare la logica di generazione delle action reason ✅

**Risolto.** Tabella di mappatura `urgency × domain × condition → reason text` aggiunta in design-system §10.5bis. Deadline label formattate nello stesso mapper. Aggiornato: design-system.

### P6 — Aggiungere un feedback di completamento dopo la risoluzione ✅

**Risolto.** Sezione `§7bis Post-Resolution Feedback` aggiunta a ux-states.md: toast message per dominio, animazione fade+slide, quick action label mapping. Aggiornati: ux-states §7bis; screen-specs §1.7, §6.7, Cross-Screen Rules.

### P7 — Specificare layout a 320px ✅

**Risolto.** Verificato layout a 320px, 390px, 428px. A 320px: summary strip 3 counter su 1 riga (20px numeri, 11px label, gap 16px). Touch target ≥ 44px preservati. Aggiornati: screen-specs §7.3, §7.9, §7.11; cross-screen acceptance criteria.

---

## 4. Checklist Impeccable

### Visione & Posizionamento
- [x] Il prodotto ha una personalità visiva definita e non generica
- [x] La distinzione "Consumer Utility vs SaaS Dashboard" è chiara e applicata
- [ ] Il nome "Utilitarian Premium" è tradotto in scelte visive verificabili (P3 aiuta)
- [x] Il tone of voice è documentato e coerente attraverso tutti gli stati

### UX & Flussi
- [x] Il "Time to Action" è misurabile (≤ 3 secondi per identificare l'urgenza)
- [ ] Il percorso "identifico urgenza → risolvo" è il più breve possibile (P2)
- [x] Il pattern "What → How" (dashboard → detail) è applicato consistentemente
- [ ] Esiste un feedback positivo dopo il completamento di un'azione (P6)
- [x] I form hanno validazione inline, preservazione dati, prevenzione double-submit

### Stati
- [x] Loading: skeleton che rispecchiano il layout (no layout shift)
- [x] Empty: tono positivo, non "mancanza"
- [x] Error: human-readable, rassicurante, con retry o via d'uscita
- [x] Edge case: partial data, missing records, single item, many items
- [ ] Stato "post-risoluzione" con feedback visivo (P6)

### Mobile
- [x] Layout mobile progettato, non derivato dal desktop
- [x] Touch target ≥ 44px
- [x] Tabella → card stack pattern
- [x] FAB positioning con padding-bottom
- [ ] Comportamento search bar mobile deciso (P4)
- [ ] Layout verificato a 320px (P7)

### Design System
- [x] Design tokens definiti (tipografia, colori, spacing, radius, shadow)
- [x] Signal color usati solo per urgenza (non decorativi)
- [x] Specifiche componenti con Props, varianti, stati, accessibilità
- [ ] Componenti duplicati consolidati (P1)
- [x] Anti-patterns documentati con esempi
- [x] Convenzioni di naming definite

### Microcopy
- [x] Ogni empty state ha titolo, descrizione e CTA (se applicabile)
- [x] Ogni error state ha messaggio human-readable e azione di recupero
- [x] Messaggi di validazione specifici e inline
- [x] CTA con verbi d'azione
- [x] Action reason human-readable

### Implementabilità
- [x] Ordine di implementazione definito
- [x] Strategia "start small" per componenti
- [x] View model / mapper pattern documentato
- [x] Tailwind color config specificato
- [x] Regole Server Component vs Client Component chiare
- [ ] Logica di generazione action reason documentata (P5)

### Accessibilità
- [x] Label su ogni input
- [x] Errori associati ai campi via `aria-describedby`
- [x] Focus visible ring definito
- [x] Colore + testo (mai solo colore)
- [x] Heading hierarchy (h1 → h2 → h3)
- [ ] Focus management dopo submit fallito (spostare focus al primo errore)

---

## 5. Criteri di accettazione per il coding agent

### Prima di iniziare qualsiasi componente
- [ ] I 7 problemi P1–P7 sono risolti nei documenti di design OPPURE sono registrati come debito tecnico con priorità
- [ ] `ActionCard` condiviso esiste in `features/shared/components/ActionCard.tsx` (non due componenti separati)
- [ ] Il Summary Strip ha 3 counter, non 5
- [ ] La search bar mobile NON è sticky

### Shared UI (`shared/ui/`)
- [ ] `Button`: implementate solo le varianti `primary` e `secondary`; `ghost` e `danger` quando servono
- [ ] `Card`: implementata solo `default`; `elevated` e `urgent` quando arriva il dashboard
- [ ] `Badge`: implementato solo `neutral`; `count` quando serve il summary strip
- [ ] `DeadlineBadge`: implementate solo `overdue` e `due_soon`; le altre quando servono
- [ ] `StatusBadge`: implementati solo i domini `return` e `refund`; `warranty` quando serve
- [ ] `Input`, `Select`, `Textarea`: implementati base con label, error, disabled
- [ ] `EmptyState`: implementato con varianti `calm`, `empty`, `search`
- [ ] `ErrorState`: implementato con `onRetry` e `action` alternativo
- [ ] `LoadingState`: pattern skeleton per ogni schermata (non un componente generico)
- [ ] Ogni componente shared ha export nominato (`export function Button`), NON default
- [ ] Ogni componente shared è in un file singolo (`Button.tsx`, non `Button/index.tsx`)
- [ ] Nessun componente shared usa `cn()` wrapper custom; solo `clsx` per classi condizionali

### Feature Components
- [ ] `ActionCard` (condiviso): usato sia da Dashboard che da Actions Needed con prop `variant`
- [ ] `ActionCard` include quick action opzionale (P2)
- [ ] `DashboardSummary`: 3 counter renderizzati dinamicamente, colore solo se valore > 0
- [ ] `UrgentActionsList`: ordine fisso overdue → due_soon → upcoming
- [ ] `PurchaseList`: tabella HTML semantica su desktop, card stack su mobile
- [ ] `PurchaseFilters`: chip attivi rimovibili, "Cancella filtri" condizionale
- [ ] Purchase Detail: sezioni di lifecycle partono come UN componente `PurchaseLifecycleSection` con prop `domain`, non 3 componenti separati
- [ ] `PurchaseTimeline`: eventi renderizzati da data server-side; eventi entro 7 giorni in formato relativo
- [ ] `PurchaseForm`: React Hook Form + Zod, validazione inline, valori preservati dopo errore

### Mapper
- [ ] Ogni feature ha il suo mapper (es. `dashboard-view.mapper.ts`)
- [ ] I mapper convertono centesimi → euro, date ISO → formato display, urgency → label italiana
- [ ] `action-needed-view.mapper.ts` include la logica di generazione action reason (P5)
- [ ] Nessun Prisma model passato direttamente a Client Component

### Route Pages
- [ ] Le route page sono Server Components (tranne form)
- [ ] `loading.tsx` per ogni rotta con skeleton matching
- [ ] `error.tsx` per ogni rotta (o error boundary)
- [ ] `not-found.tsx` per `/purchases/[purchaseId]`
- [ ] Search params dei filtri validati con schema Zod prima della query

### Dashboard
- [ ] L'azione più urgente è above the fold su mobile (390px)
- [ ] Lo stato "nessuna azione urgente" mostra il messaggio calm previsto
- [ ] Lo stato "nessun acquisto" mostra empty + CTA
- [ ] Il summary strip mostra conteggi reali, non placeholder
- [ ] Il loading state non causa layout shift (skeleton matching)

### Form
- [ ] Pulsante submit disabled durante salvataggio
- [ ] Double-submit prevention
- [ ] Valori preservati dopo errore server
- [ ] Errori inline sotto il campo specifico
- [ ] Preview deadline etichettate come "stimate"
- [ ] Toggle ricevuta mostra/nasconde campo link
- [ ] Dopo creazione: redirect a `/purchases/:id`
- [ ] InputMode numerico su mobile per prezzo, giorni, mesi

### Timeline
- [ ] Eventi generati solo da Server Action (mai lato client)
- [ ] Ordine: dal più recente al più vecchio
- [ ] Date relative per eventi ≤ 7 giorni, assolute oltre
- [ ] Stato vuoto: messaggio previsto (non errore)

### Responsive
- [ ] Mobile: card stack per tutte le ex-tabelle
- [ ] Desktop: max-width container 1024px centrato
- [ ] Nessun overflow orizzontale su mobile
- [ ] FAB: padding-bottom sufficiente per non coprire ultimo elemento
- [ ] Touch target ≥ 44px verificabili su ogni elemento interattivo

### Accessibilità
- [ ] Ogni input ha `<label>` associato
- [ ] Focus visible ring su ogni elemento interattivo
- [ ] Colore + testo per ogni indicatore di stato
- [ ] Heading hierarchy: un solo h1 per pagina, h2 per sezioni
- [ ] `aria-busy` durante loading
- [ ] `aria-label` su DeadlineBadge e pulsanti icon-only
- [ ] Liste semantiche (`<ol>` per timeline, `<table>` per dati tabulari)

---

## 6. Note da includere negli ADR

### ADR-008: ActionCard unificato
**Decisione:** `UrgentActionCard` e `ActionNeededCard` sono un unico componente `ActionCard` con prop `variant: 'compact' | 'extended'`. Posizionato in `features/shared/components/` per uso cross-feature.

**Razionale:** Struttura, dati e comportamento identici. Due componenti violano DRY e complicano la manutenzione.

### ADR-009: Quick action inline sulle card urgenti
**Decisione:** Ogni `ActionCard` espone una quick action contestuale (es. "Segna come restituito") che chiama la Server Action corrispondente con optimistic UI.

**Razionale:** "Time to Action" ≤ 3 secondi per identificare l'urgenza è vanificato da un percorso di risoluzione a 3 tap. La quick action riduce il caso comune a 1 tap.

### ADR-010: Summary Strip ridotto a 3 counter
**Decisione:** Il dashboard mostra 3 counter (acquisti attivi, azioni urgenti, rimborsi in attesa) invece di 5. Garanzie e ricevute sono coperte dalle urgent action card.

**Razionale:** 5 counter sono eccessivi per mobile e rischiano il look "KPI dashboard" che il design brief esplicitamente vieta. Se il dato è già in una card, non serve anche nel counter.

### ADR-011: Search bar mobile non sticky
**Decisione:** Su mobile, la search bar della Purchase List scrolla con il contenuto. L'accesso alla search è disponibile via icona nell'header.

**Razionale:** Lo spazio verticale su mobile è critico. Una search bar sticky + filtri consumano fino a 120px prima che l'utente veda i risultati. Pattern mobile standard: tap icona → espandi search.

### ADR-012: Generazione action reason nel mapper
**Decisione:** Le stringhe human-readable delle action reason (es. "Reso entro 3 giorni") sono generate nel mapper `action-needed-view.mapper.ts` a partire da `urgency`, `domain`, e `deadline` ricevuti dal server. Il server fornisce i dati grezzi; il mapper li trasforma in UI-ready string.

**Razionale:** La logica di presentazione (formattazione data, lingua, tono) appartiene al layer UI. La logica di business (classificazione urgenza) appartiene al server. Il mapper è il ponte.

### ADR-013: Sezioni lifecycle come componente parametrico
**Decisione:** `PurchaseReturnSection`, `PurchaseRefundSection`, `PurchaseWarrantySection` partono come un unico `PurchaseLifecycleSection` con prop `domain: 'return' | 'refund' | 'warranty'`. Verranno separati solo se le differenze di comportamento lo giustificano.

**Razionale:** Le tre sezioni condividono struttura (status badge + dropdown + info). Tre componenti separati per l'MVP sono over-engineering. Il design system §7.3 (Premature Abstraction) dice "Duplica una volta, astrai alla terza occorrenza" — ma qui partiamo con l'astrazione perché il pattern è già visibile prima di scrivere codice.

---

## 7. Decisioni design da documentare

1. **La palette "Signal" è riservata esclusivamente all'urgenza.** Non esiste un "rosso pulsante" o un "verde conferma" al di fuori del contesto semantico `overdue`/`safe`. Per azioni distruttive future (es. eliminare acquisto), si userà una variante `danger` del `Button` con il signal-red, ma solo perché l'azione è semanticamente legata a una perdita di dati.

2. **Le preview delle deadline nei form sono etichettate "stimate".** Il server ricalcola tutto al submit. Questo è un vincolo architetturale, non una scelta estetica: impedisce disallineamenti tra preview client e valore persistito.

3. **Nessuna data/ora assoluta per eventi recenti.** La timeline usa formato relativo ("3 giorni fa") per eventi entro 7 giorni. Questo è più utile del formato assoluto per l'uso "consultivo" del prodotto.

4. **Empty state senza CTA = stato valido.** "Nessuna azione urgente" non ha un CTA perché non c'è niente da fare. Forzare un link "Vai agli acquisti" sarebbe rumore. Lo stato è autosufficiente.

5. **Il FAB "Aggiungi acquisto" è sempre visibile su mobile.** La creazione è l'azione primaria quando la lista è vuota E quando è piena. Nascondere il FAB allo scroll (pattern comune) ridurrebbe la discoverability.

6. **I filtri sono persistenti via URL search params.** Questo permette: link condivisibili, back-navigation che preserva i filtri, e stato dei filtri che sopravvive al refresh. Non è un nice-to-have, è un should-have per MVP.

7. **Nessuna paginazione nell'MVP.** Carica tutto in una volta. Se la lista supera ~200 acquisti, la paginazione si aggiunge dopo. Il design system lo chiama "premature optimization".

8. **Le card navigabili wrappano l'intera card in un `<Link>`.** Non un link "Dettaglio →" dentro la card. L'intera card è il touch target. L'eccezione è quando la card ha una quick action: l'area della quick action ha il suo handler, il resto della card naviga.

---

## Riepilogo azioni prioritarie

| # | Azione | Stato |
|---|--------|-------|
| P1 | Consolidare ActionCard | ✅ Risolto |
| P2 | Aggiungere quick action | ✅ Risolto |
| P3 | Ridurre Summary Strip a 3 counter | ✅ Risolto |
| P4 | Fissare comportamento search bar mobile | ✅ Risolto |
| P5 | Specificare logica action reason | ✅ Risolto |
| P6 | Aggiungere feedback post-risoluzione | ✅ Risolto |
| P7 | Specificare layout a 320px | ✅ Risolto |
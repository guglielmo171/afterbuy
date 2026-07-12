# AfterBuy — Screen Specifications

**Status:** Draft 1.0  
**Method:** Impeccable (UX Architecture + Product Design)  
**Sources of truth:**  
- `docs/design/design-brief.md`  
- `docs/product/mvp-scope_UPDATED.md`  
- `docs/product/user-journey_UPDATED.md`  
- `docs/architecture/frontend.md`  
- `docs/architecture/data-model.md`  
- `docs/architecture/api-design.md`  

---

## Product Anchors (extracted from sources)

Before defining individual screens, these anchors are non-negotiable across all screens:

1. **Time to Action is the UX metric.** The user must identify an urgent deadline and initiate resolution within 3 seconds of opening the app (design-brief §3).
2. **Priority of Action governs hierarchy.** The most urgent financial risk always occupies the highest visual position (design-brief §9.1).
3. **Contextual Disclosure (What → How).** Show *what* (Product + Urgency) on the dashboard; show *how* (Manuals, Support links, Order #) only in detail (design-brief §9.2).
4. **Mobile-First Resolution.** Design for the user holding the physical product in one hand and the phone in the other (design-brief §9.4).
5. **Status as Progress.** `Return Planned → Returned → Refunded` must feel like a win, not a label change (design-brief §9.3).
6. **Urgency is derived server-side** via `getUrgentActions()` and `classifyDeadlineUrgency()` — components render, they do not decide (data-model §7.8, frontend §6).
7. **"Utilitarian Premium" aesthetic.** Neutral base, high-contrast signal colors only for urgency, balanced density (design-brief §5).
8. **Rewarding Emptiness.** Empty states are "resolved," not "missing" (design-brief §9.5).

---

## Shared Design Tokens

### Typography Scale
| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-2xl` | 1.5rem | 600 | Page titles, product names in detail |
| `text-xl` | 1.25rem | 600 | Section headers, card product names |
| `text-lg` | 1.125rem | 500 | Summary numbers, panel titles |
| `text-base` | 1rem | 400 | Body, form labels, list items |
| `text-sm` | 0.875rem | 400 | Secondary info, store names, dates |
| `text-xs` | 0.75rem | 500 | Badges, deadlines, meta labels |

### Signal Colors (used exclusively for urgency)
| Token | Hex | Meaning |
|-------|-----|---------|
| `--signal-red` | `#DC2626` | `overdue` — return window expired, refund issue |
| `--signal-amber` | `#D97706` | `due_soon` — deadline within 7 days, warranty expiring |
| `--signal-blue` | `#2563EB` | `upcoming` — deadline within 30 days |
| `--signal-green` | `#16A34A` | `safe` — resolved, refund received, warranty active |
| `--signal-gray` | `#6B7280` | `unknown` — missing deadline or duration |

### Neutral Palette
| Token | Hex | Role |
|-------|-----|------|
| `--neutral-50` | `#FAFAFA` | Page background |
| `--neutral-100` | `#F5F5F5` | Card surface, hover |
| `--neutral-200` | `#E5E5E5` | Borders, separators |
| `--neutral-700` | `#404040` | Body text |
| `--neutral-900` | `#171717` | Headings, primary text |

### Spacing System
`4px` base unit. Key stops: `8`, `12`, `16`, `20`, `24`, `32`, `48`.

### Radius
- Cards: `8px`
- Buttons: `6px`
- Badges: `4px`
- Inputs: `6px`

---

---

## 1. Dashboard Page

**Route:** `/`  
**Data sources:** `getDashboardSummary()`, `getUrgentActions()`  
**Frontend feature:** `features/dashboard/`

### 1.1 Obiettivo della schermata

Fornire all'utente una risposta immediata alla domanda "Cosa devo fare oggi o questa settimana per non perdere soldi?" entro 3 secondi dall'apertura. Il dashboard non è un archivio, è un centro di comando orientato all'azione.

### 1.2 Domanda utente a cui risponde

> *"Quali acquisti richiedono la mia attenzione in questo momento?"*

E secondariamente:
> *"Qual è lo stato generale dei miei acquisti?"*

### 1.3 Contenuto principale

**A. Summary Strip (orizzontale, compact)**
Tre contatori che guidano azioni immediate:
- Acquisti attivi (totale)
- Azioni urgenti (conteggio `overdue` + `due_soon`)
- Rimborsi in attesa

Ogni item è un numero + label. I numeri con valore > 0 usano il signal color corrispondente; a 0 restano neutral.

Garanzie in scadenza e ricevute mancanti sono già coperte dalle urgent action card. Aggiungere altri counter solo se misurati necessari.

**B. Urgent Actions Section (priorità visiva massima)**
Card per ogni azione urgente, ordinate per gravità: `overdue` → `due_soon` → `upcoming`.

Ogni card mostra:
- Prodotto (productName)
- Store (storeName)
- Motivazione dell'azione (action reason human-readable)
- Urgency badge (se `overdue` o `due_soon`, segnale visivo forte)
- Deadline o durata del pending
- Quick action inline (es. "Segna come restituito" per resi overdue/due_soon, "Segna rimborso ricevuto" per rimborsi pending)
- Link diretto alla pagina detail (`/purchases/:id`)

La quick action opera con optimistic UI: al successo, la card scompare con fade+slide (300ms) e il summary strip si aggiorna. L'intera card rimane cliccabile per navigare al dettaglio; l'area della quick action ha il suo handler separato.

Massimo 5-6 card visibili senza scroll; se eccedono, mostrare le prime N con un link "Vedi tutte le azioni" verso `/actions-needed`.

**C. Recent Purchases (priorità visiva minore)**
Lista compatta degli ultimi 3-5 acquisti aggiunti, con:
- Prodotto, store, data acquisto
- Status badge composito (return/refund/warranty più critico)

### 1.4 Gerarchia visiva

```
┌─────────────────────────────────────────────┐
│  H1: Dashboard                              │ ← page title, peso minimo
├─────────────────────────────────────────────┤
│  [Summary Strip]                             │ ← compact, orizzontale
│  12 acquisti     3 azioni     1 rimborso     │
├─────────────────────────────────────────────┤
│  H2: Azioni urgenti                          │ ← massima priorità visiva
│  ┌─────────────────────────────────────────┐ │
│  │ 🔴 OVERDUE  Reso scaduto — Scarpe Nike  │ │ ← signal-red, top
│  │    Reso entro 12 luglio · Zalando       │ │
│  │                        [Segna restituito]│ │ ← quick action
│  └─────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────┐ │
│  │ 🟡 DUE SOON  Reso entro 3 giorni        │ │ ← signal-amber
│  │    Giacca invernale · Amazon            │ │
│  │                        [Segna restituito]│ │ ← quick action
│  └─────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────┐ │
│  │ 🟡 DUE SOON  Garanzia in scadenza       │ │ ← signal-amber
│  │    MacBook Pro · MediaWorld             │ │
│  └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  H2: Acquisti recenti                        │ ← peso minore
│  [card] [card] [card]                        │
├─────────────────────────────────────────────┤
│  [Footer nav / CTA: + Nuovo acquisto]        │
└─────────────────────────────────────────────┘
```

### 1.5 Componenti necessari

| Componente | Feature | Note |
|------------|---------|------|
| `DashboardSummary` | `features/dashboard/` | Summary strip orizzontale |
| `UrgentActionsList` | `features/dashboard/` | Lista action card |
| `ActionCard` | `features/shared/components/` | Card azione, variant `compact` |
| `RecentPurchases` | `features/dashboard/` | Lista ultimi acquisti |
| `DashboardEmptyState` | `features/dashboard/` | Stato vuoto |
| `DeadlineBadge` | `shared/ui/` | Badge urgenza + data deadline |
| `StatusBadge` | `shared/ui/` | Status return/refund/warranty |
| `Card` | `shared/ui/` | Contenitore card |
| `EmptyState` | `shared/ui/` | Stato vuoto generico |
| `LoadingState` | `shared/ui/` | Skeleton |
| `ErrorState` | `shared/ui/` | Errore con retry |

Mappers: `dashboard-view.mapper.ts` per convertire `DashboardSummary` e `UrgentAction[]` in view model.

### 1.6 Azioni principali

1. **Tap su Urgent Action Card** → naviga a `/purchases/:id` (detail)
2. **Tap su quick action** (es. "Segna come restituito") → optimistic update, card scompare con animazione, summary strip aggiornato
3. **Tap su "Vedi tutte le azioni"** → naviga a `/actions-needed`
4. **Tap su acquisto recente** → naviga a `/purchases/:id`
5. **CTA "Nuovo acquisto"** → naviga a `/purchases/new`
6. **Retry** (in caso di errore) → ricarica i dati

### 1.7 Stati da prevedere

| Stato | Comportamento |
|-------|--------------|
| **Loading** | Skeleton: 1 strip di 3 contatori + 3 card fantasma + 3 card piccole. `loading.tsx` a livello route. |
| **Empty (no purchases)** | `EmptyState`: "Nessun acquisto ancora. Aggiungi il tuo primo acquisto per tracciare resi, rimborsi e garanzie." CTA primario: "Aggiungi acquisto". |
| **Empty (no urgent actions)** | Nascondi sezione Urgent Actions. Mostra messaggio calm: "Nessuna azione urgente. I tuoi acquisti sono sotto controllo." Icona check. |
| **Error** | `ErrorState`: "Non riusciamo a caricare il dashboard. Riprova tra un momento." Bottone Riprova. |
| **Partial data** | Se una query fallisce e l'altra no, mostra i dati disponibili + indicatore d'errore localizzato nella sezione mancante. |
| **Single urgent action** | Mostra la card normalmente, senza link "Vedi tutte". |
| **Many urgent actions (>6)** | Mostra prime 5 + link "Vedi tutte le azioni (N)" verso `/actions-needed`. |
| **Quick action success** | La card scompare con fade+slide (300ms). Messaggio toast: "Reso registrato. Passaggio successivo: monitora il rimborso." Summary strip aggiornato. |
| **Quick action error** | Messaggio inline sulla card: "Azione non riuscita. Riprova." La card rimane visibile. |

### 1.8 Versione desktop

- Summary strip: flex row, 3 contatori con `gap: 32px`
- Urgent Actions: grid 2 colonne per card, max 3 righe
- Recent Purchases: grid 3 colonne
- Layout complessivo: max-width container (`1024px`), centrato
- La sezione Urgent Actions occupa ~50-60% dell'attenzione visiva

### 1.9 Versione mobile

- Summary strip: flex row, 3 contatori su una riga. A 320px: numeri 20px, label 11px, gap 16px. Verificato leggibile.
- Urgent Actions: stack verticale, card a larghezza piena
- Recent Purchases: stack verticale, card a larghezza piena
- La action card più urgente deve essere visibile above the fold senza scroll

### 1.10 Cosa evitare

- **Dashboard Fatigue.** Non aggiungere widget decorativi, grafici, "ultimo accesso", metriche di vanità.
- **Alarmism.** Il rosso segnala urgenza, non pericolo. No animazioni lampeggianti, no icone di allarme esagerate.
- **Bento-box gratuito.** Le card devono avere un motivo funzionale per esistere.
- **Numeri senza contesto.** "3 azioni" senza specificare quali è inutile.
- **Empty state che sembra un bug.** "No data" non è un empty state accettabile.
- **Card troppo dense.** Una action card deve mostrare 4-5 informazioni, non 12.

### 1.11 Criteri di accettazione

- [ ] Entro 3 secondi dall'apertura, l'utente vede l'azione più urgente (se presente)
- [ ] Le action card sono ordinate per gravità: overdue → due_soon → upcoming
- [ ] Il summary strip mostra 3 contatori reali (acquisti, azioni urgenti, rimborsi in attesa)
- [ ] La quick action sulle card funziona con optimistic UI e aggiorna lo summary strip
- [ ] Dopo quick action success, la card scompare con animazione
- [ ] Ogni action card è cliccabile e porta al dettaglio corretto
- [ ] Lo stato "nessuna azione urgente" mostra il messaggio calm previsto
- [ ] Lo stato "nessun acquisto" mostra il CTA di creazione
- [ ] Il loading state non causa layout shift (skeleton matching)
- [ ] L'error state offre un retry funzionante
- [ ] Su mobile, l'azione più urgente è above the fold
- [ ] Su desktop, il layout è centrato e non eccede 1024px
- [ ] I colori di urgenza sono usati solo dove semanticamente corretto

---

## 2. Purchase List

**Route:** `/purchases`  
**Data sources:** `getPurchaseList(filters)`, `getStores()`, `getCategories()`  
**Frontend feature:** `features/purchases/`

### 2.1 Obiettivo della schermata

Permettere all'utente di esplorare, filtrare e trovare qualsiasi acquisto nel sistema. È la vista "archivio" consultabile, complementare al dashboard che è la vista "azione".

### 2.2 Domanda utente a cui risponde

> *"Dov'è finito l'acquisto X e in che stato si trova?"*

E secondariamente:
> *"Quali acquisti ho fatto presso il negozio Y / nella categoria Z?"*

### 2.3 Contenuto principale

**A. Filtri (orizzontali, persistenti)**
- Search (testo libero: prodotto o store)
- Status (dropdown: Tutti, Reso pianificato, Reso effettuato, Rimborso in attesa, Rimborsato, Garanzia attiva, Garanzia scaduta, Azione necessaria)
- Store (dropdown, popolato da `getStores()`)
- Categoria (dropdown, popolato da `getCategories()`)
- Urgency (dropdown: Tutte, Overdue, In scadenza, In arrivo, Sicure)

I filtri attivi sono visibili come chip/badge sotto la barra. Pulsante "Cancella filtri" quando almeno un filtro non-default è attivo.

**B. Lista acquisti**
Desktop: tabella con colonne ordinate.
Mobile: card stack.

### 2.4 Gerarchia visiva

```
┌─────────────────────────────────────────────┐
│  H1: Acquisti                     [+ Nuovo] │
├─────────────────────────────────────────────┤
│  [🔍 Cerca...] [Status ▾] [Negozio ▾] [...] │ ← barra filtri
│  [chip: Zalando ×] [chip: Reso ×] [Cancella]│ ← filtri attivi
├─────────────────────────────────────────────┤
│  Desktop: tabella                            │
│  Prodotto ↑  Negozio  Data     Prezzo  Stato │
│  ─────────────────────────────────────────  │
│  Nike Air    Zalando  05/07   129.99  🔴     │
│  MacBook     MediaW.  15/06  2499.00  🟢     │
│  ...                                         │
│                                              │
│  Mobile: card stack                          │
│  ┌─────────────────────────────────────┐     │
│  │ Nike Air Max              🔴 OVERDUE│     │
│  │ Zalando · 05 luglio · 129,99 €      │     │
│  │ Reso: scaduto  |  Garanzia: attiva  │     │
│  └─────────────────────────────────────┘     │
├─────────────────────────────────────────────┤
│  Empty state (se nessun risultato)           │
└─────────────────────────────────────────────┘
```

### 2.5 Componenti necessari

| Componente | Feature | Note |
|------------|---------|------|
| `PurchaseList` | `features/purchases/` | Container principale |
| `PurchaseListItem` | `features/purchases/` | Riga tabella (desktop) |
| `PurchaseListCard` | `features/purchases/` | Card (mobile) |
| `PurchaseFilters` | `features/purchases/` | Barra filtri + chip |
| `PurchaseListEmptyState` | `features/purchases/` | Nessun risultato |
| `StatusBadge` | `shared/ui/` | Status return/refund/warranty |
| `DeadlineBadge` | `shared/ui/` | Indicatore urgenza |
| `Input` | `shared/ui/` | Campo search |
| `Select` | `shared/ui/` | Dropdown filtri |
| `Button` | `shared/ui/` | CTA Nuovo acquisto, Cancella filtri |
| `EmptyState` | `shared/ui/` | Nessun acquisto |
| `ErrorState` | `shared/ui/` | Errore caricamento |
| `LoadingState` | `shared/ui/` | Skeleton |

Mappers: `purchase-list-view.mapper.ts` per convertire `PurchaseListItem[]` in view model con prezzi formattati, date relative, badge variant.

### 2.6 Azioni principali

1. **Tap su riga/card acquisto** → naviga a `/purchases/:id`
2. **Tap "Nuovo acquisto"** → naviga a `/purchases/new`
3. **Interazione con filtri** → aggiorna risultati (URL search params per stato filtri)
4. **Tap "Cancella filtri"** → reset a default, ricarica lista completa
5. **Retry** (in caso di errore) → ricarica

### 2.7 Stati da prevedere

| Stato | Comportamento |
|-------|--------------|
| **Loading** | Skeleton: 5-8 righe tabella (desktop) / 3-4 card (mobile). `loading.tsx` a livello route. |
| **Empty (no purchases)** | `EmptyState`: "Nessun acquisto ancora. Aggiungi il tuo primo acquisto per tracciare resi, rimborsi e garanzie." |
| **Empty (filtri senza risultati)** | `EmptyState`: "Nessun acquisto corrisponde a questi filtri. Prova a cambiare stato, negozio o urgenza." CTA: "Cancella filtri". |
| **Error** | `ErrorState`: "Non riusciamo a caricare i tuoi acquisti." Retry. |
| **Filtri invalidi (URL corrotti)** | Fallback silenzioso ai default filter. Messaggio calm: "Alcuni filtri non erano validi e sono stati reimpostati." |

### 2.8 Versione desktop

- Layout tabellare con colonne: Prodotto, Negozio, Categoria, Data acquisto, Prezzo, Stato Reso, Stato Rimborso, Garanzia, Urgenza
- Colonne ordinabili (should-have: per data e prezzo)
- Barra filtri orizzontale sopra la tabella
- Larghezza tabella: 100% del container (max 1024px centrato)
- Hover row highlight

### 2.9 Versione mobile

- Card stack verticale, una per acquisto
- Ogni card mostra: prodotto + urgency badge in alto, store + data + prezzo al centro, status badges in basso
- Barra filtri collassabile (toggle "Filtri") per risparmiare spazio verticale
- Search field sempre visibile in alto
- Filtri attivi mostrati come chip scrollabili orizzontalmente

### 2.10 Cosa evitare

- **Paginated infinite scroll prematuro.** Carica tutto in una volta; se la lista è lunga, va bene. Paginazione solo se misurata necessaria.
- **Tabella desktop con troppe colonne.** Priorità: Prodotto, Negozio, Data, Stato. Le altre su hover/secondary.
- **Filtri che resettano lo scroll.** Mantieni la posizione nella lista quando possibile.
- **Card mobile con informazioni ridondanti.** Non ripetere lo stesso dato in 3 formati diversi.
- **Stato "nessun filtro attivo" visivamente uguale a "filtri attivi".** I chip devono essere ovvi.

### 2.11 Criteri di accettazione

- [ ] La lista mostra tutti gli acquisti quando nessun filtro è attivo
- [ ] I filtri funzionano in combinazione (AND logico)
- [ ] I filtri attivi sono visibili come chip rimovibili singolarmente
- [ ] "Cancella filtri" appare solo quando almeno un filtro non-default è attivo
- [ ] La search funziona per prodotto e store (case-insensitive)
- [ ] Lo stato vuoto distingue "nessun acquisto" da "nessun risultato filtri"
- [ ] Ogni acquisto nella lista è cliccabile verso il dettaglio
- [ ] Su mobile, la card mostra le informazioni essenziali senza scroll orizzontale
- [ ] Su desktop, la tabella ha colonne leggibili senza troncamenti aggressivi
- [ ] Lo stato loading usa skeleton che matchano il layout finale
- [ ] L'error state offre retry funzionante

---

## 3. Purchase Detail

**Route:** `/purchases/:purchaseId`  
**Data sources:** `getPurchaseDetail(purchaseId)`  
**Frontend feature:** `features/purchase-detail/`

### 3.1 Obiettivo della schermata

Rendere leggibile l'intero ciclo di vita di un acquisto, mostrando non solo i dati grezzi ma la *storia* dell'acquisto: cosa è successo, cosa sta succedendo, cosa potrebbe servire fare. È la vista "How" del pattern What → How.

### 3.2 Domanda utente a cui risponde

> *"A che punto è questo acquisto? Cosa è già successo e cosa devo ancora fare?"*

E secondariamente:
> *"Dove trovo la ricevuta / il manuale / il link all'assistenza?"*

### 3.3 Contenuto principale

**A. Purchase Header**
- Nome prodotto (H1)
- Store name + link al sito (se disponibile)
- Categoria (badge neutro)
- Prezzo formattato (es. "129,99 €")
- Data acquisto
- Numero ordine (se presente)
- Pulsante "Modifica" → `/purchases/:id/edit`

**B. Deadline Panel (priorità visiva alta)**
Due card affiancate (desktop) o stacked (mobile):
- **Reso:** Status badge + scadenza + giorni rimanenti + urgency
- **Garanzia:** Status badge + scadenza + mesi rimanenti + urgency

Se urgency = `overdue` o `due_soon`, la card corrispondente usa il signal color.

**C. Lifecycle Status Panel**
Tre sezioni per i tre tracker:
- **Reso:** Stato attuale (`not_planned` → `return_planned` → `returned` → `closed`). Controllo per aggiornare lo stato (Client Component).
- **Rimborso:** Stato attuale (`not_expected` → `pending` → `received`). Se `pending`, mostrare da quanti giorni.
- **Garanzia:** Stato attuale + scadenza + support link se disponibile.

**D. Documents Panel**
Lista documenti associati:
- Ricevuta (disponibile / mancante)
- Fattura
- Manuale (link)
- Link assistenza
- Altro

Ogni item mostra tipo, label, stato disponibilità. Se `receipt` mancante = azione urgente potenziale.

**E. Notes**
Blocco testo note libere.

**F. Timeline**
Vedi schermata dedicata (§5). Qui: vista compatta degli ultimi N eventi, con link "Vedi timeline completa" se ci sono più eventi di quelli mostrati.

### 3.4 Gerarchia visiva

```
┌─────────────────────────────────────────────┐
│  ← Acquisti                                  │
│  H1: MacBook Pro 16"              [Modifica] │
│  MediaWorld · Elettronica · 2.499,00 €       │
│  Acquistato il 15 giugno 2026 · Ord. #AB123 │
├─────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────┐  │
│  │ 🟢 Reso      │  │ 🟡 Garanzia          │  │
│  │ Nessun reso  │  │ In scadenza          │  │
│  │ pianificato  │  │ Scade il 15/06/2028  │  │
│  │ 18 gg rim.   │  │ 23 mesi rimanenti    │  │
│  └──────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────┤
│  Stato reso: [Non pianificato ▾]             │
│  Stato rimborso: [Non previsto ▾]           │
│  Garanzia: [In scadenza ▾]                  │
├─────────────────────────────────────────────┤
│  Documenti                                   │
│  📄 Ricevuta — Disponibile                   │
│  📘 Manuale — apple.com/support/macbook      │
│  🔗 Assistenza — mediam World.it/assistenza   │
├─────────────────────────────────────────────┤
│  Note                                        │
│  "Registrata garanzia AppleCare aggiuntiva"  │
├─────────────────────────────────────────────┤
│  Timeline                                    │
│  ● 15 giu — Acquisto creato                  │
│  ● 15 giu — Garanzia calcolata (24 mesi)     │
│  ● 20 giu — Nota aggiunta                    │
│  [Vedi tutti gli eventi (3)]                 │
└─────────────────────────────────────────────┘
```

### 3.5 Componenti necessari

| Componente | Feature | Note |
|------------|---------|------|
| `PurchaseHeader` | `features/purchase-detail/` | Header con metadati |
| `PurchaseDeadlinePanel` | `features/purchase-detail/` | Card deadline reso + garanzia |
| `PurchaseLifecyclePanel` | `features/purchase-detail/` | Status reso/rimborso/garanzia + controlli |
| `PurchaseLifecycleSection` | `features/purchase-detail/` | Sezione lifecycle parametrica (`domain: 'return' | 'refund' | 'warranty'`). Sostituisce le tre sezioni separate per MVP. |
| `PurchaseDocumentsPanel` | `features/purchase-detail/` | Lista documenti |
| `PurchaseTimeline` | `features/purchase-detail/` | Timeline compatta |
| `StatusBadge` | `shared/ui/` | Badge stato |
| `DeadlineBadge` | `shared/ui/` | Badge scadenza |
| `DeadlineBadge` | `shared/ui/` | Badge urgenza |
| `Button` | `shared/ui/` | Modifica, aggiorna stato |
| `Select` | `shared/ui/` | Dropdown cambio stato |
| `EmptyState` | `shared/ui/` | Sezioni vuote |
| `ErrorState` | `shared/ui/` | Errori |
| `LoadingState` | `shared/ui/` | Skeleton |
| `Card` | `shared/ui/` | Contenitori |

Mappers: `purchase-detail-view.mapper.ts`.

### 3.6 Azioni principali

1. **Aggiorna stato reso** → `updateReturnStatusAction` → optimistic UI, poi refresh
2. **Aggiorna stato rimborso** → `updateRefundStatusAction` → optimistic
3. **Aggiorna garanzia** → `updateWarrantyAction`
4. **Aggiungi/modifica documento** → `updateDocumentMetadataAction`
5. **Aggiungi nota** → `addTimelineNoteAction`
6. **Modifica acquisto** → naviga a `/purchases/:id/edit`
7. **Torna alla lista** → naviga a `/purchases`

### 3.7 Stati da prevedere

| Stato | Comportamento |
|-------|--------------|
| **Loading** | Skeleton che replica il layout: header + 2 card deadline + 3 sezioni status + documents panel. `loading.tsx`. |
| **Not found** | `notFound()` — pagina 404 custom: "Acquisto non trovato." Link a `/purchases`. |
| **Error** | `ErrorState`: "Non riusciamo a caricare questo acquisto." Bottone "Torna agli acquisti". |
| **Status update pending** | Il controllo status mostra uno spinner inline. Il resto della pagina rimane interattivo. |
| **Status update error** | Messaggio inline sull'azione fallita. Il valore precedente viene ripristinato. |
| **Missing related records** | Se `returnCase` è null, mostra "Nessun monitoraggio reso" con opzione per inizializzarlo. Idem per refund/warranty. |
| **No documents** | `EmptyState`: "Nessuna ricevuta, fattura o manuale salvato." CTA: "Aggiungi riferimento". |
| **No notes** | Non mostrare la sezione note o mostrare "Nessuna nota." come testo neutro. |
| **No timeline events** | `EmptyState`: "Nessun evento del ciclo di vita ancora. Gli aggiornamenti appariranno qui." |

### 3.8 Versione desktop

- Layout a due colonne: sinistra (60%) header + lifecycle + documents + notes, destra (40%) deadline cards + timeline
- Deadline cards affiancate orizzontalmente
- Sezioni collassabili? No, tutto visibile. La pagina dettaglio merita spazio.
- Max-width container 960px centrato

### 3.9 Versione mobile

- Layout a singola colonna
- Header compatto
- Deadline cards stacked verticali
- Sezioni lifecycle in accordion o sempre espanse (preferibile sempre espanse: sono poche)
- Timeline: scroll orizzontale o lista verticale compatta
- Pulsante "Modifica" in alto a destra, accessibile

### 3.10 Cosa evitare

- **Pagina "muro di testo".** Le sezioni devono essere visivamente distinte con header chiari.
- **Status update che ricarica l'intera pagina.** Usare optimistic UI o revalidatePath mirato.
- **Deadline calcolate lato client.** Il calcolo vero è server-side; il dettaglio mostra valori già calcolati.
- **Timeline decorativa.** Ogni evento deve essere generato da una Server Action, non hardcodato.
- **Nascondere dati importanti in tab secondarie.** Tutto visibile in un'unica pagina con scroll.
- **Documenti: mostrare input file upload.** Non ci sono upload reali; solo metadata e link.

### 3.11 Criteri di accettazione

- [ ] Il dettaglio mostra tutti i dati del purchase: header, deadline, status, documenti, note, timeline
- [ ] Le deadline card mostrano il colore corretto in base all'urgency
- [ ] I controlli di aggiornamento stato funzionano (return, refund, warranty)
- [ ] L'aggiornamento stato mostra pending state inline, non blocca la pagina
- [ ] La timeline mostra eventi reali generati dalle mutazioni
- [ ] I link a manuali/assistenza sono cliccabili e si aprono in nuovo tab
- [ ] La sezione documenti riflette lo stato `isAvailable` (disponibile/mancante)
- [ ] Se il purchase non esiste, viene mostrata una pagina 404
- [ ] Su mobile, tutte le sezioni sono accessibili senza scroll orizzontale
- [ ] Su desktop, il layout a due colonne non causa troncamenti

---

## 4. Add Purchase Flow

**Route:** `/purchases/new` (create), `/purchases/:id/edit` (edit)  
**Data sources:** `getStores()`, `getCategories()` (+ `getPurchaseDetail(id)` per edit)  
**Frontend feature:** `features/purchase-form/`  
**Mutation:** `createPurchaseAction` / `updatePurchaseAction`

### 4.1 Obiettivo della schermata

Raccogliere i dati essenziali di un acquisto con il minimo attrito possibile, validare in tempo reale, e al submit calcolare automaticamente le deadline lato server. Il form è il punto di ingresso del valore: ogni campo deve giustificare la propria esistenza.

### 4.2 Domanda utente a cui risponde

> *"Come aggiungo questo acquisto per iniziare a tracciarlo?"*

E in edit mode:
> *"Come correggo o completo le informazioni di questo acquisto?"*

### 4.3 Contenuto principale

**Form a sezioni logiche (non un unico muro di campi):**

**A. Informazioni Prodotto**
- Nome prodotto (required, text input)
- Categoria (required, select: electronics, clothing, home, furniture, sports, travel, work, other)
- Prezzo (required, number input con simbolo valuta)
- Valuta (select: EUR default, USD, GBP)
- Data acquisto (required, date picker o input date nativo)

**B. Negozio**
- Nome negozio (required, text input con autocomplete da stores esistenti)
- Sito web (optional, URL input)
- Link assistenza (optional, URL input)
- Numero ordine (optional, text input)

**C. Policy Reso**
- Giorni per il reso (required, number input, ≥ 0)
- Preview dinamica: "Reso entro il [data calcolata]" (solo preview, non source of truth)

**D. Garanzia**
- Durata in mesi (optional, number input, ≥ 0)
- Preview dinamica: "Garanzia fino al [data calcolata]" (solo preview)

**E. Documenti & Note**
- Ricevuta disponibile? (toggle sì/no)
- Link ricevuta (optional, URL, mostrato solo se ricevuta = sì)
- URL manuale (optional)
- Note libere (optional, textarea)

**F. Submit**
- Pulsante "Salva acquisto" (create) / "Aggiorna acquisto" (edit)
- Stato disabled durante submit
- Testo pulsante cambia in "Salvataggio..." durante pending

### 4.4 Gerarchia visiva

```
┌─────────────────────────────────────────────┐
│  ← Acquisti                                  │
│  H1: Nuovo acquisto                         │
├─────────────────────────────────────────────┤
│  Prodotto                                    │
│  ┌──────────────────────────────────────┐    │
│  │ Nome prodotto *                       │    │
│  │ [                           ]         │    │
│  │ Categoria *         Prezzo *          │    │
│  │ [Elettronica ▾]     [     ] EUR ▾    │    │
│  │ Data acquisto *                       │    │
│  │ [GG/MM/AAAA      📅]                 │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Negozio                                     │
│  ┌──────────────────────────────────────┐    │
│  │ Nome negozio *                        │    │
│  │ [                           ]         │    │
│  │ Sito web              Assistenza      │    │
│  │ [https://...]         [https://...]   │    │
│  │ N. ordine                             │    │
│  │ [AB-12345                ]            │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Reso e Garanzia                             │
│  ┌──────────────────────────────────────┐    │
│  │ Giorni per il reso *  Mesi garanzia   │    │
│  │ [30              ]    [24         ]   │    │
│  │ Reso stimato: 11 ago 2026            │    │
│  │ Garanzia stimata: lug 2028           │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Documenti                                   │
│  ┌──────────────────────────────────────┐    │
│  │ Ricevuta disponibile? [Sì ● / No ○]  │    │
│  │ Link ricevuta                         │    │
│  │ [https://...                  ]       │    │
│  │ URL manuale                           │    │
│  │ [https://...                  ]       │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Note                                        │
│  ┌──────────────────────────────────────┐    │
│  │ [                                  ]  │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  [       Salva acquisto (disabled)       ]   │
│  oppure                                      │
│  [       Salva acquisto                 ]   │
│  oppure                                      │
│  [       Salvataggio... ⏳              ]   │
│                                              │
│  ❌ Alcuni campi richiedono attenzione       │
│  • Il prezzo deve essere maggiore di zero    │
│  • Inserisci un URL valido per il manuale    │
└─────────────────────────────────────────────┘
```

### 4.5 Componenti necessari

| Componente | Feature | Note |
|------------|---------|------|
| `PurchaseForm` | `features/purchase-form/` | Container principale, riceve mode (create/edit) |
| `StoreFields` | `features/purchase-form/` | Campi negozio |
| `ReturnPolicyFields` | `features/purchase-form/` | Campi reso + preview |
| `WarrantyFields` | `features/purchase-form/` | Campi garanzia + preview |
| `DocumentReferenceFields` | `features/purchase-form/` | Campi documenti |
| `Input` | `shared/ui/` | Input testo, numero, URL |
| `Select` | `shared/ui/` | Dropdown categoria, valuta |
| `Textarea` | `shared/ui/` | Note |
| `Button` | `shared/ui/` | Submit |
| `ErrorState` | `shared/ui/` | Errore submit |

Hooks: `usePurchaseForm` — gestisce React Hook Form + Zod resolver, stato pending, errori server.

Mappers: `purchase-form.mapper.ts` per convertire form values → Server Action input e viceversa (edit mode: detail → form defaults).

### 4.6 Azioni principali

1. **Compilare campi** → validazione inline
2. **Submit** → `createPurchaseAction(input)` / `updatePurchaseAction(input)`
3. **Success** → redirect a `/purchases/:id` (create) o rimani su edit con conferma (edit)
4. **Error** → mostra errori inline (campo) e/o form-level (generico)
5. **Annulla** → torna a `/purchases` (create) o `/purchases/:id` (edit)

### 4.7 Stati da prevedere

| Stato | Comportamento |
|-------|--------------|
| **Idle** | Form pronto, campi vuoti (create) o pre-compilati (edit). Submit abilitato. |
| **Validating (client)** | Errori inline sotto ogni campo non valido. Messaggi in italiano chiaro. Submit possibile ma mostra errori. |
| **Submitting** | Pulsante disabled, testo "Salvataggio...". Tutti i campi disabled. Nessun doppio submit possibile. |
| **Server validation error** | Pulsante ri-abilitato. Errori field-level dai fieldErrors di Zod. Eventuale messaggio form-level. I valori inseriti sono preservati. |
| **Server generic error** | Pulsante ri-abilitato. Messaggio form-level: "Non riusciamo a salvare. I dati precedenti sono al sicuro." I valori sono preservati. |
| **Success (create)** | Redirect a `/purchases/:id`. |
| **Success (edit)** | Messaggio di conferma inline, rimani sulla pagina. I dati mostrati sono aggiornati. |
| **Loading stores/categories** | Select mostrano stato loading (opzione "Caricamento..."). |

### 4.8 Versione desktop

- Form centrato, max-width 640px
- Sezioni con card, padding 24px
- Layout a due colonne per campi correlati (es. categoria + prezzo, sito + assistenza)
- Etichette sopra i campi (non a sinistra)
- Preview deadline visibile a lato o sotto i campi policy

### 4.9 Versione mobile

- Form a larghezza piena
- Campi sempre a singola colonna
- Tastiera numerica per prezzo e giorni/mesi
- Date picker nativo del dispositivo
- Pulsante submit sticky in fondo allo schermo
- Sezioni collassabili per risparmiare scroll (opzionale, da testare)

### 4.10 Cosa evitare

- **Chiedere dati non essenziali.** Ogni campo opzionale deve avere una ragione chiara per esistere.
- **Deadline calcolate lato client come fonte di verità.** La preview è solo indicativa.
- **Form senza feedback inline.** Gli errori devono apparire vicino al campo, non solo in un toast.
- **Perdere i dati a submit fallito.** React Hook Form preserva i valori; non resettare mai a zero dopo errore.
- **Date picker custom complessi.** `<input type="date">` nativo o libreria leggera; non costruire un calendario.
- **Validazione solo client.** Il server valida sempre con `createPurchaseSchema`.

### 4.11 Criteri di accettazione

- [ ] Tutti i campi required mostrano asterisco e messaggio di errore se vuoti al submit
- [ ] La validazione inline appare durante la digitazione (dopo il primo blur o submit)
- [ ] Il pulsante submit è disabled durante il salvataggio
- [ ] Non è possibile inviare il form due volte (double-submit prevention)
- [ ] Dopo errore server, i valori inseriti sono preservati
- [ ] Le preview delle deadline sono visibili ma chiaramente etichettate come "stimate"
- [ ] Il campo negozio supporta autocomplete da store esistenti
- [ ] La ricevuta toggle mostra/nasconde il campo link ricevuta
- [ ] In edit mode, i campi sono pre-compilati con i valori esistenti
- [ ] Dopo creazione con successo, l'utente arriva alla pagina dettaglio
- [ ] Il form funziona da mobile con tastiera nativa appropriata per ogni tipo di input

---

## 5. Post-purchase Timeline

**Route:** parte di `/purchases/:id` (non una rotta separata)  
**Data sources:** `getPurchaseDetail(purchaseId).timeline`  
**Frontend feature:** `features/purchase-detail/components/PurchaseTimeline.tsx`

### 5.1 Obiettivo della schermata

Raccontare la storia dell'acquisto attraverso eventi significativi del ciclo di vita, generati automaticamente dalle mutazioni. Non è un audit log tecnico: è la narrativa del prodotto.

### 5.2 Domanda utente a cui risponde

> *"Cosa è successo a questo acquisto dal momento in cui l'ho registrato?"*

### 5.3 Contenuto principale

Lista cronologica di eventi (dal più recente al più vecchio, o viceversa — decidere in base a UX; default: più recente in alto).

Ogni evento mostra:
- **Icona** (associata al tipo evento: 📋 creazione, 📅 deadline, 🔄 reso, 💰 rimborso, 🛡️ garanzia, 📄 documento, 📝 nota)
- **Titolo** (es. "Acquisto creato", "Reso pianificato", "Rimborso ricevuto")
- **Descrizione** (opzionale, dettaglio contestuale)
- **Data** (formato relativo: "Oggi", "Ieri", "3 giorni fa", o data assoluta se > 7 giorni)
- **Timestamp** (orario se evento di oggi)

Ordine: **dal più recente al più vecchio** (default). Opzione per invertire?

### 5.4 Gerarchia visiva

```
┌─────────────────────────────────────────────┐
│  Timeline                                    │
│                                              │
│  ● Oggi, 14:32                               │
│  │ Rimborso ricevuto                         │
│  │ 129,99 € — Rimborso completato            │
│  │                                           │
│  ● 3 giorni fa                               │
│  │ Articolo restituito                       │
│  │ Presso Zalando — Tracking: N/D            │
│  │                                           │
│  ● 5 giorni fa                               │
│  │ Reso pianificato                          │
│  │ Entro il 14 luglio 2026                  │
│  │                                           │
│  ● 10 luglio 2026                            │
│  │ Acquisto creato                           │
│  │ Scarpe Nike Air Max — 129,99 €           │
│  │ Reso entro 30 giorni, Garanzia 24 mesi   │
└─────────────────────────────────────────────┘
```

Ogni evento è un punto su una linea verticale (desktop) o lista semplice (mobile).

### 5.5 Componenti necessari

| Componente | Feature | Note |
|------------|---------|------|
| `PurchaseTimeline` | `features/purchase-detail/` | Container timeline |
| `TimelineEvent` (interno) | `features/purchase-detail/` | Singolo evento |
| `EmptyState` | `shared/ui/` | Nessun evento |

Nessun mapper dedicato: `getPurchaseDetail` restituisce già `timeline: TimelineEvent[]`.

### 5.6 Azioni principali

1. **Scroll** attraverso la timeline
2. **Nessuna azione diretta** — la timeline è read-only; le azioni avvengono tramite i controlli status nella pagina detail

### 5.7 Stati da prevedere

| Stato | Comportamento |
|-------|--------------|
| **Con eventi** | Mostra timeline completa, ordinata per `occurredAt` discendente |
| **Vuota (no eventi)** | `EmptyState`: "Nessun evento ancora. Gli aggiornamenti appariranno qui man mano che l'acquisto evolve." |
| **Singolo evento** | Mostra solo l'evento di creazione (minimo garantito da `createPurchaseAction`) |
| **Molti eventi (>10)** | Mostra tutti con scroll; eventualmente collassa eventi vecchi sotto "Mostra N eventi precedenti" (nice-to-have, non MVP) |

### 5.8 Versione desktop

- Timeline verticale con linea connettiva e pallini
- Icone a sinistra della linea, contenuto a destra
- Larghezza: ~50-60% del pannello (se in layout a due colonne con deadline cards)
- Spaziatura tra eventi: 24px

### 5.9 Versione mobile

- Lista semplice senza linea connettiva (o linea più sottile)
- Icona + titolo in linea, descrizione sotto
- Spaziatura ridotta: 16px
- Date in formato relativo per risparmiare spazio

### 5.10 Cosa evitare

- **Eventi generati lato client.** La UI non deve mai creare `TimelineEvent`; solo le Server Action.
- **Eventi per ogni micro-cambiamento.** Non creare un evento per "prezzo cambiato di 1 centesimo".
- **Date assolute per eventi recenti.** "3 giorni fa" è più utile di "9 luglio 2026" per eventi recenti.
- **Timeline decorativa senza connessione alle mutazioni.** Deve riflettere lo stato reale del database.
- **Icone astratte o criptiche.** Le emoji/icone devono essere immediatamente comprensibili.

### 5.11 Criteri di accettazione

- [ ] La timeline mostra eventi reali generati dalle Server Action
- [ ] Ogni evento ha tipo, titolo, data e descrizione opzionale
- [ ] L'ordine è dal più recente al più vecchio
- [ ] Le date sono in formato relativo per eventi entro 7 giorni, assoluto oltre
- [ ] Lo stato vuoto mostra il messaggio previsto (non è un errore)
- [ ] Nuovi eventi appaiono dopo che una mutazione è completata con successo
- [ ] La timeline è accessibile via scroll senza overflow nascosti
- [ ] Su mobile, la timeline è leggibile senza troncamenti

---

## 6. Actions Needed View

**Route:** `/actions-needed`  
**Data sources:** `getUrgentActions()`  
**Frontend feature:** `features/actions-needed/`

### 6.1 Obiettivo della schermata

Fornire una vista dedicata e completa di tutte le azioni che richiedono attenzione, senza la "competizione visiva" di summary e acquisti recenti. È l'espansione del pannello Urgent Actions del dashboard.

### 6.2 Domanda utente a cui risponde

> *"Quali sono TUTTE le cose che devo fare per i miei acquisti, ordinate per urgenza?"*

### 6.3 Contenuto principale

**Lista di Action Card**, una per ogni azione urgente.

Ogni card mostra:
- **Prodotto** (productName, in evidenza)
- **Negozio** (storeName)
- **Motivazione** (action reason human-readable, es. "Reso entro 3 giorni", "Rimborso in attesa da 12 giorni")
- **Urgency badge** (`overdue` / `due_soon` / `upcoming`)
- **Deadline o durata** (data esatta o "da X giorni")
- **Descrizione** contestuale
- **Quick action** (obbligatoria, es. "Segna come restituito" per resi, "Segna rimborso ricevuto" per pending). Opera con optimistic UI.
- **Link** alla pagina detail (l'intera card è cliccabile tranne l'area quick action)

Ordinamento fisso: `overdue` → `due_soon` → `upcoming`, poi per data.

### 6.4 Gerarchia visiva

```
┌─────────────────────────────────────────────┐
│  H1: Azioni necessarie                       │
│  4 azioni richiedono la tua attenzione       │ ← subtitle count
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐ │
│  │ 🔴 OVERDUE                              │ │
│  │ Reso scaduto                            │ │
│  │ Nike Air Max — Zalando                 │ │
│  │ Scaduto il 12 luglio 2026              │ │
│  │ Il periodo di reso è terminato.         │ │
│  │              [Segna restituito] [Dettaglio →]│ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌─────────────────────────────────────────┐ │
│  │ 🟡 DUE SOON                             │ │
│  │ Garanzia in scadenza                    │ │
│  │ MacBook Pro 16" — MediaWorld           │ │
│  │ Scade il 15 giugno 2028                │ │
│  │ Mancano 23 mesi alla scadenza.          │ │
│  │                            [Dettaglio →]│ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌─────────────────────────────────────────┐ │
│  │ 🟡 DUE SOON                             │ │
│  │ Reso entro 3 giorni                     │ │
│  │ Giacca invernale — Amazon              │ │
│  │ Entro il 15 luglio 2026                │ │
│  │              [Segna restituito] [Dettaglio →]│ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌─────────────────────────────────────────┐ │
│  │ 🔵 UPCOMING                             │ │
│  │ Ricevuta mancante                       │ │
│  │ Lampada da tavolo — IKEA               │ │
│  │ Nessuna ricevuta salvata.               │ │
│  │                            [Dettaglio →]│ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### 6.5 Componenti necessari

| Componente | Feature | Note |
|------------|---------|------|
| `ActionsNeededList` | `features/actions-needed/` | Container lista |
| `ActionCard` | `features/shared/components/` | Card azione, variant `extended` |
| `ActionReason` | `features/actions-needed/` | Testo motivazione formattato |
| `DeadlineBadge` | `shared/ui/` | Badge urgenza + scadenza |
| `Card` | `shared/ui/` | Contenitore |
| `Button` | `shared/ui/` | Link a detail |
| `EmptyState` | `shared/ui/` | Nessuna azione |
| `ErrorState` | `shared/ui/` | Errore |
| `LoadingState` | `shared/ui/` | Skeleton |

Mappers: `action-needed-view.mapper.ts`.

### 6.6 Azioni principali

1. **Tap su card** → naviga a `/purchases/:id`
2. **Tap su azione rapida** (se presente) → chiama Server Action, optimistic update, rimuove card dalla lista
3. **Retry** (errore) → ricarica

### 6.7 Stati da prevedere

| Stato | Comportamento |
|-------|--------------|
| **Loading** | Skeleton: 3-4 card fantasma con badge e linee di testo. `loading.tsx`. |
| **Empty** | `EmptyState`: "Nessuna azione urgente in questo momento. I tuoi acquisti sono sotto controllo." Icona check. CTA: "Vai agli acquisti". |
| **Error** | `ErrorState`: "Non riusciamo a caricare le azioni necessarie." Retry. |
| **Quick action success** | La card scompare con fade+slide (300ms). Toast: "Reso registrato. Passaggio successivo: monitora il rimborso." / "Rimborso registrato." (in base al dominio). Summary strip dashboard aggiornato via `revalidatePath`. |
| **Quick action error** | Messaggio inline sulla card: "Azione non riuscita. Riprova." La card rimane visibile. |

### 6.8 Versione desktop

- Layout centrato, max-width 720px
- Card a larghezza piena, verticalmente stacked
- Ogni card ha padding generoso (20-24px) per leggibilità
- Colore urgency visibile come barra laterale sinistra + badge

### 6.9 Versione mobile

- Card a larghezza piena, margini ridotti
- Urgency badge in alto a destra della card
- Testo motivazione più compatto
- Link "Dettaglio →" come area tappabile ampia
- Se sono >5 card, scroll fluido

### 6.10 Cosa evitare

- **Filtri complessi.** Questa vista non ha bisogno di filtri: è già filtrata per "azioni necessarie".
- **Card troppo diverse dal dashboard.** La ActionCard deve essere lo stesso componente usato nel dashboard (coerenza).
- **Azioni "risolte" che rimangono in lista.** Dopo un aggiornamento status, l'azione deve sparire da qui via `revalidatePath`.
- **Zero azioni = pagina vuota spettrale.** Messaggio positivo e rassicurante.

### 6.11 Criteri di accettazione

- [ ] Mostra tutte le azioni urgenti ordinate per gravità (overdue → due_soon → upcoming)
- [ ] Ogni card mostra: prodotto, negozio, motivazione, urgency badge, deadline, link
- [ ] Lo stato vuoto è positivo ("sotto controllo"), non negativo
- [ ] Le card sono cliccabili e portano al dettaglio corretto
- [ ] Dopo un aggiornamento status su una card, questa scompare dalla lista
- [ ] Il conteggio nel sottotitolo ("N azioni") è accurato
- [ ] Il loading state usa skeleton che rispecchiano le card reali
- [ ] Su mobile, il touch target per la navigazione è sufficientemente ampio

---

## 7. Dashboard Mobile

**Route:** `/`  
**Stessa pagina del Dashboard Desktop — layout responsive.**

### 7.1 Obiettivo della schermata

Fornire la stessa risposta immediata del dashboard desktop ("Cosa devo fare ora?") in un contesto d'uso mobile: una mano tiene il telefono, l'altra eventualmente il prodotto fisico. Priorità assoluta all'azione più urgente above the fold.

### 7.2 Domanda utente a cui risponde

> *"Apro l'app al volo: c'è qualcosa che scade oggi o questa settimana?"*

### 7.3 Contenuto principale

Stessi dati del dashboard desktop, layout riorganizzato per viewport stretti (320-428px). Testato e verificato a 320px, 390px, 428px.

**A. Summary Strip** — layout compatto
- 3 contatori su una riga: acquisti, azioni urgenti, rimborsi in attesa
- Ogni contatore: numero grande (20-24px) + label piccolo (11-12px)
- I contatori con valore > 0 usano signal color
- A 320px: gap 16px, numeri 20px, label 11px — leggibile

**B. Urgent Actions** — priorità massima
- Stack verticale di card a larghezza piena
- La card più urgente (overdue) deve essere interamente visibile senza scroll
- Massimo 3 card visibili above the fold; link "Tutte le azioni (N)" se > 3

**C. Recent Purchases** — scrollabile
- Card orizzontali con snap scroll o stack verticale compatto
- Mostra: prodotto, store, data, urgency dot

**D. Bottom CTA**
- Floating action button o CTA in basso: "+" per nuovo acquisto
- Navigazione: tab bar o header con link a Purchases, Actions Needed

### 7.4 Gerarchia visiva

```
┌──────────────────────┐  ← 390px viewport
│  AfterBuy      [⚙?] │  ← header minimale
├──────────────────────┤
│  12          3          1│
│  acquisti   azioni   rimborsi│  ← summary strip (3 counter, 1 riga)
├──────────────────────┤
│  AZIONI URGENTI      │
│ ┌──────────────────┐ │
│ │🔴 OVERDUE        │ │
│ │Reso scaduto      │ │  ← first card fully visible
│ │Nike Air Max      │ │
│ │Zalando           │ │
│ │Scaduto 12 lug    │ │
│ │[Segna restituito]│ │  ← quick action
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │🟡 DUE SOON       │ │
│ │Reso entro 3 gg   │ │  ← partially visible
│ │Giacca invernale  │ │
│ │[Segna restituito]│ │
│ └──────────────────┘ │
│  [Tutte le azioni →] │
├──────────────────────┤
│  ACQUISTI RECENTI    │
│  [card] [card] [card]│  ← horizontal scroll
├──────────────────────┤
│              [+]     │  ← FAB nuovo acquisto
└──────────────────────┘
```

### 7.5 Componenti necessari

| Componente | Feature | Note |
|------------|---------|------|
| `DashboardSummary` | `features/dashboard/` | Versione mobile: 3 contatori su 1 riga |
| `UrgentActionsList` | `features/dashboard/` | Stack verticale |
| `ActionCard` | `features/shared/components/` | Card compatta (variant `compact`) |
| `RecentPurchases` | `features/dashboard/` | Scroll orizzontale |
| `DashboardEmptyState` | `features/dashboard/` | Stato vuoto |
| `DeadlineBadge` | `shared/ui/` | Badge urgenza |
| `Card` | `shared/ui/` | Contenitore |
| `EmptyState` | `shared/ui/` | Stati vuoti |
| `LoadingState` | `shared/ui/` | Skeleton mobile |
| `ErrorState` | `shared/ui/` | Errore |

Hook: `useIsMobile` dal frontend architecture.

### 7.6 Azioni principali

1. **Tap su Urgent Action Card** → naviga a `/purchases/:id`
2. **Tap su "Tutte le azioni"** → naviga a `/actions-needed`
3. **Tap su acquisto recente** → naviga a `/purchases/:id`
4. **Tap FAB "+"** → naviga a `/purchases/new`
5. **Pull-to-refresh** (nice-to-have) → ricarica dati
6. **Retry** → ricarica

### 7.7 Stati da prevedere

| Stato | Comportamento |
|-------|--------------|
| **Loading** | Skeleton mobile: 2 righe summary + 2 card fantasma + 3 card piccole orizzontali |
| **Empty (no purchases)** | `EmptyState` centrato verticalmente: "Nessun acquisto." CTA "Aggiungi". |
| **Empty (no urgent actions)** | Nascondi sezione Urgent Actions. Mostra "Tutto sotto controllo ✅" + spazio per recent purchases |
| **Error** | `ErrorState` compatto con retry |
| **Offline** | (Non MVP, ma architettabile) |

### 7.8 Versione desktop

N/A — questa è la specifica mobile del dashboard. Il layout desktop è descritto in §1.8.

### 7.9 Versione mobile

**(Questa è la versione mobile)**

**Breakpoint:** max-width 767px (tablet: layout ibrido se > 600px).

**Layout specifics:**
- Single column, full-width
- Summary strip: flex row, 3 contatori su una riga. A 320px: numeri 20px, label 11px, gap 16px.
- Urgent action cards: `border-radius: 8px`, `padding: 16px`, `margin-bottom: 12px`
- Urgency indicator: barra laterale sinistra colorata (4px) + badge in alto a destra
- Recent purchases: horizontal scroll container con `scroll-snap-type: x mandatory`
- FAB: `position: fixed`, `bottom: 24px`, `right: 24px`, `width: 56px`, `height: 56px`, `border-radius: 50%`
- Touch target minimo: 44px (WCAG)

### 7.10 Cosa evitare

- **Nascondere l'urgenza sotto scroll.** La prima azione overdue/due_soon deve essere above the fold.
- **Summary strip illeggibile.** I numeri devono essere grandi abbastanza (min 24px) su sfondo contrastato.
- **Card che sembrano pulsanti ma non lo sono.** Una card è un link a detail; il FAB è un'azione primaria.
- **FAB che copre contenuto.** Deve esserci padding-bottom sufficiente.
- **Testo troncato a metà parola.** Usa `text-overflow: ellipsis` con giudizio.

### 7.11 Criteri di accettazione

- [ ] L'azione più urgente è completamente visibile senza scroll (above the fold a 390×844 e 320×568)
- [ ] Il summary strip mostra 3 contatori su 1 riga, leggibili a 320px
- [ ] La quick action è tappabile (touch target ≥ 44px) e funziona con optimistic UI
- [ ] Le card urgenti hanno touch target ≥ 44px di altezza per l'area tappabile
- [ ] Il FAB non copre l'ultima card visibile
- [ ] Lo scroll orizzontale dei recent purchases funziona con snap
- [ ] Pull-to-refresh funziona (se implementato)
- [ ] Il layout non ha overflow orizzontale indesiderato
- [ ] Lo stato vuoto è centrato e invitante
- [ ] Il loading state non causa layout shift cumulativo

---

## 8. Purchase List Mobile

**Route:** `/purchases`  
**Stessa pagina della Purchase List Desktop — layout responsive.**

### 8.1 Obiettivo della schermata

Permettere all'utente mobile di navigare i propri acquisti con la stessa efficacia del desktop, adattando la tabella a un formato card stack con filtri accessibili.

### 8.2 Domanda utente a cui risponde

> *"Trovo rapidamente l'acquisto che mi serve, anche con una mano sola?"*

### 8.3 Contenuto principale

**A. Search bar** (sempre visibile in alto)
- Campo testo con icona lente
- Placeholder: "Cerca prodotto o negozio..."

**B. Filtri** (toggle)
- Pulsante "Filtri" con conteggio filtri attivi
- Espansione inline (non modale): mostra select per Status, Negozio, Categoria, Urgency
- Chip dei filtri attivi sotto la search bar, scrollabili orizzontalmente
- Pulsante "Cancella" quando filtri attivi

**C. Purchase Cards** (stack verticale)
Ogni card mostra:
- **Riga 1:** Prodotto (bold) + DeadlineBadge (a destra)
- **Riga 2:** Negozio · Data acquisto
- **Riga 3:** Prezzo formattato
- **Riga 4:** Status badge: Reso · Rimborso · Garanzia

Card layout:
```
┌──────────────────────────────────┐
│ Nike Air Max          🔴 OVERDUE │
│ Zalando · 5 lug 2026             │
│ 129,99 €                         │
│ Reso: scaduto  Rimborso: pending │
└──────────────────────────────────┘
```

**D. Empty state** (quando applicabile)
- Centrato, stesso messaggio della versione desktop

**E. FAB "+"** (nuovo acquisto, in basso a destra)

### 8.4 Gerarchia visiva

```
┌──────────────────────┐
│  Acquisti            │  ← H1
│                      │
│  [🔍 Cerca...      ] │  ← search bar (non sticky; scorre con il contenuto)
│  [Filtri (2)]        │  ← toggle filtri
│  [Zalando ×] [Reso ×]│  ← chip filtri attivi
│                      │
│ ┌──────────────────┐ │
│ │ MacBook Pro  🟡  │ │
│ │ MediaWorld       │ │
│ │ 15 giu · 2499€  │ │
│ │ Reso: attivo     │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Nike Air     🔴  │ │
│ │ Zalando          │ │
│ │ 5 lug · 129,99€ │ │
│ │ Reso: scaduto    │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Lampada      🔵  │ │
│ │ IKEA             │ │
│ │ 1 lug · 49,99€  │ │
│ │ Ricevuta: manc.  │ │
│ └──────────────────┘ │
│                      │
│              [+]     │
└──────────────────────┘
```

### 8.5 Componenti necessari

| Componente | Feature | Note |
|------------|---------|------|
| `PurchaseList` | `features/purchases/` | Container responsive |
| `PurchaseListCard` | `features/purchases/` | Card mobile |
| `PurchaseFilters` | `features/purchases/` | Toggle + chip + select |
| `PurchaseListEmptyState` | `features/purchases/` | Stati vuoti |
| `StatusBadge` | `shared/ui/` | Badge compatti |
| `DeadlineBadge` | `shared/ui/` | Badge urgenza + scadenza |
| `Input` | `shared/ui/` | Search |
| `Select` | `shared/ui/` | Dropdown filtri |
| `Button` | `shared/ui/` | FAB, Cancella filtri |
| `EmptyState` | `shared/ui/` | Vuoto |
| `ErrorState` | `shared/ui/` | Errore |
| `LoadingState` | `shared/ui/` | Skeleton card |

### 8.6 Azioni principali

1. **Tap su card acquisto** → naviga a `/purchases/:id`
2. **Tap FAB "+"** → naviga a `/purchases/new`
3. **Interazione con search** → filtra mentre digita (debounced, 300ms)
4. **Tap "Filtri"** → espande/chiude pannello filtri
5. **Tap chip filtro ×** → rimuove quel filtro
6. **Tap "Cancella filtri"** → reset tutti i filtri
7. **Pull-to-refresh** → ricarica lista

### 8.7 Stati da prevedere

| Stato | Comportamento |
|-------|--------------|
| **Loading** | Skeleton: 4-5 card fantasma con linee di testo. `loading.tsx`. |
| **Empty (no purchases)** | `EmptyState`: "Nessun acquisto." CTA: "Aggiungi il primo". |
| **Empty (filtri senza risultati)** | `EmptyState`: "Nessun acquisto corrisponde a questi filtri." CTA: "Cancella filtri". |
| **Error** | `ErrorState`: "Non riusciamo a caricare." Retry. |
| **Filtri aperti + scroll** | I filtri espansi spingono le card in basso; al collapse, la lista torna visibile. |
| **Search vuota** | Mostra tutti gli acquisti (lista completa). |

### 8.8 Versione desktop

N/A — questa è la specifica mobile. Layout desktop in §2.8.

### 8.9 Versione mobile

**(Questa è la versione mobile)**

**Breakpoint:** max-width 767px.

**Layout specifics:**
- Single column, full-width
- Search bar: **non sticky** — scorre con il contenuto. Su mobile lo spazio verticale è critico. Accesso rapido alternativo: icona 🔍 nell'header che espande la search bar inline.
- Filtri: collassati di default. Toggle mostra select stacked.
- Chip filtri: horizontal scroll container, altezza ~32px
- Card: `margin-bottom: 8px`, `padding: 16px`, `border-radius: 8px`
- FAB: `position: fixed`, `bottom: 24px`, `right: 24px`, `z-index: 10`
- Touch target card: altezza minima ~80px
- Status badge: compatti, solo colore + abbreviazione

### 8.10 Cosa evitare

- **Filtri che aprono un modal a schermo intero.** Un'espansione inline è più fluida.
- **Card troppo alte.** Massimo 4 righe di contenuto.
- **FAB sopra l'ultima card.** Aggiungere `padding-bottom: 80px` alla lista.
- **Search che attiva submit a ogni carattere.** Debounce 300ms.
- **Status badge illeggibili.** Su mobile, colore + lettera (es. "R" per reso, "RIM" per rimborso) con tooltip al tap.
- **Perdere la posizione scroll quando si applicano filtri.** Da gestire con cura.

### 8.11 Criteri di accettazione

- [ ] La search bar è accessibile (scrolla con il contenuto; icona 🔍 nell'header per accesso rapido)
- [ ] I filtri si espandono/collassano senza ricaricare la pagina
- [ ] I chip dei filtri attivi sono rimovibili singolarmente
- [ ] Ogni card mostra tutte le informazioni essenziali senza troncamenti critici
- [ ] Il FAB non si sovrappone all'ultima card della lista
- [ ] Touch target per card e FAB ≥ 44px
- [ ] Pull-to-refresh ricarica la lista
- [ ] Lo stato vuoto distingue "nessun acquisto" da "nessun risultato"
- [ ] La search è debounced (nessuna richiesta a ogni tasto)
- [ ] Il layout non ha overflow orizzontale indesiderato

---

## Cross-Screen Rules

Queste regole si applicano a tutte le schermate:

1. **Urgency first.** In ogni vista che contiene azioni urgenti, la più grave è sempre la prima visibile.
2. **Deadline server-side.** Nessun componente React calcola deadline come fonte di verità.
3. **Empty = calm.** Ogni stato vuoto comunica "tutto a posto", non "manca qualcosa".
4. **Error = safe.** Ogni messaggio di errore rassicura che i dati precedenti sono al sicuro.
5. **Signal colors only for urgency.** Mai usare rosso, giallo, verde per decorazione.
6. **Mobile touch targets ≥ 44px.** Accessibilità minima garantita.
7. **No raw Prisma in UI.** Tutti i dati passano attraverso view model e mapper.
8. **Timeline events from Server Actions only.** Mai creati lato client.
9. **Form preserves input on error.** React Hook Form + Zod non perdono dati.
10. **Responsive is not an afterthought.** Ogni schermata ha spec mobile e desktop deliberate. Testato a 320px, 390px, 428px.
11. **Post-resolution feedback.** Ogni completamento di azione produce feedback visivo (animazione uscita card + toast) e rinfresca i dati correlati via `revalidatePath`.

---

## Component Inventory (cross-screen)

### Shared UI Components (`shared/ui/`)

| Component | Used by |
|-----------|---------|
| `Button` | Tutte le schermate |
| `Input` | Purchase List (search), Purchase Form (tutti i campi) |
| `Select` | Purchase List (filtri), Purchase Form (categoria, valuta), Purchase Detail (status dropdown) |
| `Textarea` | Purchase Form (note) |
| `Card` | Dashboard, Actions Needed, Purchase List (mobile), Purchase Detail |
| `Badge` | Base per tutti i badge |
| `StatusBadge` | Dashboard, Purchase List, Purchase Detail |
| `DeadlineBadge` | Dashboard, Actions Needed, Purchase Detail |
| `EmptyState` | Tutte le schermate |
| `ErrorState` | Tutte le schermate |
| `LoadingState` | Tutte le schermate |

### Feature Components

| Schermata | Feature directory | Componenti |
|-----------|-------------------|------------|
| Dashboard | `features/dashboard/` | `DashboardSummary`, `UrgentActionsList`, `RecentPurchases` |
| Actions Needed | `features/actions-needed/` | `ActionsNeededList`, `ActionReason` |
| Shared | `features/shared/components/` | `ActionCard` (variant `compact` per dashboard, `extended` per actions-needed) |
| Purchase List | `features/purchases/` | `PurchaseList`, `PurchaseListItem`, `PurchaseListCard`, `PurchaseFilters`, `PurchaseListEmptyState` |
| Purchase Detail | `features/purchase-detail/` | `PurchaseHeader`, `PurchaseDeadlinePanel`, `PurchaseLifecyclePanel`, `PurchaseLifecycleSection` (parametrico: `return` / `refund` / `warranty`), `PurchaseDocumentsPanel`, `PurchaseTimeline` |
| Purchase Form | `features/purchase-form/` | `PurchaseForm`, `StoreFields`, `ReturnPolicyFields`, `WarrantyFields`, `DocumentReferenceFields` |

### Mappers

| Mapper | Input → Output |
|--------|----------------|
| `dashboard-view.mapper.ts` | `DashboardSummary` + `UrgentAction[]` → view model |
| `action-needed-view.mapper.ts` | `UrgentAction[]` → lista card view model |
| `purchase-list-view.mapper.ts` | `PurchaseListItem[]` → lista table/card view model |
| `purchase-detail-view.mapper.ts` | `PurchaseDetail` → view model per tutti i panel |
| `purchase-form.mapper.ts` | Form values ↔ `CreatePurchaseInput` / `UpdatePurchaseInput` |

---

## Acceptance Criteria Summary (cross-screen)

- [ ] Ogni schermata ha loading, empty, error state implementati
- [ ] Gli stati vuoti comunicano calma e offrono un next step
- [ ] Gli stati errore spiegano cosa è successo in linguaggio umano e offrono retry
- [ ] I loading state usano skeleton che rispecchiano il layout reale (no layout shift)
- [ ] Le urgency sono sempre calcolate server-side
- [ ] I signal color sono usati solo dove semanticamente corretto
- [ ] Mobile e desktop hanno layout entrambi intenzionali (non uno "caduto" dall'altro). Testato a 320px, 390px, 428px.
- [ ] Tutti i touch target mobile sono ≥ 44px
- [ ] I form preservano l'input dopo errore server
- [ ] La timeline riflette mutazioni reali, non è hardcodata
- [ ] Il flusso completo funziona: aggiungi acquisto → vedi dashboard → vedi azione urgente → quick action (1 tap) → card scompare con animazione → summary strip aggiornato → oppure: apri dettaglio → aggiorna stato → timeline aggiornata → dashboard riflette il cambiamento
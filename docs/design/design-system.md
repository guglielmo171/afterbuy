# AfterBuy — Design System

**Version:** 1.0  
**Method:** Impeccable (Design System Architecture)  
**Sources of truth:** `design-brief.md`, `screen-specs.md`, `frontend.md`  
**Status:** Final Definition

---

## 1. Design System Principles

AfterBuy non è un dashboard SaaS generico, è uno **strumento di protezione del valore d'acquisto**. Il design system esiste per servire questa promessa, non per costruire una UI library fine a se stessa.

### 1.1 Utilitarian Premium

Ogni pixel deve servire uno scopo. L'estetica nasce dalla chiarezza funzionale, non dalla decorazione. Il sistema è sobrio, preciso, senza orpelli.

**Regola operativa:** se un elemento non comunica urgenza, stato, azione o dato rilevante → non serve.

### 1.2 Action-First Hierarchy

La gerarchia visiva non è guidata dalla "importanza del dato" ma dalla **gravità dell'azione richiesta**. L'elemento più urgente (overdue) occupa sempre la posizione visiva più alta.

**Regola operativa:** `overdue > due_soon > upcoming > safe` governa l'ordine in ogni lista di azioni.

### 1.3 Calm Density

Informazione densa abbastanza da essere utile, spaziata abbastanza da essere respirabile. Il sistema evita sia il "cramped spreadsheet" che il "landing page waste".

**Regola operativa:** ogni card mostra 4-5 informazioni chiave, non 12. La pagina detail può averne di più, ma in sezioni distinte.

### 1.4 Signal Colors Are Semantic

I colori di segnale (rosso, ambra, blu, verde, grigio) sono riservati **esclusivamente** alla comunicazione dell'urgenza. Mai usati per decorazione, branding o categorizzazione generica.

**Regola operativa:** se un badge non rappresenta uno stato di urgenza, usa la palette neutral.

### 1.5 Status as Progress

Gli stati non sono etichette statiche ma milestone di un percorso. La transizione `Return Planned → Returned → Refunded` deve sentirsi come un avanzamento, non come un cambio label.

**Regola operativa:** ogni aggiornamento di stato produce un evento timeline e una variazione visiva (badge + colore).

### 1.6 Server Is the Source of Truth

Nessun componente React calcola deadline, urgenza o stato. I componenti **renderizzano** valori pre-calcolati dal server. Le preview nei form sono etichettate come "stimate".

**Regola operativa:** `classifyDeadlineUrgency()` e `getUrgentActions()` girano server-side. I componenti ricevono `urgency: 'overdue' | 'due_soon' | ...` come prop.

### 1.7 Mobile-First, Desktop-Intentional

Ogni schermata ha un layout mobile progettato (non "caduto" dal desktop) e un layout desktop progettato (non solo "allargato"). I breakpoint sono scelte deliberate, non compromessi.

**Regola operativa:** mobile layout si progetta per primo; desktop layout si progetta come variante, non come default ingrandito.

### 1.8 Rewarding Emptiness

Uno stato vuoto non significa "mancano dati" ma "non c'è nulla da fare". Il tono è positivo, calmo, risolutivo.

**Regola operativa:** ogni EmptyState include titolo positivo + descrizione + CTA quando applicabile. Mai "No data" grezzo.

---

## 2. Design Tokens

### 2.1 Typography

| Token | Size / Line | Weight | Usage |
|-------|-------------|--------|-------|
| `text-2xl` | 1.5rem / 2rem | 600 | Page titles, product names in detail |
| `text-xl` | 1.25rem / 1.75rem | 600 | Section headers, card product names |
| `text-lg` | 1.125rem / 1.5rem | 500 | Summary numbers, panel titles |
| `text-base` | 1rem / 1.5rem | 400 | Body, form labels, list items |
| `text-sm` | 0.875rem / 1.25rem | 400 | Secondary info, store names, dates |
| `text-xs` | 0.75rem / 1rem | 500 | Badges, deadlines, meta labels |

**Font stack:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. Inter è la scelta predefinita per la sua alta leggibilità e il supporto eccellente per dati tabulari (dates, prices).

### 2.2 Neutral Palette

| Token | Hex | Role |
|-------|-----|------|
| `--neutral-50` | `#FAFAFA` | Page background |
| `--neutral-100` | `#F5F5F5` | Card surface, hover state |
| `--neutral-200` | `#E5E5E5` | Borders, separators |
| `--neutral-300` | `#D4D4D4` | Input borders, disabled state |
| `--neutral-400` | `#A3A3A3` | Placeholder text |
| `--neutral-500` | `#737373` | Secondary icons |
| `--neutral-700` | `#404040` | Body text |
| `--neutral-900` | `#171717` | Headings, primary text |

### 2.3 Signal Colors (urgency only)

| Token | Hex | Meaning | Usage |
|-------|-----|---------|-------|
| `--signal-red` | `#DC2626` | `overdue` | Return window expired, refund issue |
| `--signal-amber` | `#D97706` | `due_soon` | Deadline within 7 days, warranty expiring |
| `--signal-blue` | `#2563EB` | `upcoming` | Deadline within 30 days |
| `--signal-green` | `#16A34A` | `safe` | Resolved, refund received, warranty active |
| `--signal-gray` | `#6B7280` | `unknown` | Missing deadline or duration |

### 2.4 Spacing

Base unit: **4px**. Key stops:

| Token | Value | Usage |
|-------|-------|-------|
| `space-2` | 8px | Tight internal padding, badge gaps |
| `space-3` | 12px | Card internal gap, inline spacing |
| `space-4` | 16px | Card padding, section gap, form spacing |
| `space-5` | 20px | Desktop card padding, panel separation |
| `space-6` | 24px | Section separation, page padding |
| `space-8` | 32px | Major section separation |
| `space-12` | 48px | Page-level top/bottom padding |

### 2.5 Radius

| Element | Value |
|---------|-------|
| Cards | `8px` |
| Buttons | `6px` |
| Inputs, Selects | `6px` |
| Badges | `4px` |

### 2.6 Shadows

Minimali. AfterBuy è piatto e utilitario, non stratificato.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | `0 1px 3px rgba(0,0,0,0.08)` | Card elevation (default) |
| `shadow-card-hover` | `0 2px 6px rgba(0,0,0,0.12)` | Card hover (desktop only) |
| `shadow-fab` | `0 4px 12px rgba(0,0,0,0.15)` | Floating Action Button |

**No shadow on:** inputs, buttons (flat), badges, empty states.

---

## 3. Component Inventory

### 3.1 Shared UI (`shared/ui/`)

| Component | Responsibility |
|-----------|---------------|
| `Button` | Azioni primarie, secondarie, link-style, CTA |
| `Card` | Contenitore semantico per dati correlati |
| `Badge` | Etichetta compatta non-urgency (categoria, store type, metadati) |
| `StatusBadge` | Stato del ciclo di vita (reso, rimborso, garanzia) |
| `DeadlineBadge` | Data di scadenza + urgenza visiva (overdue, due_soon, upcoming, safe, unknown) |
| `Input` | Campo testo, numero, URL, search |
| `Select` | Dropdown selezione singola |
| `Textarea` | Testo multi-riga (note) |
| `EmptyState` | Stato vuoto con messaggio positivo e CTA opzionale |
| `ErrorState` | Stato errore con messaggio human-readable e retry |
| `LoadingState` | Skeleton che replica il layout target (no layout shift) |

### 3.2 Feature Components

Feature components compongono shared UI e aggiungono logica di dominio. Vivono in `features/<feature>/components/`.

#### Dashboard

| Component | Responsibility |
|-----------|---------------|
| `DashboardSummary` | Strip orizzontale di 3 contatori (acquisti, azioni urgenti, rimborsi) |
| `UrgentActionsList` | Lista ordinata per gravità (overdue → due_soon → upcoming) |
| `RecentPurchases` | Lista compatta ultimi acquisti con status badge |

Nota: `ActionCard` è in `features/shared/components/` e viene usato con `variant='compact'` da Dashboard e `variant='extended'` da Actions Needed.

#### Actions Needed

| Component | Responsibility |
|-----------|---------------|
| `ActionsNeededList` | Container lista completa azioni urgenti |
| `ActionReason` | Testo human-readable del motivo (es. "Reso entro 3 giorni") |

Nota: `ActionCard` è condiviso con Dashboard via `features/shared/components/ActionCard.tsx` (variant `extended`).

#### Purchase List

| Component | Responsibility |
|-----------|---------------|
| `PurchaseList` | Container responsive: tabella (desktop) / card stack (mobile) |
| `PurchaseListItem` | Riga tabella desktop |
| `PurchaseListCard` | Card mobile |
| `PurchaseFilters` | Barra filtri + chip attivi + toggle mobile |
| `PurchaseListEmptyState` | Empty state specifico per lista acquisti |

#### Purchase Detail

| Component | Responsibility |
|-----------|---------------|
| `PurchaseHeader` | Nome prodotto, store, categoria, prezzo, data, n. ordine |
| `PurchaseDeadlinePanel` | Card reso + card garanzia affiancate |
| `PurchaseLifecyclePanel` | Controlli stato reso/rimborso/garanzia |
| `PurchaseLifecycleSection` | Sezione lifecycle parametrica: `domain: 'return' | 'refund' | 'warranty'`. Per MVP un unico componente; verrà separato solo se le differenze di comportamento lo giustificano. |
| `PurchaseDocumentsPanel` | Lista documenti (ricevuta, fattura, manuale, assistenza) |
| `PurchaseTimeline` | Timeline eventi ciclo di vita |
| `TimelineEvent` | Singolo evento timeline (interno a PurchaseTimeline) |

#### Purchase Form

| Component | Responsibility |
|-----------|---------------|
| `PurchaseForm` | Container form con React Hook Form + Zod |
| `StoreFields` | Campi negozio + autocomplete |
| `ReturnPolicyFields` | Giorni reso + preview deadline |
| `WarrantyFields` | Mesi garanzia + preview scadenza |
| `DocumentReferenceFields` | Toggle ricevuta + link + URL manuale |

### 3.3 Page-Level Components

| Component | Route | Responsibility |
|-----------|-------|---------------|
| `PageHeader` | Tutte le pagine | Titolo pagina + back link + azione opzionale |
| `SectionHeader` | Tutte le pagine | Titolo sezione con conteggio o azione inline |

---

## 4. Component Specifications

### 4.1 Button

**Responsabilità:** Trigger per azioni primarie, secondarie, CTA e link-style.

**Varianti:**

| Variant | Aspetto | Uso |
|---------|---------|-----|
| `primary` | `bg-neutral-900 text-white` | Azione principale: "Salva", "Aggiungi acquisto", "Riprova" |
| `secondary` | `bg-white border-neutral-200 text-neutral-700` | Azione secondaria: "Annulla", "Cancella filtri" |
| `ghost` | `bg-transparent text-neutral-700 hover:bg-neutral-100` | Azione terziaria: "Modifica", link "Vedi tutte" |
| `danger` | `bg-signal-red text-white` | Azione distruttiva (non in MVP, riservato) |

**Size:** `sm` (32px height, per chip/badge action), `md` (40px, default), `lg` (48px, CTA primario).

**Stati:** `default`, `hover`, `focus-visible`, `active`, `disabled`, `pending` (spinner + testo).

**Props:**

```ts
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  pending?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  children: ReactNode;
  onClick?: () => void;
}
```

**Quando usarlo:**
- Azioni che innescano mutazioni (submit form, update status, retry)
- Navigazione CTA ("Vedi tutte le azioni", "Aggiungi acquisto")
- Azioni di reset ("Cancella filtri")

**Quando NON usarlo:**
- Link di navigazione standard → usa `<Link>` (Next.js)
- Toggle on/off → usa un toggle switch
- Azione dentro una card che è già cliccabile → la card è il touch target

**Accessibilità:**
- `aria-label` quando solo icona
- `aria-disabled` durante pending (non `disabled` per mantenere focus)
- `role="button"` implicito con `<button>`
- Focus visible ring: `2px solid --signal-blue` con offset 2px

---

### 4.2 Card

**Responsabilità:** Contenitore semantico per un gruppo di dati correlati. Non è un bottone, ma può essere cliccabile nella sua interezza se rappresenta un'entità navigabile (es. card acquisto).

**Varianti:**

| Variant | Aspetto | Uso |
|---------|---------|-----|
| `default` | `bg-neutral-100 border-neutral-200` | Card standard: acquisti, azioni, pannelli |
| `elevated` | `bg-white shadow-card` | Card con enfasi: deadline panel, action card urgente |
| `urgent` | `bg-white shadow-card border-l-4` con border-color = signal color | Card azione urgente (overdue, due_soon) |
| `flat` | `bg-neutral-50 border-0` | Card senza bordo: sezioni form |

**Props:**

```ts
interface CardProps {
  variant?: 'default' | 'elevated' | 'urgent' | 'flat';
  urgency?: 'overdue' | 'due_soon' | 'upcoming' | 'safe' | 'unknown'; // solo per variant='urgent'
  padding?: 'sm' | 'md' | 'lg'; // 12px | 16px | 24px
  href?: string; // rende la card un link (usa Next.js Link wrapper)
  children: ReactNode;
}
```

**Quando usarlo:**
- Raggruppare dati correlati (prodotto + store + prezzo)
- Pannelli di dettaglio (deadline panel, documents panel)
- Elementi di lista navigabili (purchase card, action card)
- Sezioni form logicamente distinte

**Quando NON usarlo:**
- Puro layout/griglia → usa CSS Grid/Flexbox
- Elementi singoli (un badge, un bottone) → non incapsulare in card
- Contenitore pagina → `PageHeader` + layout component

**Accessibilità:**
- Se `href` è fornito: wrapping `<a>` o Next.js `<Link>`, `role` implicito
- Card urgent: `border-l-4` è il canale visivo; colore MAI unico indicatore (badge testuale presente)
- Focus ring sull'intera card quando navigabile

---

### 4.3 Badge

**Responsabilità:** Etichetta compatta per metadati non-urgency (categoria prodotto, tipo store, conteggio).

**Varianti:**

| Variant | Aspetto | Uso |
|---------|---------|-----|
| `neutral` | `bg-neutral-200 text-neutral-700` | Categoria, store type, metadati generici |
| `count` | `bg-neutral-900 text-white rounded-full` | Conteggio (es. "3 azioni", "12 acquisti") |

**Size:** `sm` (text-xs, padding 2px 6px), `md` (text-xs, padding 4px 8px).

**Props:**

```ts
interface BadgeProps {
  variant?: 'neutral' | 'count';
  size?: 'sm' | 'md';
  children: ReactNode;
}
```

**Quando usarlo:**
- Categoria prodotto (es. "Elettronica", "Abbigliamento")
- Conteggio in summary strip o section header
- Chip filtro attivo (composizione: Badge + icona ×)

**Quando NON usarlo:**
- Stato urgenza → usa `DeadlineBadge`
- Stato ciclo di vita → usa `StatusBadge`
- Indicatore di notifica → pattern dedicato

**Anti-pattern:** usare Badge con signal color per decorazione. I colori di segnale sono solo per urgenza.

---

### 4.4 StatusBadge

**Responsabilità:** Comunica lo stato del ciclo di vita di un acquisto (reso, rimborso, garanzia). Estende `Badge` con mappatura semantica stato → colore.

**Varianti (domain-specific):**

| Domain | Valori | Colore |
|--------|--------|--------|
| **Return** | `not_planned`, `planned`, `returned`, `closed` | neutral → blue → amber → green |
| **Refund** | `not_expected`, `pending`, `received` | neutral → amber → green |
| **Warranty** | `active`, `expiring`, `expired` | green → amber → red |

**Props:**

```ts
interface StatusBadgeProps {
  domain: 'return' | 'refund' | 'warranty';
  status: string; // dominio-specifico
  size?: 'sm' | 'md';
}
```

**Label:** Human-readable italiano. Esempi: "Reso pianificato", "Rimborso in attesa", "Garanzia attiva".

**Quando usarlo:**
- Dashboard: su ogni urgent action card e recent purchase
- Purchase List: colonna/riga stato
- Purchase Detail: lifecycle panel, deadline card

**Quando NON usarlo:**
- Deadline temporale → `DeadlineBadge`
- Combinare più stati in un badge unico → mostra badge separati per reso, rimborso, garanzia

**Accessibilità:**
- Colore + testo (mai solo colore)
- I badge multipli (reso + rimborso + garanzia) devono essere distinguibili da screen reader

---

### 4.5 DeadlineBadge

**Responsabilità:** Comunica una scadenza con la sua urgenza semantica. È il componente visivo chiave per la promessa "Time to Action".

**Varianti (urgency-driven):**

| Urgency | Aspetto | Significato |
|---------|---------|-------------|
| `overdue` | `bg-signal-red/10 text-signal-red border-signal-red/20` | Scaduto: azione immediata |
| `due_soon` | `bg-signal-amber/10 text-signal-amber border-signal-amber/20` | Entro 7 giorni |
| `upcoming` | `bg-signal-blue/10 text-signal-blue border-signal-blue/20` | Entro 30 giorni |
| `safe` | `bg-signal-green/10 text-signal-green border-signal-green/20` | Lontano / risolto |
| `unknown` | `bg-signal-gray/10 text-signal-gray border-signal-gray/20` | Dato mancante |

**Contenuto:** data formattata o durata relativa. Esempi: "Scade il 15 luglio", "3 giorni rimanenti", "Scaduto il 12 luglio", "23 mesi rimanenti".

**Props:**

```ts
interface DeadlineBadgeProps {
  urgency: 'overdue' | 'due_soon' | 'upcoming' | 'safe' | 'unknown';
  label: string; // testo human-readable
  size?: 'sm' | 'md';
}
```

**Quando usarlo:**
- Dashboard: su ogni urgent action card
- Actions Needed: su ogni action card
- Purchase Detail: deadline panel (reso + garanzia)
- Purchase List: colonna/riga urgenza

**Quando NON usarlo:**
- Stato del ciclo di vita → `StatusBadge`
- Conteggio giorni senza contesto di urgenza → testo semplice

**Accessibilità:**
- `aria-label`: "Urgenza: {urgency}. {label}" per screen reader
- Colore di sfondo tenue (10% opacity) garantisce contrasto testo ≥ 4.5:1

---

### 4.6 Input

**Responsabilità:** Raccolta di testo, numero, URL e search. Validazione visiva inline.

**Varianti:**

| Variant | Aspetto | Uso |
|---------|---------|-----|
| `default` | `bg-white border-neutral-300` | Testo, URL |
| `number` | Come default, `inputMode="numeric"` | Prezzo, giorni, mesi |
| `search` | Come default + icona lente a sinistra | Search bar |

**Stati:** `default`, `focus` (border-neutral-900), `error` (border-signal-red), `disabled` (bg-neutral-100).

**Props:**

```ts
interface InputProps {
  type?: 'text' | 'number' | 'url' | 'search';
  label: string; // required per accessibilità
  error?: string; // messaggio errore validazione
  hint?: string; // testo helper
  placeholder?: string;
  disabled?: boolean;
  // ... inherited input props
}
```

**Quando usarlo:**
- Purchase Form: nome prodotto, prezzo, URL, ordine
- Purchase List: search bar
- Qualsiasi campo testo libero

**Quando NON usarlo:**
- Selezione tra opzioni predefinite → `Select`
- Testo multi-riga → `Textarea`
- Date → `<input type="date">` nativo (no date picker custom)

**Accessibilità:**
- `<label>` associato via `htmlFor`/`id`
- `aria-describedby` per error/hint
- `aria-invalid="true"` quando in errore
- Messaggio errore visibile e annunciato da screen reader

---

### 4.7 Select

**Responsabilità:** Selezione singola da lista predefinita. Dropdown nativo o custom leggero.

**Varianti:** nessuna variante visiva. Unico componente, stesso aspetto di Input.

**Props:**

```ts
interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean; // mostra "Caricamento..." come opzione disabled
}
```

**Quando usarlo:**
- Purchase Form: categoria, valuta
- Purchase List: filtri status, store, categoria, urgency
- Purchase Detail: dropdown aggiornamento stato

**Quando NON usarlo:**
- Scelta binaria → toggle o radio group
- Selezione multipla → pattern dedicato (non in MVP)
- Autocomplete testuale → Input con datalist o componente dedicato

**Accessibilità:**
- `<label>` associato
- `aria-describedby` per error
- Opzione loading come disabled per prevenire selezione prima del caricamento

---

### 4.8 Textarea

**Responsabilità:** Input testo multi-riga per note e descrizioni.

**Varianti:** nessuna. Stesso stile di Input, altezza minima 80px, resize verticale.

**Props:**

```ts
interface TextareaProps {
  label: string;
  error?: string;
  placeholder?: string;
  rows?: number; // default 3
  disabled?: boolean;
}
```

**Quando usarlo:**
- Purchase Form: note libere
- Purchase Detail: eventuale edit note inline (non MVP)

**Accessibilità:** come Input.

---

### 4.9 DataList / Table

**Responsabilità:** Visualizzazione tabellare su desktop, card stack su mobile. Non è un componente `DataList` astratto: ogni feature ha il suo componente lista specifico (`PurchaseList`, `ActionsNeededList`, `UrgentActionsList`). Il pattern comune è:

- **Desktop:** `<table>` semantico con `thead` e `tbody`
- **Mobile:** stack di `Card` verticali

**Pattern condiviso (non componente):**

```tsx
// Desktop
<table className="w-full text-sm">
  <thead className="border-b border-neutral-200 text-neutral-500">
    <tr>
      <th>Prodotto</th>
      <th>Negozio</th>
      <th>Data</th>
      <th>Stato</th>
    </tr>
  </thead>
  <tbody>
    {items.map(item => <PurchaseListItem key={item.id} item={item} />)}
  </tbody>
</table>

// Mobile
<div className="flex flex-col gap-2 md:hidden">
  {items.map(item => <PurchaseListCard key={item.id} item={item} />)}
</div>
```

**Quando usare il pattern tabella:**
- Purchase List (desktop)
- Qualsiasi lista con >3 colonne di dati omogenei

**Quando NON usare il pattern tabella:**
- Mobile → sempre card stack
- <5 item con layout variabile → card
- Dati eterogenei → layout custom

**Accessibilità:**
- `<th scope="col">` per header colonna
- `<caption>` se la tabella ha bisogno di contesto
- Ruolo `row`/`grid` implicito con elementi HTML nativi

---

### 4.10 EmptyState

**Responsabilità:** Comunica che non ci sono dati da mostrare in modo positivo ("tutto a posto") o neutro ("non ancora"), mai negativo ("mancano dati").

**Varianti:**

| Variant | Icona | Uso |
|---------|-------|-----|
| `calm` | ✓ check | Nessuna azione urgente, nessun problema |
| `empty` | 📋 clipboard | Nessun acquisto, nessun documento |
| `search` | 🔍 lente | Nessun risultato filtri |

**Props:**

```ts
interface EmptyStateProps {
  variant?: 'calm' | 'empty' | 'search';
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
}
```

**Messaggi standard (da screen-specs):**
- No purchases: "Nessun acquisto ancora. Aggiungi il tuo primo acquisto per tracciare resi, rimborsi e garanzie." + CTA "Aggiungi acquisto"
- No urgent actions: "Nessuna azione urgente. I tuoi acquisti sono sotto controllo." (nessun CTA necessario)
- No filter results: "Nessun acquisto corrisponde a questi filtri. Prova a cambiare stato, negozio o urgenza." + CTA "Cancella filtri"
- No timeline events: "Nessun evento ancora. Gli aggiornamenti appariranno qui."
- No documents: "Nessuna ricevuta, fattura o manuale salvato." + CTA "Aggiungi riferimento"

**Quando usarlo:**
- Dashboard senza acquisti
- Dashboard senza azioni urgenti
- Purchase List vuota o senza risultati
- Purchase Detail: documenti vuoti, timeline vuota
- Actions Needed vuota

**Quando NON usarlo:**
- Errore di caricamento → `ErrorState`
- Caricamento in corso → `LoadingState`
- Sezione opzionale non applicabile (es. "Nessun rimborso previsto" è uno stato valido, non un empty state)

**Accessibilità:**
- Titolo in `<h2>` o `<h3>` per navigazione da screen reader
- CTA focussabile

**Anti-pattern:** "No data" grezzo, icona triste, linguaggio negativo.

---

### 4.11 ErrorState

**Responsabilità:** Comunica un errore di caricamento o mutazione in linguaggio umano, rassicura che i dati sono al sicuro, offre sempre un'azione di recupero.

**Props:**

```ts
interface ErrorStateProps {
  title?: string; // default: "Qualcosa è andato storto"
  message: string;
  onRetry?: () => void;
  action?: { label: string; href: string }; // navigazione alternativa (es. "Torna agli acquisti")
}
```

**Messaggi standard:**
- Dashboard: "Non riusciamo a caricare il dashboard. Riprova tra un momento." + Retry
- Purchase List: "Non riusciamo a caricare i tuoi acquisti." + Retry
- Purchase Detail: "Non riusciamo a caricare questo acquisto." + "Torna agli acquisti"
- Form submit: "Non riusciamo a salvare. I dati precedenti sono al sicuro." (inline, non ErrorState full-page)
- Status update: messaggio inline, non ErrorState

**Quando usarlo:**
- Fallimento query pagina (dashboard, list, detail)
- Fallimento mutazione non recuperabile (dopo retry esauriti)

**Quando NON usarlo:**
- Errore validazione form → messaggi inline sui campi
- Status update fallito → messaggio inline, ripristino valore
- Dati parziali → mostra ciò che è disponibile + indicatore errore localizzato

**Accessibilità:**
- Messaggio visibile senza scroll
- Bottone Retry focussabile con `role="alert"` sul contenitore

---

### 4.12 LoadingState

**Responsabilità:** Skeleton che replica il layout della schermata target per prevenire layout shift cumulativo (CLS).

**Pattern:** Non un componente unico, ma skeleton specifici per schermata, implementati via `loading.tsx` a livello route.

**Skeleton standard:**

| Schermata | Skeleton |
|-----------|----------|
| Dashboard | Strip 3 contatori (80×24px) + 3 card (full-width, 120px) + 3 card piccole (200×100px) |
| Purchase List | 5-8 righe tabella (100%×40px) desktop / 3-4 card (full-width, 100px) mobile |
| Purchase Detail | Header (60% width) + 2 card deadline (50% ciascuna) + 3 sezioni (full-width, 80px) |
| Actions Needed | 3-4 card (full-width, 140px) |

**Implementazione:**

```tsx
// loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-neutral-200 rounded w-1/3" />
      <div className="h-24 bg-neutral-100 rounded-lg" />
      <div className="h-24 bg-neutral-100 rounded-lg" />
      <div className="h-24 bg-neutral-100 rounded-lg" />
    </div>
  );
}
```

**Regola:** lo skeleton deve occupare lo stesso spazio verticale del contenuto reale. Nessun layout shift tra loading → loaded.

**Accessibilità:**
- `aria-busy="true"` sul contenitore
- `aria-label="Caricamento in corso"` o equivalente
- Non annunciare ogni skeleton individualmente

---

### 4.13 Timeline

**Responsabilità:** Mostra la cronologia degli eventi del ciclo di vita di un acquisto, dal più recente al più vecchio.

**Struttura (desktop):**

```
● Oggi, 14:32
│ Rimborso ricevuto
│ 129,99 € — Rimborso completato
│
● 3 giorni fa
│ Articolo restituito
│ Presso Zalando
│
● 10 luglio 2026
│ Acquisto creato
│ Scarpe Nike Air Max — 129,99 €
```

**Struttura (mobile):** stessa ma senza linea verticale, solo pallini e contenuto.

**Evento:**

```ts
interface TimelineEvent {
  type: 'purchase_created' | 'return_planned' | 'returned' | 'refund_received'
      | 'warranty_registered' | 'document_added' | 'note_added' | 'status_changed';
  title: string;
  description?: string;
  occurredAt: string; // ISO date
}
```

**Icone per tipo:**
| Type | Icona |
|------|-------|
| `purchase_created` | 📋 |
| `return_planned` | 🔄 |
| `returned` | 📦 |
| `refund_received` | 💰 |
| `warranty_registered` | 🛡️ |
| `document_added` | 📄 |
| `note_added` | 📝 |
| `status_changed` | 🔄 |

**Props:**

```ts
interface TimelineProps {
  events: TimelineEvent[];
  maxEvents?: number; // default: mostra tutti; se > max, collassa con "Mostra N eventi precedenti"
}
```

**Quando usarlo:**
- Purchase Detail: sezione timeline

**Quando NON usarlo:**
- Dashboard (troppo dettaglio)
- Purchase List (non pertinente)
- Come audit log tecnico → è una narrativa, non un log

**Accessibilità:**
- Lista `<ol>` con `<li>` per ogni evento (ordine cronologico)
- `aria-label="Cronologia acquisto"`
- Date formattate con `<time datetime="...">`

**Anti-pattern:** eventi creati lato client. Solo le Server Action generano TimelineEvent.

---

### 4.14 ActionCard

**Responsabilità:** Card specifica per azioni urgenti. Combina `Card variant="urgent"` con `DeadlineBadge`, informazioni prodotto/negozio, motivo azione, e una quick action inline. Componente condiviso tra Dashboard e Actions Needed.

**Location:** `features/shared/components/ActionCard.tsx`

**Struttura obbligatoria:**

```
┌─────────────────────────────────────────────┐
│ 🔴 OVERDUE                                  │ ← DeadlineBadge in alto a destra
│                                             │
│ Reso scaduto                                │ ← action reason (bold)
│ Nike Air Max — Zalando                     │ ← prodotto + store
│ Scaduto il 12 luglio 2026                  │ ← deadline precisa
│                                             │
│ Il periodo di reso è terminato.             │ ← descrizione (solo variant extended)
│              [Segna restituito] [Dettaglio →]│ ← quick action + link
└─────────────────────────────────────────────┘
```

**Props:**

```ts
interface ActionCardProps {
  variant: 'compact' | 'extended'; // compact: dashboard, extended: actions-needed
  productName: string;
  storeName: string;
  reason: string; // action reason human-readable
  urgency: 'overdue' | 'due_soon' | 'upcoming';
  deadlineLabel: string; // es. "Scade il 12 luglio"
  description?: string; // solo variant extended
  href: string; // /purchases/:id
  quickAction?: {
    label: string; // es. "Segna come restituito", "Segna rimborso ricevuto"
    action: () => Promise<void>; // Server Action con optimistic UI
  };
}
```

**Quick action mapping (server → UI label):**

| urgency | domain | quickAction.label |
|---------|--------|-------------------|
| `overdue` | return | "Segna come restituito" |
| `due_soon` | return | "Segna come restituito" |
| `overdue` | refund | "Segna rimborso ricevuto" |
| `due_soon` | refund | "Segna rimborso ricevuto" |
| `upcoming` | receipt | "Aggiungi ricevuta" |

Per `warranty` e altri domini senza quick action ovvia, la prop `quickAction` è `undefined` e il pulsante non viene renderizzato.

**Varianti in base al contesto:**
- **compact (Dashboard):** padding ridotto, senza descrizione, senza link "Dettaglio →" esplicito (l'intera card è il link)
- **extended (Actions Needed):** padding pieno, con descrizione, quick action + link "Dettaglio →" entrambi visibili

**Quando usarlo:**
- Dashboard: `ActionCard variant="compact"` in `UrgentActionsList`
- Actions Needed: `ActionCard variant="extended"` in `ActionsNeededList`

**Quando NON usarlo:**
- Acquisto non urgente → Card standard + StatusBadge
- Lista acquisti generale → `PurchaseListCard`

**Accessibilità:**
- Card interamente cliccabile (wrap in `<Link>`) tranne l'area quick action che ha handler separato
- Urgenza comunicata da: colore bordo sinistro + DeadlineBadge testo + posizione nella lista
- Quick action button: `aria-label="${quickAction.label} per ${productName}"`

---

### 4.15 PageHeader

**Responsabilità:** Intestazione pagina con titolo, back link opzionale e azione primaria opzionale.

**Struttura:**

```
← Acquisti                          [+ Nuovo]
MacBook Pro 16"                     [Modifica]
```

**Props:**

```ts
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string; // se presente, mostra ← con link
  action?: { label: string; href?: string; onClick?: () => void };
}
```

**Varianti:**
- **Con back link:** pagine interne (detail, form, actions-needed)
- **Senza back link:** pagine top-level (dashboard, purchase list) — la navigazione è nella shell

**Quando usarlo:**
- Ogni pagina (tramite layout o inline)

**Accessibilità:**
- `<h1>` per il titolo (un solo H1 per pagina)
- Back link con `aria-label="Torna a {pagina}"`

---

### 4.16 SectionHeader

**Responsabilità:** Titolo di sezione con conteggio opzionale e azione inline.

**Struttura:**

```
Azioni urgenti                              [Vedi tutte →]
Acquisti recenti              3 acquisti
```

**Props:**

```ts
interface SectionHeaderProps {
  title: string;
  count?: number;
  countLabel?: string; // es. "azioni", "acquisti"
  action?: { label: string; href: string };
}
```

**Quando usarlo:**
- Dashboard: "Azioni urgenti", "Acquisti recenti"
- Purchase Detail: "Documenti", "Timeline", "Note"
- Qualsiasi sezione con titolo + metadati

**Accessibilità:**
- `<h2>` per il titolo sezione
- Count e label come `<span>` figlio, non parte dell'heading

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| `mobile` | 320–767px | Single column, full-width, card stack, FAB. Search bar non sticky (scorre col contenuto; icona 🔍 nell'header per accesso rapido). Testato a 320px, 390px, 428px. |
| `tablet` | 768–1023px | Ibrido: tabelle larghe, card se stretto (da testare) |
| `desktop` | ≥1024px | Max-width container 1024px, centrato, due colonne dove specificato |

**Regole responsive:**
1. Mobile si progetta per primo. Desktop è una variante, non un default.
2. Nessun `display: none` per nascondere contenuto su mobile. Se un dato serve su desktop, trova un formato alternativo su mobile.
3. Tabella desktop → card stack mobile. Stessi dati, layout diverso.
4. Due colonne desktop → una colonna mobile. L'ordine verticale deve avere senso (contenuto più importante in alto).
5. FAB solo su mobile (≤767px). Su desktop, l'azione primaria è nella PageHeader o in un Button inline.
6. Touch target minimo 44×44px su mobile.
7. Max-width container: 1024px desktop, 100% mobile. Centrato con `mx-auto`.

---

## 6. Naming Conventions

### 6.1 Componenti

| Categoria | Pattern | Esempi |
|-----------|---------|--------|
| Shared UI | `{Nome}`, senza prefisso | `Button`, `Card`, `Badge`, `Input` |
| Feature | `{Feature}{Nome}` | `PurchaseForm`, `UrgentActionsList`, `ActionCard` |
| Page-level | `{Page}Header` | `PageHeader`, `SectionHeader` |
| Badge specializzati | `{Dominio}Badge` | `StatusBadge`, `DeadlineBadge` |

`UrgencyBadge` non esiste come componente separato: è `DeadlineBadge`. `ActionCard` è in `features/shared/components/`, usato con `variant` da Dashboard e Actions Needed.

### 6.2 Props

```ts
{ComponentName}Props  // es. ButtonProps, CardProps
```

### 6.3 File

| Tipo | Pattern | Esempi |
|------|---------|--------|
| Componente | `{Nome}.tsx` | `Button.tsx`, `PurchaseForm.tsx` |
| Hook | `use{Nome}.ts` | `usePurchaseForm.ts`, `useIsMobile.ts` |
| Mapper | `{feature}-view.mapper.ts` | `dashboard-view.mapper.ts` |
| Types | `types.ts` | `types.ts` (feature-level) |

### 6.4 Hierarchical naming

Quando un componente ha figli privati:

```
PurchaseDetail/
  PurchaseTimeline.tsx       // componente esportato
  TimelineEvent.tsx          // componente interno, non esportato dal barrel
```

Non prefissare con `Purchase` se già dentro la feature directory.

---

## 7. Anti-Patterns (cross-component)

### 7.1 Signal Color Abuse

❌ Usare `--signal-red` per un pulsante "Elimina" decorativo  
❌ Usare `--signal-green` per un badge "Categoria Elettronica"  
❌ Colorare icone con signal color senza contesto di urgenza  

✅ Signal color solo in `DeadlineBadge` e `Card variant="urgent"`  
✅ Badge generici usano `neutral`  

### 7.2 Card Overuse

❌ Ogni singolo elemento in una Card  
❌ Card dentro Card (nested cards)  
❌ Card con un solo dato (es. solo il prezzo)  

✅ Card per gruppi di dati correlati (prodotto + store + prezzo + stato)  
✅ Card per sezioni logiche (deadline panel, documents panel)  

### 7.3 Premature Abstraction

❌ Creare un `DataTable` generico prima di avere ≥2 tabelle  
❌ Creare un `FormField` wrapper prima di avere pattern ripetuti 3+ volte  
❌ Astrarre `useAsync` come hook generico  

✅ Duplica una volta, astrai alla terza occorrenza  
✅ I componenti shared UI nascono da refactoring, non da design upfront  

### 7.4 Client-Heavy Components

❌ `'use client'` su tutto il page tree  
❌ Calcolare deadline in un `useEffect`  
❌ Passare Prisma model direttamente a Client Component  

✅ Server Component di default, Client solo per interattività  
✅ Deadline pre-calcolate server-side, ricevute come stringhe  
✅ View model tramite mapper prima di arrivare al Client Component  

### 7.5 Toast-Only Errors

❌ Errore validazione form mostrato solo in un toast  
❌ Errore submit che cancella i valori inseriti  
❌ "Something went wrong" generico senza contesto  

✅ Errori inline sul campo specifico  
✅ Valori preservati dopo errore server  
✅ Messaggi human-readable, specifici, rassicuranti  

### 7.6 Decorative Empty States

❌ "No data" in grigio chiaro  
❌ Icona triste 😢  
❌ Empty state senza CTA quando un'azione è possibile  

✅ "Tutto sotto controllo" + icona check  
✅ "Nessun acquisto" + CTA "Aggiungi il primo"  
✅ Linguaggio positivo, non di mancanza  

### 7.7 Dashboard Widget-itis

❌ Grafici, "ultimo accesso", metriche di vanità  
❌ Card decorative senza azione associata  
❌ Bento-box layout gratuito  

✅ Solo dati che portano a un'azione o decisione  
✅ Summary strip: numeri con significato immediato  
✅ Ogni card ha un motivo funzionale per esistere  

### 7.8 Inconsistent Mobile Experience

❌ Tabella desktop rimpicciolita su mobile (scroll orizzontale)  
❌ FAB che copre contenuto interattivo  
❌ Touch target < 44px  

✅ Card stack su mobile per ex-tabelle  
✅ `padding-bottom: 80px` su liste con FAB  
✅ Touch target ≥ 44px per ogni elemento interattivo  

---

## 8. Accessibility Baseline

### 8.1 Minimum Requirements (WCAG 2.1 AA)

1. **Color contrast:** testo ≥ 4.5:1 (normal), ≥ 3:1 (large text). Signal color su sfondo 10% verificato.
2. **Color is not the only indicator:** ogni stato è comunicato da colore + testo/icona.
3. **Keyboard navigation:** tutti gli elementi interattivi focussabili, ordine tab logico.
4. **Focus visible:** ring `2px solid --signal-blue`, offset 2px su ogni elemento interattivo.
5. **Labels:** ogni input ha `<label>` associato; ogni icon button ha `aria-label`.
6. **Touch targets:** ≥ 44×44px su tutti i dispositivi touch.
7. **Screen reader:** headings in ordine gerarchico (h1 → h2 → h3), liste sematiche (`<ul>`, `<ol>`, `<table>`).
8. **Dynamic content:** `aria-busy` durante loading, `aria-live="polite"` per aggiornamenti inline, `role="alert"` per errori critici.

### 8.2 Component-Specific

| Component | Requirement |
|-----------|-------------|
| `Button` | `aria-disabled` (non `disabled`) durante pending per mantenere focus |
| `Input` | `aria-invalid` + `aria-describedby` per errori |
| `Select` | `<label>` associato, opzione loading come disabled |
| `DeadlineBadge` | `aria-label="Urgenza: {urgency}. {label}"` |
| `EmptyState` | Titolo in heading tag (h2/h3) |
| `ErrorState` | `role="alert"` sul contenitore |
| `LoadingState` | `aria-busy="true"`, `aria-label="Caricamento in corso"` |
| `Timeline` | `<ol>` semantico, `<time>` per date |
| `Card` (navigabile) | `<a>` wrapper nativo, focus ring sull'intera card |

### 8.3 Form Accessibility

- Errori annunciati via `aria-live` region
- Campo in errore focussato automaticamente dopo submit fallito
- `autocomplete` appropriato su campi standard (name, email, url)
- Tastiera numerica su mobile per campi prezzo/giorni/mesi (`inputMode="numeric"`)

---

## 9. Component-Context Matrix

Dove ogni shared component appare:

| Component | Dashboard | Actions Needed | Purchase List | Purchase Detail | Purchase Form |
|-----------|-----------|----------------|---------------|-----------------|---------------|
| `Button` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `Card` | ✓ | ✓ | ✓ | ✓ | — |
| `Badge` | ✓ | — | ✓ | ✓ | — |
| `StatusBadge` | ✓ | — | ✓ | ✓ | — |
| `DeadlineBadge` | ✓ | ✓ | ✓ | ✓ | — |
| `Input` | — | — | ✓ | — | ✓ |
| `Select` | — | — | ✓ | ✓ | ✓ |
| `Textarea` | — | — | — | — | ✓ |
| `EmptyState` | ✓ | ✓ | ✓ | ✓ | — |
| `ErrorState` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `LoadingState` | ✓ | ✓ | ✓ | ✓ | — |
| `PageHeader` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `SectionHeader` | ✓ | ✓ | — | ✓ | — |

---

## 10. Notes for the Coding Agent

### 10.1 Implementation Order

1. **Design tokens** (CSS custom properties o Tailwind config)
2. **Shared UI foundation** (Button, Input, Card, Badge) — senza varianti non usate
3. **StatusBadge + DeadlineBadge** — critical path per dashboard e list
4. **EmptyState + ErrorState + LoadingState** — ogni pagina li usa
5. **PageHeader + SectionHeader** — shell di ogni pagina
6. **Dashboard feature** — primo flusso end-to-end
7. **Purchase List + Filters**
8. **Purchase Detail + Timeline**
9. **Purchase Form**
10. **Actions Needed**

### 10.2 Start Small

- Non costruire `DeadlineBadge` con tutte le 5 varianti il primo giorno. Inizia con `overdue` e `due_soon` (quelle usate dal dashboard), aggiungi le altre quando servono.
- `Button` inizia con `primary` e `secondary`. `ghost` e `danger` quando servono.
- `Card` inizia con `default`. `elevated` e `urgent` quando arriva il dashboard.

### 10.3 Shared UI Principles

- **Un file per componente.** No `Button/index.tsx` con 3 file interni. `Button.tsx` e basta.
- **No `cn()` utility wrapper** se non serve. Tailwind purtroppo richiede `clsx` o `tailwind-merge` per classi condizionali; installa `clsx` (già in `frontend.md` come standard).
- **Props esplicite.** No `...rest` spread su componenti con logica interna.
- **Export singolo.** `export function Button(...)`, no default export.
- **Barrel file** (`index.ts`) solo a livello feature, non per shared UI (import diretto).

### 10.4 Color Implementation (Tailwind)

```js
// tailwind.config.js
colors: {
  signal: {
    red: '#DC2626',
    amber: '#D97706',
    blue: '#2563EB',
    green: '#16A34A',
    gray: '#6B7280',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    700: '#404040',
    900: '#171717',
  }
}
```

### 10.5 View Models Are Mandatory

Nessun componente UI (shared o feature) riceve un Prisma model grezzo. I dati passano attraverso mapper che producono view model con:
- Date formattate
- Prezzi in Euro (da centesimi)
- Urgency come stringa (`'overdue'`, non un enum numerico)
- Label human-readable
- Flag booleani per condizionali UI

### 10.5bis Action Reason Generation (mapper logic)

Le stringhe human-readable per `ActionCard.reason` e `ActionReason` sono generate nel mapper `action-needed-view.mapper.ts`. Il server fornisce dati grezzi (`urgency`, `domain`, `deadline`); il mapper produce la stringa italiana.

**Mappatura:**

| urgency | domain | condition | reason text |
|---------|--------|-----------|-------------|
| `overdue` | `return` | returnDeadline < today | `"Reso scaduto"` |
| `due_soon` | `return` | returnDeadline − today ≤ 7 | `"Reso entro ${n} giorni"` |
| `upcoming` | `return` | returnDeadline − today ≤ 30 | `"Reso entro ${n} giorni"` |
| `overdue` | `refund` | refundPendingDays > 30 | `"Rimborso in ritardo"` |
| `due_soon` | `refund` | refundPendingDays > 7 | `"Rimborso in attesa da ${n} giorni"` |
| `upcoming` | `refund` | refundPendingDays > 0 | `"Rimborso in attesa"` |
| `due_soon` | `warranty` | warrantyDeadline − today ≤ 30 | `"Garanzia in scadenza"` |
| `upcoming` | `receipt` | receipt missing | `"Ricevuta mancante"` |
| `upcoming` | `warranty` | none | `"Monitoraggio consigliato"` |

**Deadline label (formattata separatamente da `DeadlineBadge`):**
- Eventi entro 7 giorni: `"Scade tra ${n} giorni"`
- Eventi oltre 7 giorni: `"Scade il ${data}"`
- Già scaduto: `"Scaduto il ${data}"`
- Rimborso pending: `"In attesa da ${n} giorni"`
- Mesi rimanenti (garanzia): `"${n} mesi rimanenti"`

Questa logica vive ESCLUSIVAMENTE nel mapper. I componenti ricevono stringhe già formattate.

### 10.6 ponytail Notes

- `ponytail: Badge, StatusBadge, DeadlineBadge sono tre componenti invece di uno con 15 varianti. La specializzazione riduce la superficie di errore.`
- `ponytail: niente DataTable generico. Due casi: tabella HTML per desktop, card stack per mobile. Se arriva una terza tabella, estrai il pattern.`
- `ponytail: niente cn() wrapper custom. clsx copre classi condizionali; tailwind-merge solo se conflitti diventano reali.`
- `ponytail: design tokens come CSS custom properties in `:root`, non come layer di astrazione JS.`
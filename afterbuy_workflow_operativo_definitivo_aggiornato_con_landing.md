# AfterBuy - Workflow operativo definitivo aggiornato

## Stato attuale

Sono state completate tutte le fasi fino alla **Fase 6 - Landing Page & Marketing Presentation**.

Il progetto AfterBuy è stato riallineato al nuovo posizionamento:

**Software Engineer frontend-leaning con backend reale ma leggero.**

L'obiettivo non è creare una semplice demo frontend, ma un micro-prodotto full-stack leggero, documentato e progettato con criterio.

Prima degli ADR vengono introdotte due parti fondamentali:

1. **Fase 5 - Design Direction & UI Quality con Impeccable**, suddivisa in micro-fasi.
2. **Fase 6 - Landing Page & Marketing Presentation**, per presentare AfterBuy come prodotto reale anche mentre è ancora work in progress.

La landing page non deve essere una vetrina fittizia o separata dall'applicazione. Deve essere una parte integrante del progetto Next.js e deve spiegare chiaramente:

- problema affrontato;
- valore del prodotto;
- funzionalità previste;
- stato reale dello sviluppo;
- accesso alla demo/app tramite CTA come **Open App** o **Try the Demo**.

È importante non dichiarare come disponibili funzionalità non ancora implementate. Lo stato work in progress deve essere comunicato con trasparenza.

---

## Regola generale del workflow

Ogni fase deve usare come input i risultati delle fasi precedenti.

Formula da usare all'inizio di ogni prompt:

```txt
Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.
```

---

# Tabella generale aggiornata

| Ordine | Fase | Strumento | Stato | Output |
|---:|---|---|---|---|
| 0 | Project Charter update | ChatGPT | COMPLETATA | `docs/product/project-charter.md` |
| 1 | Feasibility / stack update | ChatGPT | COMPLETATA | `docs/product/feasibility-study.md` |
| 2 | MVP update | ChatGPT | COMPLETATA | `docs/product/mvp-scope.md`, `docs/product/user-journey.md` |
| 3 | Full-stack architecture update | ChatGPT | COMPLETATA | `docs/architecture/overview.md`, `frontend.md`, `backend.md`, `testing.md` |
| 4 | Data model / API | ChatGPT | COMPLETATA | `docs/architecture/data-model.md`, `docs/architecture/api-design.md` |
| 5.1 | Design Brief & Product Feel | Impeccable / ChatGPT | COMPLETATA | `docs/design/design-brief.md` |
| 5.2 | Screen Specifications | Impeccable / ChatGPT | COMPLETATA | `docs/design/screen-specs.md` |
| 5.3 | Lightweight Design System | Impeccable / ChatGPT | COMPLETATA | `docs/design/design-system.md` |
| 5.4 | UX States, Microcopy & Mobile Rules | Impeccable / ChatGPT | COMPLETATA | `docs/design/ux-states.md` |
| 5.5 | Impeccable Review & Design Handoff | Impeccable / ChatGPT | COMPLETATA | `docs/design/impeccable-review.md` |
| 6 | Landing Page & Marketing Presentation | Impeccable / ChatGPT | COMPLETATA | `docs/marketing/*.md` |
| 7 | ADR | ChatGPT | COMPLETATA | `docs/adr/*.md` |
| 8 | README | ChatGPT | COMPLETATA | `README.md` |
| 9 | AGENTS.md + coding-agent prompts | ChatGPT | DA FARE | `AGENTS.md`, `prompts/coding-agent/*.md` |
| 10 | Scaffold | Coding agent | DA FARE | repo iniziale |
| 11 | Landing page implementation | Coding agent | DA FARE | landing integrata nel progetto Next.js |
| 12 | Data model / seed | Coding agent | DA FARE | Prisma + seed + Zod |
| 13 | UI foundation | Coding agent | DA FARE | componenti base |
| 14 | Business logic | Coding agent | DA FARE | funzioni dominio + unit test |
| 15 | Dashboard | Coding agent | DA FARE | dashboard reale |
| 16 | Purchases feature | Coding agent | DA FARE | lista/form/detail/timeline |
| 17 | Testing | Coding agent | DA FARE | unit/component/e2e |
| 18 | Polish | Coding agent | DA FARE | demo-ready |
| 19 | Review | ChatGPT / DeepSeek Pro | DA FARE | review critica |
| 20 | Pitch / social | ChatGPT | DA FARE | pitch + LinkedIn/X |

---

# Fase 0 - Project Charter update

## Stato

COMPLETATA

## Strumento

ChatGPT

## Input

```txt
Documento strategico iniziale
Decisione: AfterBuy sarà il primo progetto portfolio
Nuovo posizionamento: Software Engineer frontend-leaning con backend reale ma leggero
```

## Output

```txt
docs/product/project-charter.md
```

## Prompt usato

```txt
Agisci come Product Strategist e Senior Frontend Portfolio Advisor.

Usa il documento strategico iniziale come fonte di verità.

Devo aggiornare il Project Charter di AfterBuy.

Contesto:
AfterBuy è un micro-prodotto portfolio per la gestione post-acquisto: resi, rimborsi, garanzie, ricevute, manuali, assistenza e scadenze.

Nuovo posizionamento:
il progetto deve comunicare competenze da Software Engineer frontend-leaning, quindi frontend forte ma anche backend leggero, data modeling, validazioni, persistenza, business logic, testing e documentazione.

Non voglio trasformare il progetto in un backend-heavy project.

Aggiorna il Project Charter includendo:

1. product vision;
2. problem statement;
3. target users;
4. value proposition;
5. portfolio objective;
6. technical positioning update;
7. MVP scope sintetico;
8. non-obiettivi;
9. success criteria;
10. documentazione prevista.

Output:
docs/product/project-charter.md
```

---

# Fase 1 - Feasibility / stack update

## Stato

COMPLETATA

## Strumento

ChatGPT

## Input

```txt
docs/product/project-charter.md
Documento strategico iniziale
```

## Output

```txt
docs/product/feasibility-study.md
```

## Prompt usato

```txt
Agisci come Product Strategist, Senior Frontend Architect e Software Engineer frontend-leaning.

Usa come fonte di verità:
- docs/product/project-charter.md
- il documento strategico iniziale
- la decisione di costruire AfterBuy come primo progetto portfolio

Obiettivo:
riallineare la fattibilità tecnica di AfterBuy al nuovo posizionamento da Software Engineer frontend-leaning.

Nuovo vincolo:
voglio mostrare non solo frontend UI, ma anche backend leggero, data modeling, validazione, persistenza, business logic e testing.

Non voglio però trasformare il progetto in un backend-heavy project.

Valuta queste opzioni:

1. Next.js full-stack in un unico repository;
2. React + Vite frontend-only;
3. frontend Next.js + backend separato;
4. monorepo frontend/backend;
5. TanStack Start come alternativa moderna.

Produci:

1. raccomandazione stack finale;
2. perché Next.js full-stack è o non è adatto;
3. livello di backend da includere nell'MVP;
4. cosa tenere fuori per evitare scope creep;
5. trade-off portfolio;
6. rischi tecnici;
7. decisione finale da documentare negli ADR.

Output:
docs/product/feasibility-study.md
```

---

# Fase 2 - MVP update

## Stato

COMPLETATA

## Strumento

ChatGPT

## Input

```txt
docs/product/project-charter.md
docs/product/feasibility-study.md
```

## Output

```txt
docs/product/mvp-scope.md
docs/product/user-journey.md
```

## Prompt usato

```txt
Agisci come Product Manager tecnico.

Usa come fonte di verità:
- docs/product/project-charter.md
- docs/product/feasibility-study.md

AfterBuy sarà costruito come lightweight full-stack product con Next.js, TypeScript, Prisma e Zod.

Aggiorna l'MVP definitivo includendo una parte backend reale ma leggera.

Il prodotto deve mantenere scope controllato e non diventare backend-heavy.

MVP di partenza:
- dashboard con azioni urgenti;
- lista acquisti;
- form aggiunta/modifica acquisto;
- dettaglio acquisto;
- timeline post-acquisto;
- calcolo return deadline;
- calcolo warranty expiration;
- stati return/refund/warranty;
- receipt/manual/support info mock;
- filtri;
- responsive design;
- test minimi.

Aggiungi:
- persistenza dati;
- data model MVP;
- validazione input;
- server-side mutations;
- business logic testabile;
- seed data realistici.

Produci:

1. MVP statement aggiornato;
2. must-have frontend;
3. must-have backend;
4. should-have;
5. could-have;
6. non-obiettivi;
7. user journey principale;
8. edge cases;
9. empty/error/loading states;
10. data requirements;
11. criteri per dire "MVP pronto per GitHub".

Output:
docs/product/mvp-scope.md
docs/product/user-journey.md
```

---

# Fase 3 - Full-stack architecture update

## Stato

COMPLETATA

## Strumento

ChatGPT

## Input

```txt
docs/product/project-charter.md
docs/product/feasibility-study.md
docs/product/mvp-scope.md
docs/product/user-journey.md
```

## Output

```txt
docs/architecture/overview.md
docs/architecture/frontend.md
docs/architecture/backend.md
docs/architecture/testing.md
```

## Prompt usato

```txt
Agisci come Senior Frontend Architect e Software Engineer frontend-leaning.

Usa come fonte di verità:
- docs/product/project-charter.md
- docs/product/feasibility-study.md
- docs/product/mvp-scope.md
- docs/product/user-journey.md

AfterBuy sarà un progetto Next.js full-stack leggero.

Obiettivo:
definire un'architettura professionale, non over-engineered, che mostri competenze frontend forti e consapevolezza backend.

Definisci:

1. architecture overview;
2. struttura cartelle;
3. responsabilità di app/features/entities/shared/server;
4. frontend architecture;
5. backend lightweight architecture;
6. data access layer;
7. domain logic layer;
8. Prisma usage;
9. Zod validation boundary;
10. Server Actions vs Route Handlers;
11. gestione form;
12. gestione error/loading/empty states;
13. testing strategy;
14. naming convention;
15. anti-pattern da evitare;
16. cosa documentare negli ADR.

Output:
docs/architecture/overview.md
docs/architecture/frontend.md
docs/architecture/backend.md
docs/architecture/testing.md
```

---

# Fase 4 - Data model / API

## Stato

COMPLETATA

## Strumento

ChatGPT

## Input

```txt
docs/product/project-charter.md
docs/product/feasibility-study.md
docs/product/mvp-scope.md
docs/product/user-journey.md
docs/architecture/overview.md
docs/architecture/frontend.md
docs/architecture/backend.md
docs/architecture/testing.md
```

## Output

```txt
docs/architecture/data-model.md
docs/architecture/api-design.md
```

## Prompt usato

```txt
Agisci come Software Engineer full-stack frontend-leaning.

Usa come fonte di verità:
- docs/product/project-charter.md
- docs/product/feasibility-study.md
- docs/product/mvp-scope.md
- docs/product/user-journey.md
- docs/architecture/overview.md
- docs/architecture/frontend.md
- docs/architecture/backend.md
- docs/architecture/testing.md

Definisci il modello dati e i confini backend/API di AfterBuy.

Il progetto usa:
- Next.js full-stack;
- TypeScript;
- Prisma;
- Zod;
- backend leggero;
- business logic testabile.

Entità candidate:
- Purchase
- Store
- ReturnCase
- Refund
- Warranty
- PurchaseDocument
- TimelineEvent

Produci:

1. modello dati concettuale;
2. entità MVP;
3. entità future/non-MVP;
4. campi per ogni entità;
5. relazioni;
6. enum e stati;
7. regole di business;
8. schema Prisma indicativo;
9. schema Zod indicativo;
10. Server Actions consigliate;
11. Route Handlers eventualmente necessari;
12. seed data consigliati;
13. edge cases;
14. cosa evitare nell'MVP.

Output:
docs/architecture/data-model.md
docs/architecture/api-design.md
```

---

# Fase 5 - Design Direction & UI Quality con Impeccable

## Stato

COMPLETATA

## Strumento

Impeccable / ChatGPT

## Perché inserirla

Questa fase serve a evitare che AfterBuy sembri:

- una dashboard generica;
- una UI "AI generated";
- un clone SaaS;
- un insieme di schermate non coerenti;
- un progetto tecnicamente valido ma visivamente debole.

L'obiettivo è trasformare AfterBuy in un prodotto con una direzione UI chiara, coerente e professionale.

Questa fase non deve sostituire l'architettura frontend. Deve completarla.

Per aumentare la qualità, la fase design viene divisa in micro-fasi.

---

# Fase 5.1 - Design Brief & Product Feel

## Stato

COMPLETATA

## Strumento

Impeccable / ChatGPT

## Input

```txt
docs/product/project-charter.md
docs/product/feasibility-study.md
docs/product/mvp-scope.md
docs/product/user-journey.md
docs/architecture/overview.md
```

## Output

```txt
docs/design/design-brief.md
```

## Obiettivo

Definire il feeling del prodotto, la direzione UX generale e cosa AfterBuy deve comunicare.

Questa fase serve a chiarire:

- che tipo di prodotto deve sembrare AfterBuy;
- quale tono deve avere;
- cosa deve comunicare all'utente;
- cosa deve evitare;
- perché non deve sembrare una dashboard SaaS generica;
- come deve convivere la parte applicativa con una landing page reale e trasparente.

## Prompt

```txt
Agisci come Senior Product Designer e UX Strategist usando il metodo Impeccable.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- docs/product/project-charter.md
- docs/product/feasibility-study.md
- docs/product/mvp-scope.md
- docs/product/user-journey.md
- docs/architecture/overview.md

Contesto:
AfterBuy è un micro-prodotto full-stack leggero per la gestione post-acquisto.

Aiuta gli utenti a gestire:

- resi;
- rimborsi;
- garanzie;
- ricevute;
- manuali;
- supporto;
- scadenze;
- azioni urgenti.

Obiettivo UX principale:
aiutare l'utente a capire subito cosa deve fare oggi o questa settimana per non perdere soldi dopo un acquisto.

Target:

- online shoppers;
- famiglie;
- studenti;
- freelance;
- utenti comuni che acquistano da più store.

Obiettivo portfolio:
AfterBuy deve comunicare competenze da Software Engineer frontend-leaning, con forte attenzione a frontend architecture, product thinking, backend leggero, data model, validazione, testing e qualità UI.

Nuovo vincolo:
il progetto verrà mostrato anche mentre è ancora work in progress. Per questo dovrà includere una landing page reale di presentazione prodotto, integrata nel progetto Next.js, con CTA verso la demo/app.

Compito:
definisci il Design Brief di AfterBuy usando un approccio Impeccable.

Voglio evitare:

- AI-slop;
- dashboard generiche;
- gradienti casuali;
- layout troppo piatti;
- UI da template admin;
- componenti non coerenti;
- mobile trattato come semplice riduzione del desktop;
- microcopy generica;
- stati empty/error/loading trascurati;
- landing page fittizia o separata dal prodotto;
- promesse marketing non ancora supportate dal prodotto.

Produci:

1. product design context;
2. target users;
3. UX goal principale;
4. product feel;
5. visual personality;
6. cosa deve comunicare il prodotto;
7. cosa deve evitare;
8. differenza tra "consumer utility" e "generic SaaS dashboard";
9. principi guida per tutte le schermate;
10. principi guida per la landing page;
11. design risks;
12. quality bar;
13. note per le prossime sotto-fasi design.

Output:
docs/design/design-brief.md
```

---

# Fase 5.2 - Screen Specifications

## Stato

COMPLETATA

## Strumento

Impeccable / ChatGPT

## Input

```txt
docs/design/design-brief.md
docs/product/mvp-scope.md
docs/product/user-journey.md
docs/architecture/frontend.md
docs/architecture/data-model.md
```

## Output

```txt
docs/design/screen-specs.md
```

## Obiettivo

Definire le schermate principali prima di ragionare sui dettagli dei componenti.

Questa fase serve a chiarire:

- cosa deve fare ogni schermata;
- quale domanda utente risolve;
- quali informazioni mostra;
- quali componenti usa;
- quali stati deve prevedere;
- come deve adattarsi al mobile;
- come la landing introduce il prodotto e porta l'utente verso la demo/app.

## Prompt

```txt
Agisci come UX Architect e Product Designer usando il metodo Impeccable.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- docs/design/design-brief.md
- docs/product/mvp-scope.md
- docs/product/user-journey.md
- docs/architecture/frontend.md
- docs/architecture/data-model.md

Definisci le screen specification di AfterBuy.

Schermate da specificare:

- Landing Page
- Dashboard page
- Purchase List
- Purchase Detail
- Add Purchase Flow
- Post-purchase Timeline
- Actions Needed View
- Mobile Landing Page
- Mobile Dashboard
- Mobile Purchase List

Per ogni schermata indica:

1. obiettivo della schermata;
2. domanda utente a cui risponde;
3. contenuto principale;
4. gerarchia visiva;
5. componenti necessari;
6. azioni principali;
7. stati da prevedere;
8. versione desktop;
9. versione mobile, se rilevante;
10. cosa evitare;
11. criteri di accettazione.

Per la Landing Page indica anche:

1. hero section;
2. problem section;
3. value proposition;
4. feature sections;
5. work-in-progress transparency section;
6. CTA verso Open App / Try the Demo;
7. roadmap o planned features;
8. cosa può essere dichiarato come disponibile;
9. cosa deve essere dichiarato come in sviluppo.

Output:
docs/design/screen-specs.md
```

---

# Fase 5.3 - Lightweight Design System

## Stato

COMPLETATA

## Strumento

Impeccable / ChatGPT

## Input

```txt
docs/design/design-brief.md
docs/design/screen-specs.md
docs/architecture/frontend.md
```

## Output

```txt
docs/design/design-system.md
```

## Obiettivo

Definire un design system leggero, sufficiente per implementare AfterBuy in modo coerente senza creare una UI library enorme.

Questa fase serve a chiarire:

- componenti principali;
- responsabilità dei componenti;
- varianti;
- naming;
- criteri responsive;
- criteri di accessibilità;
- anti-pattern da evitare;
- componenti utili sia alla landing sia all'app.

## Prompt

```txt
Agisci come Design System Architect usando il metodo Impeccable.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/architecture/frontend.md

Definisci un design system leggero per AfterBuy.

Il design system deve essere sufficiente per implementare un prodotto coerente, ma non deve diventare una UI library complessa.

Produci:

1. principi del design system;
2. component inventory;
3. responsabilità di ogni componente;
4. varianti principali;
5. quando usare ogni componente;
6. componenti specifici per landing page;
7. componenti condivisi tra landing e app;
8. anti-pattern;
9. naming suggerito;
10. criteri di accessibilità;
11. indicazioni responsive;
12. note per il coding agent.

Componenti minimi:

- Button
- Card
- Badge
- StatusBadge
- DeadlineBadge
- Input
- Select
- Textarea
- DataList/Table
- EmptyState
- ErrorState
- LoadingState
- Timeline
- ActionCard
- PageHeader
- SectionHeader
- MarketingHero
- FeatureCard
- ProductStatusBadge
- RoadmapCard
- CTASection

Output:
docs/design/design-system.md
```

---

# Fase 5.4 - UX States, Microcopy & Mobile Rules

## Stato

COMPLETATA

## Strumento

Impeccable / ChatGPT

## Input

```txt
docs/design/design-brief.md
docs/design/screen-specs.md
docs/design/design-system.md
docs/product/user-journey.md
```

## Output

```txt
docs/design/ux-states.md
```

## Obiettivo

Definire gli stati UX e la microcopy, cioè le parti che spesso distinguono un progetto portfolio mediocre da un prodotto realmente curato.

Questa fase include:

- empty states;
- loading states;
- error states;
- validation messages;
- microcopy;
- mobile UX rules;
- accessibility notes;
- copy trasparente per lo stato work in progress della landing.

## Prompt

```txt
Agisci come UX Writer, Product Designer e Frontend UX Reviewer usando il metodo Impeccable.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/design/design-system.md
- docs/product/user-journey.md

Definisci gli UX states e la microcopy di AfterBuy.

Produci:

1. empty states per ogni schermata principale;
2. loading states;
3. error states;
4. validation messages;
5. microcopy per CTA;
6. microcopy per urgent actions;
7. microcopy per deadline e stati;
8. microcopy per landing page;
9. microcopy per work-in-progress transparency;
10. mobile UX rules;
11. accessibility notes;
12. cosa evitare.

Gli stati devono sembrare realistici, utili e product-oriented.
Non usare testi generici tipo "Something went wrong" se puoi essere più specifico.
Non presentare feature non implementate come già disponibili.

Output:
docs/design/ux-states.md
```

---

# Fase 5.5 - Impeccable Review & Design Handoff

## Stato

COMPLETATA

## Strumento

Impeccable / ChatGPT

## Input

```txt
docs/design/design-brief.md
docs/design/screen-specs.md
docs/design/design-system.md
docs/design/ux-states.md
docs/product/mvp-scope.md
docs/architecture/frontend.md
```

## Output

```txt
docs/design/impeccable-review.md
```

## Obiettivo

Fare una review finale della fase design prima della landing strategy, degli ADR e del coding agent.

Questa fase serve a produrre:

- checklist Impeccable;
- criteri di accettazione;
- note per il coding agent;
- decisioni design da documentare negli ADR;
- eventuali problemi da correggere prima dell'implementazione;
- controllo di coerenza tra landing e applicazione.

## Prompt

```txt
Agisci come Impeccable Design Reviewer.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/design/design-system.md
- docs/design/ux-states.md
- docs/product/mvp-scope.md
- docs/architecture/frontend.md

Fai una review critica della design direction di AfterBuy.

Valuta:

1. coerenza prodotto;
2. rischio generic SaaS/admin dashboard;
3. qualità UX;
4. chiarezza dashboard;
5. qualità landing page;
6. trasparenza dello stato work in progress;
7. qualità dei flussi;
8. completezza degli stati;
9. qualità mobile;
10. component strategy;
11. microcopy;
12. implementabilità con coding agent.

Produci:

1. punti forti;
2. punti deboli;
3. problemi da correggere prima dell'implementazione;
4. checklist Impeccable;
5. criteri di accettazione per il coding agent;
6. note da includere negli ADR;
7. decisioni design da documentare;
8. note specifiche per la fase Landing Page & Marketing Presentation.

Output:
docs/design/impeccable-review.md
```

---

# Fase 6 - Landing Page & Marketing Presentation

## Stato

COMPLETATA

## Strumento

Impeccable / ChatGPT

## Perché inserirla

Poiché il progetto verrà mostrato già durante lo sviluppo, conviene realizzare inizialmente una landing page che lo presenti come un prodotto reale.

La landing non deve essere una vetrina fittizia o separata dall'applicazione, ma una parte integrante del progetto Next.js.

Deve spiegare chiaramente:

- il problema affrontato;
- il valore del prodotto;
- le funzionalità previste;
- lo stato attuale dello sviluppo;
- il collegamento alla parte applicativa tramite CTA come **Open App** o **Try the Demo**.

Questo permette a recruiter e aziende di comprendere immediatamente il prodotto, anche quando alcune funzionalità sono ancora in lavorazione.

È però importante non mostrare come disponibili feature non ancora implementate. Lo stato work in progress deve essere comunicato con trasparenza.

## Input

```txt
docs/product/project-charter.md
docs/product/feasibility-study.md
docs/product/mvp-scope.md
docs/product/user-journey.md
docs/architecture/overview.md
docs/architecture/frontend.md
docs/architecture/data-model.md
docs/design/design-brief.md
docs/design/screen-specs.md
docs/design/design-system.md
docs/design/ux-states.md
docs/design/impeccable-review.md
```

## Output

```txt
docs/marketing/landing-page-brief.md
docs/marketing/landing-page-structure.md
docs/marketing/landing-page-copy.md
docs/marketing/wip-transparency.md
```

## Obiettivo

Definire una landing page reale, coerente con il prodotto e pronta a essere implementata nel progetto Next.js.

Questa fase deve produrre una landing che funzioni come:

- presentazione marketing;
- porta di ingresso al prodotto;
- asset portfolio;
- spiegazione chiara per recruiter e aziende;
- punto di accesso alla demo/app;
- comunicazione trasparente dello stato work in progress.

## Prompt

```txt
Agisci come Product Marketing Strategist, Senior Product Designer e UX Writer usando il metodo Impeccable.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- docs/product/project-charter.md
- docs/product/feasibility-study.md
- docs/product/mvp-scope.md
- docs/product/user-journey.md
- docs/architecture/overview.md
- docs/architecture/frontend.md
- docs/architecture/data-model.md
- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/design/design-system.md
- docs/design/ux-states.md
- docs/design/impeccable-review.md

Contesto:
AfterBuy è un micro-prodotto full-stack leggero per la gestione post-acquisto.

Il progetto verrà mostrato anche mentre è ancora work in progress.

Obiettivo:
definire una landing page reale, integrata nel progetto Next.js, che presenti AfterBuy come prodotto credibile senza fingere che tutte le funzionalità siano già complete.

La landing deve:

- spiegare il problema;
- comunicare il valore;
- presentare le funzionalità previste;
- distinguere chiaramente tra feature disponibili, demo e feature in sviluppo;
- avere una CTA verso la parte applicativa, come "Open App" o "Try the Demo";
- sembrare parte del prodotto, non una pagina esterna;
- essere utile a recruiter, aziende e lettori del portfolio.

Voglio evitare:

- hype finto;
- promesse non vere;
- landing scollegata dall'app;
- marketing generico;
- testi vaghi;
- claim troppo esagerati;
- feature non implementate presentate come già disponibili;
- pagina "portfolio project" troppo debole;
- pagina "startup fake" troppo spinta.

Produci:

1. landing page positioning;
2. primary audience;
3. page goal;
4. main message;
5. hero section;
6. problem section;
7. value proposition section;
8. feature sections;
9. "what works now" section;
10. "work in progress" section;
11. roadmap / planned improvements section;
12. CTA strategy;
13. Open App / Try the Demo behavior;
14. copy completa della landing;
15. microcopy per stato work in progress;
16. visual/content hierarchy;
17. componenti necessari;
18. responsive behavior;
19. SEO/social preview notes;
20. cosa evitare;
21. acceptance criteria per il coding agent.

Output:
docs/marketing/landing-page-brief.md
docs/marketing/landing-page-structure.md
docs/marketing/landing-page-copy.md
docs/marketing/wip-transparency.md
```

---

# Fase 7 — ADR

## Stato

COMPLETATA

## Strumento

ChatGPT

## Input

```txt
docs/product/project-charter.md
docs/product/feasibility-study.md
docs/product/mvp-scope.md
docs/product/user-journey.md
docs/architecture/overview.md
docs/architecture/frontend.md
docs/architecture/backend.md
docs/architecture/data-model.md
docs/architecture/api-design.md
docs/architecture/testing.md
docs/design/design-brief.md
docs/design/screen-specs.md
docs/design/design-system.md
docs/design/ux-states.md
docs/design/impeccable-review.md
docs/marketing/landing-page-brief.md
docs/marketing/landing-page-structure.md
docs/marketing/landing-page-copy.md
docs/marketing/wip-transparency.md
```

## Output

```txt
docs/adr/*.md
```

## Prompt da usare

```txt
Agisci come Staff Software Engineer.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- docs/product/project-charter.md
- docs/product/feasibility-study.md
- docs/product/mvp-scope.md
- docs/product/user-journey.md
- docs/architecture/overview.md
- docs/architecture/frontend.md
- docs/architecture/backend.md
- docs/architecture/data-model.md
- docs/architecture/api-design.md
- docs/architecture/testing.md
- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/design/design-system.md
- docs/design/ux-states.md
- docs/design/impeccable-review.md
- docs/marketing/landing-page-brief.md
- docs/marketing/landing-page-structure.md
- docs/marketing/landing-page-copy.md
- docs/marketing/wip-transparency.md

Genera gli ADR iniziali per AfterBuy.

Decisioni da documentare:

1. usare Next.js full-stack;
2. mantenere backend leggero;
3. usare feature-based architecture;
4. usare Prisma per data modeling;
5. usare Zod per validation boundaries;
6. tenere business logic fuori dai componenti React;
7. usare Server Actions o Route Handlers;
8. rimandare auth, upload reale e integrazioni esterne;
9. usare testing strategy con Vitest e Playwright;
10. usare documentazione tecnica come parte del valore portfolio;
11. adottare una design direction documentata;
12. usare Impeccable come design quality gate;
13. mantenere un design system leggero invece di una UI library complessa;
14. integrare una landing page reale nel progetto Next.js;
15. comunicare lo stato work in progress con trasparenza;
16. distinguere feature disponibili, demo e feature pianificate;
17. usare la landing come porta di accesso alla demo/app.

Per ogni ADR includi:

- title;
- status;
- context;
- decision;
- alternatives considered;
- consequences;
- trade-offs;
- portfolio value;
- related documents.

Output:
docs/adr/*.md
```

---

# Fase 8 - README

## Stato

COMPLETATA

## Strumento

ChatGPT

## Input

```txt
docs/product/*
docs/architecture/*
docs/design/*
docs/marketing/*
docs/adr/*
```

## Output

```txt
README.md
```

## Prompt da usare

```txt
Agisci come Senior Frontend Portfolio Advisor.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- docs/product/project-charter.md
- docs/product/feasibility-study.md
- docs/product/mvp-scope.md
- docs/product/user-journey.md
- docs/architecture/overview.md
- docs/architecture/frontend.md
- docs/architecture/backend.md
- docs/architecture/data-model.md
- docs/architecture/api-design.md
- docs/architecture/testing.md
- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/design/design-system.md
- docs/design/ux-states.md
- docs/design/impeccable-review.md
- docs/marketing/landing-page-brief.md
- docs/marketing/landing-page-structure.md
- docs/marketing/landing-page-copy.md
- docs/marketing/wip-transparency.md
- docs/adr/*.md

Scrivi un README GitHub professionale per AfterBuy.

Il README deve comunicare:

- problema reale;
- target utente;
- product thinking;
- stack Next.js/React/TypeScript;
- frontend architecture;
- backend leggero;
- data model;
- validation;
- testing;
- ADR;
- design direction;
- design quality process;
- landing page integrata;
- stato work in progress comunicato con trasparenza;
- roadmap;
- perché il progetto non è una demo.

Produci un README completo con:

1. Hero section;
2. Product context;
3. Problem;
4. Solution;
5. Target users;
6. Key features;
7. User journey;
8. Tech stack;
9. Architecture overview;
10. Data model;
11. Testing strategy;
12. Product decisions;
13. Design direction;
14. Landing page strategy;
15. Impeccable design quality process;
16. ADR links;
17. Roadmap;
18. Screenshots/demo placeholders;
19. Local setup;
20. Portfolio value;
21. What I would improve next.

Output:
README.md
```

---

# Fase 9 - AGENTS.md + coding-agent prompts

## Stato

DA FARE

## Strumento

ChatGPT

## Input

```txt
README.md
docs/product/*
docs/architecture/*
docs/design/*
docs/marketing/*
docs/adr/*
```

## Output

```txt
AGENTS.md
prompts/coding-agent/*.md
```

## Prompt da usare

```txt
Agisci come Prompt Engineer per coding agents.

Usa i risultati delle fasi precedenti come fonte di verità.
Non rimettere in discussione decisioni già prese, a meno che non ci sia una contraddizione evidente.
Se una scelta precedente limita il lavoro attuale, rispettala e segnala solo eventuali trade-off.

Usa come fonte di verità:

- README.md
- docs/product/*
- docs/architecture/*
- docs/design/*
- docs/marketing/*
- docs/adr/*

Devo preparare AfterBuy per l'implementazione con coding agent.

Crea:

1. AGENTS.md con le regole stabili del repository;
2. prompt operativo 001-project-scaffold.md;
3. prompt operativo 002-landing-page.md;
4. prompt operativo 003-data-model-and-seed.md;
5. prompt operativo 004-ui-foundation.md;
6. prompt operativo 005-business-logic.md;
7. prompt operativo 006-dashboard.md;
8. prompt operativo 007-purchases-feature.md;
9. prompt operativo 008-testing.md;
10. prompt operativo 009-polish.md.

Ogni prompt deve contenere:

- context;
- source of truth;
- task;
- constraints;
- what not to do;
- definition of done;
- design source of truth;
- marketing/landing source of truth, se rilevante;
- model suggestion: DeepSeek V4 Flash o V4 Pro.

Il coding agent dovrà rispettare anche:

- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/design/design-system.md
- docs/design/ux-states.md
- docs/design/impeccable-review.md
- docs/marketing/landing-page-brief.md
- docs/marketing/landing-page-structure.md
- docs/marketing/landing-page-copy.md
- docs/marketing/wip-transparency.md

Output:
AGENTS.md
prompts/coding-agent/*.md
```

---

# Fase 10 - Scaffold

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Flash

## Input

```txt
AGENTS.md
prompts/coding-agent/001-project-scaffold.md
README.md
docs/*
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

Then execute:
prompts/coding-agent/001-project-scaffold.md

Use the current repository state.
Before editing files, summarize what you understood and list files you will create or modify.
After implementation, run available checks and summarize results.
```

---

# Fase 11 - Landing page implementation

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Flash, con review DeepSeek V4 Pro o Impeccable se necessario

## Input

```txt
AGENTS.md
prompts/coding-agent/002-landing-page.md
docs/design/design-brief.md
docs/design/screen-specs.md
docs/design/design-system.md
docs/design/ux-states.md
docs/design/impeccable-review.md
docs/marketing/landing-page-brief.md
docs/marketing/landing-page-structure.md
docs/marketing/landing-page-copy.md
docs/marketing/wip-transparency.md
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

Then execute:
prompts/coding-agent/002-landing-page.md

Use:
- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/design/design-system.md
- docs/design/ux-states.md
- docs/design/impeccable-review.md
- docs/marketing/landing-page-brief.md
- docs/marketing/landing-page-structure.md
- docs/marketing/landing-page-copy.md
- docs/marketing/wip-transparency.md

Implement the landing page as an integrated part of the Next.js project.

Requirements:
- The landing must present AfterBuy as a real product.
- The landing must include a CTA to the app/demo, such as Open App or Try the Demo.
- The landing must clearly communicate the current work-in-progress status.
- Do not present unimplemented features as already available.
- Do not create a fake startup-style page disconnected from the actual app.
- Reuse the documented design system.
- Keep the page responsive and accessible.

After implementation, run available checks and summarize how the landing follows the design and marketing documents.
```

---

# Fase 12 - Data model / seed

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Pro review → DeepSeek V4 Flash implementation

## Input

```txt
AGENTS.md
prompts/coding-agent/003-data-model-and-seed.md
docs/architecture/data-model.md
docs/architecture/api-design.md
docs/adr/*
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

First review:
- docs/architecture/data-model.md
- docs/architecture/api-design.md

Then execute:
prompts/coding-agent/003-data-model-and-seed.md

Implement Prisma schema, seed data, Zod schemas and basic data access layer.
Do not implement UI in this task.
```

---

# Fase 13 - UI foundation

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Flash

## Input

```txt
AGENTS.md
prompts/coding-agent/004-ui-foundation.md
docs/architecture/frontend.md
docs/design/design-brief.md
docs/design/screen-specs.md
docs/design/design-system.md
docs/design/ux-states.md
docs/design/impeccable-review.md
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

Then execute:
prompts/coding-agent/004-ui-foundation.md

Use:
- docs/architecture/frontend.md
- docs/design/design-brief.md
- docs/design/screen-specs.md
- docs/design/design-system.md
- docs/design/ux-states.md
- docs/design/impeccable-review.md

Implement reusable UI foundation components.
Do not implement business pages yet.
Keep landing-specific reusable components aligned with the design system.
```

---

# Fase 14 - Business logic

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Pro per edge cases → DeepSeek V4 Flash implementation

## Input

```txt
AGENTS.md
prompts/coding-agent/005-business-logic.md
docs/product/mvp-scope.md
docs/architecture/data-model.md
docs/architecture/api-design.md
docs/architecture/testing.md
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

Then execute:
prompts/coding-agent/005-business-logic.md

Implement pure domain functions for:
- return deadline;
- warranty expiration;
- urgency level;
- refund status;
- actions needed;
- filters.

Keep business logic outside React components.
Add unit tests.
```

---

# Fase 15 - Dashboard

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Flash

## Input

```txt
AGENTS.md
prompts/coding-agent/006-dashboard.md
docs/product/mvp-scope.md
docs/product/user-journey.md
docs/architecture/frontend.md
docs/architecture/data-model.md
docs/design/*
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

Then execute:
prompts/coding-agent/006-dashboard.md

Use:
- data model;
- business logic;
- UI foundation;
- architecture docs;
- design docs.

Implement the real dashboard page.
Include loading, empty and error states.
Respect the documented design direction.
```

---

# Fase 16 - Purchases feature

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Flash, spezzando se necessario

## Input

```txt
AGENTS.md
prompts/coding-agent/007-purchases-feature.md
docs/product/mvp-scope.md
docs/product/user-journey.md
docs/architecture/frontend.md
docs/architecture/data-model.md
docs/architecture/api-design.md
docs/design/*
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

Then execute:
prompts/coding-agent/007-purchases-feature.md

Implement:
- purchases list;
- filters;
- add purchase form;
- edit purchase form;
- purchase detail;
- timeline;
- receipt/manual/support metadata.

Use React Hook Form and Zod.
Respect the documented design direction.
Do not add auth or real file upload.
```

---

# Fase 17 - Testing

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Flash + review Pro

## Input

```txt
AGENTS.md
prompts/coding-agent/008-testing.md
docs/architecture/testing.md
docs/product/mvp-scope.md
docs/product/user-journey.md
docs/design/ux-states.md
docs/marketing/wip-transparency.md
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

Then execute:
prompts/coding-agent/008-testing.md

Create:
- unit tests for deadline logic;
- unit tests for Zod schemas;
- component tests for Add Purchase form;
- Playwright e2e for main user journey;
- basic e2e coverage for landing CTA navigation to app/demo.

Use accessible selectors.
Avoid superficial tests.
```

---

# Fase 18 - Polish

## Stato

DA FARE

## Strumento

Coding agent

## Modello consigliato

DeepSeek V4 Flash

## Input

```txt
AGENTS.md
prompts/coding-agent/009-polish.md
README.md
docs/*
```

## Prompt breve da usare nel coding agent

```txt
Read AGENTS.md first.

Then execute:
prompts/coding-agent/009-polish.md

Improve:
- responsive layout;
- visual consistency;
- empty/loading/error states;
- microcopy;
- landing page clarity;
- work-in-progress transparency;
- accessibility basics;
- README commands;
- seed data realism.

Do not add major new features.
Respect the documented design direction, marketing positioning and Impeccable review checklist.
```

---

# Fase 19 - Review finale

## Stato

DA FARE

## Strumento

ChatGPT oppure DeepSeek V4 Pro

## Input

```txt
README.md
docs/*
screenshot
output test/build
repo o file principali
```

## Output

```txt
review critica
checklist miglioramenti
```

## Prompt da usare

```txt
Agisci come Frontend Lead di una product company a Berlino.

Analizza AfterBuy come progetto portfolio per un ruolo Software Engineer frontend-leaning.

Valuta:

1. product clarity;
2. landing page;
3. trasparenza dello stato work in progress;
4. README;
5. architettura;
6. data model;
7. backend leggero;
8. frontend architecture;
9. UI/UX;
10. design quality;
11. coerenza con Impeccable review checklist;
12. testing;
13. ADR;
14. qualità codice;
15. portfolio value;
16. cosa migliorare prima di pubblicarlo.

Produci:
- valutazione critica;
- punti forti;
- punti deboli;
- miglioramenti prioritari;
- checklist finale.
```

---

# Fase 20 - Pitch / social

## Stato

DA FARE

## Strumento

ChatGPT

## Input

```txt
README finale
landing page
demo link
screenshot
review finale
```

## Output

```txt
pitch colloquio
post LinkedIn
thread X
descrizione portfolio
```

## Prompt da usare

```txt
Agisci come Senior Frontend Portfolio Advisor e Personal Branding Strategist.

Usa come input:
- README finale di AfterBuy;
- landing page;
- documentazione di progetto;
- screenshot/demo;
- review finale;
- obiettivo carriera: aziende product-oriented a Berlino;
- posizionamento: Software Engineer frontend-leaning.

Prepara:

1. pitch da colloquio di 60 secondi;
2. pitch tecnico da colloquio di 2 minuti;
3. descrizione breve per portfolio personale;
4. post LinkedIn di lancio;
5. post LinkedIn tecnico sull'architettura;
6. post LinkedIn sulla scelta di costruire una landing trasparente per un prodotto work in progress;
7. mini thread X;
8. checklist finale prima di pubblicare;
9. come parlare del progetto nel CV/LinkedIn.

Tono:
professionale, product-oriented, non autocelebrativo, orientato al valore.
```

---

# Prossimo step reale

Dato che sono state completate le fasi 0, 1, 2, 3 e 4, il prossimo step è:

```txt
Fase 5.1 - Design Brief & Product Feel
```

Dopo aver completato tutte le micro-fasi design, il flusso diventa:

```txt
5.1 Design Brief & Product Feel
↓
5.2 Screen Specifications
↓
5.3 Lightweight Design System
↓
5.4 UX States, Microcopy & Mobile Rules
↓
5.5 Impeccable Review & Design Handoff
↓
6 Landing Page & Marketing Presentation
↓
7 ADR
```

Il punto chiave è questo:

```txt
Design docs = qualità UI/app
Marketing docs = landing reale e trasparente
ADR = decisioni tecniche e di prodotto documentate
Coding agent = esecuzione vincolata ai documenti
```

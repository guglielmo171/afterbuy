# AfterBuy — Landing Page Brief

**Stato:** pronto per implementazione della landing  
**Fonti di verità:** charter, feasibility study, MVP scope e user journey nelle versioni correnti `_UPDATED`; architettura e design in `docs/architecture/` e `docs/design/`.

## 1. Positioning

AfterBuy è una **utility post-acquisto orientata all'azione**: riunisce acquisti, scadenze e stati per rendere visibile ciò che richiede attenzione prima che si perda denaro, tempo o un diritto di assistenza. Non è un archivio di ricevute né un dashboard SaaS di metriche.

La landing deve essere una porta d'ingresso al prodotto e, allo stesso tempo, una sintesi onesta del case study: mostra il problema, il vertical slice scelto e le decisioni di prodotto/engineering che lo rendono credibile.

**Tono:** pratico, calmo, preciso, concreto.  
**Promessa consentita:** “Capisci cosa richiede attenzione dopo un acquisto.”  
**Promessa da non usare come claim assoluto:** “Non perderai mai più…”; la formulazione del charter resta una direzione di valore, non una garanzia.

## 2. Audience primaria

1. **Recruiter, hiring manager e product company**: devono capire rapidamente problema, maturità del ragionamento e stato reale del progetto.
2. **Visitatori della demo**: shopper frequenti, value protector, family manager e freelance organizzati che vogliono capire se il flusso è utile.

L'audience primaria determina l'ordine: prodotto e valore prima; profondità tecnica e roadmap dopo. La landing non deve sembrare un README travestito.

## 3. Goal della pagina

Portare un visitatore qualificato alla parte applicativa con aspettative corrette: **aprire la demo sapendo cosa può provare ora**, oppure comprendere in pochi minuti perché AfterBuy è un prodotto plausibile e quali sono i prossimi incrementi.

## 4. Main message

> Dopo l'acquisto, le informazioni restano sparse. AfterBuy le trasforma in prossime azioni: resi, rimborsi, garanzie e prove d'acquisto, con la priorità davanti.

Messaggio secondario: il nucleo dell'MVP è deliberatamente ristretto — `acquisti + scadenze + stati + azioni urgenti` — e il prodotto è in evoluzione.

## 5. Strategia CTA e comportamento

### CTA primaria

**Etichetta dinamica:**

- `Open App` quando il vertical slice è disponibile nella sessione/deployment.
- `Try the Demo` quando apre dati seed o una modalità dimostrativa.
- `Preview in progress` solo se non esiste un percorso navigabile: link alla sezione “Stato del prodotto”, non una falsa CTA.

**Destinazione:** la route applicativa reale (oggi prevista come dashboard `/`). Se la landing occupa `/`, il dashboard deve vivere su una route esplicita, ad esempio `/app`; non usare un URL finto.

**Comportamento della demo:** dati seed chiaramente etichettati; una breve nota spiega che non contiene dati personali né documenti reali. Se la persistenza pubblica non è garantita, mostra “I dati della demo possono essere ripristinati”.

### CTA secondarie

- `See what works now` → ancora alla sezione di disponibilità.
- `Explore the product flow` → anteprima/screenshot o sezione feature, non una funzionalità non pronta.
- `Read the roadmap` → ancora alla roadmap.

Nessun form “Join waitlist”, pricing o richiesta di account: non appartengono allo scope.

## 6. Gerarchia visiva e contenutistica

1. Header di prodotto minimale: wordmark, link “How it works”, “Product status”, CTA primaria.
2. Hero: problema + valore + prova visiva dell'app + status note.
3. Problema: frammentazione → perdita concreta di opportunità.
4. Valore: una sequenza operativa, non una lista di benefici vaghi.
5. Feature: solo capacità MVP, ciascuna etichettata per stato.
6. “What works now”: inventario verificabile e centrale.
7. “Work in progress” e roadmap: separati; il primo descrive limiti attuali, il secondo direzione futura.
8. CTA finale verso l'app, accompagnata da un promemoria di stato.

L'immagine dominante deve essere un **screenshot reale o una composizione di schermate reali** (dashboard con ActionCard e deadline/status badge), non un'illustrazione decorativa. Conservare palette neutra e signal color esclusivamente per urgenza; evitare gradienti, bento grid, metriche hero e card decorative ripetute.

## 7. Feature framing

Le feature vanno raccontate come un flusso “vedi → capisci → risolvi”:

- **See what needs attention** — dashboard e Actions Needed mostrano le priorità.
- **Keep purchase context together** — dettaglio acquisto con date, stati, riferimenti e timeline.
- **Update the lifecycle** — form e aggiornamenti di stato con validazione e feedback.

Lo stato va sempre mostrato vicino alla feature: `Available`, `Demo data`, `In progress`, `Planned`. Non usare “coming soon” come badge generico.

## 8. Responsive behavior

- Mobile (320–767px): una colonna; hero copy prima della preview; CTA full-width; screenshot ritagliato ma leggibile; badge di stato testuali oltre al colore; nav compatta.
- Tablet: hero e preview possono affiancarsi quando entrambe restano leggibili; feature in sequenza, non in griglia di micro-card.
- Desktop: container max 1024px, ritmo verticale generoso; hero a due colonne; una sola CTA primaria per viewport.
- Touch target ≥44px, focus visibile, contrasto AA e nessun contenuto essenziale nascosto su mobile.

## 9. SEO e social preview

- **Title:** `AfterBuy — Gestire ciò che succede dopo un acquisto`
- **Meta description:** `AfterBuy rende visibili resi, rimborsi, garanzie e scadenze post-acquisto. Un micro-prodotto full-stack in evoluzione.`
- Un solo `h1`; sezioni con `h2`; CTA descrittive; screenshot con alt text informativi.
- Open Graph: immagine 1200×630 con screenshot dashboard reale, wordmark AfterBuy, headline breve e label “Product preview · work in progress”. Non usare una dashboard inventata.
- `og:title` e `og:description` devono dichiarare lo stato WIP se la preview non è completa. Canonical URL e sitemap quando esiste dominio pubblico.

## 10. Cosa evitare

- Dire o suggerire che sono già disponibili account, upload, OCR, email import, integrazioni merchant/bancarie, notifiche, app mobile o consulenza legale/fiscale.
- Inventare risultati, utenti, statistiche, loghi di clienti o testimonial.
- Chiamare “AI” o “smart” una semplice logica di date e stati.
- Trasformare la landing in un elenco di tecnologie prima di aver spiegato l'utilità.
- Usare rosso/ambra come decorazione o allarmismo; sono segnali semantici di urgenza.
- Nascondere limitazioni in note microscopiche o dietro a una CTA ambigua.

## 11. Acceptance criteria per il coding agent

- [ ] La landing è una route del Next.js app, con shell, font, token e componenti coerenti con l'app.
- [ ] Il CTA principale punta a una route realmente esistente e la sua label corrisponde alla disponibilità reale.
- [ ] Ogni feature ha uno stato esplicito e nessuna feature fuori scope appare come disponibile.
- [ ] La sezione “What works now” precede “Work in progress” e roadmap.
- [ ] La demo dichiara dati seed e assenza di documenti/dati personali reali.
- [ ] Il primo viewport comunica problema, valore, status WIP e CTA senza scroll.
- [ ] Viene usato almeno uno screenshot/verifica visiva reale dell'app; nessun mock di funzionalità inesistente.
- [ ] Un solo `h1`; heading hierarchy, focus state, target touch, contrasto AA e reduced motion verificati.
- [ ] Layout validato a 320px, 390px, 768px e desktop; nessun overflow orizzontale.
- [ ] Metadata, OG image e alt text rispettano le note SEO/social.
- [ ] Nessun gradiente testuale, bento/card grid generica, hero con metriche, claim assolutista o testimonial fittizio.

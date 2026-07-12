# AfterBuy — Landing Page Structure

## Route e navigazione

La landing deve usare una route esplicita, preferibilmente `/`; il prodotto deve avere una route non ambigua, preferibilmente `/app`. Se l'architettura sceglie l'inverso, adeguare tutti i link: non duplicare dashboard e landing su `/`.

| Ordine | Sezione | Obiettivo | Contenuto / componente |
|---|---|---|---|
| 1 | Header | Continuità con l'app | `ProductHeader`, wordmark, anchor link, CTA `Open App` / `Try the Demo` |
| 2 | Hero | Rendere chiari problema e valore | `Hero`, headline, body, CTA, `ProductStatusNote`, screenshot dashboard reale |
| 3 | Problem | Nominare la perdita senza drammatizzare | `ProblemNarrative`, quattro fonti di frammentazione → conseguenza |
| 4 | Value | Spiegare il meccanismo | `ValueSequence`: vedere, capire, agire |
| 5 | Product flow | Mostrare le capability | `FeatureFlow`, tre blocchi con screenshot/preview e status label |
| 6 | What works now | Stabilire fiducia | `AvailabilityList` con capacità verificabili e stato `Available`/`Demo data` |
| 7 | Work in progress | Dichiarare limiti presenti | `WipDisclosure`, cosa è in corso e cosa non è ancora nel prodotto |
| 8 | Planned improvements | Mostrare direzione senza promettere date | `RoadmapList`, miglioramenti raggruppati per area |
| 9 | Final CTA | Convertire con aspettativa corretta | `FinalCta`, CTA primaria, nota demo/stato |
| 10 | Footer | Chiudere il prodotto | `ProductFooter`, link demo, source/portfolio se esistono, status note |

## Componenti necessari

- `MarketingPageShell`: container, spaziatura e token condivisi; non un tema esterno.
- `ProductHeader` e `ProductFooter`: stessa identità, button e focus state dell'app.
- `ProductStatusBadge`: badge testuale con varianti `available`, `demo`, `inProgress`, `planned`; colore non unico indicatore.
- `ProductStatusNote`: disclosure breve, visibile, collegabile da CTA.
- `Hero`: copy + CTA + screenshot reale; non contiene metriche o loghi fittizi.
- `FeatureFlow`: blocchi editoriali asimmetrici, ciascuno con una preview reale e stato.
- `AvailabilityList`, `WipDisclosure`, `RoadmapList`: liste semantiche, non griglie di card identiche.
- `FinalCta`: variante della CTA di header, non un nuovo funnel.

## Stati e regole di rendering

Un piccolo `productStatus` centralizzato (config o contenuto server-side) deve governare label, nota e destinazione della CTA. Non duplicare stringhe di disponibilità in componenti diversi.

| Stato | CTA | Disclosure richiesta |
|---|---|---|
| Vertical slice accessibile | `Open App` | “Product preview. Alcune aree sono ancora in evoluzione.” |
| Demo seed accessibile | `Try the Demo` | “Usa dati di esempio; non contiene dati o documenti personali reali.” |
| Nessuna app pubblica | `Preview in progress` | CTA ancora a “Work in progress”; nessun link non funzionante |

## Sequenza mobile

`Header → Hero copy → CTA → status note → screenshot → problem → value → feature flow → availability → WIP → roadmap → final CTA`.

Il contenuto di disponibilità non va compresso in tooltip o accordion: su mobile deve rimanere leggibile senza interazione aggiuntiva.

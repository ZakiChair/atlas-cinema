# Atlas du cinéma

Cartographie artistique interactive de l’histoire du cinéma : les grands courants sont des
territoires disposés par ère (axe horizontal) et par aire géographique (axe vertical), reliés par
leurs filiations, influences, affinités et ruptures. Le zoom révèle progressivement les styles,
puis les cinéastes, puis les films emblématiques ; chaque zone propose une description accessible,
ses caractéristiques visuelles, son contexte, des débats et des recommandations de films
commentées, avec des énoncés sourcés qui distinguent faits historiques et interprétations.

## Lancer

```bash
npm install
npm run dev        # http://localhost:5173
```

Autres scripts : `npm run build` (production dans `dist/`), `npm run preview`, `npm run typecheck`,
`npm run lint` (oxlint), `npm test` (vitest), `npm run test:e2e` (Playwright, desktop + mobile ;
captures dans `e2e/artifacts/`).

## Navigation

- **Zoom sémantique** : Courants → Styles → Cinéastes → Films (molette, pincement, boutons +/−,
  ou l’indicateur de niveau en bas à gauche). Les seuils sont en zoom absolu, identiques sur
  desktop et mobile.
- **Sélection** : clic sur un territoire, un style, un cinéaste ou un film ouvre le panneau
  (desktop) ou la feuille (mobile) et vole vers l’élément. L’URL suit la sélection
  (`#/courant/:id`, `#/style/:id`, `#/cineaste/:id`, `#/film/:id`).
- **Recherche** (Ctrl/⌘ K) sur les noms, titres originaux, alias et noms de cinéastes, sans accents.
- **Filtres** : période, régions, types de liens, « liens transversaux seulement » (entre deux
  ères), « n’afficher que les faits ».
- **Liens** : discrets par défaut, allumés au survol ou à la sélection d’un courant ; clic sur un
  lien pour son explication et ses sources.
- **Réseau des cinéastes** : la fiche d’un cinéaste liste ses liens (filiation, influence,
  collaboration, affinité, rupture) avec une note ; quand un cinéaste est sélectionné, des arcs
  le relient sur la carte aux cinéastes liés, quel que soit leur territoire — cliquer un arc
  navigue vers le cinéaste relié.

## Corpus

44 courants (ère du muet 6, âge classique 7, modernités 14, contemporain 16 — dont l’École de
Berlin, le cinéma européen, latino-américain et japonais contemporains), 186 styles,
514 cinéastes, 934 films commentés, 110 liens entre courants, 129 liens entre cinéastes,
environ 300 sources (livres, articles, manifestes, films). Chaque film est enrichi par
`scripts/enrich-films.ts` avec l'affiche, la distribution et un synopsis issus de Wikidata et
Wikipédia (`src/data/filmExtras.ts`, généré — relancer `npx tsx scripts/enrich-films.ts --missing`
après ajout de films).

Les données vivent dans `src/data/` :

- `movements/{muet,classique,modernites,contemporain}.ts` — les courants (schéma dans `types.ts`) ;
- `links.ts` — les liens entre courants, chacun avec un type, un statut épistémique, un libellé,
  une note et des sources ;
- `filmmakerLinks.ts` — les liens entre cinéastes (filiation, influence, collaboration,
  affinité, rupture), chacun avec un type, une note et un statut épistémique ; ils apparaissent
  dans la fiche cinéaste (« Réseau ») et en arcs sur la carte quand un cinéaste est sélectionné ;
- `sources.ts` — la bibliographie ; tout identifiant de source cité doit y exister ;
- `eras.ts` — ères, bandes de régions et dimensions de l’espace carte ;
- `validate.ts` — cohérence du corpus (identifiants, références croisées, périodes, sources,
  liens cinéastes), exécutée par `src/data/__tests__/validate.test.ts` ;
- `filmExtras.ts` — données externes générées (affiches, distributions, synopsis, liens
  Wikipédia), une entrée par `Film.id`.

### Faits et interprétations

Chaque énoncé (`Statement`) porte `kind: 'fait' | 'interpretation'` et ses sources. Un **fait**
est une donnée datable et vérifiable (sortie, prix, texte publié, fait de production) ; une
**interprétation** est une lecture critique ou historiographique, attribuée à ses auteurs quand
c’est possible. Les liens entre courants portent le même statut (`epistemic`). Les positions sur
la carte, les bandes d’ères et de régions sont des repères indicatifs, pas des mesures.

## Architecture

React 19 + Vite + TypeScript, D3 (zoom, courbes), Tailwind v4, Playwright, Vitest.

- `src/map/layout.ts` — placement déterministe : rayon selon la taille du courant et son nombre de
  films, relaxation des chevauchements, formes organiques, placement des styles/cinéastes/films et
  séparation des libellés de cinéastes.
- `src/map/MapCanvas.tsx` — zoom d3, niveaux sémantiques (`LEVEL_K`), contrôleur (fly-to,
  niveaux, recentrage), variable CSS `--k` pour les tailles constantes à l’écran.
- `src/map/LinkLayer.tsx`, `links.ts` — géométrie et rendu des liens (flèches, barres de rupture,
  libellés du courant sélectionné).
- `src/map/EdgeLabels.tsx`, `edgeLabelsLayout.ts` — libellés de régions et d’ères dans les marges,
  en espace écran, avec anti-collision.
- `src/ui/` — barre supérieure, recherche, filtres, légende, méthode, panneau/feuille, popover de lien.
- `src/state/store.tsx` — sélection, filtres, état d’interface.

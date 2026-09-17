/**
 * Chaînes d'interface. `fr` est la référence : toute clé manquante en `en`
 * retombe sur le français.
 */
const fr = {
  'app.title': 'Atlas du cinéma',
  'app.description': 'Cartographie interactive des courants, des styles et des films du cinéma mondial.',
  'app.title.a': 'Atlas',
  'app.title.em': 'du',
  'app.title.b': 'cinéma',
  'app.subtitle': 'Cartographie des courants, des styles et des films',

  'lang.switch': 'Langue / Language',

  'nav.search': 'Rechercher',
  'nav.filters': 'Filtres',
  'nav.legend': 'Légende',
  'nav.method': 'Méthode',
  'nav.closeSearch': 'Fermer la recherche',
  'nav.searchDialog': 'Recherche',

  'search.placeholder': 'Rechercher un courant, un cinéaste, un film… (Ctrl+K)',
  'search.aria': 'Rechercher dans l’atlas',
  'search.kind.movement': 'Courants',
  'search.kind.style': 'Styles',
  'search.kind.filmmaker': 'Cinéastes',
  'search.kind.film': 'Films',

  'filters.title': 'Filtres',
  'filters.close': 'Fermer les filtres',
  'filters.period': 'Période · {start} – {end}',
  'filters.start': 'Début',
  'filters.end': 'Fin',
  'filters.startYear': 'Année de début',
  'filters.endYear': 'Année de fin',
  'filters.regions': 'Régions',
  'filters.linkTypes': 'Types de liens',
  'filters.transversal': 'Liens transversaux seulement',
  'filters.transversalHint': '(entre ères)',
  'filters.factsOnly': 'N’afficher que les faits',
  'filters.visible': '{n} courant{s} visible{s}',
  'filters.reset': 'Réinitialiser',

  'legend.title': 'Légende',
  'legend.close': 'Fermer la légende',
  'legend.links': 'Liens entre courants',
  'legend.hint':
    'Les liens sont discrets par défaut et s’allument au survol ou à la sélection d’un courant ; les liens transversaux (entre deux ères) restent un peu plus visibles.',
  'legend.levels': 'Niveaux de zoom',
  'legend.statements': 'Énoncés',
  'legend.note': 'Les bandes d’ères et de régions sont des repères indicatifs.',
  'legend.filiation': 'Filiation',
  'legend.influence': 'Influence (orientée)',
  'legend.affinite': 'Affinité (non orientée)',
  'legend.reaction': 'Rupture',

  'link.filiation': 'Filiation',
  'link.influence': 'Influence',
  'link.affinite': 'Affinité',
  'link.reaction': 'Rupture',
  'link.collaboration': 'Collaboration',

  'level.0': 'Courants',
  'level.1': 'Styles',
  'level.2': 'Cinéastes',
  'level.3': 'Films',
  'level.aria': 'Niveau de zoom',

  'method.title': 'Méthode',
  'method.close': 'Fermer',
  'method.body':
    'Cet atlas distingue systématiquement deux régimes d’énoncés. Les faits (dates, personnes, dispositifs techniques, procédés observables à l’écran) sont datés et documentés dans les sources citées. Les interprétations (lectures critiques, attributions d’influence, jugements esthétiques) sont signées par une tradition critique et restent discutables ; elles sont signalées par un badge ambre. Les liens entre courants suivent la même règle : une filiation documentée n’a pas le même statut qu’une affinité esthétique. Les frontières des territoires et leur position sur la carte sont des conventions de représentation : l’axe horizontal suit approximativement la chronologie, l’axe vertical regroupe les aires géographiques. Les bornes chronologiques des courants sont indicatives (« ca. » lorsqu’elles sont particulièrement débattues).',

  'intro.aria': 'Introduction',
  'intro.body':
    'Une carte imaginaire des courants du cinéma. Chaque territoire est un courant : zoomez pour découvrir ses styles, ses cinéastes puis ses films. Les lignes qui relient les territoires sont des filiations, des influences, des affinités ou des ruptures. Chaque énoncé distingue les faits établis des interprétations.',
  'intro.cta': 'Explorer',

  'panel.close': 'Fermer le panneau',
  'panel.aria': 'Panneau de détail',
  'panel.breadcrumb': 'Fil d’Ariane',
  'panel.also': 'Aussi :',
  'panel.brief': 'En bref',
  'panel.visualTraits': 'Caractéristiques visuelles',
  'panel.context': 'Contexte',
  'panel.debates': 'Lectures et débats',
  'panel.keyDates': 'Repères',
  'panel.styles': 'Styles et sous-courants',
  'panel.filmmakers': 'Cinéastes',
  'panel.films': 'Films',
  'panel.filmsRecommended': 'Films recommandés',
  'panel.links': 'Liens avec d’autres courants',
  'panel.sources': 'Sources',
  'panel.sourceLink': 'lien',
  'panel.backTo': '← Retour à {name}',
  'panel.born': 'né·e en {year}',
  'panel.style': 'Style :',
  'panel.network': 'Réseau',
  'panel.movement': 'Courant :',
  'panel.alsoActive': 'Aussi actif dans :',
  'panel.synopsis': 'Synopsis',
  'panel.place': 'Place dans le courant',
  'panel.with': 'avec {cast}',
  'panel.wikipedia': 'En savoir plus sur Wikipédia',
  'panel.seeAlso': 'À voir aussi',

  'statement.fact': 'Fait',
  'statement.interp': 'Interprétation',
  'statement.factTitle': 'Fait : événement datable, documenté, ou observation vérifiable.',
  'statement.interpTitle': 'Interprétation : lecture critique signée par une tradition, discutable.',
  'statement.hidden': '{n} interprétation{s} masquée{s}',

  'popover.aria': 'Détail du lien',
  'popover.close': 'Fermer',
  'popover.sources': 'Sources :',
  'popover.go': 'Aller à {name}',

  'zoom.controls': 'Contrôles de zoom',
  'zoom.in': 'Zoomer',
  'zoom.out': 'Dézoomer',
  'zoom.reset': 'Recentrer',

  'sheet.aria': 'Panneau de détail',
  'sheet.handle': 'Poignée du panneau',

  'film.poster': 'Affiche de {title}',

  'map.aria': 'Carte des courants du cinéma',

  'period.today': 'aujourd’hui',
  'period.ca': 'ca. ',
} as const;

export type UiKey = keyof typeof fr;

const en: Record<UiKey, string> = {
  'app.title': 'Atlas of Cinema',
  'app.description': 'An interactive cartography of film movements, styles and films worldwide.',
  'app.title.a': 'Atlas',
  'app.title.em': 'of',
  'app.title.b': 'cinema',
  'app.subtitle': 'A cartography of movements, styles and films',

  'lang.switch': 'Langue / Language',

  'nav.search': 'Search',
  'nav.filters': 'Filters',
  'nav.legend': 'Legend',
  'nav.method': 'Method',
  'nav.closeSearch': 'Close search',
  'nav.searchDialog': 'Search',

  'search.placeholder': 'Search a movement, a filmmaker, a film… (Ctrl+K)',
  'search.aria': 'Search the atlas',
  'search.kind.movement': 'Movements',
  'search.kind.style': 'Styles',
  'search.kind.filmmaker': 'Filmmakers',
  'search.kind.film': 'Films',

  'filters.title': 'Filters',
  'filters.close': 'Close filters',
  'filters.period': 'Period · {start} – {end}',
  'filters.start': 'Start',
  'filters.end': 'End',
  'filters.startYear': 'Start year',
  'filters.endYear': 'End year',
  'filters.regions': 'Regions',
  'filters.linkTypes': 'Link types',
  'filters.transversal': 'Cross-era links only',
  'filters.transversalHint': '(between eras)',
  'filters.factsOnly': 'Show facts only',
  'filters.visible': '{n} movement{s} visible',
  'filters.reset': 'Reset',

  'legend.title': 'Legend',
  'legend.close': 'Close legend',
  'legend.links': 'Links between movements',
  'legend.hint':
    'Links stay discreet by default and light up on hover or when a movement is selected; cross-era links remain slightly more visible.',
  'legend.levels': 'Zoom levels',
  'legend.statements': 'Statements',
  'legend.note': 'Era and region bands are indicative guides.',
  'legend.filiation': 'Lineage',
  'legend.influence': 'Influence (directed)',
  'legend.affinite': 'Affinity (undirected)',
  'legend.reaction': 'Rupture',

  'link.filiation': 'Lineage',
  'link.influence': 'Influence',
  'link.affinite': 'Affinity',
  'link.reaction': 'Rupture',
  'link.collaboration': 'Collaboration',

  'level.0': 'Movements',
  'level.1': 'Styles',
  'level.2': 'Filmmakers',
  'level.3': 'Films',
  'level.aria': 'Zoom level',

  'method.title': 'Method',
  'method.close': 'Close',
  'method.body':
    'This atlas systematically distinguishes two regimes of statements. Facts (dates, people, technical devices, processes observable on screen) are dated and documented in the cited sources. Interpretations (critical readings, attributions of influence, aesthetic judgements) are signed by a critical tradition and remain debatable; they are marked with an amber badge. Links between movements follow the same rule: a documented lineage does not have the same status as an aesthetic affinity. Territory boundaries and their position on the map are representational conventions: the horizontal axis roughly follows chronology, the vertical axis groups geographical areas. Movements’ date bounds are indicative (“ca.” where especially debated).',

  'intro.aria': 'Introduction',
  'intro.body':
    'An imaginary map of film movements. Each territory is a movement: zoom in to discover its styles, its filmmakers, then its films. The lines connecting territories are lineages, influences, affinities or ruptures. Every statement distinguishes established facts from interpretations.',
  'intro.cta': 'Explore',

  'panel.close': 'Close panel',
  'panel.aria': 'Detail panel',
  'panel.breadcrumb': 'Breadcrumb',
  'panel.also': 'Also:',
  'panel.brief': 'In brief',
  'panel.visualTraits': 'Visual traits',
  'panel.context': 'Context',
  'panel.debates': 'Readings and debates',
  'panel.keyDates': 'Key dates',
  'panel.styles': 'Styles and sub-movements',
  'panel.filmmakers': 'Filmmakers',
  'panel.films': 'Films',
  'panel.filmsRecommended': 'Recommended films',
  'panel.links': 'Links with other movements',
  'panel.sources': 'Sources',
  'panel.sourceLink': 'link',
  'panel.backTo': '← Back to {name}',
  'panel.born': 'b. {year}',
  'panel.style': 'Style:',
  'panel.network': 'Network',
  'panel.movement': 'Movement:',
  'panel.alsoActive': 'Also active in:',
  'panel.synopsis': 'Synopsis',
  'panel.place': 'Place in the movement',
  'panel.with': 'with {cast}',
  'panel.wikipedia': 'Read more on Wikipedia',
  'panel.seeAlso': 'See also',

  'statement.fact': 'Fact',
  'statement.interp': 'Interpretation',
  'statement.factTitle': 'Fact: a datable, documented event or verifiable observation.',
  'statement.interpTitle': 'Interpretation: a critical reading signed by a tradition, open to debate.',
  'statement.hidden': '{n} interpretation{s} hidden',

  'popover.aria': 'Link detail',
  'popover.close': 'Close',
  'popover.sources': 'Sources:',
  'popover.go': 'Go to {name}',

  'zoom.controls': 'Zoom controls',
  'zoom.in': 'Zoom in',
  'zoom.out': 'Zoom out',
  'zoom.reset': 'Reset view',

  'sheet.aria': 'Detail panel',
  'sheet.handle': 'Panel handle',

  'film.poster': 'Poster for {title}',

  'map.aria': 'Map of film movements',

  'period.today': 'today',
  'period.ca': 'ca. ',
};

export const UI: Record<'fr' | 'en', Record<UiKey, string>> = { fr, en };

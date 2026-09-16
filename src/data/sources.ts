import type { Source } from './types';

/**
 * Registre des sources. Les identifiants sont référencés par les courants,
 * les énoncés et les liens. Ouvrages de référence, articles fondateurs, manifestes.
 */
export const SOURCES: Source[] = [
  // — Ouvrages généraux —
  { id: 'bordwell-thompson-history', type: 'livre', author: 'David Bordwell, Kristin Thompson', title: 'Film History: An Introduction', year: 1994, publisher: 'McGraw-Hill', note: 'Éditions révisées 2003, 2010.' },
  { id: 'sadoul-histoire', type: 'livre', author: 'Georges Sadoul', title: 'Histoire générale du cinéma', year: 1946, publisher: 'Denoël', note: 'Six tomes parus de 1946 à 1975.' },
  { id: 'bazin-quest-ce', type: 'livre', author: 'André Bazin', title: 'Qu’est-ce que le cinéma ?', year: 1958, publisher: 'Éditions du Cerf', note: 'Recueil en quatre volumes (1958-1962), réédition en un volume 1975.' },
  { id: 'deleuze-image-mouvement', type: 'livre', author: 'Gilles Deleuze', title: 'Cinéma 1. L’Image-mouvement', year: 1983, publisher: 'Minuit' },
  { id: 'deleuze-image-temps', type: 'livre', author: 'Gilles Deleuze', title: 'Cinéma 2. L’Image-temps', year: 1985, publisher: 'Minuit' },
  { id: 'burch-praxis', type: 'livre', author: 'Noël Burch', title: 'Praxis du cinéma', year: 1969, publisher: 'Gallimard' },
  { id: 'bordwell-narration', type: 'livre', author: 'David Bordwell', title: 'Narration in the Fiction Film', year: 1985, publisher: 'University of Wisconsin Press' },
  { id: 'kovacs-screening-modernism', type: 'livre', author: 'András Bálint Kovács', title: 'Screening Modernism: European Art Cinema, 1950-1980', year: 2007, publisher: 'University of Chicago Press' },

  // — Cinéma des premiers temps —
  { id: 'gunning-attractions', type: 'article', author: 'Tom Gunning', title: 'The Cinema of Attraction[s]: Early Film, Its Spectator and the Avant-Garde', year: 1986, publisher: 'Wide Angle, vol. 8, n° 3-4', note: 'Trad. fr. « Le cinéma d’attraction », 1895, n° 50, 2006.' },
  { id: 'burch-lucarne', type: 'livre', author: 'Noël Burch', title: 'La Lucarne de l’infini : naissance du langage cinématographique', year: 1991, publisher: 'Nathan' },
  { id: 'gaudreault-attraction', type: 'livre', author: 'André Gaudreault', title: 'Cinéma et attraction : pour une nouvelle histoire du cinématographe', year: 2008, publisher: 'CNRS Éditions' },
  { id: 'musser-emergence', type: 'livre', author: 'Charles Musser', title: 'The Emergence of Cinema: The American Screen to 1907', year: 1990, publisher: 'Charles Scribner’s Sons' },
  { id: 'abel-cine-goes-to-town', type: 'livre', author: 'Richard Abel', title: 'The Ciné Goes to Town: French Cinema, 1896-1914', year: 1994, publisher: 'University of California Press' },
  { id: 'malthete-mannoni-melies', type: 'livre', author: 'Jacques Malthête, Laurent Mannoni (dir.)', title: 'Méliès, magie et cinéma', year: 2002, publisher: 'Paris-Musées' },
  { id: 'loiperdinger-train', type: 'article', author: 'Martin Loiperdinger', title: 'Lumière’s Arrival of the Train: Cinema’s Founding Myth', year: 2004, publisher: 'The Moving Image, vol. 4, n° 1' },
  { id: 'bowser-transformation', type: 'livre', author: 'Eileen Bowser', title: 'The Transformation of Cinema, 1907-1915', year: 1990, publisher: 'Charles Scribner’s Sons' },

  // — Hollywood muet —
  { id: 'bordwell-staiger-thompson', type: 'livre', author: 'David Bordwell, Janet Staiger, Kristin Thompson', title: 'The Classical Hollywood Cinema: Film Style and Mode of Production to 1960', year: 1985, publisher: 'Columbia University Press' },
  { id: 'gunning-griffith', type: 'livre', author: 'Tom Gunning', title: 'D. W. Griffith and the Origins of American Narrative Film', year: 1991, publisher: 'University of Illinois Press' },
  { id: 'koszarski-evening', type: 'livre', author: 'Richard Koszarski', title: 'An Evening’s Entertainment: The Age of the Silent Feature Picture, 1915-1928', year: 1990, publisher: 'Charles Scribner’s Sons' },
  { id: 'agee-comedy', type: 'article', author: 'James Agee', title: 'Comedy’s Greatest Era', year: 1949, publisher: 'Life, 3 septembre 1949' },
  { id: 'stokes-birth', type: 'livre', author: 'Melvyn Stokes', title: 'D. W. Griffith’s The Birth of a Nation: A History of “The Most Controversial Motion Picture of All Time”', year: 2007, publisher: 'Oxford University Press' },

  // — École scandinave —
  { id: 'forslund-sjostrom', type: 'livre', author: 'Bengt Forslund', title: 'Victor Sjöström: His Life and His Work', year: 1988, publisher: 'Zoetrope', note: 'Édition originale suédoise 1980.' },
  { id: 'beranger-suedois', type: 'livre', author: 'Jean Béranger', title: 'La Grande Aventure du cinéma suédois', year: 1960, publisher: 'Le Terrain vague' },
  { id: 'bordwell-dreyer', type: 'livre', author: 'David Bordwell', title: 'The Films of Carl-Theodor Dreyer', year: 1981, publisher: 'University of California Press' },
  { id: 'engberg-dansk-stumfilm', type: 'livre', author: 'Marguerite Engberg', title: 'Dansk stumfilm : de store år', year: 1977, publisher: 'Rhodos' },

  // — Avant-gardes françaises —
  { id: 'abel-first-wave', type: 'livre', author: 'Richard Abel', title: 'French Cinema: The First Wave, 1915-1929', year: 1984, publisher: 'Princeton University Press' },
  { id: 'abel-french-film-theory', type: 'livre', author: 'Richard Abel (dir.)', title: 'French Film Theory and Criticism, vol. 1 : 1907-1929', year: 1988, publisher: 'Princeton University Press' },
  { id: 'epstein-ecrits', type: 'livre', author: 'Jean Epstein', title: 'Écrits sur le cinéma, 1921-1953', year: 1974, publisher: 'Seghers', note: 'Deux tomes.' },
  { id: 'ghali-avant-garde', type: 'livre', author: 'Noureddine Ghali', title: 'L’Avant-garde cinématographique en France dans les années vingt', year: 1995, publisher: 'Paris Expérimental' },
  { id: 'kyrou-surrealisme', type: 'livre', author: 'Ado Kyrou', title: 'Le Surréalisme au cinéma', year: 1953, publisher: 'Arcanes', note: 'Réédition Ramsay Poche Cinéma, 1985.' },
  { id: 'bunuel-dernier-soupir', type: 'livre', author: 'Luis Buñuel', title: 'Mon dernier soupir', year: 1982, publisher: 'Robert Laffont' },
  { id: 'icart-gance', type: 'livre', author: 'Roger Icart', title: 'Abel Gance ou le Prométhée foudroyé', year: 1983, publisher: 'L’Âge d’homme' },

  // — Montage soviétique —
  { id: 'eisenstein-film-form', type: 'livre', author: 'Sergueï M. Eisenstein', title: 'Le Film : sa forme, son sens', year: 1976, publisher: 'Christian Bourgois', note: 'Traduction de Film Form (1949) et The Film Sense (1942) ; contient « Le montage des attractions » (LEF, 1923).' },
  { id: 'vertov-articles', type: 'livre', author: 'Dziga Vertov', title: 'Articles, journaux, projets', year: 1972, publisher: 'UGE 10/18 / Cahiers du cinéma' },
  { id: 'pudovkin-film-technique', type: 'livre', author: 'Vsevolod Poudovkine', title: 'Film Technique and Film Acting', year: 1929, publisher: 'Victor Gollancz', note: 'Édition originale russe 1926 ; trad. anglaise Ivor Montagu.' },
  { id: 'taylor-christie-film-factory', type: 'livre', author: 'Richard Taylor, Ian Christie (dir.)', title: 'The Film Factory: Russian and Soviet Cinema in Documents, 1896-1939', year: 1988, publisher: 'Routledge' },
  { id: 'bordwell-eisenstein', type: 'livre', author: 'David Bordwell', title: 'The Cinema of Eisenstein', year: 1993, publisher: 'Harvard University Press' },
  { id: 'youngblood-soviet-silent', type: 'livre', author: 'Denise J. Youngblood', title: 'Soviet Cinema in the Silent Era, 1918-1935', year: 1991, publisher: 'University of Texas Press' },
  { id: 'leyda-kino', type: 'livre', author: 'Jay Leyda', title: 'Kino: A History of the Russian and Soviet Film', year: 1960, publisher: 'George Allen & Unwin' },

  // — Hollywood classique —
  { id: 'schatz-genius', type: 'livre', author: 'Thomas Schatz', title: 'The Genius of the System: Hollywood Filmmaking in the Studio Era', year: 1988, publisher: 'Pantheon' },
  { id: 'balio-grand-design', type: 'livre', author: 'Tino Balio', title: 'Grand Design: Hollywood as a Modern Business Enterprise, 1930-1939', year: 1993, publisher: 'Charles Scribner’s Sons' },
  { id: 'schatz-boom-bust', type: 'livre', author: 'Thomas Schatz', title: 'Boom and Bust: American Cinema in the 1940s', year: 1997, publisher: 'Charles Scribner’s Sons' },
  { id: 'doherty-precode', type: 'livre', author: 'Thomas Doherty', title: 'Pre-Code Hollywood: Sex, Immorality, and Insurrection in American Cinema, 1930-1934', year: 1999, publisher: 'Columbia University Press' },
  { id: 'maltby-hollywood', type: 'livre', author: 'Richard Maltby', title: 'Hollywood Cinema', year: 1995, publisher: 'Blackwell', note: 'Deuxième édition 2003.' },
  { id: 'sarris-american-cinema', type: 'livre', author: 'Andrew Sarris', title: 'The American Cinema: Directors and Directions, 1929-1968', year: 1968, publisher: 'E. P. Dutton' },
  { id: 'truffaut-hitchcock', type: 'livre', author: 'François Truffaut (avec Helen Scott)', title: 'Le Cinéma selon Hitchcock', year: 1966, publisher: 'Robert Laffont', note: 'Édition définitive Hitchcock/Truffaut, Gallimard, 1983.' },

  // — Film noir —
  { id: 'frank-nouveau-genre', type: 'article', author: 'Nino Frank', title: 'Un nouveau genre « policier » : l’aventure criminelle', year: 1946, publisher: 'L’Écran français, n° 61, 28 août 1946' },
  { id: 'borde-chaumeton-panorama', type: 'livre', author: 'Raymond Borde, Étienne Chaumeton', title: 'Panorama du film noir américain (1941-1953)', year: 1955, publisher: 'Minuit' },
  { id: 'schrader-notes', type: 'article', author: 'Paul Schrader', title: 'Notes on Film Noir', year: 1972, publisher: 'Film Comment, vol. 8, n° 1' },
  { id: 'naremore-more-than-night', type: 'livre', author: 'James Naremore', title: 'More Than Night: Film Noir in Its Contexts', year: 1998, publisher: 'University of California Press' },
  { id: 'krutnik-lonely-street', type: 'livre', author: 'Frank Krutnik', title: 'In a Lonely Street: Film Noir, Genre, Masculinity', year: 1991, publisher: 'Routledge' },
  { id: 'vernet-edge-of-doom', type: 'article', author: 'Marc Vernet', title: 'Film Noir on the Edge of Doom', year: 1993, publisher: 'dans Joan Copjec (dir.), Shades of Noir, Verso' },
  { id: 'alton-painting', type: 'livre', author: 'John Alton', title: 'Painting with Light', year: 1949, publisher: 'Macmillan', note: 'Réédition University of California Press, 1995.' },
  { id: 'silver-ward-encyclopedic', type: 'livre', author: 'Alain Silver, Elizabeth Ward (dir.)', title: 'Film Noir: An Encyclopedic Reference to the American Style', year: 1979, publisher: 'Overlook Press' },

  // — Réalisme poétique —
  { id: 'andrew-mists', type: 'livre', author: 'Dudley Andrew', title: 'Mists of Regret: Culture and Sensibility in Classic French Film', year: 1995, publisher: 'Princeton University Press' },
  { id: 'turk-carne', type: 'livre', author: 'Edward Baron Turk', title: 'Child of Paradise: Marcel Carné and the Golden Age of French Cinema', year: 1989, publisher: 'Harvard University Press' },
  { id: 'bazin-renoir', type: 'livre', author: 'André Bazin', title: 'Jean Renoir', year: 1971, publisher: 'Champ libre', note: 'Textes réunis par François Truffaut.' },
  { id: 'crisp-classic-french', type: 'livre', author: 'Colin Crisp', title: 'The Classic French Cinema, 1930-1960', year: 1993, publisher: 'Indiana University Press' },
  { id: 'vincendeau-gabin', type: 'livre', author: 'Claude Gauteur, Ginette Vincendeau', title: 'Jean Gabin : anatomie d’un mythe', year: 1993, publisher: 'Nathan' },
  { id: 'burch-sellier-drole-de-guerre', type: 'livre', author: 'Noël Burch, Geneviève Sellier', title: 'La Drôle de guerre des sexes du cinéma français, 1930-1956', year: 1996, publisher: 'Nathan' },

  // — École documentaire britannique —
  { id: 'grierson-on-documentary', type: 'livre', author: 'John Grierson (éd. Forsyth Hardy)', title: 'Grierson on Documentary', year: 1946, publisher: 'Collins' },
  { id: 'rotha-documentary-film', type: 'livre', author: 'Paul Rotha', title: 'Documentary Film', year: 1936, publisher: 'Faber & Faber' },
  { id: 'aitken-film-and-reform', type: 'livre', author: 'Ian Aitken', title: 'Film and Reform: John Grierson and the Documentary Film Movement', year: 1990, publisher: 'Routledge' },
  { id: 'barnouw-documentary', type: 'livre', author: 'Erik Barnouw', title: 'Documentary: A History of the Non-Fiction Film', year: 1974, publisher: 'Oxford University Press' },
  { id: 'winston-claiming-the-real', type: 'livre', author: 'Brian Winston', title: 'Claiming the Real: The Documentary Film Revisited', year: 1995, publisher: 'British Film Institute' },
  { id: 'nichols-introduction', type: 'livre', author: 'Bill Nichols', title: 'Introduction to Documentary', year: 2001, publisher: 'Indiana University Press' },
  { id: 'jackson-jennings', type: 'livre', author: 'Kevin Jackson', title: 'Humphrey Jennings', year: 2004, publisher: 'Picador' },

  // — Néoréalisme —
  { id: 'zavattini-quelques-idees', type: 'article', author: 'Cesare Zavattini', title: 'Alcune idee sul cinema', year: 1952, publisher: 'La Rivista del cinema italiano, n° 2', note: 'Trad. angl. « Some Ideas on the Cinema », Sight and Sound, 1953.' },
  { id: 'bondanella-italian-cinema', type: 'livre', author: 'Peter Bondanella', title: 'Italian Cinema: From Neorealism to the Present', year: 1983, publisher: 'Continuum', note: 'Troisième édition 2001.' },
  { id: 'marcus-light-of-neorealism', type: 'livre', author: 'Millicent Marcus', title: 'Italian Film in the Light of Neorealism', year: 1986, publisher: 'Princeton University Press' },
  { id: 'brunetta-storia', type: 'livre', author: 'Gian Piero Brunetta', title: 'Storia del cinema italiano', year: 1979, publisher: 'Editori Riuniti', note: 'Quatre volumes, 1979-1993.' },
  { id: 'shiel-neorealism', type: 'livre', author: 'Mark Shiel', title: 'Italian Neorealism: Rebuilding the Cinematic City', year: 2006, publisher: 'Wallflower Press' },
  { id: 'rossellini-cinema-revele', type: 'livre', author: 'Roberto Rossellini (éd. Alain Bergala)', title: 'Le Cinéma révélé', year: 1984, publisher: 'Cahiers du cinéma' },

  // — Âge d’or japonais —
  { id: 'bordwell-ozu', type: 'livre', author: 'David Bordwell', title: 'Ozu and the Poetics of Cinema', year: 1988, publisher: 'British Film Institute / Princeton University Press' },
  { id: 'richie-ozu', type: 'livre', author: 'Donald Richie', title: 'Ozu', year: 1974, publisher: 'University of California Press' },
  { id: 'richie-japanese-cinema', type: 'livre', author: 'Donald Richie', title: 'A Hundred Years of Japanese Film', year: 2001, publisher: 'Kodansha International' },
  { id: 'anderson-richie-japanese-film', type: 'livre', author: 'Joseph L. Anderson, Donald Richie', title: 'The Japanese Film: Art and Industry', year: 1959, publisher: 'Grove Press', note: 'Édition augmentée Princeton University Press, 1982.' },
  { id: 'yoshimoto-kurosawa', type: 'livre', author: 'Mitsuhiro Yoshimoto', title: 'Kurosawa: Film Studies and Japanese Cinema', year: 2000, publisher: 'Duke University Press' },
  { id: 'richie-films-of-kurosawa', type: 'livre', author: 'Donald Richie', title: 'The Films of Akira Kurosawa', year: 1965, publisher: 'University of California Press', note: 'Troisième édition 1996.' },
  { id: 'le-fanu-mizoguchi', type: 'livre', author: 'Mark Le Fanu', title: 'Mizoguchi and Japan', year: 2005, publisher: 'British Film Institute' },
  { id: 'burch-observateur-lointain', type: 'livre', author: 'Noël Burch', title: 'Pour un observateur lointain : forme et signification dans le cinéma japonais', year: 1982, publisher: 'Gallimard / Cahiers du cinéma', note: 'Édition originale To the Distant Observer, Scolar Press, 1979.' },
  { id: 'schrader-transcendental', type: 'livre', author: 'Paul Schrader', title: 'Transcendental Style in Film: Ozu, Bresson, Dreyer', year: 1972, publisher: 'University of California Press' },
  { id: 'standish-new-history', type: 'livre', author: 'Isolde Standish', title: 'A New History of Japanese Cinema: A Century of Narrative Film', year: 2005, publisher: 'Continuum' },
  { id: 'hirano-mr-smith', type: 'livre', author: 'Kyoko Hirano', title: 'Mr. Smith Goes to Tokyo: Japanese Cinema under the American Occupation, 1945-1952', year: 1992, publisher: 'Smithsonian Institution Press' },

  // — Âge d’or mexicain —
  { id: 'garcia-riera-historia', type: 'livre', author: 'Emilio García Riera', title: 'Historia documental del cine mexicano', year: 1969, publisher: 'Era', note: 'Édition augmentée en 18 volumes, Universidad de Guadalajara, 1992-1997.' },
  { id: 'mora-mexican-cinema', type: 'livre', author: 'Carl J. Mora', title: 'Mexican Cinema: Reflections of a Society, 1896-1980', year: 1982, publisher: 'University of California Press' },
  { id: 'paranagua-cinema-mexicain', type: 'livre', author: 'Paulo Antonio Paranaguá (dir.)', title: 'Le Cinéma mexicain', year: 1992, publisher: 'Centre Georges Pompidou', note: 'Édition anglaise Mexican Cinema, BFI, 1995.' },
  { id: 'tunon-mujeres', type: 'livre', author: 'Julia Tuñón', title: 'Mujeres de luz y sombra en el cine mexicano : la construcción de una imagen (1939-1952)', year: 1998, publisher: 'El Colegio de México' },
  { id: 'monsivais-mitologias', type: 'article', author: 'Carlos Monsiváis', title: 'Mythologies', year: 1995, publisher: 'dans Paulo Antonio Paranaguá (dir.), Mexican Cinema, BFI' },
  { id: 'noble-mexican-national', type: 'livre', author: 'Andrea Noble', title: 'Mexican National Cinema', year: 2005, publisher: 'Routledge' },

  // — Expressionnisme allemand / Weimar —
  { id: 'eisner-ecran-demoniaque', type: 'livre', author: 'Lotte H. Eisner', title: 'L’Écran démoniaque', year: 1952, publisher: 'André Bonne', note: 'Réédition Le Terrain vague 1965, Ramsay 1981.' },
  { id: 'kracauer-caligari-hitler', type: 'livre', author: 'Siegfried Kracauer', title: 'From Caligari to Hitler: A Psychological History of the German Film', year: 1947, publisher: 'Princeton University Press', note: 'Trad. fr. De Caligari à Hitler, L’Âge d’homme, 1973.' },
  { id: 'elsaesser-weimar', type: 'livre', author: 'Thomas Elsaesser', title: 'Weimar Cinema and After: Germany’s Historical Imaginary', year: 2000, publisher: 'Routledge' },
  { id: 'kurtz-expressionismus', type: 'livre', author: 'Rudolf Kurtz', title: 'Expressionismus und Film', year: 1926, publisher: 'Verlag der Lichtbildbühne', note: 'Trad. fr. Expressionnisme et cinéma, Presses universitaires de Grenoble, 1986.' },
  { id: 'salt-caligari-who', type: 'article', author: 'Barry Salt', title: 'From Caligari to Who?', year: 1979, publisher: 'Sight and Sound, vol. 48, n° 2' },
  { id: 'kaes-shell-shock', type: 'livre', author: 'Anton Kaes', title: 'Shell Shock Cinema: Weimar Culture and the Wounds of War', year: 2009, publisher: 'Princeton University Press' },
  { id: 'eisner-murnau', type: 'livre', author: 'Lotte H. Eisner', title: 'Murnau', year: 1964, publisher: 'Le Terrain vague' },

  // — Free Cinema / British New Wave —
  { id: 'free-cinema-manifeste', type: 'manifeste', author: 'Lindsay Anderson, Karel Reisz, Tony Richardson, Lorenza Mazzetti', title: 'Free Cinema (notes de programme du National Film Theatre)', year: 1956, publisher: 'National Film Theatre, Londres, 5 février 1956' },
  { id: 'anderson-stand-up', type: 'article', author: 'Lindsay Anderson', title: 'Stand Up! Stand Up!', year: 1956, publisher: 'Sight and Sound, vol. 26, n° 2 (automne 1956)' },
  { id: 'hill-sex-class-realism', type: 'livre', author: 'John Hill', title: 'Sex, Class and Realism: British Cinema 1956-1963', year: 1986, publisher: 'British Film Institute' },
  { id: 'higson-space-place-spectacle', type: 'article', author: 'Andrew Higson', title: 'Space, Place, Spectacle: Landscape and Townscape in the “Kitchen Sink” Film', year: 1984, publisher: 'Screen, vol. 25, n° 4-5' },
  { id: 'murphy-sixties', type: 'livre', author: 'Robert Murphy', title: 'Sixties British Cinema', year: 1992, publisher: 'British Film Institute' },
  { id: 'hedling-anderson', type: 'livre', author: 'Erik Hedling', title: 'Lindsay Anderson: Maverick Film-Maker', year: 1998, publisher: 'Cassell' },
  { id: 'lovell-hillier-documentary', type: 'livre', author: 'Alan Lovell, Jim Hillier', title: 'Studies in Documentary', year: 1972, publisher: 'Secker & Warburg / British Film Institute' },

  // — Modernité européenne —
  { id: 'bordwell-art-cinema', type: 'article', author: 'David Bordwell', title: 'The Art Cinema as a Mode of Film Practice', year: 1979, publisher: 'Film Criticism, vol. 4, n° 1' },
  { id: 'chatman-antonioni', type: 'livre', author: 'Seymour Chatman', title: 'Antonioni, or, The Surface of the World', year: 1985, publisher: 'University of California Press' },
  { id: 'bergman-laterna-magica', type: 'livre', author: 'Ingmar Bergman', title: 'Laterna magica', year: 1987, publisher: 'Gallimard', note: 'Autobiographie ; édition originale suédoise 1987.' },
  { id: 'bresson-notes', type: 'livre', author: 'Robert Bresson', title: 'Notes sur le cinématographe', year: 1975, publisher: 'Gallimard' },
  { id: 'pasolini-cinema-de-poesie', type: 'article', author: 'Pier Paolo Pasolini', title: 'Il cinema di poesia', year: 1965, publisher: 'Communication au festival de Pesaro ; repris dans L’Expérience hérétique, Payot, 1976' },
  { id: 'bondanella-fellini', type: 'livre', author: 'Peter Bondanella', title: 'The Cinema of Federico Fellini', year: 1992, publisher: 'Princeton University Press' },
  { id: 'dapena-saura', type: 'livre', author: 'Marvin D’Lugo', title: 'The Films of Carlos Saura: The Practice of Seeing', year: 1991, publisher: 'Princeton University Press' },

  // — École polonaise —
  { id: 'haltof-polish-national', type: 'livre', author: 'Marek Haltof', title: 'Polish National Cinema', year: 2002, publisher: 'Berghahn Books' },
  { id: 'michalek-turaj', type: 'livre', author: 'Bolesław Michałek, Frank Turaj', title: 'The Modern Cinema of Poland', year: 1988, publisher: 'Indiana University Press' },
  { id: 'coates-red-white', type: 'livre', author: 'Paul Coates', title: 'The Red and the White: The Cinema of People’s Poland', year: 2005, publisher: 'Wallflower Press' },
  { id: 'falkowska-wajda', type: 'livre', author: 'Janina Falkowska', title: 'Andrzej Wajda: History, Politics and Nostalgia in Polish Cinema', year: 2007, publisher: 'Berghahn Books' },
  { id: 'wajda-cinema-nomme-desir', type: 'livre', author: 'Andrzej Wajda', title: 'Un cinéma nommé désir', year: 1986, publisher: 'Stock' },

  // — Nouvelles vagues d’Europe centrale —
  { id: 'hames-czechoslovak-new-wave', type: 'livre', author: 'Peter Hames', title: 'The Czechoslovak New Wave', year: 1985, publisher: 'University of California Press', note: 'Deuxième édition Wallflower Press, 2005.' },
  { id: 'hames-cinema-of-central-europe', type: 'livre', author: 'Peter Hames (dir.)', title: 'The Cinema of Central Europe', year: 2004, publisher: 'Wallflower Press' },
  { id: 'liehm-most-important-art', type: 'livre', author: 'Mira Liehm, Antonín J. Liehm', title: 'The Most Important Art: Soviet and Eastern European Film after 1945', year: 1977, publisher: 'University of California Press' },
  { id: 'cunningham-hungarian', type: 'livre', author: 'John Cunningham', title: 'Hungarian Cinema: From Coffee House to Multiplex', year: 2004, publisher: 'Wallflower Press' },
  { id: 'petrie-hungarian', type: 'livre', author: 'Graham Petrie', title: 'History Must Answer to Man: The Contemporary Hungarian Cinema', year: 1978, publisher: 'Corvina' },
  { id: 'goulding-liberated-cinema', type: 'livre', author: 'Daniel J. Goulding', title: 'Liberated Cinema: The Yugoslav Experience, 1945-2001', year: 2002, publisher: 'Indiana University Press' },
  { id: 'levi-disintegration', type: 'livre', author: 'Pavle Levi', title: 'Disintegration in Frames: Aesthetics and Ideology in the Yugoslav and Post-Yugoslav Cinema', year: 2007, publisher: 'Stanford University Press' },

  // — Dégel soviétique —
  { id: 'woll-real-images', type: 'livre', author: 'Josephine Woll', title: 'Real Images: Soviet Cinema and the Thaw', year: 2000, publisher: 'I.B. Tauris' },
  { id: 'beumers-history', type: 'livre', author: 'Birgit Beumers', title: 'A History of Russian Cinema', year: 2009, publisher: 'Berg' },
  { id: 'tarkovski-temps-scelle', type: 'livre', author: 'Andreï Tarkovski', title: 'Le Temps scellé', year: 1989, publisher: 'Cahiers du cinéma', note: 'Édition originale allemande Die versiegelte Zeit, 1986.' },
  { id: 'johnson-petrie-tarkovsky', type: 'livre', author: 'Vida T. Johnson, Graham Petrie', title: 'The Films of Andrei Tarkovsky: A Visual Fugue', year: 1994, publisher: 'Indiana University Press' },
  { id: 'steffen-parajanov', type: 'livre', author: 'James Steffen', title: 'The Cinema of Sergei Parajanov', year: 2013, publisher: 'University of Wisconsin Press' },
  { id: 'first-ukrainian-cinema', type: 'livre', author: 'Joshua First', title: 'Ukrainian Cinema: Belonging and Identity during the Soviet Thaw', year: 2015, publisher: 'I.B. Tauris' },

  // — Cinéma parallèle indien —
  { id: 'rajadhyaksha-willemen-encyclopaedia', type: 'livre', author: 'Ashish Rajadhyaksha, Paul Willemen', title: 'Encyclopaedia of Indian Cinema', year: 1994, publisher: 'British Film Institute / Oxford University Press', note: 'Édition révisée 1999.' },
  { id: 'robinson-ray', type: 'livre', author: 'Andrew Robinson', title: 'Satyajit Ray: The Inner Eye', year: 1989, publisher: 'André Deutsch' },
  { id: 'ray-our-films', type: 'livre', author: 'Satyajit Ray', title: 'Our Films, Their Films', year: 1976, publisher: 'Orient Longman' },
  { id: 'dasgupta-cinema-of-ray', type: 'livre', author: 'Chidananda Das Gupta', title: 'The Cinema of Satyajit Ray', year: 1980, publisher: 'Vikas' },
  { id: 'ghatak-cinema-and-i', type: 'livre', author: 'Ritwik Ghatak', title: 'Cinema and I', year: 1987, publisher: 'Ritwik Memorial Trust' },
  { id: 'vasudev-new-indian-cinema', type: 'livre', author: 'Aruna Vasudev', title: 'The New Indian Cinema', year: 1986, publisher: 'Macmillan India' },
  { id: 'rajadhyaksha-indian-cinema', type: 'livre', author: 'Ashish Rajadhyaksha', title: 'Indian Cinema in the Time of Celluloid: From Bollywood to the Emergency', year: 2009, publisher: 'Indiana University Press' },

  // — Nouveau cinéma latino-américain —
  { id: 'rocha-estetica-da-fome', type: 'manifeste', author: 'Glauber Rocha', title: 'Eztetyka da Fome (Esthétique de la faim)', year: 1965, publisher: 'Communication à la rencontre du cinéma latino-américain, Gênes, janvier 1965' },
  { id: 'solanas-getino-tercer-cine', type: 'manifeste', author: 'Fernando Solanas, Octavio Getino', title: 'Hacia un tercer cine (Vers un troisième cinéma)', year: 1969, publisher: 'Tricontinental, n° 13, octobre 1969' },
  { id: 'garcia-espinosa-imperfecto', type: 'manifeste', author: 'Julio García Espinosa', title: 'Por un cine imperfecto (Pour un cinéma imparfait)', year: 1969, publisher: 'Cine Cubano, n° 66-67' },
  { id: 'johnson-stam-brazilian', type: 'livre', author: 'Randal Johnson, Robert Stam (dir.)', title: 'Brazilian Cinema', year: 1982, publisher: 'Associated University Presses', note: 'Édition augmentée Columbia University Press, 1995.' },
  { id: 'xavier-allegories', type: 'livre', author: 'Ismail Xavier', title: 'Allegories of Underdevelopment: Aesthetics and Politics in Modern Brazilian Cinema', year: 1997, publisher: 'University of Minnesota Press' },
  { id: 'chanan-cuban-cinema', type: 'livre', author: 'Michael Chanan', title: 'Cuban Cinema', year: 2004, publisher: 'University of Minnesota Press', note: 'Première édition The Cuban Image, BFI, 1985.' },
  { id: 'pick-new-latin-american', type: 'livre', author: 'Zuzana M. Pick', title: 'The New Latin American Cinema: A Continental Project', year: 1993, publisher: 'University of Texas Press' },
  { id: 'king-magical-reels', type: 'livre', author: 'John King', title: 'Magical Reels: A History of Cinema in Latin America', year: 1990, publisher: 'Verso' },
  { id: 'burton-cinema-and-social-change', type: 'livre', author: 'Julianne Burton (dir.)', title: 'Cinema and Social Change in Latin America: Conversations with Filmmakers', year: 1986, publisher: 'University of Texas Press' },

  // — Nouveau cinéma allemand —
  { id: 'oberhausen-manifest', type: 'manifeste', author: 'Alexander Kluge, Edgar Reitz, Peter Schamoni, Haro Senft et al. (26 signataires)', title: 'Oberhausener Manifest', year: 1962, publisher: 'Festival du court métrage d’Oberhausen, 28 février 1962' },
  { id: 'elsaesser-new-german', type: 'livre', author: 'Thomas Elsaesser', title: 'New German Cinema: A History', year: 1989, publisher: 'British Film Institute / Rutgers University Press' },
  { id: 'rentschler-west-german', type: 'livre', author: 'Eric Rentschler', title: 'West German Film in the Course of Time', year: 1984, publisher: 'Redgrave' },
  { id: 'kaes-hitler-to-heimat', type: 'livre', author: 'Anton Kaes', title: 'From Hitler to Heimat: The Return of History as Film', year: 1989, publisher: 'Harvard University Press' },
  { id: 'elsaesser-fassbinder', type: 'livre', author: 'Thomas Elsaesser', title: 'Fassbinder’s Germany: History, Identity, Subject', year: 1996, publisher: 'Amsterdam University Press' },
  { id: 'herzog-on-herzog', type: 'livre', author: 'Werner Herzog (éd. Paul Cronin)', title: 'Herzog on Herzog', year: 2002, publisher: 'Faber & Faber' },
  { id: 'wenders-logique', type: 'livre', author: 'Wim Wenders', title: 'La Logique des images', year: 1990, publisher: 'L’Arche' },
  { id: 'knight-women-new-german', type: 'livre', author: 'Julia Knight', title: 'Women and the New German Cinema', year: 1992, publisher: 'Verso' },

  // — Nouvelle Vague japonaise —
  { id: 'desser-eros-plus-massacre', type: 'livre', author: 'David Desser', title: 'Eros Plus Massacre: An Introduction to the Japanese New Wave Cinema', year: 1988, publisher: 'Indiana University Press' },
  { id: 'oshima-ecrits', type: 'livre', author: 'Nagisa Ōshima', title: 'Écrits (1956-1978) : dissolution et jaillissement', year: 1980, publisher: 'Cahiers du cinéma / Gallimard' },
  { id: 'turim-oshima', type: 'livre', author: 'Maureen Turim', title: 'The Films of Oshima Nagisa: Images of a Japanese Iconoclast', year: 1998, publisher: 'University of California Press' },
  { id: 'mellen-waves', type: 'livre', author: 'Joan Mellen', title: 'The Waves at Genji’s Door: Japan through Its Cinema', year: 1976, publisher: 'Pantheon' },
  { id: 'sato-currents', type: 'livre', author: 'Tadao Satō', title: 'Currents in Japanese Cinema', year: 1982, publisher: 'Kodansha International' },

  // — Cinéma direct —
  { id: 'mamber-cinema-verite', type: 'livre', author: 'Stephen Mamber', title: 'Cinema Verite in America: Studies in Uncontrolled Documentary', year: 1974, publisher: 'MIT Press' },
  { id: 'marsolais-aventure', type: 'livre', author: 'Gilles Marsolais', title: 'L’Aventure du cinéma direct', year: 1974, publisher: 'Seghers', note: 'Édition revue et augmentée, L’Aventure du cinéma direct revisitée, Les 400 coups, 1997.' },
  { id: 'rouch-cine-ethnography', type: 'livre', author: 'Jean Rouch (éd. Steven Feld)', title: 'Ciné-Ethnography', year: 2003, publisher: 'University of Minnesota Press' },
  { id: 'ruspoli-groupe-synchrone', type: 'article', author: 'Mario Ruspoli', title: 'Le Groupe synchrone cinématographique léger', year: 1963, publisher: 'Rapport à l’UNESCO' },
  { id: 'saunders-direct-cinema', type: 'livre', author: 'Dave Saunders', title: 'Direct Cinema: Observational Documentary and the Politics of the Sixties', year: 2007, publisher: 'Wallflower Press' },

  // — Nouvel Hollywood —
  { id: 'biskind-easy-riders', type: 'livre', author: 'Peter Biskind', title: 'Easy Riders, Raging Bulls: How the Sex-Drugs-and-Rock’n’Roll Generation Saved Hollywood', year: 1998, publisher: 'Simon & Schuster', note: 'Trad. fr. Le Nouvel Hollywood, Le Cherche Midi, 2002.' },
  { id: 'pye-myles-movie-brats', type: 'livre', author: 'Michael Pye, Lynda Myles', title: 'The Movie Brats: How the Film Generation Took Over Hollywood', year: 1979, publisher: 'Holt, Rinehart and Winston' },
  { id: 'king-new-hollywood', type: 'livre', author: 'Geoff King', title: 'New Hollywood Cinema: An Introduction', year: 2002, publisher: 'I.B. Tauris' },
  { id: 'elsaesser-horwath-king-last-great', type: 'livre', author: 'Thomas Elsaesser, Alexander Horwath, Noel King (dir.)', title: 'The Last Great American Picture Show: New Hollywood Cinema in the 1970s', year: 2004, publisher: 'Amsterdam University Press' },
  { id: 'schatz-new-hollywood', type: 'article', author: 'Thomas Schatz', title: 'The New Hollywood', year: 1993, publisher: 'dans Jim Collins, Hilary Radner, Ava Preacher Collins (dir.), Film Theory Goes to the Movies, Routledge' },
  { id: 'harris-pictures-at-a-revolution', type: 'livre', author: 'Mark Harris', title: 'Pictures at a Revolution: Five Movies and the Birth of the New Hollywood', year: 2008, publisher: 'Penguin Press' },
  { id: 'cook-lost-illusions', type: 'livre', author: 'David A. Cook', title: 'Lost Illusions: American Cinema in the Shadow of Watergate and Vietnam, 1970-1979', year: 2000, publisher: 'Charles Scribner’s Sons' },

  // — Cinéma populaire italien —
  { id: 'frayling-spaghetti', type: 'livre', author: 'Christopher Frayling', title: 'Spaghetti Westerns: Cowboys and Europeans from Karl May to Sergio Leone', year: 1981, publisher: 'Routledge & Kegan Paul', note: 'Édition révisée I.B. Tauris, 1998.' },
  { id: 'frayling-leone', type: 'livre', author: 'Christopher Frayling', title: 'Sergio Leone: Something to Do with Death', year: 2000, publisher: 'Faber & Faber' },
  { id: 'koven-dolce-morte', type: 'livre', author: 'Mikel J. Koven', title: 'La Dolce Morte: Vernacular Cinema and the Italian Giallo Film', year: 2006, publisher: 'Scarecrow Press' },
  { id: 'lucas-bava', type: 'livre', author: 'Tim Lucas', title: 'Mario Bava: All the Colors of the Dark', year: 2007, publisher: 'Video Watchdog' },
  { id: 'giacovelli-commedia', type: 'livre', author: 'Enrico Giacovelli', title: 'La commedia all’italiana', year: 1990, publisher: 'Gremese' },
  { id: 'd-amico-commedia', type: 'livre', author: 'Masolino d’Amico', title: 'La commedia all’italiana : il cinema comico in Italia dal 1945 al 1975', year: 1985, publisher: 'Mondadori' },
  { id: 'fisher-radical-frontiers', type: 'livre', author: 'Austin Fisher', title: 'Radical Frontiers in the Spaghetti Western: Politics, Violence and Popular Italian Cinema', year: 2011, publisher: 'I.B. Tauris' },
  { id: 'gunsberg-gender-genre', type: 'livre', author: 'Maggie Günsberg', title: 'Italian Cinema: Gender and Genre', year: 2005, publisher: 'Palgrave Macmillan' },

  // — Avant-garde américaine —
  { id: 'sitney-visionary-film', type: 'livre', author: 'P. Adams Sitney', title: 'Visionary Film: The American Avant-Garde, 1943-1978', year: 1974, publisher: 'Oxford University Press', note: 'Troisième édition (1943-2000), 2002. Trad. fr. Le Cinéma visionnaire, Paris Expérimental, 2002.' },
  { id: 'sitney-structural', type: 'article', author: 'P. Adams Sitney', title: 'Structural Film', year: 1969, publisher: 'Film Culture, n° 47' },
  { id: 'mekas-movie-journal', type: 'livre', author: 'Jonas Mekas', title: 'Movie Journal: The Rise of the New American Cinema, 1959-1971', year: 1972, publisher: 'Macmillan' },
  { id: 'brakhage-metaphors', type: 'livre', author: 'Stan Brakhage', title: 'Metaphors on Vision', year: 1963, publisher: 'Film Culture, n° 30' },
  { id: 'deren-anagram', type: 'livre', author: 'Maya Deren', title: 'An Anagram of Ideas on Art, Form and Film', year: 1946, publisher: 'Alicat Book Shop Press' },
  { id: 'james-allegories-of-cinema', type: 'livre', author: 'David E. James', title: 'Allegories of Cinema: American Film in the Sixties', year: 1989, publisher: 'Princeton University Press' },
  { id: 'rees-history-experimental', type: 'livre', author: 'A. L. Rees', title: 'A History of Experimental Film and Video', year: 1999, publisher: 'British Film Institute' },
  { id: 'macdonald-cinema-16', type: 'livre', author: 'Scott MacDonald', title: 'Cinema 16: Documents Toward a History of the Film Society', year: 2002, publisher: 'Temple University Press' },
  { id: 'koch-stargazer', type: 'livre', author: 'Stephen Koch', title: 'Stargazer: Andy Warhol’s World and His Films', year: 1973, publisher: 'Praeger' },

  // — Cinémas d’Afrique —
  { id: 'diawara-african-cinema', type: 'livre', author: 'Manthia Diawara', title: 'African Cinema: Politics and Culture', year: 1992, publisher: 'Indiana University Press' },
  { id: 'ukadike-black-african', type: 'livre', author: 'Nwachukwu Frank Ukadike', title: 'Black African Cinema', year: 1994, publisher: 'University of California Press' },
  { id: 'barlet-cinemas-afrique-noire', type: 'livre', author: 'Olivier Barlet', title: 'Les Cinémas d’Afrique noire : le regard en question', year: 1996, publisher: 'L’Harmattan' },
  { id: 'vieyra-cinema-africain', type: 'livre', author: 'Paulin Soumanou Vieyra', title: 'Le Cinéma africain des origines à 1973', year: 1975, publisher: 'Présence africaine' },
  { id: 'gadjigo-sembene', type: 'livre', author: 'Samba Gadjigo', title: 'Ousmane Sembène : une conscience africaine', year: 2007, publisher: 'Homnisphères' },
  { id: 'armes-african-filmmaking', type: 'livre', author: 'Roy Armes', title: 'African Filmmaking: North and South of the Sahara', year: 2006, publisher: 'Edinburgh University Press' },
  { id: 'shafik-arab-cinema', type: 'livre', author: 'Viola Shafik', title: 'Arab Cinema: History and Cultural Identity', year: 1998, publisher: 'American University in Cairo Press' },

  // — Hollywood du blockbuster —
  { id: 'wyatt-high-concept', type: 'livre', author: 'Justin Wyatt', title: 'High Concept: Movies and Marketing in Hollywood', year: 1994, publisher: 'University of Texas Press' },
  { id: 'bordwell-way-hollywood', type: 'livre', author: 'David Bordwell', title: 'The Way Hollywood Tells It: Story and Style in Modern Movies', year: 2006, publisher: 'University of California Press' },
  { id: 'shone-blockbuster', type: 'livre', author: 'Tom Shone', title: 'Blockbuster: How Hollywood Learned to Stop Worrying and Love the Summer', year: 2004, publisher: 'Free Press' },
  { id: 'stringer-movie-blockbusters', type: 'livre', author: 'Julian Stringer (dir.)', title: 'Movie Blockbusters', year: 2003, publisher: 'Routledge' },
  { id: 'prince-digital-visual-effects', type: 'livre', author: 'Stephen Prince', title: 'Digital Visual Effects in Cinema: The Seduction of Reality', year: 2012, publisher: 'Rutgers University Press' },
  { id: 'king-spectacular-narratives', type: 'livre', author: 'Geoff King', title: 'Spectacular Narratives: Hollywood in the Age of the Blockbuster', year: 2000, publisher: 'I.B. Tauris' },

  // — Cinéma indépendant américain —
  { id: 'biskind-down-and-dirty', type: 'livre', author: 'Peter Biskind', title: 'Down and Dirty Pictures: Miramax, Sundance, and the Rise of Independent Film', year: 2004, publisher: 'Simon & Schuster' },
  { id: 'levy-cinema-of-outsiders', type: 'livre', author: 'Emanuel Levy', title: 'Cinema of Outsiders: The Rise of American Independent Film', year: 1999, publisher: 'New York University Press' },
  { id: 'rich-new-queer-cinema', type: 'article', author: 'B. Ruby Rich', title: 'New Queer Cinema', year: 1992, publisher: 'Sight and Sound, septembre 1992', note: 'Repris et développé dans New Queer Cinema: The Director’s Cut, Duke University Press, 2013.' },
  { id: 'king-american-independent', type: 'livre', author: 'Geoff King', title: 'American Independent Cinema', year: 2005, publisher: 'I.B. Tauris' },
  { id: 'tzioumakis-american-independent', type: 'livre', author: 'Yannis Tzioumakis', title: 'American Independent Cinema: An Introduction', year: 2006, publisher: 'Edinburgh University Press' },
  { id: 'pierson-spike-mike', type: 'livre', author: 'John Pierson', title: 'Spike, Mike, Slackers & Dykes: A Guided Tour across a Decade of American Independent Cinema', year: 1995, publisher: 'Hyperion / Miramax Books' },
  { id: 'field-la-rebellion', type: 'livre', author: 'Allyson Nadia Field, Jan-Christopher Horak, Jacqueline Najuma Stewart (dir.)', title: 'L.A. Rebellion: Creating a New Black Cinema', year: 2015, publisher: 'University of California Press' },
  { id: 'newman-indie', type: 'livre', author: 'Michael Z. Newman', title: 'Indie: An American Film Culture', year: 2011, publisher: 'Columbia University Press' },

  // — Hong Kong —
  { id: 'bordwell-planet-hong-kong', type: 'livre', author: 'David Bordwell', title: 'Planet Hong Kong: Popular Cinema and the Art of Entertainment', year: 2000, publisher: 'Harvard University Press', note: 'Deuxième édition, Irvington Way Institute Press, 2011.' },
  { id: 'teo-hong-kong-extra', type: 'livre', author: 'Stephen Teo', title: 'Hong Kong Cinema: The Extra Dimensions', year: 1997, publisher: 'British Film Institute' },
  { id: 'stokes-hoover-city-on-fire', type: 'livre', author: 'Lisa Odham Stokes, Michael Hoover', title: 'City on Fire: Hong Kong Cinema', year: 1999, publisher: 'Verso' },
  { id: 'cheuk-hong-kong-new-wave', type: 'livre', author: 'Pak Tong Cheuk', title: 'Hong Kong New Wave Cinema (1978-2000)', year: 2008, publisher: 'Intellect' },
  { id: 'abbas-hong-kong', type: 'livre', author: 'Ackbar Abbas', title: 'Hong Kong: Culture and the Politics of Disappearance', year: 1997, publisher: 'University of Minnesota Press' },
  { id: 'teo-wong-kar-wai', type: 'livre', author: 'Stephen Teo', title: 'Wong Kar-wai', year: 2005, publisher: 'British Film Institute' },
  { id: 'fu-desser-cinema-of-hong-kong', type: 'livre', author: 'Poshek Fu, David Desser (dir.)', title: 'The Cinema of Hong Kong: History, Arts, Identity', year: 2000, publisher: 'Cambridge University Press' },

  // — Nouveau cinéma taïwanais —
  { id: 'yeh-davis-taiwan-film-directors', type: 'livre', author: 'Emilie Yueh-yu Yeh, Darrell William Davis', title: 'Taiwan Film Directors: A Treasure Island', year: 2005, publisher: 'Columbia University Press' },
  { id: 'berry-lu-island-on-the-edge', type: 'livre', author: 'Chris Berry, Feii Lu (dir.)', title: 'Island on the Edge: Taiwan New Cinema and After', year: 2005, publisher: 'Hong Kong University Press' },
  { id: 'udden-no-man-an-island', type: 'livre', author: 'James Udden', title: 'No Man an Island: The Cinema of Hou Hsiao-hsien', year: 2009, publisher: 'Hong Kong University Press' },
  { id: 'hong-taiwan-cinema', type: 'livre', author: 'Guo-Juin Hong', title: 'Taiwan Cinema: A Contested Nation on Screen', year: 2011, publisher: 'Palgrave Macmillan' },
  { id: 'assayas-hhh', type: 'film', author: 'Olivier Assayas', title: 'HHH, portrait de Hou Hsiao-hsien', year: 1997, publisher: 'AMIP / La Sept-Arte, collection « Cinéma, de notre temps »' },
  { id: 'frodon-hou', type: 'livre', author: 'Jean-Michel Frodon (dir.)', title: 'Hou Hsiao-hsien', year: 1999, publisher: 'Cahiers du cinéma', note: 'Édition augmentée 2005.' },

  // — Cinquième et Sixième générations chinoises —
  { id: 'berry-chinese-films-in-focus', type: 'livre', author: 'Chris Berry (dir.)', title: 'Chinese Films in Focus: 25 New Takes', year: 2003, publisher: 'British Film Institute' },
  { id: 'zhang-yingjin-chinese-national', type: 'livre', author: 'Yingjin Zhang', title: 'Chinese National Cinema', year: 2004, publisher: 'Routledge' },
  { id: 'clark-reinventing-china', type: 'livre', author: 'Paul Clark', title: 'Reinventing China: A Generation and Its Films', year: 2005, publisher: 'Chinese University Press' },
  { id: 'pickowicz-zhang-underground', type: 'livre', author: 'Paul G. Pickowicz, Yingjin Zhang (dir.)', title: 'From Underground to Independent: Alternative Film Culture in Contemporary China', year: 2006, publisher: 'Rowman & Littlefield' },
  { id: 'berry-rofel-new-chinese-documentary', type: 'livre', author: 'Chris Berry, Lu Xinyu, Lisa Rofel (dir.)', title: 'The New Chinese Documentary Film Movement: For the Public Record', year: 2010, publisher: 'Hong Kong University Press' },
  { id: 'jia-dits-et-ecrits', type: 'livre', author: 'Jia Zhangke', title: 'Dits et écrits d’un cinéaste chinois, 1996-2011', year: 2012, publisher: 'Capricci' },
  { id: 'ni-zhen-memoirs', type: 'livre', author: 'Ni Zhen', title: 'Memoirs from the Beijing Film Academy: The Genesis of China’s Fifth Generation', year: 2002, publisher: 'Duke University Press' },

  // — Nouveau cinéma coréen —
  { id: 'paquet-new-korean-cinema', type: 'livre', author: 'Darcy Paquet', title: 'New Korean Cinema: Breaking the Waves', year: 2009, publisher: 'Wallflower Press' },
  { id: 'kim-remasculinization', type: 'livre', author: 'Kyung Hyun Kim', title: 'The Remasculinization of Korean Cinema', year: 2004, publisher: 'Duke University Press' },
  { id: 'shin-stringer-new-korean', type: 'livre', author: 'Chi-Yun Shin, Julian Stringer (dir.)', title: 'New Korean Cinema', year: 2005, publisher: 'Edinburgh University Press' },
  { id: 'choi-south-korean-renaissance', type: 'livre', author: 'Jinhee Choi', title: 'The South Korean Film Renaissance: Local Hitmakers, Global Provocateurs', year: 2010, publisher: 'Wesleyan University Press' },
  { id: 'lee-contemporary-korean', type: 'livre', author: 'Hyangjin Lee', title: 'Contemporary Korean Cinema: Identity, Culture, Politics', year: 2000, publisher: 'Manchester University Press' },
  { id: 'kim-virtual-hallyu', type: 'livre', author: 'Kyung Hyun Kim', title: 'Virtual Hallyu: Korean Cinema of the Global Era', year: 2011, publisher: 'Duke University Press' },

  // — Nouvelle vague iranienne —
  { id: 'naficy-social-history', type: 'livre', author: 'Hamid Naficy', title: 'A Social History of Iranian Cinema', year: 2011, publisher: 'Duke University Press', note: 'Quatre volumes, 2011-2012.' },
  { id: 'dabashi-close-up', type: 'livre', author: 'Hamid Dabashi', title: 'Close Up: Iranian Cinema, Past, Present and Future', year: 2001, publisher: 'Verso' },
  { id: 'elena-kiarostami', type: 'livre', author: 'Alberto Elena', title: 'The Cinema of Abbas Kiarostami', year: 2005, publisher: 'Saqi Books', note: 'Édition originale espagnole 2002.' },
  { id: 'saeed-vafa-rosenbaum-kiarostami', type: 'livre', author: 'Mehrnaz Saeed-Vafa, Jonathan Rosenbaum', title: 'Abbas Kiarostami', year: 2003, publisher: 'University of Illinois Press' },
  { id: 'tapper-new-iranian', type: 'livre', author: 'Richard Tapper (dir.)', title: 'The New Iranian Cinema: Politics, Representation and Identity', year: 2002, publisher: 'I.B. Tauris' },
  { id: 'zeydabadi-nejad-politics', type: 'livre', author: 'Saeed Zeydabadi-Nejad', title: 'The Politics of Iranian Cinema: Film and Society in the Islamic Republic', year: 2010, publisher: 'Routledge' },
  { id: 'nancy-evidence', type: 'livre', author: 'Jean-Luc Nancy', title: 'L’Évidence du film : Abbas Kiarostami', year: 2001, publisher: 'Yves Gevaert' },

  // — Dogme 95 —
  { id: 'dogme-manifeste', type: 'manifeste', author: 'Lars von Trier, Thomas Vinterberg', title: 'Dogme 95 : Manifeste et Vœu de chasteté', year: 1995, publisher: 'Copenhague, 13 mars 1995 ; lu à Paris (Odéon) le 20 mars 1995' },
  { id: 'hjort-mackenzie-purity', type: 'livre', author: 'Mette Hjort, Scott MacKenzie (dir.)', title: 'Purity and Provocation: Dogma 95', year: 2003, publisher: 'British Film Institute' },
  { id: 'stevenson-dogme-uncut', type: 'livre', author: 'Jack Stevenson', title: 'Dogme Uncut: Lars von Trier, Thomas Vinterberg, and the Gang That Took on Hollywood', year: 2003, publisher: 'Santa Monica Press' },
  { id: 'bainbridge-trier', type: 'livre', author: 'Caroline Bainbridge', title: 'The Cinema of Lars von Trier: Authenticity and Artifice', year: 2007, publisher: 'Wallflower Press' },
  { id: 'schepelern-trier', type: 'livre', author: 'Peter Schepelern', title: 'Lars von Triers film : tvang og befrielse', year: 2000, publisher: 'Rosinante' },
  { id: 'hjort-small-nation', type: 'livre', author: 'Mette Hjort', title: 'Small Nation, Global Cinema: The New Danish Cinema', year: 2005, publisher: 'University of Minnesota Press' },

  // — Nouvelle Vague roumaine —
  { id: 'pop-romanian-new-wave', type: 'livre', author: 'Doru Pop', title: 'Romanian New Wave Cinema: An Introduction', year: 2014, publisher: 'McFarland' },
  { id: 'nasta-contemporary-romanian', type: 'livre', author: 'Dominique Nasta', title: 'Contemporary Romanian Cinema: The History of an Unexpected Miracle', year: 2013, publisher: 'Wallflower Press' },
  { id: 'stojanova-duma-new-romanian', type: 'livre', author: 'Christina Stojanova, Dana Duma (dir.)', title: 'The New Romanian Cinema', year: 2019, publisher: 'Edinburgh University Press' },
  { id: 'gorzo-lucruri', type: 'livre', author: 'Andrei Gorzo', title: 'Lucruri care nu pot fi spuse altfel : un mod de a gândi cinemaul, de la André Bazin la Cristi Puiu', year: 2012, publisher: 'Humanitas' },
  { id: 'serban-4-decenii', type: 'livre', author: 'Alex. Leo Șerban', title: '4 decenii, 3 ani și 2 luni cu filmul românesc', year: 2009, publisher: 'Polirom' },

  // — Slow cinema —
  { id: 'de-luca-jorge-slow-cinema', type: 'livre', author: 'Tiago de Luca, Nuno Barradas Jorge (dir.)', title: 'Slow Cinema', year: 2016, publisher: 'Edinburgh University Press' },
  { id: 'jaffe-slow-movies', type: 'livre', author: 'Ira Jaffe', title: 'Slow Movies: Countering the Cinema of Action', year: 2014, publisher: 'Wallflower Press' },
  { id: 'koepnick-on-slowness', type: 'livre', author: 'Lutz Koepnick', title: 'On Slowness: Toward an Aesthetic of the Contemporary', year: 2014, publisher: 'Columbia University Press' },
  { id: 'flanagan-aesthetic-of-slow', type: 'article', author: 'Matthew Flanagan', title: 'Towards an Aesthetic of Slow in Contemporary Cinema', year: 2008, publisher: '16:9, vol. 6, n° 29' },
  { id: 'lim-tsai-slowness', type: 'livre', author: 'Song Hwee Lim', title: 'Tsai Ming-liang and a Cinema of Slowness', year: 2014, publisher: 'University of Hawai‘i Press' },
  { id: 'schoonover-wastrels', type: 'article', author: 'Karl Schoonover', title: 'Wastrels of Time: Slow Cinema’s Laboring Body, the Political Spectator, and the Queer', year: 2012, publisher: 'Framework, vol. 53, n° 1' },

  // — Nouveau cinéma argentin —
  { id: 'aguilar-otros-mundos', type: 'livre', author: 'Gonzalo Aguilar', title: 'Otros mundos : un ensayo sobre el nuevo cine argentino', year: 2006, publisher: 'Santiago Arcos', note: 'Trad. angl. New Argentine Film: Other Worlds, Palgrave Macmillan, 2008.' },
  { id: 'page-crisis-and-capitalism', type: 'livre', author: 'Joanna Page', title: 'Crisis and Capitalism in Contemporary Argentine Cinema', year: 2009, publisher: 'Duke University Press' },
  { id: 'andermann-new-argentine', type: 'livre', author: 'Jens Andermann', title: 'New Argentine Cinema', year: 2012, publisher: 'I.B. Tauris' },
  { id: 'bernades-lerer-wolf-nuevo-cine', type: 'livre', author: 'Horacio Bernades, Diego Lerer, Sergio Wolf (dir.)', title: 'Nuevo cine argentino : temas, autores y estilos de una renovación', year: 2002, publisher: 'FIPRESCI / Tatanka' },
  { id: 'falicov-cinematic-tango', type: 'livre', author: 'Tamara L. Falicov', title: 'The Cinematic Tango: Contemporary Argentine Film', year: 2007, publisher: 'Wallflower Press' },
  { id: 'martin-martel', type: 'livre', author: 'Deborah Martin', title: 'The Cinema of Lucrecia Martel', year: 2016, publisher: 'Manchester University Press' },

  // — Cinéma français après la Nouvelle Vague —
  { id: 'bassan-neobaroques', type: 'article', author: 'Raphaël Bassan', title: 'Trois néobaroques français : Beineix, Besson, Carax, de Diva au Grand Bleu', year: 1989, publisher: 'La Revue du cinéma, n° 449, mai 1989' },
  { id: 'austin-contemporary-french', type: 'livre', author: 'Guy Austin', title: 'Contemporary French Cinema: An Introduction', year: 1996, publisher: 'Manchester University Press' },
  { id: 'powrie-french-cinema-1990s', type: 'livre', author: 'Phil Powrie (dir.)', title: 'French Cinema in the 1990s: Continuity and Difference', year: 1999, publisher: 'Oxford University Press' },
  { id: 'predal-jeune-cinema', type: 'livre', author: 'René Prédal', title: 'Le Jeune Cinéma français', year: 2002, publisher: 'Nathan' },
  { id: 'tremois-enfants-de-la-liberte', type: 'livre', author: 'Claude-Marie Trémois', title: 'Les Enfants de la liberté : le jeune cinéma français des années 90', year: 1997, publisher: 'Seuil' },
  { id: 'quandt-flesh-and-blood', type: 'article', author: 'James Quandt', title: 'Flesh & Blood: Sex and Violence in Recent French Cinema', year: 2004, publisher: 'Artforum, février 2004' },
  { id: 'beugnet-cinema-and-sensation', type: 'livre', author: 'Martine Beugnet', title: 'Cinema and Sensation: French Film and the Art of Transgression', year: 2007, publisher: 'Edinburgh University Press' },
  { id: 'daney-cine-journal', type: 'livre', author: 'Serge Daney', title: 'Ciné journal, 1981-1986', year: 1986, publisher: 'Cahiers du cinéma' },

  // — Nouvelle Vague —
  { id: 'truffaut-certaine-tendance', type: 'article', author: 'François Truffaut', title: 'Une certaine tendance du cinéma français', year: 1954, publisher: 'Cahiers du cinéma, n° 31', note: 'Pamphlet contre la « tradition de la qualité » ; matrice de la politique des auteurs.' },
  { id: 'de-baecque-nouvelle-vague', type: 'livre', author: 'Antoine de Baecque', title: 'La Nouvelle Vague : portrait d’une jeunesse', year: 1998, publisher: 'Flammarion' },
  { id: 'marie-nouvelle-vague', type: 'livre', author: 'Michel Marie', title: 'La Nouvelle Vague : une école artistique', year: 1997, publisher: 'Nathan' },
  { id: 'douchet-nouvelle-vague', type: 'livre', author: 'Jean Douchet', title: 'Nouvelle Vague', year: 1998, publisher: 'Cinémathèque française / Hazan' },
  { id: 'godard-par-godard', type: 'livre', author: 'Jean-Luc Godard (éd. Alain Bergala)', title: 'Godard par Godard', year: 1985, publisher: 'Cahiers du cinéma', note: 'Entretiens et textes, deux tomes (1985, 1998).' },
  { id: 'frodon-cinema-francais', type: 'livre', author: 'Jean-Michel Frodon', title: 'Le Cinéma français, de la Nouvelle Vague à nos jours', year: 2010, publisher: 'Cahiers du cinéma' },
  { id: 'neupert-french-new-wave', type: 'livre', author: 'Richard Neupert', title: 'A History of the French New Wave Cinema', year: 2002, publisher: 'University of Wisconsin Press' },

  // — École de Berlin et cinéma européen contemporain —
  { id: 'abel-berlin-school', type: 'livre', author: 'Marco Abel', title: 'The Counter-Cinema of the Berlin School', year: 2013, publisher: 'Camden House', note: 'Étude fondatrice de l’École de Berlin comme « contre-cinématographie » allemande.' },
  { id: 'cook-berlin-school', type: 'livre', author: 'Roger F. Cook, Lutz Koepnick, Kristin Kopp, Brad Prager (dir.)', title: 'Berlin School Glossary: An ABC of the New Wave in German Cinema', year: 2013, publisher: 'Intellect', note: 'Lexique collectif des cinéastes, motifs et contextes de la Berliner Schule.' },
  { id: 'fisher-petzold', type: 'livre', author: 'Jaimey Fisher', title: 'Christian Petzold', year: 2013, publisher: 'University of Illinois Press (Contemporary Film Directors)', note: 'Monographie de référence sur Petzold et sa méthode des fantômes historiques.' },
  { id: 'elsaesser-european-cinema', type: 'livre', author: 'Thomas Elsaesser', title: 'European Cinema: Face to Face with Hollywood', year: 2005, publisher: 'Amsterdam University Press', note: 'Cadre théorique du cinéma européen comme « face à face » avec Hollywood : festivals, coproductions, art cinema.' },
  { id: 'brunette-haneke', type: 'livre', author: 'Peter Brunette', title: 'Michael Haneke', year: 2010, publisher: 'University of Illinois Press (Contemporary Film Directors)' },
  { id: 'mai-dardenne', type: 'livre', author: 'Joseph Mai', title: 'Jean-Pierre and Luc Dardenne', year: 2010, publisher: 'University of Illinois Press (Contemporary Film Directors)' },
  { id: 'strauss-almodovar', type: 'livre', author: 'Frédéric Strauss', title: 'Almodóvar: A Passionate Life', year: 2006, publisher: 'Telema' },
  { id: 'nestingen-kaurismaki', type: 'livre', author: 'Andrew Nestingen', title: 'The Cinema of Aki Kaurismäki: Contrarian Stories', year: 2013, publisher: 'Wallflower Press' },
  { id: 'falvey-lanthimos', type: 'livre', author: 'Eddie Falvey', title: 'The Cinema of Yorgos Lanthimos: Films, Form, Philosophy', year: 2020, publisher: 'Bloomsbury' },

  // — Amérique latine contemporaine —
  { id: 'shaw-three-amigos', type: 'livre', author: 'Deborah Shaw', title: 'The Three Amigos: The Transnational Filmmaking of Guillermo del Toro, Alejandro González Iñárritu, and Alfonso Cuarón', year: 2013, publisher: 'Manchester University Press' },
  { id: 'shaw-contemporary-latin', type: 'livre', author: 'Deborah Shaw', title: 'Contemporary Latin American Cinema: Ten Key Films', year: 2003, publisher: 'Continuum' },
  { id: 'elena-diaz-lopez', type: 'livre', author: 'Alberto Elena, Marina Díaz López (dir.)', title: 'The Cinema of Latin America', year: 2003, publisher: 'Wallflower Press' },
  { id: 'nagib-new-brazilian', type: 'livre', author: 'Lúcia Nagib', title: 'The New Brazilian Cinema', year: 2003, publisher: 'I.B. Tauris' },

  // — Japon contemporain —
  { id: 'bingham-contemporary-japanese', type: 'livre', author: 'Adam Bingham', title: 'Contemporary Japanese Cinema Since Hana-Bi', year: 2015, publisher: 'Edinburgh University Press', note: 'Étude de référence de la génération Kore-eda, Kiyoshi Kurosawa, Kawase.' },
  { id: 'gerow-kitano', type: 'livre', author: 'Aaron Gerow', title: 'Kitano Takeshi', year: 2007, publisher: 'British Film Institute' },
  { id: 'mes-midnight-eye', type: 'livre', author: 'Tom Mes, Jasper Sharp', title: 'The Midnight Eye Guide to New Japanese Film', year: 2005, publisher: 'Stone Bridge Press', note: 'Panorama du cinéma japonais des années 1990-2000 : V-cinéma, J-Horror, auteurs.' },
  { id: 'mes-agitator', type: 'livre', author: 'Tom Mes', title: 'Agitator: The Cinema of Takashi Miike', year: 2003, publisher: 'FAB Press' },
  { id: 'jacoby-critical-handbook', type: 'livre', author: 'Alexander Jacoby', title: 'A Critical Handbook of Japanese Film Directors', year: 2008, publisher: 'Stone Bridge Press' },
];

export const SOURCE_BY_ID: Record<string, Source> = Object.fromEntries(SOURCES.map((s) => [s.id, s]));

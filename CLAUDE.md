# Soultan Maçonnerie : contexte pour Claude

Site vitrine de Soultan Doudaev, artisan maçon à Nice (entreprise individuelle, SIREN
829 543 560). Formule 3 « Local » du guide `Entreprise/sites-vitrines/GUIDE.md`.
Objectif : des appels et des demandes de devis. Refonte d'octobre-novembre 2026 sur le socle
de Bati Home Concept ; l'ancien site (avril 2026) est dans l'historique Git.

À lire en premier : `README.md` (structure, build), `MANQUANT.md` (infos attendues de
Soultan), `docs/analyse.md`, `docs/bilan.md`.

## Commandes

- Assembler le site : `node build.mjs` (Node 18+, aucune dépendance), résultat dans `dist/`.
  `APERCU=non node build.mjs` produit la version définitive en local, pour la contrôler.
- Serveur local : `node outils/serveur.js` → http://localhost:5173.
- Vérifier les pages : `node outils/verifier.js 1440 900`, puis 1024 768, 390 844, 375 812.
- Tester le formulaire : `node outils/test-formulaire.js`.
- Dans le conteneur cloud : `CHROME=/usr/bin/google-chrome` (l'option `--no-sandbox` est
  ajoutée seule quand on tourne en root).

## Direction artistique « plan de nuit » (à respecter)

Choisie par Dokka le 3 novembre 2026, inspirée (sans copie) de montarville.ca. Une première
version claire « panneau de chantier » a été refusée : ne pas y revenir. Différente aussi de
Bati Home (crème, olive) et de l'ancien site (noir, bleu ardoise, Bebas Neue).

- Idée : un site sombre et éditorial. Le nom en très grand, des titres en deux tons, un seul
  accent, l'orange de chantier, et en fond de fines lignes de plan d'architecte (murs
  doublés, ouverture de porte, ligne de cote) dans `src/partials/trace.html`.
- Palette, 4 couleurs : nuit `#121315` (fond), plan `#26282C` (barre de menu, cartes,
  boutons secondaires), chaux `#F2F1EC` (texte), signal `#FF6A2B` (accent). Teintes
  dérivées : `#1C1D20` (sections alternées), gris `#95989E` (texte secondaire, moitié
  « éteinte » des titres). Texte toujours foncé sur l'orange. Contrastes vérifiés AA
  (Lighthouse accessibilité 100).
- Une seule police, Archivo variable, hébergée dans `assets/fonts/`. Titres en minuscules,
  graisse 750, interlettrage serré (-0,035 em). Étiquettes et menu : capitales, graisse
  600, interlettrage large.
- Signatures : logotype « soultan » suivi d'un bloc orange carré (un parpaing, pas un
  point) ; titres en deux tons (`<span class="dim">`) ; étiquette précédée d'un bloc orange ;
  boutons à puce carrée ; bouton carré à flèche ↘ (`{{> fleche}}`) ; compteurs « 01 / 04 » ;
  services en grandes lignes numérotées (`.ligne`) ; logotype géant en pied de page.
- Angles droits, aucune ombre, bordures fines (1 px, chaux à 12 %).
- Photos de Soultan en basse définition : grands cadres réservés aux deux photos de 900 px
  (`cabinet-elevation-blocs`, `restaurant-murs-beton`, variantes `-560` pour le mobile) ;
  les autres en vignettes (`.planche`, cartes `.chantier`).
- Animations : les lettres du logotype se posent une à une (0,8 s, opacité de départ 0,2
  pour ne pas retarder l'affichage) et l'apparition douce au défilement. Transform et
  opacity uniquement, coupées si l'utilisateur demande moins de mouvement.
- Interdit : dégradés décoratifs, ombres portées, coins arrondis, emoji, compteurs animés,
  effet machine à écrire, curseur personnalisé, photos de banque d'images, cercles en fond
  (signature de la référence : ne pas copier), rouge.

## Règles de contenu

- Ne rien inventer : toute info non confirmée par Soultan est un repère
  `<span class="todo">[…]</span>` listé dans `MANQUANT.md`. Jamais de faux avis : l'ancien
  site affichait 3 avis sans nom ni source, ils ont été retirés.
- Chiffres retirés faute de preuve : « 50+ projets », « 100 % satisfaction », « 100 %
  garantis », « devis sous 48 h », « disponible 6j/7 ». Ne pas les remettre sans
  confirmation.
- Les FAQ ne donnent que des règles générales vérifiables (urbanisme, technique) ou des
  repères à compléter : jamais de délai, de prix ou de garantie non confirmés.
- Nom de l'entreprise générale : « Rodari Charles & Fils » (Nyons, Drôme). L'ancien site
  écrivait « Rodarie » ; orthographe corrigée d'après les annuaires, à confirmer.
- Assurance : la décennale (MIC Insurance Company, AXE2200096) couvre la maçonnerie et le
  béton armé, pas les piscines ni les murs de soutènement autonomes. Ne proposer sur le site
  que des travaux couverts (voir `MANQUANT.md`).
- Typographie française : `build.mjs` insère l'espace fine insécable avant ? ! ; :.

## Points techniques à connaître

- Hébergement : Vercel (choix de Dokka, novembre 2026). `vercel.json` lance `node build.mjs`,
  sert `dist/`, pose les en-têtes de sécurité et redirige les anciennes adresses `.html`.
- Formulaire : Formspree (`FORMSPREE` dans `build.mjs`), pas de PHP sur Vercel. Champ piège
  `_gotcha`. Pas de photos jointes (offre gratuite de Formspree) : le formulaire propose de
  les envoyer sur WhatsApp.
- `build.mjs` refuse un titre de plus de 60 caractères, une description de plus de 160, une
  page sans `h1` unique ; il retire les `<img>` dont le fichier `media/` manque.
- Champ d'en-tête `travaux` : les liens « Devis » de la page ouvrent le formulaire à l'étape 2.
- `src/racine/` est copié tel quel à la racine (fichier de validation Google Search Console).

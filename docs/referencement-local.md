# Fiche Google et référencement local (phases 8 et 9 du guide)

Préparé le 4 novembre 2026. Tout est prêt à copier-coller. Cocher au fur et à mesure.

## 1. Créer la fiche (15 minutes)

Sur [business.google.com](https://business.google.com), avec le compte Google de Dokka (on
ajoutera Soultan comme propriétaire plus tard, menu « Personnes et accès »).

- [ ] **Nom** : `Soultan Maçonnerie` (exactement, sans ajouter « Nice » ni « maçon » : Google
  sanctionne les mots-clés dans le nom).
- [ ] **Catégorie principale** : `Maçon`.
- [ ] **Catégories secondaires** (2 ou 3, prendre celles que Google propose en tapant) :
  `Entreprise de construction`, `Entrepreneur en béton`, `Entreprise de rénovation`.
- [ ] **Adresse** : répondre **non** à « Voulez-vous ajouter un lieu que les clients peuvent
  visiter ? » (Soultan va chez ses clients). L'adresse reste connue de Google mais masquée.
- [ ] **Zone desservie** : Nice, Saint-Laurent-du-Var, Cagnes-sur-Mer, Vence, Antibes,
  Cannes, Grasse, Menton.
- [ ] **Téléphone** : `06 87 82 83 29`.
- [ ] **Site web** : `https://soultanmaconnerie.com/`
- [ ] **Validation** : Google demande souvent une courte vidéo. Filmer d'un seul plan : le
  camion ou les outils de Soultan, un chantier en cours, puis un document à son nom (Kbis,
  attestation d'assurance ou facture). Compter quelques jours d'attente.

## 2. Compléter la fiche (une fois validée)

- [ ] **Horaires** : les vrais horaires de Soultan (à lui demander).
- [ ] **Description** (619 caractères sur 750, aucun lien autorisé) :

```
Soultan Maçonnerie, c'est Soultan Doudaev, artisan maçon à Nice depuis 15 ans. Il réalise le gros œuvre des maisons et des bâtiments : murs en blocs, brique ou pierre, ouvertures et linteaux, fondations, dalles et murs en béton armé, rénovation et reprises de murs, murets, terrasses et dallages extérieurs, ainsi que les cloisons et doublages en placo en complément de ses chantiers. Il travaille pour les particuliers et en sous-traitance pour des entreprises du bâtiment, de Nice à Cannes et Menton. Soultan vient voir le chantier, puis remet un devis écrit, gratuit et détaillé poste par poste. Assuré en décennale.
```

- [ ] **Services** (menu « Modifier les services », un par ligne avec sa description) :

| Service | Description |
| --- | --- |
| Maçonnerie générale | Murs porteurs et de refend en blocs, brique ou pierre, ouvertures et linteaux, raccords de maçonnerie. |
| Béton et fondations | Semelles, longrines, dalles et murs en béton armé, coulés sur un terrain bien préparé. |
| Rénovation du gros œuvre | Démolition, ouverture de murs porteurs avec étaiement, reprises en sous-œuvre, extensions. |
| Aménagements extérieurs | Murets, clôtures, terrasses, dallages, escaliers et allées en béton. |
| Placo et cloisons | Cloisons, doublages isolants et faux plafonds, en complément des travaux de maçonnerie. |

- [ ] **Logo** : `docs/fiche-google/logo.png`.
- [ ] **Photo de couverture** : `docs/fiche-google/couverture.png`.
- [ ] **Photos de chantier** (10 à 15) : celles du dossier `media/`, en commençant par
  `cabinet-elevation-blocs.jpg`, `restaurant-murs-beton.jpg`, `villa-pierre.jpg`,
  `villa-escalier-beton.jpg`. Elles sont petites : dès que Soultan a de nouvelles photos
  prises au téléphone, les ajouter (c'est ce qui fait le plus vivre une fiche).
- [ ] **Première publication** (menu « Ajouter une actualité », avec une photo de chantier) :

```
Nouveau site internet ! Retrouvez nos chantiers de maçonnerie et de gros œuvre, et demandez votre devis gratuit en deux minutes : murs, dalles, fondations, ouvertures, rénovation et extérieurs, à Nice et dans les Alpes-Maritimes.
```
  Bouton : « En savoir plus », lien `https://soultanmaconnerie.com/`.

## 3. Les avis (le plus gros levier)

- [ ] Récupérer le **lien d'avis** de la fiche (bouton « Demander des avis ») et l'envoyer
  à Claude : il sera ajouté au site (bouton « Laisser un avis », lien vers la fiche dans les
  données structurées).
- [ ] Soultan envoie ce message à ses derniers clients satisfaits (particuliers, et aussi
  les entreprises avec qui il travaille) :

```
Bonjour, merci encore pour votre confiance. Si vous êtes satisfait des travaux, un petit avis Google m'aiderait beaucoup : [lien de la fiche]
Merci et à bientôt, Soultan
```

- [ ] Répondre à chaque avis, par exemple :

```
Merci beaucoup [Prénom] pour votre confiance et ce retour ! Ravi que [les travaux] vous plaisent. N'hésitez pas à me recontacter pour vos prochains travaux. Soultan
```

Règles : jamais d'avis écrit par Soultan ou un proche, jamais de cadeau contre un avis
(Google supprime les avis et peut suspendre la fiche).

## 4. Déclarer le site (même jour)

- [ ] [Google Search Console](https://search.google.com/search-console) : la propriété
  `soultanmaconnerie.com` est peut-être déjà validée (fichier `google9ba59a6e6fdd6d73.html`
  conservé). Envoyer le sitemap `https://soultanmaconnerie.com/sitemap.xml`, puis demander
  l'indexation de l'accueil et des 5 pages de service (Inspection de l'URL).
- [ ] [Bing Webmaster Tools](https://www.bing.com/webmasters) : « Importer depuis Google
  Search Console ».

## 5. Semaine 1 : mêmes infos partout

Mêmes nom, téléphone et site sur : PagesJaunes, Obat (fiche artisan), Travaux.com, Cylex,
Apple Business Connect, Bing Places. Demander à Rodari Charles & Fils et Batri Diaz s'ils
ont une page partenaires où ils pourraient citer Soultan avec un lien.

## 6. Suivi

- J+7 : pages indexées dans Search Console (rubrique Pages).
- J+30 : impressions, clics, appels et itinéraires de la fiche, nouveaux avis : à reporter
  dans `docs/bilan.md`.
- Chaque mois : une publication et quelques photos sur la fiche.

# Ce qui manque pour mettre le site en ligne

Mis à jour le 3 novembre 2026. Les repères orange du site (`<span class="todo">`) renvoient
ici. Priorités : **bloquant** (pas de mise en ligne sans), **important** (à avoir dans le
mois), **confort**.

## Bloquant (mentions légales et obligations)

| Info | Où sur le site | Qui |
| --- | --- | --- |
| Assurance décennale : assureur, n° de contrat, zone couverte | Mentions légales, FAQ accueil, page L'artisan | Soultan |
| Médiateur de la consommation (obligatoire avec des particuliers) | Mentions légales | Soultan (adhésion si aucun) |
| TVA : numéro intracommunautaire, ou franchise « TVA non applicable, art. 293 B du CGI » | Mentions légales | Soultan |
| Téléphone de l'hébergeur Vercel, adresse à revérifier | Mentions légales | Dokka |
| Le domaine `soultanmaconnerie.com` est-il au nom de Soultan ? Sinon, le transférer | build.mjs (`SITE`) | Dokka |
| Compte Formspree : à quel nom ? Adresse de réception des demandes ; transférer au nom de Soultan | build.mjs (`FORMSPREE`) | Dokka |
| Envoyer une vraie demande de test depuis l'aperçu, vérifier qu'elle arrive hors indésirables | Formulaire | Dokka |

## À reconfirmer (repris de l'ancien site, non vérifié)

| Info | Où |
| --- | --- |
| « Maçon depuis 15 ans » (l'entreprise individuelle date d'environ 2017 : 15 ans de métier, pas d'entreprise) | Accueil, L'artisan |
| Orthographe « Rodari Charles & Fils » (l'ancien site écrivait « Rodarie ») | Accueil, réalisations |
| Nom exact « Batri Diaz Constructions » et promoteur « Delta » (introuvables en ligne) | Accueil, logements collectifs |
| Cabinet médical et restaurant à Saint-Martin-de-la-Brasque (Vaucluse) | Fiches chantier |
| Photos : prises par Soultan ? Les fichiers `rodari_361.lg.jpg` et `rodari_maison.jpg` ressemblent à des images du site de Rodari : si oui, demander l'accord de Rodari ou les retirer | Réalisations, piscine, extérieurs |
| WhatsApp actif sur le 06 87 82 83 29 | Barre mobile, formulaire, merci |
| Liste des communes desservies (Nice, Saint-Laurent-du-Var, Cagnes-sur-Mer, Vence, Antibes, Cannes, Grasse, Menton) | Accueil (#zone), données structurées |
| C'est Soultan qui fait la visite, le devis et le chantier (pas d'équipe ?) | Accueil, L'artisan |
| Il fait bien les 6 services, dont le placo et les piscines | Toutes les pages de service |
| Adresse 88 avenue Sainte-Marguerite : à afficher ou non (domicile ?) | Mentions légales, données structurées |

## Important

| Info | Où |
| --- | --- |
| Prix « à partir de » : mur en blocs (m²), dalle (m²), cloison placo (m²), structure de piscine, ouverture de mur porteur, muret (mètre) | Les 6 pages de service |
| Durée et détail des travaux de chaque chantier (cabinet, restaurant, villas, logements) ; communes des villas et des logements | Fiches chantier |
| Quelques lignes sur son parcours : où il a appris, pourquoi à son compte | Page L'artisan |
| Une photo de Soultan sur un chantier (`media/soultan-chantier.jpg`) | Page L'artisan |
| Photos originales en haute définition (les actuelles font souvent 250 × 200 px) | Partout |
| Photos d'un chantier de placo | Page Placo |
| Fiche Google Business Profile : existe-t-elle ? Sinon la créer au nom de Soultan | Phase 9 du guide |
| 3 vrais avis Google complets, mot pour mot, quand la fiche en aura | Section avis à créer |

## Confort

| Info | Où |
| --- | --- |
| Choix pour l'IA : recherche et réponses oui, entraînement non (`Content-Signal` de robots.txt) | build.mjs |
| Statistiques sans cookie (Plausible) : oui ou non | layout + mentions légales |
| Accord écrit de Soultan pour la mention « Site réalisé par Dokka », un témoignage et l'étude de cas du portfolio | Phase 0 du guide |

## Retiré de l'ancien site (ne pas remettre sans preuve)

- 3 avis cinq étoiles sans nom ni source.
- « 50+ projets réalisés », « 100 % satisfaction client », « 100 % travaux garantis »,
  « devis sous 48 h », « disponible 6j/7 », « déplacement rapide ».
- Listes de missions détaillées des chantiers (planchers techniques pour domotique, etc.),
  écrites sans source : remplacées par ce que montrent les photos.
- Google Analytics jamais configuré (`GA_MEASUREMENT_ID`), polices Google : retirés.

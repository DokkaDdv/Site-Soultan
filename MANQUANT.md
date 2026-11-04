# Ce qui manque pour mettre le site en ligne

Mis à jour le 4 novembre 2026. Les repères orange du site (`<span class="todo">`) renvoient
ici. Priorités : **bloquant** (pas de mise en ligne sans), **important** (à avoir dans le
mois), **confort**.

## Bloquant (mentions légales et obligations)

| Info | Où sur le site | Qui |
| --- | --- | --- |
| Médiateur de la consommation : écarté par Dokka le 4 novembre 2026 (section retirée des mentions légales). Obligation légale dès qu'on travaille pour des particuliers (articles L.612-1 et L.641-1 du Code de la consommation, amende administrative possible) : à régler plus tard | Mentions légales | Soultan |

## Réglé le 4 novembre 2026

- Prix « à partir de » : retirés des pages de service (choix de Dokka).
- Photo de Soultan : pas de photo (choix de Dokka) ; la page L'artisan montre un chantier.
- **Valeurs provisoires** (`<span class="ex">`, accord de Soultan transmis par Dokka) : durées
  du cabinet médical (environ 3 mois) et du restaurant (environ 2 mois), communes des villas
  (Drôme provençale et Vaucluse) et des logements (Provence), détail des travaux des 4
  chantiers, paragraphe sur le parcours de Soultan. À remplacer par les vraies infos dès
  que possible ; `EXEMPLES_ACCEPTES` dans `build.mjs` autorise leur publication.

- Décennale : MIC Insurance Company, contrat n° AXE2200096 (donné par Dokka). Adresse du
  siège d'après le registre de l'ACPR : 29 rue de Bassano, 75008 Paris.
- Formulaire : `https://formspree.io/f/xaqlljda`, confirmé par Dokka.
- Domaine `soultanmaconnerie.com` : payé et détenu par Dokka, accepté (Soultan est son
  père). Exception à la règle « comptes au nom du client », décidée par Dokka.
- TVA : factures « exonérées de TVA » : mention « TVA non applicable, article 293 B du CGI ».
  Conseil : écrire cette mention exacte sur les factures de Soultan.
- Décennale : activité « maçonnerie et béton armé » (plâtrerie et carrelage en travaux
  accessoires), France métropolitaine et DROM. **Ni les piscines ni les parois de
  soutènement autonomes ne sont couvertes** : page Piscines et murs de soutènement retirés
  du site (décision de Dokka). À remettre seulement si le contrat est étendu.
- Hébergeur : Vercel ne publie aucun numéro de téléphone vérifiable ; les mentions donnent
  l'adresse et la page de contact officielle `vercel.com/contact`.

## Confirmé par Dokka le 4 novembre 2026

Repris de l'ancien site et validés tels quels : « maçon depuis 15 ans », Rodari Charles &
Fils, Batri Diaz Constructions et le promoteur Delta, cabinet médical et restaurant à
Saint-Martin-de-la-Brasque, WhatsApp sur le 06 87 82 83 29, liste des communes, Soultan seul
de la visite au chantier, les 5 services, adresse affichée dans les mentions légales.
Formulaire Formspree testé : la demande arrive.

Photos : les deux images qui semblaient venir du site de Rodari (`rodari_361.lg.jpg`,
`rodari_maison.jpg`) ont été retirées par prudence ; les autres sont de Soultan.

## Important

| Info | Où |
| --- | --- |
| Photos originales en haute définition (les actuelles font souvent 250 × 200 px) | Partout |
| Photos d'un chantier de placo | Page Placo |
| Fiche Google Business Profile : à créer, tout est prêt dans `docs/referencement-local.md` | Phase 9 du guide |
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

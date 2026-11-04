# Bilan à chaud : Soultan Maçonnerie (refonte, formule 3)

Écrit le 3 novembre 2026, mis à jour à la mise en ligne le 4 novembre 2026. À compléter à J+30 et J+90.

## Le projet

- Client : Soultan Doudaev, artisan maçon à Nice, entreprise individuelle (SIREN
  829 543 560). Site fait par Dokka, offert (proche de la famille).
- Point de départ : un site d'avril 2026 fait avant le guide (composants chargés en
  JavaScript, Formspree, Google Fonts, Google Analytics jamais configuré, avis et chiffres
  non sourcés, images en partie « trouvées en ligne » selon ses propres mentions légales).
- Refonte sur le socle Bati Home (`build.mjs`, partials, outils), adapté à Vercel :
  Formspree à la place de `devis.php`, `vercel.json` pour les en-têtes et les redirections
  des anciennes adresses `.html`.
- Résultat : 14 pages indexables (accueil, 5 services, réalisations et 4 fiches chantier,
  l'artisan, devis en 3 étapes, mentions légales), plus merci et 404.
- Deux directions artistiques : une première claire « panneau de chantier », refusée par
  Dokka (« la page d'accueil fait vibecodée ») ; puis « plan de nuit », sombre et
  éditoriale, inspirée de montarville.ca sans la copier (voir `CLAUDE.md`).

## Mesures en labo (3 novembre 2026, Lighthouse 12.6, mobile simulé)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP |
| --- | --- | --- | --- | --- | --- |
| Accueil | 95 | 100 | 100 | 92 hors aperçu | 3,0 s |
| Piscine maçonnée | 99 | 100 | 100 | 92 hors aperçu | 2,0 s |
| Devis | 99 | 100 | 100 | 92 hors aperçu | 1,8 s |

SEO à 92 en version définitive (contrôlé le 4 novembre 2026 avant la mise en ligne) : seul reste l'avertissement
sur la ligne `Content-Signal` de robots.txt, gardée volontairement (guide, brique B14). En
aperçu, 61, à cause du `noindex` voulu.

`outils/verifier.js` : 0 erreur, 0 débordement en 375, 390, 1024 et 1440 px.
`outils/test-formulaire.js` : validation par étape, clic réel, arrivée depuis un service.

## Temps passé

Une session (environ une journée de travail de l'agent), dont une refonte complète de la
direction artistique. Plus rapide que Bati Home grâce au socle et au guide.

## Ce qui a coûté du temps (et comment l'éviter)

| Problème | Ce qu'il faut faire la prochaine fois |
| --- | --- |
| Première direction artistique refusée en bloc | Montrer 2 ou 3 pistes en images (ou demander un site de référence) avant de construire toutes les pages |
| Contenus de l'ancien site inventés (avis anonymes, « 50+ projets », « 100 % satisfaction ») | Auditer l'ancien site en phase 0 et lister ce qui est retiré dans `MANQUANT.md` |
| Nom d'un client de référence mal orthographié (« Rodarie » pour Rodari) | Vérifier chaque nom propre dans un annuaire en phase 1 |
| Photos de 250 × 200 px | Demander les originaux dès la phase 2 ; adapter la mise en page (vignettes) en attendant |
| Hébergement Vercel : pas de PHP, donc pas de `devis.php` ni de photos jointes au devis | Décider l'hébergeur en phase 0 ; sur Vercel, Formspree et photos par WhatsApp |
| Césure automatique des titres (« RÉNOVA-TION ») et mots longs qui débordent en capitales larges | Pas de `hyphens: auto` sur les titres ; tester les mots longs en 375 px |
| Test du formulaire faux négatif avec le défilement doux | `scrollIntoView({ behavior: 'instant' })` dans les tests |
| Espace avant « ? » qui laisse le point d'interrogation seul en début de ligne | `build.mjs` insère l'espace fine insécable avant ? ! ; : |
| Le site proposait des travaux que la décennale ne couvre pas (piscines, soutènement) | Demander l'attestation d'assurance en phase 0 et ne vendre sur le site que les activités couvertes |

## Ce qui reste à prouver

- Les infos de `MANQUANT.md` : médiateur écarté pour l'instant, demande de test à faire.
- Une vraie demande reçue par Soultan depuis le site en ligne.
- Le référencement local : il n'y a ni fiche Google connue ni avis. Les chantiers de
  référence sont en Drôme et Vaucluse : il faudra des chantiers niçois.

## Résultats

| Date | Pages indexées | Impressions | Clics | Appels / demandes | Avis | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| J+30 | | | | | | |
| J+90 | | | | | | |

# Soultan Maçonnerie

Site vitrine de Soultan Doudaev, artisan maçon à Nice. Formule 3 « Local » du guide
Dokka (`Entreprise/sites-vitrines/GUIDE.md`), sur le socle de Bati Home Concept.
Hébergement Vercel, domaine `soultanmaconnerie.com`.

## Structure

```
build.mjs            assemble src/ dans dist/ (sitemap, robots.txt, llms.txt, données structurées)
src/layout.html      gabarit commun (en-tête, données de l'entreprise)
src/partials/        blocs partagés : {{> header}}, {{> cta}}, {{> devis-form}}…
src/pages/           une page par fichier, en-tête JSON en commentaire (title, description…)
src/racine/          fichiers copiés tels quels à la racine (validation Search Console)
assets/              css/site.css, js/site.js, fonts/ (Archivo), favicon.svg
media/               photos de chantier (moins de 200 Ko chacune)
outils/              serveur.js, verifier.js, test-formulaire.js
vercel.json          build, en-têtes de sécurité, redirections des anciennes adresses .html
```

## Pages (15 indexables)

Accueil · 6 services (maçonnerie générale, béton et fondations, placo et cloisons, piscines
maçonnées, rénovation du gros œuvre, aménagements extérieurs) · Réalisations et 4 fiches
chantier (cabinet médical, restaurant, villas, logements collectifs) · L'artisan · Devis
(3 étapes) · Mentions légales et confidentialité. Plus `merci` et `404`, non indexées.

## Travailler sur le site

```bash
node build.mjs
node outils/serveur.js
```

Puis http://localhost:5173. Vérifications : `node outils/verifier.js 390 844` et
`node outils/test-formulaire.js` (serveur lancé).

## Mise en ligne

1. Remplir `MANQUANT.md` (partie bloquante), plus aucun repère orange bloquant.
2. Dans `build.mjs` : `const APERCU = false`.
3. Fusionner la branche dans `main` : Vercel publie la production sur le domaine.
4. Suivre les phases 8 à 10 du guide (Search Console, Bing, fiche Google, annuaires).

// Assemble src/pages avec src/layout.html et src/partials dans dist/. Aucune dépendance.
// Usage : node build.mjs   (Node 18 ou plus). Socle repris de Bati Home Concept, adapté à Vercel.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { execSync } from 'node:child_process';

const SITE = 'https://soultanmaconnerie.com'; // domaine actuel (propriétaire à confirmer, MANQUANT.md)
const OUT = 'dist';
// Aperçu : aucune page indexée par les moteurs (balise robots). Passer à false à la mise en ligne.
const APERCU = process.env.APERCU !== "non"; // APERCU=non node build.mjs : contrôle de la version définitive en local
// Formulaire de devis : Formspree (hébergement Vercel, pas de PHP). Compte à transférer au client (MANQUANT.md).
const FORMSPREE = 'https://formspree.io/f/xaqlljda';
// Communes de la liste #zone de l'accueil (provisoire, MANQUANT.md), reprises dans les données structurées
const ZONE = ['Nice', 'Saint-Laurent-du-Var', 'Cagnes-sur-Mer', 'Vence', 'Antibes', 'Cannes', 'Grasse', 'Menton'];
const ville = (name) => ({ '@type': 'City', name });
const TEL = { affiche: '06 87 82 83 29', lien: '+33687828329', whatsapp: '33687828329' };

const read = (f) => readFileSync(f, 'utf8');
const withPartials = (s) => s.replace(/\{\{> ([\w-]+)\}\}/g, (_, n) => withPartials(read(`src/partials/${n}.html`)));
// Dates réelles d'une page d'après Git (création, dernière modification), sinon date du fichier
const gitDate = (f, args) => {
  try { const d = execSync(`git log ${args} --format=%cs -- "${f}"`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().split(/\s+/).pop(); if (d) return d; } catch {}
  return statSync(f).mtime.toISOString().slice(0, 10);
};
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));

// Données structurées tirées du contenu visible : fil d'Ariane, FAQ, page, service
const text = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
function jsonLd(html, page) {
  const out = [];
  const crumbs = html.match(/<nav class="crumbs[^"]*"[^>]*>([\s\S]*?)<\/nav>/);
  if (crumbs) {
    const items = [...crumbs[1].matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>|<span>([^<]+)<\/span>/g)]
      .map((m, i) => ({ '@type': 'ListItem', position: i + 1, name: m[2] || m[3], item: m[1] ? SITE + m[1] : page.url }));
    out.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items });
  }
  // Seules les réponses complètes (sans repère à compléter) partent dans les données structurées
  const faq = [...html.matchAll(/<details data-reveal><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)]
    .filter((m) => !m[2].includes('class="todo"'))
    .map((m) => ({ '@type': 'Question', name: text(m[1]), acceptedAnswer: { '@type': 'Answer', text: text(m[2]) } }));
  if (faq.length) out.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq });
  out.push({ '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, url: page.url, inLanguage: 'fr-FR', datePublished: page.published, dateModified: page.modified, author: { '@id': `${SITE}/#entreprise` }, publisher: { '@id': `${SITE}/#entreprise` } });
  if (page.service) out.push({ '@context': 'https://schema.org', '@type': 'Service', name: page.service, serviceType: page.service, description: page.description, url: page.url, provider: { '@id': `${SITE}/#entreprise` }, areaServed: page.ville ? [ville(page.ville)] : ZONE.map(ville) });
  return out.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>\n`).join('');
}

rmSync(OUT, { recursive: true, force: true });
const layout = read('src/layout.html');
const urls = [], pages = [];
let todos = 0;

for (const file of walk('src/pages')) {
  const src = read(file);
  const head = src.match(/^<!--\s*(\{[\s\S]*?\})\s*-->/);
  if (!head) throw new Error(`${file} : en-tête JSON manquant`);
  const meta = JSON.parse(head[1]);
  if (meta.title.length > 60) throw new Error(`${file} : titre de ${meta.title.length} caractères (60 au plus)`);
  if (meta.description.length > 160) throw new Error(`${file} : description de ${meta.description.length} caractères (160 au plus)`);
  // Valeurs d'exemple (<span class="ex">) : interdites hors aperçu
  if (!APERCU && src.includes('class="ex"')) throw new Error(`${file} : valeurs d'exemple à remplacer avant la mise en ligne`);
  const name = relative('src/pages', file).replace(/\\/g, '/').replace(/\.html$/, '');
  const path = name === 'index' ? '/' : `/${name}/`;
  const page = {
    site: SITE, url: SITE + path, image: '/media/cabinet-elevation-blocs.jpg', robots: 'index,follow',
    bodyClass: meta.home ? 'is-home' : 'is-inner',
    modified: gitDate(file, '-1'), published: gitDate(file, '--diff-filter=A --follow'),
    zoneJson: JSON.stringify(ZONE.map(ville)), formspree: FORMSPREE,
    tel: TEL.affiche, telLien: TEL.lien, whatsapp: TEL.whatsapp,
    ...meta,
  };
  let html = withPartials(layout.replace('{{content}}', src.slice(head[0].length)));
  html = html.replace(/\{\{(\w+)\}\}/g, (_, k) => (k === 'robots' && APERCU ? 'noindex,nofollow' : page[k] ?? ''));
  // Typographie française : espace insécable fine avant ? ! ; : (hors scripts)
  html = html.split(/(<script[\s\S]*?<\/script>)/).map((part, i) => (i % 2 ? part : part.replace(/ ([?!;:])(?=[\s<&])/g, '\u202f$1'))).join('');
  html = html.replace('</head>', `${jsonLd(html, page)}</head>`);
  if (path !== '/') html = html.replace(new RegExp(`href="${path}"`, 'g'), `href="${path}" aria-current="page"`);
  // Photo pas encore fournie (MANQUANT.md) : on la retire, le cadre « à venir » reste
  html = html.replace(/<img [^>]*src="\/media\/([^"]+)"[^>]*>/g, (m, a) => (existsSync(`media/${a}`) ? m : ''));
  // Depuis une page de service, le formulaire de devis s'ouvre avec le type de travaux déjà choisi
  if (page.travaux) html = html.replace(/href="\/devis\/"/g, `href="/devis/?travaux=${encodeURIComponent(page.travaux)}"`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) throw new Error(`${file} : il faut exactement un titre h1`);
  todos += (html.match(/class="todo"/g) || []).length;

  const out = name === '404' ? '404.html' : name === 'index' ? 'index.html' : `${name}/index.html`;
  mkdirSync(dirname(join(OUT, out)), { recursive: true });
  writeFileSync(join(OUT, out), html);
  if (page.robots.startsWith('index')) { urls.push(page.url); pages.push(page); }
}

for (const d of ['assets', 'media']) cpSync(d, join(OUT, d), { recursive: true });
// Fichiers servis tels quels à la racine (vérification Google Search Console…)
cpSync('src/racine', OUT, { recursive: true });
// Usage par l'IA : recherche et réponses oui, entraînement non (choix à valider, MANQUANT.md)
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=no\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
// Résumé du site pour les assistants IA (format llmstxt.org)
pages.sort((a, b) => a.url.localeCompare(b.url));
writeFileSync(join(OUT, 'llms.txt'), `# Soultan Maçonnerie

> Artisan maçon à Nice (Alpes-Maritimes), entreprise individuelle de Soultan Doudaev : maçonnerie générale, béton et fondations, placo et cloisons, rénovation du gros œuvre et aménagements extérieurs, pour les particuliers et les entreprises du bâtiment. Téléphone : ${TEL.affiche}. SIREN 829 543 560.

## Pages

${pages.map((p) => `- [${p.title}](${p.url}): ${p.description}`).join('\n')}
`);
urls.sort();
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`);
console.log(`${urls.length} pages indexables → ${OUT}/${APERCU ? ' (aperçu : noindex partout)' : ''}${todos ? `, ${todos} repères à compléter (MANQUANT.md)` : ''}`);

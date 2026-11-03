// Teste le formulaire de devis : validation par étape, passage automatique au clic,
// préremplissage depuis une page de service. Le serveur local doit tourner (outils/serveur.js).
// Usage : node outils/test-formulaire.js
const { spawn } = require('child_process'); const path = require('path'); const os = require('os');
const CHROME = process.env.CHROME || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); const port = 9520;
const chrome = spawn(CHROME, ['--headless=new', ...(process.getuid && process.getuid() === 0 ? ['--no-sandbox'] : []), `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(os.tmpdir(), 'sm-chrome-' + Date.now())}`, '--window-size=1440,900', '--no-first-run', 'about:blank']);
let ws, id = 0; const pending = new Map();
const send = (m, p = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (e) => { const r = await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 300)); return r.result.value; };
(async () => {
  let t; for (let k = 0; k < 50; k++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (t.length) break; } catch {} await sleep(200); }
  ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
  ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(d.error.message)) : p.res(d.result); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:5173/devis/' }); await sleep(1500);
  const r = await ev(`(async () => {
    const f = document.querySelector('form.devis'), steps = [...f.querySelectorAll('.step')];
    const at = () => steps.findIndex((s) => s.classList.contains('is-active'));
    const next = (i) => steps[i].querySelector('[data-next]').click();
    const out = {};
    next(0); out.vide = at();
    f.querySelector('input[name=travaux][value="Maçonnerie générale"]').click(); next(0); out.apresChoix = at();
    next(1); out.communeVide = at();
    f.querySelector('[name=commune]').value = 'Nice'; next(1); out.apresCommune = at();
    steps[2].querySelector('[data-prev]').click(); out.retour = at();
    next(1);
    f.querySelector('[name=nom]').value = 'Test'; f.querySelector('[name=telephone]').value = '0600000000';
    out.valide = f.checkValidity();
    out.bouton = f.querySelector('[type=submit]').textContent.trim();
    out.etape = document.querySelector('[data-step-n]').textContent;
    out.champs = [...new FormData(f).keys()].join(',');
    return out;
  })()`);
  console.log(JSON.stringify(r, null, 1));
  /* Clic réel à la souris sur un type de travaux : passage automatique à l'étape 2 */
  await send('Page.navigate', { url: 'http://localhost:5173/devis/' }); await sleep(1500);
  const box = await ev(`(() => { const l = document.querySelectorAll('form.devis .chip')[2]; l.scrollIntoView({block:'center', behavior:'instant'}); const r = l.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
  await sleep(300);
  for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: box.x, y: box.y, button: 'left', clickCount: 1 });
  await sleep(600);
  console.log('clic souris →', await ev(`({ etape: document.querySelector('[data-step-n]').textContent, choix: document.querySelector('input[name=travaux]:checked')?.value })`));
  /* Arrivée depuis une page de service */
  await send('Page.navigate', { url: 'http://localhost:5173/devis/?travaux=Piscine' }); await sleep(1500);
  console.log('depuis service →', await ev(`({ etape: document.querySelector('[data-step-n]').textContent, choix: document.querySelector('input[name=travaux]:checked')?.value, actif: [...document.querySelectorAll('.step')].findIndex(s => s.classList.contains('is-active')) })`));
  ws.close(); chrome.kill(); process.exit(0);
})().catch((e) => { console.error(e); chrome.kill(); process.exit(1); });

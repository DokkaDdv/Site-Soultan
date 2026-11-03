// Vérifie chaque page dans Chrome sans interface : erreurs JavaScript, débordement horizontal,
// repères « à compléter », et capture pleine page. Le serveur local doit tourner (outils/serveur.js).
// Usage : node outils/verifier.js [largeur] [hauteur] [dossier des captures] [/chemin,/chemin…]
// Exemples : node outils/verifier.js 1440 900   puis   node outils/verifier.js 390 844
const { spawn } = require('child_process'); const fs = require('fs'); const path = require('path'); const os = require('os');
const CHROME = process.env.CHROME || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
const W = +process.argv[2] || 1440, H = +process.argv[3] || 900, out = process.argv[4] || path.join(__dirname, 'captures', String(W)); fs.mkdirSync(out, { recursive: true });
// Par défaut : toutes les pages assemblées dans dist/
const pages = (d, u = '/') => fs.readdirSync(d, { withFileTypes: true }).flatMap((f) => f.isDirectory() ? pages(path.join(d, f.name), u + f.name + '/') : f.name === 'index.html' ? [u] : f.name === '404.html' ? ['/404.html'] : []);
const list = process.argv[5] ? process.argv[5].split(',') : pages(path.join(__dirname, '..', 'dist'));
const mobile = W < 768, port = 9500 + (mobile ? 1 : 0);
const chrome = spawn(CHROME, ['--headless=new', ...(process.getuid && process.getuid() === 0 ? ['--no-sandbox'] : []), `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(os.tmpdir(), 'sm-chrome-' + Date.now())}`, `--window-size=${W},${H}`, '--hide-scrollbars', '--no-first-run', '--autoplay-policy=no-user-gesture-required', 'about:blank']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let ws, id = 0; const pending = new Map(); let errors = [];
const send = (m, p = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (e) => { const r = await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 300)); return r.result.value; };
(async () => {
  let t; for (let k = 0; k < 50; k++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (t.length) break; } catch {} await sleep(200); }
  ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
  ws.addEventListener('message', (m) => { const d = JSON.parse(m.data);
    if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.exception?.description?.split('\n')[0] || d.params.exceptionDetails.text);
    if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error' && !/404/.test(d.params.entry.text)) errors.push(d.params.entry.text);
    if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(d.error.message)) : p.res(d.result); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile });
  if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  for (const p of list) {
    errors = [];
    await send('Page.navigate', { url: 'http://localhost:5173' + p }); await sleep(1500);
    const h = await ev('document.documentElement.scrollHeight');
    for (let y = 0; y < h; y += Math.round(H * 0.7)) { await ev(`window.scrollTo(0, ${y}); 1`); await sleep(250); }
    await sleep(1200); await ev('window.scrollTo(0, 0); 1'); await sleep(600);
    const info = await ev(`({ h: document.documentElement.scrollHeight, todo: document.querySelectorAll('.todo').length, h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim().slice(0, 60)), overflow: Math.max(document.documentElement.scrollWidth, innerWidth) > ${W} })`);
    const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 60, captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: Math.min(info.h, 9000), scale: mobile ? 0.6 : 0.5 } });
    const name = (p.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home');
    fs.writeFileSync(path.join(out, name + '.jpg'), Buffer.from(r.data, 'base64'));
    console.log(p, JSON.stringify(info), errors.length ? 'ERREURS ' + JSON.stringify(errors) : 'ok');
  }
  ws.close(); chrome.kill(); process.exit(0);
})().catch((e) => { console.error(e); chrome.kill(); process.exit(1); });

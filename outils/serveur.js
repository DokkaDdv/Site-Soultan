// Serveur local du site assemblé (dist/), avec lecture partielle des vidéos (Range).
// Usage : node build.mjs puis node outils/serveur.js [dossier] [port]  →  http://localhost:5173
const http=require('http'),fs=require('fs'),path=require('path');
const root=process.argv[2]||path.join(__dirname,'..','dist'),port=+process.argv[3]||5173;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.webm':'video/webm','.svg':'image/svg+xml'};
http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(root,p);
if(!f.startsWith(path.resolve(root))){res.writeHead(403);return res.end();}
fs.stat(f,(e,st)=>{if(e||!st.isFile()){res.writeHead(404);return res.end('404');}
const type=types[path.extname(f)]||'application/octet-stream';const m=/bytes=(\d*)-(\d*)/.exec(req.headers.range||'');
if(m){const start=m[1]?+m[1]:st.size-+m[2];const end=m[1]&&m[2]?+m[2]:st.size-1;res.writeHead(206,{'Content-Type':type,'Content-Range':`bytes ${start}-${end}/${st.size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});return fs.createReadStream(f,{start,end}).pipe(res);}
res.writeHead(200,{'Content-Type':type,'Content-Length':st.size,'Accept-Ranges':'bytes'});fs.createReadStream(f).pipe(res);});
}).listen(port,()=>console.log('serving '+root+' on '+port));

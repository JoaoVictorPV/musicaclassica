// Local-only static server. No dependencies, no elevated permissions required.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, 'dist');
const port = Number(process.env.CONSTELACAO_PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.woff2':'font/woff2','.ico':'image/x-icon'};
let lastRequest = Date.now();
const server = http.createServer((req,res)=>{
  lastRequest = Date.now();
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
  let url; try {url=new URL(req.url,'http://127.0.0.1');}catch{res.writeHead(400);return res.end();}
  if(url.pathname==='/health'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(JSON.stringify({app:'constelacao',version:'1.0',pid:process.pid}));}
  let name;try{name=decodeURIComponent(url.pathname)}catch{res.writeHead(400);return res.end();}
  const requested=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!requested.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  fs.stat(requested,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Arquivo não encontrado.');}
    res.writeHead(200,{'Content-Type':types[path.extname(requested)]||'application/octet-stream','Content-Length':stat.size,'Cache-Control':requested.endsWith('.html')?'no-cache':'public, max-age=3600','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});
    if(req.method==='HEAD')return res.end();
    const stream=fs.createReadStream(requested);stream.on('error',()=>res.destroy());stream.pipe(res);
  });
});
server.on('error',err=>{console.error(err.message);process.exit(1)});
server.listen(port,'127.0.0.1',()=>console.log('Acervo Clássico: http://127.0.0.1:'+port));
// Browser heartbeats keep the server alive; after all tabs close it exits itself.
setInterval(()=>{if(Date.now()-lastRequest>15*60*1000)server.close(()=>process.exit(0));},60000).unref();

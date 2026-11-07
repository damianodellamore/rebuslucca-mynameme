import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.xml':'application/xml','.txt':'text/plain'};
const port=Number(process.env.PORT||4173);
createServer(async(req,res)=>{
 try {
  const url=new URL(req.url,'http://localhost');
  let filename=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(filename!==root.slice(0,-1)&&!filename.startsWith(root)){res.writeHead(403);res.end();return;}
  if((await stat(filename)).isDirectory())filename=path.join(filename,'index.html');
  const bytes=await readFile(filename);
  res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream'});res.end(bytes);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}
}).listen(port,'127.0.0.1',()=>console.log(`Anteprima: http://localhost:${port}`));

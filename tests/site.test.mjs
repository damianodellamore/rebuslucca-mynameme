import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../src/',import.meta.url));
const readPage = name => fs.readFileSync(path.join(root, name), 'utf8');
const pages = ['index.html', 'rebuslucca/index.html', 'privacy/index.html', 'assistenza/index.html', 'fonti/index.html', '404.html'];

test('the catalog links to the published Lucca app and introduces the upcoming Milano app', () => {
 const home = readPage('index.html');
 const lucca = home.match(/<article[^>]+id="lancio"[^>]*>([\s\S]*?)<\/article>/)?.[1];
 const milano = home.match(/<article[^>]+id="rebusmilano"[^>]*>([\s\S]*?)<\/article>/)?.[1];

 assert.match(lucca, /ReBusLucca/);
 assert.match(lucca, /versione 1\.1/);
 assert.match(lucca, /href="https:\/\/apps\.apple\.com\/it\/app\/rebuslucca\/id6832028376"/);
 assert.match(lucca, /href="\/rebuslucca\/"/);
 assert.match(milano, /ReBusMilano/);
 assert.match(milano, /In arrivo/);
 assert.doesNotMatch(milano, /apps\.apple\.com/);
});
for(const name of pages)test(name+': internal links, IDs, metadata, light theme and footer',()=>{
 const html=readPage(name);
 assert.match(html,/<html lang="it">/);assert.match(html,/name="color-scheme" content="light"/);
 assert.match(html,/Made with <span class="footer-heart">&lt;3<\/span> by Damiano Dell'Amore/);
 assert.match(html,/<link rel="icon"[^>]*href="\/assets\/favicon.png"/);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
 for(const [,url]of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  if(/^(?:https?:|mailto:)/.test(url))continue;
  const [pathname,fragment]=url.split('#');
  let file=pathname?path.join(root,pathname):path.join(root,name);
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  assert(fs.existsSync(file),name+': missing '+url);
  if(fragment)assert(fs.readFileSync(file,'utf8').includes('id="'+fragment+'"'),name+': missing anchor '+url);
 }
});
test('production pages only use script tags for structured data', () => {
 for (const name of pages) {
  const html = readPage(name);
  assert.doesNotMatch(html, /<script\b(?! type="application\/ld\+json">)|<iframe\b/i);
 }
});
test('favicon is the unchanged app icon asset',()=>{
 const data=fs.readFileSync(path.join(root,'assets/favicon.png'));assert.equal(data.readUInt32BE(16),40);assert.equal(data.readUInt32BE(20),40);
 const touch=fs.readFileSync(path.join(root,'assets/apple-touch-icon.png'));assert.equal(touch.readUInt32BE(16),180);
});

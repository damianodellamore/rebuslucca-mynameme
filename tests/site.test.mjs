import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {countdown,validStoreLink} from '../src/assets/countdown.js';
import {siteConfig} from '../src/assets/site-config.js';
const root=fileURLToPath(new URL('../src/',import.meta.url));
const target=Date.parse(siteConfig.launchAt);
test('launch is midnight in Italy, 11 November 2026',()=>{
 assert.equal(new Date(target).toISOString(),'2026-11-10T23:00:00.000Z');
 assert.equal(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Rome',dateStyle:'short',timeStyle:'short'}).format(target),'11/11/2026, 00:00');
});
test('countdown before, at and after launch never becomes negative',()=>{
 assert.deepEqual(countdown(target-90061000,target),{ended:false,days:1,hours:1,minutes:1,seconds:1});
 assert.deepEqual(countdown(target,target),{ended:true,days:0,hours:0,minutes:0,seconds:0});
 assert.deepEqual(countdown(target+86400000,target),{ended:true,days:0,hours:0,minutes:0,seconds:0});
});
test('store link rejects invented or unsafe hosts',()=>{
 for(const value of [null,'','javascript:alert(1)','https://apps.apple.com.evil.example/it/app/id123','https://apps.apple.com/'])assert.equal(validStoreLink(value),null);
 assert.equal(validStoreLink('https://apps.apple.com/it/app/rebuslucca/id123456'),'https://apps.apple.com/it/app/rebuslucca/id123456');
 assert(!siteConfig.appStoreUrl || validStoreLink(siteConfig.appStoreUrl),'Store link must use a valid Apple URL when configured');
});
const pages=['index.html','privacy/index.html','assistenza/index.html','fonti/index.html','404.html'];
for(const name of pages)test(name+': internal links, IDs, metadata, light theme and footer',()=>{
 const html=fs.readFileSync(path.join(root,name),'utf8');
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
test('production pages do not load third party scripts, fonts or tracking',()=>{
 for(const name of pages){const html=fs.readFileSync(path.join(root,name),'utf8');assert(!/<(?:script|iframe)[^>]*src="https?:/i.test(html));}
 const js=fs.readFileSync(path.join(root,'assets/site.js'),'utf8');
 assert(!/localStorage|sessionStorage|document\.cookie|geolocation/.test(js));
});
test('favicon is the unchanged app icon asset',()=>{
 const data=fs.readFileSync(path.join(root,'assets/favicon.png'));assert.equal(data.readUInt32BE(16),40);assert.equal(data.readUInt32BE(20),40);
 const touch=fs.readFileSync(path.join(root,'assets/apple-touch-icon.png'));assert.equal(touch.readUInt32BE(16),180);
});

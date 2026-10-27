import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const M=require('../assets/tests/couples-rather-model.js');
const HTML=readFileSync(new URL('../tests/would-you-rather-for-couples/index.html',import.meta.url),'utf8');
const APP=readFileSync(new URL('../assets/tests/couples-rather-app.js',import.meta.url),'utf8');
function setup(url='https://relationship.sbs/tests/would-you-rather-for-couples/'){
 const btns=[];const elements={};const root={
   _html:'',get innerHTML(){return this._html},set innerHTML(value){this._html=value;btns.length=0;for(const match of value.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)){const attrs=match[1];const get=(n)=>{const v=new RegExp(n+'="([^"]*)"').exec(attrs);return v?v[1]:''};const item={dataset:{do:get('data-do'),value:get('data-value')},disabled:/\bdisabled\b/.test(attrs),textContent:match[2].replace(/<[^>]*>/g,''),handler:null,addEventListener:(type,cb)=>{item.handler=cb}};btns.push(item)}} ,
   querySelectorAll(sel){if(sel==='button[data-do]')return btns;return[];},
   querySelector(sel){if(sel.startsWith('#q'))return {textContent:'Question',setAttribute(){},focus(){}};return null;}
 };
 const u=new URL(url),location={href:u.href,pathname:u.pathname,hash:u.hash};
 const document={getElementById:id=>id==='wyrGame'?root:elements[id]||null,querySelector:s=>root.querySelector(s)};
 const history={replaceState:(_a,_b,newUrl)=>{location.href=new URL(newUrl,location.href).href}};
 const context={window:{CouplesRatherModel:M},document,location,history,navigator:{},URL,console,setTimeout};
 vm.runInNewContext(APP,context,{timeout:2000});
 return {root,btns,click:(doName,value='')=>{const b=btns.find(x=>x.dataset.do===doName&&(!value||x.dataset.value===value));assert.ok(b,'button '+doName+' '+value+' not found');assert.equal(b.disabled,false,'button disabled '+doName);b.handler()},html:()=>root.innerHTML};
}
test('model: 48 unique questions, balanced 12 quick questions and 16 per category',()=>{
 assert.equal(M.QUESTIONS.length,48);
 assert.equal(new Set(M.QUESTIONS.map(x=>x.id)).size,48);
 for(const [pack,count] of [['quick',12],['all',48],['romantic',16],['funny',16],['deep',16]])assert.equal(M.getPack(pack).length,count);
 for(const q of M.QUESTIONS)assert.ok(q.a&&q.b&&q.a!==q.b&&q.discuss);
});
test('matching and opposite answers compare correctly',()=>{
 assert.equal(M.compare('quick',Array(12).fill('a'),Array(12).fill('a')).matches,12);
 assert.equal(M.compare('quick',Array(12).fill('a'),Array(12).fill('b')).matches,0);
 assert.equal(M.compare('quick',Array(12).fill('a'),Array(12).fill('b')).differences,12);
 assert.throws(()=>M.compare('quick',Array(11).fill('a'),Array(12).fill('a')));
});
test('invite codes round trip for all modes; malformed and truncated tokens rejected',()=>{
 for(const pack of M.PACKS){const answers=M.getPack(pack).map((_,i)=>i%2?'a':'b');assert.deepEqual(M.decodeInvite(M.encodeInvite(pack,answers)),{pack,answers})}
 assert.throws(()=>M.decodeInvite('v1.all.010'));
 assert.throws(()=>M.decodeInvite('v1.unknown.010'));
 assert.throws(()=>M.decodeInvite('v1.quick.00000000000x'));
});
test('game starts, requires an answer, moves between questions, hides first player at handoff, compares results',()=>{
 const app=setup();
 assert.match(app.html(),/Start together on one device/);
 app.click('local');app.click('begin');
 assert.match(app.html(),/1 \/ 12/);
 assert.ok(app.btns.find(x=>x.dataset.do==='next').disabled);
 for(let i=0;i<12;i++){app.click('choose','a');app.click('next');}
 assert.match(app.html(),/Pass the phone to Partner 2/);
 assert.doesNotMatch(app.html(),/12 \/ 12/);
 app.click('partner2');
 for(let i=0;i<12;i++){app.click('choose','b');app.click('next');}
 assert.match(app.html(),/0 shared choices/);
 assert.match(app.html(),/12 different adventures/);
 app.click('restart');assert.match(app.html(),/Quick date-night round/);
});
test('partner challenge loads prior selections without revealing them and compares after answering',()=>{
 const code=M.encodeInvite('quick',Array(12).fill('a'));
 const app=setup('https://relationship.sbs/tests/would-you-rather-for-couples/?challenge='+code);
 assert.match(app.html(),/received a couples challenge/);
 app.click('partner2');
 for(let i=0;i<12;i++){app.click('choose','a');app.click('next');}
 assert.match(app.html(),/12 shared choices/);
});
test('game content is visible to crawlers and referenced resources are present',()=>{
 assert.match(HTML,/<link rel="canonical" href="https:\/\/relationship.sbs\/tests\/would-you-rather-for-couples\/"/);
 assert.equal((HTML.match(/<li><strong>Would you rather/g)||[]).length,48);
 assert.match(HTML,/application\/ld\+json/);
 assert.match(HTML,/width=device-width,initial-scale=1/);
 assert.match(HTML,/prefers-reduced-motion/);
});
// Regression test: the site uses light text on a dark theme. Never fall back to
// white answer-card backgrounds while inheriting the site's light foreground.
function luminance(hex){const rgb=hex.replace('#','').match(/.{2}/g).map(s=>parseInt(s,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];}
function contrast(fg,bg){const a=luminance(fg),b=luminance(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);}
test('choice cards maintain readable dark-mode contrast on desktop and mobile',()=>{
 assert.match(HTML,/\.wyr-shell\{color-scheme:dark;/);
 assert.doesNotMatch(HTML,/var\(--card,#fff\)/);
 for(const selector of ['wyr-choice','wyr-pack','wyr-btn','wyr-input']){
  const rule=HTML.match(new RegExp('\\.'+selector+'\\\\{([^}]*)\\\\}'));
  assert.ok(rule,'missing '+selector+' rule');
  assert.match(rule[1],/background:var\(--wyr-surface\)/);
  assert.match(rule[1],/color:var\(--wyr-text\)/);
 }
 assert.ok(contrast('#f3f6ff','#17223a')>=7,'regular text must have AAA-level contrast');
 assert.ok(contrast('#ffffff','#2a3b63')>=7,'selected answer must remain clearly legible');
 assert.ok(contrast('#ffffff','#4c5793')>=4.5,'primary button must remain readable');
 assert.match(HTML,/@media\(max-width:760px\)/);
 assert.match(HTML,/\.wyr-choicegrid\{grid-template-columns:1fr/);
});

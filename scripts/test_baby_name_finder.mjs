import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const root=path.resolve(import.meta.dirname,"..");
const core=require(path.join(root,"assets/baby-name-core.js"));
const db=JSON.parse(fs.readFileSync(path.join(root,"assets/data/baby-names.json"),"utf8"));
const names=core.validateDatabase(db);
test("exactly 1,000 unique sourced names",()=>{
 assert.equal(names.length,1000);
 assert.equal(new Set(names.map(n=>core.keyOf(n.n))).size,1000);
 assert(names.every(n=>n.m.trim()&&n.o.trim()&&n.r>=1&&n.c>=5));
 assert(names.some(n=>n.g==="girl"));
 assert(names.some(n=>n.g==="boy"));
 assert(names.some(n=>n.g==="unisex"));
});
test("search finds both a name and its etymological meaning",()=>{
 assert(core.filterNames(names,{query:"lucy"}).some(n=>n.n==="Lucy"));
 assert(core.filterNames(names,{query:"light"}).every(n=>/light/i.test(n.n+" "+n.m+" "+n.o)));
});
test("gender filters include unisex as options, exact unisex only in Both",()=>{
 const girls=core.filterNames(names,{gender:"girl"});
 assert(girls.every(n=>["girl","unisex"].includes(n.g)));
 assert(core.filterNames(names,{gender:"unisex"}).every(n=>n.g==="unisex"));
});
test("every meaning filter returns a matching concept",()=>{
 for(const meaning of ["love","strength","nature","light","faith","peace","joy","hope"]){
  const items=core.filterNames(names,{meaning});
  assert(items.every(n=>n.t.includes(meaning)));
 }
});
test("origin and sorting do not invent country popularity",()=>{
 const first=names[0];
 assert(core.filterNames(names,{origin:first.o}).every(n=>n.o===first.o));
 const popular=core.filterNames(names,{sort:"popular"});
 assert(popular[0].c>=popular.at(-1).c);
 const rare=core.filterNames(names,{sort:"rare"});
 assert(rare[0].c<=rare.at(-1).c);
 const alphabetical=core.filterNames(names,{sort:"az"});
 assert.equal(alphabetical[0].n,names[0].n);
});
test("shortlists are canonical, bounded and deduplicated",()=>{
 const x=names[0].n;
 const arr=core.sanitizePicks([x,x.toUpperCase(),"bogus",42],names);
 assert.deepEqual(arr,[x.toLowerCase()]);
 assert.equal(core.sanitizePicks(names.map(n=>n.n),names).length,40);
});
test("share link round-trips and handles malformed tokens",()=>{
 const picks=[names[0].n,names[1].n,names[2].n];
 const token=core.toUrlToken(picks,names);
 assert.deepEqual(core.fromUrlToken(token,names),picks.map(n=>n.toLowerCase()));
 assert.deepEqual(core.fromUrlToken("%ZZ",names),[]);
 assert.deepEqual(core.fromUrlToken("x".repeat(1300),names),[]);
 assert.deepEqual(core.fromUrlToken("bogus",names),[]);
});
test("partner matches contain only exact shared names",()=>{
 const a=[names[0].n.toLowerCase(),names[1].n.toLowerCase()];
 const b=[names[1].n.toLowerCase(),names[2].n.toLowerCase()];
 assert.deepEqual(core.intersection(a,b),[names[1].n.toLowerCase()]);
});
test("user text escaped before HTML insertion",()=>{
 assert.equal(core.escapeHtml('<img src="x" onerror="alert(1)">'),"&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;");
});
test("SEO metadata, canonical, structured data and app landmarks",()=>{
 const html=fs.readFileSync(path.join(root,"tools/baby-name-finder/index.html"),"utf8");
 assert(html.includes('<link rel="canonical" href="https://relationship.sbs/tools/baby-name-finder/">'));
 assert(html.includes('"@type":"WebApplication"'));
 assert(html.includes('id="resultCards"'));
 assert(html.includes('id="panelTogether"'));
 assert(html.includes('id="errorState"'));
 assert(html.includes('name="description"'));
});

test("initial and length filters keep exact matching name lengths",()=>{
 const letters=core.filterNames(names,{letter:"A"});
 assert(letters.length>0);
 assert(letters.every(n=>n.n.startsWith("A")));
 const short=core.filterNames(names,{length:"short"});
 assert(short.length>0&&short.every(n=>n.n.length<=4));
 const mid=core.filterNames(names,{length:"medium"});
 assert(mid.length>0&&mid.every(n=>n.n.length>=5&&n.n.length<=6));
 const long=core.filterNames(names,{length:"long"});
 assert(long.length>0&&long.every(n=>n.n.length>=7));
});
test("partner links must be from the exact tool origin and path",()=>{
 const picks=[names[0].n,names[1].n];
 const link="https://relationship.sbs/tools/baby-name-finder/?partner="+core.toUrlToken(picks,names);
 const expected=["relationship.sbs","tools"];
 assert.deepEqual(core.parsePartnerLink(link,names,"https://relationship.sbs","/tools/baby-name-finder/"),picks.map(n=>n.toLowerCase()));
 assert.deepEqual(core.parsePartnerLink(link,names,"https://evil.example","/tools/baby-name-finder/"),[]);
 assert.deepEqual(core.parsePartnerLink(link,names,"https://relationship.sbs","/tools/love-calculator/"),[]);
 assert.deepEqual(core.parsePartnerLink("javascript:alert(1)",names,"https://relationship.sbs","/tools/baby-name-finder/"),[]);
});
test("quick-pick deck never repeats and caps to available names",()=>{
 const deck=core.makePickDeck(names,12,()=>.5);
 assert.equal(deck.length,12);
 assert.equal(new Set(deck.map(n=>n.n)).size,12);
 assert.equal(core.makePickDeck(names.slice(0,3),12,()=>.5).length,3);
});
test("second edition interaction controls are included",()=>{
 const html=fs.readFileSync(path.join(root,"tools/baby-name-finder/index.html"),"utf8");
 for(const id of ["initialSelect","lengthSelect","startQuickPick","quickPickStage","quickPickSave","partnerLinkForm","partnerLinkInput"])assert(html.includes('id="'+id+'"'));
});

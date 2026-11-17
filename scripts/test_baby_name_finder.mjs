import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require=createRequire(import.meta.url);
const root=path.resolve(import.meta.dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const json=p=>JSON.parse(read(p));
const core=require(path.join(root,"assets/baby-name-core.js"));
const manifest=json("assets/data/baby-names-20k-manifest.json");
const parts=core.validateManifest(manifest);
const shards=parts.map(p=>json(p.path.slice(1)));
const names=core.assembleCatalog(manifest,shards);
const legacy=json("assets/data/baby-names.json");
const regionsData=json("assets/data/baby-name-regions.json");
const regions=core.validateRegionData(regionsData);
const nameMap=new Map(names.map(n=>[core.keyOf(n.n),n]));
const html=read("tools/baby-name-finder/index.html");
const app=read("assets/baby-name-finder.js");
const css=read("assets/baby-name-finder.css");

test("manifest specifies exactly 20,000 names split into five stable 4k shards",()=>{
 assert.equal(manifest.version,2);
 assert.equal(manifest.total,20000);
 assert.equal(parts.length,5);
 assert.deepEqual(parts.map(p=>p.count),[4000,4000,4000,4000,4000]);
 assert.deepEqual(shards.map(p=>p.names.length),[4000,4000,4000,4000,4000]);
 assert.equal(names.length,20000);
});

test("names are unique, valid real recorded spellings without numeric or HTML injection",()=>{
 assert.equal(nameMap.size,20000);
 assert(names.every(n=>/^[A-Za-z]+$/.test(n.n)));
 assert(names.every(n=>["boy","girl","unisex"].includes(n.g)));
 assert(names.every(n=>Number.isInteger(n.c)&&n.c>=5&&Number.isInteger(n.r)&&n.r>0));
 assert(names.some(n=>n.g==="girl")&&names.some(n=>n.g==="boy")&&names.some(n=>n.g==="unisex"));
});

test("all original 1,000 names preserved with their original etymologies",()=>{
 assert.equal(legacy.names.length,1000);
 for(const old of legacy.names){
  const n=nameMap.get(core.keyOf(old.n));
  assert(n,"Lost original name: "+old.n);
  assert.equal(n.m,old.m,"Changed legacy etymology "+old.n);
  assert.equal(n.o,old.o,"Changed legacy origin "+old.n);
  assert.deepEqual(n.t,old.t,"Changed legacy categories "+old.n);
 }
});

test("source-derived meanings never invented; unknown etymology stays null",()=>{
 const documented=names.filter(n=>n.m!==null);
 const unknown=names.filter(n=>n.m===null);
 assert.equal(documented.length,2704);
 assert.equal(unknown.length,17296);
 assert(unknown.every(n=>n.o===null&&n.t.length===0));
 assert(documented.every(n=>typeof n.m==="string"&&n.m.length>0&&typeof n.o==="string"&&n.o.length>0));
 assert(!names.some(n=>n.m==="Unknown"||n.m==="null"||n.o==="Unknown"));
});

test("US 2025 birth counts and 2024 comparisons present and coherent",()=>{
 assert.equal(manifest.popularityYear,2025);
 assert.equal(manifest.previousYear,2024);
 const current=names.filter(n=>n.u);
 assert.equal(current.length,19999);
 assert(current.every(n=>n.u.s==="F"||n.u.s==="M"));
 assert(current.every(n=>n.u.c>=5&&n.u.r>=1&&n.gy===2025));
 const compare=current.filter(n=>n.u.p!==undefined);
 assert(compare.length>=17500);
 assert(compare.every(n=>Number.isInteger(n.u.d)&&n.u.p+n.u.d===n.u.c&&n.u.p>=5));
 const fallback=names.filter(n=>!n.u);
 assert.equal(fallback.length,1);
 assert.equal(fallback[0].gy,2020);
 assert.equal(nameMap.get("liam").u.c,20818);
 assert.equal(nameMap.get("olivia").u.c,13544);
});

test("meaning and origin filters never present unsourced names as documented",()=>{
 const meanings=["love","strength","nature","light","faith","peace","joy","hope","beauty"];
 for(const meaning of meanings){
  const group=core.filterNames(names,{meaning});
  assert(group.length>=1,"Empty meaning category "+meaning);
  assert(group.every(n=>n.m&&n.o&&n.t.includes(meaning)));
 }
 const french=core.filterNames(names,{origin:"French"});
 assert(french.every(n=>n.o==="French"&&n.m));
 assert(core.filterNames(names,{query:"Lucy"}).some(n=>n.n==="Lucy"));
 const light=core.filterNames(names,{query:"light"});
 assert(light.every(n=>(n.n+" "+(n.m??"")+" "+(n.o??"")).toLowerCase().includes("light")));
});

test("gender, first-letter and name-length filtering work at 20k scale",()=>{
 for(const sex of ["boy","girl"]){
  const group=core.filterNames(names,{gender:sex});
  assert(group.length>3000);
  assert(group.every(n=>n.g===sex||n.g==="unisex"));
 }
 const both=core.filterNames(names,{gender:"unisex"});
 assert(both.every(n=>n.g==="unisex"));
 const initial=core.filterNames(names,{letter:"Z"});
 assert(initial.length>0&&initial.every(n=>n.n.startsWith("Z")));
 for(const [len,pred] of [["short",n=>n.n.length<=4],["medium",n=>n.n.length>=5&&n.n.length<=6],["long",n=>n.n.length>=7]]){
   const list=core.filterNames(names,{length:len});
   assert(list.length>10&&list.every(pred));
 }
});

test("US 2025 sorting is stable and alphabetical filtering retains ordering",()=>{
 const popular=core.filterNames(names,{sort:"popular"});
 const rare=core.filterNames(names,{sort:"rare"});
 assert.equal(popular.length,20000);
 assert((popular[0].u?.c??popular[0].c)>=(popular.at(-1).u?.c??popular.at(-1).c));
 assert((rare[0].u?.c??rare[0].c)<=(rare.at(-1).u?.c??rare.at(-1).c));
 const az=core.filterNames(names,{sort:"az"});
 for(let i=1;i<az.length;i++)assert(az[i-1].n.localeCompare(az[i].n,"en")<=0);
 const za=core.filterNames(names,{sort:"za"});
 assert.equal(az[0].n,za.at(-1).n);
});

test("bad shards are rejected, never displayed as complete 20k catalog",()=>{
 const missing=[...shards.slice(0,4)];
 assert.throws(()=>core.assembleCatalog(manifest,missing),/Missing/);
 const changed=shards.map((s,i)=>i===0?{...s,names:[...s.names.slice(0,-1),s.names[0]]}:s);
 assert.throws(()=>core.assembleCatalog(manifest,changed),/Duplicate/);
 const corrupt={...shards[0],count:3999};
 assert.throws(()=>core.assembleCatalog(manifest,[corrupt,...shards.slice(1)]),/shard/);
 const noMeaning=shards.map((s,i)=>i===0?{...s,names:s.names.map((n,j)=>j===0?{...n,m:null,o:null,t:["love"]}:n)}:s);
 assert.throws(()=>core.assembleCatalog(manifest,noMeaning),/Unverified/);
});

test("favorites from previous 1,000-name catalog remain valid",()=>{
 const sample=legacy.names.slice(0,15).map(n=>n.n);
 assert.deepEqual(core.sanitizePicks(sample,names),sample.map(n=>n.toLowerCase()));
 assert.deepEqual(core.sanitizePicks([sample[0],sample[0],"not a real name",{},-1],names),[sample[0].toLowerCase()]);
 assert.equal(core.sanitizePicks(names.map(n=>n.n),names).length,40);
});

test("partner share links round trip, enforce origin and reject bad tokens",()=>{
 const favorites=names.slice(0,20).map(n=>n.n);
 const token=core.toUrlToken(favorites,names);
 assert.deepEqual(core.fromUrlToken(token,names),favorites.map(n=>n.toLowerCase()));
 const url="https://relationship.sbs/tools/baby-name-finder/?partner="+token;
 assert.deepEqual(core.parsePartnerLink(url,names,"https://relationship.sbs","/tools/baby-name-finder/"),favorites.map(n=>n.toLowerCase()));
 assert.deepEqual(core.parsePartnerLink(url,names,"https://evil.example","/tools/baby-name-finder/"),[]);
 assert.deepEqual(core.fromUrlToken("%ZZ",names),[]);
 assert.deepEqual(core.fromUrlToken("a".repeat(2000),names),[]);
 assert.deepEqual(core.parsePartnerLink("javascript:alert(1)",names,"https://relationship.sbs","/tools/baby-name-finder/"),[]);
});

test("partner comparison ignores unknown linguistic roots and excludes own picks",()=>{
 const unsourced=names.filter(n=>n.m===null);
 const mine=[unsourced[0].n.toLowerCase()];
 const partner=[unsourced[1].n.toLowerCase()];
 const themes=core.meaningfulCommonThemes(mine,partner,names);
 assert(!themes.origins.includes(null));
 assert(!themes.meanings.includes(null));
 const suggestions=core.suggestCompromises(mine,partner,names,6);
 assert.equal(suggestions.length,6);
 assert(suggestions.every(x=>x.name.n.toLowerCase()!==mine[0]&&x.name.n.toLowerCase()!==partner[0]));
 assert.deepEqual(core.suggestCompromises(mine,partner,names,6).map(x=>x.name.n),suggestions.map(x=>x.name.n));
 assert.deepEqual(core.intersection([mine[0],partner[0]],[partner[0]]),[partner[0]]);
 assert.deepEqual(core.suggestCompromises([],partner,names),[]);
});

test("quick-pick deck never repeats and caps requested count",()=>{
 const deck=core.makePickDeck(names,12,()=>.5);
 assert.equal(deck.length,12);
 assert.equal(new Set(deck.map(n=>n.n)).size,12);
 assert.equal(core.makePickDeck(names.slice(0,3),12,()=>.5).length,3);
});

test("country-specific 2025 ranks are scoped, and German grouped spellings stay together",()=>{
 assert.equal(regions.length,4);
 const countries=Object.fromEntries(regions.map(x=>[x.id,x]));
 assert.equal(countries.ew.girls[0].names[0],"Olivia");
 assert.equal(countries.ew.boys[0].names[0],"Muhammad");
 assert.equal(countries.fr.girls[0].names[0],"Louise");
 assert.equal(countries.fr.boys[0].names[0],"Gabriel");
 assert.deepEqual(countries.de.girls[0].names,["Sophia","Sofia"]);
 assert.equal(core.regionEntry("Sofia","girl",countries.de).rank,1);
 assert.equal(core.regionEntry("Matteo","boy",countries.de).rank,2);
 assert.equal(core.regionEntry("Leona","girl",countries.de),null);
 const invalid=structuredClone(regionsData);
 invalid.regions[1].girls[0].names.push(invalid.regions[1].girls[1].names[0]);
 assert.throws(()=>core.validateRegionData(invalid),/Duplicate/);
});

test("meaning text and all dynamic names are HTML escaped",()=>{
 assert.equal(core.escapeHtml('<img src="x" onerror="alert(1)">'),"&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;");
});

test("SEO HTML reflects exactly 20k names and documents missing etymologies",()=>{
 assert(html.includes('<link rel="canonical" href="https://relationship.sbs/tools/baby-name-finder/">'));
 assert(html.includes('"@type":"WebApplication"'));
 assert(html.includes("20,000 distinct names"));
 assert(!html.includes("Explore 1,000 names"));
 assert(html.includes("Do all 20,000 names have a verified meaning?"));
 assert(html.includes('id="babySourceStats"'));
 assert(html.includes('id="panelTogether"'));
 assert(html.includes('id="regionSelect"'));
 assert(html.includes('id="startQuickPick"'));
 assert(html.includes('id="partnerLinkForm"'));
 assert(html.includes('id="resultCards"'));
});

test("browser uses five validated shards and hides missing meanings",()=>{
 assert(app.includes("baby-names-20k-manifest.json"));
 assert(app.includes("assembleCatalog(db,payloads)"));
 assert(app.includes("Meaning not yet independently documented"));
 assert(app.includes("state.names.filter(n=>n.m&&n.o).length"));
 assert(css.includes(".baby-meaning-unverified"));
 assert(!app.includes('fetch("/assets/data/baby-names.json"'));
});

test("source notes disclose meaning coverage and regional differences",()=>{
 const notes=read("assets/data/BABY_NAMES_SOURCES.md");
 assert(notes.includes("20,000"));
 assert(notes.includes("Wiktionary"));
 assert(notes.includes("SSA"));
 assert(notes.includes("source-attributed"));
});

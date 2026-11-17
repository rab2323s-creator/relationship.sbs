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
 assert((popular[0].u?.c??popular[0].c)>=(popular.at(-1).u?.c??popular.at(-1).c));
 const rare=core.filterNames(names,{sort:"rare"});
 assert((rare[0].u?.c??rare[0].c)<=(rare.at(-1).u?.c??rare.at(-1).c));
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

const countryData=JSON.parse(fs.readFileSync(path.join(root,"assets/data/baby-name-regions.json"),"utf8"));
const regions=core.validateRegionData(countryData);
test("US popularity 2025 is complete with explicit fallback and consistent 2024 comparisons",()=>{
 assert.equal(db.popularityYear,2025);
 assert.equal(db.popularityPreviousYear,2024);
 const included=names.filter(n=>n.u);
 assert(included.length>=990);
 assert(included.every(n=>n.u.c>=5&&n.u.r>=1&&Number.isInteger(n.u.d)&&n.u.p+n.u.d===n.u.c));
 assert.equal(names.filter(n=>!n.u).length,1000-included.length);
});
test("four country data contexts have verified scope and correct leading ranks",()=>{
 assert.equal(regions.length,4);
 const byId=Object.fromEntries(regions.map(r=>[r.id,r]));
 assert.equal(byId.ew.girls[0].names[0],"Olivia");
 assert.equal(byId.ew.boys[0].names[0],"Muhammad");
 assert.equal(byId.fr.girls[0].names[0],"Louise");
 assert.equal(byId.fr.boys[0].names[0],"Gabriel");
 assert.deepEqual(byId.de.girls[0].names,["Sophia","Sofia"]);
 assert.equal(byId.de.boys[0].names[0],"Noah");
 assert.equal(core.regionEntry("Sofia","girl",byId.de).rank,1);
 assert.equal(core.regionEntry("Matteo","boy",byId.de).rank,2);
 assert.equal(core.regionEntry("Sophia","girl",byId.fr),null);
 assert.equal(core.regionEntry("TotallyNewName","boy",byId.ew),null);
});
test("regional rank is not inferred from US popularity or substring name matches",()=>{
 const german=regions.find(r=>r.id==="de");
 assert.equal(core.regionEntry("Leo","boy",german).rank,4);
 assert.equal(core.regionEntry("Leon","boy",german).rank,6);
 assert.equal(core.regionEntry("Leona","girl",german),null);
});
test("country ranking validator rejects missing sources and duplicate spelling variants",()=>{
 const invalid=JSON.parse(JSON.stringify(countryData));
 invalid.regions[1].girls[0].names.push(invalid.regions[1].girls[1].names[0]);
 assert.throws(()=>core.validateRegionData(invalid),/Duplicate/);
 const invalid2=JSON.parse(JSON.stringify(countryData));
 delete invalid2.regions[2].source;
 assert.throws(()=>core.validateRegionData(invalid2),/citation/);
});
test("couples' shared themes and recommendations use data, exclude picks and are deterministic",()=>{
 const a=names.find(n=>n.t.includes("nature"));
 const b=names.find(n=>n.t.includes("nature")&&n.n!==a.n);
 const mine=[a.n.toLowerCase()],partner=[b.n.toLowerCase()];
 const overlap=core.meaningfulCommonThemes(mine,partner,names);
 assert(overlap.meanings.includes("nature"));
 const r=core.suggestCompromises(mine,partner,names,6);
 assert.equal(r.length,6);
 assert(r.every(x=>!mine.includes(x.name.n.toLowerCase())&&!partner.includes(x.name.n.toLowerCase())));
 assert.deepEqual(core.suggestCompromises(mine,partner,names,6).map(x=>x.name.n),r.map(x=>x.name.n));
 assert.deepEqual(core.suggestCompromises([],partner,names),[]);
});
test("official 2025 year labels and comparison controls are present",()=>{
 const html=fs.readFileSync(path.join(root,"tools/baby-name-finder/index.html"),"utf8");
 for(const id of ["regionSelect","regionRanking","regionRankingLists","babyCommonGround","babyCompromiseCards"]){
  assert(html.includes('id="'+id+'"'));
 }
 assert(html.includes("United States · SSA 2025"));
 assert(html.includes("Germany · GfdS 2025"));
});

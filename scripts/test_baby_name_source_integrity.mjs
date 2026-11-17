import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";

const root=path.resolve(import.meta.dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const json=p=>JSON.parse(read(p));
const require=createRequire(import.meta.url);
const core=require(path.join(root,"assets/baby-name-core.js"));
const manifest=json("assets/data/baby-names-20k-manifest.json");
const entries=core.assembleCatalog(manifest,core.validateManifest(manifest).map(p=>json(p.path.slice(1))));
const original=json("assets/data/baby-names.json").names;
const oldSet=new Set(original.map(n=>n.n.toLowerCase()));
const additions=entries.filter(n=>!oldSet.has(n.n.toLowerCase()));
const citation=json("scripts/data-sources/etymology-matches.json");

function getSSA(year){
 const dataset=new Map(),rank={F:0,M:0};
 for(const line of read("scripts/data-sources/ssa-yob"+year+".txt").trim().split(/\r?\n/)){
  const [name,sex,amount]=line.trim().split(",");
  assert.match(name,/^[A-Za-z]+$/);
  assert(["F","M"].includes(sex));
  const count=Number(amount);assert(Number.isInteger(count)&&count>=5);
  rank[sex]++;
  const k=name.toLowerCase(),value=dataset.get(k)||{name,F:null,M:null};
  assert.equal(value[sex],null,"Duplicate SSA row for "+name+" "+sex);
  value[sex]={count,rank:rank[sex]};
  dataset.set(k,value);
 }
 return dataset;
}
const ssa2025=getSSA(2025),ssa2024=getSSA(2024);

test("source files contain the expected 2025 and 2024 SSA records",()=>{
 assert(ssa2025.size>28000);
 assert(ssa2024.size>28000);
 assert.equal(ssa2025.get("liam").M.count,20818);
 assert.equal(ssa2025.get("liam").M.rank,1);
 assert.equal(ssa2025.get("olivia").F.count,13544);
 assert.equal(ssa2025.get("olivia").F.rank,1);
});

test("every displayed 2025 US count, rank, sex group and change reconciles exactly to source rows",()=>{
 for(const n of entries){
  const key=n.n.toLowerCase(),source=ssa2025.get(key);
  if(!source){
   assert(oldSet.has(key),"New name absent from SSA "+n.n);
   assert(n.u===null||n.u===undefined,"Unexpected recent records for "+n.n);
   assert.equal(n.gy,2020);
   continue;
  }
  const sex=(source.F?.count||0)>=(source.M?.count||0)?"F":"M";
  const count=source[sex].count,rank=source[sex].rank;
  const total=(source.F?.count||0)+(source.M?.count||0);
  const gender=count/total>=.8?(sex==="F"?"girl":"boy"):"unisex";
  assert(n.u,"Missing 2025 snapshot for "+n.n);
  assert.equal(n.u.s,sex,"Sex grouping mismatch for "+n.n);
  assert.equal(n.u.c,count,"Birth count mismatch for "+n.n);
  assert.equal(n.u.r,rank,"Rank mismatch for "+n.n);
  assert.equal(n.g,gender,"Gender filter mismatch for "+n.n);
  assert.equal(n.gy,2025);
  const before=ssa2024.get(key)?.[sex]??null;
  if(before){
   assert.equal(n.u.p,before.count,"2024 count mismatch for "+n.n);
   assert.equal(n.u.d,count-before.count,"Change mismatch for "+n.n);
  }else{
   assert(!Object.hasOwn(n.u,"p"),"Missing prior count invented for "+n.n);
   assert(!Object.hasOwn(n.u,"d"),"Missing comparison invented for "+n.n);
  }
  if(!oldSet.has(key)){
   assert.equal(n.c,count,"New-row count mismatch for "+n.n);
   assert.equal(n.r,rank,"New-row rank mismatch for "+n.n);
   assert.equal(n.s,sex,"New-row source-sex mismatch for "+n.n);
  }
 }
});

test("the 19,000 additions are precisely the highest-count published new 2025 spellings",()=>{
 assert.equal(additions.length,19000);
 const expected=[...ssa2025.values()].filter(x=>!oldSet.has(x.name.toLowerCase()))
  .sort((a,b)=>Math.max(b.F?.count||0,b.M?.count||0)-Math.max(a.F?.count||0,a.M?.count||0)||a.name.localeCompare(b.name,"en"))
  .slice(0,19000).map(x=>x.name.toLowerCase());
 assert.deepEqual(additions.map(n=>n.n.toLowerCase()).sort(),expected.sort());
 const last=ssa2025.get(expected.at(-1));
 assert(Math.max(last.F?.count||0,last.M?.count||0)>=7);
});

test("every new documented meaning and origin reconciles to its archived source entry",()=>{
 assert.equal(citation.version,1);
 assert(citation.source.includes("baby-name-maker"));
 assert(citation.license.includes("CC BY-SA"));
 assert.equal(Object.keys(citation.names).length,1704);
 const documented=additions.filter(n=>n.m!==null);
 assert.equal(documented.length,1704);
 for(const n of additions){
  const item=citation.names[n.n.toLowerCase()];
  if(!item){
   assert.equal(n.m,null,"Unattributed meaning for "+n.n);
   assert.equal(n.o,null,"Unattributed root for "+n.n);
   assert.deepEqual(n.t,[],"Unattributed semantic classification for "+n.n);
   continue;
  }
  assert.equal(item.src,"Wiktionary");
  assert(["meanings.json","native-meanings.json","extra-meanings.json"].includes(item.file));
  assert.equal(n.m,item.m,"Meaning differs from archived source for "+n.n);
  assert.equal(n.o,item.root,"Root differs from archived source for "+n.n);
 }
});

test("documented-only mode has exactly 2,704 entries and preserves every original entry",()=>{
 const docs=core.filterNames(entries,{documented:true});
 assert.equal(docs.length,2704);
 assert(docs.every(n=>n.m&&n.o));
 assert(original.every(n=>docs.some(c=>c.n.toLowerCase()===n.n.toLowerCase())));
});

test("manifest and catalog remain locale-neutral with no per-name SEO spam",()=>{
 assert.equal(entries.length,20000);
 assert.equal(new Set(entries.map(n=>n.n.toLowerCase())).size,20000);
 const html=read("tools/baby-name-finder/index.html");
 assert(html.includes('id="meaningOnly"'));
 assert(!html.includes("/baby-names/name/"));
 const homepage=read("index.html");
 assert(homepage.includes("20,000 baby names"));
});

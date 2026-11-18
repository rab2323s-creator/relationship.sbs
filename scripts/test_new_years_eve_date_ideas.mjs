import test from "node:test";import assert from "node:assert/strict";import fs from "node:fs";import vm from "node:vm";
const page=fs.readFileSync(new URL("../blog/new-years-eve-date-ideas/index.html",import.meta.url),"utf8");
const registry=fs.readFileSync(new URL("../assets/blog-data.js",import.meta.url),"utf8");
const inbound=fs.readFileSync(new URL("../blog/date-night-ideas-for-couples/index.html",import.meta.url),"utf8");
const svg=fs.readFileSync(new URL("../assets/images/blog/new-years-eve-date-ideas/new-years-eve-date-ideas-couples-midnight.svg",import.meta.url),"utf8");
const block=page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
const graph=JSON.parse(block)["@graph"];const get=(t)=>graph.find(o=>o["@type"]===t);
test("unique route, single H1, meta, inbound link and card",()=>{assert.equal((page.match(/<h1\b/g)||[]).length,1);assert.match(page,/<meta name="viewport"/);assert.match(page,/<link rel="canonical" href="https:\/\/relationship.sbs\/blog\/new-years-eve-date-ideas\/"/);assert.match(page,/name="description"/);assert.match(registry,/slug: "new-years-eve-date-ideas"/);assert.match(inbound,/href="\/blog\/new-years-eve-date-ideas\/"/);assert.match(registry,/cover: "\/assets\/images\/blog\/new-years-eve-date-ideas\//);});
test("31 unique numbered static cards and complete rich information",()=>{const ids=[...page.matchAll(/class="ny-idea" id="idea-(\d+)"/g)].map(m=>Number(m[1]));assert.deepEqual(ids,Array.from({length:31},(_,i)=>i+1));assert.equal((page.match(/Why it feels personal:/g)||[]).length,31);assert.equal((page.match(/Make it work safely:/g)||[]).length,31);});
test("structured data matches 31 visible plans, has date and FAQ",()=>{assert.equal(get("BlogPosting").datePublished,"2026-11-19");const list=get("ItemList");assert.equal(list.numberOfItems,31);assert.equal(list.itemListElement.length,31);assert.equal(get("FAQPage").mainEntity.length,10);for(const x of list.itemListElement)assert.ok(page.includes('id="idea-'+x.position+'"'));const img=get("ImageObject");assert.match(img.contentUrl,/new-years-eve-date-ideas-couples-midnight\.svg$/);});
test("all six section jump links and 2026 year are visible",()=>{for(const id of ["at-home","cheap","out","countdown","long-distance","quiet"])assert.match(page,new RegExp('id="'+id+'"'));assert.match(page,/Thursday, December 31, 2026/);assert.match(page,/@media\(max-width:720px\)/);assert.match(svg,/<svg[^>]+width="1200" height="630"/);});
test("JavaScript matcher parses, registers submit, and contains 31 public results",()=>{const code=page.match(/<script data-role="date-finder">([\s\S]*?)<\/script>/)?.[1];assert.ok(code);new vm.Script(code);assert.match(code,/addEventListener\("submit"/);assert.match(page,/id="ny-recs" role="status" aria-live="polite"/);});
test("interactive matcher returns exact results for chosen no-booking budget",()=>{
const code=page.match(/<script data-role="date-finder">([\s\S]*?)<\/script>/)[1];
const controls={"ny-place":"home","ny-budget":"10","ny-energy":"medium","ny-prep":"none","ny-moment":"midnight"};
const eventHandlers={};const nodes=[];
const makeNode=(tag)=>({tag,textContent:"",href:"",children:[],appendChild(c){this.children.push(c)}});
const out=makeNode("div");out.replaceChildren=function(){this.children=[];};
const document={getElementById(id){if(id==="ny-finder")return{addEventListener(n,fn){eventHandlers[n]=fn}};if(id==="ny-recs")return out;return{value:controls[id]};},createElement:makeNode,createTextNode(t){return {textContent:t}}};
vm.runInNewContext(code,{document});
assert.equal(typeof eventHandlers.submit,"function");let cancelled=false;eventHandlers.submit({preventDefault(){cancelled=true}});
assert.equal(cancelled,true);assert.equal(out.children[0].textContent,"Three ideas for your evening");const list=out.children[1];assert.equal(list.children.length,3);for(const li of list.children){assert.match(li.children[0].href,/^#idea-\d+$/);}
});

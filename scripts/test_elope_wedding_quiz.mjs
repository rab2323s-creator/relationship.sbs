import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url),root=path.resolve(import.meta.dirname,"..");
const model=require("../assets/tests/elope-wedding-quiz-model.js");
const page=fs.readFileSync(path.join(root,"tests/should-we-elope-or-have-a-wedding/index.html"),"utf8");
const app=fs.readFileSync(path.join(root,"assets/tests/elope-wedding-quiz-app.js"),"utf8");
const filled=choice=>Array(18).fill(choice);
test("18 original ceremony-style questions cover six domains without marriage-readiness duplication",()=>{
 assert.equal(model.questions.length,18);assert.equal(new Set(model.questions.map(q=>q.prompt)).size,18);
 assert.equal(model.domains.length,6);
 for(const d of model.domains)assert.equal(model.questions.filter(q=>q.domain===d.id).length,3);
 for(const q of model.questions){assert.equal(q.options.length,5);assert.deepEqual(q.options.slice(0,4).map(x=>x.style),model.ids);assert.equal(q.options[4].style,null)}
 assert.ok(model.questions.every(q=>!/(how committed|divorce|sexual compatibility)/i.test(q.prompt)));
});
test("solo percentages are honest, total 100, ties do not force a winner",()=>{
 for(let i=0;i<4;i++){const x=model.calculate(filled(i));assert.equal(x.mode,"solo");assert.equal(x.leading,model.ids[i]);assert.equal(x.percentages[model.ids[i]],100);assert.equal(Object.values(x.percentages).reduce((a,b)=>a+b,0),100)}
 const mixed=model.calculate(Array.from({length:18},(_,i)=>i%4));assert.equal(mixed.leading,null);assert.equal(Object.values(mixed.percentages).reduce((a,b)=>a+b,0),100);
 const uns=model.calculate(filled(4));assert.equal(uns.hasEnough,false);assert.equal(uns.percentages,null);assert.equal(uns.first.unsure,18);
 const enough=model.calculate([...filled(4).slice(0,10),...filled(0).slice(0,8)]);assert.equal(enough.first.known,8);assert.equal(enough.percentages.private,100);
});
test("partners have independent, equally weighted preferences and no forced consensus",()=>{
 const a=filled(0),b=filled(2),r=model.calculate(a,b);
 assert.equal(r.mode,"couple");assert.equal(r.percentages.private,50);assert.equal(r.percentages.traditional,50);assert.equal(r.leading,null);assert.equal(r.differentFavorites,true);
 assert.equal(r.comparable,18);assert.equal(r.agreements,0);assert.equal(r.differences.length,18);
 assert.ok(r.differences[0].important);
 assert.equal(Object.values(r.percentages).reduce((x,y)=>x+y,0),100);
 const same=model.calculate(filled(1),filled(1));assert.equal(same.leading,"micro");assert.equal(same.agreements,18);assert.equal(same.differences.length,0);
 const partialA=Array(18).fill(4);for(let i=0;i<8;i++)partialA[i]=0;
 const partialB=filled(1);const mixed=model.calculate(partialA,partialB);
 assert.equal(mixed.percentages.private,50);assert.equal(mixed.percentages.micro,50);
 const low=model.calculate(filled(0),filled(4));assert.equal(low.hasEnough,false);assert.equal(low.percentages,null);assert.equal(low.leading,null);
 assert.throws(()=>model.calculate(filled(0),filled(-1)));
});
test("SEO, realistic schema, responsive style, answer-first H2 and privacy",()=>{
 assert.match(page,/rel="canonical" href="https:\/\/relationship\.sbs\/tests\/should-we-elope-or-have-a-wedding\/"/);
 assert.match(page,/name="robots" content="index,follow/);
 assert.equal((page.match(/<h1>/g)||[]).length,1);
 for(const term of ["should we elope","elope vs wedding","micro wedding vs elopement","what kind of wedding should we have"])assert.ok(page.toLowerCase().includes(term),term);
 const direct=[...page.matchAll(/<section class="ew-section" id="[^"]+"><h2>[^<]+<\/h2><p class="ew-answer">/g)];
 assert.equal(direct.length,15);
 const m=page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);assert.ok(m);
 const graph=JSON.parse(m[1])["@graph"];const quiz=graph.find(x=>x["@type"]==="Quiz");
 assert.ok(quiz);assert.equal(quiz.hasPart.length,18);assert.equal(quiz.datePublished,"2026-11-21");
 assert.ok(graph.find(x=>x["@type"]==="BreadcrumbList"));
 assert.equal(graph.some(x=>x["@type"]==="FAQPage"),false);
 assert.match(page,/@media\(max-width:760px\)/);assert.match(page,/id="elopeQuiz"/);
 assert.ok(!/(?:localStorage|sessionStorage|fetch\(|XMLHttpRequest)/.test(app));
});
test("outbound and incoming internal links plus both registries exist",()=>{
 for(const [,url] of page.matchAll(/href="(\/[^"#?]*)"/g)){
  const target=url==="/"
   ?"index.html":/\.[a-z0-9]+$/i.test(url)?url.slice(1):path.join(url.slice(1),"index.html");
  assert.ok(fs.existsSync(path.join(root,target)),"Missing "+url);
 }
 const destination='href="/tests/should-we-elope-or-have-a-wedding/"';
 for(const p of ["tests/index.html","tests/are-we-ready-for-marriage/index.html","blog/how-to-write-wedding-vows/index.html","blog/should-you-get-a-prenup/index.html"])assert.ok(fs.readFileSync(path.join(root,p),"utf8").includes(destination),"No contextual inbound: "+p);
 for(const p of ["assets/tests-index.js","assets/tests.js"])assert.ok(fs.readFileSync(path.join(root,p),"utf8").includes('"slug": "should-we-elope-or-have-a-wedding"'),"Missing registry: "+p);
 assert.ok(fs.readFileSync(path.join(root,"sitemap.xml"),"utf8").includes("https://relationship.sbs/tests/should-we-elope-or-have-a-wedding/"));
});

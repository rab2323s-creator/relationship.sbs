import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const root=path.resolve(import.meta.dirname,"..");
const model=require("../assets/tests/am-i-aromantic-quiz-model.js");
const page=fs.readFileSync(path.join(root,"tests/am-i-aromantic-quiz/index.html"),"utf8");
const app=fs.readFileSync(path.join(root,"assets/tests/am-i-aromantic-quiz-app.js"),"utf8");
test("exactly 18 distinct questions, 4 subject dimensions and accessible uncertainty",()=>{
 assert.equal(model.questions.length,18);
 assert.deepEqual(model.dimensions.map(x=>x.count),[5,4,4,5]);
 assert.equal(new Set(model.questions.map(x=>x.prompt)).size,18);
 const names=model.questions.map(x=>x.prompt.toLowerCase()).join(" ");
 assert.ok(!/which gender|same.gender|opposite.gender|how much sex/.test(names),"Do not overlap sex/gender quizzes");
 for(const q of model.questions){assert.equal(q.options.length,6);assert.equal(q.options[5].value,null);assert.ok(q.options[5].text.length>15);assert.ok(q.options.every(o=>o.text.length>15));}
 assert.equal(model.MIN_ATTRACTION_ANSWERS,3);
});
test("scales are real response percentages; all uncertainty stays unscored",()=>{
 const cases=[[0,100,"unfamiliar"],[2,50,"variable"],[4,0,"familiar"]];
 for(const [choice,expected,name] of cases){
  const r=model.calculate(Array(18).fill(choice));assert.equal(r.attractionPercent,expected);assert.equal(r.primary,name);
  assert.equal(r.indicators.length,4);assert.ok(r.indicators.every(x=>x.percent===expected));
  assert.ok(r.indicators.every(x=>x.percent>=0&&x.percent<=100));assert.equal(r.uncertainCount,0);
 }
 const unknown=model.calculate(Array(18).fill(5));assert.equal(unknown.primary,"exploring");
 assert.equal(unknown.attractionPercent,null);assert.equal(unknown.uncertainCount,18);
 assert.ok(unknown.indicators.every(x=>x.percent===null&&x.uncertain===x.total));
 const partial=model.calculate([5,5,5,0,0,...Array(13).fill(2)]);assert.equal(partial.primary,"exploring");assert.equal(partial.attractionPercent,null);
 const enough=model.calculate([5,5,0,0,0,...Array(13).fill(2)]);assert.equal(enough.primary,"unfamiliar");assert.equal(enough.attractionPercent,100);
});
test("social pressure and relationship preferences never change the identity-adjacent headline",()=>{
 const base=Array(18).fill(0),a=model.calculate(base);
 const opposite=base.map((v,i)=>i>=5?4:v),b=model.calculate(opposite);
 assert.equal(a.primary,b.primary);assert.equal(a.attractionPercent,b.attractionPercent);
 assert.notEqual(a.indicators[1].percent,b.indicators[1].percent);
 assert.notEqual(a.indicators[3].percent,b.indicators[3].percent);
 for(const x of [[],null,Array(18).fill(-1),Array(18).fill(6),Array(17).fill(0),Array(18).fill("1")])assert.throws(()=>model.calculate(x));
});
test("page matches recent quiz style, is indexable, and has real non-diagnostic schema",()=>{
 assert.match(page,/class="sc-page ar-page"/);assert.match(page,/class="sc-quiz-root"/);
 assert.match(page,/name="viewport" content="width=device-width,initial-scale=1"/);
 assert.match(page,/rel="canonical" href="https:\/\/relationship\.sbs\/tests\/am-i-aromantic-quiz\/"/);
 assert.match(page,/name="robots" content="index,follow/);
 assert.equal((page.match(/<h1>/g)||[]).length,1);
 for(const term of ["am i aromantic","aromantic spectrum quiz","aromantic test","am i on the aromantic spectrum"])assert.ok(page.toLowerCase().includes(term),term);
 assert.match(page,/no online quiz can confirm an orientation/i);
 assert.match(page,/not a published or clinically validated/i);
 assert.match(page,/not a percentage of being aromantic/i);
 assert.match(page,/@media\(max-width:760px\)/);
 const m=page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);assert.ok(m);
 const nodes=JSON.parse(m[1])["@graph"],quiz=nodes.find(x=>x["@type"]==="Quiz");
 assert.ok(quiz);assert.equal(quiz.hasPart.length,18);assert.equal(quiz.datePublished,"2026-11-21");
 assert.ok(nodes.find(x=>x["@type"]==="BreadcrumbList"));
 assert.equal(nodes.some(x=>x["@type"]==="FAQPage"),false);
 assert.ok(!/localStorage|XMLHttpRequest|fetch\(/.test(app));
});
test("all internal outgoing links exist, index has listing and contextual inbound links",()=>{
 for(const m of page.matchAll(/href="(\/[^"#?]*)"/g)){
  const url=m[1],target=url==="/"
   ?"index.html":/\.[a-z0-9]+$/i.test(url)?url.slice(1):path.join(url.slice(1),"index.html");
  assert.ok(fs.existsSync(path.join(root,target)),"Missing link "+url);
 }
 for(const p of ["tests/index.html","blog/aromantic-vs-asexual/index.html","tests/am-i-gay-quiz/index.html","tests/do-i-have-a-crush/index.html","blog/platonic-relationship-meaning/index.html"])
  assert.ok(fs.readFileSync(path.join(root,p),"utf8").includes('href="/tests/am-i-aromantic-quiz/"'),"Missing inbound link "+p);
});

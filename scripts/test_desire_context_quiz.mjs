import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
const slug="why-dont-i-want-sex-with-my-partner",prefix="assets/tests/"+slug;
const script=readFileSync(prefix+"-data.js","utf8");
const app=readFileSync(prefix+"-app.js","utf8");
function environment(){
 class Node {
   constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.style={};this.events={};this.disabled=false;this.dataset={};this.textContent="";}
   append(...nodes){this.children.push(...nodes);}
   replaceChildren(...nodes){this.children=[...nodes];}
   setAttribute(k,v){this.attrs[k]=v;}
   addEventListener(t,fn){this.events[t]=fn;}
   scrollIntoView(){}
 }
 const mount=new Node("div");
 const document={getElementById:()=>mount,createElement:tag=>new Node(tag),createTextNode:text=>({tag:"#text",textContent:text})};
 const ctx={document,globalThis:null,module:{exports:{}}};ctx.globalThis=ctx;
 vm.createContext(ctx);vm.runInContext(script,ctx);vm.runInContext(app,ctx);
 return {ctx,mount,score:ctx.DesireContextQuizModel.score};
}
function buttons(node){let out=[];if(node.tag==="button")out.push(node);for(const c of node.children||[])out.push(...buttons(c));return out;}
function click(btn){assert.ok(btn?.events?.click,"clickable button expected");btn.events.click();}
test("12 unique questions and four meaningful options",()=>{
 const {ctx}=environment(),qs=ctx.DesireContextQuizData.questions;
 assert.equal(qs.length,12);assert.equal(new Set(qs.map(q=>q.id)).size,12);
 for(const q of qs){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(x=>x.text)).size,4);for(const o of q.options){assert.equal(Object.values(o.weights).reduce((a,b)=>a+b,0),3);}}
});
test("four independent main result paths are reachable",()=>{
 const {score}=environment();
 for(let i=0;i<4;i++){const a=Array(12).fill(i),r=score(a);assert.equal(r.primary,["load","connection","agency","body"][i]);assert.equal(r.raw[r.primary],36);assert.equal(r.mixed,false);}
});
test("deterministic tie and near-tie with flags",()=>{
 const {score}=environment();
 const r=score([0,0,0,1,1,1,2,2,2,3,3,3]);assert.equal(r.primary,"load");assert.equal(r.mixed,true);
 const safety=score(Array(12).fill(0).map((v,i)=>i===7?2:v));assert.equal(safety.primary,"load");assert.ok(safety.flags.includes("pressure"));
});
test("answers are validated before scoring",()=>{
 const {score}=environment();assert.throws(()=>score(Array(11).fill(0)));assert.throws(()=>score(Array(12).fill(4)));assert.throws(()=>score(Array(12).fill(null)));assert.throws(()=>score(Array(12).fill("0")));
});
test("progress, back, change, finish and retake",()=>{
 const {mount}=environment();
 assert.ok(buttons(mount).some(b=>b.textContent.includes("When you notice")===false&&b.textContent.includes("I'm depleted")));
 click(buttons(mount).find(b=>b.textContent.includes("I'm depleted")));
 assert.ok(buttons(mount).some(b=>b.textContent==="← Back"));
 click(buttons(mount).find(b=>b.textContent==="← Back"));
 click(buttons(mount).find(b=>b.textContent.includes("I miss feeling")));
 for(let i=1;i<12;i++){assert.ok(!buttons(mount).some(b=>b.textContent.includes("Retake the 12 questions")));click(buttons(mount).find(b=>b.tag==="button"&&b.textContent!=="← Back"&&b.className?.includes("dq-choice")));}
 assert.ok(buttons(mount).some(b=>b.textContent==="Retake the 12 questions"));
 click(buttons(mount).find(b=>b.textContent==="Retake the 12 questions"));
 assert.ok(buttons(mount).some(b=>b.textContent.includes("I'm depleted")));
});

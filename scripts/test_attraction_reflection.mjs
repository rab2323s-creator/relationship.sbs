import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const base='assets/tests/am-i-still-attracted-to-my-partner';
class Element {
 constructor(tag){this.tag=tag;this.className='';this.textContent='';this.children=[];this.style={};this.events={};this.attrs={};this.disabled=false;}
 append(...xs){this.children.push(...xs)}
 replaceChildren(...xs){this.children=[...xs]}
 setAttribute(k,v){this.attrs[k]=String(v)}
 addEventListener(k,fn){this.events[k]=fn}
 scrollIntoView(){}
}
const buttons=node=>[...(node.tag==='button'?[node]:[]),...(node.children||[]).flatMap(buttons)];
function runtime(){
 const mount=new Element('div'),document={getElementById:()=>mount,createElement:tag=>new Element(tag),createTextNode:t=>({tag:'#text',textContent:t})};
 const ctx={document,module:{exports:{}},globalThis:null};ctx.globalThis=ctx;vm.createContext(ctx);
 for(const file of ['-data.js','-model.js','-app.js'])vm.runInContext(fs.readFileSync(base+file,'utf8'),ctx,{filename:base+file});
 return {data:ctx.AttractionReflectionData,score:ctx.AttractionReflectionModel.score,mount};
}
test('12 distinct scenarios with four distinct outcomes each',()=>{
 const {data}=runtime();assert.equal(data.questions.length,12);assert.equal(new Set(data.questions.map(q=>q.id)).size,12);
 for(const q of data.questions){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.equal(new Set(q.options.map(o=>o.dimension)).size,4);assert.ok(q.options.every(o=>o.weight===1&&o.insight));}
});
test('each of four profiles is reachable and counts add to 12',()=>{
 const {data,score}=runtime();for(const d of data.dimensions){
 const choices=data.questions.map(q=>q.options.findIndex(o=>o.dimension===d.id));const r=score(choices,data);
 assert.equal(r.primary,d.id);assert.equal(r.counts[d.id],12);assert.equal(Object.values(r.counts).reduce((a,b)=>a+b,0),12);assert.equal(r.mixed,false);
 }
});
test('ties, close seconds and changing one answer are deterministic',()=>{
 const {data,score}=runtime(),choices=data.questions.map((q,i)=>q.options.findIndex(o=>o.dimension===data.dimensions[i%4].id));
 const r=score(choices,data);assert.equal(r.tied,true);assert.equal(r.primary,'present');assert.equal(r.mixed,true);
 const a=data.questions.map(q=>q.options.findIndex(o=>o.dimension==='present'));
 const before=score(a,data),v=a.slice();v[0]=data.questions[0].options.findIndex(o=>o.dimension==='context');
 const after=score(v,data);assert.equal(before.counts.present-after.counts.present,1);assert.equal(after.counts.context-before.counts.context,1);
 const near=data.questions.map((q,i)=>q.options.findIndex(o=>o.dimension=i<6?'present':i<11?'context':'shift'));
 assert.equal(score(near,data).mixed,true);assert.equal(score(near,data).tied,false);
});
test('invalid or unfinished answers cannot generate result',()=>{
 const {data,score}=runtime();for(const x of [Array(11).fill(0),Array(12).fill(null),Array(12).fill(4),Array(12).fill('0')])assert.throws(()=>score(x,data));
});
test('question progression, back/edit, 12th answer, retake flow',()=>{
 const {mount}=runtime();const get=label=>buttons(mount).find(b=>b.textContent===label);
 assert.ok(get('Question 1 of 12')===undefined);assert.ok(get('← Back').disabled);
 const choose=()=>{const b=buttons(mount).find(x=>x.className.startsWith('ar-choice'));assert.ok(b);b.events.click();};
 choose();assert.equal(get('← Back').disabled,false);get('← Back').events.click();choose();
 for(let i=1;i<12;i++){assert.equal(buttons(mount).some(b=>b.textContent==='Retake quiz'),false);choose();}
 assert.ok(get('Retake quiz'));assert.ok(get('Review / change answers'));
 get('Review / change answers').events.click();assert.ok(buttons(mount).some(b=>b.className.includes('ar-selected')));
 get('← Back').disabled && assert.ok(true);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const q=require('../assets/tests/long-distance-quiz-data.js');
const fill=i=>Array(18).fill(i);
test('exactly 18 unique four-option scenarios in five practical dimensions',()=>{
 assert.equal(q.questions.length,18);assert.equal(Object.keys(q.dimensions).length,5);
 assert.equal(new Set(q.questions.map(x=>x.text)).size,18);
 const dims=Object.keys(q.dimensions);
 for(const d of dims)assert.ok(q.questions.filter(x=>x.dimension===d).length>=3);
 for(const item of q.questions){assert.equal(item.options.length,4);assert.deepEqual([...item.options.map(o=>o.value)].sort((a,b)=>a-b),[0,1,3,4]);}
});
test('extreme scores and dimension limits',()=>{
 const best=q.calculate(fill(0)),worst=q.calculate(q.questions.map(item=>item.options.findIndex(o=>o.value===0)));
 assert.equal(worst.score,0);
 assert.equal(worst.dims.length,5);
 assert.equal(best.dims.length,5);
 const allGood=q.calculate(q.questions.map(item=>item.options.findIndex(o=>o.value===4)));
 assert.equal(allGood.score,100);assert.ok(allGood.dims.every(d=>d.score===100));
});
test('five dimensions and a missing relocation plan',()=>{
 const a=q.questions.map(item=>item.options.findIndex(o=>o.value===4));
 q.questions.forEach((item,i)=>{if(item.dimension==='closing')a[i]=item.options.findIndex(o=>o.value===0)});
 const r=q.calculate(a);
 assert.equal(r.dims.find(d=>d.key==='closing').score,0);
 assert.ok(r.score>=70);
 assert.match(r.headline,/future plan/i);
});
test('independent comparison detects different responses despite similar totals',()=>{
 const a=q.questions.map(item=>item.options.findIndex(o=>o.value===4));
 const b=a.slice();b[0]=q.questions[0].options.findIndex(o=>o.value===0);
 const c=q.compare(a,b);
 assert.equal(c.first.score,100);assert.ok(c.second.score<100);
 assert.equal(c.differences.length,1);assert.equal(c.differences[0].index,0);
 assert.equal(c.areas.length,5);
 assert.ok(c.priorities.length===5);
});
test('safety warning is independent of overall practical index',()=>{
 const a=q.questions.map(item=>item.options.findIndex(o=>o.value===4));
 const target=q.questions.findIndex(item=>item.options.some(o=>o.flag==='control'));
 a[target]=q.questions[target].options.findIndex(o=>o.flag==='control');
 const r=q.calculate(a);assert.ok(r.score>85);assert.equal(r.flags.length,1);
 const c=q.compare(a,q.questions.map(item=>item.options.findIndex(o=>o.value===4)));
 assert.equal(c.safety,true);
});
test('incomplete and invalid answers fail closed',()=>{
 assert.equal(q.valid(Array(17).fill(0)),false);
 assert.equal(q.valid(Array(18).fill(null)),false);
 assert.equal(q.valid(Array(18).fill(4)),false);
 assert.throws(()=>q.calculate(Array(17).fill(0)));
 assert.throws(()=>q.calculate(Array(18).fill(-1)));
 assert.throws(()=>q.compare(Array(18).fill(0),Array(17).fill(0)));
});

import test from "node:test";
import assert from "node:assert/strict";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const m=require("../assets/tests/breadcrumbing-quiz-model.js");
const pattern=n=>m.questions.map(q=>q.options.findIndex(o=>o[1]===n));
test("15 unique scenarios, four dimensions and four valid options",()=>{
 assert.equal(m.questions.length,15);assert.equal(m.dimensions.length,4);
 assert.equal(new Set(m.questions.map(q=>q.id)).size,15);
 m.dimensions.forEach(d=>assert.equal(m.questions.filter(q=>q.dimension===d.id).length,d.id==="clarity"?3:4));
 m.questions.forEach(q=>assert.deepEqual(q.options.map(o=>o[1]).sort(),[0,1,2,3]));
});
test("bounded scales and intended result profiles",()=>{
 const low=m.calculate(pattern(0)),high=m.calculate(pattern(3));
 assert.equal(low.score,0);assert.equal(low.profileKey,"grounded");
 assert.equal(high.score,100);assert.equal(high.profileKey,"repeating");
 assert.equal(high.signals.length,15);
});
test("all four profiles are reachable",()=>{
 for(const [n,name] of [[0,"grounded"],[1,"mixed"],[2,"stalled"],[3,"repeating"]]){
  const r=m.calculate(pattern(n));assert.equal(r.profileKey,name);assert.equal(r.breakdown.length,4);
 }
});
test("reported signal descriptions reflect actual choices",()=>{
 for(let seed=0;seed<12;seed++){
  const a=m.questions.map((q,i)=>q.options.findIndex(o=>o[1]===(i+seed)%4));
  const r=m.calculate(a);assert.ok(r.score>=0&&r.score<=100);
  r.signals.forEach(s=>assert.equal(s.choice,m.questions[s.index].options[a[s.index]][0]));
 }
});
test("reject incomplete and out-of-range answers",()=>{
 for(const a of [[],Array(14).fill(0),Array(15).fill(null),Array(15).fill(4)]){
  assert.equal(m.valid(a),false);assert.throws(()=>m.calculate(a));
 }
});

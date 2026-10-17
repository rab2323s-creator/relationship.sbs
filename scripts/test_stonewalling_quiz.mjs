import test from "node:test";
import assert from "node:assert/strict";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const m=require("../assets/tests/stonewalling-quiz-model.js");
const pattern=n=>m.questions.map(q=>q.options.findIndex(o=>o[1]===n));
test("14 original scenarios, four dimensions and valid options",()=>{
 assert.equal(m.questions.length,14);assert.equal(m.dimensions.length,4);
 assert.equal(new Set(m.questions.map(q=>q.id)).size,14);
 m.dimensions.forEach(d=>assert.equal(m.questions.filter(q=>q.dimension===d.id).length,["shutdown","return"].includes(d.id)?4:3));
 m.questions.forEach(q=>assert.deepEqual(q.options.map(o=>o[1]).sort(),[0,1,2,3]));
});
test("scale, profile ranges and safety-first override",()=>{
 assert.equal(m.calculate(pattern(0)).score,0);
 assert.equal(m.calculate(pattern(0)).profileKey,"reset");
 assert.equal(m.calculate(pattern(1)).profileKey,"overwhelm");
 assert.equal(m.calculate(pattern(2)).profileKey,"avoid");
 assert.equal(m.calculate(pattern(3)).score,100);
 assert.equal(m.calculate(pattern(3)).profileKey,"caution");
 const a=pattern(0);a[11]=m.questions[11].options.findIndex(o=>o[3]==="safety");
 const r=m.calculate(a);assert.equal(r.profileKey,"caution");assert.ok(r.score<20);assert.equal(r.safety.length,1);
});
test("persistent shutdown without intimidation has its own profile",()=>{
 const a=pattern(3);a[11]=m.questions[11].options.findIndex(o=>o[1]===2);a[12]=m.questions[12].options.findIndex(o=>o[1]===2);
 const r=m.calculate(a);assert.equal(r.profileKey,"stuck");assert.ok(r.score>70);assert.equal(r.safety.length,0);
});
test("feedback is grounded in choices and dimensions",()=>{
 for(let seed=0;seed<15;seed++){
  const a=m.questions.map((q,i)=>q.options.findIndex(o=>o[1]===(i+seed)%4));
  const r=m.calculate(a);assert.equal(r.breakdown.length,4);assert.ok(r.score>=0&&r.score<=100);
  r.evidence.forEach(e=>assert.equal(e.choice,m.questions[e.index].options[a[e.index]][0]));
 }
});
test("reject unanswered and invalid requests",()=>{
 for(const a of [[],Array(13).fill(0),Array(14).fill(null),Array(14).fill(4)]){
  assert.equal(m.valid(a),false);assert.throws(()=>m.calculate(a));
 }
});

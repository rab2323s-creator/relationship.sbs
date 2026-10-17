import test from "node:test";
import assert from "node:assert/strict";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const m=require("../assets/tests/move-in-readiness-data.js");
const fill=(n)=>Array(18).fill(n);
test("exactly eighteen original four-option questions, six dimensions of three",()=>{
 assert.equal(m.questions.length,18);assert.equal(m.dimensions.length,6);
 m.dimensions.forEach(d=>assert.equal(m.questions.filter(q=>q.dimension===d.id).length,3));
 m.questions.forEach(q=>{assert.equal(q.options.length,4);assert.ok(q.options.every(o=>Number.isInteger(o[1])&&o[1]>=0&&o[1]<=4));});
});
test("all positive plans score 100; all unprepared scenarios score 0",()=>{
 const ready=m.calculate(fill(0)),unready=m.calculate(fill(3));
 assert.equal(ready.score,100);assert.equal(ready.profileKey,"plan");
 assert.equal(unready.score,0);assert.equal(unready.profileKey,"pause");
 assert.ok(unready.safety.length>0);
});
test("each of the five profiles is reachable and returns six scored dimensions",()=>{
 const cases=[
 ["plan",fill(0)],
 ["agreements",fill(1)],
 ["pressure",fill(1)],
 ["clash",fill(1)],
 ["pause",fill(3)]
 ];
 cases[2][1][0]=2;cases[2][1][2]=2;
 cases[3][1][6]=2;cases[3][1][7]=2;cases[3][1][8]=2;cases[3][1][9]=2;cases[3][1][10]=2;cases[3][1][11]=2;
 cases.forEach(([key,answers])=>{const r=m.calculate(answers);assert.equal(r.profileKey,key);assert.equal(r.dims.length,6);assert.ok(r.score>=0&&r.score<=100);assert.equal(r.discussion.length,3);});
});
test("safety override is independent from high total",()=>{
 const a=fill(0);a[13]=3;
 const r=m.calculate(a);assert.equal(r.profileKey,"pause");assert.ok(r.score>80);assert.equal(r.safety.length,1);
});
test("results reflect selected options and prioritize low-scoring areas",()=>{
 const a=fill(0);a[3]=2;a[7]=3;const r=m.calculate(a);
 assert.ok(r.low.some(item=>item.index===3&&item.choice[0]===m.questions[3].options[2][0]));
 assert.ok(r.low.some(item=>item.index===7&&item.choice[0]===m.questions[7].options[3][0]));
 assert.equal(r.actions.length,6);
});
test("invalid, incomplete, missing and out-of-range responses rejected",()=>{
 assert.equal(m.valid(fill(null)),false);assert.equal(m.valid(fill(4)),false);
 assert.throws(()=>m.calculate(Array(17).fill(0)));assert.throws(()=>m.calculate(fill(4)));
});

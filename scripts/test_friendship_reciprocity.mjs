import test from "node:test";
import assert from "node:assert/strict";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const m=require("../assets/tests/friendship-reciprocity-model.js");
const fill=n=>Array(m.questions.length).fill(n);
test("15 unique platonic friendship scenarios and five three-item areas",()=>{assert.equal(m.questions.length,15);assert.equal(new Set(m.questions.map(x=>x.prompt)).size,15);assert.equal(m.dimensions.length,5);assert.deepEqual(m.dimensions.map(d=>m.questions.filter(q=>q.dimension===d.id).length),[3,3,3,3,3]);assert.ok(Math.abs(m.dimensions.reduce((s,d)=>s+d.weight,0)-1)<1e-9);m.questions.forEach(q=>{assert.equal(q.options.length,4);assert.deepEqual(q.options.map(x=>x.score),[4,3,1,0]);});});
test("high and low answers form opposite ends of reflection",()=>{const hi=m.calculate(fill(0)),lo=m.calculate(fill(3));assert.equal(hi.score,100);assert.equal(hi.profileKey,"mutual");assert.equal(lo.score,0);assert.equal(lo.profileKey,"protect");});
test("intermediate, uneven and significantly drained profiles are reachable",()=>{
  assert.equal(m.calculate(fill(1)).profileKey,"mostly"); // Every answer is 3/4: score 75.
  const low=m.calculate(fill(2)); // Every answer is 1/4: score 25.
  assert.equal(low.score,25);
  assert.equal(low.profileKey,"drained");
  assert.equal(low.concerns.length,15);
  assert.equal(low.actions.length,3);
  const mixed=fill(2);
  // Eight moderately positive answers and seven low answers yield a realistic mid-range score.
  mixed.fill(1,0,8);
  const uneven=m.calculate(mixed);
  assert.ok(uneven.score>=36&&uneven.score<63,"Expected uneven range, got "+uneven.score);
  assert.equal(uneven.profileKey,"uneven");
  assert.equal(uneven.dimensions.length,5);
});
test("isolated serious disrespect cannot be hidden by a high score",()=>{const a=fill(0);a[9]=3;const r=m.calculate(a);assert.ok(r.score>90);assert.equal(r.profileKey,"protect");assert.equal(r.flagged.length,1);});
test("weak domains determine next steps and results reflect actual options",()=>{const a=fill(0);a[0]=2;a[1]=2;a[2]=2;const r=m.calculate(a);assert.equal(r.weaker[0].id,"effort");assert.equal(r.concerns[0].index,0);assert.equal(r.dimensions.length,5);});
test("incomplete, null or out-of-range answers fail validation",()=>{assert.equal(m.valid(fill(null)),false);assert.equal(m.valid(Array(14).fill(0)),false);assert.equal(m.valid(fill(4)),false);assert.throws(()=>m.calculate(Array(14).fill(0)));assert.throws(()=>m.calculate(fill(4)));});
test("in every domain, healthier responses never lower the aggregate score",()=>{for(let i=0;i<m.questions.length;i++){let prior=-1;for(let option=3;option>=0;option--){const a=fill(0);a[i]=option;const score=m.calculate(a).score;assert.ok(score>=prior);prior=score;}}});

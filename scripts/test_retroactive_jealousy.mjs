// Run with: node --test scripts/test_retroactive_jealousy.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import model from '../assets/tests/retroactive-jealousy-model.js';
const {QUESTIONS,DIMENSIONS,BANDS,evaluate}=model;
const choicesAtLevel = level => QUESTIONS.map(q=>q.options.findIndex(o=>o.level===level));
test('12 unique scenarios each with four distinct answer levels',()=>{
 assert.equal(QUESTIONS.length,12);
 for(const q of QUESTIONS) {assert.equal(q.options.length,4);assert.deepEqual(q.options.map(o=>o.level).sort(),[0,1,2,3]);}
 for(const key of Object.keys(DIMENSIONS)) assert.equal(QUESTIONS.filter(q=>q.dimension===key).length,3);
 assert.ok(Math.abs(Object.values(DIMENSIONS).reduce((s,d)=>s+d.weight,0)-1)<1e-10);
});
test('low and high boundary scores and categories',()=>{
 const low=evaluate(choicesAtLevel(0)),high=evaluate(choicesAtLevel(3));
 assert.equal(low.score,0);assert.equal(high.score,100);
 assert.equal(low.band.id,'passing');assert.equal(high.band.id,'high');
 assert.deepEqual(Object.values(low.dimensions),[0,0,0,0]);
 assert.deepEqual(Object.values(high.dimensions),[9,9,9,9]);
});
test('all answer levels lead to non-decreasing, meaningful index',()=>{
 const scores=[0,1,2,3].map(n=>evaluate(choicesAtLevel(n)).score);
 assert.deepEqual(scores,[0,33,67,100]);
 assert.equal(evaluate(choicesAtLevel(1)).band.id,'triggered');
 assert.equal(evaluate(choicesAtLevel(2)).band.id,'loop');
});
test('changing one answer changes exactly its dimension, no double counting',()=>{
 const a=choicesAtLevel(0),baseline=evaluate(a);
 const key=QUESTIONS[0].dimension;
 a[0]=QUESTIONS[0].options.findIndex(o=>o.level===3);
 const changed=evaluate(a);
 assert.equal(changed.dimensions[key],3);
 assert.ok(changed.score>baseline.score);
 for(const k of Object.keys(DIMENSIONS).filter(k=>k!==key)) assert.equal(changed.dimensions[k],0);
});
test('ties are explicit; no forced dominant diagnosis',()=>{
 const equal=evaluate(choicesAtLevel(2));
 assert.equal(equal.tied.length,4);
 const a=choicesAtLevel(0);
 a[0]=QUESTIONS[0].options.findIndex(o=>o.level===3);
 const one=evaluate(a);assert.deepEqual(one.tied,[QUESTIONS[0].dimension]);
});
test('privacy flags are derived only from selected high-risk behavior',()=>{
 let a=choicesAtLevel(0);assert.equal(evaluate(a).signals.length,0);
 const at=QUESTIONS.findIndex(q=>q.options.some(o=>o.signal==='privacy_risk'));
 a[at]=QUESTIONS[at].options.findIndex(o=>o.signal==='privacy_risk');
 assert.equal(evaluate(a).signals[0].question,at+1);
});
test('incomplete and invalid answers cannot produce results',()=>{
 for(const a of [[],Array(11).fill(0),Array(12).fill(null),Array(12).fill(4)])assert.throws(()=>evaluate(a));
});
test('all 4^12 response sets are deterministic for sampled edge paths',()=>{
 const cases=[Array(12).fill(0), Array(12).fill(1), Array(12).fill(2), Array(12).fill(3),QUESTIONS.map((_,i)=>i%4)];
 for(const a of cases) assert.deepEqual(evaluate(a),evaluate(a));
});

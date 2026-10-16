import { createRequire } from "node:module";
const require=createRequire(import.meta.url);
const test=require("node:test"),assert=require("node:assert/strict");
const m=require("../assets/tests/financial-compatibility-model.js");
const zero=()=>Array(18).fill(0),compare=(a,b)=>m.analyzeCouple(a,b);
test("18 questions, four answers each, six dimensions of three",()=>{
assert.equal(m.questions.length,18);assert.equal(m.dimensions.length,6);
m.dimensions.forEach(d=>assert.equal(m.questions.filter(q=>q.dimension===d.id).length,3));
m.questions.forEach(q=>{assert.equal(q.options.length,4);assert.match(q.pairs,/^[AMI]{6}$/);});});
test("question comparison is meaning based, not numeric distance",()=>{
let q=m.questions[9];assert.equal(m.pairStatus(q,0,1),"I");
assert.equal(m.pairStatus(q,0,2),"M");
assert.equal(m.pairStatus(q,0,0),"A");
assert.equal(m.pairStatus(q,undefined,2),"N");});
test("individual mode doesn't invent partner score",()=>{const r=m.analyzeIndividual(zero());assert.equal(r.dimensions.length,6);assert.equal(r.profile.title,"Money Priorities Explorer");assert.equal(r.dimensions[0].answers.length,3);assert.equal(r.dimensions[0].answers[0].choice,m.questions[0].options[0].text);assert.equal(r.score,undefined);});
test("identical answers produce financial alignment",()=>{const r=compare(zero(),zero());assert.equal(r.profileKey,"aligned");assert.deepEqual(r.total,{A:18,M:0,I:0});});
test("manageable preference differences are not automatically conflicts",()=>{let a=zero(),b=zero();b[0]=1;const r=compare(a,b);assert.equal(r.total.M,1);assert.equal(r.total.I,0);assert.equal(r.profileKey,"aligned");});
test("communication pattern is reachable from multiple disagreements",()=>{const a=zero(),b=zero();b[15]=3;b[16]=3;assert.equal(compare(a,b).profileKey,"communication");});
test("fairness profile requires substantial mismatched expectations",()=>{const a=zero(),b=zero();b[7]=3;b[8]=3;assert.equal(compare(a,b).profileKey,"fairness");});
test("transparency concerns reflect repeated answers",()=>{const a=zero(),b=zero();b[3]=3;b[4]=3;assert.equal(compare(a,b).profileKey,"trust");});
test("all six dimensions include exact, displayed answers and recommendations",()=>{let a=zero(),b=zero();b[9]=1;b[16]=2;const r=compare(a,b);assert.equal(r.dimensions.length,6);assert.equal(r.comparisons.length,18);assert.equal(r.discussion.length,3);r.comparisons.forEach((c,i)=>{assert.equal(c.a,m.questions[i].options[a[i]].text);assert.equal(c.b,m.questions[i].options[b[i]].text);assert.ok(c.tip);});});
test("rejects partial or malformed answers",()=>{assert.equal(m.valid(Array(17).fill(0)),false);assert.equal(m.valid(Array(18).fill(4)),false);assert.throws(()=>m.analyzeCouple(Array(18).fill(null),zero()));});

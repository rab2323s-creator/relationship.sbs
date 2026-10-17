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
test("individual mode doesn't invent partner score",()=>{const r=m.analyzeIndividual(zero());assert.equal(r.dimensions.length,6);assert.equal(r.profile.title,"Money Priorities Explorer");assert.equal(r.dimensions[0].answers.length,3);assert.equal(r.dimensions[0].answers[0].choice,m.questions[0].options[0].text);assert.equal(r.score,Math.round(r.dimensionsScores.reduce((sum,d)=>sum+d.score,0)/6));});
test("identical answers produce financial alignment",()=>{const r=compare(zero(),zero());assert.equal(r.profileKey,"aligned");assert.deepEqual(r.total,{A:18,M:0,I:0});});
test("manageable preference differences are not automatically conflicts",()=>{let a=zero(),b=zero();b[0]=1;const r=compare(a,b);assert.equal(r.total.M,1);assert.equal(r.total.I,0);assert.equal(r.profileKey,"aligned");});
test("communication pattern is reachable from multiple disagreements",()=>{const a=zero(),b=zero();b[15]=3;b[16]=3;assert.equal(compare(a,b).profileKey,"communication");});
test("fairness profile requires substantial mismatched expectations",()=>{const a=zero(),b=zero();b[7]=3;b[8]=3;assert.equal(compare(a,b).profileKey,"fairness");});
test("transparency concerns reflect repeated answers",()=>{const a=zero(),b=zero();b[3]=3;b[4]=3;assert.equal(compare(a,b).profileKey,"trust");});
test("all six dimensions include exact, displayed answers and recommendations",()=>{let a=zero(),b=zero();b[9]=1;b[16]=2;const r=compare(a,b);assert.equal(r.dimensions.length,6);assert.equal(r.comparisons.length,18);assert.equal(r.discussion.length,3);r.comparisons.forEach((c,i)=>{assert.equal(c.a,m.questions[i].options[a[i]].text);assert.equal(c.b,m.questions[i].options[b[i]].text);assert.ok(c.tip);});});
test("rejects partial or malformed answers",()=>{assert.equal(m.valid(Array(17).fill(0)),false);assert.equal(m.valid(Array(18).fill(4)),false);assert.throws(()=>m.analyzeCouple(Array(18).fill(null),zero()));});

test("individual percentages are bounded, dimension-based and don't penalize style alone",()=>{
 const modes=[zero(),Array(18).fill(1),Array(18).fill(2),Array(18).fill(3)];
 for(const input of modes){
 const r=m.analyzeIndividual(input);
 assert.equal(r.dimensionsScores.length,6);
 assert.ok(r.score>=0&&r.score<=100);
 r.dimensionsScores.forEach(d=>assert.ok(Number.isInteger(d.score)&&d.score>=0&&d.score<=100));
 }
 for(const index of [0,6,9,12])assert.deepEqual(m.readinessValues[index],[100,100,100,100]);
});
test("couple percentages reflect categorical agreement, manageable difference and important difference",()=>{
 const a=zero(),b=zero();
 assert.equal(compare(a,b).score,100);
 b[0]=1;assert.equal(compare(a,b).dimensions[0].score,83);
 assert.equal(compare(a,b).score,97);
 b[9]=1;assert.equal(compare(a,b).dimensions[3].score,67);
 assert.equal(compare(a,b).score,92);
 b[9]=0;b[0]=0;b[16]=3;assert.equal(compare(a,b).dimensions[5].score,67);
 assert.equal(compare(a,b).score,95);
});
test("five profiles remain reachable with numeric score and full dimension breakdown",()=>{
 const cases=[
 {expected:"aligned",change:[]},
 {expected:"different",change:[[0,2],[9,1],[12,2]]},
 {expected:"communication",change:[[15,3],[16,3]]},
 {expected:"fairness",change:[[7,3],[8,3]]},
 {expected:"trust",change:[[3,3],[4,3]]}
 ];
 cases.forEach(item=>{const b=zero();item.change.forEach(([i,v])=>b[i]=v);
 const result=compare(zero(),b);
 assert.equal(result.profileKey,item.expected);
 assert.ok(result.score>=0&&result.score<=100);
 assert.equal(result.dimensions.length,6);
 result.dimensions.forEach(d=>assert.ok(Number.isInteger(d.score)));
 });
});

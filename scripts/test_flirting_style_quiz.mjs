import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const M=require("../assets/tests/flirting-style-model.js");
const APP=readFileSync(new URL("../assets/tests/flirting-style-app.js",import.meta.url),"utf8");
const HTML=readFileSync(new URL("../tests/flirting-style-quiz/index.html",import.meta.url),"utf8");

test("20 original questions balance five styles in four groups",()=>{
 assert.equal(M.questions.length,20);
 assert.equal(new Set(M.questions.map(q=>q.group)).size,4);
 for(const group of new Set(M.questions.map(q=>q.group)))assert.equal(M.questions.filter(q=>q.group===group).length,5);
 for(const q of M.questions){assert.equal(q.choices.length,5);assert.equal(new Set(q.choices.map(c=>c.style)).size,5);assert.ok(q.prompt.length>20);}
});
test("each of the five styles can independently win at 20 points",()=>{
 for(const style of M.styles){
  const answers=M.questions.map(q=>q.choices.findIndex(c=>c.style===style));
  const r=M.tally(answers);
  assert.equal(r.primary,style);assert.equal(r.best,20);assert.deepEqual(r.leaders,[style]);
 }
});
test("mixed answers produce transparent ties without forced winners",()=>{
 const answers=M.questions.map((q,i)=>q.choices.findIndex(c=>c.style===M.styles[i%5]));
 const r=M.tally(answers);
 assert.equal(r.tied,true);assert.equal(r.primary,null);assert.equal(r.leaders.length,5);
 assert.equal(Object.values(r.scores).reduce((a,b)=>a+b,0),20);
});
test("invalid or incomplete answer arrays cannot be scored",()=>{
 assert.throws(()=>M.tally(Array(19).fill(0)));
 assert.throws(()=>M.tally(Array(20).fill(-1)));
 assert.throws(()=>M.tally(Array(20).fill(5)));
});
test("search page renders the game immediately after its title",()=>{
 assert.equal((HTML.match(/<h1>/g)||[]).length,1);
 assert.ok(HTML.indexOf('id="flirtQuiz"')>HTML.indexOf("<h1>"));
 assert.ok(HTML.indexOf('id="flirtQuiz"')<HTML.indexOf('class="fs-article"'));
 assert.ok(HTML.includes("@media(max-width:700px)"));
 const json=JSON.parse(HTML.split('<script type="application/ld+json">')[1].split('</script>')[0]);
 assert.equal(json["@graph"].find(x=>x["@type"]==="FAQPage").mainEntity.length,15);
 assert.equal(json["@graph"].find(x=>x["@type"]==="WebApplication").isAccessibleForFree,true);
});
test("one-tap interaction, back navigation and retake work",()=>{
 let handlers={};
 const root={innerHTML:"",addEventListener:(k,fn)=>handlers[k]=fn,querySelector:()=>({focus:()=>{}}),contains:()=>true,scrollIntoView:()=>{}};
 const document={getElementById:id=>id==="flirtQuiz"?root:null};
 const window={FlirtingStyleModel:M};
 const navigator={clipboard:{writeText:async()=>{}}};
 new Function("window","document","navigator",APP)(window,document,navigator);
 assert.match(root.innerHTML,/Question 1 of 20/);
 function select(choice){handlers.click({target:{closest:s=>s==="button[data-choice]"?{dataset:{choice:String(choice)}}:null}});}
 function action(name){handlers.click({target:{closest:s=>s==="button[data-action]"?{dataset:{action:name}}:null}});}
 select(M.questions[0].choices.findIndex(c=>c.style==="playful"));
 assert.match(root.innerHTML,/Question 2 of 20/);
 action("previous");assert.match(root.innerHTML,/Question 1 of 20/);
 select(M.questions[0].choices.findIndex(c=>c.style==="sincere"));
 for(let i=1;i<20;i++)select(M.questions[i].choices.findIndex(c=>c.style==="sincere"));
 assert.match(root.innerHTML,/Your flirting style: Sincere Flirt/);
 assert.match(root.innerHTML,/Your five-style profile/);
 action("reset");assert.match(root.innerHTML,/Question 1 of 20/);
});

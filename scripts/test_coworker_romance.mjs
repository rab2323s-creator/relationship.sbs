import test from "node:test";
import assert from "node:assert/strict";
import {createRequire} from "node:module";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const require=createRequire(import.meta.url);
const m=require("../assets/tests/coworker-romance-model.js");
const filled=(n=0)=>Array(16).fill(n);
function change(base,entries){const a=base.slice();for(const [index,value]of entries)a[index]=value;return a;}
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.handlers={};this.style={};this.className="";this.textContent="";this.tabIndex=0;this.href="";this.type="";this.classList={add:(c)=>{this.className+=" "+c}};}
 append(...items){this.children.push(...items)}
 replaceChildren(...items){this.children=[...items]}
 setAttribute(k,v){this.attrs[k]=v}
 addEventListener(k,fn){this.handlers[k]=fn}
 querySelector(sel){return sel==='[tabindex="-1"]'?walk(this).find(x=>x.tabIndex===-1)||null:null}
 focus(){}
 scrollIntoView(){}
}
function walk(root){return [root,...root.children.flatMap(walk)]}
function runApp(){
 const root=new Element("div"),document={createElement:(tag)=>new Element(tag),getElementById:id=>id==="coworkerQuiz"?root:null};
 const window={CoworkerRomanceModel:m,matchMedia:()=>({matches:true})};
 vm.runInNewContext(readFileSync(new URL("../assets/tests/coworker-romance-app.js",import.meta.url),"utf8"),{document,window});
 return root;
}
function answer(root,n=0){
 const buttons=walk(root).filter(x=>x.tag==="button"&&x.className.split(" ").includes("sc-choice"));
 assert.equal(buttons.length,4,"Four options must always be clickable");
 buttons[n].handlers.click();
}
test("16 original four-option scenarios and five weighted dimensions",()=>{
 assert.equal(m.questions.length,16);assert.equal(m.dimensions.length,5);assert.equal(new Set(m.questions.map(q=>q.id)).size,16);
 assert.equal(Math.round(m.dimensions.reduce((s,d)=>s+d.weight,0)*100),100);
 for(const q of m.questions){assert.equal(q.options.length,4);for(const option of q.options){assert.ok([0,1,3,4].includes(option[1]));assert.ok(option[2].length>12);}}
 for(const d of m.dimensions)assert.ok(m.questions.some(q=>q.dimension===d.id));
});
test("validations reject blank incomplete invalid answer arrays",()=>{
 assert.equal(m.valid(filled(null)),false);
 assert.equal(m.valid(filled(4)),false);
 assert.equal(m.valid(Array(15).fill(0)),false);
 assert.throws(()=>m.calculate(filled(null)));
 assert.throws(()=>m.calculate(Array(17).fill(0)));
});
test("ideal choices yield exactly 100% and five percentage dimensions",()=>{
 const result=m.calculate(filled(0));assert.equal(result.score,100);assert.equal(result.profileKey,"clear");
 assert.deepEqual(result.dims.map(d=>d.score),Array(5).fill(100));
 assert.equal(result.power.length,0);
});
test("low responses yield a stop profile",()=>{
 const result=m.calculate(filled(3));
 assert.equal(result.profileKey,"power");
 assert.ok(result.power.length>0);assert.ok(result.blocked.length>0);
});
test("direct supervisor and any evaluation or promotion influence independently override high percentage",()=>{
 for(const index of [3,4,5,15]){
   const result=m.calculate(change(filled(0),[[index,2]]));
   assert.equal(result.profileKey,"power","Power override must trigger for Q"+(index+1));
   assert.ok(result.score>80,"High numerical result must not mask the flag");
   assert.ok(result.power.length>0);
 }
});
test("pressure or unwanted pursuit overrides other good answers",()=>{
 const result=m.calculate(change(filled(0),[[13,3]]));
 assert.equal(result.profileKey,"stop");assert.ok(result.blocked.length);
});
test("unchecked workplace policy produces the policy profile",()=>{
 const result=m.calculate(change(filled(0),[[6,2]]));
 assert.equal(result.profileKey,"policy");assert.ok(result.policyGaps.length>0);
});
test("team behavior changes the practical profile",()=>{
 const result=m.calculate(change(filled(0),[[9,2],[10,2],[11,2],[12,2]]));
 assert.equal(result.profileKey,"team");assert.ok(result.dims.find(x=>x.id==="team").score<64);
});
test("every possible answer vector returns five percentage values in range",()=>{
 for(let k=0;k<40;k++){const a=Array.from({length:16},(_,i)=>(i+k)%4);const result=m.calculate(a);
 assert.ok(result.score>=0&&result.score<=100);assert.equal(result.dims.length,5);
 result.dims.forEach(d=>assert.ok(d.score>=0&&d.score<=100));}
});
test("app advances 16 questions and renders percentages immediately on last click",()=>{
 const root=runApp();
 for(let i=0;i<16;i++){assert.ok(walk(root).some(x=>x.className.includes("sc-counter")&&x.textContent==="Question "+(i+1)+" of 16"));answer(root,0);}
 const nodes=walk(root);
 assert.ok(nodes.some(x=>x.className.includes("sc-result-title")&&x.textContent===m.profiles.clear.title));
 assert.ok(nodes.some(x=>x.className.includes("sc-score-number")&&x.textContent==="100"));
 assert.equal(nodes.filter(x=>x.attrs.role==="meter").length,5);
 assert.equal(nodes.filter(x=>x.className.includes("sc-dimension")).length>=5,true);
 assert.ok(nodes.some(x=>x.textContent==="Your five workplace decision areas"));
 assert.ok(nodes.every(x=>x.className!=="sc-quiz-card"),"No extra submit button or hidden question");
});
test("high overall score with manager influence displays independent warning in UI",()=>{
 const root=runApp();
 for(let i=0;i<16;i++)answer(root,i===4?2:0);
 const nodes=walk(root);
 assert.ok(nodes.some(x=>x.textContent==="Power Imbalance Warning"));
 assert.ok(nodes.some(x=>x.textContent.includes("Power imbalance warning — independent of your score")));
 assert.ok(nodes.some(x=>x.className.includes("sc-score-number")&&Number(x.textContent)>80));
});
test("Back navigates without losing earlier answer and restart clears all",()=>{
 const root=runApp();answer(root,1);answer(root,2);
 const back=walk(root).find(x=>x.className==="sc-back");assert.ok(back);back.handlers.click();
 assert.ok(walk(root).some(x=>x.className.includes("sc-counter")&&x.textContent==="Question 2 of 16"));
 answer(root,0);for(let i=2;i<16;i++)answer(root,0);
 const retry=walk(root).find(x=>x.className==="sc-restart");assert.ok(retry);retry.handlers.click();
 assert.ok(walk(root).some(x=>x.className.includes("sc-counter")&&x.textContent==="Question 1 of 16"));
});

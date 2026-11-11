import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const model=require('../assets/tests/self-sabotage-quiz-data.js');
class Element {
  constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.handlers={};this.style={};this.className='';this.textContent='';this.tabIndex=0;this.classList={add:name=>{this.className+=' '+name;}}}
  append(...items){this.children.push(...items)}
  replaceChildren(...items){this.children=[...items]}
  setAttribute(k,v){this.attrs[k]=v}
  addEventListener(k,v){this.handlers[k]=v}
  focus(){}
  scrollIntoView(){}
  querySelector(sel){return sel==='[tabindex="-1"]'?walk(this).find(x=>x.tabIndex===-1)||null:null}
}
function walk(node){return [node,...node.children.flatMap(walk)]}
function setup(){
  const root=new Element('div');
  const document={getElementById:id=>id==='selfSabotageQuiz'?root:null,createElement:tag=>new Element(tag)};
  const context={window:{SelfSabotageModel:model,matchMedia:()=>({matches:true})},document};
  const script=readFileSync(new URL('../assets/tests/self-sabotage-quiz.js',import.meta.url),'utf8');
  new vm.Script(script,{filename:'self-sabotage-quiz.js'}).runInNewContext(context);
  return root;
}
function answer(root,choice=0){
  const buttons=walk(root).filter(e=>e.tag==='button'&&e.className.split(' ').includes('sc-choice'));
  assert.ok(buttons.length>=4&&buttons.length<=5,'Question must present 4 or 5 options');
  assert.ok(buttons[choice], 'Chosen option must exist');
  buttons[choice].handlers.click();
}
test('18 ordered questions match their context and five dimensions',()=>{
  assert.equal(model.questions.length,18);
  const counts=Object.fromEntries(model.dimensions.map(d=>[d.id,model.questions.filter(q=>q.dimension===d.id).length]));
  assert.deepEqual(counts,{defensiveness:4,trust:4,withdrawal:4,escalation:3,repair:3});
  assert.ok(model.questions[11].context.toLowerCase().includes('disagreement'));
  assert.ok(model.questions[12].context.toLowerCase().includes('commitment'));
  assert.ok(model.questions[14].context.toLowerCase().includes('reaction'));
  assert.ok(model.questions[15].context.toLowerCase().includes('boundary'));
  assert.equal(model.dimensions.find(d=>d.id==='repair').name,'Barriers to Repair');
});
test('direct, mixed and each leading pattern are reachable',()=>{
  const q=model.questions;
  assert.equal(model.calculate(q.map(()=>0)).profile.id,'steady');
  assert.equal(model.calculate(q.map(x=>x.options.findIndex(o=>o.points===3))).profile.id,'mixed');
  for(const dim of model.dimensions){
    const answers=q.map(x=>x.dimension===dim.id?x.options.findIndex(o=>o.points===3):0);
    const result=model.calculate(answers);
    assert.equal(result.profile.id,dim.id);
    assert.equal(result.dims.length,5);
    assert.equal(result.main.ratio,1);
  }
});
test('safety selections override other scores, never counted as sabotage',()=>{
  for(const index of [9,17]){
    const answers=model.questions.map(q=>q.options.findIndex(o=>o.points===3));
    answers[index]=model.questions[index].options.findIndex(o=>o.flag==='safety');
    const result=model.calculate(answers);
    assert.equal(result.profile.id,'safety');
    assert.equal(result.safety.length,1);
    const target=result.dims.find(d=>d.id===model.questions[index].dimension);
    assert.equal(target.n,model.questions.filter(q=>q.dimension===target.id).length-1);
  }
});
test('user can answer 18 questions in one tap and see five results',()=>{
  const root=setup();
  for(let i=0;i<18;i++){
    assert.ok(walk(root).some(e=>e.className==='sc-counter'&&e.textContent==='Question '+(i+1)+' of 18'));
    answer(root,0);
  }
  assert.ok(walk(root).some(e=>e.className==='sc-result-title'&&e.textContent==='Mostly Direct and Repair-Oriented'));
  assert.equal(walk(root).filter(e=>e.className==='sc-dimension').length,5);
  assert.equal(walk(root).filter(e=>e.className==='sc-next').length,1);
});
test('safety result does not show self-improvement scores or tasks',()=>{
  const root=setup();
  for(let i=0;i<18;i++)answer(root,i===9?4:0);
  assert.ok(walk(root).some(e=>e.className==='sc-result-title'&&e.textContent==='Safety and Choice Come First'));
  assert.equal(walk(root).filter(e=>e.className==='sc-safety-note').length,1);
  assert.equal(walk(root).filter(e=>e.className==='sc-dimension').length,0);
  assert.equal(walk(root).filter(e=>e.className==='sc-next').length,0);
  assert.ok(walk(root).some(e=>e.tag==='a'&&e.href==='/blog/self-sabotaging-relationships/#vs-danger'));
});

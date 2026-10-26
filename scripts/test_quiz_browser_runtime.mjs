import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
class Element {
  constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.handlers={};this.style={};this.className='';this.textContent='';this.tabIndex=0;this.classList={add:(name)=>{this.className+=' '+name}}}
  append(...items){this.children.push(...items)}
  replaceChildren(...items){this.children=[...items]}
  setAttribute(k,v){this.attrs[k]=v}
  addEventListener(k,v){this.handlers[k]=v}
  focus(){}
  scrollIntoView(){}
  querySelector(selector){if(selector!=='[tabindex="-1"]')return null;return find(this,e=>e.tabIndex===-1)[0]||null}
}
function walk(node){return [node,...node.children.flatMap(walk)]}
function find(node,predicate){return walk(node).filter(predicate)}
function setup(modelName,modelPath,appPath,rootId){
  const model=require('../'+modelPath);
  const root=new Element('div');
  const document={createElement:(tag)=>new Element(tag),getElementById:(id)=>id===rootId?root:null};
  const context={window:{[modelName]:model,matchMedia:()=>({matches:true})},document};
  const code=readFileSync(new URL('../'+appPath,import.meta.url),'utf8');
  new vm.Script(code,{filename:appPath}).runInNewContext(context);
  return {root,model};
}
function pressAnswer(root,answer=0){const choices=find(root,e=>e.tag==='button'&&e.className.split(' ').includes('sc-choice'));assert.equal(choices.length,choices.length>0?5:0);assert.equal(choices.length,5,'five clickable answers should be present');choices[answer].handlers.click();}
test('catfish quiz immediately renders question 1 instead of being stuck on Loading',()=>{
  const {root}=setup('CatfishSafetyModel','assets/tests/catfish-safety-model.js','assets/tests/catfish-safety-app.js','catfishQuiz');
  assert.ok(find(root,e=>e.tag==='h2'&&e.textContent.includes('photo')));
  assert.equal(find(root,e=>e.tag==='button'&&e.className.includes('sc-choice')).length,5);
});
test('catfish quiz advances through all 15 answers and displays personalized results',()=>{
  const {root}=setup('CatfishSafetyModel','assets/tests/catfish-safety-model.js','assets/tests/catfish-safety-app.js','catfishQuiz');
  for(let i=0;i<15;i++){assert.ok(find(root,e=>e.className.includes('sc-counter')).some(e=>e.textContent==='Question '+(i+1)+' of 15'));pressAnswer(root)}
  assert.ok(find(root,e=>e.tag==='h2'&&e.textContent==='Few concrete warning signs reported so far').length===1);
  assert.ok(find(root,e=>e.textContent==='Your five warning-sign areas').length===1);
});
test('catfish quiz safely shows urgent risk override in actual result UI',()=>{
  const {root}=setup('CatfishSafetyModel','assets/tests/catfish-safety-model.js','assets/tests/catfish-safety-app.js','catfishQuiz');
  for(let i=0;i<15;i++)pressAnswer(root,i===6?3:0);
  assert.ok(find(root,e=>e.tag==='h2'&&e.textContent==='Important safety warning: protect yourself first').length===1);
});
test('parenthood quiz displays questions and result as a cross-page regression check',()=>{
  const {root}=setup('ParenthoodChoiceModel','assets/tests/parenthood-choice-model.js','assets/tests/parenthood-choice-app.js','parenthoodQuiz');
  assert.ok(find(root,e=>e.className.includes('sc-question')).length===1);
  for(let i=0;i<18;i++)pressAnswer(root,2);
  assert.ok(find(root,e=>e.className.includes('sc-result-title')).length===1);
});
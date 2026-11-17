import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

const require=createRequire(import.meta.url);
const root=path.resolve(import.meta.dirname,"..");
const core=require(path.join(root,"assets/baby-name-core.js"));
const html=fs.readFileSync(path.join(root,"tools/baby-name-finder/index.html"),"utf8");
const app=fs.readFileSync(path.join(root,"assets/baby-name-finder.js"),"utf8");

class FakeNode {
  constructor(){
    this.textContent="";
    this.innerHTML="";
    this.value="";
    this.hidden=false;
    this.disabled=false;
    this.dataset={};
    this.style={};
    this.listeners=new Map();
    this.options=[];
    this.classList={toggle(){},add(){},remove(){}};
  }
  addEventListener(name,handler){this.listeners.set(name,handler)}
  fire(name){const handler=this.listeners.get(name);if(handler)handler({target:this,preventDefault(){}})}
  setAttribute(name,value){this[name]=value}
  append(...items){this.options.push(...items)}
  scrollIntoView(){}
  focus(){}
  get length(){return this.options.length}
  set length(n){this.options.length=n}
}
function optionsFor(id){
  const sel=html.match(new RegExp('<select id="'+id+'"[^>]*>([\\s\\S]*?)</select>'));
  if(!sel)throw Error("Missing HTML select "+id);
  return [...sel[1].matchAll(/<option value="([^"]+)">([^<]*)<\/option>/g)].map(([,value,label])=>{
    const node=new FakeNode();node.value=value;node.textContent=label;return node;
  });
}
function createHarness(failPath=null){
  const nodes=new Map(), storage=new Map();
  for(const id of ["meaningSelect","originSelect","initialSelect","lengthSelect","sortSelect","regionSelect"]){
    const select=new FakeNode(); select.options=optionsFor(id);select.value=select.options[0].value;nodes.set(id,select);
  }
  const get=id=>{if(!nodes.has(id))nodes.set(id,new FakeNode());return nodes.get(id)};
  const clickListeners=new Map();
  const document={
    getElementById:get,
    createElement:()=>new FakeNode(),
    querySelector:()=>new FakeNode(),
    querySelectorAll:()=>[],
    addEventListener:(name,fn)=>clickListeners.set(name,fn),
    body:{append(){}}
  };
  const fakeFetch=async url=>{
    if(url===failPath)return {ok:false,status:503};
    const file=path.join(root,String(url).replace(/^\/+/,""));
    if(!file.startsWith(root+path.sep))throw Error("Unsafe mocked resource");
    return {ok:true,status:200,json:async()=>JSON.parse(fs.readFileSync(file,"utf8"))};
  };
  const ctx={
    window:{BabyNameCore:core,confirm:()=>false,isSecureContext:true},
    document,localStorage:{
      getItem:key=>storage.get(key)||null,
      setItem:(key,value)=>storage.set(key,value)
    },
    location:{pathname:"/tools/baby-name-finder/",search:"",origin:"https://relationship.sbs"},
    fetch:fakeFetch,console,Intl,URL,URLSearchParams,Math,setTimeout,clearTimeout,
    navigator:{clipboard:null}
  };
  vm.runInNewContext(app,ctx,{filename:"assets/baby-name-finder.js",timeout:1000});
  return {get,nodes,storage,clickListeners};
}
async function waitFor(predicate){
 for(let i=0;i<120;i++){
  if(predicate())return;
  await new Promise(resolve=>setTimeout(resolve,20));
 }
 throw Error("Browser simulation did not reach expected state");
}

test("browser boot loads and validates all 20,000 names and shows source coverage",async()=>{
 const ui=createHarness();
 await waitFor(()=>ui.get("resultsCount").textContent==="20,000 names found");
 assert.equal(ui.get("datasetSize").textContent,"20,000");
 assert(ui.get("babySourceStats").textContent.includes("2,704 of 20,000"));
 assert(ui.get("resultCards").innerHTML.includes("baby-name-card"));
 assert.equal(ui.get("loadingState").hidden,true);
 assert.equal(ui.get("errorState").hidden,true);
 assert.equal(ui.get("loadMore").hidden,false);
 assert(ui.get("meaningSelect").options.some(o=>o.textContent.includes("Love & affection (")));
});

test("client search, filtering, saved favorites and regional rankings work after loading 20k",async()=>{
 const ui=createHarness();
 await waitFor(()=>ui.get("resultsCount").textContent==="20,000 names found");
 const search=ui.get("nameSearch");
 search.value="Liam";
 search.fire("input");
 await waitFor(()=>ui.get("resultsCount").textContent!=="20,000 names found");
 assert(ui.get("resultCards").innerHTML.includes("<h4>Liam</h4>"));
 const event={target:{closest(selector){return selector==="[data-heart]"?{dataset:{heart:"liam"}}:null}}};
 ui.clickListeners.get("click")(event);
 const names=JSON.parse(ui.storage.get("relationship.sbs:baby-name-favorites:v1"));
 assert(names.includes("liam"));
 assert(ui.get("shortlistCards").innerHTML.includes("<h4>Liam</h4>"));
 const region=ui.get("regionSelect");region.value="de";region.fire("change");
 assert.equal(ui.get("regionRanking").hidden,false);
 assert(ui.get("regionRankingLists").innerHTML.includes("Sophia / Sofia"));
 assert(ui.get("regionSourceLink").href.startsWith("https://"));
});

test("browser shows a genuine load failure if any of five catalog shards fails",async()=>{
 const ui=createHarness("/assets/data/baby-names-20k-04.json");
 await waitFor(()=>ui.get("errorState").hidden===false);
 assert.equal(ui.get("loadingState").hidden,true);
 assert(ui.get("resultsCount").textContent!=="20,000 names found");
});

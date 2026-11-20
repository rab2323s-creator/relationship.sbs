import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root=path.resolve(import.meta.dirname,"..");
const page=fs.readFileSync(path.join(root,"blog/aromantic-vs-asexual/index.html"),"utf8");
const script=fs.readFileSync(path.join(root,"assets/aromantic-attraction-explorer.js"),"utf8");
const reg=fs.readFileSync(path.join(root,"assets/blog-data.js"),"utf8");

test("new article matches existing design, title, canonicals and search intent",()=>{
  assert.match(page,/<link rel="stylesheet" href="\/article-ltr\.css">/);
  assert.match(page,/class="article-shell aa-article"/);
  assert.match(page,/name="viewport" content="width=device-width,initial-scale=1"/);
  assert.match(page,/name="robots" content="index,follow/);
  assert.match(page,/rel="canonical" href="https:\/\/relationship\.sbs\/blog\/aromantic-vs-asexual\/"/);
  assert.equal((page.match(/<h1>/g)||[]).length,1);
  assert.equal((page.match(/<h2>/g)||[]).length,19);
  assert.equal((page.match(/class="aa-answer"/g)||[]).length,19);
  assert.match(page,/Aromantic vs\. Asexual: Meaning, Differences &amp; Real Examples/);
  for(const term of ["aromantic meaning","aroace meaning","aromantic spectrum","greyromantic meaning","demiromantic meaning","romantic vs sexual attraction"]){
    assert.ok(page.toLowerCase().includes(term),"Missing primary or secondary search term: "+term);
  }
  assert.match(page,/five-layer lens/i);
  assert.match(page,/not a psychological assessment/i);
  assert.match(page,/fictional/i);
  assert.match(page,/not the same as celibacy/i);
  assert.ok(!page.includes('FAQPage'));
  assert.match(page,/@media\(max-width:720px\)/);
  assert.match(page,/min-height:48px/);
  assert.match(page,/-webkit-overflow-scrolling:touch/);
  assert.ok(fs.existsSync(path.join(root,"assets/images/blog/aromantic-vs-asexual/two-kinds-of-attraction.svg")));
  assert.ok(fs.existsSync(path.join(root,"assets/aromantic-attraction-explorer.js")));
  assert.equal((reg.match(/slug: "aromantic-vs-asexual"/g)||[]).length,1);
});

test("every H2 begins with a direct answer, all jump links resolve",()=>{
  const sections=[...page.matchAll(/<section class="aa-section" id="([^"]+)"><h2>[\s\S]*?<\/h2>\s*<p class="aa-answer">/g)];
  assert.equal(sections.length,19);
  for(const href of page.matchAll(/href="#([a-z0-9-]+)"/g))assert.ok(page.includes('id="'+href[1]+'"'),"Broken anchor "+href[1]);
});

test("blog posting structured data matches visible content",()=>{
  const matched=page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(matched);
  const nodes=JSON.parse(matched[1])["@graph"];
  const get=type=>nodes.find(x=>x["@type"]===type);
  for(const type of ["BlogPosting","WebPage","BreadcrumbList","Organization","WebSite","ImageObject"])assert.ok(get(type),type+" missing");
  assert.equal(get("BlogPosting").datePublished,"2026-11-20");
  assert.equal(get("BlogPosting").headline,"Aromantic vs. Asexual: Meaning, Differences & Real Examples");
  assert.equal(get("BlogPosting").mainEntityOfPage["@id"],"https://relationship.sbs/blog/aromantic-vs-asexual/#webpage");
  assert.equal(get("WebPage").url,"https://relationship.sbs/blog/aromantic-vs-asexual/");
  assert.ok(get("BlogPosting").wordCount>3000);
  assert.equal(get("BlogPosting").citation.length,7);
  assert.equal(nodes.some(x=>x["@type"]==="FAQPage"),false);
});

test("outgoing internal links and assets exist",()=>{
  for(const href of page.matchAll(/href="(\/[^"#?]*)"/g)){
    const link=href[1],local=link==="/"
      ?"index.html"
      :/\.[a-z0-9]+$/i.test(link)?link.slice(1):path.join(link.slice(1),"index.html");
    assert.ok(fs.existsSync(path.join(root,local)),"Broken internal link "+link);
  }
  const inbound=["blog/platonic-relationship-meaning/index.html","blog/in-love-with-same-sex-best-friend/index.html","tests/am-i-gay-quiz/index.html"];
  for(const p of inbound)assert.match(fs.readFileSync(path.join(root,p),"utf8"),/href="\/blog\/aromantic-vs-asexual\/"/);
});

test("private tool handles every topic, copying and reset without network access",async()=>{
  const output={children:[],textContent:"",appendChild(x){this.children.push(x)},querySelector(){return null}};
  const elems={topic:{value:"romantic"},setting:{value:"self"}};
  const form={elements:elems,addEventListener(name,fn){this[name]=fn},reset(){elems.topic.value="romantic";elems.setting.value="self"}};
  const copy={textContent:"",addEventListener(name,fn){this[name]=fn}};
  const reset={textContent:"",addEventListener(name,fn){this[name]=fn}};
  const doc={getElementById(id){return {aaExploreForm:form,aaResult:output,aaCopy:copy,aaReset:reset}[id]||null},createElement(tag){return {tagName:tag,textContent:"",children:[],appendChild(x){this.children.push(x)},setAttribute(){},focus(){},select(){}}}};
  const writes=[];
  vm.runInNewContext(script,{document:doc,navigator:{clipboard:{writeText(value){writes.push(value);return Promise.resolve()}}}});
  for(const topic of ["romantic","sexual","libido","behavior","partner","boundary"]){
    elems.topic.value=topic;elems.setting.value="conversation";output.children=[];
    let prevented=false;form.submit({preventDefault(){prevented=true}});
    assert.ok(prevented);
    assert.equal(output.children.length,4);
    assert.ok(output.children[1].children.length>0);
  }
  copy.click();await Promise.resolve();await Promise.resolve();
  assert.equal(writes.length,1);
  assert.ok(writes[0].includes("I care about your needs"));
  reset.click();assert.equal(output.children.length,2);assert.equal(copy.textContent,"Copy conversation sentence");
  assert.ok(!script.includes("fetch("));
  assert.ok(!script.includes("XMLHttpRequest"));
  assert.ok(!script.includes("localStorage"));
});

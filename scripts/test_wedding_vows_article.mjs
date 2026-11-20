import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
const root=path.resolve(import.meta.dirname,"..");
const page=fs.readFileSync(path.join(root,"blog/how-to-write-wedding-vows/index.html"),"utf8");
const script=fs.readFileSync(path.join(root,"assets/wedding-vow-writer.js"),"utf8");
const reg=fs.readFileSync(path.join(root,"assets/blog-data.js"),"utf8");

test("wedding vow article targets intent with matching page layout",()=>{
 assert.match(page,/<link rel="stylesheet" href="\/article-ltr\.css">/);
 assert.match(page,/class="article-shell wv-article"/);
 assert.match(page,/<meta name="viewport" content="width=device-width,initial-scale=1">/);
 assert.match(page,/name="robots" content="index,follow/);
 assert.match(page,/rel="canonical" href="https:\/\/relationship\.sbs\/blog\/how-to-write-wedding-vows\/"/);
 assert.equal((page.match(/<h1>/g)||[]).length,1);
 assert.equal((page.match(/<h2>/g)||[]).length,19);
 assert.equal((page.match(/class="wv-answer"/g)||[]).length,19);
 for(const term of ["how to write wedding vows","wedding vow template","short wedding vows","personal wedding vows examples","non-religious wedding vows","wedding vows for a second marriage"])assert.ok(page.toLowerCase().includes(term));
 assert.match(page,/Promise-to-Practice Method/);
 assert.match(page,/not a clinically validated marriage intervention/);
 assert.match(page,/fictional editorial scene/);
 assert.match(page,/personal wedding vows are not automatically the legal wording/i);
 assert.match(page,/Private Wedding Vow Writer/);
 assert.match(page,/@media\(max-width:720px\)/);
 assert.match(page,/@media print/);
 assert.match(page,/min-height:48px/);
 assert.match(page,/-webkit-overflow-scrolling:touch/);
 assert.match(page,/alt="Original editorial illustration/);
 assert.ok(fs.existsSync(path.join(root,"assets/images/blog/how-to-write-wedding-vows/the-vows-we-keep.svg")));
 assert.equal((reg.match(/slug: "how-to-write-wedding-vows"/g)||[]).length,1);
});

test("every major H2 has immediate snippet-style answer and jump links work",()=>{
 const sections=[...page.matchAll(/<section class="wv-section" id="([^"]+)"><h2>[\s\S]*?<\/h2>\s*<p class="wv-answer">/g)];
 assert.equal(sections.length,19);
 for(const x of page.matchAll(/href="#([a-z0-9-]+)"/g))assert.ok(page.includes('id="'+x[1]+'"'),"Invalid # anchor "+x[1]);
 assert.equal((page.match(/class="wv-faq"/g)||[]).length,12);
});

test("structured data has accurate article, breadcrumbs and free in-page software",()=>{
 const ld=page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(ld);
 const nodes=JSON.parse(ld[1])["@graph"],get=t=>nodes.find(x=>x["@type"]===t);
 for(const t of ["Organization","WebSite","ImageObject","WebPage","BlogPosting","BreadcrumbList","WebApplication"])assert.ok(get(t),t+" missing");
 assert.equal(get("BlogPosting").headline,"How to Write Wedding Vows: Short Templates, Examples & a Personal Worksheet");
 assert.equal(get("BlogPosting").datePublished,"2026-11-20");
 assert.equal(get("BlogPosting").mainEntityOfPage["@id"],"https://relationship.sbs/blog/how-to-write-wedding-vows/#webpage");
 assert.equal(get("WebPage").hasPart["@id"],get("WebApplication")["@id"]);
 assert.equal(get("WebApplication").offers.price,"0");
 assert.ok(get("BlogPosting").wordCount>4500);
 assert.equal(nodes.some(x=>x["@type"]==="FAQPage"),false);
});

test("every internal route and inbound link exists",()=>{
 const hrefs=[...page.matchAll(/href="(\/[^"#?]*)/g)].map(m=>m[1]);
 for(const href of hrefs) {
   const local=href==="/"
     ?"index.html"
     :/\.[a-z0-9]+$/i.test(href)?href.slice(1):path.join(href.slice(1),"index.html");
   assert.ok(fs.existsSync(path.join(root,local)),"Missing local asset/route "+href);
 }
 for(const p of ["blog/should-you-get-a-prenup/index.html","tests/are-we-ready-for-marriage/index.html","blog/interfaith-relationships-before-marriage/index.html","blog/dating-after-divorce/index.html"]){
  assert.ok(fs.readFileSync(path.join(root,p),"utf8").includes('href="/blog/how-to-write-wedding-vows/"'),"Missing inbound link: "+p);
 }
});

test("writer uses user-supplied details; timing, copy, reset and download are local",async()=>{
 const makeInput=value=>({value,focus(){this.focused=true},addEventListener(type,fn){this[type]=fn}});
 const fields={name:makeInput("Jordan"),tone:makeInput("warm"),memory:makeInput("You waited in the rain with an umbrella"),value:makeInput("patience"),future:makeInput("a home full of laughter"),promise1:makeInput("listen before fixing things"),promise2:makeInput("speak honestly in difficult moments"),promise3:makeInput("make space for everyday joy"),repair:makeInput("apologize and try again"),target:makeInput("90"),pace:makeInput("125")};
 const form={elements:fields,addEventListener(name,fn){this[name]=fn},reset(){for(const x of Object.values(fields))x.value="";fields.tone.value="warm";fields.target.value="90";fields.pace.value="125"}};
 const draft={value:"",addEventListener(name,fn){this[name]=fn},focus(){this.focused=true},select(){this.selected=true}};
 const stats={textContent:""},feedback={textContent:""};
 const clickNode=()=>({addEventListener(name,fn){this[name]=fn}});
 const copy=clickNode(),save=clickNode(),print=clickNode();
 const ids={wvForm:form,wvDraft:draft,wvStats:stats,wvFeedback:feedback,wvCopy:copy,wvSave:save,wvPrint:print};
 const writes=[],downloaded=[];
 const body={appendChild(link){return link}};
 const document={getElementById(id){return ids[id]||null},body,createElement(tag){return {tag,click(){downloaded.push(this.download)},remove(){}}}};
 const URL={createObjectURL(){return "blob:local"},revokeObjectURL(){}};
 const Blob=class{constructor(parts,options){this.parts=parts;this.options=options;}};
 let didPrint=0;const window={print(){didPrint++;}};
 vm.runInNewContext(script,{document,window,navigator:{clipboard:{writeText(value){writes.push(value);return Promise.resolve()}}},URL,Blob,Promise});
 assert.equal(typeof form.submit,"function");
 form.submit({preventDefault(){}});
 assert.match(draft.value,/You waited in the rain/);
 assert.match(draft.value,/listen before fixing things/);
 assert.match(draft.value,/I promise to speak honestly/);
 assert.match(draft.value,/When I fall short/);
 assert.match(stats.textContent,/words/);
 assert.match(stats.textContent,/seconds/);
 copy.click();await Promise.resolve();await Promise.resolve();
 assert.equal(writes[0],draft.value);
 save.click();assert.deepEqual(downloaded,["my-personal-wedding-vows.txt"]);
 print.click();assert.equal(didPrint,1);
 fields.pace.value="110";fields.target.value="60";fields.tone.value="simple";
 form.submit({preventDefault(){}});
 assert.match(stats.textContent,/goal 60 seconds/);
 const resetEventHandler=form.reset;
 assert.equal(typeof resetEventHandler,"function");
 resetEventHandler();await Promise.resolve();
 assert.equal(draft.value,"");
 assert.match(stats.textContent,/0 words/);
 assert.match(feedback.textContent,/cleared/);
 assert.ok(!script.includes("localStorage")&&!script.includes("fetch(")&&!script.includes("XMLHttpRequest"));
});

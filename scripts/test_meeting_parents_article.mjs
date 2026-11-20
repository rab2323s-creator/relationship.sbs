import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const page=fs.readFileSync(path.join(root,'blog/meeting-your-partners-parents/index.html'),'utf8');
const script=fs.readFileSync(path.join(root,'assets/meeting-parents-planner.js'),'utf8');
const registry=fs.readFileSync(path.join(root,'assets/blog-data.js'),'utf8');
const svgPath='assets/images/blog/meeting-your-partners-parents/the-extra-place-at-the-table.svg';

test('article is static, unique, indexable and discoverable',()=>{
 assert.match(page,/<meta name="robots" content="index,follow/);
 assert.match(page,/<link rel="canonical" href="https:\/\/relationship\.sbs\/blog\/meeting-your-partners-parents\/"/);
 assert.equal((page.match(/<h1\b/g)||[]).length,1);
 assert.equal((page.match(/id="question-\d+"/g)||[]).length,25);
 assert.equal((page.match(/<h2>/g)||[]).length,15);
 assert.match(page,/48-Hour Checklist/);assert.match(page,/What to Bring When Meeting/);
 assert.match(page,/Questions to Ask Your Boyfriend/);
 assert.match(page,/fictional/);assert.match(page,/not a scientifically validated scale/);
 assert.match(page,/For a first visit to your partner/);
 assert.match(page,/id="mpPlanner"/);assert.match(page,/aria-live="polite"/);
 assert.match(page,/@media\(max-width:720px\)/);
 assert.match(page,/<meta name="viewport"/);
 assert.ok(fs.existsSync(path.join(root,svgPath)));
 assert.match(page,/alt="Original illustration/);
 assert.match(registry,/slug: "meeting-your-partners-parents"/);
 for (const relative of ['/blog/set-boundaries-with-parents/','/blog/interfaith-relationships-before-marriage/','/blog/what-to-talk-about-on-a-first-date/','/methodology/']) {
   assert.ok(page.includes('href="'+relative+'"'));
 }
});
test('structured data is real, consistent with visible page and without deprecated FAQ markup',()=>{
 const m=page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(m,'JSON-LD exists');
 const objects=JSON.parse(m[1])['@graph'];
 const byType=type=>objects.find(x=>x['@type']===type);
 assert.ok(byType('BlogPosting'));assert.ok(byType('BreadcrumbList'));assert.ok(byType('WebPage'));
 assert.equal(byType('BlogPosting').datePublished,'2026-11-20');
 assert.equal(byType('BlogPosting').author['@type'],'Organization');
 assert.equal(byType('BlogPosting').mainEntityOfPage['@id'],'https://relationship.sbs/blog/meeting-your-partners-parents/#webpage');
 assert.equal(byType('BlogPosting').wordCount,4778);
 assert.equal(byType('WebPage').url,'https://relationship.sbs/blog/meeting-your-partners-parents/');
 assert.ok(!objects.some(x=>x['@type']==='FAQPage'));
});
test('all internal links exist in repository',()=>{
 const paths=[...page.matchAll(/href="(\/[^"#?]*)/g)].map(m=>m[1]);
 for(const url of paths) {
   const target=url==='/'?'index.html':/\.[a-z0-9]+$/i.test(url)?url.slice(1):path.join(url.slice(1),'index.html');
   assert.ok(fs.existsSync(path.join(root,target)),'Missing route: '+url);
 }
});
test('planner renders useful variations and copy works without sending data away',async()=>{
 const results=[];
 const output={textContent:'',children:[],appendChild(node){this.children.push(node)}};
 const elements={venue:{value:'home'},tone:{value:'casual'},food:{value:'unknown'},time:{value:'short'}};
 const form={elements,addEventListener(type,fn){this[type]=fn}};
 const copy={textContent:'Copy plan',addEventListener(type,fn){this[type]=fn}};
 const written=[];
 const doc={getElementById(id){return({mpPlanner:form,mpResult:output,mpCopy:copy})[id]},createElement(tag){return{tagName:tag,textContent:'',children:[],appendChild(child){this.children.push(child)}}}};
 vm.runInNewContext(script,{document:doc,navigator:{clipboard:{writeText(value){written.push(value);return Promise.resolve()}}}});
 assert.equal(typeof form.submit,'function');
 let prevented=false;form.submit({preventDefault(){prevented=true}});
 assert.equal(prevented,true);
 assert.equal(output.children[0].textContent,'Your first-meeting plan');
 const first=output.children[1].children.map(n=>n.textContent).join(' ');
 assert.match(first,/host gift|host gift|allergies/i);
 assert.match(first,/planned time/i);
 assert.equal(typeof copy.click,'function');
 copy.click();await Promise.resolve();await Promise.resolve();
 assert.ok(written[0].includes('Confirm names'));assert.equal(copy.textContent,'Copied');
 elements.venue.value='video';elements.tone.value='formal';elements.food.value='no';elements.time.value='long';
 output.children=[];form.submit({preventDefault(){}});
 const second=output.children[1].children.map(n=>n.textContent).join(' ');
 assert.match(second,/time zones/);assert.match(second,/Skip food and alcohol/);
 assert.match(second,/dress and honorifics/);
 assert.ok(!script.includes('fetch(')&&!script.includes('XMLHttpRequest'));
});

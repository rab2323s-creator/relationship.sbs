/* Marriage romance quiz. Accessible, offline, no stored answers. */
(function(root){'use strict';
const data=root.MarriageRomanceData,model=root.MarriageRomanceModel,mount=document.getElementById('romanceMarriageQuiz');
if(!data||!model||!mount)return;
const answers=Array(15).fill(null);let step=0;
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const add=(parent,tag,cls,text)=>{const e=el(tag,cls,text);parent.append(e);return e;};
const btn=(parent,label,cls,fn)=>{const b=add(parent,'button',cls,label);b.type='button';b.addEventListener('click',fn);return b;};
const link=(parent,label,url)=>{const a=add(parent,'a','rm-link',label);a.href=url;return a;};
function question(){
 mount.replaceChildren();const card=add(mount,'section','rm-card');card.setAttribute('aria-label','Question '+(step+1)+' of 15');
 const top=add(card,'div','rm-top');add(top,'span','rm-kicker','QUESTION '+(step+1)+' OF 15');
 const back=btn(top,'← Previous','rm-back',()=>{step=Math.max(0,step-1);question();});back.disabled=step===0;
 const p=add(card,'div','rm-progress');p.setAttribute('role','progressbar');p.setAttribute('aria-label','Quiz completion');p.setAttribute('aria-valuemin','0');p.setAttribute('aria-valuemax','15');p.setAttribute('aria-valuenow',String(step));add(p,'span','rm-progress-fill').style.width=(step/15*100)+'%';
 const q=data.questions[step];add(card,'h2','rm-question',q.text);
 const opts=add(card,'div','rm-options');opts.setAttribute('role','group');opts.setAttribute('aria-label','Choose one answer');
 q.options.forEach((o,i)=>{const b=btn(opts,o.label,'rm-choice'+(answers[step]===i?' rm-selected':''),()=>{answers[step]=i;if(step===14)result();else{step++;question();}});b.setAttribute('aria-pressed',String(answers[step]===i));});
 const bottom=add(card,'div','rm-foot');add(bottom,'p','rm-muted','Choose what usually happens—not what you wish always happened.');
 if(answers[step]!==null)btn(bottom,step===14?'See my results →':'Next question →','rm-next',()=>{if(step===14)result();else{step++;question();}});
}
function section(parent,heading){const s=add(parent,'section','rm-section');add(s,'h3','rm-subhead',heading);return s;}
function meter(parent,dim){const div=add(parent,'div','rm-meterrow');const hdr=add(div,'div','rm-meterhead');add(hdr,'span','',dim.short);add(hdr,'strong','',dim.total+' / 9');const bar=add(div,'div','rm-meter');bar.setAttribute('role','meter');bar.setAttribute('aria-label',dim.short+' self-reported behavior score');bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','9');bar.setAttribute('aria-valuenow',String(dim.total));add(bar,'span','rm-meter-fill').style.width=(dim.total/9*100)+'%';}
function result(){
 let r;try{r=model.score(answers,data)}catch(err){question();return;}
 mount.replaceChildren();const card=add(mount,'section','rm-card rm-result');card.setAttribute('aria-label','Your romance quiz result');card.setAttribute('aria-live','polite');
 add(card,'p','rm-kicker','YOUR PERSONAL ROMANCE REFLECTION');add(card,'h2','rm-result-title',r.band.title);
 const summary=add(card,'div','rm-scorewrap');const circle=add(summary,'div','rm-score');circle.style.setProperty('--value',r.score+'%');circle.setAttribute('role','img');circle.setAttribute('aria-label','Romantic behavior self-reflection score '+r.score+' out of 100');add(circle,'strong','',r.score);add(circle,'span','','/ 100');
 const desc=add(summary,'div','rm-scoretext');add(desc,'p','',r.band.intro);add(desc,'p','rm-muted',r.band.note);
 const dimSec=section(card,'Your five dimensions');add(dimSec,'p','rm-muted','Each dimension reflects three answers (0–9). Higher numbers mean the selected behavior appeared more often in your answers—not a clinical assessment.');r.dimensions.forEach(d=>meter(dimSec,d));
 const pattern=section(card,'The pattern in your answers');add(pattern,'p','',r.responsePattern);
 const strengths=section(card,'Where romance appears most often');if(r.strongest.length===0){add(strengths,'p','','No dimension stood clearly above the others at a strong level. This is a balanced answer pattern, not a failure.');}else{
  if(r.ambiguousStrong||r.close)add(strengths,'p','rm-mixed','Several dimensions were tied or very close; these are examples rather than a definitive top-three ranking.');
  const list=add(strengths,'ul','rm-list');r.strongest.forEach(d=>{const li=add(list,'li');add(li,'strong','',d.short+': ');li.append(document.createTextNode(data.dimensions.find(x=>x.id===d.id).strength));});
 }
 const grow=section(card,'Room for a little more attention');if(!r.growth.length){add(grow,'p','','Your answers do not identify two distinct lower-scoring dimensions. You can choose a shared goal without treating ordinary variation as a weakness.');}else{
  if(r.ambiguousGrowth)add(grow,'p','rm-mixed','Several dimensions are equally low. There is no objective basis for ranking one above another; the examples below are a starting point.');
  const ul=add(grow,'ul','rm-list');r.growth.forEach(d=>{const li=add(ul,'li');add(li,'strong','',d.short+': ');li.append(document.createTextNode(data.dimensions.find(x=>x.id===d.id).growth));});
 }
 const evidence=section(card,'The answers behind your interpretation');const ul=add(evidence,'ul','rm-evidence');r.examples.forEach(e=>{const li=add(ul,'li');add(li,'strong','','Q'+e.number+' · ');li.append(document.createTextNode('“'+e.answer+'” — '+e.insight));});
 const act=section(card,'Three realistic next steps');const steps=add(act,'ol','rm-list');r.steps.forEach(s=>add(steps,'li','',s));
 const together=add(card,'div','rm-together');add(together,'h3','','Try this together');add(together,'p','',r.prompt);add(together,'p','rm-muted','Ask with curiosity, and let each person answer without pressure.');
 add(card,'p','rm-disclaimer',r.note+' This score represents only the selected responses; it cannot measure your spouse’s private feelings or predict marital success.');
 const actions=add(card,'div','rm-actions');btn(actions,'Retake quiz','rm-action',()=>{answers.fill(null);step=0;question();mount.scrollIntoView({block:'start',behavior:'instant'});});
 btn(actions,'Review answers','rm-action rm-light',()=>{step=0;question();mount.scrollIntoView({block:'start',behavior:'instant'});});
 const share=btn(actions,'Share my general result','rm-action rm-light',async()=>{
  const text='My marriage romance reflection: '+r.band.title+' ('+r.score+'/100). Explore your own habits: https://relationship.sbs/tests/romance-in-marriage-quiz/';
  // Share only public category/overall score: never answers, dimension scores, or relationship details.
  try{if(navigator.share){await navigator.share({title:'Marriage romance reflection',text,url:'https://relationship.sbs/tests/romance-in-marriage-quiz/'});}else if(navigator.clipboard){await navigator.clipboard.writeText(text);share.textContent='Copied general result!';}else{share.textContent='Copy this page URL to share';}}catch(e){if(e.name!=='AbortError')share.textContent='Sharing unavailable';}
 });
 const related=section(card,'Continue exploring');const links=add(related,'div','rm-related');link(links,'Why intimacy changes over time','/blog/intimacy-changes-long-term-relationships/');link(links,'Emotional intimacy quiz','/tests/emotional-intimacy/');link(links,'Read our scoring methodology','/methodology/');
}
question();
})(typeof globalThis!=='undefined'?globalThis:this);

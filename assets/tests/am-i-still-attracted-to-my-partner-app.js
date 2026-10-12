/* Keyboard-accessible, client-side attraction quiz. */
(function(root){'use strict';
const data=root.AttractionReflectionData,model=root.AttractionReflectionModel,mount=document.getElementById('attractionQuiz');
if(!mount||!data||!model||data.questions.length!==12)return;
const answers=Array(12).fill(null);let step=0,showResult=false;
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const add=(parent,tag,cls,text)=>{const e=make(tag,cls,text);parent.append(e);return e;};
function link(parent,text,url,cls){const a=add(parent,'a',cls||'',text);a.href=url;return a;}
function button(parent,label,cls,fn){const b=add(parent,'button',cls,label);b.type='button';b.addEventListener('click',fn);return b;}
function heading(parent,text){return add(parent,'h2','ar-question',text);}
function goBack(){showResult=false;step=Math.max(0,step-1);renderQuestion();}
function reset(){answers.fill(null);step=0;showResult=false;renderQuestion();mount.scrollIntoView({block:'start',behavior:'instant'});}
function selectOption(index){answers[step]=index;if(step===11){showResult=true;renderResult();mount.scrollIntoView({block:'start',behavior:'instant'});}else{step++;renderQuestion();}}
function renderQuestion(){
 showResult=false;mount.replaceChildren();const card=add(mount,'section','ar-card');
 card.setAttribute('aria-label','Quiz question '+(step+1)+' of 12');
 const top=add(card,'div','ar-top');add(top,'span','ar-count','Question '+(step+1)+' of 12');
 const back=button(top,'← Back','ar-back',goBack);back.disabled=step===0;
 const progress=add(card,'div','ar-progress');progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','Quiz progress');
 progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','12');progress.setAttribute('aria-valuenow',String(step+1));
 add(progress,'span','ar-progress-fill').style.width=((step+1)/12*100)+'%';
 const q=data.questions[step];heading(card,q.text);const choices=add(card,'div','ar-choices');choices.setAttribute('role','group');choices.setAttribute('aria-label','Select one answer');
 q.options.forEach((o,i)=>{const selected=answers[step]===i;const b=button(choices,o.text,'ar-choice'+(selected?' ar-selected':''),()=>selectOption(i));b.setAttribute('aria-pressed',selected?'true':'false');});
 const footer=add(card,'div','ar-footer');add(footer,'span','ar-hint','Choose what is most often true for you; no answer is right or wrong.');
 if(answers[step]!==null){button(footer,step===11?'Show my result':'Next →','ar-next',()=>{if(step===11){showResult=true;renderResult();}else{step++;renderQuestion();}});}
}
function renderResult(){
 let r;try{r=model.score(answers,data)}catch(e){renderQuestion();add(mount,'p','ar-error',e.message);return;}
 mount.replaceChildren();const p=data.profiles[r.primary],d=data.dimensions.find(x=>x.id===r.primary);
 const box=add(mount,'section','ar-card ar-result');box.setAttribute('aria-live','polite');
 add(box,'p','ar-eyebrow','Your attraction reflection');
 add(box,'h2','ar-result-title',p.headline);add(box,'p','ar-lede',p.summary);
 if(r.mixed){
   const second=data.dimensions.find(x=>x.id===r.secondary);
   add(box,'p','ar-mixed',r.tied?'A genuinely mixed result: '+second.short.toLowerCase()+' appeared just as often as your first profile. The displayed primary is selected by a consistent tie rule, not because it is stronger.':'A close second: '+second.short.toLowerCase()+' appeared only one answer behind your leading theme. Both may matter.');
 }
 const chart=add(box,'section','ar-summary');add(chart,'h3',null,'What your 12 answers emphasized');
 data.dimensions.forEach(dim=>{
   const row=add(chart,'div','ar-signal');const lab=add(row,'div','ar-signal-top');
   add(lab,'span',null,dim.short);add(lab,'strong',null,r.counts[dim.id]+' / 12');
   const bar=add(row,'div','ar-meter');bar.setAttribute('role','meter');bar.setAttribute('aria-label',dim.short+' answer count');
   bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','12');bar.setAttribute('aria-valuenow',String(r.counts[dim.id]));
   add(bar,'span','ar-meter-fill').style.width=(r.counts[dim.id]/12*100)+'%';
 });
 add(box,'p','ar-fine','These are counts of chosen answer themes, not a percentage of attraction, a compatibility score, or a prediction about your relationship.');
 const pair=add(box,'div','ar-two');const a=add(pair,'section','ar-note');add(a,'h3',null,'A strength in your answers');add(a,'p',null,p.strength);
 const b=add(pair,'section','ar-note');add(b,'h3',null,'Worth considering');add(b,'p',null,p.watch);
 add(box,'h3','ar-subheading','How your specific answers shaped this result');
 const ul=add(box,'ul','ar-evidence');const matches=r.primaryEvidence.slice(0,3);
 matches.forEach(e=>{const li=add(ul,'li');add(li,'strong',null,'Question '+e.number+': ');li.append(document.createTextNode('“'+e.answer+'” '));add(li,'span','ar-muted',e.insight);});
 if(r.mixed && r.secondaryEvidence.length){
   const e=r.secondaryEvidence[0],li=add(ul,'li');add(li,'strong',null,'Close-second example (question '+e.number+'): ');
   li.append(document.createTextNode('“'+e.answer+'” '));add(li,'span','ar-muted',e.insight);
 }
 add(box,'h3','ar-subheading','Practical next steps');const steps=add(box,'ol','ar-steps');p.steps.forEach(s=>add(steps,'li',null,s));
 const reading=add(box,'p','ar-fine');reading.append(document.createTextNode('A relevant guide: '));link(reading,d.label,d.guide);
 const actions=add(box,'div','ar-actions');
 button(actions,'Retake quiz','ar-button',reset);
 button(actions,'Review / change answers','ar-button ar-light',()=>{step=0;showResult=false;renderQuestion();});
 link(actions,'Read the full '+d.short.toLowerCase()+' result guide','/tests/am-i-still-attracted-to-my-partner/results/'+r.primary+'/','ar-button ar-outline');
 add(box,'p','ar-disclaimer','Educational self-reflection, not a clinical evaluation. Attraction is personal and can change; your answers do not obligate you or your partner to feel or do anything.');
}
renderQuestion();
})(typeof globalThis!=='undefined'?globalThis:this);

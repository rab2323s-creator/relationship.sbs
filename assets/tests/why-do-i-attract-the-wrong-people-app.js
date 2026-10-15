/* A dependency-free quiz UI following the site's existing DOM-based test pattern. */
(function(root){'use strict';
const data=root.WrongPeopleQuizData,model=root.WrongPeopleQuizModel,mount=root.document&&document.getElementById('wrongPeopleQuiz');
if(!mount||!data||!model||data.questions.length!==15)return;
const KEY='relationship.sbs:wrong-people-quiz:v1';
const answers=Array(15).fill(null);let step=0,completed=false;
let store;try{store=root.sessionStorage;}catch(e){store=null;}
function read(){if(!store)return;try{const saved=JSON.parse(store.getItem(KEY));if(!saved||!Array.isArray(saved.answers)||saved.answers.length!==15)return;saved.answers.forEach((v,i)=>{if(Number.isInteger(v)&&v>=0&&v<4)answers[i]=v;});if(saved.completed&&answers.every(v=>v!==null)){completed=true;}else{const first=answers.indexOf(null);step=first<0?14:first;}}catch(e){/* storage can be unavailable */}}
function save(){if(!store)return;try{store.setItem(KEY,JSON.stringify({answers,completed}));}catch(e){/* private modes may block storage */}}
function clear(){if(!store)return;try{store.removeItem(KEY);}catch(e){}}
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function add(parent,tag,cls,text){const n=el(tag,cls,text);parent.append(n);return n;}
function button(parent,text,cls,handler){const b=add(parent,'button',cls,text);b.type='button';b.addEventListener('click',handler);return b;}
function link(parent,text,path){const n=add(parent,'a',null,text);n.href=path;return n;}
function focusAndView(){if(mount.scrollIntoView)mount.scrollIntoView({block:'start'});const h=mount.querySelector&&mount.querySelector('[data-quiz-focus]');if(h&&h.focus)h.focus({preventScroll:true});}
function title(parent,tag,cls,text){const n=add(parent,tag,cls,text);n.setAttribute('data-quiz-focus','');n.setAttribute('tabindex','-1');return n;}
function back(){if(step>0){step--;completed=false;save();renderQuestion();focusAndView();}}
function choose(i){answers[step]=i;if(step===14){completed=true;save();renderResult();}else{step++;save();renderQuestion();}focusAndView();}
function renderQuestion(){
 mount.replaceChildren();
 const card=add(mount,'section','wp-card');card.setAttribute('aria-label','Question '+(step+1)+' of 15');
 const top=add(card,'div','wp-top');
 add(top,'strong','wp-kicker','Question '+(step+1)+' of 15');
 const previous=button(top,'← Back','wp-back',back);previous.disabled=step===0;
 const progress=add(card,'div','wp-progress');
 progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','Quiz progress');
 progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','15');progress.setAttribute('aria-valuenow',String(step+1));
 add(progress,'span','wp-progress-fill').style.width=((step+1)/15*100)+'%';
 title(card,'h2','wp-question',data.questions[step].text);
 const group=add(card,'div','wp-choices');group.setAttribute('role','group');group.setAttribute('aria-label','Choose one answer');
 data.questions[step].options.forEach((o,i)=>{
  const selected=answers[step]===i;
  const b=button(group,o.text,'wp-choice'+(selected?' wp-selected':''),()=>choose(i));
  b.setAttribute('aria-pressed',String(selected));
 });
 add(card,'p','wp-hint','Choose what sounds most familiar. There is no perfect answer.');
 if(answers[step]!==null){const next=button(card,step===14?'View my result →':'Next question →','wp-next',()=>{if(step===14){completed=true;save();renderResult();}else{step++;save();renderQuestion();}focusAndView();});next.setAttribute('aria-label',step===14?'View my result':'Go to next question');}
}
function reset(){answers.fill(null);step=0;completed=false;clear();renderQuestion();focusAndView();}
function panel(parent,heading,text){const section=add(parent,'section','wp-panel');add(section,'h3',null,heading);add(section,'p',null,text);return section;}
function renderResult(){
 let r;try{r=model.score(answers,data);}catch(e){completed=false;step=Math.max(0,answers.indexOf(null));renderQuestion();add(mount,'p','wp-error',e.message);return;}
 mount.replaceChildren();
 const card=add(mount,'section','wp-card wp-result');card.setAttribute('aria-live','polite');
 add(card,'p','wp-kicker','Your relationship self-awareness reflection');
 title(card,'h2','wp-outcome',data.profiles[r.primary].headline);
 const number=add(card,'p','wp-score');add(number,'strong',null,String(r.index)+'/100');number.append(document.createTextNode(' Pattern Pull Index'));
 add(card,'p','wp-hint','Higher scores mean more of your selected responses pointed toward rushed or mismatched relationship choices. This is a descriptive self-reflection index—not a diagnosis, probability or measure of personal worth.');
 add(card,'p','wp-lead',data.profiles[r.primary].lead);
 if(r.mixed){add(card,'p','wp-mixed','Your two highest themes are '+r.gap+' point'+(r.gap===1?'':'s')+' apart. The answers do not support a single clear dominant pattern; look at the situations below rather than a fixed label.');}
 const top=add(card,'section','wp-summary');add(top,'h3',null,'Your three strongest answer themes');
 r.topThree.forEach(({id,points})=>{
  const d=data.dimensions.find(x=>x.id===id);
  const line=add(top,'div','wp-signal'),heads=add(line,'div','wp-signal-label');
  add(heads,'span',null,d.short);add(heads,'strong',null,points+' of 9');
  const meter=add(line,'div','wp-meter');meter.setAttribute('role','meter');meter.setAttribute('aria-label',d.label+' score');
  meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','9');meter.setAttribute('aria-valuenow',String(points));
  add(meter,'span','wp-meter-fill').style.width=points/9*100+'%';
 });
 const pair=add(card,'div','wp-two');
 const strengths=add(pair,'section','wp-panel');add(strengths,'h3',null,'Your relative strengths');
 r.strengths.forEach(id=>{const d=data.dimensions.find(x=>x.id===id),p=add(strengths,'p',null);add(p,'strong',null,d.label+': ');p.append(document.createTextNode(r.totals[id]<=3?d.strength:'This theme was less prominent than your other patterns ('+r.totals[id]+'/9), though it may still deserve attention.'));});
 const watch=add(pair,'section','wp-panel');add(watch,'h3',null,'Two areas worth watching');
 r.watch.forEach(id=>{const d=data.dimensions.find(x=>x.id===id),p=add(watch,'p',null);add(p,'strong',null,d.label+': ');p.append(document.createTextNode(r.totals[id]<=2?'A lower-signal area in these answers. Keep checking what actually happens as you date.':d.watch));});
 add(card,'h3',null,'How your own answers shaped the result');
 const examples=add(card,'ol','wp-evidence');
 r.strongestEvidence.forEach(e=>{
  const li=add(examples,'li'),d=data.dimensions.find(x=>x.id===e.dimension);
  add(li,'strong',null,'Question '+e.number+' — '+d.short+': ');
  li.append(document.createTextNode('“'+e.answer+'” '));
  add(li,'span','wp-muted',d.insights[e.points]);
 });
 add(card,'h3',null,'Three practical next steps');
 let steps;
 if(r.primary==='mixed'){steps=r.ranked.slice(0,3).map(id=>data.dimensions.find(x=>x.id===id).steps[0]);}
 else if(r.primary==='healthy'){steps=[data.dimensions.find(x=>x.id===r.ranked[0]).steps[0],'Keep one short list of your values, needs and deal-breakers before the next connection.','Judge repeated behavior over time; a quiz cannot replace your own assessment of safety and fit.'];}
 else steps=data.dimensions.find(x=>x.id===r.primary).steps;
 const ol=add(card,'ol','wp-steps');steps.forEach(s=>add(ol,'li',null,s));
 const reading=add(card,'p','wp-muted');reading.append(document.createTextNode('Explore a related self-check: '));const guide=data.dimensions.find(x=>x.id===r.ranked[0]);link(reading,guide.label,guide.guide);
 const actions=add(card,'div','wp-actions');
 button(actions,'Retake quiz','wp-button',reset);
 button(actions,'Review and change answers','wp-button wp-light',()=>{completed=false;step=0;save();renderQuestion();focusAndView();});
 const share=button(actions,'Share my result','wp-button wp-light',()=>shareResult(r,data.profiles[r.primary].headline));
 share.setAttribute('aria-label','Share result title and score without sharing individual answers');
 add(card,'p','wp-muted','Your answers stay in this browser tab while you take the quiz. Sharing includes only the result title, index score and page link—not individual answers. You never need an account or email.');
 add(card,'p','wp-hint','This is an original, non-validated educational exercise. Being treated badly is never something you caused simply by being attracted to someone. If you face coercion or abuse, prioritize safety and suitable support.');
}
async function shareResult(r,headline){
 const payload={title:'Relationship patterns self-reflection',text:headline+' — '+r.index+'/100 Pattern Pull Index (educational quiz)',url:'https://relationship.sbs/tests/why-do-i-attract-the-wrong-people/'};
 const status=add(mount,'p','wp-share-status');status.setAttribute('role','status');
 try{
  if(root.navigator&&typeof root.navigator.share==='function'){await root.navigator.share(payload);status.textContent='Shared without individual answers.';return;}
  if(root.navigator&&root.navigator.clipboard&&root.navigator.clipboard.writeText){await root.navigator.clipboard.writeText(payload.text+' '+payload.url);status.textContent='Result summary copied. Individual answers were not included.';return;}
  status.textContent='Share this page: '+payload.url+' — Your answers are not included in the link.';
 }catch(e){status.textContent='Sharing was canceled or unavailable. No answers were sent.';}
}
read();if(completed)renderResult();else renderQuestion();
})(typeof globalThis!=='undefined'?globalThis:this);

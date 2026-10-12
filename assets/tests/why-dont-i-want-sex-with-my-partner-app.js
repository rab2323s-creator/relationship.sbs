/* Responsive quiz and deterministic, answer-based context analysis. */
(function(root){"use strict";
const data=root.DesireContextQuizData,mount=document.getElementById("desireQuiz");
if(!mount||!data||data.questions.length!==12)return;
const keys=data.dimensions.map(d=>d.id),n=data.questions.length,answers=Array(n).fill(null);
let index=0,mode="quiz";
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const add=(p,tag,cls,txt)=>{const e=el(tag,cls,txt);p.append(e);return e};
const valid=a=>Array.isArray(a)&&a.length===n&&a.every((v,i)=>Number.isInteger(v)&&v>=0&&v<data.questions[i].options.length);
function score(a){
if(!valid(a))throw Error("Please answer all 12 questions first.");
const raw=Object.fromEntries(keys.map(k=>[k,0])),flags=new Set(),details=[];
a.forEach((v,i)=>{let q=data.questions[i],o=q.options[v];keys.forEach(k=>raw[k]+=o.weights[k]);if(o.flag)flags.add(o.flag);details.push({question:q.text,answer:o.text,insight:o.insight,kind:keys.find(k=>o.weights[k]===3),number:i+1})});
const ranked=keys.slice().sort((a,b)=>raw[b]-raw[a]||keys.indexOf(a)-keys.indexOf(b));
return {raw,ranked,primary:ranked[0],secondary:ranked[1],mixed:raw[ranked[0]]-raw[ranked[1]]<=3,flags:[...flags],details};
}
function aLink(path,label){const a=el("a","dq-link",label);a.href=path;return a;}
function restart(){answers.fill(null);index=0;mode="quiz";render();mount.scrollIntoView({behavior:"instant",block:"start"});}
function choose(v){answers[index]=v;if(index===n-1){mode="result";render();mount.scrollIntoView({behavior:"instant",block:"start"});}else{index++;render();}}
function renderQuestion(){
mount.replaceChildren();const q=data.questions[index],card=add(mount,"section","dq-card");card.setAttribute("aria-label","Question "+(index+1));
const row=add(card,"div","dq-top");add(row,"span","dq-counter","Question "+(index+1)+" of "+n);
const back=add(row,"button","dq-back","← Back");back.type="button";back.disabled=index===0;back.addEventListener("click",()=>{index=Math.max(0,index-1);render();});
const progress=add(card,"div","dq-progress"),fill=add(progress,"div","dq-progress-fill");fill.style.width=((index+1)/n*100)+"%";progress.setAttribute("role","progressbar");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax","12");progress.setAttribute("aria-valuenow",String(index+1));progress.setAttribute("aria-label","Quiz progress");
add(card,"h2","dq-question",q.text);const area=add(card,"div","dq-choices");area.setAttribute("role","group");area.setAttribute("aria-label","Answer choices");
q.options.forEach((o,v)=>{const btn=add(area,"button","dq-choice"+(answers[index]===v?" dq-selected":""),o.text);btn.type="button";btn.setAttribute("aria-pressed",answers[index]===v?"true":"false");btn.addEventListener("click",()=>choose(v));});
const foot=add(card,"div","dq-card-foot");add(foot,"span","dq-help","Choose the closest fit, not the ideal answer.");if(answers[index]!==null){const next=add(foot,"button","dq-small-btn",index===n-1?"See my result":"Next →");next.type="button";next.addEventListener("click",()=>{if(index===n-1){mode="result"}else index++;render()});}
}
function renderResult(){
let r;try{r=score(answers)}catch(e){mode="quiz";renderQuestion();add(mount,"p","dq-error",e.message);return}
mount.replaceChildren();const p=data.profiles[r.primary],d=data.dimensions.find(x=>x.id===r.primary);
const card=add(mount,"section","dq-card dq-result");card.setAttribute("aria-live","polite");
add(card,"p","dq-eyebrow","Your reflection profile");add(card,"h2","dq-result-title",p.title);add(card,"p","dq-lead",p.summary);
const dist=add(card,"div","dq-distribution");add(dist,"h3",null,"What your 12 choices emphasized");
data.dimensions.forEach(dim=>{let row=add(dist,"div","dq-meter-row");let top=add(row,"div","dq-meter-head");add(top,"span",null,dim.name);add(top,"strong",null,(r.raw[dim.id]/3)+" of 12");let bar=add(row,"div","dq-meter");bar.setAttribute("role","meter");bar.setAttribute("aria-label",dim.name+" response count");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","12");bar.setAttribute("aria-valuenow",String(r.raw[dim.id]/3));add(bar,"span","dq-meter-fill").style.width=(r.raw[dim.id]/36*100)+"%";});
add(card,"p","dq-fine","These counts describe which themes you selected; they are not a clinical score or a probability that a particular cause is responsible.");
if(r.mixed){const alt=data.dimensions.find(x=>x.id===r.secondary);add(card,"p","dq-mixed","Mixed picture: "+alt.name.toLowerCase()+" appeared nearly as often. Both contexts may be worth exploring. A tie is resolved in a consistent order, not proof one cause is stronger.");}
if(r.flags.includes("pressure"))add(card,"p","dq-warning","Important: You selected an answer involving pressure or difficulty saying no. Consent and respect matter regardless of your main profile. Repeated coercion or punishment after declining warrants trusted support.");
if(r.flags.includes("health"))add(card,"p","dq-notice","You indicated that tracking symptoms or medication might help. Ask a qualified clinician if a change is sudden, persistent, painful or distressing.");
const mini=add(card,"div","dq-two");let first=add(mini,"section","dq-note");add(first,"h3",null,"A useful strength");add(first,"p",null,p.strength);let second=add(mini,"section","dq-note");add(second,"h3",null,"Worth keeping in mind");add(second,"p",null,p.caution);
add(card,"h3","dq-subhead","Why this fits your answers");let ranked=r.details.filter(x=>x.kind===r.primary).slice(0,3);if(!ranked.length)ranked=r.details.slice(0,2);let examples=add(card,"ul","dq-evidence");ranked.forEach(x=>{const li=add(examples,"li");add(li,"strong",null,"Question "+x.number+": ");li.append(document.createTextNode(x.answer+" "));add(li,"span","dq-muted",x.insight);});
add(card,"h3","dq-subhead","Three next steps");let ol=add(card,"ol","dq-steps");p.steps.forEach(s=>add(ol,"li",null,s));
let related=add(card,"p","dq-related");related.append(document.createTextNode("Relevant reading: "));related.append(aLink(d.guide,d.long));
let actions=add(card,"div","dq-actions");const again=add(actions,"button","dq-action","Retake the 12 questions");again.type="button";again.addEventListener("click",restart);
actions.append(aLink("/tests/why-dont-i-want-sex-with-my-partner/results/"+r.primary+"/","Read the full "+d.name.toLowerCase()+" result guide"));
let edit=add(actions,"button","dq-action dq-secondary","Review my answers");edit.type="button";edit.addEventListener("click",()=>{mode="quiz";index=0;render();});
}
function render(){if(mode==="result")renderResult();else renderQuestion();}
render();
if(typeof module!=="undefined"&&module.exports)module.exports={score};
root.DesireContextQuizModel={score};
})(typeof globalThis!=="undefined"?globalThis:this);

(function(){"use strict";
const model=window.StonewallingQuizModel,root=document.getElementById("stonewallingQuiz");if(!model||!root)return;
const N=model.questions.length;let answers=Array(N).fill(null),index=0,locked=false;
const create=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const add=(parent,tag,cls,text)=>{const e=create(tag,cls,text);parent.append(e);return e;};
const button=(parent,text,fn,cls)=>{const b=add(parent,"button",cls,text);b.type="button";b.addEventListener("click",fn);return b;};
function focus(){const h=root.querySelector('[tabindex="-1"]');if(h)h.focus({preventScroll:true});const y=root.getBoundingClientRect().top;if(y<0||y>window.innerHeight*.7){const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;root.scrollIntoView({block:"start",behavior:reduced?"auto":"smooth"});}}
function choose(i){if(locked)return;locked=true;answers[index]=i;if(index===N-1){renderResult();return;}index++;renderQuestion(true);}
function renderQuestion(moveFocus){locked=false;root.replaceChildren();const q=model.questions[index],card=add(root,"section","sc-quiz-card");card.setAttribute("aria-label","Stonewalling quiz question "+(index+1)+" of "+N);
const top=add(card,"div","sc-quiz-top");add(top,"span","sc-counter","Question "+(index+1)+" of "+N);if(index>0)button(top,"← Back",()=>{index--;renderQuestion(true)},"sc-back");
const progress=add(card,"div","sc-progress");progress.setAttribute("role","progressbar");progress.setAttribute("aria-label","Quiz progress");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax",String(N));progress.setAttribute("aria-valuenow",String(index+1));add(progress,"span","sc-progress-fill").style.width=((index+1)/N*100)+"%";
add(card,"p","mi-dimension-label",model.dimensions.find(d=>d.id===q.dimension).name);
const h=add(card,"h2","sc-question",q.prompt);h.tabIndex=-1;
const options=add(card,"div","sc-options");options.setAttribute("role","group");options.setAttribute("aria-label","Choose what happens most often");
q.options.forEach((choice,j)=>{const b=button(options,choice[0],()=>choose(j),"sc-choice");if(answers[index]===j)b.classList.add("sc-choice-selected");});
if(moveFocus)focus();}
function section(parent,title){const s=add(parent,"section","sc-section");add(s,"h3","",title);return s;}
function meter(parent,d){const box=add(parent,"div","sc-dimension"),top=add(box,"div","sc-dimension-top");add(top,"strong","",d.name);add(top,"span","",d.score+"/100");const bar=add(box,"div","sc-meter");bar.setAttribute("role","meter");bar.setAttribute("aria-label",d.name+" reported pattern intensity");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow",String(d.score));add(bar,"span").style.width=d.score+"%";add(box,"p","sc-dimension-description",d.summary);}
function renderResult(){locked=false;const r=model.calculate(answers);root.replaceChildren();const card=add(root,"section","sc-results");card.setAttribute("aria-label","Your stonewalling quiz result");
add(card,"p","sc-result-kicker","Your conflict communication reflection");const h=add(card,"h2","sc-result-title",r.profile.title);h.tabIndex=-1;
const panel=add(card,"div","sc-score-area");add(panel,"p","sc-score-label","Conflict shutdown and repair-gap indicator");const score=add(panel,"div","sc-score");add(score,"span","sc-score-number",String(r.score));add(score,"span","sc-score-out","/100");add(panel,"p","sc-score-note","Higher means more repeated inconsistency in your examples—not a probability of manipulation.");
add(card,"p","sc-result-intro",r.profile.sub+" "+r.profile.intro);
if(r.safety.length){const warn=add(card,"div","sc-safety-note");add(warn,"h3","","Safety is more important than a quiz score");add(warn,"p","","One or more answers describe fear, threats or intimidation. Do not treat this as a communication exercise you must fix together. If you feel unsafe, consider a trusted person or an appropriate local support service; avoid confronting the other person if that could increase risk.");}
const evidence=section(card,"What in your answers shaped this result");if(!r.evidence.length)add(evidence,"p","","You did not choose the more intermittent options. That is encouraging; future behavior and conversations still matter more than a score.");
else{add(evidence,"p","","These are selected behaviors, not proof of your partner's private intentions.");const list=add(evidence,"ul","sc-evidence");r.evidence.slice(0,4).forEach(s=>{const li=add(list,"li");add(li,"strong","",s.choice);add(li,"span","","Scenario: "+s.prompt);});}
const detail=section(card,"Your four conflict-repair areas");add(detail,"p","","A higher bar reflects more recurring shutdown or difficulty repairing in that area. It is not a clinical measure.");r.breakdown.forEach(d=>meter(detail,d));
const strengths=section(card,"Areas showing less difficulty");add(strengths,"p","",r.steadier.slice(0,2).map(d=>d.name+" ("+d.score+"/100)").join(" and ")+". Lower intensity here reflects the more consistent choices you selected.");
const next=section(card,"Your personalized next steps");const ol=add(next,"ol","sc-next");r.actions.forEach(d=>add(ol,"li","",d.action));add(next,"p","","If the other person has already clearly said they cannot offer a relationship or a particular pace, take that answer seriously instead of trying to change their mind.");
const scripts=section(card,"Three phrases for a pause-and-return conversation");const items=add(scripts,"ul","sc-evidence");[
"I want to hear you, and I can see we are both upset. Can we take a break and come back at 7 tonight?",
"It is okay to need space. I also need us to agree on when we will finish this conversation.",
"I am not asking for an instant answer. I do want us to return to the issue and decide what can change."
].forEach(t=>add(items,"li","",'“'+t+'”'));
const method=section(card,"How this score is calculated");add(method,"p","","Fourteen selections contribute 0–3 pattern points each. Four areas are normalized to 0–100, then weighted: shutdown 23%, return plans 27%, repair 25%, and room to speak 25%. This original educational measure has not been validated, and the thresholds are editorial. A safety-related answer overrides the descriptive result. No score can establish motives or diagnose another person.");
const reading=section(card,"Related resources for conflict and repair");const links=add(reading,"div","sc-related");[
["/blog/stonewalling-in-a-relationship/","Stonewalling in a Relationship","Understand shutdown, flooding, silent treatment and boundaries."],["/tests/conflict-style/","Conflict Style Test","Explore your broader conflict response rather than one partner’s silence."],["/blog/fair-fighting-rules/","Fair Fighting Rules","Practical rules for safer disagreements and repair."]
].forEach(([url,name,desc])=>{const a=add(links,"a");a.href=url;add(a,"strong","",name);add(a,"span","",desc);});
const row=add(card,"div","sc-result-actions");button(row,"Retake the 14 questions",()=>{answers=Array(N).fill(null);index=0;renderQuestion(true);},"sc-restart");
add(card,"p","sc-fineprint","This original quiz is for education and self-reflection only. It cannot determine whether silence is intentional or abusive, or diagnose either person. Your choices stay in this browser tab's temporary memory and are not submitted to our server. Reload or close the page to clear them.");
focus();}
renderQuestion(false);
})();
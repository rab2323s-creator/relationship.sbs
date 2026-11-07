/* One-question-at-a-time results UI; matches the site's move-in readiness assessment. */
(function(){"use strict";
const model=window.AskThemOutModel,root=document.getElementById("askThemOutQuiz");if(!model||!root)return;
const N=model.questions.length;let answers=Array(N).fill(null),index=0,busy=false;
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
const add=(p,tag,cls,txt)=>{const e=make(tag,cls,txt);p.append(e);return e;};
const button=(p,txt,fn,cls)=>{const b=add(p,"button",cls,txt);b.type="button";b.addEventListener("click",fn);return b;};
function focus(){const h=root.querySelector('[tabindex="-1"]');if(h)h.focus({preventScroll:true});const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;root.scrollIntoView({block:"start",behavior:reduce?"auto":"smooth"});}
function choose(i){if(busy)return;busy=true;answers[index]=i;if(index===N-1){renderResults();return;}index++;renderQuestion(true);}
function renderQuestion(shouldFocus){
 busy=false;root.replaceChildren();
 const q=model.questions[index],card=add(root,"section","sc-quiz-card");card.setAttribute("aria-label","Question "+(index+1)+" of "+N);
 const top=add(card,"div","sc-quiz-top");add(top,"span","sc-counter","Question "+(index+1)+" of "+N);
 if(index>0)button(top,"← Back",()=>{index--;renderQuestion(true)},"sc-back");
 const bar=add(card,"div","sc-progress");bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Quiz progress");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(N));bar.setAttribute("aria-valuenow",String(index+1));add(bar,"span","sc-progress-fill").style.width=((index+1)/N*100)+"%";
 const dim=model.dimensions.find(d=>d.id===q.dimension);add(card,"p","mi-dimension-label",dim.name);
 const title=add(card,"h2","sc-question",q.prompt);title.tabIndex=-1;
 const opts=add(card,"div","sc-options");opts.setAttribute("role","group");opts.setAttribute("aria-label","Choose the answer closest to your situation");
 q.options.forEach((o,i)=>{const b=button(opts,o[0],()=>choose(i),"sc-choice");if(answers[index]===i)b.classList.add("sc-choice-selected");});
 if(shouldFocus)focus();
}
function section(parent,title){const el=add(parent,"section","sc-section");add(el,"h3","",title);return el;}
function scoreMeter(parent,d){const wrap=add(parent,"div","sc-dimension"),top=add(wrap,"div","sc-dimension-top");add(top,"strong","",d.name);add(top,"span","",d.score+"/100");const bar=add(wrap,"div","sc-meter");bar.setAttribute("role","meter");bar.setAttribute("aria-label",d.name);bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow",String(d.score));add(bar,"span").style.width=d.score+"%";add(wrap,"p","sc-dimension-description",d.summary);}
function renderResults(){
 busy=false;
 let r;try{r=model.calculate(answers);}catch(error){renderQuestion(true);return;}
 root.replaceChildren();const card=add(root,"section","sc-results");card.setAttribute("aria-label","Should I ask them out quiz results");
 add(card,"p","sc-result-kicker","Your personalized invitation-readiness result");
 const title=add(card,"h2","sc-result-title",r.profile.title);title.tabIndex=-1;
 const score=add(card,"div","sc-score-area");add(score,"p","sc-score-label","How prepared your answers are for a respectful invitation");
 const big=add(score,"div","sc-score");add(big,"span","sc-score-number",String(r.score));add(big,"span","sc-score-out","/100");
 add(score,"p","sc-score-note","Original decision-planning indicator—not the chance they like you, and not a prediction they'll say yes.");
 add(card,"p","sc-result-intro",r.profile.sub+" "+r.profile.intro);
 if(r.stops.length){const warn=add(card,"div","sc-safety-note");add(warn,"h3","","A clear boundary overrides the number");add(warn,"p","","One or more answers describes a refusal, unwanted pursuit, unavailability or a request for distance. Do not ask this person again now; a high total cannot cancel their choice.");}
 else if(r.power.length){const warn=add(card,"div","sc-safety-note");add(warn,"h3","","Power and professional boundaries come first");add(warn,"p","","Your situation includes a reporting, teaching, clinical, service or other dependency concern. Do not use your role or access to invite someone who may not be free to say no. Review the setting and relevant policies before considering any personal approach.");}
 else if(r.flagged.some(x=>["work","unavailable"].includes(x.flag))){const warn=add(card,"div","sc-safety-note");add(warn,"h3","","Check availability and context");add(warn,"p","","A workplace duty, an unavailable person, or another uncertain context should be respected. Don't rely on the number as permission to initiate a date.");}
 const dims=section(card,"Your six invitation-readiness dimensions");add(dims,"p","","Each bar summarizes three of your answers. A high bar describes your decision approach—not the other person's interest.");r.dims.forEach(d=>scoreMeter(dims,d));
 const evidence=section(card,"Why you received this result");
 if(!r.evidence.length)add(evidence,"p","","Your answers described clear reasons, mutual social space, careful timing and respect for consent.");
 else{const ul=add(evidence,"ul","sc-evidence");r.evidence.forEach(e=>{const li=add(ul,"li");add(li,"strong","",e.insight);add(li,"span","","For “"+e.prompt+"”, you chose: “"+e.chosen+"”");});}
 const next=section(card,"Your next steps—not someone else's feelings");const ol=add(next,"ol","sc-next");
 if(r.profileKey==="stop"){add(ol,"li","","Do not pursue a date in this situation or use other accounts, friends or work access to get another chance.");add(ol,"li","","Respect the request for space and seek supportive, freely mutual connections elsewhere.");}
 else if(r.profileKey==="pause"){add(ol,"li","","Resolve availability, consent, context and any power imbalance first. No score permits pressuring someone.");add(ol,"li","","Choose a public, freely optional social context or decide not to ask.");}
 else if(r.profileKey==="connect"){add(ol,"li","","Make space for ordinary conversations at recurring activities without trying to manufacture romantic closeness.");add(ol,"li","","Wait for a genuinely voluntary opening; no answer is owed.");}
 else{add(ol,"li","","If you want to, make one clear invitation to a short public date at a comfortable time.");add(ol,"li","","Let them decide freely, and thank them regardless of the answer.");}
 r.actionList.slice(0,3).forEach(a=>add(ol,"li","",a.action));
 const script=section(card,"What you can actually say");add(script,"p","sc-script",r.profile.script);
 const plan=section(card,"A thoughtful response to yes, no or no reply");
 add(plan,"p","","If they say yes: “Great—would Saturday afternoon at a public café suit you?” Keep plans easy to change.");
 add(plan,"p","","If they say no: “Thanks for being clear. No worries at all.” Stop asking and don't request a reason.");
 add(plan,"p","","If they don't reply: avoid repeated messages, checking their accounts, or asking friends to pressure them. Let the invitation rest.");
 const resources=section(card,"Read the practical guides for your next step");
 const links=[["How to flirt in person, naturally","/blog/how-to-flirt-in-person/"],["How to meet people without dating apps","/blog/how-to-meet-people-without-dating-apps/"],["35 cheap first date ideas","/blog/cheap-first-date-ideas/"],["What to talk about on a first date","/blog/what-to-talk-about-on-a-first-date/"]];
 const list=add(resources,"ul","sc-next");links.forEach(x=>{const li=add(list,"li");const a=add(li,"a","",x[0]);a.href=x[1];});
 const method=section(card,"How the quiz result is calculated");add(method,"p","","This original educational model uses 18 answers, with three questions in each of six dimensions. A selected answer gives 0, 1, 3 or 4 points. Each dimension is converted to a 0–100 indicator; they are combined as reasons 16%, mutual conversation 20%, context 20%, timing 14%, consent 18% and readiness to hear the answer 12%. Independent overrides can recommend pausing or not asking even when the overall score is high. The number is not scientifically validated and cannot measure another person's attraction or predict whether they will agree.");
 const actions=add(card,"div","sc-result-actions");button(actions,"Retake all 18 questions",()=>{answers=Array(N).fill(null);index=0;renderQuestion(true);},"sc-restart");
 add(card,"p","sc-fineprint","Free and private: your selections stay in temporary memory in this browser tab; they are not submitted to a server. Reloading clears them. Educational reflection only, not a diagnosis, a consent substitute or a prediction of anyone's thoughts.");
 focus();
}
renderQuestion(false);
})();
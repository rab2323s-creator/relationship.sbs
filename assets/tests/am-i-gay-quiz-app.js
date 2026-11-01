(function(){"use strict";
const model=window.GaySelfDiscoveryModel,root=document.getElementById("gayQuiz");if(!model||!root)return;
const N=model.questions.length;let answers=Array(N).fill(null),index=0,locked=false;
const make=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el;};
const add=(parent,tag,cls,txt)=>{const el=make(tag,cls,txt);parent.append(el);return el;};
const button=(parent,label,callback,cls)=>{const el=add(parent,"button",cls,label);el.type="button";el.addEventListener("click",callback);return el;};
function focusQuiz(){const h=root.querySelector('[tabindex="-1"]');if(h)h.focus({preventScroll:true});const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;root.scrollIntoView({block:"start",behavior:reduce?"auto":"smooth"});}
function pick(i){if(locked)return;locked=true;answers[index]=i;if(index===N-1){showResult();return;}index++;showQuestion(true);}
function showQuestion(shouldFocus){locked=false;root.replaceChildren();const q=model.questions[index],card=add(root,"section","sc-quiz-card");card.setAttribute("aria-label","Question "+(index+1)+" of "+N);
const top=add(card,"div","sc-quiz-top");add(top,"span","sc-counter","Question "+(index+1)+" of "+N);if(index>0)button(top,"← Back",()=>{index--;showQuestion(true)},"sc-back");
const bar=add(card,"div","sc-progress");bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Quiz progress");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(N));bar.setAttribute("aria-valuenow",String(index+1));add(bar,"span","sc-progress-fill").style.width=(100*(index+1)/N)+"%";
add(card,"p","mi-dimension-label",q.section);const heading=add(card,"h2","sc-question",q.prompt);heading.tabIndex=-1;
const options=add(card,"div","sc-options");options.setAttribute("role","group");options.setAttribute("aria-label","Choose the answer closest to your experience");
q.options.forEach((opt,i)=>{const el=button(options,opt[0],()=>pick(i),"sc-choice");if(answers[index]===i){el.classList.add("sc-choice-selected");el.setAttribute("aria-pressed","true");}});
if(shouldFocus)focusQuiz();}
function section(parent,title){const el=add(parent,"section","sc-section");add(el,"h3","",title);return el;}
function showResult(){
locked=false;const r=model.calculate(answers);root.replaceChildren();
const card=add(root,"section","sc-results sd-result");card.setAttribute("aria-label","Your attraction reflection result");
add(card,"p","sc-result-kicker","Your result — based on your answers");
const heading=add(card,"h2","sc-result-title",r.summary.title);heading.tabIndex=-1;
const answer=add(card,"section","sd-result-box");
add(answer,"p","sd-result-label","THE SHORT ANSWER");
add(answer,"p","sd-result-answer",r.summary.answer);
add(answer,"p","sd-result-boundary","Does this tell you whether you are gay? No. It reflects the feelings you described. Only you can decide whether a label fits, and you can take your time.");
const details=section(card,"What you actually answered");
add(details,"p","","These are four of your own responses. They show where the summary came from—not a hidden personality score.");
const evidence=add(details,"ul","sc-evidence sd-answer-list");r.summary.examples.forEach(item=>{const li=add(evidence,"li");add(li,"strong","",item.label);add(li,"span","",item.answer);});
const focus=section(card,"Your next step: "+r.profile.title);
add(focus,"p","",r.profile.intro);
const questions=section(card,"Three helpful questions");const ol=add(questions,"ol","sc-next");r.profile.questions.forEach(q=>add(ol,"li","",q));
const next=section(card,"What to do next");const list=add(next,"ul","sc-evidence");r.profile.next.forEach(t=>add(list,"li","",t));
const method=section(card,"How we got this result");add(method,"p","","The main headline summarizes the answers you gave about possible romantic or physical interest, friendship and attraction across genders. It doesn't assign an orientation or calculate a percentage. Question 18 chooses only the reflection topic and suggestions shown afterward; it cannot change the main summary.");
const related=section(card,"Helpful reading");const l=add(related,"a","sc-guide-link","Am I in love with my same-sex best friend? Explore feelings without assuming a label.");l.href="/blog/in-love-with-same-sex-best-friend/";
const actions=add(card,"div","sc-result-actions");
button(actions,"Review my answers",()=>{index=0;showQuestion(true)},"sc-restart");
button(actions,"Start over and clear answers",()=>{answers=Array(N).fill(null);index=0;showQuestion(true)},"sc-back");
add(card,"p","sc-fineprint","Original educational reflection, not a validated sexual-orientation measure. No orientation, gender identity or diagnosis can be decided from your answers. The quiz code keeps your responses in this page's temporary memory only; a reload clears them. General website analytics and privacy practices are separate.");
focusQuiz();
}
showQuestion(false);
})();
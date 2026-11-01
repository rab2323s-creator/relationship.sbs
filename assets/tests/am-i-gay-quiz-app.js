(function(){"use strict";
const model=window.GaySelfDiscoveryModel,root=document.getElementById("gayQuiz");if(!model||!root)return;
const N=model.questions.length;let answers=Array(N).fill(null),index=0,locked=false;
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
const add=(p,tag,cls,txt)=>{const el=make(tag,cls,txt);p.append(el);return el;};
const button=(p,label,fn,cls)=>{const el=add(p,"button",cls,label);el.type="button";el.addEventListener("click",fn);return el;};
function focusQuiz(){const focusable=root.querySelector('[tabindex="-1"]');if(focusable)focusable.focus({preventScroll:true});const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;root.scrollIntoView({block:"start",behavior:reduce?"auto":"smooth"});}
function pick(choice){if(locked)return;locked=true;answers[index]=choice;if(index===N-1){showResult();return;}index++;showQuestion(true);}
function showQuestion(shouldFocus){locked=false;root.replaceChildren();const q=model.questions[index],card=add(root,"section","sc-quiz-card");card.setAttribute("aria-label","Question "+(index+1)+" of "+N);
const top=add(card,"div","sc-quiz-top");add(top,"span","sc-counter","Question "+(index+1)+" of "+N);if(index>0)button(top,"← Back",()=>{index--;showQuestion(true)},"sc-back");
const bar=add(card,"div","sc-progress");bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Quiz progress");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(N));bar.setAttribute("aria-valuenow",String(index+1));add(bar,"span","sc-progress-fill").style.width=(100*(index+1)/N)+"%";
add(card,"p","mi-dimension-label",q.section);const head=add(card,"h2","sc-question",q.prompt);head.tabIndex=-1;const options=add(card,"div","sc-options");options.setAttribute("role","group");options.setAttribute("aria-label","Choose the answer closest to your experience");
q.options.forEach((o,i)=>{const b=button(options,o[0],()=>pick(i),"sc-choice");if(answers[index]===i){b.classList.add("sc-choice-selected");b.setAttribute("aria-pressed","true");}});
if(shouldFocus)focusQuiz();}
function section(parent,heading){const el=add(parent,"section","sc-section");add(el,"h3","",heading);return el;}
function showResult(){locked=false;const r=model.calculate(answers);root.replaceChildren();const card=add(root,"section","sc-results");card.setAttribute("aria-label","Your private quiz reflection");
add(card,"p","sc-result-kicker","Your personal reflection focus");const heading=add(card,"h2","sc-result-title",r.profile.title);heading.tabIndex=-1;
const topline=add(card,"div","sc-score-area");add(topline,"p","sc-score-label","What this result means");add(topline,"p","sc-result-intro","A topic to explore, not a sexual-orientation score.");add(topline,"p","sc-score-note","Only you can describe your identity. Your answers don't prove or disprove being gay, bi, straight, ace, or anything else.");
add(card,"p","sc-result-intro",r.profile.intro);
const evidence=section(card,"Your answers, in your own words");add(evidence,"p","","These examples are the choices you selected; they are not signs analyzed to assign an identity.");
const ul=add(evidence,"ul","sc-evidence");r.observations.forEach(o=>{const li=add(ul,"li");add(li,"strong","",o.question);add(li,"span","","You chose: “"+o.selected+"”");});
const questions=section(card,"Three questions worth sitting with");const ol=add(questions,"ol","sc-next");r.profile.questions.forEach(s=>add(ol,"li","",s));
const next=section(card,"What you can do next");const list=add(next,"ul","sc-evidence");r.profile.next.forEach(s=>add(list,"li","",s));
const note=section(card,"How this result was chosen");add(note,"p","","The last question asked what you want to explore next. Its answer selects this reflection focus; earlier answers provide the examples above. This original quiz is not a validated psychological measure, does not calculate orientation percentages, and does not infer a sexual-orientation identity.");
const related=section(card,"Continue only if you'd like");const l=add(related,"a","sc-guide-link","Read: Can feelings for a same-gender friend mean more than friendship?");l.href="/blog/in-love-with-same-sex-best-friend/";
const actions=add(card,"div","sc-result-actions");button(actions,"Retake the 18 questions",()=>{answers=Array(N).fill(null);index=0;showQuestion(true)},"sc-restart");button(actions,"Clear my answers",()=>{answers=Array(N).fill(null);index=0;showQuestion(true)},"sc-back");
add(card,"p","sc-fineprint","Your choices are kept only in this page's temporary JavaScript memory and are not submitted by this quiz. Reloading the page clears them. The website's general privacy practices are separate. No account is required. This is education and self-reflection, not a diagnosis or an identity verdict.");
focusQuiz();}
showQuestion(false);
})();
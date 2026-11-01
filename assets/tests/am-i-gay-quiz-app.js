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
locked=false;const r=model.calculate(answers);root.replaceChildren();const card=add(root,"section","sc-results sd-result");card.setAttribute("aria-label","Your quiz result with percentages");
add(card,"p","sc-result-kicker","Your results — 18 questions completed");
const heading=add(card,"h2","sc-result-title",r.result.title);heading.tabIndex=-1;
const total=add(card,"div","sc-score-area sd-score-area");
add(total,"p","sc-score-label","Your highest answer category");const big=add(total,"div","sc-score");
add(big,"span","sc-score-number",String(r.primary.percent));add(big,"span","sc-score-out","%");
add(total,"p","sd-score-name",r.primary.name);
add(total,"p","sc-score-note","Share of six attraction-related answer choices. This is NOT a percentage of being gay or a sexual-orientation probability.");
add(card,"p","sc-result-intro",r.result.explanation);
const breakdown=section(card,"Your five percentage scores");
add(breakdown,"p","","Each bar shows how many of your six direct attraction answers fell in that category. The five bars sum to 100%. A 0% means no selected answers in that category, not no attraction in real life.");
r.scores.forEach(s=>{const div=add(breakdown,"div","sc-dimension sd-dimension"),top=add(div,"div","sc-dimension-top");add(top,"strong","",s.name);add(top,"strong","",s.percent+"%");
const bar=add(div,"div","sc-meter");bar.setAttribute("role","meter");bar.setAttribute("aria-label",s.name+" share of responses");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow",String(s.percent));add(bar,"span").style.width=s.percent+"%";
add(div,"p","sc-dimension-description",s.count+" out of 6 answers.");});
const why=section(card,"Why you got this result");add(why,"p","","These are the actual six answers behind the chart.");
const ev=add(why,"ul","sc-evidence sd-evidence");r.evidence.forEach(q=>{const li=add(ev,"li");add(li,"strong","",q.question);add(li,"span","","You chose: “"+q.answer+"”");});
const extra=section(card,"Your next step: "+r.profile.title);add(extra,"p","",r.profile.intro);
const thought=section(card,"Three questions to think about"),ol=add(thought,"ol","sc-next");r.profile.questions.forEach(q=>add(ol,"li","",q));
const next=section(card,"What to do next"),list=add(next,"ul","sc-evidence");r.profile.next.forEach(t=>add(list,"li","",t));
const note=section(card,"How the scores work");add(note,"p","",r.method);
const more=section(card,"Related reading"),link=add(more,"a","sc-guide-link","Am I In Love With My Same-Sex Best Friend?");link.href="/blog/in-love-with-same-sex-best-friend/";
const actions=add(card,"div","sc-result-actions");button(actions,"Review my answers",()=>{index=0;showQuestion(true)},"sc-restart");
button(actions,"Retake quiz — clear answers",()=>{answers=Array(N).fill(null);index=0;showQuestion(true)},"sc-back");
add(card,"p","sc-fineprint","Educational, non-validated reflection, not an orientation diagnosis or probability. This quiz does not submit or persist your answers; general website privacy practices may differ.");focusQuiz();
}
showQuestion(false);
})();
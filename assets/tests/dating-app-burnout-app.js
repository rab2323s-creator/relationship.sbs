/* Accessible one-question-at-a-time quiz. Results computed locally; no tracking or storage. */
(function(){"use strict";
const data=window.DatingAppBurnoutModel,root=document.getElementById("datingBurnoutQuiz");if(!data||!root)return;
const N=data.questions.length;let answers=Array(N).fill(null),index=0,busy=false;
const make=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el;};
const append=(parent,tag,cls,txt)=>{const el=make(tag,cls,txt);parent.appendChild(el);return el;};
const button=(parent,label,fn,cls)=>{const b=append(parent,"button",cls,label);b.type="button";b.addEventListener("click",fn);return b;};
function focusQuiz(){const h=root.querySelector('[tabindex="-1"]');if(h){h.focus({preventScroll:true});}const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;root.scrollIntoView({block:"start",behavior:reduce?"auto":"smooth"});}
function choose(choice){if(busy)return;busy=true;answers[index]=choice;if(index===N-1){renderResults();return;}index++;renderQuestion(true);}
function renderQuestion(shouldFocus){busy=false;root.replaceChildren();const q=data.questions[index],d=data.dimensions.find(x=>x.id===q.dimension),box=append(root,"section","sc-quiz-card");box.setAttribute("aria-label","Question "+(index+1)+" of "+N);
const top=append(box,"div","sc-quiz-top");append(top,"span","sc-counter","Question "+(index+1)+" of "+N);if(index>0)button(top,"← Back",()=>{index--;renderQuestion(true)},"sc-back");
const bar=append(box,"div","sc-progress");bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Question progress");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(N));bar.setAttribute("aria-valuenow",String(index+1));append(bar,"span","sc-progress-fill").style.width=((index+1)/N*100)+"%";
append(box,"p","db-dimension-label",d.name);const h=append(box,"h2","sc-question",q.prompt);h.tabIndex=-1;
const opts=append(box,"div","sc-options");opts.setAttribute("role","group");opts.setAttribute("aria-label","Choose the answer that fits your recent experience");q.options.forEach((o,i)=>{const b=button(opts,o.label,()=>choose(i),"sc-choice");if(answers[index]===i)b.classList.add("sc-choice-selected");});if(shouldFocus)focusQuiz();}
function resultSection(parent,title){const sec=append(parent,"section","sc-section");append(sec,"h3","",title);return sec;}
function meter(parent,d){const wrap=append(parent,"div","sc-dimension"),top=append(wrap,"div","sc-dimension-top");append(top,"strong","",d.name);append(top,"span","",d.score+"/100");const bar=append(wrap,"div","sc-meter");bar.setAttribute("role","meter");bar.setAttribute("aria-label",d.name+" fatigue indicator");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow",String(d.score));append(bar,"span").style.width=d.score+"%";append(wrap,"p","sc-dimension-description",d.summary);}
function renderResults(){busy=false;const r=data.calculate(answers);root.replaceChildren();const card=append(root,"section","sc-results");card.setAttribute("aria-label","Your dating app burnout quiz results");
append(card,"p","sc-result-kicker","Your personalized dating-fatigue reflection");const h=append(card,"h2","sc-result-title",r.profile.title);h.tabIndex=-1;
const score=append(card,"div","sc-score-area");append(score,"p","sc-score-label","Dating app fatigue indicator — higher means more reported strain");const big=append(score,"div","sc-score");append(big,"span","sc-score-number",String(r.score));append(big,"span","sc-score-out","/100");
append(score,"p","sc-score-note","An original, unvalidated self-reflection score—not a diagnosis, risk percentage or medical burnout scale.");
append(card,"p","sc-result-intro",r.profile.subtitle+" "+r.profile.description);
const first=resultSection(card,"Your first helpful step");append(first,"p","",r.profile.firstAction);
const bars=resultSection(card,"Your five personal fatigue signals");append(bars,"p","","Each bar represents three of your answers. A higher number means you reported more strain in that area; this is not a clinical severity scale.");r.dimensions.forEach(d=>meter(bars,d));
const evidence=resultSection(card,"Why you received this result");if(r.evidence.length){append(evidence,"p","","These are the tiredness signals from the specific options you chose, not assumptions about your personality.");const ul=append(evidence,"ul","sc-evidence");r.evidence.slice(0,4).forEach(x=>{const li=append(ul,"li");append(li,"strong","",x.prompt);append(li,"span","", "Your answer: “"+x.chosen+"”");});}else append(evidence,"p","","You generally selected comfortable or manageable answers. That is a snapshot of your experience, not a promise you will never feel tired of dating.");
const recovery=resultSection(card,"What your break response may be telling you");
if(r.recoveryChoice<=1)append(recovery,"p","","Your answer suggests you can come back to the idea of dating after rest without strong dread. Keep your ability to choose how often you use apps.");
else if(r.recoveryChoice===2)append(recovery,"p","","You expect the same fatigue to return after a break. Before reopening an app, change at least one part of your routine—time spent swiping, parallel conversations, or the pressure to respond.");
else append(recovery,"p","","You described dread or ongoing exhaustion even after a break. The app may not be the only source of strain. You can stay away longer and seek support if low mood, exhaustion or anxiety affects the rest of your life.");
const steps=resultSection(card,"Your personalized 7-day reset");append(steps,"p","","Pick what is realistic. These suggestions are not treatment and you do not need to complete them to earn a healthier result.");
const ol=append(steps,"ol","sc-next");append(ol,"li","","Day 1: Notice when app dating feels energizing versus draining; write one sentence about your reason for using it.");
r.actions.slice(0,2).forEach((a,i)=>append(ol,"li","","Days "+(i===0?"2–3":"4–5")+": "+a.action));
append(ol,"li","","Day 6: Reconnect with a non-dating activity or someone who makes you feel at ease.");
append(ol,"li","","Day 7: Choose whether to resume, reduce or pause. The choice is yours; a lower score is not a requirement.");
const talk=resultSection(card,"Three questions worth asking yourself");const q=append(talk,"ol","sc-next");[
"When did dating last feel like my choice rather than a task to finish?",
"What would change if I could be curious about one person instead of managing an endless queue?",
"What would I need to feel more rested before opening an app again?"
].forEach(t=>append(q,"li","",t));
if(r.score>=50){const support=append(card,"div","sc-safety-note");append(support,"h3","","A note about ongoing exhaustion");append(support,"p","","If tiredness, anxiety or low mood reaches beyond dating and affects sleep, work, friendships or daily functioning, consider talking with a qualified healthcare professional. This quiz cannot determine why you feel this way.");}
const method=resultSection(card,"How this quiz calculates your score");append(method,"p","","Each of the 15 answers contributes 0–3 fatigue points. Three questions form each of five dimensions, scaled to 0–100. The weighted total uses energy 23%, hope 19%, conversation load 22%, personal pace 20%, and recovery 16%. Results: 0–24 Healthy Dating Pace; 25–49 Swiping Fatigue; 50–74 Emotional Exhaustion; 75–100 Time for a Dating Reset. All cutoffs are editorial and have not been clinically validated.");
const further=resultSection(card,"What to read next");const link=append(further,"a","sc-guide-link","How to Meet People Without Dating Apps: 15 Real-Life Ways");link.href="/blog/how-to-meet-people-without-dating-apps/";append(further,"p","","If the bigger issue is difficulty stopping rather than tiredness, read our separate guide to dating app addiction.").appendChild(Object.assign(document.createElement("a"),{href:"/blog/dating-app-addiction/",textContent:"Dating App Addiction: 9 Signs You Can't Stop Swiping"}));
const actions=append(card,"div","sc-result-actions");button(actions,"Retake the 15 questions",()=>{answers=Array(N).fill(null);index=0;renderQuestion(true)},"sc-restart");
append(card,"p","sc-fineprint","Educational self-reflection only. This test is not a medical screening, addiction evaluation or prediction of romantic success. Answers are processed in this browser tab only, are not sent to our server, and are cleared when the page reloads. No account is needed.");
focusQuiz();}
renderQuestion(false);
})();
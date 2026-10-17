(function(){"use strict";
const model=window.BreadcrumbingQuizModel,root=document.getElementById("breadcrumbingQuiz");if(!model||!root)return;
const N=model.questions.length;let answers=Array(N).fill(null),index=0,locked=false;
const create=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const add=(parent,tag,cls,text)=>{const e=create(tag,cls,text);parent.append(e);return e;};
const button=(parent,text,fn,cls)=>{const b=add(parent,"button",cls,text);b.type="button";b.addEventListener("click",fn);return b;};
function focus(){const h=root.querySelector('[tabindex="-1"]');if(h)h.focus({preventScroll:true});const y=root.getBoundingClientRect().top;if(y<0||y>window.innerHeight*.7){const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;root.scrollIntoView({block:"start",behavior:reduced?"auto":"smooth"});}}
function choose(i){if(locked)return;locked=true;answers[index]=i;if(index===N-1){renderResult();return;}index++;renderQuestion(true);}
function renderQuestion(moveFocus){locked=false;root.replaceChildren();const q=model.questions[index],card=add(root,"section","sc-quiz-card");card.setAttribute("aria-label","Breadcrumbing quiz question "+(index+1)+" of "+N);
const top=add(card,"div","sc-quiz-top");add(top,"span","sc-counter","Question "+(index+1)+" of "+N);if(index>0)button(top,"← Back",()=>{index--;renderQuestion(true)},"sc-back");
const progress=add(card,"div","sc-progress");progress.setAttribute("role","progressbar");progress.setAttribute("aria-label","Quiz progress");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax",String(N));progress.setAttribute("aria-valuenow",String(index+1));add(progress,"span","sc-progress-fill").style.width=((index+1)/N*100)+"%";
add(card,"p","mi-dimension-label",model.dimensions.find(d=>d.id===q.dimension).name);
const h=add(card,"h2","sc-question",q.prompt);h.tabIndex=-1;
const options=add(card,"div","sc-options");options.setAttribute("role","group");options.setAttribute("aria-label","Choose what happens most often");
q.options.forEach((choice,j)=>{const b=button(options,choice[0],()=>choose(j),"sc-choice");if(answers[index]===j)b.classList.add("sc-choice-selected");});
if(moveFocus)focus();}
function section(parent,title){const s=add(parent,"section","sc-section");add(s,"h3","",title);return s;}
function meter(parent,d){const box=add(parent,"div","sc-dimension"),top=add(box,"div","sc-dimension-top");add(top,"strong","",d.name);add(top,"span","",d.score+"/100");const bar=add(box,"div","sc-meter");bar.setAttribute("role","meter");bar.setAttribute("aria-label",d.name+" reported pattern intensity");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow",String(d.score));add(bar,"span").style.width=d.score+"%";add(box,"p","sc-dimension-description",d.summary);}
function renderResult(){locked=false;const r=model.calculate(answers);root.replaceChildren();const card=add(root,"section","sc-results");card.setAttribute("aria-label","Your breadcrumbing quiz result");
add(card,"p","sc-result-kicker","Your personalized pattern check");const h=add(card,"h2","sc-result-title",r.profile.title);h.tabIndex=-1;
const panel=add(card,"div","sc-score-area");add(panel,"p","sc-score-label","Breadcrumbing-like pattern indicator");const score=add(panel,"div","sc-score");add(score,"span","sc-score-number",String(r.score));add(score,"span","sc-score-out","/100");add(panel,"p","sc-score-note","Higher means more repeated inconsistency in your examples—not a probability of manipulation.");
add(card,"p","sc-result-intro",r.profile.sub+" "+r.profile.intro);
const evidence=section(card,"Why your answers led here");if(!r.signals.length)add(evidence,"p","","You did not choose the more intermittent options. That is encouraging; future behavior and conversations still matter more than a score.");
else{add(evidence,"p","","These are your particular answers—not assumptions about anyone's hidden intentions.");const list=add(evidence,"ul","sc-evidence");r.signals.slice(0,4).forEach(s=>{const li=add(list,"li");add(li,"strong","",s.choice);add(li,"span","","Scenario: "+s.prompt);});}
const detail=section(card,"Your four communication areas");add(detail,"p","","A higher bar reflects more uncertainty or limited follow-through in that area. It is not a clinical measure.");r.breakdown.forEach(d=>meter(detail,d));
const strengths=section(card,"What looks steadier");add(strengths,"p","",r.strengths.map(d=>d.name+" ("+d.score+"/100)").join(" and ")+". Lower intensity here reflects the more consistent choices you selected.");
const next=section(card,"Your personalized next steps");const ol=add(next,"ol","sc-next");r.actions.forEach(d=>add(ol,"li","",d.action));add(next,"p","","If the other person has already clearly said they cannot offer a relationship or a particular pace, take that answer seriously instead of trying to change their mind.");
const scripts=section(card,"Three calm texts you can adapt");const items=add(scripts,"ul","sc-evidence");[
"I enjoy talking with you. Would you like to make an actual plan for next week? Tuesday or Thursday works for me.",
"I like our conversations, but the long gaps and open-ended plans don't work for me. What kind of contact can you realistically offer?",
"I respect where you're at. I'm looking for more consistency, so I'm going to step back if that isn't possible right now."
].forEach(t=>add(items,"li","",'“'+t+'”'));
const method=section(card,"How this score is calculated");add(method,"p","","Fifteen selections contribute 0 (more consistent) to 3 (more repeated uncertainty) points each. The four dimensions are normalized to 0–100, then combined: consistency 25%, plans and follow-through 30%, clarity 20%, and response to your needs 25%. Result cutoffs are editorial, not scientifically validated; they do not measure intent or predict anyone's behavior.");
const reading=section(card,"Explore the specific pattern");const links=add(reading,"div","sc-related");[
["/blog/breadcrumbing-in-dating/","Breadcrumbing in Dating","Read real text examples and how to respond."],
["/tests/orbiting-dating-quiz/","Orbiting in Dating Quiz","Mostly story views and likes rather than direct messages?"],
["/blog/he-texts-every-day-but-never-makes-plans/","He Texts but Never Makes Plans","When conversations continue but dates do not materialize."]
].forEach(([url,name,desc])=>{const a=add(links,"a");a.href=url;add(a,"strong","",name);add(a,"span","",desc);});
const row=add(card,"div","sc-result-actions");button(row,"Retake the 15 questions",()=>{answers=Array(N).fill(null);index=0;renderQuestion(true);},"sc-restart");
add(card,"p","sc-fineprint","This original quiz is for education and self-reflection only. It cannot diagnose a person or establish intentional manipulation. Your choices stay in this browser tab's temporary memory and are not submitted to our server. Reload or close the page to clear them.");
focus();}
renderQuestion(false);
})();
/* Focused, accessible quiz experience; answers never leave this browser. */
(() => {
"use strict";
const mount=document.getElementById("retroQuiz"), model=window.RetroactiveJealousyModel;
if(!mount)return;
if(!model||model.QUESTIONS.length!==12){mount.textContent="The quiz did not load. Refresh to try again.";return;}
let answers=Array(12).fill(null),index=0;
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
const btn=(txt,cls,fn)=>{const b=el("button",cls,txt);b.type="button";b.addEventListener("click",fn);return b;};
const focus=(id)=>{const e=document.getElementById(id);if(e)e.focus({preventScroll:true});};
const p=(txt,cls)=>el("p",cls,txt);
function renderQuestion(){
 const q=model.QUESTIONS[index];mount.replaceChildren();
 const panel=el("section","retro-card");panel.setAttribute("aria-labelledby","retroQ");
 const top=el("div","retro-top");top.append(p("Question "+(index+1)+" of 12","retro-small"));
 const back=btn("← Previous","retro-back",()=>{if(index){index--;renderQuestion();focus("retroQ");}});back.disabled=!index;top.append(back);panel.append(top);
 const bar=el("progress","retro-progress");bar.max=12;bar.value=index+1;bar.setAttribute("aria-label","Quiz progress");panel.append(bar);
 const title=el("h2","retro-question",q.text);title.id="retroQ";title.tabIndex=-1;panel.append(title);
 panel.append(p("Choose the answer closest to what usually happens. You can return and change any response.","retro-muted"));
 const options=el("div","retro-options");options.setAttribute("role","group");options.setAttribute("aria-label","Choose one answer");
 q.options.forEach((o,j)=>{
   const b=btn(o.label,"retro-option",()=>{
     answers[index]=j;
     if(index===11){if(answers.every(Number.isInteger))renderResult();else{index=answers.findIndex(x=>x===null);renderQuestion();}}
     else{index++;renderQuestion();focus("retroQ");}
   });
   b.setAttribute("aria-pressed",String(answers[index]===j));
   if(answers[index]===j)b.classList.add("is-selected");
   options.append(b);
 });panel.append(options);
 if(answers[index]!==null)panel.append(btn(index===11?"View result":"Continue →","retro-primary",()=>{if(index===11)renderResult();else{index++;renderQuestion();focus("retroQ");}}));
 mount.append(panel);
}
function renderResult(){
 let r;try{r=model.evaluate(answers);}catch(e){mount.replaceChildren(p("Please complete all twelve questions. Your earlier answers have been kept.","retro-warning"),btn("Back to questions","retro-primary",()=>{index=Math.max(0,answers.findIndex(x=>x===null));renderQuestion();}));return;}
 mount.replaceChildren();
 const card=el("section","retro-card");card.setAttribute("aria-labelledby","retroResult");
 card.append(p("Your answers · Personal reflection","retro-small"));
 const title=el("h2","retro-result-title",r.band.title);title.id="retroResult";title.tabIndex=-1;card.append(title);
 card.append(p(r.band.intro,"retro-lead"));
 const score=el("div","retro-score");score.append(el("strong","",r.score+"/100"));score.append(p("Educational pattern index based on 12 choices—not a clinical score, probability, or OCD diagnosis.","retro-muted"));card.append(score);
 if(r.signals.length){
   const safety=el("aside","retro-warning");safety.append(el("h3","","Respect and privacy are important"));
   safety.append(p("In question"+(r.signals.length>1?"s ":" ")+r.signals.map(s=>s.question).join(", ")+", you selected an action that can cross privacy or consent boundaries. That matters independently of your overall score. Avoid tracking or demanding private access; seek support if stopping feels difficult."));
   card.append(safety);
 }
 card.append(el("h3","","Your four dimensions"));
 const grid=el("div","retro-grid");
 Object.entries(model.DIMENSIONS).forEach(([key,dim])=>{
   const val=r.dimensions[key],item=el("div","retro-dimension");
   const heading=el("div","retro-dimhead");heading.append(el("strong","",dim.label),el("span","",val+"/9"));item.append(heading);
   const meter=el("div","retro-meter");meter.setAttribute("role","meter");meter.setAttribute("aria-label",dim.label);meter.setAttribute("aria-valuemin","0");meter.setAttribute("aria-valuemax","9");meter.setAttribute("aria-valuenow",String(val));
   const fill=el("span");fill.style.width=val/9*100+"%";meter.append(fill);item.append(meter,p(dim.desc,"retro-muted"));grid.append(item);
 });card.append(grid);
 card.append(el("h3","","What stands out from your answers"));
 if(r.prominent.length){card.append(p("Your strongest reported areas are "+r.prominent.map(k=>model.DIMENSIONS[k].label.toLowerCase()).join(" and ")+". "+(r.tied.length>1?"Several areas tied; none is treated as the only explanation.":"")));}
 else{card.append(p("No single dimension crossed the higher-signal threshold. Small triggers may still deserve care, but your answers do not support a dominant pattern."));}
 if(r.examples.length){card.append(p("You selected these specific experiences:","retro-muted"));const list=el("ul");r.examples.forEach(e=>list.append(el("li","", "Question "+e.question+": "+e.label)));card.append(list);}
 card.append(el("h3","","Practical next steps"));card.append(p(r.band.next));
 const steps=el("ul");
 const dims=r.prominent.length?r.prominent:r.ranked.slice(0,1);
 dims.forEach(k=>steps.append(el("li","",model.DIMENSIONS[k].step)));
 steps.append(el("li","","If your partner is dishonest or violating current agreements, focus on those observable present-day facts rather than treating every concern as retroactive jealousy."));
 card.append(steps,p("This unvalidated educational tool describes reported patterns, not your partner's intentions, a mental-health diagnosis, or a prediction of relationship success.","retro-muted"));
 const actions=el("div","retro-actions");
 actions.append(btn("Retake the quiz","retro-primary",()=>{answers=Array(12).fill(null);index=0;renderQuestion();focus("retroQ");}));
 const link=el("a","retro-link","Read the retroactive jealousy guide");link.href="/blog/retroactive-jealousy/";actions.append(link);card.append(actions);
 mount.append(card);focus("retroResult");
}
renderQuestion();
})();
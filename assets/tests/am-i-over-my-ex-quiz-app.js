/* 12-step, client-side and dependency-free. No storage or network submissions. */
(function(){
'use strict';
const data=window.OverMyExQuizData,mount=document.getElementById('overExQuiz');
if(!mount)return;
if(!data||data.questions.length!==12){mount.textContent='The quiz could not load. Please refresh the page.';return;}
const answers=Array(12).fill(null);
let index=0;
const el=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x;};
const paragraph=(parent,text,cls)=>{parent.append(el('p',cls||'',text));};
const title=(parent,tag,text,cls)=>{const t=el(tag,cls,text);parent.append(t);return t;};
const focusArea=(node)=>{const target=node.querySelector('[tabindex="-1"]');if(target)target.focus({preventScroll:true});};
function pick(n){answers[index]=n;if(index===11){renderResult();return;}index++;renderQuestion(true);}
function back(){if(index>0){index--;renderQuestion(true);}}
function renderQuestion(focus){
 mount.replaceChildren();
 const q=data.questions[index],card=el('section','ex-quiz-card');card.setAttribute('aria-label',`Question ${index+1} of 12`);
 const top=el('div','ex-quiz-top');top.append(el('span','ex-step',`Question ${index+1} of 12`));
 if(index){let btn=el('button','ex-back','← Back');btn.type='button';btn.addEventListener('click',back);top.append(btn);}card.append(top);
 const progress=el('div','ex-progress');progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','Questions completed');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','12');progress.setAttribute('aria-valuenow',String(index));const progressBar=el('span','ex-progress-fill');progressBar.style.width=`${100*index/12}%`;progress.append(progressBar);card.append(progress);
 const h=title(card,'h2',q.text,'ex-question');h.tabIndex=-1;
 const options=el('div','ex-options');q.options.forEach((option,i)=>{const b=el('button','ex-option',option.label);b.type='button';if(answers[index]===i)b.classList.add('ex-option-selected');b.setAttribute('aria-pressed',String(answers[index]===i));b.addEventListener('click',()=>pick(i));options.append(b);});card.append(options);mount.append(card);
 if(focus)focusArea(card);
}
function dimensionRow(d){
 const row=el('div','ex-dimension');const head=el('div','ex-dimension-head');head.append(el('strong','',d.name),el('span','',`${d.score}/100`));row.append(head);
 const meter=el('div','ex-meter');meter.setAttribute('role','meter');meter.setAttribute('aria-label',d.name+' progress');meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','100');meter.setAttribute('aria-valuenow',String(d.score));const fill=el('span','');fill.style.width=d.score+'%';meter.append(fill);row.append(meter);paragraph(row,d.explain,'ex-dimension-desc');return row;
}
function quoteEvidence(holder,items){const ul=el('ul','ex-evidence');items.forEach(x=>{let li=el('li');li.append(el('strong','',x.choice.insight));li.append(el('span','',`Your answer: “${x.choice.label}”`));ul.append(li);});holder.append(ul);}
function renderResult(){
 mount.replaceChildren();let result;
 try{result=data.calculate(answers.slice());}catch(error){mount.textContent='We could not calculate the result. Please go back and try again.';return;}
 const card=el('section','ex-result');card.setAttribute('aria-label','Your moving-on quiz result');title(card,'p','Your personalized result','ex-kicker');const h=title(card,'h2',result.profile.title,'ex-result-title');h.tabIndex=-1;
 const score=el('div','ex-score-box');paragraph(score,'Moving-On Reflection Score','ex-score-label');const line=el('div','ex-score-line');line.append(el('strong','',String(result.score)),el('span','','/100'));score.append(line);paragraph(score,'Higher scores reflect greater independence in your answers—not a percentage of healing or a prediction.','ex-small');card.append(score);
 paragraph(card,result.profile.description,'ex-result-explanation');
 const overview=el('section','ex-result-section');title(overview,'h3','Your strongest area');title(overview,'p',`${result.strongest.name}: ${result.strongest.score}/100`,'ex-highlight');paragraph(overview,result.strongest.best);title(overview,'h3','The area that needs the most care');title(overview,'p',`${result.lowest.name}: ${result.lowest.score}/100`,'ex-highlight');paragraph(overview,result.lowest.score>=75?'Your answers suggest this area is functioning relatively well, even if it is your lowest-scoring dimension.':result.lowest.low);card.append(overview);
 const sections=el('section','ex-result-section');title(sections,'h3','Your four dimensions');result.dimensions.forEach(d=>sections.append(dimensionRow(d)));card.append(sections);
 const observations=el('section','ex-result-section');title(observations,'h3','What your answers actually showed');if(result.challenging.length){paragraph(observations,'These are the experiences that most pulled your scores downward:');quoteEvidence(observations,result.challenging);}else{paragraph(observations,'You described generally steady patterns across these twelve situations; no answer indicated a strong recurring difficulty.');}
 if(result.steady.length){title(observations,'h4','What is already working');quoteEvidence(observations,result.steady);}card.append(observations);
 const next=el('section','ex-result-section');title(next,'h3','What you can do next');const list=el('ol','ex-next');result.recommendations.forEach(t=>list.append(el('li','',t)));next.append(list);card.append(next);
 const actions=el('div','ex-actions');const retry=el('button','ex-restart','Retake the quiz');retry.type='button';retry.addEventListener('click',()=>{answers.fill(null);index=0;renderQuestion(true);});actions.append(retry);card.append(actions);
 paragraph(card,'This is an original, educational self-reflection quiz—not a clinically validated test. It does not measure another person’s feelings, determine whether reconciliation is possible, or set a deadline for recovery. Answers are scored locally in your browser and are not transmitted or stored by the quiz code.','ex-fineprint');mount.append(card);focusArea(card);
}
window.OverMyExQuizTesting=Object.freeze({calculate:data.calculate});
renderQuestion(false);
})();
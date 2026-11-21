(function(){"use strict";
const model=window.AromanticReflectionModel,root=document.getElementById("aromanticQuiz");if(!model||!root)return;
const N=model.questions.length;let answers=Array(N).fill(null),index=0,locked=false;
function make(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
function add(parent,tag,cls,txt){const e=make(tag,cls,txt);parent.append(e);return e}
function button(parent,title,fn,cls){const b=add(parent,"button",cls,title);b.type="button";b.addEventListener("click",fn);return b}
function anchor(parent,title,url,cls){const a=add(parent,"a",cls,title);a.href=url;return a}
function focus(){const h=root.querySelector('[tabindex="-1"]');if(h)h.focus({preventScroll:true});const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(root.scrollIntoView)root.scrollIntoView({block:"start",behavior:reduced?"auto":"smooth"});}
function select(i){if(locked)return;locked=true;answers[index]=i;if(index===N-1){result();return}index++;question(true);}
function question(shouldFocus){locked=false;root.replaceChildren();const q=model.questions[index],d=model.dimensions.find(x=>x.id===q.domain);const card=add(root,"section","sc-quiz-card");card.setAttribute("aria-label","Question "+(index+1)+" of "+N);
const top=add(card,"div","sc-quiz-top");add(top,"span","sc-counter","Question "+(index+1)+" of "+N);if(index>0)button(top,"← Back",()=>{index--;question(true)},"sc-back");
const track=add(card,"div","sc-progress");track.setAttribute("role","progressbar");track.setAttribute("aria-label","Quiz progress");track.setAttribute("aria-valuemin","0");track.setAttribute("aria-valuemax",String(N));track.setAttribute("aria-valuenow",String(index+1));add(track,"span","sc-progress-fill").style.width=(100*(index+1)/N)+"%";
add(card,"p","mi-dimension-label",d.short);const h=add(card,"h2","sc-question",q.prompt);h.tabIndex=-1;
const options=add(card,"div","sc-options");options.setAttribute("role","group");options.setAttribute("aria-label","Choose the description closest to your experience");
q.options.forEach((o,i)=>{const b=button(options,o.text,()=>select(i),"sc-choice");if(answers[index]===i){b.classList.add("sc-choice-selected");b.setAttribute("aria-pressed","true")}})
add(card,"p","sc-fineprint","There is no correct answer. Choose “I'm not sure” when nothing else fits. Your choice only stays in this page's temporary memory.");
if(shouldFocus)focus();}
function section(card,title){const s=add(card,"section","sc-section");add(s,"h3","",title);return s}
function result(){locked=false;const r=model.calculate(answers);root.replaceChildren();const card=add(root,"section","sc-results sd-result");card.setAttribute("aria-label","Your private aromantic reflection results");
add(card,"p","sc-result-kicker","Your reflection — 18 questions completed");const h=add(card,"h2","sc-result-title",r.profile.title);h.tabIndex=-1;
const spotlight=add(card,"div","sc-score-area sd-score-area");add(spotlight,"p","sc-score-label","Romantic attraction — response indicator");
if(r.attractionPercent===null){add(spotlight,"p","sd-score-name","Not enough clear answers");add(spotlight,"p","sc-score-note","You chose “I'm not sure” on several attraction prompts. No percentage is calculated from too few answered prompts.")}
else{const line=add(spotlight,"div","sc-score");add(line,"span","sc-score-number",String(r.attractionPercent));add(line,"span","sc-score-out","%");add(spotlight,"p","sd-score-name",r.indicators[0].label);add(spotlight,"p","sc-score-note","Average position of your "+r.indicators[0].answered+" answered attraction prompts; NOT a percentage of being aromantic.");}
const headline=add(card,"div","sd-result-box");add(headline,"p","sd-result-label","What this pattern may invite you to explore");add(headline,"p","sd-result-answer",r.profile.lead);add(headline,"p","sd-result-boundary","Only you can choose a label. This tool cannot determine an orientation or diagnose a condition.");
const breakdown=section(card,"Your four response indicators");add(breakdown,"p","sc-result-intro","Each percentage is an independent average of your selected answer positions for that theme. They do not sum to 100%, and none is an identity probability.");
r.indicators.forEach(d=>{const b=add(breakdown,"div","sc-dimension sd-dimension"),top=add(b,"div","sc-dimension-top");add(top,"strong","",d.label);add(top,"strong","",d.percent===null?"No score":d.percent+"%");
const meter=add(b,"div","sc-meter");meter.setAttribute("role","meter");meter.setAttribute("aria-label",d.label+" answer indicator");meter.setAttribute("aria-valuemin","0");meter.setAttribute("aria-valuemax","100");meter.setAttribute("aria-valuenow",String(d.percent===null?0:d.percent));meter.setAttribute("aria-valuetext",d.percent===null?"No answered prompts":d.percent+" percent of the response-position scale");add(meter,"span").style.width=(d.percent===null?0:d.percent)+"%";
add(b,"p","sc-dimension-description",d.answered+" of "+d.total+" prompts scored; "+d.uncertain+" not sure. "+d.note)});
const evidence=section(card,"What you actually answered");add(evidence,"p","","These examples quote your choices, not an interpretation of your identity.");
const list=add(evidence,"ul","sc-evidence sd-evidence");r.responses.filter(x=>!x.uncertain).slice(0,6).forEach(x=>{const li=add(list,"li");add(li,"strong","","Question "+x.number+": "+x.prompt);add(li,"span","","You chose: “"+x.answer+"”")});
if(r.uncertainCount)add(evidence,"p","sc-fineprint","You selected “I'm not sure” "+r.uncertainCount+" time(s). Those choices were excluded, not counted as zero.");
const strength=section(card,"A useful perspective");add(strength,"p","",r.profile.strength);add(strength,"p","",r.profile.notice);
const next=section(card,"Three gentle next steps"),ol=add(next,"ol","sc-next");r.profile.steps.forEach(x=>add(ol,"li","",x));
const questions=section(card,"Questions to carry with you"),ul=add(questions,"ul","sc-next");r.profile.questions.forEach(x=>add(ul,"li","",x));
const method=section(card,"Exactly what the percentages mean");add(method,"p","",r.method);add(method,"p","","The first 5 prompts describe a romantic-attraction experience; the other 13 address preferences, closeness and social pressure. The result title is based only on the first domain; it does not infer orientation from fear of dating, sexual attraction, gender, past partners or social pressure.");
const related=section(card,"Related: explore the terms without a label");anchor(related,"Aromantic vs. Asexual: Meaning, Differences & Real Examples","/blog/aromantic-vs-asexual/","sc-guide-link");add(related,"p","sc-small","See AUREA's community-led glossary before interpreting a label as a test result.");
const actions=add(card,"div","sc-result-actions");button(actions,"Review my answers",()=>{index=0;question(true)},"sc-restart");button(actions,"Retake — clear all answers",()=>{answers=Array(N).fill(null);index=0;question(true)},"sc-back");
add(card,"p","sc-fineprint","Educational self-reflection; not a validated psychological test, diagnostic screening, an aromantic percentage or a probability. Quiz answers are not saved or submitted by this script.");focus();}
question(false);
})();
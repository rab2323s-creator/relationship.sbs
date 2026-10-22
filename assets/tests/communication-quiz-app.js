/* Communication quiz UI: local-only original self-reflection, accessible one question at a time. */
(function(){
"use strict";
const root=document.getElementById("communicationQuiz");
const data=window.COMMUNICATION_QUIZ_DATA||window.COMMUNICATION_LISTENING_DATA;
if(!root||!data)return;
const dims=Object.keys(data.dimensions),preference=data.mode==="preference";
let index=0,answers=Array(data.questions.length).fill(null);
const clean=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pct=n=>Math.round(n);
function calculate(a){
 if(!Array.isArray(a)||a.length!==data.questions.length||a.some((v,i)=>!Number.isInteger(v)||v<0||v>=data.questions[i].options.length))throw Error("Complete each question.");
 const scores=Object.fromEntries(dims.map(k=>[k,0])),counts=Object.fromEntries(dims.map(k=>[k,0]));
 const rows=data.questions.map((q,i)=>{const o=q.options[a[i]];if(preference){scores[o.key]+=1;counts[o.key]+=1;}else {scores[q.primary]+=o.points;counts[q.primary]+=1;}return {question:q.text,answer:o.label,dimension:preference?o.key:q.primary,quality:o.points,note:o.note,id:q.id};});
 if(preference){const order=dims.slice().sort((a,b)=>scores[b]-scores[a]||dims.indexOf(a)-dims.indexOf(b));return{scores: Object.fromEntries(dims.map(k=>[k,pct(scores[k]/a.length*100)])),counts,overall:null,order,rows,top:order[0],second:order[1],last:order[order.length-1],ties:order.filter(k=>counts[k]===counts[order[0]]).length};}
 const normalized=Object.fromEntries(dims.map(k=>[k,pct(100*scores[k]/(counts[k]*4))]));
 const overall=pct(rows.reduce((s,r)=>s+r.quality,0)/(rows.length*4)*100);
 const order=dims.slice().sort((a,b)=>normalized[b]-normalized[a]||dims.indexOf(a)-dims.indexOf(b));
 return{scores:normalized,counts,overall,order,rows,top:order[0],second:order[1],last:order[order.length-1],ties:0};
}
window.COMMUNICATION_QUIZ_ENGINE={calculate};
function focus(){const h=root.querySelector("[data-focus]");if(h){h.focus({preventScroll:true});}const rect=root.getBoundingClientRect();if(rect.top<0||rect.top>window.innerHeight*.8)root.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}
function showQuestion(focusNow){
 const q=data.questions[index],n=index+1,completed=answers.filter(v=>v!==null).length;
 root.innerHTML='<div class="ai-status"><span>Question '+n+' of '+data.questions.length+'</span><span>'+pct(completed/data.questions.length*100)+'% answered</span></div>'+
 '<div class="ai-track" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="'+data.questions.length+'" aria-valuenow="'+completed+'"><span style="width:'+pct(completed/data.questions.length*100)+'%"></span></div>'+
 '<h2 class="ai-question" id="cqQuestion" tabindex="-1" data-focus>'+clean(q.text)+'</h2>'+
 '<div class="ai-choices" role="group" aria-labelledby="cqQuestion">'+q.options.map((o,i)=>'<button type="button" class="ai-choice'+(answers[index]===i?' ai-picked':'')+'" data-pick="'+i+'"><span class="ai-letter">'+String.fromCharCode(65+i)+'</span><span>'+clean(o.label)+'</span></button>').join('')+'</div>'+
 '<div class="ai-controls"><button type="button" id="cqBack" '+(index===0?'disabled':'')+'>← Previous</button><span>'+clean(data.intro)+'</span></div>';
 root.querySelectorAll("[data-pick]").forEach(b=>b.addEventListener("click",()=>{answers[index]=Number(b.dataset.pick);if(index===data.questions.length-1){showResults();return;}index++;showQuestion(true);}));
 root.querySelector("#cqBack").addEventListener("click",()=>{if(index>0){index--;showQuestion(true);}});
 if(focusNow)focus();
}
function evidence(x){
 const a=preference?x.rows.filter(r=>r.dimension===x.top):x.rows.filter(r=>r.dimension===x.last).sort((a,b)=>a.quality-b.quality);
 const chosen=[...a,...x.rows.filter(r=>!a.includes(r))].slice(0,3);
 return '<div class="ai-answer-evidence">'+chosen.map(r=>'<div class="ai-answer-card"><small>Question '+r.id+' · your selected answer</small><blockquote>'+clean(r.answer)+'</blockquote><p>'+clean(data.dimensions[r.dimension].name)+': '+clean(r.note||"This response shaped your profile.")+'</p></div>').join('')+'</div>';
}
function showResults(){
 const x=calculate(answers),top=data.dimensions[x.top],second=data.dimensions[x.second],last=data.dimensions[x.last];
 const title=preference?(x.ties>1?"Your Apology Needs Are Balanced":"You Value "+top.short+" Most"):(x.overall>=82?"A Thoughtful, Responsive Listener":x.overall>=62?"A Listener With Strong Foundations":x.overall>=40?"A Listener Building Consistency":"A Listener With Room to Grow");
 const intro=preference?"Your choices place "+top.name.toLowerCase()+" first and "+second.name.toLowerCase()+" next. This is a preference profile, not a judgment of who apologizes correctly. Several ingredients often belong in one sincere apology.":x.overall>=82?"Your answers describe consistent moments of presence, emotional care and clarification, although real conversations can vary with context and stress.":x.overall>=62?"Your responses show practical listening strengths alongside moments when attention, curiosity or defensiveness could interrupt connection.":"Your responses suggest that listening may become harder under pressure. The following specific skills can be practiced without treating a score as a fixed trait.";
 const details=dims.map(k=>'<div class="ai-dimension"><div><strong>'+clean(data.dimensions[k].name)+'</strong><strong>'+x.scores[k]+(preference?'%':'/100')+'</strong></div><div class="ai-track" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+x.scores[k]+'" aria-label="'+clean(data.dimensions[k].name)+'"><span style="width:'+x.scores[k]+'%"></span></div><p>'+clean(data.dimensions[k].meaning)+'</p></div>').join('');
 const highest=x.scores[x.top],lowest=x.scores[x.last];
 const focusText=preference?'Most selected preference':'Strongest listening skill';
 const steps=preference?[top.action,second.action,"Notice whether repair and behavior change follow the words, especially when the same harm happens repeatedly."]:[last.action,data.dimensions[x.order[x.order.length-2]].action,"For one conversation this week, ask the speaker what helped them feel heard."];
 const summary= data.title+"\n"+title+"\n"+(preference?"Most valued: "+top.name+" ("+highest+"% of selections).\nSecond: "+second.name+".":"Listening Skills Reflection Score: "+x.overall+"/100\nStrongest: "+top.name+"\nPractice: "+last.name)+"\nEducational self-reflection, not a diagnosis.\nhttps://relationship.sbs/tests/"+data.slug+"/";
 root.innerHTML='<div class="ai-result"><p class="ai-overline">Your personal reflection · '+data.questions.length+' answers analyzed</p><h2 tabindex="-1" data-focus>'+clean(title)+'</h2>'+
 '<div class="ai-score-header"><div class="ai-bigscore">'+(preference?highest+'<span>%</span>':x.overall+'<span>/100</span>')+'</div><div><strong>'+(preference?'Top-ranked apology priority':'Listening Skills Reflection Score')+'</strong><p>'+(preference?'Percentage of your 15 choices favoring your top apology need—not a sincerity rating or a measure of personality.':'A site-created index of your answers across five practical listening areas—not a validated test or permanent trait.')+'</p></div></div>'+
 '<p class="ai-profile-lead">'+clean(intro)+'</p>'+
 '<div class="ai-strengths"><div><small>'+focusText+'</small><strong>'+clean(top.name)+'</strong></div><div><small>'+(preference?'Another important need':'Main area to practice')+'</small><strong>'+clean(preference?second.name:last.name)+'</strong></div></div>'+
 '<h3>'+ (preference?'Your four apology priorities':'Your five listening dimensions')+'</h3>'+details+
 '<h3>What your pattern means</h3><p>'+clean(top.meaning)+' '+clean(preference?second.meaning:last.meaning)+'</p>'+
 '<h3>Answers behind your result</h3><p>These examples come from choices you made in this quiz, not a generic personality label.</p>'+evidence(x)+
 '<h3>Your three next steps</h3><ol>'+steps.map(s=>'<li>'+clean(s)+'</li>').join('')+'</ol>'+
 '<div class="ai-safety"><strong>Keep in mind:</strong> '+(preference?'A sincere apology may include accountability, acknowledgment, repair and change together. You do not owe forgiveness, and repeated harm cannot be made safe by a polished apology.':'Being a good listener does not mean agreeing with everything, tolerating insults or ignoring your own boundaries. This self-report cannot verify how other people experience conversations with you.')+'</div>'+
 '<h3>Keep exploring</h3><p>'+data.related.map(a=>'<a href="'+a[0]+'">'+clean(a[1])+'</a>').join(' · ')+'</p>'+
 '<div class="ai-result-actions"><button type="button" id="cqRetake">Retake quiz</button><button type="button" id="cqCopy" class="ai-outline">Copy result summary</button></div><p id="cqStatus" role="status" aria-live="polite"></p></div>';
 root.querySelector("#cqRetake").addEventListener("click",()=>{answers=Array(data.questions.length).fill(null);index=0;showQuestion(true);});
 root.querySelector("#cqCopy").addEventListener("click",async()=>{const status=root.querySelector("#cqStatus");try{await navigator.clipboard.writeText(summary);status.textContent="Result summary copied.";}catch(e){status.textContent="Copy is unavailable in this browser; you can select the result text manually.";}});focus();
}
showQuestion(false);
})();

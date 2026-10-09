
/* Anxiety or Intuition: original local-only 12-question engine.
   The score describes clarity skills. It does not identify a partner's intent,
   measure a clinical disorder, or decide whether intuition is correct. */
(function(){
"use strict";
const data=window.ANXIETY_INTUITION_DATA;
const root=document.getElementById("intuitionQuiz");
if(!data||!root)return;
const keys=Object.keys(data.dimensions);
const state={index:0,answers:Array(data.questions.length).fill(null)};
const descriptions={
  evidence:["You frequently separate specific evidence from imagined explanations.","Write down what happened, what is inferred, and whether the pattern repeats."],
  regulate:["You give a strong feeling space without making each surge of worry a fresh investigation.","Try pausing before a checking or reassurance-seeking response, then choose one proportionate step."],
  uncertainty:["You can remain open to information without needing certainty at once.","Allow a question to remain unresolved for a planned period while attending to your life."],
  speak:["You lean toward direct questions, repair and follow-through rather than indirect tests.","Choose a specific, calm conversation about one behavior and what would change."],
  safety:["You are attentive to consent, repair and the right to protect your limits.","Consider what a clear boundary would look like; if there are threats or coercion, prioritize safety and outside support."]
};
const profiles={
  safety:{title:"A Boundary Signal Needs Attention",summary:"Some of your choices describe consent or boundary pressure. Those are concrete concerns worth taking seriously regardless of whether anxiety is present.",tip:"Prioritize safety, not a score. You do not owe someone a confrontation if that would put you at risk."},
  both:{title:"Both Alarm and Evidence May Be Present",summary:"Your answers show both repeated concerns and moments of reassurance-seeking or fearful interpretation. Real issues and anxiety can coexist.",tip:"Separate the observable behavior from the story your mind adds. Address the behavior; reduce checking that adds no new information."},
  evidence:{title:"A Pattern Worth Clarifying",summary:"Several answers describe actual inconsistencies, broken promises or crossed boundaries. The next step is to evaluate those patterns, not to prove a hidden intention.",tip:"Use a concrete observation and one direct conversation. Assess repair and changed behavior over time."},
  loop:{title:"The Reassurance-Checking Loop",summary:"Your answers suggest that ambiguity can trigger repeated checking, fear-driven explanations or an urge for another answer. That does not mean every concern is imaginary.",tip:"Pause one checking cycle and compare your fear with what you actually know. Seek qualified help if this loop significantly affects your life."},
  grounded:{title:"The Evidence-Led Observer",summary:"Your responses tend to distinguish feelings, facts and relationship patterns while allowing room for uncertainty and direct communication.",tip:"Keep using specific observations and respectful communication. A steady response still cannot guarantee another person's intentions."},
  mixed:{title:"The Clarity-in-Progress Profile",summary:"Your answers reveal a mixture of constructive instincts and moments when uncertainty, silence or indirect responses make a situation harder to read.",tip:"Strengthen the lowest-scoring clarity skill first; no single gut feeling is a verdict."}
};
function clean(s){return String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
function calc(answers){
 if(!Array.isArray(answers)||answers.length!==data.questions.length||answers.some((n,i)=>!Number.isInteger(n)||n<0||n>=data.questions[i].options.length))throw Error("Exactly twelve valid answers are required");
 const stats=Object.fromEntries(keys.map(k=>[k,{got:0,max:0}]));
 const rows=[],markers={observed:0,loop:0,grounded:0,avoid:0,safety:0};
 data.questions.forEach((q,i)=>{
  const choice=q.options[answers[i]];
  stats[q.primary].got+=2*choice.points[0];stats[q.primary].max+=8;
  stats[q.secondary].got+=choice.points[1];stats[q.secondary].max+=4;
  markers[choice.marker]=(markers[choice.marker]||0)+1;
  rows.push({id:q.id,text:q.text,answer:choice.label,primary:q.primary,secondary:q.secondary,marker:choice.marker,quality:2*choice.points[0]+choice.points[1]});
 });
 const scores=Object.fromEntries(keys.map(k=>[k,Math.round(100*stats[k].got/stats[k].max)]));
 const high=keys.slice().sort((a,b)=>scores[b]-scores[a]||keys.indexOf(a)-keys.indexOf(b));
 const low=high.slice().reverse();
 const overall=Math.round(keys.reduce((a,k)=>a+scores[k],0)/keys.length);
 const boundaryConcern=rows.some(x=>x.id===10&&x.marker==="observed");
 let profile="mixed";
 if(boundaryConcern)profile="safety";
 else if(markers.observed>=3&&markers.loop>=2)profile="both";
 else if(markers.observed>=3)profile="evidence";
 else if(markers.loop>=3)profile="loop";
 else if(overall>=76&&markers.grounded>=6)profile="grounded";
 return {scores,high,low,overall,profile,markers,rows,stats};
}
window.ANXIETY_INTUITION_ENGINE={calculate:calc};
function focusHeading(){const el=root.querySelector("[data-focus]");if(el)el.focus({preventScroll:true});}
function showQuestion(){
 const q=data.questions[state.index],n=state.index+1,answered=state.index;
 root.innerHTML='<div class="ai-status"><span>Question '+n+' of '+data.questions.length+'</span><span>'+Math.round(answered/data.questions.length*100)+'% complete</span></div>'+
 '<div class="ai-track" aria-hidden="true"><span style="width:'+Math.round(answered/data.questions.length*100)+'%"></span></div>'+
 '<div class="ai-question" tabindex="-1" data-focus id="intuitionQuestion">'+clean(q.text)+'</div>'+
 '<div class="ai-choices" role="group" aria-label="Choose the response most like your experience">'+q.options.map((o,i)=>
  '<button type="button" class="ai-choice'+(state.answers[state.index]===i?' ai-picked':'')+'" data-pick="'+i+'"><span class="ai-letter">'+String.fromCharCode(65+i)+'</span><span>'+clean(o.label)+'</span></button>').join('')+'</div>'+
 '<div class="ai-controls"><button type="button" id="intuitionBack" '+(state.index===0?'disabled':'')+'>← Previous</button><span>Choose what most often fits—not what sounds ideal.</span></div>';
 root.querySelectorAll("[data-pick]").forEach(btn=>btn.addEventListener("click",()=>{
  state.answers[state.index]=Number(btn.dataset.pick);
  if(state.index===data.questions.length-1){showResult();return;}
  state.index++;showQuestion();focusHeading();
 }));
 root.querySelector("#intuitionBack").addEventListener("click",()=>{if(state.index>0){state.index--;showQuestion();focusHeading();}});
}
function evidenceBlock(rows){
 const important=rows.filter(x=>x.marker==="observed"||x.marker==="loop").slice(0,2);
 if(important.length<2){for(const x of rows){if(!important.some(a=>a.id===x.id)){important.push(x);if(important.length>=2)break;}}}
 return '<div class="ai-answer-evidence">'+important.map(x=>'<div class="ai-answer-card"><small>Question '+x.id+' · your answer</small><blockquote>'+clean(x.answer)+'</blockquote><p>'+ (x.marker==="observed"?'You described an observable relationship concern. This is worth checking in context, not dismissing as anxiety.':x.marker==="loop"?'This response can reflect a reassurance or interpretation loop, especially when no new facts are added.':'This response contributed to your pattern of judging information or handling uncertainty.')+'</p></div>').join('')+'</div>';
}
function showResult(){
 const x=calc(state.answers),p=profiles[x.profile],first=x.high[0],second=x.high[1],weak=x.low[0],weak2=x.low[1];
 root.innerHTML='<div class="ai-result" id="intuitionResult">'+
 '<p class="ai-overline">Your personal signal profile · 12 answers analyzed</p>'+
 '<h2 data-focus tabindex="-1">'+clean(p.title)+'</h2>'+
 '<div class="ai-score-header"><div class="ai-bigscore">'+x.overall+'<span>/100</span></div><div><strong>Response Clarity Score</strong><p>How consistently your answers reflect evidence-aware, intentional responses across five skills. Not a diagnostic result or a measure of whether your gut feeling is correct.</p></div></div>'+
 '<p class="ai-profile-lead">'+clean(p.summary)+'</p>'+
 '<div class="ai-strengths"><div><small>Strongest dimensions</small><strong>'+clean(data.dimensions[first][1])+' &amp; '+clean(data.dimensions[second][1])+'</strong></div><div><small>Main growth area</small><strong>'+clean(data.dimensions[weak][1])+'</strong></div></div>'+
 '<h3>Your five clarity dimensions</h3>'+
 keys.map(k=>'<div class="ai-dimension"><div><strong>'+clean(data.dimensions[k][0])+'</strong><strong>'+x.scores[k]+'/100</strong></div><div class="ai-track"><span style="width:'+x.scores[k]+'%"></span></div><p>'+clean(descriptions[k][x.scores[k]>=70?0:1])+'</p></div>').join('')+
 '<h3>What your pattern means</h3>'+
 '<p>Your strongest area is <strong>'+clean(data.dimensions[first][0])+'</strong> ('+x.scores[first]+'/100). Your lowest-scoring area is <strong>'+clean(data.dimensions[weak][0])+'</strong> ('+x.scores[weak]+'/100). This difference matters: you might notice facts clearly but seek repeated reassurance, or manage your emotions well while overlooking a crossed boundary.</p>'+
 '<p>'+clean(p.tip)+'</p>'+
 '<h3>Answers behind this interpretation</h3><p>These examples come directly from your selected responses—not a generic description.</p>'+evidenceBlock(x.rows)+
 '<h3>Your three next steps</h3><ol><li>'+clean(data.dimensions[weak][2])+'</li><li>'+clean(data.dimensions[weak2][2])+'</li><li>'+clean(p.tip)+'</li></ol>'+
 '<div class="ai-safety"><strong>Read this first:</strong> Anxiety and real problems can coexist. A high clarity score cannot prove a relationship is safe; a low score cannot invalidate your concern. If someone ignores consent, threatens you or retaliates against boundaries, prioritize safety and trusted professional support over test scores.</div>'+
 '<div class="ai-result-actions"><button type="button" id="intuitionRetake">Retake the quiz</button><button type="button" id="intuitionCopy" class="ai-outline">Copy result summary</button></div><p role="status" id="intuitionCopyStatus"></p>'+
 '</div>';
 root.querySelector("#intuitionRetake").addEventListener("click",()=>{state.index=0;state.answers.fill(null);showQuestion();root.scrollIntoView({block:"start",behavior:"smooth"});focusHeading();});
 root.querySelector("#intuitionCopy").addEventListener("click",async()=>{
 const text="Anxiety or Intuition Quiz — "+p.title+"\nResponse Clarity Score: "+x.overall+"/100\nStrongest: "+data.dimensions[first][0]+"; "+data.dimensions[second][0]+"\nGrowth focus: "+data.dimensions[weak][0]+"\nEducational, not a diagnosis.\nhttps://relationship.sbs/tests/anxiety-or-intuition-quiz/";
 const status=root.querySelector("#intuitionCopyStatus");
 try{if(!navigator.clipboard||!navigator.clipboard.writeText)throw Error("No clipboard");await navigator.clipboard.writeText(text);status.textContent="Result summary copied.";}catch(e){status.textContent="Automatic copy is unavailable in this browser.";}
 });
 root.scrollIntoView({block:"start",behavior:"smooth"});focusHeading();
}
showQuestion();
})();

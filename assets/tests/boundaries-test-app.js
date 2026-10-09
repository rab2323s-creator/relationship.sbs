/* Boundaries Test — accessible, self-contained browser quiz.
   All scoring takes place locally in the tab. No claims of clinical validation. */
(function(){
"use strict";
const data=window.BOUNDARIES_DATA;
if(!data)return;
const root=document.getElementById("boundariesQuiz");
if(!root)return;
const dimensions=Object.keys(data.dims);
const state={index:0,answers:Array(data.questions.length).fill(null),finished:false};
const profiles={
  balanced:{title:"Clear, Kind & Consistent",line:"Your answers show a generally workable balance: you can protect your time and privacy without cutting off connection.",step:"Keep practicing repair: a boundary is strongest when it is clear, workable and mutual."},
  overgiver:{title:"The Thoughtful Over-Giver",line:"Your care for others is visible, but disappointment can pull you toward saying yes before you check your capacity.",step:"Use a 10-minute pause before any request that could cost you rest, privacy or your own plans."},
  explainer:{title:"The Boundary Explainer",line:"You can often identify what you need; holding the line after pushback appears to cost you more energy.",step:"Write a follow-through plan for one recurring boundary, not a longer explanation."},
  guarded:{title:"The Guarded Protector",line:"You may be able to protect your space, yet finding a mutually safe alternative can feel harder.",step:"Only where the relationship is safe, experiment with an alternative that honors your limit and leaves room for connection."},
  private:{title:"The Privacy Negotiator",line:"Privacy, disclosure or alone-time agreements may be more difficult to name and maintain than other limits.",step:"Choose a single privacy agreement and express it clearly before the next conflict."},
  emerging:{title:"The Boundary Builder",line:"Your answers suggest an uneven, very human boundary pattern: some moments are clear while others invite overexplaining or avoidance.",step:"Start with the lowest-scoring dimension. A small repeatable action beats a dramatic rule you cannot keep."}
};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
function calculate(answers) {
 if(!Array.isArray(answers)||answers.length!==data.questions.length||answers.some((x,i)=>!Number.isInteger(x)||x<0||x>=data.questions[i].options.length))throw Error("Complete all 15 questions.");
 const totals=Object.fromEntries(dimensions.map(k=>[k,{points:0,max:0,items:[]}]));
 const events=[];
 data.questions.forEach((q,i)=>{
   const choice=q.options[answers[i]];
   [[q.primary,2,choice.points[0]],[q.secondary,1,choice.points[1]]].forEach(([k,weight,value])=>{
      totals[k].points+=value*weight;
      totals[k].max+=4*weight;
      totals[k].items.push({question:i+1,score:value/4,weight,tag:choice.tag});
   });
   events.push({question:q.text,choice:choice.label,tag:choice.tag,primary:q.primary,primaryValue:choice.points[0],secondary:q.secondary,secondaryValue:choice.points[1]});
 });
 const scores=Object.fromEntries(dimensions.map(k=>[k,clamp(100*totals[k].points/totals[k].max)]));
 const ranked=[...dimensions].sort((a,b)=>scores[b]-scores[a]||a.localeCompare(b));
 const overall=clamp(dimensions.reduce((sum,k)=>sum+scores[k],0)/dimensions.length);
 const low=[...ranked].reverse();
 let type="emerging";
 if(overall>=78&&Math.min(...Object.values(scores))>=65)type="balanced";
 else if(scores.guilt<55&&(scores.guilt<=scores.voice||scores.voice<55))type="overgiver";
 else if(scores.follow<55&&scores.voice>=55)type="explainer";
 else if(scores.flex<52&&(scores.voice>=60||scores.space>=60))type="guarded";
 else if(scores.space<55&&low[0]==="space")type="private";
 else if(overall>=72&&scores.flex>=60&&scores.follow>=60)type="balanced";
 return {overall,scores,ranked,low,profile:type,events,totals};
}
window.BOUNDARIES_SCORING={calculate};
function progress(){
 const count=state.index+1, total=data.questions.length;
 return '<div class="bq-progress"><span>Question '+count+' of '+total+'</span><span>'+Math.round((count-1)/total*100)+'% completed</span></div><div class="bq-track"><div style="width:'+((count-1)/total*100)+'%"></div></div>';
}
function focusNew(){
 const heading=root.querySelector("#bqPrompt")||root.querySelector("#bqResultTitle");
 if(heading)heading.focus({preventScroll:true});
}
function renderQuestion(){
 const q=data.questions[state.index];
 state.finished=false;
 const selected=state.answers[state.index];
 root.innerHTML='<div class="bq-top">'+progress()+'</div>'+
 '<fieldset class="bq-field"><legend class="bq-question" id="bqPrompt" tabindex="-1">'+escapeHTML(q.text)+'</legend>'+
 '<div class="bq-options">'+q.options.map((a,i)=>'<button type="button" data-option="'+i+'" class="bq-option'+(selected===i?' bq-selected':'')+'" aria-label="Answer '+(i+1)+': '+escapeHTML(a.label)+'"><span class="bq-letter">'+String.fromCharCode(65+i)+'</span><span>'+escapeHTML(a.label)+'</span></button>').join('')+'</div></fieldset>'+
 '<div class="bq-bottom"><button class="bq-back" type="button"'+(state.index===0?' disabled':'')+'>← Previous question</button><span class="bq-note">Choose the response closest to your usual behavior.</span></div>';
 root.querySelectorAll("[data-option]").forEach(b=>b.addEventListener("click",()=>{
  state.answers[state.index]=Number(b.dataset.option);
  if(state.index===data.questions.length-1){renderResult();return;}
  state.index++;renderQuestion();focusNew();
 }));
 root.querySelector(".bq-back").addEventListener("click",()=>{if(state.index>0){state.index--;renderQuestion();focusNew();}});
}
function evidenceCards(result) {
 // Only choose real answers from a user's lower-scoring primary items.
 const soft=result.events.map((e,i)=>({...e,id:i+1})).filter(e=>e.primaryValue<=2)
   .sort((a,b)=>a.primaryValue-b.primaryValue||a.id-b.id).slice(0,2);
 const strong=result.events.map((e,i)=>({...e,id:i+1})).filter(e=>e.primaryValue>=4)
   .sort((a,b)=>a.id-b.id).slice(0,1);
 const selected=[...soft,...strong];
 if(selected.length===0)selected.push({...result.events[0],id:1});
 return '<div class="bq-evidence">'+selected.map(e=>'<div class="bq-evidence-card"><span>From question '+e.id+'</span><p class="bq-evidence-quote">'+escapeHTML(e.choice)+'</p><p class="bq-evidence-small">'+escapeHTML(e.primaryValue>=4?'This response contributed to a strength in '+data.dims[e.primary].short.toLowerCase()+'.':'This response lowered your score in '+data.dims[e.primary].short.toLowerCase()+'.')+'</p></div>').join('')+'</div>';
}
function scoreCards(result){
 return dimensions.map(k=>{
  const value=result.scores[k],dim=data.dims[k];
  return '<div class="bq-dimension"><div class="bq-dimrow"><strong>'+escapeHTML(dim.label)+'</strong><strong>'+value+'/100</strong></div>'+
  '<div class="bq-track bq-dimtrack" aria-label="'+escapeHTML(dim.label)+': '+value+' out of 100"><span style="width:'+value+'%"></span></div>'+
  '<p>'+(value>=70?escapeHTML(dim.good):escapeHTML(dim.grow))+'</p></div>';
 }).join('');
}
function interpretation(result){
 const high=result.ranked[0],low=result.low[0],next=result.low[1];
 return '<p>Your strongest measured area is <strong>'+escapeHTML(data.dims[high].label)+'</strong> ('+result.scores[high]+'/100). The area that needs the most attention is <strong>'+escapeHTML(data.dims[low].label)+'</strong> ('+result.scores[low]+'/100).</p>'+
 '<p>This difference matters: a person can be comfortable naming a limit yet struggle to follow through, or protect privacy while finding compromise harder. Your five scores, not one answer, shape this profile. Your next-lowest area is <strong>'+escapeHTML(data.dims[next].short)+'</strong> ('+result.scores[next]+'/100).</p>';
}
function renderResult(){
 const result=calculate(state.answers),p=profiles[result.profile];
 state.finished=true;
 const high=result.ranked.slice(0,2),low=result.low[0],low2=result.low[1];
 root.innerHTML='<div class="bq-results" id="boundariesResults" tabindex="-1">'+
 '<p class="bq-eyebrow">Your personalized boundaries profile · 15 answers analyzed</p>'+
 '<h2 id="bqResultTitle" tabindex="-1">'+escapeHTML(p.title)+'</h2>'+
 '<div class="bq-scorehead"><div class="bq-number"><strong>'+result.overall+'</strong><span>/100</span></div>'+
 '<div><strong>Boundary Skills Score</strong><p>Weighted average of five dimensions. This is a site-created reflection score, not a clinical rating or population percentile.</p></div></div>'+
 '<p class="bq-lead">'+escapeHTML(p.line)+'</p>'+
 '<div class="bq-summary"><div><span>Strongest dimensions</span><strong>'+high.map(k=>escapeHTML(data.dims[k].short)).join(' · ')+'</strong></div>'+
 '<div><span>Growth focus</span><strong>'+escapeHTML(data.dims[low].short)+'</strong></div></div>'+
 '<h3>Your five boundary dimensions</h3>'+scoreCards(result)+
 '<h3>Why you received this result</h3>'+interpretation(result)+
 '<h3>Answers that shaped your score</h3><p>These examples are taken directly from the choices you made—not a generic personality description.</p>'+
 evidenceCards(result)+
 '<h3>Three next steps chosen for your pattern</h3><ol class="bq-next"><li>'+escapeHTML(data.dims[low].action)+'</li><li>'+escapeHTML(data.dims[low2].action)+'</li><li>'+escapeHTML(p.step)+'</li></ol>'+
 '<div class="bq-alert"><strong>Important context:</strong> A low score is not a moral failure. If saying no could put you at risk of retaliation, prioritizing safety is not a boundary weakness. Seek confidential, practical support rather than testing a dangerous confrontation. This educational quiz is not a validated psychological assessment.</div>'+
 '<div class="bq-actions"><button id="bqRetake" type="button">Retake the test</button><button class="bq-quiet" id="bqCopy" type="button">Copy result summary</button></div>'+
 '<p class="bq-copystatus" role="status" id="bqCopyStatus"></p></div>';
 root.querySelector("#bqRetake").addEventListener("click",()=>{
  state.index=0;state.answers.fill(null);state.finished=false;
  renderQuestion();root.scrollIntoView({behavior:"smooth",block:"start"});focusNew();
 });
 root.querySelector("#bqCopy").addEventListener("click",async()=>{
  const text="Boundaries Test — "+p.title+"\nScore: "+result.overall+"/100\nStrongest: "+high.map(k=>data.dims[k].short).join(", ")+"\nGrowth focus: "+data.dims[low].short+"\nNext step: "+data.dims[low].action+"\nhttps://relationship.sbs/tests/boundaries-test/";
  const status=root.querySelector("#bqCopyStatus");
  try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);status.textContent="Summary copied.";}
   else{status.textContent="Copy is not available in this browser; select the summary above.";}}
  catch(e){status.textContent="Copy unavailable; you can select the summary above.";}
 });
 root.scrollIntoView({behavior:"smooth",block:"start"});
 focusNew();
}
renderQuestion();
})();

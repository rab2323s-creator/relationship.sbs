(function(){
"use strict";
const model=window.EmotionalNeedsQuiz,root=document.getElementById("emotionalNeedsQuiz");
if(!root||!model)return;
const answers=Array(15).fill(null);
let current=0,locked=false,unlockHandle=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const done=()=>answers.filter(a=>a!==null).length;
const focus=()=>{const el=root.querySelector("[data-focus]");if(el)el.focus({preventScroll:true});};
function question(moveFocus){
 const q=model.questions[current],count=done();
 const buttons=q.options.map((o,i)=>'<button type="button" class="en-answer'+(answers[current]===i?' en-selected':'')+'" data-answer="'+i+'" aria-pressed="'+(answers[current]===i)+'">'+esc(o.label)+'</button>').join("");
 root.innerHTML='<section class="en-panel" aria-label="Question '+(current+1)+' of 15"><div class="en-status"><span>Question '+(current+1)+' of 15</span><span>'+count+' answered</span></div><div class="en-track" role="progressbar" aria-label="Quiz completion" aria-valuemin="0" aria-valuemax="15" aria-valuenow="'+count+'"><span style="width:'+(100*count/15)+'%"></span></div><h2 class="en-question" id="enCurrentQuestion" tabindex="-1" data-focus>'+esc(q.prompt)+'</h2><div class="en-answers" role="group" aria-labelledby="enCurrentQuestion">'+buttons+'</div><p class="en-help">Choose the answer that feels most true for you. Your selection opens the next question automatically.</p><div class="en-actions"><button type="button" class="en-back" data-action="back" '+(current===0?'disabled':'')+'>← Previous question</button></div></section>';
 if(moveFocus)focus();
}
function result(){
 const r=model.calculate(answers);
 const top=r.top.map(x=>'<article class="en-need"><div class="en-need-heading"><h3>'+x.rank+'. '+esc(x.name)+'</h3><strong>'+x.score+'/100</strong></div><p>'+esc(x.meaning)+'</p><p><strong>What you said:</strong> '+esc(x.insight)+' '+(x.nuance?esc(x.nuance):'')+'</p><p><strong>In everyday life:</strong> '+esc(x.example)+'</p><p><strong>When it is missing:</strong> '+esc(x.unmet)+'</p><p><strong>What helps:</strong> '+esc(x.action)+'</p></article>').join("");
 const dimensions=r.ranking.map(x=>'<div class="en-dim"><div><strong>'+esc(x.name)+'</strong><span>'+x.score+'/100</span></div><div class="en-meter" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+x.score+'" aria-label="'+esc(x.name)+' importance"><span style="width:'+x.score+'%"></span></div></div>').join("");
 const phrases=r.phrases.map(x=>'<li>“'+esc(x)+'”</li>').join("");
 root.innerHTML='<section class="en-panel en-result" aria-labelledby="enResultTitle"><p class="en-eyebrow">Your emotional needs reflection</p><h2 class="en-result-title" id="enResultTitle" data-focus tabindex="-1>'+esc(r.headline)+'</h2><p class="en-summary">'+esc(r.subtitle)+'</p><h3>Your top three emotional needs, ranked</h3>'+top+'<h3>Your full emotional-needs picture</h3><p class="en-small">Scores describe the importance you selected for each area, not how well another person meets it. The final reflection question adds a small tie-breaking boost.</p><div class="en-dimensions">'+dimensions+'</div><h3>Ways to express your needs to people you care about</h3><ul class="en-phrases">'+phrases+'</ul><p class="en-small">'+esc(r.caution)+' Responses are held only in this browser tab and are not sent to a server by this quiz.</p><div class="en-actions"><button type="button" class="en-retake" data-action="retake">Retake Quiz</button></div></section>';
 focus();root.scrollIntoView({block:"start",behavior:"instant"});
}
function lockBriefly(){
 locked=true;
 if(unlockHandle!==null)clearTimeout(unlockHandle);
 unlockHandle=setTimeout(()=>{locked=false;unlockHandle=null;},260);
}
root.addEventListener("click",e=>{
 const choice=e.target.closest("button[data-answer]");
 if(choice){
  if(locked||choice.closest("#emotionalNeedsQuiz")!==root)return;
  const value=Number(choice.dataset.answer);
  if(!Number.isInteger(value)||value<0||value>3)return;
  lockBriefly();answers[current]=value;
  if(current===14)result();
  else{current++;question(true);}
  return;
 }
 const btn=e.target.closest("button[data-action]");
 if(!btn||btn.disabled||locked)return;
 if(btn.dataset.action==="back"&&current>0){lockBriefly();current--;question(true);}
 if(btn.dataset.action==="retake"){lockBriefly();answers.fill(null);current=0;question(true);root.scrollIntoView({block:"start",behavior:"instant"});}
});
question(false);
})();
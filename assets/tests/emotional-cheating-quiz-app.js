(function app(){
"use strict";
const model=window.EmotionalCheatingQuiz,root=document.getElementById("emotionalCheatingQuiz");if(!model||!root)return;
const answers=Array(15).fill(null);let current=0,locked=false,timer=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const focus=()=>{const t=root.querySelector("[data-focus]");if(t)t.focus({preventScroll:true});};
function render(move){
const q=model.questions[current],done=answers.filter(a=>a!==null).length;
const opts=q.options.map((o,i)=>'<button type="button" class="ec-choice'+(answers[current]===i?' ec-selected':'')+'" data-choice="'+i+'" aria-pressed="'+(answers[current]===i)+'">'+esc(o.label)+'</button>').join("");
root.innerHTML='<section class="ec-panel" aria-label="Emotional cheating quiz question"><div class="ec-status"><span>Question '+(current+1)+' of 15</span><span>'+done+' answered</span></div><div class="ec-track" role="progressbar" aria-label="Quiz progress" aria-valuenow="'+done+'" aria-valuemin="0" aria-valuemax="15"><span style="width:'+(100*done/15)+'%"></span></div><h2 id="ecQuestion" class="ec-question" tabindex="-1" data-focus>'+esc(q.prompt)+'</h2><div class="ec-options" role="group" aria-labelledby="ecQuestion">'+opts+'</div><p class="ec-helper">Choose the answer that fits the actual pattern. You will advance automatically.</p><div class="ec-actions"><button type="button" class="ec-back" data-action="back" '+(current===0?'disabled':'')+'>← Previous question</button></div></section>';
if(move)focus();
}
function result(){
const r=model.calculate(answers),list=a=>a.map(s=>'<li>'+esc(s)+'</li>').join("");
const dims=Object.entries(model.dimensions).map(([key,obj])=>'<div class="ec-dimension"><div><strong>'+esc(obj.label)+'</strong><span>'+r.dimensions[key]+'/100</span></div><div class="ec-meter" role="meter" aria-label="'+esc(obj.label)+' concern level" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+r.dimensions[key]+'"><span style="width:'+r.dimensions[key]+'%"></span></div></div>').join("");
root.innerHTML='<section class="ec-panel ec-result" aria-labelledby="ecResultTitle"><p class="ec-eyebrow">Your personal reflection</p><h2 id="ecResultTitle" tabindex="-1" data-focus>'+esc(r.title)+'</h2><div class="ec-score"><strong>'+r.score+'</strong><span> / 100</span><p>Higher scores indicate more reported boundary concerns, not proof of cheating.</p></div><p class="ec-lead">'+esc(r.summary)+' '+esc(r.personalized)+'</p><h3>What influenced your result</h3><ul>'+list(r.signals.length?r.signals:["You did not select strong concern signals across the questions."])+'</ul><h3>Helpful context</h3><ul>'+list(r.distinctions.concat(r.protective).slice(0,5))+'</ul><h3>Concern levels by area</h3><div class="ec-dimensions">'+dims+'</div><h3>Practical next steps</h3><ol>'+list(r.steps)+'</ol><h3>A neutral conversation starter</h3><blockquote class="ec-script">“'+esc(r.starter)+'”</blockquote><p class="ec-disclaimer"><strong>This quiz is a reflection tool, not proof of infidelity.</strong> Close friendships and emotional intimacy are not automatically cheating. Relationship boundaries differ, and your answers cannot establish another person&#39;s intentions or determine what happened without further context.</p><div class="ec-actions"><button type="button" class="ec-retake" data-action="retake">Retake Quiz</button></div></section>';
focus();root.scrollIntoView({block:"start",behavior:"instant"});
}
function lock(){locked=true;if(timer!==null)clearTimeout(timer);timer=setTimeout(()=>{locked=false;timer=null;},260);}
root.addEventListener("click",e=>{
const choice=e.target.closest("button[data-choice]");
if(choice){if(locked||choice.closest("#emotionalCheatingQuiz")!==root)return;const v=Number(choice.dataset.choice);if(!Number.isInteger(v)||v<0||v>3)return;lock();answers[current]=v;if(current===14)result();else{current++;render(true);}return;}
const btn=e.target.closest("button[data-action]");if(!btn||btn.disabled||locked)return;
if(btn.dataset.action==="back"&&current>0){lock();current--;render(true);}
if(btn.dataset.action==="retake"){lock();answers.fill(null);current=0;render(true);root.scrollIntoView({block:"start",behavior:"instant"});}
});
render(false);
})();
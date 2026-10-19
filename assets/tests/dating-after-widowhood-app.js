/* First scenario appears immediately; no Start gate. */
(function(){'use strict';
const model=window.WIDOWHOOD_QUIZ_MODEL,root=document.getElementById('widowhoodQuiz');if(!model||!root)return;
const Q=model.questions,D=model.dimensions;let index=0,answers=Array(Q.length).fill(null),complete=false;
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function meter(n){return '<div class="wdq-meter" role="img" aria-label="Support focus '+n+' out of 100"><span style="width:'+n+'%"></span></div>';}
function result(){
 const r=model.score(answers);
 const cards=r.areas.map(a=>'<div class="wdq-dim"><div class="wdq-dimtop"><strong>'+esc(a.label)+'</strong><span>'+a.percentage+' / 100</span></div>'+meter(a.percentage)+'<p>'+esc(a.description)+'</p></div>').join('');
 const steps=r.top2.map(a=>'<li><strong>'+esc(a.label)+'.</strong> '+esc(a.next)+' <em>Words to try:</em> “'+esc(a.prompt)+'”</li>').join('');
 const labels=r.noStrongFocus?'No stronger support need selected':esc(r.lead.title);
 root.innerHTML='<section class="wdq-card wdq-result" aria-live="polite"><div class="wdq-resulttop"><div><span class="wdq-eyebrow">Your personal reflection</span><h2 tabindex="-1" id="wdqFocus">'+labels+'</h2></div><div class="wdq-score"><strong>'+r.total+'</strong><span>/100</span></div></div><p>'+esc(r.lead.summary)+'</p><div class="wdq-context"><strong>Support focus index, not dating readiness.</strong> The number above reflects how often your selected responses call for additional room, clarity or support. It is not a score for love, healing, grief, mental health, or your suitability to date.</div><h3>Your five areas of attention</h3><div class="wdq-grid">'+cards+'</div><div class="wdq-context"><h3>Two gentle next steps</h3><ol>'+steps+'</ol></div><p><strong>Your right to choose:</strong> Dating, pausing, and not dating are equally valid paths. Missing or remembering your spouse is not a failure to move forward.</p>'+(r.keyTags.safety?'<div class="wdq-alert"><strong>A boundary matters:</strong> Some responses called for protection from ignored limits or pressure. You can slow down, leave an interaction, and seek support; never use a quiz result to override safety.</div>':'')+'<div class="wdq-actions"><a class="btn" href="/blog/dating-after-losing-a-spouse/">Read the love-after-loss guide</a><button class="btn secondary" type="button" data-wdq="retake">Retake quiz</button></div><p class="wdq-small">This original questionnaire is not a validated grief, mental-health or dating-readiness assessment. Results remain on this page only and are cleared by a refresh.</p></section>';
 root.querySelector('#wdqFocus').focus({preventScroll:true});
}
function paint(){
 complete=false;const q=Q[index];
 root.innerHTML='<section class="wdq-card wdq-question"><div class="wdq-top"><div><span class="wdq-eyebrow">Dating after widowhood · Your own pace</span><p id="wdqCounter">Question '+(index+1)+' of '+Q.length+'</p></div><button type="button" data-wdq="back" class="wdq-back" '+(index===0?'disabled':'')+'>Back</button></div><progress class="wdq-progress" value="'+(index+1)+'" max="'+Q.length+'" aria-labelledby="wdqCounter"></progress><p class="wdq-area">'+esc(D[q.dimension].label)+'</p><h2 id="wdqFocus" tabindex="-1">'+esc(q.text)+'</h2><div class="wdq-options" role="group" aria-labelledby="wdqFocus">'+q.options.map((o,i)=>'<button type="button" data-answer="'+i+'" class="wdq-option'+(answers[index]===i?' selected':'')+'" aria-pressed="'+(answers[index]===i)+'"><span class="wdq-letter" aria-hidden="true">'+String.fromCharCode(65+i)+'</span><span>'+esc(o.label)+'</span></button>').join('')+'</div><p class="wdq-small">There are no right answers and no deadline for grief. Choose what would help you most right now.</p></section>';
}
root.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button||!root.contains(button))return;
 if(button.dataset.wdq==='retake'){index=0;answers=Array(Q.length).fill(null);paint();root.querySelector('#wdqFocus').focus({preventScroll:true});return;}
 if(button.dataset.wdq==='back'&&index>0){index--;paint();root.querySelector('#wdqFocus').focus({preventScroll:true});return;}
 if(button.hasAttribute('data-answer')&&!complete){
  const n=Number(button.dataset.answer);if(!Number.isInteger(n)||n<0||n>3)return;
  answers[index]=n;if(index===Q.length-1){complete=true;result();}else{index++;paint();root.querySelector('#wdqFocus').focus({preventScroll:true});}
 }
});
paint();
})();

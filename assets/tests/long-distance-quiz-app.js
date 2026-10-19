/* Accessible one-question-at-a-time quiz UI, modeled on relationship.sbs test cards. */
(function(){'use strict';
const model=window.LONG_DISTANCE_QUIZ_MODEL,root=document.getElementById('longDistanceQuiz');if(!model||!root)return;
const Q=model.questions,D=model.dimensions,keys=Object.keys(D);
const empty=()=>Array(Q.length).fill(null);
let state={mode:null,stage:'choose',person:0,index:0,answers:[empty(),empty()]};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'" + ':' + "'&#39;'"}[c]));
const measure=(p,label)=>'<div class="ldq-meter" role="img" aria-label="'+esc(label)+' '+p+' out of 100"><span style="width:'+p+'%"></span></div>';
const focus=()=>{const h=root.querySelector('[data-focus]');if(h)h.focus({preventScroll:true});root.scrollIntoView({behavior:window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});};
const safety=(count)=>count?'<div class="ldq-alert" role="note"><strong>Boundaries before numbers:</strong> One or more selected scenarios involved surveillance, threats, financial pressure or punitive control. A high practical score elsewhere does not make those behaviors acceptable. If you feel unsafe or coerced, seek confidential support and do not use this quiz to negotiate safety.</div>':'';
function renderSingle(r){
 const metrics=r.dims.map(x=>'<div class="ldq-dimension"><div class="ldq-dim-head"><strong>'+esc(x.label)+'</strong><b>'+x.score+' / 100</b></div>'+measure(x.score,x.label)+'<p>'+esc(x.description)+'</p></div>').join('');
 const action=r.low.slice(0,2).map(x=>'<li><strong>'+esc(x.label)+':</strong> '+esc(D[x.key].next)+' <span class="ldq-prompt">Ask each other: '+esc(D[x.key].ask)+'</span></li>').join('');
 return '<div class="ldq-result-top"><div><span class="ldq-eyebrow">Your practical distance snapshot</span><h2>'+esc(r.headline)+'</h2></div><div class="ldq-number"><strong>'+r.score+'</strong><span>/100</span></div></div>'+
 '<p>This index describes your answers about current communication, travel, repair, expectations and moving plans. It is <strong>not a relationship success rate or a love percentage</strong>.</p>'+safety(r.flags.length)+
 '<h3>Your five practical dimensions</h3><div class="ldq-dimension-grid">'+metrics+'</div>'+
 '<div class="ldq-insight"><h3>Two conversations to start next</h3><ol>'+action+'</ol></div>'+
 '<div class="ldq-actions"><a class="btn" href="/blog/long-distance-relationship-no-end-date/">Read the closing-the-distance guide</a><button type="button" class="btn secondary" data-action="compare">Compare both partners</button><button type="button" class="btn secondary" data-action="reset">Retake quiz</button></div>';
}
function renderPair(r){
 const profiles='<div class="ldq-profiles">'+[['Partner A',r.first],['Partner B',r.second]].map(([name,v])=>'<div class="ldq-profile"><span class="ldq-eyebrow">'+name+'</span><h3>'+esc(v.headline)+'</h3><div class="ldq-number"><strong>'+v.score+'</strong><span>/100</span></div></div>').join('')+'</div>';
 const chart=r.areas.map(a=>'<div class="ldq-pair-dimension"><div class="ldq-dim-head"><strong>'+esc(a.label)+'</strong><span>A '+a.a+' · B '+a.b+'</span></div><div class="ldq-comparison-bars"><div><small>Partner A</small>'+measure(a.a,'Partner A '+a.label)+'</div><div><small>Partner B</small>'+measure(a.b,'Partner B '+a.label)+'</div></div><p>'+esc(a.gap>=25?'Different practical ratings: discuss this before making assumptions.':a.different>=2?'Several scenario choices differed even where totals look close.':a.a<65||a.b<65?'At least one partner reported a practical gap.':'Broadly similar reported practices.')+'</p></div>').join('');
 const differences=r.differences.slice(0,4).map(x=>'<li><strong>'+esc(x.question)+'</strong><p><b>Partner A:</b> '+esc(x.first.label)+'</p><p><b>Partner B:</b> '+esc(x.second.label)+'</p></li>').join('');
 const priority=r.priorities.slice(0,2).map(x=>'<li><strong>'+esc(x.label)+':</strong> '+esc(D[x.key].next)+' <span class="ldq-prompt">Ask: '+esc(D[x.key].ask)+'</span></li>').join('');
 return '<div class="ldq-result-top"><div><span class="ldq-eyebrow">Two independent sets of answers</span><h2>Your distance conversation map</h2></div></div>'+
 '<p>Each person answered the same 18 scenarios separately. These are two personal snapshots, <strong>not one couples compatibility percentage</strong>. Disagreement is a conversation prompt, not proof someone is wrong.</p>'+profiles+
 '<p class="ldq-small">A and B scores summarize selected practical actions (0–100); they do not predict whether the relationship will last.</p>'+safety(r.safety?1:0)+
 '<h3>Five dimensions, side by side</h3><div class="ldq-pair-grid">'+chart+'</div>'+
 '<div class="ldq-insight"><h3>Where you report shared strengths</h3><p>'+(r.strengths.length?esc(r.strengths.map(x=>x.label).join(', ')):'No area met our strict common-strength rule. You may still have strengths the questions did not capture.')+'</p>'+
 '<h3>Your first two practical priorities</h3><ol>'+priority+'</ol></div>'+
 '<div class="ldq-insight"><h3>Four different answers to discuss</h3>'+(differences?'<ol class="ldq-differences">'+differences+'</ol>':'<p>You selected the same answers to all 18 situations. Check whether those choices describe what happens consistently in real life.</p>')+'</div>'+
 '<div class="ldq-actions"><a class="btn" href="/blog/long-distance-relationship-no-end-date/">Build a shared distance plan</a><button type="button" class="btn secondary" data-action="reset">Start again</button></div>';
}
function render(){
 if(state.stage==='choose'){
  root.innerHTML='<section class="ldq-card"><span class="ldq-eyebrow">Choose your format</span><h2 data-focus tabindex="-1">Start the Long-Distance Relationship Quiz</h2><p>Think about what usually happens in your actual relationship, not the answer you wish were true. Answer alone or let each partner take the 18-question test independently.</p><div class="ldq-modes"><button type="button" class="ldq-mode" data-action="single"><strong>Take it myself</strong><span>18 questions · five detailed practical scores</span></button><button type="button" class="ldq-mode" data-action="double"><strong>Compare two partners</strong><span>Same device · separate rounds · side-by-side results</span></button></div><p class="ldq-small">No sign-up. This quiz stores answers only in the current page while it is open; reloading clears them. No account or external comparison link is needed.</p></section>';return;
 }
 if(state.stage==='handoff'){
  root.innerHTML='<section class="ldq-card ldq-handoff"><span class="ldq-eyebrow">Partner A complete · 18/18</span><h2 data-focus tabindex="-1">Hand the device to Partner B</h2><p>Partner A\'s answers and result are hidden. Ask Partner B to answer independently. The comparison appears only after both finish.</p><div class="ldq-actions"><button type="button" class="btn" data-action="handoff">I am Partner B — start</button><button type="button" class="btn secondary" data-action="reset">Start again</button></div></section>';return;
 }
 if(state.stage==='question'){
  const q=Q[state.index],selected=state.answers[state.person][state.index],who=state.mode==='double'?'Partner '+(state.person?'B':'A'):'Your own answers';
  root.innerHTML='<section class="ldq-card ldq-test"><div class="ldq-question-top"><div><span class="ldq-eyebrow">'+who+'</span><p id="ldqStep" class="ldq-counter">Question '+(state.index+1)+' of '+Q.length+'</p></div><button type="button" class="ldq-back" data-action="back" '+(state.index===0?'disabled':'')+'>Back</button></div><progress value="'+(state.index+1)+'" max="'+Q.length+'" aria-labelledby="ldqStep" class="ldq-progress"></progress><p class="ldq-dimension-label">'+esc(D[q.dimension].label)+'</p><h2 id="ldqQuestion" data-focus tabindex="-1">'+esc(q.text)+'</h2><div class="ldq-options" role="group" aria-labelledby="ldqQuestion">'+q.options.map((o,i)=>'<button type="button" class="ldq-option'+(selected===i?' is-selected':'')+'" aria-pressed="'+(selected===i)+'" data-choice="'+i+'"><span class="ldq-choice-letter" aria-hidden="true">'+String.fromCharCode(65+i)+'</span><span>'+esc(o.label)+'</span></button>').join('')+'</div><p class="ldq-small">Choose the closest real response. You can go back and change earlier answers.</p></section>';return;
 }
 if(state.stage==='result'){
  const result=state.mode==='double'?model.compare(state.answers[0],state.answers[1]):model.calculate(state.answers[0]);
  root.innerHTML='<section class="ldq-card ldq-result" aria-live="polite" aria-labelledby="ldqResultLabel"><h2 class="ldq-sr-only" id="ldqResultLabel" data-focus tabindex="-1">Long-distance quiz result</h2>'+(state.mode==='double'?renderPair(result):renderSingle(result))+'<p class="ldq-small">Scoring method: each scenario has a 0–4 editorial value. Each dimension shows its average scaled to 100; the overall index averages 18 scenario values. The categories and cutoffs are not clinically or psychometrically validated.</p></section>';
 }
}
function start(mode){state={stage:'question',mode,person:0,index:0,answers:[empty(),empty()]};render();focus();}
root.addEventListener('click',event=>{
 const btn=event.target.closest('button');if(!btn||!root.contains(btn))return;
 const action=btn.getAttribute('data-action'),choice=btn.getAttribute('data-choice');
 if(action==='single'||action==='double'){start(action);return;}
 if(action==='compare'){start('double');return;}
 if(action==='reset'){state={mode:null,stage:'choose',person:0,index:0,answers:[empty(),empty()]};render();focus();return;}
 if(action==='handoff'&&state.stage==='handoff'){state.person=1;state.index=0;state.stage='question';render();focus();return;}
 if(action==='back'&&state.stage==='question'&&state.index>0){state.index--;render();focus();return;}
 if(choice!==null&&state.stage==='question'){
  const v=Number(choice);if(!Number.isInteger(v)||v<0||v>=4)return;
  state.answers[state.person][state.index]=v;
  if(state.index<Q.length-1){state.index++;render();focus();return;}
  state.stage=state.mode==='double'&&state.person===0?'handoff':'result';render();focus();
 }
});
render();
})();

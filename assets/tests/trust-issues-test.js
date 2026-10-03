/* trust-issues-test.js — original 12-question educational relationship trust self-reflection test */
(function(global){
  'use strict';

  const DIMENSIONS={
    threat:{label:'Threat sensitivity',short:'How quickly ambiguity becomes suspicion, betrayal expectation, or a search for hidden meaning.',weight:0.30},
    guarded:{label:'Guarded vulnerability',short:'How difficult it feels to rely on someone, need them, disclose honestly, or let closeness matter.',weight:0.25},
    checking:{label:'Reassurance & checking',short:'How much uncertainty pushes you toward repeated reassurance, testing, monitoring, or searching for proof.',weight:0.25},
    updating:{label:'Evidence updating',short:'How easily your trust can change when new evidence appears, especially consistent behavior and meaningful repair.',weight:0.20}
  };

  const QUESTIONS=[
    {dimension:'threat',text:'Someone you care about takes much longer than usual to reply. What happens inside you first?',options:[
      {label:'I notice it, but I can hold several explanations until I know more.',value:0},
      {label:'I feel a little uneasy, then wait for more context before deciding what it means.',value:1},
      {label:'My mind quickly starts building a story about distance, rejection, or something being hidden.',value:3,tags:['ambiguity_alarm']},
      {label:'I assume the delay probably means something is wrong with us or with their honesty.',value:4,tags:['ambiguity_alarm','betrayal_expectation']}
    ]},
    {dimension:'updating',text:'Your partner gives a reasonable explanation for something that worried you, and their behavior matches it afterward. What usually happens next?',options:[
      {label:'I can update my view. If their behavior stays consistent, the worry loses weight.',value:0},
      {label:'I stay a little cautious, but repeated consistency genuinely helps.',value:1},
      {label:'I feel better briefly, but the same suspicion tends to return even without new evidence.',value:3,tags:['reassurance_fades']},
      {label:'Once doubt enters my mind, positive evidence rarely changes it; I keep looking for what I missed.',value:4,tags:['reassurance_fades','difficulty_updating']}
    ]},
    {dimension:'threat',text:'You notice a small inconsistency in a story. How do you handle it?',options:[
      {label:'I ask about the specific detail and judge the response together with the wider pattern.',value:0},
      {label:'I note it and stay curious, especially if it happens again.',value:1},
      {label:'I start reviewing other details to see whether there is a larger hidden pattern.',value:3,tags:['evidence_search']},
      {label:'A small inconsistency makes me question the whole story because people often reveal lies in tiny slips.',value:4,tags:['evidence_search','betrayal_expectation']}
    ]},

    {dimension:'guarded',text:'When you need emotional support, how easy is it to actually lean on someone?',options:[
      {label:'I can ask for support while still keeping responsibility for my own wellbeing.',value:0},
      {label:'It takes some courage, but I can usually let trusted people show up for me.',value:1},
      {label:'I often hold back because needing someone feels risky or gives them too much power.',value:3,tags:['self_protection']},
      {label:'I would rather carry things alone than discover I depended on someone who could fail me.',value:4,tags:['self_protection','hard_to_rely']}
    ]},
    {dimension:'guarded',text:'A relationship starts feeling close and important. What does your protective side tend to do?',options:[
      {label:'Closeness feels meaningful, and I can stay myself without preparing for an exit.',value:0},
      {label:'I feel vulnerable but can talk about that instead of automatically pulling away.',value:1},
      {label:'I become more watchful and keep part of myself emotionally protected in case things change.',value:3,tags:['guard_up']},
      {label:'The more someone matters, the more I prepare for disappointment so I will not be blindsided.',value:4,tags:['guard_up','betrayal_expectation']}
    ]},
    {dimension:'updating',text:'Someone has been dependable for months. How much does that consistency change the way you relate to them?',options:[
      {label:'A lot. I trust patterns more as they accumulate, while still keeping normal boundaries.',value:0},
      {label:'Gradually. I need time, but steady behavior earns more access and trust.',value:1},
      {label:'Only a little. Part of me still expects the reliable period to end suddenly.',value:3,tags:['consistency_discounted']},
      {label:'Very little. People can be consistent for a long time and still betray you, so I stay prepared.',value:4,tags:['consistency_discounted','difficulty_updating']}
    ]},

    {dimension:'checking',text:'You feel uncertain about where you stand with someone. What do you most want to do?',options:[
      {label:'Ask one clear question if needed, then watch whether words and behavior match over time.',value:0},
      {label:'Get some reassurance, but I can usually stop once the situation is clearer.',value:1},
      {label:'Ask for reassurance more than once or approach the same concern from several angles.',value:3,tags:['reassurance_loop']},
      {label:'Keep testing the situation until I feel certain, because one answer never feels like enough.',value:4,tags:['reassurance_loop','testing']}
    ]},
    {dimension:'checking',text:'After you receive reassurance, what usually happens to the doubt?',options:[
      {label:'If the reassurance fits the evidence, I can let the issue settle.',value:0},
      {label:'It may echo for a while, but I do not need repeated proof.',value:1},
      {label:'Relief arrives, but it fades and I soon want reassurance again.',value:3,tags:['reassurance_fades','reassurance_loop']},
      {label:'Reassurance almost creates new questions—my mind keeps finding reasons it might not count.',value:4,tags:['reassurance_fades','difficulty_updating','reassurance_loop']}
    ]},
    {dimension:'checking',text:'How often do you check for proof—messages, activity, tone changes, details, or other signs—to feel safer?',options:[
      {label:'Rarely. I prefer direct conversation and repeated behavior over detective work.',value:0},
      {label:'Occasionally, especially after a confusing event, but it does not become a routine.',value:1},
      {label:'Fairly often. Checking helps me feel less exposed when I am uncertain.',value:3,tags:['checking_behavior']},
      {label:'Often enough that I know I am trying to create certainty by monitoring the situation.',value:4,tags:['checking_behavior','certainty_seeking']}
    ]},

    {dimension:'updating',text:'In the relationship you had in mind, which statement best describes the evidence behind your distrust?',options:[
      {label:'There is no major known breach; most of my worry comes from ambiguity, possibility, or fear of what could happen.',value:0,evidenceConcern:0},
      {label:'There was a real breach, but accountability and consistent repair have gradually made trust easier.',value:1,evidenceConcern:1,tags:['current_breach']},
      {label:'There was a real breach and repair is happening, but I still struggle to let newer evidence change the old expectation.',value:3,evidenceConcern:1,tags:['current_breach','difficulty_updating']},
      {label:'There are repeated or ongoing lies, secrecy, broken agreements, or other concrete reasons my caution stays high.',value:1,evidenceConcern:3,tags:['ongoing_evidence']}
    ]},
    {dimension:'guarded',text:'Think about your last few close relationships. How portable is the distrust from one person to the next?',options:[
      {label:'Not very. I try to judge each person by their own pattern of behavior.',value:0},
      {label:'Past experiences affect me at first, but new people can earn a different expectation.',value:1},
      {label:'I often expect new people to repeat what previous people did, even before much evidence appears.',value:3,tags:['past_to_present']},
      {label:'I assume closeness eventually exposes the same risks, so I stay guarded from the beginning.',value:4,tags:['past_to_present','global_rule']}
    ]},
    {dimension:'threat',text:'Which sentence best captures your relationship with trust right now?',options:[
      {label:'Trust is earned in layers: I can stay open while paying attention to evidence.',value:0},
      {label:'I am careful, but good patterns usually make me feel safer over time.',value:1},
      {label:'I want to trust, but part of me keeps scanning for the moment things change.',value:3,tags:['high_alert']},
      {label:'Trust feels like lowering my defenses; staying alert feels safer than being surprised.',value:4,tags:['high_alert','self_protection']}
    ]}
  ];

  const BANDS=[
    {max:19,key:'flexible',title:'Flexible Trust',summary:'Your answers suggest that you usually let evidence guide trust. You can stay open without assuming that every uncertainty is harmless, and your view can change when behavior changes.',next:[
      'Keep judging trust by patterns: honesty, follow-through, accountability, boundaries, and repair.',
      'Notice the difference between healthy caution and trying to eliminate every possible uncertainty.',
      'When a concern appears, ask what evidence would genuinely change your mind in either direction.'
    ]},
    {max:39,key:'cautious',title:'Cautious but Adaptable',summary:'You protect yourself in some situations, but your trust system is still responsive to consistency. Doubt may show up quickly in certain contexts without fully controlling the relationship.',next:[
      'Identify the situations that activate you fastest: delayed replies, secrecy, conflict, closeness, or past comparisons.',
      'Before seeking reassurance, name the specific fact you are reacting to and what information is actually missing.',
      'Let repeated trustworthy behavior count; do not require one perfect moment to erase all uncertainty.'
    ]},
    {max:59,key:'guarded',title:'Guarded Trust',summary:'Your answers suggest that uncertainty often activates enough suspicion, self-protection, or checking to affect closeness. You may want trust while also keeping part of yourself ready for disappointment.',next:[
      'Track one week of “facts vs predictions”: write what happened separately from what you fear it means.',
      'Reduce one reassurance or checking ritual and observe whether the urge rises and then falls without new evidence.',
      'Practice graded vulnerability with people who have already shown consistent, respectful behavior.'
    ]},
    {max:79,key:'high_alert',title:'High-Alert Trust',summary:'Your trust system appears to stay on watch. Reassurance may not hold for long, closeness may increase rather than reduce threat, and positive evidence can be difficult to absorb.',next:[
      'Choose one trigger and map the loop: cue → prediction → urge to check or withdraw → short-term relief → return of doubt.',
      'Ask whether the same expectation appears across several otherwise different relationships.',
      'If past betrayal or trauma keeps current relationships feeling unsafe, consider working with a qualified therapist on trust and attachment patterns.'
    ]},
    {max:100,key:'entrenched',title:'Entrenched Distrust Pattern',summary:'Your answers suggest broad, persistent distrust that is difficult to update even when people become consistent. Staying protected may feel safer than allowing evidence to lower your guard.',next:[
      'Do not force “blind trust.” Start with small, observable experiments in reliance where the cost of disappointment is manageable.',
      'Separate present people from past templates by recording what each person has actually done, not what others did before them.',
      'Professional support can be useful when distrust is exhausting, isolating, or linked to betrayal, trauma, or long-standing attachment fear.'
    ]}
  ];

  const MAXIMA={}; Object.keys(DIMENSIONS).forEach(k=>MAXIMA[k]=0); QUESTIONS.forEach(q=>MAXIMA[q.dimension]+=Math.max(...q.options.map(o=>o.value||0)));
  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function classify(score){return BANDS.find(b=>score<=b.max)||BANDS[BANDS.length-1];}
  function evidenceCopy(count,score){
    if(count>=2)return 'Several of your answers included concrete trust breaches or behavior that would reasonably make many people more cautious. Your overall score may reflect both an internal trust pattern and a relationship that has actually required more vigilance. Do not use the score to explain away evidence.';
    if(count===1)return 'At least one answer involved a concrete trust breach. That matters. A higher score does not automatically mean your concern is irrational; interpret the pattern alongside what actually happened and whether repair is sustained.';
    if(score>=60)return 'Your higher score appears to come mainly from how uncertainty is processed rather than from the explicit breach scenarios in this questionnaire. Ask whether the same alarm remains active even with people who have been consistently trustworthy.';
    return 'Your answers did not strongly center on a current concrete breach. The result is best read as a reflection on how you process uncertainty, closeness, reassurance, and evidence.';
  }
  function pairInsight(top2,tags){
    const keys=top2.map(x=>x.key).sort().join('|');
    const map={
      'guarded|threat':'You tend to protect trust at both the interpretation stage and the closeness stage: ambiguity can look threatening, and becoming emotionally dependent can feel risky too.',
      'checking|threat':'Your pattern is most active when uncertainty appears: threat interpretations rise quickly, then checking or reassurance becomes the strategy for trying to settle them.',
      'threat|updating':'Your mind detects possible danger quickly and then has difficulty fully absorbing later evidence that the situation has become safer.',
      'checking|guarded':'You may alternate between wanting proof and limiting how much you depend on the relationship—seeking certainty while also keeping emotional distance.',
      'guarded|updating':'Letting someone matter is difficult, and even sustained consistency may take a long time to change the protective rules you use around closeness.',
      'checking|updating':'The central loop is not only doubt; it is that reassurance or evidence does not stay convincing for long, which can keep certainty-seeking active.'
    };
    let extra='';
    if((tags.past_to_present||0)>0)extra=' Past relationships also appear to be shaping expectations in the present.';
    if((tags.checking_behavior||0)>0 && (tags.reassurance_loop||0)>0)extra+=' Your answers also show both behavioral checking and repeated reassurance-seeking, which can reinforce the same uncertainty loop.';
    return (map[keys]||'Your strongest dimensions show where trust becomes most difficult: in interpreting ambiguity, allowing closeness, managing uncertainty, or changing your view when new evidence arrives.')+extra;
  }
  function scoreAnswers(answers){
    const raw={threat:0,guarded:0,checking:0,updating:0}; const tags={}; let evidenceCount=0;
    answers.forEach((answerIndex,i)=>{const q=QUESTIONS[i],opt=q&&q.options[answerIndex];if(!opt)return;raw[q.dimension]+=opt.value||0;evidenceCount+=opt.evidenceConcern||0;(opt.tags||[]).forEach(t=>tags[t]=(tags[t]||0)+1);});
    const dims=Object.keys(DIMENSIONS).map(key=>{const pct=MAXIMA[key]?Math.round((raw[key]/MAXIMA[key])*100):0;return {key,label:DIMENSIONS[key].label,short:DIMENSIONS[key].short,weight:DIMENSIONS[key].weight,pct,raw:raw[key]};});
    const score=Math.round(dims.reduce((sum,d)=>sum+d.pct*d.weight,0)); const top2=[...dims].sort((a,b)=>b.pct-a.pct).slice(0,2); const spread=top2[0].pct-top2[1].pct;
    return {score:clamp(score,0,100),band:classify(score),dims,top2,tags,evidenceCount,clarity:spread>=25?'one trust dimension clearly leads':spread>=10?'one trust dimension leads somewhat':'your trust difficulty is spread across multiple dimensions'};
  }
  function resultMarkup(r){
    const cards=r.top2.map(d=>'<div class="ti-dim-card"><div class="ti-dim-head"><strong>'+escapeHtml(d.label)+'</strong><span>'+d.pct+'%</span></div><div class="ti-meter"><span style="width:'+d.pct+'%"></span></div><p>'+escapeHtml(d.short)+'</p></div>').join('');
    const loopAlert=(r.tags.reassurance_loop||0)>=2||((r.tags.checking_behavior||0)>0&&(r.tags.reassurance_fades||0)>0)?'<div class="ti-alert"><strong>Certainty loop:</strong> Your answers suggest that relief may depend on repeated reassurance or checking. That can make uncertainty feel temporarily better while teaching your brain to ask for more proof the next time doubt appears.</div>':'';
    return '<div class="ti-result-head"><div><div class="ti-eyebrow">Your result</div><h2>'+escapeHtml(r.band.title)+'</h2></div><div class="ti-score" aria-label="Trust Issues Score '+r.score+' out of 100"><strong>'+r.score+'</strong><span>/100</span></div></div>'+
      '<p>'+escapeHtml(r.band.summary)+'</p><div class="ti-context"><strong>Evidence Context</strong><p>'+escapeHtml(evidenceCopy(r.evidenceCount,r.score))+'</p></div>'+loopAlert+
      '<p class="ti-note"><strong>Trust Issues Score:</strong> an original weighted reflection score—not a diagnosis, probability of betrayal, or validated clinical cutoff.</p>'+
      '<h3>Your two strongest trust dimensions</h3><div class="ti-dim-grid">'+cards+'</div><div class="ti-insight"><strong>What your answer pattern suggests:</strong> '+escapeHtml(pairInsight(r.top2,r.tags))+'</div>'+
      '<h3>What to do next</h3><ol class="ti-next">'+r.band.next.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ol>'+
      '<div class="ti-result-actions"><a class="btn" href="/blog/trust-building-actions/">Read the trust-building guide</a><a class="btn secondary" href="/blog/relationship-anxiety-or-gut-feeling/">Anxiety or real signal?</a><button type="button" class="btn secondary" id="tiRetake">Retake test</button></div>'+
      '<p class="ti-note">Pattern clarity: <strong>'+escapeHtml(r.clarity)+'</strong>. This describes the distribution of your answers inside this questionnaire only.</p>';
  }
  function init(){
    if(typeof document==='undefined')return; const root=document.getElementById('trustIssuesQuiz'); if(!root)return; let state={index:0,answers:new Array(QUESTIONS.length).fill(null)};
    root.innerHTML='<section class="ti-test-card" aria-label="Trust Issues Test"><div class="ti-test-top"><span id="tiProgressText">Question 1 of '+QUESTIONS.length+'</span><button type="button" class="ti-back" id="tiBack" disabled>Back</button></div><progress id="tiProgress" value="1" max="'+QUESTIONS.length+'" aria-label="Test progress"></progress><h2 id="tiQuestion"></h2><div id="tiOptions" class="ti-options"></div></section><section id="tiResult" class="ti-result" hidden aria-live="polite"></section>';
    const qEl=document.getElementById('tiQuestion'),optsEl=document.getElementById('tiOptions'),progressEl=document.getElementById('tiProgress'),progressText=document.getElementById('tiProgressText'),backBtn=document.getElementById('tiBack'),resultEl=document.getElementById('tiResult'),testCard=root.querySelector('.ti-test-card');
    function paint(){const q=QUESTIONS[state.index];progressText.textContent='Question '+(state.index+1)+' of '+QUESTIONS.length;progressEl.value=state.index+1;qEl.textContent=q.text;optsEl.innerHTML='';q.options.forEach((opt,optionIndex)=>{const btn=document.createElement('button');btn.type='button';btn.className='ti-option';btn.textContent=opt.label;btn.addEventListener('click',()=>{state.answers[state.index]=optionIndex;if(state.index<QUESTIONS.length-1){state.index+=1;paint();}else showResult();});optsEl.appendChild(btn);});backBtn.disabled=state.index===0;}
    function showResult(){const result=scoreAnswers(state.answers);resultEl.innerHTML=resultMarkup(result);resultEl.hidden=false;testCard.hidden=true;const retake=document.getElementById('tiRetake');if(retake)retake.addEventListener('click',reset);try{sessionStorage.setItem('trustIssuesTestResult',JSON.stringify({answers:state.answers,result,savedAt:Date.now()}));}catch(e){} resultEl.scrollIntoView({behavior:'smooth',block:'start'});}
    function reset(){state={index:0,answers:new Array(QUESTIONS.length).fill(null)};resultEl.hidden=true;resultEl.innerHTML='';testCard.hidden=false;paint();testCard.scrollIntoView({behavior:'smooth',block:'start'});}
    backBtn.addEventListener('click',()=>{if(state.index>0){state.index-=1;paint();}});paint();
  }
  const ENGINE={questions:QUESTIONS,dimensions:DIMENSIONS,maxima:MAXIMA,bands:BANDS,scoreAnswers,classify,evidenceCopy,pairInsight};
  if(typeof module!=='undefined'&&module.exports)module.exports=ENGINE;
  if(global)global.TRUST_ISSUES_TEST_ENGINE=ENGINE;
  if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();}
})(typeof window!=='undefined'?window:globalThis);
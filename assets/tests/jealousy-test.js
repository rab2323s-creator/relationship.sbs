/* jealousy-test.js — original 12-question educational self-reflection test */
(function(){
  'use strict';

  const DIMENSIONS = {
    cognitive_suspicion: {
      label: 'Suspicion without enough evidence',
      short: 'How quickly ambiguous situations become stories about betrayal, rejection, or hidden motives.',
      weight: 0.28
    },
    emotional_reactivity: {
      label: 'Emotional reactivity',
      short: 'How strongly jealousy changes your body, mood, attention, or ability to think clearly in the moment.',
      weight: 0.18
    },
    reassurance_comparison: {
      label: 'Reassurance & comparison loop',
      short: 'How often relief depends on being chosen, compared favorably, or reassured again after the doubt returns.',
      weight: 0.24
    },
    monitoring_control: {
      label: 'Monitoring & control',
      short: 'Whether jealousy turns into checking, testing, restricting, tracking, or pressuring your partner’s autonomy.',
      weight: 0.30
    }
  };

  const QUESTIONS = [
    {
      text:'Your partner mentions a new coworker they get along with. What happens in your mind first?',
      options:[
        {label:'I register it as normal information unless something concrete changes.',score:{cognitive_suspicion:0,emotional_reactivity:0}},
        {label:'I feel a small twinge, but I can stay curious rather than suspicious.',score:{cognitive_suspicion:1,emotional_reactivity:1}},
        {label:'I start scanning for signs that this person could become a threat.',score:{cognitive_suspicion:3,emotional_reactivity:2},tags:['threat_scan']},
        {label:'My mind quickly builds a betrayal story even before I have real evidence.',score:{cognitive_suspicion:4,emotional_reactivity:3},tags:['threat_scan','story_over_fact']}
      ]
    },
    {
      text:'Your partner is slower to reply than usual for a few hours. Which response fits best?',
      options:[
        {label:'I assume there are many possible explanations and wait for more information.',score:{cognitive_suspicion:0,emotional_reactivity:0}},
        {label:'I notice anxiety, but it does not change how I interpret the relationship.',score:{cognitive_suspicion:1,emotional_reactivity:1}},
        {label:'I begin checking activity, last-seen status, or previous messages for clues.',score:{cognitive_suspicion:3,monitoring_control:2,reassurance_comparison:2},tags:['checking']},
        {label:'The delay feels like evidence of rejection or another person, and I struggle not to investigate.',score:{cognitive_suspicion:4,emotional_reactivity:3,monitoring_control:3},tags:['checking','story_over_fact']}
      ]
    },
    {
      text:'You notice your partner is attractive to someone else or receives attention. What does that mean to you?',
      options:[
        {label:'Other people can find them attractive without it threatening our relationship.',score:{cognitive_suspicion:0,reassurance_comparison:0}},
        {label:'I may compare for a moment, but I return to what I know about us.',score:{cognitive_suspicion:1,reassurance_comparison:1}},
        {label:'I start comparing looks, status, personality, or sexual appeal and need reassurance that I am preferred.',score:{reassurance_comparison:3,cognitive_suspicion:2},tags:['comparison']},
        {label:'The comparison feels urgent enough that I need proof I am “better” or safer than the other person.',score:{reassurance_comparison:4,cognitive_suspicion:3,emotional_reactivity:2},tags:['comparison','reassurance_loop']}
      ]
    },
    {
      text:'When jealousy hits, how long does it usually stay in your system?',
      options:[
        {label:'It rises and passes without changing much behavior.',score:{emotional_reactivity:0}},
        {label:'It lingers a little, but I can regulate without needing my partner to fix it.',score:{emotional_reactivity:1}},
        {label:'It can take over my mood for hours and affect how I talk, text, or act.',score:{emotional_reactivity:3,reassurance_comparison:1},tags:['mood_capture']},
        {label:'It feels physically and emotionally overwhelming until something external reassures me.',score:{emotional_reactivity:4,reassurance_comparison:3},tags:['mood_capture','external_regulation']}
      ]
    },
    {
      text:'Your partner reassures you clearly about a jealousy trigger. What happens afterward?',
      options:[
        {label:'The answer usually settles the issue unless new evidence appears.',score:{reassurance_comparison:0,cognitive_suspicion:0}},
        {label:'I may need a little time, but I do not keep reopening the same question.',score:{reassurance_comparison:1,cognitive_suspicion:1}},
        {label:'I feel better briefly, then a slightly different version of the doubt comes back.',score:{reassurance_comparison:3,cognitive_suspicion:2},tags:['reassurance_loop']},
        {label:'No reassurance feels final; I keep needing new proof, detail, or certainty.',score:{reassurance_comparison:4,cognitive_suspicion:3},tags:['reassurance_loop','temporary_relief']}
      ]
    },
    {
      text:'How often do you compare yourself with exes, friends, coworkers, or people your partner could be attracted to?',
      options:[
        {label:'Rarely, and the comparison does not define how secure I feel.',score:{reassurance_comparison:0}},
        {label:'Sometimes, but I can stop before it turns into a ranking system.',score:{reassurance_comparison:1}},
        {label:'Often enough that I look for ways I am better or worse than specific people.',score:{reassurance_comparison:3,cognitive_suspicion:1},tags:['comparison']},
        {label:'My sense of safety depends heavily on winning the comparison or being told I am preferred.',score:{reassurance_comparison:4,emotional_reactivity:2},tags:['comparison','external_regulation']}
      ]
    },
    {
      text:'You feel jealous but do not have clear evidence of betrayal. What do you do with the feeling?',
      options:[
        {label:'I treat the feeling as information about me, not proof about them.',score:{cognitive_suspicion:0,monitoring_control:0}},
        {label:'I ask one direct question if needed, then watch behavior over time.',score:{cognitive_suspicion:1,monitoring_control:0}},
        {label:'I test them indirectly, ask leading questions, or look for inconsistencies.',score:{monitoring_control:3,cognitive_suspicion:2},tags:['testing']},
        {label:'I investigate until I feel I have ruled out every possible threat.',score:{monitoring_control:4,cognitive_suspicion:4},tags:['testing','investigation_loop']}
      ]
    },
    {
      text:'How are phone privacy, social media, passwords, or location sharing handled when you feel insecure?',
      options:[
        {label:'Privacy stays intact unless we have mutually agreed otherwise.',score:{monitoring_control:0}},
        {label:'I may want more transparency, but I respect a no.',score:{monitoring_control:1,emotional_reactivity:1}},
        {label:'I feel entitled to check or verify because reassurance alone does not feel trustworthy.',score:{monitoring_control:3,cognitive_suspicion:2},tags:['digital_monitoring']},
        {label:'I pressure, search, track, or monitor without freely given agreement.',score:{monitoring_control:4,cognitive_suspicion:2},tags:['digital_monitoring','control_flag']}
      ]
    },
    {
      text:'Your partner wants time with friends without you. Which response is closest?',
      options:[
        {label:'I can miss them without treating separate time as a threat.',score:{monitoring_control:0,emotional_reactivity:0}},
        {label:'I may feel insecure, but I do not interfere with the plan.',score:{monitoring_control:1,emotional_reactivity:1}},
        {label:'I guilt, question, or repeatedly check in because I feel safer when I know what is happening.',score:{monitoring_control:3,reassurance_comparison:2},tags:['access_pressure']},
        {label:'I try to stop, limit, or reshape the plan because their independence feels intolerable.',score:{monitoring_control:4,emotional_reactivity:3},tags:['access_pressure','control_flag']}
      ]
    },
    {
      text:'A real boundary violation has happened before. How does that history affect your jealousy now?',
      options:[
        {label:'I use the past as context, but I still judge the present by current evidence.',score:{cognitive_suspicion:0,emotional_reactivity:0}},
        {label:'I am more sensitive now, but I can distinguish triggers from new facts.',score:{cognitive_suspicion:1,emotional_reactivity:2}},
        {label:'My nervous system often reacts as if the past is happening again, even before I know what is true now.',score:{emotional_reactivity:3,cognitive_suspicion:3},tags:['history_trigger']},
        {label:'I assume trust must be proven continuously through access, checking, or restrictions.',score:{monitoring_control:4,cognitive_suspicion:3,reassurance_comparison:2},tags:['history_trigger','control_flag']}
      ]
    },
    {
      text:'During conflict about jealousy, what are you most likely to do?',
      options:[
        {label:'Describe the specific trigger and ask for clarity without accusing intent.',score:{monitoring_control:0,emotional_reactivity:0}},
        {label:'Get defensive or upset, but return to a calmer conversation.',score:{monitoring_control:1,emotional_reactivity:2}},
        {label:'Use accusations, repeated questioning, emotional tests, or comparisons to get reassurance.',score:{monitoring_control:3,reassurance_comparison:3,emotional_reactivity:2},tags:['conflict_pressure']},
        {label:'Threaten, punish, restrict, humiliate, or use silence/access as leverage.',score:{monitoring_control:4,emotional_reactivity:3},tags:['conflict_pressure','control_flag']}
      ]
    },
    {
      text:'If nothing suspicious happened for the next three months, what would most likely happen to your jealousy?',
      options:[
        {label:'It would probably settle because consistent evidence matters to me.',score:{cognitive_suspicion:0,reassurance_comparison:0}},
        {label:'I would still have occasional triggers, but they would get easier to reality-check.',score:{cognitive_suspicion:1,reassurance_comparison:1}},
        {label:'I would likely keep finding new things to question even without new evidence.',score:{cognitive_suspicion:3,reassurance_comparison:3},tags:['moving_target']},
        {label:'I would still need ongoing proof, checking, or control to feel safe.',score:{cognitive_suspicion:4,reassurance_comparison:4,monitoring_control:3},tags:['moving_target','control_flag']}
      ]
    }
  ];

  const BANDS = [
    {
      max:19,
      title:'Jealousy Looks Mostly Proportionate',
      summary:'Your answers suggest that jealousy may show up, but it usually stays connected to evidence and does not strongly drive checking, comparison, or control.',
      next:[
        'Keep distinguishing emotion from evidence: feeling threatened is not the same as proving a threat.',
        'Use direct questions when something concrete changes instead of testing indirectly.',
        'Protect mutual privacy and independence even when occasional jealousy appears.'
      ]
    },
    {
      max:39,
      title:'Some Jealousy Loops Are Active',
      summary:'Your pattern shows some recurring insecurity, comparison, or reassurance-seeking, but monitoring and control are not dominating the result.',
      next:[
        'Notice which trigger starts the loop most often: ambiguity, comparison, distance, or past betrayal.',
        'Reduce one reassurance or checking habit for a week and watch whether anxiety rises and falls on its own.',
        'Ask for one concrete relationship need instead of repeatedly asking for certainty.'
      ]
    },
    {
      max:59,
      title:'Jealousy Is Starting to Run the Relationship',
      summary:'Your answers suggest that jealousy is doing more than signaling discomfort. Suspicion, reactivity, comparison, or checking are beginning to influence how you interpret and manage the relationship.',
      next:[
        'Separate current evidence from old fear before acting on a jealousy spike.',
        'Replace testing or repeated questioning with one direct conversation and a clear agreement.',
        'If trust was actually broken, use structured repair rather than permanent investigation.'
      ]
    },
    {
      max:79,
      title:'Strong Jealousy Pattern',
      summary:'Your result shows a strong pattern of suspicious thinking, reassurance loops, emotional reactivity, or monitoring behavior. The main issue is no longer whether jealousy exists, but what it is making you do.',
      next:[
        'Pause surveillance, indirect tests, and repeated proof-seeking long enough to see the underlying fear more clearly.',
        'Protect your partner’s autonomy while addressing real boundary concerns directly.',
        'Consider qualified support if jealousy repeatedly causes conflict, checking, or loss of trust even when evidence is limited.'
      ]
    },
    {
      max:100,
      title:'High-Control Jealousy Pattern',
      summary:'Your answers suggest jealousy is closely tied to monitoring, restriction, punishment, or a need for continuous proof. This score does not diagnose any condition, but the behavior pattern can seriously damage safety and trust.',
      next:[
        'Stop treating access, passwords, location, or isolation as substitutes for trust.',
        'If there has been real betrayal, define repair agreements that have limits and an end point rather than permanent surveillance.',
        'Seek professional support if jealousy is leading to coercion, threats, aggression, stalking, or behavior you feel unable to control.'
      ]
    }
  ];

  function escapeHtml(str){return String(str).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}

  function maxByDimension(){
    const maxes=Object.fromEntries(Object.keys(DIMENSIONS).map(k=>[k,0]));
    QUESTIONS.forEach(q=>{
      Object.keys(DIMENSIONS).forEach(k=>{
        maxes[k]+=Math.max(...q.options.map(o=>Number((o.score||{})[k]||0)));
      });
    });
    return maxes;
  }
  const MAXIMA=maxByDimension();

  function classify(score){return BANDS.find(b=>score<=b.max)||BANDS[BANDS.length-1];}
  function unique(arr){return Array.from(new Set(arr));}

  function scoreAnswers(answerIndexes){
    if(!Array.isArray(answerIndexes)||answerIndexes.length!==QUESTIONS.length)throw new Error('Expected exactly 12 answers.');
    const raw=Object.fromEntries(Object.keys(DIMENSIONS).map(k=>[k,0]));
    const tags=[];
    answerIndexes.forEach((optionIndex,qi)=>{
      const opt=QUESTIONS[qi].options[optionIndex];
      if(!opt)throw new Error('Invalid answer index at question '+(qi+1));
      Object.entries(opt.score||{}).forEach(([k,v])=>{if(k in raw)raw[k]+=Number(v)||0;});
      (opt.tags||[]).forEach(t=>tags.push(t));
    });
    const normalized=Object.fromEntries(Object.keys(raw).map(k=>[k,MAXIMA[k]?Math.round(raw[k]/MAXIMA[k]*100):0]));
    const score=Math.round(Object.entries(normalized).reduce((sum,[k,v])=>sum+v*DIMENSIONS[k].weight,0));
    const ranked=Object.keys(normalized).sort((a,b)=>normalized[b]-normalized[a]||a.localeCompare(b));
    const top2=ranked.slice(0,2);
    const allTags=unique(tags);
    const controlFlag=allTags.includes('control_flag');
    const checkingFlag=allTags.some(t=>['digital_monitoring','investigation_loop','testing'].includes(t));
    const values=ranked.map(k=>normalized[k]);
    const spread=(values[0]||0)-(values[3]||0);
    let clarity='Medium';
    if(score<=15||score>=78||spread>=45)clarity='High';
    else if(score<=30||score>=60||spread>=25)clarity='Medium-high';
    return {score,raw,normalized,top2,band:classify(score),tags:allTags,controlFlag,checkingFlag,clarity,maxima:MAXIMA};
  }

  function pairInsight(top2){
    const pair=top2.slice().sort().join('|');
    const map={
      'cognitive_suspicion|emotional_reactivity':'Ambiguous situations appear to trigger both a threatening interpretation and a strong emotional response. The main skill is learning to slow the jump from feeling to conclusion.',
      'cognitive_suspicion|reassurance_comparison':'Your jealousy is being maintained by doubt plus attempts to settle the doubt through comparison or repeated reassurance. The relief may be real but short-lived.',
      'cognitive_suspicion|monitoring_control':'Suspicion is not staying inside your head; it is pushing toward investigation or control. That combination matters more than jealousy as a feeling alone.',
      'emotional_reactivity|reassurance_comparison':'Jealousy hits hard emotionally, and reassurance becomes the main way to calm it. Building internal regulation can reduce the pressure placed on the relationship.',
      'emotional_reactivity|monitoring_control':'Strong emotional activation is spilling into behavior. The key issue is creating enough pause that intense feelings do not become monitoring, restriction, or punishment.',
      'monitoring_control|reassurance_comparison':'You are trying to create safety both through proof and through access. The result may feel reassuring briefly while making trust more dependent on checking over time.'
    };
    return map[pair]||'Your two strongest dimensions show what is maintaining the jealousy most strongly. Focus on those mechanisms rather than treating every jealous feeling as equally important.';
  }

  function dimLevel(pct){if(pct>=75)return 'strong';if(pct>=50)return 'clear';if(pct>=25)return 'noticeable';return 'low';}

  function resultMarkup(r){
    const cards=r.top2.map(k=>{
      const d=DIMENSIONS[k],pct=r.normalized[k];
      return '<div class="j-dim-card"><div class="j-dim-head"><strong>'+escapeHtml(d.label)+'</strong><span>'+pct+'%</span></div><div class="j-meter"><span style="width:'+pct+'%"></span></div><p>'+escapeHtml(d.short)+'</p><p class="j-dim-level">Signal strength: '+dimLevel(pct)+'</p></div>';
    }).join('');
    const control=r.controlFlag?'<div class="j-alert"><strong>Control signal:</strong> At least one answer involved restricting, pressuring, tracking, threatening, or punishing. Treat that behavior separately from the total score. Jealousy can explain a feeling; it does not justify controlling another person.</div>':'';
    const checking=r.checkingFlag?'<div class="j-impact"><strong>Checking signal:</strong> Your answers include investigation or monitoring behavior. If there is real evidence of betrayal, structure the repair. If there is not, repeated checking can become the thing that keeps suspicion alive.</div>':'';
    return '<div class="j-result-head"><div><div class="j-eyebrow">Your result</div><h2>'+escapeHtml(r.band.title)+'</h2></div><div class="j-score" aria-label="Jealousy Pattern Score '+r.score+' out of 100"><strong>'+r.score+'</strong><span>/100</span></div></div>'+
      '<p class="j-result-summary">'+escapeHtml(r.band.summary)+'</p>'+
      '<p class="j-note"><strong>Jealousy Pattern Score:</strong> an original weighted reflection score—not a diagnosis, probability, or clinical cutoff. Monitoring/control and unsupported suspicion count more than emotional jealousy alone.</p>'+
      control+checking+
      '<h3>Your two strongest dimensions</h3><div class="j-dim-grid">'+cards+'</div>'+
      '<div class="j-insight"><strong>What this combination means:</strong> '+escapeHtml(pairInsight(r.top2))+'</div>'+
      '<h3>What to do next</h3><ol class="j-next">'+r.band.next.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ol>'+
      '<div class="j-result-actions"><a class="btn" href="/blog/retroactive-jealousy/">Read the Jealousy guide</a><button type="button" class="btn secondary" id="jRetake">Retake test</button></div>'+
      '<p class="j-note">Pattern clarity: <strong>'+escapeHtml(r.clarity)+'</strong>. This only describes how distinct your answers are inside this questionnaire.</p>';
  }

  function init(){
    const root=document.getElementById('jealousyQuiz');
    if(!root)return;
    let state={index:0,answers:new Array(QUESTIONS.length).fill(null)};
    root.innerHTML='<section class="j-test-card" aria-label="Jealousy Test"><div class="j-test-top"><span id="jProgressText">Question 1 of '+QUESTIONS.length+'</span><button type="button" class="j-back" id="jBack" disabled>Back</button></div><progress id="jProgress" value="1" max="'+QUESTIONS.length+'" aria-label="Test progress"></progress><h2 id="jQuestion"></h2><div id="jOptions" class="j-options"></div></section><section id="jResult" class="j-result" hidden aria-live="polite"></section>';

    const qEl=document.getElementById('jQuestion');
    const optsEl=document.getElementById('jOptions');
    const progressEl=document.getElementById('jProgress');
    const progressText=document.getElementById('jProgressText');
    const backBtn=document.getElementById('jBack');
    const resultEl=document.getElementById('jResult');
    const testCard=root.querySelector('.j-test-card');

    function paint(){
      const q=QUESTIONS[state.index];
      progressText.textContent='Question '+(state.index+1)+' of '+QUESTIONS.length;
      progressEl.value=state.index+1;
      qEl.textContent=q.text;
      optsEl.innerHTML='';
      q.options.forEach((opt,optionIndex)=>{
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='j-option';
        btn.textContent=opt.label;
        btn.addEventListener('click',()=>{
          state.answers[state.index]=optionIndex;
          if(state.index<QUESTIONS.length-1){state.index+=1;paint();}else{showResult();}
        });
        optsEl.appendChild(btn);
      });
      backBtn.disabled=state.index===0;
    }

    function showResult(){
      const result=scoreAnswers(state.answers);
      resultEl.innerHTML=resultMarkup(result);
      resultEl.hidden=false;
      testCard.hidden=true;
      const retake=document.getElementById('jRetake');
      if(retake)retake.addEventListener('click',reset);
      try{sessionStorage.setItem('jealousyTestResult',JSON.stringify({answers:state.answers,result,savedAt:Date.now()}));}catch(e){}
      resultEl.scrollIntoView({behavior:'smooth',block:'start'});
    }
    function reset(){
      state={index:0,answers:new Array(QUESTIONS.length).fill(null)};
      resultEl.hidden=true;resultEl.innerHTML='';testCard.hidden=false;paint();testCard.scrollIntoView({behavior:'smooth',block:'start'});
    }
    backBtn.addEventListener('click',()=>{if(state.index>0){state.index-=1;paint();}});
    paint();
  }

  window.JEALOUSY_TEST_ENGINE={questions:QUESTIONS,dimensions:DIMENSIONS,maxima:MAXIMA,scoreAnswers,classify};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
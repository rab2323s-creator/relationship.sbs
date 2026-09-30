/* limerence-test.js — original 12-question educational self-reflection test */
(function(){
  'use strict';

  const DIMENSIONS = {
    intrusive_preoccupation: {
      label: 'Intrusive preoccupation',
      short: 'How difficult it is to redirect attention away from this person once your mind locks on.',
      weight: 0.30
    },
    reciprocation_dependence: {
      label: 'Reciprocation dependence',
      short: 'How strongly your mood and sense of relief depend on signs that they want you back.',
      weight: 0.28
    },
    idealization_reality_gap: {
      label: 'Idealization & reality gap',
      short: 'How much the mental version of the person outruns what you actually know from reciprocal life together.',
      weight: 0.18
    },
    self_displacement: {
      label: 'Self-displacement',
      short: 'How much sleep, focus, relationships, routines, boundaries, or self-respect are being pushed aside by the attachment.',
      weight: 0.24
    }
  };

  const QUESTIONS = [
    {
      text: 'You put your phone down after a message from this person. What happens next?',
      options: [
        {label:'I enjoy it, then return to my day.', score:{intrusive_preoccupation:0,reciprocation_dependence:0}},
        {label:'I replay it once or twice, then my attention moves on.', score:{intrusive_preoccupation:1,reciprocation_dependence:1}},
        {label:'I reread it and start analyzing tone, timing, punctuation, or what it might mean.', score:{intrusive_preoccupation:3,reciprocation_dependence:2}, tags:['signal_analysis']},
        {label:'The message changes my whole emotional state, and I keep checking for the next sign.', score:{intrusive_preoccupation:4,reciprocation_dependence:4,self_displacement:1}, tags:['signal_analysis','mood_tethered']}
      ]
    },
    {
      text: 'You need to focus for 30 minutes on work, study, driving, or another task. How available is your attention?',
      options: [
        {label:'Mostly available. Thoughts about them can wait.', score:{intrusive_preoccupation:0,self_displacement:0}},
        {label:'They pop into my head, but I can redirect without much effort.', score:{intrusive_preoccupation:1,self_displacement:0}},
        {label:'My mind keeps returning to them even when I deliberately try to focus elsewhere.', score:{intrusive_preoccupation:3,self_displacement:2}, tags:['attention_capture']},
        {label:'I lose meaningful chunks of time to thinking, fantasizing, checking, or replaying interactions.', score:{intrusive_preoccupation:4,self_displacement:4}, tags:['attention_capture','functional_cost']}
      ]
    },
    {
      text: 'They are warm one day and hard to read the next. What does uncertainty do to your interest?',
      options: [
        {label:'It makes me want clearer information, not more fantasy.', score:{reciprocation_dependence:0,idealization_reality_gap:0}},
        {label:'I notice the uncertainty, but my interest stays roughly the same.', score:{reciprocation_dependence:1,idealization_reality_gap:0}},
        {label:'The uncertainty makes me think about them more and search for clues.', score:{reciprocation_dependence:3,intrusive_preoccupation:2}, tags:['uncertainty_fuels']},
        {label:'Not knowing feels almost addictive—the smallest hopeful sign can restart everything.', score:{reciprocation_dependence:4,intrusive_preoccupation:3}, tags:['uncertainty_fuels','mood_tethered']}
      ]
    },
    {
      text: 'When you think about this person’s flaws or incompatibilities, what usually happens?',
      options: [
        {label:'I can hold attraction and incompatibility in the same picture.', score:{idealization_reality_gap:0}},
        {label:'I soften some flaws, but I still take them seriously.', score:{idealization_reality_gap:1}},
        {label:'My mind quickly explains away problems because the connection feels too important to question.', score:{idealization_reality_gap:3,reciprocation_dependence:1}, tags:['idealization']},
        {label:'Evidence that we may not fit barely changes the version of them I carry in my head.', score:{idealization_reality_gap:4,reciprocation_dependence:2}, tags:['idealization','reality_gap']}
      ]
    },
    {
      text: 'How much of your connection is built from real shared experience versus imagination?',
      options: [
        {label:'Mostly real, mutual experience across ordinary life—not just charged moments.', score:{idealization_reality_gap:0,intrusive_preoccupation:0}},
        {label:'There is some fantasy, but I know where the gaps in my knowledge are.', score:{idealization_reality_gap:1,intrusive_preoccupation:1}},
        {label:'I spend a lot of time imagining conversations, futures, or meanings we have not actually lived.', score:{idealization_reality_gap:3,intrusive_preoccupation:2}, tags:['fantasy_extension']},
        {label:'The imagined relationship feels emotionally richer than the real relationship or contact we actually have.', score:{idealization_reality_gap:4,intrusive_preoccupation:3}, tags:['fantasy_extension','reality_gap']}
      ]
    },
    {
      text: 'They do something that clearly disappoints you. What happens to your picture of them?',
      options: [
        {label:'It changes appropriately. New evidence updates how I see them.', score:{idealization_reality_gap:0}},
        {label:'I need a little time, but I can revise my view.', score:{idealization_reality_gap:1}},
        {label:'I focus on their best moments and tell myself the disappointment probably means less than it felt.', score:{idealization_reality_gap:3,reciprocation_dependence:1}, tags:['protect_ideal']},
        {label:'I work harder to preserve hope than to understand what their behavior is actually showing me.', score:{idealization_reality_gap:4,reciprocation_dependence:3}, tags:['protect_ideal','hope_over_data']}
      ]
    },
    {
      text: 'How much does their attention affect your mood?',
      options: [
        {label:'It feels good, but my emotional baseline remains mine.', score:{reciprocation_dependence:0}},
        {label:'It can lift or disappoint me, but the effect passes.', score:{reciprocation_dependence:1}},
        {label:'A reply, like, glance, or silence can noticeably change the rest of my day.', score:{reciprocation_dependence:3,self_displacement:1}, tags:['mood_tethered']},
        {label:'My emotional highs and lows are strongly organized around whether I feel chosen by them.', score:{reciprocation_dependence:4,self_displacement:2}, tags:['mood_tethered','external_regulation']}
      ]
    },
    {
      text: 'When you feel unsure whether they want you, what do you do for relief?',
      options: [
        {label:'I tolerate not knowing or ask one direct question when appropriate.', score:{reciprocation_dependence:0,intrusive_preoccupation:0}},
        {label:'I may check once or ask a friend, then leave it alone.', score:{reciprocation_dependence:1,intrusive_preoccupation:1}},
        {label:'I reread messages, check social media, replay encounters, or seek reassurance repeatedly.', score:{reciprocation_dependence:3,intrusive_preoccupation:3}, tags:['checking_loop']},
        {label:'I keep searching until I find a hopeful clue—even when the relief never lasts.', score:{reciprocation_dependence:4,intrusive_preoccupation:4,self_displacement:1}, tags:['checking_loop','temporary_relief']}
      ]
    },
    {
      text: 'Imagine you received a clear, respectful answer that the feeling is not mutual. Which reaction fits best?',
      options: [
        {label:'I would be hurt, but I could accept the information and protect my dignity.', score:{reciprocation_dependence:0,self_displacement:0}},
        {label:'It would take time, but clarity would help me start disengaging.', score:{reciprocation_dependence:1,self_displacement:1}},
        {label:'Part of me would keep looking for signs that the answer might change.', score:{reciprocation_dependence:3,idealization_reality_gap:2}, tags:['hope_after_clarity']},
        {label:'I would feel compelled to keep monitoring, contacting, or finding another path to them despite the clear boundary.', score:{reciprocation_dependence:4,self_displacement:4,intrusive_preoccupation:2}, tags:['hope_after_clarity','boundary_concern']}
      ]
    },
    {
      text: 'What has this attachment done to your routines and priorities?',
      options: [
        {label:'Very little. My sleep, work, friendships, and routines still feel like mine.', score:{self_displacement:0}},
        {label:'I make some extra room for them, but nothing important is consistently displaced.', score:{self_displacement:1}},
        {label:'I have neglected sleep, focus, plans, hobbies, or other people because my attention keeps returning here.', score:{self_displacement:3,intrusive_preoccupation:1}, tags:['functional_cost']},
        {label:'Large parts of my life now organize around access to them, thoughts about them, or recovering from their signals.', score:{self_displacement:4,intrusive_preoccupation:2,reciprocation_dependence:1}, tags:['functional_cost','life_narrowing']}
      ]
    },
    {
      text: 'How free do you feel to choose based on your own values rather than preserving the possibility of this connection?',
      options: [
        {label:'Very free. Attraction does not get the final vote on my choices.', score:{self_displacement:0}},
        {label:'I sometimes bend toward the connection, but I can still choose against it.', score:{self_displacement:1}},
        {label:'I avoid choices that might reduce access, hope, or their opinion of me.', score:{self_displacement:3,reciprocation_dependence:2}, tags:['self_abandonment']},
        {label:'I repeatedly act against my own needs, boundaries, or values because losing the possibility feels unbearable.', score:{self_displacement:4,reciprocation_dependence:3}, tags:['self_abandonment','life_narrowing']}
      ]
    },
    {
      text: 'If nothing about this connection changed for the next six months, what would your mind most likely do?',
      options: [
        {label:'Adjust to reality and redirect energy toward the rest of my life.', score:{self_displacement:0,reciprocation_dependence:0}},
        {label:'Still care, but gradually stop organizing so much meaning around it.', score:{self_displacement:1,reciprocation_dependence:1}},
        {label:'Keep waiting, interpreting, and emotionally revisiting the same possibilities.', score:{self_displacement:3,reciprocation_dependence:3,intrusive_preoccupation:2}, tags:['stuck_loop']},
        {label:'Stay psychologically suspended—unable to fully move toward them or away from them.', score:{self_displacement:4,reciprocation_dependence:4,intrusive_preoccupation:3}, tags:['stuck_loop','life_narrowing']}
      ]
    }
  ];

  const BANDS = [
    {
      max: 19,
      key: 'grounded',
      title: 'Strong Feelings, Mostly Grounded',
      summary: 'Your answers show attraction or emotional importance without much evidence that one person has taken over your attention, self-worth, or daily functioning. The feelings may be real and intense without being especially limerence-like.',
      next:[
        'Keep learning from real interactions instead of trying to predict the whole relationship from chemistry.',
        'Notice whether your life stays broad as the connection develops.',
        'Let reciprocity become clearer through behavior rather than repeated interpretation.'
      ]
    },
    {
      max: 39,
      key: 'pull',
      title: 'Infatuation With Some Limerent Pull',
      summary: 'Some limerence-like threads are present—often preoccupation, uncertainty, idealization, or sensitivity to reciprocation—but they are not dominating the whole pattern.',
      next:[
        'Identify which of your two strongest dimensions is amplifying the attachment.',
        'Reduce one repetitive cue-seeking habit for a week: rereading, profile checking, reassurance, or fantasy rehearsal.',
        'Keep ordinary routines and other relationships active while the connection becomes clearer.'
      ]
    },
    {
      max: 59,
      key: 'loop',
      title: 'A Limerence-Like Loop Is Active',
      summary: 'Your answers suggest that longing is being maintained by more than ordinary attraction. Attention, hope, uncertainty, idealization, or self-displacement are reinforcing one another enough to make disengagement harder.',
      next:[
        'Separate facts about the relationship from the mental story built around possibility.',
        'Create friction in the checking loop: delay searching, rereading, or reassurance and notice what the urge does.',
        'Make one choice this week that restores a part of life the attachment has displaced.'
      ]
    },
    {
      max: 79,
      key: 'strong',
      title: 'Strong Limerence-Like Pattern',
      summary: 'Your answers show a strong pattern of intrusive romantic preoccupation and dependence on reciprocation, with meaningful idealization or cost to your own life. The attachment appears to be doing more than simply reflecting how much you like someone.',
      next:[
        'Treat uncertainty as a trigger, not as a task you must solve repeatedly.',
        'Reduce the behaviors that keep reactivating the loop, especially checking and fantasy rehearsal.',
        'If the pattern is disrupting sleep, work, relationships, or boundaries, consider qualified support rather than trying to out-think it alone.'
      ]
    },
    {
      max: 100,
      key: 'high-impact',
      title: 'High-Impact Limerence-Like Pattern',
      summary: 'Your answers suggest that this attachment is strongly organizing attention, emotional regulation, and parts of daily life. The result does not diagnose limerence, OCD, or any disorder, but the level of interference deserves serious care.',
      next:[
        'Prioritize restoring sleep, focus, routines, friendships, and choices that do not depend on this person’s signals.',
        'Respect any clear boundary or rejection even when your feelings remain intense; feelings and behavior are separate responsibilities.',
        'Consider working with a licensed mental-health professional if the preoccupation feels compulsive, causes significant distress, or is hard to interrupt.'
      ]
    }
  ];

  function escapeHtml(str){
    return String(str).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function maxByDimension(){
    const maxes=Object.fromEntries(Object.keys(DIMENSIONS).map(k=>[k,0]));
    QUESTIONS.forEach(q=>{
      Object.keys(DIMENSIONS).forEach(k=>{
        const perQuestion=Math.max(...q.options.map(o=>Number((o.score||{})[k]||0)));
        maxes[k]+=perQuestion;
      });
    });
    return maxes;
  }

  const MAXIMA=maxByDimension();

  function classify(score){ return BANDS.find(b=>score<=b.max)||BANDS[BANDS.length-1]; }

  function unique(arr){ return Array.from(new Set(arr)); }

  function scoreAnswers(answerIndexes){
    if(!Array.isArray(answerIndexes)||answerIndexes.length!==QUESTIONS.length){
      throw new Error('Expected exactly 12 answers.');
    }
    const raw=Object.fromEntries(Object.keys(DIMENSIONS).map(k=>[k,0]));
    const tags=[];
    answerIndexes.forEach((optionIndex,qi)=>{
      const opt=QUESTIONS[qi].options[optionIndex];
      if(!opt) throw new Error('Invalid answer index at question '+(qi+1));
      Object.entries(opt.score||{}).forEach(([k,v])=>{
        if(k in raw) raw[k]+=Number(v)||0;
      });
      (opt.tags||[]).forEach(t=>tags.push(t));
    });

    const normalized=Object.fromEntries(Object.keys(raw).map(k=>[
      k,
      MAXIMA[k] ? Math.round((raw[k]/MAXIMA[k])*100) : 0
    ]));

    const score=Math.round(Object.entries(normalized).reduce((sum,[k,v])=>sum+(v*DIMENSIONS[k].weight),0));
    const ranked=Object.keys(normalized).sort((a,b)=>normalized[b]-normalized[a]||a.localeCompare(b));
    const top2=ranked.slice(0,2);
    const allTags=unique(tags);
    const boundaryConcern=allTags.includes('boundary_concern');
    const highImpact=allTags.some(t=>['functional_cost','life_narrowing','self_abandonment'].includes(t));

    const values=ranked.map(k=>normalized[k]);
    const spread=(values[0]||0)-(values[3]||0);
    let clarity='Medium';
    if(score<=15||score>=78||spread>=45) clarity='High';
    else if(score<=30||score>=60||spread>=25) clarity='Medium-high';

    return {
      score,raw,normalized,top2,band:classify(score),tags:allTags,boundaryConcern,highImpact,clarity,maxima:MAXIMA
    };
  }

  function pairInsight(top2){
    const pair=top2.slice().sort().join('|');
    const map={
      'intrusive_preoccupation|reciprocation_dependence':'Your mind is not only returning to this person; it is returning to the question of whether you are wanted back. That combination can make tiny signals feel unusually important.',
      'idealization_reality_gap|intrusive_preoccupation':'The person occupies a lot of mental space, and imagination may be supplying more material than real reciprocal experience. More thinking is not necessarily giving you more accurate information.',
      'intrusive_preoccupation|self_displacement':'The clearest issue is attentional capture with real-life cost. The question is becoming less “How strong are my feelings?” and more “How much of my life is this attachment consuming?”',
      'idealization_reality_gap|reciprocation_dependence':'Hope and the mental picture of the person appear closely tied. Signs of reciprocation may protect the idealized version from being updated by less romantic evidence.',
      'reciprocation_dependence|self_displacement':'Your emotional state and your daily choices both appear increasingly organized around whether this person feels available. Restoring your own center matters as much as understanding the relationship.',
      'idealization_reality_gap|self_displacement':'The imagined relationship may be taking up enough space to compete with your actual life. Reality-testing works best when it is paired with rebuilding neglected routines and relationships.'
    };
    return map[pair]||'Your two strongest dimensions show what is maintaining the attachment most strongly. Focus on those mechanisms rather than trying to decide whether every feeling is “real love” or “limerence.”';
  }

  function dimLevel(pct){
    if(pct>=75)return 'strong';
    if(pct>=50)return 'clear';
    if(pct>=25)return 'noticeable';
    return 'low';
  }

  function resultMarkup(r){
    const cards=r.top2.map(k=>{
      const d=DIMENSIONS[k], pct=r.normalized[k];
      return `<div class="lim-dim-card">
        <div class="lim-dim-head"><strong>${escapeHtml(d.label)}</strong><span>${pct}%</span></div>
        <div class="lim-meter"><span style="width:${pct}%"></span></div>
        <p>${escapeHtml(d.short)}</p>
        <p class="lim-dim-level">Signal strength: ${dimLevel(pct)}</p>
      </div>`;
    }).join('');

    const boundary=r.boundaryConcern?`<div class="lim-alert"><strong>Boundary reality-check:</strong> One answer involved wanting to keep monitoring or contacting after a clear rejection or boundary. Intense feelings can be involuntary; respecting another person’s boundary is still a behavior you control. Treat that separately from the total score.</div>`:'';

    const impact=r.highImpact?`<div class="lim-impact"><strong>Impact signal:</strong> At least one answer suggests the attachment is costing meaningful sleep, focus, routines, relationships, or self-directed choices. That functional cost matters even if the relationship itself remains ambiguous.</div>`:'';

    return `<div class="lim-result-head">
      <div><div class="lim-eyebrow">Your result</div><h2>${escapeHtml(r.band.title)}</h2></div>
      <div class="lim-score" aria-label="Limerence Pattern Score ${r.score} out of 100"><strong>${r.score}</strong><span>/100</span></div>
    </div>
    <p class="lim-result-summary">${escapeHtml(r.band.summary)}</p>
    <p class="lim-note"><strong>Limerence Pattern Score:</strong> an original weighted reflection score—not a diagnosis, probability, or clinical cutoff. Intrusive preoccupation and dependence on reciprocation carry slightly more weight than idealization alone.</p>
    ${boundary}${impact}
    <h3>Your two strongest dimensions</h3>
    <div class="lim-dim-grid">${cards}</div>
    <div class="lim-insight"><strong>What this combination means:</strong> ${escapeHtml(pairInsight(r.top2))}</div>
    <h3>What to do next</h3>
    <ol class="lim-next">${r.band.next.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ol>
    <div class="lim-result-actions">
      <a class="btn" href="/blog/limerence-explained/">Read the Limerence guide</a>
      <button type="button" class="btn secondary" id="limRetake">Retake test</button>
    </div>
    <p class="lim-note">Pattern clarity: <strong>${escapeHtml(r.clarity)}</strong>. This only describes how distinct your answers are inside this questionnaire.</p>`;
  }

  function init(){
    const root=document.getElementById('limerenceQuiz');
    if(!root)return;

    let state={index:0,answers:new Array(QUESTIONS.length).fill(null)};
    root.innerHTML=`<section class="lim-test-card" aria-label="Limerence Test">
      <div class="lim-test-top">
        <span id="limProgressText">Question 1 of ${QUESTIONS.length}</span>
        <button type="button" class="lim-back" id="limBack" disabled>Back</button>
      </div>
      <progress id="limProgress" value="1" max="${QUESTIONS.length}" aria-label="Test progress"></progress>
      <h2 id="limQuestion"></h2>
      <div id="limOptions" class="lim-options"></div>
    </section>
    <section id="limResult" class="lim-result" hidden aria-live="polite"></section>`;

    const qEl=document.getElementById('limQuestion');
    const optsEl=document.getElementById('limOptions');
    const progressEl=document.getElementById('limProgress');
    const progressText=document.getElementById('limProgressText');
    const backBtn=document.getElementById('limBack');
    const resultEl=document.getElementById('limResult');
    const testCard=root.querySelector('.lim-test-card');

    function paint(){
      const q=QUESTIONS[state.index];
      progressText.textContent=`Question ${state.index+1} of ${QUESTIONS.length}`;
      progressEl.value=state.index+1;
      qEl.textContent=q.text;
      optsEl.innerHTML='';
      q.options.forEach((opt,optionIndex)=>{
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='lim-option';
        btn.textContent=opt.label;
        btn.addEventListener('click',()=>{
          state.answers[state.index]=optionIndex;
          if(state.index<QUESTIONS.length-1){
            state.index+=1;
            paint();
          }else{
            showResult();
          }
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
      const retake=document.getElementById('limRetake');
      if(retake)retake.addEventListener('click',reset);
      try{
        sessionStorage.setItem('limerenceTestResult',JSON.stringify({answers:state.answers,result,savedAt:Date.now()}));
      }catch(e){}
      resultEl.scrollIntoView({behavior:'smooth',block:'start'});
    }

    function reset(){
      state={index:0,answers:new Array(QUESTIONS.length).fill(null)};
      resultEl.hidden=true;
      resultEl.innerHTML='';
      testCard.hidden=false;
      paint();
      testCard.scrollIntoView({behavior:'smooth',block:'start'});
    }

    backBtn.addEventListener('click',()=>{
      if(state.index>0){state.index-=1;paint();}
    });

    paint();
  }

  window.LIMERENCE_TEST_ENGINE={questions:QUESTIONS,dimensions:DIMENSIONS,maxima:MAXIMA,scoreAnswers,classify};

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
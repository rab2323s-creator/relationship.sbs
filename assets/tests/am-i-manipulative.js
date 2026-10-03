/* am-i-manipulative.js — original 12-question educational self-reflection test */
(function(global){
  'use strict';

  const DIMENSIONS={
    indirect:{label:'Indirect pressure & guilt',short:'How often needs are expressed through guilt, martyrdom, hints, emotional debt, or making refusal feel costly.',weight:0.30},
    control:{label:'Control & autonomy',short:'How much discomfort leads to monitoring, restricting choices, pushing past a no, or making independence feel disloyal.',weight:0.25},
    responsibility:{label:'Reality & responsibility',short:'How you handle being wrong, conflicting memories, criticism, and the temptation to shift blame or control the narrative.',weight:0.25},
    leverage:{label:'Punishment & leverage',short:'How often closeness, silence, breakup threats, or emotional withdrawal become tools for changing someone else’s behavior.',weight:0.20}
  };

  const QUESTIONS=[
    {
      dimension:'indirect',
      text:'Someone you care about says no to a plan you really want. What are you most likely to do next?',
      options:[
        {label:'Say I’m disappointed, but accept the no without making them manage my feelings.',value:0,repair:2,tags:['direct_request','accept_no']},
        {label:'Explain once more why it matters to me, then let the decision stand.',value:1,repair:2,tags:['persuasion','accept_no']},
        {label:'Get noticeably quieter or hurt so they understand how much their choice affected me.',value:3,repair:0,tags:['withdrawal_signal','indirect_pressure']},
        {label:'Make it clear that saying no feels selfish, disloyal, or unfair after everything I do for them.',value:4,repair:0,tags:['guilt_leverage','emotional_debt']}
      ]
    },
    {
      dimension:'control',
      text:'Your partner wants an evening with friends and you feel left out. Which response sounds most like you?',
      options:[
        {label:'I name that I feel left out, but I don’t treat their separate plans as a betrayal.',value:0,repair:2,tags:['autonomy_respected']},
        {label:'I ask for reassurance or another plan with me, but I can still let them go freely.',value:1,repair:2,tags:['direct_request','autonomy_respected']},
        {label:'I keep asking who will be there, how long they’ll stay, and why they need to go without me.',value:3,repair:0,tags:['monitoring','control_pressure']},
        {label:'I make the evening emotionally expensive—an argument, accusation, or consequence—so going no longer feels worth it.',value:4,repair:0,tags:['punish_autonomy','control_pressure']}
      ]
    },
    {
      dimension:'responsibility',
      text:'In an argument, you realize part of the problem is clearly something you did. What tends to happen next?',
      options:[
        {label:'I name my part directly, even if I still think they also contributed.',value:0,repair:2,tags:['accountability','repair_available']},
        {label:'I need a little time, but I can usually come back and own the specific thing I did.',value:1,repair:2,tags:['accountability','repair_available']},
        {label:'I focus on what they did first, because admitting my part feels like losing the whole argument.',value:3,repair:0,tags:['blame_shift','scorekeeping']},
        {label:'I turn the conversation toward their flaws until my original behavior is no longer the main issue.',value:4,repair:0,tags:['reverse_blame','narrative_control']}
      ]
    },
    {
      dimension:'indirect',
      text:'You need reassurance, but asking for it directly feels vulnerable. What do you tend to do?',
      options:[
        {label:'Say what I need plainly: “I’m feeling insecure and could use reassurance.”',value:0,repair:2,tags:['direct_request','vulnerability']},
        {label:'Hint a little at first, but if they miss it, I eventually ask directly.',value:1,repair:1,tags:['hint_then_direct']},
        {label:'Act distant, sad, or “fine” and wait for them to notice and prove they care.',value:3,repair:0,tags:['withholding','indirect_pressure']},
        {label:'Create a situation that makes them feel guilty for not noticing what I needed without being told.',value:4,repair:0,tags:['guilt_leverage','mind_reading_demand']}
      ]
    },
    {
      dimension:'control',
      text:'Someone sets a boundary that frustrates you—for example, they need privacy, time alone, or a slower pace. What do you do?',
      options:[
        {label:'I can dislike the boundary and still respect it without punishing them for having it.',value:0,repair:2,tags:['boundary_respect']},
        {label:'I ask questions and negotiate what is negotiable, but I accept what is not mine to control.',value:1,repair:2,tags:['boundary_respect','negotiation']},
        {label:'I keep reopening the boundary until they get tired of defending it.',value:3,repair:0,tags:['boundary_pressure','wear_down']},
        {label:'I treat the boundary as proof they care less, and I use distance, anger, or guilt until they soften it.',value:4,repair:0,tags:['punish_boundary','control_pressure']}
      ]
    },
    {
      dimension:'responsibility',
      text:'You and someone you love remember the same argument differently. What is your instinct?',
      options:[
        {label:'Hold my memory firmly without claiming theirs must be false or irrational.',value:0,repair:2,tags:['reality_flexibility']},
        {label:'Argue my version strongly, but I can admit there may be details I remember imperfectly.',value:1,repair:2,tags:['reality_flexibility']},
        {label:'Keep pushing my version until they start doubting whether their memory can be trusted.',value:3,repair:0,tags:['reality_pressure','narrative_control']},
        {label:'Use certainty, their past mistakes, or their emotions to discredit their version rather than examine mine.',value:4,repair:0,tags:['reality_edit','personal_attack']}
      ]
    },
    {
      dimension:'indirect',
      text:'You want someone to change a decision they have already made. Which strategy feels most natural?',
      options:[
        {label:'Make one clear case for what I want and leave room for a genuine no.',value:0,repair:2,tags:['persuasion','accept_no']},
        {label:'Try to persuade them with reasons or compromise, but stop if the answer stays no.',value:1,repair:2,tags:['persuasion','accept_no']},
        {label:'Remind them of favors, sacrifices, or how disappointed other people will be if they refuse.',value:3,repair:0,tags:['emotional_debt','social_pressure']},
        {label:'Keep changing the emotional cost of refusing until agreeing becomes the easier option.',value:4,repair:0,tags:['coercive_pressure','wear_down']}
      ]
    },
    {
      dimension:'leverage',
      text:'During a heated argument, you suddenly fear the relationship is slipping away. What are you most likely to do?',
      options:[
        {label:'Pause if needed and say what I’m afraid of without threatening the relationship.',value:0,repair:2,tags:['repair_available','direct_fear']},
        {label:'Say something dramatic, then recognize it and correct myself once I calm down.',value:1,repair:1,tags:['self_correction','repair_available']},
        {label:'Hint that maybe we should break up so they understand how serious I am or come closer.',value:3,repair:0,tags:['breakup_leverage','threat_signal']},
        {label:'Threaten to leave, disappear, or end things unless they change position right now.',value:4,repair:0,tags:['breakup_threat','coercive_pressure']}
      ]
    },
    {
      dimension:'responsibility',
      text:'Someone tells you, with specific examples, that a pattern in your behavior hurts them. What happens inside you first?',
      options:[
        {label:'I may feel defensive, but I try to understand the pattern before deciding whether I agree.',value:0,repair:2,tags:['accountability','curiosity']},
        {label:'I explain my intention, then try to return to the impact and what I can change.',value:1,repair:2,tags:['repair_available','impact_focus']},
        {label:'I pick apart each example until the larger pattern becomes impossible to discuss.',value:3,repair:0,tags:['detail_fight','narrative_control']},
        {label:'I make their complaint the problem—too sensitive, unfair, dramatic, or hypocritical—so I don’t have to address my behavior.',value:4,repair:0,tags:['invalidate','reverse_blame']}
      ]
    },
    {
      dimension:'control',
      text:'You feel jealous, but you do not have evidence of betrayal. What do you do with the uncertainty?',
      options:[
        {label:'Name the feeling and look for evidence without demanding access to everything.',value:0,repair:2,tags:['autonomy_respected','self_regulation']},
        {label:'Ask for reasonable reassurance, then try to tolerate what I still cannot know.',value:1,repair:2,tags:['direct_request','self_regulation']},
        {label:'Check details, activity, or stories because uncertainty feels irresponsible if I could verify it.',value:3,repair:0,tags:['monitoring','certainty_control']},
        {label:'Pressure them to prove innocence—phone, passwords, whereabouts, or repeated explanations—because trust should mean transparency on demand.',value:4,repair:0,tags:['surveillance_pressure','control_pressure']}
      ]
    },
    {
      dimension:'leverage',
      text:'After conflict, what usually happens to your warmth, affection, or availability?',
      options:[
        {label:'I may need space, but I say that clearly and I don’t use closeness as a reward.',value:0,repair:2,tags:['clean_space','repair_available']},
        {label:'I cool off for a while, but I can tell them when I expect to reconnect.',value:1,repair:2,tags:['clean_space','repair_available']},
        {label:'I become cold or unreachable partly because I want them to feel the distance and come after me.',value:3,repair:0,tags:['silent_pressure','withdrawal_signal']},
        {label:'I withhold affection, contact, or normal warmth until they apologize, comply, or prove they understand.',value:4,repair:0,tags:['love_withdrawal','punishment']}
      ]
    },
    {
      dimension:'leverage',
      text:'When asking directly has not gotten you what you want, which thought is most familiar?',
      options:[
        {label:'“They are allowed to choose differently, even if I hate the answer.”',value:0,repair:2,tags:['accept_no','autonomy_respected']},
        {label:'“I can try another honest conversation, but I still have to respect their agency.”',value:1,repair:2,tags:['direct_request','autonomy_respected']},
        {label:'“Maybe they would understand if they felt how much this is hurting or costing me.”',value:3,repair:0,tags:['guilt_leverage','indirect_pressure']},
        {label:'“If being direct fails, I have to use whatever pressure works—otherwise my needs will never matter.”',value:4,repair:0,tags:['instrumental_pressure','coercive_pressure']}
      ]
    }
  ];

  const BANDS=[
    {
      max:19,key:'direct',title:'Mostly Direct Influence',
      summary:'Your answers suggest that you usually ask, negotiate, and disagree without making another person pay emotionally for having a different answer. You may still persuade strongly, but autonomy and accountability remain visible.',
      next:[
        'Keep separating a clear request from pressure: ask once, explain why it matters, and leave room for a real no.',
        'When conflict gets intense, protect the habit of naming your part without giving up your own perspective.',
        'Notice which situations make directness hardest so you can keep those moments from becoming indirect leverage.'
      ]
    },
    {
      max:39,key:'stress',title:'Pressure Shows Up Under Stress',
      summary:'Your answers suggest that manipulation is not your default style, but stress, fear of rejection, or frustration can pull you toward indirect pressure, repeated persuasion, or emotional signaling.',
      next:[
        'Identify your fastest trigger: feeling ignored, hearing no, jealousy, criticism, or fear of losing the relationship.',
        'Replace one indirect move with a direct sentence: “What I want is…” or “What I’m afraid of is…”',
        'After conflict, review whether the other person had a genuine choice or mainly a choice between compliance and emotional fallout.'
      ]
    },
    {
      max:59,key:'habits',title:'Manipulative Habits Are Showing',
      summary:'Your answers suggest a recurring pattern in which getting reassurance, agreement, or control can become more important than how freely the other person gets to respond. These are changeable behaviors, but they deserve honest attention.',
      next:[
        'Track the sequence: trigger → fear or need → tactic → short-term result → cost to trust.',
        'Stop using past favors, silence, guilt, or repeated argument as extra weight after someone has already understood your request.',
        'Practice accountability without counter-accusation: name your behavior first, then discuss the wider conflict separately.'
      ]
    },
    {
      max:79,key:'strong',title:'Strong Manipulation Pattern',
      summary:'Your answers suggest that pressure, control, blame-shifting, or emotional leverage are often part of how conflict gets resolved. The relationship may be learning that peace comes from the other person giving in rather than from mutual agreement.',
      next:[
        'Create a non-negotiable rule for yourself: no breakup threats, surveillance demands, guilt debts, or affection withdrawal to force an outcome.',
        'When you hear no, ask what respectful options remain instead of increasing emotional pressure.',
        'Consider working with a qualified therapist if these patterns feel automatic, especially when fear, anger, or abandonment panic drives them.'
      ]
    },
    {
      max:100,key:'high_control',title:'High-Control Manipulation Pattern',
      summary:'Your answers suggest that changing another person’s behavior may frequently involve making refusal costly—through guilt, monitoring, narrative control, withdrawal, threats, or punishment. This is more than a communication style issue; it can seriously erode autonomy and trust.',
      next:[
        'Stop any tactic that makes safety, affection, privacy, or relationship stability conditional on compliance.',
        'Use direct requests and accept that a real relationship includes answers you cannot control.',
        'Seek professional support to work on the fears, entitlement, or conflict patterns underneath the pressure—especially if partners describe feeling afraid, trapped, watched, or unable to say no.'
      ]
    }
  ];

  const MAXIMA={};
  Object.keys(DIMENSIONS).forEach(k=>MAXIMA[k]=0);
  QUESTIONS.forEach(q=>MAXIMA[q.dimension]+=Math.max(...q.options.map(o=>o.value||0)));

  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function classify(score){return BANDS.find(b=>score<=b.max)||BANDS[BANDS.length-1];}

  function repairLabel(pct){
    if(pct>=75)return {title:'Strong repair signal',text:'Across your answers, you often preserve directness, accountability, or the other person’s right to choose even when you are uncomfortable.'};
    if(pct>=45)return {title:'Repair is available but inconsistent',text:'You show some capacity to correct yourself and return to direct communication, but that capacity becomes less reliable under pressure.'};
    return {title:'Repair signal is limited in these answers',text:'Your selected responses rarely showed a clear return to direct requests, accountability, or respect for the other person’s autonomy once conflict escalated.'};
  }

  function pairInsight(top2,tags){
    const keys=top2.map(x=>x.key).sort().join('|');
    const map={
      'control|indirect':'Your strongest pattern combines indirect emotional pressure with difficulty tolerating another person’s independent choices. A no may be accepted verbally while still becoming emotionally expensive.',
      'indirect|responsibility':'Your pattern is strongest around influence and accountability: when needs are not met, pressure can become indirect, and conflict can shift toward explaining, scorekeeping, or controlling the story.',
      'indirect|leverage':'Your answers suggest that emotion itself can become leverage—hurt, distance, guilt, or relationship uncertainty may do work that a direct request cannot.',
      'control|responsibility':'Your strongest pattern links autonomy with narrative control. When another person resists or criticizes, you may become more focused on regaining control than on understanding impact.',
      'control|leverage':'Your pattern is strongest when another person acts independently. Monitoring, consequences, withdrawal, or threats can become ways of making autonomy feel costly.',
      'leverage|responsibility':'Conflict may become a contest over who controls the meaning of what happened and what happens next, with blame-shifting or emotional withdrawal replacing repair.'
    };
    let extra='';
    if((tags.breakup_threat||0)+(tags.breakup_leverage||0)>0)extra+=' Breakup language also appeared as leverage in at least one answer.';
    if((tags.monitoring||0)+(tags.surveillance_pressure||0)>0)extra+=' Monitoring or proof-seeking also appeared as a way to reduce uncertainty.';
    if((tags.guilt_leverage||0)+(tags.emotional_debt||0)>1)extra+=' Guilt or emotional debt appears repeatedly across your choices.';
    return (map[keys]||'Your strongest dimensions show where influence is most likely to turn into pressure: indirect emotion, autonomy, responsibility, or relational leverage.')+extra;
  }

  function scoreAnswers(answers){
    const raw={indirect:0,control:0,responsibility:0,leverage:0};
    const tags={};
    let repair=0, repairMax=0, highPressureCount=0;
    answers.forEach((answerIndex,i)=>{
      const q=QUESTIONS[i],opt=q&&q.options[answerIndex];
      if(!opt)return;
      raw[q.dimension]+=opt.value||0;
      repair+=opt.repair||0;
      repairMax+=2;
      if((opt.value||0)>=4)highPressureCount+=1;
      (opt.tags||[]).forEach(t=>tags[t]=(tags[t]||0)+1);
    });
    const dims=Object.keys(DIMENSIONS).map(key=>{
      const pct=MAXIMA[key]?Math.round((raw[key]/MAXIMA[key])*100):0;
      return {key,label:DIMENSIONS[key].label,short:DIMENSIONS[key].short,weight:DIMENSIONS[key].weight,pct,raw:raw[key]};
    });
    const score=Math.round(dims.reduce((sum,d)=>sum+d.pct*d.weight,0));
    const top2=[...dims].sort((a,b)=>b.pct-a.pct).slice(0,2);
    const repairPct=repairMax?Math.round((repair/repairMax)*100):0;
    return {
      score:clamp(score,0,100),
      band:classify(score),
      dims,
      top2,
      tags,
      repairPct,
      repair:repairLabel(repairPct),
      highPressureCount,
      clarity:(top2[0].pct-top2[1].pct)>=20?'one dimension clearly leads':'the pattern is spread across more than one dimension'
    };
  }

  function resultMarkup(r){
    const cards=r.top2.map(d=>'<div class="ami-dim-card"><div class="ami-dim-head"><strong>'+escapeHtml(d.label)+'</strong><span>'+d.pct+'%</span></div><div class="ami-meter"><span style="width:'+d.pct+'%"></span></div><p>'+escapeHtml(d.short)+'</p></div>').join('');
    const highAlert=r.highPressureCount>=3?'<div class="ami-alert"><strong>High-pressure responses:</strong> '+r.highPressureCount+' of your answers used the most forceful option in that scenario. That matters because repeated intensity can make another person feel that disagreement is unsafe or too costly.</div>':'';
    return '<div class="ami-result-head"><div><div class="ami-eyebrow">Your result</div><h2>'+escapeHtml(r.band.title)+'</h2></div><div class="ami-score" aria-label="Manipulation Pattern Score '+r.score+' out of 100"><strong>'+r.score+'</strong><span>/100</span></div></div>'+
      '<p>'+escapeHtml(r.band.summary)+'</p>'+
      '<div class="ami-context"><strong>'+escapeHtml(r.repair.title)+'</strong><p>'+escapeHtml(r.repair.text)+' Repair signal: '+r.repairPct+'%.</p></div>'+
      highAlert+
      '<p class="ami-note"><strong>Manipulation Pattern Score:</strong> an original educational score based on your responses here—not a diagnosis, personality label, or validated clinical cutoff.</p>'+
      '<h3>Your two strongest dimensions</h3><div class="ami-dim-grid">'+cards+'</div>'+
      '<div class="ami-insight"><strong>What your answer pattern suggests:</strong> '+escapeHtml(pairInsight(r.top2,r.tags))+'</div>'+
      '<h3>What to do next</h3><ol class="ami-next">'+r.band.next.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ol>'+
      '<div class="ami-result-actions"><a class="btn" href="/blog/boundaries-vs-control/">Learn boundaries vs control</a><a class="btn secondary" href="/blog/fair-fighting-rules/">Use fair-fighting rules</a><button type="button" class="btn secondary" id="amiRetake">Retake test</button></div>'+
      '<p class="ami-note">Pattern clarity: <strong>'+escapeHtml(r.clarity)+'</strong>. Your result describes selected behaviors, not your worth or identity.</p>';
  }

  function init(){
    if(typeof document==='undefined')return;
    const root=document.getElementById('amIManipulativeQuiz');
    if(!root)return;

    let state={index:0,answers:new Array(QUESTIONS.length).fill(null)};
    root.innerHTML='<section class="ami-test-card" aria-label="Am I Manipulative Test"><div class="ami-test-top"><span id="amiProgressText">Question 1 of '+QUESTIONS.length+'</span><button type="button" class="ami-back" id="amiBack" disabled>Back</button></div><progress id="amiProgress" value="1" max="'+QUESTIONS.length+'" aria-label="Test progress"></progress><h2 id="amiQuestion"></h2><div id="amiOptions" class="ami-options"></div></section><section id="amiResult" class="ami-result" hidden aria-live="polite"></section>';

    const qEl=document.getElementById('amiQuestion');
    const optsEl=document.getElementById('amiOptions');
    const progressEl=document.getElementById('amiProgress');
    const progressText=document.getElementById('amiProgressText');
    const backBtn=document.getElementById('amiBack');
    const resultEl=document.getElementById('amiResult');
    const testCard=root.querySelector('.ami-test-card');

    function paint(){
      const q=QUESTIONS[state.index];
      progressText.textContent='Question '+(state.index+1)+' of '+QUESTIONS.length;
      progressEl.value=state.index+1;
      qEl.textContent=q.text;
      optsEl.innerHTML='';
      q.options.forEach((opt,optionIndex)=>{
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='ami-option';
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
      const retake=document.getElementById('amiRetake');
      if(retake)retake.addEventListener('click',reset);
      try{sessionStorage.setItem('amIManipulativeTestResult',JSON.stringify({answers:state.answers,result,savedAt:Date.now()}));}catch(e){}
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
      if(state.index>0){
        state.index-=1;
        paint();
      }
    });

    paint();
  }

  const ENGINE={questions:QUESTIONS,dimensions:DIMENSIONS,maxima:MAXIMA,bands:BANDS,scoreAnswers,classify,repairLabel,pairInsight};
  if(typeof module!=='undefined'&&module.exports)module.exports=ENGINE;
  if(global)global.AM_I_MANIPULATIVE_ENGINE=ENGINE;
  if(typeof document!=='undefined'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
    else init();
  }
})(typeof window!=='undefined'?window:globalThis);
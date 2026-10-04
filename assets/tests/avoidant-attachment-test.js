/* avoidant-attachment-test.js — original 12-question educational self-reflection test */
(function(global){
  'use strict';

  const DIMENSIONS={
    closeness:{label:'Closeness pressure',short:'How quickly intimacy, commitment, or emotional access starts to feel like pressure.',weight:0.30},
    reliance:{label:'Hyper-independence',short:'How strongly you prefer self-reliance over depending on or receiving support from someone else.',weight:0.25},
    deactivation:{label:'Deactivation & distance',short:'How often your system turns feelings down, finds reasons to detach, or creates distance when closeness intensifies.',weight:0.25},
    ambivalence:{label:'Push-pull fear',short:'How often you want closeness and fear it at the same time, creating approach–retreat cycles.',weight:0.20}
  };

  const QUESTIONS=[
    {
      dimension:'closeness',
      text:'After a date or evening where you felt unusually close to someone, what is most likely to happen the next day?',
      options:[
        {label:'I can enjoy the closeness and continue normally without needing to undo it.',value:0,anxiety:0,repair:2,tags:['comfortable_closeness']},
        {label:'I usually want a little space to reset, but I can stay warm and connected.',value:1,anxiety:0,repair:2,tags:['healthy_space']},
        {label:'I start noticing things that suddenly make the connection feel less appealing or more demanding.',value:3,anxiety:1,repair:0,tags:['closeness_hangover','devaluation']},
        {label:'I want the connection, then feel exposed and pull back hard—even while worrying I may lose them.',value:4,anxiety:4,repair:0,tags:['push_pull','fear_of_closeness']}
      ]
    },
    {
      dimension:'reliance',
      text:'You are having a genuinely difficult week and someone close to you offers real support. What feels most natural?',
      options:[
        {label:'Accept the help and tell them what would actually be useful.',value:0,anxiety:0,repair:2,tags:['receive_support']},
        {label:'Accept some help, but keep part of the problem for myself because that feels more comfortable.',value:1,anxiety:0,repair:2,tags:['measured_independence']},
        {label:'Say I am fine and handle it alone, even when I know support would help.',value:3,anxiety:0,repair:0,tags:['hyper_independence','need_minimizing']},
        {label:'Want their support, but distrust needing it and pull away before I can feel dependent.',value:4,anxiety:3,repair:0,tags:['need_fear','push_pull']}
      ]
    },
    {
      dimension:'deactivation',
      text:'Someone you were excited about becomes more emotionally available and clearly interested. What often happens inside you?',
      options:[
        {label:'Their availability makes it easier for me to relax into the connection.',value:0,anxiety:0,repair:2,tags:['availability_safe']},
        {label:'I notice the shift and may slow the pace, but my interest usually stays intact.',value:1,anxiety:0,repair:2,tags:['pace_regulation']},
        {label:'My interest can drop once they feel fully available, and I start focusing on flaws or incompatibilities.',value:3,anxiety:0,repair:0,tags:['deactivation','flaw_focus']},
        {label:'I feel relief and panic at once: I want them close, then suddenly need distance because the closeness feels risky.',value:4,anxiety:4,repair:0,tags:['deactivation','push_pull']}
      ]
    },
    {
      dimension:'closeness',
      text:'A relationship begins moving toward labels, future plans, or more emotional commitment. Which reaction fits you best?',
      options:[
        {label:'I think about fit and timing, but commitment itself does not feel threatening.',value:0,anxiety:0,repair:2,tags:['commitment_flexible']},
        {label:'I want to go slowly and keep some independence, but I can talk about that directly.',value:1,anxiety:0,repair:2,tags:['direct_pacing']},
        {label:'I start feeling trapped, restless, or unusually critical once the relationship feels more defined.',value:3,anxiety:1,repair:0,tags:['commitment_pressure','devaluation']},
        {label:'I deeply want certainty, but when it arrives I can feel alarmed and want to escape it.',value:4,anxiety:4,repair:0,tags:['commitment_fear','push_pull']}
      ]
    },
    {
      dimension:'ambivalence',
      text:'You pull away from someone, then start missing them once there is real distance. What do you usually do?',
      options:[
        {label:'If I want to reconnect, I say so directly and take responsibility for the distance I created.',value:0,anxiety:1,repair:2,tags:['clean_return','accountability']},
        {label:'I wait until I am calmer, then reach out in a straightforward way.',value:1,anxiety:1,repair:2,tags:['clean_return']},
        {label:'I circle back indirectly—likes, casual messages, or low-risk contact—without naming why I disappeared.',value:3,anxiety:2,repair:0,tags:['indirect_return','distance_control']},
        {label:'I strongly miss them when they are unavailable, but once they respond I can feel the urge to retreat again.',value:4,anxiety:4,repair:0,tags:['push_pull','separation_anxiety']}
      ]
    },
    {
      dimension:'reliance',
      text:'When you need comfort from a partner, which sentence feels closest to your inner reaction?',
      options:[
        {label:'“I can ask for comfort without feeling weak or trapped by needing someone.”',value:0,anxiety:0,repair:2,tags:['receive_support']},
        {label:'“I prefer to calm myself first, then I can let them in.”',value:1,anxiety:0,repair:2,tags:['self_regulation']},
        {label:'“If I need too much from someone, I give them power to disappoint me.”',value:3,anxiety:1,repair:0,tags:['dependency_distrust','hyper_independence']},
        {label:'“I want them to prove they will be there, but needing that proof also makes me want to pull away.”',value:4,anxiety:4,repair:0,tags:['need_fear','push_pull']}
      ]
    },
    {
      dimension:'deactivation',
      text:'During conflict, your partner wants to understand what you are feeling right now. What tends to happen?',
      options:[
        {label:'I can usually stay in the conversation, even if I need a brief pause.',value:0,anxiety:0,repair:2,tags:['repair_available']},
        {label:'I need time to find words, but I can give a clear return time and come back.',value:1,anxiety:0,repair:2,tags:['clean_space','repair_available']},
        {label:'My feelings seem to switch off, and I would rather stop the conversation than explain what is happening.',value:3,anxiety:0,repair:0,tags:['shutdown','deactivation']},
        {label:'I feel flooded and exposed; part of me wants them to come closer while another part wants them gone.',value:4,anxiety:4,repair:0,tags:['shutdown','push_pull']}
      ]
    },
    {
      dimension:'ambivalence',
      text:'Someone you care about gives you space without chasing or pressuring you. What happens next?',
      options:[
        {label:'The space helps me regulate, and I can reconnect without needing a crisis to feel close again.',value:0,anxiety:0,repair:2,tags:['space_with_return']},
        {label:'I appreciate the space and usually reach out once I feel ready.',value:1,anxiety:0,repair:2,tags:['space_with_return']},
        {label:'I enjoy the relief so much that I can let the connection drift instead of actively repairing it.',value:3,anxiety:0,repair:0,tags:['distance_relief','repair_avoidance']},
        {label:'At first I want the space, then I become anxious that they stopped caring because they did not chase me.',value:4,anxiety:4,repair:0,tags:['chase_expectation','push_pull']}
      ]
    },
    {
      dimension:'deactivation',
      text:'You notice one disappointing trait in someone you otherwise care about. What is your most familiar pattern?',
      options:[
        {label:'I can hold the flaw alongside the rest of who they are and decide proportionally.',value:0,anxiety:0,repair:2,tags:['balanced_view']},
        {label:'I may focus on it for a while, but I can usually regain perspective.',value:1,anxiety:0,repair:2,tags:['balanced_view']},
        {label:'The flaw can quickly become evidence that the whole relationship is wrong or that I should detach.',value:3,anxiety:0,repair:0,tags:['flaw_focus','deactivation']},
        {label:'I use the flaw to create distance, then worry I pushed away someone I actually wanted.',value:4,anxiety:3,repair:0,tags:['devaluation','push_pull']}
      ]
    },
    {
      dimension:'closeness',
      text:'Someone is consistently kind, emotionally available, and interested in knowing you deeply. How does that usually feel over time?',
      options:[
        {label:'Mostly safe. I can still keep my identity and enjoy being known.',value:0,anxiety:0,repair:2,tags:['comfortable_closeness']},
        {label:'Good, but I need a slower pace and regular time to myself.',value:1,anxiety:0,repair:2,tags:['direct_pacing']},
        {label:'The consistency can start to feel intrusive, boring, or like too much access to me.',value:3,anxiety:0,repair:0,tags:['closeness_pressure','distance_relief']},
        {label:'I crave exactly that kind of safety, but once I receive it I can mistrust it or feel exposed by it.',value:4,anxiety:4,repair:0,tags:['mistrust_closeness','push_pull']}
      ]
    },
    {
      dimension:'ambivalence',
      text:'After you have taken space during conflict and your body feels calmer, what usually happens?',
      options:[
        {label:'I return to the issue and try to repair, even if the conversation is uncomfortable.',value:0,anxiety:0,repair:2,tags:['repair_available','clean_return']},
        {label:'I may need a little more time, but I can communicate when I will come back.',value:1,anxiety:0,repair:2,tags:['repair_available','clean_space']},
        {label:'Once I feel better, I often prefer not to reopen the issue at all.',value:3,anxiety:0,repair:0,tags:['repair_avoidance','distance_relief']},
        {label:'I want repair, but the conversation itself feels threatening enough that I may reconnect warmly without addressing what happened.',value:4,anxiety:3,repair:0,tags:['repair_avoidance','push_pull']}
      ]
    },
    {
      dimension:'reliance',
      text:'Which belief about close relationships feels most familiar when you are under stress?',
      options:[
        {label:'“I can depend on someone without giving up myself.”',value:0,anxiety:0,repair:2,tags:['secure_reliance']},
        {label:'“I need some independence, but closeness and autonomy can coexist.”',value:1,anxiety:0,repair:2,tags:['measured_independence']},
        {label:'“Depending on people creates problems; I am safest when I need very little from anyone.”',value:3,anxiety:0,repair:0,tags:['hyper_independence','dependency_distrust']},
        {label:'“I want someone close enough to feel safe, but not so close that they can hurt or control me.”',value:4,anxiety:4,repair:0,tags:['need_fear','push_pull']}
      ]
    }
  ];

  const BANDS=[
    {max:19,key:'flexible',title:'Flexible Closeness',summary:'Your answers show little evidence that distance is your main way of regulating intimacy. You can value independence without consistently turning closeness, support, or repair into a threat.',next:[
      'Keep protecting the balance between autonomy and emotional availability.',
      'Notice the difference between healthy space and disappearing from a difficult conversation.',
      'If a specific relationship makes you unusually avoidant, evaluate that context rather than assuming it defines your attachment pattern.'
    ]},
    {max:39,key:'independent',title:'Independent but Available',summary:'You lean self-reliant and may need more space than some partners, but your answers still show meaningful access to closeness, support, and repair. Independence is present without consistently becoming emotional distance.',next:[
      'State your pacing needs directly before they are misread as rejection.',
      'Practice receiving small amounts of support instead of automatically solving everything alone.',
      'Use clear return times when you need space during conflict.'
    ]},
    {max:59,key:'contextual',title:'Contextual Avoidance',summary:'Avoidant strategies appear often enough to matter, especially under pressure. You may minimize needs, deactivate feelings, or create distance in certain relationship moments without showing a uniformly avoidant pattern everywhere.',next:[
      'Track the exact trigger for distance: commitment, dependence, conflict, being needed, or feeling too visible.',
      'Before deciding you have “lost feelings,” wait until your nervous system is regulated and compare the thought with your longer-term pattern.',
      'Replace unexplained withdrawal with one direct sentence about the space you need and when you will reconnect.'
    ]},
    {max:79,key:'strong',title:'Strong Avoidant Pattern',summary:'Your answers suggest that distance, self-reliance, emotional shutdown, or deactivation are frequent ways of restoring safety when closeness becomes intense. The pattern may protect autonomy in the short term while making mutual dependence and repair harder.',next:[
      'Practice small, tolerable doses of dependence: ask for one specific form of support instead of handling everything alone.',
      'Name shutdown early rather than waiting until you feel nothing: “I am getting overwhelmed and need 30 minutes, then I will come back.”',
      'Pay attention to whether flaw-finding or sudden loss of interest reliably appears after intimacy increases.'
    ]},
    {max:100,key:'high',title:'High Avoidance Pattern',summary:'Your answers show a strong tendency to manage vulnerability through distance, emotional deactivation, hyper-independence, or push-pull behavior. Closeness may feel wanted in theory but difficult to tolerate once it becomes emotionally real.',next:[
      'Treat the urge to detach as information, not an automatic instruction to end the relationship.',
      'Build a repeatable return ritual after space so distance does not become the default ending of conflict.',
      'If closeness repeatedly triggers panic, numbness, or relationship sabotage, consider working with a qualified therapist familiar with adult attachment patterns.'
    ]}
  ];

  const MAXIMA={};
  Object.keys(DIMENSIONS).forEach(k=>MAXIMA[k]=0);
  QUESTIONS.forEach(q=>MAXIMA[q.dimension]+=Math.max(...q.options.map(o=>o.value||0)));

  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function classify(score){return BANDS.find(b=>score<=b.max)||BANDS[BANDS.length-1];}

  function subtype(score,anxietyPct,dims){
    const byKey=Object.fromEntries(dims.map(d=>[d.key,d]));
    if(score<40){
      return {key:'not_dominant',title:'Avoidance is not your dominant pattern',text:'Your answers do not show enough consistent avoidance to make a fearful- or dismissive-avoidant label the best summary. Context and relationship-specific stress may matter more.'};
    }
    if(anxietyPct>=60){
      return {key:'fearful',title:'Fearful-avoidant leaning',text:'Your avoidance is paired with a strong fear signal. You may crave closeness, then retreat once it feels risky, and feel renewed anxiety when distance becomes real.'};
    }
    if(anxietyPct<=35 && (byKey.reliance.pct>=55 || byKey.deactivation.pct>=55)){
      return {key:'dismissive',title:'Dismissive-avoidant leaning',text:'Your pattern leans more toward self-reliance and emotional deactivation than fear of abandonment. Distance may feel regulating, practical, or safer than depending on another person.'};
    }
    return {key:'mixed',title:'Mixed avoidant pattern',text:'Your answers show meaningful avoidance without a clean fearful- or dismissive-avoidant split. You may use different distancing strategies depending on the relationship and trigger.'};
  }

  function repairLabel(pct){
    if(pct>=75)return {title:'Strong repair capacity',text:'Even when you need space, your answers usually preserve a path back to direct communication and repair.'};
    if(pct>=45)return {title:'Repair is available but inconsistent',text:'You can return and repair in some situations, but shutdown or distance can still interrupt the process when stress rises.'};
    return {title:'Repair often gets lost in distance',text:'Your answers rarely showed a clear return after withdrawal. The issue may be less the need for space than what happens after the space.'};
  }

  function pairInsight(top2,tags,sub){
    const keys=top2.map(x=>x.key).sort().join('|');
    const map={
      'closeness|reliance':'Your strongest pattern combines discomfort with emotional access and a strong preference for self-reliance. Closeness may start to feel costly when it creates expectations of dependence.',
      'closeness|deactivation':'Your system appears to create distance by turning down attraction, attention, or emotional intensity after closeness increases.',
      'ambivalence|closeness':'Your pattern is especially sensitive to intimacy itself: you may want closeness, then feel exposed by it, creating a strong approach–retreat rhythm.',
      'deactivation|reliance':'Self-reliance and emotional deactivation reinforce each other here. When connection becomes demanding, needing less can feel safer than negotiating closeness.',
      'ambivalence|reliance':'You may want support while simultaneously distrusting what it means to need someone, producing a mix of independence and fear-driven distance.',
      'ambivalence|deactivation':'Your pattern combines push-pull fear with emotional shutdown. Distance may reduce overwhelm quickly, but the desire for connection can return once the threat of closeness drops.'
    };
    let extra='';
    if((tags.flaw_focus||0)+(tags.devaluation||0)>=2) extra+=' Flaw-finding or devaluation appeared repeatedly after closeness increased.';
    if((tags.repair_avoidance||0)>=2) extra+=' Repair avoidance also appeared more than once, suggesting the return after space may be a key leverage point for change.';
    if(sub.key==='fearful') extra+=' The anxiety modifier makes this look more fearful-avoidant than simply independent.';
    if(sub.key==='dismissive') extra+=' The low anxiety modifier makes this look more dismissive-avoidant than push-pull.';
    return (map[keys]||'Your strongest dimensions show where closeness is most likely to turn into distance: intimacy pressure, self-reliance, deactivation, or push-pull fear.')+extra;
  }

  function scoreAnswers(answers){
    const raw={closeness:0,reliance:0,deactivation:0,ambivalence:0};
    const tags={};
    let anxiety=0, anxietyMax=0, repair=0, repairMax=0, strongestAvoidantAnswers=0;
    answers.forEach((answerIndex,i)=>{
      const q=QUESTIONS[i], opt=q&&q.options[answerIndex];
      if(!opt)return;
      raw[q.dimension]+=opt.value||0;
      anxiety+=opt.anxiety||0;
      anxietyMax+=4;
      repair+=opt.repair||0;
      repairMax+=2;
      if((opt.value||0)>=4) strongestAvoidantAnswers+=1;
      (opt.tags||[]).forEach(t=>tags[t]=(tags[t]||0)+1);
    });
    const dims=Object.keys(DIMENSIONS).map(key=>{
      const pct=MAXIMA[key]?Math.round((raw[key]/MAXIMA[key])*100):0;
      return {key,label:DIMENSIONS[key].label,short:DIMENSIONS[key].short,weight:DIMENSIONS[key].weight,pct,raw:raw[key]};
    });
    const score=Math.round(dims.reduce((sum,d)=>sum+d.pct*d.weight,0));
    const anxietyPct=anxietyMax?Math.round((anxiety/anxietyMax)*100):0;
    const repairPct=repairMax?Math.round((repair/repairMax)*100):0;
    const top2=[...dims].sort((a,b)=>b.pct-a.pct).slice(0,2);
    const band=classify(score);
    const sub=subtype(score,anxietyPct,dims);
    return {
      score:clamp(score,0,100),
      band,
      subtype:sub,
      anxietyPct,
      repairPct,
      repair:repairLabel(repairPct),
      dims,
      top2,
      tags,
      strongestAvoidantAnswers,
      clarity:(top2[0].pct-top2[1].pct)>=20?'one avoidance dimension clearly leads':'your avoidance is spread across more than one dimension'
    };
  }

  function resultMarkup(r){
    const cards=r.top2.map(d=>'<div class="aat-dim-card"><div class="aat-dim-head"><strong>'+escapeHtml(d.label)+'</strong><span>'+d.pct+'%</span></div><div class="aat-meter"><span style="width:'+d.pct+'%"></span></div><p>'+escapeHtml(d.short)+'</p></div>').join('');
    const intense=r.strongestAvoidantAnswers>=3?'<div class="aat-alert"><strong>High-intensity distance responses:</strong> '+r.strongestAvoidantAnswers+' of your answers used the strongest avoidant option in that scenario. Repetition across different contexts matters more than one isolated reaction.</div>':'';
    return '<section class="aat-result" aria-live="polite">'+
      '<div class="aat-result-head"><div><div class="aat-eyebrow">Your result</div><h2>'+escapeHtml(r.band.title)+'</h2><p>'+escapeHtml(r.band.summary)+'</p></div><div class="aat-score"><strong>'+r.score+'</strong><span>/100</span></div></div>'+
      '<div class="aat-subtype"><strong>'+escapeHtml(r.subtype.title)+'</strong><p>'+escapeHtml(r.subtype.text)+'</p></div>'+
      '<div class="aat-signal-grid"><div><span>Attachment anxiety modifier</span><strong>'+r.anxietyPct+'%</strong><p>This does not raise or lower your avoidance score. It helps distinguish fearful push-pull from lower-anxiety dismissive distance.</p></div><div><span>Repair capacity</span><strong>'+r.repairPct+'%</strong><p>'+escapeHtml(r.repair.text)+'</p></div></div>'+
      intense+
      '<h3>Your strongest dimensions</h3><div class="aat-dim-grid">'+cards+'</div>'+
      '<div class="aat-insight"><strong>How your answers combine</strong><p>'+escapeHtml(pairInsight(r.top2,r.tags,r.subtype))+'</p><p class="aat-note">Pattern clarity: '+escapeHtml(r.clarity)+'.</p></div>'+
      '<h3>What to do next</h3><ul class="aat-next">'+r.band.next.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ul>'+
      '<div class="aat-result-actions"><a class="btn" href="/blog/avoidant-attachment-texting/">Read the avoidant attachment guide</a><a class="btn secondary" href="/tests/attachment-style/">Compare your full attachment style</a><button class="btn secondary" type="button" id="aatRetake">Retake</button></div>'+
      '<p class="aat-note">Educational self-reflection only. This result is not a diagnosis and this questionnaire is not a validated clinical instrument.</p>'+
    '</section>';
  }

  function mount(root){
    const answers=[];
    let index=0;

    function renderQuestion(){
      const q=QUESTIONS[index];
      root.innerHTML='<section class="aat-test-card">'+
        '<div class="aat-test-top"><span>'+(index+1)+' / '+QUESTIONS.length+'</span><button class="aat-back" type="button" '+(index===0?'disabled':'')+'>Back</button></div>'+
        '<progress id="aatProgress" max="'+QUESTIONS.length+'" value="'+(index+1)+'"></progress>'+
        '<h2 id="aatQuestion">'+escapeHtml(q.text)+'</h2>'+
        '<div class="aat-options">'+q.options.map((o,i)=>'<button type="button" class="aat-option" data-choice="'+i+'">'+escapeHtml(o.label)+'</button>').join('')+'</div>'+
      '</section>';

      root.querySelectorAll('.aat-option').forEach(btn=>{
        btn.addEventListener('click',()=>{
          answers[index]=Number(btn.dataset.choice);
          try{sessionStorage.setItem('avoidantAttachmentAnswers',JSON.stringify(answers));}catch(e){}
          if(index<QUESTIONS.length-1){index+=1;renderQuestion();}
          else renderResult();
        });
      });
      const back=root.querySelector('.aat-back');
      if(back)back.addEventListener('click',()=>{if(index>0){index-=1;renderQuestion();}});
    }

    function renderResult(){
      const r=scoreAnswers(answers);
      root.innerHTML=resultMarkup(r);
      root.scrollIntoView({behavior:'smooth',block:'start'});
      const retake=root.querySelector('#aatRetake');
      if(retake)retake.addEventListener('click',()=>{
        answers.length=0; index=0;
        try{sessionStorage.removeItem('avoidantAttachmentAnswers');}catch(e){}
        renderQuestion();
      });
    }

    renderQuestion();
  }

  const ENGINE={questions:QUESTIONS,dimensions:DIMENSIONS,bands:BANDS,maxima:MAXIMA,scoreAnswers,subtype};
  global.AVOIDANT_ATTACHMENT_TEST_ENGINE=ENGINE;

  if(typeof module!=='undefined'&&module.exports)module.exports=ENGINE;

  if(typeof document!=='undefined'){
    const boot=()=>{const root=document.getElementById('avoidantAttachmentQuiz');if(root)mount(root);};
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  }
})(typeof globalThis!=='undefined'?globalThis:this);

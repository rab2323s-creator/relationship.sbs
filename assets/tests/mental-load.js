/* mental-load.js — original 12-question educational self-reflection test */
(function(){
  'use strict';

  const DIMENSIONS = {
    notice_anticipate: {
      label: 'Notice & anticipate',
      short: 'How often you are the person who spots needs, risks, deadlines, shortages, and upcoming problems before anyone asks.',
      weight: 0.30
    },
    plan_coordinate: {
      label: 'Plan & coordinate',
      short: 'How much of the scheduling, sequencing, researching, deciding, and logistical thinking lives in your head.',
      weight: 0.25
    },
    own_followthrough: {
      label: 'Ownership & follow-through',
      short: 'Whether responsibilities stay yours from first thought through completion, reminders, troubleshooting, and follow-up.',
      weight: 0.25
    },
    emotional_relational: {
      label: 'Emotional & relationship labor',
      short: 'How much you track feelings, maintain family/social ties, initiate repair, and keep the emotional system moving.',
      weight: 0.20
    }
  };

  const QUESTIONS = [
    {
      dimension:'notice_anticipate',
      text:'A normal week is starting. Who usually notices what the household will need before something becomes urgent?',
      options:[
        {label:'We both tend to notice and act without waiting for the other person.',value:0,dependency:0},
        {label:'It varies; I notice some areas first and my partner notices others.',value:1,dependency:1},
        {label:'I notice most shortages, deadlines, appointments, school needs, or household problems first.',value:3,dependency:3,tags:['default_noticer']},
        {label:'If I stopped scanning ahead, important things would regularly be missed until they became urgent.',value:4,dependency:4,tags:['default_noticer','system_depends_on_me']}
      ]
    },
    {
      dimension:'notice_anticipate',
      text:'Something recurring is due soon—a bill, prescription, pet treatment, school form, renewal, or family event. What usually happens?',
      options:[
        {label:'The responsible person tracks it without needing a reminder from the other.',value:0,dependency:0},
        {label:'We sometimes remind each other, but responsibility is genuinely shared.',value:1,dependency:1},
        {label:'I usually remember first and prompt the other person before it gets missed.',value:3,dependency:3,tags:['reminder_role']},
        {label:'I am effectively the memory system; without my reminder, it often would not happen.',value:4,dependency:4,tags:['reminder_role','system_depends_on_me']}
      ]
    },
    {
      dimension:'notice_anticipate',
      text:'You are finally resting. How much of your attention is still monitoring what needs to happen next?',
      options:[
        {label:'I can switch off because ownership is distributed and I trust the system.',value:0,dependency:0},
        {label:'A few things stay in mind, but I do not feel responsible for everything.',value:1,dependency:1},
        {label:'My brain keeps running through tomorrow, supplies, schedules, and what others may forget.',value:3,dependency:2,tags:['always_on']},
        {label:'Rest rarely feels like true rest because I am still mentally supervising shared life.',value:4,dependency:3,tags:['always_on','cognitive_overload']}
      ]
    },

    {
      dimension:'plan_coordinate',
      text:'A family or household task has several steps. Who usually turns it from “we need to do this” into an actual plan?',
      options:[
        {label:'Whoever owns it makes the plan without outsourcing the thinking.',value:0,dependency:0},
        {label:'We plan together when needed and split the decisions naturally.',value:1,dependency:1},
        {label:'I usually research, sequence, schedule, or explain the steps before someone else helps.',value:3,dependency:3,tags:['planner_role']},
        {label:'Even when someone else does the visible task, I am usually the project manager behind it.',value:4,dependency:4,tags:['planner_role','manager_role']}
      ]
    },
    {
      dimension:'plan_coordinate',
      text:'When your partner says, “Just tell me what to do,” how closely does that describe your normal dynamic?',
      options:[
        {label:'Not much. We each own recurring areas and do not wait for assignments.',value:0,dependency:0},
        {label:'Occasionally, when one of us knows more about a specific situation.',value:1,dependency:1},
        {label:'Often. I have to identify, prioritize, and assign what needs doing.',value:3,dependency:4,tags:['delegation_load']},
        {label:'Very often. I feel like the manager and my partner feels like the helper.',value:4,dependency:4,tags:['delegation_load','manager_role']}
      ]
    },
    {
      dimension:'plan_coordinate',
      text:'Plans change at the last minute—a sick child, canceled appointment, travel issue, broken appliance. Who usually reorganizes everything?',
      options:[
        {label:'We both adapt; the person closest to the issue usually handles the coordination.',value:0,dependency:0},
        {label:'I may take the lead sometimes, but not by default.',value:1,dependency:1},
        {label:'People usually look to me to create the backup plan and tell everyone what changes.',value:3,dependency:3,tags:['contingency_manager']},
        {label:'I feel responsible for absorbing the disruption so everyone else can keep functioning.',value:4,dependency:4,tags:['contingency_manager','system_depends_on_me']}
      ]
    },

    {
      dimension:'own_followthrough',
      text:'Your partner agrees to own a recurring responsibility. What happens after the handoff?',
      options:[
        {label:'They track it, solve routine problems, and follow through without me monitoring.',value:0,dependency:0},
        {label:'There may be an occasional question, but ownership stays with them.',value:1,dependency:1},
        {label:'I still check whether it happened, remind them, or finish loose ends.',value:3,dependency:3,tags:['followup_load']},
        {label:'The task is “theirs,” but the responsibility for making sure it succeeds still feels mine.',value:4,dependency:4,tags:['followup_load','fake_handoff']}
      ]
    },
    {
      dimension:'own_followthrough',
      text:'If you stopped reminding, checking, and following up for two weeks, what would most likely happen?',
      options:[
        {label:'Most recurring responsibilities would continue normally.',value:0,dependency:0},
        {label:'A few small things might slip, but the system would mostly work.',value:1,dependency:1},
        {label:'Several important things would be late, forgotten, or left incomplete.',value:3,dependency:4,tags:['system_depends_on_me']},
        {label:'The household or family system would noticeably break down until I resumed managing it.',value:4,dependency:4,tags:['system_depends_on_me','high_dependency']}
      ]
    },
    {
      dimension:'own_followthrough',
      text:'How often do you finish the “last 10%” of tasks someone else technically did?',
      options:[
        {label:'Rarely. The person who owns the task usually closes the loop.',value:0,dependency:0},
        {label:'Sometimes, especially during busy weeks.',value:1,dependency:1},
        {label:'Often—I chase confirmations, put things away, send the final message, or schedule the next step.',value:3,dependency:3,tags:['last_ten_percent']},
        {label:'Constantly. I am the person who makes sure tasks are actually complete, not just started.',value:4,dependency:4,tags:['last_ten_percent','manager_role']}
      ]
    },

    {
      dimension:'emotional_relational',
      text:'Who usually notices tension, disconnection, or an unresolved conflict and starts the repair conversation?',
      options:[
        {label:'Either of us may notice and initiate repair.',value:0,dependency:0},
        {label:'I initiate a little more often, but I am not carrying it alone.',value:1,dependency:1},
        {label:'I usually notice the emotional distance and bring it up first.',value:3,dependency:2,tags:['relationship_manager']},
        {label:'If I do not initiate repair, difficult issues can sit unresolved indefinitely.',value:4,dependency:4,tags:['relationship_manager','system_depends_on_me']}
      ]
    },
    {
      dimension:'emotional_relational',
      text:'Birthdays, gifts, family contact, thank-yous, invitations, and social plans—how is that relational work handled?',
      options:[
        {label:'We each maintain important relationships and share joint obligations.',value:0,dependency:0},
        {label:'I do somewhat more, but the other person also remembers and initiates.',value:1,dependency:1},
        {label:'I carry most of the remembering, planning, and emotional diplomacy.',value:3,dependency:3,tags:['social_manager']},
        {label:'I feel responsible for keeping both sides of the family and our social world functioning.',value:4,dependency:4,tags:['social_manager','relational_overload']}
      ]
    },
    {
      dimension:'emotional_relational',
      text:'When someone in the household is stressed, disappointed, or overwhelmed, what role do you usually take?',
      options:[
        {label:'Care is mutual; no one person is the automatic emotional regulator for everyone.',value:0,dependency:0},
        {label:'I support people often, but I can step back without the whole system depending on me.',value:1,dependency:1},
        {label:'I monitor moods, smooth tension, remember sensitivities, and adapt plans around other people’s feelings.',value:3,dependency:2,tags:['emotion_monitor']},
        {label:'I feel responsible for keeping everyone emotionally okay, even when I am already depleted.',value:4,dependency:3,tags:['emotion_monitor','emotional_overload']}
      ]
    }
  ];

  const BANDS = [
    {
      max:19,
      key:'shared',
      title:'Shared Ownership',
      summary:'Your answers suggest that invisible work is relatively distributed. You may still carry specific categories, but the household or relationship does not appear to depend heavily on you as the default manager.',
      next:[
        'Keep naming ownership clearly so shared responsibility does not drift back toward one person.',
        'Review overloaded categories during unusually busy periods instead of assuming the current split always stays fair.',
        'Protect the difference between “different method” and “unfinished responsibility.”'
      ]
    },
    {
      max:39,
      key:'drift',
      title:'Mostly Shared — With Some Default-Manager Drift',
      summary:'The system is not fully one-sided, but a few recurring areas are starting to rely on your noticing, planning, or reminders more than the visible task split suggests.',
      next:[
        'Identify the one category where you most often become the reminder or planner.',
        'Transfer that category as full ownership rather than assigning individual tasks.',
        'Check again after two weeks: did your brain actually get to stop tracking it?'
      ]
    },
    {
      max:59,
      key:'coordinator',
      title:'Quiet Coordinator',
      summary:'You are carrying a meaningful share of the invisible system. Other people may contribute visible work, but your attention is doing a lot of the noticing, coordination, and follow-through that makes the work happen.',
      next:[
        'Use the Ownership Test on three recurring categories: Notice → Plan → Decide → Do → Follow Up.',
        'Move at least one complete category—not just the “Do” step—to another owner.',
        'Stop measuring fairness only by chores; include planning, reminders, follow-up, and emotional maintenance.'
      ]
    },
    {
      max:79,
      key:'manager',
      title:'Default Manager',
      summary:'Your answers suggest that shared life depends heavily on you as the person who sees, organizes, remembers, delegates, and closes loops. This can create resentment even when other people are doing visible tasks.',
      next:[
        'Choose two high-load categories and explicitly transfer end-to-end ownership.',
        'Replace “help me with this” with “can you own this from noticing through follow-up?”',
        'Create one short weekly coordination check instead of dozens of reminders throughout the week.'
      ]
    },
    {
      max:100,
      key:'overloaded',
      title:'Overloaded System',
      summary:'Your answers suggest that you are carrying both a large amount of invisible work and a high level of management dependency. The issue is not simply that you are busy; too much of the system may rely on your brain to function.',
      next:[
        'Reduce load before optimizing it: identify what can be dropped, delayed, automated, or fully transferred.',
        'Have a direct ownership conversation focused on recurring systems, not one-off chores.',
        'If repeated clear requests produce no durable participation, treat that as a willingness or capacity problem—not a wording problem.'
      ]
    }
  ];

  const MAXIMA = {};
  Object.keys(DIMENSIONS).forEach(k=>MAXIMA[k]=0);
  QUESTIONS.forEach(q=>{MAXIMA[q.dimension]+=4;});

  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function classify(score){return BANDS.find(b=>score<=b.max)||BANDS[BANDS.length-1];}

  function pairInsight(top2){
    const keys=top2.map(x=>x.key).sort().join('|');
    const map={
      'notice_anticipate|plan_coordinate':'Your biggest load is upstream: seeing what is coming and turning it into a plan before anyone else has to think about it.',
      'notice_anticipate|own_followthrough':'You are carrying both the first and last mile—spotting needs early and making sure they actually get finished.',
      'emotional_relational|notice_anticipate':'Your attention is split between practical anticipation and tracking the emotional/social system around you.',
      'own_followthrough|plan_coordinate':'You are functioning like the operations manager: planning the work, then monitoring it until the loop is closed.',
      'emotional_relational|plan_coordinate':'You are coordinating both logistics and people, which can make shared life feel like a constant management role.',
      'emotional_relational|own_followthrough':'You are carrying completion plus relational maintenance—making sure tasks close and people stay connected.'
    };
    return map[keys]||'Your strongest dimensions show where invisible responsibility is clustering. The useful next step is to transfer ownership in the areas that keep your brain permanently “on.”';
  }

  function scoreAnswers(answers){
    const raw={notice_anticipate:0,plan_coordinate:0,own_followthrough:0,emotional_relational:0};
    let dependencyTotal=0, dependencyMax=0;
    const tags={};

    answers.forEach((answerIndex,i)=>{
      const q=QUESTIONS[i];
      const opt=q.options[answerIndex];
      if(!opt)return;
      raw[q.dimension]+=opt.value||0;
      dependencyTotal+=opt.dependency||0;
      dependencyMax+=4;
      (opt.tags||[]).forEach(t=>tags[t]=(tags[t]||0)+1);
    });

    const dims=Object.keys(DIMENSIONS).map(key=>{
      const pct=MAXIMA[key]?Math.round((raw[key]/MAXIMA[key])*100):0;
      return {key,label:DIMENSIONS[key].label,short:DIMENSIONS[key].short,weight:DIMENSIONS[key].weight,pct,raw:raw[key]};
    });

    const score=Math.round(dims.reduce((sum,d)=>sum+d.pct*d.weight,0));
    const dependency=dependencyMax?Math.round((dependencyTotal/dependencyMax)*100):0;
    const top2=[...dims].sort((a,b)=>b.pct-a.pct).slice(0,2);
    const spread=top2[0].pct-top2[1].pct;
    const clarity=spread>=25?'one dimension clearly leads':spread>=10?'one dimension leads somewhat':'your load is spread across multiple dimensions';

    return {
      score:clamp(score,0,100),
      dependency:clamp(dependency,0,100),
      band:classify(score),
      dims,
      top2,
      tags,
      clarity
    };
  }

  function dependencyCopy(value){
    if(value<20)return 'Low management dependency: shared life appears able to keep moving without one person constantly assigning or reminding.';
    if(value<40)return 'Some management dependency: a few systems still lean on you for prompts, reminders, or coordination.';
    if(value<60)return 'Moderate management dependency: several responsibilities depend on your brain to stay organized.';
    if(value<80)return 'High management dependency: other people may help, but the system still relies heavily on you to direct or close loops.';
    return 'Very high management dependency: if you stopped managing, multiple parts of shared life would likely stall or break down.';
  }

  function resultMarkup(r){
    const cards=r.top2.map(d=>
      '<div class="ml-dim-card"><div class="ml-dim-head"><strong>'+escapeHtml(d.label)+'</strong><span>'+d.pct+'%</span></div>'+
      '<div class="ml-meter"><span style="width:'+d.pct+'%"></span></div><p>'+escapeHtml(d.short)+'</p></div>'
    ).join('');

    const overload=r.tags.cognitive_overload||r.tags.emotional_overload||r.tags.high_dependency;
    const alert=overload?'<div class="ml-alert"><strong>Load signal:</strong> Your answers include signs that the management role is consuming rest, emotional capacity, or the ability to step away. That matters even if the visible chore split looks “fair.”</div>':'';

    return '<div class="ml-result-head"><div><div class="ml-eyebrow">Your result</div><h2>'+escapeHtml(r.band.title)+'</h2></div>'+
      '<div class="ml-score" aria-label="Mental Load Score '+r.score+' out of 100"><strong>'+r.score+'</strong><span>/100</span></div></div>'+
      '<p class="ml-result-summary">'+escapeHtml(r.band.summary)+'</p>'+
      '<div class="ml-dependency"><strong>Management Dependency: '+r.dependency+'/100</strong><p>'+escapeHtml(dependencyCopy(r.dependency))+'</p></div>'+
      '<p class="ml-note"><strong>Mental Load Score:</strong> an original weighted reflection score—not a diagnosis, validated scale, or clinical cutoff. It estimates how concentrated invisible responsibility is across this questionnaire.</p>'+
      alert+
      '<h3>Your two strongest dimensions</h3><div class="ml-dim-grid">'+cards+'</div>'+
      '<div class="ml-insight"><strong>What this combination means:</strong> '+escapeHtml(pairInsight(r.top2))+'</div>'+
      '<h3>What to do next</h3><ol class="ml-next">'+r.band.next.map(x=>'<li>'+escapeHtml(x)+'</li>').join('')+'</ol>'+
      '<div class="ml-result-actions"><a class="btn" href="/blog/mental-load-in-relationships/">Read the Mental Load guide</a><button type="button" class="btn secondary" id="mlRetake">Retake test</button></div>'+
      '<p class="ml-note">Pattern clarity: <strong>'+escapeHtml(r.clarity)+'</strong>. This only describes the distribution of your answers inside this questionnaire.</p>';
  }

  function init(){
    const root=document.getElementById('mentalLoadQuiz');
    if(!root)return;
    let state={index:0,answers:new Array(QUESTIONS.length).fill(null)};
    root.innerHTML='<section class="ml-test-card" aria-label="Mental Load Test"><div class="ml-test-top"><span id="mlProgressText">Question 1 of '+QUESTIONS.length+'</span><button type="button" class="ml-back" id="mlBack" disabled>Back</button></div><progress id="mlProgress" value="1" max="'+QUESTIONS.length+'" aria-label="Test progress"></progress><h2 id="mlQuestion"></h2><div id="mlOptions" class="ml-options"></div></section><section id="mlResult" class="ml-result" hidden aria-live="polite"></section>';

    const qEl=document.getElementById('mlQuestion');
    const optsEl=document.getElementById('mlOptions');
    const progressEl=document.getElementById('mlProgress');
    const progressText=document.getElementById('mlProgressText');
    const backBtn=document.getElementById('mlBack');
    const resultEl=document.getElementById('mlResult');
    const testCard=root.querySelector('.ml-test-card');

    function paint(){
      const q=QUESTIONS[state.index];
      progressText.textContent='Question '+(state.index+1)+' of '+QUESTIONS.length;
      progressEl.value=state.index+1;
      qEl.textContent=q.text;
      optsEl.innerHTML='';
      q.options.forEach((opt,optionIndex)=>{
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='ml-option';
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
      const retake=document.getElementById('mlRetake');
      if(retake)retake.addEventListener('click',reset);
      try{sessionStorage.setItem('mentalLoadTestResult',JSON.stringify({answers:state.answers,result,savedAt:Date.now()}));}catch(e){}
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

    backBtn.addEventListener('click',()=>{if(state.index>0){state.index-=1;paint();}});
    paint();
  }

  window.MENTAL_LOAD_TEST_ENGINE={questions:QUESTIONS,dimensions:DIMENSIONS,maxima:MAXIMA,scoreAnswers,classify};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
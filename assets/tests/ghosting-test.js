/* ghosting-test.js — original 15-question educational self-reflection test */
(function(global){
  'use strict';

  const DIMENSIONS={
    closure:{label:'Direct closure tolerance',short:'How well you can tolerate the discomfort of saying no, ending contact, or giving a clear answer instead of disappearing.',weight:0.28},
    overload:{label:'Communication overload',short:'How strongly unread messages, response pressure, guilt, and decision fatigue push you toward avoidance.',weight:0.24},
    closeness:{label:'Retreat after closeness',short:'How likely connection, interest, or emotional expectation is to trigger distance once another person feels real and reachable.',weight:0.24},
    accountability:{label:'Relational accountability',short:'How much you keep the other person’s need for clarity in mind when ending or reducing contact.',weight:0.24}
  };

  const QUESTIONS=[
    {
      dimension:'overload',pressure:true,
      text:'You notice a message from someone you like that you meant to answer three days ago. What happens next?',
      options:[
        {label:'I answer now, briefly if needed, instead of waiting for the perfect reply.',value:0,recovery:2,tags:['late_reply_repair','direct_contact']},
        {label:'I feel awkward about the delay, but I can usually send a simple “sorry—this got away from me.”',value:1,recovery:2,tags:['late_reply_repair','overload']},
        {label:'The longer I wait, the more embarrassing it feels, so I keep postponing the reply.',value:3,recovery:0,tags:['delay_spiral','overload']},
        {label:'By that point I often decide it is easier to let the conversation die than explain the silence.',value:4,recovery:0,tags:['disappear','delay_spiral']}
      ]
    },
    {
      dimension:'closure',pressure:false,
      text:'After two dates, you know you do not want to continue. Which response is most like you?',
      options:[
        {label:'I send a short, respectful message saying I do not feel the match I am looking for.',value:0,recovery:2,tags:['direct_closure']},
        {label:'I may take a day to find the words, but I still send a clear answer.',value:1,recovery:2,tags:['direct_closure','delay']},
        {label:'I become slower and less warm and hope they understand without me having to reject them directly.',value:3,recovery:0,tags:['slow_fade','conflict_avoidance']},
        {label:'I stop replying once I have decided I am done; continuing the conversation feels unnecessary.',value:4,recovery:0,tags:['disappear','closure_avoidance']}
      ]
    },
    {
      dimension:'overload',pressure:false,
      text:'Your phone has several unread chats from friends, family, and someone you are dating. What best describes your pattern?',
      options:[
        {label:'I triage them and answer the important ones, even if the replies are short.',value:0,recovery:2,tags:['message_management']},
        {label:'I can fall behind, but I usually tell people when I am overloaded.',value:1,recovery:2,tags:['message_management','overload']},
        {label:'I open fewer messages because seeing them makes the pressure worse.',value:3,recovery:0,tags:['overload','avoid_inbox']},
        {label:'Once I feel buried, entire conversations can disappear from my life without a real decision.',value:4,recovery:0,tags:['overload','unintentional_ghosting']}
      ]
    },
    {
      dimension:'closure',pressure:true,
      text:'Someone messages, “Did I do something? You suddenly got distant.” You are no longer interested. Your instinct is…',
      options:[
        {label:'Answer the actual question kindly and clearly, without blaming them for asking.',value:0,recovery:2,tags:['direct_closure','accountability']},
        {label:'Reply, but keep it brief because I do not want a long emotional conversation.',value:1,recovery:2,tags:['direct_closure','boundary']},
        {label:'Avoid opening it because any reply feels like the start of a conversation I do not want.',value:3,recovery:0,tags:['conflict_avoidance','avoid_inbox']},
        {label:'Leave it unanswered because I think my distance already communicates the answer.',value:4,recovery:0,tags:['closure_avoidance','assume_hint']}
      ]
    },
    {
      dimension:'closeness',pressure:true,
      text:'A connection has been going well, and the other person starts showing clear interest in seeing you more. What can happen inside you?',
      options:[
        {label:'I can enjoy the interest and still set the pace I want directly.',value:0,recovery:2,tags:['closeness_tolerance']},
        {label:'I sometimes need a little space, but I can explain that without disappearing.',value:1,recovery:2,tags:['clean_space']},
        {label:'I suddenly notice doubts, flaws, or reasons I am too busy once their interest becomes obvious.',value:3,recovery:0,tags:['deactivation','distance_after_closeness']},
        {label:'Their interest can make me want to vanish, even when I liked them before it became emotionally real.',value:4,recovery:0,tags:['closeness_retreat','disappear']}
      ]
    },
    {
      dimension:'accountability',pressure:false,
      text:'When you imagine sending a rejection or ending message, which thought feels most familiar?',
      options:[
        {label:'“It may disappoint them, but clarity is usually kinder than leaving them guessing.”',value:0,recovery:2,tags:['empathy','direct_closure']},
        {label:'“I should be clear, but I do not owe a long explanation.”',value:1,recovery:2,tags:['empathy','boundary']},
        {label:'“If I say nothing, they will eventually get it and we can both avoid an awkward moment.”',value:3,recovery:0,tags:['assume_hint','moral_distance']},
        {label:'“If the connection was not serious to me, I do not really see why I owe them closure.”',value:4,recovery:0,tags:['low_accountability','moral_distance']}
      ]
    },
    {
      dimension:'closure',pressure:true,
      text:'A friend brings up a conflict and wants to talk it through. You already feel done with the friendship. What do you tend to do?',
      options:[
        {label:'Tell them I do not want to continue the friendship, even if the conversation is uncomfortable.',value:0,recovery:2,tags:['direct_closure']},
        {label:'Set a limit on the conversation but still give a clear answer about where I stand.',value:1,recovery:2,tags:['boundary','direct_closure']},
        {label:'Become increasingly unavailable and let the friendship fade rather than name the ending.',value:3,recovery:0,tags:['slow_fade','conflict_avoidance']},
        {label:'Stop responding because I do not want to negotiate or explain my decision.',value:4,recovery:0,tags:['disappear','closure_avoidance']}
      ]
    },
    {
      dimension:'overload',pressure:true,
      text:'You see a notification from someone you have already delayed replying to. What makes the silence continue?',
      options:[
        {label:'Nothing—I would rather send an imperfect response than make the silence bigger.',value:0,recovery:2,tags:['late_reply_repair']},
        {label:'A little guilt, but I can usually tolerate it and answer.',value:1,recovery:2,tags:['late_reply_repair','guilt']},
        {label:'Guilt turns the message into a bigger task: now I need an apology, an explanation, and the perfect wording.',value:3,recovery:0,tags:['delay_spiral','guilt']},
        {label:'The guilt itself becomes a reason to avoid the person completely.',value:4,recovery:0,tags:['delay_spiral','unintentional_ghosting']}
      ]
    },
    {
      dimension:'accountability',pressure:false,
      text:'On a dating app, you have several conversations and lose interest in one of them. How do you think about that person?',
      options:[
        {label:'Even if it is casual, I try not to leave a direct question or active plan hanging without an answer.',value:0,recovery:2,tags:['empathy','casual_accountability']},
        {label:'I am less formal in early chats, but I try to be clear once there has been real momentum or a plan.',value:1,recovery:2,tags:['context_sensitive']},
        {label:'Early app conversations feel disposable enough that fading out seems normal to me.',value:3,recovery:0,tags:['low_investment','moral_distance']},
        {label:'I rarely think about what the silence feels like on their side if I have already moved on.',value:4,recovery:0,tags:['low_accountability','low_investment']}
      ]
    },
    {
      dimension:'closeness',pressure:true,
      text:'You genuinely like someone, but replying starts to feel heavier once they become emotionally important. Which pattern sounds closest?',
      options:[
        {label:'Importance may make me nervous, but I still communicate instead of using distance to regulate the feeling.',value:0,recovery:2,tags:['closeness_tolerance']},
        {label:'I may slow down briefly, then explain what is happening if I need space.',value:1,recovery:2,tags:['clean_space']},
        {label:'I reply less because every message feels like it carries more expectation than before.',value:3,recovery:0,tags:['closeness_retreat','overload']},
        {label:'I can disappear from people I actually like because being expected, known, or needed starts to feel trapping.',value:4,recovery:0,tags:['closeness_retreat','disappear']}
      ]
    },
    {
      dimension:'accountability',pressure:true,
      text:'You come back after a week of silence and the other person says the disappearance hurt them. What do you do?',
      options:[
        {label:'Acknowledge the impact directly and explain without pretending the silence was nothing.',value:0,recovery:2,tags:['accountability','repair_after_silence']},
        {label:'Apologize briefly and tell them what I can realistically do differently next time.',value:1,recovery:2,tags:['repair_after_silence','boundary']},
        {label:'Focus mostly on why I was overwhelmed, because I do not want the silence treated like a moral failure.',value:3,recovery:0,tags:['defensive_context','impact_minimize']},
        {label:'Feel irritated that I am being asked to account for a period when I simply did not want to talk.',value:4,recovery:0,tags:['low_accountability','impact_minimize']}
      ]
    },
    {
      dimension:'closure',pressure:false,safety:true,
      text:'Someone repeatedly ignores your boundaries, frightens you, or makes contact feel unsafe. What best fits your view?',
      options:[
        {label:'I may block or cut contact without further explanation; safety does not require a closing conversation.',value:0,recovery:2,tags:['safety_exit']},
        {label:'If it feels safe, I might send one boundary message, but I do not believe I owe continued access.',value:0,recovery:2,tags:['safety_exit','boundary']},
        {label:'I would still feel obligated to keep explaining myself even if contact felt unsafe.',value:1,recovery:1,tags:['over_explain_safety']},
        {label:'I do not really distinguish safety-based blocking from disappearing because I dislike a difficult conversation.',value:3,recovery:0,tags:['context_blur']}
      ]
    },
    {
      dimension:'closeness',pressure:false,
      text:'A conversation has become more personal than you expected. You feel exposed afterward. What is most like you?',
      options:[
        {label:'I may feel vulnerable, but I do not need to punish the closeness with silence.',value:0,recovery:2,tags:['closeness_tolerance']},
        {label:'I take a little space and then resume contact normally.',value:1,recovery:2,tags:['clean_space']},
        {label:'I become slower and more detached until I feel like myself again.',value:3,recovery:0,tags:['distance_after_closeness','slow_fade']},
        {label:'I can feel an urge to disappear before the other person gets more access to me.',value:4,recovery:0,tags:['closeness_retreat','exposure_fear']}
      ]
    },
    {
      dimension:'overload',pressure:false,
      text:'You are unsure whether you want to continue seeing someone. What usually happens while you decide?',
      options:[
        {label:'I tell them I am uncertain instead of pretending certainty or vanishing.',value:0,recovery:2,tags:['uncertainty_tolerance','direct_contact']},
        {label:'I give myself a short amount of time, then communicate a decision.',value:1,recovery:2,tags:['decision_limit']},
        {label:'I keep delaying because replying feels like choosing, and I am not ready to choose.',value:3,recovery:0,tags:['decision_paralysis','delay_spiral']},
        {label:'Silence often becomes the decision before I consciously make one.',value:4,recovery:0,tags:['unintentional_ghosting','decision_paralysis']}
      ]
    },
    {
      dimension:'accountability',pressure:true,
      text:'Which sentence is closest to your real pattern when you want out of a connection?',
      options:[
        {label:'“I would rather tolerate one uncomfortable message than make someone interpret my disappearance.”',value:0,recovery:2,tags:['direct_closure','empathy']},
        {label:'“I keep endings brief, but I try to make them understandable.”',value:1,recovery:2,tags:['boundary','direct_closure']},
        {label:'“I usually hope distance communicates what I cannot make myself say.”',value:3,recovery:0,tags:['slow_fade','assume_hint']},
        {label:'“Once I am done internally, I often stop participating before the other person knows it ended.”',value:4,recovery:0,tags:['disappear','low_accountability']}
      ]
    }
  ];

  const BANDS=[
    {max:19,key:'direct',title:'Direct Communicator',summary:'Your answers show a low ghosting tendency. You may dislike awkward conversations, but you usually preserve clarity, direct endings, and a path back after delays.',next:[
      'Keep using short, clear closure rather than over-explaining.',
      'When overloaded, send a one-line holding message before guilt turns into avoidance.',
      'Keep distinguishing a healthy boundary or safety exit from disappearing to escape ordinary discomfort.'
    ]},
    {max:39,key:'occasional',title:'Occasional Avoidance',summary:'You usually communicate, but certain situations—overload, guilt, uncertainty, or unwanted emotional intensity—can push you toward delay or a soft fade.',next:[
      'Identify your fastest trigger: rejection discomfort, unread-message guilt, uncertainty, or closeness.',
      'Use a 24-hour rule for active conversations: reply briefly even if the full answer comes later.',
      'Practice one sentence of closure that does not invite debate.'
    ]},
    {max:59,key:'slow_fade',title:'Slow-Fade Risk',summary:'Your answers suggest that silence sometimes does work you would rather not do directly. You may not intend to ghost, but delay, reduced warmth, or uncertainty can gradually become an ending without a clear message.',next:[
      'Notice the moment a delayed reply becomes avoidance and answer before guilt compounds.',
      'Replace fading cues with one direct sentence about interest, capacity, or uncertainty.',
      'If closeness triggers the fade, name your need for pace instead of making the other person infer it.'
    ]},
    {max:79,key:'strong',title:'Strong Ghosting Pattern',summary:'Your answers show repeated use of distance, silence, or nonresponse to escape difficult endings, emotional expectation, or communication pressure. The pattern may bring immediate relief while leaving the other person without clear closure.',next:[
      'Create a personal rule: no disappearing from an active connection unless safety or boundary protection requires it.',
      'Use short closure messages; clarity does not require a long justification.',
      'If overwhelm is the driver, reduce message load and communicate capacity before the inbox becomes avoidance.'
    ]},
    {max:100,key:'automatic',title:'Automatic Disappearance Pattern',summary:'Ghosting appears to be a frequent default strategy in your answers. Once discomfort, closeness, guilt, or disinterest rises, ending contact without explanation may feel easier than tolerating the interpersonal moment of closure.',next:[
      'Pause before the silence becomes final and identify what you are escaping: conflict, guilt, intimacy, overload, or accountability.',
      'Send the smallest honest message that closes the ambiguity without opening a negotiation you do not want.',
      'If disappearing repeats across important relationships, consider working on avoidance, assertiveness, or emotional regulation with a qualified therapist.'
    ]}
  ];

  const MAX={}; Object.keys(DIMENSIONS).forEach(k=>MAX[k]=0);
  QUESTIONS.forEach(q=>MAX[q.dimension]+=Math.max(...q.options.map(o=>o.value||0)));

  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function band(score){return BANDS.find(x=>score<=x.max)||BANDS[BANDS.length-1];}

  function profile(score,dims,tags){
    const by=Object.fromEntries(dims.map(d=>[d.key,d]));
    if(score<30)return {key:'not_dominant',title:'Ghosting is not your main exit strategy',text:'You may delay or avoid occasionally, but your answers still preserve direct closure and repair more often than disappearance.'};
    if(by.overload.pct>=60 && by.overload.pct>=by.closure.pct && by.overload.pct>=by.closeness.pct)return {key:'overwhelmed',title:'Overwhelmed Delayer',text:'Your ghosting risk is driven less by wanting to erase people and more by message pressure, guilt, and replies becoming harder the longer you wait.'};
    if(by.closeness.pct>=60 && by.closeness.pct>=by.closure.pct)return {key:'closeness',title:'Closeness-Retreat Pattern',text:'Your answers suggest that distance becomes especially tempting after connection deepens or another person’s interest creates more emotional expectation.'};
    if(by.closure.pct>=60)return {key:'closure',title:'Conflict-Escape Pattern',text:'The hardest moment is direct closure itself. Silence or a slow fade can feel easier than delivering an answer that may disappoint someone.'};
    if(by.accountability.pct>=60)return {key:'accountability',title:'Low-Accountability Exit Pattern',text:'Your answers suggest that once you are done internally, the other person’s need for clarity may carry less weight than your wish to exit with minimal friction.'};
    return {key:'mixed',title:'Mixed Ghosting Pattern',text:'No single driver dominates. Overload, closure discomfort, closeness, and accountability all contribute depending on the context.'};
  }

  function pairInsight(top2,tags){
    const key=top2.map(x=>x.key).sort().join('|');
    const map={
      'closure|overload':'You are most vulnerable when a reply is both overdue and emotionally uncomfortable: guilt raises the cost of responding while closure avoidance makes silence feel easier.',
      'closeness|closure':'Your pattern combines difficulty ending things directly with a tendency to create distance when closeness becomes emotionally real.',
      'accountability|closure':'Once you decide internally that a connection is over, you may prioritize avoiding the awkward ending over making the ending legible to the other person.',
      'closeness|overload':'Emotional importance can make communication feel heavier. More meaning creates more response pressure, which can paradoxically produce more distance.',
      'accountability|overload':'Overload starts the silence, but lower accountability can help the silence become permanent because the other person’s uncertainty feels less urgent than your relief.',
      'accountability|closeness':'When closeness starts to feel costly, distance may be justified quickly enough that the other person’s need for explanation drops out of view.'
    };
    let extra='';
    if((tags.delay_spiral||0)>=2)extra+=' Delay-to-guilt spirals repeated across your answers.';
    if((tags.disappear||0)>=2)extra+=' Deliberate disappearance appeared more than once, not only accidental delay.';
    if((tags.safety_exit||0)>0)extra+=' Your answers also distinguished safety-based blocking from ordinary ghosting, which is important.';
    return (map[key]||'Your strongest dimensions show where silence is most likely to replace direct communication.')+extra;
  }

  function scoreAnswers(answers){
    const raw={closure:0,overload:0,closeness:0,accountability:0},tags={};
    let recovery=0,recoveryMax=0,intense=0,safety=0;
    answers.forEach((ix,i)=>{
      const q=QUESTIONS[i],o=q&&q.options[ix]; if(!o)return;
      raw[q.dimension]+=o.value||0;
      recovery+=o.recovery||0; recoveryMax+=2;
      if((o.value||0)>=4)intense++;
      (o.tags||[]).forEach(t=>{tags[t]=(tags[t]||0)+1;if(t==='safety_exit')safety++;});
    });
    const dims=Object.keys(DIMENSIONS).map(key=>{
      const pct=MAX[key]?Math.round((raw[key]/MAX[key])*100):0;
      return {key,label:DIMENSIONS[key].label,short:DIMENSIONS[key].short,weight:DIMENSIONS[key].weight,pct,raw:raw[key]};
    });
    const score=Math.round(dims.reduce((s,d)=>s+d.pct*d.weight,0));
    const top2=[...dims].sort((a,b)=>b.pct-a.pct).slice(0,2);
    const recoveryPct=recoveryMax?Math.round(recovery/recoveryMax*100):0;
    const b=band(score);
    const p=profile(score,dims,tags);
    return {score:clamp(score,0,100),band:b,profile:p,dims,top2,recoveryPct,tags,intense,safety,insight:pairInsight(top2,tags)};
  }

  function resultMarkup(r){
    const cards=r.top2.map(d=>'<div class="gst-dim-card"><div class="gst-dim-head"><strong>'+esc(d.label)+'</strong><span>'+d.pct+'%</span></div><div class="gst-meter"><span style="width:'+d.pct+'%"></span></div><p>'+esc(d.short)+'</p></div>').join('');
    const recovery=r.recoveryPct>=75?'You usually preserve a path back after delay or discomfort.':r.recoveryPct>=45?'You can repair after silence, but that ability becomes less reliable when discomfort rises.':'Once silence begins, your selected responses rarely showed a clear return or direct closure.';
    return '<section class="gst-result" aria-live="polite">'+
      '<div class="gst-result-head"><div><div class="gst-eyebrow">Your result</div><h2>'+esc(r.band.title)+'</h2><p>'+esc(r.band.summary)+'</p></div><div class="gst-score"><strong>'+r.score+'</strong><span>/100</span><small>ghosting pattern</small></div></div>'+
      '<div class="gst-profile"><strong>'+esc(r.profile.title)+'</strong><p>'+esc(r.profile.text)+'</p></div>'+
      '<div class="gst-signal-grid"><div><span>Recovery after silence</span><strong>'+r.recoveryPct+'%</strong><p>'+esc(recovery)+'</p></div><div><span>Strong disappearance responses</span><strong>'+r.intense+'</strong><p>How many scenarios used the most distancing option. Repetition matters more than one isolated answer.</p></div></div>'+
      (r.safety?'<div class="gst-safety"><strong>Safety context:</strong> Your answers recognized that blocking or ending contact without explanation can be appropriate when someone is threatening, coercive, or repeatedly violating boundaries. That was not scored like ordinary ghosting.</div>':'')+
      '<h3>Your strongest ghosting drivers</h3><div class="gst-dim-grid">'+cards+'</div>'+
      '<div class="gst-insight"><strong>How your answers combine</strong><p>'+esc(r.insight)+'</p></div>'+
      '<h3>What to do next</h3><ul class="gst-next">'+r.band.next.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+
      '<div class="gst-result-actions"><a class="btn" href="/blog/communication-needs/">Practice direct communication</a><a class="btn secondary" href="/tests/avoidant-attachment-test/">Compare avoidant attachment</a><button class="btn secondary" type="button" id="gstRetake">Retake</button></div>'+
      '<p class="gst-note">Educational self-reflection only. This test is not a diagnosis and is not a validated clinical instrument.</p>'+
      '</section>';
  }

  function mount(root){
    const answers=[]; let index=0;
    function renderQuestion(){
      const q=QUESTIONS[index];
      root.innerHTML='<section class="gst-test-card">'+
        '<div class="gst-test-top"><span>'+(index+1)+' / '+QUESTIONS.length+'</span><button class="gst-back" type="button" '+(index===0?'disabled':'')+'>Back</button></div>'+
        '<progress id="gstProgress" max="'+QUESTIONS.length+'" value="'+(index+1)+'"></progress>'+
        '<h2 id="gstQuestion">'+esc(q.text)+'</h2>'+
        '<div class="gst-options">'+q.options.map((o,i)=>'<button type="button" class="gst-option" data-choice="'+i+'">'+esc(o.label)+'</button>').join('')+'</div>'+
        '</section>';
      root.querySelectorAll('.gst-option').forEach(btn=>btn.addEventListener('click',()=>{
        answers[index]=Number(btn.dataset.choice);
        if(index<QUESTIONS.length-1){index++;renderQuestion();}else renderResult();
      }));
      const back=root.querySelector('.gst-back'); if(back)back.addEventListener('click',()=>{if(index>0){index--;renderQuestion();}});
    }
    function renderResult(){
      const r=scoreAnswers(answers);
      root.innerHTML=resultMarkup(r);
      root.scrollIntoView({behavior:'smooth',block:'start'});
      const retake=root.querySelector('#gstRetake'); if(retake)retake.addEventListener('click',()=>{answers.length=0;index=0;renderQuestion();});
    }
    renderQuestion();
  }

  const ENGINE={questions:QUESTIONS,dimensions:DIMENSIONS,bands:BANDS,maxima:MAX,scoreAnswers};
  global.GHOSTING_TEST_ENGINE=ENGINE;
  if(typeof module!=='undefined'&&module.exports)module.exports=ENGINE;
  if(typeof document!=='undefined'){
    const boot=()=>{const root=document.getElementById('ghostingQuiz');if(root)mount(root);};
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  }
})(typeof globalThis!=='undefined'?globalThis:this);
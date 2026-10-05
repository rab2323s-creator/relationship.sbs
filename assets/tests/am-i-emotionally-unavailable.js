/* am-i-emotionally-unavailable.js */
(function(global){
'use strict';
const D={
 access:{label:'Emotional access',short:'How easily you notice, name, and stay connected to your own feelings.',weight:.25},
 disclosure:{label:'Vulnerability & receiving support',short:'How available your inner world is to someone close—and whether support can reach you.',weight:.25},
 receptivity:{label:'Responsive presence',short:'How well you stay curious and emotionally present with another person’s feelings and needs.',weight:.25},
 repair:{label:'Repair & return',short:'Whether space becomes a clear path back to contact or quietly turns into avoidance.',weight:.25}
};
const Q=[
 {dimension:'access',pressure:true,text:'Someone you love says, “I feel like I can’t reach you lately.” What happens inside you first?',options:[
  {label:'I feel the sting, but I can stay curious and ask what moments made them feel that way.',value:0,repair:2,tags:['curiosity','contact']},
  {label:'I explain that I’ve been stressed, then try to come back to what they are experiencing.',value:1,repair:2,tags:['context_then_contact']},
  {label:'I start building a case for why I’m not distant—work, stress, everything I still do for them.',value:3,repair:0,tags:['defensive_explaining','intellectualize']},
  {label:'I mostly want the conversation to end; being asked for that much emotional access feels intrusive.',value:4,repair:0,tags:['shutdown','closeness_pressure']}
 ]},
 {dimension:'access',pressure:false,text:'After a difficult day, you finally get a quiet hour alone. Which experience is most familiar?',options:[
  {label:'I can usually tell what I’m feeling, even if I do not know what to do about it yet.',value:0,repair:2,tags:['emotion_naming']},
  {label:'I need time, music, movement, or silence before the feeling becomes clear, but it usually does.',value:1,repair:2,tags:['slow_access']},
  {label:'I mostly replay facts and conversations; the feeling itself stays vague or arrives much later.',value:3,repair:0,tags:['intellectualize','delayed_feeling']},
  {label:'I prefer not to look too closely. If I keep moving, the feeling usually goes quiet enough.',value:4,repair:0,tags:['suppression','stay_busy']}
 ]},
 {dimension:'disclosure',pressure:false,text:'You are struggling and someone close says, “You don’t have to handle this alone. Tell me what you need.” Your instinct is…',options:[
  {label:'Let them in and ask for one concrete kind of support.',value:0,repair:2,tags:['receive_support','direct_need']},
  {label:'Share part of it first and see whether the conversation feels safe enough to go deeper.',value:1,repair:2,tags:['paced_disclosure']},
  {label:'Say I’m fine or “just tired” because explaining it feels harder than dealing with it myself.',value:3,repair:0,tags:['self_reliance','protective_buffering']},
  {label:'Feel uncomfortable that they are trying to get inside something I would rather keep entirely private.',value:4,repair:0,tags:['support_rejection','private_inner_world']}
 ]},
 {dimension:'receptivity',pressure:true,text:'Your partner is visibly upset about something you partly disagree with. What is hardest for you?',options:[
  {label:'I can disagree with their interpretation and still stay with the emotion underneath it.',value:0,repair:2,tags:['validation','dual_perspective']},
  {label:'I may correct one detail too quickly, but I can usually notice that and return to listening.',value:1,repair:2,tags:['self_correction','validation']},
  {label:'I get focused on what is factually wrong, exaggerated, or unfair before I can respond to how they feel.',value:3,repair:0,tags:['logic_first','emotion_bypass']},
  {label:'Strong emotion makes me shut down, become irritated, or feel that the whole conversation is too much.',value:4,repair:0,tags:['shutdown','emotion_overload']}
 ]},
 {dimension:'disclosure',pressure:true,text:'After a weekend or conversation that made you feel unusually close to someone, what tends to happen next?',options:[
  {label:'The closeness can stay real without me needing to intensify it or escape it.',value:0,repair:2,tags:['closeness_tolerance']},
  {label:'I enjoy it, but I usually need a little ordinary space afterward to reset.',value:1,repair:2,tags:['clean_space']},
  {label:'I notice flaws, feel suddenly less certain, or become busier than usual once the closeness settles in.',value:3,repair:0,tags:['deactivation','distance_after_closeness']},
  {label:'I feel exposed and want distance quickly, as if being that known gives the other person too much access to me.',value:4,repair:0,tags:['closeness_pressure','exposure_fear']}
 ]},
 {dimension:'disclosure',pressure:false,text:'Someone asks, “What do you actually need from me in this relationship?” Which answer is closest to your real pattern?',options:[
  {label:'I can usually name a need directly, even if asking for it feels vulnerable.',value:0,repair:2,tags:['direct_need','vulnerability']},
  {label:'I know roughly what I need, but I sometimes soften it or need time to find the words.',value:1,repair:2,tags:['paced_disclosure']},
  {label:'I often know what I do not want before I know what I actually need.',value:3,repair:0,tags:['need_uncertainty','self_reliance']},
  {label:'Needing things from another person feels dangerous enough that I would rather expect very little.',value:4,repair:0,tags:['need_denial','dependency_distrust']}
 ]},
 {dimension:'receptivity',pressure:true,text:'During conflict, someone gives you a specific example of how your behavior affected them. Your first move is usually…',options:[
  {label:'Try to understand the impact before deciding what I agree or disagree with.',value:0,repair:2,tags:['impact_focus','curiosity']},
  {label:'Explain my intention briefly, then make myself return to the impact.',value:1,repair:2,tags:['context_then_contact','self_correction']},
  {label:'Explain the context in detail because being misunderstood feels more urgent than their hurt.',value:3,repair:0,tags:['defensive_explaining','intellectualize']},
  {label:'Feel cornered and either go cold, counterattack, or stop engaging with the conversation.',value:4,repair:0,tags:['shutdown','counter_distance']}
 ]},
 {dimension:'repair',pressure:true,text:'You are overwhelmed in an argument and genuinely need space. What does your version of “space” usually look like?',options:[
  {label:'I say I need a pause and give a realistic time when I will come back.',value:0,repair:2,tags:['clean_space','return_time']},
  {label:'I ask for space clearly, though I may need a reminder to reconnect when I said I would.',value:1,repair:1,tags:['clean_space','delayed_return']},
  {label:'I pull away first and explain later, once I feel regulated enough to talk again.',value:3,repair:0,tags:['unannounced_distance','repair_delay']},
  {label:'Once I have distance, reopening the issue feels unnecessary; I would rather let normal life erase it.',value:4,repair:0,tags:['repair_avoidance','distance_relief']}
 ]},
 {dimension:'repair',pressure:false,text:'The morning after a conflict, the tension is gone but the issue was never resolved. What are you most likely to do?',options:[
  {label:'Bring it back up calmly because feeling better is not the same as repairing it.',value:0,repair:2,tags:['repair_return','accountability']},
  {label:'Wait for a good moment, but I usually do want a real ending to the conversation.',value:1,repair:2,tags:['repair_return','paced_repair']},
  {label:'Act warm and normal and hope that reconnecting indirectly is enough.',value:3,repair:0,tags:['warmth_without_repair','repair_avoidance']},
  {label:'Feel relieved it is over and resist anything that might bring the emotional intensity back.',value:4,repair:0,tags:['distance_relief','repair_avoidance']}
 ]},
 {dimension:'receptivity',pressure:false,text:'Someone you love asks for reassurance about the same insecurity for the third time this month. Which reaction is most like you?',options:[
  {label:'I can reassure them while also talking about how we can make the pattern more sustainable for both of us.',value:0,repair:2,tags:['reassurance','boundary_with_contact']},
  {label:'I feel a little tired, but I can usually answer with warmth before discussing limits.',value:1,repair:2,tags:['reassurance','measured_limit']},
  {label:'I start feeling responsible for an emotion I cannot fix and become noticeably less available.',value:3,repair:0,tags:['support_fatigue','emotional_distance']},
  {label:'I feel trapped by repeated emotional needs and want them to handle it without involving me.',value:4,repair:0,tags:['support_rejection','emotion_burden']}
 ]},
 {dimension:'access',pressure:true,text:'Something important hurts you, but the other person does not notice. What happens most often?',options:[
  {label:'I identify what hurt and tell them directly once I am calm enough.',value:0,repair:2,tags:['emotion_naming','direct_need']},
  {label:'I need some time to understand it, but I can usually bring it up later.',value:1,repair:2,tags:['slow_access','delayed_disclosure']},
  {label:'I tell myself it should not matter and become quieter or more distant without really naming why.',value:3,repair:0,tags:['minimize_need','indirect_distance']},
  {label:'I disconnect from the hurt so thoroughly that by the time they ask, I genuinely do not want to discuss it.',value:4,repair:0,tags:['shutdown','suppression']}
 ]},
 {dimension:'repair',pressure:false,text:'Which sentence about closeness and conflict feels most true of you over time?',options:[
  {label:'Even when I need space, I want the relationship to understand what happened and find its way back.',value:0,repair:2,tags:['repair_orientation']},
  {label:'I value repair, but I need a slower pace than some people do.',value:1,repair:2,tags:['paced_repair']},
  {label:'Once the intensity passes, talking about it again often feels like creating a problem that no longer exists.',value:3,repair:0,tags:['repair_avoidance','distance_relief']},
  {label:'I feel safest when emotional problems stay contained inside each person rather than becoming shared relationship material.',value:4,repair:0,tags:['private_inner_world','repair_avoidance']}
 ]}
];
const MAX={};Object.keys(D).forEach(k=>MAX[k]=0);Q.forEach(q=>MAX[q.dimension]+=4);
const B=[
 {max:19,title:'High Emotional Unavailability Pattern',summary:'Your answers suggest that emotional access often closes before needs, vulnerability, responsive presence, or repair can fully enter the relationship.',next:['Start with one skill: name the feeling before explaining the facts.','Do not use relief after distance as evidence that the issue no longer matters.','If important relationships repeatedly describe you as unreachable, consider structured support to build emotional access and repair.']},
 {max:39,title:'Strong Emotional Unavailability Pattern',summary:'Distance, self-reliance, shutdown, or avoidance of repair appear often across your answers. Closeness may be possible, but difficult to sustain when emotional pressure rises.',next:['Practice small doses of receiving support instead of handling everything alone.','When you need distance, say what is happening and when you will return.','Consider professional support if emotional shutdown feels automatic or costly across relationships.']},
 {max:59,title:'Inconsistent Emotional Availability',summary:'Your answers show meaningful capacity for closeness, but access, vulnerability, responsiveness, or repair becomes unreliable often enough to affect relationships.',next:['Track where the pattern breaks: feeling, sharing, receiving, or returning.','Replace one protective strategy with a specific request or feeling statement.','Measure progress by repeated behavior, not one unusually open conversation.']},
 {max:79,title:'Mostly Available, With Protective Edges',summary:'You are generally emotionally reachable, but certain situations—criticism, repeated need, intense closeness, or conflict—can narrow your range.',next:['Name the trigger that makes availability drop fastest.','Use one direct sentence before moving into explanation or distance.','Keep a clear return time when you need space.']},
 {max:100,title:'Strong Emotional Availability',summary:'Your answers show steady access to your feelings, openness to support, responsive presence, and a reliable path back after conflict.',next:['Keep using direct emotional language before stress forces you into guesswork.','Protect your ability to take space without disappearing from repair.','Notice which relationships make availability easier so you can recognize healthy conditions.']}
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=n=>Math.max(0,Math.min(100,n));
function scoreAnswers(a){
 const raw={access:0,disclosure:0,receptivity:0,repair:0},tags={};let rs=0,rm=0,pr=0,pm=0,br=0,bm=0,intense=0;
 a.forEach((ix,i)=>{const q=Q[i],o=q.options[ix];raw[q.dimension]+=o.value;rs+=o.repair;rm+=2;if(o.value===4)intense++;if(q.pressure){pr+=o.value;pm+=4}else{br+=o.value;bm+=4}(o.tags||[]).forEach(t=>tags[t]=(tags[t]||0)+1)});
 const dims=Object.keys(D).map(k=>({key:k,label:D[k].label,short:D[k].short,pct:Math.round(100-(raw[k]/MAX[k])*100)}));
 const score=Math.round(dims.reduce((s,d)=>s+d.pct*.25,0)),band=B.find(b=>score<=b.max)||B[4];
 const sorted=[...dims].sort((a,b)=>b.pct-a.pct),low=[...dims].sort((a,b)=>a.pct-b.pct);
 const pressure=pm?Math.round(100-(pr/pm)*100):100,baseline=bm?Math.round(100-(br/bm)*100):100,gap=Math.max(0,baseline-pressure),repairPct=rm?Math.round(rs/rm*100):0;
 let profile='Context-dependent availability',profileText='Your pattern is mixed rather than global. Certain triggers reduce emotional access more than others.';
 const by=Object.fromEntries(dims.map(x=>[x.key,x]));
 if(score>=70){profile='Emotionally reachable';profileText='Your answers show broad access to feelings, support, responsiveness, and repair.'}
 else if(by.disclosure.pct<45){profile='Private inner world';profileText='The clearest break is around vulnerability, receiving support, and letting someone else see what you need.'}
 else if(by.receptivity.pct<45){profile='Emotionally present until someone needs access';profileText='Your own feelings may be available, but another person’s strong emotion can trigger logic, irritation, or distance.'}
 else if(by.repair.pct<45){profile='Connection without enough repair';profileText='The clearest break happens after tension: relief and space can replace an explicit return to the unfinished issue.'}
 else if(by.access.pct<45){profile='Feelings go offline before words arrive';profileText='The main difficulty appears earlier: recognizing and staying connected to your own emotional state.'}
 else if(gap>=18){profile='Available until pressure rises';profileText='Your baseline capacity is stronger than your conflict-state capacity.'}
 let insight='Your two lowest dimensions show where emotional availability most often breaks down.';
 const key=low.slice(0,2).map(x=>x.key).sort().join('|');
 const map={
 'access|disclosure':'Feelings can be hard to locate, and even harder to let another person into once you do locate them.',
 'access|receptivity':'When emotion becomes intense—yours or theirs—analysis, correction, or shutdown may arrive before emotional contact.',
 'access|repair':'The pattern may start with losing contact with your own feeling and end with avoiding the conversation that would require you to recover it.',
 'disclosure|receptivity':'Closeness is difficult in both directions: letting someone reach you and staying open when they need emotional access to you.',
 'disclosure|repair':'You may keep vulnerable material private and then rely on distance after conflict, leaving important emotional information outside the relationship twice.',
 'receptivity|repair':'Your biggest challenge appears when the relationship needs you to stay present through another person’s emotion and then return after conflict.'
 };
 insight=map[key]||insight;
 if((tags.intellectualize||0)+(tags.logic_first||0)>=2)insight+=' Thinking appears to become a fast route away from feeling.';
 if((tags.repair_avoidance||0)+(tags.repair_delay||0)>=2)insight+=' Repair avoidance repeats, so the return after space is a high-value place to practice change.';
 return {score,band,dims,strengths:sorted.slice(0,2),growth:low[0],pressure,baseline,gap,repairPct,intense,profile,profileText,insight};
}
function markup(r){
 const cards=r.strengths.map(d=>'<div class="aeu-dim-card"><div class="aeu-dim-head"><strong>'+esc(d.label)+'</strong><span>'+d.pct+'%</span></div><div class="aeu-meter"><span style="width:'+d.pct+'%"></span></div><p>'+esc(d.short)+'</p></div>').join('');
 const gap=r.gap>=18?'Your availability drops '+r.gap+' points in higher-pressure scenarios, suggesting that connection becomes harder to keep online when you feel exposed, criticized, needed, or overwhelmed.':r.gap>=8?'Your answers show a modest pressure effect: conflict narrows your range more than calm situations do.':'Your availability stays fairly similar across calm and higher-pressure situations.';
 return '<section class="aeu-result"><div class="aeu-result-head"><div><div class="aeu-eyebrow">Your result</div><h2>'+esc(r.band.title)+'</h2><p>'+esc(r.band.summary)+'</p></div><div class="aeu-score"><strong>'+r.score+'</strong><span>/100</span><small>availability</small></div></div><div class="aeu-profile"><strong>'+esc(r.profile)+'</strong><p>'+esc(r.profileText)+'</p></div><div class="aeu-signal-grid"><div><span>Availability under pressure</span><strong>'+r.pressure+'%</strong><p>'+esc(gap)+'</p></div><div><span>Repair signal</span><strong>'+r.repairPct+'%</strong><p>How often your choices preserved a clear path back to contact, accountability, or direct communication.</p></div></div>'+(r.intense>=3?'<div class="aeu-alert"><strong>Strong shutdown responses:</strong> '+r.intense+' answers used the most distancing option in that scenario.</div>':'')+'<h3>Your strongest dimensions</h3><div class="aeu-dim-grid">'+cards+'</div><div class="aeu-growth"><strong>Your growth edge: '+esc(r.growth.label)+' · '+r.growth.pct+'%</strong><p>'+esc(r.growth.short)+'</p></div><div class="aeu-insight"><strong>How your answers combine</strong><p>'+esc(r.insight)+'</p></div><h3>What to do next</h3><ul class="aeu-next">'+r.band.next.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><div class="aeu-result-actions"><a class="btn" href="/blog/emotional-unavailability/">Read the guide</a><a class="btn secondary" href="/tests/emotional-availability/">Test your partner’s availability</a><button class="btn secondary" id="aeuRetake" type="button">Retake</button></div><p class="aeu-note">Educational self-reflection only. This is not a diagnosis or validated clinical scale.</p></section>';
}
function mount(root){const a=[];let i=0;function q(){const x=Q[i];root.innerHTML='<section class="aeu-test-card"><div class="aeu-test-top"><span>'+(i+1)+' / '+Q.length+'</span><button class="aeu-back" '+(i===0?'disabled':'')+'>Back</button></div><progress id="aeuProgress" max="'+Q.length+'" value="'+(i+1)+'"></progress><h2 id="aeuQuestion">'+esc(x.text)+'</h2><div class="aeu-options">'+x.options.map((o,j)=>'<button type="button" class="aeu-option" data-choice="'+j+'">'+esc(o.label)+'</button>').join('')+'</div></section>';root.querySelectorAll('.aeu-option').forEach(b=>b.onclick=()=>{a[i]=+b.dataset.choice;if(i<Q.length-1){i++;q()}else r()});const back=root.querySelector('.aeu-back');if(back)back.onclick=()=>{if(i>0){i--;q()}}}function r(){root.innerHTML=markup(scoreAnswers(a));root.scrollIntoView({behavior:'smooth',block:'start'});root.querySelector('#aeuRetake').onclick=()=>{a.length=0;i=0;q()}}q()}
global.AM_I_EMOTIONALLY_UNAVAILABLE_TEST_ENGINE={questions:Q,dimensions:D,bands:B,maxima:MAX,scoreAnswers};
if(typeof module!=='undefined'&&module.exports)module.exports=global.AM_I_EMOTIONALLY_UNAVAILABLE_TEST_ENGINE;
if(typeof document!=='undefined'){const boot=()=>{const root=document.getElementById('amIEmotionallyUnavailableQuiz');if(root)mount(root)};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot):boot()}
})(typeof globalThis!=='undefined'?globalThis:this);
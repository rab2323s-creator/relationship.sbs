(function(){
const D=["visibility","contactGap","followGap","reentry","impact"];
const label={visibility:"Digital visibility",contactGap:"Direct contact gap",followGap:"Follow-through gap",reentry:"Intermittent re-entry",impact:"Ambiguity impact"};

const Q=[
["Think about the last few weeks. Where do you see this person most often now?",[
["Mostly in real conversations, calls, or plans—not just online.",{visibility:0,contactGap:0,followGap:0,reentry:0,impact:0}],
["Both: they interact online and we still have some meaningful direct contact.",{visibility:2,contactGap:1,followGap:1,reentry:1,impact:1}],
["Mostly in Story views, likes, reactions, or profile activity.",{visibility:4,contactGap:4,followGap:3,reentry:1,impact:2}],
["Almost entirely as a name in my notifications after direct contact faded or stopped.",{visibility:4,contactGap:4,followGap:4,reentry:2,impact:3}]
]],
["If you stop initiating direct contact, what tends to happen?",[
["They initiate on their own and keep the conversation going.",{contactGap:0,followGap:0,reentry:0}],
["They may take time, but eventually start a real conversation or make a plan.",{contactGap:1,followGap:1,reentry:1}],
["They stay visible online but rarely start a meaningful conversation.",{visibility:4,contactGap:4,followGap:3,reentry:1}],
["They disappear directly, then pop back up with a tiny reaction or low-effort ping.",{visibility:3,contactGap:4,followGap:4,reentry:4}]
]],
["They react to one of your Stories. What usually happens if you answer?",[
["It becomes a real back-and-forth conversation.",{visibility:1,contactGap:0,followGap:1,reentry:1}],
["We exchange a few messages, and sometimes it leads somewhere.",{visibility:2,contactGap:2,followGap:2,reentry:2}],
["They respond once or twice, then vanish again.",{visibility:3,contactGap:3,followGap:4,reentry:4}],
["The reaction seems to be the whole interaction; my reply gets little or nothing back.",{visibility:4,contactGap:4,followGap:4,reentry:3}]
]],
["When they do message after a quiet stretch, how much does it move the connection forward?",[
["A lot: they address the gap, ask to talk, or make a concrete plan.",{contactGap:0,followGap:0,reentry:1}],
["Some: the conversation is genuine, but direction is still uncertain.",{contactGap:2,followGap:2,reentry:2}],
["Very little: it is warm enough to restart hope but not enough to create a next step.",{contactGap:3,followGap:4,reentry:4,impact:3}],
["Not at all: it is usually a meme, emoji, 'hey,' or reaction followed by another disappearance.",{contactGap:4,followGap:4,reentry:4,impact:3}]
]],
["How does their social-media attention compare with their real conversation effort?",[
["Direct effort is equal to or greater than online attention.",{visibility:1,contactGap:0,followGap:0}],
["Online attention is somewhat higher, but meaningful contact still exists.",{visibility:2,contactGap:2,followGap:2}],
["Online attention is clearly higher than meaningful contact.",{visibility:4,contactGap:4,followGap:3}],
["The contrast is extreme: they can watch everything while saying almost nothing to me.",{visibility:4,contactGap:4,followGap:4,impact:3}]
]],
["After a breakup, ghosting, or clear pullback, what happened online?",[
["They also stepped back online, or we mutually reduced contact.",{visibility:0,contactGap:1,followGap:1,reentry:0}],
["They stayed connected online but interacted only occasionally.",{visibility:2,contactGap:2,followGap:2,reentry:1}],
["They kept watching or liking regularly despite little direct contact.",{visibility:4,contactGap:4,followGap:3,reentry:2,impact:2}],
["They became especially visible online after pulling away directly.",{visibility:4,contactGap:4,followGap:4,reentry:3,impact:4}]
]],
["When you make a concrete suggestion to meet or talk, what is the usual pattern?",[
["They engage directly: yes, no, or a real alternative time.",{contactGap:0,followGap:0}],
["They are inconsistent, but some plans do become real.",{contactGap:2,followGap:2}],
["They stay vague—'we should,' 'maybe soon,' 'I'm busy'—without rescheduling.",{contactGap:3,followGap:4,reentry:2}],
["They avoid the plan, then later reappear online as if the invitation never happened.",{visibility:3,contactGap:4,followGap:4,reentry:4}]
]],
["How often do they appear in your notifications without actually starting a meaningful conversation?",[
["Rarely or almost never.",{visibility:0,contactGap:0,reentry:0}],
["Occasionally, like many normal social-media connections.",{visibility:1,contactGap:1,reentry:1}],
["Regularly enough that I notice the pattern.",{visibility:3,contactGap:3,reentry:2,impact:2}],
["Very often; their digital presence is one of the main ways they remain in my life.",{visibility:4,contactGap:4,reentry:3,impact:4}]
]],
["If they send 'hey stranger,' a meme, or a reaction after silence, what follows?",[
["They stay present and the conversation develops naturally.",{contactGap:0,followGap:0,reentry:1}],
["There is some genuine contact, but consistency is still developing.",{contactGap:2,followGap:2,reentry:2}],
["A brief burst of warmth, then another quiet stretch.",{contactGap:3,followGap:4,reentry:4,impact:3}],
["Usually nothing substantial at all; the ping itself seems to be the point.",{contactGap:4,followGap:4,reentry:4,impact:3}]
]],
["What happens when you ask directly what they want?",[
["They answer clearly, even if the answer is not what I hoped for.",{contactGap:0,followGap:0,reentry:0}],
["They try to answer, but they are genuinely uncertain and their behavior mostly matches that.",{contactGap:2,followGap:2,reentry:1}],
["They give vague reassurance without changing the pattern.",{contactGap:3,followGap:4,reentry:3,impact:3}],
["They dodge, disappear, change the subject, or return later through social media instead.",{visibility:3,contactGap:4,followGap:4,reentry:4,impact:4}]
]],
["Which description best fits the direction of the connection?",[
["It is moving somewhere: more clarity, more contact, or real-world plans.",{contactGap:0,followGap:0,reentry:0}],
["Slow, but there is measurable progress.",{contactGap:1,followGap:1,reentry:1}],
["Mostly circular: attention returns, but the relationship stays in the same place.",{contactGap:3,followGap:4,reentry:4,impact:3}],
["There is no relationship direction—only recurring digital reminders that they still exist.",{visibility:4,contactGap:4,followGap:4,reentry:3,impact:4}]
]],
["How much does their online presence change what you post or how often you check viewers?",[
["Almost not at all.",{impact:0}],
["Sometimes I notice, but it does not steer my behavior.",{impact:1}],
["I catch myself posting, checking, or interpreting with them in mind fairly often.",{impact:3,visibility:1}],
["A lot; their views or absence can change my mood or restart hope.",{impact:4,visibility:1}]
]],
["If you removed Story views, likes, and reactions from the picture, how much connection would actually remain?",[
["A real connection would remain: messages, calls, plans, or ongoing conversation.",{visibility:1,contactGap:0,followGap:0}],
["Some connection would remain, though it might be inconsistent.",{visibility:2,contactGap:2,followGap:2}],
["Very little. Most of what keeps them present is digital activity.",{visibility:4,contactGap:4,followGap:3,impact:3}],
["Almost none. Without social media, I might barely know they were still paying attention.",{visibility:4,contactGap:4,followGap:4,impact:4}]
]],
["When they show interest, is it followed by consistent behavior over the next several days?",[
["Usually yes. Interest has continuity.",{contactGap:0,followGap:0,reentry:0}],
["Sometimes. There is inconsistency, but also real follow-through.",{contactGap:2,followGap:2,reentry:2}],
["Rarely. Interest comes in bursts and then drops.",{contactGap:3,followGap:4,reentry:4,impact:3}],
["Almost never. The visible signal is much stronger than the relational effort afterward.",{visibility:4,contactGap:4,followGap:4,reentry:3}]
]],
["Looking at the whole pattern—not the most exciting notification—which sentence is closest to reality?",[
["They are actually trying to reconnect through direct, consistent effort.",{visibility:1,contactGap:0,followGap:0,reentry:1,impact:0}],
["They are still around online, but I do not have enough evidence to call it orbiting.",{visibility:2,contactGap:2,followGap:2,reentry:1,impact:1}],
["They keep the connection alive with occasional direct crumbs but little progression.",{visibility:3,contactGap:3,followGap:4,reentry:4,impact:3}],
["They remain highly visible digitally while avoiding the work of a real connection.",{visibility:4,contactGap:4,followGap:4,reentry:3,impact:4}]
]]
];

const profiles={
"no-orbiting":{title:"No Clear Orbiting Pattern",sub:"The evidence for orbiting is weak; direct behavior matters more than isolated online activity.",summary:"Your answers do not show the core orbiting pattern strongly enough: persistent digital visibility paired with a major collapse in direct contact and follow-through. Some online activity may simply be ordinary social-media behavior or part of an active connection.",next:["Keep judging the connection by direct behavior rather than viewer lists.","If you want clarity, look at initiation, plans, consistency, and follow-through.","Do not upgrade one like or Story view into evidence of hidden intent."]},
"passive-presence":{title:"Passive Digital Presence",sub:"They are still visible online, but the pattern is not strong enough to call classic orbiting.",summary:"There is noticeable online presence, but the direct-contact or follow-through gap is moderate rather than extreme. This can happen when people remain connected digitally after dating, friendship, or a breakup without actively trying to maintain a romantic bond.",next:["Treat passive views as low-information signals.","Watch whether direct contact increases or stays flat over time.","If the visibility keeps you stuck, reduce exposure even if the behavior is not clearly malicious."]},
"breadcrumb-crossover":{title:"Orbiting With Breadcrumb Crossover",sub:"The pattern includes small direct pings that reopen the connection without creating reliable progress.",summary:"Your answers show more than passive orbiting. This person appears to re-enter through messages, reactions, memes, or brief warmth, but those returns do not reliably become plans, clarity, or sustained contact. That resembles a crossover between orbiting and breadcrumbing.",next:["Judge each re-entry by what happens after the first message.","Do not count 'hey stranger' as progress until behavior changes.","If you want clarity, ask for one concrete next step instead of extending another indefinite text loop."]},
"classic-orbiting":{title:"Classic Orbiting Pattern",sub:"Digital visibility is high while meaningful direct contact and follow-through are low.",summary:"Your pattern closely matches what people usually mean by orbiting in dating: the person remains visible around your social media while avoiding or failing to sustain the behaviors that create an actual relationship. The quiz cannot tell you why they do it, but it can tell you that online attention is currently much stronger than relational investment.",next:["Stop treating digital visibility as proof of romantic intent.","Base decisions on direct contact, plans, repair, and follow-through.","If the pattern prolongs hope or distress, consider muting, unfollowing, restricting, or blocking for your own clarity."]},
"genuine-reconnection":{title:"Genuine Reconnection Signals",sub:"Their online attention is being matched by direct contact, clarity, and real follow-through.",summary:"Your answers do not fit classic orbiting because the person is doing more than staying visible. They are also communicating directly, sustaining contact, making or rescheduling plans, and moving the connection somewhere. That does not guarantee the relationship will work, but it is stronger evidence than passive social-media attention.",next:["Keep evaluating consistency over time rather than one good week.","Have direct conversations about what each of you wants.","Let plans and follow-through—not online visibility—remain the main evidence."]}
};

let i=0, answers=[];
const root=document.getElementById("orbitQuizRoot");

function calc(){
 const raw={visibility:0,contactGap:0,followGap:0,reentry:0,impact:0};
 const max={visibility:0,contactGap:0,followGap:0,reentry:0,impact:0};
 answers.forEach((a,qi)=>{
  const opts=Q[qi][1], chosen=opts[a][1];
  D.forEach(d=>{
   if(Object.prototype.hasOwnProperty.call(chosen,d))raw[d]+=chosen[d];
   let m=0;opts.forEach(o=>{if(Object.prototype.hasOwnProperty.call(o[1],d))m=Math.max(m,o[1][d])});max[d]+=m;
  });
 });
 const pct=Object.fromEntries(D.map(d=>[d,max[d]?Math.round(raw[d]/max[d]*100):0]));
 const overall=Math.round(pct.visibility*.30+pct.contactGap*.29+pct.followGap*.25+pct.reentry*.11+pct.impact*.05);
 const strong=Object.entries(pct).sort((a,b)=>b[1]-a[1]).slice(0,2);
 let core;
 if(pct.contactGap<=30 && pct.followGap<=30 && answers[14]===0)core="genuine-reconnection";
 else if(pct.visibility>=68 && pct.contactGap>=65 && pct.followGap>=62 && pct.reentry<68)core="classic-orbiting";
 else if(pct.reentry>=67 && pct.followGap>=58 && pct.contactGap>=50)core="breadcrumb-crossover";
 else if(overall>=68 && pct.visibility>=60 && pct.contactGap>=55)core="classic-orbiting";
 else if(overall>=42 || (pct.visibility>=50 && pct.contactGap>=38))core="passive-presence";
 else core="no-orbiting";
 return{pct,overall,strong,core};
}
function renderQ(){
 const q=Q[i];
 root.innerHTML='<section class="card"><div class="row" style="justify-content:space-between;align-items:center"><span class="muted">'+(i+1)+' / '+Q.length+'</span><button id="orbitBack" class="btn small secondary" '+(i===0?'disabled':'')+'>Back</button></div><progress class="orbitProgress" value="'+(i+1)+'" max="'+Q.length+'"></progress><h2 style="margin:12px 0">'+q[0]+'</h2><div id="orbitOptions"></div></section>';
 document.getElementById("orbitBack").onclick=()=>{if(i>0){i--;renderQ()}};
 const box=document.getElementById("orbitOptions");
 q[1].forEach((o,idx)=>{const b=document.createElement("button");b.className="btn secondary orbitAnswer";b.textContent=o[0];b.onclick=()=>{answers[i]=idx;if(i<Q.length-1){i++;renderQ()}else renderResult()};box.appendChild(b)});
}
function renderResult(){
 const r=calc(),p=profiles[r.core];
 const bars=D.map(d=>'<div class="orbitBar"><span>'+label[d]+'</span><progress value="'+r.pct[d]+'" max="100"></progress><strong>'+r.pct[d]+'%</strong></div>').join("");
 const impactNote=r.pct.impact>=65?'<div class="orbitCall"><strong>Your ambiguity impact is high.</strong> Whatever their intention, the digital pattern appears to be taking up significant emotional space. Reducing exposure may help you get cleaner information from your own nervous system.</div>':'';
 root.innerHTML='<section class="card prose" id="orbitResult"><p class="small muted">Your personalized result</p><h2>'+p.title+'</h2><p><strong>'+p.sub+'</strong></p><div class="grid2"><div class="mini"><h3>Orbiting Pattern Score</h3><p style="font-size:28px;font-weight:900;margin:0">'+r.overall+' / 100</p><p class="small muted">Behavior-pattern score, not a motive detector.</p></div><div class="mini"><h3>Strongest signals</h3><p><strong>'+label[r.strong[0][0]]+'</strong> ('+r.strong[0][1]+'%)<br><strong>'+label[r.strong[1][0]]+'</strong> ('+r.strong[1][1]+'%)</p></div></div><p>'+p.summary+'</p>'+impactNote+'<h3>Your five-dimension profile</h3><div class="orbitBars">'+bars+'</div><h3>What to do next</h3><ol>'+p.next.map(x=>'<li>'+x+'</li>').join("")+'</ol><div class="row" style="flex-wrap:wrap"><a class="btn secondary" href="/tests/orbiting-dating-quiz/">Retake quiz</a><a class="btn secondary" href="/tests/orbiting-dating-quiz/results/'+r.core+'/">Open this result profile</a></div><p class="small muted" style="margin-top:14px">This original score has not been psychometrically validated. It cannot identify another person’s intentions and should not be treated as a diagnosis.</p></section>';
 document.getElementById("orbitResult").scrollIntoView({behavior:"smooth",block:"start"});
}
renderQ();
})();
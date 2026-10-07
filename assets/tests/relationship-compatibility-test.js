(function(){
const D=["values","communication","repair","trust","lifestyle","intimacy"];
const nice={values:"Values & future fit",communication:"Communication",repair:"Conflict & repair",trust:"Trust & reliability",lifestyle:"Lifestyle & autonomy",intimacy:"Affection & intimacy"};
const questions=[
["You discover that one of you definitely wants children and the other is genuinely unsure. What usually happens with big future differences like this?",[
["We talk about the real stakes, timelines, and what each person could or could not accept—even if the answer is uncomfortable.",{values:4,communication:4}],
["We can discuss it, but we tend to leave the hardest part for 'later.'",{values:2,communication:3}],
["One of us assumes the other will eventually change their mind.",{values:1,communication:1}],
["The topic becomes too threatening, so we avoid it or say what keeps the peace.",{values:0,communication:0}]
]],
["A disagreement starts getting heated. What best describes what happens next?",[
["We can pause or slow down without abandoning the issue, then return and work toward repair.",{repair:4,communication:4}],
["We get defensive, but usually reconnect and reach some workable understanding.",{repair:3,communication:2}],
["We repeat the same argument with temporary peace but little lasting change.",{repair:1,communication:1}],
["Conflict becomes contempt, shutdown, threats, intimidation, or days of punishment.",{repair:0,communication:0}]
]],
["One of you needs much more alone time than the other. How does the relationship handle that difference?",[
["We negotiate enough connection and enough independence so neither person has to disappear.",{lifestyle:4,communication:3}],
["It still causes friction, but we can usually make specific plans that feel fair.",{lifestyle:3,communication:2}],
["One person regularly gives up what they need to stop the other from becoming upset.",{lifestyle:1,communication:1}],
["Space is treated as rejection, or closeness is treated as control, and the issue stays unresolved.",{lifestyle:0,communication:0}]
]],
["When your partner promises something important—showing up, paying a bill, changing a repeated behavior—what is the pattern?",[
["Their follow-through is reliable enough that promises generally reduce uncertainty.",{trust:4,repair:3}],
["They miss sometimes, but they acknowledge it and repair without needing to be chased.",{trust:3,repair:3}],
["I often have to remind, monitor, or lower expectations to avoid disappointment.",{trust:1,repair:1}],
["Promises mostly appear during conflict and disappear once the pressure is gone.",{trust:0,repair:0}]
]],
["You picture your ideal life five years from now. How much do your two pictures fit?",[
["The major architecture fits: commitment, location, family plans, lifestyle, money priorities, and pace are compatible enough to build around.",{values:4,lifestyle:3}],
["The big direction mostly fits, with a few areas we still need to negotiate.",{values:3,lifestyle:3}],
["There are one or two major differences we keep treating like small details.",{values:1,lifestyle:1}],
["Our preferred futures require fundamentally different lives.",{values:0,lifestyle:0}]
]],
["You need emotional support after a difficult day, but your partner is drained too. What usually happens?",[
["We can say what we need and find a realistic way for both people's limits to matter.",{communication:4,intimacy:4}],
["One of us has to wait sometimes, but the need is recognized and usually revisited.",{communication:3,intimacy:3}],
["Support depends heavily on timing; unmet needs often become resentment.",{communication:1,intimacy:2}],
["Needs are mocked, dismissed, weaponized, or treated as an unreasonable burden.",{communication:0,intimacy:0}]
]],
["Money styles are different: one saves aggressively and the other values spending on experiences. What best describes the fit?",[
["We have clear agreements about shared obligations, personal freedom, and long-term goals.",{values:4,lifestyle:4}],
["We disagree, but we can create rules neither person secretly resents.",{values:3,lifestyle:3}],
["The difference repeatedly creates surprise, criticism, or one-sided sacrifice.",{values:1,lifestyle:1}],
["We avoid transparency or use money to control, punish, or override the other person.",{values:0,trust:0}]
]],
["One of you makes a mistake that genuinely hurts the other. What is repair most likely to look like?",[
["The impact is heard, responsibility is clear, and something in behavior changes afterward.",{repair:4,trust:4}],
["The apology is imperfect, but there is real effort and some follow-through.",{repair:3,trust:3}],
["We talk a lot, but the same injury returns because the behavior barely changes.",{repair:1,trust:1}],
["Blame shifts, reality gets rewritten, or the hurt person ends up apologizing for bringing it up.",{repair:0,trust:0}]
]],
["How do you handle social life—friends, family, weekends, and time apart?",[
["We do not need identical preferences; we can protect shared time and independent relationships without constant conflict.",{lifestyle:4,trust:3}],
["There are compromises, but neither person feels chronically isolated or crowded.",{lifestyle:3,trust:3}],
["One person's social needs usually win, and the other adapts more than feels good.",{lifestyle:1,trust:2}],
["Jealousy, isolation, resentment, or pressure around friends and family is a recurring problem.",{lifestyle:0,trust:0}]
]],
["Your levels of physical affection or sexual desire are not perfectly matched. How is that difference handled?",[
["We can discuss wants, limits, consent, rejection, and alternatives without shame or pressure.",{intimacy:4,communication:4}],
["It can be sensitive, but we are able to talk and adjust with mutual respect.",{intimacy:3,communication:3}],
["We avoid the topic until frustration leaks out in other ways.",{intimacy:1,communication:1}],
["There is pressure, guilt, ridicule, entitlement, or fear around intimacy.",{intimacy:0,communication:0}]
]],
["A major decision would benefit one partner more than the other—career move, caregiving, study, relocation. How do you decide?",[
["We treat both lives as real. The decision includes costs, alternatives, timing, and what each person would be giving up.",{values:4,trust:4}],
["We usually find a workable compromise, though the process can be stressful.",{values:3,trust:3}],
["The same person tends to sacrifice because their needs are treated as more flexible.",{values:1,trust:1}],
["One person's goals consistently outrank the other's, or disagreement brings punishment.",{values:0,trust:0}]
]],
["Strip away chemistry and history for a moment. What best describes the relationship system you actually live in?",[
["We are different in some ways, but the important parts are aligned or genuinely workable—and problems can improve through repair.",{values:4,communication:4,repair:4,trust:4,lifestyle:4,intimacy:4}],
["The foundation is good, with a few recurring pressure points we still need to solve more deliberately.",{values:3,communication:3,repair:3,trust:3,lifestyle:3,intimacy:3}],
["There is real love or chemistry, but several practical or relational differences keep returning without enough resolution.",{values:1,communication:2,repair:1,trust:2,lifestyle:1,intimacy:2}],
["Staying together often requires ignoring major incompatibilities, abandoning important needs, or hoping the relationship becomes fundamentally different.",{values:0,communication:1,repair:0,trust:1,lifestyle:0,intimacy:1}]
]]
];
const profiles={
"strong-fit":{title:"Strong Fit, Workable Differences",sub:"Your relationship looks compatible where it matters—and differences appear manageable rather than corrosive.",summary:"Your answers suggest a relationship with meaningful alignment across the major structural areas: future direction, communication, repair, trust, everyday life, and intimacy. Compatibility here does not mean you are identical. It means important differences tend to stay discussable, negotiable, and repairable.",next:["Protect the areas that already work instead of taking them for granted.","Use your lowest-scoring dimension as the next relationship check-in topic.","Keep revisiting future goals as life circumstances change."]},
"compatible-pressure-points":{title:"Compatible With Pressure Points",sub:"The foundation looks workable, but one or two recurring differences deserve more deliberate attention.",summary:"Your overall pattern suggests meaningful compatibility, with specific areas that may become expensive if they stay vague. This is often less about whether the relationship 'works' and more about whether both people are willing to turn recurring friction into concrete agreements.",next:["Name the lowest-scoring dimension without turning it into a verdict on the whole relationship.","Choose one observable agreement instead of another broad promise.","Recheck whether the same problem becomes easier to repair over the next month."]},
"mixed-compatibility":{title:"Mixed Compatibility",sub:"Some parts of the relationship fit well; others may be asking for different lives, needs, or rules.",summary:"Your result is mixed rather than clearly strong or clearly mismatched. That usually means the next step is not more chemistry analysis—it is specificity. Which differences are preferences? Which are negotiable needs? Which are genuine non-negotiables? The answer matters more than the total score.",next:["Separate solvable differences from non-negotiable ones.","Have one structured conversation about your weakest dimension.","Do not let a strong area—such as chemistry—silence a major structural mismatch elsewhere."]},
"chemistry-structure-gap":{title:"Chemistry Is Stronger Than the Structure",sub:"Affection or attraction may be carrying a relationship whose future fit or repair system is under strain.",summary:"Your profile shows a specific pattern: connection may feel emotionally or physically compelling, while the practical structure of the relationship is less aligned. This can create a bond that feels powerful in close moments and confusing whenever money, plans, conflict, autonomy, or the future enters the room.",next:["Discuss future fit and repair separately from how strongly you feel about each other.","Do not use chemistry as evidence that a non-negotiable difference will disappear.","Identify what would need to change in behavior—not intention—for the relationship to become more workable."]},
"serious-gaps":{title:"Serious Compatibility Gaps",sub:"Several important areas look chronically misaligned, unresolved, or one-sided.",summary:"Your answers suggest that the relationship may be asking one or both people to absorb substantial mismatch across several domains. A low compatibility score is not an instruction to break up, but it is a reason to stop treating repeated structural problems as isolated bad days.",next:["List the top two mismatches and ask whether each is realistically negotiable.","Distinguish fear of loss from evidence that the current relationship works.","If respect or safety is compromised, prioritize support and boundaries over improving the score."]}
};
let i=0,answers=[];
const root=document.getElementById("compatQuizRoot");
function calculate(){
 const raw={values:0,communication:0,repair:0,trust:0,lifestyle:0,intimacy:0};
 const max={values:0,communication:0,repair:0,trust:0,lifestyle:0,intimacy:0};
 answers.forEach((a,qi)=>{
   const opts=questions[qi][1], chosen=opts[a][1];
   D.forEach(d=>{
     if(Object.prototype.hasOwnProperty.call(chosen,d)) raw[d]+=chosen[d];
     let m=0;opts.forEach(o=>{if(Object.prototype.hasOwnProperty.call(o[1],d))m=Math.max(m,o[1][d])});max[d]+=m;
   });
 });
 const pct=Object.fromEntries(D.map(d=>[d,max[d]?Math.round(raw[d]/max[d]*100):0]));
 const overall=Math.round(pct.values*.22+pct.repair*.20+pct.communication*.16+pct.trust*.16+pct.lifestyle*.13+pct.intimacy*.13);
 const strongest=Object.entries(pct).sort((a,b)=>b[1]-a[1]).slice(0,2);
 const weakest=Object.entries(pct).sort((a,b)=>a[1]-b[1])[0];
 const structure=(pct.values+pct.repair+pct.trust)/3;
 let core;
 if(pct.intimacy>=70 && structure<48)core="chemistry-structure-gap";
 else if(overall>=78 && Math.min(...Object.values(pct))>=50)core="strong-fit";
 else if(overall>=64)core="compatible-pressure-points";
 else if(overall>=46)core="mixed-compatibility";
 else core="serious-gaps";
 return{raw,max,pct,overall,strongest,weakest,core};
}
function paint(){
 const q=questions[i];
 root.innerHTML='<section class="card"><div class="row" style="justify-content:space-between;align-items:center"><div class="muted">'+(i+1)+' / '+questions.length+'</div><button id="compatBack" class="btn small secondary" '+(i===0?'disabled':'')+'>Back</button></div><progress class="compatProgress" value="'+(i+1)+'" max="'+questions.length+'"></progress><h2 style="margin:12px 0">'+q[0]+'</h2><div id="compatOpts"></div></section>';
 document.getElementById("compatBack").onclick=()=>{if(i>0){i--;paint()}};
 const opts=document.getElementById("compatOpts");
 q[1].forEach((o,idx)=>{const b=document.createElement("button");b.className="btn secondary answerBtn";b.textContent=o[0];b.onclick=()=>{answers[i]=idx;if(i<questions.length-1){i++;paint()}else renderResult()};opts.appendChild(b)});
}
function renderResult(){
 const r=calculate(),p=profiles[r.core],bars=D.map(d=>'<div class="resultBar"><span>'+nice[d]+'</span><progress value="'+r.pct[d]+'" max="100"></progress><strong>'+r.pct[d]+'%</strong></div>').join("");
 root.innerHTML='<section class="card prose" id="compatResult"><p class="small muted">Your personalized result</p><h2>'+p.title+'</h2><p><strong>'+p.sub+'</strong></p><div class="grid2"><div class="mini"><h3>Compatibility Score</h3><p style="font-size:28px;font-weight:900;margin:0">'+r.overall+' / 100</p><p class="small muted">Reflection score, not a prediction.</p></div><div class="mini"><h3>Strongest areas</h3><p><strong>'+nice[r.strongest[0][0]]+'</strong> ('+r.strongest[0][1]+'%)<br><strong>'+nice[r.strongest[1][0]]+'</strong> ('+r.strongest[1][1]+'%)</p></div><div class="mini"><h3>Biggest pressure point</h3><p><strong>'+nice[r.weakest[0]]+'</strong> ('+r.weakest[1]+'%)</p></div><div class="mini"><h3>Result pattern</h3><p>'+p.title+'</p></div></div><p>'+p.summary+'</p><h3>Your six-area profile</h3><div class="resultBars">'+bars+'</div><h3>What to do next</h3><ol>'+p.next.map(x=>'<li>'+x+'</li>').join("")+'</ol><div class="row" style="flex-wrap:wrap"><a class="btn secondary" href="/tests/relationship-compatibility-test/">Retake quiz</a><a class="btn secondary" href="/tests/relationship-compatibility-test/results/'+r.core+'/">Open this result profile</a></div><p class="small muted" style="margin-top:14px">This original score has not been psychometrically validated. It is educational self-reflection, not a diagnosis or a forecast of relationship success.</p></section>';
 document.getElementById("compatResult").scrollIntoView({behavior:"smooth",block:"start"});
}
paint();
})();
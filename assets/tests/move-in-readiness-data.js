/* Move-in readiness assessment. Original educational decision-planning model. */
(function(root,factory){"use strict";const data=factory();root.MoveInReadinessModel=data;if(typeof module==="object"&&module.exports)module.exports=data;})(typeof globalThis!=="undefined"?globalThis:this,function(){"use strict";
const dimensions=[
{id:"motives",name:"Reasons & timing",short:"Reasons & timing",weight:.18,summary:"Whether moving in is a mutual, deliberate choice rather than a fix for rent, uncertainty, or relationship strain.",action:"Ask each other, independently: 'If housing costs and lease deadlines stayed the same, would we still want to live together now? Why?'"},
{id:"money",name:"Rent & shared finances",short:"Money & rent",weight:.20,summary:"Whether you can agree on rent, utilities, shared purchases, income changes and financial responsibilities.",action:"Write an actual housing budget and choose a fair rent-and-bills split before applying for a place."},
{id:"home",name:"Chores & household labor",short:"Home responsibilities",weight:.17,summary:"Expectations for cleaning, grocery planning, meals, appointments and managing the invisible work of a home.",action:"List recurring chores and household planning tasks, assign owners and decide how to handle uneven workloads."},
{id:"space",name:"Personal space & routines",short:"Space & routines",weight:.13,summary:"Privacy, guests, sleep, quiet time and how each person can remain an individual in one home.",action:"Agree on quiet hours, guests, personal time and what 'privacy' means before sharing a key."},
{id:"conflict",name:"Conflict & repair at home",short:"Conflict & repair",weight:.18,summary:"Whether you can disagree, take space, resume conversations and respect boundaries in a shared home.",action:"Make a pause-and-return plan for arguments, and agree that nobody uses the home, money or housing security as leverage."},
{id:"practical",name:"Practical & exit planning",short:"Practical planning",weight:.14,summary:"Lease responsibilities, emergency options, moving costs and what would happen if living together stopped working.",action:"Read any lease terms, agree what belongs to whom, and talk through a respectful housing exit plan."}
];
const questions=[
{id:"reason-now",dimension:"motives",prompt:"What is the biggest reason you and your partner are considering moving in now?",options:[
["We both want to build an everyday life together and have discussed what that means.",4,"You describe a shared reason, not just a deadline."],
["We want to take the next step, but haven't fully compared what we expect.",3,"Clarify what the step means for each of you."],
["A lease is ending or sharing rent would solve an immediate housing problem.",1,"Housing pressure may be driving the timing.", "pressure"],
["I hope living together will make my partner commit or fix ongoing relationship problems.",0,"A shared address cannot reliably repair unresolved relationship problems.","pressure"]]},
{id:"future-meaning",dimension:"motives",prompt:"When you talk about what moving in together means for your future, what happens?",options:[
["We have openly discussed commitment, timelines and what is still uncertain.",4,"Your expectations have been spoken rather than assumed."],
["We have broadly similar hopes but still need to settle a few differences.",3,"Name the open questions before committing."],
["I assume we're on the same page, although we haven't asked directly.",1,"A shared assumption is not the same as an agreement."],
["We avoid the conversation because it becomes tense or one of us feels pressured.",0,"Pressure or avoidance needs attention before a shared lease."]]},
{id:"no-savings",dimension:"motives",prompt:"Imagine moving in together would not save money. How would the timing feel?",options:[
["We would still choose this step, and we have a practical plan.",4,"The decision has a purpose beyond cost savings."],
["We would want it, but might adjust our timing while we prepare.",3,"Taking more time may help the step work."],
["We would probably postpone; cost savings are a major reason.",1,"Savings are legitimate, but they should not decide readiness alone.","pressure"],
["We would not choose to live together right now.",0,"Treat the difference between needing housing and wanting cohabitation as important.","pressure"]]},
{id:"rent-split",dimension:"money",prompt:"How would you decide who pays rent and utilities?",options:[
["We agreed on a realistic split and checked what each person can afford.",4,"A fair split is an explicit agreement, not necessarily 50/50."],
["We have a fair approach in mind but still need to calculate the amounts.",3,"Put actual shared costs into the proposed split."],
["We haven't discussed it beyond assuming we'll each pay half.",1,"Test whether an equal split is manageable for both incomes."],
["One person is expected to pay without being able to discuss or question the arrangement.",0,"Unilateral money rules may create a serious power imbalance."]]},
{id:"shared-costs",dimension:"money",prompt:"What is your plan for groceries, subscriptions, furniture and unexpected shared costs?",options:[
["We know which costs are shared, who pays and how we will review surprises.",4,"Small purchases have a clear process."],
["We've discussed the big costs but need rules for everyday extras.",3,"Decide which purchases need two yeses."],
["We assume we'll figure it out as charges appear.",1,"Surprises could become resentment without a plan."],
["We avoid money conversations or expect one person to handle everything.",0,"Avoidance or one-sided responsibility is worth resolving first."]]},
{id:"income-drop",dimension:"money",prompt:"If one of you lost income after signing a lease, what would you do?",options:[
["We have discussed a temporary adjustment, support options and limits.",4,"You have discussed the financial impact of a setback."],
["We could talk about adjusting contributions, but haven't defined a plan.",3,"Choose an emergency next step before it is needed."],
["We haven't considered the possibility.",1,"Estimate how long each person could manage rent changes."],
["We would likely blame each other or pressure one person to cover everything.",0,"Conflict around a setback could threaten housing stability."]]},
{id:"chores-ownership",dimension:"home",prompt:"How would you divide cooking, cleaning and laundry?",options:[
["We have compared standards, schedules and who owns each task.",4,"Responsibility includes noticing and planning, not just doing."],
["We have a rough split and are willing to revise it after trying it.",3,"Set a check-in date to review how work is shared."],
["We assume chores will naturally divide evenly without planning.",1,"Undefined ownership often creates invisible work."],
["One partner will manage the home because that's simply expected of them.",0,"An unexamined one-sided burden deserves discussion."]]},
{id:"cleanliness",dimension:"home",prompt:"Your ideas of a clean, comfortable home are different. What happens?",options:[
["We can describe our standards and negotiate a realistic shared baseline.",4,"Differences can be managed through concrete rules."],
["We expect some friction but can usually find middle ground.",3,"Talk about specific tasks, not labels like 'messy'."],
["We haven't spent enough ordinary days together to know.",1,"Try longer visits that include routine work and downtime."],
["One of us would criticize, monitor or refuse to respect the other's needs.",0,"A shared home needs respect, not constant policing."]]},
{id:"mental-load",dimension:"home",prompt:"Who would notice and organize things like supplies, appointments and household repairs?",options:[
["We have identified the planning work and how both partners will share it.",4,"You include mental load in your household agreement."],
["We know this matters but have only discussed part of it.",3,"List every recurring planning responsibility."],
["We haven't considered who does the behind-the-scenes organizing.",1,"Invisible tasks can become unequal very quickly."],
["It is assumed that one partner will remember and coordinate everything.",0,"One-sided planning responsibility can become exhausting."]]},
{id:"alone-time",dimension:"space",prompt:"How do you expect to handle alone time once you share a home?",options:[
["We know what space each person needs and how to ask without guilt.",4,"Personal space is treated as part of a healthy shared life."],
["We value alone time but need specific rules for our new space.",3,"Decide when doors are closed, headphones are on or quiet is needed."],
["We assume being together more automatically means wanting the same amount of closeness.",1,"Compare actual space needs before moving."],
["One of us treats requests for space as rejection or a reason for punishment.",0,"Being able to ask for space without consequences matters."]]},
{id:"guests",dimension:"space",prompt:"Friends, relatives or overnight guests want to visit. What's your approach?",options:[
["We agree on notice, overnight stays and each person's right to say no.",4,"Visitors are part of a shared household agreement."],
["We have similar preferences but need a few explicit boundaries.",3,"Set rules for guests before a situation becomes awkward."],
["We assume each person can invite guests whenever they want.",1,"Unspoken guest rules can undermine privacy."],
["One partner's friends or family would take priority regardless of the other's comfort.",0,"Shared space should not belong to only one person's social circle."]]},
{id:"routines",dimension:"space",prompt:"How well do you understand each other's daily routines?",options:[
["We've spent ordinary workdays together and discussed sleep, work and quiet hours.",4,"You know something about real weekday routines."],
["We've seen most routines, but some expectations remain open.",3,"Compare sleep schedules, remote work and shared meals."],
["We mostly know our date-night routines, not everyday living habits.",1,"Try ordinary full days together before assuming a fit."],
["Known routine differences already cause recurring arguments we cannot resolve.",0,"A repeated routine clash deserves a workable plan."]]},
{id:"hard-conversation",dimension:"conflict",prompt:"When a difficult disagreement happens at home, what tends to follow?",options:[
["We can pause, return to the topic and make a concrete repair.",4,"Conflict has a path back toward problem-solving."],
["We get tense but usually repair, even if it takes practice.",3,"Agree on a return time when taking a break."],
["We stop talking about the issue and hope it goes away.",1,"Living together can amplify unresolved disagreements."],
["Arguments involve intimidation, threats, fear or punishment.",0,"Safety concerns outrank any numerical result.","safety"]]},
{id:"shared-decisions",dimension:"conflict",prompt:"You disagree about a major purchase or how to use a room. What happens?",options:[
["Both viewpoints count and we seek a decision each can accept.",4,"Shared choices allow both people to have a voice."],
["We sometimes struggle but can negotiate a specific compromise.",3,"Try a two-yes rule for major shared decisions."],
["Whoever is more persistent usually gets their way.",1,"An unbalanced decision process can create resentment."],
["One partner uses money, the lease or the threat of leaving to force the decision.",0,"Housing leverage should never decide an argument.","safety"]]},
{id:"return-to-conflict",dimension:"conflict",prompt:"If you need space after an argument, what is most likely?",options:[
["We respect the pause and agree on when to revisit the conversation.",4,"There is room to cool down without abandonment."],
["It can be awkward, but we reconnect and revisit important issues.",3,"Set a clear check-in time for unresolved topics."],
["We withdraw for days without deciding when to talk.",1,"Silent avoidance is costly when you share a home."],
["Someone blocks the other's exit, threatens their housing or punishes them for needing space.",0,"Preventing safe space or using housing as leverage requires immediate attention.","safety"]]},
{id:"lease",dimension:"practical",prompt:"What do you know about the lease, deposit and legal housing responsibilities?",options:[
["We know who would sign, what each person owes and which terms to check.",4,"You have reviewed the real obligations."],
["We know the basics but still need to review the actual documents.",3,"Read all terms, deposit rules and notices before signing."],
["We haven't looked at joint versus individual lease responsibility.",1,"Do not assume rent liability disappears if the relationship changes."],
["We plan to sign without understanding the financial or housing obligations.",0,"Pause until each person understands what they would be signing."]]},
{id:"moving-logistics",dimension:"practical",prompt:"Who will handle moving costs, shared furniture, pets, commuting or working-from-home needs?",options:[
["We've listed the practical changes, costs and decisions each person owns.",4,"The operational details are mostly covered."],
["We have a rough plan but still need an itemized checklist.",3,"Write down costs, timelines, supplies and responsibilities."],
["We haven't mapped out much beyond choosing a place.",1,"Moving logistics can hide meaningful cost and time demands."],
["We expect one partner to deal with the entire move without agreement.",0,"Negotiate the work before the move creates resentment."]]},
{id:"exit-plan",dimension:"practical",prompt:"If one person eventually wanted to move out, what would the plan be?",options:[
["We can discuss notice, rent responsibility, belongings and a safe alternative.",4,"An exit plan protects both people without predicting a breakup."],
["We agree an exit plan matters but haven't written the details.",3,"Settle exit logistics before taking on a shared lease."],
["We haven't talked about it because discussing a breakup feels uncomfortable.",1,"Avoiding the topic does not remove lease obligations."],
["Someone would be unable to leave safely or would be punished financially for leaving.",0,"Do not proceed without addressing safety and independent housing options.","safety"]]}
];
const profiles={
plan:{title:"Ready With a Shared Plan",sub:"Your answers suggest you have discussed many of the practical decisions that make sharing a home easier.",intro:"Your reported planning is strongest when both partners have actually agreed on the details—not merely assumed them. Keep your written arrangements flexible enough to revisit as circumstances change."},
agreements:{title:"Ready but Missing Agreements",sub:"The idea may be workable, but several everyday decisions still need clearer agreements.",intro:"You do not need matching habits to live together; you do need to make responsibilities, costs and boundaries concrete before you sign."},
pressure:{title:"Practical Pressure Is Driving the Move",sub:"Rent, lease timing or the hope of fixing a relationship appears to be influencing this decision.",intro:"Financial or housing pressure is understandable. It is still worth separating the question 'Where can we live?' from 'Do we both want to live together now?'."},
clash:{title:"Daily-Life Expectations Clash",sub:"Different household standards, routines or personal-space expectations may create friction.",intro:"These differences are not necessarily a reason to break up, but they deserve a realistic trial period and negotiated rules before sharing a lease."},
pause:{title:"Pause Before Committing",sub:"Important practical, conflict or safety concerns deserve attention before a shared housing commitment.",intro:"A low readiness score is not a verdict on your relationship. Focus on safety, independent choice and clear obligations rather than using a lease to settle unresolved concerns."}
};
const valid=a=>Array.isArray(a)&&a.length===18&&a.every((n,i)=>Number.isInteger(n)&&n>=0&&n<questions[i].options.length);
const round=x=>Math.max(0,Math.min(100,Math.round(x)));
function calculate(a){
if(!valid(a))throw Error("Complete all 18 questions.");
const dims=dimensions.map(d=>{const items=questions.flatMap((q,i)=>q.dimension===d.id?[{question:q,questionIndex:i,option:q.options[a[i]],value:q.options[a[i]][1]}]:[]);
const score=round(items.reduce((s,v)=>s+v.value,0)/(items.length*4)*100);
return{...d,score,items};});
const score=round(dims.reduce((s,d)=>s+d.score*d.weight,0));
const low=questions.flatMap((q,i)=>q.options[a[i]][1]<=2?[{question:q,choice:q.options[a[i]],dimension:q.dimension,index:i}]:[]);
const safety=questions.flatMap((q,i)=>q.options[a[i]][3]==="safety"?[{index:i,question:q,choice:q.options[a[i]]}]:[]);
const housingPressure=[0,2].filter(i=>questions[i].options[a[i]][3]==="pressure").length;
const value=id=>dims.find(d=>d.id===id).score;
let key;
if(safety.length||value("conflict")<=35||value("practical")<=35||(value("money")<=35&&value("practical")<60)||dims.filter(d=>d.score<=42).length>=3)key="pause";
else if(housingPressure>=1&&value("motives")<65)key="pressure";
else if(value("home")<60&&value("space")<65)key="clash";
else if(score>=82&&Math.min(...dims.map(d=>d.score))>=65)key="plan";
else key="agreements";
const stronger=dims.slice().sort((a,b)=>b.score-a.score),attention=dims.slice().sort((a,b)=>a.score-b.score);
const needs=low.slice().sort((a,b)=>a.choice[1]-b.choice[1]||a.index-b.index);
const actionList=[];const included=new Set();
for(const n of needs){if(!included.has(n.dimension)){actionList.push({title:dimensions.find(d=>d.id===n.dimension).name,detail:n.choice[2],action:n.question.options? n.question.options[a[n.index]][2]:"",question:n.question.prompt,choice:n.choice[0],dimension:n.dimension});included.add(n.dimension);}}
for(const d of attention){if(!included.has(d.id)){actionList.push({title:d.name,detail:d.summary,action:d.action,dimension:d.id});included.add(d.id);}}
const discussion=needs.slice(0,3).map(n=>({question:n.question.prompt,action:dimensions.find(d=>d.id===n.dimension).action,choice:n.choice[0]}));
const backup=[{question:"How exactly will we split rent, utilities and shared purchases?",action:dimensions[1].action},{question:"Who owns the chores and the planning work, not just the physical tasks?",action:dimensions[2].action},{question:"If we broke up or had to move out, what happens with our lease and belongings?",action:dimensions[5].action}];
for(const b of backup){if(discussion.length>=3)break;if(!discussion.some(d=>d.question===b.question))discussion.push(b);}
return{score,dims,profileKey:key,profile:profiles[key],low,safety,stronger,attention,discussion,actions:actionList,answers:a.slice()};
}
if(questions.length!==18||dimensions.length!==6||dimensions.some(d=>questions.filter(q=>q.dimension===d.id).length!==3)||questions.some(q=>q.options.length!==4||q.options.some(o=>o.length<3||![0,1,2,3,4].includes(o[1]))))throw Error("Invalid move-in readiness data");
return{questions,dimensions,profiles,valid,calculate};
});
/* Educational financial preference comparison; in-memory only. */
(function(root,factory){"use strict";const model=factory();root.FinancialCompatibilityModel=model;if(typeof module==="object"&&module.exports)module.exports=model;})(typeof globalThis!=="undefined"?globalThis:this,function(){"use strict";
const dimensions=[
{id:"spending",name:"Spending & saving habits",tip:"Agree on a savings floor and how much each person can spend freely."},
{id:"transparency",name:"Debt & financial transparency",tip:"Specify which obligations affect shared plans and when to disclose them, without sharing sensitive account details."},
{id:"fairness",name:"Fairness in sharing expenses",tip:"Compare equal and income-based contributions, including care work and capacity."},
{id:"independence",name:"Financial independence",tip:"Define which decisions and accounts are shared, and protect personal spending autonomy."},
{id:"goals",name:"Future financial goals",tip:"Prioritize one shared goal, a contribution plan and a review date."},
{id:"conflict",name:"Resolving money conflicts",tip:"Choose a calm discussion time, a pause-and-return rule, and one decision to revisit."}];
/* Pair order: 01,02,03,12,13,23. A=agreement, M=manageable, I=important. Not ordinal scores. */
const rows=[
["spending","When money is left after necessities, what is your preferred starting point?",["Put most of it into emergency savings.","Split it between saving and enjoying the present.","Spend on experiences or meaningful purchases now.","Set it aside for a specific longer-term goal."],"MMMMMM","Compare a savings floor and a personal-spending amount without guilt."],
["spending","How would you want to keep everyday spending on track?",["Track spending closely against a detailed budget.","Set broad limits and stay flexible within them.","Review transactions occasionally without a strict budget.","Avoid tracking until funds run short."],"MMIMMM","Try a shared-expense plan for one month and agree on a manageable way to track it."],
["spending","Before a sizeable nonessential purchase, which rule suits you?",["Talk first whenever shared funds are involved.","Agree on an amount above which discussion is required.","Use personal money freely after shared bills are covered.","Spend from a shared account, then explain afterward."],"MMIMII","Set a threshold for joint purchases, while keeping personal spending separate."],
["transparency","When should a partner disclose debt that may affect shared plans?",["Before committing to major shared financial obligations.","As soon as serious future plans are being discussed.","Only when repayment directly affects a shared bill.","Keep it private even when it could affect both people."],"MMIMII","Agree which obligations to discuss before leases, loans or shared bills."],
["transparency","How do you prefer to share updates about financial obligations?",["Have predictable check-ins about important obligations.","Bring up meaningful changes as they happen.","Talk only before a big joint decision.","Disclose details only when directly confronted."],"MMIMII","Choose a check-in schedule and define which changes warrant an earlier conversation."],
["transparency","If you experience an unexpected money setback, what would you do?",["Explain promptly if shared plans might change.","Make an initial plan, then explain the expected shared impact.","Speak up when an upcoming shared payment is affected.","Keep the setback hidden to avoid conflict."],"MMIMII","Discuss the impact and timing early without exchanging sensitive financial identifiers."],
["fairness","Which approach to recurring shared bills feels fairest?",["Divide each bill equally, 50/50.","Contribute in proportion to income.","Assign different agreed bill categories to each person.","Adjust contributions as circumstances change."],"MMMMMM","Try both equal and income-proportional examples against your actual obligations."],
["fairness","Who should decide on discretionary purchases using joint funds?",["Both approve each nonessential purchase.","Either decides below a jointly agreed limit.","One handles the budget and reports decisions regularly.","Either spends shared money without consulting the other."],"MMIMII","Set a mutually agreed spending threshold for shared funds."],
["fairness","If one partner's income changes significantly, what should happen?",["Keep the original equal split where possible.","Recalculate each contribution according to current income.","Review expenses and agree on a temporary arrangement.","Expect one partner to absorb all extra costs without discussion."],"MMIMII","Discuss a hypothetical income drop and agree on a fair review process."],
["independence","Which bank account structure would you prefer?",["Mostly joint accounts.","Mostly separate accounts.","A joint bill account plus separate personal accounts.","Choose case by case rather than one general rule."],"IMMMMM","Start with a list of shared expenses and decide how to fund them."],
["independence","How much autonomy should each partner have over personal spending?",["An agreed personal amount needs no approval.","We should discuss nearly every individual purchase.","No need to talk about personal spending, even if shared bills are tight.","Each has autonomy within jointly agreed spending guardrails."],"MIMIMI","Protect private spending while funding shared commitments reliably."],
["independence","Who should decide about a major shared financial obligation?",["Both people agree before committing shared resources.","One researches, then both approve.","Each leads pre-agreed areas under shared rules.","The higher earner should have final authority."],"AMIMII","Agree that both people must approve major joint commitments."],
["goals","What financial goal would you prioritize together this year?",["Build emergency savings.","Save for a home or family-related goal.","Spend on travel or meaningful time together.","Pay down existing obligations."],"MMMMMM","Rank shared goals and choose realistic contributions to your first priority."],
["goals","How far ahead do you prefer to plan shared finances?",["Make a 12-month plan.","Plan several years ahead, adjusting regularly.","Decide month by month while things are uncertain.","Avoid planning together until expenses occur."],"MMIMIM","Pick a realistic short-term planning horizon and a date to review it."],
["goals","What is your approach to significant financial risk affecting both partners?",["Protect shared security first.","Consider limited risk inside agreed limits.","Explore uncertainty after researching alternatives together.","Take major risks first and work out consequences later."],"MMIMII","Discuss a shared risk ceiling before any joint commitment."],
["conflict","When a money disagreement arises, when should you discuss it?",["Talk calmly as soon as possible.","Pause briefly and promise a specific return time.","Schedule a dedicated conversation soon.","Avoid revisiting the topic and hope it resolves itself."],"MMIMII","Agree on an exact return time if either person needs space."],
["conflict","If you cannot agree about an important purchase, what next?",["Wait until both people understand and agree.","Try a smaller purchase or trial option.","Use pre-agreed rules or neutral information.","Let one partner overrule the other to end the argument."],"MMIMII","List alternatives and agree on what mutual consent looks like."],
["conflict","After a tense financial conversation, what usually feels most productive?",["Acknowledge both perspectives and set a clear next step.","Compare tradeoffs, then review the decision later.","Take space and return with a calmer proposal.","Withdraw, blame or refuse to return to the subject."],"MMIMII","Restate both concerns without blame and agree on one observable action."]
];
const questions=rows.map((r,i)=>({id:"fm"+String(i+1).padStart(2,"0"),dimension:r[0],prompt:r[1],options:r[2].map((text,index)=>({text,index})),pairs:r[3],tip:r[4]}));
const profiles={
aligned:{title:"Financially Aligned",summary:"Your stated preferences match in most areas. Keep agreements explicit as circumstances change."},
different:{title:"Different but Compatible",summary:"Your styles differ, with practical room for clear agreements and fair compromise."},
communication:{title:"Money Communication Gap",summary:"Differences in how you discuss money may make decisions harder. Focus on your process for having financial conversations."},
fairness:{title:"Unequal Financial Expectations",summary:"There are important differences around contributions, expense sharing or authority over shared funds."},
trust:{title:"Financial Trust Concerns",summary:"Expectations about disclosure or holding back material information need careful discussion before shared commitments."}
};
const valid=a=>Array.isArray(a)&&a.length===18&&a.every(x=>Number.isInteger(x)&&x>=0&&x<=3);
/* Readiness is about decision processes, never whether saving, spending,
   separate accounts, existing debt or earning power is intrinsically 'better'.
   Each option has an openly defined educational coordination value 0-100. */
const readinessValues=[
[100,100,100,100], [100,100,90,45], [100,100,100,15],
[100,100,70,10], [100,100,75,10], [100,100,75,10],
[100,100,100,100], [100,100,100,10], [85,100,100,10],
[100,100,100,100], [100,90,15,100], [100,100,100,10],
[100,100,100,100], [100,100,90,20], [100,100,100,15],
[100,100,100,15], [100,100,100,15], [100,100,100,10]
];
const round=x=>Math.round(x);
const statusValue={A:100,M:50,I:0};
function individualReadiness(a){
if(!valid(a))throw Error("Complete all 18 questions.");
const dimensionsScores=dimensions.map(d=>{
const indices=questions.map((q,i)=>q.dimension===d.id?i:null).filter(i=>i!==null);
return{id:d.id,name:d.name,score:round(indices.reduce((sum,i)=>sum+readinessValues[i][a[i]],0)/indices.length)};
});
return {score:round(dimensionsScores.reduce((sum,d)=>sum+d.score,0)/dimensionsScores.length),dimensionsScores};
}

function pairStatus(q,a,b){if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>3||b>3)return"N";if(a===b)return"A";return q.pairs[["01","02","03","12","13","23"].indexOf(String(Math.min(a,b))+String(Math.max(a,b)))];}
function analyzeIndividual(a){if(!valid(a))throw Error("Complete all 18 questions.");
const dims=dimensions.map(d=>({...d,answers:questions.flatMap((q,i)=>q.dimension===d.id?[{question:q.prompt,choice:q.options[a[i]].text,index:i}]:[])}));
const avoidance=[15,16,17].filter(i=>a[i]===3).length,disclosure=[3,4,5].filter(i=>a[i]===3).length,fairness=[7,8].filter(i=>a[i]===3).length;
let profile=disclosure>=2?{title:"Transparency Needs Attention",summary:"Consider how to disclose information that affects shared commitments while maintaining appropriate privacy."}:
fairness>=2?{title:"Clarify Fairness Expectations",summary:"Reflect on shared spending approval and how changes in ability to contribute are handled."}:
avoidance>=2?{title:"Money Conversation Practice",summary:"Try planning a calm way to reopen hard money topics, rather than leaving them unresolved."}:
[0,1,2,12,13,14].filter(i=>a[i]===1||a[i]===2).length>=4?{title:"Flexible Money Planner",summary:"You favor adaptability. Identify which shared responsibilities still need predictable agreements."}:
{title:"Money Priorities Explorer",summary:"Your financial preferences offer useful starting points for a conversation, not a verdict on a partner."};
return{profile,dimensions:dims,...individualReadiness(a)};}
function analyzeCouple(a,b){if(!valid(a)||!valid(b))throw Error("Both people must complete all 18 questions.");
const comparisons=questions.map((q,i)=>({id:q.id,dimension:q.dimension,prompt:q.prompt,a:q.options[a[i]].text,b:q.options[b[i]].text,aIndex:a[i],bIndex:b[i],status:pairStatus(q,a[i],b[i]),tip:q.tip}));
const dims=dimensions.map(d=>{const items=comparisons.filter(c=>c.dimension===d.id),counts={A:0,M:0,I:0,N:0};items.forEach(c=>counts[c.status]++);return{...d,items,counts,status:counts.N?"N":counts.I?"I":counts.M?"M":"A"};});
const total={A:0,M:0,I:0};comparisons.forEach(c=>total[c.status]++);
const dimensionScores=dims.map(d=>({id:d.id,name:d.name,score:round(d.items.reduce((sum,item)=>sum+statusValue[item.status],0)/d.items.length)}));
dimensionScores.forEach(entry=>{const d=dims.find(x=>x.id===entry.id);d.score=entry.score;});
const score=round(dimensionScores.reduce((sum,d)=>sum+d.score,0)/dimensionScores.length);
const area=id=>dims.find(d=>d.id===id);
const secrecy=[3,4,5].filter(i=>a[i]===3||b[i]===3).length;
let profileKey;
if((area("transparency").counts.I>=2&&secrecy>=1)||secrecy>=2)profileKey="trust";
else if(area("fairness").counts.I>=2||(area("fairness").counts.I>=1&&area("independence").counts.I>=2))profileKey="fairness";
else if(area("conflict").counts.I>=2||(area("conflict").counts.I>=1&&total.I>=5))profileKey="communication";
else if(total.I===0&&total.A>=12)profileKey="aligned";
else profileKey="different";
const strengths=dims.filter(d=>d.status==="A"),attention=dims.filter(d=>d.status==="I").concat(dims.filter(d=>d.status==="M"));
const discussion=attention.flatMap(d=>d.items.filter(c=>c.status!=="A")).sort((x,y)=>(y.status==="I")-(x.status==="I")).slice(0,3).map(c=>({question:c.prompt,tip:c.tip,a:c.a,b:c.b}));
const fallbacks=["Which money agreement should we protect?","When should we revisit our financial plan?","What will we do if one person's circumstances change?"];
while(discussion.length<3)discussion.push({question:fallbacks[discussion.length],tip:"Write down a mutual answer and a date to revisit it."});
return{profileKey,profile:profiles[profileKey],comparisons,dimensions:dims,total,strengths,attention,discussion,score};}
if(questions.length!==18||questions.some(q=>q.options.length!==4||q.pairs.length!==6||/[^AMI]/.test(q.pairs))||dimensions.some(d=>questions.filter(q=>q.dimension===d.id).length!==3))throw Error("Invalid financial quiz data");
return{questions,dimensions,profiles,valid,pairStatus,analyzeIndividual,analyzeCouple,individualReadiness,readinessValues,statusValue};
});
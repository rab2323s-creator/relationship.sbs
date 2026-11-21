/* Couples wedding-format decision model. Four percentage shares describe answer votes, not odds or predicted outcomes. */
(function(root,factory){"use strict";let data=root.ElopeWeddingQuizData;if(!data&&typeof module==="object"&&module.exports)data=require("./elope-wedding-quiz-data.js");const model=factory(data);root.ElopeWeddingQuizModel=model;if(typeof module==="object"&&module.exports)module.exports=model;})(typeof globalThis!=="undefined"?globalThis:this,function(data){"use strict";
const ids=data.styleIds,questions=data.questions,domains=data.domains;
const MIN_KNOWN=8;
const profiles={
private:{title:"Private Elopement",lead:"An intimate ceremony may protect the space you want for your promises. An elopement can be local, planned and shared afterward; it need not be secret.",benefit:"Private, flexible and centered on the two of you.",tradeoff:"Loved ones may miss the vows. Officiant, witness, permit, travel and photography arrangements still need research.",steps:["Confirm the legal marriage process where you will marry.","Set a complete spending cap, including optional travel and photography.","Agree together when and how you will tell other people."],prompts:["Whose absence could cause regret for either of us?","What would make this private ceremony meaningful rather than hurried?"]},
micro:{title:"Micro Wedding",lead:"A deliberately small wedding can include your closest people while reducing guest-list complexity. Micro weddings have no universal guest-count limit: agree on your own.",benefit:"Close people can witness the occasion without hosting a large crowd.",tradeoff:"Guest-list boundaries can be uncomfortable, and some vendor costs are fixed no matter how few people attend.",steps:["Write a truly mutual guest-list cap before sending invitations.","Get real venue and food quotes, not just per-guest estimates.","Choose the customs that matter and release the rest."],prompts:["Which few people do we each really need present?","Will we defend the guest cap as a team?"]},
traditional:{title:"Traditional Wedding",lead:"A larger celebration may fit when both of you genuinely want community, shared traditions and a hosted event, not simply because others expect it.",benefit:"Wider community presence and space for shared rituals.",tradeoff:"More hosting expense, coordination and pressure; agree on budget, boundaries and workload.",steps:["Set the maximum total budget before looking at venues.","Choose traditions jointly and divide planning fairly.","Decide what changes if the guest list becomes too large."],prompts:["Would we still choose this scale without family pressure?","How do we keep the day true to both of us?"]},
hybrid:{title:"Elopement + Later Celebration",lead:"A private exchange of vows followed by a separate gathering may protect intimacy and include loved ones. Both partners must actually want the second event.",benefit:"Two moments with different purposes: quiet vows and later company.",tradeoff:"Two events can mean two budgets and two planning rounds; they are not automatically cheaper.",steps:["Agree whether a second gathering is a shared wish, not a pressured concession.","Set separate budgets and firm guest expectations for each occasion.","Explain clearly which event loved ones are being invited to."],prompts:["Do we both want the later party or is one person conceding?","How do we keep two occasions from becoming two large weddings?"]}
};
const method="Each definite answer awards one format-preference point to the chosen option; 'not sure' awards none. For one person, each format count is divided by all definite answers and converted into four percentages totaling 100%, with largest-remainder rounding. In couples mode, each partner's unrounded shares receive equal weight, regardless of different numbers of 'not sure' answers. Percentages describe this quiz's choices, not relationship compatibility, probability, scientific measurement, or a guaranteed decision.";
function valid(a){return Array.isArray(a)&&a.length===questions.length&&a.every((v,i)=>Number.isInteger(v)&&v>=0&&v<questions[i].options.length);}
function percentages(shares){if(!shares)return null;const arr=ids.map((id,i)=>({id,i,raw:shares[id]*100,percent:Math.floor(shares[id]*100)}));let extras=100-arr.reduce((n,x)=>n+x.percent,0);arr.slice().sort((a,b)=>(b.raw-b.percent)-(a.raw-a.percent)||a.i-b.i).slice(0,extras).forEach(x=>x.percent++);return Object.fromEntries(arr.map(x=>[x.id,x.percent]));}
function person(answers){
 if(!valid(answers))throw Error("Please answer all 18 questions; 'not sure' is a valid choice.");
 const counts=Object.fromEntries(ids.map(id=>[id,0]));
 const responses=questions.map((q,i)=>({id:q.id,prompt:q.prompt,domain:q.domain,important:q.important,style:q.options[answers[i]].style,answer:q.options[answers[i]].text}));
 responses.forEach(x=>{if(x.style!==null)counts[x.style]++});
 const known=Object.values(counts).reduce((n,v)=>n+v,0),shares=known?Object.fromEntries(ids.map(id=>[id,counts[id]/known])):null;
 const max=Math.max(...Object.values(counts)),leaders=max>0?ids.filter(id=>counts[id]===max):[];
 const lead=known>=MIN_KNOWN&&leaders.length===1?leaders[0]:null;
 const domainSummary=domains.map(d=>({id:d.id,name:d.name,known:responses.filter(x=>x.domain===d.id&&x.style!==null).length,unsure:responses.filter(x=>x.domain===d.id&&x.style===null).length}));
 return{counts,shares,percentages:percentages(shares),known,unsure:questions.length-known,lead,leaders,responses,domainSummary};
}
function calculate(first,second){
 const a=person(first);
 if(second===undefined||second===null)return{mode:"solo",first:a,percentages:a.percentages,leading:a.lead,leaders:a.leaders,hasEnough:a.known>=MIN_KNOWN,method,profiles,domains};
 const b=person(second),enough=a.known>=MIN_KNOWN&&b.known>=MIN_KNOWN;
 const shares=enough?Object.fromEntries(ids.map(id=>[id,(a.shares[id]+b.shares[id])/2])):null;
 const pct=percentages(shares);
 const maximum=pct?Math.max(...Object.values(pct)):0,leaders=pct?ids.filter(id=>pct[id]===maximum):[];
 const leading=enough&&leaders.length===1?leaders[0]:null;
 let agreements=0,comparable=0;const differences=[];
 questions.forEach((q,i)=>{const x=a.responses[i],y=b.responses[i];if(x.style===null||y.style===null)return;comparable++;if(x.style===y.style){agreements++;return}differences.push({id:q.id,name:domains.find(d=>d.id===q.domain).name,domain:q.domain,prompt:q.prompt,first:x.answer,second:y.answer,important:q.important,firstStyle:x.style,secondStyle:y.style})});
 differences.sort((x,y)=>Number(y.important)-Number(x.important)||x.id-y.id);
 const domainComparison=domains.map(d=>({id:d.id,name:d.name,differences:differences.filter(x=>x.domain===d.id).length,comparable:questions.filter((q,i)=>q.domain===d.id&&a.responses[i].style!==null&&b.responses[i].style!==null).length}));
 const differentFavorites=a.lead!==null&&b.lead!==null&&a.lead!==b.lead;
 const status=!enough||comparable<6?"needs-clarity":differentFavorites?"different-favorites":differences.some(x=>x.important)?"discuss-important-differences":agreements>=12?"strong-overlap":"mixed-preferences";
 return{mode:"couple",first:a,second:b,percentages:pct,leading,leaders,hasEnough:enough,differentFavorites,status,agreements,comparable,differences,domainComparison,method,profiles,domains};
}
if(questions.length!==18||domains.some(d=>questions.filter(q=>q.domain===d.id).length!==3)||questions.some(q=>q.options.length!==5||q.options[4].style!==null||q.options.slice(0,4).some((o,i)=>o.style!==ids[i])))throw Error("Unexpected quiz data shape");
return{ids,questions,domains,profiles,MIN_KNOWN,method,percentages,valid,person,calculate};
});
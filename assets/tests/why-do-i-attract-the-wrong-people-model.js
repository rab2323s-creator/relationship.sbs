/* Deterministic, non-diagnostic 0–100 Pattern Pull Index: higher = more
   self-reported responses consistent with attraction/choice pressure. */
(function(root){'use strict';
const IDS=['availability','chemistry','potential','boundaries','urgency'];
function score(answers,data){
 if(!data||!Array.isArray(data.questions)||data.questions.length!==15||!Array.isArray(data.dimensions)||data.dimensions.length!==5)throw Error('Invalid quiz data.');
 if(!Array.isArray(answers)||answers.length!==15)throw Error('Answer all 15 questions to see your result.');
 const totals=Object.fromEntries(IDS.map(id=>[id,0]));
 const evidence=[];
 const seen=Object.fromEntries(IDS.map(id=>[id,0]));
 data.questions.forEach((q,i)=>{
  const choice=answers[i];
  if(!IDS.includes(q.dimension)||!Array.isArray(q.options)||q.options.length!==4)throw Error('Invalid question data.');
  if(!Number.isInteger(choice)||choice<0||choice>=4)throw Error('Answer all 15 questions to see your result.');
  const o=q.options[choice];
  if(!o||!Number.isInteger(o.points)||o.points<0||o.points>3)throw Error('Invalid scoring value.');
  totals[q.dimension]+=o.points;
  seen[q.dimension]++;
  evidence.push({number:i+1,dimension:q.dimension,points:o.points,question:q.text,answer:o.text});
 });
 if(IDS.some(id=>seen[id]!==3))throw Error('Each reflection dimension must have three scenarios.');
 const total=IDS.reduce((sum,id)=>sum+totals[id],0);
 const index=Math.round(total/45*100);
 const ranked=IDS.slice().sort((a,b)=>totals[b]-totals[a]||IDS.indexOf(a)-IDS.indexOf(b));
 const gap=totals[ranked[0]]-totals[ranked[1]];
 let primary;
 if(Math.max(...Object.values(totals))<=3&&total<=12)primary='healthy';
 else if(totals[ranked[0]]>=5&&gap>=2)primary=ranked[0];
 else primary='mixed';
 const topThree=ranked.slice(0,3).map(id=>({id,points:totals[id],outOf:9}));
 const strongestEvidence=ranked.slice(0,3).map(id=>{
  const matches=evidence.filter(x=>x.dimension===id).sort((a,b)=>b.points-a.points||a.number-b.number);
  return matches[0];
 });
 const strengths=IDS.slice().sort((a,b)=>totals[a]-totals[b]||IDS.indexOf(a)-IDS.indexOf(b)).slice(0,2);
 const watch=ranked.slice(0,2);
 return {primary,index,total,max:45,totals,ranked,gap,mixed:primary==='mixed',topThree,strongestEvidence,strengths,watch,evidence};
}
root.WrongPeopleQuizModel={score};
if(typeof module!=='undefined'&&module.exports)module.exports={score};
})(typeof globalThis!=='undefined'?globalThis:this);

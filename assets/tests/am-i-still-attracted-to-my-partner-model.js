/* Original nonclinical four-context attraction model; no personal data storage. */
(function(root){'use strict';
const ids=['present','context','distance','shift'];
function score(answers,data){
 if(!data||!Array.isArray(data.questions)||data.questions.length!==12||!Array.isArray(answers)||answers.length!==12)throw Error('Please complete all 12 questions.');
 const counts=Object.fromEntries(ids.map(id=>[id,0])),evidence=[];
 data.questions.forEach((q,i)=>{
   const v=answers[i];
   if(!Number.isInteger(v)||v<0||v>=q.options.length)throw Error('Please answer every question before seeing your result.');
   const option=q.options[v];
   if(!ids.includes(option.dimension)||option.weight!==1)throw Error('The quiz model could not validate this answer.');
   counts[option.dimension]+=option.weight;
   evidence.push({number:i+1,dimension:option.dimension,question:q.text,answer:option.text,insight:option.insight});
 });
 const ranked=ids.slice().sort((a,b)=>counts[b]-counts[a]||ids.indexOf(a)-ids.indexOf(b));
 const gap=counts[ranked[0]]-counts[ranked[1]];
 const tied=gap===0,mixed=gap<=1;
 return {primary:ranked[0],secondary:ranked[1],counts,ranked,gap,tied,mixed,evidence,
   primaryEvidence:evidence.filter(e=>e.dimension===ranked[0]),
   secondaryEvidence:evidence.filter(e=>e.dimension===ranked[1])};
}
root.AttractionReflectionModel={score};
if(typeof module!=='undefined'&&module.exports)module.exports={score};
})(typeof globalThis!=='undefined'?globalThis:this);

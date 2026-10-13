/* Deterministic, non-clinical scoring: 15 items × 0–3; five balanced dimensions. */
(function(root){'use strict';
const score=function score(answers,d){
 if(!d||!Array.isArray(d.questions)||d.questions.length!==15||!Array.isArray(answers)||answers.length!==15)throw Error("Complete all 15 questions to see your result.");
 const byDim={};for(const dim of d.dimensions)byDim[dim.id]={id:dim.id,label:dim.label,short:dim.short,total:0,max:0,answers:[]};
 const evidence=[];let total=0;
 for(let i=0;i<15;i++){
  const q=d.questions[i],idx=answers[i];if(!Number.isInteger(idx)||idx<0||idx>=4)throw Error("Every question needs one answer.");
  const opt=q.options[idx];if(!Number.isInteger(opt.value)||opt.value<0||opt.value>3||!byDim[q.dimension])throw Error("Invalid scoring data.");
  const dim=byDim[q.dimension];dim.total+=opt.value;dim.max+=3;total+=opt.value;
  const record={number:i+1,id:q.id,dimension:q.dimension,answer:opt.label,insight:opt.insight,value:opt.value};
  dim.answers.push(record);evidence.push(record);
 }
 const dims=d.dimensions.map(dim=>({...byDim[dim.id],percent:Math.round(byDim[dim.id].total/byDim[dim.id].max*100)}));
 const overall=Math.round(total/45*100);
 const band=d.bands.find(b=>overall>=b.min&&overall<=b.max);
 if(!band)throw Error("Unable to calculate a valid result.");
 const hi=dims.slice().sort((a,b)=>b.total-a.total||d.dimensions.findIndex(x=>x.id===a.id)-d.dimensions.findIndex(x=>x.id===b.id));
 const lo=dims.slice().sort((a,b)=>a.total-b.total||d.dimensions.findIndex(x=>x.id===a.id)-d.dimensions.findIndex(x=>x.id===b.id));
 const strongCut=hi[2].total;
 const strongest=hi.filter(x=>x.total>=strongCut&&x.percent>=55);
 const ambiguousStrong=strongest.length>3||hi[0].total===hi[4].total;
 const displayedStrong=ambiguousStrong?hi.filter(x=>x.total===hi[0].total&&x.percent>=55).slice(0,3):strongest.slice(0,3);
 const growthCandidates=lo.filter(x=>x.percent<=66);
 const growth=growthCandidates.length && lo[0].total!==lo[4].total?growthCandidates.filter(x=>x.total<=lo[Math.min(1,growthCandidates.length-1)].total):[];
 const ambiguousGrowth=growth.length>2;
 const displayedGrowth=ambiguousGrowth?growth.filter(x=>x.total===lo[0].total).slice(0,2):growth.slice(0,2);
 const close=hi[0].total-hi[1].total<=1;
 const contrast=hi[0].total-lo[0].total>=2;
 const responsePattern=hi[0].total===lo[0].total?
  "Your five dimensions are closely balanced. This quiz cannot distinguish a dominant romantic habit from these answers.":
  contrast?
  "Your answers place more emphasis on "+hi[0].short.toLowerCase()+" than on "+lo[0].short.toLowerCase()+". That contrast is a practical place to start a conversation.":
  "Your dimensions sit close together. More than one form of romance seems relevant, so a rigid style label would overstate the difference.";
 const evidencePick=[];
 const best=hi[0].answers.slice().sort((a,b)=>b.value-a.value)[0];
 const weakest=lo[0].answers.slice().sort((a,b)=>a.value-b.value)[0];
 const mid=evidence.filter(e=>e.number>=7&&e.number<=13&&e.number!==best.number&&e.number!==weakest.number)
  .sort((a,b)=>Math.abs(a.value-1.5)-Math.abs(b.value-1.5))[0];
 for(const item of [best,weakest,mid])if(item&&!evidencePick.some(e=>e.number===item.number))evidencePick.push(item);
 const chosen=d.dimensions.filter(dim=>displayedGrowth.some(x=>x.id===dim.id)).slice(0,3);
 const steps=chosen.map(x=>x.step);for(const dim of d.dimensions)if(steps.length<3&&!chosen.some(x=>x.id===dim.id))steps.push(dim.step);
 const guideDim=displayedGrowth[0]||lo[0];
 return {score:overall,rawTotal:total,band,dimensions:dims,strongest:displayedStrong,growth:displayedGrowth,
 ambiguousStrong,ambiguousGrowth,close,responsePattern,contrast,
 examples:evidencePick,steps:steps.slice(0,3),prompt:guideDim.prompt,
 note:"This is a self-reflection score of the romantic behaviors you selected, not a validated psychological scale or a measure of your spouse's feelings."};
};
const model={score};root.MarriageRomanceModel=model;if(typeof module!=='undefined'&&module.exports)module.exports=model;
})(typeof globalThis!=='undefined'?globalThis:this);

(function(){
  'use strict';
  const data=window.SexualCompatibilityData;
  const root=document.getElementById('sexualCompatibilityQuiz');
  if(!root || !data || !Array.isArray(data.questions) || data.questions.length!==15) return;
  const N=data.questions.length;
  let answers=Array(N).fill(null), index=0;
  const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  const percent=(v)=>Math.max(0,Math.min(100,Math.round(v)));
  const findDim=id=>data.dimensions.find(d=>d.id===id);
  function calculate(responses){
    if(!Array.isArray(responses) || responses.length!==N || responses.some((v,i)=>!Number.isInteger(v)||v<0||v>=data.questions[i].options.length)) throw new Error('Complete all questions first.');
    const dims=data.dimensions.map(d=>{
      const selected=data.questions.flatMap((q,i)=>q.dimension===d.id?[{question:q,option:q.options[responses[i]],questionIndex:i}]:[]);
      const max=4*selected.reduce((sum,a)=>sum+a.question.weight,0);
      const used=selected.reduce((sum,a)=>sum+a.question.weight*a.option.value,0);
      return {...d,score:percent(100*(1-used/max)),selected};
    });
    const score=percent(dims.reduce((sum,d)=>sum+d.score*d.weight,0));
    const profile=data.profiles.find(p=>score>=p.min) || data.profiles[data.profiles.length-1];
    const strongest=dims.slice().sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
    const attention=dims.slice().sort((a,b)=>a.score-b.score||a.name.localeCompare(b.name));
    const concerns=data.questions.flatMap((q,i)=>{
      const opt=q.options[responses[i]];
      return opt.flag ? [{question:q,option:opt,questionIndex:i}] : [];
    });
    const signals=attention.flatMap(d=>d.selected.map(a=>({...a,dimensionName:d.name})))
      .filter(e=>e.option.value>0)
      .sort((a,b)=>(b.option.value*b.question.weight)-(a.option.value*a.question.weight))
      .slice(0,3);
    const signs=strongest.flatMap(d=>d.selected.map(a=>({...a,dimensionName:d.name})))
      .filter(e=>e.option.value<=1)
      .sort((a,b)=>a.option.value-b.option.value||b.question.weight-a.question.weight)
      .slice(0,2);
    return {score,profile,dims,strongest,attention,concerns,signals,signs};
  }
  function focusHeading(container){
    const h=container.querySelector('[tabindex="-1"]');
    if(h){h.focus({preventScroll:true});}
    const reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.scrollIntoView({block:'start',behavior:reduce?'auto':'smooth'});
  }
  function choose(choice){
    answers[index]=choice;
    if(index===N-1){renderResult();return;}
    index++;renderQuestion(true);
  }
  function renderQuestion(focus){
    root.replaceChildren();
    const q=data.questions[index],section=node('section','sc-quiz-card');section.setAttribute('aria-label',`Question ${index+1} of ${N}`);
    const top=node('div','sc-quiz-top');
    top.append(node('span','sc-counter',`Question ${index+1} of ${N}`));
    if(index>0){const back=node('button','sc-back','← Back');back.type='button';back.addEventListener('click',()=>{index--;renderQuestion(true);});top.append(back);}
    section.append(top);
    const progress=node('div','sc-progress');progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','Question progress');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax',String(N));progress.setAttribute('aria-valuenow',String(index));
    const fill=node('span','sc-progress-fill');fill.style.width=`${(index/N)*100}%`;progress.append(fill);section.append(progress);
    const heading=node('h2','sc-question',q.prompt);heading.tabIndex=-1;section.append(heading);
    const list=node('div','sc-options');q.options.forEach((option,i)=>{
      const b=node('button','sc-choice',option.text);b.type='button';b.addEventListener('click',()=>choose(i));
      if(answers[index]===i)b.classList.add('sc-choice-selected');
      list.append(b);
    });section.append(list);root.append(section);if(focus)focusHeading(section);
  }
  function resultRow(label,description,score,cls){
    const wrap=node('div','sc-dimension');const top=node('div','sc-dimension-top');top.append(node('strong','',label),node('span','',`${score}/100`));
    wrap.append(top);const meter=node('div','sc-meter');meter.setAttribute('role','meter');meter.setAttribute('aria-label',label);meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','100');meter.setAttribute('aria-valuenow',String(score));
    const fill=node('span',cls||'');fill.style.width=`${score}%`;meter.append(fill);wrap.append(meter,node('p','sc-dimension-description',description));return wrap;
  }
  function addText(parent,tag,cls,text){const e=node(tag,cls,text);parent.append(e);return e;}
  function renderResult(){
    const r=calculate(answers);root.replaceChildren();
    const section=node('section','sc-results');section.setAttribute('aria-label','Your sexual compatibility test results');
    addText(section,'p','sc-result-kicker','Your personalized reflection');
    const h=addText(section,'h2','sc-result-title',r.profile.title);h.tabIndex=-1;
    const scoreArea=node('div','sc-score-area');const scorebox=node('div','sc-score');
    addText(scorebox,'span','sc-score-number',`${r.score}`);addText(scorebox,'span','sc-score-out','/100');
    addText(scoreArea,'p','sc-score-label','Perceived compatibility signals');scoreArea.append(scorebox);
    addText(scoreArea,'p','sc-score-note','A descriptive self-reflection score, not a medical or scientifically validated measure.');
    section.append(scoreArea);addText(section,'p','sc-result-intro',r.profile.explanation);
    if(r.concerns.length){
      const safety=node('div','sc-safety-note');addText(safety,'h3','','Your boundaries deserve attention');
      addText(safety,'p','','One or more responses described pressure or a request to stop that was not respected. This is more important than the total score. Consent is voluntary and can be withdrawn at any time; seek trusted support if you feel unsafe.');
      section.append(safety);
    }
    const strengths=node('section','sc-section');addText(strengths,'h3','','Your strongest dimensions');
    const names=r.strongest.slice(0,2).map(d=>d.short).join(' and ');
    addText(strengths,'p','',`Your highest-scoring areas are ${names.toLowerCase()}. These are strengths in your answers, not proof that your partner sees everything the same way.`);
    if(r.signs.length){const ul=node('ul','sc-evidence');r.signs.forEach(s=>addText(ul,'li','',s.option.insight));strengths.append(ul);}section.append(strengths);
    const dims=node('section','sc-section');addText(dims,'h3','','Your five dimensions');
    addText(dims,'p','sc-section-lead','Higher scores reflect more mutually workable experiences as you reported them; differences in desire are not a defect.');
    r.dims.forEach(d=>dims.append(resultRow(d.name,d.summary,d.score,d.id==='consent'?'sc-consent-meter':'')));section.append(dims);
    const evidence=node('section','sc-section');addText(evidence,'h3','','Why you received this result');
    if(r.signals.length){addText(evidence,'p','','These specific answers most influenced your areas for discussion:');const ul=node('ul','sc-evidence');
      r.signals.forEach(s=>{const li=node('li');addText(li,'strong','',s.option.insight);addText(li,'span','',' You answered: “'+s.option.text+'”');ul.append(li);});evidence.append(ul);
    }else{addText(evidence,'p','','Across all 15 answers, you described respectful conversations and shared flexibility. Continue checking in as life and preferences change.');}
    section.append(evidence);
    const steps=node('section','sc-section');addText(steps,'h3','','What to do next');
    const ol=node('ol','sc-next');
    if(r.concerns.length){addText(ol,'li','','Prioritize safety: avoid treating pressure as a communication puzzle to solve alone. A trusted support service or professional may help you decide what you need.');}
    const seen=new Set();r.attention.slice(0,3).forEach(d=>{if(!seen.has(d.action)){addText(ol,'li','',d.action);seen.add(d.action);}});
    addText(ol,'li','','If it feels safe, invite your partner to answer the questions independently and compare themes—not just totals. Your answers cannot reveal their private perspective.');
    steps.append(ol);section.append(steps);
    const actions=node('div','sc-result-actions');const retry=node('button','sc-restart','Retake the 15 questions');retry.type='button';retry.addEventListener('click',()=>{answers=Array(N).fill(null);index=0;renderQuestion(true);});actions.append(retry);section.append(actions);
    addText(section,'p','sc-fineprint','This test is educational, non-diagnostic and not a substitute for clinical advice or safety support. Responses are processed in your browser by this quiz and are not saved by the quiz.');
    root.append(section);focusHeading(section);
  }
  window.SexualCompatibilityQuizTesting=Object.freeze({calculate});
  renderQuestion(false);
})();
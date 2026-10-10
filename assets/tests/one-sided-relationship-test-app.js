(function(){
  'use strict';
  const quiz=window.OneSidedTest;
  const mount=document.getElementById('oneSidedQuiz');
  if(!mount || !quiz) return;
  const total=quiz.questions.length, answers=new Array(total).fill(null);
  let index=0, complete=false;
  const el=(tag,cls,content)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;return n;};
  function clear(){mount.replaceChildren();}
  function focusResult(){const h=mount.querySelector('[tabindex="-1"]');if(h)h.focus({preventScroll:true});mount.scrollIntoView({block:'start',behavior:'instant'});}
  function choice(i){answers[index]=i;if(index===total-1){complete=true;renderResults();}else{index+=1;renderQuestion();}}
  function renderQuestion(){
    complete=false;clear();const q=quiz.questions[index];
    const card=el('section','os-question');card.setAttribute('aria-label','Question '+(index+1)+' of '+total);
    const top=el('div','os-question-top');top.append(el('span','os-step','Question '+(index+1)+' of '+total));
    if(index>0){const back=el('button','os-back','← Back');back.type='button';back.addEventListener('click',()=>{index--;renderQuestion();});top.append(back);}
    card.append(top);
    const track=el('div','os-progress');track.setAttribute('role','progressbar');track.setAttribute('aria-label','Quiz progress');track.setAttribute('aria-valuenow',String(index+1));track.setAttribute('aria-valuemin','1');track.setAttribute('aria-valuemax',String(total));
    const fill=el('span','os-progress-fill');fill.style.width=((index+1)/total*100)+'%';track.append(fill);card.append(track);
    const h=el('h2','os-question-title',q.text);h.id='osQuestion';h.tabIndex=-1;card.append(h);
    const choices=el('div','os-options');choices.setAttribute('role','group');choices.setAttribute('aria-labelledby','osQuestion');
    q.options.forEach((opt,i)=>{const b=el('button','os-choice',opt.label);b.type='button';b.dataset.answer=String(i);if(answers[index]===i)b.classList.add('os-selected');b.addEventListener('click',()=>choice(i));choices.append(b);});
    card.append(choices);mount.append(card);if(index>0)h.focus({preventScroll:true});
  }
  function heading(txt){return el('h3','os-section-title',txt);}
  function paragraph(txt,cls){return el('p',cls||'',txt);}
  function renderResults(){
    const r=quiz.score(answers);clear();
    const section=el('section','os-result');section.setAttribute('aria-label','Your relationship effort result');
    const eyebrow=el('div','os-result-eyebrow','Your relationship effort result · 12 answers');
    const h=el('h2','os-result-title',r.profile.title);h.tabIndex=-1;
    const overview=el('div','os-result-overview');
    const score=el('div','os-score');const value=el('strong','',String(r.score));const max=el('span','','/100');score.append(value,max);
    const note=el('div','os-score-note');note.append(el('strong','','One-sided effort score'),paragraph('Higher scores mean more imbalance in your selected answers. Not a clinical rating.'));
    overview.append(score,note);section.append(eyebrow,h,overview,paragraph(r.profile.summary,'os-summary'));
    const dimHeading=heading('Your four dimensions');section.append(dimHeading);
    const dims=el('div','os-dimensions');
    r.ranking.forEach((dim,idx)=>{const box=el('div','os-dimension');const top=el('div','os-dimension-top');top.append(el('span','',dim.name),el('strong','',dim.score+'/100'));const rail=el('div','os-meter');rail.setAttribute('role','meter');rail.setAttribute('aria-label',dim.name+' one-sidedness');rail.setAttribute('aria-valuenow',String(dim.score));rail.setAttribute('aria-valuemin','0');rail.setAttribute('aria-valuemax','100');const fill=el('span','');fill.style.width=dim.score+'%';rail.append(fill);box.append(top,rail);if(idx<2 && dim.score>=35) box.append(paragraph(dim.description,'os-dimension-desc'));dims.append(box);});section.append(dims);
    section.append(heading(r.score<25?'Where your answers show mutual care':'Why this result fits your answers'));
    const evidence=el('div','os-evidence');r.evidence.forEach(e=>{const box=el('div','os-evidence-item');box.append(el('strong','',e.insight.charAt(0).toUpperCase()+e.insight.slice(1)),paragraph('You chose: “'+e.answer+'”'));evidence.append(box);});section.append(evidence);
    const contextual=(r.score<25)?'Your strongest scores are low, so the answers above point to shared effort rather than a persistent one-sided pattern. The lower-scoring dimension is your relative strength, not a reason for concern.':
      'Your highest-pressure area is '+r.top.name.toLowerCase()+' ('+r.top.score+'/100). '+(r.second.score>=35?'A second area—'+r.second.name.toLowerCase()+' ('+r.second.score+'/100)—also contributed. ':'')+'This comparison comes from the specific situations you selected, not a guess about your partner’s motives.';
    section.append(paragraph(contextual,'os-personalized'));
    section.append(heading('What to do next'));
    const steps=el('ol','os-steps');
    const advice=r.caveat?[
      'If naming your needs brings retaliation, intimidation or fear, prioritize safety and talk privately with someone you trust before seeking a confrontation.',
      'Record concrete examples for yourself so your judgment is based on repeated actions, not one apology or one difficult evening.',
      'Consider professional or community support if you feel controlled, threatened, or unable to make choices safely.'
    ]:(r.score<25?[
      'Tell each other which acts of care make the relationship feel mutual.',
      'Check in after busy periods instead of measuring the connection day by day.',
      'Keep noticing when a previously balanced responsibility becomes one-sided.'
    ]:r.steps);
    advice.forEach(txt=>steps.append(el('li','',txt)));section.append(steps);
    const disclaimer=paragraph('This is an original, research-informed reflection tool, not a validated psychological test or a measure of your partner’s character. A temporary crisis, illness, disability, distance or unequal available time can affect the pattern. A score never overrides concerns about abuse, coercion or safety.','os-disclaimer');section.append(disclaimer);
    const controls=el('div','os-result-actions');const again=el('button','os-restart','Retake the test');again.type='button';again.addEventListener('click',()=>{answers.fill(null);index=0;renderQuestion();mount.scrollIntoView({block:'start',behavior:'instant'});});controls.append(again);
    const related=el('a','os-related','Read about expressing your needs →');related.href='/blog/communication-needs/';controls.append(related);section.append(controls);
    mount.append(section);focusResult();
  }
  window.addEventListener('keydown',(e)=>{
    if(complete || !document.getElementById('oneSidedQuiz'))return;
    const tag=(document.activeElement && document.activeElement.tagName || '').toLowerCase();
    if(e.altKey||e.ctrlKey||e.metaKey||['input','textarea','select'].includes(tag))return;
    if(e.key==='ArrowLeft' && index>0){e.preventDefault();index--;renderQuestion();}
  });
  renderQuestion();
})();
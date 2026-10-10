(function () {
  'use strict';
  const data = window.SexlessMarriageQuizData;
  const root = document.getElementById('sexlessMarriageQuiz');
  if (!root || !data || !Array.isArray(data.questions) || data.questions.length !== 15) return;
  const N = data.questions.length;
  let answers = Array(N).fill(null);
  let index = 0;
  const clamp = value => Math.max(0, Math.min(100, Math.round(value)));
  const make = (tag, className, content) => {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (content !== undefined) n.textContent = content;
    return n;
  };
  const add = (parent, tag, className, content) => {
    const n = make(tag, className, content);
    parent.append(n);
    return n;
  };
  const formatAnswer = item => `“${item.option.text}”`;
  const sortConcerns = (a, b) => (b.option.value * b.question.weight) - (a.option.value * a.question.weight);

  function calculate(chosen) {
    if (!Array.isArray(chosen) || chosen.length !== N || chosen.some((v, i) => !Number.isInteger(v) || v < 0 || v >= data.questions[i].options.length)) {
      throw new Error('Answer all 15 questions before calculating a result.');
    }
    const dimensions = data.dimensions.map(d => {
      const selected = data.questions.flatMap((question, questionIndex) => question.dimension === d.id ? [{ question, questionIndex, option: question.options[chosen[questionIndex]] }] : []);
      const max = selected.reduce((sum, item) => sum + (4 * item.question.weight), 0);
      const raw = selected.reduce((sum, item) => sum + (item.option.value * item.question.weight), 0);
      return Object.assign({}, d, { score: clamp(100 * raw / max), selected });
    });
    const score = clamp(dimensions.reduce((sum, d) => sum + d.score * d.weight, 0));
    const profile = data.profiles.find(p => score >= p.min);
    const ranked = dimensions.slice().sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
    const strengths = dimensions.slice().sort((a, b) => a.score - b.score || a.id.localeCompare(b.id));
    const signals = ranked.flatMap(d => d.selected.map(s => Object.assign({dimension: d.short}, s))).filter(s => s.option.value >= 2).sort(sortConcerns).slice(0, 3);
    const protections = strengths.flatMap(d => d.selected.map(s => Object.assign({dimension: d.short}, s))).filter(s => s.option.value <= 1).sort((a,b) => a.option.value - b.option.value || b.question.weight - a.question.weight).slice(0, 2);
    const flags = data.questions.flatMap((q, i) => q.options[chosen[i]].flag ? [{question: q, option: q.options[chosen[i]], questionIndex:i}] : []);
    const top = ranked[0];
    const runnerUp = ranked[1];
    const lowest = strengths[0];
    const concerned = score >= 40;
    const steps = [top.action, runnerUp.action, profile.step];
    return { score, profile, dimensions, ranked, strengths, signals, protections, flags, top, runnerUp, lowest, concerned, steps: steps.filter((s,i) => steps.indexOf(s) === i) };
  }

  function bringIntoView(card) {
    const heading = card.querySelector('[tabindex="-1"]');
    if (heading) heading.focus({preventScroll:true});
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.scrollIntoView({block: 'start', behavior: reduced ? 'auto' : 'smooth'});
  }
  function choose(optionIndex) {
    answers[index] = optionIndex;
    if (index === N - 1) renderResult();
    else { index += 1; renderQuestion(true); }
  }
  function renderQuestion(focus) {
    const q = data.questions[index];
    const card = make('section', 'smq-card');
    card.setAttribute('aria-label', `Question ${index+1} of ${N}`);
    const top = add(card,'div','smq-top');
    add(top,'span','smq-counter',`${index+1} / ${N}`);
    if (index > 0) {
      const back = add(top,'button','smq-back','← Back');
      back.type = 'button';
      back.addEventListener('click',()=>{index -= 1;renderQuestion(true);});
    }
    const progress = add(card,'div','smq-progress');
    progress.setAttribute('role','progressbar');
    progress.setAttribute('aria-valuemin','0');
    progress.setAttribute('aria-valuemax',String(N));
    progress.setAttribute('aria-valuenow',String(index));
    progress.setAttribute('aria-label','Quiz progress');
    const progressBar = add(progress,'span','smq-progress-bar');
    progressBar.style.width = `${(100*index/N).toFixed(1)}%`;
    const question = add(card,'h2','smq-question',q.text);
    question.tabIndex = -1;
    const list = add(card,'div','smq-choices');
    q.options.forEach((opt,i)=>{
      const btn = add(list,'button','smq-choice',opt.text);
      btn.type = 'button';
      if (answers[index] === i) {btn.classList.add('smq-chosen');btn.setAttribute('aria-pressed','true');}
      btn.addEventListener('click',()=>choose(i));
    });
    root.replaceChildren(card);
    if (focus) bringIntoView(card);
  }
  function bar(parent, dim) {
    const row = add(parent,'div','smq-dim');
    const top = add(row,'div','smq-dim-top');
    add(top,'strong','',dim.name);
    add(top,'span','',`${dim.score}/100`);
    const meter = add(row,'div','smq-meter');
    meter.setAttribute('role','meter');meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','100');meter.setAttribute('aria-valuenow',String(dim.score));meter.setAttribute('aria-label',dim.name+' strain');
    add(meter,'span','smq-meter-fill').style.width=dim.score+'%';
    add(row,'p','smq-dim-explain',dim.summary);
  }
  function evidence(parent, list, kind) {
    const ul = add(parent,'ul','smq-evidence');
    list.forEach(item=>{
      const li = add(ul,'li','');
      add(li,'strong','',item.option.insight);
      add(li,'span','',`Your answer: ${formatAnswer(item)}`);
    });
  }
  function renderResult() {
    const r = calculate(answers);
    const card = make('section','smq-results');
    card.setAttribute('aria-label','Your sexless marriage quiz result');
    add(card,'p','smq-kicker','Your personal reflection');
    const heading = add(card,'h2','smq-results-heading',r.profile.title);
    heading.tabIndex = -1;
    const scoreBox = add(card,'div','smq-score-box');
    add(scoreBox,'p','smq-score-name','Connection Strain Score');
    const s = add(scoreBox,'div','smq-number');
    add(s,'strong','',String(r.score));add(s,'span','','/100');
    add(scoreBox,'p','smq-score-caption','Higher = more strain reported; this is not a probability of divorce or a diagnosis.');
    add(card,'p','smq-summary',r.profile.description);

    if(r.flags.length){
      const safety = add(card,'section','smq-safety');
      add(safety,'h3','','Important: pressure and personal boundaries');
      add(safety,'p','','At least one answer describes pressure, guilt, or consequences connected to saying no or raising concerns. That needs attention regardless of the total score. No one owes sexual intimacy, and a quiz cannot decide whether a situation is safe. If you feel afraid or controlled, consider confidential help from a trusted professional or a local support service rather than confronting someone alone.');
    }

    const insights = add(card,'section','smq-block');
    add(insights,'h3','','What stands out in your answers');
    if (r.score===0) {
      add(insights,'p','','Across all 15 answers, you described a mutually workable rhythm, warmth, and respectful communication. Little or no sex does not automatically make a marriage troubled.');
    } else {
      add(insights,'p','',`Your highest reported strain is in ${r.top.name.toLowerCase()} (${r.top.score}/100). ${r.runnerUp.name} is next (${r.runnerUp.score}/100). These are specific themes to explore, not proof of a single cause.`);
    }
    if(r.signals.length){add(insights,'p','','These selected experiences contributed most to the areas needing attention:');evidence(insights,r.signals,'concern');}
    if(r.protections.length){add(insights,'h4','','What seems to be helping');evidence(insights,r.protections,'strength');}

    const dims=add(card,'section','smq-block');
    add(dims,'h3','','Your five dimensions');
    add(dims,'p','','Each score summarizes three scenario answers. Higher values indicate more reported strain in that area.');
    r.dimensions.forEach(d=>bar(dims,d));

    const plan=add(card,'section','smq-block');
    add(plan,'h3','','Your next steps');
    const ol=add(plan,'ol','smq-steps');
    if(r.flags.length)add(ol,'li','','Put consent and safety first. Seek confidential guidance when pressure or fear is present; do not treat agreeing to sex as a solution.');
    r.steps.forEach(step=>add(ol,'li','',step));
    add(ol,'li','','If it feels safe and welcome, invite your partner to reflect separately and compare experiences rather than treating one person’s result as the whole truth.');
    const reset=add(card,'button','smq-reset','Retake the quiz');reset.type='button';reset.addEventListener('click',()=>{answers=Array(N).fill(null);index=0;renderQuestion(true);});
    add(card,'p','smq-fine','Original educational self-reflection; not a validated assessment. Responses stay in this browser session and are not submitted to our server by this quiz.');
    root.replaceChildren(card);
    bringIntoView(card);
  }
  window.SexlessMarriageQuizTesting = Object.freeze({calculate});
  renderQuestion(false);
})();
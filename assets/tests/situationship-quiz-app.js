/* Accessible one-question-at-a-time UI. Responses stay in page memory only. */
(function () {
  "use strict";
  const model=window.SituationshipQuiz;
  const root=document.getElementById("situationshipQuiz");
  if (!root || !model) return;
  const answers=Array(model.questions.length).fill(null);
  let current=0;
  const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const completed=()=>answers.filter(a=>a!==null).length;

  function focusHeading() {
    const heading=root.querySelector("[data-focus]");
    if(heading) heading.focus({preventScroll:true});
  }
  function drawQuestion(focus) {
    const q=model.questions[current];
    const done=completed();
    root.innerHTML=`<section class="sq-panel" aria-label="Situationship quiz question">
      <div class="sq-status"><span>Question ${current+1} of ${model.questions.length}</span><span class="sq-count">${done} answered</span></div>
      <div class="sq-track" role="progressbar" aria-label="Questions answered" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="15"><div class="sq-fill" style="width:${done/model.questions.length*100}%"></div></div>
      <fieldset class="sq-fieldset"><legend id="sq-question-title" class="sq-question-title" tabindex="-1" data-focus>${escapeHtml(q.prompt)}</legend>
        <div class="sq-options">${q.options.map((o,i)=>`<label class="sq-option ${answers[current]===i?"sq-checked":""}">
          <input type="radio" name="sq-answer" value="${i}" ${answers[current]===i?"checked":""} aria-describedby="sq-help">
          <span class="sq-option-text">${escapeHtml(o.label)}</span></label>`).join("")}</div>
      </fieldset>
      <p class="sq-help" id="sq-help">Choose the answer that best matches the usual pattern. You can go back and change it.</p>
      <div class="sq-actions"><button type="button" class="sq-secondary" data-action="back" ${current===0?"disabled":""}>Previous</button>
        <button type="button" class="sq-primary" data-action="next" ${answers[current]===null?"disabled":""}>${current===14?"See my results":"Next question"} <span aria-hidden="true">→</span></button></div>
    </section>`;
    if (focus) focusHeading();
  }
  function drawResult() {
    const result=model.calculate(answers);
    const list=items=>items.map(x=>`<li>${escapeHtml(x)}</li>`).join("");
    root.innerHTML=`<section class="sq-panel sq-result" aria-labelledby="sq-result-title">
      <p class="sq-eyebrow">Your personal reflection</p>
      <h2 id="sq-result-title" class="sq-result-title" tabindex="-1" data-focus>${escapeHtml(result.title)}</h2>
      <div class="sq-score-row"><div class="sq-total"><strong>${result.score}</strong><span> / 100</span></div><p>Higher scores mean more reported clarity, consistency and evidence of commitment—not a prediction of anyone's feelings.</p></div>
      <p class="sq-summary">${escapeHtml(result.summary)} ${escapeHtml(result.patterns.join(" "))}</p>
      <h3>What your answers suggest</h3><div class="sq-dims">${Object.entries(model.dimensions).map(([id,label])=>`<div class="sq-dim"><div class="sq-dim-top"><span>${escapeHtml(label)}</span><strong>${result.scores[id]}/100</strong></div><div class="sq-meter" role="meter" aria-label="${escapeHtml(label)} score" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${result.scores[id]}"><span style="width:${result.scores[id]}%"></span></div></div>`).join("")}</div>
      <div class="sq-two"><div><h3>Strongest positive signals</h3><ul>${list(result.positives)}</ul></div><div><h3>Main areas of uncertainty</h3><ul>${list(result.uncertainties)}</ul></div></div>
      <h3>Three practical next steps</h3><ol>${list(result.steps)}</ol>
      <h3>One way to start the conversation</h3><blockquote class="sq-script">“${escapeHtml(result.starter)}”</blockquote>
      <p class="sq-disclaimer">This is an original, unvalidated self-reflection quiz—not a diagnosis, a safety assessment or proof of someone else's intentions. Your choices are processed only in this browser tab; this quiz does not save or send them.</p>
      <div class="sq-actions"><button type="button" class="sq-primary" data-action="retake">Retake the quiz</button><a class="sq-secondary sq-link" href="/blog/situationship-signs/">Read the signs of a situationship</a></div>
    </section>`;
    focusHeading();
    root.scrollIntoView({behavior:"instant",block:"start"});
  }
  root.addEventListener("change",e=>{
    if(!e.target.matches('input[name="sq-answer"]'))return;
    const value=Number(e.target.value);
    if(!Number.isInteger(value)||value<0||value>3)return;
    answers[current]=value;
    root.querySelectorAll(".sq-option").forEach((el,i)=>el.classList.toggle("sq-checked",i===value));
    const next=root.querySelector('[data-action="next"]');
    if(next)next.disabled=false;
    const bar=root.querySelector('[role="progressbar"]'),done=completed();
    if(bar){bar.setAttribute("aria-valuenow",String(done));bar.querySelector(".sq-fill").style.width=(100*done/15)+"%";}
    const count=root.querySelector(".sq-count");
    if(count)count.textContent=done+" answered";
  });
  root.addEventListener("click",e=>{
    const btn=e.target.closest("[data-action]");
    if(!btn||btn.disabled)return;
    const action=btn.dataset.action;
    if(action==="back" && current>0){current--;drawQuestion(true);}
    if(action==="next"){
      if(answers[current]===null)return;
      if(current<14){current++;drawQuestion(true);}
      else {
        const missing=answers.findIndex(a=>a===null);
        if(missing!==-1){current=missing;drawQuestion(true);}else drawResult();
      }
    }
    if(action==="retake"){
      answers.fill(null);current=0;drawQuestion(true);
      root.scrollIntoView({behavior:"instant",block:"start"});
    }
  });
  drawQuestion(false);
})();
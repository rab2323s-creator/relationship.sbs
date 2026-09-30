/* love-bombing.js — original 12-question educational self-reflection test */
(function(){
  'use strict';

  const DIMENSIONS = {
    accelerated_attachment: {
      label: 'Accelerated attachment',
      short: 'How quickly certainty, idealization, gifts, and future plans outrun real knowledge of each other.',
      weight: 0.20
    },
    boundary_pressure: {
      label: 'Boundary pressure',
      short: 'What happens when you slow down, say no, protect privacy, or choose a pace they do not prefer.',
      weight: 0.30
    },
    dependency_isolation: {
      label: 'Access & dependency pressure',
      short: 'Whether closeness becomes constant access, emotional responsibility, or pressure to shrink your outside life.',
      weight: 0.22
    },
    control_reactivity: {
      label: 'Control & reactivity',
      short: 'Whether warmth shifts into punishment, monitoring, withdrawal, or promise-withdraw cycles when reality creates friction.',
      weight: 0.28
    }
  };

  const QUESTIONS = [
    {
      dimension: 'accelerated_attachment',
      text: 'You have known each other only a short time. How far ahead is the relationship already being talked about?',
      options: [
        {label:'The future comes up naturally, but neither of us treats it as decided.', value:0},
        {label:'It is moving a little faster than I expected, but I still feel free to slow it down.', value:1},
        {label:'Big plans—trips, exclusivity, moving in, marriage, or family—come up before we know each other well.', value:3, tags:['future_rush']},
        {label:'A shared future is treated as obvious, and hesitation from me is taken personally.', value:4, tags:['future_rush','pace_pressure']}
      ]
    },
    {
      dimension: 'accelerated_attachment',
      text: 'What are their compliments and declarations most like?',
      options: [
        {label:'Specific and realistic. They can appreciate me without putting me on a pedestal.', value:0},
        {label:'Very enthusiastic, but still grounded in things they actually know about me.', value:1},
        {label:'They describe me as perfect, different from everyone, or exactly what they have always needed.', value:3, tags:['idealization']},
        {label:'They insist on an idealized version of me and react badly when I show complexity, limits, or flaws.', value:4, tags:['idealization','idealization_fragile']}
      ]
    },
    {
      dimension: 'accelerated_attachment',
      text: 'How do large gifts, favors, or romantic gestures feel this early?',
      options: [
        {label:'Proportionate to the relationship, with no sense that I owe anything back.', value:0},
        {label:'Sometimes bigger than I would choose, but they accept it if I say it is too much.', value:1},
        {label:'Grand gestures keep coming even after I say I am uncomfortable with the pace.', value:3, tags:['gesture_pressure']},
        {label:'What they give is later used to justify access, commitment, sex, time, or loyalty I did not agree to.', value:4, tags:['gesture_pressure','leverage']}
      ]
    },
    {
      dimension: 'boundary_pressure',
      text: 'You say, “I like you, but I want to slow this down.” What happens next?',
      options: [
        {label:'They accept it, and the pace actually changes.', value:0},
        {label:'They are disappointed, but they adjust without making me manage their feelings.', value:1},
        {label:'They keep persuading me, questioning my feelings, or making the slower pace feel unfair.', value:3, tags:['boundary_pressure']},
        {label:'They become angry, cold, threatening, or punish me for not matching their intensity.', value:4, tags:['boundary_pressure','safety_signal','punitive_reaction']}
      ]
    },
    {
      dimension: 'boundary_pressure',
      text: 'You are busy and cannot reply or see them as much as they want. How do they respond?',
      options: [
        {label:'They assume I have a life and reconnect when I am available.', value:0},
        {label:'They may check in once, but they do not turn my unavailability into a relationship problem.', value:1},
        {label:'They send repeated messages, guilt me, or ask whether I still care.', value:3, tags:['availability_pressure']},
        {label:'They accuse, retaliate, demand proof, or make me afraid of what happens when I am unavailable.', value:4, tags:['availability_pressure','safety_signal','fear_reaction']}
      ]
    },
    {
      dimension: 'boundary_pressure',
      text: 'When you say no to something intimate, personal, financial, or private, what is the usual response?',
      options: [
        {label:'My no is enough. They may ask a respectful question, but they stop.', value:0},
        {label:'They are disappointed, yet the boundary still stands without punishment.', value:1},
        {label:'They keep asking, bargaining, sulking, or framing the limit as rejection.', value:3, tags:['boundary_pressure']},
        {label:'They pressure, coerce, intimidate, or ignore the limit.', value:4, tags:['boundary_pressure','safety_signal','coercion']}
      ]
    },
    {
      dimension: 'dependency_isolation',
      text: 'How much access to you seems expected day to day?',
      options: [
        {label:'We can be close without being continuously reachable.', value:0},
        {label:'We talk a lot, but either of us can go offline without drama.', value:1},
        {label:'Near-constant contact is becoming an expectation rather than a choice.', value:3, tags:['constant_access']},
        {label:'They expect real-time access to my attention, schedule, or whereabouts and react badly without it.', value:4, tags:['constant_access','safety_signal','monitoring_pressure']}
      ]
    },
    {
      dimension: 'dependency_isolation',
      text: 'What happens when you keep plans with friends, family, or activities that do not include them?',
      options: [
        {label:'They support me having a full life outside the relationship.', value:0},
        {label:'They sometimes wish we had more time, but they do not compete with my support system.', value:1},
        {label:'They complain, sulk, or make outside relationships feel like a threat to us.', value:3, tags:['social_pressure']},
        {label:'They undermine, isolate, or pressure me to reduce contact with people who matter to me.', value:4, tags:['social_pressure','safety_signal','isolation']}
      ]
    },
    {
      dimension: 'dependency_isolation',
      text: 'How responsible do you feel for keeping them emotionally okay?',
      options: [
        {label:'I care about their feelings, but they remain responsible for regulating themselves.', value:0},
        {label:'They need a lot of reassurance sometimes, but I can still step away without panic.', value:1},
        {label:'I often feel like I am the only person who can calm, reassure, or stabilize them.', value:3, tags:['emotional_dependency']},
        {label:'Taking space makes me feel responsible for preventing a crisis or emotional collapse.', value:4, tags:['emotional_dependency','safety_signal','emotional_coercion']}
      ]
    },
    {
      dimension: 'control_reactivity',
      text: 'After you disagree, disappoint them, or stop mirroring the early intensity, what happens to the warmth?',
      options: [
        {label:'The relationship still feels caring, even while we disagree.', value:0},
        {label:'There can be tension, but we usually repair without affection becoming a weapon.', value:1},
        {label:'Affection drops sharply until I reassure, apologize, or fall back in line.', value:3, tags:['conditional_warmth']},
        {label:'Warmth flips into contempt, punishment, silent treatment, threats, or deliberate emotional withdrawal.', value:4, tags:['conditional_warmth','safety_signal','punitive_reaction']}
      ]
    },
    {
      dimension: 'control_reactivity',
      text: 'How are phone privacy, passwords, location, and social media handled?',
      options: [
        {label:'We can choose transparency without treating privacy as disloyalty.', value:0},
        {label:'They have asked for more access, but they accept my answer if I say no.', value:1},
        {label:'They frame passwords, location sharing, or phone access as proof of love or trust.', value:3, tags:['digital_control']},
        {label:'They monitor, track, search, or pressure access after I have not freely agreed to it.', value:4, tags:['digital_control','safety_signal','monitoring']}
      ]
    },
    {
      dimension: 'control_reactivity',
      text: 'When you compare the big promises with what actually happens over time, what pattern fits best?',
      options: [
        {label:'Promises are mostly realistic, and ordinary follow-through matches the words.', value:0},
        {label:'They sometimes overpromise, but they own it and recalibrate.', value:1},
        {label:'Huge future promises keep outpacing consistent everyday behavior.', value:3, tags:['promise_gap']},
        {label:'Grand promises or sudden affection return after conflict or distance, then fade again once I re-engage.', value:4, tags:['promise_gap','hot_cold_cycle']}
      ]
    }
  ];

  const BANDS = [
    {
      max: 19,
      key: 'calibrated',
      title: 'Intensity Looks Mostly Calibrated',
      summary: 'Your answers do not show a strong love-bombing-like pattern in this quiz. Affection may be intense, but autonomy, pacing, and boundaries appear relatively intact.',
      next: [
        'Keep your normal routines, friendships, privacy, and pace while the relationship develops.',
        'Judge the relationship by consistency over time, not only by chemistry or early certainty.',
        'Use ordinary boundaries as information: healthy interest can tolerate a separate person.'
      ]
    },
    {
      max: 39,
      key: 'fast',
      title: 'Fast Intensity — Watch the Pace',
      summary: 'The relationship may be moving faster or feeling more idealized than usual, but strong pressure or control is not dominating your answers. This is a “slow down and observe” result, not proof of manipulation.',
      next: [
        'Slow one area of acceleration: commitment, gifts, constant contact, future planning, or disclosure.',
        'Keep your outside life unchanged for now instead of reorganizing everything around the relationship.',
        'Watch what happens when your pace differs from theirs; that response is more informative than the early intensity.'
      ]
    },
    {
      max: 54,
      key: 'mixed',
      title: 'Mixed Pattern — Pressure Is Showing',
      summary: 'Your answers suggest more than simple enthusiasm. Some of the intensity is beginning to collide with boundaries, independence, access, or emotional pressure. The pattern deserves clearer limits and slower decisions.',
      next: [
        'Set one concrete boundary that matters and observe behavior rather than promises.',
        'Pause major commitments, shared finances, password sharing, or dependency-building decisions while the pattern is unclear.',
        'Reality-check the relationship with someone you trust who is not emotionally invested in the outcome.'
      ]
    },
    {
      max: 79,
      key: 'strong',
      title: 'Strong Love-Bombing-Like Pattern',
      summary: 'Several parts of your answer pattern fit a love-bombing-like dynamic: fast attachment is being reinforced by pressure, access expectations, loss of autonomy, or a negative reaction when you create friction.',
      next: [
        'Create more space before making bigger commitments. You do not have to match someone else’s urgency.',
        'Protect privacy, money, housing, transportation, and your support network while you evaluate the pattern.',
        'Use short boundaries and judge the response. Repeated punishment for reasonable limits is meaningful data.'
      ]
    },
    {
      max: 100,
      key: 'high',
      title: 'High-Pressure / Control Pattern',
      summary: 'Your answers suggest that control, boundary pressure, dependency, or punitive reactions are central—not just early romance. The score does not prove intent or diagnose abuse, but the pattern deserves serious attention to autonomy and safety.',
      next: [
        'Prioritize your access to trusted people, private communication, money, transportation, and a safe place to think.',
        'Do not make confrontation the first step if you are afraid of retaliation, monitoring, coercion, or escalation.',
        'Consider qualified relationship-abuse or mental-health support for a private reality check and next-step planning.'
      ]
    }
  ];

  function unique(arr){ return Array.from(new Set(arr)); }

  function classify(score){
    return BANDS.find(b => score <= b.max) || BANDS[BANDS.length - 1];
  }

  function scoreAnswers(answerIndexes){
    if (!Array.isArray(answerIndexes) || answerIndexes.length !== QUESTIONS.length){
      throw new Error('Expected exactly 12 answers.');
    }
    const raw = Object.fromEntries(Object.keys(DIMENSIONS).map(k => [k, 0]));
    const tags = [];

    answerIndexes.forEach((optionIndex, qi) => {
      const q = QUESTIONS[qi];
      const opt = q.options[optionIndex];
      if (!opt) throw new Error('Invalid answer index at question ' + (qi + 1));
      raw[q.dimension] += opt.value;
      (opt.tags || []).forEach(t => tags.push(t));
    });

    const normalized = {};
    Object.keys(raw).forEach(k => { normalized[k] = Math.round((raw[k] / 12) * 100); });

    const score = Math.round(Object.entries(normalized).reduce((sum, [k,v]) => {
      return sum + v * DIMENSIONS[k].weight;
    }, 0));

    const ranked = Object.keys(normalized).sort((a,b) => normalized[b] - normalized[a] || a.localeCompare(b));
    const top2 = ranked.slice(0,2);
    const safetyTags = unique(tags.filter(t => [
      'safety_signal','coercion','monitoring','monitoring_pressure','isolation','fear_reaction','emotional_coercion','punitive_reaction'
    ].includes(t)));

    const spread = normalized[ranked[0]] - normalized[ranked[3]];
    let clarity = 'Medium';
    if (score <= 15 || score >= 75 || spread >= 45) clarity = 'High';
    else if (score <= 30 || score >= 60 || spread >= 25) clarity = 'Medium-high';

    return {
      score,
      raw,
      normalized,
      top2,
      band: classify(score),
      safetyTags,
      safetyFlag: safetyTags.length > 0,
      clarity
    };
  }

  function pairInsight(top2){
    const pair = top2.slice().sort().join('|');
    const map = {
      'accelerated_attachment|boundary_pressure': 'The main concern is not speed by itself. Fast attachment is being paired with pressure to keep matching the pace.',
      'accelerated_attachment|dependency_isolation': 'The relationship may be becoming emotionally central before enough trust and real-world knowledge have had time to develop.',
      'accelerated_attachment|control_reactivity': 'The early high appears less stable once disagreement, imperfection, or ordinary reality interrupts the momentum.',
      'boundary_pressure|dependency_isolation': 'Your autonomy is being squeezed in two ways: direct pressure around limits and expectations of unusually high access or emotional responsibility.',
      'boundary_pressure|control_reactivity': 'Your strongest signal is what happens after friction. Limits and disagreement appear more likely to trigger pressure, punishment, or control than simple disappointment.',
      'control_reactivity|dependency_isolation': 'Access and emotional dependency appear tied to reactivity or control, which matters more than how romantic the beginning felt.'
    };
    return map[pair] || 'Your two strongest dimensions show where the pattern is being driven most clearly. Focus on those behaviors rather than trying to interpret every romantic gesture.';
  }

  function dimLevel(pct){
    if (pct >= 75) return 'strong';
    if (pct >= 50) return 'clear';
    if (pct >= 25) return 'noticeable';
    return 'low';
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function resultMarkup(result){
    const topCards = result.top2.map(k => {
      const d = DIMENSIONS[k];
      const pct = result.normalized[k];
      return `<div class="lb-dim-card">
        <div class="lb-dim-head"><strong>${escapeHtml(d.label)}</strong><span>${pct}%</span></div>
        <div class="lb-meter"><span style="width:${pct}%"></span></div>
        <p>${escapeHtml(d.short)}</p>
        <p class="lb-dim-level">Signal strength: ${dimLevel(pct)}</p>
      </div>`;
    }).join('');

    const safety = result.safetyFlag ? `<div class="lb-safety" role="note">
      <strong>Important safety signal:</strong> One or more answers involved coercion, monitoring, isolation, fear, or punitive reactions. Treat that separately from the total score. A single serious boundary or safety violation can matter even when the overall score is lower.
    </div>` : '';

    return `<div class="lb-result-head">
      <div>
        <div class="lb-eyebrow">Your result</div>
        <h2>${escapeHtml(result.band.title)}</h2>
      </div>
      <div class="lb-score" aria-label="Love Bombing Pattern Score ${result.score} out of 100">
        <strong>${result.score}</strong><span>/100</span>
      </div>
    </div>
    <p class="lb-result-summary">${escapeHtml(result.band.summary)}</p>
    <p class="lb-note"><strong>Love Bombing Pattern Score:</strong> a weighted reflection score—not a diagnosis, probability, or proof of someone’s intent. Boundary pressure and control/reactivity count more than fast romance alone.</p>
    ${safety}
    <h3>Your two strongest dimensions</h3>
    <div class="lb-dim-grid">${topCards}</div>
    <div class="lb-insight"><strong>What the combination means:</strong> ${escapeHtml(pairInsight(result.top2))}</div>
    <h3>What to do next</h3>
    <ol class="lb-next">${result.band.next.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ol>
    <div class="lb-result-actions">
      <a class="btn" href="/blog/love-bombing/">Read the full Love Bombing guide</a>
      <button type="button" class="btn secondary" id="lbRetake">Retake test</button>
    </div>
    <p class="lb-note">Pattern clarity: <strong>${escapeHtml(result.clarity)}</strong>. This describes how distinct your answer pattern is inside this quiz; it is not clinical confidence.</p>`;
  }

  function init(){
    const root = document.getElementById('loveBombingQuiz');
    if (!root) return;

    let state = { index: 0, answers: new Array(QUESTIONS.length).fill(null) };

    root.innerHTML = `<section class="lb-test-card" aria-label="Love Bombing Test">
      <div class="lb-test-top">
        <span id="lbProgressText">Question 1 of ${QUESTIONS.length}</span>
        <button type="button" class="lb-back" id="lbBack" disabled>Back</button>
      </div>
      <progress id="lbProgress" value="1" max="${QUESTIONS.length}" aria-label="Test progress"></progress>
      <h2 id="lbQuestion"></h2>
      <div id="lbOptions" class="lb-options"></div>
    </section>
    <section id="lbResult" class="lb-result" hidden aria-live="polite"></section>`;

    const qEl = document.getElementById('lbQuestion');
    const optsEl = document.getElementById('lbOptions');
    const progressEl = document.getElementById('lbProgress');
    const progressText = document.getElementById('lbProgressText');
    const backBtn = document.getElementById('lbBack');
    const resultEl = document.getElementById('lbResult');
    const testCard = root.querySelector('.lb-test-card');

    function paint(){
      const q = QUESTIONS[state.index];
      progressText.textContent = `Question ${state.index + 1} of ${QUESTIONS.length}`;
      progressEl.value = state.index + 1;
      qEl.textContent = q.text;
      optsEl.innerHTML = '';
      q.options.forEach((opt, optionIndex) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lb-option';
        btn.textContent = opt.label;
        btn.addEventListener('click', () => {
          state.answers[state.index] = optionIndex;
          if (state.index < QUESTIONS.length - 1){
            state.index += 1;
            paint();
          } else {
            showResult();
          }
        });
        optsEl.appendChild(btn);
      });
      backBtn.disabled = state.index === 0;
      qEl.focus?.();
    }

    function showResult(){
      const result = scoreAnswers(state.answers);
      resultEl.innerHTML = resultMarkup(result);
      resultEl.hidden = false;
      testCard.hidden = true;
      const retake = document.getElementById('lbRetake');
      if (retake) retake.addEventListener('click', reset);
      try{
        sessionStorage.setItem('loveBombingTestResult', JSON.stringify({answers: state.answers, result, savedAt: Date.now()}));
      }catch(e){}
      resultEl.scrollIntoView({behavior:'smooth', block:'start'});
    }

    function reset(){
      state = { index: 0, answers: new Array(QUESTIONS.length).fill(null) };
      resultEl.hidden = true;
      resultEl.innerHTML = '';
      testCard.hidden = false;
      paint();
      testCard.scrollIntoView({behavior:'smooth', block:'start'});
    }

    backBtn.addEventListener('click', () => {
      if (state.index > 0){
        state.index -= 1;
        paint();
      }
    });

    paint();
  }

  window.LOVE_BOMBING_TEST_ENGINE = {
    questions: QUESTIONS,
    dimensions: DIMENSIONS,
    scoreAnswers,
    classify
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
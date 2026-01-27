const elTests = document.getElementById("tests");
const elQuiz = document.getElementById("quiz");
const elResult = document.getElementById("result");
const startBtn = document.getElementById("startBtn");

let state = { test: null, answers: [] };

function qs(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
function setQs(params) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  history.replaceState({}, "", url);
}

function renderTiles() {
  elTests.innerHTML = "";
  window.TESTS.forEach(t => {
    const div = document.createElement("div");
    div.className = "tile";
    div.innerHTML = `
      <h3>${t.title}</h3>
      <p>${t.blurb}</p>
      <button class="btn" data-test="${t.id}">Take test</button>
    `;
    elTests.appendChild(div);
  });

  elTests.querySelectorAll("button[data-test]").forEach(btn => {
    btn.addEventListener("click", () => startTest(btn.dataset.test));
  });
}

function startTest(id) {
  const test = window.TESTS.find(t => t.id === id);
  if (!test) return;
  state = { test, answers: Array(test.questions.length).fill(null) };
  setQs({ test: id });
  renderQuiz();
  elQuiz.classList.remove("hidden");
  elResult.classList.add("hidden");
  elQuiz.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderQuiz() {
  const t = state.test;
  elQuiz.innerHTML = `
    <div class="row" style="justify-content:space-between;">
      <h2 style="margin:0;">${t.title}</h2>
      <button class="btn" id="resetBtn">Reset</button>
    </div>
    <p class="muted">${t.blurb}</p>
    <form id="quizForm"></form>
    <div class="row">
      <button class="btn" id="submitBtn" type="button">See result</button>
      <span class="muted" id="progress"></span>
    </div>
  `;

  document.getElementById("resetBtn").onclick = () => {
    history.replaceState({}, "", "/");
    elQuiz.classList.add("hidden");
    elResult.classList.add("hidden");
  };

  const form = document.getElementById("quizForm");
  t.questions.forEach((q, qi) => {
    const qDiv = document.createElement("div");
    qDiv.className = "q";
    qDiv.innerHTML = `<h4>${qi + 1}. ${q.text}</h4>`;
    q.options.forEach((opt, oi) => {
      const id = `q${qi}o${oi}`;
      const label = document.createElement("label");
      label.className = "opt";
      label.htmlFor = id;
      label.innerHTML = `
        <input type="radio" id="${id}" name="q${qi}" value="${oi}" />
        ${opt.label}
      `;
      qDiv.appendChild(label);
    });
    form.appendChild(qDiv);
  });

  form.addEventListener("change", (e) => {
    const m = e.target.name.match(/^q(\d+)$/);
    if (!m) return;
    const qi = Number(m[1]);
    state.answers[qi] = Number(e.target.value);
    updateProgress();
  });

  document.getElementById("submitBtn").onclick = () => {
    if (state.answers.some(a => a === null)) {
      alert("Answer all questions first.");
      return;
    }
    const resKey = computeResultKey();
    renderResult(resKey);
  };

  updateProgress();
}

function updateProgress() {
  const answered = state.answers.filter(a => a !== null).length;
  const total = state.answers.length;
  document.getElementById("progress").textContent = `${answered}/${total} answered`;
}

function computeResultKey() {
  const totals = {};
  state.test.questions.forEach((q, qi) => {
    const opt = q.options[state.answers[qi]];
    Object.entries(opt.score).forEach(([k, v]) => {
      totals[k] = (totals[k] || 0) + v;
    });
  });
  let best = null;
  let bestVal = -Infinity;
  Object.entries(totals).forEach(([k, v]) => {
    if (v > bestVal) { best = k; bestVal = v; }
  });
  return best || "secure";
}

function renderResult(key) {
  const t = state.test;
  const r = t.results[key];
  setQs({ test: t.id, result: key });

  elResult.innerHTML = `
    <h2 style="margin:0 0 10px;">Your result: ${r.title}</h2>
    <ul>
      ${r.bullets.map(b => `<li>${b}</li>`).join("")}
    </ul>
    <p><strong>Try this today:</strong> ${r.nextStep}</p>

    <div class="row">
      <button class="btn" id="copyBtn" type="button">Copy share link</button>
      <span class="muted">Share: <code id="shareUrl"></code></span>
    </div>
  `;

  const shareUrl = window.location.href;
  document.getElementById("shareUrl").textContent = shareUrl;
  document.getElementById("copyBtn").onclick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      document.getElementById("copyBtn").textContent = "Copied!";
      setTimeout(() => (document.getElementById("copyBtn").textContent = "Copy share link"), 1200);
    } catch {
      alert("Copy failed. You can manually copy the link from the page.");
    }
  };

  elResult.classList.remove("hidden");
  elResult.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Deep link support
function bootFromQuery() {
  const testId = qs("test");
  const resultKey = qs("result");
  renderTiles();

  startBtn.addEventListener("click", () => {
    const first = window.TESTS[0]?.id;
    if (first) startTest(first);
  });

  if (testId) {
    startTest(testId);
    if (resultKey && state.test?.results?.[resultKey]) {
      renderResult(resultKey);
    }
  }
}

bootFromQuery();

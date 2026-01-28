/* app.js — lightweight renderer (Vanilla JS), SEO-friendly multi-page. */
(function(){
  const $ = (s, r=document) => r.querySelector(s);

  function getTestById(id){
    return (window.TESTS || []).find(t => t.id === id) || null;
  }
  function getTestBySlug(slug){
    return (window.TESTS || []).find(t => t.slug === slug) || null;
  }

  function safeGet(obj, path, fallback=null){
    try{
      const parts = path.split(".");
      let cur = obj;
      for (const p of parts){
        if (!cur || cur[p] === undefined) return fallback;
        cur = cur[p];
      }
      return cur;
    }catch{
      return fallback;
    }
  }

  function setQueryParam(k, v){
    const url = new URL(window.location.href);
    url.searchParams.set(k, v);
    history.replaceState({}, "", url.toString());
  }

  function setInlineMessage(rootEl, msg){
    const box = rootEl.querySelector("[data-inline-msg]");
    if (!box) return;
    box.textContent = msg || "";
    box.style.display = msg ? "block" : "none";
  }

  function highlightAndFocusQuestion(formEl, qIndex){
    const qWrap = formEl.querySelector(`[data-qindex="${qIndex}"]`);
    if (!qWrap) return;
    qWrap.classList.add("q-missing");
    qWrap.scrollIntoView({ behavior:"smooth", block:"center" });
    const firstInput = qWrap.querySelector("input");
    if (firstInput) firstInput.focus({ preventScroll:true });
    setTimeout(() => qWrap.classList.remove("q-missing"), 1400);
  }

  function computeResultSafe(test, answers){
    if (!test || !Array.isArray(test.questions) || !test.results) return null;

    const totals = {};
    for (let qi = 0; qi < test.questions.length; qi++){
      const q = test.questions[qi];
      const ans = answers[qi];
      const opt = safeGet(q, `options.${ans}`, null);
      const score = opt && opt.score;

      if (!opt || !score || typeof score !== "object") return null;

      for (const [k, v] of Object.entries(score)){
        const add = Number(v);
        if (!Number.isFinite(add)) continue;
        totals[k] = (totals[k] || 0) + add;
      }
    }

    const entries = Object.entries(totals);
    if (!entries.length){
      const first = Object.keys(test.results || {})[0];
      return first || null;
    }

    // Find max and detect ties deterministically.
    let maxVal = -Infinity;
    for (const [, v] of entries) maxVal = Math.max(maxVal, v);

    const tiedKeys = entries.filter(([, v]) => v === maxVal).map(([k]) => k);

    if (tiedKeys.length === 1) return tiedKeys[0];

    // If the test provides a dedicated mixed result, prefer it.
    if (test.results.mixed) return "mixed";

    // Deterministic tie-break:
    // 1) Prefer an explicit priority list if provided
    const priority = Array.isArray(test.tieBreakPriority) ? test.tieBreakPriority : null;
    if (priority){
      for (const k of priority){
        if (tiedKeys.includes(k)) return k;
      }
    }

    // 2) Otherwise, alphabetical (stable)
    tiedKeys.sort();
    return tiedKeys[0];
  }

  function renderHome(){
    const grid = $("#testsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    (window.TESTS || []).forEach(t => {
      const href = `/tests/${t.slug}/`;
      const div = document.createElement("article");
      div.className = "tile";
      div.innerHTML = `
        <div class="meta">
          <span class="badge">${t.time}</span>
          <span class="badge">${t.intent === "quiz" ? "Micro-test" : "Tool"}</span>
        </div>
        <h3>${t.title}</h3>
        <p>${t.blurb}</p>
        <div class="row">
          <a class="btn small" href="${href}">Take test</a>
          <a class="btn small secondary" href="/blog/what-is-attachment-style/">Read a guide</a>
        </div>
      `;
      grid.appendChild(div);
    });
  }

  function renderQuizPage(){
    const root = $("#quizRoot");
    if (!root) return;

    const slug = root.dataset.slug;
    const test = getTestBySlug(slug);

    if (!test){
      root.innerHTML = `
        <div class="card">
          <h2>Test not found</h2>
          <p class="muted">This page may be missing a test configuration.</p>
        </div>`;
      return;
    }

    // Optional: apply page meta dynamically (keeps HTML simple)
    if (window.Site){
      Site.setOG("og:title", `${test.title} — relationship.sbs`);
      Site.setOG("og:description", test.blurb);
      Site.setMeta("description", test.blurb);
    }

    let answers = Array(test.questions.length).fill(null);

    root.innerHTML = `
      <section class="card">
        <div class="kicker">
          <div class="crumbs">
            <a href="/">Home</a> / <a href="/#tests">Tests</a> / <span>${test.title}</span>
          </div>
          <div class="row">
            <a class="btn small secondary" href="/#tests">All tests</a>
            <button class="btn small" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <h1 style="margin:0 0 8px;font-size:34px;line-height:1.1;">${test.title}</h1>
        <p class="muted" style="margin:0 0 14px;">${test.blurb} • <strong>${test.time}</strong></p>

        <form id="quizForm" novalidate></form>

        <p class="inline-msg" data-inline-msg style="display:none;" role="status" aria-live="polite"></p>

        <div class="row">
          <button class="btn" id="submitBtn" type="button">See result</button>
          <span class="small" id="progress" aria-live="polite"></span>
        </div>
      </section>

      <section id="resultCard" class="card hidden"></section>

      <section class="card">
        <h2>FAQ</h2>
        <div id="faqList"></div>
      </section>
    `;

    $("#resetBtn").addEventListener("click", () => {
      // Clear query params while staying on the same clean URL
      window.location.href = window.location.pathname;
    });

    const form = $("#quizForm");

    test.questions.forEach((q, qi) => {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "q";
      fieldset.dataset.qindex = String(qi);

      const legend = document.createElement("legend");
      legend.textContent = `${qi + 1}. ${q.text}`;
      fieldset.appendChild(legend);

      (q.options || []).forEach((opt, oi) => {
        const id = `q${qi}o${oi}`;
        const label = document.createElement("label");
        label.className = "opt";
        label.setAttribute("for", id);
        label.innerHTML = `<input type="radio" id="${id}" name="q${qi}" value="${oi}"/><span>${opt.label}</span>`;
        fieldset.appendChild(label);
      });

      form.appendChild(fieldset);
    });

    function updateProgress(){
      const answered = answers.filter(a => a !== null).length;
      $("#progress").textContent = `${answered}/${answers.length} answered`;
    }
    updateProgress();

    form.addEventListener("change", (e) => {
      const m = (e.target.name || "").match(/^q(\d+)$/);
      if (!m) return;
      answers[Number(m[1])] = Number(e.target.value);
      setInlineMessage(root, "");
      updateProgress();
    });

    $("#submitBtn").addEventListener("click", () => {
      setInlineMessage(root, "");

      const firstMissing = answers.findIndex(a => a === null);
      if (firstMissing !== -1){
        setInlineMessage(root, "Please answer the highlighted question first.");
        highlightAndFocusQuestion(form, firstMissing);
        return;
      }

      const key = computeResultSafe(test, answers);
      if (!key || !test.results[key]){
        setInlineMessage(root, "This test seems misconfigured. Please try another test.");
        return;
      }

      setQueryParam("result", key);
      renderResult(test, key);
    });

    // FAQ render
    const faq = $("#faqList");
    faq.innerHTML = (test.faq || []).map(item => `
      <div style="margin:0 0 12px;">
        <div style="font-weight:800;margin:0 0 6px;">${item.q}</div>
        <div class="muted" style="line-height:1.55;">${item.a}</div>
      </div>
    `).join("");

    // If deep link with ?result=
    const url = new URL(window.location.href);
    const result = url.searchParams.get("result");
    if (result && test.results[result]) renderResult(test, result);
  }

  function renderResult(test, key){
    const r = test.results[key];
    const card = $("#resultCard");
    if (!card) return;
    const shareUrl = window.location.origin + window.location.pathname + `?result=${encodeURIComponent(key)}`;

    card.classList.remove("hidden");
    card.innerHTML = `
      <h2 class="resultTitle">Your result: ${r.title}</h2>
      <ul style="margin:0 0 12px; padding-left:18px;">
        ${r.bullets.map(b => `<li style="margin:6px 0;color:var(--muted);">${b}</li>`).join("")}
      </ul>
      <div class="callout">
        <strong>Try this today:</strong> ${r.nextStep}
      </div>

      <div class="row" style="margin-top:14px;">
        <button class="btn" id="copyBtn" type="button">Copy share link</button>
        <a class="btn secondary" href="/tools/text-decoder/">Use Text Decoder</a>
        <span class="small">Link: <code style="user-select:all;">${shareUrl}</code></span>
      </div>
    `;

    $("#copyBtn").addEventListener("click", async () => {
      try{
        await navigator.clipboard.writeText(shareUrl);
        $("#copyBtn").textContent = "Copied!";
        setTimeout(() => $("#copyBtn").textContent = "Copy share link", 1200);
      }catch{
        // Minimal fallback without alert noise
        const code = card.querySelector("code");
        if (code){
          const range = document.createRange();
          range.selectNodeContents(code);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    });

    card.scrollIntoView({ behavior:"smooth", block:"start" });
  }

  function boot(){
    if (window.Site){
      Site.renderHeader();
      Site.renderFooter();
      Site.applyOGDefaults();
    }
    renderHome();
    renderQuizPage();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

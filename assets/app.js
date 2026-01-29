(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const safeGet = (obj, path, fallback=null) => {
    try{
      return path.split(".").reduce((o,k)=> (o && (k in o)) ? o[k] : undefined, obj) ?? fallback;
    }catch(e){ return fallback; }
  };

  function getTestBySlug(slug){
    return (window.TESTS||[]).find(t => t.slug === slug) || null;
  }

  function setInlineMessage(root, msg){
    root.innerHTML = `<div class="card"><h2>Oops</h2><p class="muted">${msg}</p></div>`;
  }

  function encodeProfile(p){
    // Small, URL-safe payload (base64url).
    const json = JSON.stringify(p);
    const b64 = btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
    return b64;
  }
  function decodeProfile(code){
    try{
      const b64 = code.replace(/-/g,"+").replace(/_/g,"/");
      const pad = b64 + "===".slice((b64.length+3)%4);
      const json = decodeURIComponent(escape(atob(pad)));
      return JSON.parse(json);
    }catch(e){ return null; }
  }

  function sumScores(test, answers){
    const totals = {};
    const tags = {};
    for (let qi=0; qi<test.questions.length; qi++){
      const q = test.questions[qi];
      const idx = answers[qi];
      const opt = safeGet(q, `options.${idx}`, null);
      if (!opt) continue;
      const score = opt.score || {};
      for (const [k,v] of Object.entries(score)){
        const add = Number(v);
        if (!Number.isFinite(add)) continue;
        totals[k] = (totals[k]||0) + add;
      }
      (opt.tags || []).forEach(t => tags[t] = (tags[t]||0) + 1);
    }

    // Optional consistency checks (adds totals.inconsistency).
    // A rule is triggered if both tags appear in the same run.
    if (Array.isArray(test.inconsistency_rules)){
      for (const r of test.inconsistency_rules){
        const a = r?.a, b = r?.b;
        if (!a || !b) continue;
        if ((tags[a]||0) > 0 && (tags[b]||0) > 0){
          totals.inconsistency = (totals.inconsistency||0) + 1;
        }
      }
    }
    return {totals, tags};
  }

  function pickTopKeys(obj, n=2){
    const arr = Object.entries(obj).map(([k,v])=>[k, Number(v)||0]);
    arr.sort((a,b)=> b[1]-a[1] || a[0].localeCompare(b[0]));
    return arr.slice(0,n).map(x=>x[0]);
  }

  function attachmentCore(anxiety, avoidance){
    // thresholds relative to max 36 (18*2)
    const high = 18;
    const low = 10;
    const anxHigh = anxiety >= high;
    const avoHigh = avoidance >= high;
    const anxLow  = anxiety <= low;
    const avoLow  = avoidance <= low;

    if (anxLow && avoLow) return "secure";
    if (anxHigh && !avoHigh) return "anxious";
    if (avoHigh && !anxHigh) return "avoidant";
    if (anxHigh && avoHigh) return "fearful";

    // In-between: decide by dominance, else mixed leaning secure.
    if (anxiety > avoidance + 2) return "anxious";
    if (avoidance > anxiety + 2) return "avoidant";
    if (anxiety + avoidance >= 26) return "fearful";
    return "secure";
  }

  function loveCore(totals){
    const recv = {
      words: totals.recv_words||0,
      time: totals.recv_time||0,
      service: totals.recv_service||0,
      touch: totals.recv_touch||0,
      gifts: totals.recv_gifts||0
    };
    const top2 = pickTopKeys(recv, 2);
    if (recv[top2[0]] === recv[top2[1]]) return {core:"mixed", top2};
    return {core: top2[0], top2};
  }

  function conflictCore(totals){
    const styles = {
      collaborate: totals.collaborate||0,
      compromise: totals.compromise||0,
      accommodate: totals.accommodate||0,
      avoid: totals.avoid||0,
      compete: totals.compete||0
    };
    const top2 = pickTopKeys(styles, 2);
    if (styles[top2[0]] === styles[top2[1]]) return {core:"mixed", top2};
    return {core: top2[0], top2};
  }

  function calcModifiers(test, totals, tags){
    const out = [];
    const mods = Array.isArray(test.modifiers) ? test.modifiers : [];
    for (const m of mods){
      const w = m.when || {};
      let ok = false;
      if (w.tag){
        ok = (tags[w.tag]||0) >= (w.min||1);
      }else if (w.calc === "giving_gap"){
        // Love: compare top giving vs receiving
        const recv = {
          words: totals.recv_words||0, time: totals.recv_time||0, service: totals.recv_service||0,
          touch: totals.recv_touch||0, gifts: totals.recv_gifts||0
        };
        const give = {
          words: totals.give_words||0, time: totals.give_time||0, service: totals.give_service||0,
          touch: totals.give_touch||0, gifts: totals.give_gifts||0
        };
        const rTop = pickTopKeys(recv,1)[0];
        const gTop = pickTopKeys(give,1)[0];
        ok = rTop && gTop && rTop !== gTop;
      }else if (w.calc === "stress_spike"){
        const stress = {
          words: totals.stress_words||0, time: totals.stress_time||0, service: totals.stress_service||0,
          touch: totals.stress_touch||0, gifts: totals.stress_gifts||0
        };
        const top = pickTopKeys(stress,1)[0];
        ok = (stress[top]||0) >= (w.min||3);
      }
      if (ok) out.push({id:m.id, title:m.title, copy:m.copy});
    }
    return out.slice(0,4);
  }

  function confidenceFromTotals(test, totals){
    // Light-weight consistency signal.
    // Some questions add `inconsistency` points when answers conflict.
    // We use it only to downgrade confidence.
    const incons = totals.inconsistency || 0;
    // simple: gap between top1 and top2 in core space
    let a = 0, b = 0;
    if (test.id === "attachment"){
      a = totals.anxiety||0; b = totals.avoidance||0;
      const spread = Math.abs(a-b);
      const intensity = a+b;
      let out = null;
      if (intensity >= 30 || spread >= 10) out = {label:"High", note:"Clear pattern + strong intensity."};
      else if (intensity >= 22 || spread >= 6) out = {label:"Medium", note:"Pattern is present, with some overlap."};
      else out = {label:"Low", note:"You’re balanced across patterns—context matters."};
      return downgradeConfidence(out, incons);
    }
    if (test.id === "conflict"){
      const styles = [totals.collaborate||0, totals.compromise||0, totals.accommodate||0, totals.avoid||0, totals.compete||0].sort((x,y)=>y-x);
      const gap = (styles[0]||0) - (styles[1]||0);
      let out = null;
      if (gap >= 6) out = {label:"High", note:"One style clearly leads."};
      else if (gap >= 3) out = {label:"Medium", note:"Two styles are close."};
      else out = {label:"Low", note:"You shift styles—stress and context drive you."};
      return downgradeConfidence(out, incons);
    }
    if (test.id === "love_language"){
      const recv = [totals.recv_words||0, totals.recv_time||0, totals.recv_service||0, totals.recv_touch||0, totals.recv_gifts||0].sort((x,y)=>y-x);
      const gap = (recv[0]||0) - (recv[1]||0);
      let out = null;
      if (gap >= 4) out = {label:"High", note:"Your top love language stands out."};
      else if (gap >= 2) out = {label:"Medium", note:"Your top two are close."};
      else out = {label:"Low", note:"You’re flexible—stress may decide what you need most."};
      return downgradeConfidence(out, incons);
    }
    return downgradeConfidence({label:"Medium", note:""}, incons);
  }

  function downgradeConfidence(conf, incons){
    if (!incons || incons <= 0) return conf;
    const steps = incons >= 2 ? 2 : 1;
    const order = ["Low","Medium","High"];
    let idx = order.indexOf(conf.label);
    if (idx === -1) idx = 1;
    idx = Math.max(0, idx - steps);
    const label = order[idx];
    const note = conf.note ? (conf.note + " Consistency was mixed.") : "Consistency was mixed.";
    return {label, note};
  }

  function buildProfile(test, answers){
    const {totals, tags} = sumScores(test, answers);

    let core = null, top2 = [];
    let extras = {};
    if (test.id === "attachment"){
      const anxiety = totals.anxiety||0;
      const avoidance = totals.avoidance||0;
      core = attachmentCore(anxiety, avoidance);
      top2 = (anxiety > avoidance) ? ["anxious","avoidant"] : ["avoidant","anxious"];
      extras = {anxiety, avoidance};
    }else if (test.id === "love_language"){
      const x = loveCore(totals); core = x.core; top2 = x.top2;
      const give = {
        words: totals.give_words||0, time: totals.give_time||0, service: totals.give_service||0,
        touch: totals.give_touch||0, gifts: totals.give_gifts||0
      };
      const recv = {
        words: totals.recv_words||0, time: totals.recv_time||0, service: totals.recv_service||0,
        touch: totals.recv_touch||0, gifts: totals.recv_gifts||0
      };
      const stress = {
        words: totals.stress_words||0, time: totals.stress_time||0, service: totals.stress_service||0,
        touch: totals.stress_touch||0, gifts: totals.stress_gifts||0
      };
      extras = {
        receivingTop2: pickTopKeys(recv,2),
        givingTop2: pickTopKeys(give,2),
        stressTop: pickTopKeys(stress,1)[0]
      };
    }else if (test.id === "conflict"){
      const x = conflictCore(totals); core = x.core; top2 = x.top2;
      extras = {top2};
    }else{
      // fallback to old behavior
      const entries = Object.entries(totals);
      entries.sort((a,b)=> (b[1]-a[1]) || a[0].localeCompare(b[0]));
      core = entries[0]?.[0] || Object.keys(test.results||{})[0] || null;
      top2 = entries.slice(0,2).map(x=>x[0]);
    }

    const mods = calcModifiers(test, totals, tags);
    const conf = confidenceFromTotals(test, totals);

    return {core, top2, totals, tags, mods, conf, extras};
  }

  function shareUrlFor(test, profile){
    // Prefer dedicated static result pages for better social previews.
    const coreKey = (profile.core || "").toString().toLowerCase();
    const resultPath = "/tests/" + test.slug + "/results/" + encodeURIComponent(coreKey) + "/";
    const url = new URL(window.location.origin + resultPath);
    url.searchParams.set("p", encodeProfile({
      t: test.slug,
      c: profile.core,
      x: profile.extras,
      m: profile.mods.map(mm=>mm.id),
      s: profile.totals
    }));
    url.searchParams.delete("result");
    return url.toString();
  }

  function renderShareCard(test, key, r){
    const btn = $("#shareCardBtn");
    if (!btn) return;

    btn.onclick = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");
      // background
      ctx.fillStyle = "#0b0f16";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      // title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 54px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      wrapText(ctx, "relationship.sbs", 70, 90, 1060, 60);
      ctx.font = "bold 64px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      wrapText(ctx, r.title, 70, 170, 1060, 72);

      ctx.font = "28px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      let y = 300;
      (r.bullets || []).slice(0,3).forEach(b=>{
        wrapText(ctx, "• " + b, 90, y, 1020, 38);
        y += 70;
      });

      ctx.font = "24px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      ctx.fillStyle = "#9fb0c8";
      ctx.fillText("Take the test → " + window.location.origin + "/tests/" + test.slug + "/", 70, 585);

      const a = document.createElement("a");
      a.download = `${test.slug}-${key}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight){
    const words = text.split(" ");
    let line = "";
    for (let n=0; n<words.length; n++){
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0){
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      }else{
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  function renderCompare(test, p1, p2){
    const el = $("#compareBox");
    if (!el) return;
    const r1 = test.results[p1.core] || null;
    const r2 = test.results[p2.core] || null;
    if (!r1 || !r2){
      el.classList.add("hidden");
      return;
    }
    el.classList.remove("hidden");
    const friction = [];

    if (test.id === "attachment"){
      if ((p1.core==="anxious" && p2.core==="avoidant") || (p1.core==="avoidant" && p2.core==="anxious")){
        friction.push("Classic anxious–avoidant loop: one pursues, one withdraws. You need rules for reassurance + space.");
      }
      if (p1.core==="fearful" || p2.core==="fearful"){
        friction.push("Push‑pull risk: intensity spikes, then distance. Slow pace + predictable repair helps.");
      }
    }
    if (test.id === "conflict"){
      if ((p1.core==="avoid" && p2.core==="compete") || (p2.core==="avoid" && p1.core==="compete")){
        friction.push("Pursue–withdraw: one wants it now, one floods and retreats. Use timed time-outs + return time.");
      }
    }

    el.innerHTML = `
      <h3 style="margin:0 0 8px;">Compare</h3>
      <div class="grid2">
        <div class="mini">
          <h4 style="margin:0 0 6px;">Person A</h4>
          <div class="muted">${r1.title}</div>
        </div>
        <div class="mini">
          <h4 style="margin:0 0 6px;">Person B</h4>
          <div class="muted">${r2.title}</div>
        </div>
      </div>
      <div style="margin-top:12px;">
        <div style="font-weight:800;margin:0 0 6px;">Likely friction</div>
        <ul style="margin:0; padding-left:18px;">
          ${(friction.length?friction:["Different styles can work—if you agree on repair rules and stop mind-reading."]).map(x=>`<li>${x}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  function renderResult(test, profile){
    const key = profile.core;
    const r = test.results[key];
    const card = $("#resultCard");
    if (!card || !r) return;

    const url = shareUrlFor(test, profile);

    const modsHtml = (profile.mods||[]).length ? `
      <div style="margin:14px 0 0;">
        <div style="font-weight:900;margin:0 0 8px;">Modifiers (the “why it feels so accurate” part)</div>
        <div class="grid2">
          ${profile.mods.map(m=>`
            <div class="mini">
              <h4 style="margin:0 0 6px;">${m.title}</h4>
              <p class="muted" style="margin:0;">${m.copy}</p>
            </div>
          `).join("")}
        </div>
      </div>` : "";

    const extraHtml = (() => {
      if (test.id === "love_language"){
        const ex = profile.extras || {};
        const nice = (k)=>({
          words:"Words", time:"Quality Time", service:"Acts of Service", touch:"Touch", gifts:"Gifts"
        }[k]||k);
        return `
          <div style="margin:14px 0 0;">
            <div style="font-weight:900;margin:0 0 8px;">Your profile</div>
            <div class="grid2">
              <div class="mini"><h4 style="margin:0 0 6px;">Receiving (top 2)</h4><p class="muted" style="margin:0;">${(ex.receivingTop2||[]).map(nice).join(" + ")}</p></div>
              <div class="mini"><h4 style="margin:0 0 6px;">Giving (top 2)</h4><p class="muted" style="margin:0;">${(ex.givingTop2||[]).map(nice).join(" + ")}</p></div>
              <div class="mini"><h4 style="margin:0 0 6px;">Under stress you crave</h4><p class="muted" style="margin:0;">${nice(ex.stressTop)}</p></div>
              <div class="mini"><h4 style="margin:0 0 6px;">Confidence</h4><p class="muted" style="margin:0;">${profile.conf.label} — ${profile.conf.note}</p></div>
            </div>
          </div>`;
      }
      return `
        <div style="margin:14px 0 0;">
          <div style="font-weight:900;margin:0 0 8px;">Confidence</div>
          <p class="muted" style="margin:0;">${profile.conf.label} — ${profile.conf.note}</p>
        </div>`;
    })();

    card.classList.remove("hidden");
    card.innerHTML = `
      <h2 class="resultTitle">Your result: ${r.title}</h2>
      <div class="row" style="margin:10px 0 14px; flex-wrap:wrap;">
        <button id="shareCardBtn" class="btn small">Share card</button>
        <a class="btn small secondary" href="${url}">Copy share link</a>
        <button id="copyLinkBtn" class="btn small secondary">Copy link</button>
      </div>

      <ul style="margin:0 0 12px; padding-left:18px;">
        ${(r.bullets||[]).map(b=>`<li style="margin:0 0 6px;">${b}</li>`).join("")}
      </ul>

      <div class="grid2" style="margin-top:10px;">
        <div class="mini">
          <h3 style="margin:0 0 8px;">What it looks like</h3>
          <ul style="margin:0; padding-left:18px;">
            ${(r.what_it_looks_like||[]).map(x=>`<li>${x}</li>`).join("")}
          </ul>
        </div>
        <div class="mini">
          <h3 style="margin:0 0 8px;">Blind spots</h3>
          <ul style="margin:0; padding-left:18px;">
            ${(r.blindspots||[]).map(x=>`<li>${x}</li>`).join("")}
          </ul>
        </div>
      </div>

      ${modsHtml}

      <div style="margin:14px 0 0;">
        <div style="font-weight:900;margin:0 0 8px;">3 messages you can actually send</div>
        <ul style="margin:0; padding-left:18px;">
          ${(r.scripts||[]).map(x=>`<li>${x}</li>`).join("")}
        </ul>
      </div>

      <div style="margin:14px 0 0;">
        <div style="font-weight:900;margin:0 0 8px;">Next steps (no fluff)</div>
        <ul style="margin:0; padding-left:18px;">
          ${(r.next_steps||[]).map(x=>`<li>${x}</li>`).join("")}
        </ul>
      </div>

      ${extraHtml}

      <div class="card" style="margin-top:14px;">
        <h3 style="margin:0 0 8px;">Compare mode</h3>
        <p class="muted" style="margin:0 0 10px;">Paste a friend/partner profile code (from their share link) to compare friction + repair.</p>
        <div class="row" style="flex-wrap:wrap;">
          <input id="compareInput" placeholder="Paste profile code…" style="flex:1; min-width:240px;" />
          <button id="compareBtn" class="btn small secondary">Compare</button>
        </div>
        <div id="compareBox" class="hidden" style="margin-top:12px;"></div>
      </div>

      <div class="muted small" style="margin-top:12px; line-height:1.55;">
        Note: This is a self-reflection tool based on established relationship psychology frameworks (not a diagnosis).
      </div>
    `;

    const copyBtn = $("#copyLinkBtn");
    if (copyBtn){
      copyBtn.onclick = async () => {
        try{
          await navigator.clipboard.writeText(url);
          copyBtn.textContent = "Copied";
          setTimeout(()=> copyBtn.textContent="Copy link", 1200);
        }catch(e){
          copyBtn.textContent = "Copy failed";
          setTimeout(()=> copyBtn.textContent="Copy link", 1200);
        }
      };
    }

    renderShareCard(test, key, r);

    const compareBtn = $("#compareBtn");
    if (compareBtn){
      compareBtn.onclick = () => {
        const inp = $("#compareInput");
        const raw = (inp?.value || "").trim();
        const code = raw.includes("p=") ? (new URL(raw).searchParams.get("p")||"") : raw;
        const other = decodeProfile(code);
        if (!other || other.t !== test.slug){
          $("#compareBox").classList.remove("hidden");
          $("#compareBox").innerHTML = `<div class="muted">That code doesn’t look like a ${test.title} share link.</div>`;
          return;
        }
        renderCompare(test, {core: profile.core}, {core: other.c});
      };
    }
  }

  function renderQuizPage(){
    const root = $("#quizRoot");
    if (!root) return;

    const slug = root.dataset.slug;
    const test = getTestBySlug(slug);

    if (!test){
      setInlineMessage(root, "Test not found. This page may be missing a test configuration.");
      return;
    }

    const url = new URL(window.location.href);
    const pCode = url.searchParams.get("p");

    // Result-only pages (static) for better social previews.
    // These pages set data-core="<resultKey>" on #quizRoot.
    const coreOnly = (root.dataset.core || "").trim();
    if (!pCode && coreOnly && test.results && test.results[coreOnly]){
      renderShell(test);
      const profile = {
        core: coreOnly,
        top2: [coreOnly],
        totals: {},
        tags: {},
        mods: [],
        extras: {},
        conf: {label:"Preview", note:"Preview page for sharing. Take the full test for a personalized profile."}
      };
      renderResult(test, profile);
      const quizCard = $("#quizCard");
      if (quizCard) quizCard.classList.add("hidden");
      return;
    }
    if (pCode){
      const p = decodeProfile(pCode);
      if (p && p.t === test.slug && p.c && test.results[p.c]){
        const profile = {core:p.c, totals:p.s||{}, mods:[], extras:p.x||{}, conf:{label:"Shared", note:"This view is reconstructed from a shared link."}};
        // reconstruct modifiers if we can (ids only)
        const ids = Array.isArray(p.m) ? p.m : [];
        const byId = {};
        (test.modifiers||[]).forEach(mm => byId[mm.id]=mm);
        profile.mods = ids.map(id=>byId[id]).filter(Boolean).map(mm=>({id:mm.id, title:mm.title, copy:mm.copy}));
        renderShell(test);
        renderResult(test, profile);
        return;
      }
    }

    renderShell(test);

    const state = {i:0, answers: new Array(test.questions.length).fill(null)};
    const qWrap = $("#qWrap");
    const progress = $("#progress");
    const qText = $("#qText");
    const opts = $("#opts");
    const back = $("#backBtn");

    function paint(){
      const i = state.i;
      const q = test.questions[i];
      progress.textContent = `${i+1} / ${test.questions.length}`;
      qText.textContent = q.text;
      opts.innerHTML = "";
      q.options.forEach((o, idx) => {
        const b = document.createElement("button");
        b.className = "btn secondary full";
        b.style.textAlign = "left";
        b.textContent = o.label;
        b.onclick = () => {
          state.answers[i] = idx;
          if (i < test.questions.length - 1){
            state.i += 1;
            paint();
          }else{
            const profile = buildProfile(test, state.answers);
            renderResult(test, profile);
            // smooth scroll to result
            $("#resultCard")?.scrollIntoView({behavior:"smooth", block:"start"});
          }
        };
        opts.appendChild(b);
      });

      back.disabled = i === 0;
    }

    back.onclick = () => {
      if (state.i > 0){ state.i -= 1; paint(); }
    };

    paint();

    // Small FAQ in sidebar spot (optional)
    const faq = $("#faqList");
    if (faq){
      faq.innerHTML = (test.faq || []).map(item => `
        <div style="margin:0 0 12px;">
          <div style="font-weight:800;margin:0 0 6px;">${item.q}</div>
          <div class="muted" style="line-height:1.55;">${item.a}</div>
        </div>
      `).join("");
    }
  }

  function renderShell(test){
    const root = $("#quizRoot");
    root.innerHTML = `
      <section class="card" id="quizCard">
        <div class="kicker">
          <div class="crumbs">
            <a href="/">Home</a> / <a href="/#tests">Tests</a> / <span>${test.title}</span>
          </div>
          <div class="row">
            <a class="btn small secondary" href="/#tests">All tests</a>
            <a class="btn small secondary" href="/tools/text-decoder/">Text Decoder</a>
          </div>
        </div>

        <h1 style="margin:0 0 8px;font-size:34px;line-height:1.1;">${test.title}</h1>
        <p class="muted" style="margin:0 0 8px;">${test.blurb}</p>
        <p class="small" style="margin:0;">
          Tip: finish, then share your result link or share card to compare with a friend/partner.
        </p>
      </section>

      <section class="card">
        <div class="row" style="justify-content:space-between; align-items:center;">
          <div class="muted" id="progress">1 / ${test.questions.length}</div>
          <button class="btn small secondary" id="backBtn">Back</button>
        </div>
        <h2 id="qText" style="margin:10px 0 12px;"></h2>
        <div id="opts" class="stack"></div>
      </section>

      <section id="resultCard" class="card hidden"></section>

      <section class="card prose">
        <h2>FAQ</h2>
        <div id="faqList"></div>
      </section>
    `;
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
          <span class="badge">Deep profile</span>
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

  document.addEventListener("DOMContentLoaded", () => {
    renderHome();
    renderQuizPage();
  });
})();
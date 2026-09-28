(() => {
  "use strict";

  const LETTER_VALUES = Object.freeze({
    A:1,I:1,J:1,Q:1,Y:1,
    B:2,K:2,R:2,
    C:3,G:3,L:3,S:3,
    D:4,M:4,T:4,
    E:5,H:5,N:5,X:5,
    U:6,V:6,W:6,
    O:7,Z:7,
    F:8,P:8
  });

  const PLANETS = Object.freeze({
    1:{name:"Sun", symbol:"☀", keywords:"leadership · vitality · individuality"},
    2:{name:"Moon", symbol:"☾", keywords:"sensitivity · intuition · receptivity"},
    3:{name:"Jupiter", symbol:"♃", keywords:"growth · wisdom · expansion"},
    4:{name:"Rahu", symbol:"☊", keywords:"ambition · intensity · unconventional drive"},
    5:{name:"Mercury", symbol:"☿", keywords:"communication · adaptability · wit"},
    6:{name:"Venus", symbol:"♀", keywords:"affection · harmony · attraction"},
    7:{name:"Ketu", symbol:"☋", keywords:"introspection · independence · inner focus"},
    8:{name:"Saturn", symbol:"♄", keywords:"patience · structure · endurance"},
    9:{name:"Mars", symbol:"♂", keywords:"passion · courage · action"}
  });

  // Symmetric 1–9 compatibility matrix supplied for this calculator.
  const MATRIX = Object.freeze([
    null,
    [null,100,100,100,0,75,0,75,0,100],
    [null,100,100,75,25,50,25,50,25,75],
    [null,100,75,100,25,25,25,50,50,100],
    [null,0,25,25,100,50,100,50,100,25],
    [null,75,50,25,50,100,100,25,75,25],
    [null,0,25,25,100,100,100,25,100,50],
    [null,75,50,50,50,25,25,100,25,75],
    [null,0,25,50,100,75,100,25,100,25],
    [null,100,75,100,25,25,50,75,25,100]
  ]);

  const BAND = Object.freeze([
    {min:80, label:"Strong Compatibility", short:"Strong match", className:"love-strong"},
    {min:60, label:"Good Compatibility", short:"Good match", className:"love-good"},
    {min:40, label:"Moderate Compatibility", short:"Balanced match", className:"love-moderate"},
    {min:20, label:"Weak Compatibility", short:"Challenging match", className:"love-weak"},
    {min:0, label:"Tense Compatibility", short:"Tense match", className:"love-tense"}
  ]);

  const PAIR_COPY = Object.freeze({
    100:"This planet pairing sits in the strongest tier of the compatibility matrix. The two name numbers reinforce each other with a naturally supportive relationship.",
    75:"This pairing is supportive with some contrast. The two planetary tones work well together while still bringing different strengths into the match.",
    50:"This is a mixed, balanced pairing. Some qualities align easily while others create contrast, making the connection more dependent on how the two energies are expressed.",
    25:"This pairing carries noticeable friction in the matrix. The two planetary styles tend to pull in different directions and need more adjustment to feel naturally aligned.",
    0:"This pairing sits at the most challenging end of the matrix. The planetary relationship is strongly contrasting, so the match carries a tense signature in this system."
  });

  const $ = (s, r=document) => r.querySelector(s);

  function cleanName(input){
    return String(input || "").toUpperCase().replace(/[^A-Z]/g, "");
  }

  function analyzeName(input){
    const clean = cleanName(input);
    if (!clean) return null;

    const letters = [...clean].map(letter => ({
      letter,
      value: LETTER_VALUES[letter] || 0
    }));

    const compound = letters.reduce((sum, item) => sum + item.value, 0);
    if (compound < 1) return null;
    const root = 1 + ((compound - 1) % 9);

    return {
      raw:String(input || "").trim(),
      clean,
      letters,
      compound,
      root,
      planet:PLANETS[root]
    };
  }

  function getBand(score){
    return BAND.find(b => score >= b.min) || BAND[BAND.length - 1];
  }

  function compatibility(a, b){
    return MATRIX[a.root][b.root];
  }

  function breakdownHtml(info){
    return info.letters.map(item =>
      `<span class="letter-chip"><b>${item.letter}</b><span>${item.value}</span></span>`
    ).join("");
  }

  function planetCardHtml(info, label){
    return `
      <article class="name-result-card">
        <div class="name-result-label">${label}</div>
        <h3>${escapeHtml(info.clean)}</h3>
        <div class="number-path">
          <div><span>Compound</span><strong>${info.compound}</strong></div>
          <div class="path-arrow" aria-hidden="true">→</div>
          <div><span>Root Number</span><strong>${info.root}</strong></div>
          <div class="path-arrow" aria-hidden="true">→</div>
          <div><span>Planet</span><strong>${info.planet.symbol} ${info.planet.name}</strong></div>
        </div>
        <p class="planet-keywords">${info.planet.keywords}</p>
        <details class="letter-details">
          <summary>See letter calculation</summary>
          <div class="letter-breakdown">${breakdownHtml(info)}</div>
          <div class="sum-line">Total = <strong>${info.compound}</strong> → Root = <strong>${info.root}</strong></div>
        </details>
      </article>`;
  }

  function escapeHtml(value){
    return String(value).replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[c]));
  }

  function resultUrl(nameA, nameB){
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("name1", nameA.clean);
    url.searchParams.set("name2", nameB.clean);
    return url.toString();
  }

  function renderResult(a, b, pushUrl=true){
    const score = compatibility(a,b);
    const band = getBand(score);
    const result = $("#loveResult");
    const scoreRing = $("#scoreRing");
    const scoreNumber = $("#scoreNumber");
    const verdict = $("#scoreVerdict");
    const pair = $("#planetPair");
    const analysis = $("#planetAnalysis");
    const names = $("#nameCards");
    const shareInput = $("#shareLink");

    result.classList.remove("hidden");
    result.classList.remove("love-strong","love-good","love-moderate","love-weak","love-tense");
    result.classList.add(band.className);

    scoreRing.style.setProperty("--score", score);
    scoreNumber.textContent = score + "%";
    verdict.textContent = band.label;
    pair.textContent = `${a.planet.symbol} ${a.planet.name} + ${b.planet.symbol} ${b.planet.name}`;
    analysis.innerHTML = `
      <p>${PAIR_COPY[score]}</p>
      <div class="planet-pair-grid">
        <div><span>${a.planet.name}</span><small>${a.planet.keywords}</small></div>
        <div><span>${b.planet.name}</span><small>${b.planet.keywords}</small></div>
      </div>`;

    names.innerHTML = planetCardHtml(a, "First name") + planetCardHtml(b, "Second name");

    const shareUrl = resultUrl(a,b);
    shareInput.value = shareUrl;

    if (pushUrl){
      try{
        history.replaceState(null, "", shareUrl);
      }catch(e){}
    }

    const live = $("#loveLive");
    live.textContent = `${a.clean} and ${b.clean}: ${score} percent, ${band.label}.`;

    result.scrollIntoView({behavior:"smooth", block:"start"});
  }

  function validateAndCalculate(pushUrl=true){
    const inputA = $("#nameA");
    const inputB = $("#nameB");
    const errA = $("#errorA");
    const errB = $("#errorB");
    const a = analyzeName(inputA.value);
    const b = analyzeName(inputB.value);

    errA.textContent = a ? "" : "Enter a name containing at least one letter A–Z.";
    errB.textContent = b ? "" : "Enter a name containing at least one letter A–Z.";
    inputA.setAttribute("aria-invalid", a ? "false" : "true");
    inputB.setAttribute("aria-invalid", b ? "false" : "true");

    if (!a || !b){
      (a ? inputB : inputA).focus();
      return;
    }

    inputA.value = a.clean;
    inputB.value = b.clean;
    renderResult(a,b,pushUrl);
  }

  async function copyText(text, button){
    try{
      await navigator.clipboard.writeText(text);
      const old = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => button.textContent = old, 1200);
    }catch(e){
      button.textContent = "Copy failed";
      setTimeout(() => button.textContent = "Copy link", 1200);
    }
  }

  function init(){
    const form = $("#loveForm");
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();
      validateAndCalculate(true);
    });

    $("#swapNames").addEventListener("click", () => {
      const a = $("#nameA"), b = $("#nameB");
      const temp = a.value;
      a.value = b.value;
      b.value = temp;
      if (a.value && b.value) validateAndCalculate(true);
    });

    $("#resetLove").addEventListener("click", () => {
      $("#nameA").value = "";
      $("#nameB").value = "";
      $("#errorA").textContent = "";
      $("#errorB").textContent = "";
      $("#loveResult").classList.add("hidden");
      try{ history.replaceState(null, "", window.location.pathname); }catch(e){}
      $("#nameA").focus();
    });

    $("#copyLoveLink").addEventListener("click", e => {
      copyText($("#shareLink").value, e.currentTarget);
    });

    $("#shareLove").addEventListener("click", async () => {
      const url = $("#shareLink").value;
      const title = $("#scoreVerdict").textContent;
      const score = $("#scoreNumber").textContent;
      const names = `${$("#nameA").value} + ${$("#nameB").value}`;
      if (navigator.share){
        try{
          await navigator.share({
            title:`Love Calculator: ${names}`,
            text:`${names} = ${score} — ${title}`,
            url
          });
          return;
        }catch(e){}
      }
      await copyText(url, $("#shareLove"));
    });

    $("#samplePair").addEventListener("click", () => {
      $("#nameA").value = "JOHN";
      $("#nameB").value = "LINA";
      validateAndCalculate(true);
    });

    const params = new URLSearchParams(window.location.search);
    const n1 = params.get("name1");
    const n2 = params.get("name2");
    if (n1 && n2){
      $("#nameA").value = n1;
      $("#nameB").value = n2;
      validateAndCalculate(false);
    }
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init, {once:true});
  }else{
    init();
  }

  // Expose a tiny read-only test surface for regression checks.
  window.LoveCalculator = Object.freeze({
    cleanName,
    analyzeName,
    compatibility:(nameA,nameB)=>{
      const a=analyzeName(nameA), b=analyzeName(nameB);
      return a && b ? compatibility(a,b) : null;
    }
  });
})();
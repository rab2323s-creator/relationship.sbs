(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const engine = window.TextDecoderEngine;
  if (!engine) return;
  let lastResult = null, selectedTone = "warm";
  function make(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (typeof value === "string") node.textContent = value;
    return node;
  }
  function setError(value) {
    const e = $("formError");
    e.textContent = value || "";
    e.hidden = !value;
  }
  function render(result) {
    const out = $("out");
    out.replaceChildren();
    out.append(make("div","decoder-result-label","Your text, in context"),make("h2","decoder-result-title",result.title));
    out.append(make("p","decoder-summary",result.interpretation));
    const sep=()=>out.append(make("div","decoder-divider"));
    sep();
    out.append(make("h3","","Other possible readings"));
    const alternatives=make("ul");
    result.alternatives.forEach((s)=>alternatives.append(make("li","",s)));
    out.append(alternatives);
    out.append(make("h3","","What we noticed"));
    const clues=make("ul");
    result.clues.forEach((s)=>clues.append(make("li","",s)));
    out.append(clues);
    out.append(make("h3","","A grounded next step"),make("p","decoder-note",result.next));
    sep();
    out.append(make("h3","","Pick a reply style"));
    const tabs=make("div","decoder-replies");
    const styles=[["warm","Warm"],["calm","Calm"],["direct","Direct"]];
    const reply=make("p","decoder-reply-text");
    const copy=make("button","btn secondary decoder-copy","Copy this reply");
    copy.type="button";
    const status=make("span","small");
    status.setAttribute("role","status");
    function changeTone(tone) {
      selectedTone=tone;
      reply.textContent=result.replies[tone];
      tabs.querySelectorAll("button").forEach((b)=>b.setAttribute("aria-pressed",String(b.dataset.tone===tone)));
      status.textContent="";
      copy.textContent="Copy this reply";
    }
    styles.forEach(([tone,label])=>{
      const b=make("button","",label);
      b.type="button"; b.dataset.tone=tone;
      b.addEventListener("click",()=>changeTone(tone));
      tabs.append(b);
    });
    out.append(tabs,reply,copy,status);
    changeTone(selectedTone);
    copy.addEventListener("click",async()=>{
      const value=result.replies[selectedTone];
      try{
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
        else {
          const tx=make("textarea");tx.value=value;tx.style.position="fixed";tx.style.opacity="0";document.body.append(tx);tx.select();const ok=document.execCommand("copy");tx.remove();if (!ok) throw Error("not copied");
        }
        copy.textContent="Copied";status.textContent="Reply copied to clipboard.";
      }catch{
        status.textContent="Copy unavailable. Select the reply text to copy it manually.";
      }
    });
    sep();
    const caution=make("p","decoder-note"+(result.id==="unsafe"?" decoder-safety":""),result.caution);
    out.append(caution);
    out.append(make("p","small",result.supportedLanguage));
    if(result.truncated)out.append(make("p","small","Input was limited to the first 1,600 characters."));
    lastResult=result;
  }
  function readInput(){
    return {message:$("msg").value,relationship:$("relationship").value,situation:$("situation").value,
      pattern:$("pattern").value,direction:$("direction").value,seen:$("seen").checked,hours:$("hours").value};
  }
  function analyze(){
    setError("");
    const result=engine.analyze(readInput());
    if(result.error){setError(result.error);$("msg").focus();return;}
    render(result);
    if(window.matchMedia("(max-width: 960px)").matches)$("out").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function reset(){
    $("msg").value="";$("relationship").value="dating";$("situation").value="general";$("pattern").value="unknown";
    $("direction").value="received";$("seen").checked=false;$("hours").value="0";
    $("charCount").textContent="0 / 1600";setError("");selectedTone="warm";lastResult=null;
    const out=$("out");out.replaceChildren();
    const empty=make("div","decoder-empty");
    const mark=make("span","decoder-empty-symbol","“ ”");mark.setAttribute("aria-hidden","true");
    empty.append(mark,make("h2","","Your interpretation appears here"),
      make("p","","See possible meanings, clues from the wording, questions worth asking, and three replies that match your style."));
    out.append(empty);$("msg").focus();
  }
  function boot(){
    $("analyzeBtn").addEventListener("click",analyze);
    $("clearBtn").addEventListener("click",reset);
    $("msg").addEventListener("input",()=>{$("charCount").textContent=$("msg").value.length+" / 1600";setError("");});
    $("msg").addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault();analyze();}});
    document.querySelectorAll("[data-example]").forEach(b=>b.addEventListener("click",()=>{
      $("msg").value=b.dataset.example||"";$("relationship").value=b.dataset.kind||"dating";
      $("charCount").textContent=$("msg").value.length+" / 1600";$("seen").checked=false;
      $("hours").value="0";$("direction").value="received";selectedTone="warm";analyze();
    }));
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();

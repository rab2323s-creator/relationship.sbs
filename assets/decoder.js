(function(){
  const $ = (s, r=document) => r.querySelector(s);

  const RULES = [
    {
      id: "short_reply",
      when: ({msg}) => msg.trim().length <= 3,
      title: "Very short reply",
      meanings: [
        "They may be busy or not in the mood to chat.",
        "They might be keeping emotional distance.",
        "They could be annoyed, but it’s unclear without context."
      ],
      replies: [
        "No worries—busy day? Talk later.",
        "All good. Want to pick this up tonight?",
        "Got it. Anything you want from me right now?"
      ]
    },
    {
      id: "seen_no_reply",
      when: ({seen, hours}) => seen && hours >= 6,
      title: "Seen but no reply",
      meanings: [
        "They saw it and postponed replying.",
        "They may be avoiding the topic.",
        "They might be overwhelmed—this happens a lot with conflict."
      ],
      replies: [
        "Hey—just checking you saw this. No rush, but I’d like to know where we stand.",
        "If now isn’t a good time, tell me when works for you.",
        "I’m here when you’re ready to talk."
      ]
    },
    {
      id: "maybe_later",
      when: ({msg}) => /maybe|later|we'll see|not sure/i.test(msg),
      title: "Vague / postponing",
      meanings: [
        "They may be unsure and buying time.",
        "They might want the option without committing.",
        "They could be interested but not prioritizing it."
      ],
      replies: [
        "Totally. What day works better—A or B?",
        "No problem. If you’re not feeling it, just tell me.",
        "Let’s pick a time so it doesn’t drift."
      ]
    },
    {
      id: "apology",
      when: ({msg}) => /sorry|apolog/i.test(msg),
      title: "Apology message",
      meanings: [
        "They’re attempting repair.",
        "They may feel guilt and want reassurance.",
        "They might be apologizing to end tension quickly."
      ],
      replies: [
        "Thanks for saying that. What would help is __.",
        "I appreciate it. Next time, can we do __?",
        "Okay. I’m open to moving forward if we agree on __."
      ]
    }
  ];

  function fallback(){
    return {
      title: "General reading",
      meanings: [
        "Meaning depends heavily on context and your recent dynamic.",
        "Look for patterns (consistency) more than single messages.",
        "If you feel anxious, ask one clear question instead of guessing."
      ],
      replies: [
        "Quick question—what did you mean by that?",
        "I might be reading this wrong. Can you clarify?",
        "Are you open to talking about this today?"
      ]
    };
  }

  
  function inferAttachmentSignal({msg, seen, hours}){
    const t = (msg||"").toLowerCase();

    const anxiousHits = [
      /\?\?+/, /\bare we ok\b/, /\bare you mad\b/, /\bplease\b/, /\bwhy (aren't|arent) you\b/,
      /\byou (never|always)\b/, /\bi miss you\b/, /\brespond\b/, /\banswer\b/, /\bhello\?\b/
    ].reduce((n,rx)=> n + (rx.test(t)?1:0), 0) + (seen && hours >= 2 ? 1 : 0) + (hours >= 12 ? 1 : 0);

    const avoidantHits = [
      /\bi need space\b/, /\bcan we not\b/, /\bi'm fine\b/, /\bim fine\b/, /\bwhatever\b/, /\bok\b$/, /\bk\b$/,
      /\btoo much\b/, /\bstop\b/, /\bnot talking\b/, /\blet's drop it\b/
    ].reduce((n,rx)=> n + (rx.test(t)?1:0), 0) + (hours === 0 && !seen ? 0 : 0);

    const secureHits = [
      /\bwhen you're free\b/, /\bno worries\b/, /\bwe can talk\b/, /\bwhat works for you\b/, /\bcan we check in\b/
    ].reduce((n,rx)=> n + (rx.test(t)?1:0), 0);

    // Convert to a rough label (this is NOT a diagnosis)
    let label = "Neutral / unclear";
    let note = "One message rarely tells the whole story. Patterns over time matter more.";
    if (anxiousHits >= avoidantHits + 2 && anxiousHits >= 2){
      label = "Leans anxious (pursuit / reassurance-seeking)";
      note = "Reads like high uncertainty sensitivity. Ask for a timeline instead of chasing clarity.";
    }else if (avoidantHits >= anxiousHits + 2 && avoidantHits >= 2){
      label = "Leans avoidant (distance / shutdown)";
      note = "Reads like protective distance. A calm time-out with a return time beats disappearing.";
    }else if (secureHits >= 2){
      label = "Leans secure (direct + regulated)";
      note = "Reads like clear requests with low threat. This tends to reduce escalation.";
    }
    return {label, note};
  }


  function analyze(){
    const msgEl = $("#msg");
    const msgRaw = (msgEl?.value || "");
    const msg = msgRaw.length > 600 ? msgRaw.slice(0, 600) : msgRaw;
    const seen = $("#seen").checked;
    const hours = Number($("#hours").value || "0");
    const data = { msg, seen, hours };

    const rule = RULES.find(r => r.when(data)) || null;
    const out = rule || fallback();

    $("#out").innerHTML = `
      <h2 style="margin:0 0 10px;">${out.title}</h2>
      ${msgRaw.length > 600 ? `<p class="small" style="margin:0 0 10px;color:var(--muted);">Note: message truncated to 600 characters for analysis.</p>` : ``}
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); margin:0;">
        <div class="card" style="margin:0; box-shadow:none; background:rgba(0,0,0,.12);">
          <h3>What it could mean</h3>
          <ul style="margin:0; padding-left:18px;">
            ${out.meanings.map(x => `<li style="margin:6px 0;color:var(--muted);">${x}</li>`).join("")}
          </ul>
        </div>
        <div class="card" style="margin:0; box-shadow:none; background:rgba(0,0,0,.12);">
          <h3>Replies you can send</h3>
          <div class="replyList">
            ${out.replies.map((x,i) => `
              <div class="replyItem">
                <div class="muted" style="flex:1; line-height:1.55;">${x}</div>
                <button class="btn small secondary" type="button" data-copy="${i}">Copy</button>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:12px;">
        <span class="small">Tip: choose the calmest option that still asks for clarity.</span>
      </div>
    `;
    // Copy buttons for each reply
    document.querySelectorAll("[data-copy]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const idx = Number(btn.getAttribute("data-copy"));
        const text = out.replies[idx] || "";
        try{
          await navigator.clipboard.writeText(text);
          const prev = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = prev), 900);
        }catch{
          // fallback: select text in place
          const div = btn.parentElement?.querySelector("div");
          if (div){
            const range = document.createRange();
            range.selectNodeContents(div);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      });
    });

  }

  function boot(){
    const btn = $("#analyzeBtn");
    if (!btn) return;
    btn.addEventListener("click", analyze);
    $("#msg").addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") analyze();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

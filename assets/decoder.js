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

  function analyze(){
    const msg = $("#msg").value || "";
    const seen = $("#seen").checked;
    const hours = Number($("#hours").value || "0");
    const data = { msg, seen, hours };

    const rule = RULES.find(r => r.when(data)) || null;
    const out = rule || fallback();

    $("#out").innerHTML = `
      <h2 style="margin:0 0 10px;">${out.title}</h2>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); margin:0;">
        <div class="card" style="margin:0; box-shadow:none; background:rgba(0,0,0,.12);">
          <h3>What it could mean</h3>
          <ul style="margin:0; padding-left:18px;">
            ${out.meanings.map(x => `<li style="margin:6px 0;color:var(--muted);">${x}</li>`).join("")}
          </ul>
        </div>
        <div class="card" style="margin:0; box-shadow:none; background:rgba(0,0,0,.12);">
          <h3>Replies you can send</h3>
          <ul style="margin:0; padding-left:18px;">
            ${out.replies.map(x => `<li style="margin:6px 0;color:var(--muted);">${x}</li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="row" style="margin-top:12px;">
        <button class="btn" id="copyReply">Copy first reply</button>
        <span class="small">Tip: choose the calmest option that still asks for clarity.</span>
      </div>
    `;

    $("#copyReply").addEventListener("click", async () => {
      const text = out.replies[0] || "";
      try{
        await navigator.clipboard.writeText(text);
        $("#copyReply").textContent = "Copied!";
        setTimeout(() => $("#copyReply").textContent = "Copy first reply", 1200);
      }catch{
        alert("Copy failed.");
      }
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

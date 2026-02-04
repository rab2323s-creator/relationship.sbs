/* avoidant-texting.js — single test definition */
(function () {
  const SLUG = "avoidant-texting";

  const K = {
    steady: "steady_communicator",
    chase: "chasing_spiral",
    avoid: "avoidant_dynamic",
    hotcold: "hot_cold_cycle",
    low: "low_investment"
  };

  window.TEST = {
    id: "avoidant_texting",
    slug: SLUG,
    title: "Avoidant Texting Test: How to Text an Avoidant (Without Losing Yourself)",
    blurb:
      "15 modern texting scenarios to decode avoidant attachment style texting, hot-cold patterns, and what to text next—plus scripts and boundaries (ad-safe).",
    time: "2–3 min",
    intent: "quiz",
    keywords: [
      "how to text an avoidant",
      "avoidant attachment style texting",
      "avoidant texting",
      "how often to text an avoidant",
      "scripts for enforcing boundaries with partner",
      "text message scripts for setting boundaries",
      "no contact after break up",
      "avoidant attachment texting patterns"
    ],

    questions: [
      {
        text: "1) They used to reply fast. Now it’s hours. Your first move is…",
        options: [
          { label: "I send one normal message and keep living my day.", score: { [K.steady]: 0 }, tags: ["calm"] },
          { label: "I feel the urge to double-text, but I wait and breathe first.", score: { [K.chase]: 1 }, tags: ["activation"] },
          { label: "I pull back completely to avoid feeling needy.", score: { [K.avoid]: 2 }, tags: ["withdraw"] },
          { label: "I send a pointed message to force clarity right now.", score: { [K.hotcold]: 3 }, tags: ["pressure"] }
        ]
      },
      {
        text: "2) They get very warm… then disappear after the best date. You assume…",
        options: [
          { label: "They may be busy; I’ll look for consistency over time.", score: { [K.steady]: 0 }, tags: ["measured"] },
          { label: "I panic and start replaying everything I said.", score: { [K.chase]: 1 }, tags: ["rumination"] },
          { label: "Closeness triggers them. This feels like avoidant space.", score: { [K.avoid]: 2 }, tags: ["avoidant_space"] },
          { label: "This is a hot-cold cycle—intensity, then punishment-by-silence.", score: { [K.hotcold]: 3 }, tags: ["hotcold"] }
        ]
      },
      {
        text: "3) You’re tempted to send: “Are you mad at me?” What’s most true?",
        options: [
          { label: "I ask directly but calmly, without accusing.", score: { [K.steady]: 0 }, tags: ["direct"] },
          { label: "I send it because not knowing feels unbearable.", score: { [K.chase]: 1 }, tags: ["need_reassurance"] },
          { label: "I don’t ask. I watch their behavior and detach silently.", score: { [K.avoid]: 2 }, tags: ["silent_detach"] },
          { label: "I send a ‘test’ text to see if they’ll chase me back.", score: { [K.hotcold]: 3 }, tags: ["test"] }
        ]
      },
      {
        text: "4) When you need a plan (date/time), they stay vague. You usually…",
        options: [
          { label: "Offer two clear options and a calm deadline.", score: { [K.steady]: 0 }, tags: ["clear_plan"] },
          { label: "Keep checking in because you hate uncertainty.", score: { [K.chase]: 1 }, tags: ["checking"] },
          { label: "Stop trying. If they want you, they’ll figure it out.", score: { [K.avoid]: 2 }, tags: ["pullback"] },
          { label: "Feel the pattern: vague = low effort. I consider stepping back.", score: { [K.low]: 3 }, tags: ["low_effort"] }
        ]
      },
      {
        text: "5) They read your message but don’t reply. What happens inside you?",
        options: [
          { label: "I assume neutral reasons unless a pattern proves otherwise.", score: { [K.steady]: 0 }, tags: ["secure"] },
          { label: "My body spikes. I keep checking my phone.", score: { [K.chase]: 1 }, tags: ["activation"] },
          { label: "I shut down emotionally so I don’t feel rejected.", score: { [K.avoid]: 2 }, tags: ["shutdown"] },
          { label: "I decide they don’t care. I detach fast and cold.", score: { [K.low]: 3 }, tags: ["dismiss"] }
        ]
      },
      {
        text: "6) They only text when it’s convenient for them. You tell yourself…",
        options: [
          { label: "I’ll address it once, clearly, and see what changes.", score: { [K.steady]: 0 }, tags: ["boundary"] },
          { label: "If I stay sweet enough, they’ll finally show up consistently.", score: { [K.chase]: 1 }, tags: ["earn"] },
          { label: "This feels like fear of closeness: avoidant rules around contact.", score: { [K.avoid]: 2 }, tags: ["avoidant_space"] },
          { label: "This looks like low investment. I’m not auditioning for basics.", score: { [K.low]: 3 }, tags: ["low_effort"] }
        ]
      },
      {
        text: "7) You want to know how often to text an avoidant. Your real goal is…",
        options: [
          { label: "To keep it simple and consistent—no games.", score: { [K.steady]: 0 }, tags: ["simple"] },
          { label: "To avoid triggering them so they don’t leave.", score: { [K.chase]: 1 }, tags: ["fear"] },
          { label: "To avoid feeling exposed by reaching out.", score: { [K.avoid]: 2 }, tags: ["self_protect"] },
          { label: "To control the outcome through perfect timing.", score: { [K.hotcold]: 3 }, tags: ["control"] }
        ]
      },
      {
        text: "8) After you express a need, they joke, deflect, or change the subject. You…",
        options: [
          { label: "Repeat the need once, kindly, and ask for a direct answer.", score: { [K.steady]: 0 }, tags: ["direct"] },
          { label: "Feel embarrassed and try to soften it so it’s easier to accept.", score: { [K.chase]: 1 }, tags: ["self_abandon"] },
          { label: "Decide it’s pointless and stop asking for anything.", score: { [K.avoid]: 2 }, tags: ["shutdown"] },
          { label: "See the pattern: deflection + no repair = not emotionally available.", score: { [K.low]: 3 }, tags: ["incompatible"] }
        ]
      },
      {
        text: "9) They say “I’m just not a big texter,” but they’re active online. You…",
        options: [
          { label: "Focus on agreements, not excuses: ‘What works for us?’", score: { [K.steady]: 0 }, tags: ["agreement"] },
          { label: "Feel jealous and insecure and start comparing yourself.", score: { [K.chase]: 1 }, tags: ["comparison"] },
          { label: "Assume closeness overwhelms them—avoidant coping.", score: { [K.avoid]: 2 }, tags: ["avoidant_space"] },
          { label: "Assume it’s selective effort. Interest shows up in follow-through.", score: { [K.low]: 3 }, tags: ["low_effort"] }
        ]
      },
      {
        text: "10) They disappear, then return like nothing happened. You usually…",
        options: [
          { label: "Ask calmly: ‘Can we agree on a check-in when you go quiet?’", score: { [K.steady]: 0 }, tags: ["boundary"] },
          { label: "Accept it because you’re just relieved they’re back.", score: { [K.chase]: 1 }, tags: ["relief"] },
          { label: "Pretend you don’t care and match their distance.", score: { [K.avoid]: 2 }, tags: ["match_distance"] },
          { label: "Call it out hard or punish back—then regret the escalation.", score: { [K.hotcold]: 3 }, tags: ["retaliate"] }
        ]
      },
      {
        text: "11) Your best ‘boundary text’ would sound like…",
        options: [
          { label: "Clear + kind + specific: one request, one timeline.", score: { [K.steady]: 0 }, tags: ["script_ready"] },
          { label: "Gentle but shaky: I ask, then panic if they don’t reply.", score: { [K.chase]: 1 }, tags: ["activation"] },
          { label: "Detached: I set a boundary but secretly hope they chase me.", score: { [K.avoid]: 2 }, tags: ["pushpull"] },
          { label: "Sharp: I threaten to leave to force reassurance.", score: { [K.hotcold]: 3 }, tags: ["pressure"] }
        ]
      },
      {
        text: "12) When you imagine no contact after break up, your honest reason is…",
        options: [
          { label: "To protect healing and stop reopening wounds.", score: { [K.steady]: 0 }, tags: ["healing"] },
          { label: "To make them miss you so you can feel chosen again.", score: { [K.chase]: 1 }, tags: ["prove"] },
          { label: "To feel in control and avoid feeling the loss.", score: { [K.avoid]: 2 }, tags: ["control"] },
          { label: "Because the effort was one-sided and you’re done negotiating basics.", score: { [K.low]: 3 }, tags: ["one_sided"] }
        ]
      },
      {
        text: "13) When they finally reply, your nervous system…",
        options: [
          { label: "Stays steady. A reply doesn’t decide my worth.", score: { [K.steady]: 0 }, tags: ["regulated"] },
          { label: "Drops from panic to relief—like I can breathe again.", score: { [K.chase]: 1 }, tags: ["relief"] },
          { label: "Gets suspicious: ‘Why are they warm now?’", score: { [K.hotcold]: 2 }, tags: ["hotcold"] },
          { label: "Feels numb: I’m tired of caring more than they do.", score: { [K.low]: 3 }, tags: ["burnout"] }
        ]
      },
      {
        text: "14) If you stopped initiating, what would most likely happen?",
        options: [
          { label: "They would still reach out; connection is mutual.", score: { [K.steady]: 0 }, tags: ["mutual"] },
          { label: "I’m scared they’d disappear, which is why I keep initiating.", score: { [K.chase]: 1 }, tags: ["fear"] },
          { label: "They’d probably go quiet—distance is their default.", score: { [K.avoid]: 2 }, tags: ["withdraw"] },
          { label: "They’d vanish. That answer tells me everything.", score: { [K.low]: 3 }, tags: ["low_effort"] }
        ]
      },
      {
        text: "15) The texting pattern that hurts you most is…",
        options: [
          { label: "Mind-reading: I want clarity, not guessing.", score: { [K.steady]: 0 }, tags: ["clarity"] },
          { label: "Chasing: I hate how anxious I get when they go quiet.", score: { [K.chase]: 1 }, tags: ["activation"] },
          { label: "Avoidant distance: closeness triggers them, then I feel shut out.", score: { [K.avoid]: 2 }, tags: ["avoidant_space"] },
          { label: "Hot-cold / low effort: I feel like I’m dating a mood, not a person.", score: { [K.hotcold]: 3 }, tags: ["hotcold"] }
        ]
      }
    ],

    results: {
      [K.steady]: {
        title: "Steady Communicator — You Text With Clarity, Not Panic",
        bullets: [
          "You can handle silence without turning it into a story.",
          "You ask for what you need in one clean message.",
          "Your self-respect doesn’t depend on response time."
        ],
        what_it_looks_like: [
          "You send one clear text, then you wait—without spiraling.",
          "You prefer agreements (plans, check-ins) over guessing games.",
          "You can tell the difference between ‘busy’ and a real pattern."
        ],
        blindspots: [
          "You might tolerate vagueness longer than you should because you stay calm.",
          "You may assume good intent even when follow-through is weak.",
          "You might under-communicate your need for consistency."
        ],
        scripts: [
          "“Quick check: are we still on for Friday? If not, suggest another day.”",
          "“I’m good with space—just send a short ‘busy today’ so I’m not guessing.”",
          "“I like consistency. A simple daily check-in works for me—does it work for you?”"
        ],
        next_steps: [
          "Keep your texts clear, short, and time-bounded.",
          "Ask for one predictable rhythm instead of chasing reassurance.",
          "Watch behavior over weeks, not vibes over hours."
        ]
      },

      [K.chase]: {
        title: "Chasing Spiral — Your Nervous System Texts Before You Do",
        bullets: [
          "Silence feels like a threat, not a neutral gap.",
          "You may relate to anxious pursuit: checking, rewriting, overexplaining.",
          "Relief arrives when they reply—then fades quickly."
        ],
        what_it_looks_like: [
          "You want to ‘fix it’ immediately when connection shifts.",
          "You send follow-ups that you later regret.",
          "You search: how to text an avoidant, how often to text an avoidant—because you’re trying to stop losing them."
        ],
        blindspots: [
          "You can accidentally turn texting into pressure (even if you’re being polite).",
          "You may confuse reassurance with real safety.",
          "You might ignore your own needs while trying to keep closeness."
        ],
        scripts: [
          "“I’m feeling a bit activated. No rush—can you reply when you have a minute?”",
          "“I’m not asking for a big talk. A quick plan for the week would calm my mind.”",
          "“If you need space, just say it directly. I handle clarity better than guessing.”"
        ],
        next_steps: [
          "Use a rule: one message, then a 30–60 minute pause before any follow-up.",
          "Replace ‘Are you mad?’ with one concrete request (plan / check-in / clarity).",
          "Build safety outside the relationship (sleep, friends, routine) so texting isn’t your regulator."
        ]
      },

      [K.avoid]: {
        title: "Avoidant Dynamic Likely — Closeness Triggers Distance (Then Confusion)",
        bullets: [
          "You may be dealing with avoidant attachment style texting patterns.",
          "Warmth increases—then they retreat when intimacy rises.",
          "You’re left holding the emotional uncertainty."
        ],
        what_it_looks_like: [
          "They disappear after closeness or vulnerable conversations.",
          "They prefer low-demand contact and resist ‘defining’ the rhythm.",
          "They return when things cool down, like nothing happened."
        ],
        blindspots: [
          "You may over-accommodate their comfort and shrink your needs.",
          "You might interpret avoidance as lack of care (sometimes it is, sometimes it’s fear).",
          "You may accept vague communication instead of requesting one clear agreement."
        ],
        scripts: [
          "“I respect space. When you need it, send one line so I’m not guessing.”",
          "“I like you. I also need consistency. Can we agree on a simple check-in rhythm?”",
          "“I’m not asking for constant texting—just predictable contact and follow-through.”"
        ],
        next_steps: [
          "Ask for one small agreement (e.g., ‘If you go quiet, send a heads-up’).",
          "Stop ‘earning’ closeness; request it calmly and observe behavior.",
          "If distance repeats with no repair, decide what you will and won’t tolerate."
        ]
      },

      [K.hotcold]: {
        title: "Hot-Cold Cycle — The Texting Isn’t a Conversation, It’s a Rollercoaster",
        bullets: [
          "Intensity spikes, then connection drops without explanation.",
          "You can feel jealousy and insecurity because the pattern is destabilizing.",
          "It’s hard to trust your reality when the rules keep changing."
        ],
        what_it_looks_like: [
          "Big flirty messages—then silence when you respond.",
          "They reappear when you detach, not when you communicate.",
          "Conflicts escalate because both sides text from protection, not clarity."
        ],
        blindspots: [
          "You may respond with tests, pressure, or retaliation (then feel guilty).",
          "You might confuse intensity with intimacy.",
          "You may stay because the highs feel like proof—until the lows erase it."
        ],
        scripts: [
          "“I’m into you, but I don’t do hot-cold. Consistency matters to me.”",
          "“If you want space, say it directly. If you want closeness, follow through.”",
          "“I’m stepping back from mixed signals. Reach out when you’re ready to be consistent.”"
        ],
        next_steps: [
          "Name the pattern once, clearly—then watch behavior, not promises.",
          "Stop responding to spikes; respond to consistency.",
          "If the cycle repeats, protect your peace with distance and boundaries."
        ]
      },

      [K.low]: {
        title: "Low Investment — This Might Not Be ‘Avoidant,’ It Might Be Minimal Effort",
        bullets: [
          "The contact is convenient, not committed.",
          "Plans stay vague, follow-through stays weak.",
          "Your anxiety is reacting to a real lack of consistency."
        ],
        what_it_looks_like: [
          "They reply when bored, vanish when you ask for clarity.",
          "You carry the relationship logistics (plans, repair, reconnection).",
          "You keep lowering your needs to keep them around."
        ],
        blindspots: [
          "You may keep explaining your needs to someone who benefits from ignoring them.",
          "You might blame yourself instead of noticing the pattern.",
          "You may confuse potential with investment."
        ],
        scripts: [
          "“I’m looking for consistent effort. If you’re not, that’s okay—just be honest.”",
          "“I need a real plan. If you can’t commit to one, I’ll step back.”",
          "“I’m not available for on-and-off contact. Reach out if you want something steady.”"
        ],
        next_steps: [
          "Ask for one measurable change (plan + follow-through) within a short timeline.",
          "If it stays vague, choose distance instead of negotiating basics.",
          "If you’re considering no contact after break up, use it for healing—not to force a response."
        ]
      }
    },

    faq: [
      {
        q: "How to text an avoidant without pushing them away?",
        a: "Keep it clear, low-pressure, and time-bounded: one direct message, then wait. Avoid rapid follow-ups, emotional tests, and mind-reading. Ask for one simple agreement (like a heads-up when they need space)."
      },
      {
        q: "What does avoidant attachment style texting look like?",
        a: "Often: delayed replies, short responses, disappearing after closeness, or resisting predictable routines. The key is repetition—look for a cycle that returns after intimacy or conflict."
      },
      {
        q: "How often to text an avoidant?",
        a: "There’s no universal number. A solid rule is: send one clear message, then pause. If you need predictability, agree on a small rhythm together instead of guessing and escalating."
      },
      {
        q: "Are they avoidant or just not interested?",
        a: "Avoidant patterns can still include effort and follow-through, just discomfort with closeness. Low interest looks like minimal investment, vague plans, and weak consistency over time."
      },
      {
        q: "Do boundary text scripts actually work?",
        a: "They work when they’re specific, calm, and followed by action. A boundary isn’t a long explanation—it’s a clear request plus what you’ll do if the pattern continues."
      }
    ]
  };
})();

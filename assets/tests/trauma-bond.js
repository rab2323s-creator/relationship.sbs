/* trauma-bond.js — single test definition */
(function () {
  const SLUG = "trauma-bond";

  // Result keys
  const K = {
    steady: "steady_attachment",
    intense: "intense_attachment",
    pushpull: "push_pull_cycle",
    addicted: "emotional_addiction_loop",
    trauma: "trauma_bond_pattern"
  };

  window.TEST = {
    id: "trauma_bond",
    slug: SLUG,
    title: "Trauma Bond Test — Are You Trauma Bonded in a Toxic Relationship?",
    blurb:
      "15 painfully accurate scenarios to spot trauma bonding, intermittent reinforcement, emotional addiction, and toxic attachment patterns (educational, ad-safe).",
    time: "2–3 min",
    intent: "quiz",
    keywords: [
      "trauma bond test",
      "trauma bonded",
      "trauma bonding relationship",
      "intermittent reinforcement relationship",
      "emotional addiction relationship",
      "toxic attachment patterns",
      "push pull relationship",
      "hot and cold relationship",
      "walking on eggshells relationship",
      "breadcrumbing relationship",
      "why can't I leave a toxic relationship",
      "trauma bond signs"
    ],

    questions: [
      {
        text: "1) The ‘good version’ of them shows up after a rough moment. Your body feels…",
        options: [
          { label: "Relieved, but I still need consistent behavior to trust it.", score: { [K.steady]: 3 }, tags: ["grounded"] },
          { label: "Hopeful — like this is the real them, and the rest was stress.", score: { [K.intense]: 3 }, tags: ["hope"] },
          { label: "Hooked. One warm moment erases a week of doubt.", score: { [K.pushpull]: 3 }, tags: ["hooked"] },
          { label: "Addicted to the relief. I would do anything to keep this version.", score: { [K.addicted]: 3 }, tags: ["relief_dependence"] }
        ]
      },
      {
        text: "2) In your relationship, affection tends to be…",
        options: [
          { label: "Consistent and not used as leverage.", score: { [K.steady]: 3 }, tags: ["consistent"] },
          { label: "Strong, but sometimes uneven because life gets busy.", score: { [K.intense]: 3 }, tags: ["uneven"] },
          { label: "Hot and cold — closeness, then distance with no clarity.", score: { [K.pushpull]: 3 }, tags: ["hot_cold"] },
          { label: "Intermittent reinforcement: affection appears right when I’m about to detach.", score: { [K.trauma]: 3 }, tags: ["intermittent_reinforcement"] }
        ]
      },
      {
        text: "3) When they go quiet (late replies / silence), your mind does what?",
        options: [
          { label: "I stay calm and wait for facts before reacting.", score: { [K.steady]: 3 }, tags: ["calm"] },
          { label: "I feel uneasy, but I can self-soothe.", score: { [K.intense]: 3 }, tags: ["self_soothe"] },
          { label: "I scan for signs: tone, views, likes, ‘seen,’ everything.", score: { [K.pushpull]: 3 }, tags: ["hypervigilance"] },
          { label: "I spiral: I can’t focus until the connection returns.", score: { [K.addicted]: 3 }, tags: ["spiral"] }
        ]
      },
      {
        text: "4) After conflict, the relationship repair usually looks like…",
        options: [
          { label: "A clear conversation + a specific change.", score: { [K.steady]: 3 }, tags: ["repair"] },
          { label: "We move on, but some feelings stay unspoken.", score: { [K.intense]: 3 }, tags: ["partial_repair"] },
          { label: "A dramatic reset: intense closeness, then the same issue returns.", score: { [K.pushpull]: 3 }, tags: ["reset_cycle"] },
          { label: "Relief bonding: they’re kind again, and I forget the original issue.", score: { [K.trauma]: 3 }, tags: ["relief_bonding"] }
        ]
      },
      {
        text: "5) You’ve asked yourself: “Why can’t I leave a toxic relationship?” because…",
        options: [
          { label: "I can leave if needed — I’m evaluating compatibility.", score: { [K.steady]: 3 }, tags: ["agency"] },
          { label: "I’m emotionally attached, but I can still think clearly.", score: { [K.intense]: 3 }, tags: ["attached"] },
          { label: "The highs make me doubt the lows, and I keep resetting hope.", score: { [K.pushpull]: 3 }, tags: ["hope_reset"] },
          { label: "Leaving feels like withdrawal — like I lose myself without them.", score: { [K.trauma]: 3 }, tags: ["withdrawal_like"] }
        ]
      },
      {
        text: "6) When you set a boundary, their reaction is most often…",
        options: [
          { label: "Respectful, even if they don’t love it.", score: { [K.steady]: 3 }, tags: ["boundary_respect"] },
          { label: "Defensive at first, then they calm down.", score: { [K.intense]: 3 }, tags: ["defensive_then_ok"] },
          { label: "They pull away, and I chase to restore connection.", score: { [K.pushpull]: 3 }, tags: ["pull_away"] },
          { label: "They reward/punish: warmth when I comply, distance when I insist.", score: { [K.trauma]: 3 }, tags: ["reward_punish"] }
        ]
      },
      {
        text: "7) You notice yourself ‘walking on eggshells’ when…",
        options: [
          { label: "Rarely. I can speak honestly without fear.", score: { [K.steady]: 3 }, tags: ["safe"] },
          { label: "Sometimes. I choose timing carefully.", score: { [K.intense]: 3 }, tags: ["timing"] },
          { label: "Often. Small topics can turn into big emotional fallout.", score: { [K.pushpull]: 3 }, tags: ["eggshells"] },
          { label: "Constantly. Peace depends on me staying small and agreeable.", score: { [K.trauma]: 3 }, tags: ["self_shrink"] }
        ]
      },
      {
        text: "8) The ‘intense affection’ phase (people call it love bombing) usually…",
        options: [
          { label: "Doesn’t define us — steadiness matters more than intensity.", score: { [K.steady]: 3 }, tags: ["steady_over_intense"] },
          { label: "Feels strong, but we still keep a healthy pace.", score: { [K.intense]: 3 }, tags: ["healthy_pace"] },
          { label: "Comes in waves, then disappears abruptly.", score: { [K.pushpull]: 3 }, tags: ["wave"] },
          { label: "Shows up right after I pull away, then fades once I’m back in.", score: { [K.trauma]: 3 }, tags: ["hook_back"] }
        ]
      },
      {
        text: "9) When you try to talk about the pattern, the conversation becomes…",
        options: [
          { label: "Clear: we name the issue and plan a change.", score: { [K.steady]: 3 }, tags: ["clear"] },
          { label: "Emotional but workable.", score: { [K.intense]: 3 }, tags: ["workable"] },
          { label: "Circular: I end up explaining my feelings repeatedly.", score: { [K.pushpull]: 3 }, tags: ["circular"] },
          { label: "A reset trap: they reassure me, and the real issue disappears again.", score: { [K.trauma]: 3 }, tags: ["reset_trap"] }
        ]
      },
      {
        text: "10) The relationship makes you feel…",
        options: [
          { label: "More like myself.", score: { [K.steady]: 3 }, tags: ["self"] },
          { label: "Mostly myself, with some anxious moments.", score: { [K.intense]: 3 }, tags: ["some_anxiety"] },
          { label: "Unstable: my mood depends on their closeness.", score: { [K.pushpull]: 3 }, tags: ["mood_dependence"] },
          { label: "Emotionally addicted: relief feels like oxygen.", score: { [K.addicted]: 3 }, tags: ["emotional_addiction"] }
        ]
      },
      {
        text: "11) You catch breadcrumbing (tiny signals of interest) when…",
        options: [
          { label: "It’s not a pattern — we make real plans.", score: { [K.steady]: 3 }, tags: ["real_plans"] },
          { label: "Sometimes we drift, then reconnect clearly.", score: { [K.intense]: 3 }, tags: ["reconnect"] },
          { label: "I get small check-ins but not real commitment or consistency.", score: { [K.pushpull]: 3 }, tags: ["breadcrumbing"] },
          { label: "Those tiny signals keep me waiting, hoping, and staying available.", score: { [K.trauma]: 3 }, tags: ["kept_waiting"] }
        ]
      },
      {
        text: "12) When you imagine leaving, the hardest part is…",
        options: [
          { label: "Practical logistics, not my identity.", score: { [K.steady]: 3 }, tags: ["logistics"] },
          { label: "Missing them, but I’d recover with time.", score: { [K.intense]: 3 }, tags: ["miss"] },
          { label: "Letting go of the ‘good version’ I keep chasing.", score: { [K.pushpull]: 3 }, tags: ["good_version"] },
          { label: "The withdrawal feeling: panic, cravings, and emotional collapse.", score: { [K.trauma]: 3 }, tags: ["withdrawal"] }
        ]
      },
      {
        text: "13) The best description of your attachment right now is…",
        options: [
          { label: "Safe attachment: love feels stable, not scary.", score: { [K.steady]: 3 }, tags: ["safe_attachment"] },
          { label: "Intense attachment: love feels big, but I’m still grounded.", score: { [K.intense]: 3 }, tags: ["big_love"] },
          { label: "Toxic attachment pattern: closeness feels like a gamble.", score: { [K.pushpull]: 3 }, tags: ["gamble"] },
          { label: "Trauma bonding: pain and relief keep me emotionally attached.", score: { [K.trauma]: 3 }, tags: ["trauma_bond"] }
        ]
      },
      {
        text: "14) After a warm moment, you often worry…",
        options: [
          { label: "Not really. Warmth is normal here.", score: { [K.steady]: 3 }, tags: ["normal_warmth"] },
          { label: "A little, but I can stay present.", score: { [K.intense]: 3 }, tags: ["present"] },
          { label: "It won’t last — I brace for the drop.", score: { [K.pushpull]: 3 }, tags: ["brace"] },
          { label: "I have to ‘perform’ to keep the warmth from disappearing.", score: { [K.trauma]: 3 }, tags: ["perform"] }
        ]
      },
      {
        text: "15) If nothing changed for the next 30 days, you’d feel…",
        options: [
          { label: "Okay. The relationship is stable and respectful.", score: { [K.steady]: 3 }, tags: ["stable"] },
          { label: "Uneasy, but hopeful with clearer agreements.", score: { [K.intense]: 3 }, tags: ["agreements"] },
          { label: "Drained. The cycle would keep repeating.", score: { [K.pushpull]: 3 }, tags: ["drained"] },
          { label: "Trapped. Like my nervous system can’t detach.", score: { [K.trauma]: 3 }, tags: ["trapped"] }
        ]
      }
    ],

    results: {
      [K.steady]: {
        title: "Steady Attachment — Connection Doesn’t Come With Whiplash",
        subtitle: "Consistency is the baseline, not a reward.",
        summary:
          "Your answers suggest a relationship where closeness doesn’t disappear as a consequence, and affection isn’t used as leverage. Conflict may happen, but repair leads to clearer behavior. The bond feels human—not addictive. You can love without losing your sense of self.",
        bullets: [
          "Affection is consistent, not intermittent reinforcement.",
          "Boundaries don’t trigger emotional punishment.",
          "You can reality-check without spiraling."
        ],
        scripts: [
          "“I value steadiness. Can we keep check-ins consistent?”",
          "“Let’s repair this with one clear change we both follow.”"
        ],
        next_steps: [
          "Keep a weekly check-in (15 minutes).",
          "Name needs early, before they become resentment.",
          "Protect your independence and routines."
        ],
        cautions: ["Educational result only—patterns can change over time."]
      },

      [K.intense]: {
        title: "Intense Attachment — Big Feelings, Still Grounded",
        subtitle: "Passion is present, but you keep your footing.",
        summary:
          "Your answers suggest strong emotional closeness with occasional anxiety—often triggered by stress, timing, or miscommunication. You may dislike uncertainty, but you can self-soothe and reality-check. The bond feels intense, yet you still have agency.",
        bullets: [
          "You feel deeply, but you don’t lose yourself.",
          "Inconsistency isn’t the core pattern.",
          "You can ask for clarity without panic."
        ],
        scripts: [
          "“I’m feeling a little activated—can we clarify plans?”",
          "“I care about us. Consistency helps me stay calm.”"
        ],
        next_steps: [
          "Agree on one small consistency ritual (check-in / plan).",
          "Reduce overchecking when anxious (pause 20 minutes).",
          "Track patterns weekly, not hourly."
        ],
        cautions: ["Intensity can feel like proof—measure consistency instead."]
      },

      [K.pushpull]: {
        title: "Push–Pull Cycle — Closeness Feels Like a Gamble",
        subtitle: "Hot and cold creates attachment through uncertainty.",
        summary:
          "Your answers suggest a repeating hot-and-cold pattern: closeness appears, then disappears without clear explanation. This can strengthen attachment through uncertainty, not safety. You may find yourself chasing the ‘good version’ while bracing for the drop.",
        bullets: [
          "Hot and cold behavior drives anxiety and hope resets.",
          "You monitor texts, tone, and distance for signals.",
          "Repair feels like a reset, not a real change."
        ],
        scripts: [
          "“I need consistency, not intensity. Can we agree on a simple rhythm?”",
          "“If closeness disappears after conflict, we need a repair plan.”"
        ],
        next_steps: [
          "Name the cycle once (closeness → distance) and request one measurable change.",
          "Stop chasing during withdrawal; wait for clear communication.",
          "Set boundaries around silence and vague plans."
        ],
        cautions: ["Not a diagnosis—use it to clarify pattern and impact."]
      },

      [K.addicted]: {
        title: "Emotional Addiction Loop — Relief Feels Like Oxygen",
        subtitle: "The bond may be driven by relief, not stability.",
        summary:
          "Your answers suggest that your nervous system may be bonding to relief: the moment they return, your body calms—then the cycle repeats. This can feel like emotional addiction: cravings, checking, and difficulty focusing when connection drops. The goal isn’t blame. It’s recognizing what your body is learning to chase.",
        bullets: [
          "You feel withdrawal-like distress during silence.",
          "You rely on the next ‘warm moment’ to feel okay.",
          "Your mood depends on their closeness."
        ],
        scripts: [
          "“I’m going to pause before I react. I’ll respond when I’m calm.”",
          "“I need steadiness. I can’t keep doing hot and cold.”"
        ],
        next_steps: [
          "Create a pause rule: no big texts during peak anxiety.",
          "Replace checking with grounding (walk / breathing / notes).",
          "Build support outside the relationship (friends, routines)."
        ],
        cautions: ["If distress feels severe or persistent, consider licensed support."]
      },

      [K.trauma]: {
        title: "Trauma Bond Pattern Likely — Pain and Relief Keep the Attachment Alive",
        subtitle: "Intermittent reinforcement can create a powerful pull.",
        summary:
          "Your answers suggest a pattern consistent with trauma bonding: repeated cycles of distress and relief that strengthen attachment over time. You may relate to walking on eggshells, chasing clarity after withdrawal, and feeling emotionally hooked when kindness returns. This is educational—not a diagnosis—and it’s meant to help you protect your clarity and wellbeing.",
        bullets: [
          "Intermittent reinforcement: warmth appears at key moments.",
          "Boundaries trigger consequences or withdrawal.",
          "Leaving feels unbearable, even when you’re hurting."
        ],
        scripts: [
          "“I need consistent respect and follow-through. If not, I will step back.”",
          "“I’m not available for hot and cold. I need a stable rhythm.”"
        ],
        next_steps: [
          "Document patterns privately (dates, behavior, outcomes).",
          "Set one boundary and follow through consistently.",
          "If distress feels severe or persistent, consider speaking with a licensed professional."
        ],
        cautions: ["Educational tool only. Prioritize safety and support."]
      }
    },

    faq: [
      {
        q: "What is a trauma bond in a relationship?",
        a: "A trauma bond is a strong emotional attachment shaped by repeated cycles of distress and relief. It often includes intermittent reinforcement (warmth appearing unpredictably), which can make leaving feel unusually difficult."
      },
      {
        q: "What is intermittent reinforcement in relationships?",
        a: "Intermittent reinforcement means affection, attention, or reassurance appears unpredictably—sometimes intensely—then disappears. Unpredictability can strengthen attachment because your nervous system starts chasing the next ‘good’ moment."
      },
      {
        q: "Is trauma bonding the same as love?",
        a: "Not necessarily. Healthy love tends to feel stable, safe, and consistent. Trauma bonding often feels intense, anxiety-driven, and dependent on relief after distress."
      },
      {
        q: "Is this trauma bond test a diagnosis?",
        a: "No. This is an educational self-reflection quiz about patterns. It does not diagnose a person or mental health condition and does not replace professional support."
      },
      {
        q: "Why can’t I leave a toxic relationship?",
        a: "Many people struggle to leave when the relationship includes powerful relief moments after distress. This can create a loop of hope resets and emotional cravings. Support and clear boundaries can help you regain clarity."
      }
    ]
  };
})();

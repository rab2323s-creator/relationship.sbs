/* relationship-anxiety.js — single test definition */
(function () {
  const SLUG = "relationship-anxiety";

  // Core result keys (must match results object keys)
  const K = {
    grounded: "emotionally_grounded",
    sensitive: "sensitive_under_pressure",
    anxious: "anxious_attachment_patterns",
    loop: "high_anxiety_loop",
    control: "anxiety_taking_control"
  };

  window.TEST = {
    id: "relationship_anxiety",
    slug: SLUG,
    title: "Relationship Anxiety Test: How Anxious Are You in Love?",
    blurb:
      "A painfully accurate quiz about relationship anxiety, anxious attachment, overthinking, and the fear of abandonment — built for modern love (texts, silence, and mixed signals).",
    time: "2–3 min",
    intent: "quiz",
    keywords: [
      "Relationship Anxiety Test",
      "relationship anxiety",
      "anxious attachment",
      "fear of abandonment",
      "overthinking in relationships",
      "constant reassurance",
      "jealousy and insecurity",
      "anxiety after texting",
      "feeling emotionally unsafe",
      "attachment anxiety",
      "am I too anxious in my relationship"
    ],

    // Optional: can be used by your engine to flag contradictory tag combos if supported
    inconsistency_rules: [
      { a: "secure", b: "panic_spiral" },
      { a: "calm_response", b: "accusatory_text" }
    ],

    questions: [
      {
        text: "1) They reply 'lol' to your long message. Your chest does… what?",
        options: [
          { label: "Nothing. I assume they’re busy or just being casual.", score: { [K.grounded]: 0 }, tags: ["secure", "calm_response"] },
          { label: "A tiny sting — but I let it go without chasing meaning.", score: { [K.sensitive]: 1 }, tags: ["sensitive", "self_control"] },
          { label: "I re-read the conversation and wonder what I did wrong.", score: { [K.anxious]: 2 }, tags: ["overthink", "self_blame"] },
          { label: "My mood drops fast. I feel rejected and want to fix it immediately.", score: { [K.loop]: 3 }, tags: ["panic_spiral", "urgent_repair"] }
        ]
      },
      {
        text: "2) You see “seen” — but no reply. What happens next?",
        options: [
          { label: "I wait. If they care, they’ll respond when they can.", score: { [K.grounded]: 0 }, tags: ["secure"] },
          { label: "I notice the discomfort, but I distract myself on purpose.", score: { [K.sensitive]: 1 }, tags: ["self_regulation"] },
          { label: "I start building theories: 'They’re losing interest.'", score: { [K.anxious]: 2 }, tags: ["fear_abandonment", "overthink"] },
          { label: "I check my phone repeatedly and feel physically unsettled.", score: { [K.loop]: 3 }, tags: ["checking", "panic_spiral"] }
        ]
      },
      {
        text: "3) Their texting pace slows for one day. Your brain calls it…",
        options: [
          { label: "A normal day. People have moods, work, life.", score: { [K.grounded]: 0 }, tags: ["secure"] },
          { label: "A signal, but I wait for more evidence before reacting.", score: { [K.sensitive]: 1 }, tags: ["measured"] },
          { label: "The beginning of the end. I hate that I think this way.", score: { [K.anxious]: 2 }, tags: ["catastrophic"] },
          { label: "An emergency. I feel like I need to do something NOW.", score: { [K.loop]: 3 }, tags: ["urgent_repair"] }
        ]
      },
      {
        text: "4) You catch yourself wanting to ask: 'Are we okay?' How often does that urge show up?",
        options: [
          { label: "Rarely. If something’s off, I bring it up calmly and directly.", score: { [K.grounded]: 0 }, tags: ["direct_comm"] },
          { label: "Sometimes — usually when I’m stressed outside the relationship.", score: { [K.sensitive]: 1 }, tags: ["stress_sensitive"] },
          { label: "Often. Uncertainty sticks to my skin.", score: { [K.anxious]: 2 }, tags: ["constant_reassurance"] },
          { label: "Constantly. If I don’t ask, I feel like I can’t breathe.", score: { [K.control]: 3 }, tags: ["reassurance_dependence"] }
        ]
      },
      {
        text: "5) They sound 'different' on a call. What do you do?",
        options: [
          { label: "I ask gently what’s up, without assuming it’s about me.", score: { [K.grounded]: 0 }, tags: ["secure", "direct_comm"] },
          { label: "I notice it, but I give them space and check later.", score: { [K.sensitive]: 1 }, tags: ["space_ok"] },
          { label: "I start monitoring: tone, pauses, words… everything.", score: { [K.anxious]: 2 }, tags: ["hypervigilant"] },
          { label: "I spiral. I feel emotionally unsafe until I get reassurance.", score: { [K.control]: 3 }, tags: ["emotionally_unsafe"] }
        ]
      },
      {
        text: "6) When they post on social media but haven’t replied to you, you feel…",
        options: [
          { label: "Neutral. Posting isn’t the same as being emotionally available.", score: { [K.grounded]: 0 }, tags: ["secure"] },
          { label: "A little annoyed, but I don’t turn it into a story.", score: { [K.sensitive]: 1 }, tags: ["irritated"] },
          { label: "Replaceable. Like I’m not a priority.", score: { [K.anxious]: 2 }, tags: ["fear_abandonment"] },
          { label: "Triggered. I want to confront them or 'test' them.", score: { [K.loop]: 3 }, tags: ["emotional_test", "accusatory_text"] }
        ]
      },
      {
        text: "7) You’re waiting for a reply and you notice your body. It feels like…",
        options: [
          { label: "Normal. My mood doesn’t depend on the notification.", score: { [K.grounded]: 0 }, tags: ["regulated"] },
          { label: "A little restless. But I can self-soothe.", score: { [K.sensitive]: 1 }, tags: ["self_regulation"] },
          { label: "Tight chest, racing thoughts — like I’m bracing for impact.", score: { [K.anxious]: 2 }, tags: ["somatic_anxiety"] },
          { label: "Like withdrawal. Like I’m losing them in real time.", score: { [K.control]: 3 }, tags: ["emotionally_unsafe"] }
        ]
      },
      {
        text: "8) They say: 'I need some space.' Your first thought is…",
        options: [
          { label: "Okay. Space can be healthy. I respect it.", score: { [K.grounded]: 0 }, tags: ["secure", "space_ok"] },
          { label: "I get nervous, but I remind myself it’s not rejection.", score: { [K.sensitive]: 1 }, tags: ["reality_check"] },
          { label: "They’re pulling away. I start analyzing the last 2 weeks.", score: { [K.anxious]: 2 }, tags: ["fear_abandonment", "overthink"] },
          { label: "They’re leaving. I feel panic and want to lock closeness back in.", score: { [K.control]: 3 }, tags: ["cling", "panic_spiral"] }
        ]
      },
      {
        text: "9) You rewrite a text 3 times before sending it because you’re worried it’ll change everything.",
        options: [
          { label: "Not me. I text normally and trust the relationship can handle words.", score: { [K.grounded]: 0 }, tags: ["secure"] },
          { label: "Occasionally. I want to be considerate — but I still send it.", score: { [K.sensitive]: 1 }, tags: ["careful"] },
          { label: "Yes. I try to predict their reaction so I don’t get hurt.", score: { [K.anxious]: 2 }, tags: ["hypervigilant", "avoid_hurt"] },
          { label: "Yes — and if they reply coldly, I can’t function for hours.", score: { [K.control]: 3 }, tags: ["emotionally_unsafe"] }
        ]
      },
      {
        text: "10) When you feel insecure, you’re most likely to…",
        options: [
          { label: "Name it calmly and ask for clarity without blaming.", score: { [K.grounded]: 0 }, tags: ["direct_comm"] },
          { label: "Pull back a little to calm down, then reconnect.", score: { [K.sensitive]: 1 }, tags: ["pause_rule"] },
          { label: "Seek reassurance indirectly (fishing for proof).", score: { [K.anxious]: 2 }, tags: ["reassurance_seek"] },
          { label: "Start a conflict or test them to force certainty.", score: { [K.loop]: 3 }, tags: ["emotional_test"] }
        ]
      },
      {
        text: "11) A small change happens: less emojis, shorter replies. You interpret it as…",
        options: [
          { label: "A normal fluctuation. Humans aren’t consistent robots.", score: { [K.grounded]: 0 }, tags: ["secure"] },
          { label: "Possibly stress. I stay curious instead of reactive.", score: { [K.sensitive]: 1 }, tags: ["curious"] },
          { label: "A sign they’re losing feelings — even if I hate the thought.", score: { [K.anxious]: 2 }, tags: ["catastrophic"] },
          { label: "Proof I’m not safe. I start preparing for abandonment.", score: { [K.control]: 3 }, tags: ["fear_abandonment"] }
        ]
      },
      {
        text: "12) You feel jealousy and insecurity. What is it usually about?",
        options: [
          { label: "I rarely feel it. When I do, I reflect and move on.", score: { [K.grounded]: 0 }, tags: ["secure"] },
          { label: "It happens sometimes, usually when I’m already drained.", score: { [K.sensitive]: 1 }, tags: ["stress_sensitive"] },
          { label: "I compare myself to others and fear I won’t be chosen.", score: { [K.anxious]: 2 }, tags: ["comparison"] },
          { label: "It consumes me. I check, stalk, or obsess until I crash.", score: { [K.control]: 3 }, tags: ["checking", "obsessive"] }
        ]
      },
      {
        text: "13) When the relationship is going well, a part of you still thinks…",
        options: [
          { label: "I can enjoy it. Good moments don’t scare me.", score: { [K.grounded]: 0 }, tags: ["secure"] },
          { label: "I’m happy — but I stay alert if something shifts.", score: { [K.sensitive]: 1 }, tags: ["alert"] },
          { label: "It won’t last. I keep waiting for the drop.", score: { [K.anxious]: 2 }, tags: ["anticipatory_loss"] },
          { label: "If it’s good, it’s suspicious. I almost expect sabotage.", score: { [K.control]: 3 }, tags: ["emotionally_unsafe"] }
        ]
      },
      {
        text: "14) The biggest trigger for your anxiety is…",
        options: [
          { label: "Conflict — but I can talk through it without spiraling.", score: { [K.grounded]: 0 }, tags: ["regulated"] },
          { label: "Uncertainty. I dislike it, but I can tolerate it.", score: { [K.sensitive]: 1 }, tags: ["uncertainty"] },
          { label: "Distance. It feels like the door is closing.", score: { [K.anxious]: 2 }, tags: ["fear_abandonment"] },
          { label: "Silence. Silence feels like punishment or disappearance.", score: { [K.control]: 3 }, tags: ["emotionally_unsafe"] }
        ]
      },
      {
        text: "15) If you could get one thing in love, it would be…",
        options: [
          { label: "Mutual honesty and emotional steadiness.", score: { [K.grounded]: 0 }, tags: ["secure"] },
          { label: "Consistency — so I don’t have to guess.", score: { [K.sensitive]: 1 }, tags: ["need_consistency"] },
          { label: "Reassurance that I won’t be left the moment I relax.", score: { [K.anxious]: 2 }, tags: ["fear_abandonment"] },
          { label: "Safety. The kind that finally stops the panic inside me.", score: { [K.control]: 3 }, tags: ["emotionally_unsafe"] }
        ]
      }
    ],

    results: {
      [K.grounded]: {
        title: "Emotionally Grounded — Love Doesn’t Hijack Your Nervous System",
        bullets: [
          "You can tolerate uncertainty without turning it into a crisis.",
          "You don’t confuse silence with abandonment.",
          "Your self-worth isn’t negotiated through texts."
        ],
        what_it_looks_like: [
          "A late reply doesn’t rewrite your reality.",
          "You ask for clarity without emotional pressure.",
          "You stay connected to yourself even when you’re attached."
        ],
        blindspots: [
          "You might underestimate how anxious others can feel.",
          "You may avoid deeper emotional talks because things already feel ‘fine.’",
          "You might miss subtle needs until they become bigger."
        ],
        scripts: [
          "“I’m noticing a small worry — can we talk later today?”",
          "“I’m good, just checking in because I care.”",
          "“I trust us, and I’m open to clarifying anything.”"
        ],
        next_steps: [
          "Keep building consistency rituals (check-ins, conflict rules).",
          "Model calm communication — it’s contagious.",
          "Keep your life full outside the relationship."
        ]
      },

      [K.sensitive]: {
        title: "Sensitive Under Pressure — You Feel Deeply, Even When You Stay Quiet",
        bullets: [
          "You notice shifts fast — sometimes too fast.",
          "You’re not dramatic; you’re emotionally tuned in.",
          "Stress amplifies your sensitivity to distance."
        ],
        what_it_looks_like: [
          "You feel anxiety after texting, but you manage it.",
          "You overthink tone changes when you’re already tired.",
          "You crave consistency more than romance."
        ],
        blindspots: [
          "You may internalize discomfort instead of asking directly.",
          "You might ‘earn safety’ by being easy to love.",
          "You may confuse nervousness with intuition."
        ],
        scripts: [
          "“My mind is spiraling a little — can you reassure me quickly?”",
          "“I might be overreading this. Can you clarify your tone?”",
          "“I’m sensitive to distance. A quick check-in helps me.”"
        ],
        next_steps: [
          "Use a 20-minute pause before reacting to triggers.",
          "Track what spikes anxiety (silence, tone, social media).",
          "Ask for reassurance cleanly — without shame."
        ]
      },

      [K.anxious]: {
        title: "Anxious Attachment Patterns — You Don’t Want to Chase… But Your Fear Does",
        bullets: [
          "Uncertainty feels personal, even when it isn’t.",
          "You crave reassurance — then feel guilty for needing it.",
          "Your fear of abandonment can feel louder than love."
        ],
        what_it_looks_like: [
          "You replay conversations like evidence.",
          "You feel emotionally unsafe when closeness changes.",
          "You monitor small signals: emojis, replies, warmth."
        ],
        blindspots: [
          "You might test love instead of requesting it.",
          "You may apologize for needs that are actually human.",
          "You may confuse intensity with connection."
        ],
        scripts: [
          "“I’m feeling insecure today. Can we have a small reassurance moment?”",
          "“My fear is talking — I don’t want to act from it.”",
          "“I care about us. Can we create more consistency?”"
        ],
        next_steps: [
          "Replace emotional tests with direct requests.",
          "Create a self-soothing plan for texting triggers.",
          "Build an ‘evidence list’ of safety, not fear."
        ]
      },

      [K.loop]: {
        title: "High Relationship Anxiety Loop — Your Mind Doesn’t Rest Until It Gets Proof",
        bullets: [
          "You can’t relax in love — you scan it.",
          "Reassurance helps… then fades fast.",
          "Overthinking in relationships feels automatic."
        ],
        what_it_looks_like: [
          "You check your phone more than you want to admit.",
          "Silence feels like rejection, not neutrality.",
          "You feel pulled into jealousy and insecurity cycles."
        ],
        blindspots: [
          "You might start conflict just to force certainty.",
          "You may confuse control with closeness.",
          "You might punish yourself for having feelings."
        ],
        scripts: [
          "“I’m triggered. I’m going to pause before I react.”",
          "“I need clarity — not a fight. Can we reset?”",
          "“My anxiety wants proof. I’m trying to stay grounded.”"
        ],
        next_steps: [
          "Create a rule: no big texts in peak anxiety.",
          "Ask for a consistent communication rhythm.",
          "Limit social media checking when anxious."
        ]
      },

      [K.control]: {
        title: "Relationship Anxiety Taking Control — Love Feels Like a Place You Could Lose Any Second",
        bullets: [
          "Your nervous system treats love like danger.",
          "Silence feels like disappearance.",
          "You may relate to intense attachment anxiety."
        ],
        what_it_looks_like: [
          "You feel panic when connection shifts.",
          "You struggle with anxiety after texting and delayed replies.",
          "You crave constant reassurance to feel stable."
        ],
        blindspots: [
          "You might confuse your fear with truth.",
          "You may attach to ‘signs’ more than real patterns.",
          "You may lose yourself trying to keep closeness alive."
        ],
        scripts: [
          "“I’m not okay right now — I need calm reassurance, not debate.”",
          "“I don’t want to accuse. I want safety. Can we talk?”",
          "“Please be patient — I’m working on my triggers.”"
        ],
        next_steps: [
          "Build a crisis plan: pause + breathe + delay texting.",
          "Name the trigger: silence, distance, tone, social media.",
          "Consider support to build emotional safety (licensed professional)."
        ]
      }
    }
  };
})();

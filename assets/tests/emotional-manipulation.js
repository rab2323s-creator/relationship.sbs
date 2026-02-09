/* emotional-manipulation.js — single test definition */
(function () {
  const SLUG = "emotional-manipulation";

  const K = {
    healthy: "healthy_influence",
    pressure: "boundary_pressure",
    confusion: "reality_confusion_signals",
    likely: "manipulation_pattern_likely",
    control: "high_emotional_control_dynamic"
  };

  window.TEST = {
    id: "emotional_manipulation",
    slug: SLUG,
    title: "Emotional Manipulation Test — Are You Being Emotionally Manipulated?",
    blurb:
      "15 high-impact scenarios to spot emotional manipulation patterns (gaslighting, guilt-tripping, DARVO, silent punishment)—plus scripts & next steps (ad-safe, no diagnosis).",
    time: "2–3 min",
    intent: "quiz",
    keywords: [
      "emotional manipulation test",
      "are you being emotionally manipulated",
      "emotional manipulation in relationships",
      "subtle emotional control signs",
      "gaslighting in a relationship",
      "guilt tripping in relationships",
      "darvo in relationships",
      "emotional control in a toxic relationship",
      "blame shifting relationship",
      "silent treatment emotional control",
      "walking on eggshells relationship"
    ],

    questions: [
      {
        text: "1) You calmly mention something that hurt you. Their first reaction is…",
        options: [
          { label: "They listen, own it, and ask what would help.", score: { [K.healthy]: 3 }, tags: ["accountability"] },
          { label: "They get defensive, but can come back and repair later.", score: { [K.pressure]: 3 }, tags: ["defensive_then_repair"] },
          { label: "They question your memory/tone until you doubt yourself.", score: { [K.confusion]: 3 }, tags: ["reality_edit"] },
          { label: "They flip it and you end up apologizing for bringing it up.", score: { [K.control]: 3 }, tags: ["reverse_blame"] }
        ]
      },
      {
        text: "2) After conflict, what usually restores peace?",
        options: [
          { label: "A clear repair talk and one agreed change.", score: { [K.healthy]: 3 }, tags: ["repair"] },
          { label: "Time passing—then you both avoid the topic.", score: { [K.pressure]: 3 }, tags: ["avoid"] },
          { label: "You explaining your feelings ‘better’ so they accept them.", score: { [K.confusion]: 3 }, tags: ["over_explain"] },
          { label: "You giving in, apologizing, or shrinking your request.", score: { [K.control]: 3 }, tags: ["compliance"] }
        ]
      },
      {
        text: "3) You set a simple boundary (time, tone, privacy). They respond with…",
        options: [
          { label: "Respect, even if they disagree.", score: { [K.healthy]: 3 }, tags: ["respect"] },
          { label: "Pushback, but they adjust after a while.", score: { [K.pressure]: 3 }, tags: ["pushback"] },
          { label: "Guilt: you’re ‘cold’ or ‘selfish’ for having limits.", score: { [K.confusion]: 3 }, tags: ["guilt"] },
          { label: "Consequences: distance, coldness, or making you pay for it.", score: { [K.control]: 3 }, tags: ["punishment"] }
        ]
      },
      {
        text: "4) When you disagree, they tend to…",
        options: [
          { label: "Stay on the topic and respect your view.", score: { [K.healthy]: 3 }, tags: ["fair"] },
          { label: "Debate hard, but don’t attack your character.", score: { [K.pressure]: 3 }, tags: ["hard_debate"] },
          { label: "Make you feel irrational: “You’re too sensitive.”", score: { [K.confusion]: 3 }, tags: ["invalidate"] },
          { label: "Escalate until you drop it, then act like you’re the problem.", score: { [K.control]: 3 }, tags: ["wear_down"] }
        ]
      },
      {
        text: "5) You notice you’re choosing your words carefully because…",
        options: [
          { label: "You want clarity, not conflict (and it’s safe to speak).", score: { [K.healthy]: 3 }, tags: ["safe_speak"] },
          { label: "They get defensive, so timing matters.", score: { [K.pressure]: 3 }, tags: ["timing"] },
          { label: "Small feedback becomes a debate about your tone.", score: { [K.confusion]: 3 }, tags: ["tone_police"] },
          { label: "Honesty has consequences (coldness, punishment, chaos).", score: { [K.control]: 3 }, tags: ["eggshells"] }
        ]
      },
      {
        text: "6) They do something hurtful, then say: “I was joking.” You usually…",
        options: [
          { label: "Name impact and they stop doing it.", score: { [K.healthy]: 3 }, tags: ["impact"] },
          { label: "Let it go, but feel a bit uneasy.", score: { [K.pressure]: 3 }, tags: ["uneasy"] },
          { label: "Start doubting if you’re ‘too sensitive.’", score: { [K.confusion]: 3 }, tags: ["self_doubt"] },
          { label: "Apologize for reacting and try to be ‘easier.’", score: { [K.control]: 3 }, tags: ["shrink"] }
        ]
      },
      {
        text: "7) When you ask for reassurance, the response is often…",
        options: [
          { label: "Clear and kind, without making you feel ashamed.", score: { [K.healthy]: 3 }, tags: ["kind"] },
          { label: "Sometimes supportive, sometimes annoyed.", score: { [K.pressure]: 3 }, tags: ["inconsistent"] },
          { label: "A lecture about why your feelings are illogical.", score: { [K.confusion]: 3 }, tags: ["logic_weapon"] },
          { label: "Reassurance only after you ‘earn it’ or comply.", score: { [K.control]: 3 }, tags: ["conditional"] }
        ]
      },
      {
        text: "8) If you bring up a pattern (not one incident), they…",
        options: [
          { label: "Ask for examples and take accountability.", score: { [K.healthy]: 3 }, tags: ["pattern_accountability"] },
          { label: "Agree in words, but behavior changes slowly.", score: { [K.pressure]: 3 }, tags: ["slow_change"] },
          { label: "Argue each detail so the pattern disappears.", score: { [K.confusion]: 3 }, tags: ["detail_fight"] },
          { label: "Deny it and attack you for “keeping score.”", score: { [K.control]: 3 }, tags: ["deny_attack"] }
        ]
      },
      {
        text: "9) You feel safest in the relationship when you…",
        options: [
          { label: "Can be honest without fear of consequences.", score: { [K.healthy]: 3 }, tags: ["honest_safe"] },
          { label: "Keep things positive and avoid heavy topics.", score: { [K.pressure]: 3 }, tags: ["avoid_heavy"] },
          { label: "Explain yourself perfectly so you won’t be misunderstood.", score: { [K.confusion]: 3 }, tags: ["perfect_explain"] },
          { label: "Give them what they want so they stay calm.", score: { [K.control]: 3 }, tags: ["appease"] }
        ]
      },
      {
        text: "10) When they’re upset, you often feel…",
        options: [
          { label: "Concerned, but not responsible for their emotions.", score: { [K.healthy]: 3 }, tags: ["not_responsible"] },
          { label: "Like you should fix it quickly.", score: { [K.pressure]: 3 }, tags: ["fixer"] },
          { label: "Like you might have ‘caused’ it without knowing how.", score: { [K.confusion]: 3 }, tags: ["mystery_guilt"] },
          { label: "Like you must comply or pay a price (distance/coldness).", score: { [K.control]: 3 }, tags: ["fear_price"] }
        ]
      },
      {
        text: "11) Their kindness feels…",
        options: [
          { label: "Consistent—connected to who they are, not your compliance.", score: { [K.healthy]: 3 }, tags: ["consistent_kind"] },
          { label: "Mostly kind, but can drop when stressed.", score: { [K.pressure]: 3 }, tags: ["stress_drop"] },
          { label: "Selective: warm after you doubt yourself, cold after you speak up.", score: { [K.confusion]: 3 }, tags: ["selective"] },
          { label: "Transactional: you get warmth when you behave ‘right.’", score: { [K.control]: 3 }, tags: ["transactional"] }
        ]
      },
      {
        text: "12) You notice the ‘goalposts’ change. For example: you do what they asked, but now it’s…",
        options: [
          { label: "Discussed fairly with clear expectations.", score: { [K.healthy]: 3 }, tags: ["clear"] },
          { label: "A misunderstanding you can clarify.", score: { [K.pressure]: 3 }, tags: ["clarify"] },
          { label: "Used to prove you’re always wrong, no matter what.", score: { [K.confusion]: 3 }, tags: ["moving_goalposts"] },
          { label: "Used to keep you chasing approval endlessly.", score: { [K.control]: 3 }, tags: ["approval_chase"] }
        ]
      },
      {
        text: "13) If you ask for space, they often…",
        options: [
          { label: "Respect it and reconnect calmly later.", score: { [K.healthy]: 3 }, tags: ["space_ok"] },
          { label: "Feel hurt, but can handle it.", score: { [K.pressure]: 3 }, tags: ["hurt_then_ok"] },
          { label: "Make you feel guilty for needing space.", score: { [K.confusion]: 3 }, tags: ["guilt_space"] },
          { label: "Punish you with coldness or withdrawal.", score: { [K.control]: 3 }, tags: ["withdraw_punish"] }
        ]
      },
      {
        text: "14) You’ve caught yourself thinking: “Maybe I’m the problem.” That thought appears…",
        options: [
          { label: "Rarely. I can reality-check and feel steady.", score: { [K.healthy]: 3 }, tags: ["steady"] },
          { label: "Sometimes, after a hard conversation.", score: { [K.pressure]: 3 }, tags: ["self_reflect"] },
          { label: "Often—especially after they dismiss my feelings.", score: { [K.confusion]: 3 }, tags: ["doubt"] },
          { label: "Constantly. I feel like I can’t trust my own judgment.", score: { [K.control]: 3 }, tags: ["no_trust"] }
        ]
      },
      {
        text: "15) If the next 30 days stayed exactly the same, you’d feel…",
        options: [
          { label: "Okay. This is workable and respectful.", score: { [K.healthy]: 3 }, tags: ["workable"] },
          { label: "Uneasy. I’d need clearer repair and consistency.", score: { [K.pressure]: 3 }, tags: ["need_consistency"] },
          { label: "Tired. I’m always explaining my reality.", score: { [K.confusion]: 3 }, tags: ["tired"] },
          { label: "Smaller. Like I’m losing myself to keep peace.", score: { [K.control]: 3 }, tags: ["lose_self"] }
        ]
      }
    ],

    results: {
      [K.healthy]: {
        title: "Healthy Influence — Your Boundaries Don’t Cost You Love",
        subtitle: "Disagreements don’t turn into consequences. Repair exists.",
        summary:
          "You may relate to a relationship where influence is mutual, not controlling. When something hurts, it can be named without turning into a courtroom. Boundaries are respected, and repair looks like changed behavior—not just words. This doesn’t mean you never feel tension; it means your reality stays intact in the relationship.",
        bullets: [
          "Accountability shows up more than defensiveness.",
          "Boundaries are respected without punishment.",
          "You can speak honestly without fear."
        ],
        scripts: [
          "“I want to handle this with respect and repair—can we talk for 10 minutes?”",
          "“Thank you for hearing me. That helps me feel safe.”",
          "“Let’s agree on one change and follow through this week.”"
        ],
        next_steps: [
          "Keep a weekly check-in (15 minutes).",
          "Repair small tension early before it stacks up.",
          "Protect respectful tone as a shared rule."
        ],
        cautions: [
          "Trust the pattern over isolated moments—good or bad."
        ]
      },

      [K.pressure]: {
        title: "Boundary Pressure — You’re Often Managing Their Reactions",
        subtitle: "Not always manipulation, but your needs may trigger defensiveness.",
        summary:
          "You may relate to a dynamic where you can speak up, but it often costs energy: timing, wording, calming them down, or waiting for the ‘right mood.’ Repair may happen, but inconsistently. The risk is that you start avoiding topics to preserve peace—quietly trading honesty for stability.",
        bullets: [
          "Defensiveness shows up before repair.",
          "You choose words carefully to avoid escalation.",
          "Consistency improves only sometimes."
        ],
        scripts: [
          "“I’m not attacking you—I’m naming an issue so we can repair.”",
          "“I need you to stay on the topic, not my tone.”",
          "“Let’s make one measurable agreement and follow through.”"
        ],
        next_steps: [
          "Use one clear request + a timeline (2–4 weeks).",
          "Stop over-explaining; clarity beats persuasion.",
          "Track follow-through, not apologies."
        ],
        cautions: [
          "If you keep shrinking to prevent defensiveness, the pattern hardens."
        ]
      },

      [K.confusion]: {
        title: "Reality Confusion Signals — Your Feelings Keep Getting Rewritten",
        subtitle: "If you leave talks doubting yourself, slow down and track patterns.",
        summary:
          "You may relate to repeated moments where your reality becomes debatable: your memory is questioned, your feelings are minimized, or each detail gets argued until the pattern disappears. This can create self-doubt and compulsive explaining. One misunderstanding isn’t the issue—the issue is repetition and the emotional cost.",
        bullets: [
          "Conversations leave you confused or guilty.",
          "Your feelings are treated like a logic problem.",
          "Accountability gets lost in detail fights."
        ],
        scripts: [
          "“I’m not debating my feelings. I’m naming what happened and what I need next.”",
          "“Let’s stay on one issue and one agreement—no rewrites.”",
          "“If this turns into blame, I’m pausing and revisiting later.”"
        ],
        next_steps: [
          "Write down examples (date, behavior, outcome) to protect clarity.",
          "Set a boundary around respect and topic-switching.",
          "Watch whether accountability improves over time."
        ],
        cautions: [
          "This is not a diagnosis—use it to clarify patterns, not label a person."
        ]
      },

      [K.likely]: {
        title: "Manipulation Pattern Likely — Peace Often Requires Your Compliance",
        subtitle: "The relationship may reward you for shrinking and appeasing.",
        summary:
          "You may relate to a loop where stability returns only when you back down, apologize, or stop asking. Kindness may appear after you doubt yourself, while boundaries trigger guilt or withdrawal. This can train you to self-edit constantly. The most important question isn’t ‘What are they?’—it’s ‘What does this dynamic cost me?’",
        bullets: [
          "Boundaries trigger guilt or consequences.",
          "Repair looks like temporary calm, not consistent change.",
          "You feel pressure to be easy, careful, agreeable."
        ],
        scripts: [
          "“I’m asking for accountability, not a debate.”",
          "“I will not accept blame for raising a concern.”",
          "“If this repeats, I will step back to protect my wellbeing.”"
        ],
        next_steps: [
          "Choose one boundary and enforce it consistently.",
          "Measure behavior over time, not intensity in the moment.",
          "Consider support to protect your clarity (licensed professional / trusted support)."
        ],
        cautions: [
          "If you feel persistently distressed, don’t carry this alone."
        ]
      },

      [K.control]: {
        title: "High Emotional Control Dynamic — You’re Shrinking to Keep the Peace",
        subtitle: "When honesty has consequences, emotional safety is compromised.",
        summary:
          "You may relate to a dynamic where speaking up reliably leads to punishment: coldness, withdrawal, guilt, or escalation. You might be walking on eggshells, managing their mood, and losing self-trust. This result is about patterns and impact—not diagnosing anyone. If the cost is your sense of self, it’s serious data.",
        bullets: [
          "Honesty comes with consequences (coldness/withdrawal).",
          "You feel responsible for preventing fallout.",
          "You feel smaller, quieter, less like yourself."
        ],
        scripts: [
          "“I will not continue this conversation if it becomes disrespectful. I’m pausing.”",
          "“I’m not available for guilt or blame-shifting. We can talk when it’s fair.”",
          "“I need consistent respect. If that’s not possible, I will step back.”"
        ],
        next_steps: [
          "Set one non-negotiable boundary and follow through.",
          "Document patterns to protect your reality and clarity.",
          "If distress feels severe or persistent, consider speaking with a licensed professional."
        ],
        cautions: [
          "Educational tool only. If you feel consistently unwell, seek real support."
        ]
      }
    },

    faq: [
      {
        q: "What is emotional manipulation in a relationship?",
        a: "Emotional manipulation is a pattern where someone uses guilt, confusion, fear, or obligation to steer your choices. Instead of clear requests and mutual respect, you feel pressure and consequences until you comply."
      },
      {
        q: "What are subtle emotional control signs in a toxic relationship?",
        a: "Common subtle signs include guilt-tripping, moving goalposts, selective kindness, silent punishment, and conversations that leave you doubting your reality. Look for repetition over time, not one moment."
      },
      {
        q: "What is gaslighting in a relationship?",
        a: "Gaslighting is repeated reality-editing: your memory or feelings are questioned or rewritten until you doubt yourself. The key is a consistent pattern that shows up when you raise valid concerns."
      },
      {
        q: "What is guilt-tripping in relationships?",
        a: "Guilt-tripping replaces a request with moral pressure. It implies you’re wrong or unloving unless you comply, training you to over-function and feel responsible for their mood."
      },
      {
        q: "What is DARVO in relationships?",
        a: "DARVO stands for deny, attack, and reverse victim/offender. You name a behavior; they deny it, attack your character, and position themselves as the one harmed—until you’re apologizing."
      }
    ]
  };
})();

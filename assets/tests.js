/*
  tests.js — data-only. Add more tests by appending objects to TESTS.
  Each test gets its own folder page under /tests/<slug>/ (index.html)
*/
window.TESTS = [
  {
    id: "attachment",
    slug: "attachment-style",
    title: "Attachment Style Snapshot",
    blurb: "A 60-second scan of how you connect under stress.",
    time: "60 sec",
    intent: "quiz",
    keywords: [
      "attachment style quiz", "anxious attachment", "avoidant attachment", "secure attachment"
    ],
    questions: [
      {
        text: "When someone pulls away, you usually…",
        options: [
          { label: "Try to get closer fast", score: { anxious: 2 } },
          { label: "Give space and detach", score: { avoidant: 2 } },
          { label: "Ask calmly what’s going on", score: { secure: 2 } },
          { label: "Overthink and feel tense", score: { anxious: 1 } }
        ]
      },
      {
        text: "In conflict you prefer…",
        options: [
          { label: "Fix it immediately", score: { anxious: 2 } },
          { label: "Pause and revisit later", score: { secure: 2 } },
          { label: "End the talk quickly", score: { avoidant: 2 } },
          { label: "Apologize even if unsure", score: { anxious: 1 } }
        ]
      },
      {
        text: "Commitment feels…",
        options: [
          { label: "Comforting", score: { secure: 2 } },
          { label: "A bit suffocating", score: { avoidant: 2 } },
          { label: "I need reassurance", score: { anxious: 2 } },
          { label: "Depends on the person", score: { secure: 1 } }
        ]
      },
      {
        text: "If a text reply is late, you tend to…",
        options: [
          { label: "Assume something is wrong", score: { anxious: 2 } },
          { label: "Get busy and forget", score: { secure: 2 } },
          { label: "Feel relieved by space", score: { avoidant: 2 } },
          { label: "Check the chat repeatedly", score: { anxious: 1 } }
        ]
      }
    ],
    results: {
      secure: {
        title: "Secure-leaning",
        bullets: [
          "You balance closeness and independence well.",
          "You communicate needs more directly than most.",
          "You recover from conflict relatively fast."
        ],
        nextStep: "Say one need in one sentence today—no backstory, no hints."
      },
      anxious: {
        title: "Anxious-leaning",
        bullets: [
          "Uncertainty quickly triggers overthinking.",
          "You seek reassurance when connection feels shaky.",
          "You may chase closure when stressed."
        ],
        nextStep: "Before you text, wait 10 minutes—then send the simplest clear request."
      },
      avoidant: {
        title: "Avoidant-leaning",
        bullets: [
          "You protect independence when emotions get intense.",
          "You may shut down to feel safe.",
          "Space regulates you, but can confuse partners."
        ],
        nextStep: "Tell them: “I need a short pause. I’ll come back at __.” Then actually return."
      }
    },
    faq: [
      { q: "Is this an official diagnosis?", a: "No. It’s a self-reflection tool based on common attachment patterns." },
      { q: "Can my attachment style change?", a: "Yes. Patterns can shift with secure relationships, therapy, and practice." },
      { q: "What if I score high in more than one style?", a: "That’s common. Use your top score as a starting point, not a label." }
    ]
  },
  {
    id: "love_language",
    slug: "love-language",
    title: "Love Language Micro-Test",
    blurb: "How you give/receive love—without the fluff.",
    time: "45 sec",
    intent: "quiz",
    keywords: ["love language quiz", "words of affirmation", "quality time", "acts of service", "physical touch", "gifts"],
    questions: [
      {
        text: "You feel most loved when someone…",
        options: [
          { label: "Says specific compliments", score: { words: 2 } },
          { label: "Plans undistracted time", score: { time: 2 } },
          { label: "Helps without being asked", score: { service: 2 } },
          { label: "Hugs you often", score: { touch: 2 } },
          { label: "Gives a thoughtful small gift", score: { gifts: 2 } }
        ]
      },
      {
        text: "Your default way to show love is…",
        options: [
          { label: "I say it clearly", score: { words: 2 } },
          { label: "I make time", score: { time: 2 } },
          { label: "I do practical things", score: { service: 2 } },
          { label: "I’m physically affectionate", score: { touch: 2 } },
          { label: "I bring little surprises", score: { gifts: 2 } }
        ]
      },
      {
        text: "In conflict you want…",
        options: [
          { label: "Reassuring words", score: { words: 2 } },
          { label: "Time together to repair", score: { time: 2 } },
          { label: "Actions that prove change", score: { service: 2 } },
          { label: "A hug after talking", score: { touch: 2 } },
          { label: "A meaningful gesture", score: { gifts: 2 } }
        ]
      }
    ],
    results: {
      words: { title: "Words of Affirmation", bullets: ["You value clear appreciation.", "Tone matters more than people realize.", "Specific praise lands best."], nextStep: "Ask for one specific sentence you’d like to hear this week." },
      time: { title: "Quality Time", bullets: ["You value presence over talk.", "Undistracted attention is the signal.", "Consistency beats intensity."], nextStep: "Plan one 30-minute no-phone block together." },
      service: { title: "Acts of Service", bullets: ["Actions are your proof.", "Reliability feels romantic.", "Effort matters more than promises."], nextStep: "Choose one tiny task you’d love help with and ask directly." },
      touch: { title: "Physical Touch", bullets: ["Affection regulates you.", "Small touches matter daily.", "Reconnection is often physical first."], nextStep: "Agree on a simple daily touch ritual (hug, hand-hold, etc.)." },
      gifts: { title: "Thoughtful Gifts", bullets: ["It’s the meaning, not the price.", "Remembered details feel intimate.", "Symbols help you feel seen."], nextStep: "Share a ‘wish list of small meanings’ (songs, snacks, notes)." }
    },
    faq: [
      { q: "Do partners need the same love language?", a: "No. What matters is learning each other’s preferred signals and using them." },
      { q: "Can I have two love languages?", a: "Yes. Many people have a close top two." },
      { q: "What if my partner dismisses this?", a: "Try framing it as ‘what helps me feel cared for’ rather than a label." }
    ]
  },
  {
    id: "conflict_style",
    slug: "conflict-style",
    title: "Conflict Style Quick Scan",
    blurb: "How you argue, repair, and reconnect.",
    time: "60 sec",
    intent: "quiz",
    keywords: ["conflict style", "communication in relationships", "fighting fair", "repair after conflict"],
    questions: [
      {
        text: "When tension rises, you…",
        options: [
          { label: "Talk fast to fix it now", score: { pursuer: 2 } },
          { label: "Go quiet to calm down", score: { withdrawer: 2 } },
          { label: "Ask for a pause then return", score: { resolver: 2 } },
          { label: "Use humor to soften it", score: { softener: 2 } }
        ]
      },
      {
        text: "After an argument, you prefer…",
        options: [
          { label: "Reassurance immediately", score: { pursuer: 2 } },
          { label: "Space first", score: { withdrawer: 2 } },
          { label: "A plan + small action", score: { resolver: 2 } },
          { label: "A light reset and then talk", score: { softener: 2 } }
        ]
      },
      {
        text: "Your biggest risk is…",
        options: [
          { label: "Escalating to get clarity", score: { pursuer: 2 } },
          { label: "Disappearing emotionally", score: { withdrawer: 2 } },
          { label: "Over-managing feelings", score: { resolver: 2 } },
          { label: "Avoiding depth for peace", score: { softener: 2 } }
        ]
      }
    ],
    results: {
      pursuer: { title: "Pursuer", bullets: ["You seek closeness through resolution.", "Silence feels threatening.", "You may push when anxious."], nextStep: "Use one line: “I want us okay—can we talk at __?” Then wait." },
      withdrawer:{ title: "Withdrawer", bullets: ["You regulate by stepping back.", "Intensity feels unsafe.", "You may shut down."], nextStep: "Say: “I need 20 minutes to calm down, then I’ll come back.”" },
      resolver: { title: "Resolver", bullets: ["You want structure and repair.", "You’re solution-oriented.", "You can under-validate emotions."], nextStep: "Start with one feeling sentence before proposing any fix." },
      softener:{ title: "Softener", bullets: ["You reduce threat quickly.", "You keep things from exploding.", "You can skip the real issue."], nextStep: "After the joke, ask one honest question: “What are you afraid will happen?”" }
    },
    faq: [
      { q: "Is one conflict style better than the others?", a: "No. Each style has strengths and blind spots. The goal is repair and clarity." },
      { q: "How do we stop repeating the same fight?", a: "Agree on a pause rule, name the core need, and end with one concrete next step." },
      { q: "What if one partner withdraws and the other pursues?", a: "That pairing is common. Use timed pauses with a guaranteed return." }
    ]
  }
];

// Add more tests here later.
window.TESTS = [
  {
    id: "attachment",
    title: "Attachment Style Snapshot",
    blurb: "A quick scan of how you connect under stress.",
    questions: [
      {
        text: "When someone pulls away, you usually…",
        options: [
          { label: "Try to get closer fast", score: { anxious: 2 } },
          { label: "Give them space and detach", score: { avoidant: 2 } },
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
      }
    ],
    results: {
      secure: {
        title: "Secure-leaning",
        bullets: [
          "You handle closeness and space with balance.",
          "You communicate needs more directly than most.",
          "You recover from conflict relatively fast."
        ],
        nextStep: "Pick one need you have and say it in one clear sentence today."
      },
      anxious: {
        title: "Anxious-leaning",
        bullets: [
          "You seek reassurance when connection feels shaky.",
          "Uncertainty can trigger overthinking.",
          "You may chase closure when stressed."
        ],
        nextStep: "Before texting, wait 10 minutes and write the simplest request you actually need."
      },
      avoidant: {
        title: "Avoidant-leaning",
        bullets: [
          "You protect independence when emotions get intense.",
          "You may shut down to feel safe.",
          "Space helps you regulate, but can confuse partners."
        ],
        nextStep: "Tell the other person: “I need a short pause, and I will come back at __ time.”"
      }
    }
  }
];

/* narcissistic-relationship.js — single test definition */
(function () {
  const SLUG = "narcissistic-relationship";

  // Core result keys (must match results object keys)
  const K = {
    respectful: "respectful_dynamic",
    friction: "self_centered_friction",
    flags: "manipulation_flags",
    likely: "narcissistic_pattern_likely",
    erosion: "high_control_erosion"
  };

  window.TEST = {
    id: "narcissistic_relationship",
    slug: SLUG,
    title: "Narcissistic Relationship Test — Are You in a Narcissistic Relationship?",
    blurb:
      "15 high-impact scenarios to spot narcissistic relationship patterns (gaslighting, blame-shifting, control, love-bombing)—plus scripts and next steps (ad-safe, no diagnosis).",
    time: "2–3 min",
    intent: "quiz",
    keywords: [
      "narcissistic relationship test",
      "are you in a narcissistic relationship",
      "signs of narcissistic partner",
      "gaslighting in relationships",
      "blame shifting relationship",
      "love bombing and devaluation",
      "emotional manipulation signs",
      "walking on eggshells relationship",
      "self centered partner signs",
      "lack of accountability relationship",
      "narcissistic manipulation in relationships"
    ],

    questions: [
      {
        text: "1) You bring up a small hurt. Their first move is usually…",
        options: [
          { label: "They listen, take it seriously, and try to repair.", score: { [K.respectful]: 3 }, tags: ["repair", "accountability"] },
          { label: "They listen… but quickly make it about their stress.", score: { [K.friction]: 3 }, tags: ["self_focus"] },
          { label: "They question your memory or tone until you back down.", score: { [K.flags]: 3 }, tags: ["reality_shift"] },
          { label: "They flip it: you end up apologizing for bringing it up.", score: { [K.erosion]: 3 }, tags: ["blame_shift"] }
        ]
      },
      {
        text: "2) After conflict, what happens most often?",
        options: [
          { label: "A real repair conversation + a clearer agreement.", score: { [K.respectful]: 3 }, tags: ["repair"] },
          { label: "A temporary calm… but nothing changes long-term.", score: { [K.friction]: 3 }, tags: ["no_change"] },
          { label: "You’re left confused about what was real.", score: { [K.flags]: 3 }, tags: ["confusion"] },
          { label: "Cold distance or punishment until you ‘fix it.’", score: { [K.erosion]: 3 }, tags: ["punish"] }
        ]
      },
      {
        text: "3) Their apologies usually sound like…",
        options: [
          { label: "“I see how that hurt you. I’ll do better.”", score: { [K.respectful]: 3 }, tags: ["own_it"] },
          { label: "“I’m sorry, but you should understand my situation.”", score: { [K.friction]: 3 }, tags: ["justify"] },
          { label: "“Sorry you feel that way.” (no accountability)", score: { [K.flags]: 3 }, tags: ["non_apology"] },
          { label: "Apology + immediate reversal: “But you’re the real issue.”", score: { [K.erosion]: 3 }, tags: ["reverse"] }
        ]
      },
      {
        text: "4) When something good happens to you, they tend to…",
        options: [
          { label: "Celebrate you and stay genuinely happy for you.", score: { [K.respectful]: 3 }, tags: ["support"] },
          { label: "Support you… but make sure attention returns to them.", score: { [K.friction]: 3 }, tags: ["spotlight"] },
          { label: "Subtly downplay it or compare you to others.", score: { [K.flags]: 3 }, tags: ["undercut"] },
          { label: "Act cold or irritated when you shine.", score: { [K.erosion]: 3 }, tags: ["punish_success"] }
        ]
      },
      {
        text: "5) If you set a boundary, the response is usually…",
        options: [
          { label: "Respect: they may disagree, but they don’t punish you.", score: { [K.respectful]: 3 }, tags: ["respect"] },
          { label: "Negotiation: they push a bit, then move on.", score: { [K.friction]: 3 }, tags: ["push"] },
          { label: "Guilt: you’re told you’re selfish or “too much.”", score: { [K.flags]: 3 }, tags: ["guilt"] },
          { label: "Retaliation: distance, anger, or consequences.", score: { [K.erosion]: 3 }, tags: ["retaliation"] }
        ]
      },
      {
        text: "6) In public (friends/family), they’re often…",
        options: [
          { label: "Consistent: similar warmth publicly and privately.", score: { [K.respectful]: 3 }, tags: ["consistent"] },
          { label: "More charming publicly, but still basically fair privately.", score: { [K.friction]: 3 }, tags: ["image"] },
          { label: "Extremely charming publicly, cold or dismissive privately.", score: { [K.flags]: 3 }, tags: ["two_faces"] },
          { label: "Public perfection + private control that makes you doubt yourself.", score: { [K.erosion]: 3 }, tags: ["mask"] }
        ]
      },
      {
        text: "7) When you’re upset, they usually focus on…",
        options: [
          { label: "Understanding what you feel and what you need.", score: { [K.respectful]: 3 }, tags: ["empathy"] },
          { label: "Ending the discomfort quickly (solutions, skipping feelings).", score: { [K.friction]: 3 }, tags: ["fix_fast"] },
          { label: "Proving you’re wrong for feeling that way.", score: { [K.flags]: 3 }, tags: ["invalidate"] },
          { label: "Turning it into your fault until you drop it.", score: { [K.erosion]: 3 }, tags: ["blame"] }
        ]
      },
      {
        text: "8) You catch yourself “walking on eggshells” because…",
        options: [
          { label: "You don’t, generally—you can be honest safely.", score: { [K.respectful]: 3 }, tags: ["safe"] },
          { label: "They can be moody, so you choose timing carefully.", score: { [K.friction]: 3 }, tags: ["timing"] },
          { label: "Small things can trigger big defensiveness.", score: { [K.flags]: 3 }, tags: ["defensive"] },
          { label: "Your honesty has consequences (coldness, punishment, chaos).", score: { [K.erosion]: 3 }, tags: ["consequence"] }
        ]
      },
      {
        text: "9) When you point out a factual inconsistency, they…",
        options: [
          { label: "Clarify and correct themselves without drama.", score: { [K.respectful]: 3 }, tags: ["reality"] },
          { label: "Explain a lot, but eventually agree on the facts.", score: { [K.friction]: 3 }, tags: ["explain"] },
          { label: "Deny it or rewrite what was said.", score: { [K.flags]: 3 }, tags: ["rewrite"] },
          { label: "Attack your character for noticing it.", score: { [K.erosion]: 3 }, tags: ["attack"] }
        ]
      },
      {
        text: "10) Their needs vs. your needs feels like…",
        options: [
          { label: "Balanced: both matter, even when it’s inconvenient.", score: { [K.respectful]: 3 }, tags: ["balanced"] },
          { label: "Slightly imbalanced: theirs often comes first.", score: { [K.friction]: 3 }, tags: ["tilt"] },
          { label: "Double standard: your needs are questioned or minimized.", score: { [K.flags]: 3 }, tags: ["double_standard"] },
          { label: "One-sided: you exist to stabilize them.", score: { [K.erosion]: 3 }, tags: ["one_sided"] }
        ]
      },
      {
        text: "11) Early in the relationship, the intensity felt like…",
        options: [
          { label: "Warm and steady—growing at a healthy pace.", score: { [K.respectful]: 3 }, tags: ["steady"] },
          { label: "Fast at times, but not overwhelming.", score: { [K.friction]: 3 }, tags: ["fast"] },
          { label: "Very intense, then confusing distance or criticism later.", score: { [K.flags]: 3 }, tags: ["hot_cold"] },
          { label: "A pattern of charm → control → you chasing clarity.", score: { [K.erosion]: 3 }, tags: ["control_cycle"] }
        ]
      },
      {
        text: "12) If you don’t agree with them, they tend to…",
        options: [
          { label: "Handle disagreement without punishment.", score: { [K.respectful]: 3 }, tags: ["safe_disagree"] },
          { label: "Debate hard, but eventually respect your view.", score: { [K.friction]: 3 }, tags: ["debate"] },
          { label: "Make you feel irrational or “too sensitive.”", score: { [K.flags]: 3 }, tags: ["invalidate"] },
          { label: "Escalate until you give in (to restore peace).", score: { [K.erosion]: 3 }, tags: ["wear_down"] }
        ]
      },
      {
        text: "13) You often feel responsible for…",
        options: [
          { label: "Your part—without carrying their emotions.", score: { [K.respectful]: 3 }, tags: ["shared"] },
          { label: "Keeping things smooth when they’re stressed.", score: { [K.friction]: 3 }, tags: ["smooth"] },
          { label: "Their mood, their reactions, their perception.", score: { [K.flags]: 3 }, tags: ["manage"] },
          { label: "Preventing fallout by staying small and careful.", score: { [K.erosion]: 3 }, tags: ["prevent"] }
        ]
      },
      {
        text: "14) When you succeed (work, friends, confidence), they…",
        options: [
          { label: "Feel proud and supportive.", score: { [K.respectful]: 3 }, tags: ["proud"] },
          { label: "Support, but sometimes compete for attention.", score: { [K.friction]: 3 }, tags: ["compete"] },
          { label: "Undercut it subtly or shift focus away.", score: { [K.flags]: 3 }, tags: ["undercut"] },
          { label: "Act threatened and pull closeness away.", score: { [K.erosion]: 3 }, tags: ["threatened"] }
        ]
      },
      {
        text: "15) If the next 30 days stayed exactly the same, you’d feel…",
        options: [
          { label: "Okay. This dynamic feels respectful and workable.", score: { [K.respectful]: 3 }, tags: ["workable"] },
          { label: "Uneasy. I’d need more consistency and accountability.", score: { [K.friction]: 3 }, tags: ["need_more"] },
          { label: "Tired. I’m always explaining my reality.", score: { [K.flags]: 3 }, tags: ["tired"] },
          { label: "Small. Like I’m losing myself to keep peace.", score: { [K.erosion]: 3 }, tags: ["lose_self"] }
        ]
      }
    ],

    results: {
      [K.respectful]: {
        title: "Respectful Dynamic — You’re Not Paying for Having Feelings",
        subtitle: "Accountability exists. Repair exists. Your reality isn’t a debate.",
        summary:
          "You may relate to a relationship where disagreements don’t turn into punishment, and emotions don’t get minimized. That doesn’t mean everything is perfect—it means the relationship can hold honesty without turning it into a power contest. You can name a concern and expect a real response, not a reversal.",
        bullets: [
          "Needs are handled with respect (even when it’s inconvenient).",
          "Repair happens more than avoidance.",
          "You don’t have to shrink to keep peace."
        ],
        scripts: [
          "“I want us to handle this with honesty and repair—can we talk for 10 minutes?”",
          "“Thank you for hearing me. That makes me feel safe with you.”",
          "“Let’s agree on one change and follow through this week.”"
        ],
        next_steps: [
          "Keep a weekly check-in (15 minutes).",
          "Repair small tension quickly before it stacks up.",
          "Protect the respectful tone as the relationship grows."
        ],
        cautions: [
          "One healthy result doesn’t invalidate your feelings—trust patterns over one moment."
        ]
      },

      [K.friction]: {
        title: "Self-Centered Friction — The Relationship Tilts Toward Them",
        subtitle: "Not necessarily manipulation—but accountability may be inconsistent.",
        summary:
          "You may relate to a dynamic where the relationship often rotates around their needs, stress, and priorities. You can get care, but it may come with conditions: timing, mood, convenience. The risk is slow resentment—because you’re adapting more than you’re being met.",
        bullets: [
          "Their needs often take priority.",
          "Change is promised but not consistent.",
          "You may feel like you negotiate for basics."
        ],
        scripts: [
          "“I need this to feel more balanced. Can we make a clear agreement?”",
          "“When this happens, I feel dismissed. I need you to take it seriously.”",
          "“Let’s choose one action we’ll both follow through on.”"
        ],
        next_steps: [
          "Ask for one measurable change (not a vague promise).",
          "Watch consistency for 2–4 weeks.",
          "Stop over-explaining; state needs once, then observe behavior."
        ],
        cautions: [
          "Warm moments don’t cancel repeated imbalance—track patterns."
        ]
      },

      [K.flags]: {
        title: "Manipulation Flags — Your Reality Gets Questioned Too Often",
        subtitle: "Confusion isn’t normal repair. It’s a sign to slow down and document patterns.",
        summary:
          "You may relate to repeated moments of reality confusion: your feelings get minimized, your memory gets questioned, and conversations turn into debates about your tone instead of the behavior. This can make you doubt yourself and over-explain just to be believed. The key is repetition: it happens often enough that you’re changing how you speak to avoid backlash.",
        bullets: [
          "Blame-shifting or minimizing shows up repeatedly.",
          "You leave conversations feeling confused or guilty.",
          "Repair feels incomplete or conditional."
        ],
        scripts: [
          "“I’m not debating my feelings. I’m naming what happened and what I need next.”",
          "“Let’s stick to one issue and one agreement—no rewrites.”",
          "“If we can’t talk respectfully, I’ll pause and revisit later.”"
        ],
        next_steps: [
          "Write down specific examples (date, behavior, outcome).",
          "Set one boundary around tone and respect (and follow it).",
          "Notice whether accountability improves—or the pattern intensifies."
        ],
        cautions: [
          "This quiz isn’t a diagnosis—use it to clarify patterns, not label a person."
        ]
      },

      [K.likely]: {
        title: "Narcissistic Pattern Likely — The Cycle Centers Them, Costs You",
        subtitle: "Charm and conflict may feel like a loop: you soothe, they stay unchanged.",
        summary:
          "You may relate to a repeating cycle where closeness depends on you accommodating, apologizing, or shrinking. Accountability is rare, and the relationship feels built around their needs, image, and control. Over time, you may start managing their emotions more than your own life. The point here isn’t a label—it’s noticing whether the dynamic reliably erodes your self-trust.",
        bullets: [
          "Accountability is inconsistent; blame often lands on you.",
          "Repair is temporary calm, not real change.",
          "You feel pressure to be easy, agreeable, and careful."
        ],
        scripts: [
          "“I’m asking for accountability and change, not an argument.”",
          "“I’m not available for blame-shifting. Here’s the behavior I need to stop.”",
          "“If this repeats, I will step back to protect my wellbeing.”"
        ],
        next_steps: [
          "Choose one boundary and enforce it consistently.",
          "Reduce emotional debates; focus on behavior and follow-through.",
          "Consider support to protect your clarity (licensed professional / trusted support)."
        ],
        cautions: [
          "If you feel persistently distressed, don’t carry this alone."
        ]
      },

      [K.erosion]: {
        title: "High Control & Erosion — You’re Shrinking to Survive the Relationship",
        subtitle: "This pattern can quietly steal your confidence and sense of reality.",
        summary:
          "You may relate to a dynamic where disagreement has consequences and closeness feels conditional. You might be walking on eggshells, editing yourself, or constantly repairing what you didn’t break—just to avoid distance or escalation. The most important signal isn’t the label; it’s the cost: if you’re losing yourself, the relationship is not emotionally safe for you.",
        bullets: [
          "Your honesty comes with consequences (coldness, punishment, chaos).",
          "Blame-shifting and control feel frequent.",
          "You feel smaller, quieter, and less like yourself."
        ],
        scripts: [
          "“I will not continue this conversation if it turns disrespectful. I’m pausing.”",
          "“I’m not accepting blame for raising a concern. We can talk when it’s fair.”",
          "“I need consistent respect. If that’s not possible, I will step back.”"
        ],
        next_steps: [
          "Name one non-negotiable boundary and follow through.",
          "Document patterns to protect your clarity.",
          "If distress feels severe or persistent, consider speaking with a licensed professional."
        ],
        cautions: [
          "This quiz is educational. If you feel persistently unwell, seek real support."
        ]
      }
    }
  };
})();

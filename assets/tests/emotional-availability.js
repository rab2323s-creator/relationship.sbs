/* emotional-availability.js — single test definition */
(function () {
  const SLUG = "emotional-availability";

  // Core result keys (must match results object keys)
  const K = {
    present: "present_partner",
    inconsistent: "inconsistent_presence",
    guarded: "guarded_unavailable",
    avoid: "avoid_repair",
    absent: "emotionally_absent"
  };

  window.TEST = {
    id: "emotional_availability",
    slug: SLUG,
    title: "Emotional Availability Test — Is Your Partner Emotionally There?",
    blurb:
      "15 painfully accurate scenarios to reveal emotional availability, inconsistency, and repair patterns—plus scripts and next steps (ad-safe).",
    time: "2–3 min",
    intent: "quiz",
    keywords: [
      "emotional availability test",
      "emotionally unavailable partner",
      "emotional availability in relationships",
      "feeling alone in a relationship",
      "partner not emotionally supportive",
      "emotional neglect signs relationship",
      "emotional connection in relationships",
      "how to feel closer to your partner"
    ],

    questions: [
      {
        text: "1) You share a hard day. Their first response is…",
        options: [
          { label: "Presence: they listen, validate, and stay with you.", score: { [K.present]: 3 }, tags: ["presence", "validation"] },
          { label: "Care, but rushed: they try—then disappear into tasks.", score: { [K.inconsistent]: 3 }, tags: ["inconsistent", "busy"] },
          { label: "Uncomfortable: they change the topic or make it lighter.", score: { [K.guarded]: 3 }, tags: ["deflect", "avoid_feelings"] },
          { label: "Dismissive: it’s minimized or treated like an inconvenience.", score: { [K.absent]: 3 }, tags: ["dismiss", "cold"] }
        ]
      },
      {
        text: "2) When you ask “Are we okay?”, the vibe you get is…",
        options: [
          { label: "Clear: you get reassurance and a real conversation.", score: { [K.present]: 3 }, tags: ["clarity"] },
          { label: "Mixed: reassurance sometimes, avoidance other times.", score: { [K.inconsistent]: 3 }, tags: ["mixed"] },
          { label: "Defensive: you’re made to feel dramatic for asking.", score: { [K.guarded]: 3 }, tags: ["defensive"] },
          { label: "Shut down: you get silence, distance, or a wall.", score: { [K.avoid]: 3 }, tags: ["shutdown"] }
        ]
      },
      {
        text: "3) After conflict, repair usually looks like…",
        options: [
          { label: "We return: we talk, understand, and reconnect.", score: { [K.present]: 3 }, tags: ["repair"] },
          { label: "Partial repair: we move on, but something lingers.", score: { [K.inconsistent]: 3 }, tags: ["unfinished"] },
          { label: "Avoidance: we pretend it didn’t happen.", score: { [K.avoid]: 3 }, tags: ["avoid_repair"] },
          { label: "No repair: distance becomes the new normal.", score: { [K.absent]: 3 }, tags: ["drift"] }
        ]
      },
      {
        text: "4) You express a need (time, attention, support). Their reaction is…",
        options: [
          { label: "Respectful: they try to meet it or negotiate kindly.", score: { [K.present]: 3 }, tags: ["respect"] },
          { label: "Inconsistent: they agree… then forget or fade.", score: { [K.inconsistent]: 3 }, tags: ["forget"] },
          { label: "Minimizing: “you’re overthinking / it’s not a big deal.”", score: { [K.guarded]: 3 }, tags: ["minimize"] },
          { label: "Irritated: your need is treated like pressure or blame.", score: { [K.absent]: 3 }, tags: ["irritated"] }
        ]
      },
      {
        text: "5) When you’re vulnerable, you feel…",
        options: [
          { label: "Safe. My feelings land without punishment.", score: { [K.present]: 3 }, tags: ["safe"] },
          { label: "Sometimes safe, sometimes unsure.", score: { [K.inconsistent]: 3 }, tags: ["unsure"] },
          { label: "Careful. I edit myself to avoid backlash.", score: { [K.guarded]: 3 }, tags: ["self_edit"] },
          { label: "Regretful. Sharing feels like a mistake.", score: { [K.absent]: 3 }, tags: ["regret"] }
        ]
      },
      {
        text: "6) Their emotional support is most available when…",
        options: [
          { label: "It’s needed—stress doesn’t erase care.", score: { [K.present]: 3 }, tags: ["consistent"] },
          { label: "Things are calm. Stress makes them disappear.", score: { [K.inconsistent]: 3 }, tags: ["stress_drop"] },
          { label: "You keep it light and easy.", score: { [K.guarded]: 3 }, tags: ["easy_only"] },
          { label: "Honestly, it’s rarely available at all.", score: { [K.absent]: 3 }, tags: ["rare"] }
        ]
      },
      {
        text: "7) When they hurt you, accountability feels like…",
        options: [
          { label: "They can own it and try to repair.", score: { [K.present]: 3 }, tags: ["accountability"] },
          { label: "Sometimes they own it—sometimes they deflect.", score: { [K.inconsistent]: 3 }, tags: ["deflect"] },
          { label: "They explain it away or turn it into your fault.", score: { [K.guarded]: 3 }, tags: ["blame_shift"] },
          { label: "They avoid it completely and go cold.", score: { [K.avoid]: 3 }, tags: ["cold"] }
        ]
      },
      {
        text: "8) You notice a tone shift over text. You can…",
        options: [
          { label: "Ask directly and get a clear answer.", score: { [K.present]: 3 }, tags: ["direct"] },
          { label: "Ask, but clarity depends on their mood.", score: { [K.inconsistent]: 3 }, tags: ["mood"] },
          { label: "Ask and get minimized (“nothing’s wrong”).", score: { [K.guarded]: 3 }, tags: ["minimized"] },
          { label: "Ask and get punished with distance.", score: { [K.absent]: 3 }, tags: ["punished"] }
        ]
      },
      {
        text: "9) If you stop initiating connection for a few days…",
        options: [
          { label: "They still reach out and stay emotionally present.", score: { [K.present]: 3 }, tags: ["mutual"] },
          { label: "They notice sometimes, other times not.", score: { [K.inconsistent]: 3 }, tags: ["uneven"] },
          { label: "They seem fine with distance—like closeness is optional.", score: { [K.guarded]: 3 }, tags: ["distance_ok"] },
          { label: "The relationship goes quiet unless you revive it.", score: { [K.absent]: 3 }, tags: ["one_sided"] }
        ]
      },
      {
        text: "10) When you need reassurance, you usually get…",
        options: [
          { label: "A calm response that makes you feel safe.", score: { [K.present]: 3 }, tags: ["reassure"] },
          { label: "Reassurance… but it fades because it’s inconsistent.", score: { [K.inconsistent]: 3 }, tags: ["fade"] },
          { label: "A lecture about being ‘too sensitive.’", score: { [K.guarded]: 3 }, tags: ["lecture"] },
          { label: "Nothing. You’re left to regulate alone.", score: { [K.absent]: 3 }, tags: ["alone"] }
        ]
      },
      {
        text: "11) Your emotional needs feel like they’re treated as…",
        options: [
          { label: "Valid. We can talk about them without shame.", score: { [K.present]: 3 }, tags: ["valid"] },
          { label: "Valid sometimes—annoying other times.", score: { [K.inconsistent]: 3 }, tags: ["annoying"] },
          { label: "A problem to manage, not a signal to care about.", score: { [K.guarded]: 3 }, tags: ["problem"] },
          { label: "A burden. I’m made to feel guilty for needing anything.", score: { [K.absent]: 3 }, tags: ["guilt"] }
        ]
      },
      {
        text: "12) If you ask for a simple check-in (2 minutes), they…",
        options: [
          { label: "Do it. Small connection matters to them.", score: { [K.present]: 3 }, tags: ["small_matters"] },
          { label: "Do it sometimes, forget other times.", score: { [K.inconsistent]: 3 }, tags: ["forget"] },
          { label: "Call it unnecessary or ‘too much.’", score: { [K.guarded]: 3 }, tags: ["too_much"] },
          { label: "Avoid it and make you regret asking.", score: { [K.absent]: 3 }, tags: ["regret"] }
        ]
      },
      {
        text: "13) The most accurate sentence is…",
        options: [
          { label: "“I feel emotionally held in this relationship.”", score: { [K.present]: 3 }, tags: ["held"] },
          { label: "“I’m okay when it’s good, anxious when it shifts.”", score: { [K.inconsistent]: 3 }, tags: ["shift"] },
          { label: "“I’m always choosing my words carefully.”", score: { [K.guarded]: 3 }, tags: ["careful"] },
          { label: "“I feel alone even when we’re together.”", score: { [K.absent]: 3 }, tags: ["alone_together"] }
        ]
      },
      {
        text: "14) When you bring up something important, the pattern is…",
        options: [
          { label: "We face it. We don’t run from real conversations.", score: { [K.present]: 3 }, tags: ["face"] },
          { label: "We face it sometimes—avoid it other times.", score: { [K.inconsistent]: 3 }, tags: ["sometimes"] },
          { label: "We avoid it to keep peace (but distance grows).", score: { [K.avoid]: 3 }, tags: ["avoid"] },
          { label: "It becomes conflict, shutdown, or coldness.", score: { [K.absent]: 3 }, tags: ["cold"] }
        ]
      },
      {
        text: "15) If the next 30 days stayed exactly the same, you’d feel…",
        options: [
          { label: "Okay—this feels stable and emotionally supportive.", score: { [K.present]: 3 }, tags: ["stable"] },
          { label: "Uneasy—I need more consistency to feel safe.", score: { [K.inconsistent]: 3 }, tags: ["need_consistency"] },
          { label: "Tired—I’m always managing emotions alone.", score: { [K.guarded]: 3 }, tags: ["tired"] },
          { label: "Sad—this doesn’t feel like emotional partnership.", score: { [K.absent]: 3 }, tags: ["sad"] }
        ]
      }
    ],

    results: {
      [K.present]: {
        title: "Present Partner — Emotional Support Feels Real Here",
        subtitle: "You don’t have to beg for basics. Closeness isn’t a gamble.",
        summary:
          "You may relate to a relationship where emotional availability is consistent: feelings are listened to, needs can be named, and repair actually happens. That doesn’t mean there’s never stress or conflict—it means stress doesn’t erase care. You can be vulnerable without paying for it later.",
        bullets: [
          "You feel emotionally safe to be honest.",
          "Repair happens more often than avoidance.",
          "Support feels consistent, not conditional."
        ],
        scripts: [
          "“Can we do a quick check-in tonight? I value staying emotionally close.”",
          "“I appreciate how you show up for me. It matters.”",
          "“If something’s off, I’d rather repair it early than drift.”"
        ],
        next_steps: [
          "Keep a weekly 15-minute check-in ritual.",
          "Name appreciation out loud regularly.",
          "Protect the bond by repairing small tension quickly."
        ],
        cautions: [
          "Even strong connection can drift if you stop making time for it."
        ]
      },

      [K.inconsistent]: {
        title: "Inconsistent Presence — You Get Care… But Not Reliably",
        subtitle: "Some days you feel held. Other days you feel like you’re guessing.",
        summary:
          "You may relate to a dynamic where emotional support appears in waves. When it’s good, it’s genuinely good. But under stress—or unpredictably—presence disappears and clarity fades. The hard part isn’t just the distance; it’s not knowing when you’ll be met and when you’ll be left managing alone.",
        bullets: [
          "Support depends on mood, timing, or stress.",
          "You can feel calm one day and unsure the next.",
          "Promises may exist without consistent follow-through."
        ],
        scripts: [
          "“I don’t need perfection—I need consistency. Can we agree on a simple check-in routine?”",
          "“When you go quiet, I start guessing. A quick heads-up helps.”",
          "“Can we make repair a rule, not a maybe?”"
        ],
        next_steps: [
          "Ask for one measurable agreement (check-in, heads-up, repair time).",
          "Stop over-explaining; state needs once, then observe behavior.",
          "Track consistency over 2–4 weeks, not one conversation."
        ],
        cautions: [
          "Don’t confuse occasional warmth with stable emotional support."
        ]
      },

      [K.guarded]: {
        title: "Guarded / Unavailable — Feelings Make Them Uncomfortable",
        subtitle: "You sense a ceiling: closeness is allowed… until it gets real.",
        summary:
          "You may relate to a pattern where emotions are treated like a problem to manage. You can connect when things are light, but when you’re vulnerable, the response becomes minimizing, deflection, or defensiveness. Over time, you might start editing yourself—shrinking needs to avoid conflict or shame.",
        bullets: [
          "Vulnerability is met with minimizing or deflection.",
          "You feel pressure to be ‘easy’ to stay close.",
          "You may hold back to avoid backlash."
        ],
        scripts: [
          "“I don’t need fixing. I need presence—can you listen for 2 minutes and reflect back?”",
          "“This matters to me. Please don’t minimize it—help me understand your side.”",
          "“If emotions feel hard, we can keep it simple: one feeling, one request.”"
        ],
        next_steps: [
          "Request ‘listen-first’ rules (no interrupting, no minimizing).",
          "Name one feeling + one request (short, calm, specific).",
          "Watch: do they become more respectful—or more dismissive—when you ask clearly?"
        ],
        cautions: [
          "If you consistently feel shamed for normal needs, treat that pattern seriously."
        ]
      },

      [K.avoid]: {
        title: "Avoids Repair — The Problem Isn’t Conflict, It’s No Return",
        subtitle: "Tension happens. But the reconnection doesn’t.",
        summary:
          "You may relate to a dynamic where emotional repair is avoided. Difficult talks get postponed, deflected, or turned into silence. The relationship may ‘move on’ without actually healing, which leaves emotional residue. Over time, you can start feeling distant—not because you don’t care, but because nothing gets properly repaired.",
        bullets: [
          "Conflict ends, but repair doesn’t happen.",
          "Important topics get avoided or delayed repeatedly.",
          "Distance grows quietly after tension."
        ],
        scripts: [
          "“I don’t want a long fight—I want a 10-minute repair talk. When can we do it?”",
          "“Avoiding this makes me feel unsafe. I need us to come back together.”",
          "“If we can’t repair, I’ll take space and revisit tomorrow—calmly.”"
        ],
        next_steps: [
          "Set a repair window (e.g., within 24 hours after tension).",
          "Keep talks short: one issue, one request, one agreement.",
          "If repair continues to be avoided, decide what you need to protect your wellbeing."
        ],
        cautions: [
          "Avoidance can look peaceful, but it often builds distance long-term."
        ]
      },

      [K.absent]: {
        title: "Emotionally Absent — You Feel Alone Inside The Relationship",
        subtitle: "You may be together… but not emotionally partnered.",
        summary:
          "You may relate to feeling emotionally alone: your needs are dismissed, repair rarely happens, and emotional support feels unavailable. The most painful part is how it changes you—how you stop asking, stop sharing, and start accepting less than you need. This is not a label or diagnosis; it’s a reflection of repeated experiences of not being met.",
        bullets: [
          "Support feels unavailable or dismissive.",
          "You regulate alone most of the time.",
          "Closeness feels conditional—or absent."
        ],
        scripts: [
          "“I’m not okay with how alone I feel. I need emotional support and repair, not distance.”",
          "“I’m not blaming you—I’m describing what I’m experiencing.”",
          "“If this can’t change, we need to rethink what we’re building.”"
        ],
        next_steps: [
          "Name the pattern clearly (one sentence, no blame).",
          "Request one measurable change (check-in, repair, respect for feelings).",
          "If distress feels severe or persistent, consider speaking with a licensed professional."
        ],
        cautions: [
          "This quiz is not a diagnosis. If you feel consistently unwell, seek real support."
        ]
      }
    }
  };
})();

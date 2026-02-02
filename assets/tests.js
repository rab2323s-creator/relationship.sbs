/*
  tests.js — data-only test definitions.
*/
window.TESTS = [
  {
    "id": "attachment",
    "slug": "attachment-style",
    "title": "Attachment Style Deep Profile",
    "blurb": "18 scenario questions. Get your attachment type + texting & conflict triggers.",
    "time": "3–4 min",
    "intent": "quiz",
    "keywords": [
      "attachment style quiz",
      "anxious attachment signs",
      "avoidant attachment signs",
      "fearful avoidant attachment",
      "why do I get attached so fast",
      "avoidant texting behavior",
      "why do I overthink texts",
      "why do I shut down during conflict"
    ],
    "scales": [
      "anxiety",
      "avoidance"
    ],
    "profile": {
      "type": "attachment_quadrant",
      "thresholds": {
        "low": 10,
        "high": 18
      }
    },
    "inconsistency_rules": [
      {"a": "seek_reassurance", "b": "preemptive_detach"},
      {"a": "avoid_talk", "b": "direct_repair"}
    ],
    "questions": [
      {
        "text": "Your partner’s replies suddenly get shorter for a day. You…",
        "options": [
          {
            "label": "Feel your stomach drop and want clarity now.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "text_spiral",
              "seek_reassurance"
            ]
          },
          {
            "label": "Tell yourself you don’t care and pull back first.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "preemptive_detach"
            ]
          },
          {
            "label": "Check in directly, without panic.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "direct_repair"
            ]
          },
          {
            "label": "Wait, but you’re quietly tracking every signal.",
            "score": {
              "anxiety": 1,
              "avoidance": 0
            },
            "tags": [
              "hypervigilant"
            ]
          }
        ]
      },
      {
        "text": "After a really intimate weekend, you tend to…",
        "options": [
          {
            "label": "Worry they’ll cool off and look for proof you’re still good.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "closeness_hangover",
              "seek_reassurance"
            ]
          },
          {
            "label": "Feel a weird urge to create distance and ‘reset’ yourself.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "closeness_hangover",
              "need_space"
            ]
          },
          {
            "label": "Feel connected and keep your routine.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "secure_base"
            ]
          },
          {
            "label": "Want closeness but also feel trapped—both at once.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull"
            ]
          }
        ]
      },
      {
        "text": "When you’re upset, your first impulse is…",
        "options": [
          {
            "label": "Talk it out immediately (even if it gets messy).",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "protest_talk"
            ]
          },
          {
            "label": "Go quiet until you feel safe again.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "shutdown",
              "stonewall_risk"
            ]
          },
          {
            "label": "Name the issue and suggest a time to talk.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "structured_repair"
            ]
          },
          {
            "label": "Oscillate: message, regret it, then disappear.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull",
              "text_spiral"
            ]
          }
        ]
      },
      {
        "text": "If someone says “we need to talk,” you…",
        "options": [
          {
            "label": "Assume the worst and rehearse explanations.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "catastrophize"
            ]
          },
          {
            "label": "Get irritated and want to avoid the whole thing.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "avoid_talk"
            ]
          },
          {
            "label": "Ask what it’s about and set a time.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "direct_repair"
            ]
          },
          {
            "label": "Feel anxious, then numb out.",
            "score": {
              "anxiety": 1,
              "avoidance": 1
            },
            "tags": [
              "freeze"
            ]
          }
        ]
      },
      {
        "text": "In dating, you’re most triggered by…",
        "options": [
          {
            "label": "Inconsistency (hot/cold, slow replies).",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "inconsistency_trigger"
            ]
          },
          {
            "label": "Pressure to define things / move fast.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "commitment_pressure"
            ]
          },
          {
            "label": "Disrespect or dishonesty (clear dealbreakers).",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "boundaries"
            ]
          },
          {
            "label": "Both: inconsistency AND closeness can freak you out.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull"
            ]
          }
        ]
      },
      {
        "text": "When someone gets very emotional, you…",
        "options": [
          {
            "label": "Try hard to fix it—soothing, apologizing, over-explaining.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "overfunction"
            ]
          },
          {
            "label": "Feel overwhelmed and want space.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "overwhelmed"
            ]
          },
          {
            "label": "Stay present and ask what they need.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "co_regulate"
            ]
          },
          {
            "label": "Freeze and later replay everything.",
            "score": {
              "anxiety": 1,
              "avoidance": 1
            },
            "tags": [
              "freeze",
              "ruminate"
            ]
          }
        ]
      },
      {
        "text": "Your default in texting is…",
        "options": [
          {
            "label": "Fast replies + you notice gaps instantly.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "fast_reply",
              "hypervigilant"
            ]
          },
          {
            "label": "You reply when you feel like it; constant texting feels draining.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "low_text",
              "need_space"
            ]
          },
          {
            "label": "You match energy and clarify if needed.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "match_energy"
            ]
          },
          {
            "label": "You swing between oversharing and disappearing.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull",
              "text_spiral"
            ]
          }
        ]
      },
      {
        "text": "If you sense you’re ‘not a priority,’ you…",
        "options": [
          {
            "label": "Ask for reassurance… then feel ashamed for asking.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "reassurance_loop"
            ]
          },
          {
            "label": "Decide you’re done and detach emotionally.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "cutoff"
            ]
          },
          {
            "label": "Ask for a concrete change (specific, measurable).",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "clear_request"
            ]
          },
          {
            "label": "Test them indirectly (silence, hints, jealousy).",
            "score": {
              "anxiety": 2,
              "avoidance": 1
            },
            "tags": [
              "protest_behavior"
            ]
          }
        ]
      },
      {
        "text": "Apologies feel most real to you when…",
        "options": [
          {
            "label": "They reassure you verbally and consistently.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "need_words"
            ]
          },
          {
            "label": "They give you space and don’t push closeness.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "need_space"
            ]
          },
          {
            "label": "They repair with action + changed behavior.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "need_behavior"
            ]
          },
          {
            "label": "They admit impact AND don’t demand immediate closeness.",
            "score": {
              "anxiety": 1,
              "avoidance": 1
            },
            "tags": [
              "balanced_repair"
            ]
          }
        ]
      },
      {
        "text": "When you like someone a lot, you…",
        "options": [
          {
            "label": "Think about them constantly and look for signs.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "preoccupied"
            ]
          },
          {
            "label": "Downplay feelings and stay ‘independent.’",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "deactivate"
            ]
          },
          {
            "label": "Enjoy them but keep your life intact.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "secure_base"
            ]
          },
          {
            "label": "Get intense, then suddenly doubt everything.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull"
            ]
          }
        ]
      },
      {
        "text": "If conflict escalates, your body tends to…",
        "options": [
          {
            "label": "Speed up—talk more, explain more.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "escalate_talk"
            ]
          },
          {
            "label": "Shut down—go blank, can’t find words.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "shutdown"
            ]
          },
          {
            "label": "Stay steady—pause, breathe, continue.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "regulated"
            ]
          },
          {
            "label": "Flip: pursue → shut down.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull",
              "freeze"
            ]
          }
        ]
      },
      {
        "text": "You feel safest in relationships where…",
        "options": [
          {
            "label": "Communication is frequent and reassuring.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "need_reassurance"
            ]
          },
          {
            "label": "There’s lots of autonomy and low pressure.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "need_autonomy"
            ]
          },
          {
            "label": "There’s honesty + repair after conflict.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "repair_oriented"
            ]
          },
          {
            "label": "The pace is slow and predictable.",
            "score": {
              "anxiety": 1,
              "avoidance": 1
            },
            "tags": [
              "need_predictability"
            ]
          }
        ]
      },
      {
        "text": "When someone asks for more commitment, you…",
        "options": [
          {
            "label": "Feel relief (finally!) and want to lock it in.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "lock_in"
            ]
          },
          {
            "label": "Feel trapped and look for flaws.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "commitment_trigger"
            ]
          },
          {
            "label": "Talk about expectations and timing.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "negotiate"
            ]
          },
          {
            "label": "Want it, but panic and pull away.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull"
            ]
          }
        ]
      },
      {
        "text": "If you’re hurt, you’re most likely to…",
        "options": [
          {
            "label": "Bring it up multiple times until you feel understood.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "revisit"
            ]
          },
          {
            "label": "Minimize it and say ‘it’s fine’ (but distance grows).",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "minimize",
              "cutoff"
            ]
          },
          {
            "label": "State impact once, then focus on solutions.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "solution"
            ]
          },
          {
            "label": "Act normal, then explode later.",
            "score": {
              "anxiety": 2,
              "avoidance": 1
            },
            "tags": [
              "buildup"
            ]
          }
        ]
      },
      {
        "text": "If someone cancels plans last minute, you…",
        "options": [
          {
            "label": "Feel rejected; your mind fills the gaps.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "rejection_sensitivity"
            ]
          },
          {
            "label": "Feel annoyed and decide you’ll be less available too.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "reciprocal_distance"
            ]
          },
          {
            "label": "Reschedule calmly if it’s reasonable.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "flexible"
            ]
          },
          {
            "label": "Say it’s okay but keep score internally.",
            "score": {
              "anxiety": 1,
              "avoidance": 1
            },
            "tags": [
              "scorekeeping"
            ]
          }
        ]
      },
      {
        "text": "The phrase you relate to most:",
        "options": [
          {
            "label": "“If I don’t secure it, I’ll lose it.”",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "fear_abandonment"
            ]
          },
          {
            "label": "“If it gets too close, I’ll lose myself.”",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "fear_engulfment"
            ]
          },
          {
            "label": "“Closeness + space can both exist.”",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "secure_base"
            ]
          },
          {
            "label": "“I want closeness… until it’s real.”",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull"
            ]
          }
        ]
      },
      {
        "text": "After you send a vulnerable text, you…",
        "options": [
          {
            "label": "Wait anxiously for the reply and reread what you wrote.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "text_spiral"
            ]
          },
          {
            "label": "Regret it instantly and wish you hadn’t shared.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "vulnerability_regret"
            ]
          },
          {
            "label": "Feel fine either way.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "regulated"
            ]
          },
          {
            "label": "Want reassurance, then feel exposed and pull back.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "push_pull"
            ]
          }
        ]
      },
      {
        "text": "If you had to pick one growth edge, it’s…",
        "options": [
          {
            "label": "Self-soothing instead of chasing reassurance.",
            "score": {
              "anxiety": 2,
              "avoidance": 0
            },
            "tags": [
              "growth_soothe"
            ]
          },
          {
            "label": "Staying present instead of disappearing.",
            "score": {
              "anxiety": 0,
              "avoidance": 2
            },
            "tags": [
              "growth_stay"
            ]
          },
          {
            "label": "Asking directly instead of assuming.",
            "score": {
              "anxiety": 0,
              "avoidance": 0
            },
            "tags": [
              "growth_direct"
            ]
          },
          {
            "label": "Tolerating closeness without panic OR sabotage.",
            "score": {
              "anxiety": 2,
              "avoidance": 2
            },
            "tags": [
              "growth_stability"
            ]
          }
        ]
      }
    ],
    "results": {
      "secure": {
        "title": "Secure (grounded & connected)",
        "bullets": [
          "You can ask for closeness without panic.",
          "You can tolerate space without spiraling.",
          "Repair feels possible—not threatening."
        ],
        "what_it_looks_like": [
          "You match energy without losing yourself.",
          "You name needs directly.",
          "You recover after conflict."
        ],
        "blindspots": [
          "You may underestimate how intense insecure patterns feel to others.",
          "You might stay too long trying to ‘model’ healthy communication."
        ],
        "scripts": [
          "“Can we do a quick check‑in tonight? I want to stay connected.”",
          "“I’m feeling a little off—can you reassure me what’s going on?”",
          "“Let’s pause for 20 minutes and come back.”"
        ],
        "next_steps": [
          "Keep building predictable repair rituals.",
          "Choose partners who can also repair (not just feel)."
        ]
      },
      "anxious": {
        "title": "Anxious (high care, high alarm)",
        "bullets": [
          "You read shifts fast—sometimes too fast.",
          "Slow replies can feel like rejection.",
          "You seek reassurance, then feel bad for needing it."
        ],
        "what_it_looks_like": [
          "Double-text urges.",
          "Over-explaining.",
          "‘Are we okay?’ loops."
        ],
        "blindspots": [
          "Chasing clarity can create pressure that pushes people away.",
          "You may confuse anxiety relief with real safety."
        ],
        "scripts": [
          "“I’m noticing I’m getting anxious. Can you tell me when you’ll be free to talk?”",
          "“I don’t need a long convo—just a quick ‘we’re good’ helps.”",
          "“I’m working on self-soothing, but I need consistency from you too.”"
        ],
        "next_steps": [
          "Swap mind-reading for one concrete request.",
          "Track patterns: what’s a trigger vs a real red flag?"
        ]
      },
      "avoidant": {
        "title": "Avoidant (independent, easily flooded)",
        "bullets": [
          "Closeness can feel like pressure.",
          "You ‘deactivate’ when emotions rise.",
          "Space helps you feel safe—sometimes at a cost."
        ],
        "what_it_looks_like": [
          "Short replies when overwhelmed.",
          "Needing ‘reset’ time after intimacy.",
          "Avoiding heavy talks."
        ],
        "blindspots": [
          "Silence reads as punishment to others even if it’s self-protection.",
          "You may exit instead of repairing."
        ],
        "scripts": [
          "“I’m getting flooded. I care—can we pause and come back at 7?”",
          "“I want closeness, I just need it slower.”",
          "“If I go quiet, it’s my nervous system. I’ll return—promise.”"
        ],
        "next_steps": [
          "Use time-outs with a return time (never vanish).",
          "Practice one small vulnerable sentence per conflict."
        ]
      },
      "fearful": {
        "title": "Fearful‑Avoidant (want closeness, fear it)",
        "bullets": [
          "You crave intimacy but fear getting hurt.",
          "You can swing: pursue → pull away.",
          "Trust feels risky, even when it’s real."
        ],
        "what_it_looks_like": [
          "Hot/cold patterns.",
          "Big vulnerability then regret.",
          "Testing people indirectly."
        ],
        "blindspots": [
          "Your push‑pull can confuse stable partners.",
          "You may mistake intensity for attachment."
        ],
        "scripts": [
          "“I’m having a push‑pull moment. I want closeness, but I’m scared.”",
          "“If I pull back, please don’t chase—just remind me you’re here.”",
          "“Let’s go slow and keep it honest.”"
        ],
        "next_steps": [
          "Stability over intensity: choose predictable connection.",
          "Therapy/coaching can be especially high‑ROI here."
        ]
      }
    },
    "tieBreakPriority": [
      "secure",
      "anxious",
      "avoidant",
      "fearful"
    ],
    "modifiers": [
      {
        "id": "text_spiral",
        "title": "Text Spiral",
        "when": {
          "tag": "text_spiral",
          "min": 2
        },
        "copy": "You reread messages, track gaps, and your brain writes stories in the silence."
      },
      {
        "id": "shutdown",
        "title": "Shutdown Mode",
        "when": {
          "tag": "shutdown",
          "min": 2
        },
        "copy": "When conflict gets hot, your words disappear. It’s nervous-system overload, not ‘not caring’."
      },
      {
        "id": "closeness_hangover",
        "title": "Closeness Hangover",
        "when": {
          "tag": "closeness_hangover",
          "min": 2
        },
        "copy": "After intimacy, you feel a ‘drop’—either needing reassurance or distance to regulate."
      },
      {
        "id": "push_pull",
        "title": "Push‑Pull Pattern",
        "when": {
          "tag": "push_pull",
          "min": 2
        },
        "copy": "You can chase closeness and then retreat fast—usually when things start to feel real."
      },
      {
        "id": "direct_repair",
        "title": "Direct Repair",
        "when": {
          "tag": "direct_repair",
          "min": 2
        },
        "copy": "You’re unusually good at naming issues plainly without drama. Lean into that."
      }
    ],
    "faq": [
      {
        "q": "Can attachment styles change?",
        "a": "Yes—especially with consistent secure relationships, therapy, and healthier repair habits."
      },
      {
        "q": "Is fearful‑avoidant the same as disorganized?",
        "a": "In adult relationship talk, fearful‑avoidant is often used similarly. It’s basically high anxiety + high avoidance."
      },
      {
        "q": "Why do avoidants pull away after getting close?",
        "a": "Closeness can trigger threat response: autonomy feels at risk, so distance restores safety."
      },
      {
        "q": "Why do I overthink texts?",
        "a": "When your nervous system reads silence as danger, your brain tries to ‘solve’ it by analyzing."
      },
      {
        "q": "Is this a diagnosis?",
        "a": "No. It’s a self‑reflection tool based on established attachment frameworks."
      }
    ]
  },
  {
    "id": "love_language",
    "slug": "love-language",
    "title": "Love Language Deep Profile",
    "blurb": "Not just your top love language—how you give, receive, and what you crave under stress.",
    "time": "3–4 min",
    "intent": "quiz",
    "keywords": [
      "love language quiz",
      "what is my love language",
      "words of affirmation examples",
      "quality time ideas",
      "acts of service love language",
      "physical touch love language",
      "receiving gifts love language",
      "can you have two love languages"
    ],
    "scales": [
      "recv_words",
      "recv_time",
      "recv_service",
      "recv_touch",
      "recv_gifts",
      "give_words",
      "give_time",
      "give_service",
      "give_touch",
      "give_gifts",
      "stress_words",
      "stress_time",
      "stress_service",
      "stress_touch",
      "stress_gifts"
    ],
    "profile": {
      "type": "love_language_profile"
    },
    "questions": [
      {
        "text": "When you feel loved, it’s usually because your partner…",
        "options": [
          {
            "label": "Says specific things they admire about you.",
            "score": {
              "recv_words": 2
            },
            "tags": [
              "recv_words"
            ]
          },
          {
            "label": "Gives you undistracted time (phones down).",
            "score": {
              "recv_time": 2
            },
            "tags": [
              "recv_time"
            ]
          },
          {
            "label": "Helps without you having to ask twice.",
            "score": {
              "recv_service": 2
            },
            "tags": [
              "recv_service"
            ]
          },
          {
            "label": "Touches you casually (hand, hug, cuddle).",
            "score": {
              "recv_touch": 2
            },
            "tags": [
              "recv_touch"
            ]
          },
          {
            "label": "Brings a small thoughtful thing ‘just because.’",
            "score": {
              "recv_gifts": 2
            },
            "tags": [
              "recv_gifts"
            ]
          }
        ]
      },
      {
        "text": "A perfect date night is most like…",
        "options": [
          {
            "label": "Deep conversation + ‘you matter to me’ moments.",
            "score": {
              "recv_words": 2
            },
            "tags": [
              "recv_words"
            ]
          },
          {
            "label": "Doing something together and fully present.",
            "score": {
              "recv_time": 2
            },
            "tags": [
              "recv_time"
            ]
          },
          {
            "label": "They handle logistics so you can relax.",
            "score": {
              "recv_service": 2
            },
            "tags": [
              "recv_service"
            ]
          },
          {
            "label": "Cozy physical closeness (movie, couch, cuddles).",
            "score": {
              "recv_touch": 2
            },
            "tags": [
              "recv_touch"
            ]
          },
          {
            "label": "A tiny surprise that shows they remembered you.",
            "score": {
              "recv_gifts": 2
            },
            "tags": [
              "recv_gifts"
            ]
          }
        ]
      },
      {
        "text": "The fastest way to make you feel neglected is…",
        "options": [
          {
            "label": "Cold words / no appreciation.",
            "score": {
              "recv_words": 2
            },
            "tags": [
              "neglect_words"
            ]
          },
          {
            "label": "Being together but distracted.",
            "score": {
              "recv_time": 2
            },
            "tags": [
              "neglect_time"
            ]
          },
          {
            "label": "Promises with no follow-through.",
            "score": {
              "recv_service": 2
            },
            "tags": [
              "neglect_service"
            ]
          },
          {
            "label": "Lack of touch / affection.",
            "score": {
              "recv_touch": 2
            },
            "tags": [
              "neglect_touch"
            ]
          },
          {
            "label": "Thoughtlessness (birthdays, small misses).",
            "score": {
              "recv_gifts": 2
            },
            "tags": [
              "neglect_gifts"
            ]
          }
        ]
      },
      {
        "text": "When you want to show love, your instinct is to…",
        "options": [
          {
            "label": "Say it clearly and often.",
            "score": {
              "give_words": 2
            },
            "tags": [
              "give_words"
            ]
          },
          {
            "label": "Make time and plan shared moments.",
            "score": {
              "give_time": 2
            },
            "tags": [
              "give_time"
            ]
          },
          {
            "label": "Do practical things to help.",
            "score": {
              "give_service": 2
            },
            "tags": [
              "give_service"
            ]
          },
          {
            "label": "Be physically affectionate.",
            "score": {
              "give_touch": 2
            },
            "tags": [
              "give_touch"
            ]
          },
          {
            "label": "Get/bring something meaningful.",
            "score": {
              "give_gifts": 2
            },
            "tags": [
              "give_gifts"
            ]
          }
        ]
      },
      {
        "text": "If your partner is stressed, you’re most likely to…",
        "options": [
          {
            "label": "Reassure them verbally and hype them up.",
            "score": {
              "give_words": 2
            },
            "tags": [
              "give_words"
            ]
          },
          {
            "label": "Stay with them and listen, no distractions.",
            "score": {
              "give_time": 2
            },
            "tags": [
              "give_time"
            ]
          },
          {
            "label": "Fix the problem / remove tasks.",
            "score": {
              "give_service": 2
            },
            "tags": [
              "give_service"
            ]
          },
          {
            "label": "Hold them / be close.",
            "score": {
              "give_touch": 2
            },
            "tags": [
              "give_touch"
            ]
          },
          {
            "label": "Bring food/coffee or a small comfort item.",
            "score": {
              "give_gifts": 2
            },
            "tags": [
              "give_gifts"
            ]
          }
        ]
      },
      {
        "text": "Your ‘default affection’ in a normal week is…",
        "options": [
          {
            "label": "Compliments, appreciation, encouragement.",
            "score": {
              "give_words": 2,
              "recv_words": 1
            },
            "tags": [
              "mix_words"
            ]
          },
          {
            "label": "Hanging out, inside jokes, shared routines.",
            "score": {
              "give_time": 2,
              "recv_time": 1
            },
            "tags": [
              "mix_time"
            ]
          },
          {
            "label": "Doing things that make life easier.",
            "score": {
              "give_service": 2,
              "recv_service": 1
            },
            "tags": [
              "mix_service"
            ]
          },
          {
            "label": "Touch, closeness, playful physicality.",
            "score": {
              "give_touch": 2,
              "recv_touch": 1
            },
            "tags": [
              "mix_touch"
            ]
          },
          {
            "label": "Little tokens or ‘I thought of you’ moments.",
            "score": {
              "give_gifts": 2,
              "recv_gifts": 1
            },
            "tags": [
              "mix_gifts"
            ]
          }
        ]
      },
      {
        "text": "Right after an argument, what helps you come back fastest?",
        "options": [
          {
            "label": "Hearing ‘I get it, and I’m here.’",
            "score": {
              "stress_words": 2,
              "recv_words": 1
            },
            "tags": [
              "stress_words"
            ]
          },
          {
            "label": "A reset moment together (walk, sit, talk).",
            "score": {
              "stress_time": 2,
              "recv_time": 1
            },
            "tags": [
              "stress_time"
            ]
          },
          {
            "label": "A concrete action that repairs the impact.",
            "score": {
              "stress_service": 2,
              "recv_service": 1
            },
            "tags": [
              "stress_service"
            ]
          },
          {
            "label": "A warm touch / cuddle to signal safety.",
            "score": {
              "stress_touch": 2,
              "recv_touch": 1
            },
            "tags": [
              "stress_touch"
            ]
          },
          {
            "label": "A small gesture that says ‘we’re okay.’",
            "score": {
              "stress_gifts": 2,
              "recv_gifts": 1
            },
            "tags": [
              "stress_gifts"
            ]
          }
        ]
      },
      {
        "text": "If your partner says ‘I love you’ but doesn’t…",
        "options": [
          {
            "label": "Say anything else positive, you feel unloved.",
            "score": {
              "recv_words": 2
            },
            "tags": [
              "sensitive_words"
            ]
          },
          {
            "label": "Spend real time, you feel distant.",
            "score": {
              "recv_time": 2
            },
            "tags": [
              "sensitive_time"
            ]
          },
          {
            "label": "Show up practically, it feels empty.",
            "score": {
              "recv_service": 2
            },
            "tags": [
              "sensitive_service"
            ]
          },
          {
            "label": "Touch you, it feels cold.",
            "score": {
              "recv_touch": 2
            },
            "tags": [
              "sensitive_touch"
            ]
          },
          {
            "label": "Remember small things, it feels careless.",
            "score": {
              "recv_gifts": 2
            },
            "tags": [
              "sensitive_gifts"
            ]
          }
        ]
      },
      {
        "text": "What kind of ‘romance’ actually lands for you?",
        "options": [
          {
            "label": "A message that’s specific, personal, sincere.",
            "score": {
              "recv_words": 2
            },
            "tags": [
              "recv_words"
            ]
          },
          {
            "label": "A planned moment together (even simple).",
            "score": {
              "recv_time": 2
            },
            "tags": [
              "recv_time"
            ]
          },
          {
            "label": "They do something you’ve been carrying alone.",
            "score": {
              "recv_service": 2
            },
            "tags": [
              "recv_service"
            ]
          },
          {
            "label": "Slow, affectionate physical closeness.",
            "score": {
              "recv_touch": 2
            },
            "tags": [
              "recv_touch"
            ]
          },
          {
            "label": "A thoughtful item with a story behind it.",
            "score": {
              "recv_gifts": 2
            },
            "tags": [
              "recv_gifts"
            ]
          }
        ]
      },
      {
        "text": "Which compliment hits deepest?",
        "options": [
          {
            "label": "‘I’m proud of who you are.’",
            "score": {
              "recv_words": 2
            },
            "tags": [
              "recv_words"
            ]
          },
          {
            "label": "‘I love being with you.’",
            "score": {
              "recv_time": 2
            },
            "tags": [
              "recv_time"
            ]
          },
          {
            "label": "‘I notice how much you do.’",
            "score": {
              "recv_service": 2
            },
            "tags": [
              "recv_service"
            ]
          },
          {
            "label": "‘I love being close to you.’",
            "score": {
              "recv_touch": 2
            },
            "tags": [
              "recv_touch"
            ]
          },
          {
            "label": "‘I saw this and thought of you.’",
            "score": {
              "recv_gifts": 2
            },
            "tags": [
              "recv_gifts"
            ]
          }
        ]
      },
      {
        "text": "When you feel secure in love, you’re more likely to…",
        "options": [
          {
            "label": "Express appreciation out loud.",
            "score": {
              "give_words": 2
            },
            "tags": [
              "give_words"
            ]
          },
          {
            "label": "Prioritize time together intentionally.",
            "score": {
              "give_time": 2
            },
            "tags": [
              "give_time"
            ]
          },
          {
            "label": "Do helpful things automatically.",
            "score": {
              "give_service": 2
            },
            "tags": [
              "give_service"
            ]
          },
          {
            "label": "Initiate touch more.",
            "score": {
              "give_touch": 2
            },
            "tags": [
              "give_touch"
            ]
          },
          {
            "label": "Give little surprises.",
            "score": {
              "give_gifts": 2
            },
            "tags": [
              "give_gifts"
            ]
          }
        ]
      },
      {
        "text": "The most ‘low-effort but high-impact’ thing a partner can do is…",
        "options": [
          {
            "label": "Say one specific appreciation daily.",
            "score": {
              "recv_words": 2,
              "stress_words": 1
            },
            "tags": [
              "daily_words"
            ]
          },
          {
            "label": "20 minutes of undistracted time.",
            "score": {
              "recv_time": 2,
              "stress_time": 1
            },
            "tags": [
              "daily_time"
            ]
          },
          {
            "label": "Take one annoying task off your plate.",
            "score": {
              "recv_service": 2,
              "stress_service": 1
            },
            "tags": [
              "daily_service"
            ]
          },
          {
            "label": "A hug/kiss hello & goodbye.",
            "score": {
              "recv_touch": 2,
              "stress_touch": 1
            },
            "tags": [
              "daily_touch"
            ]
          },
          {
            "label": "A tiny ‘I remembered you’ gesture weekly.",
            "score": {
              "recv_gifts": 2,
              "stress_gifts": 1
            },
            "tags": [
              "daily_gifts"
            ]
          }
        ]
      },
      {
        "text": "You feel most cared for when your partner notices…",
        "options": [
          {
            "label": "Your efforts and says it.",
            "score": {
              "recv_words": 2
            }
          },
          {
            "label": "Your mood and makes time.",
            "score": {
              "recv_time": 2
            }
          },
          {
            "label": "Your overload and helps.",
            "score": {
              "recv_service": 2
            }
          },
          {
            "label": "Your need for closeness and reaches for you.",
            "score": {
              "recv_touch": 2
            }
          },
          {
            "label": "Your preferences and remembers them.",
            "score": {
              "recv_gifts": 2
            }
          }
        ]
      },
      {
        "text": "If you had to pick one weekly ritual, it’s…",
        "options": [
          {
            "label": "A weekly check-in with affirmations.",
            "score": {
              "recv_words": 2,
              "recv_time": 1
            }
          },
          {
            "label": "A no-phone date hour.",
            "score": {
              "recv_time": 2
            }
          },
          {
            "label": "A ‘team chores’ reset together.",
            "score": {
              "recv_service": 2
            }
          },
          {
            "label": "A cuddle + decompress night.",
            "score": {
              "recv_touch": 2
            }
          },
          {
            "label": "A small surprise / treat day.",
            "score": {
              "recv_gifts": 2
            }
          }
        ]
      },
      {
        "text": "What do you accidentally do when you’re upset?",
        "options": [
          {
            "label": "Go silent because words might come out wrong.",
            "score": {
              "stress_words": 1,
              "recv_words": 1
            },
            "tags": [
              "needs_words_but_blocks"
            ]
          },
          {
            "label": "Withdraw because you want space to calm down.",
            "score": {
              "stress_time": 2
            },
            "tags": [
              "needs_time_reset"
            ]
          },
          {
            "label": "Start doing tasks to avoid feelings.",
            "score": {
              "stress_service": 2
            },
            "tags": [
              "fix_instead_of_feel"
            ]
          },
          {
            "label": "Crave touch but don’t ask for it.",
            "score": {
              "stress_touch": 2
            },
            "tags": [
              "touch_shy"
            ]
          },
          {
            "label": "Over-focus on ‘they don’t think of me.’",
            "score": {
              "stress_gifts": 2
            },
            "tags": [
              "symbolic_thought"
            ]
          }
        ]
      },
      {
        "text": "If your partner’s love language is different, you should…",
        "options": [
          {
            "label": "Learn their signals and practice them weekly.",
            "score": {
              "recv_time": 1,
              "give_time": 1
            },
            "tags": [
              "bilingual_love"
            ]
          },
          {
            "label": "Insist they meet yours first.",
            "score": {
              "recv_words": 1
            },
            "tags": [
              "demanding"
            ]
          },
          {
            "label": "Stop labeling and talk behaviors.",
            "score": {
              "recv_service": 1
            },
            "tags": [
              "behavior_over_label"
            ]
          },
          {
            "label": "Trade: you do mine, I do yours.",
            "score": {
              "recv_gifts": 1
            },
            "tags": [
              "transactional"
            ]
          },
          {
            "label": "Assume they’ll ‘get it’ over time.",
            "score": {
              "recv_time": 1
            },
            "tags": [
              "mindreading"
            ]
          }
        ]
      },
      {
        "text": "What makes gifts feel meaningful (if they do)?",
        "options": [
          {
            "label": "It’s small but personal—proof they listened.",
            "score": {
              "recv_gifts": 2
            },
            "tags": [
              "meaningful_gifts"
            ]
          },
          {
            "label": "It’s expensive—investment matters.",
            "score": {
              "recv_gifts": 2
            },
            "tags": [
              "value_signal"
            ]
          },
          {
            "label": "It’s practical—useful is romantic.",
            "score": {
              "recv_service": 1,
              "recv_gifts": 1
            },
            "tags": [
              "practical_gifts"
            ]
          },
          {
            "label": "It’s an experience together.",
            "score": {
              "recv_time": 2,
              "recv_gifts": 1
            },
            "tags": [
              "experience_gifts"
            ]
          },
          {
            "label": "Gifts don’t matter; consistency does.",
            "score": {
              "recv_service": 2
            },
            "tags": [
              "gift_skeptic"
            ]
          }
        ]
      },
      {
        "text": "Physical touch for you is mostly about…",
        "options": [
          {
            "label": "Comfort + nervous system safety (not just sex).",
            "score": {
              "recv_touch": 2,
              "stress_touch": 1
            },
            "tags": [
              "comfort_touch"
            ]
          },
          {
            "label": "Playfulness and chemistry.",
            "score": {
              "recv_touch": 2
            },
            "tags": [
              "playful_touch"
            ]
          },
          {
            "label": "Reassurance when words feel thin.",
            "score": {
              "recv_touch": 2,
              "recv_words": 1
            },
            "tags": [
              "touch_reassurance"
            ]
          },
          {
            "label": "I like it, but only with emotional trust.",
            "score": {
              "recv_touch": 2
            },
            "tags": [
              "touch_boundaries"
            ]
          },
          {
            "label": "Not my main thing; I prefer other signals.",
            "score": {
              "recv_time": 1
            },
            "tags": [
              "low_touch"
            ]
          }
        ]
      }
    ],
    "results": {
      "words": {
        "title": "Words of Affirmation (it lands in language)",
        "bullets": [
          "Specific praise hits harder than grand gestures.",
          "Silence reads as distance.",
          "You don’t want hype—you want sincerity."
        ],
        "what_it_looks_like": [
          "You replay compliments for days.",
          "You notice tone fast.",
          "You feel ‘alone’ when appreciation disappears."
        ],
        "blindspots": [
          "You may discount actions if the words aren’t there.",
          "You can stay stuck seeking reassurance instead of making a request."
        ],
        "scripts": [
          "“It means a lot when you tell me what you appreciate.”",
          "“Can you say one specific thing you loved about today?”",
          "“I hear you—can you also reassure me we’re okay?”"
        ],
        "next_steps": [
          "Ask for specificity, not constant praise.",
          "Pair words with one concrete ritual (daily/weekly)."
        ]
      },
      "time": {
        "title": "Quality Time (presence is the point)",
        "bullets": [
          "Distraction feels like rejection.",
          "Time beats ‘stuff.’",
          "You bond through shared attention."
        ],
        "what_it_looks_like": [
          "You crave no-phone moments.",
          "Parallel play counts (same room, real presence).",
          "You feel closer after experiences."
        ],
        "blindspots": [
          "You might interpret busyness as lack of love.",
          "You may ignore other languages that are real effort."
        ],
        "scripts": [
          "“Can we do 20 minutes phones-down tonight?”",
          "“I miss you—can we plan a real hour together this week?”",
          "“Even a walk counts. I just want you present.”"
        ],
        "next_steps": [
          "Schedule time like a non-negotiable.",
          "Define ‘presence’ clearly (phones down, eye contact, check-in)."
        ]
      },
      "service": {
        "title": "Acts of Service (love is relief)",
        "bullets": [
          "Help = care.",
          "Follow-through is romantic.",
          "Reliability makes you feel safe."
        ],
        "what_it_looks_like": [
          "You feel loved when life gets lighter.",
          "Broken promises sting.",
          "You notice effort in details."
        ],
        "blindspots": [
          "You might over-function and resent it later.",
          "You may miss emotional repair if you focus only on tasks."
        ],
        "scripts": [
          "“One thing that would help me feel cared for is ___.”",
          "“Can we split this so I’m not carrying it alone?”",
          "“Follow-through matters more to me than big talk.”"
        ],
        "next_steps": [
          "Make requests measurable (one task, one time).",
          "Stop rescuing—ask, then watch patterns."
        ]
      },
      "touch": {
        "title": "Physical Touch (safety through closeness)",
        "bullets": [
          "Touch regulates you.",
          "Affection matters outside sex.",
          "Warmth beats words sometimes."
        ],
        "what_it_looks_like": [
          "You relax with casual touch.",
          "You feel distant without it.",
          "You prefer ‘we’re okay’ hugs after conflict."
        ],
        "blindspots": [
          "You may feel rejected when touch drops for non-personal reasons.",
          "Boundaries matter—consent + timing."
        ],
        "scripts": [
          "“Can I get a hug? I need closeness right now.”",
          "“Touch helps me feel safe—can we do hello/goodbye kisses?”",
          "“After we argue, a small cuddle helps me reset.”"
        ],
        "next_steps": [
          "Name the kind of touch (quick hug vs long cuddle).",
          "Don’t assume: ask for consent and timing."
        ]
      },
      "gifts": {
        "title": "Receiving Gifts (thoughtfulness is love)",
        "bullets": [
          "It’s not price—it’s ‘you were in my mind.’",
          "You track effort in small symbols.",
          "For you, forgetting hurts."
        ],
        "what_it_looks_like": [
          "Tiny tokens feel huge.",
          "You love ‘I saw this and thought of you.’",
          "Milestones matter."
        ],
        "blindspots": [
          "You might confuse ‘forgetful’ with ‘doesn’t care’ (sometimes true, sometimes not).",
          "Be careful of transactional love."
        ],
        "scripts": [
          "“Little thoughtful things mean a lot to me.”",
          "“It’s not the cost—it's the thought. Can we make small gestures a habit?”",
          "“When you remember details, I feel chosen.”"
        ],
        "next_steps": [
          "Ask for predictable micro-gestures, not big splurges.",
          "Notice effort patterns over one-off mistakes."
        ]
      },
      "mixed": {
        "title": "Mixed (two languages are close)",
        "bullets": [
          "Your top two are very close.",
          "Context changes what lands most.",
          "You need ‘bilingual love’."
        ],
        "what_it_looks_like": [
          "Some days you want words, other days time/help.",
          "Stress shifts your needs.",
          "You’re sensitive to mismatches."
        ],
        "blindspots": [
          "You might expect mind-reading because *even you* vary.",
          "Make needs explicit per season."
        ],
        "scripts": [
          "“Today I need ___ (time/words/help/touch).”",
          "“My needs shift—can we check in weekly?”",
          "“Let’s each do one small thing in the other’s language.”"
        ],
        "next_steps": [
          "Use a weekly check-in to name the week’s top need.",
          "Build one ritual per top language."
        ]
      }
    },
    "tieBreakPriority": [
      "time",
      "words",
      "service",
      "touch",
      "gifts",
      "mixed"
    ],
    "modifiers": [
      {
        "id": "giving_gap",
        "title": "Giving/Receiving Mismatch",
        "when": {
          "calc": "giving_gap",
          "min": 4
        },
        "copy": "You *give* love in a different language than you *receive* it. This is where most ‘I do so much’ fights are born."
      },
      {
        "id": "stress_language",
        "title": "Stress Language Spike",
        "when": {
          "calc": "stress_spike",
          "min": 3
        },
        "copy": "Under stress, your need becomes sharper. Your partner may not realize your ‘real’ love language shows up strongest after conflict."
      },
      {
        "id": "gift_skeptic",
        "title": "Gift Skeptic",
        "when": {
          "tag": "gift_skeptic",
          "min": 1
        },
        "copy": "You don’t want objects—you want consistency. If gifts show up without effort, they feel fake."
      }
    ],
    "faq": [
      {
        "q": "Can I have two love languages?",
        "a": "Yes. Many people have a very close top two, especially depending on season and stress."
      },
      {
        "q": "Do partners need the same love language?",
        "a": "No. ‘Bilingual love’ works: you practice each other’s signals intentionally."
      },
      {
        "q": "Is the love language model scientifically proven?",
        "a": "Think of it as a communication framework. It’s useful when it improves clarity and care."
      },
      {
        "q": "What if my partner dismisses this?",
        "a": "Skip labels and talk behaviors: time, help, words, touch, gifts—what lands for you?"
      }
    ]
  },
  {
    "id": "conflict",
    "slug": "conflict-style",
    "title": "Conflict Style Deep Profile",
    "blurb": "How you fight, repair, and what you do when your nervous system is activated.",
    "time": "3–4 min",
    "intent": "quiz",
    "keywords": [
      "conflict style quiz",
      "arguing style test",
      "why do I shut down during arguments",
      "stonewalling vs boundaries",
      "why do I get defensive",
      "how to fight fair in relationships",
      "conflict resolution styles",
      "communication during conflict"
    ],
    "scales": [
      "avoid",
      "compete",
      "accommodate",
      "collaborate",
      "compromise"
    ],
    "profile": {
      "type": "conflict_style_top2"
    },
    "inconsistency_rules": [
      {"a": "shutdown", "b": "escalate"}
    ],
    "questions": [
      {
        "text": "When conflict starts, your first move is…",
        "options": [
          {
            "label": "Talk now. I hate lingering tension.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "address_now"
            ]
          },
          {
            "label": "Back off. I need time to think.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "cool_off"
            ]
          },
          {
            "label": "Push my point hard—facts, logic, results.",
            "score": {
              "compete": 2
            },
            "tags": [
              "assertive"
            ]
          },
          {
            "label": "Smooth it over so we can move on.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "peacekeeper"
            ]
          },
          {
            "label": "Find a middle ground quickly.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "middle_ground"
            ]
          }
        ]
      },
      {
        "text": "If someone raises their voice, you…",
        "options": [
          {
            "label": "Match energy and escalate.",
            "score": {
              "compete": 2
            },
            "tags": [
              "escalate"
            ]
          },
          {
            "label": "Shut down / go blank.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "shutdown"
            ]
          },
          {
            "label": "Stay steady and bring it back to the issue.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "regulated"
            ]
          },
          {
            "label": "Apologize fast to stop the tension.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "over_apologize"
            ]
          },
          {
            "label": "Suggest a pause and return later.",
            "score": {
              "compromise": 2,
              "avoid": 1
            },
            "tags": [
              "pause"
            ]
          }
        ]
      },
      {
        "text": "Your biggest conflict fear is…",
        "options": [
          {
            "label": "Being controlled or ‘losing.’",
            "score": {
              "compete": 2
            },
            "tags": [
              "control_fear"
            ]
          },
          {
            "label": "Being abandoned or disconnected.",
            "score": {
              "collaborate": 1,
              "accommodate": 1
            },
            "tags": [
              "disconnect_fear"
            ]
          },
          {
            "label": "Being overwhelmed emotionally.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "overwhelm_fear"
            ]
          },
          {
            "label": "Being seen as the ‘bad one.’",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "good_person_fear"
            ]
          },
          {
            "label": "Conflict wasting time with no resolution.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "efficiency_fear"
            ]
          }
        ]
      },
      {
        "text": "After a fight, you’re most likely to…",
        "options": [
          {
            "label": "Send a long message explaining everything.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "repair_text"
            ]
          },
          {
            "label": "Go silent and avoid contact.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "stonewall_risk"
            ]
          },
          {
            "label": "Act normal like nothing happened.",
            "score": {
              "avoid": 1,
              "accommodate": 1
            },
            "tags": [
              "sweep_under_rug"
            ]
          },
          {
            "label": "Try to make up quickly with a gesture.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "makeup_gesture"
            ]
          },
          {
            "label": "Propose a quick ‘rules + next steps’ plan.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "action_plan"
            ]
          }
        ]
      },
      {
        "text": "When you’re wrong, you…",
        "options": [
          {
            "label": "Admit it, but also explain your intention.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "repair_oriented"
            ]
          },
          {
            "label": "Struggle to apologize; it feels like weakness.",
            "score": {
              "compete": 2
            },
            "tags": [
              "defensiveness"
            ]
          },
          {
            "label": "Apologize immediately (even if you’re not sure).",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "over_apologize"
            ]
          },
          {
            "label": "Avoid the topic; hope it fades.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "avoid_accountability"
            ]
          },
          {
            "label": "Apologize and ask what would fix it.",
            "score": {
              "compromise": 2,
              "collaborate": 1
            },
            "tags": [
              "solution"
            ]
          }
        ]
      },
      {
        "text": "In arguments, you’re most annoyed by…",
        "options": [
          {
            "label": "Passive-aggression and vague hints.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "directness_need"
            ]
          },
          {
            "label": "Being pushed to talk when you’re flooded.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "flooded"
            ]
          },
          {
            "label": "People changing the topic / moving goalposts.",
            "score": {
              "compete": 2
            },
            "tags": [
              "logic_need"
            ]
          },
          {
            "label": "Harsh tone and criticism.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "tone_sensitive"
            ]
          },
          {
            "label": "Endless back-and-forth with no decision.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "efficiency"
            ]
          }
        ]
      },
      {
        "text": "When you feel attacked, you…",
        "options": [
          {
            "label": "Defend with evidence and counterpoints.",
            "score": {
              "compete": 2
            },
            "tags": [
              "defensive"
            ]
          },
          {
            "label": "Withdraw and stop engaging.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "shutdown"
            ]
          },
          {
            "label": "Ask questions and reflect back.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "reflective"
            ]
          },
          {
            "label": "Concede to keep peace.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "self_abandon"
            ]
          },
          {
            "label": "Offer a trade: ‘I’ll do X if you do Y.’",
            "score": {
              "compromise": 2
            },
            "tags": [
              "transactional"
            ]
          }
        ]
      },
      {
        "text": "Your conflict superpower is…",
        "options": [
          {
            "label": "Clarity: I name the issue.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "clarity"
            ]
          },
          {
            "label": "Intensity: I don’t let things slide.",
            "score": {
              "compete": 2
            },
            "tags": [
              "intensity"
            ]
          },
          {
            "label": "Calm: I don’t feed the fire.",
            "score": {
              "avoid": 1,
              "compromise": 1
            },
            "tags": [
              "calm"
            ]
          },
          {
            "label": "Empathy: I can see their side.",
            "score": {
              "accommodate": 2,
              "collaborate": 1
            },
            "tags": [
              "empathy"
            ]
          },
          {
            "label": "Pragmatism: I get us to a workable outcome.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "pragmatic"
            ]
          }
        ]
      },
      {
        "text": "When you’re stressed, you prefer to repair by…",
        "options": [
          {
            "label": "Talking until we understand each other.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "talk_repair"
            ]
          },
          {
            "label": "Space first, then talk.",
            "score": {
              "avoid": 2,
              "compromise": 1
            },
            "tags": [
              "space_then_talk"
            ]
          },
          {
            "label": "Setting boundaries firmly.",
            "score": {
              "compete": 2,
              "collaborate": 1
            },
            "tags": [
              "firm_boundaries"
            ]
          },
          {
            "label": "Doing something kind and moving on.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "gesture_repair"
            ]
          },
          {
            "label": "Agreeing on rules for next time.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "process"
            ]
          }
        ]
      },
      {
        "text": "If your partner goes silent, you…",
        "options": [
          {
            "label": "Chase clarity: ‘Are we okay?’",
            "score": {
              "collaborate": 1,
              "compete": 1
            },
            "tags": [
              "pursue"
            ]
          },
          {
            "label": "Feel relief (less conflict) but resentment builds.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "avoid_relief"
            ]
          },
          {
            "label": "Assume disrespect and confront.",
            "score": {
              "compete": 2
            },
            "tags": [
              "confront"
            ]
          },
          {
            "label": "Blame yourself and try to please.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "self_blame"
            ]
          },
          {
            "label": "Suggest a specific time to revisit.",
            "score": {
              "compromise": 2,
              "collaborate": 1
            },
            "tags": [
              "schedule"
            ]
          }
        ]
      },
      {
        "text": "You consider ‘fair fighting’ to mean…",
        "options": [
          {
            "label": "No insults, stick to one issue, stay present.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "fair_rules"
            ]
          },
          {
            "label": "Say the truth even if it’s sharp.",
            "score": {
              "compete": 2
            },
            "tags": [
              "truth_over_tone"
            ]
          },
          {
            "label": "Avoid conflict unless it’s necessary.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "avoid_conflict"
            ]
          },
          {
            "label": "Protect feelings first; tone matters most.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "protect_feelings"
            ]
          },
          {
            "label": "Get to a solution quickly.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "solution_fast"
            ]
          }
        ]
      },
      {
        "text": "During conflict, you often feel…",
        "options": [
          {
            "label": "Activated and talkative.",
            "score": {
              "compete": 1,
              "collaborate": 1
            },
            "tags": [
              "activated"
            ]
          },
          {
            "label": "Numb or blank.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "shutdown"
            ]
          },
          {
            "label": "Guilty and responsible.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "guilt"
            ]
          },
          {
            "label": "Analytical—trying to solve.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "analytical"
            ]
          },
          {
            "label": "Curious—trying to understand patterns.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "curious"
            ]
          }
        ]
      },
      {
        "text": "The phrase you relate to most:",
        "options": [
          {
            "label": "‘Let’s fix it properly.’",
            "score": {
              "collaborate": 2
            }
          },
          {
            "label": "‘I’m not doing this right now.’",
            "score": {
              "avoid": 2
            }
          },
          {
            "label": "‘Here’s what’s wrong with your argument.’",
            "score": {
              "compete": 2
            }
          },
          {
            "label": "‘I’ll just let it go.’",
            "score": {
              "accommodate": 2
            }
          },
          {
            "label": "‘Let’s meet in the middle.’",
            "score": {
              "compromise": 2
            }
          }
        ]
      },
      {
        "text": "When conflict is unresolved, you…",
        "options": [
          {
            "label": "Ruminate until it’s repaired.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "ruminate"
            ]
          },
          {
            "label": "Detach and focus elsewhere.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "detach"
            ]
          },
          {
            "label": "Keep pressing until your point lands.",
            "score": {
              "compete": 2
            },
            "tags": [
              "press"
            ]
          },
          {
            "label": "Pretend it’s fine to keep harmony.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "pretend"
            ]
          },
          {
            "label": "Lower expectations and accept a partial fix.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "partial_fix"
            ]
          }
        ]
      },
      {
        "text": "Best way to approach you with a complaint is…",
        "options": [
          {
            "label": "Direct + specific + collaborative.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "best_approach"
            ]
          },
          {
            "label": "Give me time and don’t corner me.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "best_approach"
            ]
          },
          {
            "label": "Respect my logic; don’t dramatize.",
            "score": {
              "compete": 2
            },
            "tags": [
              "best_approach"
            ]
          },
          {
            "label": "Be gentle; reassurance helps.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "best_approach"
            ]
          },
          {
            "label": "Offer options and a path forward.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "best_approach"
            ]
          }
        ]
      },
      {
        "text": "Your growth edge is usually…",
        "options": [
          {
            "label": "Staying in it when emotions rise.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "growth"
            ]
          },
          {
            "label": "Softening defensiveness.",
            "score": {
              "compete": 2
            },
            "tags": [
              "growth"
            ]
          },
          {
            "label": "Asking for what you need (not just pleasing).",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "growth"
            ]
          },
          {
            "label": "Not over-talking; leaving room.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "growth"
            ]
          },
          {
            "label": "Not settling for ‘fine’ if it repeats.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "growth"
            ]
          }
        ]
      },
      {
        "text": "When you apologize, you prefer to…",
        "options": [
          {
            "label": "Explain + validate + change behavior.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "repair"
            ]
          },
          {
            "label": "Keep it short and move on.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "repair"
            ]
          },
          {
            "label": "Only apologize if I’m clearly wrong.",
            "score": {
              "compete": 2
            },
            "tags": [
              "repair"
            ]
          },
          {
            "label": "Apologize quickly to end tension.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "repair"
            ]
          },
          {
            "label": "Avoid apologies; it feels unsafe.",
            "score": {
              "avoid": 2
            },
            "tags": [
              "repair"
            ]
          }
        ]
      },
      {
        "text": "If you could install one habit in your relationship, it’s…",
        "options": [
          {
            "label": "Weekly check-in: feelings + requests.",
            "score": {
              "collaborate": 2
            },
            "tags": [
              "habit"
            ]
          },
          {
            "label": "Time-outs with a guaranteed return time.",
            "score": {
              "avoid": 1,
              "compromise": 1
            },
            "tags": [
              "habit"
            ]
          },
          {
            "label": "Clear boundaries and consequences.",
            "score": {
              "compete": 2
            },
            "tags": [
              "habit"
            ]
          },
          {
            "label": "More appreciation and softness.",
            "score": {
              "accommodate": 2
            },
            "tags": [
              "habit"
            ]
          },
          {
            "label": "One decision per conflict, written down.",
            "score": {
              "compromise": 2
            },
            "tags": [
              "habit"
            ]
          }
        ]
      }
    ],
    "results": {
      "collaborate": {
        "title": "Collaborating (repair-focused)",
        "bullets": [
          "You want understanding, not just silence.",
          "You can name issues clearly.",
          "You tend to do emotional labor."
        ],
        "what_it_looks_like": [
          "Long explanations.",
          "Seeking mutual meaning.",
          "You dislike unresolved tension."
        ],
        "blindspots": [
          "You can over-talk and exhaust people.",
          "You may chase repair with someone who can’t do it."
        ],
        "scripts": [
          "“Can we stick to one issue and solve it?”",
          "“What did you hear me say?”",
          "“I want repair, not winning.”"
        ],
        "next_steps": [
          "Add time limits + breaks so repair stays regulated.",
          "Require reciprocal effort."
        ]
      },
      "avoid": {
        "title": "Avoiding (shutdown / withdrawal)",
        "bullets": [
          "Conflict floods your nervous system.",
          "Silence is self-protection.",
          "You need space to think."
        ],
        "what_it_looks_like": [
          "Going blank.",
          "Leaving the room.",
          "Delaying hard conversations."
        ],
        "blindspots": [
          "Avoiding becomes abandonment to a partner.",
          "Unspoken resentment stacks."
        ],
        "scripts": [
          "“I’m flooded. I need 30 minutes—then I *will* come back.”",
          "“I’m not ignoring you. My brain is overloaded.”",
          "“Let’s set a time to talk so it doesn’t disappear.”"
        ],
        "next_steps": [
          "Never take space without a return time.",
          "Practice one sentence of engagement before pausing."
        ]
      },
      "compete": {
        "title": "Competing (direct, high-heat)",
        "bullets": [
          "You value truth and clarity.",
          "You push for outcomes.",
          "You dislike ambiguity."
        ],
        "what_it_looks_like": [
          "Debating.",
          "Correcting details.",
          "Escalating when you feel unheard."
        ],
        "blindspots": [
          "Being right can cost intimacy.",
          "Tone can become the real issue."
        ],
        "scripts": [
          "“I’m getting intense. I care—let me slow down.”",
          "“I want the point to land, not to hurt you.”",
          "“Can we solve this without attacking?”"
        ],
        "next_steps": [
          "Swap ‘win’ for ‘repair.’",
          "Add validation before solutions."
        ]
      },
      "accommodate": {
        "title": "Accommodating (peacekeeper)",
        "bullets": [
          "You protect harmony.",
          "You read emotions well.",
          "You’ll sacrifice needs to keep calm."
        ],
        "what_it_looks_like": [
          "Quick apologies.",
          "Letting things go.",
          "Avoiding being ‘the problem.’"
        ],
        "blindspots": [
          "You may self-abandon, then explode later.",
          "Resentment grows silently."
        ],
        "scripts": [
          "“I care about peace, but I also need to say this.”",
          "“I’m agreeing, but I’m not okay—can we adjust?”",
          "“Here’s one thing I need going forward.”"
        ],
        "next_steps": [
          "Practice one direct request per conflict.",
          "Expect repair, not just calm."
        ]
      },
      "compromise": {
        "title": "Compromising (pragmatic fixer)",
        "bullets": [
          "You want workable solutions.",
          "You’re outcome-oriented.",
          "You prefer quick resolution."
        ],
        "what_it_looks_like": [
          "Meeting in the middle.",
          "Creating rules.",
          "Action plans."
        ],
        "blindspots": [
          "You might skip emotional repair.",
          "Some issues need understanding, not trades."
        ],
        "scripts": [
          "“What’s one change we can try this week?”",
          "“Let’s write the agreement so it sticks.”",
          "“Before we decide, I want to hear your feelings too.”"
        ],
        "next_steps": [
          "Add one empathy step before problem-solving.",
          "Watch for repeated compromises that hide bigger issues."
        ]
      },
      "mixed": {
        "title": "Mixed (two styles are close)",
        "bullets": [
          "You shift styles based on stress.",
          "Context matters.",
          "Your partner may see you as inconsistent."
        ],
        "what_it_looks_like": [
          "Sometimes you chase, sometimes you shut down.",
          "Repair depends on your state.",
          "You adapt fast."
        ],
        "blindspots": [
          "People can’t predict you under stress.",
          "Consistency is safety."
        ],
        "scripts": [
          "“When I’m stressed I ___; what I need is ___.”",
          "“Let’s set rules for time-outs and repair.”",
          "“I’m trying to stay present—help me slow down.”"
        ],
        "next_steps": [
          "Name your ‘stress style’ explicitly.",
          "Use rituals to stabilize repair."
        ]
      }
    },
    "tieBreakPriority": [
      "collaborate",
      "compromise",
      "accommodate",
      "avoid",
      "compete",
      "mixed"
    ],
    "modifiers": [
      {
        "id": "shutdown",
        "title": "Shutdown Trigger",
        "when": {
          "tag": "shutdown",
          "min": 2
        },
        "copy": "You likely go blank or freeze under pressure. That’s physiology—not attitude. But it needs a repair plan."
      },
      {
        "id": "defensive",
        "title": "Defensiveness Spike",
        "when": {
          "tag": "defensive",
          "min": 2
        },
        "copy": "You protect yourself with logic and counterpoints. Effective in court, risky in love."
      },
      {
        "id": "over_apologize",
        "title": "Over-Apologizing",
        "when": {
          "tag": "over_apologize",
          "min": 2
        },
        "copy": "You apologize fast to stop tension, but your needs don’t get solved—so the same fight returns."
      }
    ],
    "faq": [
      {
        "q": "Why do I shut down during arguments?",
        "a": "Often it’s nervous system flooding. Your body goes into freeze/withdraw to protect you."
      },
      {
        "q": "Is avoiding conflict always bad?",
        "a": "No. Space can be healthy if you return. Vanishing without repair is what damages trust."
      },
      {
        "q": "How do we fight fair?",
        "a": "One issue at a time, no insults, time-outs with return time, and end with a concrete next step."
      },
      {
        "q": "Can two different conflict styles work?",
        "a": "Yes—if both can name their style and agree on repair rules."
      }
    ]
  },
  {
      "id": "toxic_relationship",
      "slug": "toxic-relationship",
      "title": "Toxic Relationship Test",
      "blurb": "12 high-impact questions that flag gaslighting, control, and emotional manipulation — with clear next steps.",
      "time": "2–3 min",
      "intent": "quiz",
      "keywords": [
          "toxic relationship test",
          "am i in a toxic relationship",
          "signs of a toxic relationship",
          "toxic relationship quiz",
          "relationship red flags quiz",
          "gaslighting test",
          "emotional manipulation signs",
          "walking on eggshells relationship",
          "is my partner controlling",
          "emotional abuse signs"
      ],
      "questions": [
          {
              "text": "Before you speak up, you often scan for their mood because…",
              "options": [
                  {
                      "label": "Most of the time it’s safe — I just prefer calm timing.",
                      "score": {
                          "healthy_strained": 2
                      },
                      "tags": [
                          "self_regulation"
                      ]
                  },
                  {
                      "label": "If I say it wrong, it becomes my fault.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "blameshift"
                      ]
                  },
                  {
                      "label": "Their reaction can be intense or scary.",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "fear_response"
                      ]
                  },
                  {
                      "label": "They’ll dismiss it anyway, so I often don’t bother.",
                      "score": {
                          "unbalanced": 2
                      },
                      "tags": [
                          "dismissed"
                      ]
                  }
              ]
          },
          {
              "text": "When you bring up a hurt, they usually…",
              "options": [
                  {
                      "label": "Hear it and try to repair.",
                      "score": {
                          "healthy_strained": 2
                      },
                      "tags": [
                          "repair"
                      ]
                  },
                  {
                      "label": "Argue your feelings: “That didn’t happen / you’re exaggerating.”",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "invalidation",
                          "gaslighting"
                      ]
                  },
                  {
                      "label": "Turn it into punishment (rage, threats, intimidation).",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "intimidation"
                      ]
                  },
                  {
                      "label": "Go quiet, disappear, or change the subject.",
                      "score": {
                          "unbalanced": 2
                      },
                      "tags": [
                          "avoidance"
                      ]
                  }
              ]
          },
          {
              "text": "After conflict, you’re the one who…",
              "options": [
                  {
                      "label": "Initiates a check-in sometimes, but it’s shared.",
                      "score": {
                          "healthy_strained": 2
                      },
                      "tags": [
                          "mutual_effort"
                      ]
                  },
                  {
                      "label": "Apologizes just to end the tension, even when you weren’t wrong.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "self_blame"
                      ]
                  },
                  {
                      "label": "Walks on eggshells to prevent the next explosion.",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "hypervigilance"
                      ]
                  },
                  {
                      "label": "Does all the emotional labor while they ‘move on’.",
                      "score": {
                          "unbalanced": 2
                      },
                      "tags": [
                          "one_sided"
                      ]
                  }
              ]
          },
          {
              "text": "How often do you feel like you’re ‘too much’ in this relationship?",
              "options": [
                  {
                      "label": "Rarely. I feel basically accepted.",
                      "score": {
                          "healthy_strained": 2
                      }
                  },
                  {
                      "label": "Often — my needs get labeled as drama.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "shame"
                      ]
                  },
                  {
                      "label": "Almost daily — I feel small or unsafe.",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "fear_response"
                      ]
                  },
                  {
                      "label": "I feel more invisible than ‘too much’.",
                      "score": {
                          "unbalanced": 2
                      },
                      "tags": [
                          "neglect"
                      ]
                  }
              ]
          },
          {
              "text": "Your boundaries (time, privacy, money, body) are…",
              "options": [
                  {
                      "label": "Mostly respected, even if we negotiate.",
                      "score": {
                          "healthy_strained": 2
                      },
                      "tags": [
                          "boundaries_respected"
                      ]
                  },
                  {
                      "label": "Regularly pushed with guilt or ‘jokes’.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "boundary_push"
                      ]
                  },
                  {
                      "label": "Broken with control (monitoring, isolation, coercion).",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "control"
                      ]
                  },
                  {
                      "label": "Ignored because they don’t engage or follow through.",
                      "score": {
                          "unbalanced": 2
                      },
                      "tags": [
                          "low_investment"
                      ]
                  }
              ]
          },
          {
              "text": "When something good happens to you, they…",
              "options": [
                  {
                      "label": "Celebrate it and feel proud.",
                      "score": {
                          "healthy_strained": 2
                      }
                  },
                  {
                      "label": "Compete, minimize, or make it about them.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "devalue"
                      ]
                  },
                  {
                      "label": "Punish you for it (coldness, sabotage, accusations).",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "sabotage"
                      ]
                  },
                  {
                      "label": "Act indifferent — like it doesn’t matter.",
                      "score": {
                          "unbalanced": 2
                      }
                  }
              ]
          },
          {
              "text": "If you spend time with friends/family, you feel…",
              "options": [
                  {
                      "label": "Free to go. We coordinate like adults.",
                      "score": {
                          "healthy_strained": 2
                      }
                  },
                  {
                      "label": "Guilty, because they imply you’re selfish.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "guilt"
                      ]
                  },
                  {
                      "label": "Nervous, because they may blow up or isolate you.",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "isolation"
                      ]
                  },
                  {
                      "label": "Like they don’t care — unless it inconveniences them.",
                      "score": {
                          "unbalanced": 2
                      }
                  }
              ]
          },
          {
              "text": "In arguments, they tend to…",
              "options": [
                  {
                      "label": "Stay on the issue and come back after breaks.",
                      "score": {
                          "healthy_strained": 2
                      }
                  },
                  {
                      "label": "Shift blame and rewrite the story.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "blameshift",
                          "gaslighting"
                      ]
                  },
                  {
                      "label": "Use fear: yelling, threats, blocking exits, breaking things.",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "intimidation"
                      ]
                  },
                  {
                      "label": "Disappear, stonewall, or leave you hanging for days.",
                      "score": {
                          "unbalanced": 2
                      },
                      "tags": [
                          "stonewalling"
                      ]
                  }
              ]
          },
          {
              "text": "How predictable is the ‘love’ you receive?",
              "options": [
                  {
                      "label": "Steady, even when we’re stressed.",
                      "score": {
                          "healthy_strained": 2
                      }
                  },
                  {
                      "label": "It flips: warm when you please them, cold when you don’t.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "intermittent_reinforcement"
                      ]
                  },
                  {
                      "label": "It’s intense then punishing — a cycle you can’t control.",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "cycle"
                      ]
                  },
                  {
                      "label": "Low effort most of the time.",
                      "score": {
                          "unbalanced": 2
                      }
                  }
              ]
          },
          {
              "text": "When you say “no”, the usual outcome is…",
              "options": [
                  {
                      "label": "They accept it, maybe disappointed but respectful.",
                      "score": {
                          "healthy_strained": 2
                      }
                  },
                  {
                      "label": "They pressure you until you cave.",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "coercion"
                      ]
                  },
                  {
                      "label": "They retaliate or scare you.",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "retaliation"
                      ]
                  },
                  {
                      "label": "They withdraw and you’re left to fix it.",
                      "score": {
                          "unbalanced": 2
                      }
                  }
              ]
          },
          {
              "text": "You catch yourself thinking…",
              "options": [
                  {
                      "label": "“We have issues, but we can work through them.”",
                      "score": {
                          "healthy_strained": 2
                      }
                  },
                  {
                      "label": "“Maybe I really am the problem.”",
                      "score": {
                          "toxic_patterns": 2
                      },
                      "tags": [
                          "self_doubt"
                      ]
                  },
                  {
                      "label": "“If I leave, something bad might happen.”",
                      "score": {
                          "high_risk": 2
                      },
                      "tags": [
                          "fear_response"
                      ]
                  },
                  {
                      "label": "“I’m in a relationship but feel alone.”",
                      "score": {
                          "unbalanced": 2
                      }
                  }
              ]
          },
          {
              "text": "If you imagine this continuing for a year, your body feels…",
              "options": [
                  {
                      "label": "Tired, but hopeful with the right changes.",
                      "score": {
                          "healthy_strained": 2
                      }
                  },
                  {
                      "label": "Heavy — like you’re losing yourself.",
                      "score": {
                          "toxic_patterns": 2
                      }
                  },
                  {
                      "label": "Alarmed — like your nervous system is on edge.",
                      "score": {
                          "high_risk": 2
                      }
                  },
                  {
                      "label": "Numb — like you’re drifting.",
                      "score": {
                          "unbalanced": 2
                      }
                  }
              ]
          }
      ],
      "results": {
          "healthy_strained": {
              "title": "Healthy but Strained (repair is possible)",
              "bullets": [
                  "The foundation has respect, but stress patterns are getting loud.",
                  "Miscommunication happens — not systematic control.",
                  "With clear repair rules, this can improve quickly."
              ],
              "what_it_looks_like": [
                  "Tension spikes during stress, then you reconnect.",
                  "Both people can own their part (even if it takes time).",
                  "Boundaries are mostly honored, but consistency needs work."
              ],
              "blindspots": [
                  "You may normalize ‘almost okay’ and ignore small red flags.",
                  "You might do too much fixing instead of asking for shared effort."
              ],
              "scripts": [
                  "“I want us on the same team. Can we name the pattern, not blame the person?”",
                  "“When I share a feeling, I need acknowledgment first — solutions second.”",
                  "“If we take a break, let’s set a return time so it doesn’t become distance.”"
              ],
              "next_steps": [
                  "Do a weekly 15‑minute check‑in: one appreciation + one request + one plan.",
                  "Agree on a conflict rule: no insults, no threats, and time‑outs with return time.",
                  "If the same issue repeats 3 times, bring in a neutral third party (therapy/coaching)."
              ]
          },
          "unbalanced": {
              "title": "Unbalanced / One‑Sided (you’re carrying the relationship)",
              "bullets": [
                  "The relationship runs on your effort — your partner coasts.",
                  "Needs get delayed, minimized, or left unresolved.",
                  "You can feel lonely even while ‘together’."
              ],
              "what_it_looks_like": [
                  "You initiate talks, plans, repair, and emotional clarity.",
                  "Promises happen, follow‑through doesn’t.",
                  "Your needs feel like ‘extra work’ to them."
              ],
              "blindspots": [
                  "You may confuse potential with partnership.",
                  "You might accept crumbs because you’re exhausted from asking."
              ],
              "scripts": [
                  "“I need this to be mutual. What will you do differently this week — specifically?”",
                  "“I’m not available for a relationship where I’m the only one repairing.”",
                  "“If it matters, it shows in actions — not intentions.”"
              ],
              "next_steps": [
                  "Stop over-explaining. Make one clear request, then watch behavior.",
                  "Set a timeline: if effort doesn’t change in 30 days, make a decision.",
                  "Rebuild your support system (friends, routines, hobbies) so the relationship isn’t your only oxygen."
              ]
          },
          "toxic_patterns": {
              "title": "Toxic Patterns Present (your reality and needs are being eroded)",
              "bullets": [
                  "You’re dealing with repeated invalidation, blame-shifting, or guilt control.",
                  "The ‘problem’ keeps getting reframed as you — not the behavior.",
                  "Your self-trust is shrinking."
              ],
              "what_it_looks_like": [
                  "You overthink texts, tone, and timing to avoid getting blamed.",
                  "Apologies get demanded, but repair doesn’t happen.",
                  "Affection feels conditional: warm when compliant, cold when not."
              ],
              "blindspots": [
                  "You may keep trying to ‘find the right words’ to finally be understood.",
                  "You might confuse intense emotion with intimacy."
              ],
              "scripts": [
                  "“I’m open to feedback. I’m not open to being shamed or dismissed.”",
                  "“We can disagree, but we don’t rewrite reality. Let’s stay with facts.”",
                  "“If you can’t talk without blame, I’m ending this conversation and returning later.”"
              ],
              "next_steps": [
                  "Name the pattern (gaslighting, guilt, blame shift) and stop debating your feelings.",
                  "Keep a private reality-check note: what happened, what was said, how you felt.",
                  "Talk to a trusted friend/therapist for external grounding and planning."
              ]
          },
          "high_risk": {
              "title": "High‑Risk Toxic Relationship (safety and support first)",
              "bullets": [
                  "Your nervous system is signaling danger: fear, intimidation, or coercion.",
                  "Control tactics may be present (isolation, monitoring, threats).",
                  "You deserve support that prioritizes safety, not ‘fixing’ the dynamic."
              ],
              "what_it_looks_like": [
                  "You feel scared to set boundaries or say no.",
                  "Conflict includes threats, screaming, intimidation, or punishment cycles.",
                  "You’re isolated, monitored, or made to feel trapped."
              ],
              "blindspots": [
                  "You may minimize because ‘it’s not always bad’. Cycles are common in abuse.",
                  "You may hope love will calm what is actually a control pattern."
              ],
              "scripts": [
                  "“I’m not discussing this while I’m being threatened. I’m leaving / ending the call.”",
                  "“My safety comes first. I’m reaching out for support.”",
                  "“No explanation is required for a boundary.”"
              ],
              "next_steps": [
                  "If you feel unsafe, prioritize immediate support from local services or trusted people.",
                  "Create a safety plan (documents, money, where you can go, who you can call).",
                  "Consider professional support specialized in abuse dynamics."
              ]
          }
      },
      "faq": [
          {
              "q": "What is a toxic relationship?",
              "a": "A toxic relationship is a repeating pattern that drains your emotional safety — like chronic disrespect, control, blame-shifting, or manipulation — rather than a one-off bad week."
          },
          {
              "q": "Is this test a diagnosis?",
              "a": "No. It’s a reflection tool based on behavior patterns. If you feel unsafe or controlled, that signal matters even without a label."
          },
          {
              "q": "Can a relationship be toxic without yelling?",
              "a": "Yes. Subtle toxicity often shows up as guilt, silent treatment, gaslighting, isolation, or making you doubt your reality."
          },
          {
              "q": "What’s the difference between conflict and toxicity?",
              "a": "Healthy conflict still has respect and repair. Toxicity is when conflict becomes punishment, control, or repeated erosion of your boundaries."
          },
          {
              "q": "What if I got the High‑Risk result?",
              "a": "Treat it as a cue to prioritize support and safety. Reach out to trusted people and local resources; you don’t have to navigate it alone."
          },
          {
              "q": "How can I rebuild my self-trust?",
              "a": "Start tracking facts (what happened), limit debates about your feelings, and get external perspective from a friend, therapist, or support group."
          }
      ]
  }
];

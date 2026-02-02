 /* overthinking-relationship.js — single test definition */
window.TEST = {
  "id": "overthinking_relationship",
  "slug": "overthinking-relationship",
  "title": "Overthinking Relationship Test — Are You Overthinking Your Relationship?",
  "blurb": "12 high-impact questions to reveal your overthinking pattern — relationship anxiety, reassurance loops, and how to rebuild self-trust.",
  "time": "2–3 min",
  "intent": "quiz",
  "keywords": [
    "overthinking relationship",
    "overthinking relationship test",
    "relationship anxiety test",
    "why do I overthink everything in my relationship",
    "overthinking texts",
    "need constant reassurance"
  ],
  "inconsistency_rules": [
    {
      "a": "avoidance",
      "b": "reassurance"
    },
    {
      "a": "trust",
      "b": "mindread"
    }
  ],
  "questions": [
    {
      "text": "Your partner replies later than usual. Your first inner move is…",
      "options": [
        {
          "label": "I notice the thought, check the facts, and wait.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "I want reassurance fast; I feel my body tense.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance",
            "text_spiral"
          ]
        },
        {
          "label": "I replay every message and scan for hidden meaning.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "mindread",
            "text_spiral"
          ]
        },
        {
          "label": "I assume something is wrong and prepare for impact.",
          "score": {
            "hypervigilant": 2
          },
          "tags": [
            "hypervigilant",
            "catastrophize"
          ]
        }
      ]
    },
    {
      "text": "After a warm, intimate day together, you often…",
      "options": [
        {
          "label": "Feel steady; closeness doesn’t trigger a crash.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "Need a quick ‘we’re good’ check to settle.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance"
          ]
        },
        {
          "label": "Start questioning if it was ‘too much’ or will change.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "ruminate"
          ]
        },
        {
          "label": "Feel a drop: I brace for distance, even without proof.",
          "score": {
            "hypervigilant": 2
          },
          "tags": [
            "hypervigilant"
          ]
        }
      ]
    },
    {
      "text": "When conflict happens, your mind tends to…",
      "options": [
        {
          "label": "Focus on the issue and what repair would look like.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "repair"
          ]
        },
        {
          "label": "Loop on: ‘Are they upset with me? Are we okay?’",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance",
            "ruminate"
          ]
        },
        {
          "label": "Replay the conversation for days, hunting for the ‘real’ cause.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "ruminate",
            "mindread"
          ]
        },
        {
          "label": "Track tone, micro-signals, and worst-case outcomes.",
          "score": {
            "hypervigilant": 2
          },
          "tags": [
            "hypervigilant",
            "catastrophize"
          ]
        }
      ]
    },
    {
      "text": "If your partner says “I’m busy today,” you hear…",
      "options": [
        {
          "label": "They’re busy. We can reconnect later.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "I might need a small reassurance so I don’t spiral.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance"
          ]
        },
        {
          "label": "A hidden message: I start decoding what it really means.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "mindread"
          ]
        },
        {
          "label": "A threat signal: I assume distance is starting.",
          "score": {
            "hypervigilant": 2
          },
          "tags": [
            "catastrophize",
            "hypervigilant"
          ]
        }
      ]
    },
    {
      "text": "The pattern you dislike most in yourself is…",
      "options": [
        {
          "label": "I can overthink sometimes, but I return to reality quickly.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "I ask for reassurance, then feel ashamed for needing it.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance",
            "shame"
          ]
        },
        {
          "label": "I can’t stop analyzing — even when I know it’s hurting me.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "ruminate"
          ]
        },
        {
          "label": "I’m exhausted from being on alert all the time.",
          "score": {
            "self_trust_collapse": 2
          },
          "tags": [
            "exhaustion",
            "hypervigilant"
          ]
        }
      ]
    },
    {
      "text": "When you feel uncertain, you’re most likely to…",
      "options": [
        {
          "label": "Ask one clear question and accept the answer.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "repair"
          ]
        },
        {
          "label": "Seek reassurance repeatedly until I feel calm.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance"
          ]
        },
        {
          "label": "Search for proof: screenshots, timelines, subtle cues.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "mindread",
            "proof_seek"
          ]
        },
        {
          "label": "Withdraw emotionally to protect myself from rejection.",
          "score": {
            "self_trust_collapse": 2
          },
          "tags": [
            "avoidance"
          ]
        }
      ]
    },
    {
      "text": "How often do you ‘mind-read’ (assume you know what they mean/feel)?",
      "options": [
        {
          "label": "Rarely — I check instead of assuming.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "Sometimes — especially when I need reassurance.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "mindread",
            "reassurance"
          ]
        },
        {
          "label": "Often — my brain fills gaps instantly.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "mindread"
          ]
        },
        {
          "label": "Constantly — and it keeps me tense and guarded.",
          "score": {
            "hypervigilant": 2
          },
          "tags": [
            "mindread",
            "hypervigilant"
          ]
        }
      ]
    },
    {
      "text": "After you send a vulnerable message, you…",
      "options": [
        {
          "label": "Feel okay. If they respond later, it’s still okay.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "Keep checking — one reply can calm me instantly.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "text_spiral",
            "reassurance"
          ]
        },
        {
          "label": "Reread it, regret it, and analyze how it might land.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "text_spiral",
            "ruminate"
          ]
        },
        {
          "label": "Feel exposed; I wish I hadn’t shared anything.",
          "score": {
            "self_trust_collapse": 2
          },
          "tags": [
            "shame",
            "avoidance"
          ]
        }
      ]
    },
    {
      "text": "The most accurate description of your ‘relationship anxiety’ is…",
      "options": [
        {
          "label": "It comes up, but I can self-soothe and stay grounded.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "It spikes when connection feels uncertain; reassurance helps.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance"
          ]
        },
        {
          "label": "It turns into long mental debates that I can’t end.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "ruminate"
          ]
        },
        {
          "label": "It’s in my body: tight chest, scanning, feeling unsafe.",
          "score": {
            "hypervigilant": 2
          },
          "tags": [
            "hypervigilant"
          ]
        }
      ]
    },
    {
      "text": "When something feels ‘off,’ what happens to self-trust?",
      "options": [
        {
          "label": "I pause and gather evidence before concluding.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "I doubt myself until someone reassures me.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance"
          ]
        },
        {
          "label": "I distrust my reality and keep searching for certainty.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "proof_seek"
          ]
        },
        {
          "label": "I collapse into ‘I can’t tell what’s real,’ and shut down.",
          "score": {
            "self_trust_collapse": 2
          },
          "tags": [
            "exhaustion",
            "avoidance"
          ]
        }
      ]
    },
    {
      "text": "If you could change one thing overnight, it would be…",
      "options": [
        {
          "label": "Less mental noise; more calm choices.",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "Not needing reassurance to feel safe.",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance"
          ]
        },
        {
          "label": "Stopping the replay/analysis loop.",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "ruminate"
          ]
        },
        {
          "label": "Feeling safe in my body again.",
          "score": {
            "self_trust_collapse": 2
          },
          "tags": [
            "exhaustion"
          ]
        }
      ]
    },
    {
      "text": "The sentence that hits too close is…",
      "options": [
        {
          "label": "“I can tolerate uncertainty without losing myself.”",
          "score": {
            "healthy_thinker": 2
          },
          "tags": [
            "trust"
          ]
        },
        {
          "label": "“I feel calm only when I get reassurance.”",
          "score": {
            "reassurance_seeker": 2
          },
          "tags": [
            "reassurance"
          ]
        },
        {
          "label": "“My brain won’t stop trying to solve the relationship.”",
          "score": {
            "rumination_loop": 2
          },
          "tags": [
            "ruminate"
          ]
        },
        {
          "label": "“I’m tired of being on edge — I miss my old self.”",
          "score": {
            "self_trust_collapse": 2
          },
          "tags": [
            "exhaustion",
            "hypervigilant"
          ]
        }
      ]
    }
  ],
  "results": {
    "healthy_thinker": {
      "title": "Healthy Thinker (grounded & clear)",
      "bullets": [
        "You notice anxiety, but you don’t obey it.",
        "You check facts instead of decoding every signal.",
        "You can ask directly — without spiraling."
      ],
      "what_it_looks_like": [
        "You tolerate uncertainty without losing self-respect.",
        "You don’t need constant reassurance to function.",
        "You repair after conflict instead of replaying it."
      ],
      "blindspots": [
        "You may underestimate how intense uncertainty feels for others.",
        "You might stay too long trying to ‘be the calm one’ for both."
      ],
      "scripts": [
        "“Can we set a time to talk later? I want clarity, not panic.”",
        "“I’m noticing a story in my head — can I check the facts with you?”",
        "“I’m okay with space. I just want a return time.”"
      ],
      "next_steps": [
        "Keep a simple rule: facts first, stories second.",
        "Build predictable repair rituals after conflict.",
        "Protect your calm by choosing consistent partners."
      ]
    },
    "reassurance_seeker": {
      "title": "Reassurance Seeker (sensitive alarm system)",
      "bullets": [
        "Uncertainty spikes your nervous system fast.",
        "Reassurance works — but the relief doesn’t last long.",
        "You may feel shame for needing what is actually human."
      ],
      "what_it_looks_like": [
        "‘Are we okay?’ loops.",
        "Checking apps, rereading messages, waiting for one text to breathe.",
        "Feeling calm only after confirmation."
      ],
      "blindspots": [
        "You can confuse anxiety relief with real safety.",
        "Too much chasing can create pressure and distance."
      ],
      "scripts": [
        "“I’m feeling anxious. A quick ‘we’re good’ helps — can you do that?”",
        "“Can you tell me when you’ll be free to talk, so I don’t fill gaps?”",
        "“I’m working on self-soothing — I still need consistency from you.”"
      ],
      "next_steps": [
        "Replace repeated reassurance asks with one clear request + timeline.",
        "Use a body reset (walk, cold water, breathing) before texting.",
        "Track patterns: trigger vs real red flag."
      ]
    },
    "rumination_loop": {
      "title": "Rumination Loop (analysis that never closes)",
      "bullets": [
        "Your brain tries to win safety by solving everything.",
        "You replay conversations to find the ‘missing’ truth.",
        "The loop feels productive — but it drains you."
      ],
      "what_it_looks_like": [
        "Mental courtroom: evidence, counter-evidence, verdict, restart.",
        "Decoding tone and micro-signals.",
        "Needing certainty before you can relax."
      ],
      "blindspots": [
        "Over-analysis can replace direct communication.",
        "You may confuse thinking with emotional processing."
      ],
      "scripts": [
        "“I’m noticing I’m analyzing. I need one clear answer to this question…”",
        "“I don’t want hints — I want directness. Can we be explicit?”",
        "“I’m going to pause the story and ask for facts.”"
      ],
      "next_steps": [
        "Set a ‘rumination timer’: 10 minutes then action or stop.",
        "Write facts vs interpretations to separate reality from fear.",
        "Make one direct request instead of running 20 silent scenarios."
      ]
    },
    "hypervigilant": {
      "title": "Hypervigilant (relationship anxiety mode)",
      "bullets": [
        "You scan for danger before it appears.",
        "Small shifts feel like early warning signs.",
        "Your body stays tense even when nothing is happening."
      ],
      "what_it_looks_like": [
        "Tracking moods, tone, response time, energy shifts.",
        "Catastrophizing: preparing for loss to avoid surprise.",
        "Difficulty relaxing into closeness."
      ],
      "blindspots": [
        "Hypervigilance can create the stress it’s trying to prevent.",
        "You may overlook stable evidence because your body expects danger."
      ],
      "scripts": [
        "“My anxiety is loud right now. Can you clarify what you mean?”",
        "“If you need space, please give a return time. That helps me regulate.”",
        "“I’m not accusing — I’m asking for clarity so I don’t assume.”"
      ],
      "next_steps": [
        "Treat anxiety as a body signal first (sleep, food, movement).",
        "Ask for predictable communication agreements (not constant contact).",
        "If you feel unsafe often, evaluate the relationship’s consistency."
      ]
    },
    "self_trust_collapse": {
      "title": "Self‑Trust Collapse (exhausted & emotionally overloaded)",
      "bullets": [
        "You’re tired of guessing and carrying uncertainty.",
        "You may shut down to protect yourself from more stress.",
        "Overthinking has become a coping strategy — and it’s burning you out."
      ],
      "what_it_looks_like": [
        "Numbness, avoidance, or ‘I can’t do this today.’",
        "Feeling like you can’t tell what’s real anymore.",
        "Pulling away because closeness feels unsafe."
      ],
      "blindspots": [
        "You may blame yourself for a system that lacks consistency.",
        "You may stay stuck between chasing and shutting down."
      ],
      "scripts": [
        "“I’m overwhelmed. I need a pause and a clear plan to talk later.”",
        "“I can’t keep living in uncertainty. I need consistency or we need help.”",
        "“I’m not okay pretending. I need a real conversation.”"
      ],
      "next_steps": [
        "Prioritize regulation: sleep, routine, and reducing relationship chaos.",
        "Set one non-negotiable boundary around clarity/repair.",
        "If exhaustion persists, get support (therapy/coaching) and reassess fit."
      ]
    }
  },
  "modifiers": [
    {
      "id": "text_spiral",
      "title": "Text Spiral",
      "when": {
        "tag": "text_spiral",
        "min": 2
      },
      "copy": "Silence triggers story-building. You check, reread, and feel relief only when a message arrives."
    },
    {
      "id": "mindread",
      "title": "Mind‑Reading Loop",
      "when": {
        "tag": "mindread",
        "min": 2
      },
      "copy": "Your brain fills gaps with meaning. Direct questions will save you months of guessing."
    },
    {
      "id": "catastrophize",
      "title": "Worst‑Case Thinking",
      "when": {
        "tag": "catastrophize",
        "min": 2
      },
      "copy": "Your mind prepares for loss to avoid surprise. Ground in evidence before you conclude."
    },
    {
      "id": "exhaustion",
      "title": "Emotional Exhaustion",
      "when": {
        "tag": "exhaustion",
        "min": 2
      },
      "copy": "Overthinking has turned into burnout. Your next step is reducing chaos and restoring safety."
    }
  ],
  "faq": [
    {
      "q": "What is overthinking in a relationship?",
      "a": "It’s when uncertainty triggers repeated analysis, mind-reading, and reassurance seeking—often to regain a sense of safety."
    },
    {
      "q": "Is overthinking the same as relationship anxiety?",
      "a": "They overlap. Relationship anxiety is the body alarm; overthinking is the mind strategy to control uncertainty."
    },
    {
      "q": "Why do I overthink texts?",
      "a": "Texts are ambiguous. If your nervous system reads ambiguity as danger, your brain tries to solve it by decoding tone and timing."
    },
    {
      "q": "How do I stop overthinking in a relationship?",
      "a": "Separate facts from stories, make one direct request, and use body-based calming before seeking reassurance."
    },
    {
      "q": "Is this a diagnosis?",
      "a": "No. This is an educational reflection tool based on common patterns of anxiety and rumination."
    }
  ]
};

/* should-we-break-up.js — weighted relationship decision-clarity test */
(function () {
  const SLUG = "should-we-break-up";
  const K = {
    stable: "stable-but-strained",
    repair: "repair-needs-proof",
    ambivalent: "ambivalent-and-depleted",
    mismatch: "persistent-mismatch",
    high: "high-relationship-strain"
  };

  window.TEST = {
    id: "breakup_clarity",
    slug: SLUG,
    title: "Should We Break Up? 20-Question Relationship Clarity Quiz",
    blurb: "Answer from the repeated pattern of the past 2–3 months, not the best day or the worst fight.",
    time: "4–5 min",
    intent: "quiz",
    keywords: [
      "should we break up quiz",
      "should i break up quiz",
      "should i stay or leave relationship quiz",
      "stay or leave relationship test",
      "is my relationship worth saving quiz",
      "should i break up with my boyfriend quiz",
      "should i break up with my girlfriend quiz",
      "relationship clarity quiz",
      "should we stay together"
    ],

    questions: [
      {
        text: "1) If the relationship stayed exactly like this for another year, what feeling comes up first?",
        options: [
          { label: "Mostly calm. There are issues, but the relationship still feels livable and mutual.", score: { emotional_cost: 0 }, tags: ["future_tolerable"] },
          { label: "Uneasy. I would need a few specific things to improve.", score: { emotional_cost: 1 }, tags: ["needs_change"] },
          { label: "Heavy. I can already feel how tired I would become.", score: { emotional_cost: 3 }, tags: ["depletion"] },
          { label: "Trapped or panicked. The idea of another year like this feels unbearable.", score: { emotional_cost: 4 }, tags: ["depletion", "decision_pressure"] }
        ]
      },
      {
        text: "2) After a painful argument, what usually happens once both of you calm down?",
        options: [
          { label: "We return, understand what happened, and something usually changes.", score: { repair_trust: 0 }, tags: ["repair_present"] },
          { label: "We reconnect, but the same issue sometimes comes back.", score: { repair_trust: 1 }, tags: ["partial_repair"] },
          { label: "We apologize or move on, but the pattern rarely changes.", score: { repair_trust: 3 }, tags: ["repair_without_change"] },
          { label: "There is little real repair—silence, blame, punishment, or another explosion.", score: { repair_trust: 4 }, tags: ["failed_repair", "high_conflict"] }
        ]
      },
      {
        text: "3) When you set a reasonable boundary or say no, how does your partner usually respond?",
        options: [
          { label: "They may not love it, but they respect it.", score: { respect_safety: 0 }, tags: ["boundary_respected"] },
          { label: "There is some pushback, but we can discuss it without punishment.", score: { respect_safety: 1 }, tags: ["boundary_friction"] },
          { label: "I am often guilted, mocked, pressured, or made responsible for their reaction.", score: { respect_safety: 3 }, tags: ["boundary_pressure"] },
          { label: "I sometimes avoid saying no because I am afraid of what will happen afterward.", score: { respect_safety: 4 }, tags: ["safety_signal", "fear_reaction"] }
        ]
      },
      {
        text: "4) If you stop initiating texts, plans, affection, or repair for a while, what happens?",
        options: [
          { label: "They naturally step in. The relationship does not depend on me carrying it.", score: { reciprocity: 0 }, tags: ["mutual_effort"] },
          { label: "They notice eventually, though I still initiate more.", score: { reciprocity: 1 }, tags: ["uneven_effort"] },
          { label: "The connection becomes noticeably quieter until I restart it.", score: { reciprocity: 3 }, tags: ["one_sided_effort"] },
          { label: "It mostly disappears unless they want attention, comfort, sex, or something from me.", score: { reciprocity: 4 }, tags: ["one_sided_effort", "convenience_contact"] }
        ]
      },
      {
        text: "5) When you are struggling emotionally, how much room is there for your experience?",
        options: [
          { label: "I can be honest and still feel cared for, even when they cannot fix it.", score: { reciprocity: 0 }, tags: ["responsive"] },
          { label: "They care, but support is inconsistent or awkward.", score: { reciprocity: 1 }, tags: ["partial_responsiveness"] },
          { label: "I often end up comforting them, minimizing myself, or handling it alone.", score: { reciprocity: 3 }, tags: ["one_sided_effort", "self_minimize"] },
          { label: "My distress is regularly dismissed, weaponized, or treated like an inconvenience.", score: { reciprocity: 4 }, tags: ["dismissal", "one_sided_effort"] }
        ]
      },
      {
        text: "6) How honest can you be about disappointment, needs, or hurt?",
        options: [
          { label: "Very honest. I do not have to manage their emotions before I speak.", score: { respect_safety: 0 }, tags: ["voice_safe"] },
          { label: "Mostly honest, though I choose my timing carefully.", score: { respect_safety: 1 }, tags: ["some_caution"] },
          { label: "I edit myself a lot because honesty often becomes conflict or withdrawal.", score: { respect_safety: 3 }, tags: ["walking_on_eggshells"] },
          { label: "I hide important feelings because openness can lead to retaliation, humiliation, or fear.", score: { respect_safety: 4 }, tags: ["safety_signal", "walking_on_eggshells"] }
        ]
      },
      {
        text: "7) When trust is damaged, what does rebuilding actually look like?",
        options: [
          { label: "The person who caused harm takes ownership and behaves differently over time.", score: { repair_trust: 0 }, tags: ["trust_rebuild"] },
          { label: "There is sincere effort, but consistency is still developing.", score: { repair_trust: 1 }, tags: ["partial_repair"] },
          { label: "There are apologies and promises, but I keep finding myself in the same doubt.", score: { repair_trust: 3 }, tags: ["repair_without_change"] },
          { label: "The harm is denied, reversed onto me, or repeated without meaningful accountability.", score: { repair_trust: 4 }, tags: ["failed_repair", "blame_shift"] }
        ]
      },
      {
        text: "8) Think of the last three times you raised the same important issue. What changed?",
        options: [
          { label: "Enough changed that I can see real learning.", score: { repair_trust: 0 }, tags: ["repair_present"] },
          { label: "Some things improved, but not as consistently as I need.", score: { repair_trust: 1 }, tags: ["partial_repair"] },
          { label: "We had good conversations, but behavior mostly returned to normal.", score: { repair_trust: 3 }, tags: ["repair_without_change"] },
          { label: "Almost nothing—or bringing it up made the situation worse.", score: { repair_trust: 4 }, tags: ["failed_repair"] }
        ]
      },
      {
        text: "9) Does this relationship make room for your growth—friends, work, interests, confidence, and identity?",
        options: [
          { label: "Yes. The relationship supports a full life for both of us.", score: { future_fit: 0 }, tags: ["growth_supported"] },
          { label: "Mostly, though we sometimes struggle with time or insecurity.", score: { future_fit: 1 }, tags: ["some_constraint"] },
          { label: "I have made myself smaller in important ways to keep the relationship stable.", score: { future_fit: 3 }, tags: ["self_abandonment"] },
          { label: "My independence, relationships, goals, or choices are regularly controlled or punished.", score: { future_fit: 4 }, tags: ["safety_signal", "control"] }
        ]
      },
      {
        text: "10) On the big future questions—commitment, children, money, location, lifestyle—where are you?",
        options: [
          { label: "Aligned enough, with differences we can realistically negotiate.", score: { future_fit: 0 }, tags: ["future_aligned"] },
          { label: "A few important things are unresolved, but both of us engage honestly.", score: { future_fit: 1 }, tags: ["future_unclear"] },
          { label: "There is a major mismatch we keep hoping will somehow disappear.", score: { future_fit: 3 }, tags: ["future_mismatch"] },
          { label: "Our futures point in different directions, and neither of us truly wants the other's version.", score: { future_fit: 4 }, tags: ["future_mismatch", "core_incompatibility"] }
        ]
      },
      {
        text: "11) When you get unexpected time away from your partner, what do you usually feel?",
        options: [
          { label: "Normal space. I enjoy it and still look forward to reconnecting.", score: { emotional_cost: 0 }, tags: ["healthy_space"] },
          { label: "A little relief, mostly because life is busy.", score: { emotional_cost: 1 }, tags: ["external_stress"] },
          { label: "Noticeable relief because I do not have to manage the relationship for a while.", score: { emotional_cost: 3 }, tags: ["depletion"] },
          { label: "My body feels safer, lighter, or more like myself when they are not around.", score: { emotional_cost: 4 }, tags: ["depletion", "body_relief"] }
        ]
      },
      {
        text: "12) What is doing the most work to keep you in the relationship right now?",
        options: [
          { label: "Love, respect, shared life, and a relationship I would still choose today.", score: { future_fit: 0 }, tags: ["active_choice"] },
          { label: "Love plus hope that a few real changes are possible.", score: { future_fit: 1 }, tags: ["hope_with_basis"] },
          { label: "History, investments, fear of regret, or not wanting to start over.", score: { future_fit: 3 }, tags: ["sunk_cost", "fear_based_staying"] },
          { label: "Fear—of loneliness, finances, their reaction, or what leaving would set in motion.", score: { future_fit: 4 }, tags: ["fear_based_staying", "decision_pressure"] }
        ]
      },
      {
        text: "13) Who carries the invisible work of keeping the relationship functioning?",
        options: [
          { label: "It is shared. We both notice problems and take responsibility.", score: { reciprocity: 0 }, tags: ["mutual_effort"] },
          { label: "I carry a bit more, but I can ask them to step in.", score: { reciprocity: 1 }, tags: ["uneven_effort"] },
          { label: "I do most of the remembering, initiating, soothing, planning, and repairing.", score: { reciprocity: 3 }, tags: ["one_sided_effort", "emotional_labor"] },
          { label: "I feel more like their manager, parent, therapist, or crisis system than their partner.", score: { reciprocity: 4 }, tags: ["one_sided_effort", "emotional_labor"] }
        ]
      },
      {
        text: "14) During disagreement, what happens to basic respect?",
        options: [
          { label: "It stays intact. We can be upset without attacking each other's dignity.", score: { respect_safety: 0 }, tags: ["respect_intact"] },
          { label: "We sometimes get defensive or sharp, but we repair it.", score: { respect_safety: 1 }, tags: ["respect_strain"] },
          { label: "Contempt, insults, ridicule, threats to leave, or cruel comments happen more than I want to admit.", score: { respect_safety: 3 }, tags: ["disrespect", "high_conflict"] },
          { label: "Conflict can include intimidation, blocking exits, destroying things, threats, or physical force.", score: { respect_safety: 4 }, tags: ["safety_high", "safety_signal"] }
        ]
      },
      {
        text: "15) When you see their name on your phone or hear them come home, what is your body's most common reaction lately?",
        options: [
          { label: "Mostly warmth, neutrality, or normal anticipation.", score: { emotional_cost: 0 }, tags: ["regulated"] },
          { label: "It depends on the day; stress is high, but connection is still there.", score: { emotional_cost: 1 }, tags: ["external_stress"] },
          { label: "Tension. I brace for a demand, mood, argument, or disappointment.", score: { emotional_cost: 3 }, tags: ["hypervigilance", "depletion"] },
          { label: "Dread, shutdown, or a strong wish to avoid contact.", score: { emotional_cost: 4 }, tags: ["depletion", "decision_pressure"] }
        ]
      },
      {
        text: "16) When you clearly ask for something reasonable more than once, what usually follows?",
        options: [
          { label: "They may not do it perfectly, but they participate and adjust.", score: { reciprocity: 0 }, tags: ["mutual_effort"] },
          { label: "There is effort, but I sometimes have to remind them.", score: { reciprocity: 1 }, tags: ["uneven_effort"] },
          { label: "I have to keep explaining why it matters before I get temporary change.", score: { reciprocity: 3 }, tags: ["one_sided_effort", "overfunction"] },
          { label: "My needs are repeatedly ignored unless there are consequences for them.", score: { reciprocity: 4 }, tags: ["one_sided_effort", "dismissal"] }
        ]
      },
      {
        text: "17) When your partner promises change after a serious conversation, what does the next month usually show?",
        options: [
          { label: "The promise becomes visible behavior, even if imperfectly.", score: { repair_trust: 0 }, tags: ["repair_present"] },
          { label: "Some follow-through, with a few slips we can address.", score: { repair_trust: 1 }, tags: ["partial_repair"] },
          { label: "A strong week or two, then the old pattern returns.", score: { repair_trust: 3 }, tags: ["repair_without_change"] },
          { label: "Promises mostly appear when I am close to giving up, then disappear.", score: { repair_trust: 4 }, tags: ["repair_without_change", "last_minute_promises"] }
        ]
      },
      {
        text: "18) If you met your partner today, knowing everything you know now, what feels most true?",
        options: [
          { label: "I would still choose the relationship, with normal human caveats.", score: { future_fit: 0 }, tags: ["active_choice"] },
          { label: "I probably would, but I would set clearer expectations earlier.", score: { future_fit: 1 }, tags: ["needs_change"] },
          { label: "I am not sure I would choose this version of the relationship again.", score: { future_fit: 3 }, tags: ["ambivalence"] },
          { label: "I know I would not choose this relationship as it currently exists.", score: { future_fit: 4 }, tags: ["core_incompatibility", "decision_pressure"] }
        ]
      },
      {
        text: "19) When you imagine asking for major change—or ending the relationship—what makes the decision hardest?",
        options: [
          { label: "The sadness of losing something meaningful, not fear of what they will do.", score: { emotional_cost: 0 }, tags: ["grief_not_fear"] },
          { label: "Uncertainty and grief. I do not want to make the wrong choice.", score: { emotional_cost: 1 }, tags: ["ambivalence"] },
          { label: "I worry I will collapse, regret it, or never find another relationship.", score: { emotional_cost: 3 }, tags: ["fear_based_staying", "decision_pressure"] },
          { label: "I worry about retaliation, stalking, threats, financial control, exposure, or physical safety.", score: { emotional_cost: 4 }, tags: ["safety_high", "safety_signal"] }
        ]
      },
      {
        text: "20) Which statement best describes safety and control in the relationship?",
        options: [
          { label: "I can disagree, leave a room, spend time with others, and make ordinary choices without fear.", score: { respect_safety: 0 }, tags: ["safety_clear"] },
          { label: "There can be jealousy or pressure, but I do not fear retaliation and I can hold boundaries.", score: { respect_safety: 1 }, tags: ["boundary_friction"] },
          { label: "There is monitoring, isolation, sexual pressure, financial control, threats, or intimidation that concerns me.", score: { respect_safety: 3 }, tags: ["safety_high", "safety_signal"] },
          { label: "There has been physical force, threats of serious harm, stalking, forced sex, weapon use, or I am afraid to leave safely.", score: { respect_safety: 4 }, tags: ["safety_high", "safety_signal", "immediate_safety"] }
        ]
      }
    ],

    modifiers: [
      {
        id: "one_sided_effort",
        title: "One-sided relationship labor",
        copy: "Several answers suggest you may be doing more of the initiating, soothing, planning, or repairing. The key question is whether responsibility can become genuinely shared.",
        when: { tag: "one_sided_effort", min: 2 }
      },
      {
        id: "repair_without_change",
        title: "Repair may be stopping at words",
        copy: "Your answers suggest that conversations or apologies may happen without enough lasting behavioral change. Measure repair by what becomes different afterward.",
        when: { tag: "repair_without_change", min: 2 }
      },
      {
        id: "fear_based_staying",
        title: "Fear may be influencing the decision",
        copy: "Part of the difficulty may come from fear of regret, loneliness, practical loss, or the consequences of leaving. Fear deserves compassion, but it is different from wanting the relationship as it is.",
        when: { tag: "fear_based_staying", min: 1 }
      },
      {
        id: "depletion",
        title: "Emotional depletion is prominent",
        copy: "Your answers suggest the relationship may be costing substantial emotional energy. Before interpreting that as proof love is gone, notice whether rest and shared responsibility restore any warmth.",
        when: { tag: "depletion", min: 2 }
      }
    ],

    results: {
      [K.stable]: {
        title: "Stable Foundation, Specific Strain",
        subtitle: "Your answers show relatively low relationship strain, with some areas still worth naming.",
        summary: "Your pattern suggests that the relationship still contains meaningful safety, reciprocity, repair, and future fit. That does not mean you must stay or that every concern is small. It means the breakup question may be concentrated around specific stressors rather than broad relationship breakdown.",
        bullets: [
          "The relationship appears to retain a workable foundation.",
          "Problems may be more specific than global.",
          "Your strongest concern dimension still deserves direct attention."
        ],
        what_it_looks_like: [
          "You can usually speak honestly without losing basic respect.",
          "Repair tends to lead to some behavioral change.",
          "You still recognize a relationship you would choose, not only a history you feel trapped by."
        ],
        blindspots: [
          "Using a low score to talk yourself out of a concern that matters deeply to you.",
          "Assuming 'mostly good' means a recurring mismatch never needs to be addressed."
        ],
        scripts: [
          "“I don’t think everything is wrong, but this one pattern matters to me. Can we work on it specifically?”",
          "“I want to protect what is good here by dealing with what keeps repeating.”",
          "“Can we choose one concrete change and check in again in two weeks?”"
        ],
        next_steps: [
          "Focus on the highest-scoring dimension instead of reopening the entire relationship.",
          "Choose one observable change rather than a vague promise.",
          "Reassess whether the concern becomes easier, safer, and less repetitive."
        ]
      },
      [K.repair]: {
        title: "Repair Needs Proof",
        subtitle: "There is enough connection to matter—and enough strain that words alone are no longer enough.",
        summary: "Your answers suggest a relationship with real strengths but recurring gaps in repair, reciprocity, trust, or future fit. The important question is not whether you can have another good conversation. It is whether clear conversations reliably change the pattern.",
        bullets: [
          "The relationship may be workable, but not on autopilot.",
          "Several concerns need behavioral follow-through.",
          "Hope is most useful when it can be tested against actions."
        ],
        what_it_looks_like: [
          "Good periods can make the harder pattern easy to minimize.",
          "You may know exactly what needs to improve but remain unsure whether it will.",
          "The decision often feels postponed rather than resolved."
        ],
        blindspots: [
          "Counting sincere apologies as repair before behavior changes.",
          "Extending the timeline indefinitely because the potential feels convincing."
        ],
        scripts: [
          "“I want to know whether we can change this, not just talk about changing it.”",
          "“For me, improvement would look like ____. Can we agree on that specifically?”",
          "“I’m willing to work on us, but I need the work to be mutual and visible.”"
        ],
        next_steps: [
          "Pick one or two measurable relationship changes and define what follow-through means.",
          "Use a realistic reassessment window rather than an endless promise cycle.",
          "Pay special attention to your two highest concern dimensions."
        ]
      },
      [K.ambivalent]: {
        title: "Ambivalent & Depleted",
        subtitle: "Your uncertainty may be coming from both attachment to the relationship and substantial emotional cost.",
        summary: "Your answers suggest that this is not a simple 'good relationship versus bad relationship' question. You may still care deeply while also feeling tired, doubtful, or less able to keep adapting. Ambivalence is information: part of you sees reasons to stay, while another part is asking for a different reality.",
        bullets: [
          "The relationship is taking meaningful emotional energy.",
          "Your reasons for staying and your reasons for leaving may both feel real.",
          "Clarity may require less rumination and more observation of what actually changes."
        ],
        what_it_looks_like: [
          "You can remember the good and still feel relief when you get space.",
          "You may alternate between hope after closeness and doubt after the same pattern repeats.",
          "The decision feels emotionally expensive because neither option feels simple."
        ],
        blindspots: [
          "Treating indecision as proof you should wait forever.",
          "Mistaking fear of loss for evidence that the relationship is working."
        ],
        scripts: [
          "“I’m not asking us to solve everything tonight. I need us to name what is actually not working.”",
          "“I care about you, and I’m also depleted. Both things are true.”",
          "“I need to see whether this pattern can change in behavior, not only intention.”"
        ],
        next_steps: [
          "Separate love, practical investment, fear, and current relationship quality into different questions.",
          "Track whether effort and repair become more mutual over the next meaningful period.",
          "Consider individual or couples support if it is safe and both people can speak freely."
        ]
      },
      [K.mismatch]: {
        title: "Persistent Mismatch",
        subtitle: "Your answers suggest that the difficulty may be broader than a temporary rough patch.",
        summary: "Several areas of the relationship appear strained at the same time. The pattern may involve repeated unmet needs, incompatible futures, one-sided effort, or repair that does not hold. This result does not tell you to leave. It does suggest that continuing the relationship unchanged is unlikely to resolve the question by itself.",
        bullets: [
          "Concern appears across more than one relationship dimension.",
          "You may be adapting more than the relationship is adapting.",
          "The current pattern deserves a serious, reality-based decision process."
        ],
        what_it_looks_like: [
          "You have probably had versions of the same conversation before.",
          "The relationship may rely heavily on your hope, labor, or tolerance.",
          "Imagining the future as-is feels more draining than reassuring."
        ],
        blindspots: [
          "Waiting for certainty that may never arrive before allowing yourself to make a choice.",
          "Comparing the current relationship to its best period instead of its repeated present pattern."
        ],
        scripts: [
          "“I don’t want another circular conversation. I need us to decide whether these changes are genuinely possible.”",
          "“I’m looking at the pattern now, not only our intentions.”",
          "“If our core needs or futures do not fit, I want us to be honest rather than keep hurting each other.”"
        ],
        next_steps: [
          "Identify which concerns are repair problems and which are genuine incompatibilities.",
          "Get clear on what would have to change for staying to feel like an active choice.",
          "If safety is not a concern, consider a structured decision conversation or qualified relationship support."
        ]
      },
      [K.high]: {
        title: "High Relationship Strain",
        subtitle: "Your answers show broad, repeated strain. This deserves support and a decision process grounded in reality, not pressure.",
        summary: "Your response pattern suggests substantial difficulty across multiple relationship areas. You may be carrying high emotional cost while trust, repair, reciprocity, respect, or future fit are also under pressure. A high score is not an instruction to break up, and a lower score would not obligate you to stay. It is a sign that the current pattern deserves serious attention.",
        bullets: [
          "Strain appears broad rather than limited to one small issue.",
          "The relationship may be requiring more adaptation than it is providing restoration.",
          "Safety concerns, if present, take priority over the overall score."
        ],
        what_it_looks_like: [
          "You may feel tired of explaining the same concerns.",
          "Hope may depend heavily on a future version of the relationship.",
          "Your body, boundaries, or sense of self may be signaling that the current system is costly."
        ],
        blindspots: [
          "Believing you need one final dramatic event before your concerns count.",
          "Treating sunk costs, history, or fear as the same thing as present-day relationship fit."
        ],
        scripts: [
          "“I need to make decisions based on the relationship we actually have, not only the one we hoped to build.”",
          "“I’m no longer willing to carry this pattern by myself.”",
          "“I need space and support to think clearly about what is sustainable for me.”"
        ],
        next_steps: [
          "Do not make a high-stakes decision from the middle of an escalating fight.",
          "Write down the repeated behaviors, attempted repairs, and what has or has not changed.",
          "If there is fear, coercion, control, stalking, threats, or violence, prioritize private safety support over a joint repair conversation."
        ]
      }
    },

    faq: [
      {
        q: "Can a quiz really tell me whether we should break up?",
        a: "No. This quiz is designed to organize repeated relationship evidence across respect, repair, reciprocity, emotional cost, and future fit. It cannot make the decision for you."
      },
      {
        q: "What does the Relationship Strain Score mean?",
        a: "It is a weighted reflection score from 0 to 100 based on your answers. It is not a breakup probability, clinical cutoff, or prediction of whether the relationship will last."
      },
      {
        q: "What if my score is low but I still want to leave?",
        a: "You do not need a high score or a diagnosis to end a relationship. The score summarizes the questions in this tool; it does not override your values, preferences, or lived experience."
      },
      {
        q: "What if my score is high but I still love my partner?",
        a: "Love and relationship strain can coexist. A high score means several areas deserve serious attention; it does not tell you what choice to make."
      },
      {
        q: "What if there is controlling or frightening behavior?",
        a: "Safety concerns are separated from the ordinary relationship score. Fear, coercion, stalking, threats, forced sex, or physical violence deserve support regardless of the total."
      },
      {
        q: "Is this a scientifically validated breakup test?",
        a: "No. It is an original, research-informed educational self-reflection tool. The dimensions are informed by relationship research, but this specific questionnaire has not been psychometrically validated."
      }
    ]
  };
})();
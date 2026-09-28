/* relationship-trauma.js — original 15-question self-reflection assessment */
(function () {
  const SLUG = "relationship-trauma";

  const R = {
    steady: "steady_recovery",
    lingering: "lingering_triggers",
    protective: "protective_patterns_active",
    shaping: "past_shaping_present",
    high: "high_trauma_related_impact"
  };

  const S = {
    impact: "impact",
    vigilance: "hypervigilance",
    selfTrust: "self_trust",
    conflict: "conflict_boundary",
    intimacy: "intimacy",
    carryover: "carryover"
  };

  const option = (label, points, dim, tags=[]) => ({
    label,
    score: {
      [S.impact]: points,
      [dim]: points
    },
    tags
  });

  window.TEST = {
    id: "relationship_trauma",
    slug: SLUG,
    title: "Relationship Trauma Test: Is Your Past Relationship Still Affecting You?",
    blurb:
      "15 psychologically nuanced scenarios exploring hypervigilance, self-trust, conflict, intimacy, and how a past relationship may still shape the present. Educational self-reflection only.",
    time: "3–4 min",
    intent: "quiz",
    guide: "/blog/relationship-trauma/",
    keywords: [
      "relationship trauma test",
      "relationship trauma quiz",
      "am i traumatized from my relationship",
      "relationship PTSD test",
      "past relationship affecting new relationship",
      "trauma after toxic relationship",
      "trust issues after toxic relationship",
      "relationship trauma symptoms",
      "healing from relationship trauma",
      "trauma from a relationship"
    ],

    questions: [
      {
        text: "1) Someone close to you gets quieter than usual. Before you know why, what happens inside you?",
        options: [
          option("I notice the change, but I wait for context before giving it meaning.", 0, S.vigilance, ["grounded_context"]),
          option("I get a little alert, then remind myself that quiet can mean many things.", 1, S.vigilance, ["brief_alert"]),
          option("My body tightens and I start reading their face, tone, and movements for clues.", 2, S.vigilance, ["body_alarm","scanning"]),
          option("I immediately prepare for anger, blame, withdrawal, or something going wrong.", 3, S.vigilance, ["body_alarm","threat_expectation"])
        ]
      },
      {
        text: "2) After a disagreement, how easy is it to trust your own memory of what happened?",
        options: [
          option("I can trust my memory while still being open to another perspective.", 0, S.selfTrust, ["self_trust"]),
          option("I replay parts of it, but I can usually settle on what I experienced.", 1, S.selfTrust, ["replay"]),
          option("I often need someone else to confirm that my interpretation was reasonable.", 2, S.selfTrust, ["external_validation","self_doubt"]),
          option("I quickly assume I must have misunderstood, exaggerated, or caused the problem.", 3, S.selfTrust, ["self_doubt","reality_confusion"])
        ]
      },
      {
        text: "3) You need to say no to a reasonable request. What is most like your first response?",
        options: [
          option("I can say no respectfully without feeling that the relationship is at risk.", 0, S.conflict, ["boundary_secure"]),
          option("I feel guilty, but I can still hold the boundary.", 1, S.conflict, ["boundary_discomfort"]),
          option("I over-explain, apologize, or soften the no until it barely sounds like a boundary.", 2, S.conflict, ["appease","over_explain"]),
          option("I usually say yes because anger, withdrawal, or disappointment feels too dangerous.", 3, S.conflict, ["appease","boundary_fear"])
        ]
      },
      {
        text: "4) A person who has been consistently kind wants to know you more deeply. How does closeness feel?",
        options: [
          option("Warm and vulnerable, but basically safe.", 0, S.intimacy, ["closeness_safe"]),
          option("Good, though I need a slower pace than I once did.", 1, S.intimacy, ["slow_trust"]),
          option("Part of me wants it while another part looks for an exit or a reason not to trust it.", 2, S.intimacy, ["closeness_guard","approach_avoid"]),
          option("The safer they become, the more exposed or trapped I can feel.", 3, S.intimacy, ["closeness_guard","intimacy_threat"])
        ]
      },
      {
        text: "5) A current or new person takes longer than expected to reply on a busy day. What tends to happen?",
        options: [
          option("I mostly interpret it through the current situation, not my past relationship.", 0, S.carryover, ["present_based"]),
          option("The past flashes through my mind, but it does not decide what I do next.", 1, S.carryover, ["past_echo"]),
          option("I compare the silence to my ex or old relationship and start seeking reassurance.", 2, S.carryover, ["past_present_overlap","reassurance"]),
          option("The current silence feels emotionally identical to the old silence, and I react as if the old pattern is happening again.", 3, S.carryover, ["past_present_overlap","timeline_blur"])
        ]
      },
      {
        text: "6) Things have been calm for a while. What does calm feel like in your body?",
        options: [
          option("Mostly restful. I do not need a crisis to explain the quiet.", 0, S.vigilance, ["calm_safe"]),
          option("Pleasant, with an occasional thought that something could change.", 1, S.vigilance, ["mild_bracing"]),
          option("Hard to trust. Part of me keeps checking for the problem I may be missing.", 2, S.vigilance, ["body_alarm","bracing"]),
          option("Like the pause before something bad happens. Relaxing itself feels unsafe.", 3, S.vigilance, ["body_alarm","calm_threat"])
        ]
      },
      {
        text: "7) You make an ordinary choice for yourself—seeing friends, spending money, taking time alone. What follows?",
        options: [
          option("I can make the choice without automatically preparing a defense.", 0, S.selfTrust, ["autonomy"]),
          option("I briefly wonder how it will be received, then move on.", 1, S.selfTrust, ["approval_check"]),
          option("I mentally prepare an explanation even if nobody asked for one.", 2, S.selfTrust, ["over_explain","self_doubt"]),
          option("I feel as if I need permission or proof that I am not doing something wrong.", 3, S.selfTrust, ["permission_seeking","self_doubt"])
        ]
      },
      {
        text: "8) Someone is upset with you but stays respectful. What does your nervous system want you to do?",
        options: [
          option("Stay present, listen, and respond without treating the conflict as an emergency.", 0, S.conflict, ["conflict_tolerance"]),
          option("I tense up, but I can still think and speak for myself.", 1, S.conflict, ["conflict_tension"]),
          option("I rush to fix it, take blame, or make them feel better before I know what I actually think.", 2, S.conflict, ["appease","repair_urgency"]),
          option("I freeze, shut down, agree quickly, or abandon my point just to make the tension stop.", 3, S.conflict, ["appease","freeze"])
        ]
      },
      {
        text: "9) When affection or intimacy is offered without pressure, how easy is it to receive?",
        options: [
          option("I can choose closeness or space based on what I genuinely want in the moment.", 0, S.intimacy, ["choice"]),
          option("I can receive it, though I sometimes need more time to settle into it.", 1, S.intimacy, ["paced_closeness"]),
          option("I may want the closeness and still feel guarded, numb, or watchful while it is happening.", 2, S.intimacy, ["closeness_guard","split_response"]),
          option("Being emotionally or physically close can trigger a strong urge to disconnect even when I see no current red flag.", 3, S.intimacy, ["closeness_guard","withdraw"])
        ]
      },
      {
        text: "10) A current person does something that resembles your ex or past partner—but the context is different. What happens?",
        options: [
          option("I notice the resemblance and judge the current behavior on its own pattern.", 0, S.carryover, ["present_based"]),
          option("I get cautious and ask a question before deciding what it means.", 1, S.carryover, ["reality_check"]),
          option("I assume the old motive may be present until the current person proves otherwise.", 2, S.carryover, ["past_present_overlap","motive_projection"]),
          option("My emotional reaction arrives as if the old relationship has returned, even when my mind knows this is a different person.", 3, S.carryover, ["past_present_overlap","timeline_blur"])
        ]
      },
      {
        text: "11) A sound, phrase, place, or kind of silence reminds you of the past relationship. How strongly does it pull you out of the present?",
        options: [
          option("I notice the memory without losing the current moment.", 0, S.vigilance, ["memory_integrated"]),
          option("I feel a brief emotional jolt, then recover.", 1, S.vigilance, ["brief_trigger"]),
          option("My body reacts strongly and I need time to feel present again.", 2, S.vigilance, ["body_alarm","trigger_response"]),
          option("The reminder can derail my mood, attention, sleep, or sense of safety for a meaningful stretch of time.", 3, S.vigilance, ["body_alarm","functional_impact"])
        ]
      },
      {
        text: "12) When your interpretation of a situation differs from someone else's, what is most familiar?",
        options: [
          option("I can hold my view and still consider theirs.", 0, S.selfTrust, ["self_trust"]),
          option("I question myself, but I do not automatically erase my own experience.", 1, S.selfTrust, ["healthy_doubt"]),
          option("I often assume I am being too sensitive, dramatic, or difficult.", 2, S.selfTrust, ["self_doubt","shame"]),
          option("Without outside validation, I struggle to know whether my own perception is trustworthy at all.", 3, S.selfTrust, ["self_doubt","reality_confusion"])
        ]
      },
      {
        text: "13) You bring up something that hurt you, and the other person asks for an hour to cool down before continuing. What is your first impulse?",
        options: [
          option("Agree on when to return to the conversation and let the pause be a pause.", 0, S.conflict, ["repair_secure"]),
          option("Feel uneasy, but I can tolerate the break if there is a clear return time.", 1, S.conflict, ["repair_uncertainty"]),
          option("Retract what I said, apologize, or chase reassurance so the distance ends faster.", 2, S.conflict, ["appease","reassurance"]),
          option("Abandon the issue because any pause feels like punishment, rejection, or the start of being shut out.", 3, S.conflict, ["appease","withdrawal_fear"])
        ]
      },
      {
        text: "14) A healthy relationship feels calmer and less intense than the relationship that hurt you. How does that land?",
        options: [
          option("Calm feels valuable. I do not need emotional whiplash to feel connection.", 0, S.intimacy, ["calm_connection"]),
          option("It feels unfamiliar, but I can let consistency become attractive over time.", 1, S.intimacy, ["learning_safety"]),
          option("Part of me reads calm as flat, suspicious, or emotionally unreal.", 2, S.intimacy, ["closeness_guard","intensity_familiarity"]),
          option("I find myself withdrawing from steadiness or craving intensity because calm does not register as love.", 3, S.intimacy, ["closeness_guard","intensity_pull"])
        ]
      },
      {
        text: "15) Which sentence best describes the past relationship's influence on your life today?",
        options: [
          option("It is part of my history, but it does not organize most of my current choices or relationships.", 0, S.carryover, ["integrated_past"]),
          option("Certain triggers still appear, but I usually recover without changing how I live.", 1, S.carryover, ["past_echo"]),
          option("It still shapes my trust, boundaries, conflict reactions, or closeness more than I want it to.", 2, S.carryover, ["past_present_overlap","ongoing_cost"]),
          option("A meaningful part of my relationships or daily wellbeing is still organized around preventing what happened from happening again.", 3, S.carryover, ["past_present_overlap","functional_impact"])
        ]
      }
    ],

    inconsistency_rules: [
      { a: "calm_safe", b: "calm_threat" },
      { a: "self_trust", b: "reality_confusion" },
      { a: "closeness_safe", b: "intimacy_threat" }
    ],

    modifiers: [
      {
        id: "body_alarm",
        title: "Your body alarm is doing a lot of the work",
        copy: "Several answers suggest your physical threat response may activate before you have enough present-day evidence to decide what is happening.",
        when: { tag: "body_alarm", min: 2 }
      },
      {
        id: "self_doubt",
        title: "Self-trust looks like a key recovery target",
        copy: "Your answers repeatedly point toward second-guessing memory, perception, or ordinary autonomy after relational stress.",
        when: { tag: "self_doubt", min: 2 }
      },
      {
        id: "appease",
        title: "Appeasing may be your fastest route out of tension",
        copy: "You may reduce conflict by shrinking, over-explaining, apologizing early, or dropping the issue before you know what you actually think.",
        when: { tag: "appease", min: 2 }
      },
      {
        id: "closeness_guard",
        title: "Closeness still carries some threat",
        copy: "Several answers suggest that intimacy can activate protection even when the current person appears respectful and safe.",
        when: { tag: "closeness_guard", min: 2 }
      },
      {
        id: "past_present_overlap",
        title: "The past and present are blending under stress",
        copy: "Current cues may be acquiring old meanings quickly, which can make a new situation feel more dangerous than its present evidence supports.",
        when: { tag: "past_present_overlap", min: 2 }
      }
    ],

    results: {
      [R.steady]: {
        title: "Steadier Ground — The Past Is Part of Your Story, Not the Driver",
        subtitle: "Your answers suggest that most present-day situations are staying in the present.",
        summary: "You may still carry memories, sensitivity, or a few specific triggers, but your answers suggest that the past relationship is not organizing most of your current trust, boundaries, intimacy, or conflict responses. This does not mean nothing happened or that you should be 'over it.' It means your current system appears able to use present evidence more often than old threat rules.",
        bullets: [
          "You can usually separate a current cue from its old meaning.",
          "Your boundaries and self-trust remain available under ordinary stress.",
          "Closeness may still be vulnerable without automatically feeling dangerous."
        ],
        what_it_looks_like: [
          "A delayed reply can be annoying without becoming a relationship emergency.",
          "Conflict can stay uncomfortable without turning into automatic appeasing.",
          "You can remember the past without treating every resemblance as repetition."
        ],
        blindspots: [
          "A low-impact result does not prove every current relationship is safe.",
          "Specific triggers can still matter even when the overall pattern is steady.",
          "Do not minimize real harm simply because you are functioning well now."
        ],
        scripts: [
          "“That reminded me of something old, but I want to check what is actually happening here.”",
          "“I need a little time to notice whether this is a present concern or an old alarm.”",
          "“I can be open to your perspective without giving up my own.”"
        ],
        next_steps: [
          "Keep choosing people whose behavior stays consistent across time and conflict.",
          "Protect the self-trust and boundaries you have rebuilt.",
          "Use specific triggers as information rather than evidence that recovery has failed."
        ],
        cautions: ["This result is descriptive, not a clinical clearance or trauma diagnosis."]
      },

      [R.lingering]: {
        title: "Lingering Triggers — The Past Still Echoes in Specific Moments",
        subtitle: "Most of your life may feel present-day, but certain cues still open an older emotional file.",
        summary: "Your answers suggest a pattern of context-dependent triggers rather than a past relationship controlling everything. You may be mostly grounded until a particular kind of silence, anger, distance, tone, or closeness resembles what once happened. The useful work here is not erasing the memory. It is helping your system learn which similarities matter and which are only similarities.",
        bullets: [
          "Triggers appear in recognizable situations rather than everywhere.",
          "You often recover, but some cues take more effort than you want.",
          "The strongest growth edge is separating resemblance from current evidence."
        ],
        what_it_looks_like: [
          "A calm relationship can feel good until one familiar cue appears.",
          "You may need extra reassurance after specific reminders.",
          "You can usually return to the present once you slow the reaction down."
        ],
        blindspots: [
          "Calling every reaction 'just a trigger' can make you ignore real current red flags.",
          "A trigger is not proof that you secretly want the past relationship back.",
          "Recovery can be uneven without being fake."
        ],
        scripts: [
          "“This hit an old nerve. I do not need you to fix it, but I want to slow down before I interpret it.”",
          "“Can we separate what happened just now from what I am afraid it means?”",
          "“I want to stay in this conversation; I may need a few minutes for my body to catch up.”"
        ],
        next_steps: [
          "Track the two or three cues that activate you most strongly.",
          "Write what the cue meant then versus what the evidence shows now.",
          "Consider professional support if specific triggers are intense, persistent, or disruptive."
        ],
        cautions: ["This test cannot determine whether a reaction meets criteria for PTSD."]
      },

      [R.protective]: {
        title: "Protective Patterns Active — Old Safety Rules Are Still Working",
        subtitle: "Your responses suggest that protection is showing up across several parts of relationship life.",
        summary: "Your answers suggest that the past relationship may still be influencing how you manage closeness, disagreement, autonomy, and uncertainty. The pattern is not simply 'being anxious.' It may involve learned safety strategies: scanning first, explaining early, shrinking needs, staying ready for punishment, or keeping part of yourself out of reach. Those strategies may once have reduced danger or conflict. The question now is where they are still useful and where they are costing you.",
        bullets: [
          "Protection appears across more than one relationship dimension.",
          "Appeasing, scanning, or guarding may happen before reflective choice.",
          "The present may feel safer than your nervous system expects it to be."
        ],
        what_it_looks_like: [
          "You may know someone is different while still reacting as if difference is temporary.",
          "Boundaries can feel riskier than they objectively are.",
          "You may want closeness and protect yourself from it at the same time."
        ],
        blindspots: [
          "Do not force vulnerability simply to prove you are healed.",
          "Protective behavior is not the same as weakness or manipulation.",
          "Some current relationships are genuinely inconsistent; recovery should increase reality-testing, not blind trust."
        ],
        scripts: [
          "“My first instinct is to apologize and drop this. I want to stay with what I actually need instead.”",
          "“I am noticing an old safety rule here. Can we slow the conversation down?”",
          "“Consistency helps me trust what is happening more than reassurance alone.”"
        ],
        next_steps: [
          "Identify the safety rule behind your strongest dimension.",
          "Practice one small boundary in a low-stakes situation each week.",
          "If the pattern repeatedly limits intimacy or daily functioning, consider trauma-informed professional support."
        ],
        cautions: ["The score reflects this original quiz only; it is not a validated trauma severity scale."]
      },

      [R.shaping]: {
        title: "Past Relationship Still Shaping the Present — The Old Rules Have Real Reach",
        subtitle: "Your answers suggest that the previous relationship is influencing multiple current reactions and choices.",
        summary: "Your responses suggest that the aftereffects of the past relationship are not limited to occasional reminders. They may be shaping how you read danger, trust yourself, handle conflict, receive closeness, or judge new people. That does not tell us which diagnosis—if any—fits. It does tell us the pattern deserves more than 'just move on.' Recovery may require rebuilding both internal safety and a reliable method for evaluating present-day relationships.",
        bullets: [
          "The past appears to influence several areas of current relationship functioning.",
          "Threat detection may be outrunning present-day evidence.",
          "Self-trust and relational safety may need to be rebuilt together."
        ],
        what_it_looks_like: [
          "Current people can be asked to answer for things they did not do.",
          "You may abandon needs quickly when tension appears.",
          "Calm, trust, or intimacy may feel unfamiliar enough to trigger protection."
        ],
        blindspots: [
          "A high quiz score cannot tell whether you have PTSD or complex PTSD.",
          "Do not turn recovery into a demand to trust unsafe people.",
          "Shame about still being affected can become a second injury layered over the first."
        ],
        scripts: [
          "“Part of my reaction belongs to the past, and part may belong to now. I want to separate them before we decide what this means.”",
          "“I need a clear return time if we pause this conversation; unexplained silence is difficult for me.”",
          "“I am working on not abandoning my own perception when someone sees things differently.”"
        ],
        next_steps: [
          "Consider a licensed trauma-informed clinician if the pattern is persistent or impairing.",
          "Track current evidence separately from trauma-linked predictions.",
          "Build relationships around consistency, accountability, and boundaries—not intensity."
        ],
        cautions: ["If you are currently unsafe, prioritize real-world safety support over self-reflection scoring."]
      },

      [R.high]: {
        title: "High Trauma-Related Impact — The Past Is Still Costing You in the Present",
        subtitle: "Your responses suggest a broad and persistent carryover pattern that deserves careful support.",
        summary: "Your answers suggest that a past relationship may still be affecting several important areas at once: threat sensitivity, trust in your own perception, conflict, boundaries, closeness, and the ability to experience new relationships as genuinely new. This result is not a PTSD diagnosis and does not measure trauma severity clinically. It does indicate that the impact you selected is substantial enough that professional assessment could be useful—especially if sleep, concentration, work, daily functioning, or relationships are being disrupted.",
        bullets: [
          "The aftereffects appear broad rather than limited to one trigger.",
          "Protective reactions may be shaping daily choices and relationship behavior.",
          "The cost to trust, closeness, or functioning may be significant."
        ],
        what_it_looks_like: [
          "Your body may react before you have enough present-day information.",
          "Self-protection can become the default even with respectful people.",
          "A large share of relationship energy may go into preventing a repetition of the past."
        ],
        blindspots: [
          "This result cannot diagnose PTSD, complex PTSD, anxiety, or depression.",
          "Do not use the score as proof that one past person caused every current difficulty.",
          "If you are in ongoing danger, safety planning comes before deeper emotional processing."
        ],
        scripts: [
          "“I am more activated than this moment alone explains. I need to pause without disappearing.”",
          "“I want support separating what happened then from what is happening now.”",
          "“I am not ready to make this a relationship verdict; I need to understand the reaction first.”"
        ],
        next_steps: [
          "Consider a licensed mental-health professional experienced with trauma and relationship abuse.",
          "If danger, stalking, coercion, or violence is current, contact trusted local support or emergency services as appropriate.",
          "Reduce shame: persistent protection is a signal to investigate, not a moral failure."
        ],
        cautions: ["This is an original educational assessment, not a clinical screening instrument."]
      }
    },

    faq: [
      {
        q: "Is this a PTSD test?",
        a: "No. It is an original relationship.sbs self-reflection assessment about lingering relationship effects. It does not apply DSM or ICD diagnostic criteria and cannot diagnose PTSD."
      },
      {
        q: "What does the relationship trauma test measure?",
        a: "It looks at five areas: hypervigilance, self-trust, conflict and boundary fear, intimacy, and carryover from a past relationship into present relationships."
      },
      {
        q: "Is relationship trauma the same as a trauma bond?",
        a: "No. Trauma bonding describes attachment to someone who is harming you. Relationship trauma is a broader phrase for lingering effects that may remain after a harmful or destabilizing relationship."
      },
      {
        q: "What if I am still in the relationship that is hurting me?",
        a: "This test is designed mainly around lingering impact. If harm, coercion, threats, stalking, or violence are current, prioritize safety and real-world support rather than using a quiz score to decide what is happening."
      },
      {
        q: "Can a healthy new relationship still trigger old reactions?",
        a: "Yes. A present situation can resemble an older harmful pattern without being the same pattern. The goal is to compare current evidence with the old meaning rather than automatically choosing either one."
      }
    ]
  };
})();
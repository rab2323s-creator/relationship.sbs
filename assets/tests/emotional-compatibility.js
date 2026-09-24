/* emotional-compatibility.js — relationship-level self-reflection test */
(function () {
  const SLUG = "emotional-compatibility";
  const K = {
    aligned: "emotionally_aligned",
    adaptable: "different_but_adaptable",
    reassureSpace: "reassurance_space_mismatch",
    outOfSync: "emotionally_out_of_sync",
    chronic: "chronic_emotional_mismatch"
  };

  window.TEST = {
    id: "emotional_compatibility",
    slug: SLUG,
    title: "Emotional Compatibility Test: Do Your Emotional Needs Fit?",
    blurb: "15 relationship scenarios exploring responsiveness, reassurance vs space, communication, repair, vulnerability pace, and support under stress.",
    time: "3–4 min",
    intent: "quiz",
    keywords: [
      "emotional compatibility test",
      "emotional compatibility quiz",
      "are we emotionally compatible",
      "relationship compatibility test",
      "emotional compatibility in relationships",
      "emotional needs compatibility test",
      "how emotionally compatible are we",
      "couples compatibility test"
    ],
    modifiers: [
      {
        id: "reassurance_space_gap",
        title: "Reassurance–Space Gap",
        copy: "One of you may look for closeness when stressed while the other needs room first. The issue is not whose need is right; it is whether you can agree on a reliable return-to-connection plan.",
        when: { tag: "reassurance_space_gap", min: 2 }
      },
      {
        id: "repair_gap",
        title: "Repair Gap",
        copy: "Conflict may be less of a problem than what happens afterward. Your answers suggest that apology, accountability, or reconnection may not land the same way for both of you.",
        when: { tag: "repair_gap", min: 2 }
      },
      {
        id: "responsiveness_gap",
        title: "Responsiveness Gap",
        copy: "One partner may not consistently feel understood, cared for, or taken seriously when something important is shared. Small responsive acts can matter more than perfect advice.",
        when: { tag: "responsiveness_gap", min: 2 }
      },
      {
        id: "stress_support_gap",
        title: "Stress-Support Gap",
        copy: "The way one person gives support under pressure may not match what the other person can actually receive. Compatibility improves when support is negotiated instead of guessed.",
        when: { tag: "stress_support_gap", min: 2 }
      },
      {
        id: "vulnerability_pace_gap",
        title: "Vulnerability-Pace Gap",
        copy: "You may open up at different speeds. That can work when the slower pace is respected and the faster pace is not shamed or left indefinitely without clarity.",
        when: { tag: "vulnerability_pace_gap", min: 2 }
      },
      {
        id: "communication_translation_gap",
        title: "Communication Translation Gap",
        copy: "You may care about each other but encode emotion differently. Direct requests and reflection-back can reduce the amount of mind-reading required.",
        when: { tag: "communication_translation_gap", min: 2 }
      }
    ],
    questions: [
      {
        text: "1) After a hard day, one of you needs emotional support. What usually happens?",
        options: [
          { label: "The need is noticed, and support is adjusted to what actually helps.", score: { [K.aligned]: 4 }, tags: ["responsiveness"] },
          { label: "Your instincts differ, but you can say what helps and the other person adjusts.", score: { [K.adaptable]: 4 }, tags: ["adaptation"] },
          { label: "One reaches for closeness while the other wants space, and both feel misunderstood.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","stress_support_gap"] },
          { label: "Support is offered, but it often misses the need and leaves one person feeling alone.", score: { [K.outOfSync]: 4 }, tags: ["responsiveness_gap","stress_support_gap"] },
          { label: "Important feelings are repeatedly dismissed, avoided, or treated like too much.", score: { [K.chronic]: 4 }, tags: ["responsiveness_gap","chronic_unmet"] }
        ]
      },
      {
        text: "2) After conflict, one person needs time before talking. The other wants repair sooner. How does that go?",
        options: [
          { label: "Space has a clear return time, so neither person feels abandoned or trapped.", score: { [K.aligned]: 4 }, tags: ["repair"] },
          { label: "The timing is different, but you usually negotiate a plan that works.", score: { [K.adaptable]: 4 }, tags: ["adaptation","repair"] },
          { label: "The more one asks for repair, the more the other pulls away.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","repair_gap"] },
          { label: "You eventually talk, but the timing mismatch creates repeated frustration.", score: { [K.outOfSync]: 4 }, tags: ["repair_gap"] },
          { label: "Repair is routinely avoided or one person must swallow the issue to restore peace.", score: { [K.chronic]: 4 }, tags: ["repair_gap","chronic_unmet"] }
        ]
      },
      {
        text: "3) You share something vulnerable that feels hard to say. The response is usually…",
        options: [
          { label: "Curious and respectful. You feel understood even if the answer is not perfect.", score: { [K.aligned]: 4 }, tags: ["responsiveness","vulnerability"] },
          { label: "A little awkward at first, but there is genuine effort to understand.", score: { [K.adaptable]: 4 }, tags: ["adaptation","vulnerability"] },
          { label: "One person wants immediate closeness while the other becomes overwhelmed and retreats.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","vulnerability_pace_gap"] },
          { label: "You both care, but vulnerability often gets translated badly or answered in the wrong way.", score: { [K.outOfSync]: 4 }, tags: ["communication_translation_gap","vulnerability_pace_gap"] },
          { label: "Vulnerability repeatedly leads to minimizing, shutdown, ridicule, or regret for sharing.", score: { [K.chronic]: 4 }, tags: ["responsiveness_gap","chronic_unmet"] }
        ]
      },
      {
        text: "4) When one of you says, “I need more reassurance lately,” the other person tends to…",
        options: [
          { label: "Take it seriously without treating reassurance as an endless obligation.", score: { [K.aligned]: 4 }, tags: ["responsiveness"] },
          { label: "Ask what reassurance would actually look like and try a realistic version.", score: { [K.adaptable]: 4 }, tags: ["adaptation"] },
          { label: "Feel pressured and pull back, which makes the reassurance need stronger.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap"] },
          { label: "Offer reassurance in a way that rarely lands, so both people get frustrated.", score: { [K.outOfSync]: 4 }, tags: ["communication_translation_gap"] },
          { label: "Dismiss the need as needy, irrational, or something the other person must handle alone.", score: { [K.chronic]: 4 }, tags: ["responsiveness_gap","chronic_unmet"] }
        ]
      },
      {
        text: "5) During a stressful week, what happens to your connection?",
        options: [
          { label: "Stress changes capacity, but you stay basically responsive and on the same team.", score: { [K.aligned]: 4 }, tags: ["stress_support"] },
          { label: "Your support styles differ, but you can ask and adjust without much resentment.", score: { [K.adaptable]: 4 }, tags: ["adaptation","stress_support"] },
          { label: "One wants more contact under stress while the other needs much more space.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","stress_support_gap"] },
          { label: "You often guess wrong about what the other person needs and both end up depleted.", score: { [K.outOfSync]: 4 }, tags: ["stress_support_gap","communication_translation_gap"] },
          { label: "Stress repeatedly becomes an excuse for emotional disappearance, contempt, or one-sided support.", score: { [K.chronic]: 4 }, tags: ["stress_support_gap","chronic_unmet"] }
        ]
      },
      {
        text: "6) One of you says, “That hurt me.” What is most typical?",
        options: [
          { label: "The impact can be acknowledged, and repair changes something afterward.", score: { [K.aligned]: 4 }, tags: ["repair","responsiveness"] },
          { label: "You may disagree on intent, but you can still work toward repair.", score: { [K.adaptable]: 4 }, tags: ["adaptation","repair"] },
          { label: "One wants to resolve it now; the other feels flooded and distances.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","repair_gap"] },
          { label: "Both try, but apologies or explanations often fail to make the other person feel understood.", score: { [K.outOfSync]: 4 }, tags: ["repair_gap","communication_translation_gap"] },
          { label: "Hurt is repeatedly denied, reversed, mocked, or left unrepaired.", score: { [K.chronic]: 4 }, tags: ["repair_gap","chronic_unmet"] }
        ]
      },
      {
        text: "7) Your preferred amount of texting or contact is different. How do you handle it?",
        options: [
          { label: "You have a rhythm that respects both connection and independence.", score: { [K.aligned]: 4 }, tags: ["autonomy"] },
          { label: "You have different defaults, but expectations can be discussed and adjusted.", score: { [K.adaptable]: 4 }, tags: ["adaptation","autonomy"] },
          { label: "One experiences less contact as rejection while the other experiences more contact as pressure.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap"] },
          { label: "You regularly misread each other’s contact style and end up disappointed.", score: { [K.outOfSync]: 4 }, tags: ["communication_translation_gap"] },
          { label: "One person’s need for contact or space repeatedly dominates with little room for negotiation.", score: { [K.chronic]: 4 }, tags: ["chronic_unmet"] }
        ]
      },
      {
        text: "8) When affection or closeness matters more to one partner than the other, what happens?",
        options: [
          { label: "The difference is real, but both people still feel wanted and respected.", score: { [K.aligned]: 4 }, tags: ["closeness"] },
          { label: "You talk about what lands and make intentional adjustments.", score: { [K.adaptable]: 4 }, tags: ["adaptation","closeness"] },
          { label: "Requests for closeness trigger withdrawal, which triggers more requests.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap"] },
          { label: "Affection is expressed in ways the other person often fails to recognize or receive.", score: { [K.outOfSync]: 4 }, tags: ["communication_translation_gap"] },
          { label: "One person feels chronically unwanted, pressured, or emotionally starved with little movement.", score: { [K.chronic]: 4 }, tags: ["chronic_unmet"] }
        ]
      },
      {
        text: "9) You need to make an important relationship decision. Your emotional process looks like…",
        options: [
          { label: "Both viewpoints can be heard, and neither person has to disappear to reach a decision.", score: { [K.aligned]: 4 }, tags: ["mutuality"] },
          { label: "Your priorities differ, but you can negotiate tradeoffs honestly.", score: { [K.adaptable]: 4 }, tags: ["adaptation","mutuality"] },
          { label: "One person seeks certainty and closeness while the other delays because pressure feels overwhelming.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap"] },
          { label: "You discuss the decision but often leave feeling like you were speaking different emotional languages.", score: { [K.outOfSync]: 4 }, tags: ["communication_translation_gap"] },
          { label: "One person’s needs repeatedly carry less weight, or decisions happen through pressure rather than mutuality.", score: { [K.chronic]: 4 }, tags: ["chronic_unmet"] }
        ]
      },
      {
        text: "10) When one person is overwhelmed and says, “I don’t know what I need,” the other person usually…",
        options: [
          { label: "Stays present without taking over and checks what might help.", score: { [K.aligned]: 4 }, tags: ["responsiveness","stress_support"] },
          { label: "May guess wrong at first, but can course-correct without taking it personally.", score: { [K.adaptable]: 4 }, tags: ["adaptation","stress_support"] },
          { label: "Tries to get closer while the overwhelmed partner needs less stimulation and more space.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","stress_support_gap"] },
          { label: "Offers support that repeatedly feels mistimed, too practical, too emotional, or otherwise off.", score: { [K.outOfSync]: 4 }, tags: ["stress_support_gap","communication_translation_gap"] },
          { label: "The overwhelmed person is regularly left alone, criticized, or expected to recover quickly for the relationship.", score: { [K.chronic]: 4 }, tags: ["stress_support_gap","chronic_unmet"] }
        ]
      },
      {
        text: "11) One of you sets an emotional boundary, such as needing a pause or not wanting to discuss something publicly. The other…",
        options: [
          { label: "Respects the boundary and stays connected without forcing the moment.", score: { [K.aligned]: 4 }, tags: ["boundaries"] },
          { label: "May need clarification, but can adjust once the boundary is explained.", score: { [K.adaptable]: 4 }, tags: ["adaptation","boundaries"] },
          { label: "Experiences the boundary as rejection, while the person setting it feels crowded.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap"] },
          { label: "Both mean well, but the boundary is often misunderstood and creates emotional distance.", score: { [K.outOfSync]: 4 }, tags: ["communication_translation_gap"] },
          { label: "Boundaries are repeatedly ignored, punished, mocked, or treated as disloyalty.", score: { [K.chronic]: 4 }, tags: ["chronic_unmet"] }
        ]
      },
      {
        text: "12) When you realize you misunderstood each other, what happens next?",
        options: [
          { label: "You can update your view and move toward each other without keeping score.", score: { [K.aligned]: 4 }, tags: ["repair"] },
          { label: "It takes effort, but both people are willing to translate and try again.", score: { [K.adaptable]: 4 }, tags: ["adaptation","communication_translation_gap"] },
          { label: "One seeks more explanation while the other shuts down from feeling pressured.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","repair_gap"] },
          { label: "Misunderstandings happen often enough that both people feel chronically misread.", score: { [K.outOfSync]: 4 }, tags: ["communication_translation_gap","responsiveness_gap"] },
          { label: "Misunderstandings usually end with blame, dismissal, or one person giving up on being understood.", score: { [K.chronic]: 4 }, tags: ["repair_gap","chronic_unmet"] }
        ]
      },
      {
        text: "13) Your emotional intensity is different: one feels things strongly and quickly, the other more slowly. How does that difference work?",
        options: [
          { label: "Neither style is treated as the correct one; you make room for both.", score: { [K.aligned]: 4 }, tags: ["vulnerability"] },
          { label: "It creates friction, but you are learning each other’s timing.", score: { [K.adaptable]: 4 }, tags: ["adaptation","vulnerability_pace_gap"] },
          { label: "Intensity feels like pressure to one person, while slower processing feels like rejection to the other.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","vulnerability_pace_gap"] },
          { label: "Your emotional timing is so different that important conversations often miss their window.", score: { [K.outOfSync]: 4 }, tags: ["vulnerability_pace_gap","communication_translation_gap"] },
          { label: "One person’s emotional style is repeatedly shamed, pathologized, or forced to disappear.", score: { [K.chronic]: 4 }, tags: ["vulnerability_pace_gap","chronic_unmet"] }
        ]
      },
      {
        text: "14) One person wants a deeper conversation, but the other is not ready. What usually follows?",
        options: [
          { label: "A later time is agreed on and the conversation actually happens.", score: { [K.aligned]: 4 }, tags: ["repair","vulnerability"] },
          { label: "Timing is imperfect, but both people keep the conversation on the radar.", score: { [K.adaptable]: 4 }, tags: ["adaptation","vulnerability_pace_gap"] },
          { label: "The request for depth increases pressure, and the need for space increases anxiety.", score: { [K.reassureSpace]: 4 }, tags: ["reassurance_space_gap","vulnerability_pace_gap"] },
          { label: "You often want different levels of depth at different times and struggle to meet in the middle.", score: { [K.outOfSync]: 4 }, tags: ["vulnerability_pace_gap"] },
          { label: "Deep conversations are indefinitely avoided, ridiculed, or made one person’s problem.", score: { [K.chronic]: 4 }, tags: ["vulnerability_pace_gap","chronic_unmet"] }
        ]
      },
      {
        text: "15) If the next six months stayed emotionally the same, which statement feels most accurate?",
        options: [
          { label: "I would still feel understood, respected, and able to be myself here.", score: { [K.aligned]: 5 }, tags: ["overall"] },
          { label: "I would want a few adjustments, but the relationship has enough flexibility to make them.", score: { [K.adaptable]: 5 }, tags: ["adaptation","overall"] },
          { label: "I would keep worrying about the closeness-versus-space cycle wearing us down.", score: { [K.reassureSpace]: 5 }, tags: ["reassurance_space_gap","overall"] },
          { label: "I would feel increasingly lonely because we care but keep missing each other emotionally.", score: { [K.outOfSync]: 5 }, tags: ["responsiveness_gap","overall"] },
          { label: "I would feel depleted because core emotional needs keep going unmet with little real change.", score: { [K.chronic]: 5 }, tags: ["chronic_unmet","overall"] }
        ]
      }
    ],

    results: {
      [K.aligned]: {
        title: "Emotionally Aligned — Your Needs Fit Without Requiring Sameness",
        subtitle: "You do not have to feel everything the same way to feel understood.",
        summary: "Your answers suggest a relationship with a strong emotional fit: needs can be named, differences can be negotiated, and support generally lands in a way the other person can receive. The important strength is not perfect similarity. It is responsiveness—the sense that each person can matter to the other without giving up autonomy.",
        bullets: [
          "Emotional needs can be discussed without shame or punishment.",
          "Repair after conflict usually creates more clarity rather than more distance.",
          "Differences in support, contact, or vulnerability are negotiable."
        ],
        scripts: [
          "“What kind of support would actually help right now?”",
          "“I think we handled that difference well. Let’s keep that repair rule.”",
          "“We do not need the same instinct—we need a way to translate it.”"
        ],
        next_steps: [
          "Protect one weekly check-in so small mismatches do not accumulate.",
          "Keep asking rather than assuming what support should look like.",
          "Preserve autonomy outside the relationship; compatibility is stronger when both people can remain themselves."
        ],
        cautions: [
          "A strong fit is not a guarantee. Keep measuring the relationship by behavior, respect, and repair over time."
        ]
      },

      [K.adaptable]: {
        title: "Different but Adaptable — The Fit Is Built Through Translation",
        subtitle: "Your emotional defaults differ, but the relationship has room to learn.",
        summary: "Your answers suggest meaningful differences in how you seek support, communicate, or process emotion—but also signs of flexibility. This is a workable form of compatibility when both people can learn each other’s signals and make repeatable adjustments instead of demanding instinctive sameness.",
        bullets: [
          "Differences exist, but curiosity is stronger than contempt.",
          "Requests can lead to real adjustment rather than temporary promises.",
          "You may need explicit agreements where other couples rely on intuition."
        ],
        scripts: [
          "“My first instinct is different from yours. What would make this land better?”",
          "“Can we turn this difference into one concrete agreement?”",
          "“I do not need you to react like me; I need us to understand the translation.”"
        ],
        next_steps: [
          "Pick one recurring mismatch and run a two-week experiment with a concrete agreement.",
          "Use reflection-back before problem-solving: “What I hear you needing is…”",
          "Review whether adaptations feel mutual rather than carried by one person."
        ],
        cautions: [
          "Adaptability only works when both people adjust. One-sided accommodation eventually becomes depletion."
        ]
      },

      [K.reassureSpace]: {
        title: "Reassurance–Space Mismatch — One Reaches In While the Other Pulls Back",
        subtitle: "Closeness and space may both be valid needs, but the timing can turn them into a loop.",
        summary: "Your answers suggest that emotional friction often centers on regulation: one person feels safer with contact, reassurance, or faster repair, while the other needs time, lower stimulation, or more space before reconnecting. Neither preference is automatically unhealthy. The compatibility question is whether space comes with a reliable return and reassurance can be requested without becoming pressure.",
        bullets: [
          "Distance may feel like rejection to one person and relief to the other.",
          "The pursue–withdraw loop can become stronger after conflict or stress.",
          "Predictable timing often matters more than forcing identical needs."
        ],
        scripts: [
          "“Take the space you need. Can we agree to reconnect at 8?”",
          "“I can give you room if I know the conversation is not disappearing.”",
          "“I need reassurance, but I do not want to chase. What is a realistic check-in?”"
        ],
        next_steps: [
          "Create a time-out rule that always includes a return time.",
          "Define a minimum reassurance signal that does not overwhelm the partner who needs space.",
          "Track whether the cycle softens when expectations are predictable."
        ],
        cautions: [
          "Space is not healthy when it becomes punishment, indefinite silence, or a way to avoid all accountability."
        ]
      },

      [K.outOfSync]: {
        title: "Emotionally Out of Sync — You Care, but Your Signals Keep Missing",
        subtitle: "The relationship may contain love while still producing chronic misunderstanding.",
        summary: "Your answers suggest that care may be present, yet support, communication, or vulnerability repeatedly fails to land. One person may offer solutions when the other needs empathy, seek depth when the other is not ready, or express care in ways the partner does not recognize. This is more than a love-language difference when the misses happen across several emotional domains.",
        bullets: [
          "Good intentions do not reliably translate into feeling understood.",
          "Misunderstandings may repeat even after long conversations.",
          "Emotional loneliness can grow without obvious hostility."
        ],
        scripts: [
          "“Before you respond, can you tell me what you heard me asking for?”",
          "“I know you care. The way support is happening is not landing for me.”",
          "“Can we choose one response that would feel supportive next time?”"
        ],
        next_steps: [
          "Stop discussing the relationship only in abstract terms; use one recent example at a time.",
          "Name support preferences explicitly: comfort, advice, practical help, space, or reassurance.",
          "Reassess after several weeks: are the misses becoming easier to repair?"
        ],
        cautions: [
          "Intent matters, but compatibility is also about whether repeated needs can actually be met in practice."
        ]
      },

      [K.chronic]: {
        title: "Chronic Emotional Mismatch — Core Needs Keep Going Unmet",
        subtitle: "This is less about different styles and more about whether the relationship can make room for both people.",
        summary: "Your answers suggest a persistent gap between important emotional needs and what the relationship is able or willing to provide. That does not automatically mean the relationship is abusive or that anyone is a bad person. It does mean that repeated dismissal, one-sided adaptation, missing repair, or feeling unable to be yourself deserves more weight than chemistry or good intentions.",
        bullets: [
          "Core needs may be repeatedly minimized, postponed, or left to one person to manage.",
          "Attempts to repair do not produce enough durable change.",
          "One person may be adapting far more than the other."
        ],
        scripts: [
          "“I do not need us to be identical, but I do need this need to have a real place here.”",
          "“We have talked about this more than once. What concrete change are we willing to make?”",
          "“If this stays the same, I need to be honest about what that means for me.”"
        ],
        next_steps: [
          "Name the two or three needs that are truly non-negotiable for long-term wellbeing.",
          "Ask for observable change rather than another general promise.",
          "If fear, coercion, humiliation, or retaliation is present, prioritize safety and outside support rather than compatibility work."
        ],
        cautions: [
          "A compatibility test cannot decide whether to stay or leave. Judge the pattern by safety, respect, reciprocity, and sustained behavior change."
        ]
      }
    },

    faq: [
      {
        q: "What is emotional compatibility in a relationship?",
        a: "Emotional compatibility is the practical fit between how two people express needs, respond to vulnerability, seek closeness or space, repair conflict, and support each other under stress. It does not require identical personalities."
      },
      {
        q: "Is emotional compatibility the same as emotional availability?",
        a: "No. Emotional availability asks whether someone can show up emotionally. Compatibility asks how well two people’s emotional needs and response styles work together."
      },
      {
        q: "Can two people with different emotional needs still be compatible?",
        a: "Yes. Differences can work when both people can understand them, negotiate clear agreements, and make mutual adjustments without shame or coercion."
      },
      {
        q: "Does a low-compatibility result mean we should break up?",
        a: "No. This is an educational reflection tool, not a prediction or stay-or-leave test. Look at repeated behavior, safety, reciprocity, and whether clear requests produce sustainable change."
      },
      {
        q: "Is this emotional compatibility test scientifically validated?",
        a: "No. The test is research-informed but has not been validated as a clinical or psychometric instrument. It draws on relationship-science constructs such as perceived partner responsiveness, dyadic coping, autonomy, communication, and repair."
      }
    ]
  };
})();
/* fear-of-intimacy.js — original educational self-reflection test
   This is NOT the 35-item Descutner & Thelen Fear-of-Intimacy Scale (FIS).
*/
(function () {
  const SLUG = "fear-of-intimacy";

  const R = {
    open: "open_to_closeness",
    guarded: "guarded_but_connected",
    conflict: "closeness_distance_conflict",
    distance: "protective_distance",
    high: "strong_intimacy_fear"
  };

  const S = (fear, dimension, dimensionScore=fear, tags=[]) => {
    const score = { fear };
    if (dimension) score[dimension] = dimensionScore;
    return { score, tags };
  };

  window.TEST = {
    id: "fear_intimacy",
    slug: SLUG,
    title: "Fear of Intimacy Test: Are You Afraid of Emotional Closeness?",
    blurb: "18 original scenario-based questions about vulnerability, dependence, distance, autonomy, and physical closeness. Educational self-reflection only.",
    time: "3–4 min",
    intent: "quiz",
    keywords: [
      "fear of intimacy test",
      "fear of intimacy quiz",
      "fear of emotional intimacy test",
      "fear of physical intimacy test",
      "fear of intimacy scale test",
      "am i afraid of intimacy",
      "why do i pull away when someone gets close",
      "afraid of emotional closeness",
      "intimacy issues test",
      "avoidant intimacy test"
    ],

    questions: [
      {
        text: "1) You tell someone you care about something deeply personal. Right after, what feels most familiar?",
        options: [
          Object.assign({ label: "Relief. I may feel exposed, but closeness still feels worth it." }, S(0, "disclosure", 0, ["tolerates_vulnerability"])),
          Object.assign({ label: "A vulnerability hangover. I replay what I said, but I do not pull away." }, S(1, "disclosure", 1, ["post_disclosure_worry"])),
          Object.assign({ label: "I want to change the subject, joke it off, or make the moment less serious." }, S(2, "disclosure", 2, ["deflect_vulnerability"])),
          Object.assign({ label: "I regret saying it and feel a strong urge to create distance." }, S(3, "disclosure", 3, ["retreat_after_disclosure"]))
        ]
      },
      {
        text: "2) A partner asks, “What hurts you most when we fight?” You usually…",
        options: [
          Object.assign({ label: "Answer honestly, even if I need a minute to find the words." }, S(0, "disclosure", 0, ["direct_emotion"])),
          Object.assign({ label: "Share part of it, but keep the most sensitive piece to myself." }, S(1, "disclosure", 1, ["partial_disclosure"])),
          Object.assign({ label: "Talk about the facts of the argument instead of what it did to me." }, S(2, "disclosure", 2, ["intellectualize"])),
          Object.assign({ label: "Shut down or say I do not want to talk about feelings." }, S(3, "disclosure", 3, ["shutdown"]))
        ]
      },
      {
        text: "3) You are having a terrible week and someone trustworthy says, “Let me help.” Your first reaction is…",
        options: [
          Object.assign({ label: "I can accept help without feeling smaller for needing it." }, S(0, "dependence", 0, ["receive_support"])),
          Object.assign({ label: "I appreciate it, but I prefer to handle most of it myself." }, S(1, "dependence", 1, ["mild_self_reliance"])),
          Object.assign({ label: "I get uncomfortable and immediately think about how to repay them." }, S(2, "dependence", 2, ["care_as_debt"])),
          Object.assign({ label: "I refuse. Needing someone feels unsafe or too exposing." }, S(3, "dependence", 3, ["extreme_self_reliance"]))
        ]
      },
      {
        text: "4) After an especially close weekend together, Monday arrives. What happens inside you?",
        options: [
          Object.assign({ label: "I feel connected and return to normal life without needing to change the relationship." }, S(0, "distance", 0, ["steady_after_closeness"])),
          Object.assign({ label: "I need some alone time, but I can say that clearly and reconnect." }, S(1, "distance", 1, ["healthy_space"])),
          Object.assign({ label: "I start noticing flaws and wondering whether we are getting too close." }, S(2, "distance", 2, ["deactivation"])),
          Object.assign({ label: "I want to disappear, cancel plans, or emotionally reset by pulling away." }, S(3, "distance", 3, ["closeness_hangover", "retreat"]))
        ]
      },
      {
        text: "5) Someone you genuinely like is consistent, available, and clear about wanting you. That usually feels…",
        options: [
          Object.assign({ label: "Reassuring. Their availability makes it easier to be myself." }, S(0, "distance", 0, ["availability_safe"])),
          Object.assign({ label: "Good, though I still need time before I trust it fully." }, S(1, "distance", 1, ["slow_trust"])),
          Object.assign({ label: "Oddly less exciting. I start wondering whether something is missing." }, S(2, "distance", 2, ["availability_dulls"])),
          Object.assign({ label: "Claustrophobic. I feel more drawn to people who keep some distance." }, S(3, "distance", 3, ["unavailable_feels_safer"]))
        ]
      },
      {
        text: "6) When you need reassurance from a partner, which sentence is closest to you?",
        options: [
          Object.assign({ label: "I can ask directly without believing the need makes me weak." }, S(0, "dependence", 0, ["ask_for_need"])),
          Object.assign({ label: "I can ask, but I feel a little embarrassed afterward." }, S(1, "dependence", 1, ["need_shame_mild"])),
          Object.assign({ label: "I hint, become quiet, or hope they notice instead of asking." }, S(2, "dependence", 2, ["indirect_need"])),
          Object.assign({ label: "I would rather go without reassurance than let someone know I need it." }, S(3, "dependence", 3, ["need_avoidance"]))
        ]
      },
      {
        text: "7) You and your partner have a hard argument, then they sincerely try to repair. You…",
        options: [
          Object.assign({ label: "Stay in the conversation and let repair happen." }, S(0, "distance", 0, ["accept_repair"])),
          Object.assign({ label: "Need some time, then come back when I said I would." }, S(1, "distance", 1, ["structured_space"])),
          Object.assign({ label: "Say I am fine, but stay emotionally cold long after the conflict ends." }, S(2, "distance", 2, ["cold_after_conflict"])),
          Object.assign({ label: "Feel safer cutting off emotionally than risking another vulnerable conversation." }, S(3, "distance", 3, ["cutoff"]))
        ]
      },
      {
        text: "8) Someone sees a side of you that is insecure, messy, jealous, or ashamed. Your strongest fear is…",
        options: [
          Object.assign({ label: "They may judge me, but one imperfect moment does not define the relationship." }, S(0, "disclosure", 0, ["self_acceptance"])),
          Object.assign({ label: "I hope they still respect me. I need a little reassurance." }, S(1, "disclosure", 1, ["evaluation_worry"])),
          Object.assign({ label: "They will think less of me now that they know." }, S(2, "disclosure", 2, ["fear_negative_evaluation"])),
          Object.assign({ label: "They now have something they could use against me later." }, S(3, "disclosure", 3, ["vulnerability_as_weapon"]))
        ]
      },
      {
        text: "9) A partner consistently takes care of you when you are overwhelmed. Over time, you are most likely to…",
        options: [
          Object.assign({ label: "Let the care in and reciprocate naturally." }, S(0, "dependence", 0, ["mutual_care"])),
          Object.assign({ label: "Appreciate it, but still keep a strong independent lane." }, S(1, "dependence", 1, ["balanced_independence"])),
          Object.assign({ label: "Worry I am becoming dependent or losing my edge." }, S(2, "dependence", 2, ["dependence_fear"])),
          Object.assign({ label: "Create distance so I do not owe anyone that much emotional access." }, S(3, "dependence", 3, ["distance_from_care"]))
        ]
      },
      {
        text: "10) As a relationship gets serious, what happens to your sense of freedom?",
        options: [
          Object.assign({ label: "Commitment and independence can coexist for me." }, S(0, "autonomy", 0, ["interdependence"])),
          Object.assign({ label: "I protect alone time, but I can negotiate it openly." }, S(1, "autonomy", 1, ["healthy_autonomy"])),
          Object.assign({ label: "Normal expectations start feeling like pressure or obligation." }, S(2, "autonomy", 2, ["engulfment_worry"])),
          Object.assign({ label: "I feel trapped by the idea that another person will need access to me." }, S(3, "autonomy", 3, ["engulfment_fear"]))
        ]
      },
      {
        text: "11) The day after a very deep conversation, your texting usually becomes…",
        options: [
          Object.assign({ label: "Basically normal. Closeness does not make me change the rhythm." }, S(0, "distance", 0, ["steady_contact"])),
          Object.assign({ label: "A little quieter while I process, but I stay warm and clear." }, S(1, "distance", 1, ["process_without_withdrawal"])),
          Object.assign({ label: "Shorter or slower because I suddenly need emotional space." }, S(2, "distance", 2, ["text_distance"])),
          Object.assign({ label: "Noticeably cold or absent; I need the connection to feel less intense." }, S(3, "distance", 3, ["post_closeness_silence"]))
        ]
      },
      {
        text: "12) Assuming touch is wanted, consensual, and physically comfortable, affectionate touch with someone emotionally important feels…",
        options: [
          Object.assign({ label: "Comforting. Emotional importance usually makes touch feel safer." }, S(0, "physical", 0, ["touch_safe"])),
          Object.assign({ label: "Good, though I sometimes need a slower pace." }, S(1, "physical", 1, ["slow_physical_pace"])),
          Object.assign({ label: "More exposing than casual touch; I can tense up when it feels emotionally meaningful." }, S(2, "physical", 2, ["physical_exposure"])),
          Object.assign({ label: "Hard to tolerate; I may avoid touch precisely because the person matters." }, S(3, "physical", 3, ["physical_avoidance"]))
        ]
      },
      {
        text: "13) When a trusted partner initiates affection and you are not in the mood, you are most likely to…",
        options: [
          Object.assign({ label: "Say what I want or do not want without fearing it will ruin closeness." }, S(0, "physical", 0, ["consent_communication"])),
          Object.assign({ label: "Ask for a different kind of affection or a little space." }, S(1, "physical", 1, ["physical_boundary"])),
          Object.assign({ label: "Freeze up because saying yes or no both feel emotionally loaded." }, S(2, "physical", 2, ["physical_freeze"])),
          Object.assign({ label: "Avoid situations where affection might be expected because the whole topic feels threatening." }, S(3, "physical", 3, ["avoid_physical_context"]))
        ]
      },
      {
        text: "14) Which statement best describes physical intimacy for you?",
        options: [
          Object.assign({ label: "Physical and emotional closeness usually support each other." }, S(0, "physical", 0, ["integrated_intimacy"])),
          Object.assign({ label: "Physical closeness is mostly comfortable; emotional openness is sometimes harder." }, S(1, "disclosure", 1, ["emotional_harder_than_physical"])),
          Object.assign({ label: "I can be physically close more easily when the emotional stakes stay low." }, S(2, "distance", 2, ["physical_without_emotional"])),
          Object.assign({ label: "Both physical and emotional closeness can make me want to shut down or escape." }, S(3, "physical", 3, ["global_closeness_threat"]))
        ]
      },
      {
        text: "15) Your partner wants to make a realistic plan six months ahead. You feel…",
        options: [
          Object.assign({ label: "Able to discuss it as a plan, not a loss of freedom." }, S(0, "autonomy", 0, ["future_safe"])),
          Object.assign({ label: "A little nervous, but willing to talk about what works for both of us." }, S(1, "autonomy", 1, ["future_nerves"])),
          Object.assign({ label: "Pressure. I start looking for reasons not to lock anything in." }, S(2, "autonomy", 2, ["commitment_pressure"])),
          Object.assign({ label: "A strong urge to escape the relationship before expectations grow." }, S(3, "autonomy", 3, ["future_escape"]))
        ]
      },
      {
        text: "16) If you say, “I need you tonight,” what part feels hardest?",
        options: [
          Object.assign({ label: "Nothing fundamental. I can express a real need." }, S(0, "dependence", 0, ["need_direct"])),
          Object.assign({ label: "I worry I will inconvenience them." }, S(1, "dependence", 1, ["burden_worry"])),
          Object.assign({ label: "I worry they will have power over me because they know I need them." }, S(2, "dependence", 2, ["power_through_need"])),
          Object.assign({ label: "I almost never let myself say something like that." }, S(3, "dependence", 3, ["need_suppression"]))
        ]
      },
      {
        text: "17) What do you most often do with the fear that someone could hurt you if you let them matter?",
        options: [
          Object.assign({ label: "Use boundaries and evidence, but still let trustworthy people get close." }, S(0, "disclosure", 0, ["trust_with_boundaries"])),
          Object.assign({ label: "Open slowly and watch whether their behavior earns more trust." }, S(1, "disclosure", 1, ["earned_trust"])),
          Object.assign({ label: "Keep important parts of myself private so I always have an exit." }, S(2, "disclosure", 2, ["emotional_exit"])),
          Object.assign({ label: "Leave, detach, or stop needing them before they can hurt me." }, S(3, "distance", 3, ["preemptive_detach"]))
        ]
      },
      {
        text: "18) Looking across your relationships, which pattern feels most honest?",
        options: [
          Object.assign({ label: "I can be close without losing myself." }, S(0, "autonomy", 0, ["secure_closeness"])),
          Object.assign({ label: "I am cautious, but I usually move closer when trust grows." }, S(1, "autonomy", 1, ["cautious_connection"])),
          Object.assign({ label: "I often want closeness and then pull back once I actually have it." }, S(2, "distance", 2, ["approach_avoid"])),
          Object.assign({ label: "Distance is usually how I feel safe, even when part of me feels lonely." }, S(3, "distance", 3, ["distance_as_safety"]))
        ]
      }
    ],

    results: {
      [R.open]: {
        title: "Open to Closeness — Vulnerability Usually Feels Tolerable",
        subtitle: "You can protect yourself without making distance your main form of safety.",
        summary: "Your answers suggest that intimacy is usually something you can move toward rather than something you need to escape. You may still value independence, need space, or feel exposed after vulnerable moments, but closeness itself does not appear to trigger a strong protective retreat. The useful task is not to become even more open; it is to keep choosing people whose behavior makes openness sensible.",
        bullets: [
          "You can usually express feelings and needs without excessive shame.",
          "Support and interdependence do not automatically feel like loss of control.",
          "Space can be communicated without turning into emotional disappearance."
        ],
        what_it_looks_like: [
          "You can say what you feel and stay present afterward.",
          "You accept care without immediately needing to repay or escape it.",
          "Commitment and autonomy can coexist."
        ],
        blindspots: [
          "Being open does not mean every person has earned access.",
          "Do not explain away real red flags as someone else's intimacy fear.",
          "Secure closeness still needs boundaries, consent, and repair."
        ],
        scripts: [
          "“I want to be honest about what I need, and I also want to hear what works for you.”",
          "“I need some space tonight. I care about us, and I’ll check in tomorrow.”",
          "“That felt vulnerable to say, but I’m glad I told you.”"
        ],
        next_steps: [
          "Protect relationships where honesty is met with respect.",
          "Keep independence as a choice, not a defense.",
          "Notice whether the other person can reciprocate the same level of emotional presence."
        ],
        cautions: ["Low fear on this quiz does not prove a relationship is healthy or compatible."]
      },

      [R.guarded]: {
        title: "Guarded but Connected — You Open Slowly, Not Never",
        subtitle: "Your caution may be protective, but it does not completely block closeness.",
        summary: "Your answers suggest selective guardedness rather than a strong across-the-board fear of intimacy. You may need time before trusting, prefer handling some things yourself, or feel a vulnerability hangover after opening up. The central question is whether your caution softens when someone proves safe. If trust grows but the wall never moves, protection may be costing you more connection than you intend.",
        bullets: [
          "You can connect, but deeper access usually has to be earned.",
          "You may feel exposed after disclosure even when the conversation went well.",
          "Independence matters, yet closeness is still possible."
        ],
        what_it_looks_like: [
          "You share in layers rather than all at once.",
          "You may hesitate before asking for support.",
          "You prefer slow commitment and clear personal space."
        ],
        blindspots: [
          "Slow is not the same as stuck.",
          "A good boundary has a door; a wall has none.",
          "Waiting for total certainty before opening up can become another form of avoidance."
        ],
        scripts: [
          "“I want to tell you something real, but I need to go slowly.”",
          "“I’m not pulling away from you; I’m processing. Can we come back to this tomorrow?”",
          "“Receiving help is hard for me, but I do want support right now.”"
        ],
        next_steps: [
          "Choose one small disclosure that is slightly more honest than your default.",
          "Practice asking directly for one manageable form of support.",
          "Watch whether safe people earn more access over time."
        ],
        cautions: ["Caution can be healthy. The issue is whether fear keeps overriding evidence of safety."]
      },

      [R.conflict]: {
        title: "Closeness–Distance Conflict — Part of You Reaches, Part of You Retreats",
        subtitle: "Connection is wanted, but closeness can trigger a second impulse to get away.",
        summary: "Your answers suggest an approach–avoid pattern: you may genuinely long for intimacy, then feel exposed, trapped, doubtful, or emotionally overloaded once it becomes real. This can create confusing shifts—warmth followed by silence, desire followed by fault-finding, disclosure followed by regret. The goal is not to force closeness. It is to catch the moment protection takes over and learn a response that preserves both autonomy and connection.",
        bullets: [
          "You may move toward people and then deactivate when the emotional stakes rise.",
          "Vulnerability can produce both relief and an urge to regain distance.",
          "Available, consistent closeness may feel less comfortable than uncertain closeness."
        ],
        what_it_looks_like: [
          "A strong connection is followed by overthinking or emotional cooling.",
          "You may want reassurance but dislike needing it.",
          "You can mistake the discomfort of being known for evidence that the relationship is wrong."
        ],
        blindspots: [
          "Not every urge to leave is fear; incompatibility and safety still matter.",
          "Do not make major relationship decisions at the peak of a closeness-triggered panic if there is no safety issue.",
          "Hot-and-cold behavior can hurt another person even when it is self-protective."
        ],
        scripts: [
          "“I notice I want distance after we get close. I don’t want to disappear, so I’m naming it.”",
          "“I need a little space, and I want to reconnect tomorrow—not leave this hanging.”",
          "“Part of me wants reassurance and another part hates needing it. Can we slow this down?”"
        ],
        next_steps: [
          "Track the exact moments when closeness flips into doubt or withdrawal.",
          "Replace unexplained distance with a clear return time.",
          "Practice one layer of vulnerability without immediately undoing it."
        ],
        cautions: ["The push–pull pattern is descriptive, not a diagnosis or proof of one attachment style."]
      },

      [R.distance]: {
        title: "Protective Distance — Independence Is Doing Emotional Safety Work",
        subtitle: "Distance may feel less like a preference and more like the place where you regain control.",
        summary: "Your answers suggest that self-reliance, emotional privacy, or physical and relational distance may be doing important protective work. Depending on someone can feel risky, commitment can feel like reduced freedom, and repair may be harder than withdrawal. That strategy can be understandable—especially if closeness has been costly before—but it can also make safe connection difficult to recognize or sustain.",
        bullets: [
          "Needing others may feel more dangerous than being lonely.",
          "You may use privacy, self-reliance, or distance to restore control.",
          "Closeness can trigger fears about dependence, pressure, or loss of autonomy."
        ],
        what_it_looks_like: [
          "You solve problems alone even when support is available.",
          "You may go emotionally quiet after conflict or intimacy.",
          "A partner's reasonable need for connection can feel like pressure."
        ],
        blindspots: [
          "Independence is healthy until it becomes the only safe option.",
          "Silence protects you from exposure but gives other people very little relational information.",
          "Boundaries and connection are not opposites."
        ],
        scripts: [
          "“My instinct is to handle this alone, but I’m trying to let you in a little.”",
          "“I need space without disconnecting. I’ll reach back out at ___.”",
          "“Commitment can make me feel crowded. I want to talk about autonomy instead of disappearing.”"
        ],
        next_steps: [
          "Experiment with receiving one small form of help without paying it back immediately.",
          "Use explicit boundaries to protect autonomy instead of emotional cutoff.",
          "If this pattern repeatedly blocks relationships you value, consider qualified therapy focused on the underlying fear."
        ],
        cautions: ["A need for solitude is not pathological. Context, consent, safety, temperament, and culture all matter."]
      },

      [R.high]: {
        title: "Strong Intimacy-Fear Pattern — Closeness Often Activates Protection",
        subtitle: "Wanting connection and feeling threatened by it may be happening at the same time.",
        summary: "Your answers suggest that intimacy often activates a strong protective response across several areas: being known, needing someone, allowing commitment, staying connected after vulnerability, or tolerating emotionally meaningful physical closeness. This does not mean you are incapable of love, and it is not a clinical diagnosis. It means closeness may currently carry enough threat that distance feels safer than the connection you also want.",
        bullets: [
          "Emotional exposure may quickly trigger regret, shutdown, or escape.",
          "Depending on another person can feel like giving away power.",
          "Distance may bring immediate relief even when it creates longer-term loneliness."
        ],
        what_it_looks_like: [
          "You may avoid needs until they become impossible to hide.",
          "Safe availability can still feel intrusive or strangely unattractive.",
          "You may protect yourself before there is clear evidence that protection is needed."
        ],
        blindspots: [
          "A high result is not proof that every relationship problem comes from you.",
          "Physical intimacy concerns can have medical, sexual, trauma-related, sensory, or consent-related causes that this quiz cannot determine.",
          "Do not use this score to force yourself into vulnerability with unsafe people."
        ],
        scripts: [
          "“Closeness can activate a strong urge to shut down for me. I’m trying to communicate before I disappear.”",
          "“I want support, but receiving it is hard. Can we keep this small and specific?”",
          "“I care about you. I need a slower pace that still includes honest communication.”"
        ],
        next_steps: [
          "Map your strongest trigger: disclosure, dependence, autonomy, distance after closeness, or physical intimacy.",
          "Practice gradual, consent-based closeness rather than flooding yourself.",
          "If the pattern is persistent, painful, or linked with trauma or panic, consider working with a qualified mental-health professional."
        ],
        cautions: ["This result describes your answers today. It is not the original Fear-of-Intimacy Scale and is not a diagnosis."]
      }
    },

    faq: [
      {
        q: "Is this the original Fear-of-Intimacy Scale?",
        a: "No. This is an original educational self-reflection test created for relationship.sbs. The research Fear-of-Intimacy Scale developed by Descutner and Thelen contains 35 items. We do not reproduce it here."
      },
      {
        q: "What does this fear of intimacy test measure?",
        a: "It explores five related areas: emotional disclosure, receiving support and dependence, distancing after closeness, autonomy or engulfment concerns, and physically affectionate closeness. The result summarizes patterns in your answers rather than diagnosing a condition."
      },
      {
        q: "Is fear of intimacy the same as avoidant attachment?",
        a: "No. They overlap, but attachment avoidance is a broader relationship dimension. Fear of intimacy focuses more specifically on anxiety or defensive distancing around being known, needing someone, and tolerating closeness."
      },
      {
        q: "Can I fear intimacy and still want a relationship?",
        a: "Yes. Wanting closeness and feeling threatened by it can coexist. The conflict often becomes most visible when a relationship becomes reliable, emotionally important, or vulnerable."
      },
      {
        q: "What if my result is high because physical intimacy is difficult?",
        a: "Do not assume attachment is the cause. Pain, health issues, sexual difficulties, trauma-related responses, sensory discomfort, low desire, consent concerns, and relationship safety can all affect physical intimacy. A quiz cannot distinguish those causes."
      }
    ]
  };
})();
/* codependency-test.js — research-informed educational self-reflection quiz */
(function () {
  const SLUG = "codependency-test";
  const K = {
    balanced: "balanced-care-and-boundaries",
    stress: "overgiving-under-stress",
    approval: "approval-linked-caretaking",
    rescuer: "rescuer-overfunctioning-pattern",
    high: "high-codependency-like-pattern"
  };

  window.TEST = {
    id: "codependency_reflection",
    slug: SLUG,
    title: "Codependency Test: Am I Codependent? 20-Question Quiz",
    blurb: "Answer from your repeated pattern across close relationships—not the one week when someone genuinely needed extra help.",
    time: "4–5 min",
    intent: "quiz",
    compactShell: true,
    keywords: [
      "codependency test",
      "codependent test",
      "am i codependent",
      "am i codependent quiz",
      "codependency quiz",
      "codependent relationship test",
      "am i codependent in my relationship",
      "signs of codependency",
      "people pleasing in relationships",
      "difficulty setting boundaries relationship"
    ],

    questions: [
      {
        text: "1) Someone you love creates the same problem again and asks you to rescue them. You are already exhausted. What feels hardest about saying no?",
        options: [
          { label: "Nothing major. I can care without taking over a problem that belongs to them.", score: { rescuing_control: 0 }, tags: ["let_own_outcome"] },
          { label: "I feel a little guilty, but I can still let them handle it.", score: { rescuing_control: 1 }, tags: ["guilt_mild"] },
          { label: "I worry that a good partner would step in, so I usually fix it.", score: { rescuing_control: 3 }, tags: ["rescue", "responsibility_blur"] },
          { label: "I feel responsible for preventing the fallout, even when rescuing keeps the cycle going.", score: { rescuing_control: 4 }, tags: ["rescue", "overfunction", "responsibility_blur"] }
        ]
      },
      {
        text: "2) Your partner is upset, but says they need time and do not want help yet. What happens inside you?",
        options: [
          { label: "I can respect the space and stay emotionally steady.", score: { external_focus: 0 }, tags: ["self_regulated"] },
          { label: "I think about it, but I keep living my day.", score: { external_focus: 1 }, tags: ["some_external_focus"] },
          { label: "Their mood becomes the background noise in my head until they feel better.", score: { external_focus: 3 }, tags: ["mood_tracking", "external_focus"] },
          { label: "I cannot really relax; I need to fix the mood before I can feel okay.", score: { external_focus: 4 }, tags: ["mood_tracking", "external_focus", "emotional_fusion"] }
        ]
      },
      {
        text: "3) You are asked for a favor that will cost you sleep, time, or money you genuinely need. Your first impulse is…",
        options: [
          { label: "Check my capacity before answering.", score: { self_neglect: 0 }, tags: ["capacity_check"] },
          { label: "Want to help, then negotiate what I can realistically give.", score: { self_neglect: 1 }, tags: ["bounded_help"] },
          { label: "Say yes quickly, then feel stressed or resentful later.", score: { self_neglect: 3 }, tags: ["automatic_yes", "resentment"] },
          { label: "Say yes because my own cost feels less important than disappointing them.", score: { self_neglect: 4 }, tags: ["automatic_yes", "self_neglect"] }
        ]
      },
      {
        text: "4) When someone close to you is disappointed with you, what hurts most?",
        options: [
          { label: "The conflict itself. Their disappointment does not define my worth.", score: { approval_selfworth: 0 }, tags: ["stable_selfworth"] },
          { label: "I dislike it, but I can tolerate not being everyone's preferred version of me.", score: { approval_selfworth: 1 }, tags: ["approval_discomfort"] },
          { label: "I start wondering whether I am selfish, difficult, or failing them.", score: { approval_selfworth: 3 }, tags: ["approval_linked", "self_doubt"] },
          { label: "It feels like evidence that I am bad or unlovable unless I make things right quickly.", score: { approval_selfworth: 4 }, tags: ["approval_linked", "worth_contingent"] }
        ]
      },
      {
        text: "5) You disagree with your partner on something important. How likely are you to say what you really think?",
        options: [
          { label: "Very likely. Disagreement does not have to threaten connection.", score: { voice_identity: 0 }, tags: ["voice_present"] },
          { label: "I may soften it, but they still hear my real position.", score: { voice_identity: 1 }, tags: ["softened_voice"] },
          { label: "I often edit my opinion until it is easier for them to accept.", score: { voice_identity: 3 }, tags: ["hide_self", "conflict_avoidance"] },
          { label: "I can lose track of what I think because keeping the relationship stable feels more urgent.", score: { voice_identity: 4 }, tags: ["hide_self", "identity_blur"] }
        ]
      },
      {
        text: "6) A loved one makes a choice you believe will end badly, but they have heard your concern. What do you do next?",
        options: [
          { label: "Let them own the decision and its consequences.", score: { rescuing_control: 0 }, tags: ["let_own_outcome"] },
          { label: "I may check in once, then step back.", score: { rescuing_control: 1 }, tags: ["bounded_help"] },
          { label: "I keep advising, reminding, researching, or arranging things so they make the safer choice.", score: { rescuing_control: 3 }, tags: ["overfunction", "indirect_control"] },
          { label: "I feel unable to stop managing the situation because their bad outcome feels like my failure too.", score: { rescuing_control: 4 }, tags: ["overfunction", "indirect_control", "responsibility_blur"] }
        ]
      },
      {
        text: "7) Your partner has a bad evening and becomes distant. By bedtime, your mood is…",
        options: [
          { label: "Still mostly mine. I care, but I do not absorb their entire state.", score: { external_focus: 0 }, tags: ["self_regulated"] },
          { label: "A little affected, then I return to myself.", score: { external_focus: 1 }, tags: ["some_external_focus"] },
          { label: "Low too. Their distance changes the emotional temperature of my whole night.", score: { external_focus: 3 }, tags: ["mood_tracking", "reactivity"] },
          { label: "Completely tied to whether they reconnect; I cannot settle until they do.", score: { external_focus: 4 }, tags: ["mood_tracking", "reactivity", "emotional_fusion"] }
        ]
      },
      {
        text: "8) Think about your own needs during a stressful month. What usually happens to them?",
        options: [
          { label: "They stay visible, even if I temporarily compromise.", score: { self_neglect: 0 }, tags: ["needs_visible"] },
          { label: "Some get postponed, but I circle back to them.", score: { self_neglect: 1 }, tags: ["temporary_postpone"] },
          { label: "They quietly move to the bottom of the list until I am depleted.", score: { self_neglect: 3 }, tags: ["self_neglect", "depletion"] },
          { label: "I almost stop noticing what I need until resentment, exhaustion, or shutdown forces me to.", score: { self_neglect: 4 }, tags: ["self_neglect", "depletion", "needs_lost"] }
        ]
      },
      {
        text: "9) What most reliably makes you feel valuable in a close relationship?",
        options: [
          { label: "Being known, respected, and loved—not being indispensable.", score: { approval_selfworth: 0 }, tags: ["stable_selfworth"] },
          { label: "Connection matters a lot, but I also value myself outside what I do for them.", score: { approval_selfworth: 1 }, tags: ["balanced_approval"] },
          { label: "Being the reliable one they turn to when things fall apart.", score: { approval_selfworth: 3 }, tags: ["needed_to_feel_worthy"] },
          { label: "Feeling necessary. If they stopped needing me, I would question what I bring to the relationship.", score: { approval_selfworth: 4 }, tags: ["needed_to_feel_worthy", "worth_contingent"] }
        ]
      },
      {
        text: "10) Over time, what has happened to your friendships, interests, routines, or goals outside the relationship?",
        options: [
          { label: "They remain an active part of my life.", score: { voice_identity: 0 }, tags: ["identity_intact"] },
          { label: "They fluctuate with life, but I still feel like a separate person.", score: { voice_identity: 1 }, tags: ["identity_intact"] },
          { label: "Several have faded because the relationship takes most of my emotional attention.", score: { voice_identity: 3 }, tags: ["identity_blur", "relationship_centrality"] },
          { label: "I struggle to picture who I am, what I want, or how I spend time without the relationship organizing it.", score: { voice_identity: 4 }, tags: ["identity_blur", "relationship_centrality"] }
        ]
      },
      {
        text: "11) You notice that helping is making the other person less responsible. What is your most likely response?",
        options: [
          { label: "Change how I help, even if they are unhappy about it.", score: { rescuing_control: 0 }, tags: ["let_own_outcome"] },
          { label: "Try to step back gradually and tolerate some discomfort.", score: { rescuing_control: 1 }, tags: ["bounded_help"] },
          { label: "Keep helping because stopping feels cruel when they are struggling.", score: { rescuing_control: 3 }, tags: ["rescue", "guilt_mild"] },
          { label: "Keep taking over because I do not trust that they can handle the consequences without me.", score: { rescuing_control: 4 }, tags: ["rescue", "overfunction", "indirect_control"] }
        ]
      },
      {
        text: "12) When someone you love is angry with you, how much mental space does it take?",
        options: [
          { label: "Some, but I can still work, sleep, and stay connected to my own perspective.", score: { external_focus: 0 }, tags: ["self_regulated"] },
          { label: "More than I would like, but I can function.", score: { external_focus: 1 }, tags: ["some_external_focus"] },
          { label: "A lot. I replay the conflict and monitor for signs they are okay with me again.", score: { external_focus: 3 }, tags: ["mood_tracking", "approval_monitoring"] },
          { label: "Almost all of it. I feel emotionally suspended until the relationship feels repaired.", score: { external_focus: 4 }, tags: ["mood_tracking", "emotional_fusion", "approval_monitoring"] }
        ]
      },
      {
        text: "13) You realize you are becoming resentful about how much you give. What do you usually do?",
        options: [
          { label: "Treat resentment as information and renegotiate what I am carrying.", score: { self_neglect: 0 }, tags: ["needs_visible"] },
          { label: "Take some space and make a smaller adjustment.", score: { self_neglect: 1 }, tags: ["capacity_check"] },
          { label: "Keep giving but become irritable because asking for less feels selfish.", score: { self_neglect: 3 }, tags: ["resentment", "self_neglect"] },
          { label: "Push harder until I burn out, then withdraw or explode because I never allowed myself to need anything.", score: { self_neglect: 4 }, tags: ["resentment", "depletion", "self_neglect"] }
        ]
      },
      {
        text: "14) Imagine your partner solves a long-standing problem and suddenly needs much less help from you. Your first reaction is…",
        options: [
          { label: "Relief and pride. I want them to be capable without depending on me.", score: { approval_selfworth: 0 }, tags: ["stable_selfworth"] },
          { label: "Mostly happy, with a small adjustment to the new dynamic.", score: { approval_selfworth: 1 }, tags: ["balanced_approval"] },
          { label: "Happy, but unexpectedly less important or less secure.", score: { approval_selfworth: 3 }, tags: ["needed_to_feel_worthy"] },
          { label: "Unsettled. Being the needed one has become part of how I know I matter.", score: { approval_selfworth: 4 }, tags: ["needed_to_feel_worthy", "worth_contingent"] }
        ]
      },
      {
        text: "15) Someone asks, “What do you want?” about a decision that affects both of you. How easy is it to answer?",
        options: [
          { label: "Usually easy. I can know my preference without needing it to win.", score: { voice_identity: 0 }, tags: ["voice_present"] },
          { label: "I need a moment, but I can find my answer.", score: { voice_identity: 1 }, tags: ["softened_voice"] },
          { label: "I automatically scan what would make the other person happiest before I notice my own answer.", score: { voice_identity: 3 }, tags: ["external_focus", "hide_self"] },
          { label: "Sometimes I genuinely do not know what I want until I know what they want first.", score: { voice_identity: 4 }, tags: ["identity_blur", "hide_self"] }
        ]
      },
      {
        text: "16) A person close to you is facing consequences from their own repeated choices. Which thought sounds most like you?",
        options: [
          { label: "I can support them emotionally without removing consequences that belong to them.", score: { rescuing_control: 0 }, tags: ["let_own_outcome"] },
          { label: "I want to soften it, but I know stepping in may not help long-term.", score: { rescuing_control: 1 }, tags: ["bounded_help"] },
          { label: "If I can prevent pain, I feel I should—even if I keep becoming responsible for the mess.", score: { rescuing_control: 3 }, tags: ["rescue", "responsibility_blur"] },
          { label: "Watching them struggle feels intolerable, so I often intervene before they have to face the outcome.", score: { rescuing_control: 4 }, tags: ["rescue", "overfunction", "reactivity"] }
        ]
      },
      {
        text: "17) How often do you track small shifts in another person's tone, texts, or mood to decide whether you can relax?",
        options: [
          { label: "Rarely. I notice changes without making them the center of my nervous system.", score: { external_focus: 0 }, tags: ["self_regulated"] },
          { label: "Sometimes, especially during conflict.", score: { external_focus: 1 }, tags: ["some_external_focus"] },
          { label: "Often. I adjust myself quickly when I sense distance or irritation.", score: { external_focus: 3 }, tags: ["mood_tracking", "reactivity"] },
          { label: "Constantly. Their emotional state tells me whether I am safe, okay, or allowed to have needs.", score: { external_focus: 4 }, tags: ["mood_tracking", "emotional_fusion", "context_safety"] }
        ]
      },
      {
        text: "18) What happens when rest, privacy, or time alone conflicts with what someone close to you wants?",
        options: [
          { label: "I can protect the need without turning it into a moral failure.", score: { self_neglect: 0 }, tags: ["capacity_check"] },
          { label: "I negotiate, but I usually preserve some recovery time.", score: { self_neglect: 1 }, tags: ["bounded_help"] },
          { label: "I give up the rest, then tell myself I should not need so much.", score: { self_neglect: 3 }, tags: ["self_neglect", "guilt_mild"] },
          { label: "My own recovery feels optional when someone else wants access to me.", score: { self_neglect: 4 }, tags: ["self_neglect", "needs_lost"] }
        ]
      },
      {
        text: "19) If a close relationship ended tomorrow, which loss feels most frightening?",
        options: [
          { label: "Losing the person and the shared life. Painful, but I would still know who I am.", score: { approval_selfworth: 0 }, tags: ["identity_intact"] },
          { label: "The grief and disruption, though I know I could rebuild.", score: { approval_selfworth: 1 }, tags: ["balanced_approval"] },
          { label: "The feeling that I failed or was not valuable enough to keep the relationship.", score: { approval_selfworth: 3 }, tags: ["approval_linked", "self_doubt"] },
          { label: "Losing the role of being needed; I am not sure who I would be without it.", score: { approval_selfworth: 4 }, tags: ["worth_contingent", "needed_to_feel_worthy"] }
        ]
      },
      {
        text: "20) Which statement is closest to your relationship with your own voice?",
        options: [
          { label: "I can love people deeply without abandoning my preferences, limits, and separate identity.", score: { voice_identity: 0 }, tags: ["voice_present", "identity_intact"] },
          { label: "I bend sometimes, but I usually come back to myself.", score: { voice_identity: 1 }, tags: ["softened_voice"] },
          { label: "I often discover my real feelings only after I am alone, resentful, or exhausted.", score: { voice_identity: 3 }, tags: ["hide_self", "identity_blur"] },
          { label: "Keeping connection has become so important that my needs, opinions, and identity often disappear inside it.", score: { voice_identity: 4 }, tags: ["hide_self", "identity_blur", "self_erasure"] }
        ]
      }
    ],

    modifiers: [
      {
        id: "rescue_cycle",
        title: "Rescuing may be replacing support",
        copy: "Several answers suggest you may move from caring into taking responsibility for another adult's choices or consequences. Support helps someone carry their life; rescuing can accidentally carry it for them.",
        when: { tag: "rescue", min: 2 }
      },
      {
        id: "needed_to_feel_worthy",
        title: "Being needed may be tied to feeling valuable",
        copy: "Your answers suggest usefulness may sometimes function as reassurance that you matter. The growth edge is learning that closeness does not have to be earned through indispensability.",
        when: { tag: "needed_to_feel_worthy", min: 2 }
      },
      {
        id: "self_erasure",
        title: "Your own voice may be getting hard to hear",
        copy: "Several answers suggest you may edit, delay, or lose contact with your own preferences in order to protect connection. Rebuilding self-trust starts with noticing a preference before negotiating it.",
        when: { tag: "hide_self", min: 2 }
      },
      {
        id: "depletion",
        title: "Overgiving is becoming emotionally expensive",
        copy: "Resentment or exhaustion may be signaling that generosity has moved beyond your actual capacity. The goal is not to care less; it is to stop treating your capacity as unlimited.",
        when: { tag: "depletion", min: 2 }
      }
    ],

    results: {
      [K.balanced]: {
        title: "Balanced Care & Boundaries",
        subtitle: "You can care deeply without making another person's stability your full-time responsibility.",
        summary: "Your answers suggest relatively strong differentiation between caring for someone and taking over their life. You can usually notice your own needs, tolerate another person's disappointment, and remain connected without needing to be indispensable. That does not mean you never overgive; it means overgiving is less likely to organize the relationship.",
        bullets: [
          "Your needs remain visible alongside other people's needs.",
          "You can help without automatically rescuing.",
          "Your sense of worth appears to have sources outside being needed."
        ],
        what_it_looks_like: [
          "You can say no without turning it into proof that you are selfish.",
          "Another person's mood can matter without fully becoming your mood.",
          "Closeness does not require you to erase your separate identity."
        ],
        blindspots: [
          "Assuming healthy boundaries mean you should never feel guilt or conflict.",
          "Using a low score to dismiss one specific relationship where your boundaries are being pressured."
        ],
        scripts: [
          "“I care about you, and I trust you to handle this part yourself.”",
          "“I can help with ____, but I cannot take on the whole problem.”",
          "“I want to support you without losing the things I need to stay well too.”"
        ],
        next_steps: [
          "Protect your separate friendships, routines, and interests.",
          "Keep checking capacity before saying yes under pressure.",
          "Notice whether the relationship allows both people to be capable, responsible adults."
        ]
      },
      [K.stress]: {
        title: "Overgiving Under Stress",
        subtitle: "Your boundaries are present, but they become easier to abandon when someone you love is struggling.",
        summary: "Your pattern suggests that you usually have a sense of self and limits, but stress can pull you toward over-helping, mood tracking, or postponing your own needs. The issue may be less a fixed identity and more what happens when guilt, urgency, or fear of disappointing someone enters the room.",
        bullets: [
          "You can identify your limits, but pressure weakens them.",
          "Helping may become automatic before you check capacity.",
          "Your own needs can temporarily disappear during another person's crisis."
        ],
        what_it_looks_like: [
          "You say yes first and feel the cost later.",
          "You become more emotionally reactive when someone close to you is upset.",
          "You may need recovery after periods of intense caretaking."
        ],
        blindspots: [
          "Calling chronic overextension 'just being supportive.'",
          "Waiting for resentment before allowing yourself to reduce the load."
        ],
        scripts: [
          "“I want to help, but I need to check what I actually have capacity for.”",
          "“I can listen tonight; I cannot solve this for you.”",
          "“I need to come back to my own responsibilities before I take on more.”"
        ],
        next_steps: [
          "Insert a pause before yes: time, money, energy, and emotional capacity.",
          "Practice offering one bounded form of help instead of taking over.",
          "Track whether guilt falls after you hold a limit without repairing the other person's feelings."
        ]
      },
      [K.approval]: {
        title: "Approval-Linked Caretaking",
        subtitle: "Caring may sometimes be doing double duty: helping someone and reassuring you that you are good, needed, or safe in the relationship.",
        summary: "Your answers suggest that approval and usefulness may be strongly connected to self-worth. You may overgive not only because someone needs help, but because disappointing them can trigger self-doubt or fear about the relationship. That can make ordinary boundaries feel emotionally much bigger than they are.",
        bullets: [
          "Disapproval may quickly become self-doubt.",
          "Being needed can feel closely tied to being valuable.",
          "You may edit needs or opinions to protect closeness."
        ],
        what_it_looks_like: [
          "A simple no can feel like a referendum on your character.",
          "You may feel less secure when others become more independent.",
          "You often know what other people need before you know what you need."
        ],
        blindspots: [
          "Confusing being indispensable with being loved.",
          "Treating guilt as proof that a boundary is wrong."
        ],
        scripts: [
          "“You can be disappointed with my answer and I can still care about you.”",
          "“I do not need to earn closeness by fixing this.”",
          "“Let me tell you what I actually want before we negotiate.”"
        ],
        next_steps: [
          "Separate the question 'Are they happy with me?' from 'Was my boundary fair?'",
          "Build self-worth in roles where usefulness is not the price of belonging.",
          "Practice one preference per day that is not optimized around another person's reaction."
        ]
      },
      [K.rescuer]: {
        title: "Rescuer / Overfunctioning Pattern",
        subtitle: "You may be carrying responsibilities that belong partly—or entirely—to other adults.",
        summary: "Your answers suggest a recurring pattern of stepping in, preventing consequences, managing moods, or keeping relationships stable through extra labor. This can feel loving and competent while also making you chronically responsible for outcomes you cannot truly control.",
        bullets: [
          "You may notice problems and move to solve them before being asked.",
          "Other people's distress can create urgency in your nervous system.",
          "Your competence may be keeping an unequal system functioning."
        ],
        what_it_looks_like: [
          "You become planner, fixer, mediator, reminder system, or emotional first responder.",
          "Stepping back can feel dangerous even when continuing is exhausting.",
          "You may resent people for relying on support you repeatedly provide automatically."
        ],
        blindspots: [
          "Believing that if you can fix something, you are responsible for fixing it.",
          "Assuming another adult's discomfort means you have abandoned them."
        ],
        scripts: [
          "“I can support you, but I cannot manage this outcome for you.”",
          "“What do you think your next step is?”",
          "“I am stepping back from doing this part because it belongs to you.”"
        ],
        next_steps: [
          "Identify one responsibility you have adopted that is not actually yours.",
          "Replace solving with one question that returns agency to the other person.",
          "Expect discomfort when you stop overfunctioning; do not confuse discomfort with harm."
        ]
      },
      [K.high]: {
        title: "High Codependency-Like Pattern",
        subtitle: "Your answers suggest that connection may be costing too much self-neglect, over-responsibility, external focus, or loss of voice.",
        summary: "Your pattern shows strong codependency-like tendencies across several dimensions. You may be organizing significant parts of your emotional life around another person's mood, needs, choices, or approval while your own needs and identity receive less space. This is not a diagnosis. It is a signal that the relationship between care, responsibility, self-worth, and boundaries deserves serious attention.",
        bullets: [
          "Your wellbeing may be highly reactive to another person's emotional state.",
          "Boundaries can feel like guilt, danger, or abandonment rather than ordinary limits.",
          "Your own voice or identity may be difficult to access inside close relationships."
        ],
        what_it_looks_like: [
          "You can be exhausted and still feel responsible for giving more.",
          "Another person's independence may feel less reassuring than being needed.",
          "You may know how to care for everyone else more clearly than how to care for yourself."
        ],
        blindspots: [
          "Turning the label 'codependent' into another reason to shame yourself.",
          "Trying to stop caring instead of learning to care with boundaries and shared responsibility."
        ],
        scripts: [
          "“I love you, and I am no longer taking responsibility for choices that belong to you.”",
          "“I need time to notice what I want before I answer.”",
          "“I am working on helping from choice, not from guilt or fear.”"
        ],
        next_steps: [
          "Start with one boundary around time, money, rescuing, or emotional availability.",
          "Rebuild separate identity through routines, relationships, and goals that are yours.",
          "Consider qualified support if these patterns are longstanding, difficult to interrupt, or linked to unsafe relationship dynamics."
        ]
      }
    },

    faq: [
      {
        q: "What does codependency mean?",
        a: "Codependency is a non-diagnostic term used for patterns such as excessive other-focus, self-sacrifice, caretaking, difficulty with boundaries, low self-worth, emotional suppression, or trying to manage another person's behavior or outcomes."
      },
      {
        q: "Is codependency a mental health diagnosis?",
        a: "No. Codependency is not a formal mental health diagnosis. This quiz is an educational reflection tool and should not be interpreted as a clinical screening diagnosis."
      },
      {
        q: "What does the Codependency Pattern Score mean?",
        a: "It is a 0–100 reflection score based on this quiz's five dimensions. It is not a diagnostic probability or a validated clinical cutoff."
      },
      {
        q: "Can I be codependent without being in a romantic relationship?",
        a: "Codependency-like patterns can appear in romantic, family, friendship, caregiving, or other close relationships. Answer based on the close relationship pattern that feels most relevant."
      },
      {
        q: "Is helping someone the same as codependency?",
        a: "No. Healthy support can be generous and intensive. The concern is repeated self-neglect, blurred responsibility, approval-dependent helping, loss of voice, or rescuing that prevents mutual responsibility."
      },
      {
        q: "Can codependency patterns change?",
        a: "Yes. People can learn to tolerate others' disappointment, strengthen boundaries, notice their own needs, stop overfunctioning, and build a more separate sense of self. Longstanding patterns may be easier to change with qualified support."
      }
    ]
  };
})();
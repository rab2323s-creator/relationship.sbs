/* emotional-detachment.js — original educational relationship self-reflection test */
(function () {
  const SLUG = "emotional-detachment";

  const R = {
    engaged: "still_emotionally_engaged",
    strained: "strained_but_reachable",
    protective: "protective_withdrawal",
    detached: "relationship_specific_detachment",
    numb: "broader_emotional_numbness_signal"
  };

  const S = (detachment, dimension, dimensionScore=detachment, extra={}) => {
    const score = { detachment };
    if (dimension) score[dimension] = dimensionScore;
    Object.assign(score, extra);
    return { score };
  };

  window.TEST = {
    id: "emotional_detachment",
    slug: SLUG,
    title: "Emotional Detachment Test: Have You Emotionally Checked Out of Your Relationship?",
    blurb: "18 scenario-based questions exploring emotional presence, curiosity, withdrawal, relief through distance, and whether numbness extends beyond the relationship.",
    time: "3–4 min",
    intent: "quiz",
    keywords: [
      "emotional detachment test",
      "am i emotionally detached",
      "emotionally checked out of relationship quiz",
      "emotional numbness relationship test",
      "why do i feel detached from my partner",
      "do i still love my partner test",
      "am i losing feelings test",
      "emotional distance relationship quiz",
      "emotional disconnection test"
    ],

    questions: [
      {
        text: "1) Something genuinely good happens to you. Before you think about it, who do you want to tell?",
        options: [
          Object.assign({label:"My partner is still one of the first people I want to tell."}, S(0,"presence",0,{reach:2})),
          Object.assign({label:"Usually my partner, though I sometimes choose someone else if I need a certain kind of response."}, S(1,"presence",1,{reach:2})),
          Object.assign({label:"A friend, sibling, or no one. Telling my partner feels less emotionally rewarding than it used to."}, S(2,"presence",2,{reach:0})),
          Object.assign({label:"I barely think to tell them anymore. Our inner worlds feel mostly separate."}, S(3,"presence",3,{reach:0}))
        ]
      },
      {
        text: "2) Your partner looks at you and asks, “What’s really going on with you?” What happens inside?",
        options: [
          Object.assign({label:"I want to answer honestly, even if I need a moment to find the words."}, S(0,"disclosure",0,{reach:2})),
          Object.assign({label:"Part of me wants to answer, but I first check whether I have the energy for the conversation."}, S(1,"disclosure",1,{reach:2})),
          Object.assign({label:"I immediately simplify it: “I’m fine,” “just tired,” “nothing.”"}, S(2,"disclosure",2,{reach:0})),
          Object.assign({label:"I feel almost no wish to let them into what I’m carrying."}, S(3,"disclosure",3,{reach:0}))
        ]
      },
      {
        text: "3) Plans with your partner get canceled at the last minute, and nothing important replaces them. Your first honest reaction is…",
        options: [
          Object.assign({label:"Disappointment. I was looking forward to being together."}, S(0,"relief",0,{reach:2})),
          Object.assign({label:"Mixed. I miss them, but the extra space is also welcome."}, S(1,"relief",1,{reach:1})),
          Object.assign({label:"Relief. I suddenly feel like I can exhale or get my energy back."}, S(2,"relief",2,{reach:0})),
          Object.assign({label:"Strong relief—and sometimes I hope plans get canceled so I do not have to perform closeness."}, S(3,"relief",3,{reach:0}))
        ]
      },
      {
        text: "4) You have the same painful disagreement for the fourth time. What feels most true now?",
        options: [
          Object.assign({label:"I still want us to understand it and find a different way through."}, S(0,"withdrawal",0,{reach:2})),
          Object.assign({label:"I want repair, but I need the conversation to become more concrete and less repetitive."}, S(1,"withdrawal",1,{reach:2})),
          Object.assign({label:"I already know how the conversation ends, so I say less and protect my energy."}, S(2,"withdrawal",2,{reach:0})),
          Object.assign({label:"I no longer care whether we resolve it. I mostly want the interaction to stop."}, S(3,"withdrawal",3,{reach:0}))
        ]
      },
      {
        text: "5) When you picture your life one or two years from now, your partner appears in that picture…",
        options: [
          Object.assign({label:"Naturally. I do not have to force them into the future I imagine."}, S(0,"presence",0,{reach:2})),
          Object.assign({label:"Usually, but there are important questions I know we still need to answer."}, S(1,"presence",1,{reach:2})),
          Object.assign({label:"Only if I deliberately add them. My default future picture is becoming more individual."}, S(2,"presence",2,{reach:0})),
          Object.assign({label:"Rarely. Imagining a future without the relationship feels more emotionally real."}, S(3,"presence",3,{reach:0}))
        ]
      },
      {
        text: "6) Affection between you—hugging, kissing, touching, warmth—currently feels…",
        options: [
          Object.assign({label:"Emotionally meaningful most of the time, even if the intensity varies."}, S(0,"presence",0,{reach:2})),
          Object.assign({label:"Still real, but stress or unresolved tension sometimes makes it harder to feel."}, S(1,"presence",1,{reach:2})),
          Object.assign({label:"More habitual than felt. I can do it without feeling much connection underneath."}, S(2,"presence",2,{reach:0})),
          Object.assign({label:"Awkward, avoidable, or like a role I am expected to perform."}, S(3,"presence",3,{reach:0}))
        ]
      },
      {
        text: "7) Imagine your partner makes the change you have been asking for—and keeps it up consistently for several months. What do you imagine feeling?",
        options: [
          Object.assign({label:"Relief and renewed closeness. I still want the relationship to work."}, S(0,"withdrawal",0,{reach:3})),
          Object.assign({label:"Cautious hope. Trust would need time, but I would want to move toward them."}, S(1,"withdrawal",1,{reach:2})),
          Object.assign({label:"I would appreciate it, but I am not sure the emotional connection would come back."}, S(2,"withdrawal",2,{reach:0})),
          Object.assign({label:"Very little. Even the “fixed” version of the relationship no longer feels like what I want."}, S(3,"withdrawal",3,{reach:0}))
        ]
      },
      {
        text: "8) After a conflict, what do you most want from your partner?",
        options: [
          Object.assign({label:"Understanding, accountability, and a sense that we are emotionally together again."}, S(0,"withdrawal",0,{reach:2})),
          Object.assign({label:"A calmer conversation and some time to reconnect properly."}, S(1,"withdrawal",1,{reach:2})),
          Object.assign({label:"Mostly space. Repair often feels like one more emotional task."}, S(2,"withdrawal",2,{reach:0})),
          Object.assign({label:"Nothing in particular. Their apology or reassurance barely changes how I feel anymore."}, S(3,"withdrawal",3,{reach:0}))
        ]
      },
      {
        text: "9) Your partner starts telling you about something they are scared of. Your inner response is…",
        options: [
          Object.assign({label:"I become curious and want to understand what it is like for them."}, S(0,"curiosity",0,{reach:2})),
          Object.assign({label:"I care, though I sometimes need more emotional bandwidth to stay fully present."}, S(1,"curiosity",1,{reach:2})),
          Object.assign({label:"I listen, but part of me is waiting for the conversation to be over."}, S(2,"curiosity",2,{reach:0})),
          Object.assign({label:"Their inner world feels far away from me now, even when I know I should care."}, S(3,"curiosity",3,{reach:0}))
        ]
      },
      {
        text: "10) Your partner will be away for a week, and you know they will be safe. What feels closest?",
        options: [
          Object.assign({label:"I will enjoy my own space and also miss their presence."}, S(0,"relief",0,{reach:2})),
          Object.assign({label:"The break sounds good, but I expect I will want closeness again by the end."}, S(1,"relief",1,{reach:2})),
          Object.assign({label:"I mostly feel relief at the thought of not managing the relationship for a while."}, S(2,"relief",2,{reach:0})),
          Object.assign({label:"The thought of the week alone feels better than the thought of them coming back."}, S(3,"relief",3,{reach:0}))
        ]
      },
      {
        text: "11) If your partner becomes quiet or distant for a day, your emotional reaction now is…",
        options: [
          Object.assign({label:"I notice and care, but I can check in without panicking."}, S(0,"presence",0,{reach:2})),
          Object.assign({label:"I notice it quickly and wonder what is happening between us."}, S(1,"presence",1,{reach:2})),
          Object.assign({label:"I notice, but it affects me much less than it used to."}, S(2,"presence",2,{reach:0})),
          Object.assign({label:"It barely reaches me. Sometimes their distance makes my day easier."}, S(3,"presence",3,{reach:0}))
        ]
      },
      {
        text: "12) Which kind of loneliness feels most familiar lately?",
        options: [
          Object.assign({label:"If I feel lonely, I usually still want to move toward my partner."}, S(0,"curiosity",0,{reach:2})),
          Object.assign({label:"I sometimes feel lonely beside them, but I still want us to find each other again."}, S(1,"curiosity",1,{reach:2})),
          Object.assign({label:"I feel lonely, but trying to reconnect often feels more exhausting than the loneliness itself."}, S(2,"curiosity",2,{reach:0})),
          Object.assign({label:"I feel emotionally alone and have mostly stopped expecting the relationship to change that."}, S(3,"curiosity",3,{reach:0}))
        ]
      },
      {
        text: "13) At family events, social gatherings, or ordinary routines, being “the partner” feels…",
        options: [
          Object.assign({label:"Like a real part of my life, not a performance."}, S(0,"disclosure",0,{reach:2})),
          Object.assign({label:"Mostly genuine, though some parts of us are strained right now."}, S(1,"disclosure",1,{reach:2})),
          Object.assign({label:"Sometimes like I am playing the role correctly while feeling different inside."}, S(2,"disclosure",2,{reach:0})),
          Object.assign({label:"Like a role I know how to perform even though the emotional meaning has thinned out."}, S(3,"disclosure",3,{reach:0}))
        ]
      },
      {
        text: "14) If your partner asked, “What have you stopped telling me because you assume I won’t understand?” you would…",
        options: [
          Object.assign({label:"Have an answer and want to share it."}, S(0,"disclosure",0,{reach:3})),
          Object.assign({label:"Need time, but I would want to try."}, S(1,"disclosure",1,{reach:2})),
          Object.assign({label:"Have several answers, but very little confidence that sharing them would help."}, S(2,"disclosure",2,{reach:0})),
          Object.assign({label:"Realize I no longer want them to have access to those parts of me."}, S(3,"disclosure",3,{reach:0}))
        ]
      },
      {
        text: "15) You unexpectedly get a completely free day together—no work, chores, or obligations. Your honest reaction is…",
        options: [
          Object.assign({label:"I can think of things I genuinely want to do with them."}, S(0,"relief",0,{reach:2})),
          Object.assign({label:"I want some time together and some time alone."}, S(1,"relief",1,{reach:2})),
          Object.assign({label:"I immediately start thinking about how to create some separate space."}, S(2,"relief",2,{reach:0})),
          Object.assign({label:"A full day together sounds emotionally heavier than a full day apart."}, S(3,"relief",3,{reach:0}))
        ]
      },
      {
        text: "16) Outside the relationship, how much do good things still reach you emotionally?",
        options: [
          Object.assign({label:"Quite a lot. Music, friends, work, hobbies, or good news can still move me."}, S(0,"global_numbness",0,{global:0})),
          Object.assign({label:"My feelings are a little muted lately, but pleasure and interest still show up."}, S(0,"global_numbness",1,{global:1})),
          Object.assign({label:"Many things I used to enjoy feel flatter than they used to."}, S(0,"global_numbness",2,{global:2})),
          Object.assign({label:"A lot of life feels emotionally distant or colorless, not just my relationship."}, S(0,"global_numbness",3,{global:3}))
        ]
      },
      {
        text: "17) With close friends or family you trust, emotional connection currently feels…",
        options: [
          Object.assign({label:"Alive. I can still laugh, care, open up, and feel close."}, S(0,"global_numbness",0,{global:0})),
          Object.assign({label:"Mostly available, though I have less energy than usual."}, S(0,"global_numbness",1,{global:1})),
          Object.assign({label:"Muted. I am pulling away from several people, not only my partner."}, S(0,"global_numbness",2,{global:2})),
          Object.assign({label:"Very distant. I feel emotionally removed from most people right now."}, S(0,"global_numbness",3,{global:3}))
        ]
      },
      {
        text: "18) When you ask yourself, “Do I feel detached from my partner—or detached from my life?” the most accurate answer is…",
        options: [
          Object.assign({label:"Mostly my partner or this relationship. I still feel like myself elsewhere."}, S(2,"global_numbness",0,{global:0,relationship_specific:2})),
          Object.assign({label:"Mostly the relationship, but stress is also dulling some other parts of life."}, S(1,"global_numbness",1,{global:1,relationship_specific:1})),
          Object.assign({label:"Both. The relationship feels distant, but so does a lot of the rest of my life."}, S(0,"global_numbness",2,{global:2})),
          Object.assign({label:"Mostly life in general. My emotional range feels reduced almost everywhere."}, S(0,"global_numbness",3,{global:3}))
        ]
      }
    ],

    results: {
      [R.engaged]: {
        title: "Still Emotionally Engaged — The Relationship Still Reaches You",
        subtitle: "Stress may be present, but your emotional investment is still active.",
        summary: "Your answers suggest that your partner still matters to you in an emotionally immediate way. You still want to share, understand, repair, and include them in your future. That does not mean everything is easy. It means the relationship still has access to your emotional attention—and that is different from simply staying out of habit.",
        bullets: [
          "You still want your partner to know what is happening inside you.",
          "Distance does not consistently feel better than connection.",
          "When something hurts, you still care whether repair happens."
        ],
        what_it_looks_like: [
          "You miss them without losing yourself.",
          "You still feel curiosity about their inner world.",
          "Conflict may strain you, but it has not made the relationship emotionally irrelevant."
        ],
        blindspots: [
          "Feeling connected does not mean every problem should be tolerated.",
          "Do not confuse high emotional investment with compatibility.",
          "A relationship can matter deeply and still need boundaries or change."
        ],
        scripts: [
          "“I still care about us, and I want to talk about what would make this feel better for both of us.”",
          "“I need some space tonight, but I do want to reconnect tomorrow.”",
          "“This still matters to me, which is why I do not want us to keep repeating the same pattern.”"
        ],
        next_steps: [
          "Protect the habits that keep your inner worlds visible to each other.",
          "Address recurring problems before repeated disappointment turns into withdrawal.",
          "Use the Emotional Intimacy Test if you want to examine the quality of closeness more specifically."
        ],
        cautions: ["Low detachment does not prove the relationship is healthy, safe, or right for you."]
      },

      [R.strained]: {
        title: "Strained but Reachable — Connection Is Tired, Not Gone",
        subtitle: "There is distance, but part of you still wants repair to work.",
        summary: "Your answers suggest that emotional connection has become harder to access, yet it has not disappeared. You may be tired, disappointed, or carrying unresolved tension, but you still show signs of wanting to be known, wanting repair, or imagining that meaningful change could bring closeness back. This is often where timing matters: strain can become disengagement if nothing changes for too long.",
        bullets: [
          "You may share less because emotional effort feels expensive.",
          "You still respond to evidence of care or change.",
          "The relationship feels strained rather than emotionally finished."
        ],
        what_it_looks_like: [
          "You need more energy to have conversations that once came naturally.",
          "You may welcome space without wanting permanent distance.",
          "You can still imagine moving toward your partner if the pattern improves."
        ],
        blindspots: [
          "Waiting for motivation before repairing can allow distance to harden.",
          "More conversation is not useful if the same injuries remain unaddressed.",
          "Stress outside the relationship can make the relationship look more broken than it is."
        ],
        scripts: [
          "“I am more distant than I want to be, and I think part of that is exhaustion.”",
          "“I do want us to feel close again, but repeating the same conversation is not helping.”",
          "“Can we choose one problem to work on instead of trying to fix the whole relationship tonight?”"
        ],
        next_steps: [
          "Identify the one unresolved pattern most responsible for emotional fatigue.",
          "Create one repeatable connection ritual that is not about problem-solving.",
          "Check whether sleep, stress, depression, caregiving, or burnout is reducing emotional capacity more broadly."
        ],
        cautions: ["Strain is not failure. The important question is whether both people are still willing and able to repair."]
      },

      [R.protective]: {
        title: "Protective Withdrawal — Distance Is Helping You Stop Getting Hurt",
        subtitle: "Your detachment may be functioning as protection more than indifference.",
        summary: "Your answers suggest that you have not simply stopped caring; you may have learned that caring openly costs too much. Repeated disappointment, circular conflict, unmet needs, or emotional overload can teach a person to invest less because investment keeps producing pain. The relief you feel through distance may be your system conserving energy or reducing exposure.",
        bullets: [
          "You may have stopped bringing problems up because you expect the same outcome.",
          "Space often feels safer or easier than emotional engagement.",
          "Part of you may still care while another part has stopped expecting repair."
        ],
        what_it_looks_like: [
          "You say less because explaining feels futile.",
          "You feel calmer when you stop hoping for a particular response.",
          "You may confuse emotional self-protection with having no feelings at all."
        ],
        blindspots: [
          "Protection can become permanent disengagement if nothing changes.",
          "A partner cannot respond to needs they never hear, but disclosure only helps where it is reasonably safe.",
          "Do not force vulnerability in a coercive, humiliating, or abusive relationship."
        ],
        scripts: [
          "“I notice I have stopped bringing things to you because I expect nothing will change.”",
          "“I am not trying to punish you with distance. I am trying to understand why distance feels safer.”",
          "“Before we talk about reconnecting, I need us to address the pattern that made me withdraw.”"
        ],
        next_steps: [
          "Name the repeated injury or failed repair underneath the withdrawal.",
          "Watch behavior after conversations—not just apologies or intentions.",
          "If the relationship is safe, consider structured couples work; if it is unsafe, prioritize individual support and safety."
        ],
        cautions: ["Protective withdrawal can be adaptive in an unsafe relationship. The goal is not automatically to become more open."]
      },

      [R.detached]: {
        title: "Relationship-Specific Detachment — Your Emotional Investment Has Thinned",
        subtitle: "You may still function as a couple while feeling increasingly separate inside.",
        summary: "Your answers suggest that the disconnection is concentrated in this relationship rather than across your whole emotional life. You may still care about your partner as a person, yet feel less curiosity, less desire for repair, less emotional impact from their attention, and more relief when distance increases. This does not automatically mean the relationship must end—but it is stronger than a temporary bad week.",
        bullets: [
          "The relationship may continue through routine more than emotional participation.",
          "You may feel more like yourself away from the relationship.",
          "Even imagined improvement does not fully restore your wish for closeness."
        ],
        what_it_looks_like: [
          "Important news no longer naturally flows toward your partner.",
          "The future is easier to imagine individually than together.",
          "You may perform the role of partner more easily than you feel the relationship."
        ],
        blindspots: [
          "Detachment can sometimes reverse after real repair, but it cannot be negotiated back through pressure.",
          "Guilt can keep a relationship functioning long after emotional investment has changed.",
          "Do not use one quiz result as a breakup verdict."
        ],
        scripts: [
          "“I need to be honest: I have felt increasingly emotionally separate from this relationship.”",
          "“I do not want to promise feelings I am not currently experiencing.”",
          "“I want us to look at whether there is something real to rebuild, not just whether we can keep the routine going.”"
        ],
        next_steps: [
          "Ask whether meaningful change would actually make you want closeness again.",
          "Separate love, loyalty, guilt, practical dependence, and romantic investment instead of treating them as one feeling.",
          "Consider individual or couples therapy if you want help deciding whether the disengagement is reversible."
        ],
        cautions: ["A high relationship-specific detachment signal is descriptive, not a command to stay or leave."]
      },

      [R.numb]: {
        title: "Broader Emotional Numbness Signal — This May Be Bigger Than the Relationship",
        subtitle: "Your answers suggest that emotional flatness may extend beyond your partner.",
        summary: "Your responses suggest that the relationship is not the only place where feeling has become muted. When friends, hobbies, good news, motivation, pleasure, sadness, or connection in general also feel flatter, it becomes harder to interpret relationship detachment in isolation. Depression, chronic stress, grief, trauma-related symptoms, sleep disruption, health factors, and some medications can affect emotional range.",
        bullets: [
          "Your emotional distance may not be specific to your partner.",
          "Major relationship conclusions are harder to interpret when much of life feels emotionally muted.",
          "The useful next question is what changed across your whole emotional system."
        ],
        what_it_looks_like: [
          "Things that used to matter feel less vivid in several parts of life.",
          "You may withdraw from multiple people, not only your partner.",
          "You can understand that something should feel important without strongly feeling it."
        ],
        blindspots: [
          "Do not assume the relationship is the sole cause of global numbness.",
          "Do not assume medication is the cause without medical guidance.",
          "Relationship problems and mental-health strain can coexist; one does not cancel the other."
        ],
        scripts: [
          "“I have noticed I feel emotionally flat in more areas than just our relationship.”",
          "“I do not want to make a huge relationship decision before I understand what is happening to my emotional range.”",
          "“I think I need support for the broader numbness, not only another conversation about us.”"
        ],
        next_steps: [
          "Notice whether sleep, stress, mood, pleasure, motivation, and social connection have changed together.",
          "Consider speaking with a qualified health or mental-health professional if the numbness is persistent or distressing.",
          "Revisit the relationship question after you have more information about the broader emotional pattern."
        ],
        cautions: ["This quiz cannot diagnose depression, trauma-related conditions, medication effects, or any other health condition."]
      }
    },

    faq: [
      {
        q: "What does an emotional detachment test measure?",
        a: "This test looks at relationship-specific emotional presence, disclosure, curiosity, withdrawal, relief through distance, and whether numbness appears to extend beyond the relationship. It is an original educational self-reflection tool, not a validated diagnostic instrument."
      },
      {
        q: "Does feeling emotionally detached mean I do not love my partner?",
        a: "Not necessarily. Detachment can come from chronic stress, repeated unresolved hurt, emotional exhaustion, depression-related blunting, attachment-based withdrawal, or genuine loss of relationship investment."
      },
      {
        q: "What is the difference between emotional detachment and emotional unavailability?",
        a: "Emotional unavailability is a broader pattern of limited emotional access or responsiveness. Emotional detachment can be a change within one specific relationship, including in someone who is emotionally available elsewhere."
      },
      {
        q: "Can avoidant attachment cause emotional detachment?",
        a: "Attachment avoidance can contribute to distancing and deactivating strategies, but emotional detachment is not the same thing as avoidant attachment and can happen for many other reasons."
      },
      {
        q: "What if I feel emotionally numb everywhere, not only with my partner?",
        a: "Broader emotional blunting can be associated with depression, chronic stress, grief, trauma-related symptoms, health issues, or medication effects. A self-reflection test cannot determine the cause, so persistent or distressing numbness is worth discussing with a qualified professional."
      }
    ]
  };
})();
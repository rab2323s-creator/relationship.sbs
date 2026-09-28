/* does-he-like-me.js — weighted observable-interest assessment */
(function () {
  const SLUG = "does-he-like-me";

  const R = {
    low: "low_observable_investment",
    friendly: "friendly_or_passive",
    mixed: "mixed_signals",
    cautious: "consistent_interest_cautious",
    strong: "strong_observable_interest"
  };

  const D = {
    signal: "interest_signal",
    initiation: "initiation",
    attention: "attention_responsiveness",
    consistency: "consistency_followthrough",
    investment: "investment_progression",
    clarity: "clarity_differentiation"
  };

  const opt = (label, factor, dim, maxPoints, tags=[]) => {
    const points = Math.round(maxPoints * factor * 100) / 100;
    return { label, score: { [D.signal]: points, [dim]: points }, tags };
  };

  window.TEST = {
    id: "does_he_like_me",
    slug: SLUG,
    title: "Does He Like Me? 15-Question Quiz: Is He Interested or Just Being Nice?",
    blurb: "15 behavior-based questions weighted by initiation, attention, consistency, effort, and whether the connection is actually moving forward.",
    time: "3–4 min",
    intent: "quiz",
    guide: "/blog/situationship-signs/",
    keywords: [
      "does he like me quiz",
      "does he like me",
      "signs he likes you",
      "how to know if a guy likes you",
      "does he like me or is he just being nice",
      "is he interested in me",
      "mixed signals from a guy",
      "does he like me over text",
      "how to tell if he likes you",
      "does my crush like me"
    ],

    questions: [
      {
        text: "1) Think about your last 10 conversations. Who usually creates the reason for contact?",
        options: [
          opt("He often starts them himself—even when there is no practical reason to text.", 1.00, D.initiation, 7, ["initiates","creates_contact"]),
          opt("It is fairly balanced; both of us naturally start conversations.", 0.78, D.initiation, 7, ["reciprocal"]),
          opt("I usually start, but he responds with real energy once I do.", 0.38, D.initiation, 7, ["only_replies"]),
          opt("If I do not start, we can go quiet for a long time.", 0.00, D.initiation, 7, ["only_replies","connection_depends_on_me"])
        ]
      },
      {
        text: "2) When you tell him something that matters to you, what happens next?",
        options: [
          opt("He listens, responds to the actual point, and asks something that shows he understood.", 1.00, D.attention, 5, ["responsive","specific_attention"]),
          opt("He is warm and engaged, though not especially curious every time.", 0.68, D.attention, 5, ["warm_response"]),
          opt("He reacts positively, but the conversation usually returns to him or stays surface-level.", 0.32, D.attention, 5, ["surface_response"]),
          opt("I often feel like I am supplying both the topic and the emotional energy.", 0.00, D.attention, 5, ["low_attention"])
        ]
      },
      {
        text: "3) You mention a small detail—a meeting, a favorite place, something you were nervous about. Later…",
        options: [
          opt("He remembers it and brings it up without needing a reminder.", 1.00, D.attention, 5, ["specific_attention","remembers"]),
          opt("He remembers the bigger things, even if smaller details slip.", 0.70, D.attention, 5, ["attentive"]),
          opt("He seems interested in the moment but rarely follows up later.", 0.32, D.attention, 5, ["moment_only"]),
          opt("I cannot think of many examples where he remembers or follows up.", 0.00, D.attention, 5, ["low_attention"])
        ]
      },
      {
        text: "4) When the two of you talk about seeing each other, what role does he usually take?",
        options: [
          opt("He turns interest into specifics: a day, a place, a plan.", 1.00, D.investment, 8, ["progresses","makes_plans"]),
          opt("He suggests ideas and usually helps turn them into a real plan.", 0.78, D.investment, 8, ["progresses","shared_effort"]),
          opt("He sounds enthusiastic when I suggest something, but I usually do the organizing.", 0.38, D.investment, 8, ["passive_interest"]),
          opt("Plans stay vague unless I push them forward.", 0.00, D.investment, 8, ["convenience_only","no_progress"])
        ]
      },
      {
        text: "5) A plan has to change. What best describes what he does?",
        options: [
          opt("He tells me, gives a real reason, and actively proposes another time.", 1.00, D.consistency, 9, ["follows_through","reschedules"]),
          opt("He apologizes and does reschedule, though sometimes I have to reopen the plan.", 0.68, D.consistency, 9, ["partial_followthrough"]),
          opt("He says 'we should do something soon' but leaves the replacement vague.", 0.28, D.consistency, 9, ["hot_cold","vague_plan"]),
          opt("The canceled plan usually disappears unless I bring it back.", 0.00, D.consistency, 9, ["hot_cold","connection_depends_on_me"])
        ]
      },
      {
        text: "6) Forget one unusually busy day. Across several weeks, his communication is…",
        options: [
          opt("Predictable enough that I rarely have to decode what a silence means.", 1.00, D.consistency, 7, ["follows_through","steady_contact"]),
          opt("Generally steady, with a few gaps that make sense in context.", 0.76, D.consistency, 7, ["steady_contact"]),
          opt("Warm in bursts, then noticeably distant without much explanation.", 0.28, D.consistency, 7, ["hot_cold"]),
          opt("Mostly dependent on when he is bored, lonely, or wants something.", 0.00, D.consistency, 7, ["hot_cold","convenience_only"])
        ]
      },
      {
        text: "7) In a group, how different is his attention toward you compared with how he treats everyone else?",
        options: [
          opt("There is a noticeable extra layer: he seeks me out, returns to me, or creates little one-to-one moments.", 1.00, D.clarity, 4, ["specific_interest","differentiated_attention"]),
          opt("There are hints of extra attention, but I am not sure it is unique to me.", 0.60, D.clarity, 4, ["ambiguous_specialness"]),
          opt("He is warm with me, but honestly he is warm with almost everyone.", 0.25, D.clarity, 4, ["friendly_general"]),
          opt("His behavior with me is not meaningfully different from his behavior with other people.", 0.00, D.clarity, 4, ["friendly_general"])
        ]
      },
      {
        text: "8) How much of his inner world does he voluntarily let you see?",
        options: [
          opt("He shares opinions, worries, stories, or personal details that create real mutual knowing.", 1.00, D.attention, 6, ["responsive","self_disclosure"]),
          opt("He opens up sometimes, especially when the conversation already feels close.", 0.68, D.attention, 6, ["some_disclosure"]),
          opt("He is friendly and talkative, but most of it could be said to almost anyone.", 0.30, D.attention, 6, ["surface_response","friendly_general"]),
          opt("I know surprisingly little about what he actually thinks or feels.", 0.00, D.attention, 6, ["low_attention"])
        ]
      },
      {
        text: "9) When seeing you requires a little inconvenience—travel, schedule changes, planning ahead—what happens?",
        options: [
          opt("He sometimes rearranges or plans around real constraints because seeing me matters to him.", 1.00, D.investment, 8, ["investment","makes_time"]),
          opt("He usually makes reasonable effort when there is a clear opportunity.", 0.72, D.investment, 8, ["shared_effort"]),
          opt("He is interested mainly when it is easy, spontaneous, or already fits his plans.", 0.28, D.investment, 8, ["convenience_only"]),
          opt("If effort is required, the connection usually stalls.", 0.00, D.investment, 8, ["convenience_only","no_progress"])
        ]
      },
      {
        text: "10) Imagine you stop initiating for a week. What is most likely to happen?",
        options: [
          opt("He notices the absence and creates contact on his own.", 1.00, D.initiation, 7, ["initiates","notices_absence"]),
          opt("He reaches out eventually, though maybe not as quickly as I would.", 0.70, D.initiation, 7, ["some_initiation"]),
          opt("He may send a reaction, meme, or low-effort signal, but not really restart the connection.", 0.28, D.initiation, 7, ["only_replies","breadcrumb_signal"]),
          opt("The connection would probably go quiet until I restarted it.", 0.00, D.initiation, 7, ["only_replies","connection_depends_on_me"])
        ]
      },
      {
        text: "11) You give him a low-pressure opening—'We should get coffee sometime.' His response is…",
        options: [
          opt("He turns it into action: 'Yes—how about Thursday?'", 1.00, D.clarity, 6, ["specific_interest","progresses"]),
          opt("He clearly says yes and follows up soon with something concrete.", 0.82, D.clarity, 6, ["specific_interest","follows_through"]),
          opt("He sounds positive—'definitely!'—but never converts it into a plan.", 0.28, D.clarity, 6, ["vague_plan","friendly_general"]),
          opt("He keeps it polite but avoids giving the idea anywhere to go.", 0.00, D.clarity, 6, ["low_clarity","no_progress"])
        ]
      },
      {
        text: "12) Over time, is the connection actually moving somewhere?",
        options: [
          opt("Yes. Contact becomes more intentional, time together increases, and he creates new steps forward.", 1.00, D.investment, 9, ["progresses","investment"]),
          opt("Slowly. There is movement, but he seems cautious or gradual.", 0.72, D.investment, 9, ["progresses","cautious_progress"]),
          opt("The chemistry repeats, but the relationship stays in almost the same place.", 0.26, D.investment, 9, ["no_progress","mixed_signal"]),
          opt("It mostly cycles through attention and distance without building anything.", 0.00, D.investment, 9, ["no_progress","hot_cold"])
        ]
      },
      {
        text: "13) After a particularly warm, flirty, or emotionally close moment, what happens in the days after?",
        options: [
          opt("His behavior stays recognizably warm and engaged; the moment fits the larger pattern.", 1.00, D.consistency, 8, ["follows_through","warm_followthrough"]),
          opt("He stays connected, even if the intensity naturally settles.", 0.76, D.consistency, 8, ["warm_followthrough"]),
          opt("He often pulls back enough that I wonder whether I imagined the closeness.", 0.25, D.consistency, 8, ["hot_cold","mixed_signal"]),
          opt("The warm moments are intense, but they rarely change what he consistently does afterward.", 0.00, D.consistency, 8, ["hot_cold","moment_only"])
        ]
      },
      {
        text: "14) If you removed flirting, emojis, compliments, and eye contact, what evidence of special interest would still be left?",
        options: [
          opt("Plenty: initiative, time, follow-up, one-to-one plans, and a clear pattern of choosing contact with me.", 1.00, D.clarity, 5, ["specific_interest","behavior_over_vibes"]),
          opt("Some: he makes effort, but the romantic meaning is still not fully clear.", 0.66, D.clarity, 5, ["ambiguous_specialness"]),
          opt("Mostly chemistry and friendliness; the behavioral evidence is thin.", 0.25, D.clarity, 5, ["friendly_general","vibes_only"]),
          opt("Very little. Most of what feels romantic comes from interpretation rather than repeated action.", 0.00, D.clarity, 5, ["friendly_general","low_clarity"])
        ]
      },
      {
        text: "15) If nothing changed for the next month, who would be carrying the connection forward?",
        options: [
          opt("Both of us. The connection has momentum that does not depend on one person chasing.", 1.00, D.initiation, 6, ["reciprocal","progresses"]),
          opt("Probably him slightly more—or at least enough that I would not need to manage it.", 0.82, D.initiation, 6, ["initiates"]),
          opt("Probably me. He participates, but I create most of the momentum.", 0.30, D.initiation, 6, ["only_replies","connection_depends_on_me"]),
          opt("Definitely me. Without my effort, there is not much relationship to measure.", 0.00, D.initiation, 6, ["only_replies","connection_depends_on_me"])
        ]
      }
    ],

    inconsistency_rules: [
      { a: "initiates", b: "connection_depends_on_me" },
      { a: "follows_through", b: "hot_cold" },
      { a: "specific_interest", b: "friendly_general" },
      { a: "progresses", b: "no_progress" }
    ],

    modifiers: [
      {
        id: "initiative_is_real",
        title: "He creates contact, not just responses",
        copy: "Across your answers, he appears to generate reasons to talk or reconnect rather than simply being receptive when you do the work.",
        when: { tag: "initiates", min: 2 }
      },
      {
        id: "responsive_not_initiating",
        title: "Warm responses may be doing more work than initiation",
        copy: "He may genuinely enjoy you while still leaving most of the momentum to you. Enjoying contact and actively pursuing more of it are different signals.",
        when: { tag: "only_replies", min: 2 }
      },
      {
        id: "followthrough_signal",
        title: "Follow-through strengthens the signal",
        copy: "Plans, rescheduling, and behavior after warm moments line up reasonably well. That is stronger evidence than a single flirty conversation.",
        when: { tag: "follows_through", min: 2 }
      },
      {
        id: "hot_cold_pattern",
        title: "The strongest issue is inconsistency",
        copy: "Warm moments appear to be followed by enough distance or vagueness that the pattern becomes harder to interpret confidently.",
        when: { tag: "hot_cold", min: 2 }
      },
      {
        id: "specific_interest",
        title: "His attention looks specific to you",
        copy: "Your answers suggest his behavior toward you differs in meaningful ways from general friendliness or social warmth.",
        when: { tag: "specific_interest", min: 2 }
      },
      {
        id: "general_friendliness",
        title: "Friendliness may be inflating the signal",
        copy: "Some of the behaviors that feel special may also be part of how he naturally treats other people, so direction and follow-through matter more.",
        when: { tag: "friendly_general", min: 2 }
      },
      {
        id: "progression_signal",
        title: "The connection is actually progressing",
        copy: "Your answers show movement over time—more intentional contact, real plans, or increased closeness rather than the same ambiguous moment repeating.",
        when: { tag: "progresses", min: 2 }
      },
      {
        id: "convenience_pattern",
        title: "Interest may be convenience-dependent",
        copy: "The connection seems strongest when access is easy. Genuine interest can be cautious, but it usually creates some effort when convenience disappears.",
        when: { tag: "convenience_only", min: 2 }
      }
    ],

    results: {
      [R.low]: {
        title: "Low Observable Investment — The Evidence Is Thin Right Now",
        subtitle: "There may be warmth, attraction, or friendliness, but the behavior is not currently building a strong case for active romantic pursuit.",
        summary: "Your answers suggest that most of the momentum is not coming from him. That does not prove he feels nothing—private feelings are not directly measurable—but observable interest usually leaves some behavioral trail: initiation, follow-up, time, specificity, or progression. In your pattern, that trail appears limited right now. The most useful move is not to search harder for hidden signs; it is to stop supplying missing evidence with interpretation.",
        bullets: [
          "Initiation or follow-through appears limited.",
          "The connection may rely heavily on your effort or interpretation.",
          "There is not yet enough repeated behavior to treat attraction as established."
        ],
        what_it_looks_like: [
          "He may respond when you reach out without creating much contact himself.",
          "Warm moments do not reliably become plans or progression.",
          "Friendly behavior may be easier to find than directional romantic behavior."
        ],
        blindspots: [
          "A shy person can move slowly, but shyness does not make all observable investment disappear forever.",
          "One intense moment should not outweigh several weeks of low effort.",
          "Do not use a quiz to declare what someone secretly feels."
        ],
        scripts: [
          "“I’ve enjoyed talking with you. Want to grab coffee Thursday?”",
          "“I’m going to leave the ball in your court—let me know if you want to make a plan.”",
          "“I like clarity more than guessing, so I’m watching what actually develops.”"
        ],
        next_steps: [
          "Make at most one clear, low-pressure opening if you genuinely want clarity.",
          "Then watch whether he creates any momentum without being coached into it.",
          "If the connection remains one-sided, treat that as useful information rather than a puzzle."
        ],
        cautions: ["Low observable investment is not proof of his private feelings; it describes the behavior pattern you reported."]
      },

      [R.friendly]: {
        title: "Mostly Friendly or Passive — He May Enjoy You Without Clearly Pursuing You",
        subtitle: "There is positive connection here, but friendliness and romantic intention are still overlapping too much to separate cleanly.",
        summary: "Your answers suggest that he likely enjoys interacting with you, but the pattern does not yet show enough direction to confidently call it active romantic interest. He may be receptive, warm, attentive, or even flirty while still allowing you to create most of the contact or progression. The distinction to watch is simple: does he begin turning positive moments into his own initiative, plans, and follow-through?",
        bullets: [
          "Warmth is present, but direction is weaker.",
          "He may participate more than he initiates.",
          "The next useful evidence is behavior that moves the connection forward."
        ],
        what_it_looks_like: [
          "Conversation feels good once it starts.",
          "He may say yes more easily than he proposes.",
          "You can find signs of liking, but fewer signs of pursuit."
        ],
        blindspots: [
          "Friendly people can produce many of the same surface signals as romantic interest.",
          "Do not interpret politeness, fast replies, or eye contact as decisive by themselves.",
          "Attraction without action can still leave you in the same practical position."
        ],
        scripts: [
          "“I’d be up for seeing you one-on-one—want to pick a day?”",
          "“I’m interested, but I don’t want to build the whole connection myself.”",
          "“No pressure. If you want to make a plan, I’m open.”"
        ],
        next_steps: [
          "Give the connection one clear opportunity to become more directional.",
          "Pay attention to whether he follows up without repeated prompting.",
          "Compare how he treats you with how he treats friends generally."
        ],
        cautions: ["Enjoying your company and wanting a romantic relationship are not the same thing."]
      },

      [R.mixed]: {
        title: "Mixed Signals — Interest Is Possible, but the Evidence Does Not Agree With Itself",
        subtitle: "Some behaviors point toward attraction while others weaken the case through inconsistency, passivity, or stalled progression.",
        summary: "Your answers contain enough positive signals that dismissing the connection as purely friendly would be too simple. But they also contain enough contradiction that a confident yes would be too simple. This is the zone where people often start overvaluing chemistry and undervaluing follow-through. The question is not whether every signal is positive. It is whether the higher-value signals—initiative, consistency, effort, and progression—begin to line up over time.",
        bullets: [
          "There are real positive signals, but they are not yet coherent.",
          "Warmth may be stronger than follow-through.",
          "The pattern needs time or one direct reality check more than additional decoding."
        ],
        what_it_looks_like: [
          "He may initiate strongly, then fade.",
          "He may flirt or disclose without moving toward a plan.",
          "You may alternate between feeling certain and feeling foolish."
        ],
        blindspots: [
          "Uncertainty itself can intensify preoccupation, making ambiguous signals feel more important than they are.",
          "Do not treat emotional intensity as evidence of mutual intention.",
          "A mixed pattern can come from caution, limited availability, ambivalence, or low investment; a quiz cannot identify motive."
        ],
        scripts: [
          "“I like our vibe, but I’m not great at reading mixed signals. Want to go on an actual date?”",
          "“I’m open to this, but I need it to become a little more consistent to invest more.”",
          "“I’d rather know what we’re doing than keep guessing from texts.”"
        ],
        next_steps: [
          "Stop collecting tiny signals and look for one meaningful next behavior.",
          "If appropriate, make a clear low-pressure invitation or ask a simple direct question.",
          "Judge the response by both words and what happens afterward."
        ],
        cautions: ["Mixed signals are evidence of ambiguity, not evidence that someone is secretly more interested than they show."]
      },

      [R.cautious]: {
        title: "Consistent Interest, Cautious Pace — The Pattern Is Moving Toward You",
        subtitle: "His behavior shows meaningful investment even if the pace is not especially bold or fast.",
        summary: "Your answers suggest more than friendliness: he appears to create contact, pay attention, invest effort, and maintain enough consistency that the connection has direction. What keeps this below the strongest range is likely caution, slower progression, or one area where the signal is less clear. That can happen when someone is shy, deliberate, busy, or still assessing compatibility. The important point is that caution and passivity are not the same thing—cautious interest still produces behavior.",
        bullets: [
          "Initiative and follow-through are present often enough to matter.",
          "The connection appears to have direction rather than only chemistry.",
          "One or two dimensions remain slower or less explicit."
        ],
        what_it_looks_like: [
          "He creates reasons to stay connected.",
          "Plans and warm moments tend to have follow-through.",
          "Progress may be gradual, but it is measurable."
        ],
        blindspots: [
          "Good signals do not guarantee compatibility or future commitment.",
          "Do not rush a slow but healthy pattern just to eliminate all uncertainty.",
          "Still watch whether effort remains reciprocal as the connection develops."
        ],
        scripts: [
          "“I’m enjoying this. I’d be open to seeing where it goes.”",
          "“I like the pace, and I also appreciate clear plans.”",
          "“You don’t have to be dramatic about it—I just like knowing when interest is mutual.”"
        ],
        next_steps: [
          "Let the pattern continue without taking over the momentum.",
          "Match effort rather than escalating far beyond it.",
          "If clarity becomes necessary, ask directly instead of testing him indirectly."
        ],
        cautions: ["This result describes observable interest signals, not certainty about his private feelings or future intentions."]
      },

      [R.strong]: {
        title: "Strong Observable Interest — His Actions Are Repeatedly Moving Toward You",
        subtitle: "The strongest signals are not the flirting; they are the repeated choices to initiate, invest, follow through, and create progression.",
        summary: "Your answers describe a pattern in which his attention is not only warm but directional. He appears to create contact, remember and respond to you specifically, make or protect plans, and keep the connection moving after emotionally close moments. That is much stronger evidence of romantic interest than eye contact, emojis, or fast replies alone. It still cannot prove what he feels internally, but the behavior you reported is highly consistent with active interest.",
        bullets: [
          "He creates momentum instead of merely accepting yours.",
          "Interest survives inconvenience and ordinary days.",
          "Warm moments are supported by follow-through and progression."
        ],
        what_it_looks_like: [
          "He makes plans rather than leaving everything hypothetical.",
          "His attention toward you is meaningfully specific.",
          "The connection continues to build without you having to manufacture every next step."
        ],
        blindspots: [
          "Strong interest is not the same as emotional compatibility, respect, or long-term fit.",
          "Do not ignore boundaries or red flags simply because attraction looks mutual.",
          "The clearest confirmation still comes from honest conversation and continued behavior."
        ],
        scripts: [
          "“I’m getting the sense this is mutual. I’d like to explore it.”",
          "“I like what’s developing between us—want to call this a date?”",
          "“I’m enjoying the consistency. Let’s keep seeing where this goes.”"
        ],
        next_steps: [
          "Respond to the interest without playing artificial distance games.",
          "Keep noticing compatibility, respect, and emotional safety—not only attraction.",
          "When the timing is right, replace inference with a direct conversation."
        ],
        cautions: ["Even a strong observable pattern is not mind-reading; it is evidence from behavior, not access to another person's internal state."]
      }
    },

    faq: [
      {
        q: "Can this quiz really tell if he likes me?",
        a: "It cannot read his mind. It organizes observable behavior—initiation, responsiveness, consistency, effort, progression, and whether his attention is specific to you—to show how strong the evidence of active interest appears."
      },
      {
        q: "Does fast texting mean he likes me?",
        a: "Not by itself. Fast replies can reflect phone habits or availability. Reopening conversations, asking follow-up questions, making plans, and following through usually provide more useful evidence."
      },
      {
        q: "What if he is shy?",
        a: "Shyness can reduce bold flirting or direct statements, but interest can still appear through smaller repeated behaviors such as seeking contact, remembering details, making time, accepting openings, and following through."
      },
      {
        q: "How can I tell if he likes me or is just being nice?",
        a: "Look for directionality. Friendliness is often broad and low-cost. Romantic interest is more likely to become specific to you and to create initiative, one-to-one time, follow-up, or progression."
      },
      {
        q: "What do mixed signals mean?",
        a: "They mean the evidence is mixed. They do not reveal a hidden motive by themselves. The most useful next step is usually to watch whether higher-value behaviors become more consistent or to ask a clear, low-pressure question."
      }
    ]
  };
})();
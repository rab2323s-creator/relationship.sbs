/* are-you-settling.js — single test definition */
(function () {
  const SLUG = "are-you-settling";

  const K = {
    met: "grounded_and_met",
    noticed: "needs_noticed_not_met",
    quiet: "quiet_settling",
    loop: "self_abandonment_loop",
    reality: "under_investment_reality"
  };

  window.TEST = {
    id: "are_you_settling",
    slug: SLUG,
    title: "Are You Settling? Test — Are You Accepting Less Than You Need in Love?",
    blurb:
      "15 painfully accurate scenarios to reveal if you’re settling in love—plus scripts and next steps (ad-safe, no diagnosis).",
    time: "2–3 min",
    intent: "quiz",
    keywords: [
      "are you settling in your relationship",
      "settling in a relationship test",
      "accepting less than you deserve in love",
      "relationship not meeting my needs",
      "unhappy relationship but afraid to leave",
      "emotionally unavailable partner",
      "low effort relationship",
      "feeling unfulfilled in relationship",
      "should i stay or leave relationship",
      "needs not met in relationship",
      "am i settling for less"
    ],

    questions: [
      {
        text: "1) They cancel plans last minute… again. Your first thought is…",
        options: [
          { label: "I’m disappointed, and I expect a real reschedule with effort.", score: { [K.met]: 3 }, tags: ["standards","follow_through"] },
          { label: "I let it slide, but I quietly clock the pattern.", score: { [K.noticed]: 3 }, tags: ["notice","tolerate"] },
          { label: "I say “no worries” even though it stings more than I admit.", score: { [K.quiet]: 3 }, tags: ["shrink","smile_through"] },
          { label: "I start explaining my feelings perfectly so they won’t leave.", score: { [K.loop]: 3 }, tags: ["over_explain","fear"] }
        ]
      },
      {
        text: "2) When you ask for clarity (where this is going), they respond with…",
        options: [
          { label: "A clear answer—even if it’s uncomfortable.", score: { [K.met]: 3 }, tags: ["clarity"] },
          { label: "Some reassurance, but it stays vague over time.", score: { [K.noticed]: 3 }, tags: ["vague"] },
          { label: "A joke or a deflection, so you drop it.", score: { [K.quiet]: 3 }, tags: ["deflect"] },
          { label: "A reversal: now you feel needy for asking.", score: { [K.reality]: 3 }, tags: ["dismiss","low_investment"] }
        ]
      },
      {
        text: "3) You’re the one who usually initiates dates, talks, and repair.",
        options: [
          { label: "It’s balanced—if I step back, they step in.", score: { [K.met]: 3 }, tags: ["balanced"] },
          { label: "I initiate more, but they still show real effort sometimes.", score: { [K.noticed]: 3 }, tags: ["uneven"] },
          { label: "If I stop initiating, the relationship goes quiet.", score: { [K.reality]: 3 }, tags: ["low_investment"] },
          { label: "I initiate because silence makes me panic.", score: { [K.loop]: 3 }, tags: ["panic","chase"] }
        ]
      },
      {
        text: "4) They say they’re “bad at communication.” What happens after that?",
        options: [
          { label: "They try anyway—small changes show up consistently.", score: { [K.met]: 3 }, tags: ["growth"] },
          { label: "They improve briefly, then slip back.", score: { [K.noticed]: 3 }, tags: ["temporary"] },
          { label: "It becomes a permanent excuse you’re not allowed to mention.", score: { [K.quiet]: 3 }, tags: ["excuse"] },
          { label: "You become the coach, the therapist, and the reminder system.", score: { [K.loop]: 3 }, tags: ["carry"] }
        ]
      },
      {
        text: "5) When you’re upset, your emotions are treated like…",
        options: [
          { label: "Valid data—something to understand and repair.", score: { [K.met]: 3 }, tags: ["safe"] },
          { label: "Sometimes valid, sometimes “too much,” depending on their mood.", score: { [K.noticed]: 3 }, tags: ["conditional"] },
          { label: "Inconvenient. You end up comforting them.", score: { [K.quiet]: 3 }, tags: ["flip"] },
          { label: "A problem you must “fix” quickly so they don’t withdraw.", score: { [K.loop]: 3 }, tags: ["fear_withdraw"] }
        ]
      },
      {
        text: "6) You catch yourself editing your needs to sound more “reasonable.”",
        options: [
          { label: "I state needs clearly. I don’t audition for permission.", score: { [K.met]: 3 }, tags: ["direct"] },
          { label: "I soften them a bit, but I still ask.", score: { [K.noticed]: 3 }, tags: ["soften"] },
          { label: "I usually don’t ask anymore—I just manage my disappointment.", score: { [K.quiet]: 3 }, tags: ["stop_asking"] },
          { label: "I rewrite messages multiple times so I won’t be rejected.", score: { [K.loop]: 3 }, tags: ["anxious_editing"] }
        ]
      },
      {
        text: "7) When you imagine a year of this staying the same, you feel…",
        options: [
          { label: "Okay. We’re building something stable.", score: { [K.met]: 3 }, tags: ["stable"] },
          { label: "Uneasy. I’d need a few things to improve.", score: { [K.noticed]: 3 }, tags: ["needs"] },
          { label: "Tired. Like I’d be quietly lonely.", score: { [K.quiet]: 3 }, tags: ["lonely"] },
          { label: "Panicked. I already feel myself disappearing.", score: { [K.loop]: 3 }, tags: ["disappear"] }
        ]
      },
      {
        text: "8) They show up strong when it’s easy (fun, chemistry), but when it’s real (plans, effort)…",
        options: [
          { label: "They still show up. Fun and responsibility both exist.", score: { [K.met]: 3 }, tags: ["full_range"] },
          { label: "They try, but consistency is shaky.", score: { [K.noticed]: 3 }, tags: ["shaky"] },
          { label: "They fade when it requires effort.", score: { [K.reality]: 3 }, tags: ["convenience"] },
          { label: "I chase harder to pull them back in.", score: { [K.loop]: 3 }, tags: ["chase"] }
        ]
      },
      {
        text: "9) When you set a boundary, their response is…",
        options: [
          { label: "Respectful—even if they disagree.", score: { [K.met]: 3 }, tags: ["respect"] },
          { label: "Some pushback, then they adjust.", score: { [K.noticed]: 3 }, tags: ["pushback"] },
          { label: "They make you feel guilty for having needs.", score: { [K.quiet]: 3 }, tags: ["guilt"] },
          { label: "They ignore it, and you end up dropping it.", score: { [K.reality]: 3 }, tags: ["ignore"] }
        ]
      },
      {
        text: "10) You often feel like you’re “too much” for wanting… basic consistency.",
        options: [
          { label: "I don’t feel shame for needs. Needs are normal.", score: { [K.met]: 3 }, tags: ["no_shame"] },
          { label: "Sometimes I wonder if I’m asking too much.", score: { [K.noticed]: 3 }, tags: ["self_doubt"] },
          { label: "I tell myself not to ask so I won’t be disappointed.", score: { [K.quiet]: 3 }, tags: ["lower_needs"] },
          { label: "I beg for reassurance, then hate myself for it.", score: { [K.loop]: 3 }, tags: ["reassurance"] }
        ]
      },
      {
        text: "11) Their effort feels most like…",
        options: [
          { label: "Consistent: I don’t have to guess.", score: { [K.met]: 3 }, tags: ["consistent"] },
          { label: "Inconsistent: good weeks, then drop-offs.", score: { [K.noticed]: 3 }, tags: ["inconsistent"] },
          { label: "Minimal: I accept crumbs and call it love.", score: { [K.quiet]: 3 }, tags: ["crumbs"] },
          { label: "Convenience-based: they show up when it benefits them.", score: { [K.reality]: 3 }, tags: ["convenience"] }
        ]
      },
      {
        text: "12) When you’re proud of yourself, they…",
        options: [
          { label: "Celebrate you and make space for your shine.", score: { [K.met]: 3 }, tags: ["support"] },
          { label: "Are happy, but sometimes redirect attention.", score: { [K.noticed]: 3 }, tags: ["redirect"] },
          { label: "Downplay it or change the subject.", score: { [K.quiet]: 3 }, tags: ["downplay"] },
          { label: "Act distant or uninterested when you grow.", score: { [K.reality]: 3 }, tags: ["threatened"] }
        ]
      },
      {
        text: "13) You keep staying because…",
        options: [
          { label: "The relationship meets me, and growth is mutual.", score: { [K.met]: 3 }, tags: ["mutual"] },
          { label: "I believe a few shifts could make it work.", score: { [K.noticed]: 3 }, tags: ["hope"] },
          { label: "Leaving feels scarier than staying disappointed.", score: { [K.quiet]: 3 }, tags: ["fear_change"] },
          { label: "I’m afraid I won’t find better, so I accept less.", score: { [K.loop]: 3 }, tags: ["scarcity"] }
        ]
      },
      {
        text: "14) When you stop chasing (texts, plans, reassurance), they…",
        options: [
          { label: "Notice and reconnect with effort.", score: { [K.met]: 3 }, tags: ["step_in"] },
          { label: "Reach out, but not consistently.", score: { [K.noticed]: 3 }, tags: ["partial"] },
          { label: "Barely notice. The connection fades.", score: { [K.reality]: 3 }, tags: ["fade"] },
          { label: "Reach out only when they want attention again.", score: { [K.reality]: 3 }, tags: ["orbit"] }
        ]
      },
      {
        text: "15) The sentence that hits hardest is…",
        options: [
          { label: "“Love shouldn’t require me to shrink.”", score: { [K.met]: 3 }, tags: ["truth"] },
          { label: "“I keep waiting for the version of them I met at the start.”", score: { [K.noticed]: 3 }, tags: ["early_version"] },
          { label: "“I’m lonely in a relationship.”", score: { [K.quiet]: 3 }, tags: ["lonely"] },
          { label: "“I’m negotiating my needs like they’re a problem.”", score: { [K.loop]: 3 }, tags: ["negotiate_worth"] }
        ]
      }
    ],

    results: {
      [K.met]: {
        title: "Grounded & Met — You’re Not Shrinking to Keep Love",
        subtitle: "Your needs have a place here, and effort shows up consistently.",
        summary:
          "You may relate to a relationship where asking for clarity doesn’t create drama, and your needs aren’t treated like an inconvenience. Settling is unlikely when effort and respect are predictable—because you don’t have to chase basics. That doesn’t mean there’s never disappointment; it means repair and follow-through exist often enough that you can trust the pattern.",
        bullets: [
          "Consistency is real—you don’t have to guess.",
          "Boundaries are respected without punishment.",
          "Your voice doesn’t cost you closeness."
        ],
        scripts: [
          "“I appreciate how we repair. Can we keep a weekly check-in?”",
          "“I feel cared for when we follow through—thank you.”",
          "“Let’s keep effort consistent, even when life gets busy.”"
        ],
        next_steps: [
          "Protect the pattern: weekly check-in (15 minutes).",
          "Name appreciation out loud (it reinforces safety).",
          "Keep your life full outside the relationship."
        ],
        cautions: [
          "Trust patterns over one bad day—same rule for one good day."
        ]
      },

      [K.noticed]: {
        title: "Needs Noticed (Not Fully Met) — The Gap Is Small, But Real",
        subtitle: "You’re not asking for too much—you’re asking for consistency.",
        summary:
          "You may relate to a relationship that has real connection, but the follow-through isn’t always there. Some weeks feel solid, and other weeks you’re adapting—lowering expectations, picking better timing, or carrying the logistics. This isn’t necessarily “hopeless.” The key is whether requests lead to consistent behavior change over time.",
        bullets: [
          "Effort exists, but it can drop without repair.",
          "You notice yourself adapting more than you want to.",
          "You’d feel safer with clearer agreements."
        ],
        scripts: [
          "“I need one measurable change: can we make plans and confirm by __?”",
          "“I don’t need perfect—just consistent follow-through.”",
          "“If something changes, I need a heads-up instead of silence.”"
        ],
        next_steps: [
          "Ask for one measurable agreement (2–4 weeks).",
          "Track behavior, not promises.",
          "Stop softening needs until they disappear."
        ],
        cautions: [
          "If the gap stays the same after clear requests, it’s not a misunderstanding—it’s a pattern."
        ]
      },

      [K.quiet]: {
        title: "Quiet Settling — You’re Smiling Through Needs That Aren’t Being Met",
        subtitle: "The relationship may be calm, but you’re quietly lonely.",
        summary:
          "You may relate to a dynamic where you’ve become very good at minimizing your own needs. You say “it’s fine,” but your body doesn’t believe you. The hardest part about quiet settling is that it looks like maturity from the outside—while inside you’re carrying disappointment alone. The signal isn’t a fight. It’s the silence in you.",
        bullets: [
          "You avoid asking to avoid being disappointed.",
          "You carry emotional weight alone.",
          "You normalize crumbs because conflict feels worse."
        ],
        scripts: [
          "“I’ve been downplaying this. I need more consistency and effort.”",
          "“I don’t want to keep pretending I’m okay—can we talk honestly?”",
          "“I need a real plan and follow-through, not maybes.”"
        ],
        next_steps: [
          "Name one need you’ve been hiding.",
          "Ask once, clearly, without over-explaining.",
          "If nothing changes, take the data seriously."
        ],
        cautions: [
          "You’re not “too much” for wanting to feel chosen consistently."
        ]
      },

      [K.loop]: {
        title: "Self-Abandonment Loop — You’re Negotiating Your Worth to Keep Love",
        subtitle: "You’re working harder than the relationship is working for you.",
        summary:
          "You may relate to a pattern where you over-explain, edit yourself, and chase clarity because the alternative feels like losing the relationship. This doesn’t mean you’re weak—it means attachment plus uncertainty can hijack your self-trust. The biggest risk is that the relationship becomes a place where you earn safety instead of receiving it.",
        bullets: [
          "You over-explain to avoid withdrawal or rejection.",
          "Your needs feel like a liability you must manage.",
          "You feel relief only when you’re reassured."
        ],
        scripts: [
          "“I’m not going to over-explain. I need a clear yes or no.”",
          "“I care about us, but I won’t chase basic effort.”",
          "“If this can’t change, I’ll step back to protect myself.”"
        ],
        next_steps: [
          "Set a ‘one-message rule’ when triggered (no spiraling texts).",
          "Replace chasing with one request + a timeline.",
          "Build self-trust rituals: facts list, grounding, pause."
        ],
        cautions: [
          "You deserve love that doesn’t require you to disappear."
        ]
      },

      [K.reality]: {
        title: "Under-Investment Reality — The Effort May Not Match Your Needs",
        subtitle: "Your discomfort may be data, not insecurity.",
        summary:
          "You may relate to a relationship where effort is inconsistent or convenience-based. Plans stay vague, follow-through stays weak, and clarity is hard to get because it benefits the dynamic to stay undefined. This isn’t about labeling anyone. It’s about noticing whether the relationship reliably meets your needs—or relies on you to accept less.",
        bullets: [
          "The effort feels inconsistent or convenience-based.",
          "Plans stay vague, follow-through stays weak.",
          "You’re adapting to a pattern that doesn’t improve."
        ],
        scripts: [
          "“I’m looking for consistent effort. If that’s not what you want, I respect it—let’s be clear.”",
          "“I need a real plan. If you can’t commit to one, I’ll step back.”",
          "“I’m not available for on-and-off contact. Reach out if you want something steady.”"
        ],
        next_steps: [
          "Ask for one measurable change (plan + follow-through) within 2–4 weeks.",
          "If it stays vague, choose distance instead of negotiating basics.",
          "Use boundaries to protect your peace, not to force a response."
        ],
        cautions: [
          "If you keep lowering your needs, the relationship won’t suddenly rise to meet you."
        ]
      }
    },

    faq: [
      {
        q: "What does it mean to settle in a relationship?",
        a: "Settling usually means accepting a pattern that doesn’t meet your needs—often by shrinking your wants, ignoring recurring disappointments, or making peace with low effort to avoid losing the relationship."
      },
      {
        q: "Am I settling or is it just a rough patch?",
        a: "A rough patch improves with repair and follow-through. Settling feels like you keep adapting, but the core pattern stays the same—especially around effort, respect, communication, and emotional availability."
      },
      {
        q: "Why do I stay even when I feel unfulfilled in my relationship?",
        a: "Many people stay because of attachment, hope, fear of starting over, or the belief that asking for more is ‘too much.’ This test helps you separate hope from repeated reality."
      },
      {
        q: "How do I ask for more without sounding needy?",
        a: "Use a short, specific request and a measurable agreement. The key is clarity plus follow-through—not long explanations. If the pattern doesn’t change over time, the issue is often compatibility or investment."
      },
      {
        q: "What if they don’t change after I communicate clearly?",
        a: "Then the data is in the pattern. If requests are respectful and specific, and nothing shifts over weeks, it may not be a communication issue—it may be a mismatch in effort or priorities."
      }
    ]
  };
})();

 /* what-kind-of-lover-are-you-test.js — single test definition */
(function () {
  const SLUG = "what-kind-of-lover-are-you-test";

  const K = {
    steady: "steady_lover",
    magnetic: "magnetic_lover",
    devoted: "devoted_lover",
    guarded: "guarded_lover",
    allin: "all_in_lover"
  };

  window.TEST = {
    id: "what_kind_of_lover_are_you_test",
    slug: SLUG,
    title: "What Kind of Lover Are You? Love Personality Test",
    blurb:
      "15 emotionally sharp questions to reveal your true lover type, love style, and relationship patterns—plus scripts and next steps (ad-safe).",
    time: "60–90 sec",
    intent: "quiz",
    keywords: [
      "what kind of lover are you",
      "love personality test",
      "lover type quiz",
      "love style quiz",
      "types of lovers",
      "true love style",
      "how your love personality affects relationships",
      "different lover types explained",
      "can your love style change over time",
      "why some lovers attract toxic relationships",
      "psychology behind love personalities"
    ],

    questions: [
      {
        text: "1) When someone starts mattering to you, your instinct is to…",
        options: [
          { label: "Stay open, steady, and let things deepen naturally.", score: { [K.steady]: 3 }, tags: ["steady_start"] },
          { label: "Feel the spark immediately and want more of it fast.", score: { [K.magnetic]: 3 }, tags: ["spark"] },
          { label: "Start showing care through effort, reliability, and loyalty.", score: { [K.devoted]: 3 }, tags: ["loyal"] },
          { label: "Keep part of yourself protected until trust feels real.", score: { [K.guarded]: 3 }, tags: ["protect"] }
        ]
      },
      {
        text: "2) The moment that makes you feel most loved is…",
        options: [
          { label: "When someone is consistent, calm, and emotionally present.", score: { [K.steady]: 3 }, tags: ["consistency"] },
          { label: "When the chemistry is intense and unmistakable.", score: { [K.magnetic]: 3 }, tags: ["chemistry"] },
          { label: "When someone chooses me clearly and follows through.", score: { [K.devoted]: 3 }, tags: ["chosen"] },
          { label: "When someone notices my inner world without forcing it open.", score: { [K.guarded]: 3 }, tags: ["seen"] }
        ]
      },
      {
        text: "3) In the early stage of love, you tend to…",
        options: [
          { label: "Pace yourself and let trust build step by step.", score: { [K.steady]: 3 }, tags: ["pace"] },
          { label: "Dive into the feeling and live inside the emotional charge.", score: { [K.magnetic]: 3 }, tags: ["dive"] },
          { label: "Start caring hard and giving more than you probably should.", score: { [K.devoted]: 3 }, tags: ["overgive"] },
          { label: "Watch carefully before fully letting yourself attach.", score: { [K.guarded]: 3 }, tags: ["watch"] }
        ]
      },
      {
        text: "4) When affection becomes uncertain, your heart usually…",
        options: [
          { label: "Wants clarity, but stays grounded.", score: { [K.steady]: 3 }, tags: ["grounded"] },
          { label: "Feels the pull more strongly, like mystery intensifies desire.", score: { [K.magnetic]: 3 }, tags: ["mystery_pull"] },
          { label: "Tries harder, gives more, and hopes effort will restore closeness.", score: { [K.devoted]: 3 }, tags: ["try_harder"] },
          { label: "Pulls inward and becomes harder to reach.", score: { [K.guarded]: 3 }, tags: ["inward"] }
        ]
      },
      {
        text: "5) The sentence that sounds most like you is…",
        options: [
          { label: "“Love should feel safe, not confusing.”", score: { [K.steady]: 3 }, tags: ["safe"] },
          { label: "“If it doesn’t move me deeply, I don’t feel it.”", score: { [K.magnetic]: 3 }, tags: ["deeply"] },
          { label: "“I love by showing up, even when it’s hard.”", score: { [K.devoted]: 3 }, tags: ["show_up"] },
          { label: "“I don’t open easily, but when I do, it matters.”", score: { [K.guarded]: 3 }, tags: ["hard_open"] }
        ]
      },
      {
        text: "6) In conflict, your default is to…",
        options: [
          { label: "Talk clearly and repair without drama.", score: { [K.steady]: 3 }, tags: ["repair"] },
          { label: "Feel everything intensely and want emotional honesty right now.", score: { [K.magnetic]: 3 }, tags: ["intense_conflict"] },
          { label: "Keep the bond together, even if you carry more than your share.", score: { [K.devoted]: 3 }, tags: ["carry"] },
          { label: "Need time to process before you can speak openly.", score: { [K.guarded]: 3 }, tags: ["process"] }
        ]
      },
      {
        text: "7) What attracts you first is usually…",
        options: [
          { label: "A calm presence that feels emotionally trustworthy.", score: { [K.steady]: 3 }, tags: ["trustworthy"] },
          { label: "A strong pull, depth, mystery, and emotional electricity.", score: { [K.magnetic]: 3 }, tags: ["electricity"] },
          { label: "Someone who seems worth investing in deeply.", score: { [K.devoted]: 3 }, tags: ["invest"] },
          { label: "Quiet emotional intelligence and subtle depth.", score: { [K.guarded]: 3 }, tags: ["subtle_depth"] }
        ]
      },
      {
        text: "8) When you really love someone, you often become…",
        options: [
          { label: "Steadier, kinder, and more intentional.", score: { [K.steady]: 3 }, tags: ["intentional"] },
          { label: "More alive, expressive, and emotionally vivid.", score: { [K.magnetic]: 3 }, tags: ["alive"] },
          { label: "More loyal, helpful, and willing to sacrifice.", score: { [K.devoted]: 3 }, tags: ["sacrifice"] },
          { label: "More sensitive to trust, sincerity, and emotional safety.", score: { [K.guarded]: 3 }, tags: ["safety"] }
        ]
      },
      {
        text: "9) Your biggest blind spot in love is often…",
        options: [
          { label: "Assuming calm means everything is fine.", score: { [K.steady]: 3 }, tags: ["assume_fine"] },
          { label: "Mistaking intensity for compatibility.", score: { [K.magnetic]: 3 }, tags: ["intensity"] },
          { label: "Overgiving before effort is truly mutual.", score: { [K.devoted]: 3 }, tags: ["mutuality"] },
          { label: "Protecting yourself so much that love feels distant.", score: { [K.guarded]: 3 }, tags: ["distance"] }
        ]
      },
      {
        text: "10) What hurts you most in love is…",
        options: [
          { label: "Instability where there should be trust.", score: { [K.steady]: 3 }, tags: ["instability"] },
          { label: "Feeling emotionally flat or uninspired.", score: { [K.magnetic]: 3 }, tags: ["flat"] },
          { label: "Feeling unchosen after giving so much.", score: { [K.devoted]: 3 }, tags: ["unchosen"] },
          { label: "Feeling emotionally exposed without real safety.", score: { [K.guarded]: 3 }, tags: ["exposed"] }
        ]
      },
      {
        text: "11) If someone loves you well, they usually…",
        options: [
          { label: "Show consistency, honesty, and follow-through.", score: { [K.steady]: 3 }, tags: ["follow_through"] },
          { label: "Meet your depth instead of fearing it.", score: { [K.magnetic]: 3 }, tags: ["meet_depth"] },
          { label: "Reciprocate care instead of just receiving it.", score: { [K.devoted]: 3 }, tags: ["reciprocate"] },
          { label: "Respect your pace and earn deeper access over time.", score: { [K.guarded]: 3 }, tags: ["earn_access"] }
        ]
      },
      {
        text: "12) The way you know you’re falling is…",
        options: [
          { label: "You feel calmer, not more chaotic.", score: { [K.steady]: 3 }, tags: ["calmer"] },
          { label: "Your whole emotional world feels brighter and louder.", score: { [K.magnetic]: 3 }, tags: ["brighter"] },
          { label: "You start caring through action before words.", score: { [K.devoted]: 3 }, tags: ["action"] },
          { label: "You start revealing parts of yourself you usually keep hidden.", score: { [K.guarded]: 3 }, tags: ["reveal"] }
        ]
      },
      {
        text: "13) Why some lovers attract toxic relationships often comes down to…",
        options: [
          { label: "Wanting harmony so badly they ignore subtle problems.", score: { [K.steady]: 3 }, tags: ["ignore_problems"] },
          { label: "Chasing intensity that can hide instability.", score: { [K.magnetic]: 3 }, tags: ["chase_intensity"] },
          { label: "Staying loyal long after reciprocity disappears.", score: { [K.devoted]: 3 }, tags: ["loyal_too_long"] },
          { label: "Trusting too slowly, then attaching hard once they finally do.", score: { [K.guarded]: 3 }, tags: ["late_attach"] }
        ]
      },
      {
        text: "14) Can your love style change over time? For you, that would most likely happen when…",
        options: [
          { label: "You learn to ask for more instead of just staying peaceful.", score: { [K.steady]: 3 }, tags: ["ask_more"] },
          { label: "You stop romanticizing chaos and choose emotional steadiness.", score: { [K.magnetic]: 3 }, tags: ["choose_steady"] },
          { label: "You stop proving your worth through over-giving.", score: { [K.devoted]: 3 }, tags: ["stop_proving"] },
          { label: "You learn that openness can exist without danger.", score: { [K.guarded]: 3 }, tags: ["safe_open"] }
        ]
      },
      {
        text: "15) The line that feels the most true is…",
        options: [
          { label: "“The best love makes me feel settled, not scrambled.”", score: { [K.steady]: 3 }, tags: ["settled"] },
          { label: "“I don’t just want love. I want to feel moved by it.”", score: { [K.magnetic]: 3 }, tags: ["moved"] },
          { label: "“I love hard—and sometimes forget to check if I’m being loved back.”", score: { [K.devoted]: 3 }, tags: ["loved_back"] },
          { label: "“Being known deeply matters to me more than being wanted quickly.”", score: { [K.guarded]: 3 }, tags: ["known_deeply"] }
        ]
      }
    ],

    results: {
      [K.steady]: {
        title: "The Steady Lover",
        subtitle: "You love with calm depth, emotional reliability, and quiet strength.",
        summary:
          "You are the kind of lover who makes love feel breathable. You value trust more than theatrics, and consistency means more to you than intensity alone. You may not be the loudest lover in the room, but your love tends to feel safe, durable, and deeply restorative. When you love well, people feel they can finally exhale.",
        bullets: [
          "You value emotional stability over chaos.",
          "Your love style creates safety, trust, and follow-through.",
          "You tend to build love rather than chase it."
        ],
        scripts: [
          "“I want this to feel clear, calm, and mutual.”",
          "“Consistency matters to me more than intensity without follow-through.”"
        ],
        next_steps: [
          "Keep naming needs before resentment builds.",
          "Don’t mistake calm for automatic compatibility.",
          "Choose people who value the steadiness you bring."
        ],
        cautions: [
          "Your calm can sometimes hide your unmet needs if you don’t voice them early."
        ]
      },

      [K.magnetic]: {
        title: "The Magnetic Lover",
        subtitle: "You love through chemistry, emotional depth, and undeniable pull.",
        summary:
          "You are drawn to love that feels alive. You notice emotional charge, psychological depth, and the kind of connection that makes ordinary life feel brighter. When healthy, your love style is passionate, emotionally intelligent, and unforgettable. The challenge is that intensity can sometimes disguise instability—so your growth edge is learning the difference between depth and turbulence.",
        bullets: [
          "You are highly responsive to emotional chemistry.",
          "You want love that feels vivid, alive, and deeply felt.",
          "Your strongest relationships meet your depth without creating chaos."
        ],
        scripts: [
          "“I want depth, but I also want steadiness.”",
          "“Intensity matters to me—but not more than emotional safety.”"
        ],
        next_steps: [
          "Check consistency before attaching to chemistry.",
          "Distinguish mystery from mixed signals.",
          "Choose people who can hold depth without disappearing."
        ],
        cautions: [
          "Intensity is not proof of compatibility. Sometimes it’s just adrenaline."
        ]
      },

      [K.devoted]: {
        title: "The Devoted Lover",
        subtitle: "You love through loyalty, action, and a heart that shows up hard.",
        summary:
          "You are the kind of lover people remember because you care with your whole life, not just your words. You express love through effort, patience, support, and emotional labor. When healthy, this makes you deeply grounding and generous. But if you are not careful, devotion can drift into over-functioning—where you carry the relationship further than mutuality can support.",
        bullets: [
          "You show love through effort and reliability.",
          "You tend to love by helping, holding, and staying.",
          "Your biggest strength can also become your blind spot if reciprocity disappears."
        ],
        scripts: [
          "“I’m willing to show up, but I need mutual effort too.”",
          "“Love feels healthiest to me when care is reciprocated, not just received.”"
        ],
        next_steps: [
          "Check for reciprocity before investing deeper.",
          "Stop confusing loyalty with proof that you should stay.",
          "Ask directly for what you need instead of proving your worth through effort."
        ],
        cautions: [
          "You can stay too long in one-sided dynamics because your love style is naturally faithful."
        ]
      },

      [K.guarded]: {
        title: "The Guarded Lover",
        subtitle: "You love deeply—but only where trust feels earned, not rushed.",
        summary:
          "You are not cold. You are careful. Your love style values sincerity over speed, emotional depth over surface attraction, and safety over easy access. You do not open for everyone—and that is part of your power. When healthy, your love feels intimate, rare, and incredibly real. Your challenge is learning when protection serves you—and when it quietly keeps love too far away.",
        bullets: [
          "You value emotional safety more than speed.",
          "You open slowly, but your connection runs deep.",
          "You are sensitive to sincerity, trust, and emotional steadiness."
        ],
        scripts: [
          "“I don’t open quickly, but I do value real consistency.”",
          "“If this is worth building, I’d rather build it honestly than fast.”"
        ],
        next_steps: [
          "Let trust build without testing every moment.",
          "Take small emotional risks with people who show consistency.",
          "Notice when self-protection becomes emotional distance."
        ],
        cautions: [
          "Sometimes you miss good love because your guard stays up longer than necessary."
        ]
      },

      [K.allin]: {
        title: "The All-In Lover",
        subtitle: "You love with total emotional presence once your heart says yes.",
        summary:
          "You are the type who does not love halfway. Once you feel it, you commit emotionally, mentally, and energetically. You bring intensity, devotion, and a willingness to fully meet love. That can be beautiful. It can also be risky if the other person enjoys being loved more than actually loving back. Your work is not to love less. It is to go all in more wisely.",
        bullets: [
          "You bond quickly once your heart feels sure.",
          "You tend to invest fully, not casually.",
          "You need mutual depth—not just mutual attraction."
        ],
        scripts: [
          "“I love deeply, so I need clarity just as deeply.”",
          "“I’m all in when it’s real—but I need real effort too.”"
        ],
        next_steps: [
          "Pause before overcommitting to potential.",
          "Make sure attraction is matched by consistency and care.",
          "Choose mutuality over emotional momentum."
        ],
        cautions: [
          "Going all in too early can create attachment to potential instead of reality."
        ]
      }
    },

    faq: [
      {
        q: "What kind of lover am I?",
        a: "Your lover type usually shows up in how you pursue closeness, react to uncertainty, and express care. This test helps reveal your dominant romantic pattern in a clear, emotionally specific way."
      },
      {
        q: "What is a love personality test?",
        a: "A love personality test is a self-reflection quiz that identifies common romantic behavior patterns—such as steady, magnetic, devoted, guarded, or all-in love styles. It is educational, not diagnostic."
      },
      {
        q: "Can your love style change over time?",
        a: "Yes. Love style can shift with healing, self-trust, better boundaries, and healthier relationship experiences. Patterns may feel familiar, but they are not fixed forever."
      },
      {
        q: "Why do some lovers attract toxic relationships?",
        a: "Certain love styles can over-give, romanticize intensity, or tolerate instability for too long. That does not mean they cause toxicity, but it can explain why unhealthy dynamics feel familiar or hard to leave."
      },
      {
        q: "How accurate is this love personality test?",
        a: "It is designed to feel highly accurate because it focuses on emotionally specific relationship behaviors—not abstract labels. Honest answers usually produce the strongest results."
      }
    ]
  };
})();

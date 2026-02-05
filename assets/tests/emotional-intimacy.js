/* emotional-intimacy.js — single test definition */
(function () {
  const SLUG = "emotional-intimacy";

  const K = {
    close: "emotionally_connected",
    uneven: "uneven_intimacy",
    guarded: "emotionally_guarded",
    distant: "emotional_distance",
    unsafe: "emotional_disconnection"
  };

  window.TEST = {
    id: "emotional_intimacy",
    slug: SLUG,
    title: "Intimacy Test: How Emotionally Close Is Your Relationship?",
    blurb:
      "A psychologically deep, ad-safe test measuring emotional closeness, safety, and connection patterns.",
    time: "2–3 min",
    intent: "quiz",
    keywords: [
      "intimacy test",
      "emotional intimacy in relationships",
      "emotional closeness test",
      "lack of intimacy in relationship",
      "feeling disconnected from partner",
      "why do I feel distant in my relationship",
      "relationship intimacy quiz",
      "emotional connection relationship"
    ],

    questions: [
      {
        text: "1) When something important happens to you, your first instinct is to…",
        options: [
          { label: "Share it openly without overthinking.", score: { [K.close]: 3 }, tags: ["open"] },
          { label: "Share, but keep the emotional part light.", score: { [K.uneven]: 2 }, tags: ["light"] },
          { label: "Wait and see if it feels safe to mention.", score: { [K.guarded]: 1 }, tags: ["cautious"] },
          { label: "Handle it alone. Sharing feels heavy.", score: { [K.distant]: 0 }, tags: ["alone"] }
        ]
      },
      {
        text: "2) When you’re emotionally stressed, your partner usually…",
        options: [
          { label: "Feels present and emotionally available.", score: { [K.close]: 3 }, tags: ["present"] },
          { label: "Tries to help but misses the deeper layer.", score: { [K.uneven]: 2 }, tags: ["miss"] },
          { label: "Gets uncomfortable or distant.", score: { [K.guarded]: 1 }, tags: ["avoid"] },
          { label: "Avoids emotional conversations.", score: { [K.unsafe]: 0 }, tags: ["shut_down"] }
        ]
      },
      {
        text: "3) You feel most connected when you and your partner…",
        options: [
          { label: "Talk honestly about inner thoughts.", score: { [K.close]: 3 }, tags: ["deep_talk"] },
          { label: "Spend quality time without pressure.", score: { [K.uneven]: 2 }, tags: ["quality_time"] },
          { label: "Keep things positive and surface-level.", score: { [K.guarded]: 1 }, tags: ["surface"] },
          { label: "Don’t talk much at all.", score: { [K.distant]: 0 }, tags: ["quiet"] }
        ]
      },
      {
        text: "4) After emotional tension, repair usually feels…",
        options: [
          { label: "Clear and reassuring.", score: { [K.close]: 3 }, tags: ["repair"] },
          { label: "Partial — something stays unspoken.", score: { [K.uneven]: 2 }, tags: ["unfinished"] },
          { label: "Awkward or avoided.", score: { [K.guarded]: 1 }, tags: ["avoid_repair"] },
          { label: "Nonexistent.", score: { [K.unsafe]: 0 }, tags: ["no_repair"] }
        ]
      },
      {
        text: "5) Deep down, emotional closeness in your relationship feels…",
        options: [
          { label: "Safe and mutual.", score: { [K.close]: 3 }, tags: ["safe"] },
          { label: "Uneven but possible.", score: { [K.uneven]: 2 }, tags: ["possible"] },
          { label: "Risky.", score: { [K.guarded]: 1 }, tags: ["risky"] },
          { label: "Unavailable.", score: { [K.unsafe]: 0 }, tags: ["unavailable"] }
        ]
      },
      {
        text: "6) When you share a feeling, their first response is usually…",
        options: [
          { label: "Curiosity and care: they try to understand.", score: { [K.close]: 3 }, tags: ["curious"] },
          { label: "Kind, but quickly moves to solutions or logistics.", score: { [K.uneven]: 2 }, tags: ["fixing"] },
          { label: "Minimizing or discomfort (changing the subject).", score: { [K.guarded]: 1 }, tags: ["minimize"] },
          { label: "Silence, shutdown, or dismissal.", score: { [K.unsafe]: 0 }, tags: ["dismiss"] }
        ]
      },
      {
        text: "7) If you imagine asking for more closeness, you expect…",
        options: [
          { label: "A real conversation and real effort.", score: { [K.close]: 3 }, tags: ["effort"] },
          { label: "Some effort, then inconsistency later.", score: { [K.uneven]: 2 }, tags: ["inconsistent"] },
          { label: "Deflection (jokes, ‘you’re overthinking,’ or topic change).", score: { [K.guarded]: 1 }, tags: ["deflect"] },
          { label: "A wall: like you’re asking for something impossible.", score: { [K.unsafe]: 0 }, tags: ["wall"] }
        ]
      },
      {
        text: "8) The most honest description of your conversations is…",
        options: [
          { label: "We can talk about hard things and still feel safe.", score: { [K.close]: 3 }, tags: ["safe_talk"] },
          { label: "We connect sometimes, but depth isn’t consistent.", score: { [K.uneven]: 2 }, tags: ["sometimes"] },
          { label: "We keep things light to avoid discomfort.", score: { [K.guarded]: 1 }, tags: ["light_only"] },
          { label: "Mostly practical: plans, tasks, updates.", score: { [K.distant]: 0 }, tags: ["logistics"] }
        ]
      },
      {
        text: "9) When you feel hurt, your default move is to…",
        options: [
          { label: "Say it calmly and ask for repair.", score: { [K.close]: 3 }, tags: ["repair"] },
          { label: "Wait for the ‘right time’ and hope it passes.", score: { [K.uneven]: 2 }, tags: ["delay"] },
          { label: "Say you’re fine—then feel the distance grow.", score: { [K.guarded]: 1 }, tags: ["fine"] },
          { label: "Keep it inside; it doesn’t feel safe to share.", score: { [K.unsafe]: 0 }, tags: ["unsafe_share"] }
        ]
      },
      {
        text: "10) When you’re together, you most often feel…",
        options: [
          { label: "Present and emotionally close.", score: { [K.close]: 3 }, tags: ["present"] },
          { label: "Good, but missing depth sometimes.", score: { [K.uneven]: 2 }, tags: ["missing_depth"] },
          { label: "Careful—like you have to manage the mood.", score: { [K.guarded]: 1 }, tags: ["manage"] },
          { label: "Distant, even in the same room.", score: { [K.distant]: 0 }, tags: ["same_room_far"] }
        ]
      },
      {
        text: "11) If you stopped initiating deeper moments, you think…",
        options: [
          { label: "We’d still find our way to connection.", score: { [K.close]: 3 }, tags: ["mutual"] },
          { label: "It would decrease, but not disappear completely.", score: { [K.uneven]: 2 }, tags: ["some"] },
          { label: "It would fade—I’m usually the one who goes there.", score: { [K.distant]: 1 }, tags: ["one_sided"] },
          { label: "Nothing would change; we already don’t go deep.", score: { [K.unsafe]: 0 }, tags: ["no_depth"] }
        ]
      },
      {
        text: "12) When tension happens, the emotional aftertaste is…",
        options: [
          { label: "We resolve it and feel closer afterward.", score: { [K.close]: 3 }, tags: ["resolve"] },
          { label: "We move on, but it stays slightly unfinished.", score: { [K.uneven]: 2 }, tags: ["unfinished"] },
          { label: "We avoid it, and it quietly changes the vibe.", score: { [K.distant]: 1 }, tags: ["drift"] },
          { label: "It lingers and makes honesty feel unsafe.", score: { [K.unsafe]: 0 }, tags: ["unsafe"] }
        ]
      },
      {
        text: "13) The sentence that hits closest is…",
        options: [
          { label: "“I can be fully myself in this relationship.”", score: { [K.close]: 3 }, tags: ["self"] },
          { label: "“We’re close, but I still hold parts of myself back.”", score: { [K.uneven]: 2 }, tags: ["hold_back"] },
          { label: "“I overthink how to say things so they land safely.”", score: { [K.guarded]: 1 }, tags: ["overthink"] },
          { label: "“I don’t feel emotionally met, even when we’re okay.”", score: { [K.unsafe]: 0 }, tags: ["unmet"] }
        ]
      },
      {
        text: "14) When you need comfort, you usually…",
        options: [
          { label: "Ask directly and receive it most of the time.", score: { [K.close]: 3 }, tags: ["ask"] },
          { label: "Hint at it and hope they notice.", score: { [K.uneven]: 2 }, tags: ["hint"] },
          { label: "Talk yourself out of needing it.", score: { [K.guarded]: 1 }, tags: ["self_silence"] },
          { label: "Stop expecting it—expectations feel painful.", score: { [K.unsafe]: 0 }, tags: ["no_expect"] }
        ]
      },
      {
        text: "15) If the next 30 days stayed exactly the same, you’d feel…",
        options: [
          { label: "Okay—we have enough emotional closeness to grow.", score: { [K.close]: 3 }, tags: ["grow"] },
          { label: "Uneasy—I’d need more consistency to feel close.", score: { [K.uneven]: 2 }, tags: ["need_more"] },
          { label: "Tired—I’m carrying too much of the emotional load.", score: { [K.distant]: 1 }, tags: ["tired"] },
          { label: "Sad—I can’t keep calling this intimacy.", score: { [K.unsafe]: 0 }, tags: ["sad"] }
        ]
      }
    ],

    results: {
      [K.close]: {
        title: "Strong Emotional Intimacy — Closeness Feels Safe Here",
        subtitle: "You can be honest without fear, and repair actually happens.",
        summary:
          "You likely experience emotional closeness as something you can rely on. You don’t have to perform to be loved. You can share real feelings without it becoming a problem. When tension happens, the relationship has a way of finding its way back to safety and warmth.",
        bullets: [
          "You feel emotionally seen and taken seriously.",
          "Repair happens more often than avoidance.",
          "Closeness feels mutual, not chased."
        ],
        scripts: [
          "“Can we do a quick 10-minute check-in tonight? I love staying emotionally close.”",
          "“I appreciate you. I want to keep nurturing what we have.”",
          "“If something feels off between us, I’d rather repair it early.”"
        ],
        next_steps: [
          "Keep a weekly check-in ritual (15 minutes).",
          "Name appreciation out loud regularly.",
          "Repair small tension quickly before it becomes distance."
        ],
        cautions: [
          "Even strong intimacy can drift if you stop making space for it."
        ]
      },

      [K.uneven]: {
        title: "Uneven Intimacy — The Love Is There, But The Depth Fluctuates",
        subtitle: "Some days feel close. Some days feel far. The inconsistency is the stress.",
        summary:
          "You may relate to a relationship where emotional closeness appears in waves. You can feel warm and connected, but it doesn’t always stay consistent. You might hold back at times, not because you don’t care, but because you’re unsure how your feelings will be received.",
        bullets: [
          "Connection exists, but it’s inconsistent.",
          "You share, but not fully (or not always).",
          "Repair can feel partial or delayed."
        ],
        scripts: [
          "“I’m happy with us, and I want more consistent emotional closeness—can we try a weekly check-in?”",
          "“When we don’t talk about feelings, I start to feel distant. Can we name things earlier?”",
          "“I’m not asking for big talks—just steady emotional presence.”"
        ],
        next_steps: [
          "Choose one ritual: weekly check-in or a daily 2-minute ‘how are you’ moment.",
          "Ask for one specific change (not a personality overhaul).",
          "Track patterns: does closeness return with effort or only randomly?"
        ],
        cautions: [
          "Avoid turning your need into pressure—ask clearly, then observe consistency."
        ]
      },

      [K.guarded]: {
        title: "Emotionally Guarded — You Want Closeness, But It Feels Risky",
        subtitle: "You filter yourself to stay safe, and distance becomes the price of peace.",
        summary:
          "You may relate to holding back parts of your inner world because being fully honest doesn’t feel safe. It might not be dramatic—sometimes it’s subtle: you edit your feelings, soften your truth, or choose silence to avoid misunderstandings. Over time, that protection can quietly turn into disconnection.",
        bullets: [
          "You filter what you share to avoid backlash.",
          "Honesty can feel risky or ‘too much.’",
          "Avoiding emotions keeps peace—but reduces closeness."
        ],
        scripts: [
          "“I’m nervous to say this, but it matters to me. Can you listen without fixing it?”",
          "“What I need is comfort, not solutions.”",
          "“I’m trying to be more honest. Please meet that gently.”"
        ],
        next_steps: [
          "Start small: one feeling + one request.",
          "Ask for a ‘listen-first’ agreement (no interrupting, no fixing).",
          "Notice if safety increases when you try honesty."
        ],
        cautions: [
          "If you consistently feel punished for honesty, that’s a pattern worth taking seriously."
        ]
      },

      [K.distant]: {
        title: "Emotional Distance — The Relationship Works, But Intimacy Feels Thin",
        subtitle: "You may share space and time, but not your inner world.",
        summary:
          "You may relate to a relationship that functions—plans happen, life moves forward—but emotional closeness feels limited. Conversations can become practical and the deeper layer goes missing. Even without major conflict, you can start feeling alone inside the relationship, because your emotional needs aren’t being met consistently.",
        bullets: [
          "Conversations stay practical or surface-level.",
          "Your inner world stays private more than you want.",
          "Repair and curiosity feel rare."
        ],
        scripts: [
          "“I miss feeling emotionally close. Can we talk for 15 minutes—no phones?”",
          "“When we don’t repair, I drift. I don’t want that for us.”",
          "“Can we each share one thing we need this week to feel more connected?”"
        ],
        next_steps: [
          "Schedule one intentional conversation (time + topic).",
          "Ask one open emotional question daily (not logistics).",
          "If distance stays chronic, name what you need long-term."
        ],
        cautions: [
          "Don’t normalize emotional loneliness just because things look ‘fine’ from the outside."
        ]
      },

      [K.unsafe]: {
        title: "Emotional Disconnection — You’re Still Here, But You Feel Alone",
        subtitle: "Hope feels expensive, and closeness feels hard to access.",
        summary:
          "You may relate to feeling disconnected from your partner emotionally. Not necessarily because there’s no care—but because emotional safety, responsiveness, or repair is missing. When you don’t feel met, you stop expecting. You stop asking. You keep more of your feelings to yourself. That’s not weakness—it’s what people do when closeness doesn’t feel available.",
        bullets: [
          "You may feel emotionally unseen or unsupported.",
          "You expect less because expecting hurts.",
          "Closeness feels difficult to reach or sustain."
        ],
        scripts: [
          "“I’m not okay with how disconnected I feel. I want us to work on emotional closeness together.”",
          "“I’m not blaming you—I’m telling you the truth of my experience.”",
          "“If we can’t repair and reconnect, we need to rethink what we’re building.”"
        ],
        next_steps: [
          "Name the pattern in one sentence without blame.",
          "Request one measurable change (weekly check-in, repair plan, presence rule).",
          "If distress feels severe or persistent, consider speaking with a licensed professional."
        ],
        cautions: [
          "This isn’t a diagnosis—just a reflection tool. If you feel persistently unwell, get real support."
        ]
      }
    }
  };
})();

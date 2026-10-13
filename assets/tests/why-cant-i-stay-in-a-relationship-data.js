/* Repeated relationship transitions: educational, nonclinical self-reflection dataset. */
(function(root){'use strict';const data={
  "slug": "why-cant-i-stay-in-a-relationship",
  "updated": "2026-10-13",
  "dimensions": [
    {
      "id": "novelty",
      "short": "The early spark pulls hardest",
      "label": "Novelty and the early relationship high",
      "description": "You often notice a drop in engagement when early excitement becomes familiar. This is a pattern to observe, not evidence that you cannot love long-term.",
      "guide": "/blog/is-love-at-first-sight-real/"
    },
    {
      "id": "closeness",
      "short": "Closeness starts to feel difficult",
      "label": "Distance as commitment deepens",
      "description": "Being known, needing to negotiate or sharing a future can begin to feel pressuring. This is not automatically an attachment diagnosis.",
      "guide": "/tests/fear-of-intimacy/"
    },
    {
      "id": "single",
      "short": "Being single feels hard to tolerate",
      "label": "A fast search for the next connection",
      "description": "New partnerships can offer reassurance or structure when a breakup or time alone feels difficult. Moving on quickly is not inherently unhealthy.",
      "guide": "/blog/how-to-get-over-a-breakup/"
    },
    {
      "id": "fit",
      "short": "You're responding to real mismatches",
      "label": "Compatibility and discernment",
      "description": "You tend to leave after identifying concrete differences, unmet needs or boundary problems rather than because the honeymoon period has ended.",
      "guide": "/tests/relationship-compatibility-test/"
    }
  ],
  "questions": [
    {
      "id": "ordinary",
      "text": "When dating someone new starts to feel ordinary, what tends to happen?",
      "options": [
        {
          "text": "I start missing the thrill of the early dates, even if nothing is wrong.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "Familiarity appears to affect the excitement you feel."
        },
        {
          "text": "I get uneasy about how much of my life they now expect to share.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Growing interdependence may feel like pressure."
        },
        {
          "text": "I worry I'll lose the comfort of having someone if this relationship ends.",
          "dimension": "single",
          "weight": 1,
          "insight": "Being without a partner seems especially hard to imagine."
        },
        {
          "text": "I notice a specific mismatch we had not discussed and want to address it.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You point to an identifiable difference rather than fading excitement alone."
        }
      ]
    },
    {
      "id": "six-month-plans",
      "text": "A kind, consistent partner mentions making plans six months ahead. Your first reaction is…",
      "options": [
        {
          "text": "We should talk about whether our long-term goals actually line up.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You focus on the practical content of the future plan."
        },
        {
          "text": "The idea of being expected to commit makes me want space.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Longer-term expectations bring up a wish for distance."
        },
        {
          "text": "I wonder if dating has become too predictable already.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "Predictability itself may be reducing your interest."
        },
        {
          "text": "I'm relieved we're building something; I'd feel lost without a relationship.",
          "dimension": "single",
          "weight": 1,
          "insight": "The security of being partnered is central in this response."
        }
      ]
    },
    {
      "id": "post-breakup",
      "text": "After a breakup, which experience is most familiar?",
      "options": [
        {
          "text": "The prospect of dating someone completely new feels energizing.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "A fresh connection may be especially rewarding after endings."
        },
        {
          "text": "I enjoy my independence until someone new wants more closeness.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Independence feels easier than deepening partnership."
        },
        {
          "text": "The empty evenings feel urgent, and I start looking for another person soon.",
          "dimension": "single",
          "weight": 1,
          "insight": "The transition into single life feels particularly uncomfortable."
        },
        {
          "text": "I revisit what was incompatible before considering someone else.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You look for concrete lessons without assuming you must date quickly."
        }
      ]
    },
    {
      "id": "difficult-week",
      "text": "Someone you're dating asks how you're really doing during a difficult week. What fits?",
      "options": [
        {
          "text": "I value the care, but I realize we disagree about something important.",
          "dimension": "fit",
          "weight": 1,
          "insight": "This answer distinguishes kindness from broader compatibility."
        },
        {
          "text": "I feel exposed and suddenly want fewer conversations.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Vulnerability itself may prompt withdrawal."
        },
        {
          "text": "I wish we were doing something exciting instead of serious talks.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "Emotional routine may compete with your need for stimulation."
        },
        {
          "text": "I feel reassured that someone is there; losing that support worries me.",
          "dimension": "single",
          "weight": 1,
          "insight": "The availability of a partner may soothe fear of being alone."
        }
      ]
    },
    {
      "id": "repeating-pattern",
      "text": "Thinking about your last two or three relationships, what tends to repeat?",
      "options": [
        {
          "text": "I get attached quickly and rarely leave much time between partners.",
          "dimension": "single",
          "weight": 1,
          "insight": "Very short gaps between relationships stand out in your pattern."
        },
        {
          "text": "Interest peaks at the beginning and drops when things stabilize.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "A repeated change in interest follows the honeymoon period."
        },
        {
          "text": "I become less available when partners seek more honesty or closeness.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Deepening emotional exposure may coincide with pulling away."
        },
        {
          "text": "I tend to leave after concrete incompatibilities become clear.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You identify specific relationship conditions that influenced endings."
        }
      ]
    },
    {
      "id": "butterflies-fade",
      "text": "If the butterflies fade but the relationship remains respectful, what do you usually think?",
      "options": [
        {
          "text": "Maybe the excitement is over; I start wondering who else is out there.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "The reduction in intensity may be interpreted as the end of attraction."
        },
        {
          "text": "I feel pressed to become closer and I need distance to think.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "You connect the change to feeling crowded rather than bored."
        },
        {
          "text": "I hope it continues because facing a breakup alone sounds awful.",
          "dimension": "single",
          "weight": 1,
          "insight": "Fear of an ending may be shaping your decision to stay."
        },
        {
          "text": "I look at how we resolve conflicts and whether our values fit.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You assess a relationship beyond its initial emotional intensity."
        }
      ]
    },
    {
      "id": "saturday-alone",
      "text": "You are alone on a Saturday with no dating plans. What feels most accurate?",
      "options": [
        {
          "text": "I start swiping or messaging because being alone feels heavy.",
          "dimension": "single",
          "weight": 1,
          "insight": "Seeking contact may help you regulate solitude."
        },
        {
          "text": "I like the space, though committed relationships can make it scarce.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "You experience autonomy as restorative and closeness as potentially costly."
        },
        {
          "text": "I miss the excitement of flirting and getting to know someone new.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "Novel interactions are especially enticing."
        },
        {
          "text": "I'm fine spending time alone while considering what I want next.",
          "dimension": "fit",
          "weight": 1,
          "insight": "Being single is not the immediate force behind your next choice."
        }
      ]
    },
    {
      "id": "value-conflict",
      "text": "A new partner says something that genuinely conflicts with your values. What is your pattern?",
      "options": [
        {
          "text": "I ask about the difference and decide whether it can work in practice.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You consider a specific concern instead of dismissing the whole person."
        },
        {
          "text": "I use the conflict as a reason to pull away from emotional dependence.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Conflict may become a way to restore distance."
        },
        {
          "text": "I lose interest and become excited about other possibilities.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "The newness of other partners may overshadow discussion."
        },
        {
          "text": "I minimize it because I don't want to be single again.",
          "dimension": "single",
          "weight": 1,
          "insight": "The prospect of an ending may affect what you tolerate."
        }
      ]
    },
    {
      "id": "communication-request",
      "text": "When a partner asks for more reliable communication, what usually happens?",
      "options": [
        {
          "text": "I feel monitored and start retreating even if the request is reasonable.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Requests for reliability can feel threatening to autonomy."
        },
        {
          "text": "I try, but I keep wanting the easy excitement of a new chat.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "A fresh conversation may appeal more than steady maintenance."
        },
        {
          "text": "I overpromise because I fear they'll leave if I disappoint them.",
          "dimension": "single",
          "weight": 1,
          "insight": "Fear of losing the relationship may drive reassurance-giving."
        },
        {
          "text": "We discuss a communication rhythm that fits our actual lives.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You are assessing a concrete accommodation together."
        }
      ]
    },
    {
      "id": "last-regret",
      "text": "When a relationship ends, which regret feels closest?",
      "options": [
        {
          "text": "I sometimes leave as soon as the first spark fades without exploring what comes next.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "You question whether the ending followed normal changes in excitement."
        },
        {
          "text": "I wish I'd said what I needed instead of becoming distant.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Withdrawing may have replaced a direct conversation."
        },
        {
          "text": "I wish I hadn't rushed into another relationship before understanding the breakup.",
          "dimension": "single",
          "weight": 1,
          "insight": "Fast transitions may have limited reflection."
        },
        {
          "text": "I wish we'd recognized our incompatibility earlier and saved each other time.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You are concerned about fit and timing rather than fearing commitment alone."
        }
      ]
    },
    {
      "id": "new-person",
      "text": "Imagine meeting someone appealing while you're already in a stable relationship. What feels most familiar?",
      "options": [
        {
          "text": "The novelty makes me doubt my current relationship almost immediately.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "New attention may shift your evaluation of an existing bond."
        },
        {
          "text": "I feel an urge to escape my partner's expectations.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "Pressure about closeness seems more important than the other person."
        },
        {
          "text": "I fear losing my current partner, so I focus on securing the relationship.",
          "dimension": "single",
          "weight": 1,
          "insight": "The worry of being alone becomes central."
        },
        {
          "text": "I maintain my agreements and assess any real issues in the relationship separately.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You separate passing interest from decisions about compatibility."
        }
      ]
    },
    {
      "id": "next-step",
      "text": "What would most help you understand why relationships keep ending?",
      "options": [
        {
          "text": "Learning whether I confuse a quieter bond with losing love.",
          "dimension": "novelty",
          "weight": 1,
          "insight": "You want to distinguish stable love from the first rush."
        },
        {
          "text": "Practicing closeness and honest limits before feeling trapped.",
          "dimension": "closeness",
          "weight": 1,
          "insight": "You want tools for staying emotionally present without losing autonomy."
        },
        {
          "text": "Learning to feel grounded without a partner between relationships.",
          "dimension": "single",
          "weight": 1,
          "insight": "Comfort with single life appears to be a meaningful goal."
        },
        {
          "text": "Clarifying non-negotiable values while staying open to normal imperfections.",
          "dimension": "fit",
          "weight": 1,
          "insight": "You want to distinguish genuine mismatch from unrealistic expectations."
        }
      ]
    }
  ],
  "profiles": {
    "novelty": {
      "headline": "You may be chasing the early relationship high",
      "lead": "Your answers often associate a relationship's shift from exciting to familiar with a wish to start over. That may make ordinary stability feel like a loss of chemistry even when the partnership remains kind.",
      "strength": "You recognize the excitement, curiosity, and spontaneity that make dating meaningful to you.",
      "watch": "Excitement naturally fluctuates; boredom can be a reason to explore what is missing, but not proof that your partner is wrong for you.",
      "steps": [
        "Separate 'the excitement changed' from 'we are incompatible' with two specific examples of each.",
        "Choose one shared experience that encourages curiosity without expecting a permanent spark.",
        "Before ending a healthy relationship, talk about what you miss and watch whether both people want to address it."
      ],
      "questions": [
        "What do I expect a committed relationship to feel like on an ordinary Wednesday?",
        "Which real incompatibilities remain after a week when life is calm?"
      ]
    },
    "closeness": {
      "headline": "Closeness and commitment may trigger a wish for distance",
      "lead": "Your choices commonly describe withdrawing when someone wants emotional openness, reliable contact, or future planning. That can look like losing interest from the outside, though the internal experience may be pressure or loss of autonomy.",
      "strength": "You notice the importance of space, independence, and feeling free to make your own choices.",
      "watch": "Privacy and autonomy are valid needs. Sudden withdrawal without explanation can still leave partners confused or unable to negotiate.",
      "steps": [
        "Identify one request that actually feels overwhelming, and name the specific part.",
        "Try a direct boundary or timing agreement instead of disappearing.",
        "Observe whether distance follows safety concerns, genuine mismatch, or the discomfort of being known."
      ],
      "questions": [
        "Which kind of commitment feels restrictive, and which feels supportive?",
        "How can I say 'I need space' without ending a conversation or connection?"
      ]
    },
    "single": {
      "headline": "Being single may feel more difficult than staying connected",
      "lead": "You often describe short gaps between partners, a strong need for reassurance, or discomfort with empty time after a breakup. This may make new relationships especially attractive, but a quick new relationship is not automatically unhealthy.",
      "strength": "You value companionship, reliability, and the everyday support that relationships can provide.",
      "watch": "Fear of being alone can sometimes influence which problems you ignore or how quickly you choose a new relationship.",
      "steps": [
        "Build one reliable source of comfort outside dating: a friend, routine, hobby, or community.",
        "After an ending, write what you learned before looking for a new partner; do not impose an arbitrary waiting period.",
        "Notice whether you choose someone because the connection fits, or mainly because solitude feels urgent."
      ],
      "questions": [
        "What does being alone mean about me when I am having a hard day?",
        "What would choosing a partner from interest rather than urgency look like?"
      ]
    },
    "fit": {
      "headline": "You may be responding to genuine incompatibility—not avoiding commitment",
      "lead": "Your answers tend to focus on values, respect, boundaries, and decisions informed by actual experience. Leaving relationships that do not fit is not the same as being unable to sustain a healthy one.",
      "strength": "You pay attention to specific differences and appear able to distinguish attraction from long-term fit.",
      "watch": "Even careful discernment can become overly rigid if every ordinary imperfection is treated as a non-negotiable conflict.",
      "steps": [
        "List three values that truly need alignment and three preferences that can differ.",
        "Consider whether you communicated a concern and allowed a reasonable opportunity for repair.",
        "Look for consistent compatibility rather than a perfect person or a predetermined relationship timeline."
      ],
      "questions": [
        "Which reasons for past breakups were concrete and recurring?",
        "Where can I be flexible without compromising respect or safety?"
      ]
    }
  },
  "method": {
    "description": "This original, nonclinical reflection uses 12 concrete relationship scenarios. Each answer contributes exactly one observation to one of four themes. The largest count identifies a leading theme. It is not a diagnostic test.",
    "tie": "If two or more themes have the same highest count, the result is explicitly mixed; a stable display order (novelty, closeness, single, fit) chooses which guide is shown first, not which theme is truly stronger. A one-answer lead also displays the close alternative.",
    "meaning": "Counts are out of twelve selected themes—not probabilities, percentages of commitment, mental-health scores, or predictions about future relationships."
  }
};root.RelationshipStayingQuizData=data;if(typeof module!=='undefined'&&module.exports)module.exports=data;})(typeof globalThis!=='undefined'?globalThis:this);

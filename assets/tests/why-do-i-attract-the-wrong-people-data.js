/* Original educational, non-clinical relationship self-reflection quiz. */
(function(root){'use strict';root.WrongPeopleQuizData={
  "slug": "why-do-i-attract-the-wrong-people",
  "updated": "2026-10-15",
  "dimensions": [
    {
      "id": "availability",
      "label": "Emotional availability and consistent effort",
      "short": "The pull of hard-to-reach partners",
      "watch": "Notice whether you are carrying the contact while the other person remains distant.",
      "strength": "You pay attention to reciprocal effort rather than working harder for every response.",
      "guide": "/tests/emotional-availability/",
      "steps": [
        "Track who initiates and follows through over two weeks, rather than judging one particularly good date.",
        "Ask one direct question about availability or intentions, then evaluate the follow-through.",
        "Choose not to invest more deeply until interest and emotional presence are reciprocal."
      ],
      "insights": [
        "You give consistency room to reveal itself.",
        "You notice distance but may stay curious a little longer.",
        "You sometimes invest before availability is established.",
        "Distance and intermittent attention can draw you in strongly."
      ]
    },
    {
      "id": "chemistry",
      "label": "Chemistry versus values and real compatibility",
      "short": "Strong chemistry leading the decision",
      "watch": "Consider whether intensity is obscuring differences that matter over time.",
      "strength": "You can appreciate attraction while checking whether your lives actually fit.",
      "guide": "/tests/relationship-compatibility-test/",
      "steps": [
        "Name three non-negotiable values before the next date and revisit them after a month.",
        "Look for respectful conflict repair, not just a memorable first-date spark.",
        "Compare how you feel during an ordinary week with how you feel during exciting dates."
      ],
      "insights": [
        "Attraction is one part of your evaluation, not the whole decision.",
        "You balance spark and fit, though the spark still influences you.",
        "Strong feelings can move you ahead of evidence about compatibility.",
        "Chemistry often carries more weight than concrete relationship fit."
      ]
    },
    {
      "id": "potential",
      "label": "Potential, rescuing and early incompatibility",
      "short": "Hoping the relationship will become different",
      "watch": "Pay attention to what is happening now rather than the version of someone you imagine later.",
      "strength": "You distinguish hopes for growth from behavior you can rely on today.",
      "guide": "/blog/falling-in-love-with-potential/",
      "steps": [
        "Write two columns: what is reliably happening and what you hope will change.",
        "Ask whether the relationship would still work if nothing important changed in six months.",
        "Leave ownership of another person's growth with that person."
      ],
      "insights": [
        "You evaluate the person and relationship as they are today.",
        "You are hopeful but keep expectations tied to current behavior.",
        "You may hold on because change seems just around the corner.",
        "You often invest in what a partner could become rather than the present fit."
      ]
    },
    {
      "id": "boundaries",
      "label": "Boundaries, needs and give-and-take",
      "short": "Putting your needs second to keep a bond",
      "watch": "Watch for the point where keeping connection costs you your own preferences or limits.",
      "strength": "You can express a need and still stay open to another person's perspective.",
      "guide": "/tests/boundaries-test/",
      "steps": [
        "State a small preference early and see whether the response is respectful.",
        "Notice whether both people make adjustments after a disagreement.",
        "Practice a sentence such as 'I like spending time together, and I also need consistency.'"
      ],
      "insights": [
        "You tend to keep your needs in the conversation.",
        "You often speak up after checking the timing or tone.",
        "You sometimes soften your limits to avoid tension.",
        "You may regularly prioritize keeping the peace over being heard."
      ]
    },
    {
      "id": "urgency",
      "label": "Uncertainty, rejection and choice under pressure",
      "short": "Feeling rushed by uncertainty or loneliness",
      "watch": "Ask whether anxiety about losing the connection is making a decision feel urgent.",
      "strength": "You allow uncertainty to settle before making big commitments.",
      "guide": "/tests/relationship-anxiety/",
      "steps": [
        "When you feel pressed to chase or commit, wait a day before acting unless safety requires immediate action.",
        "Separate 'I want this person' from 'I do not want to be alone.'",
        "Keep supportive friendships and routines active as a new relationship develops."
      ],
      "insights": [
        "You usually give yourself time and room to decide.",
        "Uncertainty matters, but it does not generally set the pace.",
        "Fear of losing a connection can speed up your decisions.",
        "Avoiding rejection or loneliness may become more urgent than finding a good fit."
      ]
    }
  ],
  "questions": [
    {
      "id": "texting-silence",
      "dimension": "availability",
      "text": "Someone you like is warm on dates but goes silent for days afterward. What usually follows?",
      "options": [
        {
          "text": "I look at the overall pattern before deciding how much to invest.",
          "points": 0
        },
        {
          "text": "I ask whether their schedule makes regular contact difficult, then watch what changes.",
          "points": 1
        },
        {
          "text": "I put more energy into planning so we do not lose momentum.",
          "points": 2
        },
        {
          "text": "I feel more drawn in by the silence and keep checking for a reply.",
          "points": 3
        }
      ]
    },
    {
      "id": "great-first-date",
      "dimension": "chemistry",
      "text": "A first date feels electric, but you discover that you want very different futures. How do you respond?",
      "options": [
        {
          "text": "I enjoy the connection, but would need to address the difference before getting serious.",
          "points": 0
        },
        {
          "text": "I stay open for another date while exploring how important the difference really is.",
          "points": 1
        },
        {
          "text": "I focus on how rare the spark feels and hope the future plans will sort themselves out.",
          "points": 3
        },
        {
          "text": "I postpone the values conversation until we know each other better.",
          "points": 2
        }
      ]
    },
    {
      "id": "early-mismatch",
      "dimension": "potential",
      "text": "Early on, someone repeatedly dismisses a value that matters to you, while being otherwise charming. What do you do?",
      "options": [
        {
          "text": "I keep dating because we connect in so many other ways.",
          "points": 2
        },
        {
          "text": "I bring up the mismatch and judge the response as carefully as the chemistry.",
          "points": 0
        },
        {
          "text": "I think they may understand later once they feel secure with me.",
          "points": 3
        },
        {
          "text": "I watch for a concrete change before deciding whether to move forward.",
          "points": 1
        }
      ]
    },
    {
      "id": "intermittent-attention",
      "dimension": "availability",
      "text": "Someone sends affectionate messages after disappearing for a week. Which reaction sounds familiar?",
      "options": [
        {
          "text": "I feel a rush of relief and quickly forget how the gap affected me.",
          "points": 3
        },
        {
          "text": "I appreciate the message but look for a more reliable rhythm.",
          "points": 0
        },
        {
          "text": "I reply enthusiastically, then wonder whether to bring up the gap.",
          "points": 1
        },
        {
          "text": "I try to be extra interesting so their attention stays.",
          "points": 2
        }
      ]
    },
    {
      "id": "cancelled-plans",
      "dimension": "boundaries",
      "text": "A person you are dating cancels at the last minute for the third time. What is your instinct?",
      "options": [
        {
          "text": "I offer to work around them again; I do not want to seem demanding.",
          "points": 3
        },
        {
          "text": "I say I like seeing them and need plans we can both count on.",
          "points": 0
        },
        {
          "text": "I mention the pattern but quickly say it is probably fine.",
          "points": 2
        },
        {
          "text": "I ask what is happening before deciding if we can make a workable plan.",
          "points": 1
        }
      ]
    },
    {
      "id": "rescuer",
      "dimension": "potential",
      "text": "A new partner shares that life is chaotic and says you make everything feel manageable. What do you notice?",
      "options": [
        {
          "text": "I feel important and start organizing solutions for them.",
          "points": 3
        },
        {
          "text": "I care, but I look for evidence they can manage their own responsibilities.",
          "points": 0
        },
        {
          "text": "I offer help with a specific problem without taking charge of their life.",
          "points": 1
        },
        {
          "text": "I become the person they lean on most, even before trust has developed.",
          "points": 2
        }
      ]
    },
    {
      "id": "disagreement",
      "dimension": "boundaries",
      "text": "You and a promising partner disagree sharply about how much time to spend together. What tends to happen?",
      "options": [
        {
          "text": "I say I am comfortable with whatever they prefer, even if I am not.",
          "points": 3
        },
        {
          "text": "I name my preference and ask how we can respect both needs.",
          "points": 0
        },
        {
          "text": "I explain my needs, then backtrack if they seem disappointed.",
          "points": 2
        },
        {
          "text": "I take some time to decide which parts of my schedule can flex.",
          "points": 1
        }
      ]
    },
    {
      "id": "give-and-take",
      "dimension": "boundaries",
      "text": "After several weeks of dating, you notice you are making most plans and checking in first. What do you do?",
      "options": [
        {
          "text": "I step back slightly and see whether they also make an effort.",
          "points": 0
        },
        {
          "text": "I keep planning because perhaps they show care in other ways.",
          "points": 2
        },
        {
          "text": "I ask directly how each of us wants to share the effort.",
          "points": 1
        },
        {
          "text": "I double down so they can see what a good partner I would be.",
          "points": 3
        }
      ]
    },
    {
      "id": "ordinary-weekend",
      "dimension": "chemistry",
      "text": "You have to choose between seeing someone exciting but inconsistent and someone less intense but genuinely present. What guides you?",
      "options": [
        {
          "text": "I compare shared values, kindness and real interest rather than treating either feeling as proof.",
          "points": 0
        },
        {
          "text": "I usually return to the exciting connection; it feels more like romance.",
          "points": 3
        },
        {
          "text": "I allow time to learn about both before deciding what attraction means.",
          "points": 1
        },
        {
          "text": "I keep thinking about the person who is harder to predict.",
          "points": 2
        }
      ]
    },
    {
      "id": "ambiguous-label",
      "dimension": "urgency",
      "text": "After a month, the person you're seeing says they are 'not sure what they want.' What happens inside you?",
      "options": [
        {
          "text": "I want to make things official quickly so I know I matter.",
          "points": 3
        },
        {
          "text": "I ask what that uncertainty means and consider whether the situation fits my needs.",
          "points": 0
        },
        {
          "text": "I feel unsettled but give myself a defined amount of time to observe.",
          "points": 1
        },
        {
          "text": "I try to be especially easygoing so they will eventually choose me.",
          "points": 2
        }
      ]
    },
    {
      "id": "different-values",
      "dimension": "chemistry",
      "text": "Someone is fun and affectionate but shows little interest in your important goals. How do you weigh that?",
      "options": [
        {
          "text": "I assume our feelings will help us bridge nearly any difference.",
          "points": 3
        },
        {
          "text": "I explore whether the gap is workable without pretending it is not there.",
          "points": 1
        },
        {
          "text": "I keep that difference visible when deciding whether to deepen the relationship.",
          "points": 0
        },
        {
          "text": "I avoid discussing the topic so the good mood can last.",
          "points": 2
        }
      ]
    },
    {
      "id": "expressing-needs",
      "dimension": "availability",
      "text": "You tell someone you'd like more predictable communication. They respond, 'That's just not me.' What do you tend to do?",
      "options": [
        {
          "text": "I try to be more appealing so communication becomes natural for them.",
          "points": 3
        },
        {
          "text": "I accept the information and decide whether our needs fit.",
          "points": 0
        },
        {
          "text": "I consider a compromise, but only if it respects both people.",
          "points": 1
        },
        {
          "text": "I say it is fine, while privately hoping they will change.",
          "points": 2
        }
      ]
    },
    {
      "id": "being-single",
      "dimension": "urgency",
      "text": "After a promising connection ends, what is the hardest part of deciding whom to date next?",
      "options": [
        {
          "text": "I can feel disappointed and still take time to choose deliberately.",
          "points": 0
        },
        {
          "text": "I worry the chance for a real relationship is slipping away.",
          "points": 3
        },
        {
          "text": "I prefer having some company but try not to rush a commitment.",
          "points": 1
        },
        {
          "text": "I start talking to new people quickly because being alone feels heavy.",
          "points": 2
        }
      ]
    },
    {
      "id": "past-pattern",
      "dimension": "potential",
      "text": "Looking at three past relationships, you notice you often waited for a partner to become more reliable. What feels closest?",
      "options": [
        {
          "text": "I can name what drew me in and now look for earlier evidence of reliability.",
          "points": 0
        },
        {
          "text": "I see the pattern, but part of me believes the next person will be different.",
          "points": 2
        },
        {
          "text": "I feel that with enough patience and support, most people will eventually change.",
          "points": 3
        },
        {
          "text": "I try to balance patience with a clear time limit for observing progress.",
          "points": 1
        }
      ]
    },
    {
      "id": "future-choice",
      "dimension": "urgency",
      "text": "Before your next relationship, what decision would be hardest for you to follow through on?",
      "options": [
        {
          "text": "Letting a strong spark develop slowly while I learn who someone is.",
          "points": 1
        },
        {
          "text": "Walking away from uncertainty when I really fear losing the connection.",
          "points": 3
        },
        {
          "text": "Keeping enough independence that a new romance does not become my whole world.",
          "points": 2
        },
        {
          "text": "Choosing someone based on repeated actions, even if that means a slower start.",
          "points": 0
        }
      ]
    }
  ],
  "profiles": {
    "healthy": {
      "headline": "You're Learning to Choose Healthier Relationships",
      "lead": "Your answers show multiple ways you slow down, check consistency and keep your needs in view. That does not promise every relationship will work; it means your current choices tend to leave room for discernment."
    },
    "mixed": {
      "headline": "Your Relationship Patterns Depend on the Situation",
      "lead": "No single attraction pattern clearly dominated your answers. Different situations may bring out different choices, so it is more useful to examine the individual moments than assign yourself one fixed label."
    },
    "availability": {
      "headline": "You May Be Drawn to Emotional Unavailability",
      "lead": "Your answers most often highlighted pursuing connection when the other person is hard to reach or inconsistent. This is an invitation to examine reciprocity, not a diagnosis or a verdict on your partners."
    },
    "chemistry": {
      "headline": "You Know What You Want, but Chemistry Can Complicate Things",
      "lead": "Powerful first impressions and excitement may sometimes move faster than a careful look at values, availability and everyday fit. Attraction still matters; it just cannot answer every question."
    },
    "potential": {
      "headline": "You Give Potential More Weight Than Compatibility",
      "lead": "You may be generous with hope for what a relationship could become. Your answers suggest it would help to separate meaningful present-day action from an imagined future."
    },
    "boundaries": {
      "headline": "You May Put Your Needs Aside to Keep the Connection",
      "lead": "Your choices suggest you sometimes adjust more than you would like to avoid friction or disconnection. The useful question is whether there is room for your needs too."
    },
    "urgency": {
      "headline": "Uncertainty May Make Your Choices Feel Urgent",
      "lead": "A fear of losing an opportunity or being alone can make it tempting to move quickly toward reassurance. A slower decision can still honor your feelings without letting urgency decide the fit."
    }
  }
};if(typeof module!=='undefined'&&module.exports)module.exports=root.WrongPeopleQuizData;})(typeof globalThis!=='undefined'?globalThis:this);

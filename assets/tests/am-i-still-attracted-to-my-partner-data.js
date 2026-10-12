/* Four-context attraction reflection test: no diagnosis, no network calls. */
(function(root){'use strict';const data={
  "slug": "am-i-still-attracted-to-my-partner",
  "updated": "2026-10-12",
  "dimensions": [
    {
      "id": "present",
      "short": "Attraction still present",
      "label": "An existing sense of attraction",
      "guide": "/blog/intimacy-changes-long-term-relationships/",
      "description": "Moments of personal interest, warmth, and curiosity that still appear without needing to recreate the early relationship.",
      "next": "Notice what already feels alive without expecting constant excitement."
    },
    {
      "id": "context",
      "short": "Attraction crowded out",
      "label": "Routine, stress, and attention",
      "guide": "/blog/mental-load-in-relationships/",
      "description": "A sense of attraction that becomes harder to notice amid exhaustion, responsibilities, or familiar routines.",
      "next": "Make room for rest and shared enjoyment without making renewed attraction an obligation."
    },
    {
      "id": "distance",
      "short": "Emotional distance",
      "label": "Unresolved tension and feeling connected",
      "guide": "/blog/emotional-safety-in-relationships/",
      "description": "How feeling hurt, unseen, or disconnected may color your response to this specific partner.",
      "next": "Name one specific hurt, listen, and focus on repair without demanding affection."
    },
    {
      "id": "shift",
      "short": "Attraction may have shifted",
      "label": "A more persistent change in attraction",
      "guide": "/blog/falling-in-love-with-potential/",
      "description": "A change that seems to remain even when stress is lower and the relationship is calm.",
      "next": "Reflect on what has changed over time without treating a quiz as a verdict about the relationship."
    }
  ],
  "questions": [
    {
      "id": "first-reaction",
      "text": "When you see your partner after an ordinary day, what is your most familiar reaction?",
      "options": [
        {
          "text": "A small but real sense of interest in being near them.",
          "dimension": "present",
          "weight": 1,
          "insight": "Your attraction may feel quieter than the beginning but still personally meaningful."
        },
        {
          "text": "I'm glad to see them, though I'm usually too drained to feel much excitement.",
          "dimension": "context",
          "weight": 1,
          "insight": "You describe limited bandwidth alongside welcome companionship."
        },
        {
          "text": "I care about them, but a recent disappointment often comes to mind first.",
          "dimension": "distance",
          "weight": 1,
          "insight": "An unresolved experience seems to sit between you and ease."
        },
        {
          "text": "I feel fondness or familiarity, but rarely a pull toward them even on good days.",
          "dimension": "shift",
          "weight": 1,
          "insight": "You distinguish caring for someone from feeling personally drawn to them."
        }
      ]
    },
    {
      "id": "thoughtful-moment",
      "text": "When your partner makes you laugh or does something thoughtful, what follows?",
      "options": [
        {
          "text": "I appreciate it, but it does not usually change how attracted I feel.",
          "dimension": "shift",
          "weight": 1,
          "insight": "Enjoyment and attraction are not always the same experience."
        },
        {
          "text": "I feel warmth and sometimes remember what first drew me to them.",
          "dimension": "present",
          "weight": 1,
          "insight": "Attraction can be recognizable in ordinary moments."
        },
        {
          "text": "I enjoy it, yet I still feel guarded because of a conflict we haven't addressed.",
          "dimension": "distance",
          "weight": 1,
          "insight": "The unaddressed issue may matter more than the moment itself."
        },
        {
          "text": "I can feel closer when I'm not rushing between obligations.",
          "dimension": "context",
          "weight": 1,
          "insight": "Attention and capacity seem to affect what you notice."
        }
      ]
    },
    {
      "id": "relaxed-afternoon",
      "text": "Imagine a relaxed afternoon together with nothing urgent to do. What is most likely?",
      "options": [
        {
          "text": "We could have fun, but I might still feel more like a close friend than a romantic partner.",
          "dimension": "shift",
          "weight": 1,
          "insight": "Enjoying companionship is not proof that attraction has or has not returned."
        },
        {
          "text": "I'd like the time together and feel some genuine personal pull.",
          "dimension": "present",
          "weight": 1,
          "insight": "You describe connection that is more than simply fulfilling a role."
        },
        {
          "text": "Free time helps; it's everyday overload that usually gets in the way.",
          "dimension": "context",
          "weight": 1,
          "insight": "A calmer environment may make your interest easier to notice."
        },
        {
          "text": "I'd struggle to settle in until we talked about what has felt distant.",
          "dimension": "distance",
          "weight": 1,
          "insight": "An unfinished conversation appears relevant to closeness."
        }
      ]
    },
    {
      "id": "nonsexual-affection",
      "text": "If your partner initiates a simple, non-sexual hug, how do you usually feel?",
      "options": [
        {
          "text": "I like it, but lately any quiet moment is competing with a long list of tasks.",
          "dimension": "context",
          "weight": 1,
          "insight": "A positive feeling can coexist with limited attention."
        },
        {
          "text": "I tense up a little because we're not emotionally on the same page.",
          "dimension": "distance",
          "weight": 1,
          "insight": "Feeling misunderstood can change how welcome affection feels."
        },
        {
          "text": "I welcome it as affection from someone I'm still drawn to.",
          "dimension": "present",
          "weight": 1,
          "insight": "Gentle affection seems linked to ongoing attraction for you."
        },
        {
          "text": "It can feel kind and familiar without stirring much sense of attraction.",
          "dimension": "shift",
          "weight": 1,
          "insight": "Your answer separates affection from attraction without judging either."
        }
      ]
    },
    {
      "id": "one-year-review",
      "text": "Looking back over the past year, what seems to explain the change best?",
      "options": [
        {
          "text": "We've repeated the same hurts and stopped feeling fully understood.",
          "dimension": "distance",
          "weight": 1,
          "insight": "Relationship repair is a distinct question from whether sparks are exciting."
        },
        {
          "text": "Responsibilities and stress have left us little room to notice each other.",
          "dimension": "context",
          "weight": 1,
          "insight": "The circumstances around the relationship changed alongside your attention."
        },
        {
          "text": "The intensity changed, but I still notice specific qualities that attract me.",
          "dimension": "present",
          "weight": 1,
          "insight": "A maturing attraction need not resemble early infatuation."
        },
        {
          "text": "My feelings of attraction seem to have drifted despite calmer or happier periods.",
          "dimension": "shift",
          "weight": 1,
          "insight": "You notice a change that has not clearly followed stress or conflict."
        }
      ]
    },
    {
      "id": "good-date",
      "text": "On a good date with your partner, what is most likely after you've relaxed?",
      "options": [
        {
          "text": "I enjoy their company but still question whether the romantic attraction remains.",
          "dimension": "shift",
          "weight": 1,
          "insight": "A pleasant outing does not automatically answer a question about attraction."
        },
        {
          "text": "I often feel more drawn to them once I've switched off from the week.",
          "dimension": "context",
          "weight": 1,
          "insight": "Changes in setting or rest may help you notice existing interest."
        },
        {
          "text": "I feel a familiar wish to connect with this person, not just have a pleasant evening.",
          "dimension": "present",
          "weight": 1,
          "insight": "Your interest appears directed toward your partner in particular."
        },
        {
          "text": "I may enjoy parts of the date, but old resentment can make it hard to feel open.",
          "dimension": "distance",
          "weight": 1,
          "insight": "Your reaction may be affected by something the date itself cannot fix."
        }
      ]
    },
    {
      "id": "after-repair",
      "text": "After the two of you resolve a disagreement respectfully, what tends to happen?",
      "options": [
        {
          "text": "The emotional repair often makes closeness with them feel possible again.",
          "dimension": "distance",
          "weight": 1,
          "insight": "This answer suggests attraction is connected to feeling understood."
        },
        {
          "text": "I feel relieved and still notice the attraction that was there before.",
          "dimension": "present",
          "weight": 1,
          "insight": "Attraction seems to remain available through normal disagreements."
        },
        {
          "text": "We get along better, but the romantic pull still seems noticeably different.",
          "dimension": "shift",
          "weight": 1,
          "insight": "Repair and attraction may be changing on separate tracks."
        },
        {
          "text": "We feel better, but exhaustion often returns when everyday demands pile up.",
          "dimension": "context",
          "weight": 1,
          "insight": "Repair may help while capacity remains a separate pressure."
        }
      ]
    },
    {
      "id": "noticing-qualities",
      "text": "When you notice qualities you used to find attractive in your partner, what fits?",
      "options": [
        {
          "text": "I still notice them and feel personally drawn, even if less dramatically.",
          "dimension": "present",
          "weight": 1,
          "insight": "Familiarity has not erased the meaning of those qualities."
        },
        {
          "text": "I remember appreciating them, but lately I feel emotionally distant from the person.",
          "dimension": "distance",
          "weight": 1,
          "insight": "The relational context may be obscuring positive qualities."
        },
        {
          "text": "I can see those qualities but they no longer create the same sense of attraction.",
          "dimension": "shift",
          "weight": 1,
          "insight": "Recognizing admirable traits and experiencing attraction can diverge."
        },
        {
          "text": "I notice them most when I have time to slow down and pay attention.",
          "dimension": "context",
          "weight": 1,
          "insight": "Attention seems to influence your experience."
        }
      ]
    },
    {
      "id": "new-activity",
      "text": "If your partner suggested a small new activity together, your first thought would be…",
      "options": [
        {
          "text": "That might help us feel less stuck in the same routine.",
          "dimension": "context",
          "weight": 1,
          "insight": "Novel shared attention may be relevant, without promising a spark."
        },
        {
          "text": "I'd like it; I enjoy discovering new sides of this person.",
          "dimension": "present",
          "weight": 1,
          "insight": "Curiosity toward your partner can be one expression of attraction."
        },
        {
          "text": "I'd prefer to resolve something between us before trying a distraction.",
          "dimension": "distance",
          "weight": 1,
          "insight": "New activities are not substitutes for listening and repair."
        },
        {
          "text": "It could be enjoyable, but I'm unsure it would change how attracted I feel.",
          "dimension": "shift",
          "weight": 1,
          "insight": "You are distinguishing fun from a change in attraction."
        }
      ]
    },
    {
      "id": "hardest-question",
      "text": "What is hardest about answering 'Am I still attracted to my partner?'",
      "options": [
        {
          "text": "I worry I'm mistaking stress and limited time for losing attraction.",
          "dimension": "context",
          "weight": 1,
          "insight": "You see circumstances as an important part of the question."
        },
        {
          "text": "I feel I still am, but it no longer looks like the excitement of the first months.",
          "dimension": "present",
          "weight": 1,
          "insight": "Stable attraction may be subtler than initial intensity."
        },
        {
          "text": "I cannot separate attraction from feeling hurt or emotionally alone.",
          "dimension": "distance",
          "weight": 1,
          "insight": "You associate closeness with unresolved relationship experiences."
        },
        {
          "text": "I can name what I value about them but am uncertain about the romantic pull.",
          "dimension": "shift",
          "weight": 1,
          "insight": "Appreciation and attraction deserve separate reflection."
        }
      ]
    },
    {
      "id": "six-month-horizon",
      "text": "Suppose nothing major changes over the next six months. Which concern feels most relevant?",
      "options": [
        {
          "text": "Whether we can find enough time and energy for each other.",
          "dimension": "context",
          "weight": 1,
          "insight": "Shared capacity appears to be an ongoing practical issue."
        },
        {
          "text": "Whether the attraction I still feel can have space to grow and change naturally.",
          "dimension": "present",
          "weight": 1,
          "insight": "You describe an existing foundation, not a lost one."
        },
        {
          "text": "Whether our pattern of missed repairs keeps building distance.",
          "dimension": "distance",
          "weight": 1,
          "insight": "An unaddressed cycle may continue to affect your connection."
        },
        {
          "text": "Whether we're avoiding an honest conversation about how my attraction has changed.",
          "dimension": "shift",
          "weight": 1,
          "insight": "Clarity matters more than pretending to feel a certain way."
        }
      ]
    },
    {
      "id": "respectful-next-step",
      "text": "Which next step seems most honest and respectful for your relationship?",
      "options": [
        {
          "text": "Tell my partner what still draws me to them, without comparing us to the beginning.",
          "dimension": "present",
          "weight": 1,
          "insight": "Naming genuine attraction may be more helpful than chasing an old intensity."
        },
        {
          "text": "Make room for rest or shared experiences and observe what I actually feel.",
          "dimension": "context",
          "weight": 1,
          "insight": "A low-pressure observation gives circumstances a chance to change."
        },
        {
          "text": "Talk about one unresolved hurt and ask for mutual repair.",
          "dimension": "distance",
          "weight": 1,
          "insight": "Repair is valuable whether or not attraction changes."
        },
        {
          "text": "Give myself time to reflect honestly rather than forcing attraction or deciding in a rush.",
          "dimension": "shift",
          "weight": 1,
          "insight": "You can be candid with yourself without treating uncertainty as a verdict."
        }
      ]
    }
  ],
  "profiles": {
    "present": {
      "headline": "Your attraction still appears to be present",
      "summary": "Your answers most often describe an ongoing personal pull toward your partner, even if the feeling is steadier and less intense than the earliest stage of the relationship.",
      "strength": "You can identify specific moments or qualities that still draw you toward your partner.",
      "watch": "Do not make every day a test of whether you feel a spark. Attraction can fluctuate without disappearing.",
      "steps": [
        "Name a genuine quality you still appreciate about your partner.",
        "Make room for shared time that has no performance expectation.",
        "If you're concerned about a specific change, describe it rather than guessing what it means."
      ]
    },
    "context": {
      "headline": "Routine or stress may be crowding out attraction",
      "summary": "You frequently described attraction as easier to recognize when you are rested, attentive or away from everyday demands. That suggests context deserves a closer look before interpreting the change as permanent.",
      "strength": "You noticed when your feelings vary across situations instead of making a single global judgment.",
      "watch": "Reduced demands do not guarantee renewed attraction. Treat change as something to observe, not an obligation.",
      "steps": [
        "Identify a recurring responsibility or stressor that could realistically be eased.",
        "Plan one low-pressure shared experience, allowing it simply to be pleasant.",
        "Notice whether your interest shifts across different contexts, without rating your partner afterward."
      ]
    },
    "distance": {
      "headline": "Emotional distance may be affecting your attraction",
      "summary": "Your responses often linked feeling drawn to your partner with being heard, respected and emotionally connected. Unresolved hurt can make closeness feel harder, but a quiz cannot determine causation.",
      "strength": "You can point to relational experiences that may be open to discussion and repair.",
      "watch": "A repaired disagreement is worthwhile in itself; no one owes attraction or affection as proof that repair worked.",
      "steps": [
        "Choose one specific recurring hurt to discuss calmly.",
        "Ask each other what meaningful repair would look like in behavior, not promises alone.",
        "Allow affectionate contact only when it is genuinely welcome to both of you."
      ]
    },
    "shift": {
      "headline": "Your attraction may have changed more persistently",
      "summary": "Your choices most often separated caring, friendship or enjoyment from feeling romantically drawn to your partner, including in calmer or happier moments. This is a reason for careful reflection, not an automatic instruction to end the relationship.",
      "strength": "You can acknowledge uncertainty without pretending an attraction you do not currently feel.",
      "watch": "A short quiz cannot establish the future of a relationship or distinguish every influence on attraction. Avoid snap decisions based on a label.",
      "steps": [
        "Notice whether the change feels long-standing and consistent across contexts.",
        "Reflect on what closeness and partnership mean to you now, without blame.",
        "Consider an honest, compassionate conversation or qualified couples support if the uncertainty is causing ongoing distress."
      ]
    }
  },
  "method": {
    "signals": "Each chosen answer adds one observation to exactly one of four contexts. The displayed counts add to 12; they are not percentages of attraction or medical probabilities.",
    "ties": "Highest count is the primary descriptive profile. An exact tie is resolved in a fixed order (present, context, distance, shift) and the tied result is clearly presented as mixed. Within one answer, the result also reports a close second.",
    "validation": "Original self-reflection exercise; not clinically validated. It cannot diagnose conditions, measure attraction objectively, or determine whether someone should remain in a relationship."
  }
};root.AttractionReflectionData=data;if(typeof module!=='undefined'&&module.exports)module.exports=data;})(typeof globalThis!=='undefined'?globalThis:this);

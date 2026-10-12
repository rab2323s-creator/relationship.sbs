/* Original 12-question educational self-reflection model. */
(function(root){ "use strict";
const data = {
  "slug": "why-dont-i-want-sex-with-my-partner",
  "updated": "2026-10-12",
  "dimensions": [
    {
      "id": "load",
      "name": "Everyday overload",
      "long": "Stress, exhaustion and mental load",
      "guide": "/blog/mental-load-in-relationships/",
      "action": "Reduce one recurring demand and protect genuine recovery time."
    },
    {
      "id": "connection",
      "name": "Emotional distance",
      "long": "Unresolved hurt and emotional connection",
      "guide": "/blog/emotional-safety-in-relationships/",
      "action": "Name one unmet emotional need and discuss repair without expecting sex."
    },
    {
      "id": "agency",
      "name": "Pressure and boundaries",
      "long": "Expectations, consent and freedom to choose",
      "guide": "/blog/boundaries-vs-control/",
      "action": "Separate everyday affection from any expectation of sex."
    },
    {
      "id": "body",
      "name": "Body and wellbeing",
      "long": "Physical comfort, health changes and mood",
      "guide": "/blog/intimacy-changes-long-term-relationships/",
      "action": "Observe changes and consult a qualified clinician if concerned."
    }
  ],
  "questions": [
    {
      "id": "first-thought",
      "text": "When you notice you're less interested in sex with your partner, what first comes to mind?",
      "options": [
        {
          "text": "I'm depleted; even enjoyable things feel like effort.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Running low on capacity can affect desire without measuring love.",
          "flag": null
        },
        {
          "text": "I miss feeling emotionally close to them.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Emotional safety may need attention before discussing frequency.",
          "flag": null
        },
        {
          "text": "I tense up because I feel I should want it.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "Feeling obliged can make even a gentle invitation feel demanding.",
          "flag": null
        },
        {
          "text": "My interest shifted alongside a physical or wellbeing change.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "A change in wellbeing deserves curiosity rather than blame.",
          "flag": null
        }
      ]
    },
    {
      "id": "free-evening",
      "text": "Imagine a free evening together. What is the biggest obstacle to feeling open to intimacy?",
      "options": [
        {
          "text": "I need rest or time with no demands.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Quiet time can be a genuine need rather than rejection.",
          "flag": null
        },
        {
          "text": "Something unresolved between us is on my mind.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "A calm evening does not resolve unspoken tensions.",
          "flag": null
        },
        {
          "text": "I'm wary that affection will create an expectation.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "Affection should remain possible without implied consent.",
          "flag": null
        },
        {
          "text": "I feel different physically even when we're relaxed.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "Physical factors can remain relevant on an otherwise good day.",
          "flag": null
        }
      ]
    },
    {
      "id": "timeline",
      "text": "Which change most closely matches when your interest began to fade?",
      "options": [
        {
          "text": "My responsibilities or schedule got heavier.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Timing around stress may be informative, not conclusive.",
          "flag": null
        },
        {
          "text": "We went through repeated hurts without much repair.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Unrepaired relationship experiences may matter.",
          "flag": null
        },
        {
          "text": "Sex started to feel obligatory or difficult to decline.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "Freedom to decline should not be contingent on an explanation.",
          "flag": null
        },
        {
          "text": "It coincided with illness, medication, discomfort, hormones or mood changes.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "Notice timing but avoid self-diagnosing from it.",
          "flag": null
        }
      ]
    },
    {
      "id": "affection",
      "text": "When your partner offers ordinary affection, what do you notice?",
      "options": [
        {
          "text": "I like it, but I'm sometimes too tired to respond.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Exhaustion can coexist with affection.",
          "flag": null
        },
        {
          "text": "I want warmth, yet a sense of distance remains.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Warmth and emotional trust are not identical.",
          "flag": null
        },
        {
          "text": "I worry the moment will be treated as a promise of sex.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "A touch need not be an invitation to do more.",
          "flag": null
        },
        {
          "text": "I welcome affection but my physical comfort or response feels different.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "Comfort can vary regardless of emotional closeness.",
          "flag": null
        }
      ]
    },
    {
      "id": "what-helps",
      "text": "If your partner asked what would help, what answer feels most accurate?",
      "options": [
        {
          "text": "More shared practical work and proper rest.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Concrete help may create breathing room.",
          "flag": null
        },
        {
          "text": "A conversation where an old hurt is heard.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Being listened to may matter more than being persuaded.",
          "flag": null
        },
        {
          "text": "Knowing my no will be accepted without guilt or argument.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "An accepted no is the baseline, not a reward.",
          "flag": "pressure"
        },
        {
          "text": "Patience while I understand what has changed in my wellbeing.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "Uncertainty does not make the change less real.",
          "flag": null
        }
      ]
    },
    {
      "id": "other-contexts",
      "text": "How does your level of interest vary outside one particular evening?",
      "options": [
        {
          "text": "It tends to be low whenever life becomes too demanding.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Changes across contexts can suggest capacity matters.",
          "flag": null
        },
        {
          "text": "I can imagine closeness, but our unresolved issues get in the way.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "A relationship-specific block merits a relationship conversation.",
          "flag": null
        },
        {
          "text": "It feels more possible when nothing is expected of me.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "Removing obligation may restore ease, with no promised change in desire.",
          "flag": null
        },
        {
          "text": "It has changed alongside my health, comfort or broader mood.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "Wellbeing can affect interest in several overlapping ways.",
          "flag": null
        }
      ]
    },
    {
      "id": "conversation",
      "text": "What makes a conversation about desire most difficult?",
      "options": [
        {
          "text": "We're so tired that the discussion becomes another chore.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Hard conversations also require energy.",
          "flag": null
        },
        {
          "text": "It brings up other feelings of not being understood.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Repair means listening to the hurt beneath the topic.",
          "flag": null
        },
        {
          "text": "I'm afraid honesty will become a debate over what I owe.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "Honest consent cannot exist through obligation.",
          "flag": null
        },
        {
          "text": "I don't yet understand the physical or emotional change myself.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "You can describe a change without knowing its cause.",
          "flag": null
        }
      ]
    },
    {
      "id": "when-no",
      "text": "What is usually true when you say you're not in the mood?",
      "options": [
        {
          "text": "My answer is accepted, but I still need rest.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "A respected refusal is healthy; fatigue remains separate.",
          "flag": null
        },
        {
          "text": "My answer is accepted, but distance between us persists.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Respect and emotional connection may both need attention.",
          "flag": null
        },
        {
          "text": "I anticipate bargaining, guilt, anger or pressure afterward.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "Pressure after a refusal needs attention regardless of quiz outcome.",
          "flag": "pressure"
        },
        {
          "text": "My answer is accepted; discomfort or a wellbeing change remains.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "Pain or distress should not be pushed through.",
          "flag": null
        }
      ]
    },
    {
      "id": "what-you-miss",
      "text": "What do you miss most from an earlier period of your relationship?",
      "options": [
        {
          "text": "The energy to enjoy time together without an agenda.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Missing vitality can be different from missing attraction.",
          "flag": null
        },
        {
          "text": "Feeling that we were truly on the same team.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Shared emotional life can change over time.",
          "flag": null
        },
        {
          "text": "Being able to offer or decline closeness freely.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "A freely chosen no supports trust.",
          "flag": null
        },
        {
          "text": "Feeling at ease with how my body responded.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "Body changes do not imply blame.",
          "flag": null
        }
      ]
    },
    {
      "id": "observe",
      "text": "If you could observe one change without forcing intimacy, which would be useful?",
      "options": [
        {
          "text": "Whether better sleep or lighter responsibilities changes things.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "A small observation is more useful than forcing change.",
          "flag": null
        },
        {
          "text": "Whether a repaired disagreement restores emotional warmth.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Repair can be worthwhile regardless of sexual outcomes.",
          "flag": null
        },
        {
          "text": "Whether no-pressure boundaries make closeness feel safer.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "A boundary is valuable whether desire changes or not.",
          "flag": null
        },
        {
          "text": "Whether symptoms, discomfort, medicines or mood track the change.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "Discuss significant symptoms with an appropriate professional.",
          "flag": "health"
        }
      ]
    },
    {
      "id": "message",
      "text": "Which message would you most want your partner to understand?",
      "options": [
        {
          "text": "I need fewer demands, not another task.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Reducing demands is a specific request.",
          "flag": null
        },
        {
          "text": "I need to feel emotionally connected before talking about sex.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Emotional repair should not be traded for sex.",
          "flag": null
        },
        {
          "text": "My choice deserves respect even when you're disappointed.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "Declining is a valid choice every time.",
          "flag": null
        },
        {
          "text": "This might involve my wellbeing, not my feelings toward you.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "A health concern deserves care, not a relationship verdict.",
          "flag": null
        }
      ]
    },
    {
      "id": "next-step",
      "text": "What is the most respectful next step this week?",
      "options": [
        {
          "text": "Share a responsibility and make room for actual downtime.",
          "weights": {
            "load": 3,
            "connection": 0,
            "agency": 0,
            "body": 0
          },
          "insight": "Rest is a legitimate goal by itself.",
          "flag": null
        },
        {
          "text": "Talk about one hurt and listen for a workable repair.",
          "weights": {
            "load": 0,
            "connection": 3,
            "agency": 0,
            "body": 0
          },
          "insight": "Talking is progress even if desire stays the same.",
          "flag": null
        },
        {
          "text": "Agree that affection never obliges either person to have sex.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 3,
            "body": 0
          },
          "insight": "Non-sexual affection is not a contract.",
          "flag": null
        },
        {
          "text": "Note what changed and seek suitable medical advice if it worries me.",
          "weights": {
            "load": 0,
            "connection": 0,
            "agency": 0,
            "body": 3
          },
          "insight": "A clinician can explore factors a quiz cannot.",
          "flag": null
        }
      ]
    }
  ],
  "profiles": {
    "load": {
      "title": "Your strongest theme: stress and depleted capacity",
      "summary": "Your answers most often connect lower desire to exhaustion, competing demands and too little recovery time. This can coexist with affection for your partner.",
      "strength": "You identified practical, changeable pressures rather than treating yourself or your partner as the problem.",
      "caution": "If fatigue or low mood continues across daily life, speak to a qualified healthcare professional.",
      "steps": [
        "Choose a recurring task or caregiving duty that can be genuinely shared.",
        "Protect unpressured downtime without turning it into a test of whether desire returns.",
        "Check how you feel after meaningful rest, not after pushing through exhaustion."
      ]
    },
    "connection": {
      "title": "Your strongest theme: emotional distance",
      "summary": "Your answers emphasize disconnection or unresolved hurt. Physical closeness may feel less appealing when emotional trust or repair is unfinished.",
      "strength": "You can describe an emotional need in terms of specific experiences.",
      "caution": "Do not assume one conversation has to fix the relationship or lead to sex.",
      "steps": [
        "Name one specific moment that made you feel distant, without accusation.",
        "Ask for listening and a practical repair rather than proof through sexual activity.",
        "Find a shared activity that has no intimacy expectations attached."
      ]
    },
    "agency": {
      "title": "Your strongest theme: pressure and personal choice",
      "summary": "Your answers emphasize expectations, guilt or the need for freely chosen closeness. Obligation can make invitations feel less welcoming.",
      "strength": "Recognizing your boundaries can support clearer, more respectful communication.",
      "caution": "Repeated pressure, punishment after a refusal or coercion is a safety issue, not a score to negotiate.",
      "steps": [
        "Explain that affection is not consent to sexual activity.",
        "Agree that either person can decline without penalty or repeated requests.",
        "If boundaries are ignored, seek trusted support or professional guidance appropriate to your safety."
      ]
    },
    "body": {
      "title": "Your strongest theme: body and wellbeing changes",
      "summary": "You connected your changing interest to physical comfort, general health, medication, hormonal life stages or mood. A quiz cannot determine the cause.",
      "strength": "Your answers notice personal context without assigning fault.",
      "caution": "Sudden changes, persistent pain, distress or possible medication effects warrant a healthcare conversation. Do not stop prescribed medication on your own.",
      "steps": [
        "Note the timeline and any related changes in sleep, comfort, mood or treatment.",
        "Consider a qualified healthcare professional if you are concerned.",
        "Tell your partner that uncertainty deserves patience, not performance pressure."
      ]
    }
  },
  "methods": {
    "formula": "Each response contributes three points to one of four possible context themes. Each total is divided by 36 and shown as an answer distribution (0–100%), not a likelihood of a medical cause.",
    "tie": "Highest total wins; exact ties use dimension order. If runner-up is within 3 points, show it as a close second; a pressure/safety flag remains independent of the category.",
    "limitations": "Original educational reflection tool, not psychometrically validated or diagnostic; a person's desired frequency and consent never determine their worth."
  }
};
root.DesireContextQuizData = data;
if(typeof module !== "undefined" && module.exports) module.exports = data;
})(typeof globalThis !== "undefined" ? globalThis : this);

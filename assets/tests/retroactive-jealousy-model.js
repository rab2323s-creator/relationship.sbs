/* Original, unvalidated educational scoring model; no network calls or personal data storage. */
(function (scope) {
  "use strict";
  const DIMENSIONS = {
  "thought_loops": {
    "label": "Intrusive thoughts & mental replay",
    "weight": 0.28,
    "desc": "Unwanted scenes about a past you never witnessed, and how often they crowd out the present.",
    "step": "When an image appears, name it as an imagined scene—not new evidence. Gently return to one present fact."
  },
  "comparison": {
    "label": "Comparison & self-worth",
    "weight": 0.23,
    "desc": "The pull to compete with an ex over looks, experiences, or being someone's 'best'.",
    "step": "Write down what you value in your relationship today without ranking it against a stranger's history."
  },
  "reassurance": {
    "label": "Reassurance-seeking loop",
    "weight": 0.24,
    "desc": "Whether answers bring lasting clarity or lead to another round of questioning.",
    "step": "Before asking again, note whether you learned a new present-day fact or are trying to remove an uncomfortable uncertainty."
  },
  "checking": {
    "label": "Searching & privacy boundaries",
    "weight": 0.25,
    "desc": "How often online searches or private-information checks become a way to soothe doubt.",
    "step": "Choose one privacy-respecting limit for searching or checking, and seek help if the urge feels difficult to manage."
  }
};
  const BANDS = [
  {
    "id": "passing",
    "max": 22,
    "title": "Past-focused thoughts are mostly passing",
    "intro": "Your responses suggest that old relationships sometimes cross your mind but rarely take over your attention or actions.",
    "next": "Keep room for a partner's history without turning it into a competition. If a current agreement is broken, address the present behavior directly."
  },
  {
    "id": "triggered",
    "max": 44,
    "title": "Occasional triggers and comparisons",
    "intro": "Certain reminders of a partner's past appear to unsettle you, although many answers still show an ability to return to the present.",
    "next": "Identify your most frequent trigger, separate what happened from what you imagine, and plan one response that doesn't require more investigating."
  },
  {
    "id": "loop",
    "max": 69,
    "title": "A recurring jealousy-and-certainty loop",
    "intro": "Your answers indicate repeated comparisons, imagined scenes, reassurance requests, or searches that may keep the past feeling urgent.",
    "next": "Try interrupting one checking or reassurance cycle. If the pattern is affecting sleep, work, or closeness, consider support from a qualified therapist."
  },
  {
    "id": "high",
    "max": 100,
    "title": "An intense past-focused jealousy cycle",
    "intro": "Across several situations, thoughts about the past seem hard to disengage from and may be shaping current interactions or privacy boundaries.",
    "next": "Prioritize reducing compulsive checking rather than extracting more historical detail. Professional support may help, especially when distress or relationship conflict is persistent."
  }
];
  const QUESTIONS = [
  {
    "text": "You hear your partner casually mention a trip they took with an ex. What happens afterward?",
    "dimension": "thought_loops",
    "options": [
      {
        "label": "I notice a reaction, then return to the conversation.",
        "level": 0,
        "signal": null
      },
      {
        "label": "I wonder briefly what that relationship was like, but the thought passes.",
        "level": 1,
        "signal": null
      },
      {
        "label": "I replay the story several times that evening and fill in unknown details.",
        "level": 2,
        "signal": null
      },
      {
        "label": "Images and imagined scenes keep interrupting my day, even when I try to focus.",
        "level": 3,
        "signal": null
      }
    ]
  },
  {
    "text": "An old photo of your partner with a former partner appears. Which response feels closest?",
    "dimension": "comparison",
    "options": [
      {
        "label": "I get a little curious about that time in their life, then move on.",
        "level": 1,
        "signal": null
      },
      {
        "label": "I can see it as part of their history without ranking myself against it.",
        "level": 0,
        "signal": null
      },
      {
        "label": "I compare my appearance or personality to the other person for hours.",
        "level": 3,
        "signal": null
      },
      {
        "label": "I catch myself wondering whether that person offered something I cannot.",
        "level": 2,
        "signal": null
      }
    ]
  },
  {
    "text": "You ask your partner whether they still have feelings for an ex. They answer clearly. What happens next?",
    "dimension": "reassurance",
    "options": [
      {
        "label": "The reply helps, though the question may return a few days later.",
        "level": 1,
        "signal": null
      },
      {
        "label": "I need increasingly specific reassurance because the first answer never feels complete.",
        "level": 3,
        "signal": null
      },
      {
        "label": "I can take in the answer and judge it alongside how they treat me today.",
        "level": 0,
        "signal": null
      },
      {
        "label": "I feel better temporarily, then ask the same question in a different way.",
        "level": 2,
        "signal": null
      }
    ]
  },
  {
    "text": "A former partner's profile appears in your social media suggestions. You usually…",
    "dimension": "checking",
    "options": [
      {
        "label": "Look briefly out of curiosity, then close it.",
        "level": 1,
        "signal": null
      },
      {
        "label": "Check old posts and connections until I feel more unsettled.",
        "level": 2,
        "signal": null
      },
      {
        "label": "Ignore it if I have no practical reason to visit the profile.",
        "level": 0,
        "signal": null
      },
      {
        "label": "Return repeatedly to monitor new photos, comments, or connections.",
        "level": 3,
        "signal": null
      }
    ]
  },
  {
    "text": "A detail about your partner's romantic history pops into your mind during a good date. You…",
    "dimension": "thought_loops",
    "options": [
      {
        "label": "Notice the thought without letting it rewrite the date.",
        "level": 0,
        "signal": null
      },
      {
        "label": "Feel distracted for a few minutes, then reconnect with the moment.",
        "level": 1,
        "signal": null
      },
      {
        "label": "Mentally replay imagined scenes and lose much of the evening to them.",
        "level": 3,
        "signal": null
      },
      {
        "label": "Have trouble staying present because the detail keeps coming back.",
        "level": 2,
        "signal": null
      }
    ]
  },
  {
    "text": "You learn that an ex shared an important 'first' with your partner. What does it bring up?",
    "dimension": "comparison",
    "options": [
      {
        "label": "I sometimes wish we had been first, but I can value what is ours.",
        "level": 1,
        "signal": null
      },
      {
        "label": "I feel pressured to create a bigger experience to prove I matter more.",
        "level": 2,
        "signal": null
      },
      {
        "label": "It doesn't diminish the experiences we're making now.",
        "level": 0,
        "signal": null
      },
      {
        "label": "I repeatedly measure our moments against a past relationship I didn't witness.",
        "level": 3,
        "signal": null
      }
    ]
  },
  {
    "text": "After reassurance about the past, how long does relief usually last?",
    "dimension": "reassurance",
    "options": [
      {
        "label": "Relief lasts; I rarely need to revisit the same question.",
        "level": 0,
        "signal": null
      },
      {
        "label": "I feel okay for a while but need another answer when a new detail appears.",
        "level": 1,
        "signal": null
      },
      {
        "label": "Relief fades within hours and I start looking for another certainty check.",
        "level": 2,
        "signal": null
      },
      {
        "label": "Even strong reassurance barely helps; each answer produces more questions.",
        "level": 3,
        "signal": null
      }
    ]
  },
  {
    "text": "When you feel pulled to research your partner's dating history, what is most typical?",
    "dimension": "checking",
    "options": [
      {
        "label": "I notice the urge but choose not to investigate private history.",
        "level": 0,
        "signal": null
      },
      {
        "label": "I sometimes reread something public, then stop.",
        "level": 1,
        "signal": null
      },
      {
        "label": "I search timelines, tagged photos, or old posts to resolve uncertainty.",
        "level": 2,
        "signal": null
      },
      {
        "label": "I repeatedly check or seek private access despite their boundaries.",
        "level": 3,
        "signal": "privacy_risk"
      }
    ]
  },
  {
    "text": "You pass a place your partner once visited with an ex. What tends to happen?",
    "dimension": "thought_loops",
    "options": [
      {
        "label": "I may feel a brief pang and continue with my day.",
        "level": 1,
        "signal": null
      },
      {
        "label": "I can acknowledge the history without imagining it in detail.",
        "level": 0,
        "signal": null
      },
      {
        "label": "I mentally compare the past visit with our relationship and get stuck for a while.",
        "level": 2,
        "signal": null
      },
      {
        "label": "The imagined scenes repeat or crowd out what is happening between us now.",
        "level": 3,
        "signal": null
      }
    ]
  },
  {
    "text": "Someone describes a quality your partner admired in a previous relationship. Your response is…",
    "dimension": "comparison",
    "options": [
      {
        "label": "I repeatedly fear I will never measure up to that person.",
        "level": 3,
        "signal": null
      },
      {
        "label": "I notice a comparison but can also name qualities unique to our bond.",
        "level": 1,
        "signal": null
      },
      {
        "label": "I treat it as information about their history, not a competition.",
        "level": 0,
        "signal": null
      },
      {
        "label": "I start changing how I act to compete with an imagined ideal.",
        "level": 2,
        "signal": null
      }
    ]
  },
  {
    "text": "You want to know more about an ex even though your partner has already answered several questions. You…",
    "dimension": "reassurance",
    "options": [
      {
        "label": "Ask one new, relevant question if it affects the present, then respect their limits.",
        "level": 0,
        "signal": null
      },
      {
        "label": "Feel an urge to ask again but can wait and consider why.",
        "level": 1,
        "signal": null
      },
      {
        "label": "Bring up the topic repeatedly, hoping one detail will finally settle it.",
        "level": 2,
        "signal": null
      },
      {
        "label": "Question or test their answers until the conversation becomes an interrogation.",
        "level": 3,
        "signal": "pressure_risk"
      }
    ]
  },
  {
    "text": "The urge to compare or check is especially strong late at night. What do you do most often?",
    "dimension": "checking",
    "options": [
      {
        "label": "Let the urge pass or write down my concern without contacting anyone.",
        "level": 0,
        "signal": null
      },
      {
        "label": "Browse a little, then decide to stop for the night.",
        "level": 1,
        "signal": null
      },
      {
        "label": "Spend a long time digging through old posts despite feeling worse.",
        "level": 2,
        "signal": null
      },
      {
        "label": "Track, demand accounts, or cross privacy boundaries to feel certain.",
        "level": 3,
        "signal": "privacy_risk"
      }
    ]
  }
];
  const KEYS = Object.keys(DIMENSIONS);
  function evaluate(answers) {
    if (!Array.isArray(answers) || answers.length !== QUESTIONS.length ||
        !answers.every((a) => Number.isInteger(a) && a >= 0 && a <= 3)) {
      throw new Error("Answer all 12 questions using one of the four choices.");
    }
    const dimensions = Object.fromEntries(KEYS.map(k => [k, 0]));
    const examples = [], signals = [];
    QUESTIONS.forEach((q,i) => {
      const choice = q.options[answers[i]];
      dimensions[q.dimension] += choice.level;
      examples.push({question:i+1,dimension:q.dimension,level:choice.level,label:choice.label});
      if (choice.signal) signals.push({question:i+1,type:choice.signal});
    });
    // Each dimension has 3 questions and a maximum of 9 points.
    const score = Math.round(KEYS.reduce((sum,k)=> sum + dimensions[k] / 9 * DIMENSIONS[k].weight * 100,0));
    const band = BANDS.find(b=>score <= b.max);
    const ranked = KEYS.slice().sort((a,b)=>dimensions[b]-dimensions[a] || KEYS.indexOf(a)-KEYS.indexOf(b));
    const highest = dimensions[ranked[0]];
    const tied = ranked.filter(k=>dimensions[k]===highest);
    const prominent = ranked.filter(k=>dimensions[k]>=5).slice(0,2);
    const relevantExamples = examples.filter(x=>x.level>=2).sort((a,b)=>b.level-a.level||a.question-b.question).slice(0,3);
    return {score,max:100,band,dimensions,ranked,tied,prominent,examples:relevantExamples,signals};
  }
  const MODEL = {QUESTIONS,DIMENSIONS,BANDS,evaluate};
  if (typeof module!=="undefined" && module.exports) module.exports=MODEL;
  if (scope) scope.RetroactiveJealousyModel=MODEL;
})(typeof window!=="undefined"?window:null);

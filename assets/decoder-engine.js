/* Text Decoder v2 — deterministic, local-only interpretation.
 * A message is not a diagnostic instrument. No probability or attachment diagnosis is inferred.
 * Keep all user input inside the browser; do not log, transmit, or persist text.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TextDecoderEngine = factory();
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";
  var MAX_LENGTH = 1600;
  var LIMITS = ["boundaries", "consent", "safety"];

  var PATTERNS = [
    {id:"unsafe",category:"Safety and pressure",weight:100,rx:/\b(i('ll| will) (hurt|kill)|i('ll| will) make you pay|you('ll| will) regret|send (your|the) (pics|photos)|share (your|the) (nudes|photos)|if you leave.*(hurt|kill)|kill yourself|you are not allowed to|give me your password)\b|رح (اقتل|أؤذيك)|بفضحك/i,
      clues:["Threats, coercion or pressure need a safety response, not romantic decoding."],
      reads:["This message contains language that may be threatening, coercive or controlling.","The sender may be trying to pressure you rather than communicate respectfully.","Context could change the exact interpretation, but your safety takes priority."],
      next:"If you feel unsafe, stop engaging, preserve evidence if safe, and reach out to trusted or local support. Do not meet alone to clarify threats.",
      replies:["I am not comfortable with threats. Do not contact me again.","I am ending this conversation.","Do not contact me again."],
      caution:"You do not owe a response to threatening or abusive contact. Consider blocking and seeking support if safe."},
    {id:"boundary",category:"A clear boundary",weight:95,rx:/\b(don't (text|call|contact) me|stop (texting|calling|contacting) me|leave me alone|i do not want to talk|please respect my (space|decision)|this is over|we are done|don't come over)\b|لا (تحكي|تتواصل) معي|اتركني بحالي/i,
      clues:["The message expresses a limit that should be taken seriously."],
      reads:["They are expressing a boundary or a wish to end contact.","Even if the wording feels sudden, it is not an invitation to negotiate.","Any underlying feelings are private; respect the limit they stated."],
      next:"Do not push for another explanation. Give the person the space they asked for.",
      replies:["I hear you. I will respect your decision.","Understood. I won't contact you.","I respect your boundary and won't reach out."],
      caution:"If someone asks you not to contact them, respecting that boundary matters more than choosing the perfect reply."},
    {id:"breakup",category:"Relationship ending",weight:90,rx:/\b(i want to break up|we should break up|it's not working (out|between us)|i don't want (this|us) anymore|i think we should end (this|things)|we need to (end|stop) this|i('m| am) done (with us|with this))\b|بدنا ننفصل|خلينا ننفصل/i,
      clues:["The words indicate ending or questioning the relationship itself."],
      reads:["They may be stating a decision to end the relationship.","They may be expressing serious dissatisfaction and asking for a change.","It is not safe to assume the statement is only a test for reassurance."],
      next:"Take the message seriously. If a conversation is welcome, ask once about whether the decision is final; do not bargain or chase.",
      replies:["I hear you. Can we clarify whether this is your final decision?","I understand. I'll give us space to process this.","Thank you for being clear. I'll respect your decision."],
      caution:"A breakup message cannot be decoded into a promise they will return."},
    {id:"space",category:"Request for space",weight:88,rx:/\b(i need (some )?space|need time (alone|to think)|i need a break|give me (some )?space|i('m| am) overwhelmed|can we talk (tomorrow|later) instead|not ready to talk)\b|بدي (شوية )?مساحة|بدي وقت|خليني لحالي/i,
      clues:["The message explicitly asks for distance, time or emotional breathing room."],
      reads:["They could be overwhelmed or need time to think.","They may want distance from a difficult discussion, not necessarily from you permanently.","If requests for space repeatedly become unexplained disappearances, the wider pattern matters."],
      next:"Honor the space, then agree on a realistic time to reconnect if they are open to it.",
      replies:["Of course. Take the time you need. When would be a good time to check in?","I can give you space. Let's reconnect when we're both ready.","I respect your space. Can we agree on when we'll revisit this?"]},
    {id:"not-ready",category:"Not ready for commitment",weight:86,rx:/\b(not ready (for|to)|don't want a relationship|not looking for anything serious|keeping it casual|can't give you (what|the relationship)|no labels|nothing serious)\b|ما بدي علاقة جدية|مو جاهز لعلاقة/i,
      clues:["They are setting expectations about the type of relationship they can offer."],
      reads:["They may not want the commitment you're hoping for.","They might be honest about limited emotional availability.","Warmth or flirting does not cancel what they said about commitment."],
      next:"Believe the stated limit and compare it with what you actually need, rather than trying to persuade them.",
      replies:["Thanks for being honest. I need to think about what works for me.","I appreciate the clarity. I'm looking for something different.","I want a committed relationship, so I'll step back." ]},
    {id:"controlling",category:"Jealousy or pressure",weight:84,rx:/\b(who were you with|who are you talking to|prove (you love|where)|send me your location|why are you online|you can't (see|talk to|hang out)|block (him|her|them) now|if you loved me you would)\b|وين كنت|مع مين كنت|اثبتلي انك بتحبني/i,
      clues:["The wording asks for reassurance or control over your behavior."],
      reads:["They may feel insecure and be asking in a demanding way.","The message may cross into control if it includes monitoring, threats or restrictions.","One sentence is not a diagnosis, but repeated pressure deserves attention."],
      next:"You can answer a reasonable question without surrendering privacy or accepting demands.",
      replies:["I can talk about concerns, but I need us to respect each other's privacy.","I'm open to reassurance, not demands or monitoring.","I'm not comfortable being controlled. We need respectful boundaries."]},
    {id:"apology",category:"Apology and repair",weight:79,rx:/\b(i('m| am) sorry|i apologize|sorry about|my fault|i was wrong|forgive me)\b|آسف|اسف|سامحني|حقك علي/i,
      clues:["They are acknowledging something painful or asking for repair."],
      reads:["They may genuinely regret what happened.","They may be trying to ease tension without knowing how to repair it.","Look for a specific acknowledgment and changed actions after the apology."],
      next:"If you want to continue, name the repair you need instead of treating an apology as the whole resolution.",
      replies:["Thank you for apologizing. I'd like us to talk about what changes next.","I appreciate you saying that. I need some time before we revisit it.","I hear the apology. What will be different going forward?"]},
    {id:"miss-you",category:"Missing you or reconnecting",weight:78,rx:/\b(i miss you|missing you|thinking (of|about) you|can we try again|i want you back|wish you were here)\b|اشتقتلك|مشتاقلك|مشتاقتلك|عم فكر فيك/i,
      clues:["The sender is expressing longing or interest in reconnecting."],
      reads:["They may genuinely miss you or the connection you shared.","They might be nostalgic or lonely without having decided what they want.","With an ex, longing does not by itself show readiness to repair a relationship."],
      next:"Ask what they hope for now, especially if a relationship previously ended.",
      replies:["It's good to hear from you. What's been on your mind?","I appreciate you telling me. What are you hoping for between us?","What has changed since we last talked about us?"]},
    {id:"love",category:"Affection or love",weight:76,rx:/\b(i love you|love you so much|i care about you|you mean (so much|a lot) to me|you('re| are) important to me)\b|بحبك|احبك|إحبك/i,
      clues:["They are using explicit words of affection."],
      reads:["They are expressing care or affection in words.","The words may be sincere, but relationships are also evaluated through consistency, respect and follow-through.","Without context, no decoder can measure how deep or stable the feeling is."],
      next:"Notice the broader pattern of care and reply in a way that matches your own feelings.",
      replies:["That means a lot to me. Thank you for saying it.","I appreciate hearing that. I value honest conversations between us.","I care about you, and I also want to make sure our actions match our words."]},
    {id:"plans",category:"Making plans",weight:72,rx:/\b(see you (on|at|tomorrow)|let's (meet|go out|grab|hang out)|want to (meet|get coffee|have dinner)|are you free (on|this|tomorrow)|how about (friday|saturday|sunday|monday|tuesday|wednesday|thursday))\b|نشوف بعض|نتقابل|نطلع سوا/i,
      clues:["They are suggesting or confirming time together."],
      reads:["They may be interested in spending time with you.","Specific plans usually give clearer information than vague flirting.","Look for whether they follow through or offer another date if plans change."],
      next:"Respond to the invitation clearly; if you are interested, agree on a day and place.",
      replies:["I'd like that! What time works for you?","Sounds good. Let's make a plan.","I'm interested. Can we choose a day and time?"]},
    {id:"cancel",category:"Cancelled plans",weight:71,rx:/\b(can't make it|have to cancel|need to reschedule|something came up|rain check|can't meet (today|tonight)|plans changed)\b|ما بقدر اجي|لازم أجل|خلينا نأجل/i,
      clues:["A planned meeting may be postponed."],
      reads:["They may have a genuine conflict or change of circumstances.","If they offer another date, that can support an interpretation of ongoing interest.","Repeated cancellations without rescheduling may signal a mismatch in effort."],
      next:"Ask once about an alternative time; judge repeated follow-through rather than a single cancellation.",
      replies:["No worries. Hope everything's okay—want to pick another day?","Thanks for letting me know. Send me a day that works.","I understand things happen. I need plans we can both follow through on."]},
    {id:"vague",category:"Unclear plans or commitment",weight:70,rx:/\b(maybe later|we('ll| will) see|not sure|maybe some(time|day)|let me see|i'll let you know|idk|perhaps later|we'll figure it out)\b|يمكن بعدين|منشوف|نشوف بعدين|مو متأكد/i,
      clues:["The reply leaves a decision or plan open."],
      reads:["They may genuinely be undecided or busy.","They may be keeping options open rather than agreeing to a plan.","One vague reply means little; repeated vagueness without follow-through is more informative."],
      next:"Offer one simple specific option, then let their follow-through show how available they are.",
      replies:["All good. Let me know when you're sure.","No problem. I'll leave the ball with you to suggest a day.","I prefer clear plans. If you're interested, let's pick a time."]},
    {id:"busy",category:"Busy or unavailable",weight:68,rx:/\b(so busy|busy (today|right now|at work)|swamped|long day|crazy week|work is hectic|can't talk right now|i'm working)\b|مشغول|مشغولة|عندي شغل/i,
      clues:["They are describing a scheduling or attention constraint."],
      reads:["They may simply have a busy day or demanding work.","They may also need breathing room and not want a long conversation now.","The distinction is whether they reconnect or make space when available."],
      next:"Acknowledge the constraint; do not infer rejection from one busy message.",
      replies:["No worries. Hope your day eases up!","Got it. Talk when you're free.","Thanks for letting me know. When's a better time to talk?"]},
    {id:"we-need-talk",category:"A serious conversation",weight:67,rx:/\b(we need to talk|can we talk|need to tell you something|have something to tell you|it's important)\b|لازم نحكي|بدي احكي معك/i,
      clues:["They want a conversation, but haven't given its subject."],
      reads:["They may want to discuss something important.","It could be positive, negative or simply practical.","The message alone provides too little information to assume a breakup."],
      next:"Ask for a little context or schedule a time to talk; avoid constructing worst-case stories.",
      replies:["Sure. Is everything okay, and when is a good time?","Of course. Can you tell me what it's about?","I'm open to talking. Please share the topic so I can be prepared."]},
    {id:"reassurance",category:"Asking for reassurance",weight:63,rx:/\b(are we okay|are you (mad|upset) at me|do you still (like|love) me|you don't care|you never text|why aren't you replying|please answer)\b|زعلان مني|بتحبني بعد|ليش ما رديت/i,
      clues:["They seem to be seeking reassurance or clarity."],
      reads:["They may be worried about your connection.","They may be reacting to a specific moment of uncertainty.","This message cannot establish an attachment style or mental-health condition."],
      next:"Offer a calm, honest response without promising more than you mean.",
      replies:["We're okay. I'd like to talk when we both have time.","I can hear that you're worried. Let's talk about what happened.","I want honest communication, not guesses. Let's clarify the issue."]},
    {id:"compliment",category:"A compliment or flirty message",weight:60,rx:/\b(you're cute|you look (great|beautiful|amazing)|you('re| are) gorgeous|can't stop smiling|thinking about our date|i like you)\b|حلوة|حلو كتير|معجب فيك/i,
      clues:["This reads as a compliment or a signal of attraction."],
      reads:["They may be flirting or expressing genuine appreciation.","Some people compliment friends too, so a single message is not conclusive.","Repeated initiative and respectful plans matter more than one flattering line."],
      next:"If you like them too, respond warmly and notice whether the connection develops offline.",
      replies:["That's sweet of you to say!","Thank you, I appreciate that.","Thanks! I'd like to get to know you better—want to make plans?"]},
    {id:"cold",category:"Very short or dry reply",weight:45,rx:/^(k+|ok(?:ay)?|fine|sure|yep|nah|lol|haha|hmm|👍|👌|تمام|اوك|اوكي|ماشي|طيب|مم+)$/i,
      clues:["The wording is brief and contains little information."],
      reads:["It could be a neutral acknowledgment or a fast reply.","The sender may be busy, distracted, or simply concise.","It may feel cold compared with their usual tone, but it does not prove anger or disinterest."],
      next:"Compare it with their normal texting style and the wider conversation before reacting.",
      replies:["Got it. Talk later!","Sounds good.","Just checking—are we on the same page?"]},
    {id:"question",category:"A direct question",weight:34,rx:/\?|؟/,
      clues:["The message asks for some kind of response."],
      reads:["The sender is asking a question; its meaning depends on what was asked.","A question can show curiosity, coordination or uncertainty.","Answering the literal question is often more helpful than guessing hidden motives."],
      next:"Reply to the actual question, and ask for clarification only if you need it.",
      replies:["Happy to explain—what would you like to know?","Can you say a bit more about what you mean?","I want to answer clearly. Which part are you asking about?"]}
  ];

  function normalize(s) {
    return String(s || "").normalize("NFKC").replace(/[\u200B-\u200D\uFEFF]/g, "").trim().slice(0, MAX_LENGTH);
  }

  function analyze(input) {
    var raw = normalize(input && input.message);
    if (!raw) return {error:"Paste a message first. One or two words are enough to start."};
    var relation = (input && input.relationship) || "dating";
    var pattern = (input && input.pattern) || "unknown";
    var situation = (input && input.situation) || "general";
    var direction = (input && input.direction) || "received";
    var delay = Number(input && input.hours);
    if (!Number.isFinite(delay)) delay = 0;
    delay = Math.max(0, Math.min(720, delay));
    var seen = Boolean(input && input.seen);
    var matches = [];
    for (var i=0;i<PATTERNS.length;i++){
      var rule = PATTERNS[i];
      if (rule.rx.test(raw)) {
        var score = rule.weight;
        if (relation === "ex" && ["miss-you","breakup","boundary"].includes(rule.id)) score += 7;
        if (situation === "after-conflict" && ["apology","space","we-need-talk"].includes(rule.id)) score += 6;
        if (situation === "plans" && ["cancel","plans","vague"].includes(rule.id)) score += 7;
        if (situation === "after-breakup" && ["miss-you","breakup","boundary"].includes(rule.id)) score += 7;
        matches.push({rule:rule,score:score});
      }
    }
    matches.sort(function(a,b){return b.score-a.score;});
    var chosen = matches.length ? matches[0].rule : {
      id:"general",category:"Context-dependent message",
      clues:["The message does not match a distinctive phrasing pattern."],
      reads:["Its meaning depends on context, tone and the history between you.","A single text cannot reliably reveal someone's intentions or emotional state.","A direct, low-pressure question can bring more clarity than decoding punctuation."],
      next:"Consider the recent pattern of communication, then ask one clear question if you need more context.",
      replies:["Thanks for messaging. How are things?","I might be reading this wrong—can you clarify?","Can you tell me more clearly what you mean?"]
    };
    var signals=chosen.clues.slice();
    if (pattern === "consistent") signals.push("You described their usual communication as steady; one unusual message may be an exception.");
    if (pattern === "mixed") signals.push("You described a mixed pattern; focus on repeated follow-through rather than this one text.");
    if (pattern === "distant") signals.push("You described a recurring distance pattern; the overall trend matters more than punctuation.");
    if (relation === "ex") signals.push("Because this is an ex, ask what kind of contact or relationship is actually being offered.");
    if (situation === "after-conflict") signals.push("A recent conflict can change how words land for both people.");
    if (situation === "plans") signals.push("For plans, a specific time and actual follow-through are stronger signals than enthusiastic wording.");
    if (direction === "sent" && seen) signals.push("A seen receipt and response delay alone cannot explain why someone has not replied.");
    if (direction === "sent" && seen && delay >= 24) signals.push("After a full day, you may choose one respectful follow-up if appropriate; avoid repeated messages.");
    var warning = chosen.caution || "These are plausible readings, not facts about another person's feelings. No numerical certainty or attachment diagnosis is possible from one text.";
    var possibilities = chosen.reads.slice();
    if (direction === "sent" && seen && chosen.id !== "unsafe" && chosen.id !== "boundary"){
      possibilities.unshift("If this is your last sent message, their lack of a reply may reflect timing, uncertainty or a choice not to engage.");
      possibilities = possibilities.slice(0,3);
    }
    if (relation === "ex" && chosen.id === "miss-you") {
      possibilities[1] = "They may be nostalgic or lonely without necessarily being ready for a healthy reunion.";
    }
    return {
      id:chosen.id, title:chosen.category,
      interpretation:possibilities[0],alternatives:possibilities.slice(1),
      clues:signals, next:chosen.next, caution:warning,
      replies:{warm:chosen.replies[0],calm:chosen.replies[1],direct:chosen.replies[2]},
      related:matches.slice(1,3).map(function(m){return m.rule.category;}),
      contextUsed:{relationship:relation,pattern:pattern,situation:situation,direction:direction},
      supportedLanguage:/[\u0600-\u06FF]/.test(raw) ? "Partial Arabic phrase recognition; reply suggestions are in English." : "English phrase recognition",
      truncated:String((input && input.message) || "").trim().length > MAX_LENGTH,
      note:LIMITS.join(", ")
    };
  }
  return {analyze:analyze,maxLength:MAX_LENGTH,version:"2.0.0"};
});

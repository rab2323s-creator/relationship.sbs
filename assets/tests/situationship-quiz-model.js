/* Situationship quiz: deterministic, local-only scoring. No answer storage or network calls. */
(function (root, factory) {
  const model = factory();
  if (typeof module === "object" && module.exports) module.exports = model;
  if (root) root.SituationshipQuiz = model;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  // Each response is 0–3. Questions have one primary dimension and a transparent weight.
  const questions = [
    { dimension:"clarity", weight:1.35, prompt:"Have you both talked about what this connection is?", options:[
      ["Yes. We agreed we're building a committed relationship.",3],
      ["Yes. We agreed to keep things casual, and that works for us.",2],
      ["We've hinted at it, but never reached an agreement.",1],
      ["Every attempt to define it gets brushed off or avoided.",0]] },
    { dimension:"reliability", weight:1.0, prompt:"How predictable is your contact from week to week?", options:[
      ["We stay in touch in a way that works for both of us.",3],
      ["It varies, but changes are usually explained.",2],
      ["I often don't know when I'll hear from them.",1],
      ["Contact goes hot and cold without any real explanation.",0]] },
    { dimension:"direction", weight:1.25, prompt:"What do their actions show about building something together?", options:[
      ["They consistently make room for us in their decisions.",3],
      ["They show interest, but we're still figuring out the pace.",2],
      ["They say they want more, but little has changed.",1],
      ["They avoid taking even small steps toward commitment.",0]] },
    { dimension:"clarity", weight:1.2, prompt:"What have you agreed about dating or seeing other people?", options:[
      ["We explicitly agreed to be exclusive.",3],
      ["We explicitly agreed we can see others, and both accept that.",3],
      ["We've never actually discussed exclusivity.",1],
      ["We seem to expect different things, or the topic is avoided.",0]] },
    { dimension:"direction", weight:1.1, prompt:"When you talk about the coming months, what happens?", options:[
      ["We discuss concrete plans that include each other.",3],
      ["We talk about possibilities and sometimes make a plan.",2],
      ["The future sounds sweet but stays vague.",1],
      ["They won't discuss a shared future at all.",0]] },
    { dimension:"direction", weight:1.35, prompt:"Compared with a couple of months ago, where is this connection?", options:[
      ["We've taken meaningful steps forward together.",3],
      ["There's been some progress, even if it's gradual.",2],
      ["It feels mostly unchanged despite wanting more clarity.",1],
      ["We keep repeating the same cycle with no progress.",0]] },
    { dimension:"connection", weight:.85, prompt:"Can you talk about feelings and expectations openly?", options:[
      ["We can both be honest and listen, even when it's awkward.",3],
      ["We try, although one of us needs more time.",2],
      ["One of us usually changes the subject.",1],
      ["Bringing up feelings tends to shut the conversation down.",0]] },
    { dimension:"reliability", weight:1.25, prompt:"When one of you promises to do something for the relationship, what follows?", options:[
      ["Promises usually turn into visible actions.",3],
      ["Most things happen, with an occasional missed plan.",2],
      ["I hear reassurances, but follow-through is hit or miss.",1],
      ["The same promises are repeated without changes.",0]] },
    { dimension:"direction", weight:.8, prompt:"How involved are you in each other's everyday lives?", options:[
      ["We naturally include each other in important parts of life.",3],
      ["We're gradually getting to know each other's worlds.",2],
      ["We spend time together but remain separate in most areas.",1],
      ["I'm kept outside their life without any explanation.",0]] },
    { dimension:"connection", weight:.85, prompt:"What happens when you raise a difficult relationship question?", options:[
      ["We talk it through respectfully, even without instant agreement.",3],
      ["It's uncomfortable, but we usually return to it.",2],
      ["We talk briefly, then the real question gets lost.",1],
      ["The conversation is repeatedly cut off or turned against me.",0]] },
    { dimension:"clarity", weight:1.4, prompt:"How well do you understand what each of you wants?", options:[
      ["We've both said we want a committed relationship.",3],
      ["We've both agreed that casual is right for us now.",2],
      ["I know what I want but I'm unsure about them.",1],
      ["We've said we want different things, without a workable agreement.",0]] },
    { dimension:"reliability", weight:.9, prompt:"Who usually makes and confirms plans to see each other?", options:[
      ["We both take initiative in ways that feel fair.",3],
      ["One of us plans more, but both contribute.",2],
      ["I usually have to start or confirm everything.",1],
      ["Plans rarely happen unless I keep pushing for them.",0]] },
    { dimension:"clarity", weight:1.3, prompt:"If you've asked about labels or commitment, what happens next?", options:[
      ["We give each other a clear and respectful answer.",3],
      ["We set a specific time to revisit it, and we follow through.",2],
      ["I keep hearing 'not yet' without a real conversation.",1],
      ["The topic is repeatedly dodged or postponed indefinitely.",0]] },
    { dimension:"direction", weight:1.0, prompt:"As you've spent more time together, how has the connection developed?", options:[
      ["Our understanding of each other and our agreements have grown.",3],
      ["Some things have deepened while others need discussion.",2],
      ["We feel close but haven't clarified anything important.",1],
      ["Time passes, but we're still having the same unresolved talks.",0]] },
    { dimension:"fit", weight:1.2, prompt:"If your arrangement stayed exactly as it is, how would you feel?", options:[
      ["It meets my needs, and we've been honest about what it is.",3],
      ["I'd be comfortable for now, with a check-in later.",2],
      ["I'd need clearer expectations or more progress soon.",1],
      ["It doesn't meet my needs, and we don't seem to want the same thing.",0]] }
  ].map((q, index) => Object.freeze({...q, id:index+1, options:Object.freeze(q.options.map(o => Object.freeze({label:o[0], value:o[1]})))}));

  const dimensions = Object.freeze({
    clarity:"Definition & agreements",
    reliability:"Consistency & follow-through",
    direction:"Commitment & progress",
    connection:"Emotional communication",
    fit:"Your needs & expectations"
  });
  const profiles = Object.freeze({
    developing:{title:"This Looks Like a Developing Relationship",summary:"There is meaningful evidence of consistency and forward movement. The best next step is to keep your agreements explicit rather than relying on assumptions."},
    gray:{title:"You're in the Gray Area",summary:"Some parts of this connection have direction, while other important expectations are still in progress. A clear check-in could turn uncertainty into a shared understanding."},
    situationship:{title:"This Looks Like a Situationship",summary:"There appears to be a connection, but the definition or direction is not yet reliable. This describes the arrangement you reported, not anyone's private intentions."},
    mismatch:{title:"You May Want Different Things",summary:"Your responses suggest a gap between what you need and what has been mutually agreed. That gap deserves a direct conversation, not more guessing."},
    stuck:{title:"The Relationship May Be Stuck",summary:"The same questions or promises may be resurfacing without visible movement. The important distinction is whether a specific agreement can lead to changed actions."},
    casual:{title:"A Clear, Mutually Agreed Casual Connection",summary:"You've described a casual arrangement with explicit agreements and needs that are currently respected. Casual does not automatically mean unhealthy or misleading."}
  });

  function calculate(answers) {
    if (!Array.isArray(answers) || answers.length !== questions.length ||
        answers.some((answer,i) => !Number.isInteger(answer) || answer < 0 || answer > 3 || !questions[i].options[answer])) {
      throw new Error("All 15 questions must have one valid answer.");
    }
    const sums = Object.fromEntries(Object.keys(dimensions).map(d => [d,{earned:0,possible:0}]));
    let earned=0,possible=0;
    questions.forEach((q,i) => {
      const value=q.options[answers[i]].value;
      sums[q.dimension].earned += value*q.weight;
      sums[q.dimension].possible += 3*q.weight;
      earned += value*q.weight;
      possible += 3*q.weight;
    });
    const scores=Object.fromEntries(Object.entries(sums).map(([k,v])=>[k, Math.round(100*v.earned/v.possible)]));
    const score=Math.round(100*earned/possible);
    const a=answers;
    let profile="gray";
    // Mutually agreed, comfortable casual dating is distinct from unspoken ambiguity.
    if (a[0]===1 && a[3]===1 && a[10]===1 && a[14]<=1) profile="casual";
    else if ((a[10]===3 && a[14]>=2) || (a[14]===3 && (a[10]>=2 || scores.fit<40))) profile="mismatch";
    else if (scores.direction<=38 && a[5]>=2 && (a[7]>=2 || a[12]>=2)) profile="stuck";
    else if (score>=76 && scores.clarity>=66 && scores.direction>=67 && scores.reliability>=60) profile="developing";
    else if (scores.clarity<48 && score<=68) profile="situationship";
    else if (score<=39 && scores.direction<45) profile="stuck";
    else profile="gray";

    const positives=[];
    const uncertainties=[];
    const add=(target,condition,msg)=>{if(condition&&!target.includes(msg))target.push(msg);};
    add(positives,a[1]<=1,"Communication has a pattern you can usually count on.");
    add(positives,a[3]<=1,"You've had an explicit conversation about seeing other people.");
    add(positives,a[7]<=1,"Plans and promises are generally backed up by action.");
    add(positives,a[11]<=1,"Making plans is a shared effort.");
    add(positives,a[4]<=1,"There is at least some shared planning for the future.");
    add(positives,a[6]<=1,"You can discuss feelings with some openness.");
    add(positives,a[0]<=1,"You've spoken directly about the kind of connection you have.");
    add(positives,a[5]<=1,"The connection has shown observable progress.");
    add(uncertainties,a[0]>=2,"You haven't reached a clear agreement about what to call this.");
    add(uncertainties,a[3]>=2,"Exclusivity hasn't been clearly agreed on.");
    add(uncertainties,a[4]>=2,"Future talk is vague or missing.");
    add(uncertainties,a[7]>=2,"Reassuring words aren't consistently followed by actions.");
    add(uncertainties,a[12]>=2,"Conversations about labels or commitment are repeatedly postponed.");
    add(uncertainties,a[5]>=2,"The connection hasn't shown meaningful progress lately.");
    add(uncertainties,a[10]>=2,"You don't have a clear shared understanding of what each person wants.");
    add(uncertainties,a[14]>=2,"The current arrangement doesn't fully meet your needs.");
    add(uncertainties,a[1]>=2,"Communication is hard to predict.");
    add(uncertainties,a[9]>=2,"Difficult topics don't consistently lead to useful discussion.");
    if (!positives.length) positives.push("You've taken time to identify the patterns rather than guessing about one moment.");
    if (!uncertainties.length) uncertainties.push("Keep checking that expectations remain shared as the connection develops.");

    const patterns=[];
    if(a[1]<=1 && a[0]>=2)patterns.push("Contact feels fairly consistent, but the relationship itself hasn't been clearly defined.");
    if(a[11]<=1 && a[12]>=2)patterns.push("You make plans together, yet conversations about commitment keep getting pushed aside.");
    if(a[6]<=1 && a[3]>=2)patterns.push("Emotional closeness is present, but exclusivity is still an assumption rather than an agreement.");
    if(a[4]<=1 && a[7]>=2)patterns.push("Future-oriented talk hasn't consistently translated into follow-through.");
    if(a[0]<=1 && a[10]<=1 && a[5]<=1)patterns.push("Your stated expectations and the progress you see are largely aligned.");
    if(a[10]===3 && a[14]>=2)patterns.push("You've described differing goals, and the current situation is not satisfying your needs.");
    if(a[5]>=2 && a[13]>=2)patterns.push("Time has passed without the definition or progress catching up with the connection.");
    if(!patterns.length) {
      const lowest=Object.entries(scores).sort((x,y)=>x[1]-y[1])[0][0];
      const descriptions={clarity:"Clear agreements are the biggest area to revisit.",reliability:"Consistency and follow-through need the closest look.",direction:"Look at concrete steps forward, not just the feeling of closeness.",connection:"It may help to make space for an honest conversation.",fit:"Start with whether this arrangement works for your own needs."};
      patterns.push(descriptions[lowest]);
    }
    let steps=[
      "Write down what kind of relationship you want right now, without guessing what the other person wants.",
      "Have one calm check-in and name a specific agreement or next step.",
      "Compare what happens afterward with what you both actually agreed."
    ];
    if(profile==="casual")steps=[
      "Keep your casual agreement explicit, including whether you're free to date others.",
      "Check in if your expectations or feelings change.",
      "Notice whether the arrangement keeps working for both of you."
    ];
    if(profile==="mismatch")steps=[
      "Name the kind of commitment you want, without minimizing it.",
      "Ask what the other person wants now and listen to the answer.",
      "Decide whether the available arrangement meets your needs; don't rely on an imagined future."
    ];
    if(profile==="stuck")steps=[
      "Identify the specific conversation or promise that keeps repeating.",
      "Ask for one concrete, mutually agreed next step rather than general reassurance.",
      "Decide what you'll do for your own well-being if nothing changes."
    ];
    if(profile==="developing")steps=[
      "Keep discussing the pace and definition of the relationship openly.",
      "Make sure exclusivity and future expectations are explicit, not inferred.",
      "Continue judging progress by shared actions over time."
    ];
    const starter = profile==="casual" ?
      "I like what we have and I'm comfortable keeping it casual right now. Can we check that we're still on the same page about expectations and seeing other people?" :
      profile==="mismatch" ?
      "I've realized I want a committed relationship. What kind of connection are you looking for right now? It's okay if our answers differ, but I need to be clear about mine." :
      profile==="stuck" ?
      "We've talked about where this is going before, but I still feel unclear. What specific next step would we both be willing to take?" :
      profile==="developing" ?
      "I like how we're showing up for each other. Can we talk about how we each define this relationship and what we'd like next?" :
      "I've enjoyed our connection, and I'd like to understand what we're both hoping for. How would you describe what we have right now?";
    return {score,scores,profile,title:profiles[profile].title,summary:profiles[profile].summary,
      patterns:patterns.slice(0,3), positives:positives.slice(0,4), uncertainties:uncertainties.slice(0,4), steps,starter};
  }
  return Object.freeze({questions,dimensions,profiles,calculate});
});
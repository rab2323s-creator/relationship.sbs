(function makeEmotionalCheatingQuizModel() {
  "use strict";
  // Educational reflection; never an assessment or proof of infidelity.
  // Answer values 0..3 signal increasing boundary concern; weighted normalized 0..100.
  const dims={
    secrecy:{label:"Transparency & concealment",intro:"Hidden contact and misleading accounts matter differently from ordinary privacy."},
    closeness:{label:"Emotional closeness & priority",intro:"Outside support and close friends can be healthy. Concern depends on displacement and surrounding agreements."},
    agreements:{label:"Agreements & expectations",intro:"Partners may set different rules. Unspoken assumptions are not the same as knowingly broken agreements."},
    romance:{label:"Romantic tension & comparison",intro:"Attraction is not an action by itself; how it affects choices matters."},
    impact:{label:"Time, dependence & impact",intro:"A connection can deserve attention if it starts disrupting agreed responsibilities and trust."}
  };
  const raw=[
    {dim:"secrecy",weight:1.4,ask:"When your partner asks about this friendship, how openly do you talk about it?",options:[
      "I describe the friendship honestly and don't feel a need to hide it.",
      "I sometimes keep small details private, but I don't mislead them.",
      "I often downplay how much we talk or how close we are.",
      "I deliberately hide the connection or give a misleading explanation."
    ],topic:"What you share about the friendship"},
    {dim:"secrecy",weight:1.55,ask:"How do your messages with this person change when your partner is nearby?",options:[
      "My messaging is the same; ordinary privacy is all I need.",
      "I might wait to reply, but I don't disguise or erase the exchange.",
      "I sometimes mute notifications or move conversations out of sight to avoid questions.",
      "I routinely delete, disguise, or hide messages because I don't want them discovered."
    ],topic:"Private messaging and concealment"},
    {dim:"closeness",weight:.85,ask:"What happens when you have a deeply personal worry to share?",options:[
      "I can lean on this friend without shutting my partner out of important conversations.",
      "I sometimes open up to my friend first; my relationship still has room for honesty.",
      "I frequently share my deepest feelings here while avoiding them with my partner.",
      "I've built an emotional confiding relationship here that I deliberately keep separate from my partner."
    ],topic:"Personal disclosure"},
    {dim:"closeness",weight:1.15,ask:"When something important happens, how often is this person your first emotional contact?",options:[
      "It depends on the situation, and my partner isn't routinely excluded.",
      "I occasionally turn to this friend first without much impact on my relationship.",
      "More and more, I seek this person's support instead of talking with my partner.",
      "I now rely on this person for emotional connection while repeatedly shutting my partner out."
    ],topic:"Emotional priority"},
    {dim:"agreements",weight:.85,ask:"What have you and your partner actually agreed about close friendships and emotional boundaries?",options:[
      "We've discussed boundaries, and this connection fits the agreement.",
      "We've discussed general expectations, though a few details are open.",
      "We haven't discussed it, and I'm unsure whether our assumptions match.",
      "We know some limits matter but avoid addressing how this connection relates to them."
    ],topic:"Shared boundary expectations"},
    {dim:"secrecy",weight:1.4,ask:"If you described these conversations to your partner, how accurate would the description be?",options:[
      "It would be a fair account of the tone and topics.",
      "I might leave out personal details, without changing the meaning.",
      "I'd probably make the conversations sound less personal or frequent than they are.",
      "I'd intentionally give a different impression because the truth would raise concerns."
    ],topic:"Intentional understatement"},
    {dim:"romance",weight:1.1,ask:"Is there flirting or romantic interest that affects how you interact with this person?",options:[
      "No, or any passing attraction doesn't affect my behavior.",
      "I've noticed some attraction, but I maintain the boundaries I want to keep.",
      "Flirting or romantic curiosity sometimes shapes our messages or time together.",
      "Romantic tension has become a recurring part of our conversations or plans."
    ],topic:"Romantic tension"},
    {dim:"romance",weight:.85,ask:"Do comparisons between this person and your partner change how you feel about your relationship?",options:[
      "Not in a way that pushes my partner away.",
      "I notice occasional comparisons, but I don't feed them.",
      "I often idealize this person and become less engaged with my partner.",
      "I repeatedly use this connection as an alternative to dealing with relationship issues."
    ],topic:"Favorable comparison"},
    {dim:"impact",weight:.9,ask:"How has the time you spend on this connection affected your relationship?",options:[
      "It fits into my life without crowding out agreed time with my partner.",
      "It sometimes takes up extra time, but I try to keep things balanced.",
      "I often prioritize these conversations over time I agreed to spend with my partner.",
      "I repeatedly cancel, withdraw, or neglect shared plans to stay engaged here."
    ],topic:"Time and attention"},
    {dim:"impact",weight:1,ask:"How strongly does this person's attention affect your mood?",options:[
      "I appreciate it, but my well-being doesn't depend heavily on their replies.",
      "I sometimes look forward to messages more than I expect.",
      "Their attention often determines whether I feel emotionally connected that day.",
      "I feel intensely pulled toward their attention, even when it strains my relationship."
    ],topic:"Emotional dependence"},
    {dim:"closeness",weight:1.15,ask:"How much of your emotional life with this person exists in a separate world your partner knows little about?",options:[
      "My friend and I have privacy, but there's no major hidden emotional story.",
      "Some conversations are personal, without a need to keep the overall connection secret.",
      "A significant part of this bond is unknown to my partner, and I avoid bringing it up.",
      "We maintain a deliberately private emotional world I don't want my partner to understand."
    ],topic:"Separate emotional world"},
    {dim:"secrecy",weight:1.25,ask:"Would you feel comfortable explaining the nature of this friendship honestly?",options:[
      "Yes, including its emotional closeness and the boundaries we've kept.",
      "Mostly; I'd prefer privacy about some details, not the nature of the friendship.",
      "I'd hesitate because the relationship is more intense than I've admitted.",
      "I would actively avoid a straightforward explanation."
    ],topic:"Comfort with transparency"},
    {dim:"agreements",weight:1.85,ask:"Has this connection involved a boundary you and your partner explicitly agreed to respect?",options:[
      "No. As far as I know, we've stayed within our agreed limits.",
      "We haven't made a clear agreement about this, so I can't call it a violation.",
      "Something came close to an agreed limit, and we need to talk about it.",
      "Yes. An agreed limit was knowingly crossed."
    ],topic:"Explicitly agreed limits"},
    {dim:"impact",weight:1.25,ask:"What effect has this connection had on trust or communication in your relationship?",options:[
      "I haven't noticed it hurting trust or our ability to talk.",
      "There's been occasional discomfort that we can discuss.",
      "It has contributed to distance, difficult conversations, or reduced trust.",
      "It has repeatedly damaged trust or closeness, and the issue remains unresolved."
    ],topic:"Relationship impact"},
    {dim:"agreements",weight:.65,ask:"If your partner had a similar friendship with the same behavior and agreements, how would you see it?",options:[
      "I'd consider it within the boundaries we'd agreed on.",
      "I'd be mostly comfortable, but I'd want to check our expectations.",
      "I'd feel uneasy and think the boundaries needed a conversation.",
      "I'd see the same behavior as a serious breach of what we'd agreed."
    ],topic:"Reversed-perspective reflection"}
  ];
  const questions=Object.freeze(raw.map((q,i)=>Object.freeze({id:i+1,dimension:q.dim,weight:q.weight,prompt:q.ask,topic:q.topic,options:Object.freeze(q.options.map((label,v)=>Object.freeze({label,value:v})))})));
  const profiles={
    clear:{title:"Your Friendship Appears to Have Clear Boundaries",summary:"Your answers describe relatively little intentional secrecy, displacement, or conflict with known agreements. Close friendships and private conversations can be part of a healthy life."},
    clarify:{title:"Some Boundaries May Need Clarifying",summary:"A few details in this connection deserve an honest check-in. Unclear expectations can be discussed without treating friendship or privacy as wrongdoing."},
    blurring:{title:"Emotional Boundaries May Be Blurring",summary:"Your answers suggest some overlap between ordinary friendship and expectations within your relationship. The important next step is to distinguish closeness from concealment and discuss what both people actually agreed to."},
    potential:{title:"There Are Signs of a Potential Emotional Affair",summary:"Several answers point to a combination of secrecy, shifting emotional priority, romantic tension, or agreed limits becoming difficult to uphold. These are reasons for a careful conversation, not proof of infidelity."},
    crossed:{title:"Your Relationship Boundaries May Have Been Crossed",summary:"The pattern you described raises substantial concerns about transparency or previously agreed limits, alongside an effect on trust. The answers do not establish intent or determine what occurred beyond your own account."}
  };
  function calculate(answers){
    if(!Array.isArray(answers)||answers.length!==15||answers.some((a,i)=>!Number.isInteger(a)||a<0||a>3||!questions[i].options[a]))throw new Error("Please answer all 15 questions.");
    let earned=0,max=0;
    const sums=Object.fromEntries(Object.keys(dims).map(k=>[k,{value:0,max:0}]));
    questions.forEach((q,i)=>{const v=q.options[answers[i]].value;earned+=q.weight*v;max+=3*q.weight;sums[q.dimension].value+=q.weight*v;sums[q.dimension].max+=3*q.weight;});
    const score=Math.round(100*earned/max);
    const dimensions=Object.fromEntries(Object.entries(sums).map(([k,v])=>[k,Math.round(100*v.value/v.max)]));
    const secrecyCount=[0,1,5,11].filter(i=>answers[i]>=2).length;
    const displacementCount=[2,3,10].filter(i=>answers[i]>=2).length;
    const romanceCount=[6,7].filter(i=>answers[i]>=2).length;
    const impactCount=[8,9,13].filter(i=>answers[i]>=2).length;
    const explicitViolation=answers[12]===3;
    let profile;
    if((score>=77&&(explicitViolation||(secrecyCount>=2&&(displacementCount>=2||impactCount>=1))))||(score>=66&&explicitViolation&&secrecyCount>=2&&answers[13]>=2))profile="crossed";
    else if(score>=59&&(secrecyCount>=2||(romanceCount>=1&&displacementCount>=2)||(answers[12]>=2&&answers[13]>=2)))profile="potential";
    else if(score>=43)profile="blurring";
    else if(score>=22||answers[12]>=2||secrecyCount>=1)profile="clarify";
    else profile="clear";
    const evidence=[
      [0,"You reported regularly downplaying or hiding the friendship.",2],
      [1,"Messages or notifications are concealed to avoid them being seen.",2],
      [2,"Some deeply personal disclosures have shifted away from your partner.",2],
      [3,"This person has increasingly become your first source of emotional support.",2],
      [4,"You aren't sure that your boundaries and expectations are shared.",2],
      [5,"You may describe the conversations differently than they actually happen.",2],
      [6,"Flirting or romantic curiosity is affecting how you interact.",2],
      [7,"Comparing this person favorably with your partner is creating distance.",2],
      [8,"The connection is drawing time away from agreed plans.",2],
      [9,"This person's attention has become especially important to your mood.",2],
      [10,"There is an important emotional world that your partner knows little about.",2],
      [11,"It would be hard to describe the friendship openly.",2],
      [12,"An agreed boundary may have been approached or knowingly crossed.",2],
      [13,"Trust or communication in your relationship has been affected.",2],
      [14,"The same behavior would feel uncomfortable if the roles were reversed.",2]
    ].filter(([i,,minimum])=>answers[i]>=minimum).map(([i,msg])=>({text:msg,weight:questions[i].weight*(answers[i]+1)})).sort((a,b)=>b.weight-a.weight);
    const stabilizers=[
      [0,"You described the friendship openly rather than hiding its nature.",0],
      [1,"Your messages do not rely on disguised or deleted conversations.",0],
      [4,"You reported that the connection fits discussed boundaries.",0],
      [6,"You did not report romantic tension changing your behavior.",0],
      [12,"You did not report knowingly crossing an agreed boundary.",0],
      [13,"You did not notice the friendship harming trust or communication.",0]
    ].filter(([i,,maxVal])=>answers[i]<=maxVal).map(([,msg])=>msg);
    const distinctions=[];
    if(answers[2]>=2 && answers[0]<=1 && answers[1]<=1)distinctions.push("Deep personal conversations can be part of a healthy friendship; your answers do not point to strong concealment around them.");
    if(answers[6]>=2)distinctions.push("Romantic tension matters most in context of what you choose to do and what boundaries you have agreed on.");
    if(answers[4]>=2 && answers[12]<=1)distinctions.push("Unclear expectations are not the same as deliberately breaking a known agreement.");
    if(answers[1]>=2 || answers[5]>=2)distinctions.push("Deliberately disguising the nature of contact differs from keeping ordinary conversations private.");
    if(answers[12]===3)distinctions.push("You reported a known agreement being crossed; that deserves a direct discussion without guessing about anyone's private intentions.");
    if(answers[13]>=2)distinctions.push("You reported an effect on trust or closeness; the impact merits attention regardless of labels.");
    if(!distinctions.length)distinctions.push("A close friendship or private conversation alone is not evidence of emotional cheating. Agreements and behavior matter.");
    const steps=[];
    if(answers[4]>=1||answers[12]>=1)steps.push("Name which boundaries have actually been agreed on and which are assumptions. Discuss any differences clearly.");
    else steps.push("Revisit your mutual boundaries as friendships and circumstances change, without treating privacy as secrecy.");
    if(answers[0]>=2||answers[1]>=2||answers[5]>=2||answers[11]>=2)steps.push("Consider where you can be more honest about the nature of this connection without demanding access to private accounts.");
    else if(displacementCount>=1||romanceCount>=1)steps.push("Reflect on what emotional support or attraction this friendship involves, and how it fits your commitments.");
    else steps.push("Keep allowing healthy friendships while noticing whether your agreements and expectations remain mutual.");
    if(answers[13]>=2||answers[12]>=2)steps.push("Discuss one observable change that could rebuild trust, and check whether both people voluntarily agree.");
    else steps.push("Choose a calm moment to ask how each of you understands emotional boundaries and what feels respectful.");
    const starter=answers[12]===3?
      "I want to talk honestly about a boundary we agreed on and what happened. Can we listen to each other's perspective and decide what needs to change?":
      answers[4]>=2?
      "We haven't really defined our boundaries around close friendships. Could we talk about what feels comfortable to each of us without making assumptions?":
      (answers[0]>=2||answers[1]>=2||answers[5]>=2)?
      "I've noticed some uncertainty about how open we're being about this friendship. Could we talk about what transparency and privacy mean to both of us?":
      "I'd like us to check in about close friendships and emotional boundaries. What feels respectful and comfortable to you?";
    const dominant=Object.entries(dimensions).sort((a,b)=>b[1]-a[1])[0][0];
    const nuance={
      secrecy:"Transparency is the strongest concern in your answer pattern, separate from the existence of a close friendship.",
      closeness:"Emotional priority stands out here. Support from a friend is not automatically betrayal, but displacement deserves reflection.",
      agreements:"Understanding what was actually agreed on is especially important in your answers.",
      romance:"Romantic tension or comparison features prominently, though thoughts and actions are not the same.",
      impact:"The reported impact on time, emotional dependence, or trust merits a conversation regardless of labels."
    };
    return {score,dimensions,profile,title:profiles[profile].title,summary:profiles[profile].summary,
      personalized:nuance[dominant],signals:evidence.slice(0,4).map(e=>e.text),protective:stabilizers.slice(0,3),
      distinctions:distinctions.slice(0,3),steps:steps.slice(0,3),starter};
  }
  const api={questions,dimensions:dims,profiles,calculate};
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(typeof window!=="undefined")window.EmotionalCheatingQuiz=api;
})();
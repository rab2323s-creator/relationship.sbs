/* Original educational questionnaire. Not a clinical or validated psychometric scale. */
(function(root){
'use strict';
const dimensions=[
{id:'emotions',name:'Emotional independence',weight:.30,explain:'How memories and unexpected reminders affect your day, without treating ordinary sadness as failure.',action:'When a memory arrives, label it as a memory rather than a message about what you must do next. Notice whether you can return to the present.',best:'Memories do not usually take over your day.',low:'Emotional reminders still have a strong pull.'},
{id:'contact',name:'Contact & digital boundaries',weight:.25,explain:'Whether you make intentional choices about checking, reaching out, and waiting for signals.',action:'Choose one digital boundary that suits your circumstances: mute updates, stop searching, or keep necessary contact practical and clear.',best:'You can choose contact intentionally rather than chasing signals.',low:'Checking or interpreting contact may keep the connection emotionally active.'},
{id:'identity',name:'A life of your own',weight:.25,explain:'How much space your routines, plans, friends and sense of self have regained.',action:'Revive one small part of your life that belongs to you: a Saturday plan, a friendship, or an activity your ex never shared.',best:'Your identity and routines are becoming yours again.',low:'Parts of daily life still revolve around the relationship that ended.'},
{id:'future',name:'Openness to what comes next',weight:.20,explain:'Whether you can imagine a future that does not depend on getting this relationship back.',action:'Write two future plans you would genuinely want even if you never heard from your ex again; take one small step toward the nearer one.',best:'Your future can feel meaningful independently of this person.',low:'A hoped-for reunion may still shape your picture of the future.'}
];
const Q=(id,dimension,weight,text,options)=>({id,dimension,weight,text,options:options.map(([label,distress,insight])=>({label,distress,insight}))});
const questions=[
Q('photo','emotions',1.3,'A photo of your ex appears unexpectedly. What happens next?',[
 ['I feel something, but it passes and I carry on with my day.',0,'An unexpected reminder does not usually take over your day.'],
 ['I feel a wave of sadness, then settle again after a while.',1,'Reminders still sting, but you can usually come back to the present.'],
 ['I replay memories for hours and wonder whether I made a mistake.',3,'Unexpected memories can turn into prolonged second-guessing.'],
 ['I lose the rest of my day imagining how to get the relationship back.',4,'Reminders can quickly become a plan or longing to reconnect.']]),
Q('mutual-friends','contact',1.2,'A mutual friend mentions your ex. What do you most want to know?',[
 ['Whether they are okay; I do not need a detailed update.',0,'You can hear about them without needing to investigate.'],
 ['I am curious, but I can leave the conversation there.',1,'Curiosity appears without taking over your choices.'],
 ['Whether they are dating, missing me, or talking about me.',3,'Updates about their feelings and dating life still matter a great deal.'],
 ['Every detail; I look for clues that we could reunite.',4,'Information about your ex becomes evidence in a hoped-for reunion.']]),
Q('weekend','identity',1.1,'A free Saturday opens up—the kind you once spent together. What do you do?',[
 ['Make plans that genuinely appeal to me, even if I feel nostalgic.',0,'You are making room for an independent routine.'],
 ['Feel the absence, but find a decent way to use the day.',1,'You can build a day around yourself, even with some sadness.'],
 ['Keep the day empty because everything I try reminds me of us.',3,'The old relationship still shapes what feels possible in your free time.'],
 ['Wait for a message or plan as though the relationship might resume.',4,'Your free time remains organised around the possibility of renewed contact.']]),
Q('new-person','future',1.0,'Someone interesting asks you out. Which reaction comes closest?',[
 ['I can decide based on my own interest, with no pressure to date.',0,'You can evaluate new possibilities on their own terms.'],
 ['I feel a little unsure, but my ex is not the standard for everyone.',1,'There is room for uncertainty without constant comparison.'],
 ['I compare them with my ex before I know them.',3,'Your past relationship is still the template for possible new ones.'],
 ['I cannot imagine meeting anyone unless my ex has definitively rejected us.',4,'Your romantic future still depends on a decision from your ex.']]),
Q('night-thought','emotions',1.15,'When a quiet evening reminds you of the breakup, what is most true?',[
 ['I can acknowledge what hurt without losing sight of why we separated.',0,'You can hold the fuller story, not only the painful parts.'],
 ['I sometimes miss the good parts, and I know missing them is not a verdict.',1,'Nostalgia does not automatically become a reason to go back.'],
 ['I mostly replay the good moments and question the breakup.',3,'Selective memories can reopen the breakup decision.'],
 ['I feel sure I cannot be okay until they come back.',4,'Your wellbeing can feel tied to a reunion.']]),
Q('their-story','contact',1.15,'You see that your ex posted a new Story. What do you tend to do?',[
 ['I usually do not check, or I can scroll past without a second thought.',0,'Their online activity has little pull over your attention.'],
 ['I might look occasionally, but it rarely changes my mood.',1,'You have some curiosity without much emotional fallout.'],
 ['I check and then wonder for a long time who it was meant for.',3,'Viewing updates can lead to extended interpretation.'],
 ['I keep checking for signs they are missing me or seeing someone else.',4,'Their online activity has become a repeated source of hope or alarm.']]),
Q('alone','identity',1.0,'When you spend time alone now, which feeling is most familiar?',[
 ['I can enjoy my own company, even on difficult days.',0,'Solitude does not always mean something is missing.'],
 ['I am rebuilding routines that feel like mine.',1,'A new sense of self is taking shape.'],
 ['My routine feels suspended, as though my real life is on hold.',3,'The breakup still leaves your own daily life feeling paused.'],
 ['I feel like I lost the person I was, and cannot imagine finding them again.',4,'Losing the relationship has shaken your sense of identity.']]),
Q('future-plan','future',1.2,'Imagine your life one year from now. What picture comes first?',[
 ['Several possible versions of a good life, whether single or partnered.',0,'Your picture of a good future is not attached to one person.'],
 ['An uncertain future, but one I can shape myself.',1,'You can imagine forward movement while leaving questions open.'],
 ['Mostly the moment they realise what they lost.',3,'An imagined response from your ex still anchors the future.'],
 ['A reunion; without it, I struggle to picture a worthwhile year.',4,'The future feels dependent on restoring that relationship.']]),
Q('unsent','contact',1.35,'You feel the urge to send your ex a message. What usually guides the decision?',[
 ['I consider whether there is a practical reason or a clear shared purpose.',0,'Contact is usually a deliberate choice rather than an emotional reflex.'],
 ['I can pause and decide what I actually hope the message will achieve.',1,'You can question an impulse before acting.'],
 ['I draft messages repeatedly and look for the perfect way back in.',3,'A lot of energy goes into restarting the conversation.'],
 ['I send it because I feel unable to calm down without a reply.',4,'Reassurance from your ex can feel necessary to settle your emotions.']]),
Q('story-of-us','emotions',1.0,'When you tell someone why the relationship ended, how does your account sound?',[
 ['I can name what was good, what was not working, and what I learned.',0,'You can remember the relationship as a whole.'],
 ['It still hurts, but I am beginning to tell a fuller story.',1,'Your story is becoming more balanced over time.'],
 ['I keep proving that it should not have ended.',3,'You may still be arguing the breakup in your mind.'],
 ['I cannot speak about it without feeling that my whole future ended.',4,'The breakup may still define your picture of life ahead.']]),
Q('small-win','identity',1.15,'Something good happens at work or in your personal life. What do you notice?',[
 ['I enjoy it and know who I want to share it with now.',0,'New experiences are gaining a place in your own life.'],
 ['I wish I could tell them, but the happiness still belongs to me.',1,'Old sharing habits remain without taking away your joy.'],
 ['The first thought is that it does not count if they cannot see it.',3,'Good moments still feel incomplete without your ex as witness.'],
 ['I hope they hear about it so they will regret leaving.',4,'Your achievements can become attempts to affect your ex.']]),
Q('closure','future',1.25,'Suppose your ex never explains the breakup any further. What feels most likely?',[
 ['I can live with unanswered questions and keep making decisions for myself.',0,'You can move forward without a perfect final explanation.'],
 ['I would still be disappointed, but I could build my own closure.',1,'You are learning to tolerate uncertainty without waiting indefinitely.'],
 ['I would keep searching for a conversation that finally makes sense.',3,'Unanswered questions may keep you waiting for contact.'],
 ['I could not move on unless they gave me the answer I need.',4,'Your permission to move forward feels held by someone else.']])
];
const profiles=[
{min:82,key:'forward',title:'Your life is moving forward',description:'Your answers describe substantial room for your own routines, emotions and future. Moving on does not require forgetting, and an occasional difficult moment does not erase what you have rebuilt.',next:'Protect the routines and relationships that have helped you feel like yourself. Let new relationships begin from interest, not from pressure to prove you are healed.'},
{min:64,key:'rebuilding',title:'You are finding your footing again',description:'You have begun to loosen the grip of the past, but certain reminders or habits may still pull you back. Your progress looks real and unfinished at the same time; both can be true.',next:'Choose one repeating trigger to work with gently this week. Track what you do afterward, not whether you feel perfectly calm.'},
{min:42,key:'between',title:'Part of you is moving on; part is still waiting',description:'Your answers suggest mixed signals within your own recovery. You may be rebuilding parts of your life while still looking to your ex for information, reassurance, or a different ending.',next:'Instead of asking whether you are completely over them, notice where your day is still organised around their choices. Set one small boundary there.'},
{min:0,key:'holding',title:'The relationship still has a strong hold',description:'Your answers describe significant longing or difficulty finding stable ground outside the past relationship. This is a snapshot of how things feel now—not a prediction of how long healing will take.',next:'Start with support and steadiness rather than forcing yourself to date. One dependable routine and one trusted conversation can be more useful than chasing a final answer.'}
];
function calculate(answers){
 if(!Array.isArray(answers)||answers.length!==questions.length||answers.some((v,i)=>!Number.isInteger(v)||v<0||v>3))throw new Error('Please answer all twelve questions.');
 const dimensionsOut=dimensions.map(d=>{
  const items=questions.flatMap((q,i)=>q.dimension===d.id?[{question:q,choice:q.options[answers[i]],answer:answers[i],index:i}]:[]);
  const max=items.reduce((s,v)=>s+v.question.weight*4,0);
  const used=items.reduce((s,v)=>s+v.question.weight*v.choice.distress,0);
  return {...d,items,score:Math.max(0,Math.min(100,Math.round(100*(1-used/max))))};
 });
 const score=Math.round(dimensionsOut.reduce((s,d)=>s+d.score*d.weight,0));
 const profile=profiles.find(p=>score>=p.min)||profiles[profiles.length-1];
 const sorted=dimensionsOut.slice().sort((a,b)=>a.score-b.score||dimensions.findIndex(d=>d.id===a.id)-dimensions.findIndex(d=>d.id===b.id));
 const best=sorted.slice().reverse();
 const challenging=sorted.flatMap(d=>d.items.map(x=>({...x,dimensionName:d.name}))).filter(x=>x.choice.distress>=2).sort((a,b)=>(b.choice.distress*b.question.weight)-(a.choice.distress*a.question.weight)||a.index-b.index).slice(0,3);
 const steady=best.flatMap(d=>d.items.map(x=>({...x,dimensionName:d.name}))).filter(x=>x.choice.distress<=1).sort((a,b)=>a.choice.distress-b.choice.distress||b.question.weight-a.question.weight||a.index-b.index).slice(0,2);
 const recommendations=[sorted[0].action,sorted[1].action,profile.next].filter((s,i,a)=>a.indexOf(s)===i);
 return {score,profile,dimensions:dimensionsOut,lowest:sorted[0],strongest:best[0],challenging,steady,recommendations};
}
root.OverMyExQuizData=Object.freeze({dimensions,questions,profiles,calculate,method:'Educational progress index = weighted average of four dimension scores; each dimension is 100 × (1 − sum(answer distress × question weight)/sum(4 × question weight)). Higher means more independence within this self-report. Not clinically validated or normed.'});
})(typeof window==='undefined'?globalThis:window);
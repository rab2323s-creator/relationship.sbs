/* Original 18-scenario educational self-reflection. No diagnostic or predictive claims. */
(function(root,factory){'use strict';const model=factory();if(typeof module==='object'&&module.exports)module.exports=model;if(root)root.RelationshipReadinessModel=model;})(typeof window!=='undefined'?window:typeof globalThis!=='undefined'?globalThis:null,function(){'use strict';
const dimensions=[
{id:'motivation',name:'Your own desire vs outside pressure',weight:.22,description:'Whether dating reflects your own interest instead of a deadline, comparison or need for approval.',action:'Write what you genuinely want from connection and one reason you would choose to remain single for now. Give both options equal legitimacy.'},
{id:'capacity',name:'Time, attention & emotional capacity',weight:.20,description:'Whether there is a workable place for another person alongside the rest of your life.',action:'Look at your actual week, not your ideal week. Identify time you would willingly offer and a commitment you should not give up.'},
{id:'boundaries',name:'Independence & healthy boundaries',weight:.22,description:'Whether you can maintain your own needs, hear another person say no and keep independence.',action:'Choose a simple boundary sentence you can say kindly and practice respecting a different answer from someone else.'},
{id:'direction',name:'Relationship goals & clarity',weight:.17,description:'How honestly you can describe your intentions while allowing them to evolve.',action:'Complete this sentence without tailoring it to an imagined date: “Right now I am exploring ... and I am not promising ...”.'},
{id:'openness',name:'Openness to a new person',weight:.19,description:'Whether curiosity about another individual can exist without constant comparisons or an imagined rescue.',action:'Notice one way you could learn who a new person actually is before deciding whether they fit an old story.'}
];
const Q=(id,dimension,prompt,options)=>({id,dimension,prompt,options:options.map(([text,score,insight])=>({text,score,insight}))});
const questions=[
Q('wedding-feed','motivation','Your feed fills with engagement photos. What happens to your interest in dating?',[
['I feel behind and would date almost anyone to catch up.',0,'Social comparison is doing a lot of the motivating.'],
['I feel pressure, then remember that a relationship is not a deadline.',2,'You notice comparison without necessarily handing it the decision.'],
['I suddenly want someone mostly to stop the questions.',1,'Approval may be louder than your own curiosity today.'],
['I can feel happy for them and check what I want for myself.',3,'Your own preference can stay separate from other people’s milestones.']]),
Q('unexpected-invitation','capacity','Someone kind asks you to meet next weekend, but your calendar is packed. What do you do?',[
['Cancel important plans because I worry I will lose the chance.',1,'You may feel pressured to make room before you have real capacity.'],
['Offer a realistic time next week and see if it works for both of us.',3,'You can make space without erasing your own commitments.'],
['Say yes, then hope I have enough energy when the day arrives.',0,'Agreeing now may leave little room for real follow-through.'],
['Admit that this weekend is full, though I am unsure what to offer next.',2,'You can name a limit and are still learning what capacity looks like.']]),
Q('late-night-text','boundaries','A new match wants to text late every night. You need sleep. Your natural response?',[
['Explain I enjoy talking but will reply tomorrow.',3,'A warm boundary can protect both connection and sleep.'],
['Stay awake because they might lose interest if I stop.',0,'Fear of losing approval can override a basic need.'],
['Sometimes reply late, then tell them I need a different rhythm.',2,'You are beginning to shape contact around your needs.'],
['Go silent for days instead of saying what works for me.',1,'Avoiding a conversation may replace a useful boundary.']]),
Q('the-label','direction','After two good dates, someone asks what you are looking for. You think:',[
['I can describe what I am exploring without promising a future.',3,'You can speak plainly while leaving room for discovery.'],
['I will say whatever they want so they keep seeing me.',0,'Matching their answer could hide your actual intentions.'],
['I know a few things I want, though I need time on the rest.',2,'You have useful direction without a fixed script.'],
['I hope they never ask, because I do not want to consider it.',1,'Avoiding the question may leave both people guessing.']]),
Q('familiar-smile','openness','A new person's smile reminds you of someone from your past. What do you notice?',[
['I start measuring everything against the old relationship.',0,'The past may still be setting the standard for someone new.'],
['I notice it and stay curious about who this person actually is.',3,'You can recognize a memory without letting it define them.'],
['I catch myself comparing, then try to return to the present.',2,'You are developing room for an individual first impression.'],
['I mainly hope this new person will make me forget my ex.',1,'Dating may be carrying a wish to escape an old feeling.']]),
Q('friend-expects','motivation','A friend says, “You need to get out there already.” Which thought fits best?',[
['Maybe they are right, even though I do not want to date.',0,'Someone else may be setting the timetable.'],
['I consider the advice and decide the pace for myself.',3,'You can hear encouragement without treating it as an order.'],
['I feel guilty, but I can still choose to wait.',2,'Your own preference has some protection against pressure.'],
['I download an app so they will stop worrying about me.',1,'Appeasing someone may be replacing a genuine choice.']]),
Q('quiet-week','capacity','You are drained after a stressful week. A person you have met twice suggests a long evening out.',[
['I make an honest shorter suggestion or ask for another day.',3,'You can protect energy while showing real interest.'],
['I force myself to go, then resent them for needing time.',0,'Your capacity may be getting overpromised.'],
['I want to reschedule but feel embarrassed saying so.',2,'You notice a limit but are still practicing naming it.'],
['I disappear rather than explain I need a quiet night.',1,'A little honesty might prevent unnecessary withdrawal.']]),
Q('no-thanks','boundaries','You suggest a date idea and the other person says they would rather do something else.',[
['I feel rejected and push them to agree with my plan.',0,'A different preference can feel like a threat to the connection.'],
['I feel a sting, but can ask what they would enjoy.',2,'You can recover from disappointment and stay curious.'],
['I change the plan and secretly resent them afterward.',1,'Agreeing outwardly may hide a boundary or disappointment.'],
['I ask what works for both of us and make a new plan.',3,'A respectful no can become collaboration.']]),
Q('first-date-values','direction','During an early date, you learn the other person wants a different kind of relationship.',[
['I would rather ignore it and hope they change.',0,'Avoiding a known difference can create confusion later.'],
['I can enjoy the date while being honest about the mismatch.',3,'Clarity does not require judging the other person.'],
['I would ask a few questions before deciding whether it matters.',2,'You can investigate the difference without forcing a quick verdict.'],
['I change what I say I want to match their answer.',1,'Your intentions may be getting lost in the wish to connect.']]),
Q('new-habits','openness','A date has a hobby or communication style unlike your last partner. Your first reaction?',[
['I am curious, even if it takes time to find common ground.',3,'Different does not automatically mean wrong.'],
['It feels unfamiliar, but I can give it a fair chance.',2,'You can move beyond some old expectations.'],
['I assume the difference means we will never work.',0,'Past templates may be narrowing who you can get to know.'],
['I pretend I like it to make sure they choose me.',1,'You may be performing compatibility rather than discovering it.']]),
Q('alone-saturday','motivation','You unexpectedly have a completely free Saturday. Which feeling is closest?',[
['I enjoy having choices and would date only if genuinely interested.',3,'Connection can be an invitation rather than an escape.'],
['Being single feels like an emergency I need to solve today.',0,'Urgency may be crowding out genuine desire.'],
['I feel lonely at times, but I do not need to act on every wave.',2,'You can recognize loneliness without handing it the steering wheel.'],
['I look for a date mainly because being alone embarrasses me.',1,'Other people’s judgments may be guiding your plans.']]),
Q('care-routine','capacity','Imagine dating someone you like for a month. What happens to your existing responsibilities?',[
['I would need to drop most of them so they feel important.',0,'New connection may be displacing essentials too quickly.'],
['I could usually make a little regular time without neglecting essentials.',3,'Your week has some sustainable room for connection.'],
['My life is tight, but I could discuss what time is realistic.',2,'Honest negotiation may help you test your actual bandwidth.'],
['I would promise lots of time and work out the consequences later.',1,'Good intentions might outpace the time available.']]),
Q('close-friend','boundaries','A new person dislikes that you spend time with a close, respectful friend.',[
['I would stop seeing the friend to avoid an argument.',0,'Isolation can be mistaken for proof of commitment.'],
['I would listen, clarify concerns and keep appropriate friendships.',3,'You can consider feelings without giving up your autonomy.'],
['I would feel torn but try to explain why the friendship matters.',2,'You are recognizing a need for personal boundaries.'],
['I would hide my friendship to keep everyone happy.',1,'Secrecy can replace a necessary conversation about trust.']]),
Q('nonnegotiable','direction','A potential partner asks about an important future goal that you are unsure about.',[
['I can say I am unsure and explain what I am exploring.',3,'Honest uncertainty is still useful information.'],
['I invent a confident answer so I seem easy to date.',0,'Performance may hide a meaningful decision.'],
['I identify what is clear and what still needs thought.',2,'You can offer a partial but truthful answer.'],
['I hope we become attached before discussing it.',1,'Postponing a major difference may build avoidable pressure.']]),
Q('ordinary-disagreement','boundaries','After a pleasant first date, the other person makes a small assumption about you that feels wrong.',[
['I say gently what is actually true about me.',3,'You can correct a misunderstanding without needing conflict.'],
['I keep quiet because I cannot risk seeming difficult.',0,'Self-silencing can make connection feel conditional.'],
['I correct it later when I feel a bit more comfortable.',2,'You are working toward clearer self-expression.'],
['I let the assumption stand and grow irritated.',1,'Avoidance can build quiet resentment.']]),
Q('ex-memory','openness','Someone from the past crosses your mind while you prepare for a first date.',[
['I notice the memory and return to whether I want to meet this person.',3,'A memory does not have to decide your present choices.'],
['I wonder whether I am betraying my past by meeting someone.',1,'Old loyalties or grief may still shape how you approach dating.'],
['I compare the new person's entire future to my past.',0,'The first meeting may be carrying an impossible comparison.'],
['I feel mixed but can allow this date to be its own experience.',2,'You can hold uncertainty while exploring a fresh connection.']]),
Q('independent-life','capacity','Someone you like becomes available on the one evening you have protected for rest.',[
['I can keep my rest and propose another time.',3,'You can be interested without offering every available moment.'],
['I abandon rest automatically and hope I will recover later.',0,'The relationship may consume capacity before it has begun.'],
['I feel guilty saying no but I usually can.',2,'Boundaries are possible even when they feel awkward.'],
['I agree, then cancel at the last minute from exhaustion.',1,'Your yes may need more consideration upfront.']]),
Q('first-meeting','openness','You meet someone whose story is different from what you expected. What would you most like to find out?',[
['Whether they can rescue me from feeling lonely.',0,'The meeting may have become a solution to loneliness rather than mutual discovery.'],
['Whether they are a real person I enjoy getting to know.',3,'Curiosity gives each person room to be themselves.'],
['Whether we share some values and can talk comfortably.',2,'You can look for mutual fit without forcing a future.'],
['Whether they match every detail of my old ideal partner.',1,'An imagined template may be limiting openness.']])
];
const profiles=[
{min:82,key:'intentional',title:'The Intentional Explorer',description:'Your answers show substantial room for connection while keeping your own choices, time and boundaries intact. That does not obligate you to date now; it means you may be able to explore from curiosity rather than urgency.',next:'Choose a low-pressure first step that interests you, and keep checking whether dating still feels like your choice.'},
{min:67,key:'open',title:'Open, With Some Guardrails',description:'You sound interested in connecting, with at least one area that may need attention. There is no requirement to be perfectly organized or healed before you meet someone, but a few thoughtful boundaries may protect both people.',next:'Name your lowest-scoring area and make one small adjustment before promising more time or commitment.'},
{min:51,key:'sorting',title:'Curious, Still Sorting Priorities',description:'Your answers describe a genuine mix: some openness to dating alongside questions about motivation, capacity or direction. A useful next step may be honest exploration rather than a decision that you are ready or unready.',next:'Define what a comfortable first month of dating would look like, including what you are not promising.'},
{min:34,key:'rebuilding',title:'Making Room for Your Own Life',description:'Several answers suggest that dating might currently compete with important needs or unfinished decisions. That is not a judgment about your worthiness of love. Time, boundaries and clarity can develop without a deadline.',next:'Protect one routine, one boundary and one meaningful connection in your life; revisit dating if your own interest grows.'},
{min:0,key:'ownpace',title:'Choosing Your Own Timeline',description:'Your responses suggest external pressure, limited capacity or unresolved needs may currently have more influence than genuine curiosity. Choosing not to date is a valid adult decision, not a failure on a test.',next:'Give yourself permission to pause. Identify whose expectations feel loudest and what you would want if nobody were watching.'}
];
function calculate(answers){
if(!Array.isArray(answers)||answers.length!==questions.length||answers.some((v,i)=>!Number.isInteger(v)||v<0||v>=questions[i].options.length))throw new Error('All 18 questions must be answered with a valid choice.');
const areas=dimensions.map(d=>{
const selected=questions.flatMap((q,i)=>q.dimension===d.id?[{question:q,choice:q.options[answers[i]],index:i}]:[]);
const raw=selected.reduce((sum,item)=>sum+item.choice.score,0);
const score=Math.round(100*raw/(3*selected.length));
return {...d,score,items:selected};
});
const score=Math.round(areas.reduce((sum,d)=>sum+d.weight*d.score,0));
const profile=profiles.find(p=>score>=p.min);
const ordered=areas.slice().sort((a,b)=>a.score-b.score||dimensions.findIndex(x=>x.id===a.id)-dimensions.findIndex(x=>x.id===b.id));
const observations=areas.flatMap(d=>d.items.map(x=>({...x,dimensionName:d.name})));
const concern=observations.filter(x=>x.choice.score<=1).sort((a,b)=>a.choice.score-b.choice.score||a.index-b.index).slice(0,3);
const strengths=observations.filter(x=>x.choice.score>=2).sort((a,b)=>b.choice.score-a.choice.score||a.index-b.index).slice(0,2);
const prompts=[ordered[0].action,ordered[1].action,profile.next].filter((v,i,a)=>a.indexOf(v)===i);
return {score,profile,areas,lowest:ordered[0],strongest:ordered[ordered.length-1],concern,strengths,prompts,agencyNote:areas.find(x=>x.id==='motivation').score<=33,method:'Five equally normalized area scores from 0–3 points per answer; overall score = 22% motivation + 20% capacity + 22% boundaries + 17% direction + 19% openness. It is a reflection index, not a readiness probability or validated psychometric scale.'};
}
return Object.freeze({dimensions,questions,profiles,calculate,version:'1.0'});
});
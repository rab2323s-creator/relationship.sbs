/* Original 16-scenario educational crush quiz. Not a validated psychological instrument. */
(function(root,factory){
"use strict";
const model=factory();
if(typeof module==="object"&&module.exports)module.exports=model;
if(root)root.CrushFeelingsModel=model;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
"use strict";
const dimensions=[
{id:"closeness",name:"Desire for closeness",weight:.20,description:"Whether you want one-to-one time with this person beyond an ordinary friendly routine.",tip:"Think about the kind of time you would want together if there were no pressure to make it romantic."},
{id:"curiosity",name:"Interest in the actual person",weight:.20,description:"Whether your interest is grounded in who they are, not just an imagined version of them.",tip:"Notice one real thing you know about them and one thing you would like to learn without filling in the blanks."},
{id:"romance",name:"Romantic possibility",weight:.25,description:"How you react to the idea of a date, mutual attraction or a relationship rather than just more friendship.",tip:"Imagine a low-pressure date. Does the idea feel appealing, uncomfortable, uncertain or simply irrelevant?"},
{id:"attraction",name:"The kind of attraction you feel",weight:.20,description:"Distinguishing affectionate friendship and admiration from a wish for romantic closeness.",tip:"You do not need physical attraction to justify romantic feelings, nor do you need romantic feelings to value someone deeply."},
{id:"focus",name:"The person vs the attention",weight:.15,description:"Whether the feeling centers on this particular person or mainly on being chosen or admired.",tip:"Ask whether you would still be curious about them if you knew nobody else would notice your connection."}
];
const Q=(id,dimension,prompt,options)=>({id,dimension,prompt,options:options.map(([text,score,insight])=>({text,score,insight}))});
const questions=[
Q("free-afternoon","closeness","You unexpectedly have a free afternoon. How does the idea of spending it one-on-one with them feel?",[
["Lovely as a familiar hangout, without any romantic expectation.",0,"You picture comfortable friendship more than romantic possibility."],
["I would like to see them, but I cannot tell what kind of closeness I want.",1,"You are curious about the connection without a clear romantic pull."],
["I hope we get to talk alone; it feels a little different from seeing other friends.",2,"One-to-one time may carry a special emotional charge."],
["I would look forward to it like a possible date, even if we never called it one.",3,"Private time has a distinctly romantic appeal in your imagination."]
]),
Q("small-detail","curiosity","They mention a small, unexpected detail about their life. What stays with you afterward?",[
["I enjoy hearing it, as I would with another person I like.",0,"Your interest resembles everyday warmth and attention."],
["I notice the detail but cannot tell why I keep thinking about it.",1,"Something about this person has caught your attention."],
["I want to ask more because I feel increasingly interested in who they are.",2,"Your curiosity is beginning to feel personally significant."],
["I keep wanting to learn the ordinary and surprising sides of them, not just impress them.",3,"You show sustained interest in the individual behind the first impression."]
]),
Q("date-invitation","romance","Imagine they asked, “Would you like to go on a date with me?” What feels most true?",[
["I would kindly say I value the friendship but do not want a date.",0,"A romantic invitation does not currently feel appealing."],
["I would be surprised and need time to understand my own feelings.",1,"Romantic possibility feels uncertain rather than clearly wanted."],
["I would be nervous, but I would seriously consider saying yes.",2,"A date could be welcome even with some hesitation."],
["I would feel excited because I have quietly hoped they might ask.",3,"A mutual romantic invitation is something you actively want."]
]),
Q("room-entrance","attraction","They walk into a room where you are already comfortable. What do you notice?",[
["I am glad to see someone whose company I enjoy, nothing more.",0,"Warmth on seeing them can be entirely platonic."],
["I notice them immediately, but that could be familiarity or admiration.",1,"Attention alone cannot tell you whether this is a crush."],
["There is a little flutter or heightened awareness that feels unusual for me.",2,"Your response may include emerging attraction."],
["I feel a specific spark and hope we find a moment together.",3,"You describe a personal pull beyond ordinary friendliness."]
]),
Q("no-audience","focus","Suppose nobody could ever know whether this person liked you back. Would you still want to know them?",[
["I mostly enjoy the idea that someone might be interested in me.",0,"The validation may matter more than this individual."],
["Maybe; I am still separating curiosity about them from wanting to be noticed.",1,"Your motivation is mixed or still developing."],
["Yes, I think I would want more conversations even without a public story.",2,"Your attention is partly centered on the real person."],
["Definitely. Even without attention or approval, I want to understand and spend time with them.",3,"Your interest appears strongly person-centered."]
]),
Q("friend-group","closeness","Your group makes plans. You learn they will not be there. How do you react?",[
["I will miss a nice friend, but the plan still sounds the same to me.",0,"Their presence is welcome without special romantic significance."],
["I am a little disappointed, and I am not sure what that means.",1,"Your response may reflect friendship or a newer attraction."],
["I notice I had been hoping for a conversation specifically with them.",2,"Their individual presence carries additional meaning."],
["I feel I had been quietly looking forward to seeing them most of all.",3,"You anticipate this person with particular emotional energy."]
]),
Q("real-flaw","curiosity","You discover something ordinary about them that does not match your first impression. What happens?",[
["It barely changes anything; I was not imagining us romantically.",0,"The connection remains friendly without a larger imagined future."],
["I cannot tell if I liked them or just the version I invented.",1,"Your interest may still depend on an incomplete impression."],
["I am still interested and want to understand their perspective.",2,"You can move beyond a first impression and stay curious."],
["It makes them feel more real, and I still want to know them closely.",3,"You want a fuller person rather than an idealized image."]
]),
Q("romantic-scene","romance","You picture walking together in the evening after everyone else has gone home. Which scene fits?",[
["An easy conversation with a friend, without hoping for more.",0,"The closeness you imagine is platonic."],
["The scene feels tender but I cannot decide whether it is romantic.",1,"Emotional warmth may be present without a defined direction."],
["I sometimes imagine the moment turning into a date.",2,"You are beginning to consider a romantic possibility."],
["I imagine us both acknowledging that we like each other romantically.",3,"Your future-facing thoughts contain a clear romantic wish."]
]),
Q("different-affection","attraction","What kind of affection feels most natural when you think about them?",[
["The care I feel for a friend or someone I admire.",0,"Affection can be strong without being romantic."],
["A closeness I cannot easily place in a friendship or romance category.",1,"You may still be discovering the quality of your feelings."],
["A wish for affectionate one-to-one moments that might be romantic.",2,"Your attraction may be taking on a romantic quality."],
["I want romantic tenderness or a mutual date, even if physical touch is not important to me.",3,"You recognize a romantic kind of closeness without making physical attraction mandatory."]
]),
Q("new-person","focus","If someone else gave you the same amount of attention tomorrow, how would your feelings change?",[
["I might feel just as excited; being wanted is the main thrill.",0,"Attention may be the stronger driver right now."],
["I honestly cannot tell if it is them or the attention I enjoy.",1,"Your interest is still ambiguous."],
["The attention would be nice, but I would still think about this person.",2,"Your curiosity has become somewhat specific to them."],
["It would not replace my interest in this person's unique qualities.",3,"Your feelings appear linked to this individual rather than any admirer."]
]),
Q("little-celebration","closeness","Something wonderful happens to you. How do you imagine telling them?",[
["Just as I would tell other friends who care about me.",0,"Wanting to share good news can be purely friendly."],
["I want to share it but have not figured out why they feel special.",1,"There is personal significance without a clear label."],
["I especially hope for a one-to-one moment to celebrate with them.",2,"You are seeking a particular closeness with this person."],
["I imagine the celebration as a small, romantic moment together.",3,"Your hopes are beginning to resemble dating."]
]),
Q("ask-deeper","curiosity","They tell you about a difficult choice in their life. What do you want to understand?",[
["I care and would offer support like I would to a good friend.",0,"Caring about their challenges is not proof of a crush."],
["I want to help, though some of my interest may come from feeling needed.",1,"Wanting a meaningful role can mingle with other feelings."],
["I want to know what matters to them, beyond what they show everyone.",2,"Your curiosity is becoming deeper and more individual."],
["I want to know their values and fears because a closer romantic connection feels possible.",3,"Your interest in their inner life includes a romantic horizon."]
]),
Q("mutual-flirting","romance","During a conversation, you wonder if the two of you are flirting. What do you secretly hope?",[
["That we are just having a warm conversation, without romantic pressure.",0,"You would prefer to keep the moment platonic."],
["I am unsure and want to figure it out slowly.",1,"You are open to clarity without a definite romantic wish."],
["I hope there might be something more, but I am still exploring.",2,"Romantic possibility feels appealing and new."],
["I hope the flirting is mutual because I want to go on a date with them.",3,"You have a distinct wish for romantic reciprocity."]
]),
Q("social-label","attraction","If a close friend asked, “Do you like them as more than a friend?” what would feel honest?",[
["No, I care about them in a nonromantic way.",0,"You can name a platonic feeling without diminishing its value."],
["I cannot honestly answer that yet.",1,"An unresolved or changing feeling is a real answer."],
["Possibly; my interest has started to feel different.",2,"You sense a possible change toward romance."],
["Yes, I want more than friendship, even if I have not said it.",3,"You can recognize your own romantic attraction."]
]),
Q("only-two","romance","Imagine you could choose between a friendly group evening and a genuine date with them.",[
["I would choose the group evening; romance is not what I want.",0,"You are drawn more to friendship than dating."],
["I would hesitate because I have not decided what I feel.",1,"A romantic next step remains unclear."],
["I would lean toward a date to discover whether the spark is real.",2,"You are willing to explore a romantic direction."],
["I would choose the date because that is the connection I actually want.",3,"Romantic time together has a strong appeal."]
]),
Q("honest-intention","focus","Imagine they clearly say they only want friendship. What do you learn about your own feelings?",[
["I would feel fine staying friends; I did not want romance.",0,"Friendship appears to be what you valued most."],
["I would be disappointed, though I am unsure whether it is about them or rejection.",1,"Your feelings may mix personal interest and the wish to feel chosen."],
["I would feel a little sad about a missed romantic possibility, while respecting their answer.",2,"You may have genuine person-specific romantic curiosity."],
["I would feel a real romantic disappointment, respect their no, and decide what friendship means for me.",3,"Your romantic interest is identifiable without implying entitlement to a response."]
])
];
const profiles={
friendship:{key:"friendship",title:"Friendship or Admiration",summary:"Your choices lean toward appreciating this person without a strong wish to date them. You can value someone deeply, notice their qualities and want closeness without it becoming a crush.",step:"Enjoy the connection as it is. If curiosity changes, you can revisit the question without forcing a label."},
curiosity:{key:"curiosity",title:"Emotional Curiosity",summary:"Something about this person seems to hold your attention, but a romantic wish is not yet clear. That could develop into attraction or remain a meaningful friendship.",step:"Notice whether you want to spend time with them as a person, and whether a real date actually sounds appealing."},
emerging:{key:"emerging",title:"Emerging Romantic Attraction",summary:"Your answers suggest a growing wish for a different kind of closeness. You may be considering romance while still learning whether the connection is about this real person.",step:"Allow gentle, respectful discovery. Look for mutual interest through conversation and choice—not detective work."},
clear:{key:"clear",title:"A Clear Romantic Crush",summary:"Your responses consistently describe a person-specific romantic pull: you want time together, imagine dating and are interested in who they are. That is about your feelings, not a guarantee of reciprocity.",step:"If appropriate and safe, consider a simple, low-pressure invitation. Make room for yes, no or uncertainty."},
mixed:{key:"mixed",title:"Mixed or Unresolved Feelings",summary:"Your answers point in different directions. You might want romantic closeness in some situations while valuing friendship, enjoying attention or feeling unsure in others.",step:"Do not rush to decide. Separate three questions: Do I like this person? Do I want a date? Would I still feel curious without being noticed?"}
};
function calculate(answers){
if(!Array.isArray(answers)||answers.length!==questions.length||answers.some((v,i)=>!Number.isInteger(v)||v<0||v>=questions[i].options.length))throw new Error("Please answer all 16 questions.");
const areas=dimensions.map(d=>{
const items=questions.flatMap((q,index)=>q.dimension===d.id?[{index,question:q,choice:q.options[answers[index]]}]:[]);
const score=Math.round(100*items.reduce((s,x)=>s+x.choice.score,0)/(items.length*3));
return {...d,score,items};
});
const score=Math.round(areas.reduce((s,d)=>s+d.score*d.weight,0));
const byId=id=>areas.find(d=>d.id===id).score;
const range=Math.max(...areas.map(d=>d.score))-Math.min(...areas.map(d=>d.score));
const split=score>=20&&score<81&&((range>=66&&byId("romance")>=67)||(byId("romance")>=67&&byId("focus")<=33));
let key;
if(split)key="mixed";
else if(score>=73&&byId("romance")>=50)key="clear";
else if(score>=53)key="emerging";
else if(score>=33)key="curiosity";
else key="friendship";
const profile=profiles[key];
const sorted=areas.slice().sort((a,b)=>a.score-b.score||dimensions.findIndex(x=>x.id===a.id)-dimensions.findIndex(x=>x.id===b.id));
const all=areas.flatMap(d=>d.items.map(x=>({...x,dimensionName:d.name})));
const evidence=all.filter(x=>x.choice.score>=2).sort((a,b)=>b.choice.score-a.choice.score||a.index-b.index).slice(0,2);
const uncertainty=all.filter(x=>x.choice.score<=1).sort((a,b)=>a.choice.score-b.choice.score||a.index-b.index).slice(0,2);
return {score,profile,areas,sorted,strongest:sorted[sorted.length-1],lowest:sorted[0],evidence,uncertainty,actions:[sorted[0].tip,sorted[1].tip,profile.step],mixedSignal:split,method:"Original editorial reflection score: each answer is scored 0–3; five dimensions are normalized from 0 to 100 and weighted 20% closeness, 20% curiosity, 25% romantic possibility, 20% type of attraction, and 15% person vs attention. Mixed profiles are prioritized when dimensions conflict sharply. No clinical validation, normed cutoffs or predictive claims."};
}
return Object.freeze({dimensions,questions,profiles,calculate});
});
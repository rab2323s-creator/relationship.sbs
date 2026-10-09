/* Boundaries Test — original 15-scenario educational assessment.
   Scoring convention: each answer awards 0–4 points on its primary
   and secondary dimensions; primary contribution is weighted 2x.
   Higher always means more context-sensitive boundary skill.
   No clinical calibration or normative population comparison. */
(function () {
"use strict";
const D = {
  voice: {label:"Saying No & Speaking Up", short:"Saying no", good:"You can name a need without turning it into a courtroom defense.", grow:"Practice giving one direct answer before offering explanations.", action:"Try: “I can't take that on, but I can talk tomorrow.”"},
  guilt: {label:"Guilt & People-Pleasing", short:"Guilt resilience", good:"Someone else's disappointment doesn't automatically become your responsibility.", grow:"Notice the urge to earn back warmth after saying no.", action:"Try: “I care that you're disappointed, and my answer is still no.”"},
  space: {label:"Privacy & Personal Space", short:"Privacy", good:"You can hold privacy and autonomy without treating closeness as a debt.", grow:"Choose one area—messages, alone time, or personal information—that deserves an explicit agreement.", action:"Try: “I want closeness, and I also need that part to remain private.”"},
  follow: {label:"Follow-Through & Repair", short:"Follow-through", good:"Your words and later actions tend to match, without relying on punishment.", grow:"Pick one limit you can realistically maintain, and plan what you will do if it is crossed again.", action:"Try: “If we're shouting, I'm pausing and returning when we can talk calmly.”"},
  flex: {label:"Flexible Closeness", short:"Flexible closeness", good:"You can protect your limits while staying open to mutual, respectful negotiation.", grow:"Check whether a safe, negotiated alternative could meet both needs without erasing yours.", action:"Try: “Not tonight. Could we make time together on Saturday?”"}
};
const q=(id,primary,secondary,text,options)=>({id,primary,secondary,text,options:options.map(([label,a,b,tag])=>({label,points:[a,b],tag}))});
const questions=[
q(1,"voice","flex","You finally have a free evening. Someone close to you asks for a favor that would consume all of it. You genuinely cannot do both.",[
["I say yes and hope I'll somehow make up the lost time.",0,1,"overextend"],
["I explain what I can and can't offer, and suggest a time that actually works.",4,4,"offer-alternative"],
["I decline, but spend an hour defending why I'm allowed to rest.",2,2,"overexplain"],
["I refuse and avoid them for days so they won't ask again.",2,0,"withdraw"]
]),
q(2,"guilt","follow","You say no politely. The other person sounds disappointed and becomes quiet for a while.",[
["I immediately reverse my decision because their disappointment feels unbearable.",0,0,"reverse-no"],
["I check in once, keep the boundary, and allow them to have their feelings.",4,4,"allow-feelings"],
["I keep my answer, but apologize repeatedly until they reassure me.",1,2,"apology-loop"],
["I accuse them of trying to control me without checking what the silence means.",2,1,"assume-intent"]
]),
q(3,"space","voice","A partner says, “If we have nothing to hide, why can't we read each other's private messages?”",[
["I give full access because refusing would look suspicious.",0,0,"trade-privacy"],
["I explain that privacy is compatible with trust, and ask what concern needs discussion.",4,4,"name-privacy"],
["I say no, but invent excuses rather than naming the principle.",3,1,"avoid-explain"],
["I demand access to their phone too, so the rule feels fair.",1,1,"reciprocal-surveillance"]
]),
q(4,"follow","guilt","You agreed to stop a conversation when it turns insulting. The same pattern appears again.",[
["I calmly pause the conversation and follow through on returning when it's respectful.",4,4,"follow-through"],
["I remind them of the boundary, but keep debating for another hour.",1,2,"debate-loop"],
["I pretend I'm fine to prevent another argument.",0,0,"self-silence"],
["I leave without explanation and refuse to speak about the issue again.",2,2,"permanent-shutdown"]
]),
q(5,"flex","space","Your partner wants more time together, but you also need regular time alone. Both needs are real.",[
["I suggest a predictable rhythm that protects both togetherness and alone time.",4,4,"negotiate"],
["I agree to all their plans because alone time sounds selfish.",1,0,"give-up-space"],
["I protect my time but refuse any discussion about how they feel.",1,3,"rigid-no"],
["I leave the schedule vague and repeatedly cancel when overwhelmed.",1,1,"avoid-plan"]
]),
q(6,"voice","follow","A friend asks you to cover a responsibility you have already declined twice this month.",[
["I give a brief, clear answer and repeat it if they push.",4,4,"repeat-no"],
["I agree this time so they won't think I'm difficult.",0,0,"resentful-yes"],
["I say “maybe” while knowing I won't do it.",1,1,"soft-no"],
["I list every past mistake they've made to justify my refusal.",2,1,"scorekeeping"]
]),
q(7,"guilt","space","Your partner is upset, and you start to feel that fixing their mood is now your job.",[
["I listen and offer support without promising to solve every feeling.",4,4,"care-without-rescue"],
["I cancel my plans until I can get them smiling again.",0,0,"mood-manager"],
["I ignore their feelings because emotional needs aren't my responsibility.",2,1,"emotional-wall"],
["I help at first, then feel resentful because I didn't name my limit.",1,2,"silent-resentment"]
]),
q(8,"space","flex","Someone close to you wants you to share something personal that you're not ready to discuss.",[
["I tell them I'm not ready, without inventing a story, and say if I might revisit it.",4,4,"permission-to-wait"],
["I share it to prove I trust them, then regret it.",0,0,"forced-disclosure"],
["I change the subject every time and never say there's a boundary.",2,1,"evade-privacy"],
["I refuse, then insist they must never ask me anything personal.",3,0,"all-or-nothing"]
]),
q(9,"follow","voice","A repeated last-minute request is leaving you exhausted. Your first boundary conversation changed nothing.",[
["I make a specific, doable change to my own availability and explain it once.",4,4,"action-limit"],
["I explain my feelings in even greater detail, hoping that will finally work.",1,2,"repeat-explain"],
["I keep saying yes and privately count the sacrifices.",0,0,"unspoken-scorecard"],
["I threaten to end the relationship even though I don't intend to do it.",0,1,"empty-ultimatum"]
]),
q(10,"flex","guilt","You and your partner disagree about how often to visit each other's families.",[
["I ask what matters to each of us and propose a plan we can both revisit.",4,4,"joint-design"],
["I insist my arrangement is final even though both people have valid preferences.",1,2,"one-way-rule"],
["I agree to their schedule and quietly dread every visit.",1,0,"appease"],
["I avoid talking about visits until the next invitation creates a fight.",0,1,"delay-conflict"]
]),
q(11,"voice","guilt","You want to ask for more time or affection, but worry the request might make you seem needy.",[
["I describe the specific change that would help and invite an honest answer.",4,4,"direct-need"],
["I drop hints and hope they notice what I'm missing.",1,2,"hint"],
["I pretend I don't care, then feel rejected when nothing changes.",0,1,"hide-need"],
["I say they must love me less if they can't meet the request immediately.",1,0,"demand-proof"]
]),
q(12,"guilt","flex","After a respectful boundary, someone says, “I understand, but I still feel hurt.”",[
["I can care about their hurt while keeping a limit I genuinely need.",4,4,"compassion-boundary"],
["I treat their hurt as proof I've done something wrong and give in.",0,1,"hurt-equals-guilt"],
["I say their feelings are irrelevant because boundaries are non-negotiable.",2,0,"dismiss-hurt"],
["I promise to revisit the decision, although I know I won't.",1,1,"false-promise"]
]),
q(13,"space","follow","A friend repeatedly posts private details about you online after you've asked them not to.",[
["I ask for the content to be removed and change what I share with them if it continues.",4,4,"privacy-action"],
["I say nothing because I don't want to seem controlling.",0,0,"silent-leak"],
["I post something private about them so they understand how it feels.",0,1,"retaliate"],
["I complain to others but never directly address the behavior.",1,1,"triangulate"]
]),
q(14,"follow","flex","A boundary you set last year no longer fits your circumstances, and someone asks whether it can change.",[
["I reassess it on my own terms, explain what can change, and protect what still matters.",4,4,"revisit-boundary"],
["I refuse even to think about it because changing a boundary means weakness.",2,0,"never-adjust"],
["I agree instantly although I'm unsure, just to avoid an awkward conversation.",0,1,"automatic-yes"],
["I change it reluctantly but later punish them for asking.",1,0,"resent-request"]
]),
q(15,"flex","voice","The other person respects your limit but asks for a different arrangement that might also work for you.",[
["I consider the alternative and say yes, no, or not yet based on what I actually want.",4,4,"choice-with-options"],
["I say no automatically because compromise feels like losing power.",0,2,"automatic-refusal"],
["I say yes before checking whether it works for me.",1,0,"premature-yes"],
["I keep them waiting for a decision so I won't have to disappoint them.",1,1,"avoid-answer"]
])
];
window.BOUNDARIES_DATA=Object.freeze({
  version:"1.0",slug:"boundaries-test",
  title:"Boundaries Test: Do I Have Healthy Boundaries?",
  dims:D,questions,
  definition:"A free 15-question, scenario-based educational self-reflection test. Results are calculated from responses, not clinically validated norms."
});
})();

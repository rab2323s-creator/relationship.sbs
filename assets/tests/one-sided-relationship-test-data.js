/* Original educational self-reflection questionnaire; not a validated psychometric scale. */
(function (root) {
  'use strict';
  const dimensions = [
    {id:'initiative', name:'Initiative & follow-through', short:'Initiative', description:'Who turns interest and good intentions into shared time and concrete action?', next:'Ask for a specific shared plan and notice whether they help organize and confirm it.'},
    {id:'care', name:'Emotional reciprocity', short:'Emotional care', description:'Whether your feelings, milestones and difficult moments receive meaningful attention too.', next:'Name one kind of support that matters to you, then watch for sustained responsiveness.'},
    {id:'repair', name:'Repair & accountability', short:'Repair', description:'How responsibility is shared when you disagree, apologize or try to rebuild trust.', next:'Discuss one recent rupture with a focus on mutual responsibility and changed behavior.'},
    {id:'space', name:'Space for your needs', short:'Your needs', description:'Whether both people’s priorities, boundaries and reasonable requests have room.', next:'Make one reasonable request without apologizing for having a need, and observe the response.'}
  ];
  const q = (id, dimension, weight, text, options, insight) => ({id,dimension,weight,text,options:options.map(([label,value])=>({label,value})),insight});
  const questions = [
    q('plans','initiative',1.20,'If you stopped suggesting when to see each other, what would probably happen?',[
      ['They would propose a time, and we would settle the details together.',0],
      ['They would reach out, but I might need to help turn it into a plan.',1],
      ['They would say they miss me, yet a date might never become specific.',3],
      ['We would barely see each other unless I arranged everything.',4]
    ],'the pattern of making plans'),
    q('hard-day','care',1.15,'You have a hard day and say you really need someone to listen. What follows?',[
      ['They make space, listen, and check how I am doing later.',0],
      ['They care, though their response can be brief or clumsy.',1],
      ['The conversation quickly returns to their own day or problems.',3],
      ['I often end up comforting them or feeling alone with my feelings.',4]
    ],'what happens when you need emotional support'),
    q('hurt','repair',1.25,'You calmly explain that something they did hurt you. Their usual response is…',[
      ['They try to understand the impact and own their part.',0],
      ['They get defensive initially but come back and talk it through.',1],
      ['They focus on their intentions and I have to argue for my feelings.',3],
      ['They dismiss it, turn it against me, or make me apologize instead.',4]
    ],'how hurt feelings are handled'),
    q('priority','space',1.05,'Both of you want different things from the same weekend. How is it decided?',[
      ['We look for a fair compromise or take turns choosing.',0],
      ['One person’s preference usually wins, but we can talk about it.',1],
      ['I usually adjust because bringing up mine creates tension.',3],
      ['My plans rarely count unless they already suit my partner.',4]
    ],'whether your priorities get equal room'),
    q('canceled','initiative',1.25,'They cancel a plan at the last minute for a real reason. What happens next?',[
      ['They explain, acknowledge the inconvenience, and suggest another time.',0],
      ['They apologize and we usually find another date together.',1],
      ['They say “soon,” but I have to restart the conversation about meeting.',3],
      ['Nothing gets rescheduled unless I chase the plan myself.',4]
    ],'whether canceled plans are repaired'),
    q('milestone','care',1.00,'Something important happens in your life—a win, a worry, or a change. How do they respond?',[
      ['They remember details and show genuine curiosity about what it means to me.',0],
      ['They respond kindly, though follow-up is sometimes limited.',1],
      ['They react briefly and then move back to their own story.',3],
      ['I hesitate to bring up my news because it rarely gets attention.',4]
    ],'interest in your inner world'),
    q('argument','repair',1.15,'After you both contribute to an argument, who usually starts making things right?',[
      ['We both reach out, reflect, and take responsibility in different ways.',0],
      ['I initiate more often, but they genuinely participate once we talk.',1],
      ['I usually break the silence and carry the whole repair conversation.',3],
      ['I take the blame or smooth it over just to restore peace.',4]
    ],'who carries reconciliation'),
    q('request','space',1.20,'You ask for a reasonable change, such as more notice or uninterrupted time. What tends to happen?',[
      ['They take it seriously and we find a workable adjustment.',0],
      ['They need a reminder, but make a visible effort.',1],
      ['They agree in the moment but the same problem keeps returning.',3],
      ['They call me demanding, punish the request, or refuse to discuss it.',4]
    ],'whether your requests create real change'),
    q('ordinary-week','initiative',1.00,'Across an ordinary week, who keeps the relationship moving?',[
      ['We both initiate conversations, shared time, and everyday care.',0],
      ['The balance shifts with schedules, but effort comes from both sides.',1],
      ['I do most of the checking in, planning, and keeping contact alive.',3],
      ['If I stop initiating, the connection nearly stops.',4]
    ],'the week-to-week pattern of effort'),
    q('interest','care',1.10,'When you talk about something they do not personally enjoy, they usually…',[
      ['Stay curious because it matters to me, even if it is not their thing.',0],
      ['Listen politely and sometimes ask questions.',1],
      ['Change the subject quickly or seem impatient.',3],
      ['Make me feel silly or inconvenient for caring about it.',4]
    ],'respect for your interests'),
    q('after-talk','repair',1.30,'Think of the last serious relationship conversation. What changed afterward?',[
      ['We agreed on actions, and I can see both of us following through.',0],
      ['Progress has been uneven, but I can point to real attempts.',1],
      ['The talk felt hopeful, but daily behavior stayed much the same.',3],
      ['I was left managing the problem and the conversation by myself.',4]
    ],'whether conversations lead to repair'),
    q('honest-need','space',1.20,'Imagine stating one need clearly without making it an ultimatum. What seems most true?',[
      ['I can ask openly; my need has a fair chance of being considered.',0],
      ['I can ask, although we may need time to negotiate.',1],
      ['I edit or minimize the request because I expect resistance.',3],
      ['I avoid asking because the consequences feel worse than staying quiet.',4]
    ],'how safe it feels to voice a need')
  ];
  const profiles = [
    {max:24,id:'reciprocal',title:'Mostly mutual effort',summary:'Your answers describe a relationship in which effort is generally shared. That does not mean everything is equal every day; it means both people usually respond when something matters.',step:'Protect what works: name the moments when care and initiative felt mutual, and ask how to maintain them during busier seasons.'},
    {max:44,id:'uneven',title:'Some recurring imbalance',summary:'Your answers suggest that parts of the relationship feel reciprocal while other parts lean noticeably on you. The difference may be context, habit, or an unresolved agreement—not a verdict about anyone’s intentions.',step:'Choose one repeatable behavior you want shared differently, and agree on what real change would look like.'},
    {max:69,id:'lopsided',title:'A lopsided pattern worth addressing',summary:'Across several situations, your answers point to you carrying more of the work of sustaining connection. Reassuring words matter less than whether both people make room for change.',step:'Have one concrete, time-bound conversation about effort and follow-through; then evaluate behavior, not promises alone.'},
    {max:100,id:'persistent',title:'Persistent one-sided effort',summary:'Your answers describe a sustained pattern in which your needs, initiative or repair attempts often receive little matching effort. A score cannot define your partner, but this pattern deserves to be taken seriously.',step:'Consider what you would need to feel respected, seek support from someone trustworthy, and avoid making further sacrifices solely to keep the connection going.'}
  ];
  const round = n => Math.round(n);
  const clamp = n => Math.min(100, Math.max(0, n));
  function score(answers){
    if (!Array.isArray(answers) || answers.length !== questions.length || answers.some((choice,i)=>!Number.isInteger(choice) || choice<0 || choice>=questions[i].options.length)) throw Error('Exactly 12 valid responses are required.');
    const dims=dimensions.map(d=>{
      const indexed=questions.map((item,index)=>({item,index})).filter(x=>x.item.dimension===d.id);
      const selected=indexed.map(({item,index})=>({question:item,choice:answers[index],value:item.options[answers[index]].value,weight:item.weight,index}));
      const numerator=selected.reduce((sum,r)=>sum+r.value*r.weight,0);
      const denominator=selected.reduce((sum,r)=>sum+4*r.weight,0);
      return {...d, score:clamp(round(100*numerator/denominator)), raw:numerator, max:denominator, selected};
    });
    const totalNumerator=dims.reduce((sum,d)=>sum+d.raw,0);
    const totalDenominator=dims.reduce((sum,d)=>sum+d.max,0);
    const overall=clamp(round(100*totalNumerator/totalDenominator));
    const profile=profiles.find(p=>overall<=p.max) || profiles[profiles.length-1];
    const sorted=[...dims].sort((a,b)=>b.score-a.score || dimensions.findIndex(x=>x.id===a.id)-dimensions.findIndex(x=>x.id===b.id));
    const top=sorted[0], second=sorted[1], strength=sorted[sorted.length-1];
    const evidence=top.selected.slice().sort((a,b)=>b.value-a.value || b.weight-a.weight).slice(0,2).map(r=>({question:r.question.text,answer:r.question.options[r.choice].label,insight:r.question.insight,value:r.value}));
    const caveat=answers[11]===3 || answers[7]===3 || answers[2]===3;
    const steps=[top.next,second.id!==top.id?second.next:profile.step,profile.step].filter((s,i,all)=>all.indexOf(s)===i);
    return {score:overall,profile,dimensions:dims,ranking:sorted,top,second,strength,evidence,caveat,steps};
  }
  root.OneSidedTest={dimensions,questions,profiles,score};
})(typeof window!=='undefined'?window:globalThis);
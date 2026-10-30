/* Lightweight standalone flirting style quiz. No account, no network, no stored responses. */
(function(){
"use strict";
const M=window.FlirtingStyleModel, root=document.getElementById("flirtQuiz");
if(!M||!root)return;
let answers=Array(M.total).fill(null),index=0,view="quiz";
const safe=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const labels={sincere:"Sincere",playful:"Playful",polite:"Polite",traditional:"Traditional",physical:"Physical"};
function btn(label,action,cls=""){return '<button type="button" class="fs-btn '+cls+'" data-action="'+action+'">'+safe(label)+'</button>';}
function render(){
 let html="";
 if(view==="quiz"){
  const q=M.questions[index],selected=answers[index],done=answers.filter(a=>a!==null).length;
  const note=index>=15?"Almost there — your style mix is taking shape.":index>=10?"You're past halfway. Keep going!":index>=5?"Great progress — answer with your natural instinct.":"Choose what you would actually do, not what sounds ideal.";
  html='<div class="fs-topline"><span>'+safe(q.group)+'</span><strong>Question '+(index+1)+' of '+M.total+'</strong></div>'+
   '<div class="fs-track" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="'+M.total+'" aria-valuenow="'+done+'"><span style="width:'+(done/M.total*100)+'%"></span></div>'+
   '<p class="fs-kicker">What feels most like you?</p><h2 id="fsCurrentQuestion" tabindex="-1">'+safe(q.prompt)+'</h2>'+
   '<div class="fs-options" role="group" aria-labelledby="fsCurrentQuestion">'+q.choices.map((c,i)=>'<button class="fs-choice'+(selected===i?" is-selected":"")+'" type="button" data-choice="'+i+'" aria-pressed="'+(selected===i)+'"><span class="fs-choice-number">'+(i+1)+'</span><span>'+safe(c.label)+'</span></button>').join("")+'</div>'+
   '<div class="fs-bottom"><div>'+btn("Previous","previous","secondary")+'</div><div class="fs-bottom-note">'+safe(note)+'</div><div>'+ (selected!==null?btn(index===M.total-1?"See my flirting style":"Next question","next","primary"):"")+'</div></div>';
 }else{
   const r=M.tally(answers),leaders=r.leaders,main=leaders[0],profile=M.profiles[main];
   const heading=r.tied?"Your flirting style is a blend":"Your flirting style: "+profile.title.replace("The ","");
   const intro=r.tied?"You showed equal preference for "+leaders.map(s=>labels[s]).join(", ")+". There's no need to force a single label: different situations can bring out different ways of showing interest.":profile.description;
   html='<section class="fs-result"><p class="fs-kicker">Your personal result · 20 original scenarios</p><h2 id="fsResultTitle" tabindex="-1">'+safe(heading)+'</h2><p class="fs-result-lead">'+safe(intro)+'</p>'+
   (r.tied?'<div class="fs-blend">'+leaders.map(x=>'<span>'+safe(labels[x])+'</span>').join("")+'</div>':'<p class="fs-result-subtitle">'+safe(profile.subtitle)+'</p>')+
   '<h3>Your five-style profile</h3><div class="fs-bars">'+r.ranked.map(s=>'<div class="fs-barrow"><span>'+safe(labels[s])+'</span><div class="fs-bartrack" role="meter" aria-label="'+safe(labels[s])+' choices" aria-valuemin="0" aria-valuemax="20" aria-valuenow="'+r.scores[s]+'"><span style="width:'+(r.scores[s]*5)+'%"></span></div><strong>'+r.scores[s]+'</strong></div>').join("")+'</div><p class="fs-fineprint">Counts show how often you selected an option associated with each style, not percentages or psychological trait levels. Every question offered one answer per style.</p>'+
   '<div class="fs-profile-grid">'+leaders.slice(0,2).map(s=>{let p=M.profiles[s];return '<section class="fs-profile"><h3>'+safe(p.title)+'</h3><p>'+safe(p.description)+'</p><h4>Strengths to keep</h4><ul>'+p.strengths.map(z=>'<li>'+safe(z)+'</li>').join("")+'</ul><h4>What to watch for</h4><ul>'+p.watchouts.map(z=>'<li>'+safe(z)+'</li>').join("")+'</ul><h4>Try next time</h4><ul>'+p.ideas.map(z=>'<li>'+safe(z)+'</li>').join("")+'</ul><p class="fs-example"><strong>Example:</strong> '+safe(p.example)+'</p></section>';}).join("")+'</div>'+
   '<div class="fs-result-note"><strong>Remember:</strong> Consent, context and respect come before any flirting style. Being warm, playful or confident is never a reason to ignore another person’s boundaries.</div>'+
   '<div class="fs-actions">'+btn("Share my result","share","primary")+btn("Copy result summary","copy","secondary")+btn("Retake the quiz","reset","secondary")+'</div>'+
   '<p id="fsFeedback" class="fs-feedback" role="status" aria-live="polite"></p>'+
   '<p class="fs-fineprint">This is an original educational quiz inspired by Hall and colleagues’ five-style framework, <strong>not</strong> the standardized Flirting Styles Inventory or a clinically validated personality test. <a href="/blog/how-to-flirt-in-person/">Learn practical ways to flirt in person</a>.</p></section>';
 }
 root.innerHTML=html;
}
function focusHeading(){const h=root.querySelector(view==="quiz"?"#fsCurrentQuestion":"#fsResultTitle");if(h){try{h.focus({preventScroll:true});}catch(_){h.focus();}}}
function choose(i){if(view!=="quiz"||i<0||i>=5)return;answers[index]=i;if(index===M.total-1){view="result";render();focusHeading();return;}index++;render();focusHeading();}
function previous(){if(view!=="quiz")return;if(index>0){index--;render();focusHeading();}}
function reset(){answers=Array(M.total).fill(null);index=0;view="quiz";render();focusHeading();try{root.scrollIntoView({block:"start",behavior:"smooth"});}catch(_){}}
function summary(){
 const r=M.tally(answers);let names=r.leaders.map(x=>labels[x]).join(" + ");
 return "My flirting style quiz result: "+names+" ("+r.best+" choices for the leading style). Discover your own style: https://relationship.sbs/tests/flirting-style-quiz/ — An educational quiz, not a validated assessment.";
}
async function share(copyOnly){
 const text=summary();
 const info=document.getElementById("fsFeedback");
 if(!copyOnly&&navigator.share){try{await navigator.share({title:"What's Your Flirting Style?",text,url:"https://relationship.sbs/tests/flirting-style-quiz/"});return;}catch(_){}}
 try{await navigator.clipboard.writeText(text);if(info)info.textContent="Result summary copied. Share it wherever you like.";}catch(_){if(info)info.textContent="Copy this result: "+text;}
}
root.addEventListener("click",e=>{
 const pick=e.target.closest("button[data-choice]");
 if(pick&&root.contains(pick)){choose(Number(pick.dataset.choice));return;}
 const action=e.target.closest("button[data-action]");
 if(!action||!root.contains(action))return;
 switch(action.dataset.action){
  case "previous":previous();break;
  case "next":if(answers[index]!==null){if(index===M.total-1){view="result";render();focusHeading();}else{index++;render();focusHeading();}}break;
  case "reset":reset();break;
  case "share":share(false);break;
  case "copy":share(true);break;
 }
});
root.addEventListener("keydown",e=>{
 if(view!=="quiz"||e.altKey||e.ctrlKey||e.metaKey||e.target.matches("input,textarea,[contenteditable]"))return;
 if(/^[1-5]$/.test(e.key)){e.preventDefault();choose(Number(e.key)-1);}
 if(e.key==="ArrowLeft"&&e.target===root){e.preventDefault();previous();}
});
render();
})();
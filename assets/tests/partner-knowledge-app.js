(function(){
"use strict";
const M=window.PartnerQuizModel,root=document.getElementById("pkGame");
if(!M||!root)return;
let phase="answer",index=0,answers=Array(20).fill(null),guesses=Array(20).fill(null),token=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const base=location.origin+location.pathname;
const share=t=>base+"#challenge="+encodeURIComponent(t);
const button=(label,act,cls="")=>'<button type="button" class="pk-btn '+cls+'" data-action="'+act+'">'+esc(label)+'</button>';
function resetHash(){if(location.hash)history.replaceState(null,"",location.pathname+location.search);}
function render(){
 const q=M.questions[index];let html="";
 if(phase==="answer"||phase==="guess"){
  let guess=phase==="guess",arr=guess?guesses:answers,filled=arr.filter(v=>v!==null).length;
  html='<div class="pk-step"><div class="pk-top"><span>'+(guess?"Step 2 · Guess your partner’s answers":"Step 1 · Answer about yourself")+'</span><strong>'+(index+1)+' / 20</strong></div><div class="pk-progress" role="progressbar" aria-label="Quiz progress" aria-valuenow="'+filled+'" aria-valuemin="0" aria-valuemax="20"><span style="width:'+(filled*5)+'%"></span></div><p class="pk-category">'+esc(q[0])+'</p><h2 id="pkQuestion">'+(guess?"What would your partner choose?":"What would you choose?")+'</h2><p class="pk-prompt">'+esc(q[1])+'</p><div class="pk-options" role="group" aria-label="Choose one answer">'+q[2].map((a,i)=>'<button type="button" data-pick="'+i+'" class="pk-option'+(arr[index]===i?' selected':'')+'" aria-pressed="'+(arr[index]===i)+'"><span class="pk-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(a)+'</span></button>').join("")+(guess?'<button type="button" data-pick="4" class="pk-option'+(arr[index]===4?' selected':'')+'" aria-pressed="'+(arr[index]===4)+'"><span class="pk-letter">?</span><span>I’m not sure yet</span></button>':"")+'</div><div class="pk-nav">'+button("Back","back","secondary")+'<span class="pk-hint">Tap one answer to continue</span>'+button(index===19?(guess?"See our answers":"Create private challenge"):"Next","next","primary")+'</div><p id="pkError" class="pk-error" role="alert"></p></div>';
 }else if(phase==="invite"){
  html='<div class="pk-complete"><p class="pk-category">Step 1 complete</p><h2>Your 20 answers are ready</h2><p>Your partner can open this link on another phone and try to guess what you chose. They only see your choices <strong>after</strong> submitting their guesses.</p><label class="pk-label" for="pkLink">Your invitation link</label><input id="pkLink" class="pk-link" readonly value="'+esc(share(token))+'" aria-label="Challenge link"><div class="pk-nav">'+button("Copy challenge link","copy","primary")+button("Share challenge","share","secondary")+button("Guess together on this device","local","secondary")+'</div><p id="pkError" class="pk-error" role="status"></p><p class="pk-privacy">Important: This link contains your 20 selected preferences in encoded (not encrypted) form. Anyone with the link can decode them. Do not include sensitive information. No account or server storage is used by this game.</p></div>';
 }else if(phase==="results"){
  const c=M.compare(answers,guesses);
  html='<div class="pk-results"><p class="pk-category">The reveal</p><h2>How well do you know your partner?</h2><div class="pk-score"><strong>'+c.matches+' <small>/ 20</small></strong><span>preferences guessed correctly</span></div><p>'+(c.matches===20?"You remembered every selected preference. That's a fun moment, not proof of perfect compatibility.":c.matches>=14?"You recognized many of their choices. Look at the surprises for new conversation starters.":c.matches>=7?"You guessed some choices and uncovered useful surprises about the others.":"Lots to discover! New knowledge is the point of the game, not a relationship grade.")+'</p><p>'+c.unsure+' answer'+(c.unsure===1?"":"s")+' marked “I’m not sure”. Differences are not failures.</p><div class="pk-groups">'+c.groups.map(g=>'<div><strong>'+esc(g.name)+'</strong><span>'+g.rows.filter(x=>x.match).length+' / 5 remembered</span></div>').join("")+'</div><h3>Compare every answer</h3><div class="pk-reveals">'+c.details.map(d=>{let options=M.questions[d.number-1][2];return '<details class="pk-reveal"><summary><span>'+(d.match?"✓":d.unsure?"?":"↔")+'</span> '+d.number+'. '+esc(d.question)+' <small>'+esc(d.category)+'</small></summary><p><strong>Your partner chose:</strong> '+esc(options[d.answer])+'</p><p><strong>You guessed:</strong> '+(d.unsure?"I’m not sure yet":esc(options[d.guess]))+'</p><p class="pk-discuss"><strong>Talk about it:</strong> '+esc(d.match?"What story explains this preference?":"What would help you learn more about this preference?")+'</p></details>'}).join("")+'</div><div class="pk-nav">'+button("Share summary","summary","primary")+button("Switch roles","switch","secondary")+button("Play again","restart","secondary")+'</div><p id="pkError" class="pk-error" role="status"></p><p class="pk-privacy">This is an entertainment and conversation activity, not a relationship compatibility assessment. Neither the match count nor a difference can determine relationship quality.</p></div>';
 }
 root.innerHTML=html;
 root.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>act(b.dataset.action)));
 root.querySelectorAll("[data-pick]").forEach(b=>b.addEventListener("click",()=>pick(+b.dataset.pick)));
 if(phase==="answer"||phase==="guess"){root.querySelector(".pk-nav .pk-btn.primary").disabled=(phase==="answer"?answers:guesses)[index]===null;}
}
function pick(n){let a=phase==="guess"?guesses:answers;a[index]=n;if(index<19){index++;render();}else render();}
function status(t){let x=document.getElementById("pkError");if(x)x.textContent=t;}
async function copy(value){try{await navigator.clipboard.writeText(value);status("Copied to clipboard.");}catch(_){let x=document.getElementById("pkLink");if(x){x.focus();x.select();}status("Select and copy the link above.");}}
function act(a){
 if(a==="back"){if(index>0){index--;render();}else if(phase==="guess"&&token){phase="invite";render();}return;}
 if(a==="next"){const values=phase==="guess"?guesses:answers;if(values[index]===null){status("Choose one answer first.");return;}if(index<19){index++;render();return;}if(phase==="answer"){token=M.encode(answers);phase="invite";index=0;render();return;}phase="results";render();return;}
 if(a==="copy"){copy(share(token));return;}
 if(a==="share"){if(navigator.share){navigator.share({title:"How Well Do You Know Your Partner?",text:"Guess my answers in this 20-question couples quiz!",url:share(token)}).catch(()=>{});}else copy(share(token));return;}
 if(a==="local"){guesses=Array(20).fill(null);phase="guess";index=0;resetHash();render();return;}
 if(a==="summary"){const result=M.compare(answers,guesses);let t="We guessed "+result.matches+"/20 preferences in How Well Do You Know Your Partner? Try it: "+base;if(navigator.share){navigator.share({title:"Our couples quiz",text:t}).catch(()=>{});}else copy(t);return;}
 if(a==="switch"){answers=Array(20).fill(null);guesses=Array(20).fill(null);phase="answer";index=0;token=null;resetHash();render();return;}
 if(a==="restart"){answers=Array(20).fill(null);guesses=Array(20).fill(null);phase="answer";index=0;token=null;resetHash();render();}
}
try{let frag=location.hash.match(/^#challenge=([^&]+)$/);let incoming=frag?decodeURIComponent(frag[1]):null;if(incoming){let decoded=M.decode(incoming);if(decoded){answers=decoded;token=incoming;phase="guess";index=0;}else{status("This challenge link is invalid. Start a new quiz.");}}}catch(_){}
render();
})();
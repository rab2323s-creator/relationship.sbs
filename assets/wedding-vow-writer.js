(function() {
"use strict";
var form=document.getElementById("wvForm"),draft=document.getElementById("wvDraft"),stats=document.getElementById("wvStats"),feedback=document.getElementById("wvFeedback"),copy=document.getElementById("wvCopy"),save=document.getElementById("wvSave"),print=document.getElementById("wvPrint");
if(!form||!draft||!stats||!feedback||!copy||!save||!print)return;
var elems=form.elements;
function val(name){return String(elems[name]&&elems[name].value||"").trim().replace(/\s+/g," ").slice(0,600);}
function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s;}
function punct(s){s=s.replace(/[.?!\s]+$/g,"").trim();return s?s+".":"";}
function promise(s){
 s=s.replace(/^(?:to\s+)/i,"").trim();
 if(!s)return "";
 if(/^(?:I\s+(?:promise|vow|will|choose|commit)|We\s+will)\b/i.test(s))return punct(cap(s));
 return punct("I promise to "+s.charAt(0).toLowerCase()+s.slice(1));
}
function sentences(){
 var name=val("name"),memory=val("memory"),quality=val("value"),future=val("future"),repair=val("repair");
 var promises=[val("promise1"),val("promise2"),val("promise3")].filter(Boolean);
 var tone=val("tone"),goal=Number(val("target"));
 if(!memory||!promises.length){
   feedback.textContent="Add one real memory and at least one personal promise to create a draft. Three distinct promises make the finished version stronger.";
   if(!memory)elems.memory.focus();else elems.promise1.focus();return "";
 }
 var lines=[],who=name?name.replace(/[,:;.!?]+$/,"")+",":"To the person I choose,";
 if(tone==="playful")lines.push(who+" if our story had a small museum, I would put this moment in it: "+punct(memory));
 else if(tone==="simple")lines.push(who+" one moment says a lot about us: "+punct(memory));
 else lines.push(who+" when I think about us, I keep coming back to this: "+punct(memory));
 if(quality)lines.push("What I admire in you is "+punct(quality.charAt(0).toLowerCase()+quality.slice(1)));
 if(goal>=90)lines.push("I want the words I say today to mean something in the ordinary days that follow.");
 var voiced=promises.map(promise);
 if(voiced.length===1)lines.push(voiced[0]);
 else if(voiced.length===2)lines.push(voiced.join(" ") );
 else lines.push(voiced.join(" "));
 if(goal>=120)lines.push("I know that making a promise is easier than keeping it. I want to remember these commitments when life is complicated, not only when it is beautiful.");
 if(repair)lines.push("When I fall short, I will "+punct(repair.replace(/^I\s+will\s+/i,"").replace(/[.?!]+$/g,"").charAt(0).toLowerCase()+repair.replace(/^I\s+will\s+/i,"").replace(/[.?!]+$/g,"").slice(1)));
 if(future)lines.push("Together, I hope we can build "+punct(future.charAt(0).toLowerCase()+future.slice(1)));
 lines.push(tone==="simple"?"I choose this life with you.":tone==="playful"?"I choose you, the plans we make, and all the wonderfully unplanned Tuesdays.":"I choose you, and the life we will keep making together.");
 feedback.textContent="Draft created from your words. Revise it freely; length is only an estimate.";
 return lines.join("\n\n");
}
function update(){
 var text=draft.value.trim(),words=text?(text.match(/\S+/g)||[]).length:0;
 var pace=Number(val("pace"))||125,target=Number(val("target"))||90;
 var paragraphs=text?text.split(/\n\s*\n/).filter(Boolean).length:0;
 var seconds=words?Math.round(words*60/pace + Math.min(paragraphs,5)*2):0;
 var difference=seconds-target;
 var remark=!words?"Add a memory and promises to start.":Math.abs(difference)<=12?"Near your selected target. Rehearse aloud.":difference<0?"About "+Math.abs(difference)+" seconds below the goal; add a true detail if needed.":"About "+difference+" seconds above the goal; trim or adjust your pace.";
 stats.textContent=words+" words · approx. "+seconds+" seconds at "+pace+" words/minute with short pauses · goal "+target+" seconds. "+remark+" Real speaking time varies.";
 return {words:words,seconds:seconds,target:target};
}
form.addEventListener("submit",function(event){
 event.preventDefault();
 var result=sentences();
 if(!result)return;
 draft.value=result;update();
 draft.focus();
});
draft.addEventListener("input",function(){update();});
elems.pace.addEventListener("change",update);
elems.target.addEventListener("change",update);
copy.addEventListener("click",function(){
 if(!draft.value.trim()){feedback.textContent="Write or build a draft before copying.";return;}
 if(navigator.clipboard&&navigator.clipboard.writeText){
   navigator.clipboard.writeText(draft.value).then(function(){feedback.textContent="Vows copied to your clipboard.";},function(){draft.focus();draft.select();feedback.textContent="Select the highlighted text and copy it.";});
 }else{draft.focus();draft.select();feedback.textContent="Select the highlighted text and copy it.";}
});
save.addEventListener("click",function(){
 if(!draft.value.trim()){feedback.textContent="Write or build a draft before downloading.";return;}
 try{
   var blob=new Blob([draft.value+"\n"],{type:"text/plain;charset=utf-8"});
   var url=URL.createObjectURL(blob),link=document.createElement("a");
   link.href=url;link.download="my-personal-wedding-vows.txt";link.hidden=true;document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);
   feedback.textContent="A text file was created in your browser. Check your downloads.";
 }catch(error){draft.focus();draft.select();feedback.textContent="Download unavailable here; copy the selected text instead.";}
});
print.addEventListener("click",function(){
 if(!draft.value.trim()){feedback.textContent="Write or build a draft before printing.";return;}
 if(typeof window.print==="function")window.print();
});
form.addEventListener("reset",function(){
 draft.value="";feedback.textContent="Your local draft is cleared.";
 Promise.resolve().then(function(){update();});
});
update();
})();
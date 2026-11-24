export const KEYS=["meaning","consent","expectation","behavior","budget","pressure","repair","safety"];
export function assess(answers){
 if(!answers || KEYS.some(k=>![0,1,2].includes(answers[k]))) return null;
 if(answers.safety!==0 || answers.pressure===2) return {title:"Pause and prioritize freedom and safety",text:"Do not use a ring to pressure someone or accept one out of fear. If it is safe, talk about boundaries; if you fear retaliation, seek confidential support rather than confronting someone alone."};
 if(answers.consent===2) return {title:"Respect their no or not yet",text:"Do not give a promise ring against an expressed preference. Ask what commitment means to both of you only if they want to talk."};
 if(answers.repair===2 || answers.behavior===2 || answers.expectation===2 || answers.budget===2) return {title:"Pause before buying a ring",text:"Resolve the disagreement, repair concern or budget pressure first. A symbol cannot substitute for an agreement or changed behavior."};
 if(KEYS.some(k=>answers[k]!==0)) return {title:"Have a conversation first",text:"Clarify the meaning, timing, welcome and affordability before you buy. A private conversation can make the gift less ambiguous."};
 return {title:"A thoughtful next step may be a promise ring",text:"Your answers suggest the basics have been discussed. Choose a comfortable, affordable symbol, explain the promise and leave room for a no or not yet."};
}
if(typeof document!=="undefined"){
 const form=document.getElementById("promiseCheck"),out=document.getElementById("promiseResult");
 if(form&&out){
  const render=(title,text)=>{const h=document.createElement("h3"),p=document.createElement("p");h.textContent=title;p.textContent=text;out.replaceChildren(h,p);};
  form.addEventListener("submit",event=>{event.preventDefault();const values=Object.fromEntries(KEYS.map(k=>[k,form.elements.namedItem(k).value===""?null:Number(form.elements.namedItem(k).value)]));const result=assess(values);if(result)render(result.title,result.text);});
  form.addEventListener("reset",()=>render("Your next step","Choose an answer for every question to see your result."));
  form.addEventListener("change",()=>render("Your next step","Submit your current answers to see your result."));
 }
}

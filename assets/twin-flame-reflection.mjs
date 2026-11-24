export const KEYS=["contact","safety","boundaries","reciprocity","daily","evidence","future","freedom"];
export function assess(a){
 if(!a||KEYS.some(k=>![0,1,2].includes(a[k]))) return null;
 if(a.safety!==0||a.boundaries===2||a.freedom!==0) return {title:"Prioritize safety and freedom",text:"Do not interpret fear, pressure or ignored boundaries as destiny. Respect any request for no contact. Seek confidential support if you fear retaliation or harm."};
 if(a.contact===2) return {title:"Respect the boundary and make room for your own life",text:"Do not pursue a person who declined or requested distance. A strong feeling cannot replace consent. Focus on support, routines and recovery."};
 if(a.daily===2) return {title:"Protect your well-being",text:"Make time for rest and trusted support. If preoccupation is significantly disrupting daily life, consider a qualified mental health professional. No spiritual label requires you to wait."};
 if(a.contact!==0||a.reciprocity!==0||a.evidence!==0||a.future!==0||a.boundaries!==0||a.daily!==0) return {title:"Separate feelings from facts",text:"Notice where interest or expectations are unclear. If communication is welcome and safe, clarify them directly; do not chase a response or treat signs as consent."};
 return {title:"Reflect on a mutually chosen connection",text:"Your answers describe mutual interest, respect and everyday stability. Keep building the relationship through communication and choice. This result does not verify a twin flame."};
}
if(typeof document!=="undefined"){
 const f=document.getElementById("twinCheck"),o=document.getElementById("twinResult");
 if(f&&o){const render=(title,text)=>{const h=document.createElement("h3"),p=document.createElement("p");h.textContent=title;p.textContent=text;o.replaceChildren(h,p);};
 f.addEventListener("submit",e=>{e.preventDefault();const a=Object.fromEntries(KEYS.map(k=>[k,f.elements.namedItem(k).value===""?null:Number(f.elements.namedItem(k).value)]));const r=assess(a);if(r)render(r.title,r.text);});
 f.addEventListener("reset",()=>render("Your reflection","Choose an answer for every question to see your next step."));
 f.addEventListener("change",()=>render("Your reflection","Submit your current answers to see your next step."));}
}

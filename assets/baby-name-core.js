/* Baby Name Finder: pure logic shared by browser and Node tests. */
(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  root.BabyNameCore=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const MAX_PICKS=40;
  const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const keyOf=value=>String(value||"").trim().toLocaleLowerCase("en");
  function validateDatabase(db){
    if(!db||db.total!==1000||!Array.isArray(db.names)||db.names.length!==1000)throw Error("Invalid baby name collection");
    const unique=new Set();
    for(const n of db.names){
      if(!n||typeof n.n!=="string"||!n.n.trim()||typeof n.m!=="string"||!n.m.trim()||typeof n.o!=="string"||!n.o.trim()||!["boy","girl","unisex"].includes(n.g)||!Number.isFinite(n.c)||n.c<5||!Number.isFinite(n.r)||n.r<1||!Array.isArray(n.t))throw Error("Invalid baby name row");
      const k=keyOf(n.n);
      if(unique.has(k))throw Error("Duplicate baby name: "+n.n);
      unique.add(k);
    }
    return db.names;
  }
  function filterNames(names,filters={}){
    const q=keyOf(filters.query);
    const gender=filters.gender||"all",meaning=filters.meaning||"all",origin=filters.origin||"all",sort=filters.sort||"popular";
    const letter=filters.letter||"all",length=filters.length||"all";
    const isLengthMatch=n=>length==="all"||(length==="short"&&n.n.length<=4)||(length==="medium"&&n.n.length>=5&&n.n.length<=6)||(length==="long"&&n.n.length>=7);
    let output=names.filter(n=>(gender==="all"||n.g===gender||n.g==="unisex"&&(gender==="boy"||gender==="girl"))&&(meaning==="all"||n.t.includes(meaning))&&(origin==="all"||n.o===origin)&&(letter==="all"||n.n.toUpperCase().startsWith(letter))&&isLengthMatch(n)&&(q===""||[n.n,n.m,n.o].some(s=>keyOf(s).includes(q))));
    output.sort((a,b)=>sort==="az"?a.n.localeCompare(b.n,"en"):sort==="za"?b.n.localeCompare(a.n,"en"):sort==="rare"?(a.c-b.c)||a.n.localeCompare(b.n,"en"):(b.c-a.c)||a.n.localeCompare(b.n,"en"));
    return output;
  }
  function sanitizePicks(values,validNames){
    if(!Array.isArray(values))return [];
    const valid=validNames instanceof Set?validNames:new Set((validNames||[]).map(n=>keyOf(n.n||n)));
    const picks=[],seen=new Set();
    for(const v of values){
      if(typeof v!=="string")continue;
      const k=keyOf(v);
      if(valid.has(k)&&!seen.has(k)){seen.add(k);picks.push(k)}
      if(picks.length>=MAX_PICKS)break;
    }
    return picks;
  }
  function toUrlToken(picks,validNames){
    const selected=sanitizePicks(picks,validNames);
    return selected.map(encodeURIComponent).join("~");
  }
  function fromUrlToken(token,validNames){
    if(typeof token!=="string"||token.length>1200||!/^[a-zA-Z0-9_%~.-]*$/.test(token))return [];
    let parsed;
    try{parsed=token.split("~").map(decodeURIComponent)}catch(e){return []}
    return sanitizePicks(parsed,validNames);
  }
  function parsePartnerLink(value,validNames,expectedOrigin,expectedPath){
    if(typeof value!=="string"||!value.trim()||value.length>2400)return [];
    try{
      const url=new URL(value.trim());
      if(url.origin!==expectedOrigin||url.pathname!==expectedPath)return [];
      const token=url.searchParams.get("partner");
      if(!token)return [];
      return fromUrlToken(token,validNames);
    }catch(e){return []}
  }
  function makePickDeck(names,count=12,random=Math.random){
    const copy=[...names];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.max(0,Math.min(i,Math.floor(random()*(i+1))));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy.slice(0,Math.min(Math.max(count,0),copy.length));
  }
  function intersection(a,b){
    const right=new Set(b);
    return a.filter(n=>right.has(n));
  }
  return {MAX_PICKS,escapeHtml,keyOf,validateDatabase,filterNames,sanitizePicks,toUrlToken,fromUrlToken,parsePartnerLink,makePickDeck,intersection};
});

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
    if(!db||!Number.isInteger(db.total)||db.total<1||!Array.isArray(db.names)||db.names.length!==db.total)throw Error("Invalid baby name collection");
    const unique=new Set();
    for(const n of db.names){
      if(!n||typeof n.n!=="string"||!n.n.trim()||(n.m!==null&&(typeof n.m!=="string"||!n.m.trim()))||(n.o!==null&&(typeof n.o!=="string"||!n.o.trim()))||(n.m===null)!==(n.o===null)||!["boy","girl","unisex"].includes(n.g)||!Number.isInteger(n.c)||n.c<5||!Number.isInteger(n.r)||n.r<1||!Array.isArray(n.t)||n.t.some(t=>typeof t!=="string"||!t))throw Error("Invalid baby name row");
      if(!n.m&&n.t.length)throw Error("Unverified meaning must not have meaning tags");
      if(n.u!==undefined&&n.u!==null&&(!["F","M"].includes(n.u.s)||!Number.isInteger(n.u.c)||n.u.c<5||!Number.isInteger(n.u.r)||n.u.r<1||n.u.d!==undefined&&!Number.isInteger(n.u.d)))throw Error("Invalid 2025 popularity row");
      const k=keyOf(n.n);
      if(unique.has(k))throw Error("Duplicate baby name: "+n.n);
      unique.add(k);
    }
    return db.names;
  }

  function validateManifest(manifest){
    if(!manifest||manifest.version!==2||manifest.total!==20000||!Array.isArray(manifest.parts)||manifest.parts.length!==5||manifest.parts.some((p,i)=>!p||p.count!==4000||p.path!=="/assets/data/baby-names-20k-"+String(i+1).padStart(2,"0")+".json"))throw Error("Invalid 20,000-name manifest");
    return manifest.parts;
  }
  function assembleCatalog(manifest,shards){
    const parts=validateManifest(manifest);
    if(!Array.isArray(shards)||shards.length!==parts.length)throw Error("Missing catalog shards");
    const names=[];
    for(let i=0;i<parts.length;i++){
      const shard=shards[i];
      if(!shard||shard.version!==2||shard.part!==i+1||shard.count!==parts[i].count||!Array.isArray(shard.names)||shard.names.length!==parts[i].count)throw Error("Invalid catalog shard "+(i+1));
      names.push(...shard.names);
    }
    return validateDatabase({total:manifest.total,names});
  }
  function filterNames(names,filters={}){
    const q=keyOf(filters.query);
    const gender=filters.gender||"all",meaning=filters.meaning||"all",origin=filters.origin||"all",sort=filters.sort||"popular";
    const letter=filters.letter||"all",length=filters.length||"all";
    const isLengthMatch=n=>length==="all"||(length==="short"&&n.n.length<=4)||(length==="medium"&&n.n.length>=5&&n.n.length<=6)||(length==="long"&&n.n.length>=7);
    let output=names.filter(n=>(gender==="all"||n.g===gender||n.g==="unisex"&&(gender==="boy"||gender==="girl"))&&(meaning==="all"||n.t.includes(meaning))&&(!filters.documented||Boolean(n.m&&n.o))&&(origin==="all"||n.o===origin)&&(letter==="all"||n.n.toUpperCase().startsWith(letter))&&isLengthMatch(n)&&(q===""||[n.n,n.m,n.o].some(s=>keyOf(s).includes(q))));
    output.sort((a,b)=>sort==="az"?a.n.localeCompare(b.n,"en"):sort==="za"?b.n.localeCompare(a.n,"en"):sort==="rare"?((a.u?.c??a.c)-(b.u?.c??b.c))||a.n.localeCompare(b.n,"en"):((b.u?.c??b.c)-(a.u?.c??a.c))||a.n.localeCompare(b.n,"en"));
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

  function normalizeName(value){
    return keyOf(value).normalize("NFC");
  }
  function validateRegionData(data){
    if(!data||data.year!==2025||!Array.isArray(data.regions)||data.regions.length!==4)throw Error("Invalid region data");
    for(const region of data.regions){
      if(!region.id||!region.label||region.year!==2025)throw Error("Invalid region");
      if(region.id==="us")continue;
      if(!region.source)throw Error("Missing region citation");
      for(const sex of ["girls","boys"]){
        if(!Array.isArray(region[sex])||region[sex].length!==10)throw Error("Incomplete verified top ten");
        const seen=new Set();
        region[sex].forEach((entry,i)=>{
          if(entry.rank!==i+1||!Array.isArray(entry.names)||!entry.names.length)throw Error("Invalid reported rank");
          for(const name of entry.names){
            const key=normalizeName(name);
            if(seen.has(key))throw Error("Duplicate regional name");
            seen.add(key);
          }
        });
      }
    }
    return data.regions;
  }
  function regionEntry(name,sex,region){
    if(!region||region.id==="us")return null;
    const columns=sex==="girl"?["girls"]:sex==="boy"?["boys"]:sex==="unisex"?["girls","boys"]:[];
    for(const column of columns){
      const found=region[column].find(entry=>entry.names.some(candidate=>normalizeName(candidate)===normalizeName(name)));
      if(found)return found;
    }
    return null;
  }
  function meaningfulCommonThemes(ours,theirs,names){
    const byKey=new Map(names.map(n=>[keyOf(n.n),n]));
    const from=(keys,prop)=>new Set(keys.flatMap(key=>{
      const row=byKey.get(keyOf(key));return row?(prop==="t"?row.t:[row.o]):[];
    }));
    const share=(a,b)=>[...a].filter(x=>x!==null&&x!==undefined&&x!==""&&b.has(x));
    return {meanings:share(from(ours,"t"),from(theirs,"t")),origins:share(from(ours,"o"),from(theirs,"o"))};
  }
  function suggestCompromises(ours,theirs,names,limit=6){
    if(!ours.length||!theirs.length)return [];
    const byKey=new Map(names.map(n=>[keyOf(n.n),n]));
    const both=new Set([...ours,...theirs].map(keyOf));
    const mine=ours.map(x=>byKey.get(keyOf(x))).filter(Boolean);
    const theirsRows=theirs.map(x=>byKey.get(keyOf(x))).filter(Boolean);
    const overlap=meaningfulCommonThemes(ours,theirs,names);
    const averageLength=rows=>rows.reduce((sum,n)=>sum+n.n.length,0)/Math.max(1,rows.length);
    const avg=(averageLength(mine)+averageLength(theirsRows))/2;
    return names.filter(n=>!both.has(keyOf(n.n))).map(n=>{
      const tagMatches=overlap.meanings.filter(t=>n.t.includes(t)).length;
      const originMatches=n.o!==null&&overlap.origins.includes(n.o)?1:0;
      const mineTag=mine.some(row=>row.t.some(t=>n.t.includes(t)));
      const theirTag=theirsRows.some(row=>row.t.some(t=>n.t.includes(t)));
      const mineOrigin=n.o!==null&&mine.some(row=>row.o===n.o);
      const theirOrigin=n.o!==null&&theirsRows.some(row=>row.o===n.o);
      const score=tagMatches*8+originMatches*8+(mineTag&&theirTag?5:0)+(mineOrigin&&theirOrigin?5:0)+(mineTag?2:0)+(theirTag?2:0)+(mineOrigin?1:0)+(theirOrigin?1:0)+Math.max(0,3-Math.abs(n.n.length-avg));
      return {name:n,score};
    }).sort((a,b)=>b.score-a.score||b.name.c-a.name.c||a.name.n.localeCompare(b.name.n,"en"))
      .slice(0,Math.max(0,Math.min(12,limit)));
  }
  function intersection(a,b){
    const right=new Set(b);
    return a.filter(n=>right.has(n));
  }
  return {MAX_PICKS,escapeHtml,keyOf,validateDatabase,validateManifest,assembleCatalog,filterNames,sanitizePicks,toUrlToken,fromUrlToken,parsePartnerLink,makePickDeck,validateRegionData,regionEntry,meaningfulCommonThemes,suggestCompromises,intersection};
});

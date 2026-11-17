(function(){
"use strict";
const core=window.BabyNameCore;
const $=id=>document.getElementById(id);
const state={names:[],filtered:[],saved:[],partner:[],visible:18,loaded:false,filters:{query:"",gender:"all",meaning:"all",origin:"all",sort:"popular"},tab:"explore"};
const KEY="relationship.sbs:baby-name-favorites:v1";
const lookup=()=>new Map(state.names.map(n=>[core.keyOf(n.n),n]));
const safeText=core.escapeHtml;
let toastTimer=null;
function toast(message){
  const el=$("babyToast");el.textContent=message;el.hidden=false;
  if(toastTimer)clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>{el.hidden=true},3500);
}
function saveToStorage(){
  try{localStorage.setItem(KEY,JSON.stringify(state.saved))}catch(e){toast("Favorites are available this visit, but browser storage is disabled.")}
}
function restoreStorage(){
  try{const p=JSON.parse(localStorage.getItem(KEY)||"[]");state.saved=core.sanitizePicks(p,state.names)}catch(e){state.saved=[]}
}
function openShared(){
  const params=new URLSearchParams(location.search);
  const token=params.get("partner");
  if(token){
    state.partner=core.fromUrlToken(token,state.names);
    if(state.partner.length){selectTab("together");toast("Partner's shortlist loaded. Save the names you love to see matches.")}
    else toast("This shared shortlist could not be read.");
  }
}
function updateHashSafe(){
  if(location.search.includes("partner="))return;
}
function originOptions(){
 const origins=[...new Set(state.names.map(n=>n.o))].sort((a,b)=>a.localeCompare(b,"en"));
 const select=$("originSelect");
 select.append(...origins.map(origin=>{const option=document.createElement("option");option.value=origin;option.textContent=origin;return option}));
}
function formatNumber(n){return new Intl.NumberFormat("en-US").format(n)}
function card(n){
 const key=core.keyOf(n.n),saved=state.saved.includes(key), tags=n.t.slice(0,2);
 return '<article class="baby-name-card" data-name="'+safeText(key)+'">'+
 '<div class="baby-name-card-top"><span class="baby-origin-badge">'+safeText(n.o)+'</span>'+
 '<button class="baby-heart'+(saved?' is-saved':'')+'" type="button" data-heart="'+safeText(key)+'" aria-pressed="'+String(saved)+'" aria-label="'+(saved?'Remove ':'Save ')+safeText(n.n)+(saved?' from':' to')+' favorites" title="'+(saved?'Remove from':'Save to')+' favorites">'+(saved?'♥':'♡')+'</button></div>'+
 '<h4>'+safeText(n.n)+'</h4><p class="baby-card-meaning">'+safeText(n.m)+'</p>'+
 '<div class="baby-card-tags"><span>'+safeText(n.g==="unisex"?"Unisex":n.g==="girl"?"Mostly girls":"Mostly boys")+'</span>'+tags.map(t=>'<span>'+safeText(t)+'</span>').join("")+'</div>'+
 '<div class="baby-card-foot"><span>US births in 2020</span><strong>'+formatNumber(n.c)+'</strong></div></article>';
}
function renderExplore(){
 if(!state.loaded)return;
 state.filtered=core.filterNames(state.names,state.filters);
 $("resultsCount").textContent=formatNumber(state.filtered.length)+" names found";
 const slice=state.filtered.slice(0,state.visible);
 $("resultCards").innerHTML=slice.map(card).join("");
 $("emptyState").hidden=state.filtered.length>0;
 $("loadMore").hidden=state.filtered.length<=state.visible;
 $("loadMore").textContent="Show more names ("+formatNumber(state.filtered.length-state.visible)+" remaining) ↓";
}
function chips(keys){
 const map=lookup();
 if(!keys.length)return '<p class="baby-fine-print">No names yet.</p>';
 return keys.map(key=>'<span class="baby-name-chip">'+safeText(map.get(key)?.n||key)+'</span>').join("");
}
function renderSaved(){
 const map=lookup(),rows=state.saved.map(k=>map.get(k)).filter(Boolean);
 $("shortlistCards").innerHTML=rows.map(card).join("");
 $("shortlistEmpty").hidden=rows.length>0;
 $("shortlistCards").hidden=rows.length===0;
 $("savedBadge").textContent=String(state.saved.length);
 $("savedIntro").textContent=rows.length?rows.length+" name"+(rows.length===1?"":"s")+" saved in this browser.":"Keep the names that make you smile. Your favorites stay in this browser.";
 $("shareShortlist").disabled=!rows.length;
 $("clearShortlist").disabled=!rows.length;
 renderComparison();
}
function renderComparison(){
 $("myPicksCount").textContent=state.saved.length;
 $("partnerPicksCount").textContent=state.partner.length;
 $("myPicks").innerHTML=chips(state.saved);
 $("partnerPicks").innerHTML=chips(state.partner);
 const common=core.intersection(state.saved,state.partner);
 $("matchNames").innerHTML=chips(common);
 $("matchTitle").textContent=common.length?common.length+" name"+(common.length===1?"":"s")+" you both love":"The names you both love";
 $("matchHelp").textContent=common.length?"Beautiful! These names appear on both shortlists.":state.partner.length?"No matches yet — try exploring a few more names together.":"Open a partner's link to compare their saved names with yours.";
 $("shareFromCompare").disabled=!state.saved.length;
}
function syncHeartButtons(key){
 document.querySelectorAll("[data-heart]").forEach(btn=>{
  if(btn.dataset.heart!==key)return;
  const yes=state.saved.includes(key);
  btn.classList.toggle("is-saved",yes);
  btn.textContent=yes?"♥":"♡";
  btn.setAttribute("aria-pressed",String(yes));
  btn.setAttribute("aria-label",(yes?"Remove ":"Save ")+(lookup().get(key)?.n||key)+(yes?" from":" to")+" favorites");
 });
}
function toggleFavorite(key){
 const idx=state.saved.indexOf(key);
 if(idx>=0)state.saved.splice(idx,1);
 else{
  if(state.saved.length>=core.MAX_PICKS){toast("Your shortlist can hold up to "+core.MAX_PICKS+" names.");return}
  state.saved.push(key);
 }
 saveToStorage();syncHeartButtons(key);renderSaved();
 toast(idx>=0?"Name removed from your shortlist.":"Added to your shortlist.");
}
function selectTab(tab){
 const valid=["explore","saved","together"];
 if(!valid.includes(tab))return;
 state.tab=tab;
 const ids={explore:["tabExplore","panelExplore"],saved:["tabSaved","panelSaved"],together:["tabTogether","panelTogether"]};
 for(const [key,[tabId,panelId]] of Object.entries(ids)){
  const active=tab===key;
  $(tabId).classList.toggle("is-active",active);
  $(tabId).setAttribute("aria-selected",String(active));
  $(panelId).hidden=!active;
 }
 if(tab==="saved")renderSaved();
 if(tab==="together")renderComparison();
 if(tab!=="explore")$("babyFinder").scrollIntoView({behavior:"smooth",block:"start"});
}
function resetFilters(){
 state.filters={query:"",gender:"all",meaning:"all",origin:"all",sort:"popular"};
 $("nameSearch").value="";$("meaningSelect").value="all";$("originSelect").value="all";$("sortSelect").value="popular";
 document.querySelectorAll("[data-gender]").forEach(el=>{const yes=el.dataset.gender==="all";el.classList.toggle("is-selected",yes);el.setAttribute("aria-pressed",String(yes))});
 state.visible=18;$("surpriseSpotlight").hidden=true;renderExplore();
}
function copyShareUrl(){
 if(!state.saved.length){toast("Save a name first to create a shortlist.");return}
 const u=new URL(location.pathname,location.origin);
 u.searchParams.set("partner",core.toUrlToken(state.saved,state.names));
 const url=u.toString();
 if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(url).then(()=>toast("Shortlist link copied. Send it to your partner.")).catch(()=>fallbackCopy(url))}
 else fallbackCopy(url);
}
function fallbackCopy(url){
 const input=document.createElement("textarea");input.value=url;input.setAttribute("readonly","");input.style.position="fixed";input.style.left="-9999px";
 document.body.append(input);input.select();
 let successful=false;try{successful=document.execCommand("copy")}catch(e){}
 input.remove();
 if(successful)toast("Shortlist link copied. Send it to your partner.");
 else window.prompt("Copy this shortlist link:",url);
}
function surprise(){
 if(!state.filtered.length){toast("Try relaxing your filters first.");return}
 const choice=state.filtered[Math.floor(Math.random()*state.filtered.length)];
 $("surpriseSpotlight").hidden=false;
 $("surpriseSpotlight").innerHTML='<div><span class="baby-eyebrow">A NAME TO CONSIDER</span><h3>'+safeText(choice.n)+'</h3><p>'+safeText(choice.m)+'</p><small>'+safeText(choice.o)+' roots · '+formatNumber(choice.c)+' US births in 2020</small></div><button type="button" class="baby-heart'+(state.saved.includes(core.keyOf(choice.n))?' is-saved':'')+'" data-heart="'+safeText(core.keyOf(choice.n))+'" aria-label="Save '+safeText(choice.n)+' to favorites" aria-pressed="'+String(state.saved.includes(core.keyOf(choice.n)))+'">'+(state.saved.includes(core.keyOf(choice.n))?'♥':'♡')+'</button>';
 $("surpriseSpotlight").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function bind(){
 document.addEventListener("click",e=>{
  const heart=e.target.closest("[data-heart]");
  if(heart){toggleFavorite(heart.dataset.heart);return}
  const goto=e.target.closest("[data-goto]");if(goto){selectTab(goto.dataset.goto);return}
  const tab=e.target.closest("[data-tab]");if(tab){selectTab(tab.dataset.tab);return}
  const gender=e.target.closest("[data-gender]");
  if(gender){state.filters.gender=gender.dataset.gender;state.visible=18;document.querySelectorAll("[data-gender]").forEach(btn=>{const active=btn===gender;btn.classList.toggle("is-selected",active);btn.setAttribute("aria-pressed",String(active))});renderExplore()}
 });
 for(const [id,k] of [["meaningSelect","meaning"],["originSelect","origin"],["sortSelect","sort"]]){
  $(id).addEventListener("change",e=>{state.filters[k]=e.target.value;state.visible=18;$("surpriseSpotlight").hidden=true;renderExplore()});
 }
 let searchTimer; $("nameSearch").addEventListener("input",e=>{clearTimeout(searchTimer);const v=e.target.value;searchTimer=setTimeout(()=>{state.filters.query=v;state.visible=18;$("surpriseSpotlight").hidden=true;renderExplore()},90)});
 $("clearFilters").addEventListener("click",resetFilters);
 $("resetEmpty").addEventListener("click",resetFilters);
 $("loadMore").addEventListener("click",()=>{state.visible+=18;renderExplore()});
 $("surpriseBtn").addEventListener("click",surprise);
 $("shareShortlist").addEventListener("click",copyShareUrl);
 $("shareFromCompare").addEventListener("click",copyShareUrl);
 $("clearShortlist").addEventListener("click",()=>{
  if(!state.saved.length)return;
  if(!window.confirm("Remove all the names from your shortlist?"))return;
  state.saved=[];saveToStorage();renderSaved();renderExplore();toast("Shortlist cleared.");
 });
 $("retryLoad").addEventListener("click",load);
 const tabs=["explore","saved","together"];
 document.querySelector(".baby-tabbar").addEventListener("keydown",e=>{
  if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;
  e.preventDefault();const i=tabs.indexOf(state.tab);
  const next=e.key==="Home"?0:e.key==="End"?2:(i+(e.key==="ArrowRight"?1:2))%3;
  selectTab(tabs[next]);$("tab"+tabs[next][0].toUpperCase()+tabs[next].slice(1)).focus();
 });
}
async function load(){
 $("errorState").hidden=true;$("loadingState").hidden=false;
 try{
  const response=await fetch("/assets/data/baby-names.json",{cache:"default"});
  if(!response.ok)throw Error("HTTP "+response.status);
  const db=await response.json();
  state.names=core.validateDatabase(db);
  state.loaded=true;restoreStorage();originOptions();
  $("datasetSize").textContent=formatNumber(db.total);
  $("loadingState").hidden=true;
  renderExplore();renderSaved();openShared();
 }catch(e){
  console.error("Baby name collection error",e);
  $("loadingState").hidden=true;$("errorState").hidden=false;
 }
}
bind();load();
})();

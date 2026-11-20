import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import {spawn,spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const exe=["google-chrome","google-chrome-stable","chromium","chromium-browser"].find(x=>spawnSync("which",[x],{encoding:"utf8"}).status===0);
assert.ok(exe,"Chrome or Chromium must exist for real browser tests");
const probe=`<script>
window.addEventListener("load",function(){
 var issues=[],form=document.getElementById("wvForm"),draft=document.getElementById("wvDraft"),stat=document.getElementById("wvStats");
 try{
  if(!form||!draft||!stat)throw Error("Form or draft area missing");
  function set(id,value){document.getElementById(id).value=value}
  set("wvName","Jordan");set("wvMemory","You waited outside the station with an umbrella");set("wvValue","steady kindness");
  set("wvPromise1","listen when you need me");set("wvPromise2","tell the truth with care");set("wvPromise3","make time for small celebrations");set("wvRepair","apologize without excuses");set("wvFuture","a home with room for friends");
  set("wvTarget","90");set("wvPace","125");
  form.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}));
  if(!draft.value.includes("umbrella")||!draft.value.includes("I promise to listen")||!draft.value.includes("apologize"))issues.push("Vow writer failed");
  if(!stat.textContent.includes("words")||!stat.textContent.includes("seconds"))issues.push("Speaking time missing");
  draft.value+="\nI keep choosing you.";draft.dispatchEvent(new Event("input",{bubbles:true}));
  if(!stat.textContent.includes("words"))issues.push("Editing does not recalculate");
  var image=document.querySelector(".wv-hero-art");
  if(!image||!image.complete||image.naturalWidth<100)issues.push("Image failed to load");
  var widths=getComputedStyle(document.querySelector(".wv-fields")).gridTemplateColumns.split(" ").filter(Boolean);
  if(window.innerWidth<720&&widths.length!==1)issues.push("Mobile form not single-column");
  if(window.innerWidth>=720&&widths.length!==2)issues.push("Desktop form not two-column");
  if(document.querySelector(".wv-article").scrollWidth>document.querySelector(".wv-article").clientWidth+2)issues.push("Article horizontal overflow");
  if(document.querySelectorAll(".wv-section").length!==19)issues.push("Not all H2 sections exist");
  var btn=document.querySelector(".wv-actions button");
  if(btn&&btn.getBoundingClientRect().height<42)issues.push("Tap target too small");
  form.reset();
  if(draft.value!=="")issues.push("Clear did not reset draft");
 }catch(error){issues.push(String(error))}
 var out=document.createElement("pre");out.id="wvBrowserSmoke";out.textContent=JSON.stringify({width:window.innerWidth,issues:issues,successful:issues.length===0});document.body.appendChild(out);
});
</script>`;
const server=http.createServer((req,res)=>{
 const target=new URL(req.url,"http://localhost").pathname;
 const file=path.resolve(root,"."+target,target.endsWith("/")||!path.extname(target)?"index.html":"");
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end("Not found");return}
 const mime={".html":"text/html",".js":"application/javascript",".css":"text/css",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png"};
 res.setHeader("content-type",(mime[path.extname(file)]||"application/octet-stream")+"; charset=utf-8");
 let b=fs.readFileSync(file);
 if(target==="/blog/how-to-write-wedding-vows/")b=Buffer.from(b.toString("utf8").replace("</body>",probe+"</body>"));
 res.end(b);
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const url="http://127.0.0.1:"+server.address().port+"/blog/how-to-write-wedding-vows/";
function render(size){return new Promise((resolve,reject)=>{
 const child=spawn(exe,["--headless=new","--no-sandbox","--disable-dev-shm-usage","--disable-gpu","--no-first-run","--window-size="+size,"--virtual-time-budget=3000","--dump-dom",url],{stdio:["ignore","pipe","pipe"]});
 let stdout="",stderr="";child.stdout.on("data",v=>stdout+=v);child.stderr.on("data",v=>stderr+=v);child.on("error",reject);
 child.on("close",code=>{
   const m=stdout.match(/<pre id="wvBrowserSmoke">([^<]+)<\/pre>/);
   if(!m){reject(Error("No smoke report for "+size+" code="+code+" log="+stderr.slice(-1000)));return}
   try{resolve(JSON.parse(m[1].replaceAll("&quot;",'"').replaceAll("&amp;","&")))}catch(e){reject(Error("Invalid smoke JSON "+m[1]))}
 });
})}
try{
 for(const v of ["375,812","1440,900"]){let report=await render(v);console.log("Wedding vows Chromium",v,JSON.stringify(report));assert.equal(report.successful,true,JSON.stringify(report.issues))}
}finally{server.close()}

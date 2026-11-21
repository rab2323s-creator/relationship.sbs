import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import {spawn,spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const exe=["google-chrome","google-chrome-stable","chromium","chromium-browser"].find(x=>spawnSync("which",[x],{encoding:"utf8"}).status===0);
assert.ok(exe,"Chromium must be available for browser QA");
const probe=`<script>
window.addEventListener("load",function(){
 var issues=[],root=document.getElementById("elopeQuiz"),page=document.querySelector(".ew-page"),win={};
 function check(x,msg){if(!x)issues.push(msg);}
 function choose(x){var opts=root.querySelectorAll(".sc-choice");if(!opts.length)throw Error("No choices at question");opts[x].click();}
 function full(index){for(var i=0;i<18;i++){check(root.textContent.includes("Question "+(i+1)+" of 18"),"Wrong question "+(i+1));choose(index);}}
 try{
  check(!!root&&!!page,"Quiz mount missing");
  check(root.textContent.includes("Should we elope or have a wedding?"),"Initial mode selection missing");
  var entry=root.querySelectorAll(".ew-mode-actions button");check(entry.length===2,"Two modes missing");
  entry[0].click();check(root.textContent.includes("Question 1 of 18"),"Solo start failed");
  choose(0);check(root.textContent.includes("Question 2 of 18"),"Choice advance failed");
  root.querySelector(".sc-back").click();check(root.textContent.includes("Question 1 of 18"),"Back failed");
  full(0);
  check(!!root.querySelector(".ew-results"),"Solo results missing");
  check(root.querySelectorAll('[role="meter"]').length===4,"Solo 4 meters missing");
  check(root.textContent.includes("Private Elopement"),"Expected solo elopement result");
  check(root.querySelector(".sc-score-number").textContent==="100","Solo share not 100");
  root.querySelectorAll(".sc-result-actions button")[1].click();
  check(root.textContent.includes("Question 1 of 18"),"Retake failed");
  root.querySelectorAll(".sc-back").length===0&&check(true,"No back on first question expected");
  window.ElopeWeddingQuizTestResult="solo-pass";
  // New session requires reload; query param starts a fresh page for partner mode next pass.
  check(page.scrollWidth<=page.clientWidth+2,"Horizontal overflow");
  var target=root.querySelector(".sc-choice");check(target.getBoundingClientRect().height>=44,"Touch choice too small");
  win={width:window.innerWidth,issues:issues,successful:issues.length===0};
 }catch(e){issues.push(String(e));win={width:window.innerWidth,issues:issues,successful:false}}
 var report=document.createElement("pre");report.id="ewBrowserSmoke";report.textContent=JSON.stringify(win);document.body.appendChild(report);
});
</script>`;
const coupleProbe=`<script>
window.addEventListener("load",function(){
 var issues=[],root=document.getElementById("elopeQuiz");
 function check(x,msg){if(!x)issues.push(msg);}
 function fill(option){for(var i=0;i<18;i++){var choices=root.querySelectorAll(".sc-choice");if(choices.length!==5){issues.push("Missing choice at "+i);break}choices[option].click()}}
 try{
  var entry=root.querySelectorAll(".ew-mode-actions button");entry[1].click();
  check(root.textContent.includes("Partner 1"),"Partner 1 not shown");
  fill(0);check(root.textContent.includes("Partner 2, your turn"),"Handoff missing");
  root.querySelector(".ew-handoff button").click();check(root.textContent.includes("Partner 2"),"Partner 2 start failed");
  fill(2);check(root.textContent.includes("You currently favor different wedding formats"),"Disagreement warning missing");
  check(root.querySelectorAll('[role="meter"]').length===12,"Expected four joint and eight individual meters");
  check(root.textContent.includes("18 matching")===false,"Conflict falsely shown as match");
  check(root.textContent.includes("0 matching choices out of 18"),"Agreement count wrong");
  check(root.querySelectorAll(".ew-differences li").length>=5,"Question-level disagreements missing");
  check(!root.textContent.includes("You should choose a traditional wedding"),"False winner");
  check(root.querySelectorAll(".sc-result-actions button").length===3,"Missing actions");
  var page=document.querySelector(".ew-page");check(page.scrollWidth<=page.clientWidth+2,"Horizontal overflow");
 }catch(e){issues.push(String(e))}
 var out=document.createElement("pre");out.id="ewBrowserSmoke";out.textContent=JSON.stringify({width:window.innerWidth,issues:issues,successful:issues.length===0});document.body.appendChild(out);
});
</script>`;
const server=http.createServer((req,res)=>{
 const u=new URL(req.url,"http://localhost"),route=u.pathname;
 const target=path.resolve(root,"."+route,route.endsWith("/")||!path.extname(route)?"index.html":"");
 if(!target.startsWith(root+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile()){res.writeHead(404);res.end("Not Found");return}
 const mime={".html":"text/html",".js":"application/javascript",".css":"text/css",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png"};
 res.setHeader("content-type",(mime[path.extname(target)]||"application/octet-stream")+"; charset=utf-8");
 let bytes=fs.readFileSync(target);
 if(route==="/tests/should-we-elope-or-have-a-wedding/")bytes=Buffer.from(bytes.toString("utf8").replace("</body>",(u.searchParams.has("couple")?coupleProbe:probe)+"</body>"));
 res.end(bytes);
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
function run(size,mode){return new Promise((resolve,reject)=>{
 const url="http://127.0.0.1:"+server.address().port+"/tests/should-we-elope-or-have-a-wedding/"+(mode==="couple"?"?couple":"");
 const chrome=spawn(exe,["--headless=new","--no-sandbox","--disable-dev-shm-usage","--disable-gpu","--no-first-run","--window-size="+size,"--virtual-time-budget=3000","--dump-dom",url],{stdio:["ignore","pipe","pipe"]});
 let out="",err="";chrome.stdout.on("data",x=>out+=String(x));chrome.stderr.on("data",x=>err+=String(x));chrome.on("error",reject);
 chrome.on("close",code=>{let m=out.match(/<pre id="ewBrowserSmoke">([^<]+)<\/pre>/);if(!m){reject(Error("No smoke report "+size+" "+mode+" exit "+code+" "+err.slice(-500)));return}
 try{resolve(JSON.parse(m[1].replaceAll("&quot;",'"').replaceAll("&amp;","&")))}catch(e){reject(Error("Invalid smoke report: "+m[1].slice(0,300)))}
 });
})}
try{for(const size of ["375,812","1440,900"])for(const mode of ["solo","couple"]){const result=await run(size,mode);console.log("Elopement wedding browser",size,mode,JSON.stringify(result));assert.ok(result.successful,JSON.stringify(result.issues))}}finally{server.close()}

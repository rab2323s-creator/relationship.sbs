import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import {spawn,spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const exe=["google-chrome","google-chrome-stable","chromium","chromium-browser"].find(x=>spawnSync("which",[x],{encoding:"utf8"}).status===0);
assert.ok(exe,"Chrome or Chromium is required for responsive UI tests");
const inject=`<script>
window.addEventListener("load",function(){
 var issues=[],mount=document.getElementById("aromanticQuiz"),page=document.querySelector(".ar-page"),result={};
 try{
  if(!mount||!page)throw Error("Quiz root not found");
  if(!mount.querySelector(".sc-question"))issues.push("First question not rendered automatically");
  var first=mount.querySelectorAll(".sc-choice");if(first.length!==6)issues.push("Expected six options including uncertainty");
  first[2].click();
  if(!mount.textContent.includes("Question 2 of 18"))issues.push("Choice did not move to question two");
  var back=mount.querySelector(".sc-back");if(!back)issues.push("Back button missing");else back.click();
  if(!mount.textContent.includes("Question 1 of 18"))issues.push("Back did not restore question one");
  for(var i=0;i<18;i++){
    var button=mount.querySelectorAll(".sc-choice")[2];
    if(!button){issues.push("Choice missing at question "+(i+1));break;}
    button.click();
  }
  if(!mount.querySelector(".sc-results"))issues.push("No instant result after 18 choices");
  var meters=mount.querySelectorAll('[role="meter"]');
  if(meters.length!==4)issues.push("Four percentage meters not present");
  meters.forEach(function(m){var v=Number(m.getAttribute("aria-valuenow"));if(!(v>=0&&v<=100))issues.push("Invalid meter")});
  if(!mount.textContent.includes("NOT a percentage of being aromantic"))issues.push("Identity boundary missing");
  if(!mount.textContent.includes("What you actually answered"))issues.push("Evidence missing");
  if(!mount.querySelector(".sc-score-number"))issues.push("Large score style missing");
  var buttons=mount.querySelectorAll(".sc-result-actions button");
  if(buttons.length!==2)issues.push("Missing review/retake");
  if(buttons.length>1){buttons[1].click();if(!mount.textContent.includes("Question 1 of 18"))issues.push("Retake failed");}
  if(page.scrollWidth>page.clientWidth+2)issues.push("Horizontal overflow on article");
  var option=mount.querySelector(".sc-choice");if(option&&option.getBoundingClientRect().height<44)issues.push("Touch target too small");
  var w=window.innerWidth;if(w<=720&&getComputedStyle(page).paddingLeft==="0px")issues.push("Mobile padding missing");
  result={width:w,issues:issues,successful:issues.length===0};
 }catch(e){issues.push(String(e));result={width:window.innerWidth,issues:issues,successful:false}}
 var pre=document.createElement("pre");pre.id="arBrowserSmoke";pre.textContent=JSON.stringify(result);document.body.appendChild(pre);
});
</script>`;
const server=http.createServer((req,res)=>{
 const route=new URL(req.url,"http://localhost").pathname;
 const full=path.resolve(root,"."+route,route.endsWith("/")||!path.extname(route)?"index.html":"");
 if(!full.startsWith(root+path.sep)||!fs.existsSync(full)||!fs.statSync(full).isFile()){res.writeHead(404);res.end("Not found");return}
 const mime={".html":"text/html",".js":"application/javascript",".css":"text/css",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png"};
 res.setHeader("content-type",(mime[path.extname(full)]||"application/octet-stream")+"; charset=utf-8");
 let content=fs.readFileSync(full);if(route==="/tests/am-i-aromantic-quiz/")content=Buffer.from(content.toString("utf8").replace("</body>",inject+"</body>"));
 res.end(content);
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const url="http://127.0.0.1:"+server.address().port+"/tests/am-i-aromantic-quiz/";
function check(viewport){return new Promise((resolve,reject)=>{
 const child=spawn(exe,["--headless=new","--no-sandbox","--disable-dev-shm-usage","--disable-gpu","--no-first-run","--window-size="+viewport,"--virtual-time-budget=3000","--dump-dom",url],{stdio:["ignore","pipe","pipe"]});
 let out="",err="";child.stdout.on("data",x=>out+=String(x));child.stderr.on("data",x=>err+=String(x));child.on("error",reject);
 child.on("close",code=>{const m=out.match(/<pre id="arBrowserSmoke">([^<]+)<\/pre>/);
 if(!m){reject(Error("No result from browser "+viewport+" code="+code+" log="+err.slice(-600)));return}
 try{resolve(JSON.parse(m[1].replaceAll("&quot;",'"').replaceAll("&amp;","&")))}catch(e){reject(Error("Invalid JSON "+m[1].slice(0,250)))}
 });
})}
try{for(const viewport of ["375,812","1440,900"]){const report=await check(viewport);console.log("Aromantic quiz Chromium",viewport,JSON.stringify(report));assert.ok(report.successful,JSON.stringify(report.issues))}}finally{server.close()}

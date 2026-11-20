import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const candidates=["google-chrome","google-chrome-stable","chromium","chromium-browser"];
const exe=candidates.find(name=>spawnSync("which",[name],{encoding:"utf8"}).status===0);
assert.ok(exe,"Chrome/Chromium must be installed for the real browser smoke test");

const inject=`<script>
window.addEventListener("load", function(){
  var issues=[],doc=document.documentElement,article=document.querySelector(".aa-article");
  try{
    var form=document.getElementById("aaExploreForm"),result=document.getElementById("aaResult");
    var topic=document.getElementById("aaTopic"),setting=document.getElementById("aaSetting");
    if(!article||!form||!result||!topic||!setting)throw Error("Article or planner missing");
    topic.value="sexual";setting.value="conversation";
    form.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}));
    if(!result.textContent.includes("Sexual attraction")||!result.textContent.includes("Words you can adapt"))issues.push("Explorer did not render");
    document.getElementById("aaReset").click();
    if(!result.textContent.includes("Start with one distinction"))issues.push("Reset failed");
    var img=document.querySelector(".aa-hero-art");
    if(!img||!img.complete||img.naturalWidth<100)issues.push("Hero artwork not loaded");
    var grid=getComputedStyle(document.querySelector(".aa-controls")).gridTemplateColumns.split(" ").filter(Boolean);
    var mobile=window.innerWidth<720;
    if((mobile&&grid.length!==1)||(!mobile&&grid.length!==2))issues.push("Wrong responsive grid columns: "+grid.length);
    if(article.scrollWidth>article.clientWidth+2)issues.push("Article horizontal overflow");
    var visible=document.querySelector(".aa-answer");
    if(!visible||getComputedStyle(visible).display==="none")issues.push("Main direct answer hidden");
    var button=document.querySelector(".aa-actions button");
    if(button&&button.getBoundingClientRect().height<42)issues.push("Touch target too small");
    if(document.querySelectorAll(".aa-section").length!==19)issues.push("Expected 19 sections");
  }catch(error){issues.push(String(error));}
  var output=document.createElement("pre");output.id="aaBrowserSmoke";
  output.textContent=JSON.stringify({width:window.innerWidth,issues:issues,successful:issues.length===0});
  document.body.appendChild(output);
});
</script>`;
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,"http://localhost"),route=decodeURIComponent(url.pathname);
  const candidate=path.resolve(root,"."+route,(route.endsWith("/")||!path.extname(route))?"index.html":"");
  if(!candidate.startsWith(root+path.sep)||!fs.existsSync(candidate)||!fs.statSync(candidate).isFile()){
    res.writeHead(404);res.end("Not found");return;
  }
  const mime={".html":"text/html",".js":"application/javascript",".css":"text/css",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png"};
  res.setHeader("content-type",(mime[path.extname(candidate)]||"application/octet-stream")+"; charset=utf-8");
  let data=fs.readFileSync(candidate);
  if(route==="/blog/aromantic-vs-asexual/")data=Buffer.from(data.toString("utf8").replace("</body>",inject+"</body>"),"utf8");
  res.end(data);
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const url="http://127.0.0.1:"+server.address().port+"/blog/aromantic-vs-asexual/";

function runBrowser(size){
  return new Promise((resolve,reject)=>{
    const args=["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--no-first-run","--no-default-browser-check","--window-size="+size,"--virtual-time-budget=3000","--dump-dom",url];
    const proc=spawn(exe,args,{stdio:["ignore","pipe","pipe"]});
    let output="",stderr="";
    proc.stdout.on("data",data=>output+=String(data));
    proc.stderr.on("data",data=>stderr+=String(data).slice(0,5000));
    proc.on("error",reject);
    proc.on("close",code=>{
      const m=output.match(/<pre id="aaBrowserSmoke">([^<]+)<\/pre>/);
      if(!m){reject(Error("Chrome did not return smoke report at "+size+" exit="+code+" "+stderr.slice(-600)));return}
      const raw=m[1].replaceAll("&quot;",'"').replaceAll("&amp;","&");
      try{resolve(JSON.parse(raw))}catch(e){reject(Error("Invalid report "+raw.slice(0,250)));}
    });
  });
}
try{
  for(const size of ["375,812","1440,900"]){
    const report=await runBrowser(size);
    console.log("Chrome responsive check",size,JSON.stringify(report));
    assert.ok(report.successful,JSON.stringify(report.issues));
  }
}finally{server.close();}

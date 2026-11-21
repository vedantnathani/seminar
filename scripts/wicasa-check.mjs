import {spawn} from 'node:child_process';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const profile=path.resolve('.taste-skill/wicasa-'+Date.now());await mkdir(profile,{recursive:true});await mkdir('shots/wicasa',{recursive:true});
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--remote-debugging-port=0','--no-first-run','--no-default-browser-check',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));let port,ws;
try{
 for(let i=0;i<100;i++){try{port=(await readFile(path.join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0];break;}catch{await delay(100);}}
 if(!port)throw Error('Chrome did not start');
 const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
 let id=0;const pending=new Map(),errors=[];
 ws.addEventListener('message',ev=>{const d=JSON.parse(ev.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result);}if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails.exception?.description||d.params.exceptionDetails.text);});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result.value;};
 const check=(name,pass)=>{console.log(`${pass?'PASS':'FAIL'} ${name}`);if(!pass)process.exitCode=1;};
 await send('Runtime.enable');await send('Page.enable');
 const url=process.env.TEST_URL||'http://127.0.0.1:4174/wicasa.html';
 for(const [width,height] of [[1366,768],[1440,900],[1920,1080],[390,844]]){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await send('Page.navigate',{url});
  for(let i=0;i<100;i++){if(await evaluate('document.documentElement.dataset.ready==="1"'))break;await delay(80);}
  await evaluate('document.fonts.ready');
  const result=await evaluate(`(async()=>{const failures=[];for(const s of document.querySelectorAll('.scene')){const b=s.querySelector('[data-wc-next]');let phase=0;do{await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const wrap=s.querySelector('.wrap'),bottom=wrap.getBoundingClientRect().bottom-s.getBoundingClientRect().top;if(innerWidth>700&&bottom>innerHeight-66+2)failures.push({scene:+s.dataset.scene+1,phase,bottom});if(!b||b.disabled)break;b.click();phase++;}while(phase<30);}return {failures,sideways:document.documentElement.scrollWidth>innerWidth};})()`);
  check(`all slide states fit at ${width}×${height}`,!result.sideways&&(width<700||!result.failures.length));if(result.failures.length&&width>700)console.log(JSON.stringify(result.failures));
  if(width===1366){
   check('three named speaker templates',await evaluate('document.querySelectorAll(".wc-speakers article").length===3 && document.querySelector(".wc-speakers").textContent.includes("Harsh Kesharwani")'));
   check('exactly three LLM slides',await evaluate('document.querySelectorAll(".scene-wc-learn,.scene-wc-generate,.scene-wc-memory").length===3'));
   check('expense demo and articleship journey removed',await evaluate('!document.querySelector(".scene-workbench,.scene-testing,.scene-story,.scene-showcase,.scene-demo-intro,.scene-build-steps,.scene-before-after,.scene-llm")'));
   check('GST live build before opportunity map',await evaluate('[...document.querySelectorAll(".scene")].findIndex(x=>x.classList.contains("scene-wc-live")) < [...document.querySelectorAll(".scene")].findIndex(x=>x.classList.contains("scene-opportunities"))'));
   await evaluate('document.querySelector("[data-begin]").click()');await send('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});await send('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
   check('Space reveals without leaving the slide',await evaluate('location.hash==="#scene-1" && !document.querySelector(".reveal-stack p").hidden'));
   const space=async()=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});await send('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});};
   const undo=async()=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',modifiers:8,windowsVirtualKeyCode:32});await send('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',modifiers:8,windowsVirtualKeyCode:32});};
   check('older AI explanation slides removed',await evaluate('!document.querySelector(".scene-wc-venn,.scene-wc-agents,.scene-tool-choice,.scene-architecture")'));
   await evaluate('document.querySelector("[data-overview]").click();document.querySelector("[data-scene-link=\\"4\\"]").click();document.querySelector(".scene-wc-hierarchy").dispatchEvent(new Event("reset-scene"));document.activeElement?.blur()');
   for(let i=0;i<3;i++)await space();check('AI family reveals outward-to-inward with Space',await evaluate('document.querySelectorAll(".scene-wc-hierarchy .gst-family-level.revealed").length===4 && !!document.querySelector(".scene-wc-hierarchy .gst-family-note.revealed")'));
   await evaluate('document.querySelector("[data-overview]").click();document.querySelector("[data-scene-link=\\"6\\"]").click();document.querySelector(".scene-wc-learn").dispatchEvent(new Event("reset-scene"));document.activeElement?.blur()');
   await space();check('Space enters tokenisation',await evaluate('!!document.querySelector(".scene-wc-learn .tokenisation-stage[data-step=\\"0\\"]")'));
   for(let i=0;i<4;i++)await space();check('Space zooms, splits and assigns token IDs',await evaluate('!!document.querySelector(".scene-wc-learn .tokenisation-stage[data-step=\\"4\\"]") && location.hash==="#scene-6"'));
   await space();check('Space progresses from tokenisation into training',await evaluate('document.querySelector(".scene-wc-learn .wc-llm-phase").textContent.includes("TRAINING")'));
   await undo();check('Shift Space restores the last tokenisation state across phase boundaries',await evaluate('document.querySelector(".scene-wc-learn .tokenisation-stage")?.dataset.step==="4"'));await space();
   for(let i=0;i<3;i++)await space();check('training visibly adjusts connections',await evaluate('document.querySelector(".scene-wc-learn .wc-llm-stage").classList.contains("adjusted")'));
   await send('Page.bringToFront');await send('Input.dispatchKeyEvent',{type:'keyDown',key:'f',code:'KeyF'});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'f',code:'KeyF'});await delay(700);
   check('fullscreen keeps animated slide above the controls',await evaluate('!!document.fullscreenElement && document.querySelector(".scene-wc-learn .wrap").getBoundingClientRect().bottom <= document.querySelector(".presentation-nav").getBoundingClientRect().top'));
   const trainingShot=await send('Page.captureScreenshot',{format:'png'});await writeFile('shots/wicasa/training-fullscreen.png',Buffer.from(trainingShot.data,'base64'));
   await evaluate('document.fullscreenElement && document.exitFullscreen()');
   await evaluate('document.querySelector("[data-overview]").click();document.querySelector("[data-scene-link=\\"7\\"]").click();document.querySelector(".scene-wc-generate").dispatchEvent(new Event("reset-scene"));document.activeElement?.blur()');
   for(let i=0;i<4;i++)await space();
   check('Space progresses from attention into output generation',await evaluate('document.querySelector(".scene-wc-generate .wc-llm-phase").textContent.includes("GENERATE THE OUTPUT")'));
   for(let i=0;i<4;i++)await space();
   check('Space builds the complete generated sentence on the same slide',await evaluate('document.querySelector(".scene-wc-generate .neural-input p").textContent==="A cup of tea is warm." && location.hash==="#scene-7"'));
   await undo();check('Shift Space removes the last output generation step',await evaluate('document.querySelector(".scene-wc-generate .neural-input p").textContent==="A cup of tea …"'));await space();
   await evaluate('document.querySelector("[data-overview]").click();document.querySelector("[data-scene-link=\\"5\\"]").click()');await delay(200);
   check('exactly one clear three-column difference slide',await evaluate('document.querySelectorAll(".scene-wc-difference").length===1 && document.querySelectorAll(".wc-difference-table article").length===3'));
   const comparisonShot=await send('Page.captureScreenshot',{format:'png'});await writeFile('shots/wicasa/difference.png',Buffer.from(comparisonShot.data,'base64'));
   const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile('shots/wicasa/hierarchy.png',Buffer.from(shot.data,'base64'));
   await evaluate('document.querySelector("[data-presenter]").click()');await delay(400);
   const pages=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();check('separate WICASA presenter window',pages.some(p=>p.url.includes('presenter.html?deck=wicasa')));
  }
 }
 check('no runtime errors',errors.length===0);if(errors.length)console.log(errors);
 await send('Browser.close');
}finally{ws?.close();chrome.kill();}

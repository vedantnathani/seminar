import './wicasa-gst.css';

const example='THE OFFICE-ASSISTANT ANALOGY / PREPARE APRIL’S GST REVIEW FOLDER';
const plans={
 'wc-venn':[
  ['Meet your office assistant','You need April’s GST review folder. Start by giving the assistant an exact checklist: download, save, check the file.'],
  ['1. Automation = the checklist follower','The assistant follows the steps you already wrote. Software can do the same work repeatedly with less manual effort.'],
  ['You also write the “if this, then that” rules','For this checklist: if the file is missing, stop and flag it. You could instead program a retry. Automation can have many branches.'],
  ['2. AI = the language interpreter','Now give the assistant a note: “April file still pending.” An AI model suggests what it means. Interpreting the note does not download the file.'],
  ['Combine the two roles','Automation checks whether the file exists. AI helps draft a readable explanation. You still check the facts before using it.'],
  ['How can we build automation?','Excel VBA macros, Python scripts, browser apps using HTML + JavaScript, and workflow tools can all automate work. HTML provides the page; JavaScript runs the browser logic.']
 ],
 'wc-hierarchy':[
  ['Artificial intelligence','For the same April pack, interpreting the unclear note is an example of an AI task. AI is the broad field.'],
  ['Machine learning','One way to build AI is to train models on examples, rather than handwrite every interpretation rule.'],
  ['Deep learning','Some machine-learning models use neural networks with many processing layers. This is deep learning.'],
  ['Large language models','An LLM is a deep-learning model trained to work with language. It can draft an interpretation of the note.'],
  ['A family of concepts','AI contains more than LLMs. A fixed download checklist can work without any of these models.']
 ],
 'wc-agents':[
  ['3. AI agent = the assistant with a goal and tools','Say: “Prepare April’s complete review folder.” Give it approved tools and limits. The model helps choose the next action while working.'],
  ['First, find out what is there','The assistant chooses the folder-inspection tool. An AI answer alone would only tell you what to do; the agent can call an allowed tool.'],
  ['Look at what the tool reports','The April file is missing. The model receives that result before choosing what to do next.'],
  ['Choose a useful next action','Here it selects an allowed download retry and checks again. Retrying alone is not what makes it an agent: a normal script can retry too.'],
  ['Stay within the permission given','The file is now present in this example. The assistant prepares the folder, then pauses: you required approval before sending.'],
  ['Who chooses the next step?','In ordinary automation, you encode the decision rules beforehand. In an AI agent, a model helps select actions during the task, within the workflow and permissions you designed.'],
  ['The coding language is not the difference','Both can use VBA, Python or web tools. AI can help you write an ordinary automation. It becomes an AI agent when a model participates in selecting and carrying out allowed actions.']
 ]
};

export function wicasaGstHTML(type){return plans[type]?`<div class="wc-gst-lesson"><div class="wc-gst-example">${example}</div><div class="wc-gst-stage"></div><div class="wc-gst-narration" aria-live="polite"></div><div class="wc-gst-progress"></div></div><button data-wc-next>Next animation →</button><small class="wc-gst-disclaimer">Conceptual demonstration · not a claim about GST Fetcher’s implementation</small>`:null;}

const file=(label,kind='')=>`<div class="gst-file ${kind}"><span aria-hidden="true">≡</span><b>${label}</b></div>`;
const buildTools=()=>'<div class="gst-build-tools"><span>Excel<br><b>VBA</b></span><span>Scripts<br><b>Python</b></span><span>Browser apps<br><b>HTML + JavaScript</b></span></div><p class="gst-build-note">A tool can run fixed rules even if AI helped write its code.</p>';
const instructions=()=>'<div class="gst-instructions"><article><small>AUTOMATION / YOU WRITE THE ROUTE</small><h3>“Follow this checklist.”</h3><p>Check folder → if missing, retry once → if still missing, flag → otherwise prepare pack.</p></article><article><small>AI AGENT / YOU GIVE A GOAL + LIMITS</small><h3>“Prepare the review folder.”</h3><p>Use a model to choose from approved tools, inspect results, then select another action or ask for help.</p></article></div>';
function conveyor(step){return `<div class="gst-conveyor"><div class="gst-lane ${step>=1?'running':''}"><div class="gst-task">Download</div><span class="gst-track">→</span><div class="gst-task">Save files</div><span class="gst-track">→</span><div class="gst-task ${step===2?'gst-stopped':''}">Check file</div></div><div class="gst-artifacts">${file('April download request',step>=1?'arrived':'waiting')}<div class="gst-note ${step>=3?'interpreted':''}"><small>THE SAME NOTE</small><p>“April file still pending.”</p>${step>=3?'<span class="gst-reading-line"></span><b>AI suggestion: April file may be unavailable.</b>':''}</div></div><div class="gst-result ${step>=2?'shown':''}">${step===2?'STOP · Expected file not found → flag for review':step===3?'INTERPRET · A language suggestion, subject to verification':step>=4?'TOGETHER · File checks + an AI-drafted explanation':'PREDEFINED STEPS · The workflow follows the instructions it was given.'}</div></div>`;}
function family(step){const names=['Artificial intelligence','Machine learning','Deep learning','Large language models'];return `<div class="gst-family">${names.map((n,i)=>`<div class="gst-family-level ${step>=i?'revealed':''} ${step===i?'focused':''}"><span>${n}</span>`).join('')}<div class="gst-family-note ${step>=3?'revealed':''}">“April file still pending.”<b>→ Suggested meaning for review</b></div>${names.map(()=>'</div>').join('')}</div>`;}
function agent(step){const active=step===0?'goal':step<=2?'inspect':step===3?'download':'approval';return `<div class="gst-agent-stage"><div class="gst-goal ${active==='goal'?'active':''}"><small>GOAL</small>April review pack</div><div class="gst-agent-orb ${step>0?'active':''}"><span>Observe</span><strong>Choose</strong><span>Act ↻</span></div><div class="gst-tools"><div class="${active==='inspect'?'active':''}"><small>TOOL 01</small>Inspect folder ${step===2?'<b>Result: April file missing</b>':''}</div><div class="${active==='download'?'active':''}"><small>TOOL 02</small>Retry download ${step>=4?'<b>Result: file now present</b>':''}</div><div class="${active==='approval'?'active':''}"><small>HUMAN CHECKPOINT</small>${step>=4?'Pack ready · awaiting approval':'Draft → request approval'}<b>Sending is paused</b></div></div></div>`;}

export function mountWicasaGst(scene){
 const type=Object.keys(plans).find(t=>scene.classList.contains('scene-'+t));if(!type)return false;
 const lesson=scene.querySelector('.wc-gst-lesson'),stage=lesson.querySelector('.wc-gst-stage'),narration=lesson.querySelector('.wc-gst-narration'),progress=lesson.querySelector('.wc-gst-progress'),button=scene.querySelector('[data-wc-next]');let step=0;
 function fit(){const wrap=scene.querySelector('.wrap');wrap.style.zoom='';if(innerWidth>700){const room=innerHeight-182;const h=wrap.getBoundingClientRect().height;if(h>room)wrap.style.zoom=String(room/h);}}
 function show(){lesson.dataset.gstStep=step;stage.innerHTML=type==='wc-venn'?(step===5?buildTools():conveyor(step)):type==='wc-hierarchy'?family(step):step===0||step===5?instructions():step===6?buildTools():agent(step);const [title,text]=plans[type][step];narration.innerHTML=`<strong>${title}</strong><p>${text}</p>`;progress.textContent=`${step+1} / ${plans[type].length} · SPACE TO CONTINUE`;button.disabled=step===plans[type].length-1;if(button.disabled)progress.textContent=`${step+1} / ${plans[type].length} · COMPLETE · → NEXT SLIDE`;requestAnimationFrame(fit);}
 button.onclick=()=>{if(step<plans[type].length-1){step++;show();}};
 scene.undoAnimation=()=>{if(!step)return false;step--;show();return true;};
 scene.addEventListener('reset-scene',()=>{step=0;show();});window.addEventListener('resize',fit);document.addEventListener('fullscreenchange',()=>requestAnimationFrame(fit));document.fonts.ready.then(fit);show();return true;
}

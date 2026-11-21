import './wicasa-gst.css';

const example='ONE EXAMPLE / PREPARE APRIL’S GST RECORDS FOR REVIEW';
const plans={
 'wc-venn':[
  ['The assignment','Prepare April’s GST records for the reviewer. A note says: “April file still pending.”'],
  ['Automation / follow the checklist','Run the predefined steps: download the records, save the files, then check whether the expected file exists.'],
  ['A fixed stop condition','The file is missing. The automation stops and flags the gap because that is what its rule says.'],
  ['AI / interpret the words','AI reads “April file still pending” and suggests: “The April file may not be available yet.” Verify the suggestion.'],
  ['Working together','An automated workflow can use that AI suggestion to prepare a review note. The fixed file check still determines whether the file is present.']
 ],
 'wc-hierarchy':[
  ['Artificial intelligence','For the same April pack, interpreting the unclear note is an example of an AI task. AI is the broad field.'],
  ['Machine learning','One way to build AI is to train models on examples, rather than handwrite every interpretation rule.'],
  ['Deep learning','Some machine-learning models use neural networks with many processing layers. This is deep learning.'],
  ['Large language models','An LLM is a deep-learning model trained to work with language. It can draft an interpretation of the note.'],
  ['A family of concepts','AI contains more than LLMs. A fixed download checklist can work without any of these models.']
 ],
 'wc-agents':[
  ['Agent / give a goal and limits','Goal: prepare April’s review pack. Allowed: inspect the folder, retry a download, draft a note. Sending requires approval.'],
  ['Choose an allowed tool','The agent selects “Inspect folder” to find out which records are available.'],
  ['Observe the result','The tool reports that the April file is missing. The agent uses that result to choose its next action.'],
  ['Choose the next action','The model selects an allowed download retry, then checks again. A fixed workflow can retry too; the model-driven choice is the distinction here.'],
  ['Review before delivery','In this teaching example the file is now present. The agent prepares the pack and pauses for human approval before sending.'],
  ['The difference to remember','Automation follows a predefined flow. AI interprets information. An AI agent uses a model to select allowed actions, inspect results and continue toward a goal.']
 ]
};

export function wicasaGstHTML(type){return plans[type]?`<div class="wc-gst-lesson"><div class="wc-gst-example">${example}</div><div class="wc-gst-stage"></div><div class="wc-gst-narration" aria-live="polite"></div><div class="wc-gst-progress"></div></div><button data-wc-next>Next animation →</button><small class="wc-gst-disclaimer">Conceptual demonstration · not a claim about GST Fetcher’s implementation</small>`:null;}

const file=(label,kind='')=>`<div class="gst-file ${kind}"><span aria-hidden="true">≡</span><b>${label}</b></div>`;
function conveyor(step){return `<div class="gst-conveyor"><div class="gst-lane ${step>=1?'running':''}"><div class="gst-task">Download</div><span class="gst-track">→</span><div class="gst-task">Save files</div><span class="gst-track">→</span><div class="gst-task ${step===2?'gst-stopped':''}">Check file</div></div><div class="gst-artifacts">${file('April download request',step>=1?'arrived':'waiting')}<div class="gst-note ${step>=3?'interpreted':''}"><small>THE SAME NOTE</small><p>“April file still pending.”</p>${step>=3?'<span class="gst-reading-line"></span><b>AI suggestion: April file may be unavailable.</b>':''}</div></div><div class="gst-result ${step>=2?'shown':''}">${step===2?'STOP · Expected file not found → flag for review':step===3?'INTERPRET · A language suggestion, subject to verification':step>=4?'TOGETHER · File checks + an AI-drafted explanation':'PREDEFINED STEPS · The workflow follows the instructions it was given.'}</div></div>`;}
function family(step){const names=['Artificial intelligence','Machine learning','Deep learning','Large language models'];return `<div class="gst-family">${names.map((n,i)=>`<div class="gst-family-level ${step>=i?'revealed':''} ${step===i?'focused':''}"><span>${n}</span>`).join('')}<div class="gst-family-note ${step>=3?'revealed':''}">“April file still pending.”<b>→ Suggested meaning for review</b></div>${names.map(()=>'</div>').join('')}</div>`;}
function agent(step){const active=step===0?'goal':step<=2?'inspect':step===3?'download':'approval';return `<div class="gst-agent-stage"><div class="gst-goal ${active==='goal'?'active':''}"><small>GOAL</small>April review pack</div><div class="gst-agent-orb ${step>0?'active':''}"><span>Observe</span><strong>Choose</strong><span>Act ↻</span></div><div class="gst-tools"><div class="${active==='inspect'?'active':''}"><small>TOOL 01</small>Inspect folder ${step===2?'<b>Result: April file missing</b>':''}</div><div class="${active==='download'?'active':''}"><small>TOOL 02</small>Retry download ${step>=4?'<b>Result: file now present</b>':''}</div><div class="${active==='approval'?'active':''}"><small>HUMAN CHECKPOINT</small>${step>=4?'Pack ready · awaiting approval':'Draft → request approval'}<b>Sending is paused</b></div></div></div>`;}

export function mountWicasaGst(scene){
 const type=Object.keys(plans).find(t=>scene.classList.contains('scene-'+t));if(!type)return false;
 const lesson=scene.querySelector('.wc-gst-lesson'),stage=lesson.querySelector('.wc-gst-stage'),narration=lesson.querySelector('.wc-gst-narration'),progress=lesson.querySelector('.wc-gst-progress'),button=scene.querySelector('[data-wc-next]');let step=0;
 function fit(){const wrap=scene.querySelector('.wrap');wrap.style.zoom='';if(innerWidth>700){const room=innerHeight-182;const h=wrap.getBoundingClientRect().height;if(h>room)wrap.style.zoom=String(room/h);}}
 function show(){lesson.dataset.gstStep=step;stage.innerHTML=type==='wc-venn'?conveyor(step):type==='wc-hierarchy'?family(step):agent(step);const [title,text]=plans[type][step];narration.innerHTML=`<strong>${title}</strong><p>${text}</p>`;progress.textContent=`${step+1} / ${plans[type].length} · SPACE TO CONTINUE`;button.disabled=step===plans[type].length-1;if(button.disabled)progress.textContent=`${step+1} / ${plans[type].length} · COMPLETE · → NEXT SLIDE`;requestAnimationFrame(fit);}
 button.onclick=()=>{if(step<plans[type].length-1){step++;show();}};
 scene.addEventListener('reset-scene',()=>{step=0;show();});window.addEventListener('resize',fit);document.addEventListener('fullscreenchange',()=>requestAnimationFrame(fit));document.fonts.ready.then(fit);show();return true;
}

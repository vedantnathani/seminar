import {mountLesson} from './llm-visuals.js';
import './wicasa-llm.css';
import './wicasa-llm-shared.css';

const plans={
 'wc-learn':[
  {label:'01 / THE IDEA',html:'<div class="wc-history">2017 · Transformer → 2018 · GPT → 2022 · ChatGPT</div><h3>A Large Language Model learns language patterns.</h3><p>GPT means Generative Pre-trained Transformer. First, text must become something the model can process.</p>'},
  {label:'02 / TOKENISATION',lesson:'tokens'},
  {label:'03 / TRAINING',lesson:'training'},
  {label:'04 / THE TAKEAWAY',html:'<h3>Predict → compare → adjust → repeat.</h3><p>The learned numerical settings are <b>parameters</b>. Training adjusts them across many examples.</p><p>Next, use those learned patterns to generate a response.</p>'}
 ],
 'wc-generate':[
  {label:'01 / PROMPT + CONTEXT',html:'<h3>“Complete this: A cup of…”</h3><p>The <b>prompt</b> gives the task. The <b>context window</b> holds the information available for the response.</p>'},
  {label:'02 / ATTENTION',lesson:'attention'},
  {label:'03 / GENERATE THE OUTPUT',lesson:'generation'},
  {label:'04 / THE TAKEAWAY',html:'<h3>Choose a token. Add it. Predict again.</h3><p>This is <b>generation</b>. Using a trained model is <b>inference</b>; it does not automatically change the trained settings.</p>'}
 ],
 'wc-memory':[
  {label:'01 / LEARNED SKILLS',html:'<div class="wc-memory-scene"><div class="wc-skill-orb">Learned<br>patterns</div><div class="wc-desk"><span>The apprentice’s desk</span><p>Ready for today’s assignment.</p></div></div><p>Training shapes the model’s parameters before this conversation.</p>'},
  {label:'02 / CONTEXT ON THE DESK',html:'<div class="wc-desk"><span>CONTEXT / AVAILABLE NOW</span><div class="wc-paper-set"><div>Bakery client</div><div>Tuesday → Thursday</div><div>Under 100 words</div></div></div><p>A good prompt puts the <b>task, facts and output format</b> on the desk.</p>'},
  {label:'03 / OPTIONAL SAVED NOTES',html:'<div class="wc-memory-scene"><div class="wc-notebook">Saved note<br><b>Simple English</b></div><span class="wc-note-arrow">→</span><div class="wc-desk"><span>NEW CONVERSATION</span><div class="wc-paper-set"><div>Simple English</div></div><p>Where are the client and delivery details?</p></div></div><p>An application may retrieve saved notes. Important facts may still be missing. This does not retrain the model.</p>'},
  {label:'04 / LIMITATIONS + REVIEW',html:'<div class="wc-limitations"><article><h3>Missing context</h3><p>Reconfirm critical facts. Even available details can be missed.</p></article><article><h3>Hallucination</h3><p>Verify unsupported claims and invented details.</p></article><article><h3>Sycophancy</h3><p>Ask it to challenge your assumptions.</p></article></div><p><b>Task → relevant facts → format → verify.</b> Clear instructions help; they do not guarantee accuracy.</p>'}
 ]
};
export function wicasaLlmHTML(type){return plans[type]?'<div class="wc-llm-animation"><div class="wc-llm-phase" aria-live="polite"></div><div class="wc-llm-stage"></div></div><button data-wc-next>Next animation <span aria-hidden="true">→</span></button><span class="wc-llm-help">SPACE · NEXT STEP</span>':null;}
export function mountWicasaLlm(scene){
 const type=Object.keys(plans).find(t=>scene.classList.contains('scene-'+t));if(!type)return false;
 const plan=plans[type],stage=scene.querySelector('.wc-llm-stage'),label=scene.querySelector('.wc-llm-phase'),button=scene.querySelector('[data-wc-next]');let phase=0,next=null,substep=0,lessonOptions={};const history=[];
 function fit(){
  const wrap=scene.querySelector('.wrap');wrap.style.zoom='';
  if(innerWidth>700){const room=innerHeight-100-82;const size=wrap.getBoundingClientRect().height;if(size>room)wrap.style.zoom=String(room/size);}
 }
 function show(instant=false){const item=plan[phase];substep=0;label.textContent=item.label;stage.classList.remove('adjusted','feedback','tokenisation-visual');stage.innerHTML=item.html||'';lessonOptions={instant};next=item.lesson?mountLesson(stage,item.lesson,lessonOptions):null;button.disabled=phase===plan.length-1;requestAnimationFrame(fit);}
 button.onclick=()=>{const before={phase,substep};if(next?.()){history.push(before);substep++;requestAnimationFrame(fit);return;}if(phase<plan.length-1){history.push(before);phase++;show();}};
 scene.undoAnimation=()=>{const previous=history.pop();if(!previous)return false;phase=previous.phase;show(true);for(let i=0;i<previous.substep;i++)next?.();lessonOptions.instant=false;substep=previous.substep;requestAnimationFrame(fit);return true;};
 scene.addEventListener('reset-scene',()=>{phase=0;history.length=0;show();});window.addEventListener('resize',fit);document.addEventListener('fullscreenchange',()=>requestAnimationFrame(fit));document.fonts.ready.then(fit);show();return true;
}

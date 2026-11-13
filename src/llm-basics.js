import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import {animate, stagger} from 'motion';
import './styles/llm-basics.css';
import {mountLesson} from './components/llm-visuals.js';

const originalSlides=[
{tag:'THE PAPER / 2017',title:'Attention is<br><em>all you need.</em>',body:'A research paper introduced a new way for machines to work with language.',reveal:'Its name: the Transformer.',note:'Ask the room if they have heard of the paper. Explain that it introduced the Transformer architecture, not ChatGPT itself.'},
{tag:'THE QUESTION',title:'Who took this idea<br><em>into the world?</em>',body:'One company used Transformers to build a family of models called GPT. Take a guess.',reveal:'OpenAI → GPT → ChatGPT',note:'Let the audience guess. OpenAI was founded in 2015, before the paper. GPT followed in 2018; ChatGPT launched in 2022.'},
{tag:'THE TIMELINE',title:'A paper. A model.<br><em>A conversation.</em>',body:'2017 · Transformer paper &nbsp;&nbsp; → &nbsp;&nbsp; 2018 · GPT &nbsp;&nbsp; → &nbsp;&nbsp; 2022 · ChatGPT',reveal:'The paper was a foundation. Many teams built on it.',note:'The paper was authored by researchers at Google. OpenAI was one of many organisations to build on Transformers.'},
{tag:'THE BIG QUESTION',title:'So what is an<br><em>LLM?</em>',body:'A Large Language Model is a computer model trained on lots of examples of language.',reveal:'It learns patterns that help it generate useful responses.',note:'Large refers broadly to the scale of the model and training. Language is what it works with. A model is a system of learned numerical settings.'},
{tag:'A SIMPLE ANALOGY',title:'Think of an<br><em>eager apprentice.</em>',visual:'apprentice',body:'It has studied an enormous number of examples. You give it a task; it produces a response.',reveal:'The cycle is simple: predict, compare, adjust. Next, see how that works during training.',note:'An analogy is not a claim that the model is a person, has experiences, or understands exactly like a human.'},
{tag:'THE INGREDIENTS',title:'Words become<br><em>pieces.</em>',body:'The model does not see words quite as we do. It works with small pieces of text called tokens.',visual:'tokens',reveal:'A token can be a word, part of a word, punctuation or a space.',note:'Token boundaries vary by tokenizer. The displayed split is a teaching illustration.'},
{tag:'BEFORE THE CHAT',title:'First, it <em>trains.</em>',body:'During training, the model sees examples and repeatedly tries to predict missing or next pieces.',visual:'training',reveal:'When its prediction is off, its internal settings are adjusted. This repeats many times.',note:'This simplified animation illustrates pretraining. Training approaches differ across models; the model does not simply store a book of answers.'},
{tag:'WHAT IS LEARNED?',title:'The settings it<br><em>learned to adjust.</em>',body:'Those adjusted settings are called parameters. Together, they capture patterns learned during training.',reveal:'Billions of settings can contribute to a single prediction.',note:'Models may memorise some training material; the library analogy is a simplification, not a guarantee against memorisation.'},
{tag:'THE TRANSFORMER',title:'Attention gives<br><em>context.</em>',body:'In “The animal didn’t cross the road because it was tired,” what does “it” refer to?',visual:'attention',reveal:'Attention helps the model relate pieces of text to other relevant pieces.',note:'Ask the audience to answer. Attention calculates relationships between tokens; the example is an intuition, not a literal view of one attention head.'},
{tag:'YOUR TURN TO ASK',title:'You type a<br><em>prompt.</em>',body:'A prompt is the instruction or question you give the model.',reveal:'“Explain inflation to a 12-year-old, using a cricket example.”',note:'Show how an audience, task and example help clarify what the user wants.'},
{tag:'THE RESPONSE',title:'Then it generates<br><em>one piece at a time.</em>',body:'The model estimates what token could come next. It chooses one, adds it, and repeats.',visual:'generation',reveal:'A sentence emerges piece by piece. This is generative AI in action.',note:'Token selection depends on the model and decoding settings. The animation uses an illustrative fixed sentence, not a live model.'},
{tag:'A USEFUL DISTINCTION',title:'Training and chatting<br><em>are different moments.</em>',body:'Training changes the model’s settings. Generating uses those learned settings to respond to your current input.',reveal:'A chat can use context without automatically retraining the model.',note:'Some products may use conversations to improve future models depending on settings and policy. That is separate from generating a reply.'},
{tag:'CONTEXT WINDOW',title:'A desk with<br><em>limited space.</em>',body:'The context window is the amount of text and other input the model can consider at once.',reveal:'If important details do not fit or are missing, the answer may suffer.',note:'It is a useful analogy, not a perfect description of every model implementation. Context limits vary by model.'},
{tag:'HALLUCINATION',title:'Fluent does not<br><em>mean factual.</em>',body:'A hallucination is when an AI produces information that is false or unsupported as if it were true.',reveal:'A convincing citation can still be invented. Check the source.',note:'Example: a model might confidently name a court case that does not exist. Never present this as an actual case.'},
{tag:'SYCOPHANCY',title:'When the machine<br><em>agrees too much.</em>',body:'Sycophancy is when a model echoes or agrees with a user in a misleading way.',reveal:'Ask: “What evidence could prove me wrong?”',note:'Demonstrate with an obviously questionable assumption. Explain that models can still challenge users; behaviour varies.'},
{tag:'WHAT IT CAN AND CANNOT DO',title:'A brilliant draft.<br><em>Your judgment.</em>',body:'Use it to explore, explain, organise and draft. Verify important facts, calculations and sources.',reveal:'For sensitive or consequential work, keep a human in the loop.',note:'Invite examples from the room: a draft email, a calculation, a client decision. Explain why verification differs.'},
{tag:'THE RECAP',title:'Now you know<br><em>what happens.</em>',body:'Training: text → tokens → predictions → feedback → adjusted parameters. Using it: prompt + context → next-token predictions → response.',reveal:'The machine predicts. You decide what to trust.',note:'Ask the audience to explain the journey back in their own words.'},
{tag:'THE NEXT QUESTION',title:'What will you<br><em>build with it?</em>',body:'Start with one task. Give context. Inspect the answer. Improve your next question.',reveal:'Curiosity is the best place to begin.',note:'Close by inviting questions. Return to the library for the workflow seminar.'}
];
const visuals={tokens:'<div class="token-row"><span>un</span><span>believ</span><span>able</span><span>!</span></div><small>AN ILLUSTRATIVE TOKEN SPLIT</small>',training:'<div class="flow"><span>EXAMPLES</span><i>→</i><span>GUESS</span><i>→</i><span>FEEDBACK</span><i>→</i><span>ADJUST</span><i>↻</i></div>',attention:'<div class="attention-example">The <strong>animal</strong> didn’t cross the road because <strong>it</strong> was tired.<div class="attention-link">↖ &nbsp; connected by context &nbsp; ↗</div></div>',generation:'<div class="generated"><span>The</span><span> answer</span><span> appears</span><span> piece</span><span> by</span><span> piece.</span></div><small>ILLUSTRATIVE OUTPUT</small>'};
const teachingTerms=['Transformer','GPT · Generative Pre-trained Transformer','Transformer → GPT → ChatGPT','LLM · Large Language Model','Learning from examples','Tokenisation · Tokens · Token IDs','Pretraining','Parameters','Attention','Prompt','Generation · Next-token prediction','Training vs inference','Context window','Hallucination','Sycophancy','Human oversight','The LLM pipeline','Applying what you learned'];
// Keep each slide's terminology attached while changing its teaching order.
originalSlides.forEach((slide,i)=>slide.term=teachingTerms[i]);
const teachingOrder=[0,1,2,3,5,4,6,7,8,9,12,10,11,13,14,15,16,17];
const slides=teachingOrder.map(i=>originalSlides[i]);
const chapters=['01 / THE STORY','01 / THE STORY','01 / THE STORY','02 / THE BIG IDEA','03 / TEXT INTO NUMBERS','04 / HOW LEARNING WORKS','04 / HOW LEARNING WORKS','04 / HOW LEARNING WORKS','05 / CONNECTING THE CONTEXT','06 / ASKING AND GENERATING','06 / ASKING AND GENERATING','06 / ASKING AND GENERATING','06 / ASKING AND GENERATING','07 / WHERE IT GOES WRONG','07 / WHERE IT GOES WRONG','08 / USING YOUR JUDGMENT','09 / PUTTING IT TOGETHER','09 / PUTTING IT TOGETHER'];
const bridges=[
 'Now meet one company that built on this research.',
 'Place the paper, GPT and ChatGPT on a timeline.',
 'Now explain what a language model actually is.',
 'Before it can learn from text, the text must become numbers.',
 'Now that text has become tokens, watch how examples teach the model.',
 'Move from the apprentice analogy to a real training example.',
 'What changed inside the model? Its parameters.',
 'How does the model connect different parts of a sentence? Attention.',
 'The model has learned patterns. Now a person gives it a task.',
 'The prompt and conversation need room: introduce the context window.',
 'With the prompt in context, watch the response appear token by token.',
 'Pause to separate learning during training from using the model during inference.',
 'A fluent answer can still be false. Introduce hallucination.',
 'Another failure: agreeing with the user too readily.',
 'Now turn those limitations into a practical way of using the model.',
 'Ask the room to explain the complete journey back to you.',
 'Finish by asking what task they will try first.',
 'Invite questions and return to the seminar library.'
];
let index=0,revealed=false,nextVisual=null; const root=document.querySelector('#deck');
root.innerHTML=`<header><a href="/">← Seminar library</a><span>LLM BASICS <b>/</b> BEGINNER</span><button id="fullscreen" aria-label="Toggle fullscreen">⛶</button></header><main id="stage" aria-live="polite"></main><footer><div class="slide-context"><span id="counter"></span><span class="term-hint" id="term-hint"></span></div><span class="hint">SPACE · REVEAL &nbsp; / &nbsp; ← → · SLIDES &nbsp; / &nbsp; N · NOTES</span><div><button id="prev" aria-label="Previous slide">←</button><button id="next" aria-label="Next slide">→</button></div></footer><span class="watermark">@vedant_nathani</span><dialog id="notes"><button id="close-notes">Close ×</button><p>PRESENTER NOTES</p><div id="notes-text"></div></dialog>`;
const stage=document.querySelector('#stage');
function fitSlide(){
 const section=stage.querySelector('section');if(!section)return;
 const available=innerHeight-document.querySelector('header').offsetHeight-document.querySelector('footer').offsetHeight-36;
 const scale=innerWidth>700?Math.min(1,available/section.offsetHeight):1;
 stage.style.setProperty('--slide-scale',String(scale));
}
window.addEventListener('resize',fitSlide);
document.addEventListener('fullscreenchange',()=>requestAnimationFrame(fitSlide));
document.fonts.ready.then(fitSlide);

function show(n){index=Math.max(0,Math.min(slides.length-1,n));revealed=false;const s=slides[index];stage.innerHTML=`<section><div class="tag">SLIDE ${String(index+1).padStart(2,'0')} / ${slides.length} <span class="chapter-divider">·</span> ${chapters[index].replace(/^\d+ \/ /,'')}</div><h1>${s.title}</h1><p class="body">${s.body}</p>${s.visual?`<div class="visual">${visuals[s.visual]||''}</div>`:''}<div class="reveal" hidden>${s.reveal}</div><button class="reveal-button">Reveal the next idea <span>↗</span></button></section>`;nextVisual=s.visual?mountLesson(stage.querySelector('.visual'),s.visual):null;stage.classList.toggle('has-lesson',!!nextVisual);document.querySelector('#counter').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;document.querySelector('#term-hint').textContent='TERM TO INTRODUCE · '+s.term;document.querySelector('#prev').disabled=index===0;document.querySelector('#next').disabled=index===slides.length-1;document.querySelector('#notes-text').textContent=s.note+' Next transition: '+bridges[index];history.replaceState(null,'',`#slide-${index+1}`);requestAnimationFrame(fitSlide);stage.querySelector('.reveal-button').onclick=reveal;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)animate(stage.querySelectorAll('.tag,h1,.body,.visual'),{opacity:[0,1],transform:['translateY(16px)','translateY(0)']},{duration:.55,delay:stagger(.08)});}
function reveal(){if(nextVisual?.()){requestAnimationFrame(fitSlide);return;}if(revealed)return;revealed=true;const el=stage.querySelector('.reveal');el.hidden=false;requestAnimationFrame(fitSlide);stage.querySelector('.reveal-button').hidden=true;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){animate(el,{opacity:[0,1],transform:['translateY(12px)','translateY(0)']},{duration:.5});const items=stage.querySelectorAll('.flow span,.generated span,.token-row span');if(items.length)animate(items,{opacity:[.2,1],transform:['translateY(8px)','translateY(0)']},{duration:.5,delay:stagger(.25)});}}
document.querySelector('#prev').onclick=()=>show(index-1);document.querySelector('#next').onclick=()=>show(index+1);document.querySelector('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();document.querySelector('#close-notes').onclick=()=>document.querySelector('#notes').close();
window.addEventListener('keydown',e=>{if(e.target.closest('button,a,input,textarea,select')||e.metaKey||e.ctrlKey||e.altKey)return;if(e.code==='Space'){e.preventDefault();reveal()}else if(e.key==='ArrowRight')show(index+1);else if(e.key==='ArrowLeft')show(index-1);else if(e.key.toLowerCase()==='n')document.querySelector('#notes').showModal();else if(e.key.toLowerCase()==='f')document.querySelector('#fullscreen').click();});
show((Number(location.hash.match(/slide-(\d+)/)?.[1])||1)-1);

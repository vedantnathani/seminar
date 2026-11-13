import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import './styles/global.css';
import './styles/components.css';
import {advanceAnimation} from './components/animation-steps.js';
import {scenes,chapters} from './data/presentation-content.js';
import {content} from './components/scene-content.js';
import {mountInteractions} from './components/interactions.js';
import {mountBlueprint,mountConsolidation} from './components/workflow-blueprint.js';
import {mountOpportunities,mountDetector} from './components/opportunity-audit.js';
import {mountWorkbench} from './components/expense-workbench.js';
import {mountCalculator} from './components/impact-calculator.js';
import {mountExercise} from './components/audience-exercise.js';
import {createAnimations,splitHeadlines} from './animations/transitions.js';
import {ScrollTrigger} from './animations/gsap.js';
import {createScroll} from './effects/lenis.js';
import {createAtmosphere} from './effects/vanta.js';
import {createPresenter} from './components/presenter-mode.js';
import {navigationHTML,createNavigation} from './components/navigation.js';
const darkTypes=['hero','hook','story','statement','demo-intro','trust','resolve','closing'];
let index=0,reduceOverride=matchMedia('(prefers-reduced-motion: reduce)').matches;
const reduced=()=>reduceOverride;
document.querySelector('#app').innerHTML=navigationHTML()+`<main id="keynote">${scenes.map((s,i)=>`<section id="scene-${i}" class="scene ${darkTypes.includes(s.type)?'dark':'light'} scene-${s.type} ${i===0?'hero':''}" aria-labelledby="heading-${i}" data-scene="${i}"><span class="scene-watermark" aria-hidden="true">@vedant_nathani</span>${[0,7,27].includes(i)?'<div class="atmosphere" aria-hidden="true"></div>':''}<div class="wrap"><div class="scene-kicker"><span>${s.label||String(s.chapter+1).padStart(2,'0')+' / '+chapters[s.chapter][0].toUpperCase()}</span><span>${i===0?'A 60-MINUTE CHANGE IN PERSPECTIVE':chapters[s.chapter][1]+' MIN'}</span></div><${i===0?'h1':'h2'} class="headline" id="heading-${i}">${s.type==='workbench'?s.title.replace('<br>',' '):s.title}</${i===0?'h1':'h2'}>${s.subtitle?`<p class="scene-subtitle">${s.subtitle}</p>`:''}<div class="scene-body">${content(s.type)}</div></div></section>`).join('')}</main>`;
const animations=createAnimations(reduced),scroll=createScroll(reduced),atmosphere=createAtmosphere();let navigation;
function activate(i){if(i===index&&document.body.dataset.tone)return;index=i;document.querySelectorAll('.scene').forEach((s,n)=>{s.toggleAttribute('data-active',n===i);s.inert=n!==i;});navigation?.update(i);presenter.update();animations.enter(document.querySelector(`#scene-${i}`));atmosphere.show(document.querySelector(`#scene-${i}`));history.replaceState(null,'',`#scene-${i}`);}
function go(i,immediate=false){i=Math.max(0,Math.min(scenes.length-1,i));activate(i);scroll.to(document.querySelector(`#scene-${i}`),immediate);}
const presenter=createPresenter(()=>index,go,()=>advanceAnimation(document.querySelector(`#scene-${index}`)));
function configureReduced(value){reduceOverride=value;document.documentElement.classList.toggle('reduce-motion',value);scroll.configure();atmosphere.disable(value||document.querySelector('[data-background]').checked);animations.enter(document.querySelector(`#scene-${index}`));if(!value)atmosphere.show(document.querySelector(`#scene-${index}`));}
navigation=createNavigation({go,getIndex:()=>index,scroll,animations,atmosphere,presenter,configureReduced});document.querySelector('[data-reduced]').checked=reduced();
splitHeadlines(document.querySelector('main'));
for(const [i,s] of scenes.entries()){const root=document.querySelector(`#scene-${i}`),opts={animate:el=>animations.update(el),go};mountInteractions(root,s.type,opts);if(s.type==='blueprint')mountBlueprint(root);if(s.type==='consolidation')mountConsolidation(root);if(s.type==='opportunities')mountOpportunities(root);if(s.type==='detector')mountDetector(root);if(s.type==='workbench')mountWorkbench(root,opts);if(s.type==='calculator')mountCalculator(root,opts);if(s.type==='exercise')mountExercise(root);}
// ScrollTrigger observes scene boundaries; Lenis alone owns scroll interpolation.
scenes.forEach((_,i)=>ScrollTrigger.create({trigger:`#scene-${i}`,start:'top 55%',end:'bottom 55%',onEnter:()=>activate(i),onEnterBack:()=>activate(i)}));
let snapTimer;window.addEventListener('scroll',()=>{clearTimeout(snapTimer);snapTimer=setTimeout(()=>{if(reduced()||innerWidth<800||document.querySelector('dialog[open]')||document.activeElement?.closest('input,textarea,select,[data-lenis-prevent]'))return;const nearest=[...document.querySelectorAll('.scene')].reduce((a,b)=>Math.abs(b.getBoundingClientRect().top)<Math.abs(a.getBoundingClientRect().top)?b:a);const delta=nearest.getBoundingClientRect().top;if(Math.abs(delta)>2&&Math.abs(delta)<innerHeight*.42&&nearest.offsetHeight<=innerHeight+2)scroll.to(nearest);},240);},{passive:true});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',ev=>{document.querySelector('[data-reduced]').checked=ev.matches;configureReduced(ev.matches);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)atmosphere.destroy();else atmosphere.show(document.querySelector(`#scene-${index}`));});
window.addEventListener('pagehide',()=>{scroll.destroy();animations.destroy();atmosphere.destroy();presenter.destroy();ScrollTrigger.getAll().forEach(s=>s.kill());});
const initial=Number(location.hash.match(/^#scene-(\d+)$/)?.[1]||0);go(initial,true);document.documentElement.dataset.ready='1';

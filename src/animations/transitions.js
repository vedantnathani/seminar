import {gsap} from './gsap.js';
export function createAnimations(isReduced){let current=null,paused=false;return {
 enter(scene){current?.revert();current=gsap.context(()=>{if(isReduced())return;const timeline=gsap.timeline();const words=scene.querySelectorAll('.headline .word');if(words.length)timeline.from(words,{yPercent:105,opacity:0,duration:.75,stagger:.035,ease:'power3.out'});const paths=scene.querySelectorAll('.transformation-line path');paths.forEach(p=>{const length=p.getTotalLength();timeline.fromTo(p,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:1.15,ease:'power3.inOut'},.18);});if(paused)gsap.globalTimeline.pause();},scene);},
 update(el){if(isReduced()||paused)return;gsap.fromTo(el,{opacity:.35,y:7},{opacity:1,y:0,duration:.35,ease:'power3.out',overwrite:true});},
 pause(value){paused=value;value?gsap.globalTimeline.pause():gsap.globalTimeline.resume();},
 destroy(){current?.revert();}
};}
export function splitHeadlines(root){root.querySelectorAll('.headline').forEach(h=>{const walk=node=>{[...node.childNodes].forEach(n=>{if(n.nodeType===3){const frag=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim()){frag.append(t);return;}const mask=document.createElement('span');mask.className='word-mask';const word=document.createElement('span');word.className='word';word.textContent=t;mask.append(word);frag.append(mask);});n.replaceWith(frag);}else if(n.nodeType===1)walk(n);});};walk(h);});}

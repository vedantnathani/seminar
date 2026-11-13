import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {gsap,ScrollTrigger} from '../animations/gsap.js';
export function createScroll(isReduced){let lenis=null;const tick=time=>lenis?.raf(time*1000);function configure(){lenis?.destroy();lenis=null;gsap.ticker.remove(tick);if(!isReduced()){lenis=new Lenis({duration:.85,smoothWheel:true,syncTouch:false,prevent:node=>!!node.closest('input,textarea,select,dialog,[data-lenis-prevent]')});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(tick);}}
configure();return {to(el,immediate=false){if(lenis)lenis.scrollTo(el,{immediate:immediate||isReduced(),duration:.85,force:true});else window.scrollTo({top:el.offsetTop,behavior:'instant'});},configure,stop(){lenis?.stop();},start(){lenis?.start();},destroy(){lenis?.destroy();gsap.ticker.remove(tick);}};}

import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import {animate, stagger} from 'motion';
import './styles/home.css';

document.querySelector('#home').innerHTML = `
  <header class="home-nav">
    <a class="home-brand" href="/" aria-label="Vedant Nathani, home"><span class="brand-mark" aria-hidden="true">V<span class="brand-cut">/</span>N</span><span>VEDANT NATHANI</span></a>
    <nav aria-label="Main navigation"><a href="#seminars">Seminars</a><a class="nav-action" href="/beginner.html">Enter beginner <span aria-hidden="true">↗</span></a></nav>
  </header>
  <main>
    <section class="home-hero" aria-labelledby="home-title">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="hero-top"><span>01 / THE SEMINAR SERIES</span><span>IDEAS FOR WHAT COMES NEXT</span></div>
      <div class="hero-core">
        <div class="hero-copy">
          <p class="hero-label">Interactive seminars for CA students and young professionals</p>
          <h1 id="home-title"><span class="title-row">The future</span><span class="title-row title-serif">doesn't wait</span><span class="title-row">for a <em>prompt.</em></span></h1>
          <p class="hero-intro">Learn to think beyond the task in front of you. Start with a 60-minute seminar about AI, judgment and the workflows you can build.</p>
          <a class="hero-cta" href="/beginner.html"><span>Enter the beginner seminar</span><span class="cta-arrow" aria-hidden="true">↗</span></a>
        </div>
        <a class="hero-orbit" href="/beginner.html" aria-label="Open the beginner seminar">
          <span class="orbit-ring orbit-ring-outer"></span><span class="orbit-ring orbit-ring-inner"></span>
          <span class="orbit-tick orbit-tick-a"></span><span class="orbit-tick orbit-tick-b"></span>
          <span class="orbit-center"><small>START HERE</small><strong>01</strong><span>BEGINNER <b aria-hidden="true">↗</b></span></span>
        </a>
      </div>
      <div class="hero-bottom"><span>SCROLL TO SEE THE SERIES</span><span class="hero-line"></span><span>CREATED BY VEDANT NATHANI</span></div>
    </section>
    <section id="seminars" class="seminars-section" aria-labelledby="seminars-title">
      <div class="section-top"><span>THE SEMINAR SERIES</span><span>02 AVAILABLE NOW</span></div>
      <div class="section-heading"><h2 id="seminars-title">Choose a <em>seminar.</em></h2><p>Two beginner-friendly seminars to explore and present.</p></div>
      <a class="seminar-card" href="/beginner.html" aria-label="Open Beginner: Beyond the Prompt seminar">
        <div class="seminar-image"><img src="/assets/beginner-preview.png" alt="Opening slide of Beyond the Prompt, an interactive CA seminar" loading="lazy"><span class="image-corner" aria-hidden="true">↗</span></div>
        <div class="seminar-info"><div class="seminar-index">01 <span>AVAILABLE</span></div><div class="seminar-title"><span class="level">BEGINNER</span><h3>Beyond the <em>Prompt</em></h3><p>From Article Assistant to Workflow Architect.</p></div><div class="seminar-meta"><span>60 MINUTES</span><span>INTERACTIVE KEYNOTE</span><span class="seminar-link">Open seminar ↗</span></div></div>
      </a>
      <a class="seminar-card llm-card" href="/llm-basics.html" aria-label="Open LLM Basics seminar">
        <div class="llm-card-art"><span>THE SEMINAR SERIES / 02</span><strong>LLM<br><em>basics.</em></strong><span>FROM THE PAPER TO THE PROMPT ↗</span></div>
        <div class="seminar-info"><div class="seminar-index">02 <span>AVAILABLE</span></div><div class="seminar-title"><span class="level">BEGINNER</span><h3>LLM <em>Basics</em></h3><p>Understand what happens between your question and the answer.</p></div><div class="seminar-meta"><span>BEGINNER LEVEL</span><span>INTERACTIVE KEYNOTE</span><span class="seminar-link">Open seminar ↗</span></div></div>
      </a>
    </section>
    <section class="home-close" aria-labelledby="close-title"><span class="close-index">NEXT / YOUR MOVE</span><h2 id="close-title">The room is <em>ready.</em></h2><a href="/beginner.html">Open the beginner seminar <span aria-hidden="true">↗</span></a></section>
  </main>
  <footer class="home-footer"><span>VEDANT NATHANI</span><span>SEMINARS THAT MOVE IDEAS INTO PRACTICE.</span><a href="#home">BACK TO TOP ↑</a></footer>
`;

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  animate('.hero-grid', {opacity:[0,.55]}, {duration:1.4});
  animate('.hero-label', {opacity:[0,1],transform:['translateY(18px)','translateY(0)']}, {duration:.7,delay:.15});
  animate('.title-row', {opacity:[0,1],transform:['translateY(56px)','translateY(0)']}, {duration:.9,delay:stagger(.12,{start:.22}),ease:[.2,.8,.2,1]});
  animate('.hero-intro, .hero-cta', {opacity:[0,1],transform:['translateY(18px)','translateY(0)']}, {duration:.7,delay:stagger(.13,{start:.8})});
  animate('.hero-orbit', {opacity:[0,1],transform:['translateY(-50%) scale(.82)','translateY(-50%) scale(1)']}, {duration:1.2,delay:.5,ease:[.2,.8,.2,1]});
  animate('.orbit-ring-outer', {rotate:360}, {duration:38,repeat:Infinity,ease:'linear'});
  animate('.orbit-ring-inner', {rotate:-360}, {duration:30,repeat:Infinity,ease:'linear'});
  const spotlight=document.querySelector('.hero-glow');
  document.querySelector('.home-hero').addEventListener('pointermove',event=>{
    if(event.pointerType==='touch')return;
    const rect=event.currentTarget.getBoundingClientRect();
    spotlight.style.setProperty('--mx',`${event.clientX-rect.left}px`);
    spotlight.style.setProperty('--my',`${event.clientY-rect.top}px`);
  },{passive:true});
}

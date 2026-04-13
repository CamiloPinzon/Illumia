import { initSpeech } from './speech.js';
import { initScrollSpy, initSmoothScroll, scrollToSection } from './scroll.js';
import { initObservers } from './observers.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Web Speech API & UI bindings
  initSpeech();

  // 2. Initialize Navigation active state tracking
  initScrollSpy();

  // 3. Initialize custom fast smooth scroll for anchor links
  initSmoothScroll();

  // 4. Initialize Intersection Observers (Carousel + Video)
  initObservers();

  // 5. Bind manual buttons (we removed inline onclick attributes)
  const btnRequestDemo = document.getElementById('btnRequestDemo');
  if (btnRequestDemo) {
    btnRequestDemo.addEventListener('click', () => scrollToSection('#contact'));
  }

  const btnExplore = document.getElementById('btnExplore');
  if (btnExplore) {
    btnExplore.addEventListener('click', () => scrollToSection('#services'));
  }
});

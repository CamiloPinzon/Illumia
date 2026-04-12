/* ── WEB SPEECH API ── */
let speaking = false;
const phrases = [
  "Hello. I'm the Illumia AI. We transform your business with next-generation artificial intelligence and intelligent process automation.",
  "Our AI agents understand context, make decisions, and act — delivering omnichannel customer experiences available twenty-four seven.",
  "With Customer Care as a Service, we reduce operational friction by integrating people and AI into a single, powerful ecosystem.",
  "Our Automation as a Service eliminates repetitive tasks end-to-end, reducing operational costs by up to forty percent from day one.",
  "Monetization Services transform your data into revenue — cross-selling and up-selling activated in every customer interaction in real time.",
  "With Intelligent Operations, we don't just execute your processes — we transform and scale your entire business from the inside out."
];
let phraseIdx = 0;
let wordTimeout = null;
let pauseTimeout = null;
let currentUtterance = null;
let isSpeaking = false;
let videoPlayPromise = null;

function toggleSpeak() {
  if (isSpeaking) stopSpeak(); else startSpeak();
}

/* ── Cached DOM refs ── */
const _speakBtn = document.getElementById('speakBtn');
const _btnLabel = document.getElementById('btnLabel');
const _sphereWrap = document.getElementById('sphereWrap');
const _heroRight = document.querySelector('.hero-right');
const _waveform = document.getElementById('waveform');
const _transcriptEl = document.getElementById('transcriptEl');
const _aiVideo = document.getElementById('aiVideo');

function startSpeak() {
  if (!window.speechSynthesis) {
    alert('Web Speech API not supported in this browser. Try Chrome or Edge.');
    return;
  }
  isSpeaking = true; speaking = true;
  _speakBtn.classList.add('active');
  _btnLabel.textContent = 'Stop';
  _sphereWrap.classList.add('speaking');
  _heroRight.classList.add('speaking');
  _waveform.classList.add('active');
  if (_aiVideo) {
    _aiVideo.loop = true;
    videoPlayPromise = _aiVideo.play();
    if (videoPlayPromise) videoPlayPromise.catch(err => console.warn('Video play failed:', err));
  }
  speakNext();
}

function stopSpeak() {
  isSpeaking = false; speaking = false;
  window.speechSynthesis.cancel();
  clearTimeout(pauseTimeout); clearTimeout(wordTimeout);
  _speakBtn.classList.remove('active');
  _btnLabel.textContent = 'Talk to Illumia AI';
  _sphereWrap.classList.remove('speaking');
  _heroRight.classList.remove('speaking');
  _waveform.classList.remove('active');
  if (_aiVideo) {
    const doPause = () => { _aiVideo.pause(); _aiVideo.currentTime = 0; };
    if (videoPlayPromise) {
      videoPlayPromise.then(doPause).catch(doPause);
      videoPlayPromise = null;
    } else {
      doPause();
    }
  }
  _transcriptEl.classList.remove('visible');
  setTimeout(() => { _transcriptEl.innerHTML = ''; }, 400);
}

function speakNext() {
  if (!isSpeaking) return;
  const text = phrases[phraseIdx % phrases.length];
  phraseIdx++;
  showTranscript(text);
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US'; utter.rate = 0.92; utter.pitch = 1.05; utter.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang === 'en-US' && (v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Alex'))) ||
    voices.find(v => v.lang.startsWith('en'));
  if (preferred) utter.voice = preferred;
  utter.onend = () => { if (isSpeaking) pauseTimeout = setTimeout(speakNext, 1800); };
  utter.onerror = () => { if (isSpeaking) pauseTimeout = setTimeout(speakNext, 1800); };
  currentUtterance = utter;
  window.speechSynthesis.speak(utter);
}

window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };

function showTranscript(text) {
  _transcriptEl.innerHTML = ''; _transcriptEl.classList.add('visible');
  const words = text.split(' ');
  let i = 0;
  function next() {
    if (!isSpeaking) return;
    if (i < words.length) {
      const sp = document.createElement('span');
      sp.className = 'word';
      sp.textContent = (i === 0 ? '' : ' ') + words[i];
      sp.style.animationDelay = '0s';
      _transcriptEl.appendChild(sp); i++;
      wordTimeout = setTimeout(next, 75 + Math.random() * 35);
    }
  }
  next();
}

/* ── NAV active on scroll — rAF-throttled ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
      });
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

/* ── CONTACT VIDEO OBSERVER ── */
document.addEventListener('DOMContentLoaded', () => {
  const contactVideo = document.getElementById('contactVideo');
  if (contactVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactVideo.play().catch(e => console.warn('Contact video play blocked:', e));
        } else {
          contactVideo.pause();
        }
      });
    }, { threshold: 0.05 });
    videoObserver.observe(document.getElementById('contact'));
  }
});

/* ── CUSTOM FAST 500ms SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#') && targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (!target) return;
      
      const startPosition = window.pageYOffset;
      const targetPosition = target.getBoundingClientRect().top + startPosition - 122; 
      const distance = targetPosition - startPosition;
      const duration = 500; 
      let start = null;

      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min(timestamp - start, duration);
        const t = progress / duration;
        const easeOutQuart = 1 - Math.pow(1 - t, 4); // Snappy start, soft brake
            
        window.scrollTo(0, startPosition + distance * easeOutQuart);
        
        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetPosition);
        }
      });
    }
  });
});

/* ── CLIENTS CAROUSEL OBSERVER ── */
document.addEventListener('DOMContentLoaded', () => {
  const clientsSection = document.getElementById('clients');
  if (clientsSection) {
    const clientsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          clientsSection.classList.add('in-view');
        } else {
          clientsSection.classList.remove('in-view');
        }
      });
    }, { threshold: 0.05 });
    clientsObserver.observe(clientsSection);
  }
});

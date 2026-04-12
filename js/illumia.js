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

function startSpeak() {
  if (!window.speechSynthesis) {
    alert('Web Speech API not supported in this browser. Try Chrome or Edge.');
    return;
  }
  isSpeaking = true; speaking = true;
  document.getElementById('speakBtn').classList.add('active');
  document.getElementById('btnLabel').textContent = 'Stop';
  document.getElementById('sphereWrap').classList.add('speaking');
  document.getElementById('waveform').classList.add('active');
  const video = document.getElementById('aiVideo');
  if (video) {
    video.loop = true;
    videoPlayPromise = video.play();
    if (videoPlayPromise) videoPlayPromise.catch(err => console.warn('Video play failed:', err));
  }
  speakNext();
}

function stopSpeak() {
  isSpeaking = false; speaking = false;
  window.speechSynthesis.cancel();
  clearTimeout(pauseTimeout); clearTimeout(wordTimeout);
  document.getElementById('speakBtn').classList.remove('active');
  document.getElementById('btnLabel').textContent = 'Talk to Illumia AI';
  document.getElementById('sphereWrap').classList.remove('speaking');
  document.getElementById('waveform').classList.remove('active');
  const video = document.getElementById('aiVideo');
  if (video) {
    const doPause = () => { video.pause(); video.currentTime = 0; };
    if (videoPlayPromise) {
      videoPlayPromise.then(doPause).catch(doPause);
      videoPlayPromise = null;
    } else {
      doPause();
    }
  }
  const el = document.getElementById('transcriptEl');
  el.classList.remove('visible');
  setTimeout(() => { el.innerHTML = ''; }, 400);
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
  const el = document.getElementById('transcriptEl');
  el.innerHTML = ''; el.classList.add('visible');
  const words = text.split(' ');
  let i = 0;
  function next() {
    if (!isSpeaking) return;
    if (i < words.length) {
      const sp = document.createElement('span');
      sp.className = 'word';
      sp.textContent = (i === 0 ? '' : ' ') + words[i];
      sp.style.animationDelay = '0s';
      el.appendChild(sp); i++;
      wordTimeout = setTimeout(next, 75 + Math.random() * 35);
    }
  }
  next();
}

/* ── NAV active on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

/* ── ZEN PARALLAX ANIMATION ── */
document.addEventListener('DOMContentLoaded', () => {
  const zenElements = document.querySelectorAll('.zen-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  zenElements.forEach(el => observer.observe(el));
});

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

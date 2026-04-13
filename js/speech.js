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

let _speakBtn, _btnLabel, _sphereWrap, _heroRight, _waveform, _transcriptEl, _aiVideo;

export function initSpeech() {
  _speakBtn = document.getElementById('speakBtn');
  _btnLabel = document.getElementById('btnLabel');
  _sphereWrap = document.getElementById('sphereWrap');
  _heroRight = document.querySelector('.hero-right');
  _waveform = document.getElementById('waveform');
  _transcriptEl = document.getElementById('transcriptEl');
  _aiVideo = document.getElementById('aiVideo');

  if (_speakBtn) {
    _speakBtn.addEventListener('click', toggleSpeak);
  }

  // Ensure voices are loaded early
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
  }
}

function toggleSpeak() {
  if (isSpeaking) stopSpeak();
  else startSpeak();
}

function startSpeak() {
  if (!window.speechSynthesis) {
    alert('Web Speech API not supported in this browser. Try Chrome or Edge.');
    return;
  }
  isSpeaking = true;
  if (_speakBtn) _speakBtn.classList.add('active');
  if (_btnLabel) _btnLabel.textContent = 'Stop';
  if (_sphereWrap) _sphereWrap.classList.add('speaking');
  if (_heroRight) _heroRight.classList.add('speaking');
  if (_waveform) _waveform.classList.add('active');
  
  if (_aiVideo) {
    _aiVideo.loop = true;
    videoPlayPromise = _aiVideo.play();
    if (videoPlayPromise) videoPlayPromise.catch(err => console.warn('Video play failed:', err));
  }
  speakNext();
}

function stopSpeak() {
  isSpeaking = false;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  clearTimeout(pauseTimeout); 
  clearTimeout(wordTimeout);
  
  if (_speakBtn) _speakBtn.classList.remove('active');
  if (_btnLabel) _btnLabel.textContent = 'Talk to Illumia AI';
  if (_sphereWrap) _sphereWrap.classList.remove('speaking');
  if (_heroRight) _heroRight.classList.remove('speaking');
  if (_waveform) _waveform.classList.remove('active');
  
  if (_aiVideo) {
    const doPause = () => { _aiVideo.pause(); _aiVideo.currentTime = 0; };
    if (videoPlayPromise) {
      videoPlayPromise.then(doPause).catch(doPause);
      videoPlayPromise = null;
    } else {
      doPause();
    }
  }
  
  if (_transcriptEl) {
    _transcriptEl.classList.remove('visible');
    setTimeout(() => { _transcriptEl.innerHTML = ''; }, 400);
  }
}

function speakNext() {
  if (!isSpeaking) return;
  const text = phrases[phraseIdx % phrases.length];
  phraseIdx++;
  showTranscript(text);
  
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US'; 
  utter.rate = 0.92; 
  utter.pitch = 1.05; 
  utter.volume = 1;
  
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang === 'en-US' && (v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Alex'))) ||
    voices.find(v => v.lang.startsWith('en'));
  
  if (preferred) utter.voice = preferred;
  
  utter.onend = () => { if (isSpeaking) pauseTimeout = setTimeout(speakNext, 1800); };
  utter.onerror = () => { if (isSpeaking) pauseTimeout = setTimeout(speakNext, 1800); };
  currentUtterance = utter;
  
  window.speechSynthesis.speak(utter);
}

function showTranscript(text) {
  if (!_transcriptEl) return;
  _transcriptEl.innerHTML = ''; 
  _transcriptEl.classList.add('visible');
  
  const words = text.split(' ');
  let i = 0;
  function next() {
    if (!isSpeaking) return;
    if (i < words.length) {
      const sp = document.createElement('span');
      sp.className = 'word';
      sp.textContent = (i === 0 ? '' : ' ') + words[i];
      sp.style.animationDelay = '0s';
      _transcriptEl.appendChild(sp); 
      i++;
      wordTimeout = setTimeout(next, 75 + Math.random() * 35);
    }
  }
  next();
}

export function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let scrollTicking = false;
  
  if (!navLinks.length) return;

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
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();
        scrollToSection(targetId);
      }
    });
  });
}

export function scrollToSection(selector) {
  const target = document.querySelector(selector);
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
    // Snappy start, soft brake easeOutQuart
    const easeOutQuart = 1 - Math.pow(1 - t, 4); 
        
    window.scrollTo(0, startPosition + distance * easeOutQuart);
    
    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition);
    }
  });
}

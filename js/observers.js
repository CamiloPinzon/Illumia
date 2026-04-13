export function initObservers() {
  /* ── CONTACT VIDEO OBSERVER ── */
  const contactVideo = document.getElementById('contactVideo');
  const contactSection = document.getElementById('contact');
  if (contactVideo && contactSection) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactVideo.play().catch(e => console.warn('Contact video play blocked:', e));
        } else {
          contactVideo.pause();
        }
      });
    }, { threshold: 0.05 });
    videoObserver.observe(contactSection);
  }

  /* ── CLIENTS CAROUSEL OBSERVER ── */
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
}

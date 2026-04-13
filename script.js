function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    document.getElementById('nav-links').classList.remove('open');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.hero-grid > div, .hero-side, .about-text, .aside-block, .project-card, .writing-item, .contact-panel, .contact-card');
  animatedElements.forEach((el, index) => {
    el.classList.add('reveal');
    // Stagger effect for items in grids
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
  });
});

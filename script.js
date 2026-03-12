// =========================
// Config for JSON Paths
// =========================
const base = window.location.pathname.includes('/pages/') ? '..' : '.';

const CONFIG = {
  projectsPath: `${base}/data/projects.json`,
  certificationsPath: `${base}/data/certifications.json`
};

console.log("Projects fetch URL:", CONFIG.projectsPath);
console.log("Certifications fetch URL:", CONFIG.certificationsPath);

// =========================
// Smooth Scrolling
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =========================
// Navbar background change
// =========================
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.5)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.85)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
  }
});

// =========================
// Scroll Animations
// =========================
// Only hide elements that are BELOW the viewport — elements already visible stay visible
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('fade-pending');
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top >= window.innerHeight) {
    // Below the fold — hide and animate in on scroll
    el.classList.add('fade-pending');
    observer.observe(el);
  }
  // Already in viewport — leave visible (no class changes needed)
});

// Typing + Counters are handled inline in index.html

// =========================
// Project Card Click Effect
// =========================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    const link = this.querySelector('.project-link');
    if (link) {
      window.open(link.href, '_blank');
    }
  });
});

// =========================
// Particle Effect in Hero
// =========================
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(56, 189, 248, 0.35)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + 's';
    hero.appendChild(particle);
  }
}
createParticles();

// =========================
// Mobile Menu Toggle
// =========================
function toggleMobileMenu(btn) {
  var navbar = btn.closest(‘.navbar’);
  navbar.classList.toggle(‘open’);
  btn.innerHTML = navbar.classList.contains(‘open’) ? ‘&#10005;’ : ‘&#9776;’;
}

// =========================
// Active Nav Link
// =========================
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    const isHome = (href === '../index.html' || href === './index.html' || href === '#home') &&
                   (path.endsWith('index.html') || path.endsWith('/Portfolio/') || path.endsWith('/Portfolio'));
    const isMatch = href && path.endsWith(href.replace('../', '').replace('./', ''));
    if (isHome || isMatch) {
      link.classList.add('active');
    }
  });
}
setActiveNavLink();

// =========================
// Dynamic Copyright Year
// =========================
document.querySelectorAll('.footer p').forEach(el => {
  el.innerHTML = el.innerHTML.replace(/\d{4}/, new Date().getFullYear());
});

// =========================
// Back to Top Button
// =========================
function createBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '↑';
  btn.title = 'Nach oben';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
createBackToTop();

// =========================
// Scroll Progress Indicator
// =========================
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #38bdf8, #22d3ee);
    z-index: 9999;
    transition: width 0.25s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}
createScrollProgress();

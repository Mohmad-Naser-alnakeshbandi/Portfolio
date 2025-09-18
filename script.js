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
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});

// =========================
// Scroll Animations
// =========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// =========================
// Typing Animation
// =========================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
  const originalText = heroSubtitle.textContent;
  heroSubtitle.textContent = "";
  let index = 0;

  function typeText() {
    if (index < originalText.length) {
      heroSubtitle.textContent = originalText.slice(0, index + 1);
      index++;
      setTimeout(typeText, 30);
    }
  }

  typeText();
}

// =========================
// Timeline Hover Effects
// =========================
document.querySelectorAll('.timeline-content').forEach(item => {
  item.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  item.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(-5px) scale(1)';
  });
});

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
    particle.style.background = 'rgba(255, 255, 255, 0.3)';
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
function setupMobileMenu() {
  const navbar = document.querySelector('.nav-content');
  const navLinks = document.querySelector('.nav-links');

  if (!navbar || !navLinks) return;

  // If button doesn’t exist yet, create it
  if (!document.querySelector('.mobile-menu-btn')) {
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰';
    menuBtn.className = 'mobile-menu-btn';

    // Toggle class instead of inline styles
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    navbar.appendChild(menuBtn);
  }
}

window.addEventListener('load', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

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
    background: linear-gradient(90deg, #667eea, #764ba2);
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

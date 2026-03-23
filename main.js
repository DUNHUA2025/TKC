/* ============================================
   東江泉 · Main JavaScript
   ============================================ */
(function() {
  'use strict';

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close nav when link clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // ===== HERO BG ZOOM =====
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('zoom-out'), 200);
  }

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = [...entry.target.parentElement.children].filter(
          c => c.classList.contains('reveal') || c.classList.contains('reveal-left') || c.classList.contains('reveal-right')
        );
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== BACK TO TOP =====
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
  }, { passive: true });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '發送中...';
      btn.disabled = true;
      setTimeout(() => {
        let success = form.querySelector('.form-success');
        if (!success) {
          success = document.createElement('div');
          success.className = 'form-success';
          success.innerHTML = '✅ 感謝您的留言！我們將盡快與您聯繫。';
          form.appendChild(success);
        }
        success.classList.add('show');
        form.reset();
        btn.textContent = '發送訊息';
        btn.disabled = false;
        setTimeout(() => success.classList.remove('show'), 5000);
      }, 1200);
    });
  }

  // ===== SMOOTH ACTIVE NAV =====
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(a => {
          a.classList.remove('active-nav');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active-nav');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ===== COUNTER ANIMATION =====
  function animateCounter(el, target, suffix = '', duration = 1800) {
    const start = performance.now();
    const isDecimal = target.toString().includes('.');
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = isDecimal
        ? current.toFixed(3) + suffix
        : Math.floor(current) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.brand-banner__num');
        const targets = [8.787, 0, 99.9, 200];
        const suffixes = ['', '', '', ''];
        nums.forEach((num, i) => {
          // Strip existing child nodes except text
          const originalText = num.textContent.trim();
          if (i === 0) animateCounter(num, 8.787, '', 2000);
          else if (i === 1) animateCounter(num, 0, '', 800);
          else if (i === 2) { num.textContent = '0'; animateCounter(num, 99.9, '', 2000); }
          // else skip, the HTML already has complex markup for i===3
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const banner = document.querySelector('.brand-banner__inner');
  if (banner) counterObserver.observe(banner);

  // ===== WATER PARTICLE CANVAS =====
  const canvas = document.getElementById('waterCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 20;
      this.r = Math.random() * 3 + 1;
      this.speed = Math.random() * 0.6 + 0.2;
      this.alpha = Math.random() * 0.25 + 0.05;
      this.drift = (Math.random() - 0.5) * 0.5;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      this.alpha -= 0.0003;
      if (this.y < -20 || this.alpha <= 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = '#a8daf5';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  }, { passive: true });

  // ===== PARALLAX on source section =====
  const sourceParallax = document.getElementById('sourceParallax');
  const ctaBandBg = document.getElementById('ctaBandBg');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (sourceParallax) {
      const rect = sourceParallax.parentElement.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const offset = (rect.top * 0.3);
        sourceParallax.style.transform = `translateY(${offset}px)`;
      }
    }
  }, { passive: true });

  // ===== ADD active-nav CSS =====
  const navStyle = document.createElement('style');
  navStyle.textContent = `
    .nav__links a.active-nav { color: var(--c-accent) !important; }
    .nav__links a.active-nav::after { transform: scaleX(1); }
    .nav__hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .nav__hamburger.active span:nth-child(2) { opacity: 0; }
    .nav__hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  `;
  document.head.appendChild(navStyle);

  // ===== IMAGE LAZY LOAD =====
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  console.log('東江泉 Website loaded ✅');
})();

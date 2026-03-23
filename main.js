/* ============================================
   共用 Header / Footer 注入器
   ============================================ */
(function () {
  'use strict';

  // ---------- Shared HTML Fragments ----------
  var CURRENT = window.location.pathname.split('/').pop() || 'index.html';

  var NAV_LINKS = [
    { href: 'index.html',       label: '主頁' },
    { href: 'chan-pin.html',     label: '產品售價' },
    { href: 'our-services.html',label: '品牌故事' },
    { href: 'about.html',       label: '關於我們', ext: 'https://www.dunhuagroup.com/#' },
    { href: 'jobs.html',        label: '職位空缺' },
    { href: 'contactus.html',   label: '聯絡我們' },
  ];

  function buildNavLinks(mobile) {
    return NAV_LINKS.map(function (item) {
      var href = item.ext || item.href;
      var target = item.ext ? ' target="_blank"' : '';
      var active = (!item.ext && item.href === CURRENT) ? ' class="active"' : '';
      if (mobile) {
        return '<li><a href="' + href + '"' + target + active.replace('class=', 'class=') + '>' + item.label + '</a></li>';
      }
      return '<li><a href="' + href + '"' + target + active + '>' + item.label + '</a></li>';
    }).join('');
  }

  // ---------- Inject Header ----------
  var headerEl = document.querySelector('.site-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <nav class="navbar-desktop">
        <div class="nav-container">
          <a href="index.html" class="navbar-brand">
            <img src="assets/images/logo.png" width="95" height="40" alt="東江泉飲用天然泉水"/>
          </a>
          <ul class="nav-menu">${buildNavLinks(false)}</ul>
          <div class="nav-right">
            <a href="tel:+852-35905187" class="nav-phone">
              <i class="fa fa-phone"></i>
              <small>+852-3590 5187</small>
            </a>
            <a href="contactus.html" class="btn-contact">聯絡我們</a>
          </div>
        </div>
      </nav>
      <nav class="navbar-mobile">
        <div class="mobile-nav-top">
          <a href="index.html" class="navbar-brand">
            <img src="assets/images/logo.png" width="95" height="40" alt="東江泉飲用天然泉水"/>
          </a>
          <button class="mobile-toggle" id="mobileToggle" aria-label="切換導覽">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="mobile-menu" id="mobileMenu">
          <ul>${buildNavLinks(true)}</ul>
        </div>
      </nav>`;
  }

  // ---------- Inject Footer ----------
  var footerEl = document.querySelector('footer#bottom');
  if (footerEl) {
    footerEl.innerHTML = `
      <div class="footer-main">
        <div class="container text-center">
          <div class="footer-social">
            <a href="#" target="_blank" aria-label="X" class="social-link">
              <i class="fa fa-twitter rounded-circle shadow-sm"></i>
            </a>
          </div>
          <p class="mb-1 mt-3">
            <a class="btn-dunhua" href="https://www.dunhuagroup.com/#" target="_blank">敦華出品</a>
          </p>
          <p class="mb-1 slogan-text">一脉相連 . 飲水思源</p>
          <h6 class="footer-tagline"><span style="font-size:1.5rem;color:rgb(57,132,198);">做一瓶有故事的好泉水</span></h6>
          <p class="mb-1 footer-company">東江泉(香港)食品飲料有限公司</p>
          <p class="footer-company-en">Tung kong chuen (Hong Kong) Food and Beverage Co., Limited</p>
          <p class="mb-1">FLAT I, G/F, WAI CHEUNG INDUSTRIAL CENTRE</p>
          <p class="mb-1">5 SHEK PAI TAU ROAD, TUEN MUN</p>
          <p class="mb-1">NEW TERRITORIES, HONG KONG</p>
          <p class="mb-1"><i class="fa fa-phone"></i> +852-3590 5187</p>
          <ul class="footer-email-list">
            <li><i class="fa fa-envelope me-2"></i><a href="mailto:tungkongchuen@gmail.com">tungkongchuen@gmail.com</a></li>
          </ul>
          <p><a href="https://www.tungkongchuen.com">https://www.tungkongchuen.com</a></p>
          <div class="footer-qr-row">
            <img src="assets/images/footer_qr.webp" alt="QR Code" class="footer-qr"/>
            <img src="assets/images/footer_qr2.webp" alt="QR Code 2" class="footer-qr"/>
          </div>
        </div>
      </div>
      <div class="footer-logo-bar">
        <div class="container text-center">
          <img src="assets/images/logo.png" alt="東江泉飲用天然泉水" class="footer-logo"/>
        </div>
      </div>`;
  }

  // ---------- Mobile Toggle ----------
  var toggle = document.getElementById('mobileToggle');
  var menu   = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      toggle.classList.toggle('is-active');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('is-active');
      });
    });
  }

  // ---------- Header scroll ----------
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (header) {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 16px rgba(0,0,0,.12)'
        : '0 2px 8px rgba(0,0,0,.08)';
    }
  }, { passive: true });

  // ---------- Smooth scroll ----------
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (a) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    }
  });

  console.log('東江泉 ready ✅ page:', CURRENT);
})();

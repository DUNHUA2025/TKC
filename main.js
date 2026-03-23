/* ============================================
   東江泉 天然飲用泉水 — main.js
   Shared header / footer / popup / animations
   ============================================ */
(function () {
  'use strict';

  var CURRENT = window.location.pathname.split('/').pop() || 'index.html';

  /* ─── Nav Links ─── */
  var NAV_LINKS = [
    { href: 'index.html',        label: '主頁' },
    { href: 'chan-pin.html',      label: '產品售價' },
    { href: 'our-services.html', label: '品牌故事' },
    { href: 'https://www.dunhuagroup.com/#', label: '關於我們', ext: true },
    { href: 'jobs.html',         label: '職位空缺' },
    { href: 'contactus.html',    label: '聯絡我們' },
  ];

  function buildNavLinks() {
    return NAV_LINKS.map(function (item) {
      var href   = item.ext ? item.href : item.href;
      var target = item.ext ? ' target="_blank" rel="noopener"' : '';
      var active = (!item.ext && item.href === CURRENT) ? ' class="active"' : '';
      return '<li><a href="' + href + '"' + target + active + '>' + item.label + '</a></li>';
    }).join('');
  }

  /* ─── Inject Header ─── */
  var headerEl = document.querySelector('.site-header');
  if (headerEl) {
    headerEl.innerHTML =
      '<nav class="navbar-desktop">' +
        '<div class="nav-container">' +
          '<a href="index.html" class="navbar-brand">' +
            '<img src="assets/images/logo.png" width="95" height="40" alt="東江泉飲用天然泉水"/>' +
          '</a>' +
          '<ul class="nav-menu">' + buildNavLinks() + '</ul>' +
          '<div class="nav-right">' +
            '<a href="tel:+852-35905187" class="nav-phone">' +
              '<i class="fa fa-phone"></i><small>+852-3590 5187</small>' +
            '</a>' +
            '<a href="contactus.html" class="btn-contact">聯絡我們</a>' +
          '</div>' +
        '</div>' +
      '</nav>' +
      '<nav class="navbar-mobile">' +
        '<div class="mobile-nav-top">' +
          '<a href="index.html" class="navbar-brand">' +
            '<img src="assets/images/logo.png" width="95" height="40" alt="東江泉飲用天然泉水"/>' +
          '</a>' +
          '<button class="mobile-toggle" id="mobileToggle" aria-label="切換導覽">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
        '<div class="mobile-menu" id="mobileMenu">' +
          '<ul>' + buildNavLinks() + '</ul>' +
        '</div>' +
      '</nav>';
  }

  /* ─── Inject Footer ─── */
  var footerEl = document.querySelector('footer#bottom');
  if (footerEl) {
    footerEl.innerHTML =
      /* Social + info block */
      '<div class="footer-main">' +
        '<div class="container text-center">' +
          /* Social icons — plain circle, no box border */
          '<div class="footer-social">' +
            '<a href="#" target="_blank" aria-label="X" class="social-link">' +
              '<i class="fa fa-twitter"></i>' +
            '</a>' +
          '</div>' +
          /* 敦華出品 button */
          '<p class="mb-1 mt-3">' +
            '<a class="btn-dunhua" href="https://www.dunhuagroup.com/#" target="_blank" rel="noopener">敦華出品</a>' +
          '</p>' +
          /* Slogans */
          '<p class="mb-1 slogan-text">一脉相連 . 飲水思源</p>' +
          '<h6 class="footer-tagline"><span style="font-size:1.5rem;color:rgb(57,132,198);">做一瓶有故事的好泉水</span></h6>' +
          /* Company name */
          '<p class="mb-1 footer-company">東江泉(香港)食品飲料有限公司</p>' +
          '<p class="footer-company-en">Tung kong chuen (Hong Kong) Food and Beverage Co., Limited</p>' +
          /* Address */
          '<p class="mb-1">FLAT I,G/F,WAI CHEUNG INDUSTRIAL CENTRE</p>' +
          '<p class="mb-1">5 SHEK PAI TAU ROAD,TUEN MUN</p>' +
          '<p class="mb-1">NEW TERRITORIES,HONG KONG</p>' +
          /* Phone */
          '<p class="mb-1"><i class="fa fa-phone"></i> +852-3590 5187</p>' +
          /* Email */
          '<ul class="footer-email-list">' +
            '<li><i class="fa fa-envelope me-2"></i>' +
              '<a href="mailto:tungkongchuen@gmail.com">tungkongchuen@gmail.com</a>' +
            '</li>' +
          '</ul>' +
          /* Website */
          '<p><a href="https://www.tungkongchuen.com">https://www.tungkongchuen.com</a></p>' +
          /* No payment QR in footer — original site has none here */
        '</div>' +
      '</div>' +
      /* Footer logo/QR centre image — 640.webp from original site */
      '<div class="footer-logo-bar">' +
        '<div class="container text-center">' +
          '<img src="assets/images/footer_item2.webp" alt="東江泉公眾號" class="footer-wechat-qr"/>' +
        '</div>' +
      '</div>' +
      /* Copyright bar */
      '<div class="footer-copyright">' +
        '<div class="container">' +
          '<p class="text-center text-muted">東江泉 © 版權所有 &nbsp;|&nbsp; Copyright © 2024-2025</p>' +
        '</div>' +
      '</div>' +
      /* Scroll-to-top button */
      '<div id="scrolltop-wrapper">' +
        '<a id="btn-scrolltop" href="#top" title="返回頂部" aria-label="返回頂部">' +
          '<i class="fa fa-chevron-up"></i>' +
        '</a>' +
      '</div>';
  }

  /* ─── Mobile Toggle ─── */
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

  /* ─── Header shadow on scroll ─── */
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (header) {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 16px rgba(0,0,0,.12)'
        : '0 2px 8px rgba(0,0,0,.08)';
    }
    /* Scroll-to-top visibility */
    var btn = document.getElementById('btn-scrolltop');
    if (btn) {
      btn.style.opacity = window.scrollY > 300 ? '1' : '0';
      btn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    }
  }, { passive: true });

  /* ─── Smooth scroll for anchor links ─── */
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

  /* ─── Scroll-to-top smooth click ─── */
  document.addEventListener('click', function (e) {
    if (e.target.closest('#btn-scrolltop')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /* ─── Bounce-in animation for WEB3 box ─── */
  var web3Box = document.querySelector('.web3-box');
  if (web3Box) {
    web3Box.classList.add('anim-bounce-in');
  }

  /* ─── Scroll-triggered fade-in animations ─── */
  function initScrollAnimations() {
    var animEls = document.querySelectorAll(
      '.section-stats .stat-item,' +
      '.feature-item,' +
      '.prod-gallery-item,' +
      '.mb-block,' +
      '.section-bottle-hero figure,' +
      '.cert-hero-img,' +
      '.masonry-col,' +
      '.story-img'
    );
    animEls.forEach(function (el) {
      el.classList.add('scroll-anim');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animEls.forEach(function (el) { io.observe(el); });
  }

  if ('IntersectionObserver' in window) {
    initScrollAnimations();
  }

  /* ─── Homepage Popup (NFT promo, shows once per session) ─── */
  if (CURRENT === 'index.html' || CURRENT === '') {
    var popupShown = sessionStorage.getItem('tkc_popup_shown');
    if (!popupShown) {
      setTimeout(function () {
        var overlay = document.getElementById('site-popup-overlay');
        if (overlay) {
          overlay.classList.add('popup-visible');
          sessionStorage.setItem('tkc_popup_shown', '1');
        }
      }, 1500);
    }

    /* Close popup */
    document.addEventListener('click', function (e) {
      var overlay = document.getElementById('site-popup-overlay');
      if (!overlay) return;
      if (
        e.target.id === 'site-popup-overlay' ||
        e.target.closest('.popup-close')
      ) {
        overlay.classList.remove('popup-visible');
      }
    });

    /* ESC key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var overlay = document.getElementById('site-popup-overlay');
        if (overlay) overlay.classList.remove('popup-visible');
      }
    });
  }

  console.log('東江泉 Website Ready ✅');
})();

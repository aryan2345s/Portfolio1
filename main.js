/* ==========================================================================
   Aryan Soni — Portfolio
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG — the only place you need to edit.
     Leave a value as '' and the related button/link stays hidden.
     ------------------------------------------------------------------ */
  var CONFIG = {
    email: 'aryansoni.js@gmail.com',

    links: {
      github: '',          // e.g. 'https://github.com/your-username'
      projectRepo: '',     // e.g. 'https://github.com/your-username/smart-attendance-system'
      projectDemo: '',     // e.g. 'https://your-demo-url.com'
      certHackathon: '',   // certificate URL for Smart Synergy Hackathon
      certConference: ''   // certificate URL for National Student Conference RAEMPS
    }
  };

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  function isHttpUrl(value) {
    return typeof value === 'string' && /^https?:\/\/[^\s]+$/i.test(value.trim());
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------
     Optional links from CONFIG
     ------------------------------------------------------------------ */
  $$('[data-link]').forEach(function (el) {
    var url = CONFIG.links[el.getAttribute('data-link')];
    if (isHttpUrl(url)) {
      el.setAttribute('href', url.trim());
      el.hidden = false;
    }
  });

  /* ------------------------------------------------------------------
     Theme toggle (light by default, remembers choice)
     ------------------------------------------------------------------ */
  var themeBtn = $('#theme-toggle');
  var themeMeta = $('meta[name="theme-color"]');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function applyTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0A0F20' : '#F6F4EE');
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }
  applyTheme(currentTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ------------------------------------------------------------------
     Header: scrolled state + mobile menu
     ------------------------------------------------------------------ */
  var header = $('#site-header');
  var menuBtn = $('#menu-toggle');
  var menu = $('#mobile-menu');
  var fab = $('#fab-top');

  function onScroll() {
    var y = window.pageYOffset || root.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (fab) fab.classList.toggle('is-shown', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    if (header) header.classList.toggle('menu-open', open);
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });
    // Close the panel if the viewport grows past the mobile breakpoint
    var mq = window.matchMedia('(min-width: 901px)');
    var onMq = function (e) { if (e.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  /* ------------------------------------------------------------------
     Active navigation indicator
     ------------------------------------------------------------------ */
  var sections = $$('[data-section]');
  var navLinks = $$('[data-nav]');

  function setActive(id) {
    navLinks.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id === 'home' ? '' : entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { activeObserver.observe(s); });
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  var revealEls = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ------------------------------------------------------------------
     Resume viewer: opens the resume inside the page (works on every host).
     Without JS, the button still links straight to the PDF.
     ------------------------------------------------------------------ */
  var resumeBtn = $('#resume-open');
  var resumeDlg = $('#resume-dialog');
  if (resumeBtn && resumeDlg) {
    var closeBtn = $('#resume-close');
    var canModal = typeof resumeDlg.showModal === 'function';
    var closeResume = function () {
      if (resumeDlg.open) resumeDlg.close();
      resumeBtn.focus();
    };
    if (canModal) {
      resumeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        resumeDlg.showModal();
      });
      if (closeBtn) closeBtn.addEventListener('click', closeResume);
      resumeDlg.addEventListener('click', function (e) {
        if (e.target === resumeDlg) closeResume();
      });
    }
  }
})();

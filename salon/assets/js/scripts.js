/*!
 * Velvet & Blade Studio (fictional demo) – site script.
 * Based on Start Bootstrap - Creative v7.0.7 scripts.js (https://startbootstrap.com/theme/creative),
 * Copyright 2013-2023 Start Bootstrap, MIT License (see /LICENSE).
 * Adapted: no Bootstrap JS / SimpleLightbox dependency (tiny collapse toggle + scrollspy written here),
 * floating call button that appears only after the hero, progressive scroll reveal.
 */
(function () {
  'use strict';
  var nav = document.getElementById('mainNav');
  var top = document.querySelector('[data-site-top]');
  var hero = document.querySelector('.masthead');
  var fab = document.querySelector('.fab');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Navbar shrink (from template) + floating call button after the hero
  function onScroll() {
    var y = window.scrollY;
    top.classList.toggle('navbar-shrink', y > 0);
    nav.classList.toggle('navbar-shrink', y > 0);
    if (fab && hero) fab.classList.toggle('show', hero.getBoundingClientRect().bottom < 80);
  }
  onScroll();
  document.addEventListener('scroll', onScroll, { passive: true });

  // Collapse toggle (replaces Bootstrap's collapse plugin)
  var toggler = document.querySelector('.navbar-toggler');
  var menu = document.getElementById('navbarResponsive');
  toggler.addEventListener('click', function () {
    var open = menu.classList.toggle('show');
    toggler.setAttribute('aria-expanded', open ? 'true' : 'false');
    top.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('.nav-link').forEach(function (a) {
    a.addEventListener('click', function () {
      if (menu.classList.contains('show')) toggler.click();
    });
  });

  // Simple scrollspy (replaces Bootstrap ScrollSpy)
  var links = Array.prototype.slice.call(menu.querySelectorAll('.nav-link[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var s = document.querySelector(l.getAttribute('href')); if (s) spy.observe(s); });
  }

  // Progressive scroll reveal: content is visible by default; only after the first user
  // interaction are below-the-fold items hidden and faded in as they enter the viewport.
  var items = document.querySelectorAll('.reveal');
  var armed = false;
  function arm() {
    if (armed || reduceMotion || !('IntersectionObserver' in window)) return;
    armed = true;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.remove('is-pending'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.style.transitionDelay = (i % 3) * 90 + 'ms';
        el.classList.add('is-pending');
        io.observe(el);
      }
    });
  }
  ['wheel', 'touchstart', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, arm, { once: true, passive: true });
  });
})();

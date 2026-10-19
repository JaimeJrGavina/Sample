/*!
 * Luxe layout script for the client-preview kit.
 * Adapted from Start Bootstrap - Agency v7.0.12 scripts.js (https://startbootstrap.com/theme/agency),
 * Copyright 2013-2023 Start Bootstrap, MIT License (see /LICENSE). No Bootstrap JS dependency.
 */
(function () {
  'use strict';
  var top = document.querySelector('[data-site-top]');
  var hero = document.querySelector('.masthead');
  var dock = document.querySelector('.lx-dock');
  var band = document.querySelector('.lx-band-img');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function onScroll() {
    var y = window.scrollY;
    top.classList.toggle('navbar-shrink', y > 10);
    if (dock && hero) dock.classList.toggle('show', hero.getBoundingClientRect().bottom < 120);
    if (band && !reduce) {
      var r = band.parentNode.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) band.style.transform = 'translateY(' + ((r.top + r.height / 2 - window.innerHeight / 2) * -0.12).toFixed(1) + 'px)';
    }
  }
  onScroll();
  document.addEventListener('scroll', onScroll, { passive: true });

  var toggler = document.querySelector('.lx-burger');
  var menu = document.getElementById('navbarResponsive');
  toggler.addEventListener('click', function () {
    var open = menu.classList.toggle('show');
    toggler.setAttribute('aria-expanded', open ? 'true' : 'false');
    top.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { if (menu.classList.contains('show')) toggler.click(); });
  });

  // treatment card -> preselect it in the inquiry form
  var sel = document.getElementById('s');
  document.querySelectorAll('[data-treatment]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!sel) return;
      for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text === a.getAttribute('data-treatment')) sel.selectedIndex = i;
    });
  });

  // scrollspy
  var links = Array.prototype.slice.call(menu.querySelectorAll('.nav-link[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var s = document.querySelector(l.getAttribute('href')); if (s) spy.observe(s); });
  }

  // progressive reveal: armed on first interaction, only for items below the fold
  var items = document.querySelectorAll('.reveal'), armed = false;
  function arm() {
    if (armed || reduce || !('IntersectionObserver' in window)) return;
    armed = true;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove('is-pending'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.style.transitionDelay = (i % 4) * 80 + 'ms';
        el.classList.add('is-pending');
        io.observe(el);
      }
    });
  }
  ['wheel', 'touchstart', 'keydown', 'scroll'].forEach(function (evt) { window.addEventListener(evt, arm, { once: true, passive: true }); });
})();

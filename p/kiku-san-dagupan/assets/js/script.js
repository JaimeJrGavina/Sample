'use strict';

/**
 * Based on the "Grilli" template script by codewithsadee (MIT, see /LICENSE).
 * Adapted: no preloader, header stack hide/show, slider with reduced-motion support.
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/* NAVBAR */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};
addEventOnElements(navTogglers, "click", toggleNavbar);
addEventOnElements(navLinks, "click", function () {
  if (navbar.classList.contains("active")) toggleNavbar();
});

/* HEADER & BACK TOP BTN */
const siteTop = document.querySelector("[data-site-top]");
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const onScroll = function () {
  const y = window.scrollY;
  if (y >= 50) {
    siteTop.classList.add("active");
    header.classList.add("active");
    backTopBtn.classList.add("active");
    siteTop.classList.toggle("hide", y > lastScrollPos && y > 300);
  } else {
    siteTop.classList.remove("active", "hide");
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
  lastScrollPos = y;
};
window.addEventListener("scroll", onScroll, { passive: true });

/* HERO SLIDER */
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  const item = heroSliderItems[currentSlidePos];
  const img = item.querySelector("img[loading=lazy]");
  if (img) img.loading = "eager";
  item.classList.add("active");
  lastActiveSliderItem = item;
};
const slideNext = function () {
  currentSlidePos = currentSlidePos >= heroSliderItems.length - 1 ? 0 : currentSlidePos + 1;
  updateSliderPos();
};
const slidePrev = function () {
  currentSlidePos = currentSlidePos <= 0 ? heroSliderItems.length - 1 : currentSlidePos - 1;
  updateSliderPos();
};
heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn.addEventListener("click", slidePrev);

let autoSlideInterval;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const autoSlide = function () {
  clearInterval(autoSlideInterval);
  if (!reduceMotion) autoSlideInterval = setInterval(slideNext, 7000);
};
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () { clearInterval(autoSlideInterval); });
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
window.addEventListener("load", autoSlide);

/* PARALLAX (desktop pointer only) */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", function (event) {
    const x = -((event.clientX / window.innerWidth) * 10 - 5);
    const y = -((event.clientY / window.innerHeight) * 10 - 5);
    for (let i = 0, len = parallaxItems.length; i < len; i++) {
      const s = Number(parallaxItems[i].dataset.parallaxSpeed);
      parallaxItems[i].style.transform = `translate3d(${x * s}px, ${y * s}px, 0px)`;
    }
  });
}

/* SCROLL REVEAL (progressive: armed only after the first user scroll/interaction) */
const revealItems = document.querySelectorAll(".reveal");
let revealArmed = false;
const armReveal = function () {
  if (revealArmed || reduceMotion || !("IntersectionObserver" in window)) return;
  revealArmed = true;
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove("is-pending");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealItems.forEach(function (el, i) {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      el.classList.add("is-pending");
      io.observe(el);
    }
  });
};
["wheel", "touchstart", "keydown"].forEach(function (evt) {
  window.addEventListener(evt, armReveal, { once: true, passive: true });
});

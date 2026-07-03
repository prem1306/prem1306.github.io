/**
 * animations.js — Intersection Observer-based scroll reveal,
 * stat counter animation, and stagger orchestration.
 */

(function () {
  'use strict';

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // ---- Animated Stat Counters ----
  const statElements = document.querySelectorAll('[data-count]');

  if (statElements.length > 0) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statElements.forEach((el) => countObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }

    requestAnimationFrame(updateCount);
  }

  // ---- Skill Card Stagger ----
  const skillCategories = document.querySelectorAll('.skill-category');
  if (skillCategories.length > 0) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.skill-card');
            cards.forEach((card, i) => {
              card.style.transitionDelay = `${i * 0.04}s`;
              card.classList.add('revealed');
            });
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    skillCategories.forEach((cat) => skillObserver.observe(cat));
  }
})();

/**
 * main.js — Application initialization.
 * Handles: navbar scroll, active section, scroll progress,
 * back-to-top, mobile menu, copy email, loading screen, contact form.
 */

(function () {
  'use strict';

  // ---- Loading Screen ----
  window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 400);
    }
  });

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.navbar-link[href^="#"]');

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Toggle scrolled class
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 50);
    }

    // Active section highlighting
    let currentSection = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  // ---- Scroll Progress Bar ----
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  // ---- Back to Top ----
  const backToTop = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Throttled Scroll Handler ----
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateNavbar();
        updateScrollProgress();
        updateBackToTop();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // Initial call
  updateNavbar();
  updateScrollProgress();

  // ---- Mobile Menu Toggle ----
  const menuToggle = document.getElementById('navbar-toggle');
  const mobileMenu = document.getElementById('navbar-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('.navbar-link').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ---- Smooth Scroll for Nav Links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Copy Email ----
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // ---- Contact Form (Frontend Only) ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }
})();

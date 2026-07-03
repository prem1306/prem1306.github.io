/**
 * typewriter.js — Cycles through an array of strings with a typewriter effect.
 * Types out each word, pauses, deletes, then types the next.
 */

(function () {
  'use strict';

  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const words = [
    'AI & Machine Learning',
    'Computer Vision',
    'Backend Development',
    'Neural Interfaces',
    'Software Engineering',
  ];

  const SPEED = {
    type: 80,      // ms per character typing
    delete: 40,    // ms per character deleting
    pauseEnd: 2000,  // pause after word is fully typed
    pauseStart: 500, // pause before typing next word
  };

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);
    }

    let delay = isDeleting ? SPEED.delete : SPEED.type;

    // Word fully typed
    if (!isDeleting && charIndex === currentWord.length) {
      delay = SPEED.pauseEnd;
      isDeleting = true;
    }

    // Word fully deleted
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = SPEED.pauseStart;
    }

    setTimeout(tick, delay);
  }

  // Start after a brief delay
  setTimeout(tick, 1200);
})();

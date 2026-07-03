/**
 * particles.js — Canvas particle effect for the hero background.
 * Draws connected dots that respond to mouse position.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };
  let animationId;

  const CONFIG = {
    particleCount: 80,
    maxSpeed: 0.4,
    particleSize: 1.5,
    connectionDistance: 130,
    color: { r: 59, g: 130, b: 246 }, // --color-primary
  };

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * CONFIG.maxSpeed,
      vy: (Math.random() - 0.5) * CONFIG.maxSpeed,
      size: Math.random() * CONFIG.particleSize + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    };
  }

  function init() {
    resize();
    particles = [];
    // Scale particle count to screen size
    const count = Math.floor((width * height) / 15000);
    const total = Math.min(count, CONFIG.particleCount);
    for (let i = 0; i < total; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${p.opacity})`;
    ctx.fill();
  }

  function drawConnection(a, b, dist) {
    const opacity = (1 - dist / CONFIG.connectionDistance) * 0.3;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse interaction — gentle push
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 0.5;
          p.y += (dy / dist) * force * 0.5;
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectionDistance) {
          drawConnection(particles[i], particles[j], dist);
        }
      }
    }

    // Particles
    for (const p of particles) {
      drawParticle(p);
    }
  }

  function animate() {
    update();
    draw();
    animationId = requestAnimationFrame(animate);
  }

  // Events
  window.addEventListener('resize', () => {
    resize();
    // Re-init if particle count changed substantially
    const count = Math.min(Math.floor((width * height) / 15000), CONFIG.particleCount);
    if (Math.abs(count - particles.length) > 10) {
      init();
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Reduce animation when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  // Start
  init();
  animate();
})();

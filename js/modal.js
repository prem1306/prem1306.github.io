/**
 * modal.js — Project detail modals.
 * Stores project data and renders full detail views.
 */

(function () {
  'use strict';

  // ---- Project Data ----
  const PROJECTS = {
    'emg': {
      badge: '⭐ Flagship Project',
      badgeClass: 'badge-accent',
      title: 'Neural Prosthetic EMG System',
      tagline: 'Real-time gesture recognition for SHAKTI RISC-V neural prosthetics',
      problem: 'Traditional prosthetic devices lack real-time, low-latency gesture recognition that can run on resource-constrained embedded processors. Existing solutions rely on high-power desktop processing, making them impractical for wearable applications.',
      solution: 'Built a machine learning pipeline that processes EMG signals and classifies hand gestures using lightweight classifiers (SVM, LDA, Random Forest) optimized for deployment on the SHAKTI RISC-V processor with fixed-point arithmetic for sub-100ms latency.',
      tech: ['Python', 'Scikit-learn', 'NumPy', 'Pandas', 'Verilog', 'RISC-V', 'C'],
      highlights: [
        'Fixed-point arithmetic implementation for embedded deployment',
        'Sub-100ms inference latency target',
        'SVM, LDA, and Random Forest classifiers evaluated',
        'Feature extraction: RMS, ZCR, Waveform Length, MAV, Variance',
        'UCI Physical Action EMG Dataset',
        'AMBA AXI / TileLink bus integration design',
        'MMIO-based hardware interface',
        'Hardware pipeline: MyoWare 2.0 → ESP32-S3 → SHAKTI E-Class/C-Class',
      ],
      challenges: [
        'Converting floating-point ML models to fixed-point without significant accuracy loss',
        'Meeting real-time latency constraints on resource-constrained RISC-V cores',
        'Designing synthesizable Verilog for the accelerator module',
      ],
      lessons: [
        'Deep understanding of hardware-software co-design',
        'Importance of feature engineering for embedded ML',
        'Trade-offs between model complexity and inference speed',
      ],
      github: 'https://github.com/prem1306',
    },
    'shopsphere': {
      badge: 'Full-Stack',
      badgeClass: 'badge',
      title: 'ShopSphere',
      tagline: 'Full-stack e-commerce platform',
      problem: 'Needed a complete e-commerce solution to learn full-stack development end-to-end, understanding both frontend user interfaces and backend API design.',
      solution: 'Built a complete e-commerce application from scratch using React.js for the frontend and FastAPI for the backend, with every file written and debugged personally.',
      tech: ['React.js', 'FastAPI', 'Python', 'JavaScript', 'REST API'],
      highlights: [
        'Complete full-stack architecture',
        'React.js frontend with component-based design',
        'FastAPI REST backend',
        'User authentication and session management',
        'Product catalog and search functionality',
        'Shopping cart and checkout flow',
        'Built file-by-file, debugged personally',
      ],
      challenges: [
        'Managing state across frontend components',
        'Designing RESTful API endpoints',
        'Connecting frontend and backend seamlessly',
      ],
      lessons: [
        'Full-stack application architecture patterns',
        'REST API design best practices',
        'Frontend-backend integration workflow',
      ],
      github: 'https://github.com/prem1306',
    },
    'myaiagent': {
      badge: 'AI / Agents',
      badgeClass: 'badge-accent',
      title: 'MyAIAgent',
      tagline: 'Locally-hosted multi-agent AI framework',
      problem: 'Wanted to understand how multi-agent AI systems work by building one from scratch, exploring agent orchestration, LLM integration, and browser extension interfaces.',
      solution: 'Created a multi-agent framework with a FastAPI backend, Gemini 2.5 Flash integration via LiteLLM, SQLite persistence, and a Chrome MV3 extension for browser-based interaction.',
      tech: ['FastAPI', 'LiteLLM', 'Gemini 2.5 Flash', 'SQLite', 'Chrome MV3', 'Python', 'JavaScript'],
      highlights: [
        'Multi-agent orchestration framework',
        'Gemini 2.5 Flash integration via LiteLLM',
        'FastAPI backend with async processing',
        'SQLite for persistent agent memory',
        'Chrome Manifest V3 extension',
        'Presented at university technical session',
      ],
      challenges: [
        'Designing agent communication protocols',
        'Managing async operations across multiple agents',
        'Chrome MV3 service worker limitations',
      ],
      lessons: [
        'LLM orchestration patterns',
        'Chrome extension architecture (MV3)',
        'Importance of agent memory and context management',
      ],
      github: 'https://github.com/prem1306',
    },
    'yatraguide': {
      badge: 'Web App',
      badgeClass: 'badge',
      title: 'Yatra Guide',
      tagline: 'Location-aware travel advisory platform',
      problem: 'Travelers often struggle to find relevant, location-specific information when visiting new places.',
      solution: 'Built a travel advisory platform that provides location-aware travel information and assistance using a traditional web stack.',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      highlights: [
        'Location-based travel recommendations',
        'Responsive web design',
        'Server-side processing with PHP',
        'Interactive map integration',
        'Travel information database',
      ],
      challenges: [
        'Implementing accurate geolocation features',
        'Managing server-side PHP logic',
        'Creating a responsive and intuitive UI',
      ],
      lessons: [
        'Full-stack web development fundamentals',
        'Working with geolocation APIs',
        'PHP backend development',
      ],
      github: 'https://github.com/prem1306',
    },
  };

  // ---- Modal Elements ----
  const overlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');

  if (!overlay || !modalBody) return;

  // ---- Render Modal Content ----
  function renderModal(projectId) {
    const p = PROJECTS[projectId];
    if (!p) return;

    const techTags = p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('');
    const highlights = p.highlights.map((h) => `<li>${h}</li>`).join('');
    const challenges = p.challenges.map((c) => `<li>${c}</li>`).join('');
    const lessons = p.lessons.map((l) => `<li>${l}</li>`).join('');

    modalBody.innerHTML = `
      <span class="${p.badgeClass} modal-badge">${p.badge}</span>
      <h2 class="modal-title">${p.title}</h2>
      <p class="modal-tagline">${p.tagline}</p>

      <div class="modal-section">
        <h3 class="modal-section-title">Problem</h3>
        <p>${p.problem}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Solution</h3>
        <p>${p.solution}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Tech Stack</h3>
        <div class="modal-tech-tags">${techTags}</div>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Highlights</h3>
        <ul>${highlights}</ul>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Challenges</h3>
        <ul>${challenges}</ul>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Lessons Learned</h3>
        <ul>${lessons}</ul>
      </div>

      <div class="modal-section">
        <div class="modal-links">
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            View on GitHub
          </a>
        </div>
      </div>
    `;
  }

  // ---- Open / Close ----
  function openModal(projectId) {
    renderModal(projectId);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---- Event Listeners ----
  // Project cards
  document.querySelectorAll('[data-project]').forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking a link
      if (e.target.closest('a')) return;
      openModal(card.getAttribute('data-project'));
    });
  });

  // Close button
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Click overlay background
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();

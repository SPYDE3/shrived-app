document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Manager ---
  const themeToggleBtn = document.querySelector('[data-theme-toggle]');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('shrived-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('shrived-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }

  // --- Navbar Manager ---
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Highlight active link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- Page Loader ---
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }

  // --- Counter Animation ---
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseFloat(target.getAttribute('data-counter'));
        const suffix = target.getAttribute('data-suffix') || '';
        let currentCount = 0;
        const duration = 2000;
        const step = countTo / (duration / 16); // 60fps

        const updateCounter = () => {
          currentCount += step;
          if (currentCount < countTo) {
            target.textContent = (countTo % 1 !== 0 ? currentCount.toFixed(1) : Math.floor(currentCount)) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = countTo + suffix;
          }
        };
        updateCounter();
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.1 });

  counters.forEach(counter => counterObserver.observe(counter));

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
  
  reveals.forEach(reveal => revealObserver.observe(reveal));

  // --- Toast Notification ---
  window.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Quick inline styling for toast
    Object.assign(toast.style, {
      position: 'fixed', top: '20px', right: '20px',
      padding: '12px 24px', background: type === 'error' ? 'var(--error)' : (type === 'success' ? 'var(--success)' : 'var(--bg-card)'),
      color: type === 'error' || type === 'success' ? '#fff' : 'var(--text-primary)',
      borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-lg)',
      zIndex: '10000', transform: 'translateX(120%)', transition: 'transform 0.3s ease',
      border: '1px solid var(--border-color)'
    });

    document.body.appendChild(toast);
    
    setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 10);
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };
});

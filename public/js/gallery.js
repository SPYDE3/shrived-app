// ============================================================
// SHRIVED. — Sacred Moments Gallery Module
// ============================================================

'use strict';

// Pre-seeded comments database for the lightbox
const galleryComments = {
  gopal: [
    { author: 'Prachi Sen', text: 'Stunning shringar! Reminds me of Vrindavan.' },
    { author: 'Meera Das', text: 'Jai Shri Krishna! Very pure and beautiful abhishek.' }
  ],
  img40: [
    { author: 'Rohit K', text: 'Very neat setup. The flowers are arranged beautifully.' }
  ],
  img41: [
    { author: 'Aurobinda Mohanty', text: 'Superb shringar. Extremely divine.' }
  ],
  img42: [
    { author: 'Rajesh Mishra', text: 'Speechless. Absolutely divine Radha Krishna.' }
  ],
  img43: [
    { author: 'Sarat Chandra', text: 'Jai Jagannath! Brings back memories of Puri.' }
  ],
  v49: [
    { author: 'Subhasish', text: 'The mantras were recited with complete Vedic clarity.' }
  ],
  img47: [
    { author: 'Prangya Paramita', text: 'The Sudasha Brata ghat setup was done exactly as per customs.' }
  ],
  v51: [
    { author: 'Amit Banerjee', text: 'Auspicious havan! The atmosphere felt completely peaceful.' }
  ]
};

let currentLightboxIndex = 0;
let filteredItems = [];

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initLightbox();
  loadReactions();
});

// ===== FILTER SYSTEM =====
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;

      items.forEach(item => {
        const categories = item.dataset.category.split(' ');
        if (filterVal === 'all' || categories.includes(filterVal)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Update visible items list for lightbox navigation
      updateFilteredList();
    });
  });

  updateFilteredList();
}

function updateFilteredList() {
  const items = document.querySelectorAll('.gallery-item');
  filteredItems = [];
  items.forEach(item => {
    if (window.getComputedStyle(item).display !== 'none') {
      filteredItems.push(item);
    }
  });
}

// ===== LIGHTBOX SYSTEM =====
function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!lightbox) return;

  // Add click listener to gallery items
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const idx = filteredItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    }
  });

  closeBtn.addEventListener('click', () => {
    closeLightbox();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById('gallery-lightbox');
  currentLightboxIndex = index;
  renderLightboxContent();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  // Pause any video inside lightbox
  const video = lightbox.querySelector('video');
  if (video) video.pause();
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  if (filteredItems.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + dir + filteredItems.length) % filteredItems.length;
  renderLightboxContent();
}

function renderLightboxContent() {
  const container = document.getElementById('lightbox-media-container');
  const captionText = document.getElementById('lightbox-caption-text');
  const currentItem = filteredItems[currentLightboxIndex];

  if (!currentItem) return;

  const src = currentItem.dataset.src;
  const type = currentItem.dataset.type;
  const caption = currentItem.querySelector('.gallery-caption').textContent;

  // Render media
  if (type === 'video') {
    container.innerHTML = `<video src="${src}" controls autoplay class="lightbox-media"></video>`;
  } else {
    container.innerHTML = `<img src="${src}" alt="${caption}" class="lightbox-media">`;
  }

  // Render caption
  captionText.textContent = caption;

  // Render comments
  renderComments();
}

// ===== REACTION SYSTEM =====
function reactMedia(id, type) {
  const key = `shrived-reaction-${id}-${type}`;
  let count = parseInt(localStorage.getItem(key) || document.getElementById(`${id}-${type}-cnt`).textContent, 10);
  
  // Toggle reaction check
  const reactedKey = `shrived-reacted-${id}-${type}`;
  const alreadyReacted = localStorage.getItem(reactedKey);

  if (alreadyReacted) {
    count--;
    localStorage.removeItem(reactedKey);
  } else {
    count++;
    localStorage.setItem(reactedKey, 'true');
    // Toast notification
    if (window.Shrived && window.Shrived.Toast) {
      window.Shrived.Toast.show('Blessing/Reaction received! 🙏', 'success');
    }
  }

  localStorage.setItem(key, count);
  document.getElementById(`${id}-${type}-cnt`).textContent = count;
}

function loadReactions() {
  const reactionElements = document.querySelectorAll('[id$="-cnt"]');
  reactionElements.forEach(el => {
    const idParts = el.id.split('-');
    if (idParts.length === 3) {
      const id = idParts[0];
      const type = idParts[1];
      const key = `shrived-reaction-${id}-${type}`;
      const savedCount = localStorage.getItem(key);
      if (savedCount !== null) {
        el.textContent = savedCount;
      }
    }
  });
}

// ===== LIGHTBOX COMMENTS =====
function renderComments() {
  const commentsList = document.getElementById('lightbox-comments-list');
  commentsList.innerHTML = '';

  const currentItem = filteredItems[currentLightboxIndex];
  if (!currentItem) return;

  // Extract ID from click selector (e.g. within bless reaction onclick parameters)
  const blessBtn = currentItem.querySelector('[onclick*="reactMedia"]');
  if (!blessBtn) return;

  // Regex to extract reaction ID
  const matches = blessBtn.getAttribute('onclick').match(/reactMedia\('([^']*)'/);
  if (!matches) return;
  const id = matches[1];

  const comments = galleryComments[id] || [];

  if (comments.length === 0) {
    commentsList.innerHTML = '<div style="font-style: italic; color: rgba(255,255,255,0.4); text-align: center; padding: 12px 0;">No blessings yet. Be the first to add one!</div>';
    return;
  }

  comments.forEach(c => {
    const div = document.createElement('div');
    div.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    div.style.paddingBottom = '4px';
    div.innerHTML = `<strong style="color: var(--gold-light);">${c.author}:</strong> <span>${c.text}</span>`;
    commentsList.appendChild(div);
  });
  commentsList.scrollTop = commentsList.scrollHeight;
}

function submitLightboxComment() {
  const input = document.getElementById('lightbox-comment-input');
  const text = input.value.trim();
  if (!text) return;

  const currentItem = filteredItems[currentLightboxIndex];
  if (!currentItem) return;

  const blessBtn = currentItem.querySelector('[onclick*="reactMedia"]');
  if (!blessBtn) return;

  const matches = blessBtn.getAttribute('onclick').match(/reactMedia\('([^']*)'/);
  if (!matches) return;
  const id = matches[1];

  if (!galleryComments[id]) {
    galleryComments[id] = [];
  }

  galleryComments[id].push({
    author: 'You',
    text: text
  });

  input.value = '';
  renderComments();

  if (window.Shrived && window.Shrived.Toast) {
    window.Shrived.Toast.show('Pranam! Blessing submitted.', 'info');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      navHome: "Home",
      navServices: "Services",
      navPandits: "Pandit",
      navGallery: "Gallery",
      navBlog: "Blog",
      navBooking: "Book Now",
      bookNow: "Book Now",
      findPandit: "Find a Pandit",
      viewAll: "View All"
    },
    bn: {
      navHome: "হোম",
      navServices: "সেবা",
      navPandits: "পণ্ডিত",
      navGallery: "গ্যালারি",
      navBlog: "ব্লগ",
      navBooking: "বুক করুন",
      bookNow: "বুক করুন",
      findPandit: "পণ্ডিত খুঁজুন",
      viewAll: "সব দেখুন"
    },
    hi: {
      navHome: "होम",
      navServices: "सेवाएं",
      navPandits: "पंडित",
      navGallery: "गैलरी",
      navBlog: "ब्लॉग",
      navBooking: "बुक करें",
      bookNow: "बुक करें",
      findPandit: "पंडित खोजें",
      viewAll: "सभी देखें"
    },
    od: {
      navHome: "ହୋମ୍",
      navServices: "ସେବା",
      navPandits: "ପଣ୍ଡିତ",
      navGallery: "ଗ୍ୟାଲେରୀ",
      navBlog: "ବ୍ଲଗ୍",
      navBooking: "ବୁକ୍ କରନ୍ତୁ",
      bookNow: "ବୁକ୍ କରନ୍ତୁ",
      findPandit: "ପଣ୍ଡିତ ଖୋଜନ୍ତୁ",
      viewAll: "ସବୁ ଦେଖନ୍ତୁ"
    }
  };

  const currentLang = localStorage.getItem('shrived-lang') || 'en';
  applyLanguage(currentLang);

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang-btn');
      localStorage.setItem('shrived-lang', lang);
      applyLanguage(lang);
      
      document.querySelectorAll('[data-lang-btn]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`[data-lang-btn="${lang}"]`).forEach(b => b.classList.add('active'));
    });
  });

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
    // Set active class on buttons
    document.querySelectorAll('[data-lang-btn]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`[data-lang-btn="${lang}"]`).forEach(b => b.classList.add('active'));
  }
});

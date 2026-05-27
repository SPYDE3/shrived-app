import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

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

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('shrivedpuja-lang') || 'en');

  useEffect(() => {
    localStorage.setItem('shrivedpuja-lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', labelKey: 'navHome', fallback: 'Home' },
    { path: '/services', labelKey: 'navServices', fallback: 'Services' },
    { path: '/pandits', labelKey: 'navPandits', fallback: 'Pandit' },
    { path: '/gallery', labelKey: 'navGallery', fallback: 'Gallery' },
    { path: '/blog', labelKey: 'navBlog', fallback: 'Blog' }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled || location.pathname !== '/' ? 'scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">🕉</div>
            <span className="nav-logo-text">ShrivedPuja.in</span>
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button 
              className="nav-btn-icon cursor-pointer border-none"
              onClick={toggleTheme} 
              title="Toggle Theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            <div className="lang-switch">
              {['en', 'bn', 'hi', 'od'].map((l) => {
                const labelMap = { en: 'EN', bn: 'বাং', hi: 'हि', od: 'ଓ' };
                return (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`lang-btn cursor-pointer ${lang === l ? 'active' : ''}`}
                  >
                    {labelMap[l]}
                  </button>
                );
              })}
            </div>

            <Link to="/booking" className="btn btn-primary btn-sm nav-cta">
              {t('navBooking')}
            </Link>

            <div 
              className={`hamburger ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
          >
            {t(link.labelKey)}
          </Link>
        ))}
        <Link to="/booking">Book a Puja</Link>
      </div>
    </>
  );
};

export default Navbar;

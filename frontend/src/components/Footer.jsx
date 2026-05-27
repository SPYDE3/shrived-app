import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { lang, setLang } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-logo">🕉 Shrived.in</span>
            <p>Connecting modern Hindu families with authentic Vedic rituals, verified pandit, and divine peace across Bangalore & beyond.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/share/1c6AJcNhk4/" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/babusona_happylife" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fa-brands fa-youtube"></i></a>
              <a href="https://wa.me/917003220662" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Puja Services</h4>
            <ul className="footer-links">
              <li><Link to="/booking?puja=satyanarayan" className="footer-link">Satyanarayan Puja</Link></li>
              <li><Link to="/booking?puja=grihapravesh" className="footer-link">Griha Pravesh Havan</Link></li>
              <li><Link to="/booking?puja=marriage" className="footer-link">Marriage Ceremonies</Link></li>
              <li><Link to="/booking?puja=annaprashan" className="footer-link">Annaprashan</Link></li>
              <li><Link to="/booking?puja=durga" className="footer-link">Bengali Rituals</Link></li>
              <li><Link to="/booking?puja=odia" className="footer-link">Odia Rituals</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/gallery" className="footer-link">Sacred Moments Gallery</Link></li>
              <li><Link to="/blog" className="footer-link">Spiritual Blog</Link></li>
              <li><Link to="/booking" className="footer-link">Book a Puja</Link></li>
              <li><Link to="/pandits" className="footer-link">Our Pandit Ji</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 Shrived.in. All rights reserved. Built with devotion 🙏</span>
          <div className="footer-lang-switcher">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
            <button className={`lang-btn ${lang === 'bn' ? 'active' : ''}`} onClick={() => setLang('bn')}>বাংলা</button>
            <button className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>हिंदी</button>
            <button className={`lang-btn ${lang === 'od' ? 'active' : ''}`} onClick={() => setLang('od')}>ଓଡ଼ିଆ</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

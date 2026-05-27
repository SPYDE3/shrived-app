import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Pandits from './pages/Pandits';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Booking from './pages/Booking';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className="app-container min-h-screen flex flex-col justify-between bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pandits" element={<Pandits />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/booking" element={<Booking />} />
                {/* Fallback */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>

            <Footer />
            
            {/* Overlay components */}
            <WhatsAppFAB />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

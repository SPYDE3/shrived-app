import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PUJA_LIST } from '../utils/searchHelper';

const Booking = () => {
  const [showCallModal, setShowCallModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pujaName, setPujaName] = useState('');
  const location = useLocation();

  const pujaPricing = {
    grihapravesh: 'Griha Pravesh (House Warming)',
    satyanarayan: 'Satyanarayan Vrat Katha',
    durga: 'Bengali Durga Puja Rituals',
    odia: 'Odia Sudasha Brata / Laxmi Puja',
    marriage: 'Traditional Hindu Marriage',
    havan: 'Ganesh Puja & Havan Combo',
    'sudasha-brata': 'Odia Sudasha Brata Special',
    'lokkhi-puja': 'Kojagori Lokkhi Puja',
    'grihapravesh-vastu': 'Griha Pravesh & Vastu Combo'
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pujaParam = params.get('puja');
    if (pujaParam) {
      const matchedPuja = PUJA_LIST.find(p => p.id === pujaParam.toLowerCase());
      const displayName = matchedPuja 
        ? matchedPuja.name 
        : (pujaPricing[pujaParam.toLowerCase()] || decodeURIComponent(pujaParam));
      setPujaName(displayName);
    }
  }, [location]);

  const number = '917003220662';
  const textMessage = pujaName 
    ? `Hari Om ShrivedPuja.in! I would like to book a ${pujaName} ceremony.`
    : `Hari Om ShrivedPuja.in! I would like to discuss and book a puja.`;

  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(textMessage)}`;

  const handleDirectCall = (e) => {
    e.preventDefault();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) {
      window.location.href = `tel:+${number}`;
    } else {
      setShowCallModal(true);
    }
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(`+${number}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      <section className="section flex items-center justify-center min-h-screen pt-20" style={{ background: "linear-gradient(180deg, var(--bg) 0%, rgba(255,107,26,0.05) 100%)" }}>
        <div className="container flex justify-center">
          <div className="card-glass reveal text-center max-w-[500px] w-full p-12 bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-3xl shadow-xl visible">
            
            <div className="nav-logo-icon text-5xl text-[var(--saffron)] mb-4">🙏</div>
            
            <h2 className="heading-2 font-bold text-2xl mb-2">Book Your Puja</h2>
            
            {pujaName && (
              <div className="mb-4 inline-block px-4 py-1.5 bg-[#FF6B1A]/10 border border-[#FF6B1A]/30 text-[#FF6B1A] font-semibold text-xs rounded-full">
                Selected: {pujaName}
              </div>
            )}

            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              To ensure we capture all your specific community traditions, muhurtam timings, and samagri needs perfectly, please connect with us directly to finalize your booking.
            </p>

            <div className="flex flex-col gap-4">
              <a 
                href={waUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary flex items-center justify-center gap-3 py-4 text-base shadow-md"
              >
                <i className="fa-brands fa-whatsapp text-xl"></i> Chat on WhatsApp
              </a>
              
              <a 
                href="#" 
                onClick={handleDirectCall} 
                className="btn btn-outline flex items-center justify-center gap-3 py-4 text-base border-[var(--saffron)] text-[var(--saffron)]"
              >
                <i className="fa-solid fa-phone text-lg"></i> Direct Call
              </a>
            </div>
            
            <div className="mt-8 text-gray-500 text-xs flex justify-center items-center gap-2">
              <i className="fa-solid fa-clock"></i> Available 24/7 for Spiritual Guidance
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Call Modal */}
      {showCallModal && (
        <div 
          onClick={() => setShowCallModal(false)}
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--bg-surface)] border border-[rgba(212,160,23,0.2)] rounded-3xl p-10 max-w-[450px] w-full text-center relative shadow-2xl animate-fade-in"
          >
            <button 
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl cursor-pointer bg-transparent border-none"
            >
              &times;
            </button>
            
            <div className="call-icon-glow w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF6B1A] to-[#D4A017] text-white flex items-center justify-center text-3xl mx-auto mb-6 relative">
              <i className="fa-solid fa-phone-volume"></i>
              <span className="absolute inset-0 rounded-full border-2 border-[#FF6B1A] animate-ping opacity-75"></span>
            </div>
            
            <h3 className="heading-3 font-semibold text-xl mb-2">Contact Us Directly</h3>
            <p className="text-gray-400 text-sm mb-6">Our spiritual team is available to assist you personally.</p>
            
            <div className="phone-number-display text-3xl font-bold font-sans tracking-wide text-[var(--text-primary)] mb-1">+91 700 322 0662</div>
            <div className="text-gray-500 text-sm mb-8">Pandit Bibhupada Mishra</div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={copyNumber}
                className={`btn btn-outline w-full py-3 flex items-center justify-center gap-2 transition-all duration-300 ${copied ? 'border-[#25D366] text-[#25D366] bg-[#25D366]/5' : ''}`}
              >
                {copied ? (
                  <>
                    <i className="fa-solid fa-check"></i> Copied Successfully!
                  </>
                ) : (
                  <>
                    <i className="fa-regular fa-copy"></i> Copy Number
                  </>
                )}
              </button>
              <a 
                href={waUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;

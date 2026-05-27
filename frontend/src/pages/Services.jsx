import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';
import PujaSearchBar from '../components/PujaSearchBar';
import { PUJA_LIST, searchPujas } from '../utils/searchHelper';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);

  const filteredServices = searchQuery.trim()
    ? searchPujas(searchQuery)
    : PUJA_LIST;

  return (
    <>
      {/* Header */}
      <div className="page-header text-center" style={{ background: "linear-gradient(180deg, rgba(255,107,26,0.05) 0%, var(--bg) 100%)", paddingTop: "140px", paddingBottom: "40px" }}>
        <div className="container reveal visible">
          <div className="nav-logo-icon text-5xl text-[var(--saffron)] mb-4">📿</div>
          <h1 className="display-2 text-4xl font-bold mb-4">Sacred Pujas & Rituals</h1>
          <p className="text-gray-400 max-w-[600px] mx-auto text-base">Select a ceremony below or book instantly on WhatsApp to finalize your divine arrangements.</p>
          
          {/* Search bar inside services page */}
          <div className="mt-8 flex justify-center w-full relative z-50">
            <PujaSearchBar onSearchSubmit={setSearchQuery} placeholder="Search services (e.g. Satyanarayan, Vastu)..." />
          </div>
        </div>
      </div>

      {/* Services Minimalist List Section */}
      <section className="section py-8">
        <div className="container">
          <div className="puja-list-container max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, idx) => (
                <div 
                  key={service.id || idx}
                  className="puja-list-item reveal visible flex items-center justify-between p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl hover:translate-x-3 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className="relative mr-6">
                      <Link 
                        to={`/booking?puja=${service.id}`}
                        className="puja-icon w-[65px] h-[65px] rounded-full border border-[var(--border-color)] bg-[rgba(255,107,26,0.05)] overflow-hidden flex items-center justify-center shadow-sm block hover:border-[var(--saffron)] transition-all duration-300"
                      >
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.name} 
                            className="w-full h-full object-cover hover:scale-110 transition-all duration-300" 
                          />
                        ) : (
                          <span className="text-3xl">{service.icon}</span>
                        )}
                      </Link>
                      <Link 
                        to={`/booking?puja=${service.id}`}
                        className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[var(--saffron)] text-white flex items-center justify-center text-[10px] shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform duration-200 border border-white"
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                    <div className="puja-name font-semibold text-lg">{service.name}</div>
                  </div>
                  
                  <Link 
                    to={`/booking?puja=${service.id}`} 
                    className="w-10 h-10 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20 flex items-center justify-center hover:bg-[var(--gold)] hover:text-white hover:border-[var(--gold)] transition-all duration-300 shadow-sm"
                  >
                    <i className="fa-solid fa-arrow-right text-base"></i>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center max-w-[600px] mx-auto bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 shadow-lg reveal visible">
                <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl mb-6 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  🔍
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">No Puja Found</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-[480px]">
                  We couldn't find a matching ceremony for "{searchQuery}". No worries! Pandit Bibhupada Mishra performs all custom family, regional, and Vedic rituals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <WhatsAppButton 
                    pujaName={searchQuery} 
                    text={`Request "${searchQuery}" on WhatsApp`} 
                    className="px-6 py-3 text-sm flex items-center justify-center gap-2" 
                  />
                  <Link 
                    to="/booking" 
                    className="btn btn-outline px-6 py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-phone"></i> Consult Pandit
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reassurance Section - Premium Luxury CTA */}
      <section className="services-cta-section reveal visible">
        <div className="services-cta-card">
          <div className="services-cta-glow"></div>
          <div className="services-cta-content">
            <div className="services-cta-icon-wrapper">
              🙏
            </div>
            <h2 className="services-cta-title">Couldn’t Find Your Puja?</h2>
            <p className="services-cta-subtitle">
              No worries. Our experienced pandits also perform customized family, regional, temple, and community-specific rituals tailored to your exact needs.
            </p>
            
            <div className="services-cta-buttons">
              <WhatsAppButton 
                text="Chat on WhatsApp" 
                className="services-btn-primary" 
              />
              <Link 
                to="/booking" 
                className="services-btn-secondary"
              >
                <i className="fa-solid fa-phone"></i> Contact Pandit
              </Link>
            </div>
            
            <div className="services-cta-footer">
              <i className="fa-solid fa-shield-halved"></i> Trusted by families across Bangalore and beyond.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

import React, { useState, useEffect } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeIdx, setActiveIdx] = useState(null);
  
  // Local storage based reactions state
  const [reactions, setReactions] = useState(() => {
    const saved = localStorage.getItem('shrived-gallery-reactions');
    return saved ? JSON.parse(saved) : {};
  });

  // Local storage based comments state
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('shrived-gallery-comments');
    if (saved) return JSON.parse(saved);
    
    // Seed initial comments
    return {
      'gp1': [
        { author: 'Amit Banerjee', text: 'Auspicious Griha Pravesh! The setup felt completely peaceful.' }
      ],
      'sn2': [
        { author: 'Prangya Paramita', text: 'The Satyanarayan setup was done exactly as per regional customs.' }
      ],
      'marriage': [
        { author: 'Debasish Banerjee', text: 'Very traditional and highly spiritual. Blessed to witness.' }
      ]
    };
  });

  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    localStorage.setItem('shrived-gallery-reactions', JSON.stringify(reactions));
  }, [reactions]);

  useEffect(() => {
    localStorage.setItem('shrived-gallery-comments', JSON.stringify(comments));
  }, [comments]);

  const galleryItems = [
    { id: 'gp1', img: 'gruhapravesh1.jpg', caption: 'Griha Pravesh Puja Altar', category: 'setup' },
    { id: 'gp2', img: 'gruhapravesh2.jpg', caption: 'House Warming Kalash Ceremony', category: 'setup' },
    { id: 'gp3', img: 'gruhapravesh3.jpg', caption: 'Devotees performing Griha Pravesh', category: 'blessings' },
    { id: 'sn1', img: 'satyanarayan1.jpg', caption: 'Lord Satyanarayan Deity setup', category: 'setup' },
    { id: 'sn2', img: 'satyanarayan2.jpg', caption: 'Satyanarayan Vrat Katha Mandap', category: 'setup' },
    { id: 'sn3', img: 'satyanarayan3.jpg', caption: 'Vedic Satyanarayan Puja offerings', category: 'setup' },
    { id: 'sk1', img: 'sundarkand1.jpg', caption: 'Sundarkanda Path altar decoration', category: 'setup' },
    { id: 'sk2', img: 'sundarkand2.jpg', caption: 'Sacred Sundarkanda chanting session', category: 'pujas' },
    { id: 'marriage', img: 'MARRAIGE.jpg', caption: 'Wedding Vivah Rituals', category: 'setup' },
    { id: 'havan', img: 'HAVAN.jpg', caption: 'Ganesh Puja & Havan Combo', category: 'setup' },
    { id: 'annaprashan', img: 'ANNAPRASANA.jpg', caption: 'Annaprashan Rice Feeding Ceremony', category: 'blessings' },
    { id: 'bengali', img: 'Bengali Rituals.jpg', caption: 'Bengali Puja Traditions', category: 'pujas' },
    { id: 'odia', img: 'Odia Rituals.jpg', caption: 'Odia Puja customs & ghat', category: 'setup' },
    { id: 'temple', img: 'temple ceremonies.jpg', caption: 'Temple Abhishek ceremonies', category: 'setup' },
    { id: 'item1', img: 'fir.jpeg', caption: 'Auspicious Ritual Setup', category: 'pujas' },
    { id: 'item2', img: 'sec.jpeg', caption: 'Divine Ceremony Setup', category: 'setup' },
    { id: 'item3', img: 'thir.jpeg', caption: 'Family Vedic Prayers', category: 'blessings' },
    { id: 'item4', img: 'four.jpeg', caption: 'Sacred Puja Offerings', category: 'pujas' },
    { id: 'item5', img: 'five.jpeg', caption: 'Traditional Puja Samagri', category: 'setup' },
    { id: 'item6', img: 'six.jpeg', caption: 'Havan Kund Fire Ceremony', category: 'pujas' },
    { id: 'item7', img: 'sev.jpeg', caption: 'Devotional Chanting & Prayers', category: 'pujas' },
    { id: 'item8', img: 'eigh.jpeg', caption: 'Holy Temple Sanctum', category: 'setup' },
    { id: 'item9', img: 'nine.jpeg', caption: 'Sacred Kalash Worship', category: 'pujas' },
    { id: 'item10', img: 'ten.jpeg', caption: 'Vedic Blessing Rituals', category: 'blessings' },
    { id: 'item11', img: 'elev.jpeg', caption: 'Divine Altar Decoration', category: 'setup' },
    { id: 'item12', img: 'twel.jpeg', caption: 'Festive Puja Decoration', category: 'setup' },
    { id: 'item13', img: 'thirt.jpeg', caption: 'Pure Spiritual Devotion', category: 'blessings' },
    { id: 'item14', img: 'fourt.jpeg', caption: 'Spiritual Altar Ambience', category: 'setup' },
    { id: 'item15', img: 'fif.jpeg', caption: 'Auspicious Ceremony Blessings', category: 'pujas' },
    { id: 'item16', img: 'WhatsApp Image 2026-05-25 at 11.36.05 AM.jpeg', caption: 'Pandit Ji Vedic Blessings', category: 'blessings' }
  ];

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'all' || item.category === activeFilter
  );

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx(prev => (prev + 1) % filteredItems.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleReact = (id) => {
    setReactions(prev => {
      const current = prev[id] || 0;
      const key = `reacted-${id}`;
      const alreadyReacted = localStorage.getItem(key);

      if (alreadyReacted) {
        localStorage.removeItem(key);
        return { ...prev, [id]: Math.max(0, current - 1) };
      } else {
        localStorage.setItem(key, 'true');
        return { ...prev, [id]: current + 1 };
      }
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim() || activeIdx === null) return;
    
    const activeItem = filteredItems[activeIdx];
    const itemId = activeItem.id;

    setComments(prev => {
      const list = prev[itemId] || [];
      return {
        ...prev,
        [itemId]: [...list, { author: 'You', text: commentInput.trim() }]
      };
    });
    setCommentInput('');
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') setActiveIdx((activeIdx + 1) % filteredItems.length);
      if (e.key === 'ArrowLeft') setActiveIdx((activeIdx - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, filteredItems]);

  const activeItem = activeIdx !== null ? filteredItems[activeIdx] : null;

  return (
    <div className="gallery-page-container">
      {/* Header */}
      <div className="text-center mb-12" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container reveal visible">
          <h1 className="display-2 text-4xl font-bold mb-4 text-[var(--gold-light)]" style={{ fontFamily: "var(--font-heading)" }}>Real Ceremony Moments</h1>
          <p className="text-[#c4b5a5] max-w-[600px] mx-auto text-sm">Explore moments of pure devotion, authentic rituals, and beautifully adorned setups from our recent pujas.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 mb-10" style={{ position: 'relative', zIndex: 1 }}>
        {['all', 'pujas', 'setup', 'blessings'].map((filter) => (
          <button
            key={filter}
            onClick={() => { setActiveFilter(filter); setActiveIdx(null); }}
            className={`gallery-filter-btn px-6 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 ${activeFilter === filter ? 'active' : ''}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Section */}
      <section className="section py-4 relative z-10">
        <div className="container">
          {/* Modern Masonry Grid Layout */}
          <div className="gallery-masonry-grid max-w-[1200px] mx-auto">
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => setActiveIdx(idx)}
                className="gallery-masonry-item reveal visible"
              >
                <img 
                  src={item.img} 
                  alt={item.caption} 
                  loading="lazy"
                />
                
                {/* Minimal Hover Overlay */}
                <div className="gallery-masonry-overlay">
                  <span className="gallery-masonry-category">{item.category}</span>
                  <p className="gallery-masonry-caption">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA - Premium Luxury Section */}
          <div className="gallery-cta-container max-w-[800px] mx-auto relative z-20">
            <div className="gallery-cta-card">
              <div className="gallery-cta-glow"></div>
              <div className="gallery-cta-content text-center">
                <div className="text-3xl text-[var(--gold)] mb-4 sacred-symbol">🕉️</div>
                <h3 className="gallery-cta-title">Ready to Host Your Auspicious Ceremony?</h3>
                <p className="gallery-cta-subtitle">
                  Connect directly with Pandit Bibhupada Mishra on WhatsApp for muhurat consultation, customized puja packages, and pure samagri arrangements.
                </p>
                <div className="flex justify-center mt-8">
                  <WhatsAppButton 
                    text="Consult & Book Puja" 
                    className="gallery-cta-button" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Lightbox Overlay Modal */}
      {activeItem && (
        <div 
          onClick={() => setActiveIdx(null)}
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          {/* Close button */}
          <button 
            onClick={() => setActiveIdx(null)}
            className="absolute top-6 right-6 text-white text-3xl hover:opacity-80 cursor-pointer bg-transparent border-none"
          >
            &times;
          </button>

          {/* Prev/Next buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-6 text-white/50 hover:text-white text-4xl cursor-pointer bg-transparent border-none select-none"
          >
            &#10094;
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-6 text-white/50 hover:text-white text-4xl cursor-pointer bg-transparent border-none select-none"
          >
            &#10095;
          </button>

          {/* Lightbox container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#140d08] border border-[rgba(212,160,23,0.2)] rounded-3xl w-full max-w-[900px] max-h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
          >
            {/* Left: Media */}
            <div className="flex-1 bg-black/50 flex items-center justify-center max-h-[40vh] md:max-h-full">
              <img 
                src={activeItem.img} 
                alt={activeItem.caption} 
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Right: Interaction panel */}
            <div className="w-full md:w-[350px] p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[rgba(212,160,23,0.15)] bg-[#1a110a] text-[#ffeedd]">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-white" style={{ fontFamily: "var(--font-heading)" }}>{activeItem.caption}</h4>
                <div className="flex items-center gap-4 mb-6">
                  {/* Bless/React Button */}
                  <button 
                    onClick={() => handleReact(activeItem.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold cursor-pointer transition-colors duration-300 ${localStorage.getItem(`reacted-${activeItem.id}`) ? 'bg-[#FF6B1A]/20 text-[#FF6B1A] border-[#FF6B1A]' : 'bg-transparent border-[rgba(212,160,23,0.2)] text-gray-400 hover:text-[var(--saffron)]'}`}
                  >
                    🙏 Blessings ({reactions[activeItem.id] || 0})
                  </button>
                </div>

                {/* Comments List */}
                <h5 className="font-semibold text-xs uppercase tracking-wider text-[#d4c2ab] mb-3" style={{ fontFamily: "var(--font-heading)", letterSpacing: '1px' }}>Comments & Prayers</h5>
                <div className="max-h-[200px] overflow-y-auto flex flex-col gap-3 pr-2 text-sm mb-6">
                  {(comments[activeItem.id] || []).length > 0 ? (
                    (comments[activeItem.id] || []).map((c, index) => (
                      <div key={index} className="border-b border-[rgba(212,160,23,0.1)] pb-2">
                        <strong className="text-[var(--gold-light)]">{c.author}:</strong>{' '}
                        <span className="text-gray-300">{c.text}</span>
                      </div>
                    ))
                  ) : (
                    <div className="italic text-[#8b7b6b] text-xs py-4 text-center">No blessings yet. Be the first to leave one!</div>
                  )}
                </div>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input 
                  type="text" 
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Leave a blessing..." 
                  className="flex-grow px-4 py-2 border border-[rgba(212,160,23,0.2)] rounded-full bg-[#140d08] text-[#ffeedd] text-xs focus:outline-none focus:border-[var(--gold)]"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-[#FF6B1A] hover:bg-[#e0560f] text-white font-semibold text-xs rounded-full cursor-pointer border-none"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

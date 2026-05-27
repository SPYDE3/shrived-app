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
      'homam': [
        { author: 'Amit Banerjee', text: 'Auspicious havan! The atmosphere felt completely peaceful.' },
        { author: 'Subhasish', text: 'The mantras were recited with complete Vedic clarity.' }
      ],
      'kalash': [
        { author: 'Prangya Paramita', text: 'The Sudasha Brata ghat setup was done exactly as per customs.' },
        { author: 'Rohit K', text: 'Very neat setup. The flowers are arranged beautifully.' }
      ],
      'rituals': [
        { author: 'Prachi Sen', text: 'Stunning shringar! Reminds me of Vrindavan.' }
      ],
      'blessings': [
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
    { id: 'homam', img: 'ai_homam.png', caption: 'Sacred Homam Fire', type: 'image', category: 'setup' },
    { id: 'item1', img: 'fir.jpeg', caption: 'Authentic Rituals', type: 'image', category: 'pujas' },
    { id: 'item2', img: 'sec.jpeg', caption: 'Divine Setup', type: 'image', category: 'setup' },
    { id: 'item3', img: 'thir.jpeg', caption: 'Family Blessings', type: 'image', category: 'blessings' },
    { id: 'item4', img: 'four.jpeg', caption: 'Traditional Puja', type: 'image', category: 'pujas' },
    { id: 'kalash', img: 'ai_kalash.png', caption: 'Premium Kalash Setup', type: 'image', category: 'setup' },
    { id: 'item5', img: 'five.jpeg', caption: 'Authentic Samagri', type: 'image', category: 'setup' },
    { id: 'item6', img: 'six.jpeg', caption: 'Havan & Homam', type: 'image', category: 'pujas' },
    { id: 'item7', img: 'sev.jpeg', caption: 'Devotional Chanting', type: 'image', category: 'pujas' },
    { id: 'item8', img: 'eigh.jpeg', caption: 'Temple Vibe', type: 'image', category: 'setup' },
    { id: 'item9', img: 'nine.jpeg', caption: 'Auspicious Start', type: 'image', category: 'pujas' },
    { id: 'item10', img: 'ten.jpeg', caption: 'Vedic Blessings', type: 'image', category: 'blessings' },
    { id: 'item11', img: 'elev.jpeg', caption: 'Sacred Environment', type: 'image', category: 'setup' },
    { id: 'item12', img: 'twel.jpeg', caption: 'Festive Decoration', type: 'image', category: 'setup' },
    { id: 'item13', img: 'thirt.jpeg', caption: 'Pure Devotion', type: 'image', category: 'blessings' },
    { id: 'item14', img: 'fourt.jpeg', caption: 'Spiritual Ambience', type: 'image', category: 'setup' },
    { id: 'item15', img: 'fif.jpeg', caption: 'Joyous Ceremony', type: 'image', category: 'pujas' },
    { id: 'item16', img: 'WhatsApp Image 2026-05-25 at 11.36.05 AM.jpeg', caption: 'Purohit Blessings', type: 'image', category: 'blessings' }
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
    <>
      {/* Header */}
      <div className="page-header text-center" style={{ background: "linear-gradient(180deg, rgba(255,107,26,0.05) 0%, var(--bg) 100%)", paddingTop: "140px", paddingBottom: "40px" }}>
        <div className="container reveal visible">
          <div className="nav-logo-icon text-5xl text-[var(--saffron)] mb-4">📸</div>
          <h1 className="display-2 text-4xl font-bold mb-4">Real Ceremony Moments</h1>
          <p className="text-gray-400 max-w-[600px] mx-auto text-base">Explore moments of pure devotion, authentic rituals, and beautifully adorned setups from our recent pujas.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {['all', 'pujas', 'setup', 'blessings'].map((filter) => (
          <button
            key={filter}
            onClick={() => { setActiveFilter(filter); setActiveIdx(null); }}
            className={`px-6 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 ${activeFilter === filter ? 'bg-[var(--gold)] text-white border-[var(--gold)]' : 'bg-transparent border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--gold)]'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Section */}
      <section className="section py-4">
        <div className="container">
          {/* Responsive Masonry Layout */}
          <div className="masonry-gallery max-w-[1200px] mx-auto">
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => setActiveIdx(idx)}
                className="masonry-item reveal visible"
              >
                <img src={item.img} alt={item.caption} />
                <div className="masonry-caption">{item.caption}</div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <h3 className="heading-3 mb-6 text-xl font-semibold">Ready to host your own beautiful ceremony?</h3>
            <WhatsAppButton text="Book Your Puja" className="py-4 px-8 text-base shadow-xl inline-flex" />
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
            className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl w-full max-w-[900px] max-h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
          >
            {/* Left: Media */}
            <div className="flex-1 bg-black flex items-center justify-center max-h-[40vh] md:max-h-full">
              <img 
                src={activeItem.img} 
                alt={activeItem.caption} 
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Right: Interaction panel */}
            <div className="w-full md:w-[350px] p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[var(--border-color)] bg-[var(--bg-card)]">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-[var(--text-primary)]">{activeItem.caption}</h4>
                <div className="flex items-center gap-4 mb-6">
                  {/* Bless/React Button */}
                  <button 
                    onClick={() => handleReact(activeItem.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold cursor-pointer transition-colors duration-300 ${localStorage.getItem(`reacted-${activeItem.id}`) ? 'bg-[#FF6B1A]/20 text-[#FF6B1A] border-[#FF6B1A]' : 'bg-transparent border-[var(--border-color)] text-gray-400 hover:text-[var(--saffron)]'}`}
                  >
                    🙏 Blessings ({reactions[activeItem.id] || 0})
                  </button>
                </div>

                {/* Comments List */}
                <h5 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-3">Comments & Prayers</h5>
                <div className="max-h-[200px] overflow-y-auto flex flex-col gap-3 pr-2 text-sm mb-6">
                  {(comments[activeItem.id] || []).length > 0 ? (
                    (comments[activeItem.id] || []).map((c, index) => (
                      <div key={index} className="border-b border-[var(--border-light)] pb-2">
                        <strong className="text-[var(--gold)]">{c.author}:</strong>{' '}
                        <span className="text-gray-300">{c.text}</span>
                      </div>
                    ))
                  ) : (
                    <div className="italic text-gray-500 text-xs py-4 text-center">No blessings yet. Be the first to leave one!</div>
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
                  className="flex-grow px-4 py-2 border border-[var(--border-color)] rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs focus:outline-none"
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
    </>
  );
};

export default Gallery;

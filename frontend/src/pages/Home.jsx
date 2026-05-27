import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import DailyQuote from '../components/DailyQuote';
import WhatsAppButton from '../components/WhatsAppButton';
import PujaSearchBar from '../components/PujaSearchBar';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const { lang, t } = useLanguage();

  // Loader Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Canvas Diya Particles Animation
  useEffect(() => {
    if (loading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    let animationFrameId;

    function resize() {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 200;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -(Math.random() * 1.5 + 0.5);
        this.radius = Math.random() * 4 + 2;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 100;
        this.opacity = Math.random() * 0.5 + 0.2;
        
        const colors = [
          '255, 180, 50', // gold
          '255, 107, 26', // saffron
          '255, 200, 80'  // light gold
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        this.vx += (Math.random() - 0.5) * 0.1;
        if (this.life > this.maxLife || this.y < -50) {
          this.reset();
        }
      }
      draw() {
        const currentOpacity = this.opacity * (1 - this.life / this.maxLife);
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
        gradient.addColorStop(0, `rgba(${this.color}, ${currentOpacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);
        
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    for (let i = 0; i < 70; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loading]);



  const popularServices = [
    { id: 'grihapravesh', icon: '🏡', title: 'House Warming (Griha Pravesh)', desc: 'Sanctify your new home with positive energy and divine blessings.', image: 'gruhapravesh_user.jpg' },
    { id: 'satyanarayan', icon: '✨', title: 'Satyanarayan Vrat Katha', desc: 'Monthly Purnima puja for peace, wealth, and wellness.', image: 'satyanarayan_user.jpg' },
    { id: 'marriage', icon: '💒', title: 'Marriage Puja & Vivah', desc: 'Complete Vedic marriage ceremonies with traditional customs.', image: 'MARRAIGE.jpg' },
    { id: 'havan', icon: '🔥', title: 'Havan & Homam', desc: 'Sacred fire ceremony to invoke deities and purify surroundings.', image: 'HAVAN.jpg' },
    { id: 'annaprashan', icon: '🍚', title: 'Annaprashan', desc: "Baby's first rice feeding ceremony with traditional blessings.", image: 'ANNAPRASANA.jpg' },
    { id: 'durga', icon: '🔱', title: 'Bengali Rituals', desc: 'Authentic Bengali Durga Puja, Kali Puja, and Saraswati Puja.', image: 'Bengali Rituals.jpg' },
    { id: 'odia', icon: '🛕', title: 'Odia Rituals', desc: 'Traditional Odia Laxmi Puja, Sudasha Brata and regional vrat.', image: 'Odia Rituals.jpg' },
    { id: 'temple', icon: '🕉️', title: 'Temple Ceremonies', desc: 'Special abhishekam and temple offerings managed for you.', image: 'temple ceremonies.jpg' },
    { id: 'sundarkanda', icon: '🐒', title: 'Sundarkanda Path', desc: 'Sacred recitation of Lord Hanuman\'s epic journey for strength and protection.', image: 'sundarkand_user.jpg' },
    { id: 'rudrabhishek', icon: '🔱', title: 'Rudrabhishek Puja', desc: 'Sacred bathing of Shiva Lingam with holy liquids to invoke Lord Shiva\'s blessings.', image: 'rudrabhishek.png' }
  ];

  const galleryPreview = [
    { img: 'fir.jpeg', caption: 'Divine Setup' },
    { img: 'sec.jpeg', caption: 'Sacred Rituals' },
    { img: 'thir.jpeg', caption: 'Family Blessings' },
    { img: 'four.jpeg', caption: 'Traditional Puja' },
    { img: 'five.jpeg', caption: 'Authentic Samagri' },
    { img: 'six.jpeg', caption: 'Havan & Homam' },
    { img: 'sev.jpeg', caption: 'Devotional Chanting' },
    { img: 'eigh.jpeg', caption: 'Temple Vibe' }
  ];

  return (
    <>
      {/* Page Loader */}
      {loading && (
        <div id="page-loader">
          <div className="loader-logo">🕉 ShrivedPuja</div>
          <div className="loader-bar"><div className="loader-bar-fill"></div></div>
        </div>
      )}

      {/* Hero Section */}
      <header className="hero relative overflow-hidden">
        <div className="hero-bg"></div>
        <div className="hero-bg-image" style={{ backgroundImage: "url('threejpeg.jpeg')" }}></div>
        <div className="hero-overlay"></div>
        <canvas ref={canvasRef} className="hero-particles absolute inset-0 w-full h-full pointer-events-none"></canvas>
        
        <div className="container hero-content relative z-10">
          <div className="reveal visible">
            <span className="hero-eyebrow">🕉 Trusted Spiritual Services — Bangalore & Beyond</span>
            <h1>Sacred Ceremonies,<br /><span className="line-gold text-[#D4A017]">Authentically Delivered</span></h1>
            <p className="hero-subtitle">
              Book verified Bengali, Odia & Hindi Pandit in Bangalore. Trusted by 1000+ families for Satyanarayan Puja, Griha Pravesh, Marriage Ceremonies & all Hindu rituals.
            </p>
          </div>

          <div className="reveal visible my-8 flex justify-center relative z-50">
            <PujaSearchBar redirectOnSubmit={true} />
          </div>

          <div className="hero-cta-group reveal visible flex gap-4">
            <Link to="/booking" className="btn btn-saffron bg-[#FF6B1A] text-white px-8 py-3 rounded-full hover:bg-[#e0560f] transition-all font-semibold">Book a Puja</Link>
          </div>

          <div className="hero-stats reveal visible flex gap-12 mt-12">
            <div className="hero-stat flex flex-col">
              <span className="hero-stat-num text-3xl font-bold text-[#D4A017]">1000+</span>
              <span className="hero-stat-label text-sm text-gray-300">Pujas Performed</span>
            </div>
            <div className="hero-stat flex flex-col">
              <span className="hero-stat-num text-3xl font-bold text-[#D4A017]">4.9/5</span>
              <span className="hero-stat-label text-sm text-gray-300">Rating</span>
            </div>
            <div className="hero-stat flex flex-col">
              <span className="hero-stat-num text-3xl font-bold text-[#D4A017]">500+</span>
              <span className="hero-stat-label text-sm text-gray-300">Happy Families</span>
            </div>
          </div>
        </div>
      </header>

      {/* SEO Marquee Banner */}
      <div className="marquee-wrapper overflow-hidden bg-[rgba(255,107,26,0.05)] py-4 border-y border-[var(--border-light)]">
        <div className="marquee-track flex whitespace-nowrap gap-8 animate-[marquee_20s_linear_infinite]">
          {["Near by Odia Nana", "Near by Bengali Pandit", "Near by Hindi Pandit", "Near by North Indian Pandit", "Near by Bengali Thakur Moshai", "Near by Best Hindi Pandit", "Near by Best Odia Pandit", "Nearby Best Bengali Purohit", "Pandit Ji for House Warming Pooja", "Pandit Ji for Satyanarayan Pooja", "Authentic Vedic Priest Bangalore", "Book Pandit Online Bangalore"].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="marquee-item inline-block font-semibold text-sm">{item}</div>
              <div className="marquee-dot w-2 h-2 rounded-full bg-[#FF6B1A] self-center"></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Daily Quotes */}
      <DailyQuote />

      {/* Trust Badges */}
      <section className="section-sm my-20">
        <div className="container">
          <div className="card-glass reveal visible p-10 md:p-12 bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-3xl max-w-[950px] mx-auto shadow-lg relative overflow-hidden">
            <h3 className="display-2 text-center !text-3xl font-bold mb-10" style={{ fontFamily: "var(--font-heading)" }}>Why Families Trust ShrivedPuja</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="trust-icon w-14 h-14 rounded-full bg-[#D4A017]/10 text-[#D4A017] flex items-center justify-center text-2xl mb-4 shadow-sm"><i className="fa-solid fa-certificate"></i></div>
                <div>
                  <strong className="block mb-2 font-bold text-lg text-[var(--text-primary)]">Certified Vedic Pandit</strong>
                  <p className="text-muted text-sm leading-relaxed">Trained in traditional Gurukuls and verified for credentials.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="trust-icon w-14 h-14 rounded-full bg-[#D4A017]/10 text-[#D4A017] flex items-center justify-center text-2xl mb-4 shadow-sm"><i className="fa-solid fa-leaf"></i></div>
                <div>
                  <strong className="block mb-2 font-bold text-lg text-[var(--text-primary)]">Customary Samagri Assistance</strong>
                  <p className="text-muted text-sm leading-relaxed">We provide complete, pure, and natural puja samagri arrangements.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="trust-icon w-14 h-14 rounded-full bg-[#D4A017]/10 text-[#D4A017] flex items-center justify-center text-2xl mb-4 shadow-sm"><i className="fa-solid fa-om"></i></div>
                <div>
                  <strong className="block mb-2 font-bold text-lg text-[var(--text-primary)]">Hassle-Free Authentic Rituals</strong>
                  <p className="text-muted text-sm leading-relaxed">Tailored strictly according to Bengali, Odia, or regional customs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Puja Services Section */}
      <section className="section py-16 bg-[rgba(255,107,26,0.02)]">
        <div className="container">
          <div className="section-header text-center mb-12">
            <span className="eyebrow text-xs uppercase tracking-widest text-[#FF6B1A]">Sacred Offerings</span>
            <h2 className="display-2 text-3xl font-bold my-2">Popular Puja Services</h2>
            <p className="text-gray-400 max-w-[600px] mx-auto">Choose from verified rituals tailored precisely to your community standards, regional languages, and family traditions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularServices.map((service) => (
              <div key={service.id} className="service-card overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between shadow-sm" style={{ padding: 0 }}>
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-gray-900 group">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-lg border border-white/10">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-[var(--text-primary)]">{service.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{service.desc}</p>
                  </div>
                </div>
                
                <div className="px-6 pb-6">
                  <WhatsAppButton 
                    pujaName={service.title} 
                    text="Quick Book" 
                    className="w-full !py-3.5 !rounded-xl !bg-gradient-to-r !from-[#25D366] !to-[#128C7E] hover:!from-[#20ba5a] hover:!to-[#107c6f] !shadow-md hover:!shadow-lg !hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border-none" 
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-primary inline-block">{t('viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* Featured Pandit */}
      <section className="section py-16">
        <div className="container">
          <div className="section-header text-center mb-12">
            <span className="eyebrow text-xs uppercase tracking-widest text-[#FF6B1A]">Our Divine Guide</span>
            <h2 className="display-2 text-3xl font-bold my-2">Meet Our Verified Purohit</h2>
            <p className="text-gray-400">Connect with highly experienced, verified, and gurukul-trained pandit ji.</p>
          </div>
          
          <div className="flex justify-center">
            <div className="pandit-card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden max-w-[450px] w-full shadow-lg">
              <img src="MY_NEWPHOTO.png" alt="Bibhupada Mishra" className="w-full h-[300px] object-cover" />
              <div className="pandit-card-body p-6">
                <h3 className="pandit-name text-xl font-bold mb-1">Pandit Bibhupada Mishra</h3>
                <div className="pandit-meta flex gap-4 text-xs text-gray-400 mb-4">
                  <span><i className="fa-solid fa-location-dot"></i> Bangalore , Electronic City</span>
                  <span><i className="fa-solid fa-language"></i> Odia, Hindi, Bengali, Sanskrit</span>
                </div>
                <div className="pandit-tags flex flex-wrap gap-2 mb-6">
                  <span className="badge badge-saffron text-[10px] bg-[#FF6B1A] text-white px-3 py-1 rounded-full">Odia Customs Expert</span>
                  <span className="badge badge-blue text-[10px] bg-[#FF6B1A] text-white px-3 py-1 rounded-full">Vedic Chanting</span>
                  <span className="badge badge-verified text-[10px] bg-[#25D366] text-white px-3 py-1 rounded-full"><i className="fa-solid fa-check"></i> Verified</span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <WhatsAppButton pujaName="Consultation" text="Contact Pandit Ji" className="w-full py-3" />
                  <Link to="/pandits" className="btn btn-outline text-center py-3">View Full Profile</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section py-16 bg-[rgba(212,160,23,0.03)]">
        <div className="container">
          <div className="section-header text-center mb-12">
            <span className="eyebrow text-xs uppercase tracking-widest text-[#FF6B1A]">Sacred Flow</span>
            <h2 className="display-2 text-3xl font-bold my-2">How it Works</h2>
            <p className="text-gray-400">ShrivedPuja simplifies your spiritual arrangements in simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="how-step text-center">
              <div className="how-step-num w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B1A] to-[#D4A017] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Select Your Puja</h3>
              <p className="text-gray-400 text-sm">Browse catalog, select language, and choose your preferred date.</p>
            </div>
            <div className="how-step text-center">
              <div className="how-step-num w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B1A] to-[#D4A017] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Book Your Pandit</h3>
              <p className="text-gray-400 text-sm">Choose time slot, confirm details via booking form or WhatsApp.</p>
            </div>
            <div className="how-step text-center">
              <div className="how-step-num w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B1A] to-[#D4A017] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">Experience Divine Rituals</h3>
              <p className="text-gray-400 text-sm">Pandit Ji arrives with sacred items and performs authentic ceremony.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Moments Gallery Preview */}
      <section className="section py-16">
        <div className="container">
          <div className="section-header text-center mb-12">
            <span className="eyebrow text-xs uppercase tracking-widest text-[#FF6B1A]">Sacred Moments</span>
            <h2 className="display-2 text-3xl font-bold my-2">Real Ceremony Moments</h2>
            <p className="text-gray-400">Trusted by Families Across Bangalore & Beyond</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryPreview.map((item, idx) => (
              <div key={idx} className="gallery-item relative overflow-hidden rounded-2xl aspect-square shadow-md cursor-pointer hover:scale-[1.03] transition-all duration-300">
                <img src={item.img} alt={item.caption} className="w-full h-full object-cover" />
                <div className="gallery-item-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gallery" className="btn btn-outline inline-block">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Reviews Section - Premium Testimonials */}
      <section className="testimonials-section">
        <div className="container max-w-[950px]">
          <div className="text-center mb-12">
            <h2 className="display-2 !text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>Trusted by Families</h2>
            <div className="testimonial-gold-stars">★★★★★</div>
            <p className="text-[#8b715c] text-sm font-semibold">4.9/5 based on 128+ Google verified reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left side Summary Card */}
            <div className="testimonial-summary-card text-center">
              <div className="gallery-cta-glow"></div>
              <div className="gallery-cta-content">
                <div className="text-4xl text-[#FF6B1A] mb-4 sacred-symbol">🕉</div>
                <h3 className="testimonial-rating-header text-2xl font-bold mb-2">ShrivedPuja Pandits</h3>
                <p className="text-[#705d4b] text-sm mb-8 font-medium">Authentic Religious Services</p>
                <div className="flex flex-col gap-4 max-w-[280px] mx-auto">
                  <a href="#" className="testimonial-btn-google w-full"><i className="fa-brands fa-google mr-2 text-red-500"></i> Read Google Reviews</a>
                  <WhatsAppButton text="Contact on WhatsApp" className="testimonial-btn-whatsapp w-full" />
                </div>
              </div>
            </div>

            {/* Right side Review Cards */}
            <div className="flex flex-col gap-5">
              <div className="testimonial-review-card">
                <div className="flex justify-between items-center mb-3">
                  <span className="testimonial-reviewer-name">Sasmita Nayak</span>
                  <span className="text-[#D4A017] text-xs">★★★★★</span>
                </div>
                <p className="testimonial-review-text">Excellent service! The pandit was professional and knowledgeable about all traditions. Would definitely book again.</p>
              </div>

              <div className="testimonial-review-card">
                <div className="flex justify-between items-center mb-3">
                  <span className="testimonial-reviewer-name">Subhajit Sen</span>
                  <span className="text-[#D4A017] text-xs">★★★★★</span>
                </div>
                <p className="testimonial-review-text">Transparent pricing and smooth booking process. The griha pravesh was handled perfectly.</p>
              </div>

              <div className="testimonial-review-card">
                <div className="flex justify-between items-center mb-3">
                  <span className="testimonial-reviewer-name">Neha Sharma</span>
                  <span className="text-[#D4A017] text-xs">★★★★★</span>
                </div>
                <p className="testimonial-review-text">Great experience! The team was helpful throughout the planning, and the samagri provided was top quality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="section py-16">
        <div className="container">
          <div className="section-header text-center mb-12">
            <span className="eyebrow text-xs uppercase tracking-widest text-[#FF6B1A]">Spiritual Knowledge</span>
            <h2 className="display-2 text-3xl font-bold my-2">Latest from the Blog</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="blog-editorial-card">
              <div className="blog-editorial-img-wrapper">
                <img src="1st.jpeg" alt="Satyanarayan Puja Setup" />
              </div>
              <div className="blog-editorial-body">
                <div className="blog-editorial-meta">
                  <span className="blog-editorial-tag blog-editorial-tag-gold">Puja Guide</span>
                </div>
                <h3 className="blog-editorial-title">Complete Guide to Satyanarayan Puja: Vidhi & Benefits</h3>
                <p className="blog-editorial-desc">Discover the sacred significance and step-by-step procedure for this auspicious vrat.</p>
                <div className="blog-editorial-footer">
                  <Link to="/blog" className="blog-editorial-link">Read More →</Link>
                </div>
              </div>
            </div>

            <div className="blog-editorial-card">
              <div className="blog-editorial-img-wrapper">
                <img src="ai_bengali_festival.png" alt="Bengali Durga Puja Festival" />
              </div>
              <div className="blog-editorial-body">
                <div className="blog-editorial-meta">
                  <span className="blog-editorial-tag blog-editorial-tag-saffron">Festivals</span>
                </div>
                <h3 className="blog-editorial-title">Top 10 Bengali Festivals to Celebrate in Bangalore</h3>
                <p className="blog-editorial-desc">A complete calendar of major Bengali customs and how to prepare for them.</p>
                <div className="blog-editorial-footer">
                  <Link to="/blog" className="blog-editorial-link">Read More →</Link>
                </div>
              </div>
            </div>

            <div className="blog-editorial-card">
              <div className="blog-editorial-img-wrapper">
                <img src="four.jpeg" alt="Blog" />
              </div>
              <div className="blog-editorial-body">
                <div className="blog-editorial-meta">
                  <span className="blog-editorial-tag blog-editorial-tag-blue">Muhurat</span>
                </div>
                <h3 className="blog-editorial-title">Griha Pravesh Muhurat 2026: Best Dates & Vedic Rituals</h3>
                <p className="blog-editorial-desc">Find the most auspicious timings for entering your new home this year.</p>
                <div className="blog-editorial-footer">
                  <Link to="/blog" className="blog-editorial-link">Read More →</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/blog" className="btn btn-outline inline-block">Read More Articles</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

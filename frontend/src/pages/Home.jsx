import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import DailyQuote from '../components/DailyQuote';
import CountdownWidget from '../components/CountdownWidget';
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
    { id: 'grihapravesh', icon: '🏡', title: 'House Warming (Griha Pravesh)', desc: 'Sanctify your new home with positive energy and divine blessings.', image: 'tom-LvelDKbCeZg-unsplash.jpg' },
    { id: 'satyanarayan', icon: '✨', title: 'Satyanarayan Vrat Katha', desc: 'Monthly Purnima puja for peace, wealth, and wellness.', image: 'SATYANARAYAN PUJA.jpg' },
    { id: 'marriage', icon: '💒', title: 'Marriage Puja & Vivah', desc: 'Complete Vedic marriage ceremonies with traditional customs.', image: 'MARRAIGE.jpg' },
    { id: 'havan', icon: '🔥', title: 'Havan & Homam', desc: 'Sacred fire ceremony to invoke deities and purify surroundings.', image: 'HAVAN.jpg' },
    { id: 'annaprashan', icon: '🍚', title: 'Annaprashan', desc: "Baby's first rice feeding ceremony with traditional blessings.", image: 'ANNAPRASANA.jpg' },
    { id: 'durga', icon: '🔱', title: 'Bengali Rituals', desc: 'Authentic Bengali Durga Puja, Kali Puja, and Saraswati Puja.', image: 'Bengali Rituals.jpg' },
    { id: 'odia', icon: '🛕', title: 'Odia Rituals', desc: 'Traditional Odia Laxmi Puja, Sudasha Brata and regional vrat.', image: 'Odia Rituals.jpg' },
    { id: 'temple', icon: '🕉️', title: 'Temple Ceremonies', desc: 'Special abhishekam and temple offerings managed for you.', image: 'temple ceremonies.jpg' },
    { id: 'sundarkanda', icon: '🐒', title: 'Sundarkanda Path', desc: 'Sacred recitation of Lord Hanuman\'s epic journey for strength and protection.', image: 'Sundarkanda.jpg' },
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
          <div className="loader-logo">🕉 Shrived.</div>
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

      {/* Trust Badges & Festival Countdown */}
      <section className="section-sm my-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="card-glass reveal visible p-8 bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-2xl">
            <h3 className="heading-3 mb-6 text-xl font-bold">Why Families Trust Shrived.</h3>
            <div className="trust-items flex flex-col gap-6">
              <div className="trust-item flex gap-4">
                <div className="trust-icon w-10 h-10 rounded-full bg-[#D4A017]/15 text-[#D4A017] flex items-center justify-center text-lg"><i className="fa-solid fa-certificate"></i></div>
                <div>
                  <strong className="block mb-1">Certified Vedic Pandit</strong>
                  <p className="text-muted text-sm">Trained in traditional Gurukuls and verified for credentials.</p>
                </div>
              </div>
              <div className="trust-item flex gap-4">
                <div className="trust-icon w-10 h-10 rounded-full bg-[#D4A017]/15 text-[#D4A017] flex items-center justify-center text-lg"><i className="fa-solid fa-leaf"></i></div>
                <div>
                  <strong className="block mb-1">Customary Samagri Assistance</strong>
                  <p className="text-muted text-sm">We provide complete, pure, and natural puja samagri arrangements.</p>
                </div>
              </div>
              <div className="trust-item flex gap-4">
                <div className="trust-icon w-10 h-10 rounded-full bg-[#D4A017]/15 text-[#D4A017] flex items-center justify-center text-lg"><i className="fa-solid fa-om"></i></div>
                <div>
                  <strong className="block mb-1">Hassle-Free Authentic Rituals</strong>
                  <p className="text-muted text-sm">Tailored strictly according to Bengali, Odia, or regional customs.</p>
                </div>
              </div>
            </div>
          </div>

          <CountdownWidget />
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
                  <div className="relative h-56 w-full overflow-hidden bg-gray-900">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
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
              <img src="My_photo.jpeg" alt="Bibhupada Mishra" className="w-full h-[300px] object-cover" />
              <div className="pandit-card-body p-6">
                <h3 className="pandit-name text-xl font-bold mb-1">Pandit Bibhupada Mishra</h3>
                <div className="pandit-meta flex gap-4 text-xs text-gray-400 mb-4">
                  <span><i className="fa-solid fa-location-dot"></i> Bangalore</span>
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
            <p className="text-gray-400">Shrived simplifies your spiritual arrangements in simple steps.</p>
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

      {/* Reviews Section */}
      <section className="section py-16 border-t border-[var(--border-color)]">
        <div className="container max-w-[900px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Trusted by Families</h2>
            <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
            <p className="text-gray-400 text-sm">4.9/5 based on 128+ Google verified reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-center p-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl">
              <div className="text-4xl text-[#FF6B1A] mb-4">🕉</div>
              <h3 className="text-xl font-bold mb-1">Shrived Pandits</h3>
              <p className="text-gray-400 text-sm mb-6">Authentic Religious Services</p>
              <div className="flex flex-col gap-3">
                <a href="#" className="btn btn-outline w-full py-3"><i className="fa-brands fa-google mr-2 text-red-500"></i> Read Google Reviews</a>
                <WhatsAppButton text="Contact on WhatsApp" className="w-full py-3" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">Sasmita Nayak</span>
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">Excellent service! The pandit was professional and knowledgeable about all traditions. Would definitely book again.</p>
              </div>

              <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">Subhajit Sen</span>
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">Transparent pricing and smooth booking process. The griha pravesh was handled perfectly.</p>
              </div>

              <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">Neha Sharma</span>
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">Great experience! The team was helpful throughout the planning, and the samagri provided was top quality.</p>
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
            <div className="blog-card rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] hover:translate-y-[-6px] transition-all duration-300">
              <img src="ai_satyanarayan.png" alt="Satyanarayan Puja Setup" className="w-full h-[200px] object-cover" />
              <div className="blog-card-body p-5">
                <span className="badge badge-gold bg-[#D4A017]/20 text-[#D4A017] text-[10px] px-3 py-1 rounded-full mb-3 inline-block">Puja Guide</span>
                <h3 className="font-semibold text-lg mb-2">Complete Guide to Satyanarayan Puja: Vidhi & Benefits</h3>
                <p className="text-sm text-gray-400 mb-4">Discover the sacred significance and step-by-step procedure for this auspicious vrat.</p>
                <div className="text-right"><Link to="/blog" className="text-xs font-semibold text-[#FF6B1A] hover:underline">Read More →</Link></div>
              </div>
            </div>

            <div className="blog-card rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] hover:translate-y-[-6px] transition-all duration-300">
              <img src="ai_bengali_festival.png" alt="Bengali Durga Puja Festival" className="w-full h-[200px] object-cover" />
              <div className="blog-card-body p-5">
                <span className="badge badge-saffron bg-[#FF6B1A]/20 text-[#FF6B1A] text-[10px] px-3 py-1 rounded-full mb-3 inline-block">Festivals</span>
                <h3 className="font-semibold text-lg mb-2">Top 10 Bengali Festivals to Celebrate in Bangalore</h3>
                <p className="text-sm text-gray-400 mb-4">A complete calendar of major Bengali customs and how to prepare for them.</p>
                <div className="text-right"><Link to="/blog" className="text-xs font-semibold text-[#FF6B1A] hover:underline">Read More →</Link></div>
              </div>
            </div>

            <div className="blog-card rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] hover:translate-y-[-6px] transition-all duration-300">
              <img src="four.jpeg" alt="Blog" className="w-full h-[200px] object-cover" />
              <div className="blog-card-body p-5">
                <span className="badge badge-blue bg-[#D4A017]/20 text-[#D4A017] text-[10px] px-3 py-1 rounded-full mb-3 inline-block">Muhurat</span>
                <h3 className="font-semibold text-lg mb-2">Griha Pravesh Muhurat 2026: Best Dates & Vedic Rituals</h3>
                <p className="text-sm text-gray-400 mb-4">Find the most auspicious timings for entering your new home this year.</p>
                <div className="text-right"><Link to="/blog" className="text-xs font-semibold text-[#FF6B1A] hover:underline">Read More →</Link></div>
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

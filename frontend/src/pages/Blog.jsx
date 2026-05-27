import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const getTagClass = (tag) => {
    const t = tag.toLowerCase();
    if (t.includes('fest') || t.includes('odia') || t.includes('custom')) {
      return 'blog-editorial-tag-saffron';
    } else if (t.includes('muhur') || t.includes('blue')) {
      return 'blog-editorial-tag-blue';
    }
    return 'blog-editorial-tag-gold';
  };

  const blogPosts = [
    {
      img: 'ai_homam.png',
      tag: 'Muhurtam & Custom',
      title: 'Significance of Griha Pravesh & Vastu Havan',
      desc: 'Moving into a new house in Bangalore? Learn why performing Vastu Shanti and boiling milk brings positive energy and long term happiness to your family.'
    },
    {
      img: 'ai_sudasha_brata.png',
      tag: 'Odia Customs',
      title: 'How to Perform Sudasha Brata in Bangalore',
      desc: 'A step-by-step guide to arranging Sudasha Brata puja at home, including essential checklist of 10 brass items, threads, and customized prasad recipes.'
    },
    {
      img: 'ai_satyanarayan.png',
      tag: 'Vedic Rituals',
      title: 'Rules of Satyanarayan Vrat Katha Puja',
      desc: 'Discover the correct timings, auspiousness of Purnima, and details on preparing Shini prasad for Lord Satyanarayan to clear blocks and fetch health.'
    },
    {
      img: 'ai_home_mandir.png',
      tag: 'Daily Spiritual',
      title: 'Setting Up a Peaceful Altar (Mandir) at Home',
      desc: 'Guidelines on arranging deities, direction matching, ghee diya placement, and daily prayers to build a high vibration temple inside modern apartments.'
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      {/* Header Banner */}
      <section className="section-sm text-center bg-gradient-to-b from-[#FF6B1A]/5 to-transparent pt-32 pb-12">
        <div className="container">
          <div className="reveal visible">
            <span className="label text-[#FF6B1A] font-semibold text-sm">Spiritual Insights</span>
            <h1 className="display-2 text-4xl font-bold mt-2">Vedic Insights Blog</h1>
            <p className="text-gray-400 max-w-[600px] mx-auto mt-4 text-base">Explore deep articles detailing ritual customs, puja materials setup, local muhurtam updates, and spiritual living guidance.</p>
          </div>
        </div>
      </section>

      {/* Blog List Grid */}
      <section className="section-sm py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="blog-editorial-card">
                <div className="blog-editorial-img-wrapper">
                  <img src={post.img} alt={post.title} />
                </div>
                <div className="blog-editorial-body">
                  <div className="blog-editorial-meta">
                    <span className={`blog-editorial-tag ${getTagClass(post.tag)}`}>
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="blog-editorial-title">{post.title}</h3>
                  <p className="blog-editorial-desc">{post.desc}</p>
                  <div className="blog-editorial-footer">
                    <Link to="#" className="blog-editorial-link">Read Article →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="section py-16 bg-[rgba(255,107,26,0.02)]">
        <div className="container text-center">
          <div className="reveal visible max-w-[550px] mx-auto">
            <h2 className="heading-1 text-3xl font-bold mb-4">Receive Auspicious Muhurtam Updates</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Subscribe to our bi-weekly spiritual newsletter containing festival calendars, tithi updates, and customized Bangalore muhurtam details.</p>
            
            {subscribed ? (
              <div className="p-4 bg-[#25D366]/20 border border-[#25D366] text-[#25D366] rounded-full font-semibold text-sm">
                🙏 Pranam! Thank you for subscribing.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 flex-wrap justify-center">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required
                  className="px-5 py-3 border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-full text-sm outline-none focus:border-[var(--gold)] w-full max-w-[320px]"
                />
                <button type="submit" className="btn btn-primary cursor-pointer border-none">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

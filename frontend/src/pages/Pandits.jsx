import React from 'react';
import WhatsAppButton from '../components/WhatsAppButton';

const Pandits = () => {
  return (
    <section className="section py-32">
      <div className="container">
        <div className="section-header text-center mb-12">
          <span className="eyebrow text-xs uppercase tracking-widest text-[#FF6B1A]">Divine Guides</span>
          <h1 className="display-2 text-4xl font-bold my-2">Verified Pandit Profiles</h1>
          <p className="text-gray-400">Book experienced priests, carefully vetted for authenticity, knowledge, and adherence to community customs.</p>
        </div>

        <div className="flex justify-center mt-8">
          {/* Pandit 1 */}
          <div className="pandit-card bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden max-w-[500px] w-full shadow-xl">
            <img src="My_photo.jpeg" alt="Bibhupada Mishra" className="w-full h-[350px] object-cover" />
            <div className="pandit-card-body p-8">
              <h3 className="pandit-name text-2xl font-bold mb-2">Pandit Bibhupada Mishra</h3>
              
              <div className="pandit-meta flex gap-6 text-sm text-gray-400 mb-4">
                <span><i className="fa-solid fa-location-dot"></i> Bangalore</span>
                <span><i className="fa-solid fa-language"></i> Odia, Hindi, Bengali, Sanskrit</span>
              </div>
              
              <div className="pandit-tags flex flex-wrap gap-2 mb-6">
                <span className="badge badge-saffron bg-[#FF6B1A] text-white px-3 py-1 rounded-full text-xs">Odia Customs Expert</span>
                <span className="badge badge-verified bg-[#25D366] text-white px-3 py-1 rounded-full text-xs"><i className="fa-solid fa-check"></i> Verified</span>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Highly experienced in traditional Odia marriage rituals, Sudasha Brata, Kojagori Lokkhi Puja, Griha Pravesh, and Lord Satyanarayan Katha. He provides complete, pure Vedic samagri arrangement assistance and conducts rituals with deep devotion and explanations of mantras.
              </p>
              
              <div className="pandit-actions flex flex-col gap-3">
                <WhatsAppButton pujaName="Consultation" text="Chat & Book Pandit Ji" className="w-full py-4 text-base" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pandits;

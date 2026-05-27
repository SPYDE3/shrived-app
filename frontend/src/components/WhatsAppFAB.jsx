import React from 'react';

const WhatsAppFAB = ({ pujaName }) => {
  const number = '917003220662';
  const defaultText = pujaName 
    ? `Hello Pandit Ji, I want to book ${pujaName}.`
    : `Pranam Shrived, I'd like to book a puja/pandit service.`;

  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(defaultText)}`;

  return (
    <a 
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab fixed bottom-6 right-6 w-[60px] h-[60px] rounded-full bg-[#25D366] text-white flex items-center justify-center text-3xl shadow-2xl transition-transform duration-300 hover:scale-110 z-50 animate-[whatsappPulse_2s_infinite]"
      title="Contact us on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
      {/* Dynamic continuous pulse border animation */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></span>
    </a>
  );
};

export default WhatsAppFAB;

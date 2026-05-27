import React from 'react';

const WhatsAppButton = ({ pujaName, text, className = '' }) => {
  const number = '917003220662';
  const defaultText = pujaName 
    ? `Hello Pandit Ji, I want to book ${pujaName}.`
    : `Pranam Shrived.in, I'd like to book a puja/pandit service.`;

  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(defaultText)}`;

  const handleClick = (e) => {
    e.stopPropagation();
    window.open(waUrl, '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className={`btn-whatsapp flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${className}`}
    >
      <i className="fa-brands fa-whatsapp text-lg"></i>
      {text || 'Contact on WhatsApp'}
    </button>
  );
};

export default WhatsAppButton;

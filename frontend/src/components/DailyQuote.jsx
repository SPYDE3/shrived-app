import React, { useState } from 'react';

const DailyQuote = () => {
  const [activeQuoteLang, setActiveQuoteLang] = useState('en');

  const quotes = {
    en: { text: "Perform your duty, abandon attachment to results.", source: "Bhagavad Gita 2.47" },
    bn: { text: "কর্মেই তোমার অধিকার, ফলে কখনো নয়।", source: "শ্রীমদ্ভগবদ্গীতা ২.৪৭" },
    hi: { text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", source: "श्रीमद्भगवद्गीता २.४७" },
    od: { text: "କର୍ମ କରିଚାଲ, ଫଳ ଆଶା ରଖନାହିଁ ।", source: "ଶ୍ରୀମଦଭଗବଦଗୀତା ୨.୪୭" }
  };

  const currentQuote = quotes[activeQuoteLang] || quotes.en;

  return (
    <section className="quote-section reveal visible">
      <div className="container">
        <div className="daily-quote">
          <div className="om-divider"></div>
          <p className="quote-text">"{currentQuote.text}"</p>
          <span className="quote-source">— {currentQuote.source}</span>
          
          <div className="quote-lang-btns">
            {Object.keys(quotes).map((l) => {
              const labels = { en: 'EN', bn: 'বাংলা', hi: 'हिंदी', od: 'ଓଡ଼ିଆ' };
              return (
                <button
                  key={l}
                  onClick={() => setActiveQuoteLang(l)}
                  className={`quote-lang-btn ${activeQuoteLang === l ? 'active' : ''} px-3 py-1 text-xs border border-[var(--border-color)] rounded-full mr-2 cursor-pointer bg-transparent text-[var(--text-secondary)] hover:text-[var(--gold)]`}
                >
                  {labels[l]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyQuote;

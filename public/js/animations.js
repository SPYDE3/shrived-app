document.addEventListener('DOMContentLoaded', () => {
  // Parallax Effect
  const parallaxBg = document.querySelector('.hero-bg-image');
  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    });
  }

  // Daily Quote Rotator
  const quotes = [
    { text: "Perform your duty, abandon attachment to results.", source: "— Bhagavad Gita 2.47" },
    { text: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.", source: "— Bhagavad Gita 2.47" },
    { text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.", source: "— Bhagavad Gita 6.19" }
  ];
  
  const quoteTextElem = document.querySelector('.quote-text');
  const quoteSourceElem = document.querySelector('.quote-source');
  
  if (quoteTextElem && quoteSourceElem) {
    let currentQuote = 0;
    setInterval(() => {
      quoteTextElem.style.opacity = 0;
      quoteSourceElem.style.opacity = 0;
      
      setTimeout(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        quoteTextElem.textContent = `"${quotes[currentQuote].text}"`;
        quoteSourceElem.textContent = quotes[currentQuote].source;
        
        quoteTextElem.style.transition = 'opacity 0.5s ease';
        quoteSourceElem.style.transition = 'opacity 0.5s ease';
        quoteTextElem.style.opacity = 1;
        quoteSourceElem.style.opacity = 1;
      }, 500);
    }, 8000);
  }

  // Festival Countdown
  const festivalNameElem = document.querySelector('.countdown-festival-name');
  if (festivalNameElem) {
    const targetDate = new Date('2026-10-18T00:00:00').getTime(); // Example: Durga Puja 2026
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) return;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const updateUnit = (type, val) => {
        const el = document.querySelector(`[data-countdown="${type}"]`);
        if (el) el.textContent = val.toString().padStart(2, '0');
      };

      updateUnit('days', days);
      updateUnit('hours', hours);
      updateUnit('minutes', minutes);
      updateUnit('seconds', seconds);
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});

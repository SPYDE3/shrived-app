import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountdownWidget = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set Target date for upcoming festival (Durga Puja: October 20, 2026)
    const targetDate = new Date('2026-10-20T00:00:00+05:30').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="countdown-widget reveal reveal-delay-1 flex-col flex-center visible">
      <h4 className="countdown-festival-name mb-4">🌸 Upcoming Festival: Durga Puja</h4>
      
      <div className="countdown-timer flex justify-center gap-4 my-6">
        <div className="countdown-unit flex flex-col items-center">
          <span className="countdown-num text-3xl font-bold text-[var(--gold)]">{formatNumber(timeLeft.days)}</span>
          <span className="countdown-label text-[10px] uppercase tracking-wider text-[var(--text-muted)] mt-1">Days</span>
        </div>
        <div className="countdown-unit flex flex-col items-center">
          <span className="countdown-num text-3xl font-bold text-[var(--gold)]">{formatNumber(timeLeft.hours)}</span>
          <span className="countdown-label text-[10px] uppercase tracking-wider text-[var(--text-muted)] mt-1">Hrs</span>
        </div>
        <div className="countdown-unit flex flex-col items-center">
          <span className="countdown-num text-3xl font-bold text-[var(--gold)]">{formatNumber(timeLeft.minutes)}</span>
          <span className="countdown-label text-[10px] uppercase tracking-wider text-[var(--text-muted)] mt-1">Mins</span>
        </div>
        <div className="countdown-unit flex flex-col items-center">
          <span className="countdown-num text-3xl font-bold text-[var(--gold)]">{formatNumber(timeLeft.seconds)}</span>
          <span className="countdown-label text-[10px] uppercase tracking-wider text-[var(--text-muted)] mt-1">Secs</span>
        </div>
      </div>
      
      <p className="text-muted mt-4 text-sm text-[var(--text-muted)]">Book your slots early for the festival season!</p>
      <Link to="/booking" className="btn btn-outline btn-sm mt-4 inline-block">Pre-book Now</Link>
    </div>
  );
};

export default CountdownWidget;

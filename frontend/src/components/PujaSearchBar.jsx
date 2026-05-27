import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchPujas } from '../utils/searchHelper';

const PujaSearchBar = ({ onSearchSubmit, redirectOnSubmit = false, placeholder = "Search Pujas (e.g. Satyanarayan, Griha Pravesh)..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Sync query with URL search param on mount / location change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (!redirectOnSubmit) {
      setQuery(searchParam || '');
    }
  }, [location.search, redirectOnSubmit]);

  // Update autocomplete predictions as user types
  useEffect(() => {
    if (query.trim().length > 1) {
      const matches = searchPujas(query);
      setSuggestions(matches.slice(0, 5)); // Limit to top 5 matches
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
    setSelectedIdx(-1);
  }, [query]);

  // Propagate query changes to parent for real-time filtering if onSearchSubmit is provided
  useEffect(() => {
    if (!redirectOnSubmit && onSearchSubmit) {
      onSearchSubmit(query);
    }
  }, [query, redirectOnSubmit, onSearchSubmit]);

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIdx >= 0 && selectedIdx < suggestions.length) {
        handleSelectPuja(suggestions[selectedIdx]);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const handleSelectPuja = (puja) => {
    setQuery(puja.name);
    setShowDropdown(false);
    
    if (redirectOnSubmit) {
      // For Homepage, redirect straight to booking details or services
      navigate(`/booking?puja=${puja.id}`);
    } else if (onSearchSubmit) {
      // For Services page, trigger local filter immediately
      onSearchSubmit(puja.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    
    if (redirectOnSubmit) {
      navigate(`/services?search=${encodeURIComponent(query)}`);
    } else if (onSearchSubmit) {
      onSearchSubmit(query);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[600px] z-[40]">
      <form onSubmit={handleSubmit} className="hero-search flex w-full relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder} 
          className="flex-grow p-4 pr-12 rounded-l-full bg-white text-black outline-none border-none text-base w-full shadow-md placeholder-gray-400 focus:ring-2 focus:ring-[#FF6B1A]/50"
        />
        <button 
          type="submit" 
          className="search-btn bg-[#FF6B1A] hover:bg-[#e0560f] text-white px-8 rounded-r-full font-semibold transition-all cursor-pointer border-none shadow-md"
        >
          Search
        </button>
      </form>

      {/* Autocomplete Predictions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden animate-[modalFadeIn_0.2s_ease-out_forwards]">
          {suggestions.map((puja, idx) => (
            <div
              key={puja.id}
              onClick={() => handleSelectPuja(puja)}
              onMouseEnter={() => setSelectedIdx(idx)}
              className={`flex items-center gap-3 px-5 py-3 cursor-pointer text-sm transition-colors duration-200 border-b border-[var(--border-light)] last:border-b-0 ${selectedIdx === idx ? 'bg-[var(--gold)]/10 text-[var(--gold)] font-medium' : 'text-[var(--text-primary)] hover:bg-[var(--gold)]/5'}`}
            >
              <span className="text-lg">{puja.icon}</span>
              <span className="flex-grow text-left">{puja.name}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{puja.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PujaSearchBar;

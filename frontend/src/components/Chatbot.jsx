import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Pranam! I am your spiritual guide at ShrivedPuja. How can I help you today?",
      suggestions: [
        { label: 'New House Puja', query: 'Suggest Puja for new house' },
        { label: 'Odia Pandit', query: 'Odia pandit in Bangalore' },
        { label: 'Satyanarayan', query: 'Satyanarayan Puja details' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
    setInputValue('');
    setIsTyping(true);

    // Process response after delay
    setTimeout(() => {
      setIsTyping(false);
      const query = text.toLowerCase();
      let response = "Pranam! I'm still learning. For detailed puja information, please contact Pandit Ji directly.";
      let hasCta = true;

      if (query.includes('house') || query.includes('griha') || query.includes('vastu')) {
        response = "For a new house, we recommend the <strong>Griha Pravesh Puja</strong> combined with Vastu Shanti Homam to bring peace and prosperity to your new home.";
      } else if (query.includes('satyanarayan') || query.includes('purnima')) {
        response = "<strong>Satyanarayan Vrat Katha</strong> is very auspicious. Pandit Bibhupada Mishra performs this beautifully with traditional rituals.";
      } else if (query.includes('odia') || query.includes('sudasha')) {
        response = "We specialize in Odia rituals! Pandit Bibhupada Mishra (Odia Nana) conducts authentic Sudasha Brata, Laxmi Puja, and Odia marriage ceremonies in Bangalore.";
      } else if (query.includes('bengali') || query.includes('durga')) {
        response = "We have authentic Bengali Purohits for Durga Puja, Kali Puja, Annaprashan, and complete Bengali wedding rituals.";
      } else if (query.includes('cost') || query.includes('price')) {
        response = "Puja Dakshina varies based on the rituals and whether you need Samagri assistance. Please contact us on WhatsApp for exact details.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: response,
        hasCta
      }]);
    }, 1200);
  };

  return (
    <>
      {/* Chatbot FAB */}
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="chatbot-fab fixed bottom-[100px] right-6 w-[60px] h-[60px] rounded-full bg-gradient-to-tr from-[#FF6B1A] to-[#8B0000] text-white flex items-center justify-center text-3xl shadow-2xl transition-transform duration-300 hover:scale-110 z-50 cursor-pointer"
        >
          🕉️
          <div className="chatbot-dot absolute top-0 right-0 w-[14px] h-[14px] bg-[#25D366] border-2 border-white rounded-full"></div>
        </div>
      )}

      {/* Chatbot Window */}
      <div className={`chatbot-window fixed bottom-[100px] right-6 w-[350px] h-[500px] max-h-[calc(100vh-120px)] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="chatbot-header bg-gradient-to-r from-[#FF6B1A] to-[#8B0000] text-white p-4 flex items-center gap-3">
          <div className="chatbot-avatar w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🧘</div>
          <div>
            <div className="chatbot-name font-semibold">ShrivedPuja AI Guide</div>
            <div className="chatbot-status text-[10px] opacity-80">Online • Spiritual Assistant</div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="ml-auto text-white text-2xl hover:opacity-80 cursor-pointer bg-transparent border-none"
          >&times;</button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`chat-bubble max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-[#FF6B1A] text-white rounded-br-none' : 'bg-[var(--bg-card)] border border-[var(--border-color)] rounded-bl-none'}`}>
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                
                {/* Suggestions */}
                {msg.suggestions && (
                  <div className="chat-suggestions flex flex-wrap gap-2 mt-2">
                    {msg.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(s.query)}
                        className="chat-suggestion-btn text-[10px] px-3 py-1 border border-[var(--gold)] text-[var(--gold)] rounded-full hover:bg-[var(--gold)] hover:text-white transition-colors duration-300 cursor-pointer bg-transparent"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* WhatsApp CTA */}
                {msg.hasCta && (
                  <a 
                    href="https://wa.me/917003220662" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="chat-suggestion-btn inline-block text-[11px] px-3 py-1 mt-2 border border-[#25D366] text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-colors duration-300"
                  >
                    <i className="fa-brands fa-whatsapp mr-1"></i> WhatsApp Us
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-msg flex justify-start">
              <div className="chat-bubble bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl rounded-bl-none px-4 py-3">
                <div className="typing-indicator flex gap-1 items-center h-4">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chatbot-input-area p-3 border-t border-[var(--border-light)] flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Ask about pujas, muhurat..." 
            className="chatbot-input flex-1 px-4 py-2 border border-[var(--border-color)] rounded-full bg-[var(--bg-card)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--gold)]"
          />
          <button 
            onClick={() => handleSend(inputValue)}
            className="chatbot-send w-10 h-10 bg-[#FF6B1A] text-white rounded-full flex items-center justify-center hover:opacity-90 cursor-pointer border-none"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;

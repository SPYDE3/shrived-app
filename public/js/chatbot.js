document.addEventListener('DOMContentLoaded', () => {
  const fab = document.getElementById('chatbot-fab-btn');
  const windowEl = document.getElementById('chatbot-box');
  const closeBtn = document.getElementById('close-chatbot');
  const input = document.getElementById('chatbot-text-input');
  const chatArea = document.getElementById('chatbot-chat-area');

  if (!fab || !windowEl) return;

  // Toggle open/close
  fab.addEventListener('click', () => {
    windowEl.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.remove('open');
  });

  // Simple keyword matching for demo
  window.submitSpiritualMsg = function() {
    const text = input.value.trim();
    if (!text) return;
    
    addUserMessage(text);
    input.value = '';
    
    // Show typing
    const typingId = addTypingIndicator();
    
    setTimeout(() => {
      document.getElementById(typingId)?.remove();
      processBotResponse(text.toLowerCase());
    }, 1500);
  };

  window.handleChatEnter = function(e) {
    if (e.key === 'Enter') submitSpiritualMsg();
  };

  window.sendSpiritualQuery = function(text) {
    addUserMessage(text);
    const typingId = addTypingIndicator();
    setTimeout(() => {
      document.getElementById(typingId)?.remove();
      processBotResponse(text.toLowerCase());
    }, 1000);
  };

  function addUserMessage(text) {
    const html = `<div class="chat-msg user"><div class="chat-bubble">${text}</div></div>`;
    chatArea.insertAdjacentHTML('beforeend', html);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function addBotMessage(text, htmlContent = '') {
    const html = `<div class="chat-msg bot"><div class="chat-bubble">${text} ${htmlContent}</div></div>`;
    chatArea.insertAdjacentHTML('beforeend', html);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function addTypingIndicator() {
    const id = 'typing-' + Date.now();
    const html = `<div class="chat-msg bot" id="${id}"><div class="chat-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div></div>`;
    chatArea.insertAdjacentHTML('beforeend', html);
    chatArea.scrollTop = chatArea.scrollHeight;
    return id;
  }

  function processBotResponse(query) {
    let response = "Pranam! I'm still learning. For detailed puja information, please contact Pandit Ji directly.";
    let cta = `<br><a href="https://wa.me/917003220662" target="_blank" class="chat-suggestion-btn" style="display:inline-block; margin-top:8px;">WhatsApp Us</a>`;

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

    addBotMessage(response, cta);
  }
});

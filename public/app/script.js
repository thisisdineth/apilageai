
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Get current time to set greeting
  function setGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    
    if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else if (hour >= 18) {
      greeting = 'Good evening';
    }
    
    document.querySelector('.greeting-text').textContent = `${greeting}, USERNAME`;
  }
  

  // Handle sidebar section toggles
  const sectionToggles = document.querySelectorAll('.sidebar-header-toggle');
  
  sectionToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-toggle');
      const content = document.getElementById(`${sectionId}-content`);
      const chevron = this.querySelector('i[data-lucide="chevron-down"]');
      
      if (content.style.display === 'none') {
        content.style.display = 'block';
        chevron.classList.remove('rotate-minus-90');
      } else {
        content.style.display = 'none';
        chevron.classList.add('rotate-minus-90');
      }
    });
  });
  
  // Handle chat form submission
  const chatForm = document.getElementById('chat-form');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  
  // Enable/disable send button based on input
  messageInput.addEventListener('input', function() {
    if (this.value.trim()) {
      sendButton.disabled = false;
      sendButton.classList.remove('text-muted');
      sendButton.classList.add('text-dark');
    } else {
      sendButton.disabled = true;
      sendButton.classList.add('text-muted');
      sendButton.classList.remove('text-dark');
    }
  });
  
  chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    
    if (message) {
      console.log('Message sent:', message);
      messageInput.value = '';
      sendButton.disabled = true;
      sendButton.classList.add('text-muted');
      sendButton.classList.remove('text-dark');
    }
  });
  
  // Make chat cards clickable
  const chatCards = document.querySelectorAll('.chat-card');
  
  chatCards.forEach(card => {
    card.addEventListener('click', function() {
      const cardTitle = this.querySelector('.card-title').textContent;
      messageInput.value = cardTitle;
      messageInput.focus();
      
      // Trigger input event to enable send button
      const inputEvent = new Event('input', { bubbles: true });
      messageInput.dispatchEvent(inputEvent);
    });
  });
});


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

function toggleDropdown() {
  var dropdown = document.getElementById("mathSymbols");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

function insertSymbol(symbol) {
  var inputField = document.getElementById("message-input");
  inputField.value += symbol;  // Append symbol to the chat input
}

// Close dropdown if clicking outside
window.onclick = function(event) {
  if (!event.target.closest(".dropdown")) {
      document.getElementById("mathSymbols").style.display = "none";
  }
}
// Function to toggle the drop-up menu visibility
function toggleDropUp() {
  document.getElementById("extraOptions").classList.toggle("show");
}

// Close the dropdown if clicked outside
document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".dropdown.drop-up");
  const dropdownContent = document.getElementById("extraOptions");
  if (!dropdown.contains(event.target)) {
    dropdownContent.classList.remove("show");
  }
});
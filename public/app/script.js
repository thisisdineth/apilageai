document.getElementById("toggleSidebar").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("main-content");
  const icon = document.getElementById("sidebarToggleIcon");
  const sidebarBack = document.getElementById("sidebarback");

  sidebar.classList.toggle("hidden");
  content.classList.toggle("full-width");

  if (sidebar.classList.contains("hidden")) {
    icon.classList.replace("fa-arrow-left", "fa-bars");
    sidebarBack.style.display = "block"; 
  } else {
    icon.classList.replace("fa-bars", "fa-arrow-left");
    sidebarBack.style.display = "none"; 
  }
});

document.getElementById("sidebarback").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("main-content");
  const icon = document.getElementById("sidebarToggleIcon");

  // Only remove 'hidden' class and reset the icon when it's not hidden
  if (sidebar.classList.contains("hidden")) {
    sidebar.classList.remove("hidden");
    content.classList.remove("full-width");
    icon.classList.replace("fa-bars", "fa-arrow-left");
    sidebarBack.style.display = "none"; // Hide sidebarback after reopening sidebar
  }
});

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

const chatInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');

// Automatically adjust the height of the input field as the user types
chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = chatInput.scrollHeight + 'px';
});

// Handle Enter key behavior
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    // Prevent the default behavior of "Enter" (which is a new line in a text area)
    event.preventDefault();
    sendMessage();  // Call your function to send the message
  }
  // If Shift + Enter is pressed, allow the default behavior (inserting a new line)
});

// Function to send the message (you can adjust this to your needs)
function sendMessage() {
  const message = chatInput.value;
  if (message.trim() !== '') {
    // Add your send logic here, e.g., sending the message to the server or displaying it
    console.log('Message sent:', message);  // Placeholder for actual sending action
    chatInput.value = '';  // Clear the input field after sending
  }
}

// Chat bubble handling

const chatContent = document.getElementById("chat-content");
const messageInput = document.getElementById("message-input");

function addChatBubble(message, isUser = true) {
  const bubble = document.createElement('div');
  bubble.classList.add('chat-bubble');
  
  if (isUser) {
    bubble.classList.add('user-bubble');
  } else {
    bubble.classList.add('bot-bubble');
  }

  bubble.textContent = message;
  chatContent.appendChild(bubble);
  chatContent.scrollTop = chatContent.scrollHeight; // Scroll to the bottom
}

// Handle form submission (sending the message)
document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const userMessage = messageInput.value.trim();
  if (userMessage) {
    addChatBubble(userMessage, true); // Add user message
    messageInput.value = ''; // Clear input field

    // Simulate bot response after a short delay
    setTimeout(() => {
      addChatBubble('This is a bot response.', false); // Add bot message
    }, 1000);
  }
});
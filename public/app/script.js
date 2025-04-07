document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Get elements
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const sidebarBack = document.getElementById('sidebarback');
  const toggleSidebarBtn = document.getElementById('toggleSidebar');
  const navbar = document.querySelector('.navbar');
  
  // Check screen size and set initial state
  function checkScreenSize() {
    if (window.innerWidth <= 955) {
      // Mobile view - sidebar hidden by default
      sidebar.classList.add('hidden');
      sidebarBack.style.display = 'block';
      navbar.style.display = 'flex'; // Ensure navbar is visible initially
    } else {
      // Desktop view - sidebar visible by default
      sidebar.classList.remove('hidden');
      sidebarBack.style.display = 'none';
      navbar.style.display = 'flex'; // Ensure navbar is visible
    }
  }
  
  // Run on load and on resize
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  
  // Toggle sidebar on hamburger click (mobile)
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    sidebar.classList.toggle('hidden');
    sidebarOverlay.classList.toggle('visible');
    
    // Toggle navbar visibility when sidebar is shown/hidden on mobile
    if (window.innerWidth <= 955) {
      if (sidebar.classList.contains('hidden')) {
        navbar.style.display = 'flex';
        sidebarBack.style.display = 'block';
      } else {
        navbar.style.display = 'none';
        sidebarBack.style.display = 'none';
      }
    }
  });

  // Close sidebar when clicking on overlay (mobile)
  sidebarOverlay.addEventListener('click', function() {
    hamburger.classList.remove('active');
    sidebar.classList.add('hidden');
    this.classList.remove('visible');
    navbar.style.display = 'flex'; // Show navbar when closing sidebar
    sidebarBack.style.display = 'block';
  });

  // Desktop sidebar toggle
  toggleSidebarBtn.addEventListener('click', function() {
    sidebar.classList.add('hidden');
    if (window.innerWidth <= 955) {
      sidebarOverlay.classList.remove('visible');
      navbar.style.display = 'flex'; // Show navbar when closing sidebar on mobile
      sidebarBack.style.display = 'block';
    } else {
      sidebarBack.style.display = 'block';
    }
  });

  // Sidebar back button
  sidebarBack.addEventListener('click', function() {
    sidebar.classList.remove('hidden');
    if (window.innerWidth <= 955) {
      sidebarOverlay.classList.add('visible');
      navbar.style.display = 'none'; // Hide navbar when opening sidebar on mobile
    }
    this.style.display = 'none';
  });

  // Get current time to set greeting
  function setGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    
    if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else if (hour >= 18) {
      greeting = 'Good evening';
    }
    
    document.querySelector('.greeting-text').textContent = `${greeting}, USER`;
  }
  setGreeting();

  // Handle chat form submission
  const chatForm = document.getElementById('chat-form');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  
  // Enable/disable send button based on input
  messageInput.addEventListener('input', function() {
    if (this.value.trim()) {
      sendButton.disabled = false;
      sendButton.classList.remove('text-muted');
      sendButton.classList.add('text-primary');
    } else {
      sendButton.disabled = true;
      sendButton.classList.add('text-muted');
      sendButton.classList.remove('text-primary');
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
      sendButton.classList.remove('text-primary');
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

  // Auto-resize textarea
  messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // Handle Enter key for submission
  messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event('submit'));
    }
  });
});

function toggleDropdown() {
  var dropdown = document.getElementById("mathSymbols");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

function insertSymbol(symbol) {
  var inputField = document.getElementById("message-input");
  inputField.value += symbol;
  inputField.focus();
}

// Close dropdown if clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.btn-icon') && !event.target.closest(".dropdown")) {
    document.getElementById("mathSymbols").style.display = "none";
  }
}

function toggleDropUp() {
  document.getElementById("extraOptions").classList.toggle("show");
}

// Close the dropdown if clicked outside
document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".dropdown.drop-up");
  const dropdownContent = document.getElementById("extraOptions");
  if (!event.target.closest(".dropdown.drop-up")) {
    dropdownContent.classList.remove("show");
  }
});
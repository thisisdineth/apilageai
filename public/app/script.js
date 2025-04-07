
    // JavaScript will be placed here
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize Lucide icons
      lucide.createIcons();
      
      // Mobile sidebar toggle
      const hamburger = document.querySelector('.hamburger');
      const sidebar = document.getElementById('sidebar');
      const sidebarOverlay = document.querySelector('.sidebar-overlay');
      const sidebarBack = document.getElementById('sidebarback');

      // Toggle sidebar on hamburger click
      hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('expanded');
        sidebarOverlay.classList.toggle('visible');
      });

      // Close sidebar when clicking on overlay
      sidebarOverlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        sidebar.classList.remove('expanded');
        this.classList.remove('visible');
      });

      // Desktop sidebar toggle
      document.getElementById("toggleSidebar").addEventListener("click", function () {
        const sidebar = document.getElementById("sidebar");
        const content = document.getElementById("main-content");
        const icon = document.getElementById("sidebarToggleIcon");

        sidebar.classList.toggle("hidden");
        content.classList.toggle("full-width");

        if (sidebar.classList.contains("hidden")) {
          icon.classList.replace("fa-times", "fa-bars");
          sidebarBack.style.display = "block"; 
        } else {
          icon.classList.replace("fa-bars", "fa-times");
          sidebarBack.style.display = "none"; 
        }
      });

      document.getElementById("sidebarback").addEventListener("click", function () {
        const sidebar = document.getElementById("sidebar");
        const content = document.getElementById("main-content");
        const icon = document.getElementById("sidebarToggleIcon");

        if (sidebar.classList.contains("hidden")) {
          sidebar.classList.remove("hidden");
          content.classList.remove("full-width");
          icon.classList.replace("fa-bars", "fa-times");
          sidebarBack.style.display = "none";
        }
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

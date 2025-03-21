
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Show a welcome toast (simplified version)
  showToast("Welcome to Developer page", "You can get an idea about how this AI models are run. and also you can donate us to devlop AI models more better");
  
  // Add animation to the logo elements
  setTimeout(animateLogos, 500);
  
  // Handle mobile menu
  setupMobileMenu();
  
  // Add smooth scrolling for navigation links
  setupSmoothScrolling();
  
  // Add animation to elements when they come into view
  setupScrollAnimations();
});

// Function to show a simple toast notification
function showToast(title, message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
  `;
  
  // Add styles
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'white',
    color: '#333',
    padding: '15px',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: '1000',
    maxWidth: '300px',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  });
  
  // Add to document
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 5000);
}

// Function to animate the logo circles
function animateLogos() {
  const logos = document.querySelectorAll('.logo-circle');
  logos.forEach((logo, index) => {
    setTimeout(() => {
      logo.style.animation = 'float 6s ease-in-out infinite';
      logo.style.animationDelay = `${index * 0.2}s`;
    }, index * 200);
  });
}

// Function to setup mobile menu
function setupMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const bars = document.querySelectorAll('.bar');
  
  if (!menuButton || !mobileMenu) return;
  
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger to X
    if (mobileMenu.classList.contains('active')) {
      bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    });
  });
}

// Function to setup smooth scrolling
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Function to handle animations when elements come into view
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.tech-card, .team-member, .sponsor-tier, .section-title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.classList.contains('section-title') 
          ? 'translateX(-50%) translateY(0)' 
          : entry.target.classList.contains('sponsor-tier featured')
            ? 'scale(1.05) translateY(0)'
            : 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    if (element.classList.contains('section-title')) {
      element.style.transform = 'translateX(-50%) translateY(20px)';
    } else if (element.classList.contains('sponsor-tier featured')) {
      element.style.transform = 'scale(1.05) translateY(20px)';
    } else {
      element.style.transform = 'translateY(20px)';
    }
    
    observer.observe(element);
  });
}

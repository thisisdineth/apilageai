const messages = [
  "අපිලගේ AI වලට අලුත් ඔයාට අපි ගානේ රුපියල් 50 ක Free Credit එකක්!",
  "ලංකාවේ පළවෙනි 🇱🇰 සිංහල multi task AI agent එක්ක කතා කරන්න!",
  "AI වල Premium අත්දෑකීම අදම විදින්න!",
];

let index = 0;
const promoText = document.getElementById("promoText");

setInterval(() => {
  index = (index + 1) % messages.length;
  promoText.innerText = messages[index];
  promoText.classList.remove("fade-in");
  void promoText.offsetWidth; // reflow hack to restart animation
  promoText.classList.add("fadeText");
}, 5000);

function closeBanner() {
  document.getElementById("promoBanner").style.display = "none";
}

function loginNow() {
  window.location.href = "./app/"; // Update with your actual login URL
}
const banner = document.getElementById("offerBanner");
const countdownEl = document.getElementById("countdown");

let hours = 6;
let minutes = 30;
let seconds = 0;

function updateCountdownDisplay(h, m, s) {
  countdownEl.textContent = `Time left: ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
}

function startCountdown() {
  let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  const timer = setInterval(() => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    updateCountdownDisplay(h, m, s);

    if (totalSeconds <= 0) {
      clearInterval(timer);
      // Reset the timer
      setTimeout(startCountdown, 1000); // Restart after 1s
    } else {
      totalSeconds--;
    }
  }, 1000);
}

function closeBanner() {
  banner.style.display = "none";
}

// Init countdown
updateCountdownDisplay(hours, minutes, seconds);
startCountdown();


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('header');
  
  function handleScroll() {
    if (window.scrollY > 10) {
      navbar.querySelector('.navbar').classList.add('navbar-scrolled');
    } else {
      navbar.querySelector('.navbar').classList.remove('navbar-scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          document.querySelector('.navbar-toggler').click();
        }
      }
    });
  });
  
  // Pricing toggle
  const monthlyButton = document.getElementById('monthly-btn');
  const annualButton = document.getElementById('annual-btn');
  const pricingContainer = document.querySelector('#pricing');
  
  if (monthlyButton && annualButton) {
    monthlyButton.addEventListener('click', function() {
      annualButton.classList.remove('active');
      monthlyButton.classList.add('active');
      
      // Update pricing displays
      updatePricing('monthly');
    });
    
    annualButton.addEventListener('click', function() {
      monthlyButton.classList.remove('active');
      annualButton.classList.add('active');
      
      // Update pricing displays
      updatePricing('annual');
    });
  }
  
  function updatePricing(plan) {
    if (plan === 'monthly') {
      // Starter
      pricingContainer.querySelectorAll('.pricing-card')[0].querySelector('.fs-2').textContent = 'Rs. 2,499';
      pricingContainer.querySelectorAll('.pricing-card')[0].querySelectorAll('.text-muted')[1].textContent = '/month';
      pricingContainer.querySelectorAll('.pricing-card')[0].querySelector('.text-primary').style.display = 'none';
      
      // Professional
      pricingContainer.querySelectorAll('.pricing-card')[1].querySelector('.fs-2').textContent = 'Rs. 6,999';
      pricingContainer.querySelectorAll('.pricing-card')[1].querySelectorAll('.text-muted')[1].textContent = '/month';
      pricingContainer.querySelectorAll('.pricing-card')[1].querySelector('.text-primary').style.display = 'none';
      
      // Enterprise
      pricingContainer.querySelectorAll('.pricing-card')[2].querySelector('.fs-2').textContent = 'Rs. 14,999';
      pricingContainer.querySelectorAll('.pricing-card')[2].querySelectorAll('.text-muted')[1].textContent = '/month';
      pricingContainer.querySelectorAll('.pricing-card')[2].querySelector('.text-primary').style.display = 'none';
    } else {
      // Starter
      pricingContainer.querySelectorAll('.pricing-card')[0].querySelector('.fs-2').textContent = 'Rs. 24,990';
      pricingContainer.querySelectorAll('.pricing-card')[0].querySelectorAll('.text-muted')[1].textContent = '/year';
      pricingContainer.querySelectorAll('.pricing-card')[0].querySelector('.text-primary').style.display = 'block';
      
      // Professional
      pricingContainer.querySelectorAll('.pricing-card')[1].querySelector('.fs-2').textContent = 'Rs. 69,990';
      pricingContainer.querySelectorAll('.pricing-card')[1].querySelectorAll('.text-muted')[1].textContent = '/year';
      pricingContainer.querySelectorAll('.pricing-card')[1].querySelector('.text-primary').style.display = 'block';
      
      // Enterprise
      pricingContainer.querySelectorAll('.pricing-card')[2].querySelector('.fs-2').textContent = 'Rs. 149,990';
      pricingContainer.querySelectorAll('.pricing-card')[2].querySelectorAll('.text-muted')[1].textContent = '/year';
      pricingContainer.querySelectorAll('.pricing-card')[2].querySelector('.text-primary').style.display = 'block';
    }
  }
  
  // AI Visualization hover effect
  const aiVisualization = document.querySelector('.ai-visualization');
  if (aiVisualization) {
    aiVisualization.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;
      
      this.querySelector('.main-circle').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    aiVisualization.addEventListener('mouseleave', function() {
      this.querySelector('.main-circle').style.transform = 'translate(0, 0)';
    });
  }
  
  // Handle floating "Ask Me Anything" click to open chat
  const floatingChat = document.querySelector('.top-right');
  if (floatingChat) {
    floatingChat.addEventListener('click', function() {
      // In a real implementation, this would open a chat dialog
      alert('Chat functionality would open here in a real implementation.');
    });
  }
  
  // Partner logos animation on scroll
  const partnerLogos = document.querySelectorAll('.partner-logo');
  if (partnerLogos.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    });
    
    partnerLogos.forEach(logo => {
      logo.style.opacity = '0';
      logo.style.transform = 'translateY(20px)';
      logo.style.transition = 'all 0.5s ease-out';
      observer.observe(logo);
    });
  }
});

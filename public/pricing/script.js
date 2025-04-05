
// DOM Elements
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuButton = document.querySelector('.close-menu');
const priceSlider = document.getElementById('priceSlider');
const priceDisplay = document.getElementById('priceDisplay');
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');
const payButton = document.getElementById('payButton');
const enjoyPlanButton = document.getElementById('enjoyPlanButton');
const paymentAmount = document.getElementById('paymentAmount');
const pricingSection = document.getElementById('pricingSection');
const paymentSection = document.getElementById('paymentSection');
const successSection = document.getElementById('successSection');
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');

// Mock user data - in a real app, this would come from authentication
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com"
};

// Format price with comma separators
function formatPrice(price) {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

// Update price display when slider changes
priceSlider.addEventListener('input', function() {
  const price = parseInt(this.value);
  priceDisplay.textContent = formatPrice(price);
});

// Mobile menu toggle
mobileMenuButton.addEventListener('click', function() {
  mobileMenu.classList.add('active');
});

closeMenuButton.addEventListener('click', function() {
  mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking on a menu item
const mobileMenuItems = mobileMenu.querySelectorAll('.nav-link, .profile-item');
mobileMenuItems.forEach(item => {
  item.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
  });
});

// Flow Control: Next button (Pricing to Payment)
nextButton.addEventListener('click', function() {
  const selectedPrice = priceSlider.value;
  paymentAmount.textContent = formatPrice(selectedPrice);
  
  pricingSection.classList.add('hidden');
  paymentSection.classList.remove('hidden');
  
  // Scroll to top for better UX
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Flow Control: Back button (Payment to Pricing)
backButton.addEventListener('click', function() {
  paymentSection.classList.add('hidden');
  pricingSection.classList.remove('hidden');
  
  // Uncheck payment methods
  paymentMethods.forEach(method => method.checked = false);
  payButton.disabled = true;
  
  // Scroll to top for better UX
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Enable/disable pay button based on payment method selection
paymentMethods.forEach(method => {
  method.addEventListener('change', function() {
    payButton.disabled = false;
  });
});

// Flow Control: Pay button (Payment to Success)
payButton.addEventListener('click', function() {
  // Simulate payment processing
  payButton.textContent = 'Processing...';
  payButton.disabled = true;
  
  setTimeout(() => {
    paymentSection.classList.add('hidden');
    successSection.classList.remove('hidden');
    
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1500);
});

// Flow Control: Enjoy Plan button (Success to Pricing)
enjoyPlanButton.addEventListener('click', function() {
  // Display success toast (in a real app, you'd use a toast library)
  alert('Plan Activated! You now have access to all Apilage AI features.');
  
  // Reset to pricing section
  successSection.classList.add('hidden');
  pricingSection.classList.remove('hidden');
  
  // Reset form states
  priceSlider.value = 200;
  priceDisplay.textContent = formatPrice(200);
  paymentMethods.forEach(method => method.checked = false);
  payButton.disabled = true;
  payButton.textContent = 'Pay Now';
  
  // Scroll to top for better UX
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

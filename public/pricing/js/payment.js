
// Payment methods data
const paymentMethods = {
  paypal: {
    name: 'PayPal',
    description: 'Pay securely using your PayPal account.',
    logo: 'https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png'
  },
  payhere: {
    name: 'PayHere',
    description: 'Fast and secure payment processing.',
    logo: 'https://www.payhere.lk/downloads/images/payhere_logo_dark.png'
  }
};

// Initialize the payment page
function initializePaymentPage() {
  // Get the selected plan details
  const selectedPlan = plans.find(plan => plan.id === appState.selectedPlan);
  if (!selectedPlan) {
    window.location.hash = 'plans';
    return;
  }
  
  // Update order summary
  const summaryPlan = document.getElementById('summary-plan');
  const summaryPrice = document.getElementById('summary-price');
  const summaryTotal = document.getElementById('summary-total');
  
  if (summaryPlan) summaryPlan.textContent = selectedPlan.name;
  if (summaryPrice) summaryPrice.textContent = `$${selectedPlan.price}/${selectedPlan.billingPeriod}`;
  if (summaryTotal) summaryTotal.textContent = `$${selectedPlan.price}`;
  
  // Set up payment methods
  const paymentMethodElements = document.querySelectorAll('.payment-method');
  
  paymentMethodElements.forEach(element => {
    const paymentType = element.dataset.type;
    
    // Add selected class if this method is already selected
    if (appState.selectedPaymentMethod === paymentType) {
      element.classList.add('selected');
    }
    
    // Add click handler
    element.addEventListener('click', () => {
      // Deselect all methods
      paymentMethodElements.forEach(el => {
        el.classList.remove('selected');
      });
      
      // Select this method
      element.classList.add('selected');
      
      // Update app state
      appState.selectedPaymentMethod = paymentType;
      
      // Enable complete payment button
      const completePaymentButton = document.getElementById('complete-payment-button');
      if (completePaymentButton) {
        completePaymentButton.disabled = false;
      }
    });
  });
  
  // Handle back button
  const backButton = document.getElementById('payment-back-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.hash = 'user-details';
    });
  }
  
  // Handle complete payment button
  const completePaymentButton = document.getElementById('complete-payment-button');
  if (completePaymentButton) {
    // Disable button if no payment method selected
    completePaymentButton.disabled = !appState.selectedPaymentMethod;
    
    completePaymentButton.addEventListener('click', () => {
      if (!appState.selectedPaymentMethod) return;
      
      // Show loading state
      completePaymentButton.disabled = true;
      completePaymentButton.innerHTML = '<span class="loading">Processing</span>';
      
      // Generate order number
      appState.orderNumber = generateOrderNumber();
      
      // Simulate payment processing
      setTimeout(() => {
        window.location.hash = 'confirmation';
      }, 2000);
    });
  }
}

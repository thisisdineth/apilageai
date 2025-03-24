
// App-wide state
const appState = {
  currentStep: 1,
  totalSteps: 4,
  selectedPlan: null,
  userData: null,
  selectedPaymentMethod: null,
  orderNumber: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app based on URL hash or default to home
  const hash = window.location.hash.substring(1) || 'plans';
  navigateTo(hash);
  
  // Handle navigation
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'plans';
    navigateTo(hash);
  });
});

// Setup step indicator in the header
function setupStepIndicator(currentStep) {
  const stepIndicator = document.getElementById('step-indicator');
  if (!stepIndicator) return;
  
  stepIndicator.innerHTML = '';
  
  for (let i = 1; i <= appState.totalSteps; i++) {
    const step = document.createElement('div');
    step.className = 'step';
    
    if (i === currentStep) {
      step.classList.add('active');
    } else if (i < currentStep) {
      step.classList.add('completed');
      step.innerHTML = '<i class="fas fa-check"></i>';
    } else {
      step.textContent = i;
    }
    
    stepIndicator.appendChild(step);
    
    // Add connector if not the last step
    if (i < appState.totalSteps) {
      const connector = document.createElement('div');
      connector.className = 'step-connector';
      if (i < currentStep) {
        connector.classList.add('active');
      }
      stepIndicator.appendChild(connector);
    }
  }
}

// Main navigation function
function navigateTo(route) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;
  
  // Set content based on route
  switch (route) {
    case 'plans':
      appState.currentStep = 1;
      const plansTemplate = document.getElementById('plans-template');
      mainContent.innerHTML = plansTemplate.innerHTML;
      initializePlansPage();
      break;
      
    case 'user-details':
      // Only allow if plan is selected
      if (!appState.selectedPlan) {
        window.location.hash = 'plans';
        return;
      }
      appState.currentStep = 2;
      const userDetailsTemplate = document.getElementById('user-details-template');
      mainContent.innerHTML = userDetailsTemplate.innerHTML;
      initializeUserDetailsPage();
      break;
      
    case 'payment':
      // Only allow if user data exists
      if (!appState.userData) {
        window.location.hash = 'user-details';
        return;
      }
      appState.currentStep = 3;
      const paymentTemplate = document.getElementById('payment-template');
      mainContent.innerHTML = paymentTemplate.innerHTML;
      initializePaymentPage();
      break;
      
    case 'confirmation':
      // Only allow if payment method is selected
      if (!appState.selectedPaymentMethod) {
        window.location.hash = 'payment';
        return;
      }
      appState.currentStep = 4;
      const confirmationTemplate = document.getElementById('confirmation-template');
      mainContent.innerHTML = confirmationTemplate.innerHTML;
      initializeConfirmationPage();
      break;
      
    default:
      const notFoundTemplate = document.getElementById('not-found-template');
      mainContent.innerHTML = notFoundTemplate.innerHTML;
      appState.currentStep = null;
      break;
  }
  
  // Update step indicator
  if (appState.currentStep) {
    setupStepIndicator(appState.currentStep);
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Generate a random order number
function generateOrderNumber() {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
}

// Format currency
function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

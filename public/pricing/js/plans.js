
// Plans data
const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 9.99,
    billingPeriod: 'month',
    description: 'Perfect for individuals just getting started.',
    features: [
      { id: 'basic-1', text: 'Core features' },
      { id: 'basic-2', text: 'Up to 5 projects' },
      { id: 'basic-3', text: 'Basic support' },
      { id: 'basic-4', text: 'Limited analytics' }
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 19.99,
    billingPeriod: 'month',
    description: 'Ideal for professionals and growing teams.',
    features: [
      { id: 'pro-1', text: 'All Basic features' },
      { id: 'pro-2', text: 'Up to 20 projects' },
      { id: 'pro-3', text: 'Priority support' },
      { id: 'pro-4', text: 'Advanced analytics' },
      { id: 'pro-5', text: 'Team collaboration' }
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 49.99,
    billingPeriod: 'month',
    description: 'Complete solution for large organizations.',
    features: [
      { id: 'enterprise-1', text: 'All Pro features' },
      { id: 'enterprise-2', text: 'Unlimited projects' },
      { id: 'enterprise-3', text: 'Dedicated support' },
      { id: 'enterprise-4', text: 'Custom analytics' },
      { id: 'enterprise-5', text: 'Advanced security' },
      { id: 'enterprise-6', text: 'API access' }
    ],
    popular: false
  }
];

// Initialize the plans page
function initializePlansPage() {
  // Populate the plans container
  const plansContainer = document.querySelector('.plans-container');
  if (!plansContainer) return;
  
  // Clear existing content
  plansContainer.innerHTML = '';
  
  // Add plans
  plans.forEach(plan => {
    const planCard = createPlanCard(plan);
    plansContainer.appendChild(planCard);
  });
  
  // Handle continue button
  const continueButton = document.getElementById('continue-button');
  if (continueButton) {
    continueButton.addEventListener('click', () => {
      if (appState.selectedPlan) {
        window.location.hash = 'user-details';
      }
    });
    
    // Enable or disable continue button based on selection
    if (appState.selectedPlan) {
      continueButton.disabled = false;
    } else {
      continueButton.disabled = true;
    }
  }
}

// Create a plan card element
function createPlanCard(plan) {
  const planCard = document.createElement('div');
  planCard.className = 'plan-card';
  planCard.dataset.planId = plan.id;
  
  // Add selected class if this plan is selected
  if (appState.selectedPlan && appState.selectedPlan === plan.id) {
    planCard.classList.add('selected');
  }
  
  // Popular badge
  if (plan.popular) {
    const popularBadge = document.createElement('div');
    popularBadge.className = 'plan-popular';
    popularBadge.textContent = 'Popular';
    planCard.appendChild(popularBadge);
  }
  
  // Plan content
  planCard.innerHTML += `
    <h3 class="plan-name">${plan.name}</h3>
    <div class="plan-price">
      <span class="plan-price-amount">$${plan.price}</span>
      <span class="plan-price-period">/${plan.billingPeriod}</span>
    </div>
    <p class="plan-description">${plan.description}</p>
    
    <ul class="plan-features">
      ${plan.features.map(feature => `
        <li class="plan-feature">
          <span class="feature-icon"><i class="fas fa-check"></i></span>
          <span>${feature.text}</span>
        </li>
      `).join('')}
    </ul>
    
    <button class="plan-button ${appState.selectedPlan === plan.id ? 'selected' : ''}">
      ${appState.selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
    </button>
  `;
  
  // Add click event to select plan
  planCard.addEventListener('click', () => {
    // Deselect all plans
    document.querySelectorAll('.plan-card').forEach(card => {
      card.classList.remove('selected');
      card.querySelector('.plan-button').classList.remove('selected');
      card.querySelector('.plan-button').textContent = 'Select Plan';
    });
    
    // Select this plan
    planCard.classList.add('selected');
    const button = planCard.querySelector('.plan-button');
    button.classList.add('selected');
    button.textContent = 'Selected';
    
    // Update app state
    appState.selectedPlan = plan.id;
    
    // Enable continue button
    const continueButton = document.getElementById('continue-button');
    if (continueButton) {
      continueButton.disabled = false;
    }
  });
  
  return planCard;
}

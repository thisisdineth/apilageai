
// Plans data
const plans = [
  {
    id: 'basic',
    name: 'අපිලගේ Budget',
    price: 300,
    billingPeriod: 'Pay and go',
    description: 'one time payment (need to repurchese when credit over).',
    features: [
      { id: 'basic-1', text: 'Chat With Apilage-Basic (apil-B Version1)' },
      { id: 'basic-2', text: 'Good For Day-Today tasks' },
      { id: 'basic-3', text: '100 Messages for 3 hours' },
      { id: 'basic-4', text: '5 Image genarating For a week' },
      { id: 'basic-5', text: '5 Image genarating For a week' },
      { id: 'basic-6', text: '5 PDF / Image analyse for a week' }
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Student / Learner',
    price: 500,
    billingPeriod: 'Pay and go',
    description: 'Ideal for students and learners (need to repurchese when credit over)',
    features: [
      { id: 'pro-1', text: 'Chat with Apilage Teacher (Apil-lR V1)' },
      { id: 'pro-2', text: 'Good for Acedemic and School works' },
      { id: 'pro-3', text: 'Unlimited Messages' },
      { id: 'pro-4', text: '3 Images for a day' },
      { id: 'pro-5', text: 'Unlimited PDF and Image Input' },
      { id: 'pro-6', text: 'Accuracy check (90%)' },
      { id: 'pro-7', text: 'Advance Subject Explaining with Exam Predicts (🇱🇰 Syllabus)' },
      { id: 'pro-8', text: 'one video explaining (UPCOMING)' },
      { id: 'pro-9', text: 'APILAGE world acess (UPCOMING)' },
      
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'අපිලගේ pro',
    price: 2000,
    billingPeriod: 'Pay and go',
    description: 'Complete solution for large organizations.',
    features: [
      { id: 'enterprise-1', text: 'Chat with Apilage Pro (Apil-pro V1)' },
      { id: 'enterprise-2', text: 'Good for all type of tasks' },
      { id: 'enterprise-3', text: 'Unlimited Messages' },
      { id: 'enterprise-4', text: 'Unlimited PDF and Image Input' },
      { id: 'enterprise-5', text: 'Accuracy check (95%)' },
      { id: 'enterprise-6', text: 'Advance Subject Explaining with Exam Predicts (🇱🇰 Syllabus)' },
      { id: 'enterprise-7', text: 'Advance Explaining in A/L and O/L (🇱🇰 Syllabus)'},
      { id: 'enterprise-8', text: 'Early acess to all new features'},
      { id: 'enterprise-8', text: '24/7 Support'},
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
      <span class="plan-price-amount">Rs.${plan.price}</span>
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

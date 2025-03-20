
document.addEventListener('DOMContentLoaded', function() {
  // Update year in footer
  document.querySelectorAll('#current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Sidebar functionality
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }
  
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }
  
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  function toggleSidebar() {
    if (sidebar) {
      sidebar.classList.toggle('open');
      if (sidebarOverlay) {
        sidebarOverlay.classList.toggle('visible');
      }
      document.body.classList.toggle('overflow-hidden');
    }
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('open');
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('visible');
      }
      document.body.classList.remove('overflow-hidden');
    }
  }

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024 && sidebar && sidebar.classList.contains('open')) {
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('visible');
      }
    }
  });

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show corresponding tab content
      tabPanes.forEach(pane => pane.classList.remove('active'));
      const targetTab = document.getElementById(`${tabName}-tab`);
      if (targetTab) {
        targetTab.classList.add('active');
      }
    });
  });

  // URL parameters for tabs
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  
  if (tabParam) {
    const tabButton = document.querySelector(`[data-tab="${tabParam}"]`);
    if (tabButton) {
      tabButton.click();
    }
  }

  // Generate transaction items dynamically
  const transactionList = document.querySelector('.transaction-list');
  if (transactionList) {
    const transactions = [
      { title: 'Credit Purchase', date: new Date(Date.now() - 0 * 86400000), amount: '+500', type: 'positive' },
      { title: 'Usage', date: new Date(Date.now() - 1 * 86400000), amount: '-50', type: 'negative' },
      { title: 'Credit Purchase', date: new Date(Date.now() - 2 * 86400000), amount: '+500', type: 'positive' },
      { title: 'Usage', date: new Date(Date.now() - 3 * 86400000), amount: '-75', type: 'negative' },
      { title: 'Usage', date: new Date(Date.now() - 4 * 86400000), amount: '-25', type: 'negative' }
    ];
    
    transactions.forEach(transaction => {
      const item = document.createElement('div');
      item.className = 'transaction-item';
      item.innerHTML = `
        <div class="transaction-info">
          <div class="transaction-title">${transaction.title}</div>
          <div class="transaction-date">${transaction.date.toLocaleDateString()}</div>
        </div>
        <div class="transaction-amount ${transaction.type}">${transaction.amount} credits</div>
      `;
      transactionList.appendChild(item);
    });
  }

  // Generate credit plans dynamically
  const creditPlans = document.querySelector('.credit-plans');
  if (creditPlans) {
    const plans = [
      { amount: 500, price: '$4.99', popular: false },
      { amount: 1000, price: '$8.99', popular: true },
      { amount: 2500, price: '$19.99', popular: false }
    ];
    
    plans.forEach(plan => {
      const planCard = document.createElement('div');
      planCard.className = `card credit-plan ${plan.popular ? 'popular' : ''}`;
      
      if (plan.popular) {
        const popularTag = document.createElement('div');
        popularTag.className = 'popular-tag';
        popularTag.textContent = 'MOST POPULAR';
        planCard.appendChild(popularTag);
      }
      
      planCard.innerHTML += `
        <div class="card-header">
          <h2 class="card-title text-center">${plan.amount} Credits</h2>
          <p class="card-description text-center text-xl font-bold">${plan.price}</p>
        </div>
        <div class="card-content text-center">
          <p class="text-sm text-gray-500">
            ${plan.amount} messages with Apilage AI
          </p>
          <p class="text-sm text-gray-500 mt-1">
            Valid for 1 year
          </p>
        </div>
        <div class="card-footer">
          <button class="button primary-button full-width">Buy Now</button>
        </div>
      `;
      
      creditPlans.appendChild(planCard);
    });
  }

  // Generate stats dynamically
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    const stats = [
      { title: 'Messages Sent', value: '1,243' },
      { title: 'Credits Used', value: '750' },
      { title: 'Average Per Day', value: '35' }
    ];
    
    stats.forEach(stat => {
      const statBox = document.createElement('div');
      statBox.className = 'stat-box';
      statBox.innerHTML = `
        <p class="stat-label">${stat.title}</p>
        <h3 class="stat-value">${stat.value}</h3>
      `;
      statsGrid.appendChild(statBox);
    });
  }
  
  // Toast notification on homepage
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    setTimeout(() => {
      showToast('Welcome to Apilage AI', 'Your AI-powered chat application dashboard.');
    }, 1000);
  }
  
  // Buy Credits functionality
  const buyButtons = document.querySelectorAll('.credit-plan .primary-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const planCard = this.closest('.credit-plan');
      const amount = planCard.querySelector('.card-title').textContent.split(' ')[0];
      showToast('Credits Purchased', `You've successfully purchased ${amount} credits!`);
    });
  });
  
  // Toast notification
  function showToast(title, message, duration = 5000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-content">
        <h4 class="toast-title">${title}</h4>
        <p class="toast-message">${message}</p>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    });
    
    // Auto close
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // Append toast styles to head
  const toastStyles = document.createElement('style');
  toastStyles.textContent = `
    .toast {
      position: fixed;
      top: 1rem;
      right: 1rem;
      max-width: 24rem;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      padding: 1rem;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      z-index: 100;
      transform: translateX(120%);
      transition: transform 0.3s ease;
      border-left: 4px solid hsl(0, 72%, 51%);
    }
    
    .toast.show {
      transform: translateX(0);
    }
    
    .toast-content {
      flex: 1;
    }
    
    .toast-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .toast-message {
      font-size: 0.875rem;
      color: #6b7280;
    }
    
    .toast-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: #9ca3af;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }
    
    .toast-close:hover {
      color: #1f2937;
    }
  `;
  
  document.head.appendChild(toastStyles);
});

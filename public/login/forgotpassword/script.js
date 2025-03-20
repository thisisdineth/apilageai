
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Form elements
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  
  // Containers
  const requestForm = document.getElementById('requestForm');
  const successMessage = document.getElementById('successMessage');
  const headerText = document.getElementById('headerText');
  const sentEmailAddress = document.getElementById('sentEmailAddress');
  
  // Button elements
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  
  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Form validation and submission
  forgotPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    emailError.textContent = '';
    
    // Get form values
    const email = emailInput.value.trim();
    
    // Validate fields
    let isValid = true;
    
    if (!email) {
      emailError.textContent = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (isValid) {
      // Simulate form submission with loading state
      const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';
      
      // Simulate API call with a timeout
      setTimeout(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
        // Show success message
        showSuccessMessage(email);
        
        // For demo purposes, just log the data
        console.log('Password reset requested for:', email);
      }, 1500);
    }
  });
  
  function showSuccessMessage(email) {
    // Update email in the success message
    sentEmailAddress.textContent = email;
    
    // Hide the request form and show success message
    requestForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    // Update header text
    headerText.textContent = 'Check your email for reset instructions';
  }
  
  // Try again button handler
  tryAgainBtn.addEventListener('click', function() {
    // Hide success message and show request form
    successMessage.classList.add('hidden');
    requestForm.classList.remove('hidden');
    
    // Reset header text
    headerText.textContent = 'We\'ll send you instructions to reset your password';
  });
  
  // Toast notification
  function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    toastTitle.textContent = title;
    toastDescription.textContent = message;
    
    toast.classList.remove('hidden');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Form elements
  const loginForm = document.getElementById('loginForm');
  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');
  const identifierError = document.getElementById('identifierError');
  const passwordError = document.getElementById('passwordError');
  const togglePasswordBtn = document.getElementById('togglePassword');
  
  // Social login buttons
  const googleLoginBtn = document.getElementById('googleLogin');
  const facebookLoginBtn = document.getElementById('facebookLogin');
  
  // Other links
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const signupLink = document.getElementById('signupLink');

  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Change icon
    const icon = togglePasswordBtn.querySelector('i');
    if (type === 'password') {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });

  // Validate email/phone format
  function isEmailOrPhone(value) {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Simple phone validation (accepts numbers with optional +, spaces, dashes)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    if (emailRegex.test(value)) return 'email';
    if (phoneRegex.test(value)) return 'phone';
    
    return 'unknown';
  }

  // Form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    identifierError.textContent = '';
    passwordError.textContent = '';
    
    // Get values
    const identifier = identifierInput.value.trim();
    const password = passwordInput.value;
    
    // Validate fields
    let isValid = true;
    
    if (!identifier) {
      identifierError.textContent = 'Email or phone number is required';
      isValid = false;
    } else {
      const identifierType = isEmailOrPhone(identifier);
      if (identifierType === 'unknown') {
        identifierError.textContent = 'Please enter a valid email or phone number';
        isValid = false;
      }
    }
    
    if (!password) {
      passwordError.textContent = 'Password is required';
      isValid = false;
    }
    
    if (isValid) {
      // Simulate form submission with loading state
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      
      submitButton.disabled = true;
      submitButton.innerHTML = 'Signing in...';
      
      // Simulate API call with a timeout
      setTimeout(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
        // Show success toast
        showToast('Welcome back!', "You've successfully logged in.");
        
        // For demo purposes, just log the data
        console.log('Login submitted:', { identifier, password });
      }, 1500);
    }
  });

  // Social login handlers
  googleLoginBtn.addEventListener('click', function() {
    showToast('Google Login', 'Logging in with Google would be implemented here.');
  });
  
  facebookLoginBtn.addEventListener('click', function() {
    showToast('Facebook Login', 'Logging in with Facebook would be implemented here.');
  });
  
  // Navigation handlers
  forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Forgot password page would open here.');
  });
  
  signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Sign up page would open here.');
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

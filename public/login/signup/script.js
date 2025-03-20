
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Profile picture upload
  const profilePicture = document.getElementById('profilePicture');
  const profilePreview = document.getElementById('profilePreview');

  if (profilePicture && profilePreview) {
    profilePicture.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          profilePreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Password visibility toggle
  const togglePassword = document.getElementById('togglePassword');
  const password = document.getElementById('password');
  
  if (togglePassword && password) {
    togglePassword.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      togglePassword.innerHTML = type === 'password' ? 
        '<i class="fa-regular fa-eye"></i>' : 
        '<i class="fa-regular fa-eye-slash"></i>';
    });
  }

  // Confirm password visibility toggle
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const confirmPassword = document.getElementById('confirmPassword');
  
  if (toggleConfirmPassword && confirmPassword) {
    toggleConfirmPassword.addEventListener('click', function() {
      const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPassword.setAttribute('type', type);
      toggleConfirmPassword.innerHTML = type === 'password' ? 
        '<i class="fa-regular fa-eye"></i>' : 
        '<i class="fa-regular fa-eye-slash"></i>';
    });
  }

  // Password strength checker
  const strengthProgress = document.getElementById('strengthProgress');
  const strengthText = document.getElementById('strengthText');

  if (password && strengthProgress && strengthText) {
    password.addEventListener('input', function() {
      const value = password.value;
      let strength = 0;
      
      if (value.length >= 8) strength += 1;
      if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength += 1;
      if (value.match(/\d/)) strength += 1;
      if (value.match(/[^a-zA-Z\d]/)) strength += 1;
      
      const percent = (strength / 4) * 100;
      strengthProgress.style.width = `${percent}%`;
      
      if (strength === 0) {
        strengthProgress.style.backgroundColor = 'var(--border)';
        strengthText.textContent = 'Password strength';
      } else if (strength < 3) {
        strengthProgress.style.backgroundColor = 'var(--strength-weak)';
        strengthText.textContent = 'Weak password';
      } else if (strength === 3) {
        strengthProgress.style.backgroundColor = 'var(--strength-medium)';
        strengthText.textContent = 'Medium password';
      } else {
        strengthProgress.style.backgroundColor = 'var(--strength-strong)';
        strengthText.textContent = 'Strong password';
      }
    });
  }

  // Form validation
  const signupForm = document.getElementById('signupForm');
  
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Validate name
      const name = document.getElementById('name');
      const nameError = document.getElementById('nameError');
      
      if (name.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
      } else {
        nameError.textContent = '';
      }
      
      // Validate email
      const email = document.getElementById('email');
      const emailError = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (email.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
      } else {
        emailError.textContent = '';
      }
      
      // Validate phone
      const phone = document.getElementById('phone');
      const phoneError = document.getElementById('phoneError');
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      
      if (phone.value.trim() === '') {
        phoneError.textContent = 'Phone number is required';
        isValid = false;
      } else if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
        phoneError.textContent = 'Please enter a valid phone number';
        isValid = false;
      } else {
        phoneError.textContent = '';
      }
      
      // Validate password
      const passwordError = document.getElementById('passwordError');
      
      if (password.value === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
      } else if (password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        isValid = false;
      } else {
        passwordError.textContent = '';
      }
      
      // Validate confirm password
      const confirmPasswordError = document.getElementById('confirmPasswordError');
      
      if (confirmPassword.value === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
        isValid = false;
      } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        isValid = false;
      } else {
        confirmPasswordError.textContent = '';
      }
      
      // If form is valid, show success toast
      if (isValid) {
        showToast('Success!', 'Your account has been created successfully.', 'success');
        // In a real app, you would submit the form to a server here
      }
    });
  }

  // Social login buttons
  const googleSignup = document.getElementById('googleSignup');
  const facebookSignup = document.getElementById('facebookSignup');
  
  if (googleSignup) {
    googleSignup.addEventListener('click', function() {
      showToast('Google Sign Up', 'Google sign up functionality would be implemented here.', 'info');
    });
  }
  
  if (facebookSignup) {
    facebookSignup.addEventListener('click', function() {
      showToast('Facebook Sign Up', 'Facebook sign up functionality would be implemented here.', 'info');
    });
  }

  // Toast notification function
  function showToast(title, message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    toastTitle.textContent = title;
    toastDescription.textContent = message;
    
    // Set toast color based on type
    if (type === 'success') {
      toast.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
      toast.style.backgroundColor = '#ef4444';
    } else {
      toast.style.backgroundColor = '#333333';
    }
    
    toast.classList.remove('hidden');
    
    setTimeout(function() {
      toast.classList.add('hidden');
    }, 5000);
  }
});

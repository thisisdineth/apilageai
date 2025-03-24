
// Initialize the user details page
function initializeUserDetailsPage() {
  // Initialize form with previous data if available
  const form = document.getElementById('user-form');
  if (!form) return;
  
  // Populate form with existing data if available
  if (appState.userData) {
    Object.keys(appState.userData).forEach(key => {
      const input = form.elements[key];
      if (input) {
        input.value = appState.userData[key];
      }
    });
  }
  
  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    if (validateUserForm()) {
      // Save form data
      const formData = {
        fullName: form.elements.fullName.value,
        email: form.elements.email.value,
        phone: form.elements.phone.value,
        address: form.elements.address.value,
        city: form.elements.city.value,
        state: form.elements.state.value,
        zipCode: form.elements.zipCode.value,
        country: form.elements.country.value
      };
      
      // Update app state
      appState.userData = formData;
      
      // Navigate to payment page
      window.location.hash = 'payment';
    }
  });
  
  // Handle back button
  const backButton = document.getElementById('back-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.hash = 'plans';
    });
  }
}

// Validate user form
function validateUserForm() {
  const form = document.getElementById('user-form');
  if (!form) return false;
  
  let isValid = true;
  const errors = {};
  
  // Validate full name
  if (!form.elements.fullName.value.trim()) {
    errors.fullName = 'Full name is required';
    isValid = false;
  }
  
  // Validate email
  const emailValue = form.elements.email.value.trim();
  if (!emailValue) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
    errors.email = 'Email is invalid';
    isValid = false;
  }
  
  // Validate phone
  if (!form.elements.phone.value.trim()) {
    errors.phone = 'Phone number is required';
    isValid = false;
  }
  
  // Validate address
  if (!form.elements.address.value.trim()) {
    errors.address = 'Address is required';
    isValid = false;
  }
  
  // Validate city
  if (!form.elements.city.value.trim()) {
    errors.city = 'City is required';
    isValid = false;
  }
  
  // Validate state
  if (!form.elements.state.value.trim()) {
    errors.state = 'State is required';
    isValid = false;
  }
  
  // Validate zip code
  if (!form.elements.zipCode.value.trim()) {
    errors.zipCode = 'ZIP code is required';
    isValid = false;
  }
  
  // Display errors
  Object.keys(errors).forEach(key => {
    const errorElement = document.getElementById(`${key}-error`);
    const inputElement = form.elements[key];
    
    if (errorElement && inputElement) {
      errorElement.textContent = errors[key] || '';
      
      if (errors[key]) {
        inputElement.classList.add('error');
      } else {
        inputElement.classList.remove('error');
      }
    }
  });
  
  return isValid;
}

// Clear form errors when input changes
document.addEventListener('input', (e) => {
  const input = e.target;
  if (input.classList.contains('input-field')) {
    input.classList.remove('error');
    const errorId = `${input.id}-error`;
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
});


// Initialize the confirmation page
function initializeConfirmationPage() {
  // Get the selected plan details
  const selectedPlan = plans.find(plan => plan.id === appState.selectedPlan);
  if (!selectedPlan || !appState.userData || !appState.selectedPaymentMethod) {
    window.location.hash = 'plans';
    return;
  }
  
  // Get payment method name
  const paymentMethodName = paymentMethods[appState.selectedPaymentMethod]?.name || 'Selected method';
  
  // Update order details
  const orderNumber = document.getElementById('order-number');
  const orderPlan = document.getElementById('order-plan');
  const orderPaymentMethod = document.getElementById('order-payment-method');
  
  if (orderNumber) orderNumber.textContent = appState.orderNumber;
  if (orderPlan) orderPlan.textContent = selectedPlan.name;
  if (orderPaymentMethod) orderPaymentMethod.textContent = paymentMethodName;
  
  // Update customer information
  const customerName = document.getElementById('customer-name');
  const customerEmail = document.getElementById('customer-email');
  const customerAddress = document.getElementById('customer-address');
  const confirmationEmail = document.getElementById('confirmation-email');
  
  if (customerName) customerName.textContent = appState.userData.fullName;
  if (customerEmail) customerEmail.textContent = appState.userData.email;
  if (confirmationEmail) confirmationEmail.textContent = appState.userData.email;
  
  if (customerAddress) {
    customerAddress.textContent = `${appState.userData.address}, ${appState.userData.city}, ${appState.userData.state} ${appState.userData.zipCode}, ${appState.userData.country}`;
  }
  
  // Handle return home button
  const returnHomeButton = document.getElementById('return-home-button');
  if (returnHomeButton) {
    returnHomeButton.addEventListener('click', () => {
      // Reset app state for a new purchase
      appState.selectedPlan = null;
      appState.userData = null;
      appState.selectedPaymentMethod = null;
      appState.orderNumber = null;
      
      // Navigate to home
      window.location.hash = 'plans';
    });
  }
}


// This file contains navigation-specific functionality

// When back button is pressed, handle navigation properly
window.addEventListener('popstate', (event) => {
  const hash = window.location.hash.substring(1) || 'plans';
  navigateTo(hash);
});

// Handle all links to use hash navigation
document.addEventListener('click', (event) => {
  const target = event.target;
  
  // Check if the clicked element is a link with a hash
  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
    event.preventDefault();
    const hash = target.getAttribute('href').substring(1);
    window.location.hash = hash;
  }
  
  // Handle the return-link on 404 page
  if (target.classList.contains('return-link')) {
    event.preventDefault();
    window.location.hash = 'plans';
  }
});

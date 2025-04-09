
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Sidebar toggle functionality
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarToggleIcon = document.getElementById('sidebar-toggle-icon');
  const contentArea = document.getElementById('content-area');
  
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    sidebarToggle.classList.toggle('open');
    contentArea.classList.toggle('sidebar-open');
    
    if (sidebar.classList.contains('open')) {
      sidebarToggleIcon.className = 'fa-solid fa-chevron-left';
    } else {
      sidebarToggleIcon.className = 'fa-solid fa-chevron-right';
    }
  });
  
  // Tab switching
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      tabTriggers.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Range input value display
  const imageCountSlider = document.getElementById('image-count');
  const imageCountValue = document.getElementById('image-count-value');
  const imageSizeSlider = document.getElementById('image-size');
  const imageSizeValue = document.getElementById('image-size-value');
  
  imageCountSlider.addEventListener('input', function() {
    imageCountValue.textContent = this.value;
  });
  
  imageSizeSlider.addEventListener('input', function() {
    imageSizeValue.textContent = `${this.value}px`;
  });
  
  // Mock image generation
  const imageGeneratorForm = document.getElementById('image-generator-form');
  const promptInput = document.getElementById('prompt-input');
  const generateButton = document.getElementById('generate-button');
  const imageGallery = document.getElementById('image-gallery');
  
  // Store images
  let generatedImages = [];
  
  imageGeneratorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
      showToast('Please enter a prompt first', 'error');
      return;
    }
    
    // Show generating state
    generateButton.disabled = true;
    generateButton.classList.add('generating');
    generateButton.innerHTML = `
      <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path>
      </svg>
      Generating...
    `;
    
    // Mock API call delay
    setTimeout(() => {
      generateImage(prompt);
      
      // Reset button
      generateButton.disabled = false;
      generateButton.classList.remove('generating');
      generateButton.innerHTML = `
        <i class="fa-solid fa-sparkles icon-sm"></i>
        Generate
      `;
      
    }, 2000);
  });
  
  function generateImage(prompt) {
    const placeholderUrls = [
      'https://source.unsplash.com/random/1000x1000/?ai',
      'https://source.unsplash.com/random/1000x1000/?digital',
      'https://source.unsplash.com/random/1000x1000/?future',
      'https://source.unsplash.com/random/1000x1000/?tech',
      'https://source.unsplash.com/random/1000x1000/?robot'
    ];
    
    const imageUrl = placeholderUrls[Math.floor(Math.random() * placeholderUrls.length)];
    
    const newImage = {
      id: Date.now().toString(),
      url: imageUrl,
      prompt: prompt
    };
    
    generatedImages.unshift(newImage);
    
    // Update UI
    updateGallery();
    
    // Show success toast
    showToast('Image generated successfully', 'success');
  }
  
  function updateGallery() {
    // Clear gallery
    imageGallery.innerHTML = '';
    
    if (generatedImages.length === 0) {
      // Show empty state
      imageGallery.innerHTML = `
        <div class="empty-gallery">
          <p class="empty-text">No images generated yet</p>
          <p class="empty-subtext">Enter a prompt and click generate to create images</p>
        </div>
      `;
      return;
    }
    
    // Add images to gallery
    generatedImages.forEach(image => {
      const imageCard = document.createElement('div');
      imageCard.className = 'image-card fade-in';
      imageCard.innerHTML = `
        <div class="image-container">
          <img src="${image.url}" alt="${image.prompt}">
          <div class="image-overlay">
            <button class="image-action-button download-button hover-scale" data-id="${image.id}">
              <i class="fa-solid fa-download"></i>
            </button>
            <button class="image-action-button delete-button hover-scale" data-id="${image.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="image-prompt">
          <p class="prompt-text">${image.prompt}</p>
        </div>
      `;
      
      imageGallery.appendChild(imageCard);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.download-button').forEach(button => {
      button.addEventListener('click', function() {
        downloadImage(this.dataset.id);
      });
    });
    
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', function() {
        deleteImage(this.dataset.id);
      });
    });
  }
  
  function downloadImage(id) {
    const image = generatedImages.find(img => img.id === id);
    
    if (!image) return;
    
    // Create a link to download the image
    fetch(image.url)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `apilage-${image.prompt.substring(0, 20).replace(/\s+/g, '-')}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        
        showToast('Image downloaded successfully', 'success');
      })
      .catch(error => {
        console.error('Download error:', error);
        showToast('Failed to download image', 'error');
      });
  }
  
  function deleteImage(id) {
    generatedImages = generatedImages.filter(image => image.id !== id);
    updateGallery();
    showToast('Image deleted', 'success');
  }
  
  // Toast notification system
  function showToast(message, type = 'success', duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} slide-in-right`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
      <i class="fa-solid ${icon} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${type === 'success' ? 'Success' : 'Error'}</div>
        <div class="toast-description">${message}</div>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after duration
    setTimeout(() => {
      toast.classList.add('fade-out');
      
      toast.addEventListener('animationend', function() {
        if (toast.classList.contains('fade-out')) {
          toastContainer.removeChild(toast);
        }
      });
    }, duration);
  }
  
  // Initialize gallery
  updateGallery();
  
  // Open sidebar by default for larger screens
  if (window.innerWidth >= 1024) {
    sidebar.classList.add('open');
    sidebarToggle.classList.add('open');
    contentArea.classList.add('sidebar-open');
    sidebarToggleIcon.className = 'fa-solid fa-chevron-left';
  }
});

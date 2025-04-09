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
  
  // Image generation with backend
  const imageGeneratorForm = document.getElementById('image-generator-form');
  const promptInput = document.getElementById('prompt-input');
  const generateButton = document.getElementById('generate-button');
  const imageGallery = document.getElementById('image-gallery');
  const enhanceQuality = document.getElementById('enhance-quality');
  
  // Store images
  let generatedImages = [];
  
  imageGeneratorForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const prompt = promptInput.value.trim();
    const imageCount = imageCountSlider.value;
    const imageSize = `${imageSizeSlider.value}x${imageSizeSlider.value}`;
    const quality = enhanceQuality.checked ? 'hd' : 'standard';
    
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
    
    try {
      // Call backend API
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          n: parseInt(imageCount),
          size: imageSize,
          quality
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate images');
      }
      
      const data = await response.json();
      
      // Process the response
      const newImages = data.images.map((image, index) => ({
        id: `${Date.now()}-${index}`,
        url: image.url,
        prompt: prompt
      }));
      
      generatedImages.unshift(...newImages);
      updateGallery();
      showToast('Images generated successfully', 'success');
      
    } catch (error) {
      console.error('Generation error:', error);
      showToast(error.message || 'Failed to generate images', 'error');
    } finally {
      // Reset button
      generateButton.disabled = false;
      generateButton.classList.remove('generating');
      generateButton.innerHTML = `
        <i class="fa-solid fa-sparkles icon-sm"></i>
        Generate
      `;
    }
  });
  
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
  
  async function downloadImage(id) {
    const image = generatedImages.find(img => img.id === id);
    
    if (!image) return;
    
    try {
      // Fetch the image through our backend to avoid CORS issues
      const response = await fetch(`/api/download-image?url=${encodeURIComponent(image.url)}`);
      
      if (!response.ok) {
        throw new Error('Failed to download image');
      }
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `apilage-${image.prompt.substring(0, 20).replace(/\s+/g, '-')}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);
      
      showToast('Image downloaded successfully', 'success');
    } catch (error) {
      console.error('Download error:', error);
      showToast('Failed to download image', 'error');
    }
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
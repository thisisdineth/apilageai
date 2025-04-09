document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarToggleIcon = document.getElementById('sidebar-toggle-icon');
  const contentArea = document.getElementById('content-area');
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const imageCountSlider = document.getElementById('image-count');
  const imageCountValue = document.getElementById('image-count-value');
  const imageSizeSlider = document.getElementById('image-size');
  const imageSizeValue = document.getElementById('image-size-value');
  const imageGeneratorForm = document.getElementById('image-generator-form');
  const promptInput = document.getElementById('prompt-input');
  const generateButton = document.getElementById('generate-button');
  const imageGallery = document.getElementById('image-gallery');
  const enhanceQuality = document.getElementById('enhance-quality');


  // State
  let generatedImages = [];
  let isImageGenerating = false;
  
  // Replace with your actual OpenAI API key
  const OPENAI_API_KEY = "PASE THE REAL API KEY"; 

  // Initialize
  init();

  function init() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize gallery
    updateGallery();
    
    // Open sidebar by default for larger screens
    if (window.innerWidth >= 1024) {
      sidebar.classList.add('open');
      sidebarToggle.classList.add('open');
      contentArea.classList.add('sidebar-open');
      sidebarToggleIcon.className = 'fa-solid fa-chevron-left';
    }
  }

  function setupEventListeners() {
    // Sidebar toggle
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Tab switching
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', switchTab);
    });
    
    // Range inputs
    imageCountSlider.addEventListener('input', updateImageCountDisplay);
    imageSizeSlider.addEventListener('input', updateImageSizeDisplay);
    
    // Form submission
    imageGeneratorForm.addEventListener('submit', handleImageGeneration);
  }

  function toggleSidebar() {
    sidebar.classList.toggle('open');
    sidebarToggle.classList.toggle('open');
    contentArea.classList.toggle('sidebar-open');
    
    if (sidebar.classList.contains('open')) {
      sidebarToggleIcon.className = 'fa-solid fa-chevron-left';
    } else {
      sidebarToggleIcon.className = 'fa-solid fa-chevron-right';
    }
  }

  function switchTab() {
    tabTriggers.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  }

  function updateImageCountDisplay() {
    imageCountValue.textContent = this.value;
  }

  function updateImageSizeDisplay() {
    imageSizeValue.textContent = `${this.value}px`;
  }

  async function handleImageGeneration(e) {
    e.preventDefault();
    
    const prompt = promptInput.value.trim();
    const imageCount = parseInt(imageCountSlider.value);
    const imageSize = `${imageSizeSlider.value}x${imageSizeSlider.value}`;
    const quality = enhanceQuality.checked ? 'hd' : 'standard';
    
    // Validate inputs more strictly
    if (!prompt || prompt.length < 3) {
      showToast('Please enter a meaningful prompt (at least 3 characters)', 'error');
      return;
    }
    
    if (imageCount < 1 || imageCount > 4) {
      showToast('Please select between 1-4 images', 'error');
      return;
    }

    const validSizes = ['256x256', '512x512', '1024x1024'];
    if (!validSizes.includes(imageSize)) {
      showToast('Please select a valid image size (256, 512, or 1024)', 'error');
      return;
    }
    
    // Show generating state
    setGeneratingState(true);
    
    try {
      if (!OPENAI_API_KEY || OPENAI_API_KEY === "your-api-key-here") {
        throw new Error('Invalid API key configuration');
      }

      // Show loading state in gallery
      showLoadingState(imageCount);

      // Create the request payload
      const payload = {
        prompt: prompt,
        n: imageCount,
        size: imageSize,
        response_format: "b64_json"
      };

      // Only add quality if HD is selected (not all models support this)
      if (quality === 'hd') {
        payload.quality = quality;
      }

      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error?.message || errorText;
        } catch (e) {
          errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
      }
      
      const responseData = await response.json();
      
      if (!responseData.data || !Array.isArray(responseData.data)) {
        throw new Error('Invalid response format from API');
      }
      
      addNewImages(responseData.data, prompt);
      showToast('Images generated successfully', 'success');
      
    } catch (error) {
      console.error('Generation error:', error);
      
      // More specific error messages for common cases
      let userMessage = error.message;
      if (error.message.includes('content policy')) {
        userMessage = 'Your prompt was rejected by the content filter. Please try a different prompt.';
      } else if (error.message.includes('billing')) {
        userMessage = 'API access issue. Please check your OpenAI account billing status.';
      }
      
      showToast(userMessage || 'Failed to generate images. Please try again.', 'error');
    } finally {
      setGeneratingState(false);
    }
  }

  function setGeneratingState(isGenerating) {
    generateButton.disabled = isGenerating;
    generateButton.classList.toggle('generating', isGenerating);
    generateButton.innerHTML = isGenerating ? `
      <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path>
      </svg>
      Generating...
    ` : `
      <i class="fa-solid fa-sparkles icon-sm"></i>
      Generate
    `;
  }

  function showLoadingState(imageCount) {
    imageGallery.innerHTML = `
      <div class="loading-state">
        <i class="fas fa-spinner fa-spin fa-3x"></i>
        <p>Generating ${imageCount} image${imageCount > 1 ? 's' : ''}...</p>
      </div>
    `;
  }

  function addNewImages(images, prompt) {
    const newImages = images.map((image, index) => ({
      id: `${Date.now()}-${index}`,
      url: `data:image/jpeg;base64,${image.b64_json}`,
      prompt: prompt
    }));
    
    generatedImages.unshift(...newImages);
    updateGallery();
  }

  function updateGallery() {
    imageGallery.innerHTML = '';
    
    if (generatedImages.length === 0) {
      imageGallery.innerHTML = `
        <div class="empty-gallery">
          <p class="empty-text">No images generated yet</p>
          <p class="empty-subtext">Enter a prompt and click generate to create images</p>
        </div>
      `;
      return;
    }
    
    generatedImages.forEach(image => {
      const imageCard = document.createElement('div');
      imageCard.className = 'image-card fade-in';
      imageCard.innerHTML = `
        <div class="image-container">
          <img src="${image.url}" alt="${image.prompt}" loading="lazy">
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
    
    try {
      const link = document.createElement('a');
      link.href = image.url;
      link.download = `apilage-${image.prompt.substring(0, 20).replace(/\s+/g, '-')}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
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
    
    setTimeout(() => {
      toast.classList.add('fade-out');
      
      toast.addEventListener('animationend', function() {
        if (toast.classList.contains('fade-out')) {
          toastContainer.removeChild(toast);
        }
      });
    }, duration);
  }
});
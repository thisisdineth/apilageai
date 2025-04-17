const brandName = document.getElementById('brandName');
const navdropIcon = document.getElementById('navdropIcon');
const navdropMenu = document.getElementById('navdropMenu');
const languageOption = document.getElementById('languageOption');

let currentLang = 'en'; // Default language

function setGreeting() {
    const hour = new Date().getHours();
    let greeting = '';

    if (currentLang === 'si') {
        if (hour >= 3 && hour < 12) {
            greeting = 'සුභ උදෑසනක් 🌻';
        } else if (hour >= 12 && hour < 16) {
            greeting = 'සුභ දවසක් 🌞';
        } else if (hour >= 16 && hour < 20) {
            greeting = 'සුභ සන්ධ්‍යාවක් 🌥️';
        } else if (hour >= 20 && hour < 24) {
            greeting = 'ලස්සන රාත්‍රියක් 🌙';
        } else {
            greeting = 'අලුත් දවසක් 🌅'; // 12am to 3am
        }
    } else {
        if (hour >= 3 && hour < 12) {
            greeting = 'Good morning 🌻';
        } else if (hour >= 12 && hour < 16) {
            greeting = 'Good afternoon 🌞';
        } else if (hour >= 16 && hour < 20) {
            greeting = 'Good evening 🌥️';
        } else if (hour >= 20 && hour < 24) {
            greeting = 'Happy late night 🌙';
        } else {
            greeting = 'A new day 🌅'; // 12am to 3am
        }
    }

    const greetingElement = document.querySelector('.greeting-text');
    if (greetingElement) {
        greetingElement.textContent = `${greeting},`;
    }
}

function updateCardTitles() {
    const titles = document.querySelectorAll('.card-title');
    const sinhalaTitles = [
        'Qudartic Formula එක පොඩ්ඩක් පැහැදිලි කරන්න.',
        'f(x) = x² හි ප්‍රස්ථාරය අදින්න.',
        'ප්‍රභාසංස්ලේෂණය ගැන පැහැදිලි කරන්න'
    ];
    const englishTitles = [
        'Teach me about the Quadratic Formula',
        'Graph the Derivative of f(x) = x^2',
        'Explain photosynthesis'
    ];

    titles.forEach((title, index) => {
        title.textContent = currentLang === 'si' ? sinhalaTitles[index] : englishTitles[index];
    });
}

function toggleWebSearchActive(btn) {
    const isActive = btn.getAttribute("data-active") === "true";
    if (isActive) {
      btn.style.backgroundColor = "#f8f9fa";
      btn.style.color = "#333";
      btn.setAttribute("data-active", "false");
    } else {
      btn.style.backgroundColor = "#ffeb3b";
      btn.style.color = "#000";
      btn.setAttribute("data-active", "true");
    }
  }
  
// Toggle navdrop menu
navdropIcon.addEventListener('click', () => {
    navdropMenu.style.display = navdropMenu.style.display === 'block' ? 'none' : 'block';
});

// Handle language switch
languageOption.addEventListener('click', () => {
    const current = brandName.textContent.trim();

    if (current.includes('Apilage AI')) {
        brandName.textContent = 'අපිලගේ AI (සිංහල)';
        languageOption.textContent = 'Apilage AI (Posh)';
        currentLang = 'si';
    } else {
        brandName.textContent = 'Apilage AI (Posh)';
        languageOption.textContent = 'අපිලගේ AI (සිංහල)';
        currentLang = 'en';
    }
    setGreeting();
    updateCardTitles();
    navdropMenu.style.display = 'none';
});

// Hide navdrop when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.brand-wrapper')) {
        navdropMenu.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const url = window.location.href;
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarBack = document.getElementById('sidebarback');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const navbar = document.querySelector('.navbar');
    const chatContainer = document.getElementById('messages-container');
    const fileAttach = document.getElementById('fileAttach');
    const fileInput = document.getElementById('fileInput');

    const match = url.match(/(\d+)(?!.*\d)/);
    const conversationId = match ? match[1] : null;

    if (conversationId) {
        update_chat();
    }

    // Check screen size and set initial state
    function checkScreenSize() {
        if (window.innerWidth <= 955) {
            // Mobile view - sidebar hidden by default
            sidebar.classList.add('hidden');
            sidebarBack.style.display = 'block';
            navbar.style.display = 'flex'; // Ensure navbar is visible initially
        } else {
            // Desktop view - sidebar visible by default
            sidebar.classList.remove('hidden');
            sidebarBack.style.display = 'none';
            navbar.style.display = 'flex'; // Ensure navbar is visible
        }
    }

    // Run on load and on resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Toggle sidebar on hamburger click (mobile)
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        sidebar.classList.toggle('hidden');
        sidebarOverlay.classList.toggle('visible');

        // Toggle navbar visibility when sidebar is shown/hidden on mobile
        if (window.innerWidth <= 955) {
            if (sidebar.classList.contains('hidden')) {
                navbar.style.display = 'flex';
                sidebarBack.style.display = 'block';
            } else {
                navbar.style.display = 'none';
                sidebarBack.style.display = 'none';
            }
        }
    });

    // Close sidebar when clicking on overlay (mobile)
    sidebarOverlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        sidebar.classList.add('hidden');
        this.classList.remove('visible');
        navbar.style.display = 'flex'; // Show navbar when closing sidebar
        sidebarBack.style.display = 'block';
    });

    // Desktop sidebar toggle
    toggleSidebarBtn.addEventListener('click', function () {
        sidebar.classList.add('hidden');
        if (window.innerWidth <= 955) {
            sidebarOverlay.classList.remove('visible');
            navbar.style.display = 'flex'; // Show navbar when closing sidebar on mobile
            sidebarBack.style.display = 'block';
        } else {
            sidebarBack.style.display = 'block';
        }
    });

    // Sidebar back button
    sidebarBack.addEventListener('click', function () {
        sidebar.classList.remove('hidden');
        if (window.innerWidth <= 955) {
            sidebarOverlay.classList.add('visible');
            navbar.style.display = 'none'; // Hide navbar when opening sidebar on mobile
        }
        this.style.display = 'none';
    });

    setGreeting();

    // Handle chat form submission
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Enable/disable send button based on input
    messageInput.addEventListener('input', function () {
        if (this.value.trim()) {
            sendButton.disabled = false;
            sendButton.classList.remove('text-muted');
            sendButton.classList.add('text-primary');
        } else {
            sendButton.disabled = true;
            sendButton.classList.add('text-muted');
            sendButton.classList.remove('text-primary');
        }
    });

    messageInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim();

        if (message) {
            messageInput.value = '';
            sendButton.disabled = true;
            sendButton.classList.add('text-muted');
            sendButton.classList.remove('text-dark');

            const data = new FormData();
            data.append("m", message);
            data.append("f", fileInput.files[0]);
            if (conversationId) {
                data.append("i", conversationId);
            }

            fetch('https://apilageai.lk/api/chat/new', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(data => {
                if (data.e) {
                    new Dialog(
                        'Error',
                        data.m,
                        { text: 'Okay', action: () => { }, color: '#ff3333' }
                    );
                } else {
                    fileInput.value = "";
                    if (conversationId === data.c_id) {
                        update_chat();
                    } else {
                        window.location.href = `https://apilageai.lk/app/chat/${data.c_id}`;
                    }
                }
            })
            .catch(() => {
                new Dialog(
                    'Error',
                    'Something went wrong',
                    { text: 'Okay', action: () => { }, color: '#ff3333' }
                );
            });
        }
    }

    sendButton.addEventListener('click', function (event) {
        event.preventDefault();
        sendMessage();
    });

    // Make chat cards clickable
    const chatCards = document.querySelectorAll('.chat-card');

    chatCards.forEach(card => {
        card.addEventListener('click', function () {
            const cardTitle = this.querySelector('.card-title').textContent;
            messageInput.value = cardTitle;
            messageInput.focus();

            // Trigger input event to enable send button
            const inputEvent = new Event('input', { bubbles: true });
            messageInput.dispatchEvent(inputEvent);
        });
    });

    // Auto-resize textarea
    messageInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
    });

    // Handle Enter key for submission
    messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    async function update_chat() {
        const data = new FormData();
        data.append("i", conversationId);
        if (conversationId) {
            const messageIds = [...chatContainer.querySelectorAll('.chatBubble')].map(e => e.dataset.mId);
            if (messageIds.length > 0) {
                data.append("m_ids", messageIds);
            }
        }

        await fetch('https://apilageai.lk/api/chat/get', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {
            if (data.e) {
                new Dialog(
                    'Error',
                    data.m,
                    { text: 'Okay', action: () => { }, color: '#ff3333' }
                );
            } else {
                data.m.forEach(item => {
                    var text = item.txt;

                    text = text.replace(
                        /\\\[(.*?)\\\]/gs,
                        (match, mathContent) => {
                            return `<span class="mathjax-latex">\\[${mathContent}\\]</span>`;
                        }
                    );
                    text = text.replace(
                        /\$(.*?)\$/g,
                        (match, mathContent) => {
                            return `<span class="mathjax-latex">\\(${mathContent}\\)</span>`;
                        }
                    );
                    text = text.replace(
                        /###\s+(.*?)(\n|$)/g,
                        (_, headingContent) => `<span style="color:red;"><em>### ${headingContent}</em></span><br />`
                    );
                    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
                    text = text.replace(/_(.*?)_/g, '<em>$1</em>'); // Italic
                    text = text.replace(/https?:\/\/[^\s]+/g, (url) => {
                        const displayUrl = url.replace(/^https?:\/\//, '');
                        const domain = new URL(url).hostname; //urltofavicon
                        return `<a href="${url}" target="_blank" style="color: white; display: inline-flex; align-items: center; gap: 5px;">
                                    <img src="https://www.google.com/s2/favicons?sz=16&domain=${domain}" alt="${domain}" />
                                    ${displayUrl}
                                </a>`;
                    });
                    text = text.replace(/```(.*?)\n([\s\S]*?)```/g, (_, lang, code) => {
                        return `<pre><code class="language-${lang.trim()}">${code.trim()}</code></pre>`;
                    });
                    // Replace custom code block format ---{ code }---
                    text = text.replace(/---\{([\s\S]*?)\}---/g, (match, codeContent) => {
                        // Remove formatting markers from outside the block only
                        return `
                            <div class="code-block">
                                <div class="code-header">
                                    <button class="copy-code-button" onclick="copyToClipboard(this)">
                                        <i class="fa-solid fa-copy"></i> Copy code
                                    </button>
                                </div>
                                <pre><code>${codeContent}</code></pre>
                            </div>
                        `;
                    });
                    text = text.replace(/\n/g, "<br />");
                    // Convert full HTML table structure if table-related tags are detected
                    if (/<table[\s\S]*?>[\s\S]*?<\/table>/.test(text) ||
                        (text.includes('<tr>') && (text.includes('<td>') || text.includes('<th>')))) {
                        // Clean up any <br> between table tags
                        text = text.replace(/<br\s*\/?>\s*(?=<\/?(table|thead|tbody|tr|td|th))/gi, '');
                        text = text.replace(/(<\/?(table|thead|tbody|tr|td|th)[^>]*>)<br\s*\/?>/gi, '$1');
                        // Wrap if not already inside <table>
                        if (!text.includes('<table')) {
                            text = `<table class="chat-table">${text}</table>`;
                        }
                    }
                    
                    // Convert unordered lists
                    if (text.includes('<ul>') && text.includes('<li>')) {
                        text = text.replace(/(?:<br\s*\/?>)*<ul>/g, '<ul>').replace(/<\/ul>(?:<br\s*\/?>)*/g, '</ul>');
                    }
                    
                    // Convert ordered lists
                    if (text.includes('<ol>') && text.includes('<li>')) {
                        text = text.replace(/(?:<br\s*\/?>)*<ol>/g, '<ol>').replace(/<\/ol>(?:<br\s*\/?>)*/g, '</ol>');
                    }

                    text = text.replace(
                        /grp-->([\s\S]*?)<--grp/gs,
                        (match, functionContent) => {
                            const cleanFunction = functionContent.trim();
                            return `<span class="graph-function" style="color: #4285f4; font-weight: bold;" data-function="${cleanFunction.replace(/"/g, '&quot;')}">${cleanFunction}</span>`;
                        }
                    );

                    const chatBubble = document.createElement("div");

                    // Assign class based on user/bot
                    chatBubble.classList.add("message", item.t == 1 ? "user-message" : "bot-message");
                    chatBubble.classList.add("chatBubble");
                    chatBubble.dataset.mId = item.m_id;

                    // Set inner HTML for the message content and icons
                    chatBubble.innerHTML = `
                        <p>${text}</p>
                        <div class="message-icons">
                            <button class="message-copy icon-button">
                                <i class="fa-solid fa-copy"></i>
                            </button>
                            ${item.t == 1 ? `
                                <button class="message-edit icon-button">
                                    <i class="fa-solid fa-edit"></i>
                                </button>
                            ` : `<button class="message-translate icon-button">
                                    <i class="fa fa-language"></i>
                                </button>`}
                        </div>
                    `;

                    // Insert in the correct order based on m_id
                    const nextBubble = Array.from(chatContainer.children).find(child =>
                        parseInt(child.dataset.mId, 10) > item.m_id
                    );

                    if (nextBubble) {
                        chatContainer.insertBefore(chatBubble, nextBubble);
                    } else {
                        chatContainer.appendChild(chatBubble);
                    }
                });
            }
        })
        .catch((e) => {
            new Dialog(
                'Error',
                'Something went wrong' + e,
                { text: 'Okay', action: () => { }, color: '#ff3333' }
            );
        });
        MathJax.typesetPromise();
    }

    fileAttach.addEventListener('click', () => {
        fileInput.click();
    });

    const copyMessage = (el) => { 
        const button = el.querySelector('.message-copy');
        const text = el.querySelector('p');
        button.addEventListener('click', () => { 
            navigator.clipboard.writeText(text.textContent);
        });
    }
    
    new MutationObserver((mutationsList) => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.classList.contains('message')) {
                        copyMessage(node);
                    }
                }
            });
        });
    }).observe(document.body, { childList: true, subtree: true });

    const deleteConversation = document.getElementById('deleteConversation');
    if (deleteConversation && conversationId) {
        deleteConversation.addEventListener('click', () => {
            const data = new FormData();
            data.append("i", conversationId);

            fetch('https://apilageai.lk/api/chat/delete', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(data => {
                if (data.e) {
                    new Dialog(
                        'Error',
                        data.m,
                        { text: 'Okay', action: () => { }, color: '#ff3333' }
                    );
                } else {
                    window.location.href = `https://apilageai.lk/app`;
                }
            })
            .catch(() => {
                new Dialog(
                    'Error',
                    'Something went wrong',
                    { text: 'Okay', action: () => { }, color: '#ff3333' }
                );
            });
        });
    }
});

function toggleDropdown() {
    var dropdown = document.getElementById("mathSymbols");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

function insertSymbol(symbol) {
    var inputField = document.getElementById("message-input");
    inputField.value += symbol;
    inputField.focus();
}

// Close dropdown if clicking outside
window.onclick = function (event) {
    if (!event.target.matches('.btn-icon') && !event.target.closest(".dropdown")) {
        document.getElementById("mathSymbols").style.display = "none";
    }
}

function copyToClipboard(button) {
    const code = button.closest('.code-block').querySelector('code').innerText;
    navigator.clipboard.writeText(code);
    button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    setTimeout(() => {
        button.innerHTML = '<i class="fa-solid fa-copy"></i> Copy code';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function () {
    const rightSidebar = document.getElementById('rightSidebar');
    const toggleGraphBtn = document.getElementById('toggleGraphBtn');
    const closeRightSidebar = document.getElementById('closeRightSidebar');
    const appContainer = document.querySelector('.app-container');
    const graphFunctionInput = document.getElementById('graphFunctionInput');
    const graphFunctionSubmit = document.getElementById('graphFunctionSubmit');
    const graphFunctionsList = document.getElementById('graphFunctionsList');
    const clearAllGraphs = document.getElementById('clearAllGraphs');
    const resetGraph = document.getElementById('resetGraph');
    const graphExample1 = document.getElementById('graph-example1');
    const graphExample2 = document.getElementById('graph-example2');
  
    // Initialize Desmos with full features
    const calculator = Desmos.GraphingCalculator(document.getElementById('desmos-graph'), {
      keypad: true,
      expressions: true,
      expressionsTopbar: true,
      settingsMenu: true,
      zoomButtons: true,
      trace: true,
      folders: true,
      sliders: true,
      images: true,
      degreeMode: false,
    });
  
    let functionCounter = 0;
    let addedFunctions = {};
  
    function insertToInput(value) {
      graphFunctionInput.value += value;
      graphFunctionInput.focus();
    }
  
    function addFunctionToGraph(expression) {
      if (!expression.trim()) return;
  
      const functionId = 'func' + (++functionCounter);
      calculator.setExpression({
        id: functionId,
        latex: expression,
        color: Desmos.Colors.BLUE,
      });
  
      addedFunctions[functionId] = expression;
  
      const functionItem = document.createElement('div');
      functionItem.className = 'graph-function-item';
      functionItem.innerHTML = `
        <span>${expression}</span>
        <button class="graph-function-remove" data-id="${functionId}">
          <i class="fas fa-times"></i>
        </button>
      `;
      graphFunctionsList.appendChild(functionItem);
  
      functionItem.querySelector('.graph-function-remove').addEventListener('click', function () {
        calculator.removeExpression({ id: functionId });
        delete addedFunctions[functionId];
        functionItem.remove();
      });
    }
  
    graphFunctionSubmit.addEventListener('click', function () {
      addFunctionToGraph(graphFunctionInput.value);
      graphFunctionInput.value = '';
    });
  
    graphFunctionInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        addFunctionToGraph(graphFunctionInput.value);
        graphFunctionInput.value = '';
      }
    });
  
    clearAllGraphs.addEventListener('click', function () {
      calculator.setBlank();
      graphFunctionsList.innerHTML = '';
      functionCounter = 0;
      addedFunctions = {};
    });
  
    resetGraph.addEventListener('click', function () {
      calculator.setMathBounds({
        left: -10,
        right: 10,
        bottom: -10,
        top: 10
      });
    });
  
    graphExample1.addEventListener('click', function () {
      addFunctionToGraph('y = x^2');
    });
  
    graphExample2.addEventListener('click', function () {
      addFunctionToGraph('y = \\sin(x)');
    });
  
    toggleGraphBtn?.addEventListener('click', function () {
      rightSidebar.classList.toggle('active');
      appContainer.classList.toggle('right-sidebar-active');
    });
  
    closeRightSidebar?.addEventListener('click', function () {
      rightSidebar.classList.remove('active');
      appContainer.classList.remove('right-sidebar-active');
    });
  
    // Attach insertToInput globally for math toolbar buttons
    window.insertToInput = insertToInput;
  });

  // Add this after the DOMContentLoaded event listener
document.addEventListener('click', function(e) {
    // Check if clicked element is a graph function
    if (e.target.classList.contains('graph-function')) {
        const functionText = e.target.getAttribute('data-function');
        
        // Open the right sidebar if not already open
        const rightSidebar = document.getElementById('rightSidebar');
        const appContainer = document.querySelector('.app-container');
        if (rightSidebar && !rightSidebar.classList.contains('active')) {
            rightSidebar.classList.add('active');
            if (appContainer) appContainer.classList.add('right-sidebar-active');
        }
        
        // Add the function to the graph
        if (window.calculator) {
            const functionId = 'func' + (Date.now()); // Unique ID
            window.calculator.setExpression({
                id: functionId,
                latex: functionText,
                color: Desmos.Colors.BLUE,
            });
            
            // Add to functions list if available
            const graphFunctionsList = document.getElementById('graphFunctionsList');
            if (graphFunctionsList) {
                const functionItem = document.createElement('div');
                functionItem.className = 'graph-function-item';
                functionItem.innerHTML = `
                    <span>${functionText}</span>
                    <button class="graph-function-remove" data-id="${functionId}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                graphFunctionsList.appendChild(functionItem);
                
                functionItem.querySelector('.graph-function-remove').addEventListener('click', function() {
                    window.calculator.removeExpression({ id: functionId });
                    functionItem.remove();
                });
            }
        }
    }
    
    // Handle remove buttons for dynamically added functions
    if (e.target.classList.contains('graph-function-remove') || e.target.closest('.graph-function-remove')) {
        const button = e.target.classList.contains('graph-function-remove') ? 
            e.target : e.target.closest('.graph-function-remove');
        const functionId = button.getAttribute('data-id');
        
        if (window.calculator && functionId) {
            window.calculator.removeExpression({ id: functionId });
            button.closest('.graph-function-item').remove();
        }
    }
});

// Type Sidebar functionality
const typeSidebar = document.getElementById('typeSidebar');
const toggleTypeBtn = document.getElementById('toggleTypeBtn');
const closeTypeSidebar = document.getElementById('closeTypeSidebar');
const typeCanvas = document.getElementById('typeCanvas');
const colorBtns = document.querySelectorAll('.color-btn');
const exportPdf = document.getElementById('exportPdf');
const rightSidebar = document.getElementById('rightSidebar');
const mainContent = document.querySelector('.main-content');

let currentColor = 'black';
let textElements = [];

// Toggle type sidebar
toggleTypeBtn.addEventListener('click', () => {
  const isOpening = !typeSidebar.classList.contains('open');
  
  // Close right sidebar if opening type sidebar
  if (isOpening && rightSidebar.classList.contains('open')) {
    rightSidebar.classList.remove('open');
    mainContent.classList.remove('right-sidebar-active');
  }
  
  typeSidebar.classList.toggle('open');
  mainContent.classList.toggle('type-sidebar-active', isOpening);
});

closeTypeSidebar.addEventListener('click', () => {
  typeSidebar.classList.remove('open');
  mainContent.classList.remove('type-sidebar-active');
});

// Modify existing right sidebar toggle to close type sidebar
toggleGraphBtn?.addEventListener('click', function() {
  const isOpening = !rightSidebar.classList.contains('open');
  
  // Close type sidebar if opening right sidebar
  if (isOpening && typeSidebar.classList.contains('open')) {
    typeSidebar.classList.remove('open');
    mainContent.classList.remove('type-sidebar-active');
  }
  
  rightSidebar.classList.toggle('open');
  mainContent.classList.toggle('right-sidebar-active', isOpening);
});

// Update close right sidebar to handle classes
closeRightSidebar?.addEventListener('click', function() {
  rightSidebar.classList.remove('open');
  mainContent.classList.remove('right-sidebar-active');
});


// Create text element on canvas click
typeCanvas.addEventListener('click', (e) => {
  if (e.target === typeCanvas) {
    createTextElement(e.clientX - typeCanvas.getBoundingClientRect().left, e.clientY - typeCanvas.getBoundingClientRect().top);
  }
});

// Color selection
colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    colorBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentColor = btn.dataset.color;
  });
});

// Set black as default active color
document.querySelector('.color-btn[data-color="black"]').classList.add('active');

// Create text element function
function createTextElement(x, y) {
  const textElement = document.createElement('textarea');
  textElement.className = 'text-element';
  textElement.style.left = `${x}px`;
  textElement.style.top = `${y}px`;
  textElement.style.color = currentColor;
  
  textElement.addEventListener('input', () => {
    textElement.style.height = 'auto';
    textElement.style.height = `${textElement.scrollHeight}px`;
  });
  
  textElement.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    textElement.remove();
  });
  
  typeCanvas.appendChild(textElement);
  textElement.focus();
  textElements.push(textElement);
}

// Export to PDF
exportPdf.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Create a canvas from the typeCanvas
  html2canvas(typeCanvas).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 10, 180, 0);
    doc.save('notebook.pdf');
  });
});

// Helper function to convert HTML to canvas (needed for PDF export)
function html2canvas(element) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    const ctx = canvas.getContext('2d');
    
    // Draw white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw all text elements
    const texts = element.querySelectorAll('.text-element');
    texts.forEach(text => {
      ctx.fillStyle = text.style.color;
      ctx.font = '16px Arial';
      ctx.fillText(text.value, parseInt(text.style.left), parseInt(text.style.top) + 16);
    });
    
    resolve(canvas);
  });
}


const brandName = document.getElementById('brandName');
const navdropIcon = document.getElementById('navdropIcon');
const navdropMenu = document.getElementById('navdropMenu');
const languageOption = document.getElementById('languageOption');

let currentLang = 'en'; // Default language

function setGreeting() {
    const hour = new Date().getHours();
    let greeting = '';

    if (currentLang === 'si') {
        if (hour >= 12 && hour < 18) {
            greeting = 'සුභ දවසක් 🌞';
        } else if (hour >= 18) {
            greeting = 'සුභ සන්ධ්‍යාවක් 🌥️';
        } else {
            greeting = 'සුභ උදෑසනක් 🌻';
        }
    } else {
        if (hour >= 12 && hour < 18) {
            greeting = 'Good afternoon 🌞';
        } else if (hour >= 18) {
            greeting = 'Good evening 🌥️';
        } else {
            greeting = 'Good morning 🌻';
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
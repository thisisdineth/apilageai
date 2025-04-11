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
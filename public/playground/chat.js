const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const createCopyButton = (text) => {
    const button = document.createElement("button");
    button.textContent = "Copy response";
    button.classList.add("copy-button");
    button.onclick = () => {
        const textToCopy = text.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert("Response copied to clipboard!"))
            .catch((err) => console.error("Failed to copy text: ", err));
    };
    return button;
};
const addMessage = (content, sender, isHTML = false) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = sender === "user" ? "../img/user.png" : "../img/Ai.gif";

    const text = document.createElement("div");
    text.classList.add("text");

    if (isHTML) {
        text.innerHTML = content; // Insert HTML content
    } else {
        text.textContent = content; // Insert plain text content
    }

    const codeBlocks = text.querySelectorAll("pre code");
    codeBlocks.forEach((block) => Prism.highlightElement(block));

    const copyButton = createCopyButton(content); 
    if (sender === "bot") {
        messageDiv.appendChild(copyButton); 
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(text);
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    if (sender === "bot") {
        MathJax.typesetPromise([text]).catch((err) => console.error("MathJax rendering error:", err));
    }
};
const fetchResponse = async (message) => {
    try {
        const response = await fetch("https://apilageai.lk/api/chat/get", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user_input: message}),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        let botMessage = data.bot_response || "No response.";

        // 1. Replace LaTeX for block-level math
        botMessage = botMessage.replace(
            /\\\[(.*?)\\\]/gs, // Match block LaTeX: \[...\]
            (match, mathContent) => {
                return `<span class="mathjax-latex">\\[${mathContent}\\]</span>`;
            }
        );

        // 2. Replace LaTeX for inline math
        botMessage = botMessage.replace(
            /\$(.*?)\$/g, // Match inline LaTeX: $...$
            (match, mathContent) => {
                return `<span class="mathjax-latex">\\(${mathContent}\\)</span>`;
            }
        );

        // 3. Format headings starting with ### to be red and italicized
        botMessage = botMessage.replace(
            /###\s+(.*?)(\n|$)/g, // Match headings starting with ###
            (match, headingContent) => `<span style="color:red;"><em>### ${headingContent}</em></span><br />`
        );

        // 4. Format bold, italic, and links
        botMessage = botMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
        botMessage = botMessage.replace(/_(.*?)_/g, '<em>$1</em>'); // Italic
        botMessage = botMessage.replace(/https?:\/\/[^\s]+/g, (url) => `<a href="${url}" target="_blank" style="color: white;">${url}</a>`);

        // 5. Format code blocks for syntax highlighting
        botMessage = botMessage.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<pre><code class="language-${lang.trim()}">${code.trim()}</code></pre>`;
        });

        // 6. Add line breaks for clarity between paragraphs and sections
        botMessage = botMessage.replace(/\n/g, "<br />");

        // 7. Re-render MathJax for all dynamically inserted content
        await MathJax.typesetPromise();

        return botMessage;
    } catch (error) {
        console.error(error);
        return "System Under Maintenance.";
    }
};
const disableInput = (disable) => {
    userInput.disabled = disable;
    sendButton.disabled = disable;

    const sampleButtons = document.querySelectorAll('.sample-message-container button');
    sampleButtons.forEach((button) => {
        button.disabled = disable;
        button.style.cursor = disable ? "not-allowed" : "pointer";
    });

    sendButton.style.cursor = disable ? "not-allowed" : "pointer";
    userInput.style.cursor = disable ? "not-allowed" : "text";
};
const handleUserMessage = async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Add the user's message
    addMessage(message, "user");
    userInput.value = "";

    // Disable input while processing
    disableInput(true);

    // Add the "Typing..." indicator with a unique ID
    const typingIndicator = document.createElement("div");
    typingIndicator.id = "typing-indicator"; // Unique ID for the typing indicator
    typingIndicator.classList.add("message", "bot");
    typingIndicator.textContent = "Typing...";
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        // Fetch the bot's response
        const botMessage = await fetchResponse(message);

        // Remove the "Typing..." indicator explicitly
        const typingElement = document.getElementById("typing-indicator");
        if (typingElement) {
            typingElement.remove();
        }

        // Add the bot's response
        addMessage(botMessage, "bot", true);
    } catch (error) {
        console.error("Error fetching response:", error);

        // Remove the "Typing..." indicator in case of an error
        const typingElement = document.getElementById("typing-indicator");
        if (typingElement) {
            typingElement.remove();
        }

        addMessage("Sorry, something went wrong. Please try again.", "bot", false);
    }

    // Re-enable input
    disableInput(false);
};

sendButton.addEventListener("click", handleUserMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserMessage();
});
const urlParams = new URLSearchParams(window.location.search);
const userQuery = urlParams.get('query');

if (userQuery) {
    userInput.value = userQuery;
}
window.addEventListener("load", () => {
    setTimeout(() => {
        if (userQuery) {
            handleUserMessage(); 
        }
    }, 100); 
});
window.onload = () => {
    addMessage("Hellow කොහොමද ✋🏻 අපිලගේ AI (beta) දැන් ඔයාට උදව් කරන්න ලෑස්තියි ! (වඩා හොද ප්‍රතිචාරයක් සදහා English බසින් අසන්න. තවමත් සිංහල බස පුහුණු වෙමින් පවතී.) ", "bot");
    addMessage(
        "වඩා හොද ප්‍රතිචාර ලබා ගැනීමට කරුණාකර පහළ Chek Box හි option එකක් තෝරාගන්න.. ගණිතයේ හා physics වැන විශයක ප්‍රස්තාර සමග Response ලබා ගැනීමට Image Generation හා අදාළ විශය යන option දෙකම භාවිතා කරන්න.",
        "bot"
      );
};

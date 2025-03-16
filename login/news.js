const taglinesElement = document.getElementById('tech-tagline');

// Your NewsAPI key
const apiKey = 'e91e775b3d2f4958bad26d88d2a03657';

// Function to fetch tech news headlines
async function fetchTechNews() {
    try {
        // Fetch tech news from NewsAPI
        const response = await fetch(`https://newsapi.org/v2/everything?q=computer&apiKey=${apiKey}`);
        const data = await response.json();

        // Check if the response is successful
        if (data.status === "ok") {
            const headlines = data.articles.map(article => article.title);
            return headlines.length ? headlines : ["No tech news available at the moment."];
        } else {
            throw new Error('Failed to fetch tech news');
        }
    } catch (error) {
        console.error("Error fetching tech news:", error);
        // If API fetch fails, use sample taglines as fallback
        return [
            "AI is transforming the future of technology! 🤖",
            "Discover the latest in quantum computing 🚀",
            "Sri Lanka’s tech industry is booming! 🇱🇰",
            "Stay updated with cutting-edge AI innovations 🔥",
            "The future of coding is here with AI assistance 💻"
        ];
    }
}

// Function to change the tagline every 5 seconds
async function rotateTaglines() {
    const taglines = await fetchTechNews();
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * taglines.length);
        taglinesElement.textContent = taglines[randomIndex];
    }, 10000);
}

// Start rotating taglines
rotateTaglines();
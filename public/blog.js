const API_KEY = 'AIzaSyDfc6DXGg_VASW_PivGv7gmNglcrT-_EtI';
const BLOG_ID = '3036668774632497871';
const POSTS_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=3`;

async function fetchLatestPosts() {
    try {
        const response = await fetch(POSTS_URL);
        const data = await response.json();

        const postsContainer = document.getElementById('blog-posts');
        postsContainer.innerHTML = '';

        data.items.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');

            const parser = new DOMParser();
            const doc = parser.parseFromString(post.content, 'text/html');
            const imgElement = doc.querySelector('img');
            const imageUrl = imgElement ? imgElement.src : 'https://via.placeholder.com/100';

            const summary = post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...';

            postElement.innerHTML = `
                <img src="${imageUrl}" alt="Thumbnail">
                <div class="blog-content">
                    <h3>${post.title}</h3>
                    <p>${summary}</p>
                    <a href="${post.url}" target="_blank">Read More</a>
                </div>
            `;

            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

fetchLatestPosts();
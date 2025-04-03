function initializeSampleData() {
    if (!localStorage.getItem('blogPosts')) {
        const samplePosts = [
            {
                author: "Muhammad Hashim Ali",
                title: "This is my first blog",
                content: "These are the contents of blog example just copy and pasted a bunch of times. These are the contents of blog example just copy and pasted a bunch of times. These are the contents of blog example just copy and pasted a bunch of times.",
            },
            {
                author: "Prof. Dor",
                title: "My student Hashim will get 100%",
                content: "I agree that my student Muhammad Hashim Ali will get 100% on this assignment"
            }
        ];
        localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
    }
}

function loadPosts() {
    initializeSampleData();
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No Blog Posted yet</p>';
        return;
    }

    posts.forEach((post, index) => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <p><strong>Author: </strong> ${post.author}</p>
            </div>
            <h3><strong>Title: </strong> ${post.title}</h3>
            <div>
                <p><strong>Blog: </strong> ${post.content}</p>
            </div>
        `
        postsContainer.appendChild(postElement);
    })
}

document.addEventListener('DOMContentLoaded', loadPosts);
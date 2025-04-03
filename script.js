// Error display function
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Initialize sample data
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

// Load posts on homepage
function loadPosts() {
    initializeSampleData();
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;
    
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
                <p><strong>Blog: </strong> ${post.content.substring(0, 150)}...</p>
            </div>
            <a href="post.html?id=${index}" class="read-more">Read Full Post</a>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Create new post
if (document.getElementById('post-form')) {
    const postForm = document.getElementById('post-form');
    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const author = document.getElementById('author').value.trim();
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();

        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

        if (!author) {
            showError('author-error', 'Author name is required!');
            return;
        }
        if (!title) {
            showError('title-error', 'Title is required!');
            return;
        }
        if (!content) {
            showError('content-error', 'Blog Post needs to be written!');
            return;
        }

        const newPost = { author, title, content };
        savePost(newPost);
        window.location.href = 'index.html';
    });
}

function savePost(post) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.unshift(post);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// View and Edit Blog posts
function displayPost(post, postId) {
    const postContent = document.getElementById('post-content');
    if (!postContent) return;

    postContent.innerHTML = `
        <div class="post-meta">
            <p><strong>Author: </strong> ${post.author}</p>
        </div>
        <h2><strong>Title: </strong> ${post.title}</h2>
        <div class="post-body">
            <h3>Blog: </h3>
            <p>${post.content}</p>
        </div>
    `;
}

function setupEditFunc(post, postId) {
    const editButton = document.getElementById('edit-btn');
    const deleteButton = document.getElementById('delete-btn');
    const editForm = document.getElementById('edit-form');
    const postContent = document.getElementById('post-content');
    const cancelEdit = document.getElementById('cancel-edit');

    if (!editButton || !deleteButton || !editForm || !postContent || !cancelEdit) return;

    editButton.addEventListener('click', function() {
        postContent.style.display = 'none';
        editForm.style.display = 'block';
        document.getElementById('edit-author').value = post.author;
        document.getElementById('edit-title').value = post.title;
        document.getElementById('edit-content').value = post.content;
    });

    cancelEdit.addEventListener('click', function() {
        postContent.style.display = 'block';
        editForm.style.display = 'none';
    });

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts[postId] = {
            author: document.getElementById('edit-author').value,
            title: document.getElementById('edit-title').value,
            content: document.getElementById('edit-content').value
        };
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        displayPost(posts[postId], postId);
        postContent.style.display = 'block';
        editForm.style.display = 'none';
    });

    deleteButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this post?')) {
            const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            posts.splice(postId, 1);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            window.location.href = 'index.html';
        }
    });
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('posts-container')) {
        loadPosts();
    }
    
    if (document.getElementById('post-content')) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (postId !== null) {
            const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            const post = posts[postId];
            if (post) {
                displayPost(post, postId);
                setupEditFunc(post, postId);
            } else {
                const postContent = document.getElementById('post-content');
                if (postContent) {
                    postContent.innerHTML = '<p>Post not found</p>';
                }
            }
        }
    }
});
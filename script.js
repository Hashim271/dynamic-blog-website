//See Sample post on the main page

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

//Create a new post

if (document.getElementById('post-form')) {
    const postForm = document.getElementById('post-form');

    postForm.addEventListener('submit', function (x) {
        x.preventDefault();

        const author = document.getElementById('author').value.trim();
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const imageOpt = document.getElementById('image');

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

        const newPost = {
            author,
            title,
            content,
        };

        savePost(newPost);
        window.location.href = 'index.html';

    });
}

function savePost(post) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.unshift(post);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}
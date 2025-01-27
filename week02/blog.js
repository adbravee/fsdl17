// Handling form submission to create a new blog post
document.getElementById("postForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload on form submission

    // Get form values
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    // Validate inputs
    if (!title || !content) {
        showFeedback("Both title and content are required!", "error");
        return;
    }

    // Clear any previous feedback
    showFeedback("", "error");
    showFeedback("", "success");

    // Create a new blog post object
    const newPost = { title, content };

    // Get current posts from localStorage (if any)
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    // Add new post to saved posts
    savedPosts.push(newPost);

    // Save updated posts back to localStorage
    localStorage.setItem("blogPosts", JSON.stringify(savedPosts));

    // Clear form inputs
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    // Provide success feedback
    showFeedback("Post submitted successfully!", "success");
});

// Function to display feedback messages
function showFeedback(message, type) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = message;
    feedbackDiv.className = type; // error or success class
}

// Function to load all blog posts on the view page
window.onload = function() {
    const blogPostsSection = document.getElementById("blogPosts");
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    // Render each saved post with a delete button
    savedPosts.forEach((postData, index) => {
        const post = document.createElement("div");
        post.classList.add("blog-post");

        const postTitle = document.createElement("h3");
        postTitle.textContent = postData.title;
        post.appendChild(postTitle);

        const postContent = document.createElement("p");
        postContent.textContent = postData.content;
        post.appendChild(postContent);

        // Create the delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function() {
            deletePost(index);
        };
        post.appendChild(deleteBtn);

        blogPostsSection.appendChild(post);
    });
};

// Function to delete a post from both the UI and localStorage
function deletePost(postIndex) {
    // Get the current saved posts
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    // Remove the post from the array
    savedPosts.splice(postIndex, 1);

    // Save the updated array back to localStorage
    localStorage.setItem("blogPosts", JSON.stringify(savedPosts));

    // Reload the page to reflect the changes
    location.reload();
}

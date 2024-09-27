// Comment and Rating Handling
let comments = JSON.parse(localStorage.getItem('comments')) || [];

// Function to render comments
function renderComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.classList.add('list-group-item');

        // Render the star rating with the comment
        const stars = '★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating);

        commentItem.innerHTML = `
            <div>
                <strong>${comment.name}</strong>
                <span class="ms-2">${stars}</span>
            </div>
            <p>${comment.text}</p>
        `;
        commentsList.appendChild(commentItem);
    });
}

// Submit comment form handler
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const commentText = document.getElementById('comment').value;
    const rating = parseInt(document.getElementById('rating').value);

    if (rating === 0) {
        alert("Please select a rating.");
        return;
    }

    // Create new comment object
    const newComment = {
        name: username,
        text: commentText,
        rating: rating
    };

    // Add comment to the array and save to localStorage
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));

    // Clear form
    document.getElementById('comment-form').reset();
    document.getElementById('rating').value = '0';
    updateStarSelection(0);

    // Re-render comments
    renderComments();
});

// Star rating selection
const stars = document.querySelectorAll('#star-rating .star');
stars.forEach(star => {
    star.addEventListener('click', function() {
        const ratingValue = parseInt(this.getAttribute('data-value'));
        document.getElementById('rating').value = ratingValue;
        updateStarSelection(ratingValue);
    });
});

// Function to visually update the star selection
function updateStarSelection(rating) {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('selected', starValue <= rating);
    });
}

// Initialize page by rendering comments from localStorage
renderComments();

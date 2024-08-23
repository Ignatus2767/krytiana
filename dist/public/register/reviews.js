// public/js/reviews.js

document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.getElementById('review-form');
  const reviewsList = document.getElementById('reviews-list');
  const feedbackMessage = document.getElementById('feedback-message'); // If you still use it
  const reviewFormElement = document.getElementById('reviewForm');

  // Handle Review Form Submission
  reviewFormElement.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      fetch('/api/reviews/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(Object.fromEntries(formData.entries()))
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              showFeedback('Review submitted successfully!', 'success');
              event.target.reset();
              fetchReviews();
          } else {
              showFeedback(data.message, 'error');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          showFeedback('An error occurred. Please try again.', 'error');
      });
  });

  // Function to fetch reviews from the server
  const fetchReviews = () => {
    fetch('/api/reviews/all')
    .then(response => response.json())
    .then(data => {
        reviewsList.innerHTML = '';
        // Prepend new reviews
        data.forEach(review => {
            const li = document.createElement('li');
            li.textContent = `${review.username} (${new Date(review.date).toLocaleString()}): ${review.comment} - Rating: ${review.rating}`;
            reviewsList.insertBefore(li, reviewsList.firstChild);
        });
    });
  };


  // Function to display feedback messages
  const showFeedback = (message, type) => {
      feedbackMessage.textContent = message;
      feedbackMessage.className = `feedback-message ${type}`; // 'success' or 'error'
      feedbackMessage.style.display = 'block';
      setTimeout(() => {
          feedbackMessage.style.display = 'none';
      }, 5000);
  };

  // Initial fetch of reviews when the page loads
  fetchReviews();
});

document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.getElementById('reviewForm');
  const reviewsContainer = document.getElementById('reviews-container');

  // Function to fetch and display reviews
  const fetchReviews = async () => {
      try {
          const response = await fetch('/api/reviews/all');
          const reviews = await response.json();

          reviewsContainer.innerHTML = '';

          reviews.forEach(review => {
              const reviewElement = document.createElement('div');
              reviewElement.classList.add('review');

              reviewElement.innerHTML = `
                  <p class="username">${review.username} <span class="rating">(${review.rating}/5)</span></p>
                  <p class="comment">${review.comment}</p>
              `;

              reviewsContainer.appendChild(reviewElement);
          });
      } catch (error) {
          console.error('Error fetching reviews:', error);
      }
  };

  // Function to handle form submission
  reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(reviewForm);
      const reviewData = {
          username: formData.get('username'),
          comment: formData.get('comment'),
          rating: formData.get('rating')
      };

      try {
          const response = await fetch('/api/reviews/add', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(reviewData)
          });

          const data = await response.json();

          if (data.success) {
              reviewForm.reset(); // Clear form
              fetchReviews(); // Refresh the reviews list
              //alert('Review submitted successfully!');
          } else {
              console.error('Error adding review:', data.message);
          }
      } catch (error) {
          console.error('Error submitting review:', error);
          alert('Error submitting review. Please try again later.');

      }
  });

  // Initial fetch of reviews
  fetchReviews();
});
document.getElementById('toggleText').addEventListener('click', function() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm.style.display === 'none' || reviewForm.style.display === '') {
        reviewForm.style.display = 'block';
    } else {
        reviewForm.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
   
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');
    const feedbackMessage = document.getElementById('feedback-message'); // Feedback message element
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const forgotPasswordFormElement = document.getElementById('forgotPasswordForm');
    const forgotPasswordFeedback = document.getElementById('forgot-password-feedback');

    // Switch between forms
    signupBtn.addEventListener('click', function() {
        toggleActiveForm('signup');
    });

    signinBtn.addEventListener('click', function() {
        toggleActiveForm('signin');
    });

   

    function toggleActiveForm(activeForm) {
        // Reset all buttons
        signupBtn.classList.remove('active');
        signinBtn.classList.remove('active');
       

        // Hide all forms
        signupForm.classList.add('hidden');
        signinForm.classList.add('hidden');
       

        // Show the active form and button
        if (activeForm === 'signup') {
            signupBtn.classList.add('active');
            signupForm.classList.remove('hidden');
        } else if (activeForm === 'signin') {
            signinBtn.classList.add('active');
            signinForm.classList.remove('hidden');
        } 
    }

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        forgotPasswordForm.classList.toggle('hidden');
    });

    // Handle form submission for signup
    const signupFormElement = document.getElementById('signupForm');
    signupFormElement.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(signupFormElement); // Get form data
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        // Validate password and confirm password
        if (password !== confirmPassword) {
            showFeedback('Passwords do not match. Please re-enter.', 'error');
            console.log('Passwords do not match:', password, confirmPassword);
            return;
        }

        fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Signup successful!', 'success');
                window.location.href = 'index.html'; // Redirect to signin page
            } else {
                showFeedback(data.message, 'error'); // Show specific error message
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
        });
    });

    // Handle Signin Form Submission
    document.getElementById('signinForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Sign-in successful!', 'success');
                window.location.href = 'https://ignatus2767.github.io/krydmal/';
            } else {
                showFeedback(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
        });
    });

    // Handle Review Form Submission
    document.getElementById('reviewForm').addEventListener('submit', function(event) {
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
            data.forEach(review => {
                const li = document.createElement('li');
                li.textContent = `${review.username} (${new Date(review.date).toLocaleString()}): ${review.comment} - Rating: ${review.rating}`;
                reviewsList.appendChild(li);
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

    forgotPasswordFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(forgotPasswordFormElement);
        fetch('/api/users/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Password reset link sent to your email.', 'success');
                forgotPasswordFormElement.reset();
            } else {
                showFeedback(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
        });
    });
});

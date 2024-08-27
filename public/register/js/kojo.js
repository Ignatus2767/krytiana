document.addEventListener('DOMContentLoaded', function() {
    const showFeedback = (message, type) => {
        const feedbackMessage = document.getElementById('feedback-message');
        feedbackMessage.textContent = message;
        feedbackMessage.className = type; // 'success' or 'error'
        feedbackMessage.style.display = 'block';
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 5000);
    };

    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const signupFormElement = document.getElementById('signup-form'); // Updated ID
    const signinFormElement = document.getElementById('signin-form'); // Updated ID
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const forgotPasswordFormElement = document.getElementById('forgotPasswordForm');

    // Switch between forms
    signupBtn.addEventListener('click', function() {
        toggleActiveForm('signup');
    });

    signinBtn.addEventListener('click', function() {
        toggleActiveForm('signin');
    });

    function toggleActiveForm(activeForm) {
        console.log('Toggling form:', activeForm); // Debugging line
        signupBtn.classList.remove('active');
        signinBtn.classList.remove('active');

        if (activeForm === 'signup') {
            signupBtn.classList.add('active');
            signupFormElement.classList.remove('hidden');
            signinFormElement.classList.add('hidden');
        } else if (activeForm === 'signin') {
            signinBtn.classList.add('active');
            signinFormElement.classList.remove('hidden');
            signupFormElement.classList.add('hidden');
        }
    }

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        forgotPasswordForm.classList.toggle('hidden');
    });

    signupFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(signupFormElement);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword) {
            showFeedback('Passwords do not match. Please re-enter.', 'error');
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
                window.location.href = 'index.html';
            } else {
                showFeedback(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
        });
    });

    signinFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(signinFormElement);

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

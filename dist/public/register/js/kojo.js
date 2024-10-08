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
    const signupFormElement = document.getElementById('signup-form');
    const signinFormElement = document.getElementById('signin-form');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const forgotPasswordFormElement = document.getElementById('forgotPasswordForm');

    //Debugging: Check if elements are properly selected
    //console.log('Signup button:', signupBtn);
    //console.log('Signin button:', signinBtn);
    //console.log('Signup form element:', signupFormElement);
    //console.log('Signin form element:', signinFormElement);
    //console.log('Forgot password link:', forgotPasswordLink);
    //console.log('Forgot password form:', forgotPasswordForm);
    //console.log('Forgot password form element:', forgotPasswordFormElement);

    // Ensure elements exist
    if (!signupBtn || !signinBtn || !signupFormElement || !signinFormElement || !forgotPasswordLink || !forgotPasswordForm || !forgotPasswordFormElement) {
        //console.error('One or more elements are missing');
        return;
    }

    // Switch between forms
    signupBtn.addEventListener('click', function() {
        //console.log('Signup button clicked');
        toggleActiveForm('signup');
    });

    signinBtn.addEventListener('click', function() {
       // console.log('Sign In button clicked');
        toggleActiveForm('signin');
    });

    function toggleActiveForm(activeForm) {
        //console.log('Toggling form to:', activeForm);

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

    const createFormData = (formElement) => {
        if (formElement instanceof HTMLFormElement) {
            return new FormData(formElement);
        } else {
            console.error('Form element is not an HTMLFormElement');
            return null;
        }
    };

    function validatePassword(password) {
        const minLength = 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= minLength && hasLetter && hasNumber;
    }

    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = createFormData(this);
        if (!formData) return; // Exit if formData creation failed

        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (!validatePassword(password)) {
            showFeedback('Password must be at least 8 characters long and include at least one letter and one number.', 'error');
            return;
        }

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
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard';
            } else {
                showFeedback(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
        });
    });

    document.getElementById('signinForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = createFormData(this);
        if (!formData) return; // Exit if formData creation failed

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
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard';
            } else {
                showFeedback(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
        });
    });

    document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = createFormData(this);
        if (!formData) return; // Exit if formData creation failed

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

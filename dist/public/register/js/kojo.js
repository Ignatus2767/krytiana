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
    const signupFormElement = document.getElementById('signupForm'); // Fixed ID
    const signinFormElement = document.getElementById('signinForm'); // Fixed ID
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm'); // Fixed ID

    if (!signupBtn || !signinBtn || !signupFormElement || !signinFormElement || !forgotPasswordLink || !forgotPasswordForm) {
        console.warn('One or more elements are missing.');
        return;
    }

    // Switch between forms
    signupBtn.addEventListener('click', () => toggleActiveForm('signup'));
    signinBtn.addEventListener('click', () => toggleActiveForm('signin'));

    function toggleActiveForm(activeForm) {
        signupBtn.classList.remove('active');
        signinBtn.classList.remove('active');

        if (activeForm === 'signup') {
            signupBtn.classList.add('active');
            signupFormElement.classList.remove('hidden');
            signinFormElement.classList.add('hidden');
        } else {
            signinBtn.classList.add('active');
            signinFormElement.classList.remove('hidden');
            signupFormElement.classList.add('hidden');
        }
    }

    forgotPasswordLink.addEventListener('click', (event) => {
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
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasLetter && hasNumber;
    }

    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = createFormData(this);
        if (!formData) return;

        const password = formData.get('password').trim();
        const confirmPassword = formData.get('confirm-password').trim();

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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.json().catch(() => ({ success: false, message: "Invalid server response" })))
        .then(data => {
            if (data.success) {
                showFeedback('Signup successful!', 'success');
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
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
        if (!formData) return;

        fetch('/api/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Sign-in successful!', 'success');
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                if (typeof loginSuccess === 'function') {
                    loginSuccess(data.token, data.refreshToken);
                }
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
        if (!formData) return;

        fetch('/api/users/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Password reset link sent to your email.', 'success');
                this.reset(); // Reset the form after submission
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

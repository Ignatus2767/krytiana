document.addEventListener('DOMContentLoaded', function () {
    const showFeedback = (message, type) => {
        const feedbackMessage = document.getElementById('feedback-message');
        if (feedbackMessage) {
            feedbackMessage.textContent = message;
            feedbackMessage.className = type; // 'success' or 'error'
            feedbackMessage.style.display = 'block';
            setTimeout(() => {
                feedbackMessage.style.display = 'none';
            }, 5000);
        }
    };

    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const signupFormElement = document.getElementById('signup-form');
    const signinFormElement = document.getElementById('signin-form');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const forgotPasswordFormElement = document.getElementById('forgotPasswordForm');

    if (!signupBtn || !signinBtn || !signupFormElement || !signinFormElement || !forgotPasswordLink || !forgotPasswordForm || !forgotPasswordFormElement) {
        console.warn('Some elements are missing. Exiting script.');
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
        } else if (activeForm === 'signin') {
            signinBtn.classList.add('active');
            signinFormElement.classList.remove('hidden');
            signupFormElement.classList.add('hidden');
        }
    }

    forgotPasswordLink.addEventListener('click', function (event) {
        event.preventDefault();
        forgotPasswordForm.classList.toggle('hidden');
    });

    const createFormData = (formElement) => {
        if (formElement instanceof HTMLFormElement) {
            return new FormData(formElement);
        }
        console.error('Form element is not an HTMLFormElement');
        return null;
    };

    function validatePassword(password) {
        return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = createFormData(this);
            if (!formData) return;

            const password = formData.get('password')?.trim();
            const confirmPassword = formData.get('confirm-password')?.trim();

            if (!validatePassword(password)) {
                showFeedback('Password must be at least 8 characters long, include a letter and a number.', 'error');
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
    }

    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = createFormData(this);
            if (!formData) return;

            fetch('/api/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
            })
            .then(response => response.json().catch(() => ({ success: false, message: "Invalid server response" })))
            .then(data => {
                if (data.success) {
                    showFeedback('Sign-in successful!', 'success');
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
    }

    if (forgotPasswordFormElement) {
        forgotPasswordFormElement.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = createFormData(this);
            if (!formData) return;

            fetch('/api/users/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
            })
            .then(response => response.json().catch(() => ({ success: false, message: "Invalid server response" })))
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
    }
});

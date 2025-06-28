// Login page specific JavaScript

let currentTab = 'login';

document.addEventListener('DOMContentLoaded', function() {
    initializeAuthPage();
});

function initializeAuthPage() {
    setupAuthTabs();
    setupFormValidation();
    setupPasswordToggle();
    setupPasswordStrength();
    setupSocialLogin();
}

function setupAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab || tab.textContent.toLowerCase();
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase() === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update form visibility
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (tabName === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function setupFormValidation() {
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Real-time validation
    const inputs = document.querySelectorAll('input[type="email"], input[type="tel"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function setupPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            const icon = toggle.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

function setupPasswordStrength() {
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = calculatePasswordStrength(password);
            
            updatePasswordStrength(strength, strengthBar, strengthText);
        });
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 25;
    if (password.match(/[a-z]/)) score += 25;
    if (password.match(/[A-Z]/)) score += 25;
    if (password.match(/[0-9]/)) score += 25;
    if (password.match(/[^a-zA-Z0-9]/)) score += 25;
    
    return Math.min(score, 100);
}

function updatePasswordStrength(strength, strengthBar, strengthText) {
    strengthBar.style.width = `${strength}%`;
    
    if (strength < 25) {
        strengthBar.style.background = '#ef4444';
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#ef4444';
    } else if (strength < 50) {
        strengthBar.style.background = '#f59e0b';
        strengthText.textContent = 'Fair password';
        strengthText.style.color = '#f59e0b';
    } else if (strength < 75) {
        strengthBar.style.background = '#3b82f6';
        strengthText.textContent = 'Good password';
        strengthText.style.color = '#3b82f6';
    } else {
        strengthBar.style.background = '#10b981';
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#10b981';
    }
}

function setupSocialLogin() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.classList.contains('google') ? 'Google' : 'Facebook';
            handleSocialLogin(provider);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    switch (field.type) {
        case 'email':
            if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
        case 'tel':
            if (!isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
            }
            break;
        case 'password':
            if (field.id === 'register-password' && value.length < 8) {
                showFieldError(field, 'Password must be at least 8 characters long');
            }
            break;
    }
    
    // Confirm password validation
    if (field.id === 'confirm-password') {
        const password = document.getElementById('register-password').value;
        if (value !== password) {
            showFieldError(field, 'Passwords do not match');
        }
    }
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email) && !isValidPhone(email)) {
        showToast('Please enter a valid email or phone number', 'error');
        return;
    }
    
    showLoadingOverlay();
    
    // Simulate login API call
    setTimeout(() => {
        hideLoadingOverlay();
        
        // Simulate successful login
        if (email === 'demo@bikedekho.com' && password === 'demo123') {
            showToast('Login successful! Welcome back!', 'success');
            
            // Store login state
            if (rememberMe) {
                localStorage.setItem('bikedekho_user', JSON.stringify({
                    email: email,
                    loginTime: new Date().toISOString()
                }));
            }
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showToast('Invalid credentials. Try demo@bikedekho.com / demo123', 'error');
        }
    }, 2000);
}

function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const mobile = document.getElementById('mobile-number').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsAgree = document.getElementById('terms-agree').checked;
    
    // Validation
    if (!firstName || !lastName || !email || !mobile || !password || !confirmPassword) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!isValidPhone(mobile)) {
        showToast('Please enter a valid mobile number', 'error');
        return;
    }
    
    if (password.length < 8) {
        showToast('Password must be at least 8 characters long', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (!termsAgree) {
        showToast('Please agree to the Terms & Conditions', 'error');
        return;
    }
    
    showLoadingOverlay();
    
    // Simulate registration API call
    setTimeout(() => {
        hideLoadingOverlay();
        
        showToast('Registration successful! Please check your email for verification.', 'success');
        
        // Switch to login tab
        setTimeout(() => {
            switchTab('login');
            document.getElementById('login-email').value = email;
        }, 2000);
    }, 2500);
}

function handleSocialLogin(provider) {
    showLoadingOverlay();
    
    setTimeout(() => {
        hideLoadingOverlay();
        showToast(`${provider} login is not available in demo mode`, 'info');
    }, 1500);
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Export functions for global access
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.togglePassword = togglePassword;

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .form-group input.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .error-message {
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    
    .error-message::before {
        content: '⚠';
        font-size: 14px;
    }
    
    .form-group input:focus.error {
        border-color: #ef4444;
    }
    
    .checkbox-label a {
        color: #E74C3C;
        text-decoration: none;
    }
    
    .checkbox-label a:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(style);
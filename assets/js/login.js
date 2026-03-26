// Configuration - inline to avoid module import issues
console.log('✓ Script starting');

var pythonURI = location.hostname === "localhost" || location.hostname === "127.0.0.1" 
    ? "http://localhost:8328"
    : "https://flask.opencodingsociety.com";
    
var javaURI = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:8328" 
    : "https://spring.opencodingsociety.com";

var fetchOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': 'client'
    }
};

console.log('✓ Config initialized - pythonURI:', pythonURI);

let signupFormData = {};
let validationTimeout = null;

console.log('✓ Login page script loaded');

// Interactive background effect
const container = document.querySelector('.auth-container');
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  if (container) {
    container.style.setProperty('--mouse-x', x);
    container.style.setProperty('--mouse-y', y);
  }
});

// Form card smooth transitions
window.switchToSignup = function(e) {
  e.preventDefault();
  const loginCard = document.querySelector('.auth-card:first-child');
  const signupCard = document.querySelector('.auth-card:last-child');
  
  loginCard.style.animation = 'fadeOut 0.4s ease forwards';
  setTimeout(() => {
    loginCard.style.display = 'none';
    signupCard.style.display = 'flex';
    signupCard.style.animation = 'fadeInScale 0.5s ease';
  }, 400);
};

window.switchToLogin = function(e) {
  e.preventDefault();
  const loginCard = document.querySelector('.auth-card:first-child');
  const signupCard = document.querySelector('.auth-card:last-child');
  
  signupCard.style.animation = 'fadeOut 0.4s ease forwards';
  setTimeout(() => {
    signupCard.style.display = 'none';
    loginCard.style.display = 'flex';
    loginCard.style.animation = 'fadeInScale 0.5s ease';
  }, 400);
};

// Add style animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.98); }
  }
  
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);

// Input field interactions
const inputs = document.querySelectorAll('.form-group input, .form-group select');
inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });
  
  input.addEventListener('input', function() {
    if (this.value) {
      this.parentElement.classList.add('has-value');
    } else {
      this.parentElement.classList.remove('has-value');
    }
  });
});

// Password validation with debouncing
function validatePasswordsDebounced() {
    if (validationTimeout) {
        clearTimeout(validationTimeout);
    }

    validationTimeout = setTimeout(() => {
        validateForm();
    }, 1500);
}

function validateForm() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmField = document.getElementById('confirmPassword');
    const messageDiv = document.getElementById('password-validation-message');

    confirmField.classList.remove('error');
    messageDiv.classList.remove('show', 'validation-success');
    messageDiv.textContent = '';

    if (confirmPassword === '') {
        return true;
    }

    if (password.length < 8) {
        confirmField.classList.add('error');
        messageDiv.classList.add('show');
        messageDiv.textContent = '✗ Passwords must be at least 8 characters';
        return false;
    }

    if (password === confirmPassword) {
        messageDiv.classList.add('validation-success');
        messageDiv.textContent = '✓ Passwords match';
        return true;
    } else {
        confirmField.classList.add('error');
        messageDiv.classList.add('show');
        messageDiv.textContent = '✗ Passwords do not match';
        return false;
    }
}

function validateSignupForm() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        document.getElementById('confirmPassword').focus();
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        document.getElementById('signupPassword').focus();
        return false;
    }

    return true;
}

window.handleSignupSubmit = function(event) {
    event.preventDefault();

    const form = document.getElementById('signupForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (!validateSignupForm()) {
        return;
    }

    signupFormData = {
        name: document.getElementById("name").value,
        uid: document.getElementById("signupUid").value,
        email: document.getElementById("signupEmail").value,
        password: document.getElementById("signupPassword").value,
    };

    signup();
}

// Function to handle both Python and Java login simultaneously
window.loginBoth = function () {
    const uid = document.getElementById("uid").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById('message');

    if (!uid || !password) {
        messageDiv.textContent = 'Please enter both username and password';
        messageDiv.classList.add('show');
        return;
    }

    messageDiv.classList.remove('show');

    let pythonSuccess = false;
    let javaSuccess = false;

    let javaPromise = new Promise((resolve) => {
        window.javaLogin(resolve, (success) => { javaSuccess = success; });
    });
    let pythonPromise = new Promise((resolve) => {
        window.pythonLogin(resolve, (success) => { pythonSuccess = success; });
    });

    Promise.allSettled([javaPromise, pythonPromise]).then(() => {
        // Only redirect if at least one login succeeded
        if (pythonSuccess || javaSuccess) {
            // Clear any error messages before redirecting
            messageDiv.classList.remove('show');
            window.location.href = '/dad';
        } else {
            // Show error only if both failed
            messageDiv.textContent = 'Invalid username or password';
            messageDiv.classList.add('show');
        }
    });
};

window.pythonLogin = function (done, onStatus) {
    const options = {
        URL: `${pythonURI}/api/authenticate`,
        callback: function() {
            if (done) done();
        },
        message: "message",
        method: "POST",
        cache: "no-cache",
        body: {
            uid: document.getElementById("uid").value,
            password: document.getElementById("password").value,
        }
    };
    fetch(options.URL, {
        method: options.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(options.body)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
        if (onStatus) onStatus(true);
        if (done) done();
    })
    .catch(error => {
        console.error('Python login error:', error);
        if (onStatus) onStatus(false);
        if (done) done();
    });
}

window.javaLogin = function (done, onStatus) {
    const loginURL = `${javaURI}/authenticate`;
    const userCredentials = JSON.stringify({
        uid: document.getElementById("uid").value,
        password: document.getElementById("password").value,
    });
    const loginOptions = {
        ...fetchOptions,
        method: "POST",
        body: userCredentials,
    };

    fetch(loginURL, loginOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid credentials");
            }
            return response.text();
        })
        .then(data => {
            if (onStatus) onStatus(true);
            if (done) done();
        })
        .catch(error => {
            console.error("Login error:", error.message);
            if (onStatus) onStatus(false);
            if (done) done();
        });
};

window.signup = function () {
    const signupButton = document.querySelector(".auth-card:last-child .btn-submit");
    const statusDiv = document.getElementById('signupStatus');

    signupButton.disabled = true;
    statusDiv.textContent = 'Creating account...';
    statusDiv.classList.add('show');

    const data = {
        name: signupFormData.name || document.getElementById("name").value,
        uid: signupFormData.uid || document.getElementById("signupUid").value,
        email: signupFormData.email || document.getElementById("signupEmail").value,
        password: signupFormData.password || document.getElementById("signupPassword").value,
    };

    const signupDataJava = {
        uid: data.uid,
        sid: "0000000",
        email: data.email,
        dob: "01-01-2000",
        name: data.name,
        password: data.password,
        kasmServerNeeded: false,
    };

    console.log("Creating account with data:", data);

    // Flask Backend Request
    const flaskPromise = fetch(`${pythonURI}/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(errorText => {
                throw new Error(`Server error: ${response.status}`);
            });
        }
    })
    .catch(error => {
        console.error("Flask error:", error);
    });

    // Spring Backend Request
    const springPromise = fetch(`${javaURI}/api/person/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupDataJava)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Server error: ${response.status}`);
        }
    })
    .catch(error => {
        console.error("Spring error:", error);
    });

    Promise.allSettled([flaskPromise, springPromise])
        .then(results => {
            signupButton.disabled = false;

            const hasSuccess = results.some(r => r.status === 'fulfilled');

            if (hasSuccess) {
                statusDiv.textContent = '✓ Account created successfully! Switching to sign in...';
                statusDiv.classList.remove('error');
                statusDiv.classList.add('success');

                // Clear the signup form
                document.getElementById('signupForm').reset();
                
                setTimeout(() => {
                    switchToLogin({preventDefault: () => {}});
                    // Clear any status messages
                    statusDiv.classList.remove('show');
                }, 1500);
            } else {
                statusDiv.textContent = '✗ Failed to create account. Please try again.';
                statusDiv.classList.add('error');
                statusDiv.classList.remove('success');
            }
        });
}

// Check for existing valid session by trying to get current user
function verifyCookie() {
    return getCurrentUser().then(userInfo => {
        // If we got user info, session is valid
        return userInfo !== null;
    }).catch(error => {
        console.error('Cookie verification error:', error);
        return false;
    });
}

// Fetch current user information
function getCurrentUser() {
    return fetch(`${pythonURI}/api/id`, {
        ...fetchOptions,
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json().then(data => {
                console.log('User response:', data);
                return data;
            });
        }
        console.log('User endpoint response not ok:', response.status);
        return null;
    }).catch(error => {
        console.error('Error fetching user info:', error);
        return null;
    });
}

// Logout function
window.handleLogout = function() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        // Call logout endpoints
        Promise.all([
            fetch(`${pythonURI}/api/logout`, {
                ...fetchOptions,
                method: 'POST'
            }).catch(() => null),
            fetch(`${javaURI}/api/logout`, {
                ...fetchOptions,
                method: 'POST'
            }).catch(() => null)
        ]).then(() => {
            // Redirect to login page
            window.location.href = '/login.html';
        });
    }
}

// Initialize on page load
function initializePage() {
    console.log('initializePage called');
    // First, verify if user has a valid session cookie
    verifyCookie().then(hasValidSession => {
        console.log('Session valid:', hasValidSession);
        if (hasValidSession) {
            // User has a valid session, fetch and display their info
            getCurrentUser().then(userInfo => {
                console.log('User info retrieved:', userInfo);
                const userBtn = document.getElementById('user-btn');
                if (userInfo) {
                    const displayName = userInfo.uid || userInfo.username || userInfo.name || 'User';
                    console.log('Setting button text to:', displayName);
                    userBtn.textContent = displayName;
                    userBtn.style.textTransform = 'none';
                    userBtn.onclick = window.handleLogout;
                } else {
                    // If we can't get user info, still show logged in state
                    console.log('No user info, setting button to Profile');
                    userBtn.textContent = 'Profile';
                    userBtn.onclick = window.handleLogout;
                }
            });
            return;
        }
        
        // No valid session, clear any stale data and show login form
        console.log('No valid session, showing login form');
        document.getElementById('uid').value = '';
        document.getElementById('password').value = '';
        
        // Setup user button for login
        const userBtn = document.getElementById('user-btn');
        userBtn.textContent = 'Login';
        userBtn.onclick = null;
        
        // Initialize password validation
        const passwordField = document.getElementById('signupPassword');
        const confirmPasswordField = document.getElementById('confirmPassword');

        if (passwordField && confirmPasswordField) {
            passwordField.addEventListener('input', validatePasswordsDebounced);
            confirmPasswordField.addEventListener('input', validatePasswordsDebounced);
        }
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Also run on load event as fallback
window.addEventListener('load', initializePage);

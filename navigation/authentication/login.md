---
layout: page
title: Login
permalink: /loginOld
search_exclude: true
show_reading_time: false
---

<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"/>

<style>
  :root {
    --navy: #0a1628;
    --gold: #c8973a;
    --gold-light: #e8b55a;
    --white: #f9f7f2;
    --off-white: #ede9e0;
    --gray: #6b6b6b;
    --dark-gray: #2a2a2a;
    --red-accent: #b03030;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { 
    scroll-behavior: smooth;
    background: var(--white) !important;
  }

  body {
    font-family: 'Source Sans 3', sans-serif;
    background: var(--white) !important;
    color: var(--dark-gray);
    overflow-x: hidden;
  }

  .auth-container {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--navy) 0%, #0f1f35 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
  }

  .auth-wrapper {
    width: 100%;
    max-width: 1100px;
  }

  .auth-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .auth-header h1 {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    color: var(--white);
    margin-bottom: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .auth-header p {
    font-size: 1.1rem;
    color: rgba(249,247,242,0.75);
    max-width: 500px;
    margin: 0 auto;
  }

  .auth-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    width: 100%;
  }

  .auth-card {
    background: var(--white) !important;
    border-radius: 2px;
    padding: 48px 40px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .auth-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gold);
  }

  .auth-card h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--navy) !important;
    margin: 0 0 32px 0;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-group label {
    display: block;
    font-family: 'Oswald', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray);
    margin-bottom: 8px;
    font-weight: 600;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--off-white);
    border-radius: 2px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
    color: var(--dark-gray) !important;
    background: var(--white) !important;
  }

  .form-group input::placeholder {
    color: var(--gray);
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(200, 151, 58, 0.08);
  }

  .form-group.error input {
    border-color: var(--red-accent);
  }

  .error-message {
    color: var(--red-accent);
    font-size: 0.85rem;
    margin-top: 6px;
    display: none;
  }

  .error-message.show {
    display: block;
  }

  .validation-success {
    color: #16a34a;
    font-size: 0.85rem;
    margin-top: 6px;
  }

  .btn-submit {
    width: 100%;
    padding: 14px 24px;
    background: var(--gold) !important;
    color: var(--navy) !important;
    border: none;
    border-radius: 2px;
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    margin-top: 24px;
  }

  .btn-submit:hover:not(:disabled) {
    background: var(--gold-light) !important;
    transform: translateY(-2px);
  }

  .btn-submit:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn-submit:disabled {
    background: #ccc !important;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .form-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 0.9rem;
    color: var(--gray);
  }

  .form-footer a {
    color: var(--gold) !important;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s;
  }

  .form-footer a:hover {
    color: var(--gold-light) !important;
  }

  #message {
    color: var(--red-accent);
    font-size: 0.85rem;
    margin-top: 12px;
    text-align: center;
    display: none;
  }

  #message.show {
    display: block;
  }

  .status-message {
    padding: 12px 16px;
    border-radius: 2px;
    margin-top: 16px;
    font-size: 0.85rem;
    display: none;
  }

  .status-message.show {
    display: block;
  }

  .status-message.success {
    background: rgba(16, 185, 129, 0.1);
    color: #047857;
    border-left: 3px solid #10b981;
  }

  .status-message.error {
    background: rgba(239, 68, 68, 0.1);
    color: #991b1b;
    border-left: 3px solid #ef4444;
  }

  @media (max-width: 900px) {
    .auth-inner {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .auth-card {
      padding: 40px 32px;
    }

    .auth-header {
      margin-bottom: 40px;
    }

    .auth-header h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: 480px) {
    .auth-container {
      padding: 40px 16px;
    }

    .auth-card {
      padding: 32px 20px;
    }

    .auth-header h1 {
      font-size: 1.6rem;
    }

    .form-group input,
    .form-group select {
      padding: 10px 12px;
    }
  }
</style>


<div class="auth-container">
  <div class="auth-wrapper">
    <div class="auth-header">
      <h1>Access Your Account</h1>
      <p>Sign in to your D.A.D. account or create a new one to get started on your journey of exceptional achievement.</p>
    </div>

    <div class="auth-inner">
      <!-- Login Card -->
      <div class="auth-card">
        <h2>Sign In</h2>
        <form id="pythonForm" onsubmit="loginBoth(); return false;">
          <div class="form-group">
            <label for="uid">Username</label>
            <input type="text" id="uid" placeholder="Enter your username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="btn-submit">Sign In</button>
          <div id="message"></div>
        </form>
        <div class="form-footer">
          Don't have an account? <a onclick="switchToSignup(event)">Create one</a>
        </div>
      </div>

      <!-- Sign Up Card -->
      <div class="auth-card">
        <h2>Create Account</h2>
        <form id="signupForm" onsubmit="handleSignupSubmit(event);">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" placeholder="Your full name" required>
          </div>
          <div class="form-group">
            <label for="signupUid">Username</label>
            <input type="text" id="signupUid" placeholder="Choose a username" required>
          </div>
          <div class="form-group">
            <label for="signupEmail">Email</label>
            <input type="email" id="signupEmail" placeholder="Your email address" required>
          </div>
          <div class="form-group">
            <label for="signupPassword">Password</label>
            <input type="password" id="signupPassword" placeholder="Create a password (min. 8 characters)" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="Confirm your password" required>
            <div id="password-validation-message" class="error-message"></div>
          </div>
          <button type="submit" class="btn-submit">Create Account</button>
          <div id="signupStatus" class="status-message"></div>
        </form>
        <div class="form-footer">
          Already registered? <a onclick="switchToLogin(event)">Sign in instead</a>
        </div>
      </div>
    </div>
  </div>
</div>

<script type="module">
    import { login, pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    let signupFormData = {};
    let validationTimeout = null;

    // Switch between login and signup
    window.switchToSignup = function(e) {
      e.preventDefault();
      document.querySelector('.auth-inner').style.animation = 'none';
      setTimeout(() => {
        document.querySelector('.auth-card:first-child').style.order = '2';
        document.querySelector('.auth-card:last-child').style.order = '1';
      }, 0);
    };

    window.switchToLogin = function(e) {
      e.preventDefault();
      document.querySelector('.auth-inner').style.animation = 'none';
      setTimeout(() => {
        document.querySelector('.auth-card:first-child').style.order = '1';
        document.querySelector('.auth-card:last-child').style.order = '2';
      }, 0);
    };

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

        let javaPromise = new Promise((resolve) => {
            window.javaLogin(resolve);
        });
        let pythonPromise = new Promise((resolve) => {
            window.pythonLogin(resolve);
        });

        Promise.allSettled([javaPromise, pythonPromise]).then(() => {
            window.location.href = '{{site.baseurl}}/';
        });
    };

    window.pythonLogin = function (done) {
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
        login(options);
    }

    window.javaLogin = function (done) {
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

        console.log("Attempting login...");
        fetch(loginURL, loginOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Invalid credentials");
                }
                return response.text();
            })
            .then(data => {
                console.log("Login successful!");
                if (done) done();
            })
            .catch(error => {
                console.error("Login error:", error.message);
                // Show error message
                const messageDiv = document.getElementById('message');
                messageDiv.textContent = 'Invalid username or password';
                messageDiv.classList.add('show');
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
                    statusDiv.textContent = '✓ Account created successfully! Redirecting...';
                    statusDiv.classList.remove('error');
                    statusDiv.classList.add('success');

                    setTimeout(() => {
                        window.location.href = '{{site.baseurl}}/';
                    }, 2000);
                } else {
                    statusDiv.textContent = '✗ Failed to create account. Please try again.';
                    statusDiv.classList.add('error');
                    statusDiv.classList.remove('success');
                }
            });
    }

    // Initialize password validation
    window.addEventListener('load', function() {
        const passwordField = document.getElementById('signupPassword');
        const confirmPasswordField = document.getElementById('confirmPassword');

        if (passwordField && confirmPasswordField) {
            passwordField.addEventListener('input', validatePasswordsDebounced);
            confirmPasswordField.addEventListener('input', validatePasswordsDebounced);
        }
    });
</script>

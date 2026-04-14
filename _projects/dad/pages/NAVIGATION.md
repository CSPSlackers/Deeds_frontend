# DAD Pages Navigation Links Guide

## Quick Reference: All Page Links

### Direct Links
- **Home**: `/dad`
- **Login**: `/login`
- **Chat (User)**: `/chat`
- **Chat (Admin)**: `/chat-admin`
- **Public Submit**: `/public-submit`

### Navigation implemented in pages:

#### index.html (Home Page)
```html
<!-- Top Navigation -->
<a href="/login">Login</a>                    <!-- Default, becomes user dropdown when logged in -->
<a href="/chat">Chat with Admin</a>           <!-- In dropdown menu -->
<a href="/dad">D.A.D.</a>                     <!-- Logo/Home link -->

<!-- Carousel & other links -->
<!-- Dynamically generated based on data from backend -->
```

#### login.html (Login/Signup Page)
```html
<!-- Form Actions -->
<form action="/api/authenticate" method="POST">   <!-- Python backend -->
<form action="/api/person/create" method="POST">  <!-- Java backend -->

<!-- Success Redirect -->
window.location.href = '/dad'  <!-- After successful login -->

<!-- Form Switches -->
<a onclick="switchToSignup(event)">Create one</a>    <!-- Signup form -->
<a onclick="switchToLogin(event)">Sign in instead</a> <!-- Login form -->
```

---

## Implementation: How to Use These Links

### 1. Home Page Links

**Navigation Bar:**
```javascript
// In index.html - navigation setup
const navbar = document.querySelector('nav');

// Login/User link (top right)
const userBtn = document.getElementById('user-btn');
userBtn.href = '/login';  // Before login
// or
userBtn.href = '/profile'; // After login (internal API call)

// Chat link
const chatLink = document.getElementById('dropdown-chat-link');
chatLink.href = '/chat';

// Home logo
const logo = document.querySelector('.logo a');
logo.href = '/dad';
```

### 2. Login Page Redirects

**After Successful Login:**
```javascript
// In login.js - after authentication succeeds
window.location.href = '/dad';
```

**After Successful Signup:**
```javascript
// In login.js - after account creation
switchToLogin({preventDefault: () => {}});
// User then logs in and redirects to /dad
```

---

## Required Links Implementation Checklist

### ✅ Home Page (index.html)
- [x] Logo links to `/dad`
- [x] Login link to `/login`
- [x] Chat link to `/chat`
- [x] Navigation updated based on login state

### ✅ Login Page (login.html)
- [x] Login form redirects to `/dad` on success
- [x] Signup form switches to login form
- [x] Form submission to backend APIs

### ⚠️ Other Pages (chat_admin.html, chat_user.html, public-submit.html)
- [ ] Navigation header (if applicable)
- [ ] Back to home links
- [ ] User profile links (if applicable)

---

## API Endpoints Reference (Backend URLs)

### Authentication
- `POST /api/authenticate` - Login user
  - Backends: Python, Java
  - Redirect: On success → `/dad`

- `POST /api/logout` - Logout user
  - Backends: Python, Java

### User Management
- `POST /api/user` - Create user (Python backend)
- `POST /api/person/create` - Create user (Java backend)
- `GET /api/id` - Get current user info

### Navigation Data
- `GET /api/user/class` - Get user's enrolled courses

---

## Browser Navigation Flow

```
User visits: https://site.com/
    ↓
Redirects to: /dad (home page)
    ↓
┌─────────────────────┐
│  Check session      │ → GET /api/id
│  (login status)     │
└─────────────────────┘
    ↓
    ├─ If logged in:
    │   ├─ Show user dropdown
    │   ├─ Show chat link
    │   ├─ Load carousel data
    │   └─ Show user name
    │
    └─ If NOT logged in:
        ├─ Show login link
        ├─ Hide user features
        └─ Allow public view of carousel
            ↓
            User clicks login link
            ↓
            → /login (login page)
            ↓
            ┌──────────────────────┐
            │ Authenticate         │ → POST /api/authenticate
            └──────────────────────┘
            ↓
            → /dad (redirected back)
```

---

## Link Testing Checklist

```
[ ] Home (/dad) loads successfully
[ ] Login link in home navbar → /login page loads
[ ] Chat link in home navbar → /chat page loads
[ ] Home logo → stays on /dad or reloads /dad
[ ] Login form submit → /dad on success
[ ] Signup form submit → /dad on success after switching to login
[ ] Logout button → /login page
[ ] Session check on home page load → correct user state shown
[ ] Chat pages have proper styling
[ ] Public submit page accessible
```

---

## Frontend Code Updates Needed

### 1. Update login.js to use DAD API module
```javascript
// Change from:
window.pythonLogin = function () { ... }

// To:
import { dadAuthenticate } from '../projects/dad/api/dad-api.js';

window.pythonLogin = async function () {
    const success = await dadAuthenticate(uid, password);
    // ... handle success/failure
}
```

### 2. Update index.html to use DAD API for session verification
```javascript
// Change from inline fetch to:
import { dadVerifySession, dadGetCurrentUser } from './_projects/dad/api/dad-api.js';

const hasValidSession = await dadVerifySession();
const userInfo = await dadGetCurrentUser();
```

### 3. Ensure all pages have back-to-home links
```html
<!-- Add to all DAD pages -->
<a href="/dad" class="home-link">← Back to Home</a>
```

---

## Notes

- All URLs are relative paths (e.g., `/dad`, `/login`)
- Backend APIs are configured in `assets/js/api/config.js`
- The home page URL is `/dad` (not `/` or `/index`)
- Login redirects to `/dad` on success
- Chat links use `/chat` and `/chat-admin` endpoints
- Public submissions use `/public-submit` endpoint

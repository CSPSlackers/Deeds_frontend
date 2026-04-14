# DAD Pages Documentation

## Overview
This directory documents the DAD (Digital Art & Design) website page structure and their relationships. The actual page files are located in the root directory but are referenced here for clarity and organization.

## Page Structure

### 1. Home Page (`/dad`)
**File:** `index.html` (root level)  
**Permalink:** `/dad`  
**Description:** Main landing page for DAD showing project carousel and navigation

**Features:**
- Carousel of community deeds/projects
- Top navigation bar with links to Chat and other sections
- Quick links section
- Responsive design with gold and navy theme

**Scripts/Dependencies:**
- Inline JavaScript modules for carousel functionality
- Navigation and link initialization
- API calls to fetch carousel data

**Navigation Links:**
- `/chat` - Chat with Admin (in dropdown)
- `/login` - Login page (handled by header)
- `/public-submit` - Public Submission page
- Chat-related dropdowns

---

### 2. Login Page (`/login`)
**File:** `login.html` (root level)  
**Permalink:** `/login` (no explicit permalink, but conventionally at /login)  
**Description:** Authentication page with login and signup forms

**Features:**
- Login form (username/password)
- Signup form with password validation
- Client-side form validation
- Real-time password matching verification
- Dual backend authentication (Python + Java)

**Forms:**
1. **Login Form**
   - Fields: Username (uid), Password
   - Submits to: `/api/authenticate`
   - Redirect on success: `/dad`
   - JavaScript: `handleLogin()` → `loginBoth()` → `pythonLogin()`

2. **Sign Up Form**
   - Fields: Full Name, Username, Email, Password, Confirm Password
   - Features: Password strength validation, real-time matching check
   - Submits to: Both `/api/user` (Python) and `/api/person/create` (Java)
   - JavaScript: `handleSignupSubmit()` → `signup()`

**Scripts/Dependencies:**
- `./assets/js/login.js` (main login script)
- Imports from `./assets/js/api/config.js`
- Imports from `./assets/js/api/login.js` (should use DAD API module)
- Form validation functions
- Backend authentication handlers

**Backend APIs Called:**
- `POST /api/authenticate` - User login
- `POST /api/user` - Create user (Python)
- `POST /api/person/create` - Create person (Java)
- `GET /api/id` - Get current user (verification)

---

### 3. Chat Admin Page (`/chat-admin`)
**File:** `chat_admin.html` (root level)  
**Permalink:** `/chat-admin`  
**Description:** Administration chat interface

**Features:**
- Chat interface for administrators
- Layout: none (custom HTML only)
- Search excluded from site search

---

### 4. User Chat Page (`/chat`)
**File:** `chat_user.html` (root level)  
**Permalink:** `/chat`  
**Description:** User chat interface (linked from home page)

**Features:**
- Chat interface for regular users
- Layout: none (custom HTML only)
- Search excluded from site search
- Referenced in home page dropdown

---

### 5. Public Submission Page (`/public-submit`)
**File:** `public-submit.html` (root level)  
**Permalink:** `/public-submit`  
**Title:** "Submit a Deed"  
**Description:** Public-facing form for deed submissions

**Features:**
- Form for users to submit deeds
- Title: "Submit a Deed"
- Searchable (not excluded)
- Layout: default

---

## Page Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    HOME PAGE (/dad)                         │
│                  (index.html)                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Navigation Bar                                        │ │
│  │  ├─ Chat with Admin  ──────────────────→ /chat-admin   │ │
│  │  ├─ [Dropdown Menu]                                   │ │
│  │  └─ [Logo/Home]     ──────────────────→ /dad          │ │
│  │  Quick Links                                           │ │
│  │  ├─ Carousel of Deeds                                 │ │
│  │  └─ [Submit link?]  ──────────────────→ /public-submit│ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ User clicks info icon or not logged in
                           ▼
        ┌──────────────────────────────────────┐
        │     LOGIN PAGE (/login)              │
        │  (login.html)                        │
        │  ┌────────────────────────────────┐  │
        │  │ Login Form    │   Signup Form   │  │
        │  │ uid           │   name          │  │
        │  │ password      │   uid           │  │
        │  │               │   email         │  │
        │  │ [Sign In]     │   password      │  │
        │  │               │   [Create]      │  │
        │  └────────────────────────────────┘  │
        │                                      │
        │  On Success → redirect to /dad       │
        └──────────────────────────────────────┘
```

## API Integration

### Authentication Flow
1. User navigates to `/login`
2. User enters credentials and clicks "Sign In"
3. Frontend calls `loginBoth()` which:
   - Calls `pythonLogin()` → `POST /api/authenticate` (Python backend)
   - Calls `javaLogin()` → `POST /api/authenticate` (Java backend)
4. On success: Redirect to `/dad`
5. On failure: Show error message

### Signup Flow
1. User on `/login` clicks "Create one"
2. Signup form appears
3. User fills form and clicks "Create Account"
4. Frontend calls `signup()` which:
   - Shows loading state
   - Sends to `POST /api/user` (Python backend)
   - Sends to `POST /api/person/create` (Java backend)
   - Needs at least one backend to succeed
5. On success: Show success message, switch to login form
6. User can then log in

### Session Verification
- Happens on initial page load
- Calls `GET /api/id` to verify session
- If valid: Show user dropdown in header
- If invalid: Show login link

## Backend Configuration

**File:** `assets/js/api/config.js`

```javascript
// Development
pythonURI = "http://localhost:8328"
javaURI = "http://localhost:8328"

// Production
pythonURI = "https://dad.opencodingsociety.com"
javaURI = "https://dad.opencodingsociety.com"
```

## Link Summary Table

| Page | URL | File | Purpose | Links To |
|------|-----|------|---------|----------|
| Home | `/dad` | `index.html` | Landing page, carousel | `/login`, `/chat-admin`, `/public-submit` |
| Login | `/login` | `login.html` | Auth form | `/dad` (on success) |
| Chat Admin | `/chat-admin` | `chat_admin.html` | Admin chat | - |
| Chat User | `/chat` | `chat_user.html` | User chat | Linked from home dropdown |
| Public Submit | `/public-submit` | `public-submit.html` | Deed submission | - |

## Implementation Notes

### Script Usage
- **Home Page**: Uses inline module scripts for carousel and navigation
- **Login Page**: Uses `./assets/js/login.js` as module script
- **Other Pages**: Custom implementations

### DAD API Module Integration
The new DAD API module (`_projects/dad/api/dad-api.js`) should be imported in:
1. `login.js` - For authentication functions
2. `index.html` - For session verification and navigation updates

### Navigation State
- Logged in: Show user dropdown with profile/logout
- Logged out: Show "Login" link
- Navigation updates based on courses/roles

## Future Enhancements

1. **Centralized Navigation Component**
   - Extract navigation from index.html into reusable component
   - Use for all DAD pages

2. **Page Organization**
   - Consider moving page files to `pages/` subdirectory
   - Create page templates for common patterns

3. **State Management**
   - Consider centralized auth state
   - Share session state across pages

4. **Analytics**
   - Track user navigation flow
   - Monitor login/signup conversion

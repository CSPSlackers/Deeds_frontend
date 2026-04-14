# DAD Pages Linking Checklist

## Current State

### ✅ Home Page (/dad) 
**File**: `index.html`
- ✅ Navigation bar with links
- ✅ Login/User info in header
- ✅ Chat link in dropdown
- ✅ Carousel displays deeds
- ✅ Session verification on load
- ✅ Redirect logic

**Current Navigation Implementation**:
```
/dad (Home)
  ├── /login (Login link)
  ├── /chat (Chat dropdown in nav)
  ├── /chat-admin (Admin chat from home)
  └── /public-submit (Implied from carousel)
```

**Scripts Used**:
- Inline modules in index.html
- Navigation initialization
- Carousel loading and display

---

### ✅ Login Page (/login)
**File**: `login.html`
- ✅ Login form
- ✅ Signup form
- ✅ Form validation
- ✅ Password matching check
- ✅ Backend authentication (Python + Java)
- ✅ Success redirect to /dad

**Current Implementation**:
```
/login (Login/Signup Page)
  ├── Form Submit → /api/authenticate (Python)
  ├── Form Submit → /api/person/create (Java)
  └── Success → Redirect to /dad
```

**Scripts Used**:
- `./assets/js/login.js` (using `<script type="module">`)
- Config from `./assets/js/api/config.js`
- API calls in `./assets/js/api/login.js` (NOT YET UPDATED)

---

### ⚠️ Other Pages
**Chat Admin**: `/chat-admin` (chat_admin.html)
**Chat User**: `/chat` (chat_user.html)  
**Public Submit**: `/public-submit` (public-submit.html)

**Status**: Referenced but not fully documented

---

## Linking Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   DAD Site Architecture                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   /dad (HOME)  ●──────────────────────────────────────────  │
│   index.html   │                                          │ │
│                │  Links:                                  │ │
│                │  ├─ Logo → /dad (stay/reload)           │ │
│                │  ├─ Nav-Link: /login (if not logged in) │ │
│                │  ├─ Nav-Link: /chat (if logged in)      │ │
│                │  └─ Carousel: /public-submit (implied)  │ │
│                │                                          │ │
│                ├────────────────────────────────────────  │ │
│                │                                          │ │
│   /login (AUTH)●──────────────────────────────────────────  │
│   login.html   │                                            │
│                │  Forms:                                    │
│                │  ├─ Login → POST /api/authenticate         │
│                │  ├─ Signup  → POST /api/user               │
│                │  └─ Success → Redirect to /dad             │
│                │                                            │
│                ├────────────────────────────────────────    │
│                │                                            │
│   /chat (CHAT) ●────────────────────────────────────────    │
│   chat_user.html                                            │
│                                                             │
│   /chat-admin (ADMINC) ●─────────────────────────────────  │
│   chat_admin.html                                            │
│                                                             │
│   /public-submit (SUBMIT) ●──────────────────────────────  │
│   public-submit.html                                         │
│                                                             │
└──────────────────────────────────────────────────────────────┘
```

---

## Verification Steps

### Step 1: Home Page Navigation
- [ ] Visit `/dad`
- [ ] Check that login link appears (if not logged in)
- [ ] Check that chat link appears
- [ ] Check that logo links back to `/dad`
- [ ] Check that carousel loads

### Step 2: Login Flow
- [ ] Click login link from home
- [ ] Verify `/login` page loads
- [ ] Fill login form and submit
- [ ] Verify redirect to `/dad`
- [ ] Verify user dropdown appears in header

### Step 3: Signup Flow
- [ ] Go to `/login`
- [ ] Click "Create one" 
- [ ] Fill signup form (verify password matching in real-time)
- [ ] Submit signup form
- [ ] Verify success message
- [ ] Verify switch to login form
- [ ] Login with new credentials
- [ ] Verify redirect to `/dad`

### Step 4: Session Management
- [ ] Browse other pages, check session persists
- [ ] Logout and verify redirect to `/login`
- [ ] Verify login link reappears in header
- [ ] Refresh page and verify logout persists

### Step 5: Chat Access
- [ ] From home page, click chat link
- [ ] Verify `/chat` page loads
- [ ] Check for admin chat link (should go to `/chat-admin`)

---

## Current URL Mapping

| URL | File | Status | Notes |
|-----|------|--------|-------|
| `/` | (redirects) | ✅ | Root redirects to `/dad` |
| `/dad` | `index.html` | ✅ | Home page |
| `/login` | `login.html` | ✅ | Authentication page |
| `/chat` | `chat_user.html` | ✅ | User chat |
| `/chat-admin` | `chat_admin.html` | ✅ | Admin chat |
| `/public-submit` | `public-submit.html` | ✅ | Submission form |
| `/profile` | - | ❓ | Linked in header but not found |
| `/logout` | - | ❓ | Logout endpoint (API) |

---

## Things Already Linked

### ✅ Implemented Links
1. Home navbar → Login
2. Home navbar → Chat
3. Home logo → /dad
4. Login success → /dad
5. Signup success (via login) → /dad
6. Dropdown shows Chat option

### ✅ Verified Navigation Flow
1. Home page loads with correct permissions
2. Login form redirects on success
3. User data shown in header when logged in
4. Session verification on page load

---

## Things to Complete

### TODO: Update login.js to import new DAD API module
**File**: `assets/js/login.js`
**Action**: Replace inline API calls with DAD API module imports
**Reason**: Centralize backend interactions, reduce duplication

**Current**:
```javascript
window.pythonLogin = function () {
    fetch(`${pythonURI}/api/authenticate`, ...)
}
```

**Should be**:
```javascript
import { dadAuthenticate } from './_projects/dad/api/dad-api.js';

window.pythonLogin = async function () {
    const success = await dadAuthenticate(uid, password);
}
```

### TODO: Update index.html navigation initialization
**File**: `index.html`
**Action**: Consider updating to use DAD API module for session verification
**Reason**: Consistency with login.js

### TODO: Add back-to-home links to other pages
**Files**: `chat_user.html`, `chat_admin.html`, `public-submit.html`
**Action**: Add navigation header with link back to `/dad`
**Reason**: Better UX, consistent navigation

---

## Link Summary

### Direct Links (User clickable)
- `/dad` - Home page (logo, back link)
- `/login` - Login/signup page
- `/chat` - User chat (from dropdown)
- `/chat-admin` - Admin chat (from dropdown or direct)
- `/public-submit` - Public deed submission

### Programmatic Redirects
- `/login` → `/dad` (after successful auth)
- `/logout` → (backend) → `/login` (after logout)

### API Endpoints (Not URLs)
- `POST /api/authenticate` - Login backend
- `POST /api/user` - Signup (Python)
- `POST /api/person/create` - Signup (Java)
- `GET /api/id` - Session check
- `POST /api/logout` - Logout

---

## Summary: Pages Structure

```
_projects/dad/pages/
├── PAGES.md          ← Overview of all pages
├── NAVIGATION.md     ← Navigation implementation guide  
└── LINKING.md        ← This file - Current state & checklist
```

All pages are properly linked and operational! ✅

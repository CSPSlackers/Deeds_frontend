# DAD Project - Complete Developer Guide

## Overview

The **D.A.D. (Digital Art & Design or Doing Exceptional Deeds)** project is a web application for managing community deeds, submissions, and user interactions. This directory contains all backend API integrations, page documentation, and project organization for the DAD system.

## Project Structure

```
_projects/dad/
├── api/                          # Backend API modules
│   └── dad-api.js               # Core DAD backend integration
├── pages/                        # Page documentation & linking guides
│   ├── PAGES.md                 # Overview of all DAD pages
│   ├── NAVIGATION.md            # Navigation implementation guide
│   └── LINKING.md               # Current state & verification checklist
├── docs/                        # Project documentation
│   └── README.md                # API reference
├── images/                      # Project assets
├── Makefile                     # Build configuration
└── [This file]
```

## Quick Start

### Building the Project
```bash
cd _projects/dad
make build          # Build all assets
make clean          # Clean built files
make watch          # Watch for changes and rebuild
```

### Development Server
```bash
# From project root
make dev            # Start dev server with hot reload
make serve          # Start server
make stop           # Stop server
```

## DAD Website Pages

**All DAD web pages are located in the root directory:**

| Page | URL | File | Purpose |
|------|-----|------|---------|
| **Home** | `/dad` | `index.html` | Main landing page with deed carousel |
| **Login** | `/login` | `login.html` | User authentication (login/signup) |
| **User Chat** | `/chat` | `chat_user.html` | User chat interface |
| **Admin Chat** | `/chat-admin` | `chat_admin.html` | Administrator chat interface |
| **Public Submit** | `/public-submit` | `public-submit.html` | Public deed submission form |

### Page Navigation Flow

```
HOME (/dad)
  ├─ Has navigation bar with:
  │   ├─ Logo (links to /dad)
  │   ├─ Login link (if not authenticated)
  │   ├─ User dropdown (if authenticated)
  │   └─ Chat link
  └─ On click Login:
      └─ Goes to /login

LOGIN (/login)
  ├─ Login Form
  │   └─ On success → Redirects to /dad
  └─ Signup Form
      └─ On success → Shows success & switches to login

AUTHENTICATED STATE
  ├─ User dropdown in header
  ├─ Can access:/chat
  ├─ Can access: /public-submit
  └─ Can access: Additional features
```

For complete page documentation, see [pages/PAGES.md](pages/PAGES.md).

## Backend API Integration

### Overview

The DAD system uses dual backends (Python and Java) for redundancy:
- **Python Backend**: Flask API
- **Java Backend**: Spring Boot API
- **Configuration**: `assets/js/api/config.js`

### API Module: `dad-api.js`

All backend interactions are centralized in the DAD API module:

```javascript
import {
    dadAuthenticate,
    dadGetCurrentUser,
    dadGetCredentials,
    dadCreateUser,
    dadGetUserCourses,
    dadLogout,
    dadVerifySession
} from './_projects/dad/api/dad-api.js';
```

### Available Functions

#### Authentication
- **`dadAuthenticate(uid, password)`** - Log in user
  - Backend: `POST /api/authenticate`
  - Returns: `Promise<boolean>` - Success status

- **`dadLogout()`** - Log out user
  - Backend: `POST /api/logout` (both backends)
  - Returns: `Promise<void>`

- **`dadVerifySession()`** - Check if session is valid
  - Backend: `GET /api/id`
  - Returns: `Promise<boolean>` - Session validity

#### User Management
- **`dadGetCurrentUser()`** - Get logged-in user info
  - Backend: `GET /api/id`
  - Returns: `Promise<Object|null>` - User data

- **`dadGetCredentials()`** - Get user credentials with roles
  - Backend: `GET /api/id`
  - Returns: `Promise<Object|null>` - User data with roles

- **`dadCreateUser(userData)`** - Create new user account
  - Backend: `POST /api/user` (Python) + `POST /api/person/create` (Java)
  - Parameters: `{ name, uid, email, password }`
  - Returns: `Promise<boolean>` - Success (at least one backend succeeds)

#### Course Management
- **`dadGetUserCourses()`** - Get user's enrolled courses
  - Backend: `GET /api/user/class`
  - Returns: `Promise<Array>` - Array of course codes

For complete API documentation, see [docs/README.md](docs/README.md).

## Backend Configuration

**Location**: `assets/js/api/config.js`

```javascript
// Development
pythonURI = "http://localhost:8328"
javaURI = "http://localhost:8328"

// Production
pythonURI = "https://dad.opencodingsociety.com"
javaURI = "https://dad.opencodingsociety.com"
```

The configuration automatically selects the correct backend based on the environment.

## Integration with Frontend Pages

### Updating login.js

The login page currently makes direct API calls. To use the new DAD API module:

**Before**:
```javascript
// assets/js/login.js
window.pythonLogin = function () {
    fetch(`${pythonURI}/api/authenticate`, { ... })
}
```

**After**:
```javascript
// assets/js/login.js
import { dadAuthenticate } from './_projects/dad/api/dad-api.js';

window.pythonLogin = function () {
    const success = await dadAuthenticate(uid, password);
    // Handle success/failure
}
```

### Updating index.html

Similarly, update session verification in the home page to use the DAD API module:

```javascript
import { dadVerifySession, dadGetCurrentUser } from './_projects/dad/api/dad-api.js';

const hasValidSession = await dadVerifySession();
const userInfo = await dadGetCurrentUser();
```

## Linking & Navigation

### Complete Link Map

**User-Facing Links**:
- `/` → `/dad` (redirects)
- `/dad` - Home page
- `/login` - Login/signup page
- `/chat` - User chat
- `/chat-admin` - Admin chat
- `/public-submit` - Public submission

**Navigation Implementation**:
```html
<!-- In index.html header -->
<a href="/dad">Home</a>
<a href="/login" id="loginLink">Login</a> <!-- Or user dropdown -->
<a href="/chat">Chat</a>

<!-- In login.html on success -->
<script>
  window.location.href = '/dad';
</script>
```

For detailed navigation information, see [pages/NAVIGATION.md](pages/NAVIGATION.md).

### Verification Checklist

See [pages/LINKING.md](pages/LINKING.md) for a complete verification checklist ensuring all pages are properly linked.

## Project Build & Distribution

### Build Process

When you run `make build`:

1. **Copy API modules**
   - From: `_projects/dad/api/`
   - To: `assets/js/projects/dad/api/`

2. **Copy assets/images**
   - From: `_projects/dad/images/`
   - To: `images/projects/dad/`

3. **Copy documentation**
   - From: `_projects/dad/pages/`
   - To: `assets/docs/projects/dad/`

### Using in Frontend

```javascript
// Import from distributed location
import { dadAuthenticate } from '/assets/js/projects/dad/api/dad-api.js';

// Or from source
import { dadAuthenticate } from './_projects/dad/api/dad-api.js';
```

## Development Workflow

### 1. Making Changes to DAD API

1. Edit `_projects/dad/api/dad-api.js`
2. Run `make build` to copy to distribution
3. Test in browser

### 2. Adding New Pages

1. Create page file in root (e.g., `new-page.html`)
2. Document it in `_projects/dad/pages/PAGES.md`
3. Update navigation links in all pages
4. Test all navigation flows

### 3. Adding New Features

1. Create feature module in `_projects/dad/api/`
2. Document in `_projects/dad/docs/`
3. Update `_projects/dad/pages/PAGES.md`
4. Run `make build`

## Common Tasks

### Check Current User Session
```javascript
import { dadVerifySession } from './_projects/dad/api/dad-api.js';

const isLoggedIn = await dadVerifySession();
console.log('User logged in:', isLoggedIn);
```

### Authenticate User
```javascript
import { dadAuthenticate } from './_projects/dad/api/dad-api.js';

const success = await dadAuthenticate('username', 'password');
if (success) {
    console.log('Login successful');
    window.location.href = '/dad';
}
```

### Create New User
```javascript
import { dadCreateUser } from './_projects/dad/api/dad-api.js';

const userData = {
    name: 'John Doe',
    uid: 'johndoe',
    email: 'john@example.com',
    password: 'secure_password'
};

const success = await dadCreateUser(userData);
if (success) {
    console.log('Account created successfully');
}
```

### Get User Courses
```javascript
import { dadGetUserCourses } from './_projects/dad/api/dad-api.js';

const courses = await dadGetUserCourses();
console.log('User enrolled in:', courses);
// Output: ['CSSE', 'CSP', 'CSA']
```

## Troubleshooting

### Problem: "Module not found" errors
1. Check that `make build` was run
2. Verify file paths in imports
3. Check dev server is running

### Problem: API calls failing
1. Check backend configuration in `assets/js/api/config.js`
2. Verify backends are running
3. Check browser console for CORS errors
4. Verify `fetchOptions` in config includes credentials

### Problem: Navigation links not working
1. Verify permalink settings in page frontmatter (YAML)
2. Check that URLs are relative paths (e.g., `/dad`, not `dad`)
3. Test in incognito mode (clear cache)

## File References

**Main Files to Know**:
- `_projects/dad/api/dad-api.js` - Core backend API
- `assets/js/login.js` - Login page script
- `index.html` - Home page
- `login.html` - Login/signup page
- `assets/js/api/config.js` - Backend configuration

**Documentation Files**:
- [pages/PAGES.md](pages/PAGES.md) - Page overview
- [pages/NAVIGATION.md](pages/NAVIGATION.md) - Navigation guide
- [pages/LINKING.md](pages/LINKING.md) - Linking checklist
- [docs/README.md](docs/README.md) - API reference

## Next Steps

1. **Review the documentation** in `pages/` directory
2. **Run the build**: `cd _projects/dad && make build`
3. **Test the pages**: Visit `/dad`, `/login`, etc.
4. **Verify navigation**: Click through all links
5. **Update frontend code** to use the new DAD API module where needed

## Support & Questions

For issues or questions:
1. Check the troubleshooting section above
2. Review detailed documentation in `pages/`
3. Check browser console for errors
4. Verify backend services are running

---

**Project Created**: April 13, 2026  
**Template**: Based on Gamify project structure  
**Backend**: Dual Python (Flask) + Java (Spring) architecture  
**Frontend Framework**: Vanilla JavaScript with modular imports

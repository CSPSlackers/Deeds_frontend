# DAD Project

This directory contains the DAD (Digital Art & Design) project structure and backend API integrations.

## Structure

- `api/` - Backend API interaction modules
  - `dad-api.js` - Core API functions for DAD backend communication
- `docs/` - Documentation
- `images/` - Project assets and images
- `levels/` - Game/activity levels (if applicable)

## Backend Services

DAD uses the following backend services:
- **Python Backend**: `https://dad.opencodingsociety.com` (or `http://localhost:8328` in development)
- **Java Backend**: `https://dad.opencodingsociety.com` (or `http://localhost:8328` in development)

### Available API Endpoints

#### Authentication
- `POST /api/authenticate` - Authenticate user
- `POST /api/logout` - Logout user

#### User Management
- `GET /api/id` - Get current user info and credentials
- `POST /api/user` - Create new user (Python backend)
- `POST /api/person/create` - Create new user (Java backend)

#### Course Management
- `GET /api/user/class` - Get user's enrolled courses

## Usage

The DAD API module can be imported and used in frontend scripts:

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

## API Functions

### dadAuthenticate(uid, password)
Authenticates a user with the DAD backend.

**Parameters:**
- `uid` (string) - User ID/username
- `password` (string) - User password

**Returns:** Promise<boolean>

### dadGetCurrentUser()
Fetches information about the currently logged-in user.

**Returns:** Promise<Object|null>

### dadGetCredentials()
Gets user credentials and role information.

**Returns:** Promise<Object|null>

### dadCreateUser(userData)
Creates a new user account in both Python and Java backends.

**Parameters:**
- `userData` (Object) - User data
  - `name` (string) - Full name
  - `uid` (string) - User ID/username
  - `email` (string) - Email address
  - `password` (string) - Password

**Returns:** Promise<boolean>

### dadGetUserCourses()
Retrieves the list of courses the user is enrolled in.

**Returns:** Promise<Array>

### dadLogout()
Logs out the user from both backends.

**Returns:** Promise<void>

### dadVerifySession()
Verifies if the user has a valid session.

**Returns:** Promise<boolean>

## Backend Configuration

Backend URIs are configured in `assets/js/api/config.js`:

- **Development**: Uses `http://localhost:8328` for both backends
- **Production**: Uses `https://dad.opencodingsociety.com` for both backends

The configuration automatically selects the appropriate URI based on the deployment environment.

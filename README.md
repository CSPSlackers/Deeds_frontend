# D.A.D Extension Frontend

Created and maintained by **CSPSlackers** (2026)

## Overview

This is the frontend repository for the **D.A.D Extension** — a web application extension of a nonprofit site designed to support community engagement through deed submissions, tracking, and user interactions. Built with modern web technologies, this project provides an intuitive interface for managing community deeds and fostering meaningful participation.

## About the Project

The **D.A.D Extension Frontend** is a responsive, feature-rich web application that serves as the user-facing interface for the D.A.D extension of our nonprofit platform. It enables users to:

- **Submit Deeds**: Easily share community contributions and good deeds
- **View & Track**: Browse and track deed submissions and progress
- **User Authentication**: Secure login and account management
- **Real-time Chat**: Communicate with other community members and administrators
- **Responsive Design**: Seamless experience across all devices

This frontend integrates with dual backends (Python/Flask and Java/Spring) for redundancy and scalability, ensuring reliable service for all users.

---

## Key Features

- **User Authentication System**: Secure login/signup with session management
- **Deed Management**: Submit, view, and manage community deeds with rich metadata
- **Chat System**: Real-time messaging for users and administrators
- **Responsive Frontend**: Mobile-first design using vanilla JavaScript and modern CSS
- **API Integration**: Seamless communication with dual backend systems
- **Search & Navigation**: Intuitive navigation and powerful search capabilities
- **Modular Architecture**: Clean separation of concerns with modular components

---

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Python (Flask) + Java (Spring Boot)
- **Real-time Communication**: Socket.io for chat functionality
- **Deployment**: GitHub Pages with Jekyll
- **Version Control**: Git & GitHub

---

## Project Structure

```
Deeds_frontend/
├── index.html                # Home page
├── login.html                # Authentication page
├── chat_user.html            # User chat interface
├── chat_admin.html           # Admin chat interface
├── public-submit.html        # Deed submission form
├── _projects/
│   └── dad/                  # D.A.D project files
│       ├── api/              # API integration modules
│       ├── pages/            # Documentation
│       └── docs/             # API reference
├── assets/
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript modules
│   └── images/               # Assets
├── node_backend/             # Node backend configuration
└── LICENSE                   # Apache License 2.0
```

---

## Getting Started

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CSPSlackers/Deeds_frontend.git
   cd Deeds_frontend
   ```

2. **Install dependencies**:
   ```bash
   bundle install          # For Jekyll
   npm install            # For Node.js dependencies
   ```

3. **Set up environment**:
   - Update `_config.yml` with your repository settings
   - Configure backend URLs in `assets/js/api/config.js`

4. **Start the development server**:
   ```bash
   make                   # Start local server with hot reload
   ```

5. **View in browser**:
   - Open `http://localhost:4500/Deeds_frontend`

### Development Server Commands

- `make` — Start development server with auto-reload
- `make stop` — Stop the server
- `make clean` — Clean built files
- `make convert` — Test Jupyter notebook conversions

---

## Backend Configuration

The frontend connects to dual backends for redundancy:

**Configuration file**: `assets/js/api/config.js`

```javascript
// Development
pythonURI = "http://localhost:8328"
javaURI = "http://localhost:8328"

// Production
pythonURI = "https://dad.opencodingsociety.com"
javaURI = "https://dad.opencodingsociety.com"
```

---

## API Integration

All backend interactions are centralized through the DAD API module:

**Location**: `_projects/dad/api/dad-api.js`

### Key Functions

**Authentication**:
- `dadAuthenticate(uid, password)` — User login
- `dadLogout()` — User logout
- `dadVerifySession()` — Check if user is logged in

**User Management**:
- `dadGetCurrentUser()` — Get logged-in user info
- `dadGetCredentials()` — Get user credentials with roles
- `dadCreateUser(userData)` — Create new account

**Course Management**:
- `dadGetUserCourses()` — Get user's enrolled courses

For complete API documentation, see [_projects/dad/docs/README.md](_projects/dad/docs/README.md).

---

## Navigation & Pages

| Page | URL | File | Purpose |
|------|-----|------|---------|
| **Home** | `/dad` | `index.html` | Main landing page |
| **Login** | `/login` | `login.html` | User authentication |
| **User Chat** | `/chat` | `chat_user.html` | User messaging |
| **Admin Chat** | `/chat-admin` | `chat_admin.html` | Admin messaging |
| **Submit Deed** | `/public-submit` | `public-submit.html` | Deed submission form |

For detailed navigation information, see [_projects/dad/pages/NAVIGATION.md](_projects/dad/pages/NAVIGATION.md).

---

## Development Guide

### Adding New Features

1. Create your component in the appropriate directory
2. Document the feature in `_projects/dad/pages/PAGES.md`
3. Update navigation links if needed
4. Run `make build` to distribute files
5. Test thoroughly before committing

### Modifying API Calls

1. Edit the relevant function in `_projects/dad/api/dad-api.js`
2. Update documentation in `_projects/dad/docs/README.md`
3. Test with both Python and Java backends
4. Commit changes with descriptive messages

### Creating New Pages

1. Create page file in root directory
2. Use existing pages as templates
3. Import necessary API functions from DAD API module
4. Document in `_projects/dad/pages/PAGES.md`
5. Update `_config.yml` if adding to navigation

---

## Deployment

### GitHub Pages

The project is deployed automatically through GitHub Pages Actions:

1. **Settings** → **Pages** → Select "GitHub Actions" as build source
2. **Update `_config.yml`**:
   ```yml
   github_repo: "Deeds_frontend"
   baseurl: "/Deeds_frontend"
   ```
3. **Update Makefile**:
   ```make
   REPO_NAME ?= Deeds_frontend
   ```

### Production Deployment

Update backend URIs in `assets/js/api/config.js` to production endpoints:

```javascript
pythonURI = "https://dad.opencodingsociety.com"
javaURI = "https://dad.opencodingsociety.com"
```

---

## Troubleshooting

### Development Server Issues

- **Port already in use**: Change `PORT` in Makefile (e.g., `make PORT=4600`)
- **Bundle errors**: Run `bundle install` and `bundle update`
- **File not found**: Verify permalink settings in page frontmatter

### API Connection Issues

- Verify backend URLs in `assets/js/api/config.js`
- Check that backend services are running
- Look for CORS errors in browser console
- Ensure credentials are included in fetch requests

### Build/Deployment Issues

- Run `make clean` then `make` to rebuild
- Check Jekyll log files in `/tmp/`
- Verify `_config.yml` has correct repository settings
- Test locally before pushing to GitHub

For more troubleshooting, see [_projects/dad/README.md](_projects/dad/README.md#troubleshooting).

---

## License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

```
Copyright 2026 CSPSlackers
Licensed under the Apache License, Version 2.0
```

---

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and commit (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows our style guidelines and includes appropriate documentation.

---

## Documentation

- [D.A.D Project Guide](_projects/dad/README.md) — Complete developer guide
- [Pages Documentation](_projects/dad/pages/PAGES.md) — All pages overview
- [Navigation Guide](_projects/dad/pages/NAVIGATION.md) — Navigation implementation
- [API Reference](_projects/dad/docs/README.md) — Backend API documentation
- [Linking Checklist](_projects/dad/pages/LINKING.md) — Verification checklist

---

## Support & Contact

For issues, questions, or suggestions:

1. Check the [troubleshooting section](#troubleshooting) above
2. Review relevant documentation in `_projects/dad/`
3. Check browser console for error messages
4. Open an issue on GitHub with details

---

**Project Created**: 2026  
**Organization**: CSPSlackers  
**Homepage**: [deeds.opencodingsociety.com](http://deeds.opencodingsociety.com/)  
**Repository**: [CSPSlackers/Deeds_frontend](https://github.com/CSPSlackers/Deeds_frontend)

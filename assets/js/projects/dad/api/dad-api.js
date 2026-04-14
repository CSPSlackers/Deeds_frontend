/**
 * DAD (Digital Art & Design) Backend API Module
 * Handles all interactions with DAD backend services
 * Backend URIs: https://dad.opencodingsociety.com (Python and Java)
 */

import { pythonURI, javaURI, fetchOptions } from './config.js';

/**
 * Authenticate user with DAD backend
 * @param {string} uid - User ID/username
 * @param {string} password - User password
 * @returns {Promise<boolean>} - True if authentication successful
 */
export async function dadAuthenticate(uid, password) {
    try {
        const response = await fetch(`${pythonURI}/api/authenticate`, {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify({ uid, password })
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }
        
        return true;
    } catch (error) {
        console.error('DAD authentication error:', error);
        return false;
    }
}

/**
 * Get current logged-in user information
 * @returns {Promise<Object|null>} - User data or null if not authenticated
 */
export async function dadGetCurrentUser() {
    try {
        const response = await fetch(`${pythonURI}/api/id`, {
            ...fetchOptions,
            method: 'GET'
        });

        if (!response.ok) {
            console.warn('Failed to fetch user info:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
}

/**
 * Get user roles and authentication status
 * @returns {Promise<Object|null>} - User credentials data or null
 */
export async function dadGetCredentials() {
    try {
        const response = await fetch(`${pythonURI}/api/id`, {
            ...fetchOptions,
            method: 'GET'
        });

        if (!response.ok) {
            console.warn('Failed to fetch credentials:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching credentials:', error);
        return null;
    }
}

/**
 * Create new user account in DAD
 * Attempts to create account in both Python and Java backends
 * @param {Object} userData - User data object
 * @param {string} userData.name - Full name
 * @param {string} userData.uid - User ID/username
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @returns {Promise<boolean>} - True if at least one backend succeeds
 */
export async function dadCreateUser(userData) {
    const { name, uid, email, password } = userData;

    const pythonData = {
        name,
        uid,
        email,
        password
    };

    const javaData = {
        uid,
        sid: "0000000",
        email,
        dob: "01-01-2000",
        name,
        password,
        kasmServerNeeded: false
    };

    try {
        const results = await Promise.allSettled([
            // Python backend
            fetch(`${pythonURI}/api/user`, {
                ...fetchOptions,
                method: 'POST',
                body: JSON.stringify(pythonData)
            }).then(res => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            }),
            // Java backend
            fetch(`${javaURI}/api/person/create`, {
                ...fetchOptions,
                method: 'POST',
                body: JSON.stringify(javaData)
            }).then(res => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
        ]);

        // Check if at least one backend succeeded
        const success = results.some(r => r.status === 'fulfilled');
        
        if (!success) {
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.error(`Backend ${index === 0 ? 'Python' : 'Java'} error:`, result.reason);
                }
            });
        }

        return success;
    } catch (error) {
        console.error('DAD user creation error:', error);
        return false;
    }
}

/**
 * Get user's enrolled courses/classes
 * @returns {Promise<Array>} - Array of course codes user is enrolled in
 */
export async function dadGetUserCourses() {
    try {
        const response = await fetch(`${pythonURI}/api/user/class`, {
            ...fetchOptions,
            method: 'GET'
        });

        if (!response.ok) {
            console.warn('Failed to fetch user courses:', response.status);
            return [];
        }

        const data = await response.json();
        return data.class || [];
    } catch (error) {
        console.error('Error fetching user courses:', error);
        return [];
    }
}

/**
 * Logout user from DAD
 * Attempts logout on both Python and Java backends
 * @returns {Promise<void>}
 */
export async function dadLogout() {
    try {
        await Promise.all([
            // Python backend logout
            fetch(`${pythonURI}/api/logout`, {
                ...fetchOptions,
                method: 'POST'
            }).catch(() => null),
            
            // Java backend logout
            fetch(`${javaURI}/api/logout`, {
                ...fetchOptions,
                method: 'POST'
            }).catch(() => null)
        ]);
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

/**
 * Verify if user has a valid session
 * @returns {Promise<boolean>} - True if session is valid
 */
export async function dadVerifySession() {
    try {
        const userInfo = await dadGetCurrentUser();
        return userInfo !== null;
    } catch (error) {
        console.error('Session verification error:', error);
        return false;
    }
}

/**
 * Send chat message to AI (Groq)
 * @param {string} message - User message to send
 * @returns {Promise<Object|null>} - Response from chat API
 */
export async function dadChatWithAI(message) {
    try {
        const response = await fetch(`${pythonURI}/api/groq/chat`, {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify({
                message: message,
                userId: 'user'
            })
        });

        if (!response.ok) {
            console.warn('Chat API failed:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Chat error:', error);
        return null;
    }
}

/**
 * Fetch carousel/deeds data
 * @returns {Promise<Array>} - Array of deed items for carousel
 */
export async function dadGetCarouselData() {
    try {
        const response = await fetch(`${pythonURI}/carousel/`, {
            ...fetchOptions,
            method: 'GET'
        });

        if (!response.ok) {
            console.warn('Carousel fetch failed:', response.status);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching carousel:', error);
        return [];
    }
}

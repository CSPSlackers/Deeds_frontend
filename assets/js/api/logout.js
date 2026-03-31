import { pythonURI, javaURI, fetchOptions } from './config.js';

// Helper function to remove cookies
function removeCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}

// Check if running on production (not localhost)
function isProduction() {
    return location.hostname !== "localhost" && location.hostname !== "127.0.0.1";
}

// logout from both java and python backends
export async function handleLogout() {
    // import config dynamically since we can't use import in non-module script

    // Remove cookies based on environment
    if (isProduction()) {
        // On deployed: remove both jwt_flask and sess_python_flask
        removeCookie('jwt_flask');
        removeCookie('sess_python_flask');
    } else {
        // On localhost: only remove jwt_flask
        removeCookie('jwt_flask');
    }

    // logout from python backend
    try {
        await fetch(pythonURI + '/api/authenticate', {
            ...fetchOptions,
            method: 'DELETE'
        });
    } catch (e) {
        // log error but continue
        console.error('python logout failed:', e);
    }

    // logout from java backend
    try {
        await fetch(javaURI + '/api/logout', {
            ...fetchOptions,
            method: 'POST',
        });
    } catch (e) {
        // log error but continue
        console.error('java logout failed:', e);
    }

}

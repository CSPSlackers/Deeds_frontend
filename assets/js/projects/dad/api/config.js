// DAD Project Configuration
// Self-contained backend configuration

export const baseurl = "";

// Helper function to build full redirect URLs
export function getFullURL(path) {
    const validBaseurl = baseurl && baseurl !== "" && !baseurl.includes("{{") ? baseurl : "";
    
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        const cleanPath = path.startsWith('/') ? path : '/' + path;
        return validBaseurl ? validBaseurl + cleanPath : cleanPath;
    } else {
        const protocol = location.protocol;
        const hostname = location.hostname;
        const port = location.port ? ':' + location.port : '';
        const base = protocol + '//' + hostname + port;
        const cleanPath = path.startsWith('/') ? path : '/' + path;
        const urlPath = validBaseurl ? validBaseurl + cleanPath : cleanPath;
        return base + urlPath;
    }
}

export var pythonURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    pythonURI = "http://localhost:8328";
} else {
    pythonURI = "https://dad.opencodingsociety.com";
}

export var javaURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    javaURI = "http://localhost:8328";
} else {
    javaURI = "https://dad.opencodingsociety.com";
}

export const fetchOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': 'client'
    },
};

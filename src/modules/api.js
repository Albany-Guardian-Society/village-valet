const apiVersion = 'v1';
let hostname = window && window.location && window.location.hostname;
if (hostname === 'localhost') {
    hostname += ':3000'
}

export const API_ROOT = `http://${hostname}/api/${apiVersion}`;


const apiVersion = 'v1';
let hostname = window && window.location && window.location.hostname;
if (hostname === 'localhost') {
    hostname += ':4200'
}

export const API_ROOT = `http://${hostname}/api/${apiVersion}`;


const apiVersion = 'v1';
let hostname = window && window.location && window.location.hostname;
export let API_ROOT;
if (hostname === 'localhost') {
    hostname += ':3000'
    API_ROOT = `http://${hostname}/api/${apiVersion}`;
} else {
    API_ROOT = `https://${hostname}/api/${apiVersion}`;
}


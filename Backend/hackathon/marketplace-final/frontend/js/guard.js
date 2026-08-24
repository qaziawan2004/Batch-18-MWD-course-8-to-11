import { getToken } from './api.js';

if (!getToken()) {
    window.location.href = 'login.html';
}

import { request } from './api.js';
import { renderNav, renderSidebar, renderFooter, escapeHtml, showToast } from './layout.js';

renderNav('profile');
renderSidebar('profile');
renderFooter();

const form = document.querySelector('#profileForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const bioInput = document.querySelector('#bio');
const avatar = document.querySelector('#profileAvatar');

async function loadProfile() {
    try {
        const data = await request('/users/me');
        const user = data.user;

        nameInput.value = user.name;
        emailInput.value = user.email;
        bioInput.value = user.bio || '';
        avatar.textContent = user.name.charAt(0).toUpperCase();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault();

    try {
        const data = await request('/users/me', {
            method: 'PUT',
            body: JSON.stringify({
                name: nameInput.value,
                bio: bioInput.value
            })
        });

        localStorage.setItem('user', JSON.stringify({
            ...(JSON.parse(localStorage.getItem('user') || '{}')),
            name: data.user.name
        }));

        showToast(data.message);
        renderNav('profile');
    } catch (error) {
        showToast(error.message, 'error');
    }
});

loadProfile();

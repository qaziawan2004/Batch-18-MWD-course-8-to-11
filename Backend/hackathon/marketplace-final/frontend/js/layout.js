import { clearAuth, getToken } from './api.js';

export function renderNav(active = '') {
    const root = document.querySelector('#appNav');

    if (!root) {
        return;
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const loggedIn = Boolean(getToken());

    root.innerHTML = `
        <header class="topbar">
            <a class="brand" href="index.html" aria-label="MarketHub home">
                <span class="brand-mark">M</span>
                <span>Market<span>Hub</span></span>
            </a>

            <nav class="desktop-nav" aria-label="Primary navigation">
                <a class="nav-link ${active === 'dashboard' ? 'active' : ''}" href="index.html">Marketplace</a>
                ${loggedIn ? `<a class="nav-link ${active === 'my-products' ? 'active' : ''}" href="my-products.html">My Products</a>` : ''}
                <a class="nav-link" href="#appFooter">About</a>
            </nav>

            <div class="topbar-actions">
                <button class="icon-button" id="themeToggle" type="button" title="Toggle theme" aria-label="Toggle theme">◐</button>

                ${loggedIn
                    ? `
                        <a class="btn btn-primary btn-small topbar-add" href="add-product.html">＋ Sell</a>
                        <a class="profile-chip" href="profile.html" aria-label="Open profile">
                            <span class="avatar">${(user?.name || 'U').charAt(0).toUpperCase()}</span>
                            <span>${escapeHtml(user?.name || 'Account')}</span>
                        </a>
                    `
                    : `
                        <a class="btn btn-secondary btn-small topbar-login" href="login.html">Login</a>
                        <a class="btn btn-primary btn-small" href="signup.html">Create Account</a>
                    `}
            </div>
        </header>
    `;

    const themeButton = document.querySelector('#themeToggle');

    if (themeButton) {
        updateThemeButton(themeButton);
        themeButton.addEventListener('click', toggleTheme);
    }
}

export function renderSidebar(active = '') {
    const root = document.querySelector('#appSidebar');

    if (!root) {
        return;
    }

    const loggedIn = Boolean(getToken());

    if (!loggedIn) {
        root.innerHTML = `
            <aside class="sidebar guest-sidebar">
                <div class="guest-panel">
                    <div class="guest-icon">✨</div>
                    <span class="sidebar-label">Welcome</span>
                    <h3>Explore freely</h3>
                    <p>Browse every listing without an account. Sign in only when you want to save a favorite or sell.</p>
                    <a class="btn btn-primary sidebar-cta" href="signup.html">Create Account</a>
                    <a class="sidebar-login-link" href="login.html">Already have an account? Login</a>
                </div>

                <div class="sidebar-mini-links">
                    <a class="side-link active" href="index.html">⌂ <span>Marketplace</span></a>
                    <a class="side-link" href="#appFooter">♡ <span>How it works</span></a>
                </div>
            </aside>
        `;
        return;
    }

    root.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-label">Workspace</div>
            <a class="side-link ${active === 'dashboard' ? 'active' : ''}" href="index.html">⌂ <span>Marketplace</span></a>
            <a class="side-link ${active === 'my-products' ? 'active' : ''}" href="my-products.html">▦ <span>My Products</span></a>
            <a class="side-link ${active === 'add-product' ? 'active' : ''}" href="add-product.html">＋ <span>Add Product</span></a>
            <a class="side-link ${active === 'wishlist' ? 'active' : ''}" href="wishlist.html">♡ <span>Wishlist</span></a>

            <div class="sidebar-label">Account</div>
            <a class="side-link ${active === 'profile' ? 'active' : ''}" href="profile.html">◉ <span>Profile</span></a>
            <button class="side-link side-button" id="logoutButton" type="button">↪ <span>Logout</span></button>

            <div class="sidebar-tip">
                <strong>Quick tip</strong>
                <p>See something you love? Save it to your wishlist for later.</p>
            </div>
        </aside>
    `;

    document.querySelector('#logoutButton')?.addEventListener('click', () => {
        clearAuth();
        sessionStorage.clear();
        window.location.href = 'login.html';
    });
}

export function requireLogin() {
    if (!getToken()) {
        const nextPage = `${window.location.pathname}${window.location.search}`;
        sessionStorage.setItem('loginNext', nextPage);
        window.location.href = 'login.html';
        return false;
    }

    return true;
}

export function showToast(message, type = 'success') {
    let container = document.querySelector('#toastContainer');

    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 250);
    }, 3000);
}

export function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function updateThemeButton(button) {
    const dark = document.body.classList.contains('dark');
    button.textContent = dark ? '☀' : '☾';
    button.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    button.setAttribute('aria-label', button.title);
}

function toggleTheme() {
    const dark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');

    const button = document.querySelector('#themeToggle');

    if (button) {
        updateThemeButton(button);
    }
}

export function syncThemeButton() {
    const button = document.querySelector('#themeToggle');

    if (button) {
        updateThemeButton(button);
    }
}

export function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}

export function renderFooter() {
    let root = document.querySelector('#appFooter');

    if (!root) {
        root = document.createElement('div');
        root.id = 'appFooter';
        document.body.appendChild(root);
    }

    root.innerHTML = `
        <footer class="footer">
            <div class="footer-main">
                <div class="footer-brand-block">
                    <a class="brand footer-brand" href="index.html">
                        <span class="brand-mark">M</span>
                        <span>Market<span>Hub</span></span>
                    </a>
                    <p>
                        A simple community marketplace for discovering great products,
                        connecting with sellers, and selling your own items.
                    </p>
                    <div class="footer-socials" aria-label="Social links">
                        <span>f</span>
                        <span>◎</span>
                        <span>in</span>
                    </div>
                </div>

                <div class="footer-column">
                    <h3>Marketplace</h3>
                    <a href="index.html">Browse Products</a>
                    <a href="index.html#marketplace">Categories</a>
                    <a href="index.html#marketplace">Product Details</a>
                </div>

                <div class="footer-column">
                    <h3>Sell</h3>
                    <a href="add-product.html">Post an Item</a>
                    <a href="my-products.html">My Products</a>
                    <a href="wishlist.html">Wishlist</a>
                </div>

                <div class="footer-column">
                    <h3>Account</h3>
                    <a href="login.html">Login</a>
                    <a href="signup.html">Create Account</a>
                    <a href="forgot-password.html">Reset Password</a>
                </div>
            </div>

            <div class="footer-bottom">
                <span>© ${new Date().getFullYear()} MarketHub. All rights reserved.</span>
                <span>Built with HTML, CSS, JavaScript, Node.js & MongoDB.</span>
            </div>
        </footer>
    `;
}

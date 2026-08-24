import { request, getToken } from './api.js';
import {
    renderNav,
    renderSidebar,
    renderFooter,
    escapeHtml,
    showToast
} from './layout.js';

renderNav('dashboard');
renderSidebar('dashboard');
renderFooter();

const grid = document.querySelector('#productGrid');
const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');
const conditionSelect = document.querySelector('#condition');
const statusSelect = document.querySelector('#status');
const sortSelect = document.querySelector('#sort');
const pagination = document.querySelector('#pagination');
const resultInfo = document.querySelector('#resultInfo');

let currentPage = 1;

function productCard(product) {
    const image = product.images?.[0]?.url || 'images/placeholder.svg';
    const sellerName = product.seller?.name || 'Seller';
    const owner = Boolean(product.isOwner);
    const loggedIn = Boolean(getToken());
    const wishlisted = Boolean(product.isWishlisted);

    let actionHtml = '';

    if (owner) {
        // Owner actions stay available from My Products and Product Details.
        // The main marketplace card only shows View Product.
        actionHtml = '';
    } else if (loggedIn) {
        actionHtml = `
            <button
                class="btn btn-wishlist btn-small ${wishlisted ? 'active' : ''}"
                type="button"
                data-wishlist="${product._id}"
            >
                ${wishlisted ? '♥ In Wishlist' : '♡ Add to Wishlist'}
            </button>
        `;
    } else {
        actionHtml = `
            <button
                class="btn btn-wishlist btn-small"
                type="button"
                data-login-wishlist="${product._id}"
            >
                ♡ Login to Wishlist
            </button>
        `;
    }

    return `
        <article class="product-card">
            <a class="product-image" href="product.html?id=${product._id}">
                <img src="${image}" alt="${escapeHtml(product.title)}">
                <span class="status-badge ${product.status === 'Sold' ? 'sold' : ''}">
                    ${escapeHtml(product.status)}
                </span>
                ${owner ? '<span class="owner-badge">Your Listing</span>' : ''}
            </a>

            <div class="product-body">
                <div class="product-meta">
                    ${escapeHtml(product.category)} <span>•</span> ${escapeHtml(product.condition)}
                </div>

                <h3>
                    <a href="product.html?id=${product._id}">
                        ${escapeHtml(product.title)}
                    </a>
                </h3>

                <p class="product-location">
                    ⌖ ${escapeHtml(product.location)}
                </p>

                <div class="seller-row">
                    <span>Seller</span>
                    <strong>${escapeHtml(sellerName)}</strong>
                </div>

                <div class="product-bottom">
                    <strong>PKR ${Number(product.price).toLocaleString()}</strong>
                    <span class="views-count">◉ ${product.views || 0} views</span>
                </div>

                <div class="card-actions">
                    <a class="btn btn-secondary btn-small" href="product.html?id=${product._id}">
                        View Product
                    </a>
                    ${actionHtml}
                </div>
            </div>
        </article>
    `;
}

function renderPagination(data) {
    if (data.pagination.pages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '';

    for (let page = 1; page <= data.pagination.pages; page += 1) {
        html += `
            <button
                class="page-button ${page === currentPage ? 'active' : ''}"
                data-page="${page}"
                type="button"
            >
                ${page}
            </button>
        `;
    }

    pagination.innerHTML = html;

    pagination.querySelectorAll('[data-page]').forEach(button => {
        button.addEventListener('click', () => {
            currentPage = Number(button.dataset.page);
            loadProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function goToLogin() {
    const nextPage = `${window.location.pathname}${window.location.search}`;
    sessionStorage.setItem('loginNext', nextPage);
    window.location.href = 'login.html';
}

async function handleWishlist(button) {
    if (!getToken()) {
        goToLogin();
        return;
    }

    try {
        const result = await request(`/wishlist/${button.dataset.wishlist}`, {
            method: 'POST'
        });

        button.classList.toggle('active', result.liked);
        button.textContent = result.liked
            ? '♥ In Wishlist'
            : '♡ Add to Wishlist';

        showToast(result.message);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function handleDelete(button) {
    const confirmed = window.confirm(
        'Are you sure you want to delete this product permanently?'
    );

    if (!confirmed) {
        return;
    }

    try {
        const result = await request(`/products/${button.dataset.delete}`, {
            method: 'DELETE'
        });

        showToast(result.message);
        loadProducts();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function attachCardActions() {
    grid.querySelectorAll('[data-wishlist]').forEach(button => {
        button.addEventListener('click', () => handleWishlist(button));
    });

    grid.querySelectorAll('[data-login-wishlist]').forEach(button => {
        button.addEventListener('click', goToLogin);
    });

    grid.querySelectorAll('[data-delete]').forEach(button => {
        button.addEventListener('click', () => handleDelete(button));
    });
}

async function loadProducts() {
    grid.innerHTML = `
        <div class="state-card loading-state">
            <div class="spinner"></div>
            <h3>Loading marketplace...</h3>
            <p>Finding fresh listings from the community.</p>
        </div>
    `;

    const params = new URLSearchParams();
    const search = searchInput.value.trim();

    if (search) {
        params.set('search', search);
    }

    if (categorySelect.value) {
        params.set('category', categorySelect.value);
    }

    if (conditionSelect.value) {
        params.set('condition', conditionSelect.value);
    }

    if (statusSelect.value) {
        params.set('status', statusSelect.value);
    }

    if (sortSelect.value) {
        params.set('sort', sortSelect.value);
    }

    params.set('page', currentPage);
    params.set('limit', '8');

    try {
        const data = await request(`/products?${params.toString()}`);

        resultInfo.textContent = `${data.pagination.total} listing${
            data.pagination.total === 1 ? '' : 's'
        }`;

        if (data.products.length === 0) {
            grid.innerHTML = `
                <div class="state-card empty-state">
                    <div class="empty-icon">⌕</div>
                    <h3>No products found</h3>
                    <p>
                        Nothing matches your current filters. Try another search
                        or become the first seller to add a listing.
                    </p>
                    <a class="btn btn-primary" href="add-product.html">
                        ＋ Sell an Item
                    </a>
                </div>
            `;
            pagination.innerHTML = '';
            return;
        }

        grid.innerHTML = data.products.map(productCard).join('');
        attachCardActions();
        renderPagination(data);
    } catch (error) {
        grid.innerHTML = `
            <div class="state-card error-state">
                <h3>Could not load marketplace</h3>
                <p>${escapeHtml(error.message)}</p>
                <button class="btn btn-primary" id="retryButton" type="button">
                    Try Again
                </button>
            </div>
        `;

        document
            .querySelector('#retryButton')
            ?.addEventListener('click', loadProducts);

        showToast(error.message, 'error');
    }
}

let searchTimer;

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    currentPage = 1;
    searchTimer = setTimeout(loadProducts, 350);
});

[
    categorySelect,
    conditionSelect,
    statusSelect,
    sortSelect
].forEach(control => {
    control.addEventListener('change', () => {
        currentPage = 1;
        loadProducts();
    });
});

loadProducts();

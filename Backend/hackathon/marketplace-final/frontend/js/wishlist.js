import { request } from './api.js';
import { renderNav, renderSidebar, renderFooter, escapeHtml, showToast } from './layout.js';

renderNav('wishlist');
renderSidebar('wishlist');
renderFooter();

const root = document.querySelector('#wishlistGrid');

async function loadWishlist() {
    root.innerHTML = '<div class="state-card">Loading wishlist...</div>';

    try {
        const data = await request('/wishlist');

        if (data.products.length === 0) {
            root.innerHTML = `
                <div class="state-card empty-state">
                    <div class="empty-icon">♡</div>
                    <h3>Your wishlist is empty</h3>
                    <p>Save products you want to come back to later.</p>
                </div>
            `;
            return;
        }

        root.innerHTML = data.products.map(product => `
            <article class="product-card">
                <a class="product-image" href="product.html?id=${product._id}">
                    <img src="${product.images?.[0]?.url || 'images/placeholder.svg'}" alt="${escapeHtml(product.title)}">
                </a>
                <div class="product-body">
                    <div class="product-meta">${escapeHtml(product.category)} • ${escapeHtml(product.condition)}</div>
                    <h3><a href="product.html?id=${product._id}">${escapeHtml(product.title)}</a></h3>
                    <p class="product-location">⌖ ${escapeHtml(product.location)}</p>
                    <div class="product-bottom">
                        <strong>PKR ${Number(product.price).toLocaleString()}</strong>
                        <button class="btn btn-danger btn-small" data-remove="${product._id}">Remove</button>
                    </div>
                </div>
            </article>
        `).join('');

        root.querySelectorAll('[data-remove]').forEach(button => {
            button.addEventListener('click', async () => {
                try {
                    const result = await request(`/wishlist/${button.dataset.remove}`, {
                        method: 'POST'
                    });

                    showToast(result.message);
                    loadWishlist();
                } catch (error) {
                    showToast(error.message, 'error');
                }
            });
        });
    } catch (error) {
        root.innerHTML = `<div class="state-card error-state">${escapeHtml(error.message)}</div>`;
    }
}

loadWishlist();

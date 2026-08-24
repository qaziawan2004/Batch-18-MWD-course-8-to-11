import { request } from './api.js';
import { renderNav, renderSidebar, renderFooter, escapeHtml, showToast } from './layout.js';

renderNav('my-products');
renderSidebar('my-products');
renderFooter();

const grid = document.querySelector('#myProductsGrid');

function card(product) {
    const image = product.images?.[0]?.url || 'images/placeholder.svg';

    return `
        <article class="product-card">
            <a class="product-image" href="product.html?id=${product._id}">
                <img src="${image}" alt="${escapeHtml(product.title)}">
                <span class="status-badge ${product.status === 'Sold' ? 'sold' : ''}">${product.status}</span>
            </a>
            <div class="product-body">
                <div class="product-meta">${escapeHtml(product.category)} • ${escapeHtml(product.condition)}</div>
                <h3>${escapeHtml(product.title)}</h3>
                <p class="product-location">⌖ ${escapeHtml(product.location)}</p>
                <div class="product-bottom">
                    <strong>PKR ${Number(product.price).toLocaleString()}</strong>
                    <span>${product.views} views</span>
                </div>
                <div class="card-actions">
                    <a class="btn btn-secondary" href="product.html?id=${product._id}">View</a>
                    <a class="btn btn-secondary" href="edit-product.html?id=${product._id}">Edit</a>
                    <button class="btn btn-danger" data-delete="${product._id}">Delete</button>
                </div>
            </div>
        </article>
    `;
}

async function loadProducts() {
    grid.innerHTML = '<div class="state-card">Loading your products...</div>';

    try {
        const data = await request('/products/mine');

        if (data.products.length === 0) {
            grid.innerHTML = `
                <div class="state-card empty-state">
                    <div class="empty-icon">＋</div>
                    <h3>You have no products yet</h3>
                    <p>Create your first listing and start selling.</p>
                    <a class="btn btn-primary" href="add-product.html">Add Product</a>
                </div>
            `;
            return;
        }

        grid.innerHTML = data.products.map(card).join('');

        grid.querySelectorAll('[data-delete]').forEach(button => {
            button.addEventListener('click', async () => {
                const confirmed = window.confirm('Delete this product permanently?');

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
            });
        });
    } catch (error) {
        grid.innerHTML = `<div class="state-card error-state">${escapeHtml(error.message)}</div>`;
    }
}

loadProducts();

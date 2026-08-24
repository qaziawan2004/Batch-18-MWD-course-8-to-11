import { request, getToken } from './api.js';
import { renderNav, renderSidebar, renderFooter, escapeHtml, showToast } from './layout.js';

renderNav();
renderFooter();

if (getToken()) {
    renderSidebar();
}

const id = new URLSearchParams(window.location.search).get('id');
const root = document.querySelector('#productDetail');

async function loadProduct() {
    if (!id) {
        root.innerHTML = '<div class="state-card">Product ID is missing.</div>';
        return;
    }

    try {
        const data = await request(`/products/${id}`);
        const product = data.product;
        const images = product.images || [];
        const owner = Boolean(product.isOwner);
        const wishlisted = Boolean(product.isWishlisted);

        root.innerHTML = `
            <div class="detail-gallery">
                <div class="detail-main-image">
                    <img id="mainImage" src="${images[0]?.url || 'images/placeholder.svg'}" alt="${escapeHtml(product.title)}">
                </div>
                <div class="thumbnail-row">
                    ${images.map((image, index) => `<button class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${image.url}"><img src="${image.url}" alt="Product image ${index + 1}"></button>`).join('')}
                </div>
            </div>

            <div class="detail-content">
                <div class="product-meta">${escapeHtml(product.category)} • ${escapeHtml(product.condition)}</div>
                <h1>${escapeHtml(product.title)}</h1>
                <div class="detail-price">PKR ${Number(product.price).toLocaleString()}</div>
                <div class="detail-stats">
                    <span>⌖ ${escapeHtml(product.location)}</span>
                    <span>◉ ${product.views} views</span>
                    <span class="status-pill ${product.status === 'Sold' ? 'sold' : ''}">${product.status}</span>
                </div>
                <div class="detail-section">
                    <h3>Description</h3>
                    <p>${escapeHtml(product.description)}</p>
                </div>
                <div class="seller-box">
                    <div class="avatar large">${(product.seller?.name || 'S').charAt(0).toUpperCase()}</div>
                    <div>
                        <span class="muted">Seller</span>
                        <strong>${escapeHtml(product.seller?.name || 'Seller')}</strong>
                        <a href="seller.html?id=${product.seller?._id}">View seller profile</a>
                    </div>
                </div>
                <div class="detail-actions">
                    ${owner
                        ? `
                            <a class="btn btn-primary" href="edit-product.html?id=${product._id}">
                                Edit Product
                            </a>
                            <button class="btn btn-danger" id="deleteProductButton" type="button">
                                Delete Product
                            </button>
                        `
                        : `
                            <button class="btn btn-wishlist ${wishlisted ? 'active' : ''}" id="wishlistButton" type="button">
                                ${wishlisted ? '♥ In Wishlist' : '♡ Add to Wishlist'}
                            </button>
                        `}
                </div>
            </div>
        `;

        root.querySelectorAll('.thumbnail').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelector('#mainImage').src = button.dataset.image;
                root.querySelectorAll('.thumbnail').forEach(item => item.classList.remove('active'));
                button.classList.add('active');
            });
        });

        document.querySelector('#wishlistButton')?.addEventListener('click', async () => {
            if (!getToken()) {
                const nextPage = `${window.location.pathname}${window.location.search}`;
                sessionStorage.setItem('loginNext', nextPage);
                window.location.href = 'login.html';
                return;
            }

            try {
                const result = await request(`/wishlist/${product._id}`, {
                    method: 'POST'
                });

                const button = document.querySelector('#wishlistButton');
                button.classList.toggle('active', result.liked);
                button.textContent = result.liked
                    ? '♥ In Wishlist'
                    : '♡ Add to Wishlist';

                showToast(result.message);
            } catch (error) {
                showToast(error.message, 'error');
            }
        });

        document.querySelector('#deleteProductButton')?.addEventListener('click', async () => {
            const confirmed = window.confirm(
                'Are you sure you want to delete this product permanently?'
            );

            if (!confirmed) {
                return;
            }

            try {
                const result = await request(`/products/${product._id}`, {
                    method: 'DELETE'
                });

                showToast(result.message);

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 600);
            } catch (error) {
                showToast(error.message, 'error');
            }
        });
    } catch (error) {
        root.innerHTML = `<div class="state-card error-state">${escapeHtml(error.message)}</div>`;
    }
}

loadProduct();

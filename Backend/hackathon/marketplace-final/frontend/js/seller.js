import { request } from './api.js';
import { renderNav, renderFooter, escapeHtml } from './layout.js';

renderNav();
renderFooter();

const id = new URLSearchParams(window.location.search).get('id');
const root = document.querySelector('#sellerRoot');

async function loadSeller() {
    try {
        const data = await request(`/users/${id}`);
        const user = data.user;

        root.innerHTML = `
            <section class="seller-header panel">
                <div class="avatar xl">${user.name.charAt(0).toUpperCase()}</div>
                <div>
                    <span class="eyebrow">Seller Profile</span>
                    <h1>${escapeHtml(user.name)}</h1>
                    <p>${escapeHtml(user.bio || 'MarketHub seller')}</p>
                    <span class="muted">Member since ${new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
            </section>
            <section>
                <div class="section-heading">
                    <div>
                        <span class="eyebrow">Listings</span>
                        <h2>${data.products.length} products</h2>
                    </div>
                </div>
                <div class="product-grid">
                    ${data.products.map(product => `
                        <article class="product-card">
                            <a class="product-image" href="product.html?id=${product._id}">
                                <img src="${product.images?.[0]?.url || 'images/placeholder.svg'}" alt="${escapeHtml(product.title)}">
                            </a>
                            <div class="product-body">
                                <div class="product-meta">${escapeHtml(product.category)} • ${escapeHtml(product.condition)}</div>
                                <h3><a href="product.html?id=${product._id}">${escapeHtml(product.title)}</a></h3>
                                <div class="product-bottom"><strong>PKR ${Number(product.price).toLocaleString()}</strong><span>${escapeHtml(product.status)}</span></div>
                            </div>
                        </article>
                    `).join('') || '<div class="state-card">This seller has no active listings.</div>'}
                </div>
            </section>
        `;
    } catch (error) {
        root.innerHTML = `<div class="state-card error-state">${escapeHtml(error.message)}</div>`;
    }
}

loadSeller();

import { request } from './api.js';
import { renderNav, renderSidebar, renderFooter, escapeHtml, showToast } from './layout.js';

const page = document.body.dataset.page;
const isEdit = page === 'edit-product';

renderNav(isEdit ? 'my-products' : 'add-product');
renderSidebar(isEdit ? 'my-products' : 'add-product');
renderFooter();

const form = document.querySelector('#productForm');
const message = document.querySelector('#message');
const imageInput = document.querySelector('#images');
const preview = document.querySelector('#imagePreview');

function showMessage(text, type = 'error') {
    message.textContent = text;
    message.className = `message show ${type}`;
}

imageInput?.addEventListener('change', () => {
    preview.innerHTML = '';

    Array.from(imageInput.files).slice(0, 5).forEach(file => {
        const url = URL.createObjectURL(file);
        const image = document.createElement('img');
        image.src = url;
        image.alt = file.name;
        preview.appendChild(image);
    });
});

async function loadEditProduct() {
    const id = new URLSearchParams(window.location.search).get('id');

    if (!id) {
        window.location.href = 'my-products.html';
        return;
    }

    try {
        const data = await request(`/products/${id}`);
        const product = data.product;
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (!user || product.seller?._id !== user.id) {
            showMessage('You are not allowed to edit this product.');
            form.querySelector('button[type="submit"]').disabled = true;
            return;
        }

        document.querySelector('#title').value = product.title;
        document.querySelector('#description').value = product.description;
        document.querySelector('#price').value = product.price;
        document.querySelector('#category').value = product.category;
        document.querySelector('#condition').value = product.condition;
        document.querySelector('#location').value = product.location;
        document.querySelector('#status').value = product.status;

        preview.innerHTML = (product.images || []).map(image => `<img src="${image.url}" alt="Current product image">`).join('');
    } catch (error) {
        showMessage(error.message);
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
        const path = isEdit
            ? `/products/${new URLSearchParams(window.location.search).get('id')}`
            : '/products';

        const method = isEdit ? 'PUT' : 'POST';

        const data = await request(path, {
            method,
            body: formData
        });

        showToast(data.message);
        window.location.href = 'my-products.html';
    } catch (error) {
        showMessage(error.message);
    }
});

if (isEdit) {
    loadEditProduct();
}

import { request, setAuth } from './api.js';
import { renderNav, renderFooter, showToast } from './layout.js';

renderNav();
renderFooter();

const page = document.body.dataset.page;
const form = document.querySelector('#form');
const message = document.querySelector('#message');

function showMessage(text, type = 'error') {
    if (!message) {
        return;
    }

    message.textContent = text;
    message.className = `message show ${type}`;
}

if (page === 'signup') {
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            await request('/auth/signup', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            sessionStorage.setItem('signupEmail', payload.email);
            window.location.href = 'verify-signup-otp.html';
        } catch (error) {
            showMessage(error.message);
        }
    });
}

if (page === 'verify-signup') {
    const email = sessionStorage.getItem('signupEmail');
    const emailText = document.querySelector('#emailText');
    const resendButton = document.querySelector('#resendButton');

    if (!email) {
        window.location.href = 'signup.html';
    }

    emailText.textContent = email;

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const otp = new FormData(form).get('otp');

        try {
            const data = await request('/auth/verify-signup-otp', {
                method: 'POST',
                body: JSON.stringify({ email, otp })
            });

            setAuth(data);
            sessionStorage.removeItem('signupEmail');
            showToast('Account verified. Welcome to MarketHub!');

            const nextPage = sessionStorage.getItem('loginNext') || 'index.html';
            sessionStorage.removeItem('loginNext');
            window.location.href = nextPage;
        } catch (error) {
            showMessage(error.message);
        }
    });

    resendButton.addEventListener('click', async () => {
        try {
            await request('/auth/resend-signup-otp', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            showMessage('A new OTP has been sent to your email.', 'success');
        } catch (error) {
            showMessage(error.message);
        }
    });
}

if (page === 'login') {
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const data = await request('/auth/login', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            setAuth(data);

            const nextPage = sessionStorage.getItem('loginNext') || 'index.html';
            sessionStorage.removeItem('loginNext');
            window.location.href = nextPage;
        } catch (error) {
            if (error.message.includes('verify your email')) {
                sessionStorage.setItem('signupEmail', formData.get('email'));
                window.location.href = 'verify-signup-otp.html';
                return;
            }

            showMessage(error.message);
        }
    });
}

if (page === 'forgot') {
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const email = new FormData(form).get('email');

        try {
            await request('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            sessionStorage.setItem('resetEmail', email);
            window.location.href = 'verify-reset-otp.html';
        } catch (error) {
            showMessage(error.message);
        }
    });
}

if (page === 'verify-reset') {
    const email = sessionStorage.getItem('resetEmail');
    const emailText = document.querySelector('#emailText');
    const resendButton = document.querySelector('#resendResetButton');

    if (!email) {
        window.location.href = 'forgot-password.html';
    }

    emailText.textContent = email;

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const otp = new FormData(form).get('otp');

        try {
            await request('/auth/verify-reset-otp', {
                method: 'POST',
                body: JSON.stringify({ email, otp })
            });

            sessionStorage.setItem('resetVerified', 'true');
            window.location.href = 'reset-password.html';
        } catch (error) {
            showMessage(error.message);
        }
    });

    resendButton.addEventListener('click', async () => {
        try {
            await request('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            showMessage('A new reset OTP has been sent.', 'success');
        } catch (error) {
            showMessage(error.message);
        }
    });
}

if (page === 'reset') {
    const email = sessionStorage.getItem('resetEmail');
    const verified = sessionStorage.getItem('resetVerified');

    if (!email || verified !== 'true') {
        window.location.href = 'forgot-password.html';
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = {
            email,
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        try {
            await request('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            sessionStorage.removeItem('resetEmail');
            sessionStorage.removeItem('resetVerified');

            showMessage('Password reset successfully. Redirecting to login...', 'success');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1200);
        } catch (error) {
            showMessage(error.message);
        }
    });
}

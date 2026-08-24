# MarketHub — Full Stack Mini Marketplace

A complete Full Stack Mini Marketplace built with HTML, CSS, Vanilla JavaScript, Node.js, Express.js, MongoDB/Mongoose, JWT, bcrypt, Nodemailer and Cloudinary.

## Important

This version is designed to run the frontend and backend from the same Express server on **http://localhost:7000**. Do not open the HTML files with Live Server on port 5500. This avoids the `/api` 404/405 problems caused by sending API requests to the frontend server.

## Main flows

### Signup verification

```text
Signup
  ↓
Backend creates unverified account + hashes password
  ↓
6-digit OTP sent to real email
  ↓
Redirect to verify-signup-otp.html
  ↓
Enter OTP
  ↓
Backend verifies OTP + expiry
  ↓
Account becomes verified
  ↓
JWT returned
  ↓
Dashboard / Marketplace
```

### Login

```text
Login
  ↓
Email + password checked with bcrypt
  ↓
Verified user receives JWT
  ↓
Dashboard
```

If an account is not verified, login automatically sends a fresh verification OTP and redirects the user to the verification page.

### Forgot password

```text
Forgot Password
  ↓
Registered email
  ↓
Reset OTP sent to real email
  ↓
verify-reset-otp.html
  ↓
OTP verified + expiry checked
  ↓
reset-password.html
  ↓
New password hashed with bcrypt
  ↓
Login
```

## Core assignment features

- Signup
- Email verification OTP
- Login
- Logout
- JWT authentication
- bcrypt password hashing
- Forgot password
- Reset password OTP
- OTP expiry
- Product create/read/update/delete
- Backend ownership authorization
- Cloudinary image upload
- Multiple product images
- Search by title
- Category filter
- Condition filter
- Status filter
- Price low-to-high
- Price high-to-low
- Combined query support
- My Products
- Product details
- Loading/error/empty states
- Responsive UI

## Bonus features

- Multiple product images
- Pagination
- User profile
- Public seller profile
- Wishlist/favorites
- Available/Sold status
- Product view counter
- Toast notifications
- Dark mode
- Most viewed sorting

## Project structure

```text
marketplace-final/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── mailer.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── users.js
│   │   └── wishlist.js
│   ├── utils/
│   │   ├── cloudinaryUpload.js
│   │   ├── otp.js
│   │   └── token.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── app.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/style.css
│   ├── images/placeholder.svg
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── verify-signup-otp.html
│   ├── forgot-password.html
│   ├── verify-reset-otp.html
│   ├── reset-password.html
│   ├── product.html
│   ├── add-product.html
│   ├── edit-product.html
│   ├── my-products.html
│   ├── wishlist.html
│   ├── profile.html
│   └── seller.html
│
└── README.md
```

## Installation

Open a terminal inside `backend`:

```bash
npm install
```

Start in development mode:

```bash
npm run start:dev
```

Or production mode:

```bash
npm start
```

Open:

```text
http://localhost:7000
```

## Environment variables

The project contains `.env.example` for GitHub and `.env` for local development.

Required variables:

```env
PORT=7000
MONGO_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=...
MAIL_PASS=...
CLIENT_URL=http://localhost:7000
```

For Gmail, `MAIL_PASS` should be a Google App Password, not the normal Gmail account password.

## MongoDB DNS workaround

The database configuration sets Node DNS resolvers before connecting:

```js
setServers(['8.8.8.8', '1.1.1.1']);
```

This is included because the development machine previously returned an Atlas SRV `ECONNREFUSED` error.

## Security

- Passwords are never stored in plain text.
- OTP values are stored as bcrypt hashes.
- OTPs expire after 10 minutes.
- Reset verification expires after 10 minutes.
- JWT protects private routes.
- Product owner is taken from JWT, not from frontend input.
- Product update/delete checks ownership on the backend.
- `.env` is ignored by Git.
- Product images are uploaded to Cloudinary, not saved locally.

## Ownership test

```text
User A → Create Product A
User B → Login
User B → PUT /api/products/ProductA
User B → DELETE /api/products/ProductA

Expected:
403 Access denied
```

## API examples

```text
GET    /api/products
GET    /api/products?search=iphone&category=Electronics&condition=Used&sort=price_asc
GET    /api/products/:id
GET    /api/products/mine
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Authentication:

```text
POST /api/auth/signup
POST /api/auth/verify-signup-otp
POST /api/auth/resend-signup-otp
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/verify-reset-otp
POST /api/auth/reset-password
GET  /api/auth/me
```

## Final testing checklist

1. Signup with a real email.
2. Confirm OTP arrives.
3. Enter OTP and confirm redirect to marketplace.
4. Logout.
5. Login with verified credentials.
6. Create a product with at least one image.
7. Confirm image is uploaded to Cloudinary.
8. Confirm product is saved in MongoDB.
9. Search/filter/sort products.
10. Open product details.
11. Add/remove wishlist item.
12. Edit own product.
13. Delete own product.
14. Try modifying another user's product and confirm 403.
15. Use Forgot Password.
16. Confirm reset OTP arrives.
17. Verify reset OTP.
18. Set a new password.
19. Login using the new password.
20. Test dark mode and responsive layout.

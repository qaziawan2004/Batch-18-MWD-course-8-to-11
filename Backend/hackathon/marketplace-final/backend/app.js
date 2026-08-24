import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import wishlistRoutes from './routes/wishlist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
    res.json({
        status: true,
        message: 'MarketHub API is running.'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ message: 'API route not found.' });
    }

    return res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.use((error, req, res, next) => {
    console.error('Unhandled server error:', error);

    if (error?.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Each image must be 5 MB or smaller.' });
    }

    if (error?.message === 'Only image files are allowed.') {
        return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error.' });
});

export default app;

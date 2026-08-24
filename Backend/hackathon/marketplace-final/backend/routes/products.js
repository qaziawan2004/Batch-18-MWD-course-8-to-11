import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';
import { uploadImages } from '../middleware/upload.js';
import { uploadBuffer } from '../utils/cloudinaryUpload.js';

const router = express.Router();

function validId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

function productPayload(body) {
    return {
        title: String(body.title || '').trim(),
        description: String(body.description || '').trim(),
        price: Number(body.price),
        category: body.category,
        condition: body.condition,
        location: String(body.location || '').trim(),
        status: body.status === 'Sold' ? 'Sold' : 'Available'
    };
}

function validatePayload(data) {
    if (!data.title || data.title.length < 2) {
        return 'Product title is required.';
    }

    if (!data.description) {
        return 'Product description is required.';
    }

    if (!Number.isFinite(data.price) || data.price < 0) {
        return 'Please enter a valid price.';
    }

    if (!['Electronics', 'Fashion', 'Furniture', 'Vehicles', 'Books', 'Other'].includes(data.category)) {
        return 'Please select a valid category.';
    }

    if (!['New', 'Used'].includes(data.condition)) {
        return 'Please select a valid condition.';
    }

    if (!data.location) {
        return 'Location is required.';
    }

    return null;
}

async function uploadFiles(files) {
    const uploaded = [];

    for (const file of files || []) {
        const result = await uploadBuffer(file.buffer);
        uploaded.push(result);
    }

    return uploaded;
}

router.get('/', optionalAuth, async (req, res) => {
    try {
        const search = String(req.query.search || '').trim();
        const category = String(req.query.category || '').trim();
        const condition = String(req.query.condition || '').trim();
        const status = String(req.query.status || '').trim();
        const sort = String(req.query.sort || '').trim();
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 8, 1), 30);

        const filter = {};

        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        if (category) {
            filter.category = category;
        }

        if (condition) {
            filter.condition = condition;
        }

        if (status) {
            filter.status = status;
        }

        let sortOption = { createdAt: -1 };

        if (sort === 'price_asc') {
            sortOption = { price: 1 };
        }

        if (sort === 'price_desc') {
            sortOption = { price: -1 };
        }

        if (sort === 'views_desc') {
            sortOption = { views: -1 };
        }

        const total = await Product.countDocuments(filter);
        const user = req.userId
            ? await User.findById(req.userId).select('wishlist')
            : null;

        const wishlistIds = new Set(
            (user?.wishlist || []).map(id => id.toString())
        );

        const products = await Product.find(filter)
            .populate('seller', 'name email avatar')
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit);

        const productData = products.map(product => ({
            ...product.toObject(),
            isOwner: product.seller?._id?.toString() === req.userId,
            isWishlisted: wishlistIds.has(product._id.toString())
        }));

        return res.json({
            products: productData,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('List products error:', error);
        return res.status(500).json({ message: 'Unable to load products.' });
    }
});

router.get('/mine', requireAuth, async (req, res) => {
    try {
        const products = await Product.find({ seller: req.userId })
            .populate('seller', 'name email avatar')
            .sort({ createdAt: -1 });

        return res.json({ products });
    } catch (error) {
        console.error('My products error:', error);
        return res.status(500).json({ message: 'Unable to load your products.' });
    }
});

router.get('/:id', optionalAuth, async (req, res) => {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID.' });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        ).populate('seller', 'name email avatar bio createdAt');

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const user = req.userId
            ? await User.findById(req.userId).select('wishlist')
            : null;
        const isWishlisted = (user?.wishlist || []).some(
            id => id.toString() === product._id.toString()
        );

        const productData = {
            ...product.toObject(),
            isOwner: product.seller?._id?.toString() === req.userId,
            isWishlisted
        };

        return res.json({ product: productData });
    } catch (error) {
        console.error('Get product error:', error);
        return res.status(500).json({ message: 'Unable to load product.' });
    }
});

router.post('/', requireAuth, uploadImages, async (req, res) => {
    try {
        const data = productPayload(req.body);
        const validationError = validatePayload(data);

        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one product image is required.' });
        }

        const images = await uploadFiles(req.files);

        const product = await Product.create({
            ...data,
            images,
            seller: req.userId
        });

        const populated = await product.populate('seller', 'name email avatar');

        return res.status(201).json({
            message: 'Product created successfully.',
            product: populated
        });
    } catch (error) {
        console.error('Create product error:', error);
        return res.status(500).json({ message: 'Unable to create product.' });
    }
});

router.put('/:id', requireAuth, uploadImages, async (req, res) => {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID.' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        if (product.seller.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not allowed to edit this product.' });
        }

        const data = productPayload(req.body);
        const validationError = validatePayload(data);

        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        if (req.files && req.files.length > 0) {
            data.images = await uploadFiles(req.files);
        }

        Object.assign(product, data);
        await product.save();

        const populated = await product.populate('seller', 'name email avatar');

        return res.json({
            message: 'Product updated successfully.',
            product: populated
        });
    } catch (error) {
        console.error('Update product error:', error);
        return res.status(500).json({ message: 'Unable to update product.' });
    }
});

router.delete('/:id', requireAuth, async (req, res) => {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID.' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        if (product.seller.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not allowed to delete this product.' });
        }

        await product.deleteOne();

        return res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Delete product error:', error);
        return res.status(500).json({ message: 'Unable to delete product.' });
    }
});

export default router;

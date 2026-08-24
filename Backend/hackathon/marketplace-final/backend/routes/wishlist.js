import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .populate({
                path: 'wishlist',
                populate: { path: 'seller', select: 'name email avatar' }
            });

        return res.json({ products: user?.wishlist || [] });
    } catch (error) {
        console.error('Wishlist load error:', error);
        return res.status(500).json({ message: 'Unable to load wishlist.' });
    }
});

router.post('/:productId', requireAuth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
            return res.status(400).json({ message: 'Invalid product ID.' });
        }

        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        if (product.seller.toString() === req.userId) {
            return res.status(400).json({
                message: 'You cannot add your own product to your wishlist.'
            });
        }

        const user = await User.findById(req.userId);
        const exists = user.wishlist.some(
            id => id.toString() === product._id.toString()
        );

        if (exists) {
            user.wishlist = user.wishlist.filter(
                id => id.toString() !== product._id.toString()
            );
            await user.save();

            await Product.updateOne(
                {
                    _id: product._id,
                    favorites: { $gt: 0 }
                },
                {
                    $inc: { favorites: -1 }
                }
            );

            return res.json({ message: 'Removed from wishlist.', liked: false });
        }

        user.wishlist.push(product._id);
        await user.save();

        await Product.findByIdAndUpdate(product._id, {
            $inc: { favorites: 1 }
        });

        return res.json({ message: 'Added to wishlist.', liked: true });
    } catch (error) {
        console.error('Wishlist toggle error:', error);
        return res.status(500).json({ message: 'Unable to update wishlist.' });
    }
});

export default router;

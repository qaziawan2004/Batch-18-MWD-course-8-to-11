import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .populate('wishlist', 'title price images category condition location status seller');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.json({ user });
    } catch (error) {
        console.error('Profile load error:', error);
        return res.status(500).json({ message: 'Unable to load profile.' });
    }
});

router.put('/me', requireAuth, async (req, res) => {
    try {
        const name = String(req.body.name || '').trim();
        const bio = String(req.body.bio || '').trim();

        if (name.length < 2) {
            return res.status(400).json({ message: 'Name must contain at least 2 characters.' });
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, bio },
            { new: true, runValidators: true }
        );

        return res.json({
            message: 'Profile updated successfully.',
            user
        });
    } catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({ message: 'Unable to update profile.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('name email avatar bio createdAt');

        if (!user) {
            return res.status(404).json({ message: 'Seller not found.' });
        }

        const products = await Product.find({ seller: user._id })
            .sort({ createdAt: -1 });

        return res.json({ user, products });
    } catch (error) {
        console.error('Seller profile error:', error);
        return res.status(500).json({ message: 'Unable to load seller profile.' });
    }
});

export default router;

import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sendOtpEmail } from '../config/mailer.js';
import { createOtp, hashOtp, compareOtp, otpExpiry } from '../utils/otp.js';
import { createToken } from '../utils/token.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function normalizeEmail(email = '') {
    return email.trim().toLowerCase();
}

function validatePassword(password = '') {
    return typeof password === 'string' && password.length >= 6;
}

router.post('/signup', async (req, res) => {
    try {
        const name = String(req.body.name || '').trim();
        const email = normalizeEmail(req.body.email);
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (name.length < 2) {
            return res.status(400).json({ message: 'Please enter a valid full name.' });
        }

        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Please enter a valid email address.' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 6 characters.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        let user = await User.findOne({ email }).select('+password');

        if (user && user.isVerified) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const otp = createOtp();
        const otpHash = await hashOtp(otp);

        if (!user) {
            user = new User({
                name,
                email,
                password: passwordHash,
                isVerified: false
            });
        } else {
            user.name = name;
            user.password = passwordHash;
        }

        user.verificationOtpHash = otpHash;
        user.verificationOtpExpires = otpExpiry();

        await user.save();

        try {
            await sendOtpEmail(user.email, user.name, otp, 'signup');
        } catch (mailError) {
            console.error('Signup OTP email failed:', mailError.message);
            return res.status(500).json({
                message: 'Account was created, but the OTP email could not be sent. Check your email configuration and try again.'
            });
        }

        return res.status(201).json({
            message: 'Signup successful. Check your email for the verification OTP.',
            email: user.email
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Unable to create account.' });
    }
});

router.post('/resend-signup-otp', async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const user = await User.findOne({ email }).select('+verificationOtpHash +verificationOtpExpires');

        if (!user) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'This account is already verified.' });
        }

        const otp = createOtp();

        user.verificationOtpHash = await hashOtp(otp);
        user.verificationOtpExpires = otpExpiry();
        await user.save();

        await sendOtpEmail(user.email, user.name, otp, 'signup');

        return res.json({ message: 'A new verification OTP has been sent.' });
    } catch (error) {
        console.error('Resend signup OTP error:', error);
        return res.status(500).json({ message: 'Unable to send a new OTP.' });
    }
});

router.post('/verify-signup-otp', async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const otp = String(req.body.otp || '').trim();

        const user = await User.findOne({ email })
            .select('+verificationOtpHash +verificationOtpExpires');

        if (!user) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Account is already verified.' });
        }

        if (!user.verificationOtpHash || !user.verificationOtpExpires) {
            return res.status(400).json({ message: 'No verification OTP is available. Please request a new one.' });
        }

        if (user.verificationOtpExpires.getTime() < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
        }

        const validOtp = await compareOtp(otp, user.verificationOtpHash);

        if (!validOtp) {
            return res.status(400).json({ message: 'Invalid OTP. Please check your email and try again.' });
        }

        user.isVerified = true;
        user.verificationOtpHash = null;
        user.verificationOtpExpires = null;
        await user.save();

        const token = createToken(user._id.toString());

        return res.json({
            message: 'Email verified successfully.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Verify signup OTP error:', error);
        return res.status(500).json({ message: 'Unable to verify the OTP.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const password = req.body.password;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        if (!user.isVerified) {
            const otp = createOtp();

            user.verificationOtpHash = await hashOtp(otp);
            user.verificationOtpExpires = otpExpiry();
            await user.save();

            try {
                await sendOtpEmail(user.email, user.name, otp, 'signup');
            } catch (mailError) {
                console.error('Login verification email failed:', mailError.message);
                return res.status(500).json({
                    message: 'Your account is not verified and a new OTP could not be sent.'
                });
            }

            return res.status(403).json({
                message: 'Your email is not verified. A new verification OTP has been sent.',
                needsVerification: true,
                email: user.email
            });
        }

        const token = createToken(user._id.toString());

        return res.json({
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Unable to login.' });
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No account was found with this email address.' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your account before resetting the password.' });
        }

        const otp = createOtp();
        user.resetOtpHash = await hashOtp(otp);
        user.resetOtpExpires = otpExpiry();
        user.resetVerifiedUntil = null;
        await user.save();

        try {
            await sendOtpEmail(user.email, user.name, otp, 'reset');
        } catch (mailError) {
            console.error('Reset OTP email failed:', mailError.message);
            user.resetOtpHash = null;
            user.resetOtpExpires = null;
            await user.save();

            return res.status(500).json({
                message: 'OTP could not be sent. Check the email configuration and try again.'
            });
        }

        return res.json({
            message: 'Reset OTP sent to your email.',
            email: user.email
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ message: 'Unable to start password reset.' });
    }
});

router.post('/verify-reset-otp', async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const otp = String(req.body.otp || '').trim();

        const user = await User.findOne({ email })
            .select('+resetOtpHash +resetOtpExpires');

        if (!user) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        if (!user.resetOtpHash || !user.resetOtpExpires) {
            return res.status(400).json({ message: 'No reset OTP is available. Please request a new OTP.' });
        }

        if (user.resetOtpExpires.getTime() < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        const validOtp = await compareOtp(otp, user.resetOtpHash);

        if (!validOtp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        user.resetOtpHash = null;
        user.resetOtpExpires = null;
        user.resetVerifiedUntil = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        return res.json({ message: 'OTP verified. You can now reset your password.' });
    } catch (error) {
        console.error('Verify reset OTP error:', error);
        return res.status(500).json({ message: 'Unable to verify the reset OTP.' });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 6 characters.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const user = await User.findOne({ email })
            .select('+resetVerifiedUntil +password');

        if (!user) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        if (!user.resetVerifiedUntil || user.resetVerifiedUntil.getTime() < Date.now()) {
            return res.status(403).json({ message: 'Reset verification has expired. Please request a new OTP.' });
        }

        user.password = await bcrypt.hash(password, 12);
        user.resetVerifiedUntil = null;
        await user.save();

        return res.json({ message: 'Password reset successfully. You can now login.' });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ message: 'Unable to reset the password.' });
    }
});

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                bio: user.bio,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        return res.status(500).json({ message: 'Unable to load your profile.' });
    }
});

export default router;

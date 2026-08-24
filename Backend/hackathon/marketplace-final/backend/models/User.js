import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 80
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationOtpHash: {
            type: String,
            default: null,
            select: false
        },
        verificationOtpExpires: {
            type: Date,
            default: null,
            select: false
        },
        resetOtpHash: {
            type: String,
            default: null,
            select: false
        },
        resetOtpExpires: {
            type: Date,
            default: null,
            select: false
        },
        resetVerifiedUntil: {
            type: Date,
            default: null,
            select: false
        },
        avatar: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: '',
            maxlength: 300
        },
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);

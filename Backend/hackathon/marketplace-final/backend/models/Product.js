import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            default: ''
        }
    },
    { _id: false }
);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            enum: ['Electronics', 'Fashion', 'Furniture', 'Vehicles', 'Books', 'Other']
        },
        condition: {
            type: String,
            required: true,
            enum: ['New', 'Used']
        },
        location: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120
        },
        images: {
            type: [imageSchema],
            required: true,
            validate: {
                validator: value => value.length > 0,
                message: 'At least one product image is required.'
            }
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        status: {
            type: String,
            enum: ['Available', 'Sold'],
            default: 'Available'
        },
        views: {
            type: Number,
            default: 0
        },
        favorites: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Product', productSchema);

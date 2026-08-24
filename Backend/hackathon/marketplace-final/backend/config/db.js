import { setServers } from 'node:dns/promises';
import mongoose from 'mongoose';

export async function connectDB() {
    try {
        setServers(['8.8.8.8', '1.1.1.1']);

        console.log('DNS resolvers set to Google (8.8.8.8) and Cloudflare (1.1.1.1)');

        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

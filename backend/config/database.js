import mongoose from 'mongoose';
import { env } from './env.js';

let connectionPromise = null;

export const connectDatabase = async () => {
    if (!env.mongoUri) {
        throw new Error('MONGO_URI is not configured');
    }
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(env.mongoUri);
    }
    return connectionPromise;
};

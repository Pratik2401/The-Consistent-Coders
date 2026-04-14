import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

const withTimeout = (promise, ms) => Promise.race([
    promise,
    new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
    }),
]);

const startServer = async () => {
    try {
        if (env.mongoUri) {
            try {
                await withTimeout(connectDatabase(), 8000);
                console.log('Database connected successfully.');
            }
            catch (error) {
                console.error('Database connection failed. Continuing without DB:', error instanceof Error ? error.message : error);
            }
        }
        app.listen(env.port, () => {
            console.log(`Server running on port ${env.port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

void startServer();

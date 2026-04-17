import cors from 'cors';
import express from 'express';
import apiRoutes from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { env } from './config/env.js';

const app = express();

app.disable('x-powered-by');
app.use(cors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',').map((origin) => origin.trim()),
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

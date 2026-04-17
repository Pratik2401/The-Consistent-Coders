import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../modules/profile/profile.model.js';

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization ?? '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Authentication required.',
            });
            return;
        }

        const payload = jwt.verify(token, env.jwtSecret);
        if (!payload?.sub) {
            res.status(401).json({
                success: false,
                message: 'Invalid authentication token.',
            });
            return;
        }

        const user = await User.findById(payload.sub).lean();
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'User not found.',
            });
            return;
        }

        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
        });
    }
};

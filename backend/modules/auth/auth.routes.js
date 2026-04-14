import { Router } from 'express';
import {
    getGoogleAuthConfig,
    googleSignIn,
    googleOAuthRedirect,
    googleOAuthCallback,
} from './auth.controller.js';

const router = Router();

// Existing endpoints
router.get('/config/google', getGoogleAuthConfig);
router.post('/google', googleSignIn);

// New: server-side OAuth redirect flow (bypasses GSI origin check)
router.get('/google/redirect', googleOAuthRedirect);
router.get('/google/callback', googleOAuthCallback);

export default router;

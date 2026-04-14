import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

const oauthClient = new OAuth2Client();

export const verifyGoogleCredential = async (credential, audience) => {
    const ticket = await oauthClient.verifyIdToken({
        idToken: credential,
        audience,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email) {
        throw new Error('Invalid Google token payload.');
    }

    return {
        id: payload.sub,
        email: payload.email,
        name: payload.name ?? '',
        picture: payload.picture ?? '',
        emailVerified: Boolean(payload.email_verified),
    };
};

export const signAccessToken = (userId) => jwt.sign(
    { sub: String(userId) },
    env.jwtSecret,
    { expiresIn: '7d' },
);

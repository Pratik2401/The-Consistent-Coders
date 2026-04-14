import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const POPUP_WIDTH = 500;
const POPUP_HEIGHT = 600;

/**
 * Opens a centered popup window for Google OAuth.
 */
const openPopup = (url) => {
    const left = window.screenX + (window.outerWidth - POPUP_WIDTH) / 2;
    const top = window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2;
    return window.open(
        url,
        'google-oauth-popup',
        `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top},popup=yes`,
    );
};

export const GoogleSignInButton = ({ onSuccess, enabled = true }) => {
    const { loginWithToken, isLoadingConfig, isLoggingIn, error } = useAuth();
    const popupRef = useRef(null);

    // Listen for the postMessage from the OAuth callback page
    useEffect(() => {
        const handleMessage = async (event) => {
            if (!event.data || event.data.type !== 'GOOGLE_AUTH_RESULT') return;

            const { payload } = event.data;
            if (!payload) return;

            if (payload.error) {
                // error will be surfaced through auth context
                return;
            }

            if (payload.token && payload.user) {
                const result = await loginWithToken(payload.token, payload.user);
                if (result.success && onSuccess) {
                    onSuccess();
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [loginWithToken, onSuccess]);

    const handleClick = useCallback(() => {
        if (popupRef.current && !popupRef.current.closed) {
            popupRef.current.focus();
            return;
        }
        // Open popup to the backend OAuth redirect endpoint.
        // In dev, Vite proxies /api/* to the backend.
        popupRef.current = openPopup('/api/auth/google/redirect');
    }, []);

    if (!enabled) {
        return null;
    }

    if (isLoadingConfig) {
        return <span className="nav-cta-text">Loading auth...</span>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <button
                type="button"
                onClick={handleClick}
                disabled={isLoggingIn}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.875rem',
                    fontFamily: "'Roboto', 'Arial', sans-serif",
                    fontWeight: 500,
                    color: '#1f1f1f',
                    backgroundColor: '#ffffff',
                    border: '1px solid #dadce0',
                    borderRadius: '9999px',
                    cursor: isLoggingIn ? 'wait' : 'pointer',
                    transition: 'background-color 0.2s, box-shadow 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    height: '40px',
                    whiteSpace: 'nowrap',
                    opacity: isLoggingIn ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                    if (!isLoggingIn) {
                        e.currentTarget.style.backgroundColor = '#f7f8f8';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                }}
            >
                {/* Google "G" logo SVG */}
                <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                {isLoggingIn ? 'Signing in…' : 'Sign in with Google'}
            </button>
            {error ? <span className="mono-text" style={{ fontSize: '0.6rem', color: '#ff6b6b' }}>{error}</span> : null}
        </div>
    );
};

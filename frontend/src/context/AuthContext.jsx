/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'tcc_google_user';
const TOKEN_KEY = 'tcc_access_token';
const API_BASE = '/api';

const parseApiResponse = async (response) => {
    const raw = await response.text();
    if (!raw) {
        return {
            ok: response.ok,
            status: response.status,
            data: null,
            message: 'Empty server response.',
        };
    }

    try {
        const data = JSON.parse(raw);
        return {
            ok: response.ok,
            status: response.status,
            data,
            message: data?.message || '',
        };
    }
    catch {
        return {
            ok: response.ok,
            status: response.status,
            data: null,
            message: `Server returned non-JSON response (status ${response.status}).`,
        };
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        }
        catch {
            return null;
        }
    });
    const [clientId, setClientId] = useState('');
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) ?? '');
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        const loadGoogleConfig = async () => {
            try {
                const response = await fetch(`${API_BASE}/auth/config/google`);
                const parsed = await parseApiResponse(response);

                if (!parsed.ok || !parsed.data?.clientId) {
                    const fallback = 'Unable to load Google auth config. Make sure backend is running on port 5000.';
                    throw new Error(parsed.message || fallback);
                }

                if (isMounted) {
                    setClientId(parsed.data.clientId);
                }
            }
            catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load auth config.');
                }
            }
            finally {
                if (isMounted) {
                    setIsLoadingConfig(false);
                }
            }
        };

        void loadGoogleConfig();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        const bootstrapUser = async () => {
            if (!token) return;
            setIsLoadingUser(true);
            try {
                const response = await fetch(`${API_BASE}/profile/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const parsed = await parseApiResponse(response);
                if (!parsed.ok || !parsed.data?.user) {
                    throw new Error(parsed.message || 'Session expired.');
                }
                if (isMounted) {
                    setUser(parsed.data.user);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.data.user));
                }
            }
            catch {
                if (isMounted) {
                    setUser(null);
                    setToken('');
                    localStorage.removeItem(STORAGE_KEY);
                    localStorage.removeItem(TOKEN_KEY);
                }
            }
            finally {
                if (isMounted) {
                    setIsLoadingUser(false);
                }
            }
        };
        void bootstrapUser();
        return () => {
            isMounted = false;
        };
    }, [token]);

    const loginWithGoogleCredential = async (credential) => {
        setIsLoggingIn(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE}/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential }),
            });
            const parsed = await parseApiResponse(response);
            if (!parsed.ok || !parsed.data?.user || !parsed.data?.token) {
                throw new Error(parsed.message || 'Google sign-in failed.');
            }

            setUser(parsed.data.user);
            setToken(parsed.data.token);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.data.user));
            localStorage.setItem(TOKEN_KEY, parsed.data.token);
            return { success: true };
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Google sign-in failed.';
            setError(message);
            return { success: false, message };
        }
        finally {
            setIsLoggingIn(false);
        }
    };

    // Used by the server-side OAuth redirect flow.
    // The backend already verified the Google token and generated a JWT,
    // so we just store the token + user directly.
    const loginWithToken = async (jwtToken, userData) => {
        setIsLoggingIn(true);
        setError('');
        try {
            if (!jwtToken || !userData) {
                throw new Error('Missing token or user data.');
            }
            setUser(userData);
            setToken(jwtToken);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
            localStorage.setItem(TOKEN_KEY, jwtToken);
            return { success: true };
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Google sign-in failed.';
            setError(message);
            return { success: false, message };
        }
        finally {
            setIsLoggingIn(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setError('');
    };

    const updateProfile = async ({ name, picture }) => {
        if (!token) {
            return { success: false, message: 'Please log in first.' };
        }
        setIsUpdatingProfile(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE}/profile/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, picture }),
            });
            const parsed = await parseApiResponse(response);
            if (!parsed.ok || !parsed.data?.user) {
                throw new Error(parsed.message || 'Profile update failed.');
            }
            setUser(parsed.data.user);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.data.user));
            return { success: true };
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Profile update failed.';
            setError(message);
            return { success: false, message };
        }
        finally {
            setIsUpdatingProfile(false);
        }
    };

    const value = useMemo(() => ({
        user,
        token,
        clientId,
        isLoadingConfig,
        isLoadingUser,
        isLoggingIn,
        isUpdatingProfile,
        error,
        loginWithGoogleCredential,
        loginWithToken,
        updateProfile,
        logout,
    }), [user, token, clientId, isLoadingConfig, isLoadingUser, isLoggingIn, isUpdatingProfile, error, updateProfile]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

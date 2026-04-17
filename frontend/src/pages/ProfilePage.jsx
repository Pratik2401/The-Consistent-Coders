import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
    const { user, updateProfile, isUpdatingProfile, error } = useAuth();
    const [name, setName] = useState(() => user?.name || '');
    const [picture, setPicture] = useState(() => user?.picture || '');
    const [feedback, setFeedback] = useState('');

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const result = await updateProfile({ name, picture });
        if (result.success) {
            setFeedback('Profile updated successfully.');
        }
        else {
            setFeedback(result.message || 'Profile update failed.');
        }
    };

    return (
        <section className="theme-black" style={{ minHeight: '100vh', padding: '140px 5vw 4rem' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
                <h1 className="serif-text" style={{ fontSize: 'clamp(2rem,5vw,3rem)', marginBottom: '0.5rem' }}>Edit Profile</h1>
                <p className="mono-text" style={{ opacity: 0.7, marginBottom: '1.5rem' }}>{user.email}</p>
                <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <label className="mono-text" style={{ fontSize: '0.75rem' }}>
                        Name
                        <input value={name} onChange={(e) => setName(e.target.value)} required style={{ marginTop: '0.4rem', width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: '#111', color: '#fff' }} />
                    </label>
                    <label className="mono-text" style={{ fontSize: '0.75rem' }}>
                        Profile Picture URL
                        <input value={picture} onChange={(e) => setPicture(e.target.value)} placeholder="https://..." style={{ marginTop: '0.4rem', width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: '#111', color: '#fff' }} />
                    </label>
                    <button type="submit" className="btn-primary" disabled={isUpdatingProfile}>
                        <span className="btn-text">{isUpdatingProfile ? 'SAVING...' : 'SAVE PROFILE'}</span>
                        <div className="btn-bg"></div>
                    </button>
                </form>
                {feedback ? <p className="mono-text" style={{ marginTop: '1rem', color: '#ccff00' }}>{feedback}</p> : null}
                {error ? <p className="mono-text" style={{ marginTop: '0.5rem', color: '#ff7f7f' }}>{error}</p> : null}
            </div>
        </section>
    );
};

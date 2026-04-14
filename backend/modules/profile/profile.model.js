import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    picture: { type: String, default: '' },
    emailVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);

import { User } from './profile.model.js';

export const toPublicUser = (user) => ({
    id: String(user._id),
    email: user.email,
    name: user.name,
    picture: user.picture || '',
    emailVerified: Boolean(user.emailVerified),
});

export const getProfileById = async (userId) => {
    const user = await User.findById(userId).lean();
    if (!user) {
        return null;
    }
    return toPublicUser(user);
};

export const updateProfileById = async (userId, { name, picture }) => {
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                name: name.trim(),
                picture: picture.trim(),
            },
        },
        { new: true, runValidators: true },
    ).lean();

    if (!user) {
        return null;
    }
    return toPublicUser(user);
};

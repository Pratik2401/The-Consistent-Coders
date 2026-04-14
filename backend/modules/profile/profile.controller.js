import { getProfileById, updateProfileById } from './profile.service.js';

export const getMyProfile = async (req, res, next) => {
    try {
        const profile = await getProfileById(req.user._id);
        if (!profile) {
            res.status(404).json({
                success: false,
                message: 'Profile not found.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            user: profile,
        });
    }
    catch (error) {
        next(error);
    }
};

export const updateMyProfile = async (req, res, next) => {
    try {
        const name = String(req.body?.name ?? '').trim();
        const picture = String(req.body?.picture ?? '').trim();

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Name is required.',
            });
            return;
        }

        const updatedProfile = await updateProfileById(req.user._id, { name, picture });
        if (!updatedProfile) {
            res.status(404).json({
                success: false,
                message: 'Profile not found.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            user: updatedProfile,
        });
    }
    catch (error) {
        next(error);
    }
};

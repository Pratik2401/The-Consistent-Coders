import { getHealthPayload } from './health.service.js';

export const healthCheck = (req, res) => {
    res.status(200).json(getHealthPayload());
};

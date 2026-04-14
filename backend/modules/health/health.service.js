export const getHealthPayload = () => ({
    success: true,
    message: 'API is healthy and running',
    timestamp: new Date().toISOString(),
});

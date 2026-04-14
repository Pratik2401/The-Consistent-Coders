export const errorMiddleware = (error, req, res, next) => {
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? undefined : error instanceof Error ? error.stack : undefined,
    });
};

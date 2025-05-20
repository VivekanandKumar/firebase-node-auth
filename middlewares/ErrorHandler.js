export const GlobalErrorHandler = (err, req, res, next) => {
    const statusCode = err?.statusCode || 500;
    const message = err?.message || "Server Error";
    return res.status(statusCode).json({
        message: message,
    });
};

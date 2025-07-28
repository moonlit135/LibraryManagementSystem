

const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);

    // Default values
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            statusCode,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};

module.exports = errorHandler;

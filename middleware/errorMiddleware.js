// Custom error handling middleware
export const errorHandler = (err, req, res, next) => {
  // Set status code: use existing one if not 200, else default to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send JSON response with error details
  res.status(statusCode).json({
    message: err.message, // Error message

    // In production, hide the stack trace for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

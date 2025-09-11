const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    // CastError -> When data not found in the database.
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }
    // code === 11000 -> Duplciate key error in the mongodb.
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }
    // ValidationError -> MmongoDB schema validation failed.
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((vale) => vale.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;

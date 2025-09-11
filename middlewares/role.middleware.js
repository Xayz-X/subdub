const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).json({
        success: false,
        messgae: "Forbidden",
        error: "You are not authorized for this action",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const developerMiddleware = async (req, res, next) => {
  try {
    if (req.user.role != "developer") {
      return res.status(401).json({
        success: false,
        messgae: "Forbidden",
        error: "You are not authorized for this action",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { adminMiddleware, developerMiddleware };

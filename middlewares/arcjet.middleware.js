import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      // Ratelimit hit
      if (decision.reason.isRateLimit()) {
        res.status(429).json({
          success: false,
          message: "Too Many Requests",
        });
      }

      // Bot req detection
      if (decision.reason.isBot()) {
        res.status(429).json({
          success: false,
          message: "Bot request not allow",
        });
      }

      // for any other reaosn
      res.status(401).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default arcjetMiddleware;

import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");
    if (!success) {
      return res
        .status(429)
        .json({ error: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.error("Error occurred while checking rate limit:", error);
    next(error);
  }
};

export default rateLimiter;
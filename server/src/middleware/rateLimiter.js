import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return next();
  }

  try {
    const { success } = await ratelimit.limit(
      `my-limit-key:${req.ip}:${req.path}`,
    );
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }
    return next();
  } catch (error) {
    console.warn(
      "Rate limit unavailable, continuing without it:",
      error.message,
    );
    return next();
  }
};

export default rateLimiter;

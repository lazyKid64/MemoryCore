import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// create a new ratelimiter, that allows 100 requests per 15 minutes
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),   // ✅ no "new"
  limiter: Ratelimit.slidingWindow(100, "15 m"),
  analytics: true,
});

export default rateLimit;

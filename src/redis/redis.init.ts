import { redis } from "./redis.client";

export const initRedis = async () => {
  try {
    await redis.ping();
    redis.set("cacheType", JSON.stringify("inMemoryCache"));
    console.log("Redis connected successfully");
    console.log("Set cache strategy to inMemoryCache");
  } catch (error) {
    console.error("Redis connection failed");
    throw error;
  }
};

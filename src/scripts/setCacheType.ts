import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
});

const cacheType = process.argv[2];

if (!cacheType || !["inMemoryCache", "fileBasedCache"].includes(cacheType)) {
  console.error('Usage: ts-node setCacheType.ts <inMemoryCache|fileBasedCache>');
  process.exit(1);
}

const setCache = async () => {
  try {
    await redis.set("storeType", JSON.stringify(cacheType));
    const value = await redis.get("storeType");
    console.log("Cache type set to:", value);
    process.exit(0);
  } catch (err) {
    console.error("Error setting cache type:", err);
    process.exit(1);
  } finally {
    redis.disconnect();
  }
}

setCache();

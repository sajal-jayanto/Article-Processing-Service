import { redis } from "./redis.client";

export class RedisService {
  static async set(key: string, value: any, ttlSeconds?: number) {
    const data = JSON.stringify(value);
    if (ttlSeconds) {
      await redis.set(key, data, "EX", ttlSeconds);
    } else {
      await redis.set(key, data);
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  static async del(key: string) {
    await redis.del(key);
  }

  static async incr(key: string, increment = 1, defaultValue = 0): Promise<number> {
    const exists = await redis.exists(key);
    if (!exists) {
      await redis.set(key, defaultValue);
    }
    const newValue = await redis.incrby(key, increment);
    return newValue;
  }
}

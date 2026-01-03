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
}

import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { RedisService } from "../redis/redis.service";

export const metrics = async (req: Request, res: Response) => {
  logger.info("metrics endpoint called");
  const completed = await RedisService.get("job:completed");
  const failed = await RedisService.get("job:failed");
  res.status(200).json({ completed, failed });
};
import { Request, Response } from "express";
import { logger } from "../utils/logger";

export const healthCheck = (req: Request, res: Response) => {
  logger.info("Health endpoint called");
  res.status(200).json({ status: "OK", time: new Date().toISOString() });
};

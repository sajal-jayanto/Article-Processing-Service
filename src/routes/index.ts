import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";
import articleRouters from "./article.routers";
import { metrics } from "../controllers/metrics.controller";

const router = Router();

router.get("/health", healthCheck);
router.get('/metrics', metrics)
router.use("/articles", articleRouters)

export default router;

import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";
import articleRouters from "./article.routers";

const router = Router();

router.get("/health", healthCheck);
router.use("/articles", articleRouters)

export default router;
